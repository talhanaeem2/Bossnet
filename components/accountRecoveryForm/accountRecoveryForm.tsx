import { KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { Picker } from "@react-native-picker/picker"
import { useState } from "react"

import commonStyles from "../../styles/commonStyles."
import messages from "../../constants/messages"
import InputField from "../inputField/InputField"
import RootStackParamListInterface from "../../interaces/RootStackParamListInterface"
import { languageOptions } from "../../constants/constants"
import { RFS, RPH, RPW } from "../../constants/utils"

const AccountRecoveryForm = () => {
    const [selectedLanguage, setSelectedLanguage] = useState();
    const navigation = useNavigation<StackNavigationProp<RootStackParamListInterface>>();
    const navigateToSignIn = () => {
        navigation.navigate("SignIn")
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View>
                    <View>
                        <Text style={commonStyles.heading}>{messages.accountRecoveryHeading}</Text>
                        <Text style={commonStyles.subHeading}>{messages.accountRecoverySubHeading}</Text>
                    </View>
                    <View style={styles.fieldContainer}>
                        <InputField type="email" placeholder={messages.email} />
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={navigateToSignIn}>
                            <Text style={styles.signInButton}>{messages.signIn}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.requestButton}>
                            <Text style={styles.requestText}>Request Reset Link</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bottomContainer}>
                        <View style={styles.languageDropdown}>
                            <Picker
                                mode="dropdown"
                                dropdownIconColor="#FFFBFB"
                                selectedValue={selectedLanguage}
                                onValueChange={(itemValue) =>
                                    setSelectedLanguage(itemValue)
                                }>
                                {languageOptions.map((item, index) => {
                                    return (
                                        <Picker.Item style={styles.dropdownText} key={index} label={item.label} value={item.value} />
                                    )
                                })}
                            </Picker>
                        </View>
                        <View style={styles.terms}>
                            <TouchableOpacity>
                                <Text style={styles.termsText}>{messages.terms}</Text>
                            </TouchableOpacity>
                            <Text style={styles.andText}> {messages.and} </Text>
                            <TouchableOpacity>
                                <Text style={styles.termsText}>{messages.privacy}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default AccountRecoveryForm

const styles = StyleSheet.create({
    bottomContainer: {
        marginTop: RPH(30),
        alignItems: "center"
    },
    fieldContainer: {
        paddingTop: RPH(4),
    },
    signInButton: {
        color: "#385DFF",
        fontFamily: "Roboto-Regular",
        fontSize: RFS(12),
        fontWeight: "400",
    },
    requestText: {
        color: "#fff",
        fontFamily: "Roboto-Regular",
        fontSize: RFS(13),
        fontWeight: "700",
    },
    requestButton: {
        backgroundColor: "#385DFF",
        borderRadius: 10,
        color: "#fff",
        paddingVertical: RPH(.9),
        paddingHorizontal: RPW(2.8)
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: RPW(2),
        paddingTop: RPH(2)
    },
    terms: {
        flexDirection: "row",
        marginTop: RPH(6),
        justifyContent: "center",
        alignItems: "center"
    },
    termsText: {
        color: "#5F6373",
        fontSize: RFS(15),
        fontWeight: "700",
        fontFamily: "Lato-Bold",
    },
    andText: {
        color: "#5F6373",
        fontSize: RFS(15),
        fontWeight: "400",
        fontFamily: "Lato-Regular",
    },
    languageDropdown: {
        borderRadius: 10,
        backgroundColor: "#0000009E",
        opacity: .9,
        width: RPW(40),
        height: RPH(5),
        alignSelf: "center",
        justifyContent: "center"
    },
    dropdownText: {
        // color: "#FFFBFB",
        fontSize: RFS(17),
        fontFamily: "Roboto-Regular",
    }
})