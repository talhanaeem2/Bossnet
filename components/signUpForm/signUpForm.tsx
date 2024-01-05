import { StyleSheet, Text, Image, View, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from "react-native"
import Checkbox from "expo-checkbox";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

import commonStyles from "../../styles/commonStyles."
import InputField from "../inputField/InputField"
import RootStackParamListInterface from "../../interaces/RootStackParamListInterface";
import messages from "../../constants/messages";
import { RFS, RPH, RPW } from "../../constants/utils";

const SignUpForm = () => {
    const userIcon = <Image style={styles.leftIcon} source={require('../../assets/icons/user.png')} />;
    const keyIcon = <Image style={styles.leftIcon} source={require('../../assets/icons/key.png')} />;
    const eyeIcon = <Image style={styles.rightIcon} source={require('../../assets/icons/eye.png')} />;

    const navigation = useNavigation<StackNavigationProp<RootStackParamListInterface>>();

    const [isChecked, setChecked] = useState(false);

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

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
                    <View style={styles.fieldConainer}>
                        <InputField placeholder={messages.email} type="email" />
                        <InputField placeholder={messages.confirmEmail} type="email" />
                        <InputField placeholder={messages.password} leftIcon={keyIcon} rightIcon={eyeIcon} secureTextEntry={true} type="password" />
                        <InputField placeholder={messages.cofirmPass} rightIcon={eyeIcon} secureTextEntry={true} type="password" />
                        <InputField placeholder={messages.name} leftIcon={userIcon} type="text" />
                        <InputField placeholder={messages.nick} type="text" />
                        <InputField placeholder={messages.lastName} type="text" />
                        <View style={styles.dobContainer}>
                            <Text style={styles.birthdayText}>{messages.birthday}</Text>
                            <TouchableOpacity onPress={showDatepicker} style={styles.datePickerButton}>
                                <Text style={styles.dateText}>{selectedDate.toDateString()}</Text>
                            </TouchableOpacity>
                            {showDatePicker && (
                                <DateTimePicker
                                    value={selectedDate}
                                    mode="date"
                                    is24Hour={true}
                                    display="spinner"
                                    onChange={handleDateChange}
                                />
                            )}
                        </View>
                        <InputField placeholder={messages.address} type="text" />
                        <View style={styles.termsContainer}>
                            <Checkbox
                                style={styles.checkbox}
                                value={isChecked}
                                onValueChange={setChecked}
                                color={isChecked ? '#000' : undefined}
                            />
                            <Text>{messages.agree}</Text>
                        </View>
                        <TouchableOpacity style={styles.nextButton}>
                            <Image source={require('../../assets/icons/forward.png')} />
                        </TouchableOpacity>
                    </View>
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
    }
})