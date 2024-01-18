import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from "react-native"
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import RootStackParamListInterface from "../../interaces/RootStackParamListInterface";

import SafeAreaViewComponent from "../../components/SafeAreaViewComponent/SafeAreaViewComponent"
import { RFS, RPH } from "../../constants/utils"
import FriendsInterface from "../friends/interfaces/friendsInterface";
import { ScrollView } from "react-native-gesture-handler";
import MainWapper from "../../components/mainWrapper/mainWrapper";

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
                                                    user: { user: { userName: item.text } }
                                                })}>
                                            <View style={styles.friendContainer}>
                                                <View style={styles.circle}>
                                                    <Image style={styles.roundImg} source={item.image} />
                                                </View>
                                                <View>
                                                    <Text style={styles.title}>{item.text}</Text>
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
        paddingLeft: 18,
        alignItems: "center"
    },
    input: {
        backgroundColor: "rgba(0, 0, 0, 0.05)",
        color: "rgba(0, 0, 0, 0.40)",
        fontSize: RFS(15),
        fontFamily: "Lato-Regular",
        fontWeight: "400",
        paddingVertical: 11,
        paddingHorizontal: 24,
        flex: 1
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 13
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
        gap: 8,
        marginHorizontal: 18
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