import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import RootStackParamListInterface from "../../interaces/RootStackParamListInterface"

import commonStyles from "../../styles/commonStyles."
import { RFS, RPH, RPW } from "../../constants/utils"
import Icons from "../../constants/icons"
import messages from "../../constants/messages"

const Header = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamListInterface>>()

    return (
        <View style={styles.container}>
            <View style={styles.headingsContainer}>
                <View>
                    <Text style={commonStyles.heading}>{messages.headerTitle}</Text>
                    <Text style={styles.subHeading}>{messages.headerSubTitle}</Text>
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
        fontFamily: "Lato-Bold",
        fontWeight: "700",
        fontSize: RFS(13),
        color: "#000",
        paddingTop: RPH(1)
    }
})