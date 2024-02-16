import { StyleSheet, View, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from "react-native"
import Checkbox from "expo-checkbox";
import { memo, useCallback, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import axios from "axios";

import RootStackParamListInterface from "../../../interfaces/RootStackParamListInterface";
import InputField from "../../app/inputField/InputField";
import TextBold from "../../app/textComponent/textBold/textBold";
import TextRegular from "../../app/textComponent/textRegular/textRegular";

import Icons from "../../../constants/icons";
import messages from "../../../constants/messages";
import { RPH, RPW } from "../../../constants/utils";

import SignUpFormInterface from "./interfaces/signUpFormInterface";
import useReducerDispatch from "../../../hooks/useReducerDispatch";
import { setIsLoading } from "../../../reducers/auth/authSlice";

const SignUpForm = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamListInterface>>();
    const [isChecked, setChecked] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const dispatch = useReducerDispatch();

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
        confirmEmail: Yup.string().required('Email is required')
            .oneOf([Yup.ref('email'), ""], 'Emails must match'),
        password: Yup.string().required('Password is required'),
        confirmPassword: Yup.string().required('Password is required')
            .oneOf([Yup.ref('password'), ""], 'Passwords must match'),
        firstName: Yup.string().required('First Name is required'),
        nickname: Yup.string().required('Nick Name is required'),
        lastName: Yup.string().required('Last Name is required'),
        birthday: Yup.string()
            .required('Birthday is required')
            .test('is-adult', 'You must be 18 years old or older', function (value) {
                const minAge = 18;
                const today = new Date();
                const birthDate = new Date(value);

                // Calculate age
                const age = today.getFullYear() - birthDate.getFullYear();
                const monthDiff = today.getMonth() - birthDate.getMonth();

                // Check if birthday has occurred this year or not
                if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                    return age - 1 >= minAge;
                }

                return age >= minAge;
            }),
        agreeToTerms: Yup.boolean().oneOf([true], 'You must agree to terms').required('You must agree to terms'),
    });

    const handleSignUp = async (values: SignUpFormInterface) => {

        try {
            const birthdayDate = moment(values.birthday);

            let data = JSON.stringify({
                "userName": values.nickname,
                "email": values.email,
                "firstName": values.firstName,
                "lastName": values.lastName,
                "nickName": values.nickname,
                "password": values.password,
                "day": birthdayDate.format('DD'),
                "month": birthdayDate.format('MM'),
                "year": birthdayDate.format('YYYY')

            });

            let config = {
                method: 'POST',
                url: 'https://bosnett.com/api/public/api/signup',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };
            dispatch(setIsLoading(true))

            const response = await axios.request(config);
            console.log(JSON.stringify(response.data));
            dispatch(setIsLoading(false))
            navigation.navigate('SignIn', {
                prefillUsername: values.nickname,
                prefillPassword: values.password
            });

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const formik = useFormik({
        initialValues: {
            email: "",
            confirmEmail: "",
            password: "",
            confirmPassword: "",
            firstName: "",
            nickname: "",
            lastName: "",
            birthday: new Date(),
            address: "",
            agreeToTerms: false
        },
        validationSchema,
        onSubmit: (values: SignUpFormInterface) => {
            handleSignUp(values)
        }
    })

    const handleDateChange = useCallback((selectedDate: Date) => {
        if (selectedDate) {
            const formattedDate = moment(selectedDate).startOf('day').toDate();
            formik.setFieldValue('birthday', formattedDate)
            setShowDatePicker(false);
        }
    }, [formik.setFieldValue])

    const showDatepicker = () => {
        setShowDatePicker(true);
    };

    const navigateToSignIn = () => {
        navigation.navigate("SignIn", {})
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View>
                    <View>
                        <TextBold fontSize={23}>
                            {messages.createAcc}
                        </TextBold>
                        <TouchableOpacity onPress={navigateToSignIn}>
                            <TextRegular fontSize={12} color="#385DFF" style={styles.signInButton}>
                                {messages.signIn}
                            </TextRegular>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.fieldConainer}>
                        <View>
                            <InputField
                                placeholder={messages.email}
                                type="email"
                                onChangeText={formik.handleChange('email')}
                                onBlur={formik.handleBlur('email')}
                                value={formik.values.email}
                            />
                            {
                                formik.touched.email && formik.errors.email &&
                                <TextRegular fontSize={12} color="red" style={styles.fieldError}>
                                    {formik.errors.email}
                                </TextRegular>
                            }
                        </View>
                        <View>
                            <InputField
                                placeholder={messages.confirmEmail}
                                type="email"
                                onChangeText={formik.handleChange('confirmEmail')}
                                onBlur={formik.handleBlur('confirmEmail')}
                                value={formik.values.confirmEmail}
                            />
                            {
                                formik.touched.confirmEmail && formik.errors.confirmEmail &&
                                <TextRegular fontSize={12} color="red" style={styles.fieldError}>
                                    {formik.errors.confirmEmail}
                                </TextRegular>
                            }
                        </View>
                        <View>
                            <InputField
                                placeholder={messages.password}
                                leftIcon={Icons.keyIcon}
                                rightIcon={Icons.eyeIcon}
                                secureTextEntry={true}
                                type="password"
                                onChangeText={formik.handleChange('password')}
                                onBlur={formik.handleBlur('password')}
                                value={formik.values.password}
                            />
                            {
                                formik.touched.password && formik.errors.password &&
                                <TextRegular fontSize={12} color="red" style={styles.fieldError}>
                                    {formik.errors.password}
                                </TextRegular>
                            }
                        </View>
                        <View>
                            <InputField
                                placeholder={messages.cofirmPass}
                                rightIcon={Icons.eyeIcon}
                                secureTextEntry={true}
                                type="password"
                                onChangeText={formik.handleChange('confirmPassword')}
                                onBlur={formik.handleBlur('confirmPassword')}
                                value={formik.values.confirmPassword}
                            />
                            {
                                formik.touched.confirmPassword && formik.errors.confirmPassword &&
                                <TextRegular fontSize={12} color="red" style={styles.fieldError}>
                                    {formik.errors.confirmPassword}
                                </TextRegular>
                            }
                        </View>
                        <View>
                            <InputField
                                placeholder={messages.firstName}
                                leftIcon={Icons.userIcon}
                                type="text"
                                onChangeText={formik.handleChange('firstName')}
                                onBlur={formik.handleBlur('firstName')}
                                value={formik.values.firstName}
                            />
                            {
                                formik.touched.firstName && formik.errors.firstName &&
                                <TextRegular fontSize={12} color="red" style={styles.fieldError}>
                                    {formik.errors.firstName}
                                </TextRegular>
                            }
                        </View>
                        <View>
                            <InputField
                                placeholder={messages.nick}
                                type="text"
                                onChangeText={formik.handleChange('nickname')}
                                onBlur={formik.handleBlur('nickname')}
                                value={formik.values.nickname}
                            />
                            {
                                formik.touched.nickname && formik.errors.nickname &&
                                <TextRegular fontSize={12} color="red" style={styles.fieldError}>
                                    {formik.errors.nickname}
                                </TextRegular>
                            }
                        </View>
                        <View>
                            <InputField
                                placeholder={messages.lastName}
                                type="text"
                                onChangeText={formik.handleChange('lastName')}
                                onBlur={formik.handleBlur('lastName')}
                                value={formik.values.lastName}
                            />
                            {
                                formik.touched.lastName && formik.errors.lastName &&
                                <TextRegular fontSize={12} color="red" style={styles.fieldError}>
                                    {formik.errors.lastName}
                                </TextRegular>
                            }
                        </View>
                        <View style={styles.dobContainer}>
                            <TextBold fontSize={14}>
                                {messages.birthday}
                            </TextBold>
                            <TouchableOpacity onPress={showDatepicker} style={styles.datePickerButton}>
                                <TextBold fontSize={14}>
                                    {moment(formik.values.birthday).format('MMMM DD YYYY')}
                                </TextBold>
                            </TouchableOpacity>
                            {showDatePicker && (
                                <DateTimePicker
                                    value={formik.values.birthday}
                                    mode="date"
                                    display="spinner"
                                    onChange={(event, date) => {
                                        if (date) {
                                            formik.setFieldValue('birthday', date)
                                            handleDateChange(date);
                                        }
                                    }}
                                />
                            )}
                        </View>
                        <View>
                            {
                                formik.touched.birthday && formik.errors.birthday &&
                                <TextRegular fontSize={12} color="red" style={styles.fieldError}>
                                    {formik.errors.birthday as string}
                                </TextRegular>
                            }
                        </View>
                        <View>
                            <InputField
                                placeholder={messages.address}
                                type="text"
                                onChangeText={formik.handleChange('address')}
                                onBlur={formik.handleBlur('address')}
                                value={formik.values.address}
                            />
                        </View>
                        <View>
                            <View style={styles.termsContainer}>
                                <Checkbox
                                    style={styles.checkbox}
                                    value={isChecked}
                                    onValueChange={(newValue) => {
                                        formik.handleChange('agreeToTerms')(newValue.toString());
                                        setChecked(newValue);
                                    }}
                                    color={isChecked ? '#000' : undefined}
                                />
                                <TextRegular fontSize={12} color="#4F555E" style={styles.agreeText}>
                                    {messages.agree}
                                </TextRegular>
                            </View>
                            <View>
                                {
                                    formik.touched.agreeToTerms && formik.errors.agreeToTerms && (
                                        <TextRegular fontSize={12} color="red" style={styles.fieldError}>
                                            {formik.errors.agreeToTerms}
                                        </TextRegular>
                                    )
                                }
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => formik.handleSubmit()} style={styles.nextButton}>
                            {Icons.forwardIcon}
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default memo(SignUpForm)

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
    signInButton: {
        alignSelf: "flex-end"
    },
    checkbox: {
        marginRight: RPW(1),
        alignSelf: "center"
    },
    dobContainer: {
        flexDirection: "row",
        gap: RPW(5),
        alignItems: "center",
        paddingLeft: RPW(4)
    },
    termsContainer: {
        flexDirection: "row",
        gap: RPW(1.4)
    },
    nextButton: {
        backgroundColor: "#385DFF",
        borderRadius: 10,
        width: RPW(13),
        height: RPH(6),
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        marginTop: RPH(6)
    },
    datePickerButton: {
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: RPH(.6),
        paddingHorizontal: RPW(2),
        borderColor: "#6C6363"
    },
    fieldError: {
        marginLeft: RPW(2),
        marginTop: RPH(.3)
    },
    agreeText: {
        alignSelf: "center",
        flex: 1
    }
})