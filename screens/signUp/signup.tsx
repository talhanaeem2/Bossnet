import { ScrollView } from "react-native"

import AuthContainer from "../../components/auth/authContainer/authContainer"
import AuthContent from "../../components/auth/authContent/authContent"
import SignUpForm from "../../components/signUpForm/signUpForm"
import SafeAreaViewComponent from "../../components/SafeAreaViewComponent/SafeAreaViewComponent"

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