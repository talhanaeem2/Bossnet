import { TouchableOpacity, View, StyleSheet, Platform } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import RootStackParamListInterface from "../../interaces/RootStackParamListInterface"

import { RPH, RPW } from "../../constants/utils"
import { footerButtons } from "./constants/footerButtons"
import TextBold from "../textComponent/textBold/textBold"
import TextRegular from "../textComponent/textRegular/textRegular"

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
                        {index === 3 &&
                            <View style={styles.notificationActive}>
                                <TextBold fontSize={6} color="#fff">
                                    99
                                </TextBold>
                            </View>
                        }
                        {item.icon}
                        <TextRegular fontSize={10} color="#888">
                            {item.text as string}
                        </TextRegular>
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
    notificationActive: {
        backgroundColor: "#FF0202",
        width: 8,
        height: 8,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        right: RPW(3)
    }
})