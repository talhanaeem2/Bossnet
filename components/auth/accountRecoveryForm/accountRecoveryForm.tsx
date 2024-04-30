import { View, StyleSheet, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { useState } from "react"

import InputField from "../../app/inputField/InputField"
import TextBold from "../../app/textComponent/textBold/textBold"
import TextRegular from "../../app/textComponent/textRegular/textRegular"
import AuthLogoHeader from "../authLogoHeader/authLogoHeader"

import messages from "../../../constants/messages"
import { RFS, RPH, RPW } from "../../../constants/utils"

import RootStackParamListInterface from "../../../interfaces/RootStackParamListInterface"

const AccountRecoveryForm = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamListInterface>>();
    const [selectedLanguage, setSelectedLanguage] = useState<string | undefined>();

    const navigateToSignIn = () => {
        navigation.navigate("SignIn")
    }

    return (
        <View style={styles.inner}>
            <AuthLogoHeader selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} />
            <View>
                <TextBold fontSize={23}>
                    {messages.accountRecoveryHeading}
                </TextBold>
                <TextRegular fontSize={15}>
                    {messages.accountRecoverySubHeading}
                </TextRegular>
            </View>
            <View style={styles.fieldContainer}>
                <InputField type="email" placeholder={messages.email} />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.nextButton} onPress={navigateToSignIn}>
                    <TextRegular fontSize={18} color='#fff'>
                        {messages.signIn}
                    </TextRegular>
                </TouchableOpacity>
                <TouchableOpacity style={styles.nextButton}>
                    <TextRegular fontSize={18} color='#fff'>
                        Request Link
                    </TextRegular>
                </TouchableOpacity>
            </View>
            <View style={styles.bottomContainer}>
                <View style={styles.terms}>
                    <TouchableOpacity>
                        <TextBold fontSize={0} color="#5F6373">
                            {messages.terms}
                        </TextBold>
                    </TouchableOpacity>
                    <TextRegular fontSize={0} color="#5F6373">
                        {messages.and}
                    </TextRegular>
                    <TouchableOpacity>
                        <TextBold fontSize={0} color="#5F6373">
                            {messages.privacy}
                        </TextBold>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default AccountRecoveryForm

const styles = StyleSheet.create({
    bottomContainer: {
        marginTop: RPH(30),
        alignItems: "center"
    },
    inner: {
        justifyContent: 'space-between',
    },
    fieldContainer: {
        paddingTop: RPH(4),
    },
    requestButton: {
        backgroundColor: "#385DFF",
        borderRadius: 10,
        color: "#fff",
        paddingVertical: RPH(.9),
        paddingHorizontal: RPW(2.8)
    },
    buttonContainer: {
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: RPW(2),
        gap: RPH(2),
        marginTop: RPH(4)
    },
    terms: {
        flexDirection: "row",
        marginTop: RPH(6),
        justifyContent: "center",
        alignItems: "center"
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
        fontSize: RFS(17),
        fontFamily: "Lato-Regular",
    },
    nextButton: {
        backgroundColor: "#308AFF",
        borderRadius: 34,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        width: '100%',
        paddingVertical: 11
    },
})