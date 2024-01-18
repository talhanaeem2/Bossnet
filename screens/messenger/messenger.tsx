import { View, StyleSheet, Text, TouchableOpacity, TextInput, Image, ScrollView } from "react-native"
import Svg, { Path } from "react-native-svg"
import { useEffect, useState } from "react"

import { RFS, RLH, RPH, truncateText } from "../../constants/utils"
import messages from "../../constants/messages"
import MainWapper from "../../components/mainWrapper/mainWrapper"
import FriendsInterface from "../friends/interfaces/friendsInterface"

const friends: FriendsInterface[] = [
    {
        image: require('../../assets/dummy-profile.png'),
        text: "Martha Craig",
        isSeen: false
    },
    {
        image: require('../../assets/dummy-profile.png'),
        text: "Kieron Dotson",
        isSeen: true
    },
    {
        image: require('../../assets/dummy-profile.png'),
        text: "Zack John",
        isSeen: false
    },
    {
        image: require('../../assets/dummy-profile.png'),
        text: "Jamie Franco",
        isSeen: true
    },
    {
        image: require('../../assets/dummy-profile.png'),
        text: "Tabitha Potter",
        isSeen: false
    },
    {
        image: require('../../assets/dummy-profile.png'),
        text: "Albert Lasker",
        isSeen: true
    },
    {
        image: require('../../assets/dummy-profile.png'),
        text: "Andrew Parker",
        isSeen: false
    },
    {
        image: require('../../assets/dummy-profile.png'),
        text: "Martin Randolph",
        isSeen: true
    },
    {
        image: require('../../assets/dummy-profile.png'),
        text: "Karen Castillo",
        isSeen: false
    },
    {
        image: require('../../assets/dummy-profile.png'),
        text: "Joshua Lawrence",
        isSeen: true
    },
];

const Messenger = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [isInputFocused, setIsInputFocused] = useState(false);

    const filteredFriends = friends.filter(item => {
        const itemText = item.text.toLowerCase();
        return itemText.includes(searchQuery.toLowerCase());
    });

    return (
        <MainWapper headerText={messages.myFriends} chatHeader={true}>
            <View style={styles.container}>
                <View style={styles.iconContainer}>
                    <View style={styles.icon}>
                        <Svg width="18" height="21" viewBox="0 0 18 21" fill="none">
                            <Path fill-rule="evenodd" clip-rule="evenodd" d="M14.5117 8.63598C14.5117 4.39242 11.2924 0.952332 7.32126 0.952332C3.35011 0.952332 0.130859 4.39242 0.130859 8.63598C0.130859 12.8795 3.35011 16.3196 7.32126 16.3196C8.87763 16.3196 10.3185 15.7912 11.4954 14.8931L16.0694 19.7805L16.1746 19.8787C16.5772 20.2061 17.1543 20.1734 17.5221 19.7805C17.9232 19.3518 17.9232 18.6568 17.5221 18.2281L12.981 13.3758C13.9399 12.0701 14.5117 10.4244 14.5117 8.63598ZM1.50046 8.63598C1.50046 5.20071 4.10652 2.41588 7.32126 2.41588C10.536 2.41588 13.1421 5.20071 13.1421 8.63598C13.1421 12.0712 10.536 14.8561 7.32126 14.8561C4.10652 14.8561 1.50046 12.0712 1.50046 8.63598Z" fill="#8E8E93" />
                        </Svg>
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
                                        friends.map((item, index) => {
                                            const fullName = item.text;
                                            const firstName = fullName.split(' ')[0];
                                            const truncatedFirstName = truncateText(firstName, 6);

                                            return (
                                                <TouchableOpacity key={index}>
                                                    <View style={styles.activeCircle}>
                                                        <Image style={styles.activeRoundImg} source={item.image} />
                                                        <View style={styles.activeIcon}></View>
                                                        <Text style={styles.activeFriendText}>{truncatedFirstName}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            )
                                        })
                                    }
                                </View>
                            </ScrollView>
                        </View>
                }
                <ScrollView>
                    <View style={styles.friendListContainer}>
                        {
                            filteredFriends.map((item, index) => {
                                return (
                                    <View style={styles.friendListItem} key={index}>
                                        <View style={styles.friendListContent}>
                                            <TouchableOpacity>
                                                <View style={styles.friendListCircle}>
                                                    <Image style={styles.friendListRoundImg} source={item.image} />
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity>
                                                <View>
                                                    <Text style={styles.friendListTitle}>{item.text}</Text>
                                                    <Text style={styles.message}>You: Whats up man! · 9:40 AM</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        {
                                            item.isSeen ?
                                                <Svg width="19" height="20" viewBox="0 0 19 20" fill="none">
                                                    <Path fill-rule="evenodd" clip-rule="evenodd" d="M9.60802 0.315796C14.6508 0.315796 18.7387 4.65156 18.7387 10C18.7387 15.3484 14.6508 19.6842 9.60802 19.6842C4.56529 19.6842 0.477356 15.3484 0.477356 10C0.477356 4.65156 4.56529 0.315796 9.60802 0.315796ZM9.60802 2.73685C5.82598 2.73685 2.76002 5.98868 2.76002 10C2.76002 14.0113 5.82598 17.2632 9.60802 17.2632C13.3901 17.2632 16.456 14.0113 16.456 10C16.456 5.98868 13.3901 2.73685 9.60802 2.73685ZM12.3687 6.41578L8.10816 10.9346L6.41991 9.14404L6.31239 9.04333C5.86465 8.67409 5.21725 8.70766 4.80582 9.14404C4.3601 9.61678 4.3601 10.3832 4.80582 10.856L7.30112 13.5026L7.40864 13.6033C7.85638 13.9725 8.50378 13.9389 8.91521 13.5026L13.9828 8.12773L14.0778 8.01369C14.4259 7.53881 14.3942 6.85216 13.9828 6.41578C13.5371 5.94304 12.8144 5.94304 12.3687 6.41578Z" fill="#C2C6CC" />
                                                </Svg>
                                                :
                                                <Svg width="19" height="21" viewBox="0 0 19 21" fill="none">
                                                    <Path fill-rule="evenodd" clip-rule="evenodd" d="M18.7387 10.5C18.7387 5.09342 14.6508 0.710526 9.60802 0.710526C4.56529 0.710526 0.477356 5.09342 0.477356 10.5C0.477356 15.9066 4.56529 20.2895 9.60802 20.2895C14.6508 20.2895 18.7387 15.9066 18.7387 10.5ZM2.76002 10.5C2.76002 6.44507 5.82598 3.15789 9.60802 3.15789C13.3901 3.15789 16.456 6.44507 16.456 10.5C16.456 14.5549 13.3901 17.8421 9.60802 17.8421C5.82598 17.8421 2.76002 14.5549 2.76002 10.5Z" fill="#C2C6CC" />
                                                </Svg>
                                        }
                                    </View>

                                )
                            })
                        }
                    </View>
                </ScrollView>
            </View>
        </MainWapper>
    )
}

export default Messenger

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: RPH(1.6),
    },
    icon: {
        position: "absolute",
        left: 30,
        top: 16
    },
    input: {
        backgroundColor: "rgba(0, 0, 0, 0.05)",
        marginHorizontal: 23,
        color: "#8E8E93",
        fontSize: RFS(17),
        fontFamily: "Lato-Regular",
        fontWeight: "400",
        paddingVertical: 11,
        borderRadius: 10,
        paddingHorizontal: 30
    },
    iconContainer: {
        position: "relative",
        paddingBottom: RPH(1.6),
    },
    activeFriendscontainer: {
        flexDirection: "row",
        gap: 16,
        paddingBottom: 5
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
        width: 60,
        justifyContent: "center",
        alignItems: "center",
        position: "relative"
    },
    activeRoundImg: {
        borderRadius: 50,
        width: "100%",
        objectFit: "contain",
        height: 63
    },
    activeContainer: {
        paddingHorizontal: 15
    },
    activeFriendText: {
        color: "rgba(0, 0, 0, 0.35)",
        fontSize: RFS(13),
        fontFamily: "Lato-Regular",
        fontWeight: "400",
        marginTop: 8,
        lineHeight: RLH(RFS(13))
    },
    friendListCircle: {
        width: 68,
        justifyContent: "center",
        alignItems: "center",
        position: "relative"
    },
    friendListRoundImg: {
        borderRadius: 50,
        width: "100%",
        objectFit: "contain",
        height: 73
    },
    friendListContainer: {
        marginTop: 5
    },
    friendListItem: {
        paddingHorizontal: 18,
        paddingVertical: 9,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    friendListTitle: {
        color: "#000",
        fontFamily: "Lato-Regular",
        fontSize: RFS(17),
        fontWeight: "400",
        lineHeight: RLH(RFS(17))
    },
    message: {
        color: "rgba(0, 0, 0, 0.50)",
        fontFamily: "Lato-Regular",
        fontSize: RFS(14),
        fontWeight: "400",
        lineHeight: RLH(RFS(14))
    },
    friendListContent: {
        flexDirection: "row",
        alignItems: "center",
        gap: 13
    }
})