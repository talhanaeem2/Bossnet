import { StyleSheet, View, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from "react-native"
import { useState } from "react";
import Checkbox from 'expo-checkbox';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Picker } from '@react-native-picker/picker';

import InputField from "../inputField/InputField"
import RootStackParamListInterface from "../../interaces/RootStackParamListInterface";
import messages from "../../constants/messages";
import { languageOptions } from "../../constants/constants";
import { RFS, RPH, RPW } from "../../constants/utils";
import Icons from "../../constants/icons";
import TextBold from "../textComponent/textBold/textBold";
import TextRegular from "../textRegular/textRegular";

const SignInForm = () => {
    const [isChecked, setChecked] = useState(false);
    const navigation = useNavigation<StackNavigationProp<RootStackParamListInterface>>();

    const navigateToSignUp = () => {
        navigation.navigate("SignUp");
    }

    const navigateToAccountRecovery = () => {
        navigation.navigate("AccountRecovery")
    }

    const [selectedLanguage, setSelectedLanguage] = useState();

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View>
                    <View>
                        <TextBold fontSize={23}>
                            {messages.signInHeading}
                        </TextBold>
                        <TextRegular fontSize={15}>
                            {messages.signInSubHeading}
                        </TextRegular>
                    </View>
                    <View style={styles.fieldContainer}>
                        <InputField placeholder={messages.name} leftIcon={Icons.userIcon} type="text" />
                        <InputField placeholder={messages.password} leftIcon={Icons.keyIcon} rightIcon={Icons.eyeIcon} secureTextEntry={true} type="password" />
                    </View>
                    <View style={styles.checkboxContainer}>
                        <Checkbox
                            style={styles.checkbox}
                            value={isChecked}
                            onValueChange={setChecked}
                            color={isChecked ? '#000' : undefined}
                        />
                        <TextRegular fontSize={12} color="#4F555E">
                            {messages.rememberMe}
                        </TextRegular>
                    </View>
                    <View style={styles.buttonSpacing}>
                        <TouchableOpacity onPress={navigateToAccountRecovery}>
                            <TextRegular fontSize={13} color="#4B3434">
                                {messages.forgotPass}
                            </TextRegular>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={navigateToSignUp}>
                        <TextRegular fontSize={13} color="#385DFF">
                            {messages.createAcc}
                        </TextRegular>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate("Home")}>
                        {Icons.forwardIcon}
                    </TouchableOpacity>
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
                            <TextBold fontSize={15} color="#5F6373">
                                {messages.terms}
                            </TextBold>
                        </TouchableOpacity>
                        <TextRegular fontSize={15} color="#5F6373">
                            {messages.and}
                        </TextRegular>
                        <TouchableOpacity>
                            <TextBold fontSize={15} color="#5F6373">
                                {messages.privacy}
                            </TextBold>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default SignInForm

const styles = StyleSheet.create({
    fieldContainer: {
        paddingTop: RPH(4),
        gap: RPH(3)
    },
    leftIcon: {
        width: 19,
        height: 17,
        alignSelf: "center"
    },
    rightIcon: {
        width: 22,
        height: 12,
        alignSelf: "center"
    },
    checkbox: {
        marginRight: RPW(2)
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: RPH(4)
    },
    buttonSpacing: {
        marginBottom: RPH(2)
    },
    nextButton: {
        backgroundColor: "#385DFF",
        borderRadius: 10,
        width: RPW(13),
        height: RPH(6),
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        marginVertical: RPH(7)
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
        fontFamily: "Lato-Bold"
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