import { View, StyleSheet, TextInput, Image, TouchableOpacity, ActivityIndicator } from "react-native"
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";

import MainWapper from "../../../components/app/mainWrapper/mainWrapper";
import TextBold from "../../../components/app/textComponent/textBold/textBold";

import { RPW, RFS, RPH } from "../../../constants/utils";

import RootStackParamListInterface from "../../../interfaces/RootStackParamListInterface";
import UsersInterface from "../friends/interfaces/usersInterface";

const imageSize = "thumb";

const NewMessage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigation = useNavigation<StackNavigationProp<RootStackParamListInterface>>();
    const [users, setUsers] = useState<UsersInterface[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const apiUrl = "https://bosnett.com/wp-json/buddyboss/v1/members";

        const fetchData = async () => {
            try {
                const response = await axios.get(apiUrl);
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [])

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
                            filteredUsers.map((user, index) => {
                                return (
                                    <View key={index}>
                                        <TouchableOpacity
                                            onPress={() =>
                                                navigation.navigate("ChatRoom", {
                                                    user: { userName: user.name, userImage: (user.avatar_urls)[imageSize] }
                                                })}>
                                            <View style={styles.friendContainer}>
                                                <View style={styles.circle}>
                                                    <Image style={styles.roundImg} source={{ uri: (user.avatar_urls)[imageSize] }} />
                                                </View>
                                                <View>
                                                    <TextBold fontSize={17}>
                                                        {user.name}
                                                    </TextBold>
                                                </View>
                                            </View>
                                            {
                                                index !== filteredUsers.length - 1 &&
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
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
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