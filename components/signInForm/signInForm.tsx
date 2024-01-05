import { StyleSheet, Text, Image, View, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, TouchableOpacity, TextInput } from "react-native"
import { useState } from "react";
import Checkbox from 'expo-checkbox';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Picker } from '@react-native-picker/picker';

import commonStyles from "../../styles/commonStyles."
import InputField from "../inputField/InputField"
import RootStackParamListInterface from "../../interaces/RootStackParamListInterface";
import messages from "../../constants/messages";
import { languageOptions } from "../../constants/constants";
import { RFS, RPH, RPW } from "../../constants/utils";

const SignInForm = () => {
    const userIcon = <Image style={styles.leftIcon} source={require('../../assets/icons/user.png')} />;
    const keyIcon = <Image style={styles.leftIcon} source={require('../../assets/icons/key.png')} />;
    const eyeIcon = <Image style={styles.rightIcon} source={require('../../assets/icons/eye.png')} />;

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
                        <Text style={commonStyles.heading}>{messages.signInHeading}</Text>
                        <Text style={commonStyles.subHeading}>{messages.signInSubHeading}</Text>
                    </View>
                    <View style={styles.fieldConainer}>
                        <InputField placeholder={messages.name} leftIcon={userIcon} type="text" />
                        <InputField placeholder={messages.password} leftIcon={keyIcon} rightIcon={eyeIcon} secureTextEntry={true} type="password" />
                    </View>
                    <View style={styles.checkboxContainer}>
                        <Checkbox
                            style={styles.checkbox}
                            value={isChecked}
                            onValueChange={setChecked}
                            color={isChecked ? '#000' : undefined}
                        />
                        <Text style={styles.rememberText}>{messages.rememberMe}</Text>
                    </View>
                    <View style={styles.buttonSpacing}>
                        <TouchableOpacity onPress={navigateToAccountRecovery}>
                            <Text style={styles.forgotPass}>{messages.forgotPass}</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={navigateToSignUp}>
                        <Text style={styles.createAcc}>{messages.createAcc}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.nextButton}>
                        <Image source={require('../../assets/icons/forward.png')} />
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
                            <Text style={styles.termsText}>{messages.terms}</Text>
                        </TouchableOpacity>
                        <Text style={styles.andText}> {messages.and} </Text>
                        <TouchableOpacity>
                            <Text style={styles.termsText}>{messages.privacy}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default SignInForm

const styles = StyleSheet.create({
    fieldConainer: {
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
    rememberText: {
        color: "#4F555E",
        fontSize: RFS(12),
        fontWeight: "400",
        fontFamily: "Roboto-Regular",
    },
    checkbox: {
        marginRight: RPW(2)
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: RPH(4)
    },
    forgotPass: {
        color: "#4B3434",
        fontSize: RFS(13),
        fontWeight: "400",
        fontFamily: "Roboto-Regular"
    },
    createAcc: {
        color: "#385DFF",
        fontSize: RFS(13),
        fontWeight: "400",
        fontFamily: "Roboto-Regular"
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