import { KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, View, StyleSheet, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { Picker } from "@react-native-picker/picker"
import { useState } from "react"

import messages from "../../constants/messages"
import InputField from "../inputField/InputField"
import RootStackParamListInterface from "../../interaces/RootStackParamListInterface"
import { languageOptions } from "../../constants/constants"
import { RFS, RPH, RPW } from "../../constants/utils"
import TextBold from "../textComponent/textBold/textBold"
import TextRegular from "../textComponent/textRegular/textRegular"

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
                        <TouchableOpacity onPress={navigateToSignIn}>
                            <TextRegular fontSize={12} color="#385DFF">
                                {messages.signIn}
                            </TextRegular>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.requestButton}>
                            <TextBold fontSize={13} color="#fff">
                                {messages.requestReset}
                            </TextBold>
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
        fontFamily: "Roboto-Regular",
    }
})