import { ScrollView } from "react-native"

import AuthContainer from "../../../components/auth/authContainer/authContainer"
import AuthContent from "../../../components/auth/authContent/authContent"
import SafeAreaViewComponent from "../../../components/app/SafeAreaViewComponent/SafeAreaViewComponent"
import SignUpForm from "../../../components/auth/signUpForm/signUpForm"

const SignUp = () => {
    return (
        <SafeAreaViewComponent>
            <ScrollView nestedScrollEnabled>
                <AuthContainer>
                    <AuthContent spacing={4} children={<SignUpForm />} />
                </AuthContainer>
            </ScrollView>
        </SafeAreaViewComponent>
    )
}

export default SignUp