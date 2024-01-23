import { View, StyleSheet, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"

import TextBold from "../textComponent/textBold/textBold"
import TextRegular from "../textComponent/textRegular/textRegular"

import Icons from "../../../constants/icons"
import messages from "../../../constants/messages"
import { RPW, RPH } from "../../../constants/utils"

import RootStackParamListInterface from "../../../interaces/RootStackParamListInterface"

const Header = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamListInterface>>()

    return (
        <View style={styles.container}>
            <View style={styles.headingsContainer}>
                <View>
                    <TextBold fontSize={23} >
                        {messages.headerTitle}
                    </TextBold>
                    <TextRegular fontSize={15} style={styles.subHeading}>
                        {messages.headerSubTitle}
                    </TextRegular>
                </View>
                <View style={styles.imagesContainer}>
                    <TouchableOpacity>
                        {Icons.searchIcon}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("Messenger")}>
                        {Icons.messagesIcon}
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        paddingLeft: RPW(8),
        paddingRight: RPW(5)
    },
    headingsContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    imagesContainer: {
        flexDirection: "row",
        gap: RPW(5)
    },
    subHeading: {
        paddingTop: RPH(1)
    }
})