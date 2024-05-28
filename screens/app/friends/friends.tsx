import { View, StyleSheet, TextInput, Image, TouchableOpacity, ActivityIndicator, TouchableWithoutFeedback, Keyboard, FlatList } from "react-native"
import Svg, { Path } from "react-native-svg"
import { useCallback, useEffect, useState } from "react"
import axios from "axios"

import MainWrapper from "../../../components/app/mainWrapper/mainWrapper"
import TextBold from "../../../components/app/common/textComponent/textBold/textBold"

import messages from "../../../constants/messages"
import { RPH, RPW, RFS } from "../../../constants/utils/utils"
import Apis from "../../../constants/apis"

import UsersInterface from "./interfaces/usersInterface"
import useSliceSelector from "../../../hooks/useSliceSelector"

const imageSize = "thumb";

const Friends = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [users, setUsers] = useState<UsersInterface[]>([]);
    const [isLoading, setIsLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const userId = useSliceSelector(state => state.auth.userData.data.userId)

    const fetchData = useCallback(async (page: number) => {
        try {
            const response = await axios.get(`${Apis.friendsApi}?user_id=${userId}&page=${page}`);
            setUsers((prevUsers => [...prevUsers, ...response.data]));
            setTotalPages(response.headers["x-wp-totalpages"]);
            setIsLoading(false)
        } catch (error) {
            console.error('Error fetching data:', error);
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
            <MainWrapper headerText={messages.friends} icon={true} isHeader={true}>
                <View style={styles.container}>
                    <View style={styles.iconContainer}>
                        <View style={styles.icon}>
                            <Svg width="18" height="21" viewBox="0 0 18 21" fill="none">
                                <Path fill-rule="evenodd" clip-rule="evenodd" d="M14.5117 8.63598C14.5117 4.39242 11.2924 0.952332 7.32126 0.952332C3.35011 0.952332 0.130859 4.39242 0.130859 8.63598C0.130859 12.8795 3.35011 16.3196 7.32126 16.3196C8.87763 16.3196 10.3185 15.7912 11.4954 14.8931L16.0694 19.7805L16.1746 19.8787C16.5772 20.2061 17.1543 20.1734 17.5221 19.7805C17.9232 19.3518 17.9232 18.6568 17.5221 18.2281L12.981 13.3758C13.9399 12.0701 14.5117 10.4244 14.5117 8.63598ZM1.50046 8.63598C1.50046 5.20071 4.10652 2.41588 7.32126 2.41588C10.536 2.41588 13.1421 5.20071 13.1421 8.63598C13.1421 12.0712 10.536 14.8561 7.32126 14.8561C4.10652 14.8561 1.50046 12.0712 1.50046 8.63598Z" fill="#8E8E93" />
                            </Svg>
                        </View>
                        <TextInput
                            placeholder="Search Friends"
                            style={styles.input}
                            value={searchQuery}
                            onChangeText={(text) => setSearchQuery(text)}
                        />
                    </View>
                    <View style={styles.bodyContainer}>
                        <TextBold style={styles.friendsText} fontSize={18}>
                            {
                                filteredUsers.length === 1 ?
                                    `${filteredUsers.length} Friend` :
                                    `${filteredUsers.length} Friends`
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