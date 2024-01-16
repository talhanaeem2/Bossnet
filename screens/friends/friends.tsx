import { View, StyleSheet, Text, TouchableOpacity } from "react-native"

import Icons from "../../constants/icons"
import { RFS, RPH } from "../../constants/utils"
import { useNavigation } from "@react-navigation/native";
import messages from "../../constants/messages";

const Friends = () => {
    const navigation = useNavigation();

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
        </View>
    )
}

export default Friends

const styles = StyleSheet.create({
    container: {
        marginTop: RPH(6.5)
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
    }
})