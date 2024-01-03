import { StyleSheet, Text, Image, View, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from "react-native"
import Checkbox from "expo-checkbox";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import commonStyles from "../styles/commonStyles."
import InputField from "./InputField"
import RootStackParamListInterface from "../interaces/RootStackParamListInterface";
import Dropdown from "./dropdown";

const SignUpForm = () => {
    const userIcon = <Image style={styles.leftIcon} source={require('../assets/icons/user.png')} />;
    const keyIcon = <Image style={styles.leftIcon} source={require('../assets/icons/key.png')} />;
    const eyeIcon = <Image style={styles.rightIcon} source={require('../assets/icons/eye.png')} />;

    const navigation = useNavigation<StackNavigationProp<RootStackParamListInterface>>();

    const [isChecked, setChecked] = useState(false);

    const navigateToSignUp = () => {
        navigation.navigate("SignIn")
    }

    const handleDay = (value: string) => {
        console.log(`Selected option: ${value}`);
    };

    const handleMonth = (value: string) => {
        console.log(`Selected option: ${value}`);
    };

    const handleYear = (value: string) => {
        console.log(`Selected option: ${value}`);
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <View>
                        <Text style={commonStyles.heading}>Create an Account</Text>
                        <TouchableOpacity onPress={navigateToSignUp}>
                            <Text style={styles.signInButton}>Or sign in</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.fieldConainer}>
                        <InputField placeholder="Email" type="email" />
                        <InputField placeholder="Confirm Email" type="email" />
                        <InputField placeholder="Password" leftIcon={keyIcon} rightIcon={eyeIcon} secureTextEntry={true} type="password" />
                        <InputField placeholder="Confirm Password" rightIcon={eyeIcon} secureTextEntry={true} type="password" />
                        <InputField placeholder="Name" leftIcon={userIcon} type="text" />
                        <InputField placeholder="Nickname" type="text" />
                        <InputField placeholder="Lastname" type="text" />
                        <View style={styles.dobContainer}>
                            <Text>Birthday</Text>
                            <Dropdown options={["DD", "2", "3"]} onSelect={handleDay} style={styles.dropdown} textStyle={styles.dropdownText} />
                            <Dropdown options={["MM", "2", "3"]} onSelect={handleMonth} style={styles.dropdown} textStyle={styles.dropdownText} />
                            <Dropdown options={["YY", "2", "3"]} onSelect={handleYear} style={styles.dropdown} textStyle={styles.dropdownText} />
                        </View>
                        <InputField placeholder="Address (optional)" type="text" />
                        <View style={styles.termsContainer}>
                            <Checkbox
                                style={styles.checkbox}
                                value={isChecked}
                                onValueChange={setChecked}
                                color={isChecked ? '#000' : undefined}
                            />
                            <Text>I agree to the Terms of Service and Privacy Policy.</Text>
                        </View>
                        <TouchableOpacity style={styles.nextButton}>
                            <Image source={require('../assets/icons/forward.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default SignUpForm

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
    signInButton: {
        color: "#385DFF",
        fontFamily: "Roboto-Regular",
        fontSize: 12,
        fontWeight: "400",
        alignSelf: "flex-end"
    },
    checkbox: {
        marginRight: 8,
    },
    dropdown: {
        width: 58,
        height: 25,
        padding: 6,
        justifyContent: "center"
    },
    dropdownText: {
        fontSize: 9
    },
    dobContainer: {
        flexDirection: "row",
        gap: 15,
        alignItems: "center"
    },
    termsContainer: {
        flexDirection: "row",
        gap: 6
    },
    nextButton: {
        backgroundColor: "#385DFF",
        borderRadius: 10,
        width: 45,
        height: 45,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        marginTop: 48,
        marginBottom: 37
    },
})