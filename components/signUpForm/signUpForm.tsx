import { StyleSheet, View, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, TouchableOpacity, GestureResponderEvent } from "react-native"
import Checkbox from "expo-checkbox";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Formik } from 'formik';
import * as Yup from 'yup';

import InputField from "../inputField/InputField"
import RootStackParamListInterface from "../../interaces/RootStackParamListInterface";
import messages from "../../constants/messages";
import { RPH, RPW } from "../../constants/utils";
import FormValuesInterface from "./interfaces/signUpFormInterface";
import Icons from "../../constants/icons";
import TextBold from "../textComponent/textBold/textBold";
import TextRegular from "../textComponent/textRegular/textRegular";

const SignUpForm = () => {
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
                        <TextBold fontSize={23}>
                            {messages.createAcc}
                        </TextBold>
                        <TouchableOpacity onPress={navigateToSignIn}>
                            <TextRegular fontSize={12} color="#385DFF" style={styles.signInButton}>
                                {messages.signIn}
                            </TextRegular>
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
                                        <TextRegular fontSize={12} color="red" style={styles.fieldError}>
                                            {errors.email}
                                        </TextRegular>
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
                                        <TextRegular fontSize={12} color="red" style={styles.fieldError}>
                                            {errors.confirmEmail}
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
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                        value={values.password}
                                    />
                                    {
                                        touched.password && errors.password &&
                                        <TextRegular fontSize={12} color="red" style={styles.fieldError}>
                                            {errors.password}
                                        </TextRegular>
                                    }
                                </View>
                                <View>
                                    <InputField
                                        placeholder={messages.cofirmPass}
                                        rightIcon={Icons.eyeIcon}
                                        secureTextEntry={true}
                                        type="password"
                                        onChangeText={handleChange('confirmPassword')}
                                        onBlur={handleBlur('confirmPassword')}
                                        value={values.confirmPassword}
                                    />
                                    {
                                        touched.confirmPassword && errors.confirmPassword &&
                                        <TextRegular fontSize={12} color="red" style={styles.fieldError}>
                                            {errors.confirmPassword}
                                        </TextRegular>
                                    }
                                </View>
                                <View>
                                    <InputField
                                        placeholder={messages.name}
                                        leftIcon={Icons.userIcon}
                                        type="text"
                                        onChangeText={handleChange('name')}
                                        onBlur={handleBlur('name')}
                                        value={values.name}
                                    />
                                    {
                                        touched.name && errors.name &&
                                        <TextRegular fontSize={12} color="red" style={styles.fieldError}>
                                            {errors.name}
                                        </TextRegular>
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
                                        <TextRegular fontSize={12} color="red" style={styles.fieldError}>
                                            {errors.nickName}
                                        </TextRegular>
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
                                        <TextRegular fontSize={12} color="red" style={styles.fieldError}>
                                            {errors.lastName}
                                        </TextRegular>
                                    }
                                </View>
                                <View style={styles.dobContainer}>
                                    <TextBold fontSize={14}>
                                        {messages.birthday}
                                    </TextBold>
                                    <TouchableOpacity onPress={showDatepicker} style={styles.datePickerButton}>
                                        <TextBold fontSize={14}>
                                            {values.birthday instanceof Date ? values.birthday.toDateString() : values.birthday}
                                        </TextBold>
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
                                        <TextRegular fontSize={12} color="red" style={styles.fieldError}>
                                            {errors.birthday as string}
                                        </TextRegular>
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
                                <View>
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
                                        <TextRegular fontSize={12} color="#4F555E" style={styles.agreeText}>
                                            {messages.agree}
                                        </TextRegular>
                                    </View>
                                    <View>
                                        {
                                            touched.agreeToTerms && errors.agreeToTerms &&
                                            <TextRegular fontSize={12} color="red" style={styles.fieldError}>
                                                {errors.agreeToTerms}
                                            </TextRegular>
                                        }
                                    </View>
                                </View>
                                <TouchableOpacity onPress={(e: GestureResponderEvent) => handleSubmit()} style={styles.nextButton}>
                                    {Icons.forwardIcon}
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