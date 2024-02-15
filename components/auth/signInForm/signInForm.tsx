import { StyleSheet, View, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, TouchableOpacity, ActivityIndicator } from "react-native"
import { memo, useEffect, useState } from "react";
import Checkbox from 'expo-checkbox';
import { useNavigation } from "@react-navigation/native";
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
import useReducerDispatch from "../../../hooks/useReducerDispatch";
import { login } from "../../../reducers/auth/authSlice";

import RootStackParamListInterface from "../../../interfaces/RootStackParamListInterface";
import SignInFormInterface from "./interfaces/signInFormInterface";

const SignInForm = () => {
    const [isChecked, setChecked] = useState(false);
    const navigation = useNavigation<StackNavigationProp<RootStackParamListInterface>>();
    const [selectedLanguage, setSelectedLanguage] = useState();
    const dispatch = useReducerDispatch()
    const [isLoading, setIsLoading] = useState(false)

    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required')
    });

    const handleSignIn = async (values: SignInFormInterface) => {
        try {
            let data = JSON.stringify({
                "email_or_username": values.username,
                "password": values.password
            });

            let config = {
                method: 'POST',
                url: 'https://bosnett.com/api/public/api/login',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };
            setIsLoading(true)

            const response = await axios.request(config);
            console.log(JSON.stringify(response.data));

            if (response.data && response.data.data.auth.jwt) {
                const token = response.data.data.auth.jwt;

                await AsyncStorage.setItem('token', token);
                dispatch(login(token))
                setIsLoading(false)
            }
        } catch (error) {
            console.error('Error fetching data:', error);
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
        const loadStoredCredentials = async () => {
            try {
                const storedUsername = await AsyncStorage.getItem("username");
                const storedPassword = await AsyncStorage.getItem("password");

                if (storedUsername && storedPassword) {
                    formik.setFieldValue('username', storedUsername)
                    formik.setFieldValue('password', storedPassword)
                    setChecked(true);
                }
            } catch (error) {
                console.error("Error loading stored credentials:", error);
            }
        };

        loadStoredCredentials();
    }, []);

    const handleRememberMe = async () => {
        if (isChecked) {
            try {
                await AsyncStorage.setItem("username", formik.values.username);
                await AsyncStorage.setItem("password", formik.values.password);
            } catch (error) {
                console.error("Error storing credentials:", error);
            }
        } else {
            try {
                await AsyncStorage.removeItem("username");
                await AsyncStorage.removeItem("password");
            } catch (error) {
                console.error("Error removing stored credentials:", error);
            }
        }
    };

    const navigateToSignUp = () => {
        navigation.navigate("SignUp");
    }

    const navigateToAccountRecovery = () => {
        navigation.navigate("AccountRecovery")
    }

    if (isLoading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        )
    }

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
                    <View style={styles.checkboxContainer}>
                        <Checkbox
                            style={styles.checkbox}
                            value={isChecked}
                            onValueChange={(value) => {
                                setChecked(value)
                                handleRememberMe()
                            }}
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
                    <TouchableOpacity
                        style={styles.nextButton}
                        onPress={() => formik.handleSubmit()}
                    >
                        {Icons.forwardIcon}
                    </TouchableOpacity>
                    <View style={styles.languageDropdown}>
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

export default memo(SignInForm)

const styles = StyleSheet.create({
    fieldContainer: {
        paddingTop: RPH(4),
        gap: RPH(3)
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
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
        fontSize: RFS(17),
        fontFamily: "Lato-Regular",
    }
})
