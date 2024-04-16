import { StyleSheet, View, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Image } from "react-native"
import { memo, useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from "axios";

import InputField from "../../app/inputField/InputField";
import TextBold from "../../app/textComponent/textBold/textBold";
import TextRegular from "../../app/textComponent/textRegular/textRegular";

import messages from "../../../constants/messages";
import { languageOptions } from "../../../constants/constants";
import { RFS, RPH, RPW } from "../../../constants/utils";
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
    const [selectedLanguage, setSelectedLanguage] = useState();
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
            console.log('aia', JSON.stringify(response.data.token));

            if (response.data && response.data.token) {
                const token = response.data.token;

                await AsyncStorage.setItem('token', JSON.stringify(token));
                handleRememberMe(values.username, values.password);
                dispatch(login(token));
                dispatch(setIsLoading(false));
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            formik.setFieldError('password', 'Invalid password');
            formik.setFieldError('username', 'Invalid username');
            dispatch(setIsLoading(false));
        }
    };

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            selectedLanguage: selectedLanguage
        },
        validationSchema,
        onSubmit: handleSignIn
    });

    useEffect(() => {
        if (params != undefined && params.prefillUsername && params.prefillPassword) {
            handleSignIn({ username: params.prefillUsername, password: params.prefillPassword });
            handleRememberMe(params.prefillUsername, params.prefillPassword);
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
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View>
                    {/* <View style={styles.languageDropdown}>
                        <Picker
                            mode="dropdown"
                            dropdownIconColor="#FFFBFB"
                            selectedValue={selectedLanguage}
                            onValueChange={(itemValue) => {
                                setSelectedLanguage(itemValue);
                                formik.setFieldValue('selectedLanguage', itemValue);
                            }}>
                            {languageOptions.map((item, index) => {
                                return (
                                    <Picker.Item style={styles.dropdownText} key={index} label={item.label} value={item.value} />
                                )
                            })}
                        </Picker>
                    </View> */}
                    <View style={styles.logo}>
                        <Image source={require("../../../assets/bosnettLogo.png")} />
                    </View>
                    <View>
                        <TextBold fontSize={23}>
                            {messages.signInHeading}
                        </TextBold>
                    </View>
                    <View style={styles.fieldContainer}>
                        <InputField
                            placeholder={messages.name}
                            leftIcon={Icons.userIcon}
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
                            leftIcon={Icons.keyIcon}
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
                    <TouchableOpacity
                        style={styles.nextButton}
                        onPress={() => formik.handleSubmit()}
                    >
                        {Icons.forwardIcon}
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default memo(SignInForm)

const styles = StyleSheet.create({
    fieldContainer: {
        paddingTop: RPH(4),
        gap: RPH(3)
    },
    logo: {
        paddingBottom: 84,
        alignItems: 'center',
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
        marginTop: RPH(4)
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
    languageDropdown: {
        borderRadius: 10,
        width: RPW(40),
        height: RPH(5),
        alignSelf: "center",
        justifyContent: "center"
    },
    dropdownText: {
        fontSize: RFS(17),
        fontFamily: "Lato-Regular",
    }
})
