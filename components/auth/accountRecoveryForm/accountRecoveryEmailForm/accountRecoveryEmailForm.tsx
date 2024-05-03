import { View, StyleSheet } from "react-native"
import { useState } from "react"

import InputField from "../../../app/inputField/InputField"
import TextBold from "../../../app/textComponent/textBold/textBold"
import TextRegular from "../../../app/textComponent/textRegular/textRegular"
import AuthLogoHeader from "../../authLogoHeader/authLogoHeader"

import messages from "../../../../constants/messages"
import { RPH, RPW } from "../../../../constants/utils"

import AccountRecoveryEmailFormProps from "./interfaces/accountRecoveryEmailFormProps";

const AccountRecoveryEmailForm = (props: AccountRecoveryEmailFormProps) => {
    const { formik } = props
    const [selectedLanguage, setSelectedLanguage] = useState<string | undefined>();

    return (
        <View style={styles.inner}>
            <AuthLogoHeader selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} />
            <View>
                <TextBold fontSize={23}>
                    {messages.accountRecoveryHeading}
                </TextBold>
                <TextRegular fontSize={15}>
                    {messages.accountRecoverySubHeading}
                </TextRegular>
            </View>
            <View style={styles.fieldContainer}>
                <InputField
                    type="email"
                    placeholder={messages.email}
                    value={formik.values.email}
                    onChangeText={formik.handleChange("email")}
                    onBlur={formik.handleBlur("email")}
                />
                {formik.touched.email && formik.errors.email && (
                    <TextRegular fontSize={12} color="red" style={styles.fieldError}>
                        {formik.errors.email}
                    </TextRegular>
                )}
            </View>
        </View>
    )
}

export default AccountRecoveryEmailForm

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