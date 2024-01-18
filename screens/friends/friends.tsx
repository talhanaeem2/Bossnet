import { View, StyleSheet, Text, TextInput, Image, ScrollView } from "react-native"
import Svg, { Path } from "react-native-svg"
import { useState } from "react"

import { RFS, RPH } from "../../constants/utils"
import messages from "../../constants/messages"
import FriendsInterface from "./interfaces/friendsInterface"
import MainWrapper from "../../components/mainWrapper/mainWrapper"
import { TouchableOpacity } from "react-native-gesture-handler"

const friends: FriendsInterface[] = [
    {
        image: require('../../assets/dummy-profile.png'),
        text: "Martha Craig"
    },
    {
        image: require('../../assets/dummy-profile.png'),
        text: "Kieron Dotson"
    },
    {
        image: require('../../assets/dummy-profile.png'),
        text: "Zack John"
    },
    {
        image: require('../../assets/dummy-profile.png'),
        text: "Jamie Franco"
    },
    {
        image: require('../../assets/dummy-profile.png'),
        text: "Tabitha Potter"
    },
    {
        image: require('../../assets/dummy-profile.png'),
        text: "Albert Lasker"
    },
    {
        image: require('../../assets/dummy-profile.png'),
        text: "Andrew Parker"
    },
    {
        image: require('../../assets/dummy-profile.png'),
        text: "Martin Randolph"
    },
    {
        image: require('../../assets/dummy-profile.png'),
        text: "Karen Castillo"
    },
    {
        image: require('../../assets/dummy-profile.png'),
        text: "Joshua Lawrence"
    },
]

const Friends = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredFriends = friends.filter(item => {
        const itemText = item.text.toLowerCase();
        return itemText.includes(searchQuery.toLowerCase());
    });

    return (
        <MainWrapper headerText={messages.friends} icon={true}>
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
                <ScrollView>
                    <View style={styles.bodyContainer}>
                        <Text style={styles.friendsText}>
                            {
                                filteredFriends.length === 1 ?
                                    `${filteredFriends.length} Friend` :
                                    `${filteredFriends.length} Friends`
                            }
                        </Text>
                        <View style={styles.content}>
                            {
                                filteredFriends.map((item, index) => {
                                    return (
                                        <View key={index}>
                                            <View style={styles.friendContainer}>
                                                <TouchableOpacity>
                                                    <View style={styles.circle}>
                                                        <Image style={styles.roundImg} source={item.image} />
                                                    </View>
                                                </TouchableOpacity>
                                                <TouchableOpacity>
                                                    <View>
                                                        <Text style={styles.title}>{item.text}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                            {
                                                index !== filteredFriends.length - 1 &&
                                                <View style={styles.borderBottom}></View>
                                            }
                                        </View>
                                    )
                                })
                            }
                        </View>
                    </View>
                </ScrollView>
            </View>
        </MainWrapper>
    )
}

export default Friends

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: RPH(1.6)
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
        position: "relative"
    },
    friendsText: {
        color: "#000",
        fontSize: RFS(18),
        fontFamily: "Lato-Bold",
        fontWeight: "700",
        paddingLeft: 10
    },
    bodyContainer: {
        borderRadius: 24,
        borderWidth: 1,
        borderColor: "#E7E7E7",
        marginHorizontal: 10,
        paddingLeft: 10,
        paddingVertical: 22,
        marginBottom: 13,
        backgroundColor: "#fff",
        marginTop: RPH(1.6)
    },
    circle: {
        width: 45,
        justifyContent: "center",
        alignItems: "center"
    },
    roundImg: {
        borderRadius: 50,
        width: "100%",
        objectFit: "contain",
        height: 45
    },
    content: {
        marginTop: 30,
        gap: 8
    },
    friendContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 13
    },
    borderBottom: {
        borderBottomWidth: .5,
        borderBottomColor: "rgba(0, 0, 0, 0.12)",
        width: "84%",
        alignSelf: "flex-end",
        marginTop: 11
    },
    title: {
        color: "#000",
        fontSize: RFS(17),
        fontFamily: "Lato-Bold",
        fontWeight: "700"
    }
})