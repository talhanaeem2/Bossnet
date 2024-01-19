import { View, StyleSheet, TextInput, Image, TouchableOpacity } from "react-native"
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import RootStackParamListInterface from "../../interaces/RootStackParamListInterface";

import { RFS, RPH, RPW } from "../../constants/utils"
import FriendsInterface from "../friends/interfaces/friendsInterface";
import { ScrollView } from "react-native-gesture-handler";
import MainWapper from "../../components/mainWrapper/mainWrapper";
import TextBold from "../../components/textComponent/textBold/textBold";

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

]

const NewMessage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigation = useNavigation<StackNavigationProp<RootStackParamListInterface>>();


    const filteredFriends = friends.filter(item => {
        const itemText = item.text.toLowerCase();
        return itemText.includes(searchQuery.toLowerCase());
    });

    return (
        <MainWapper headerText="Cancel">
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="To:"
                        style={styles.input}
                        value={searchQuery}
                        onChangeText={(text) => setSearchQuery(text)}
                    />
                </View>
                <ScrollView>
                    <View style={styles.content}>
                        {
                            filteredFriends.map((item, index) => {
                                return (
                                    <View key={index}>
                                        <TouchableOpacity
                                            onPress={() =>
                                                navigation.navigate("ChatRoom", {
                                                    userName: item.text
                                                })}>
                                            <View style={styles.friendContainer}>
                                                <View style={styles.circle}>
                                                    <Image style={styles.roundImg} source={item.image} />
                                                </View>
                                                <View>
                                                    <TextBold fontSize={17}>
                                                        {item.text}
                                                    </TextBold>
                                                </View>
                                            </View>
                                            {
                                                index !== filteredFriends.length - 1 &&
                                                <View style={styles.borderBottom}></View>
                                            }
                                        </TouchableOpacity>
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

export default NewMessage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    header: {
        flexDirection: "row",
        paddingLeft: RPW(2.2),
        alignItems: "center"
    },
    input: {
        backgroundColor: "rgba(0, 0, 0, 0.05)",
        color: "#8E8E93",
        fontSize: RFS(17),
        fontFamily: "Lato-Regular",
        fontWeight: "400",
        paddingVertical: RPH(1.3),
        paddingHorizontal: RPW(7.8),
        flex: 1
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: RPH(1.6)
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
        gap: RPH(.8),
        marginHorizontal: RPH(2.2)
    },
    friendContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: RPW(3)
    },
    borderBottom: {
        borderBottomWidth: .5,
        borderBottomColor: "rgba(0, 0, 0, 0.12)",
        width: "84%",
        alignSelf: "flex-end",
        marginTop: RPH(1.3)
    }
})