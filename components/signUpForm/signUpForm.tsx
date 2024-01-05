import { StyleSheet, Text, Image, View, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, TouchableOpacity, GestureResponderEvent } from "react-native"
import Checkbox from "expo-checkbox";
import { FormEvent, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Formik } from 'formik';
import * as Yup from 'yup';

import commonStyles from "../../styles/commonStyles."
import InputField from "../inputField/InputField"
import RootStackParamListInterface from "../../interaces/RootStackParamListInterface";
import messages from "../../constants/messages";
import { RFS, RPH, RPW } from "../../constants/utils";
import FormValuesInterface from "./interfaces/signUpFormInterface";

const SignUpForm = () => {
    const userIcon = <Image style={styles.leftIcon} source={require('../../assets/icons/user.png')} />;
    const keyIcon = <Image style={styles.leftIcon} source={require('../../assets/icons/key.png')} />;
    const eyeIcon = <Image style={styles.rightIcon} source={require('../../assets/icons/eye.png')} />;

    const navigation = useNavigation<StackNavigationProp<RootStackParamListInterface>>();

    const [isChecked, setChecked] = useState(false);

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
        confirmEmail: Yup.string().required('Email is required')
            .oneOf([Yup.ref('email'), ""], 'Emails must match'),
        password: Yup.string().required('Password is required'),
        confirmPassword: Yup.string().required('Password is required')
            .oneOf([Yup.ref('password'), ""], 'Passwords must match'),
        name: Yup.string().required('Name is required'),
        nickName: Yup.string().required('Nick Name is required'),
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


    const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setSelectedDate(selectedDate);
        }
    };

    const showDatepicker = () => {
        setShowDatePicker(true);
    };

    const navigateToSignIn = () => {
        navigation.navigate("SignIn")
    }

    const resetForm = (values: FormValuesInterface, { resetForm }: { resetForm: () => void }) => {
        resetForm();
    }

    const initialFormValues = {
        email: "",
        confirmEmail: "",
        password: "",
        confirmPassword: "",
        name: "",
        nickName: "",
        lastName: "",
        birthday: selectedDate,
        address: "",
        agreeToTerms: false
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View>
                    <View>
                        <Text style={commonStyles.heading}>{messages.createAcc}</Text>
                        <TouchableOpacity onPress={navigateToSignIn}>
                            <Text style={styles.signInButton}>{messages.signIn}</Text>
                        </TouchableOpacity>
                    </View>
                    <Formik
                        initialValues={initialFormValues}
                        validationSchema={validationSchema}
                        onSubmit={resetForm}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                            <View style={styles.fieldConainer}>
                                <View>
                                    <InputField
                                        placeholder={messages.email}
                                        type="email"
                                        onChangeText={handleChange('email')}
                                        onBlur={handleBlur('email')}
                                        value={values.email}
                                    />
                                    {
                                        touched.email && errors.email &&
                                        <Text style={styles.fieldError}>{errors.email}</Text>
                                    }
                                </View>
                                <View>
                                    <InputField
                                        placeholder={messages.confirmEmail}
                                        type="email"
                                        onChangeText={handleChange('confirmEmail')}
                                        onBlur={handleBlur('confirmEmail')}
                                        value={values.confirmEmail}
                                    />
                                    {
                                        touched.confirmEmail && errors.confirmEmail &&
                                        <Text style={styles.fieldError}>{errors.confirmEmail}</Text>
                                    }
                                </View>
                                <View>
                                    <InputField
                                        placeholder={messages.password}
                                        leftIcon={keyIcon}
                                        rightIcon={eyeIcon}
                                        secureTextEntry={true}
                                        type="password"
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                        value={values.password}
                                    />
                                    {
                                        touched.password && errors.password &&
                                        <Text style={styles.fieldError}>{errors.password}</Text>
                                    }
                                </View>
                                <View>
                                    <InputField
                                        placeholder={messages.cofirmPass}
                                        rightIcon={eyeIcon}
                                        secureTextEntry={true}
                                        type="password"
                                        onChangeText={handleChange('confirmPassword')}
                                        onBlur={handleBlur('confirmPassword')}
                                        value={values.confirmPassword}
                                    />
                                    {
                                        touched.confirmPassword && errors.confirmPassword &&
                                        <Text style={styles.fieldError}>{errors.confirmPassword}</Text>
                                    }
                                </View>
                                <View>
                                    <InputField
                                        placeholder={messages.name}
                                        leftIcon={userIcon}
                                        type="text"
                                        onChangeText={handleChange('name')}
                                        onBlur={handleBlur('name')}
                                        value={values.name}
                                    />
                                    {
                                        touched.name && errors.name &&
                                        <Text style={styles.fieldError}>{errors.name}</Text>
                                    }
                                </View>
                                <View>
                                    <InputField
                                        placeholder={messages.nick}
                                        type="text"
                                        onChangeText={handleChange('nickname')}
                                        onBlur={handleBlur('nickname')}
                                        value={values.nickName}
                                    />
                                    {
                                        touched.nickName && errors.nickName &&
                                        <Text style={styles.fieldError}>{errors.nickName}</Text>
                                    }
                                </View>
                                <View>
                                    <InputField
                                        placeholder={messages.lastName}
                                        type="text"
                                        onChangeText={handleChange('lastName')}
                                        onBlur={handleBlur('lastName')}
                                        value={values.lastName}
                                    />
                                    {
                                        touched.lastName && errors.lastName &&
                                        <Text style={styles.fieldError}>{errors.lastName}</Text>
                                    }
                                </View>
                                <View style={styles.dobContainer}>
                                    <Text style={styles.birthdayText}>{messages.birthday}</Text>
                                    <TouchableOpacity onPress={showDatepicker} style={styles.datePickerButton}>
                                        <Text style={styles.dateText}>{values.birthday instanceof Date ? values.birthday.toDateString() : values.birthday}</Text>
                                    </TouchableOpacity>
                                    {showDatePicker && (
                                        <DateTimePicker
                                            value={values.birthday instanceof Date ? values.birthday : new Date()}
                                            mode="date"
                                            is24Hour={true}
                                            display="spinner"
                                            onChange={(event, date) => {
                                                if (date) {
                                                    handleChange('birthday');
                                                    handleDateChange(event, date);
                                                }
                                            }}
                                        />
                                    )}
                                </View>
                                <View>
                                    {
                                        touched.birthday && errors.birthday &&
                                        <Text style={styles.fieldError}>{String(errors.birthday)}</Text>
                                    }
                                </View>
                                <View>
                                    <InputField
                                        placeholder={messages.address}
                                        type="text"
                                        onChangeText={handleChange('address')}
                                        onBlur={handleBlur('address')}
                                        value={values.address}
                                    />
                                </View>
                                <View style={styles.termsContainer}>
                                    <Checkbox
                                        style={styles.checkbox}
                                        value={isChecked}
                                        onValueChange={(newValue) => {
                                            handleChange('agreeToTerms');
                                            setChecked(newValue);
                                        }}
                                        color={isChecked ? '#000' : undefined}
                                    />
                                    <Text>{messages.agree}</Text>
                                </View>
                                <View>
                                    {
                                        touched.agreeToTerms && errors.agreeToTerms &&
                                        <Text style={styles.fieldError}>{errors.agreeToTerms}</Text>
                                    }
                                </View>
                                <TouchableOpacity onPress={(e: GestureResponderEvent) => handleSubmit()} style={styles.nextButton}>
                                    <Image source={require('../../assets/icons/forward.png')} />
                                </TouchableOpacity>
                            </View>
                        )}
                    </Formik>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default SignUpForm

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
        color: "#385DFF",
        fontFamily: "Roboto-Regular",
        fontSize: RFS(12),
        fontWeight: "400",
        alignSelf: "flex-end"
    },
    checkbox: {
        marginRight: RPW(2),
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
        gap: RPW(2)
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
    birthdayText: {
        fontSize: RFS(14),
        fontFamily: "Roboto-Regular",
        fontWeight: "700",
        color: "#000"
    },
    dateText: {
        color: "#000",
        fontWeight: "700",
        fontSize: RFS(14),
        fontFamily: "Roboto-Regular",
    },
    fieldError: {
        color: "red",
        fontSize: RFS(12),
        fontFamily: "Roboto-Regular",
        marginLeft: RPW(2)
    }
})