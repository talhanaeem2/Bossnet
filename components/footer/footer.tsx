import { TouchableOpacity, View, Image, StyleSheet, Text, Platform } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import RootStackParamListInterface from "../../interaces/RootStackParamListInterface"

import { RFS, RPH, RPW } from "../../constants/utils"
import { footerButtons } from "./constants/footerButtons"

const Footer = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamListInterface>>();

    const handlePress = (screenName: string) => {
        navigation.navigate(screenName);
    };

    return (
        <View style={styles.container}>
            {footerButtons.map((item, index) => {
                return (
                    <TouchableOpacity
                        key={index}
                        style={styles.buttonContainer}
                        onPress={() => handlePress(item.screenName)}
                    >
                        {item.icon}
                        <Text style={styles.btnText}>{item.text}</Text>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

export default Footer

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        gap: RPW(6),
        paddingHorizontal: RPW(2.7),
        paddingTop: RPH(2),
        backgroundColor: '#FFF',
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 2,
        borderRadius: 10,
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(0, 0, 0, 0.25)',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 1,
                shadowRadius: 0,
            },
            android: {
                elevation: 2,
            },
        }),
    },
    buttonContainer: {
        flex: 1,
        alignItems: "center"
    },
    btnText: {
        color: "#888",
        fontSize: RFS(10),
        fontWeight: "400",
        fontFamily: "Lato-Regular"
    }
})