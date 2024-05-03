import { View, StyleSheet } from "react-native"
import { useState } from "react"

import InputField from "../../../app/inputField/InputField"
import TextBold from "../../../app/textComponent/textBold/textBold"
import TextRegular from "../../../app/textComponent/textRegular/textRegular"
import AuthLogoHeader from "../../authLogoHeader/authLogoHeader"

import messages from "../../../../constants/messages"
import { RPH, RPW } from "../../../../constants/utils"

import AccountRecoveryVerificationFormProps from "./interfaces/accountRecoveryVerificationFormProps";

const AccountRecoveryCodeForm = (props: AccountRecoveryVerificationFormProps) => {
    const { formik } = props
    const [selectedLanguage, setSelectedLanguage] = useState<string | undefined>();

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
                <InputField
                    type="numeric"
                    value={formik.values.verificationCode}
                    onChangeText={formik.handleChange("verificationCode")}
                    onBlur={formik.handleBlur("verificationCode")}
                />
                {formik.touched.verificationCode && formik.errors.verificationCode && (
                    <TextRegular fontSize={12} color="red" style={styles.fieldError}>
                        {formik.errors.verificationCode}
                    </TextRegular>
                )}
            </View>
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
    },
    fieldError: {
        marginLeft: RPW(2),
        marginTop: RPH(.3)
    }
})