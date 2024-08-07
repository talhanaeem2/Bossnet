import { View, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView, TouchableWithoutFeedback, Keyboard, ActivityIndicator, FlatList } from "react-native";
import { memo, useCallback, useEffect, useState } from "react";
import axios from "axios";

import MainWapper from "../../../components/app/mainWrapper/mainWrapper";
import TextBold from "../../../components/app/common/textComponent/textBold/textBold";
import TextRegular from "../../../components/app/common/textComponent/textRegular/textRegular";
import AppHeader from "../../../components/app/appHeader/appHeader";

import { truncateText, RPH, RPW, RFS } from "../../../constants/utils/utils";
import Apis from "../../../constants/apis";
import Icons from "../../../constants/icons";

import useSliceSelector from "../../../hooks/useSliceSelector";

import UsersInterface from "../friends/interfaces/usersInterface";

const imageSize = "thumb";

const Messenger = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isInputFocused, setIsInputFocused] = useState(false);
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
        <View style={styles.friendListItem} key={index}>
            <View style={styles.friendListContent}>
                <TouchableOpacity>
                    <View style={styles.friendListCircle}>
                        {item.avatar_urls && (
                            <Image style={styles.activeRoundImg} source={{ uri: (item.avatar_urls)[imageSize] }} />
                        )}
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View>
                        <TextRegular fontSize={17}>
                            {item.name}
                        </TextRegular>
                        <TextRegular fontSize={14} color="rgba(0, 0, 0, 0.50)">
                            You: Whats up man! · 9:40 AM
                        </TextRegular>
                    </View>
                </TouchableOpacity>
            </View>
            {
                // item.isSeen ?
                //     <Svg width="19" height="20" viewBox="0 0 19 20" fill="none">
                //         <Path fill-rule="evenodd" clip-rule="evenodd" d="M9.60802 0.315796C14.6508 0.315796 18.7387 4.65156 18.7387 10C18.7387 15.3484 14.6508 19.6842 9.60802 19.6842C4.56529 19.6842 0.477356 15.3484 0.477356 10C0.477356 4.65156 4.56529 0.315796 9.60802 0.315796ZM9.60802 2.73685C5.82598 2.73685 2.76002 5.98868 2.76002 10C2.76002 14.0113 5.82598 17.2632 9.60802 17.2632C13.3901 17.2632 16.456 14.0113 16.456 10C16.456 5.98868 13.3901 2.73685 9.60802 2.73685ZM12.3687 6.41578L8.10816 10.9346L6.41991 9.14404L6.31239 9.04333C5.86465 8.67409 5.21725 8.70766 4.80582 9.14404C4.3601 9.61678 4.3601 10.3832 4.80582 10.856L7.30112 13.5026L7.40864 13.6033C7.85638 13.9725 8.50378 13.9389 8.91521 13.5026L13.9828 8.12773L14.0778 8.01369C14.4259 7.53881 14.3942 6.85216 13.9828 6.41578C13.5371 5.94304 12.8144 5.94304 12.3687 6.41578Z" fill="#C2C6CC" />
                //     </Svg>
                //     :
                //     <Svg width="19" height="21" viewBox="0 0 19 21" fill="none">
                //         <Path fill-rule="evenodd" clip-rule="evenodd" d="M18.7387 10.5C18.7387 5.09342 14.6508 0.710526 9.60802 0.710526C4.56529 0.710526 0.477356 5.09342 0.477356 10.5C0.477356 15.9066 4.56529 20.2895 9.60802 20.2895C14.6508 20.2895 18.7387 15.9066 18.7387 10.5ZM2.76002 10.5C2.76002 6.44507 5.82598 3.15789 9.60802 3.15789C13.3901 3.15789 16.456 6.44507 16.456 10.5C16.456 14.5549 13.3901 17.8421 9.60802 17.8421C5.82598 17.8421 2.76002 14.5549 2.76002 10.5Z" fill="#C2C6CC" />
                //     </Svg>
            }
        </View>
    )

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <MainWapper>
                <View style={styles.container}>
                    <AppHeader headerText={messages.myFriends} chatHeader={true} />
                    <View style={styles.iconContainer}>
                        <View style={styles.icon}>
                            {Icons.inputSearchIcon}
                        </View>
                        <TextInput
                            placeholder="Search"
                            style={styles.input}
                            value={searchQuery}
                            onChangeText={(text) => setSearchQuery(text)}
                            onFocus={() => setIsInputFocused(true)}
                            onBlur={() => setIsInputFocused(false)}
                        />
                    </View>
                    {
                        isInputFocused ? null :
                            <View style={styles.activeContainer}>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                    <View style={styles.activeFriendscontainer}>
                                        {
                                            users.map((user, index) => {
                                                const truncatedFirstName = truncateText(user.name, 6);

                                                return (
                                                    <TouchableOpacity key={index}>
                                                        <View style={styles.activeCircle}>
                                                            {user.avatar_urls && (
                                                                <Image style={styles.activeRoundImg} source={{ uri: (user.avatar_urls)[imageSize] }} />
                                                            )}
                                                            <View style={styles.activeIcon}></View>
                                                            <TextRegular fontSize={13} color="rgba(0, 0, 0, 0.35)" style={styles.activeFriendText}>
                                                                {truncatedFirstName}
                                                            </TextRegular>
                                                        </View>
                                                    </TouchableOpacity>
                                                )
                                            })
                                        }
                                    </View>
                                </ScrollView>
                            </View>
                    }
                    <View style={styles.friendListContainer}>
                        {filteredUsers.length >= 1 ?
                            <FlatList
                                data={filteredUsers}
                                renderItem={renderUserItem}
                                keyExtractor={(item, index) => `${item.id}_${index}`}
                                onEndReached={loadMorePosts}
                                onEndReachedThreshold={0.5}
                            />
                            :
                            <View style={{ alignItems: "center", justifyContent: "center" }}>
                                <TextBold fontSize={16}>Add Some Friends</TextBold>
                            </View>
                        }
                    </View>
                </View>
            </MainWapper>
        </TouchableWithoutFeedback>
    )
}

export default memo(Messenger)

const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: "#fff",
        // paddingTop: RPH(1.6),
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
        position: "relative",
        paddingBottom: RPH(1.6),
        marginTop: RPH(1.6)
    },
    activeFriendscontainer: {
        flexDirection: "row",
        gap: RPW(4),
        paddingBottom: RPH(.6)
    },
    activeIcon: {
        backgroundColor: "#5AD439",
        width: 14,
        height: 14,
        borderRadius: 50,
        position: "absolute",
        bottom: 25,
        right: 0,
        borderColor: "#fff",
        borderWidth: 2
    },
    activeCircle: {
        width: RPW(15.3),
        justifyContent: "center",
        alignItems: "center",
        position: "relative"
    },
    activeRoundImg: {
        borderRadius: 50,
        width: "100%",
        objectFit: "contain",
        height: RPH(7.6)
    },
    activeContainer: {
        paddingHorizontal: RPW(3.7)
    },
    activeFriendText: {
        marginTop: RPH(1),
    },
    friendListCircle: {
        width: RPW(17.4),
        justifyContent: "center",
        alignItems: "center",
        position: "relative"
    },
    friendListRoundImg: {
        borderRadius: 50,
        width: "100%",
        objectFit: "contain",
        height: RPH(8.9)
    },
    friendListContainer: {
        marginTop: RPH(.6)
    },
    friendListItem: {
        paddingHorizontal: RPW(4.6),
        paddingVertical: RPH(1.1),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    friendListContent: {
        flexDirection: "row",
        alignItems: "center",
        gap: RPW(3.4)
    }
})