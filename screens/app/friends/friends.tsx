import { View, StyleSheet, TextInput, Image, TouchableOpacity, ActivityIndicator, TouchableWithoutFeedback, Keyboard, FlatList } from "react-native";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";

import MainWrapper from "../../../components/app/mainWrapper/mainWrapper";
import TextBold from "../../../components/app/common/textComponent/textBold/textBold";
import AppHeader from "../../../components/app/appHeader/appHeader";

import { RPH, RPW, RFS } from "../../../constants/utils/utils";
import Apis from "../../../constants/apis";
import Icons from "../../../constants/icons";

import useSliceSelector from "../../../hooks/useSliceSelector";

import UsersInterface from "./interfaces/usersInterface";

const imageSize = "thumb";

const Friends = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [users, setUsers] = useState<UsersInterface[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const userId = useSliceSelector(state => state.auth.userData.userId);
    const messages = useSliceSelector(state => state.language.messages);

    const fetchData = useCallback(async (page: number) => {
        try {
            const response = await axios.get(`${Apis.friendsApi}?user_id=${userId}&page=${page}`);
            setUsers((prevUsers => [...prevUsers, ...response.data]));
            setTotalPages(response.headers["x-wp-totalpages"]);
            setIsLoading(false)
        } catch (error) {
            console.error('Error fetching data:', error);
            setIsLoading(false)
        }
    }, [currentPage])

    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage])

    const loadMorePosts = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const filteredUsers = users.filter(user => {
        const itemText = user.name.toLowerCase();
        return itemText.includes(searchQuery.toLowerCase());
    });

    if (isLoading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        )
    }

    const renderUserItem = ({ item, index }: { item: UsersInterface; index: number }) => (
        <View key={index}>
            <View style={styles.friendContainer}>
                <TouchableOpacity>
                    <View style={styles.circle}>
                        {item.avatar_urls && <Image style={styles.roundImg} source={{ uri: item.avatar_urls[imageSize] }} />}
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View>
                        <TextBold fontSize={17}>{item.name}</TextBold>
                    </View>
                </TouchableOpacity>
            </View>
            {index !== filteredUsers.length - 1 && <View style={styles.borderBottom} />}
        </View>
    )

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <MainWrapper>
                <View style={styles.container}>
                    <AppHeader headerText={messages.friends} icon={true} />
                    <View style={styles.iconContainer}>
                        <View style={styles.icon}>
                            {Icons.inputSearchIcon}
                        </View>
                        <TextInput
                            placeholder={messages.searchFriends}
                            style={styles.input}
                            value={searchQuery}
                            onChangeText={(text) => setSearchQuery(text)}
                        />
                    </View>
                    <View style={styles.bodyContainer}>
                        <TextBold style={styles.friendsText} fontSize={18}>
                            {
                                filteredUsers.length === 1 ?
                                    `${filteredUsers.length} ${messages.friend}` :
                                    `${filteredUsers.length} ${messages.friends}`
                            }
                        </TextBold>
                        <View style={styles.content}>
                            <FlatList
                                data={filteredUsers}
                                renderItem={renderUserItem}
                                keyExtractor={(item, index) => `${item.id}_${index}`}
                                onEndReached={loadMorePosts}
                                onEndReachedThreshold={0.5}
                            />
                        </View>
                    </View>
                </View>
            </MainWrapper>
        </TouchableWithoutFeedback>
    )
}

export default Friends

const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: RPH(1.6)
    },
    icon: {
        position: "absolute",
        left: RPW(7.8),
        top: RPH(1.7)
    },
    input: {
        backgroundColor: "rgba(0, 0, 0, 0.05)",
        marginHorizontal: RPW(5.9),
        color: "#8E8E93",
        fontSize: RFS(17),
        fontFamily: "Lato-Regular",
        fontWeight: "400",
        paddingVertical: RPH(1.3),
        borderRadius: 10,
        paddingHorizontal: RPW(7.8)
    },
    iconContainer: {
        position: "relative"
    },
    friendsText: {
        paddingLeft: RPW(2.5)
    },
    bodyContainer: {
        borderRadius: 24,
        borderWidth: 1,
        borderColor: "#E7E7E7",
        marginHorizontal: RPW(2.5),
        paddingLeft: RPW(2.5),
        paddingVertical: RPW(5.4),
        marginBottom: RPH(1.8),
        backgroundColor: "#fff",
        marginTop: RPH(1.6)
    },
    circle: {
        width: RPW(11.5),
        justifyContent: "center",
        alignItems: "center"
    },
    roundImg: {
        borderRadius: 50,
        width: "100%",
        objectFit: "contain",
        height: RPH(5.5)
    },
    content: {
        marginTop: RPH(3.6),
        gap: RPH(1)
    },
    friendContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: RPW(3.2)
    },
    borderBottom: {
        borderBottomWidth: .5,
        borderBottomColor: "rgba(0, 0, 0, 0.12)",
        width: "84%",
        alignSelf: "flex-end",
        marginTop: RPH(1.3)
    }
})