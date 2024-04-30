import { StyleSheet, View } from "react-native"
import { memo, useState } from "react";

import AuthLogoHeader from "../../authLogoHeader/authLogoHeader";
import InputField from "../../../app/inputField/InputField";
import TextBold from "../../../app/textComponent/textBold/textBold";
import TextRegular from "../../../app/textComponent/textRegular/textRegular";

import { RPH, RPW } from "../../../../constants/utils";
import messages from "../../../../constants/messages";

import SignUpEmailProps from "./interfaces/signUpEmailProps";

const SignUpEmail = (props: SignUpEmailProps) => {
    const { formik } = props;
    const [selectedLanguage, setSelectedLanguage] = useState<string | undefined>();

    return (
        <View style={styles.inner}>
            <AuthLogoHeader selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} />
            <View>
                <TextBold fontSize={23}>
                    What's your email
                </TextBold>
            </View>
            <View style={styles.fieldContainer}>
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
                        <TextRegular fontSize={13} color="red" style={styles.fieldError}>
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
                        <TextRegular fontSize={13} color="red" style={styles.fieldError}>
                            {formik.errors.confirmEmail}
                        </TextRegular>
                    }
                </View>
            </View>
        </View>
    )
}

export default memo(SignUpEmail)

const styles = StyleSheet.create({
    inner: {
        justifyContent: 'space-between'
    },
    fieldError: {
        marginLeft: RPW(2),
        marginTop: RPH(.5)
    },
    fieldContainer: {
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
    }
})
