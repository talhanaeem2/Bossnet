import { View, TouchableOpacity, StyleSheet, Image, ScrollView } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import RootStackParamListInterface from "../../interaces/RootStackParamListInterface";

import MainWapper from "../../components/mainWrapper/mainWrapper"
import Icons from "../../constants/icons"
import { RPH, RPW } from "../../constants/utils"
import TextBold from "../../components/textComponent/textBold/textBold";
import TextRegular from "../../components/textComponent/textRegular/textRegular";
import messages from "../../constants/messages";

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
                    <TextBold fontSize={17}>
                        {userName}
                    </TextBold>
                    <TextRegular fontSize={13} color="rgba(0, 0, 0, 0.35)">
                        {messages.active}
                    </TextRegular>
                </View>
            </View>
            <ScrollView>
                <View style={styles.content}>
                    <View style={styles.contentCircle}>
                        <Image style={styles.contentRoundImg} source={require("../../assets/dummy-profile.png")} />
                    </View>
                    <TextBold fontSize={24} style={styles.userName}>
                        {userName}
                    </TextBold>
                </View>
            </ScrollView>
        </MainWapper>
    )
}

export default ChatRoom

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        gap: RPW(3),
        paddingHorizontal: RPW(2.7),
        paddingTop: RPH(1),
        paddingBottom: RPH(2),
        alignItems: "center",
        backgroundColor: "#fff"
    },
    circle: {
        width: RPW(11.5),
        height: RPH(5.8),
        justifyContent: "center",
        alignItems: "center",
    },
    contentCircle: {
        width: RPW(25.6),
        height: RPH(12.3),
        justifyContent: "center",
        alignItems: "center",
    },
    contentRoundImg: {
        borderRadius: 50,
        width: "100%",
        objectFit: "contain",
        height: RPH(12.3)
    },
    roundImg: {
        borderRadius: 50,
        width: "100%",
        objectFit: "contain",
        height: RPH(5.8)
    },
    content: {
        backgroundColor: "#fff",
        alignItems: "center",
        flex: 1
    },
    userName: {
        marginTop: RPH(1.2)
    }
})