import { View, TouchableOpacity, Text, StyleSheet, Image, ScrollView } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import RootStackParamListInterface from "../../interaces/RootStackParamListInterface";

import MainWapper from "../../components/mainWrapper/mainWrapper"
import Icons from "../../constants/icons"
import { RFS } from "../../constants/utils"

const ChatRoom = () => {
    const route = useRoute();
    const navigation = useNavigation<StackNavigationProp<RootStackParamListInterface>>();

    const { userName } = route.params as { userName: string }

    const goBack = () => {
        navigation.goBack();
    };

    return (
        <MainWapper headerShow={false}>
            <View style={styles.header}>
                <TouchableOpacity onPress={goBack}>
                    {Icons.backIcon}
                </TouchableOpacity>
                <View style={styles.circle}>
                    <Image style={styles.roundImg} source={require("../../assets/dummy-profile.png")} />
                </View>
                <View>
                    <Text style={styles.headerText}>{userName}</Text>
                    <Text style={styles.activeText}>Active</Text>
                </View>
            </View>
            <ScrollView>
                <View style={styles.content}>
                    <View style={styles.contentCircle}>
                        <Image style={styles.contentRoundImg} source={require("../../assets/dummy-profile.png")} />
                    </View>
                    <Text style={styles.userName}>{userName}</Text>
                </View>
            </ScrollView>
        </MainWapper>
    )
}

export default ChatRoom

const styles = StyleSheet.create({
    headerText: {
        fontSize: RFS(17),
        color: "#000",
        fontFamily: "Lato-Bold",
        fontWeight: "700"
    },
    header: {
        flexDirection: "row",
        gap: 12,
        paddingHorizontal: 11,
        paddingTop: 8,
        paddingBottom: 16,
        alignItems: "center",
        backgroundColor: "#fff"
    },
    circle: {
        width: 45,
        height: 48,
        justifyContent: "center",
        alignItems: "center",
    },
    contentCircle: {
        width: 100,
        height: 100,
        justifyContent: "center",
        alignItems: "center",
    },
    contentRoundImg: {
        borderRadius: 50,
        width: "100%",
        objectFit: "contain",
        height: 100
    },
    roundImg: {
        borderRadius: 50,
        width: "100%",
        objectFit: "contain",
        height: 48
    },
    activeText: {
        fontSize: RFS(13),
        color: "rgba(0, 0, 0, 0.35)",
        fontFamily: "Lato-Regular",
        fontWeight: "400"
    },
    content: {
        backgroundColor: "#fff",
        alignItems: "center",
        flex: 1
    },
    userName: {
        fontSize: RFS(24),
        color: "#000",
        fontFamily: "Lato-Bold",
        fontWeight: "700",
        marginTop: 10
    }
})