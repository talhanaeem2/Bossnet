import { StyleSheet, Text, Image, View, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, TouchableOpacity, TextInput } from "react-native"
import { useState } from "react";
import Checkbox from 'expo-checkbox';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import commonStyles from "../../styles/commonStyles."
import InputField from "../inputField/InputField"
import Dropdown from "../dropdown/dropdown"
import RootStackParamListInterface from "../../interaces/RootStackParamListInterface";

const SignInForm = () => {
    const userIcon = <Image style={styles.leftIcon} source={require('../../assets/icons/user.png')} />;
    const keyIcon = <Image style={styles.leftIcon} source={require('../../assets/icons/key.png')} />;
    const eyeIcon = <Image style={styles.rightIcon} source={require('../../assets/icons/eye.png')} />;

    const [isChecked, setChecked] = useState(false);

    const navigation = useNavigation<StackNavigationProp<RootStackParamListInterface>>();

    const navigateToSignUp = () => {
        navigation.navigate("SignUp");
    }

    const handleSelect = (value: string) => {
        console.log(`Selected option: ${value}`);
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <View>
                        <Text style={commonStyles.heading}>Welcome to Bosnett</Text>
                        <Text style={commonStyles.subHeading}>Sign in with your email & password</Text>
                    </View>
                    <View style={styles.fieldConainer}>
                        <InputField placeholder="Name" leftIcon={userIcon} type="text" />
                        <InputField placeholder="Password" leftIcon={keyIcon} rightIcon={eyeIcon} secureTextEntry={true} type="password" />
                    </View>
                    <View style={styles.checkboxContainer}>
                        <Checkbox
                            style={styles.checkbox}
                            value={isChecked}
                            onValueChange={setChecked}
                            color={isChecked ? '#000' : undefined}
                        />
                        <Text style={styles.rememberText}>Remember Me</Text>
                    </View>
                    <View style={styles.buttonSpacing}>
                        <TouchableOpacity>
                            <Text style={styles.forgotPass}>Forgot password?</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={navigateToSignUp}>
                        <Text style={styles.createAcc}>Create an Account</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.nextButton}>
                        <Image source={require('../../assets/icons/forward.png')} />
                    </TouchableOpacity>
                    <Dropdown options={["English", "English", "English"]} onSelect={handleSelect} style={styles.languageDropdown} textStyle={styles.languageDropdownColor} />
                    <View style={styles.terms}>
                        <TouchableOpacity>
                            <Text style={styles.termsText}>Terms of Service</Text>
                        </TouchableOpacity>
                        <Text style={styles.andText}> and </Text>
                        <TouchableOpacity>
                            <Text style={styles.termsText}>Privacy Policy</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default SignInForm

const styles = StyleSheet.create({
    container: {
        paddingLeft: 22,
    },
    fieldConainer: {
        paddingTop: 36,
        gap: 23
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
        fontSize: 12,
        fontWeight: "400",
        fontFamily: "Roboto-Regular",
    },
    checkbox: {
        marginRight: 8,
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 25
    },
    forgotPass: {
        color: "#4B3434",
        fontSize: 13,
        fontWeight: "400",
        fontFamily: "Roboto-Regular"
    },
    createAcc: {
        color: "#385DFF",
        fontSize: 13,
        fontWeight: "400",
        fontFamily: "Roboto-Regular"
    },
    buttonSpacing: {
        marginTop: 27,
        marginBottom: 14
    },
    nextButton: {
        backgroundColor: "#385DFF",
        borderRadius: 10,
        width: 45,
        height: 45,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        marginTop: 64,
        marginBottom: 37
    },
    terms: {
        flexDirection: "row",
        marginTop: 40
    },
    termsText: {
        color: "#5F6373",
        fontSize: 15,
        fontWeight: "700",
        fontFamily: "Lato-Bold",
    },
    andText: {
        color: "#5F6373",
        fontSize: 15,
        fontWeight: "400",
        fontFamily: "Lato-Regular",
    },
    languageDropdown: {
        borderRadius: 10,
        backgroundColor: "#0000009E",
        opacity: .9,
        alignSelf: "center",
        width: 135,
        alignItems: "center"
    },
    languageDropdownColor: {
        color: "#FFFBFB"
    }
})