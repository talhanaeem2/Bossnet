import { View, StyleSheet, TextInput } from "react-native"
import { useRef, useState } from "react"

import TextBold from "../../../app/textComponent/textBold/textBold"
import TextRegular from "../../../app/textComponent/textRegular/textRegular"
import AuthLogoHeader from "../../authLogoHeader/authLogoHeader"

import messages from "../../../../constants/messages"
import { RFS, RLS, RPH, RPW } from "../../../../constants/utils"

import AccountRecoveryVerificationFormProps from "./interfaces/accountRecoveryVerificationFormProps";

const AccountRecoveryCodeForm = (props: AccountRecoveryVerificationFormProps) => {
    const { formik } = props
    const [selectedLanguage, setSelectedLanguage] = useState<string | undefined>();
    const [verificationCode, setVerificationCode] = useState(["", "", "", "", ""]);

    const inputRefs = [
        useRef<TextInput>(null),
        useRef<TextInput>(null),
        useRef<TextInput>(null),
        useRef<TextInput>(null),
        useRef<TextInput>(null),
    ];

    const handleChange = (value: string, index: number) => {
        const updatedCode = [...verificationCode];
        updatedCode[index] = value;

        setVerificationCode(updatedCode);

        if (value && index < 4) {
            inputRefs[index + 1].current?.focus();
        }

        formik.setFieldValue("verificationCode", updatedCode.join(""));
    };

    const handleBackspace = (index: number) => {
        if (verificationCode[index] === "" && index > 0) {
            inputRefs[index - 1].current?.focus();
        }
    };

    return (
        <View style={styles.inner}>
            <AuthLogoHeader selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} />
            <View>
                <TextBold fontSize={23}>
                    {messages.verification}
                </TextBold>
                <TextRegular fontSize={15}>
                    {messages.verificationContent}
                </TextRegular>
            </View>
            <View style={styles.fieldContainer}>
                {verificationCode.map((value, index) => (
                    <TextInput
                        key={index}
                        value={value}
                        style={styles.codeInput}
                        onChangeText={(text) => handleChange(text, index)}
                        onBlur={() => formik.handleBlur("verificationCode")}
                        ref={inputRefs[index]}
                        keyboardType="numeric"
                        maxLength={1}
                        onKeyPress={(e) => {
                            if (e.nativeEvent.key === "Backspace") {
                                handleBackspace(index);
                            }
                        }}
                        textAlign="center"
                    />
                ))}
            </View>
            {formik.touched.verificationCode && formik.errors.verificationCode && (
                <TextRegular fontSize={12} color="red" style={styles.fieldError}>
                    {formik.errors.verificationCode}
                </TextRegular>
            )}
        </View>
    )
}

export default AccountRecoveryCodeForm

const styles = StyleSheet.create({
    inner: {
        justifyContent: 'space-between',
    },
    fieldContainer: {
        paddingTop: RPH(4),
        flexDirection: 'row',
        gap: RPH(2),
        justifyContent: 'center'
    },
    fieldError: {
        marginLeft: RPW(6),
        marginTop: RPH(2),
        letterSpacing: RLS(RFS(18))
    },
    codeInput: {
        width: RPW(10),
        height: RPH(5),
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#eee",
        textAlign: "center",
        fontSize: RFS(18),
        backgroundColor: '#fff'
    },
})