import { StyleSheet, View, TouchableOpacity } from "react-native"
import { memo, useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from "axios";

import AuthLogoHeader from "../authLogoHeader/authLogoHeader";
import InputField from "../../app/inputField/InputField";
import TextBold from "../../app/textComponent/textBold/textBold";
import TextRegular from "../../app/textComponent/textRegular/textRegular";

import messages from "../../../constants/messages";
import { RPH, RPW } from "../../../constants/utils";
import Icons from "../../../constants/icons";
import Apis from "../../../constants/apis";

import useReducerDispatch from "../../../hooks/useReducerDispatch";
import { login, setIsLoading } from "../../../reducers/auth/authSlice";

import RootStackParamListInterface from "../../../interfaces/RootStackParamListInterface";
import SignInFormInterface from "./interfaces/signInFormInterface";

const SignInForm = () => {
    const route = useRoute();
    const params = route.params as { prefillUsername: string; prefillPassword: string }
    const navigation = useNavigation<StackNavigationProp<RootStackParamListInterface>>();
    const [selectedLanguage, setSelectedLanguage] = useState<string | undefined>();
    const dispatch = useReducerDispatch()

    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required')
    });

    // const handleRememberMe = async (username: string, password: string) => {
    //     const userData = {
    //         username: username,
    //         password: password
    //     };

    //     try {
    //         await AsyncStorage.setItem("userData", JSON.stringify(userData));
    //     } catch (error) {
    //         console.error("Error storing credentials:", error);
    //     }
    // };

    const loadStoredCredentials = async () => {
        try {
            const storedUserData = await AsyncStorage.getItem("userData");

            if (storedUserData) {
                const userData = JSON.parse(storedUserData);
                formik.setFieldValue('username', userData.username);
                formik.setFieldValue('password', userData.password);

                handleSignIn(userData)
            }
        } catch (error) {
            console.error("Error loading stored credentials:", error);
        }
    };

    const handleSignIn = async (values: SignInFormInterface) => {
        try {
            let data = JSON.stringify({
                "email_or_username": values.username,
                "password": values.password
            });

            let config = {
                method: 'POST',
                url: Apis.loginApi,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };
            dispatch(setIsLoading(true))

            const response = await axios.request(config);

            if (response.data && response.data.token) {
                const token = response.data.token;

                await AsyncStorage.setItem('token', JSON.stringify(token));
                // handleRememberMe(values.username, values.password);
                dispatch(login(token));
                dispatch(setIsLoading(false));
            }
        } catch (error) {
            console.error('Sign in error:', error);
            formik.setFieldError('password', 'Invalid password');
            formik.setFieldError('username', 'Invalid username');
            dispatch(setIsLoading(false));
        }
    };

    const formik = useFormik({
        initialValues: {
            username: 'ansss',
            password: 'anasnawaz',
            selectedLanguage: selectedLanguage
        },
        validationSchema,
        onSubmit: handleSignIn
    });

    useEffect(() => {
        if (params != undefined && params.prefillUsername && params.prefillPassword) {
            handleSignIn({ username: params.prefillUsername, password: params.prefillPassword });
            // handleRememberMe(params.prefillUsername, params.prefillPassword);
        }
    }, [params]);

    useEffect(() => {
        loadStoredCredentials();
    }, []);

    const navigateToSignUp = () => {
        navigation.navigate("SignUp");
    }

    const navigateToAccountRecovery = () => {
        navigation.navigate("AccountRecovery")
    }

    return (
        <View style={styles.inner}>
            <AuthLogoHeader formik={formik} selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} />
            <TextBold fontSize={23}>
                {messages.signInHeading}
            </TextBold>
            <View style={styles.fieldContainer}>
                <InputField
                    placeholder={messages.name}
                    type="text"
                    onChangeText={formik.handleChange('username')}
                    value={formik.values.username}
                />
                {formik.touched.username && formik.errors.username &&
                    <TextRegular fontSize={12} color="red">
                        {formik.errors.username}
                    </TextRegular>
                }
                <InputField
                    placeholder={messages.password}
                    rightIcon={Icons.eyeIcon}
                    secureTextEntry={true}
                    type="password"
                    onChangeText={formik.handleChange('password')}
                    value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password &&
                    <TextRegular fontSize={12} color="red">
                        {formik.errors.password}
                    </TextRegular>
                }
            </View>
            <TouchableOpacity
                style={styles.nextButton}
                onPress={() => formik.handleSubmit()}
            >
                <TextRegular fontSize={18} color='#fff'>Login</TextRegular>
            </TouchableOpacity>
            <View style={styles.buttonSpacing}>
                <TouchableOpacity onPress={navigateToAccountRecovery}>
                    <TextBold fontSize={14} color="#363636">
                        {messages.forgotPass}
                    </TextBold>
                </TouchableOpacity>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity onPress={navigateToSignUp} style={styles.newAcc}>
                    <TextBold fontSize={13} color="#308AFF">
                        {messages.createAcc}
                    </TextBold>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default memo(SignInForm)

const styles = StyleSheet.create({
    inner: {
        justifyContent: 'space-between'
    },
    footer: {
        alignSelf: 'center',
        justifyContent: 'flex-end',
        width: '100%',
        marginTop: 50
    },
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
        marginBottom: RPH(2),
        marginTop: 12,
        alignItems: "center"
    },
    nextButton: {
        backgroundColor: "#308AFF",
        borderRadius: 34,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        marginTop: 33,
        width: '100%',
        paddingVertical: 11
    },
    newAcc: {
        backgroundColor: "transparent",
        borderRadius: 34,
        alignItems: "center",
        borderWidth: 2,
        borderColor: '#308AFF',
        paddingVertical: 11,
    }
})
