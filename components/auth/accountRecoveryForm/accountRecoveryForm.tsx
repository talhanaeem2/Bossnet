import { View, StyleSheet, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { useState } from "react"
import { useFormik } from 'formik';
import * as Yup from 'yup';

import TextBold from "../../app/textComponent/textBold/textBold"
import TextRegular from "../../app/textComponent/textRegular/textRegular"
import AccountRecoveryEmailForm from "./accountRecoveryEmailForm/accountRecoveryEmailForm";
import AccountRecoveryCodeForm from "./accountRecoveryCodeForm/accountRecoveryCodeForm";
import AuthHeader from "../authHeader/authHeader";
import AccountRecoveryPasswordForm from "./accountRecoveryPasswordForm/accountRecoveryPasswordForm";

import messages from "../../../constants/messages"
import { RFS, RPH, RPW } from "../../../constants/utils"

import RootStackParamListInterface from "../../../interfaces/RootStackParamListInterface"
import AccountRecoveryFormValuesInterface from "./interfaces/accountRecoveryFormValuesInterface";

const AccountRecoveryForm = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamListInterface>>();
    const [currentStep, setCurrentStep] = useState(1);

    const navigateToSignIn = () => {
        navigation.navigate("SignIn")
    }

    const emailFormik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email").required("Email is required"),
        }),
        onSubmit: (values) => {
            console.log("Requesting link for:", values.email);
            setCurrentStep(prevState => prevState + 1)
        },
    });

    const verificationCodeFormik = useFormik({
        initialValues: {
            verificationCode: "",
        },
        validationSchema: Yup.object({
            verificationCode: Yup.string().required('Verification code is required'),
        }),
        onSubmit: (values) => {
            console.log("Requesting link for:", values.verificationCode);
            setCurrentStep(prevState => prevState + 1)
        },
    });

    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const passwordFormik = useFormik({
        initialValues: {
            password: "",
            confirmPassword: "",
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .required("Password is required")
                .matches(
                    passwordRegex,
                    "Password must include at least one uppercase letter, one lowercase letter, one special character, and must be at least 8 characters long"
                ),
            confirmPassword: Yup.string()
                .required("Confirm your password")
                .oneOf([Yup.ref("password")], "Passwords must match"),
        }),
        onSubmit: () => {
            navigateToSignIn()
        },
    });

    const handleRecoverForm = async (values: AccountRecoveryFormValuesInterface) => {

        try {

            let data = JSON.stringify({
                "email": values.email,
                "verificationCode": values.verificationCode,
                "password": values.password,
                "confirmPassword": values.confirmPassword,

            });
            console.log(values)

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const navigateNext = () => {
        switch (currentStep) {
            case 1:
                emailFormik.handleSubmit();
                break;
            case 2:
                verificationCodeFormik.handleSubmit();
                break;
            case 3:
                passwordFormik.handleSubmit();
                const allValues = {
                    ...emailFormik.values,
                    ...verificationCodeFormik.values,
                    ...passwordFormik.values
                }
                handleRecoverForm(allValues);
        }
    };

    const formJSX = () => {
        switch (currentStep) {
            case 1:
                return <AccountRecoveryEmailForm formik={emailFormik} />;
            case 2:
                return <AccountRecoveryCodeForm formik={verificationCodeFormik} />;
            case 3:
                return <AccountRecoveryPasswordForm formik={passwordFormik} />
        }
    }

    const buttonText = currentStep === 1 ? messages.requestLink : 'Continue';

    return (
        <View style={styles.inner}>
            <AuthHeader />
            {formJSX()}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.nextButton} onPress={navigateNext}>
                    <TextRegular fontSize={18} color='#fff'>
                        {buttonText}
                    </TextRegular>
                </TouchableOpacity>
                {currentStep === 1 && (
                    <TouchableOpacity style={styles.nextButton} onPress={navigateToSignIn}>
                        <TextRegular fontSize={18} color='#fff'>
                            {messages.signInHeading}
                        </TextRegular>
                    </TouchableOpacity>
                )}
            </View>
            <View style={styles.bottomContainer}>
                <View style={styles.terms}>
                    <TouchableOpacity>
                        <TextBold fontSize={16} color="#5F6373">
                            {messages.terms}
                        </TextBold>
                    </TouchableOpacity>
                    <TextRegular fontSize={16} color="#5F6373">
                        {messages.and}
                    </TextRegular>
                    <TouchableOpacity>
                        <TextBold fontSize={16} color="#5F6373">
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
        marginTop: RPH(10),
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
    fieldError: {
        marginLeft: RPW(2),
        marginTop: RPH(.3)
    }
})