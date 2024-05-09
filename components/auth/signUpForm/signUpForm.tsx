import { StyleSheet, View, TouchableOpacity } from "react-native"
import { memo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import axios from "axios";

import AuthHeader from "../authHeader/authHeader";
import TextRegular from "../../app/textComponent/textRegular/textRegular";
import SignUpDob from "./signUpDob/SignUpDob";
import SignUpEmail from "./signUpEmail/signUpEmail";
import SignUpName from "./signUpName/signUpName";
import SignUpPassword from "./signUpPassword/signUpPassword";
import SignUpProfilePicture from "./signUpProfilePicture/signUpProfilePicture";

import { RPH, RPW } from "../../../constants/utils/utils";
import Apis from "../../../constants/apis";
import useReducerDispatch from "../../../hooks/useReducerDispatch";
import { setIsLoading } from "../../../reducers/auth/authSlice";

import RootStackParamListInterface from "../../../interfaces/RootStackParamListInterface";
import SignUpFormInterface from "./interfaces/signUpFormInterface";

const SignUpForm = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamListInterface>>();
    const dispatch = useReducerDispatch();
    const [currentStep, setCurrentStep] = useState(1);

    const handleSignUp = async (values: SignUpFormInterface) => {

        try {
            const birthdayDate = moment(values.birthday);

            let data = JSON.stringify({
                "userName": values.userName,
                "email": values.email,
                "firstName": values.firstName,
                "lastName": values.lastName,
                "nickName": values.userName,
                "password": values.password,
                "day": birthdayDate.format('DD'),
                "month": birthdayDate.format('MM'),
                "year": birthdayDate.format('YYYY')

            });

            let config = {
                method: 'POST',
                url: Apis.signupApi,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };
            dispatch(setIsLoading(true))

            const response = await axios.request(config);

            dispatch(setIsLoading(false))
            navigation.navigate('SignIn', {
                prefillUsername: values.userName,
                prefillPassword: values.password
            });

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const goBackToPreviousStep = () => {
        setCurrentStep((prev) => Math.max(1, prev - 1));
    };

    const navigateNext = () => {
        switch (currentStep) {
            case 1:
                emailFormik.handleSubmit();
                break;
            case 2:
                passwordFormik.handleSubmit();
                break;
            case 3:
                nameFormik.handleSubmit();
                break;
            case 4:
                dobFormik.handleSubmit();
                break;
            case 5:
                const allValues = {
                    ...emailFormik.values,
                    ...passwordFormik.values,
                    ...nameFormik.values,
                    ...dobFormik.values
                }
                handleSignUp(allValues);
                break;
        }
    };

    const emailFormik = useFormik({
        initialValues: {
            email: '',
            confirmEmail: '',
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().email('Invalid email').required('Email is required'),
            confirmEmail: Yup.string().required('Email is required')
                .oneOf([Yup.ref('email'), ""], 'Emails must match'),
        }),
        onSubmit: () => {
            setCurrentStep(prevState => prevState + 1)
            passwordFormik.setErrors({})
            passwordFormik.setTouched({})
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
            setCurrentStep(prevState => prevState + 1)
            nameFormik.setErrors({});
            nameFormik.setTouched({});
        },
    });

    const nameFormik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            userName: "",
        },
        validationSchema: Yup.object().shape({
            firstName: Yup.string().required('First Name is required'),
            lastName: Yup.string().required('Last Name is required'),
            userName: Yup.string().required('User Name is required'),
        }),
        onSubmit: () => {
            setCurrentStep(prevState => prevState + 1)
            dobFormik.setErrors({});
            dobFormik.setTouched({});
        },
    });

    const dobFormik = useFormik({
        initialValues: {
            birthday: new Date(),
            agreeToTerms: false
        },
        validationSchema: Yup.object().shape({
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
        }),
        onSubmit: () => {
            setCurrentStep(prevState => prevState + 1)
        },
    });

    const formJSX = () => {
        switch (currentStep) {
            case 1:
                return <SignUpEmail formik={emailFormik} />;
            case 2:
                return <SignUpPassword formik={passwordFormik} />;
            case 3:
                return <SignUpName formik={nameFormik} />;
            case 4:
                return <SignUpDob formik={dobFormik} />;
            case 5:
                return <SignUpProfilePicture />;
        }
    }

    const buttonText = currentStep === 5 ? "Continue" : "Next";

    return (
        <View style={styles.inner}>
            <AuthHeader currentStep={currentStep} goBackToPreviousStep={goBackToPreviousStep} />
            {formJSX()}
            <TouchableOpacity style={styles.nextButton} onPress={navigateNext}>
                <TextRegular fontSize={18} color='#fff'>
                    {buttonText}
                </TextRegular>
            </TouchableOpacity>
            {currentStep === 5 && (
                <TouchableOpacity style={styles.nextButton} onPress={navigateNext}>
                    <TextRegular fontSize={18} color='#fff'>Skip</TextRegular>
                </TouchableOpacity>
            )}
        </View>
    )
}

export default memo(SignUpForm)

const styles = StyleSheet.create({
    fieldConainer: {
        paddingTop: RPH(4),
        gap: RPH(3)
    },
    inner: {
        justifyContent: 'space-between'
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
        backgroundColor: "#308AFF",
        borderRadius: 34,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        marginTop: 33,
        width: '100%',
        paddingVertical: 11
    },
    datePickerButton: {
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: RPH(.6),
        paddingHorizontal: RPW(2),
        borderColor: "#6C6363"
    },
    agreeText: {
        alignSelf: "center",
        flex: 1
    }
})