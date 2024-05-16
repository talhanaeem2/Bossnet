import { StyleSheet, View, TouchableOpacity } from "react-native"
import { memo, useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFormik } from 'formik';
import * as Yup from 'yup';

import AuthLogoHeader from "../authLogoHeader/authLogoHeader";
import InputField from "../../app/common/inputField/InputField";
import TextBold from "../../app/common/textComponent/textBold/textBold";
import TextRegular from "../../app/common/textComponent/textRegular/textRegular";

import messages from "../../../constants/messages";
import { RPH, RPW } from "../../../constants/utils/utils";
import Icons from "../../../constants/icons";
import Apis from "../../../constants/apis";
import requestUtils from "../../../constants/utils/requestUtils";

import useReducerDispatch from "../../../hooks/useReducerDispatch";
import { login, setIsLoading } from "../../../reducers/auth/authSlice";

import RootStackParamListInterface from "../../../interfaces/RootStackParamListInterface";
import ResponseData from "./interfaces/responseData";
import RequestData from "./interfaces/requestData";
import { AxiosError } from "axios";
import Toast from "react-native-toast-message";

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

    const handleRememberMe = async (username: string, password: string) => {
        const userData = {
            username: username,
            password: password
        };

        try {
            await AsyncStorage.setItem("userData", JSON.stringify(userData));
        } catch (error) {
            console.error("Error storing credentials:", error);
        }
    };

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

    const showErrorToast = (errorMessage: string) => {
        Toast.show({
            type: 'error',
            text1: errorMessage,
            position: 'top',
            visibilityTime: 3000,
            autoHide: true,
            swipeable: true,
            text1Style: {
                fontSize: 13,
                fontWeight: "400",
                fontFamily: "Lato-Regular",
                color: '#000'
            },

        });
    }

    const handleAxiosError = (error: unknown) => {
        if (error instanceof AxiosError) {
            const errorMessage = error.response?.data?.message || 'An Axios error occurred';
            showErrorToast(errorMessage)
        } else if (error instanceof Error) {
            showErrorToast(error.message)
        } else {
            showErrorToast('Unknown error occurred')
        }
    };

    const handleSignIn = async (values: RequestData) => {
        try {
            dispatch(setIsLoading(true))

            const response = await requestUtils.request<ResponseData, RequestData>(
                Apis.loginApi,
                'POST',
                {
                    email_or_username: values.email_or_username,
                    password: values.password,
                }
            );
            console.log(response.token)

            if (response) {
                await AsyncStorage.setItem('token', JSON.stringify(response.token));
                handleRememberMe(values.email_or_username, values.password);
                dispatch(login(response.token));
                dispatch(setIsLoading(false));
            }
        } catch (error) {
            handleAxiosError(error)
            formik.setFieldError('password', 'Invalid password');
            formik.setFieldError('username', 'Invalid username');
            dispatch(setIsLoading(false));
        }
    };

    const formik = useFormik({
        initialValues: {
            email_or_username: 'ansss',
            password: 'Kaartoos@123',
            selectedLanguage: selectedLanguage
        },
        validationSchema,
        onSubmit: handleSignIn
    });

    useEffect(() => {
        if (params != undefined && params.prefillUsername && params.prefillPassword) {
            handleSignIn({ email_or_username: params.prefillUsername, password: params.prefillPassword });
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
                    value={formik.values.email_or_username}
                />
                {formik.touched.email_or_username && formik.errors.email_or_username &&
                    <TextRegular fontSize={12} color="red">
                        {formik.errors.email_or_username}
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
        gap: RPH(2)
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
