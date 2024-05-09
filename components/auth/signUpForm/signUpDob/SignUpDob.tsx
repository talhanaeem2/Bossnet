import { StyleSheet, View, TouchableOpacity } from "react-native"
import { memo, useCallback, useState } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";
import Checkbox from "expo-checkbox";

import AuthLogoHeader from "../../authLogoHeader/authLogoHeader";
import TextBold from "../../../app/textComponent/textBold/textBold";
import TextRegular from "../../../app/textComponent/textRegular/textRegular";

import { RPH, RPW } from "../../../../constants/utils/utils";
import messages from "../../../../constants/messages";

import SignUpDobProps from "./interfaces/signUpDobProps";

const SignUpDob = (props: SignUpDobProps) => {
    const { formik } = props
    const [selectedLanguage, setSelectedLanguage] = useState<string | undefined>();
    const [isChecked, setChecked] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);

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

    return (
        <View style={styles.inner}>
            <AuthLogoHeader selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} />
            <View>
                <TextBold fontSize={23}>
                    What's your birthday
                </TextBold>
            </View>
            <View style={styles.fieldContainer}>
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
        </View>
    )
}

export default memo(SignUpDob)

const styles = StyleSheet.create({
    agreeText: {
        alignSelf: "center",
        flex: 1
    },
    inner: {
        justifyContent: 'space-between'
    },
    fieldError: {
        marginLeft: RPW(2),
        marginTop: RPH(.3)
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
    datePickerButton: {
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: RPH(.6),
        paddingHorizontal: RPW(2),
        borderColor: "#6C6363"
    }
})
