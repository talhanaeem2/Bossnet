import { View, StyleSheet, Text, TouchableOpacity, TextInput, Image, ScrollView } from "react-native"
import Svg, { Path } from "react-native-svg"
import { useNavigation } from "@react-navigation/native"
import { useState } from "react"

import Icons from "../../constants/icons"
import { RFS, RPH } from "../../constants/utils"
import messages from "../../constants/messages"
import commonStyles from "../../styles/commonStyles."
import FriendsInterface from "./interfaces/friendsInterface"

const friends: FriendsInterface[] = [
    {
        image: require('../../assets/martha.png'),
        text: "Martha Craig"
    },
    {
        image: require('../../assets/kieron.png'),
        text: "Kieron Dotson"
    },
    {
        image: require('../../assets/zack.png'),
        text: "Zack John"
    },
    {
        image: require('../../assets/jamie.png'),
        text: "Jamie Franco"
    },
    {
        image: require('../../assets/tabitha.png'),
        text: "Tabitha Potter"
    },
    {
        image: require('../../assets/albert.png'),
        text: "Albert Lasker"
    },
    {
        image: require('../../assets/andrew.png'),
        text: "Andrew Parker"
    },
    {
        image: require('../../assets/martin.png'),
        text: "Martin Randolph"
    },
    {
        image: require('../../assets/karen.png'),
        text: "Karen Castillo"
    },
    {
        image: require('../../assets/josh.png'),
        text: "Joshua Lawrence"
    },
]

const Friends = () => {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');

    const filteredFriends = friends.filter(item => {
        const itemText = item.text.toLowerCase();
        return itemText.includes(searchQuery.toLowerCase());
    });

    const goBack = () => {
        navigation.goBack();
    };
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={goBack}>
                    {Icons.backIcon}
                </TouchableOpacity>
                <Text style={styles.headerText}>{messages.myFriends}</Text>
            </View>
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
                                            <View style={styles.circle}>
                                                <Image style={commonStyles.imageContain} source={item.image} />
                                            </View>
                                            <View>
                                                <Text style={styles.title}>{item.text}</Text>
                                            </View>
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
    )
}

export default Friends

const styles = StyleSheet.create({
    container: {
        marginTop: RPH(6.5),
        flex: 1,
        backgroundColor: "#FFFDFA"
    },
    header: {
        flexDirection: "row",
        gap: 15,
        paddingHorizontal: 11,
        paddingTop: 8,
        paddingBottom: 16,
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#EBEFF2",
        marginBottom: 14
    },
    headerText: {
        fontSize: RFS(23),
        color: "#000",
        fontFamily: "Lato-Bold",
        fontWeight: "700"
    },
    icon: {
        position: "absolute",
        left: 30,
        top: 16
    },
    input: {
        backgroundColor: "rgba(0, 0, 0, 0.05)",
        marginHorizontal: 23,
        marginBottom: 35,
        color: "#8E8E93",
        fontSize: RFS(17),
        fontFamily: "Lato-Regular",
        fontWeight: "400",
        paddingVertical: 11,
        borderRadius: 10,
        paddingHorizontal: 30
    },
    iconContainer: {
        position:
            "relative"
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
        backgroundColor: "#fff"
    },
    circle: {
        width: 45,
        height: 42,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center"
    },
    content: {
        marginTop: 30,
        gap: 11
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