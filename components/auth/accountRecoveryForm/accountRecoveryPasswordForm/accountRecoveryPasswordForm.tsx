import { View, StyleSheet } from "react-native"
import { useState } from "react"

import InputField from "../../../app/inputField/InputField"
import TextBold from "../../../app/textComponent/textBold/textBold"
import TextRegular from "../../../app/textComponent/textRegular/textRegular"
import AuthLogoHeader from "../../authLogoHeader/authLogoHeader"

import messages from "../../../../constants/messages"
import { RPH, RPW } from "../../../../constants/utils"
import Icons from "../../../../constants/icons";

import AccountRecoveryPasswordFormProps from "./interfaces/accountRecoveryPasswordFormProps";

const AccountRecoveryPasswordForm = (props: AccountRecoveryPasswordFormProps) => {
    const { formik } = props
    const [selectedLanguage, setSelectedLanguage] = useState<string | undefined>();

    return (
        <View style={styles.inner}>
            <AuthLogoHeader selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} />
            <View>
                <TextBold fontSize={23}>
                    {messages.passwordFormHeading}
                </TextBold>
                <TextRegular fontSize={15}>
                    {messages.passwordFormContent}
                </TextRegular>
            </View>
            <View style={styles.fieldContainer}>
                <InputField
                    type="password"
                    rightIcon={Icons.eyeIcon}
                    secureTextEntry={true}
                    placeholder={messages.password}
                    value={formik.values.password}
                    onChangeText={formik.handleChange("password")}
                    onBlur={formik.handleBlur("password")}
                />
                {formik.touched.password && formik.errors.password && (
                    <TextRegular fontSize={12} color="red" style={styles.fieldError}>
                        {formik.errors.password}
                    </TextRegular>
                )}
                <InputField
                    type="password"
                    rightIcon={Icons.eyeIcon}
                    secureTextEntry={true}
                    placeholder={messages.cofirmPass}
                    value={formik.values.confirmPassword}
                    onChangeText={formik.handleChange("confirmPassword")}
                    onBlur={formik.handleBlur("confirmPassword")}
                />
                {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                    <TextRegular fontSize={12} color="red" style={styles.fieldError}>
                        {formik.errors.confirmPassword}
                    </TextRegular>
                )}
            </View>
        </View>
    )
}

export default AccountRecoveryPasswordForm

const styles = StyleSheet.create({
    inner: {
        justifyContent: 'space-between',
    },
    fieldContainer: {
        paddingTop: RPH(4),
        gap: RPH(2)
    },
    fieldError: {
        marginLeft: RPW(2),
    }
})