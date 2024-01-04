import { ScrollView } from "react-native"

import AuthContainer from "../../components/auth/authContainer/authContainer"
import AuthContent from "../../components/auth/authContent/authContent"
import SignUpForm from "../../components/signUpForm/signUpForm"

const SignUp = () => {
    return (
        <ScrollView nestedScrollEnabled>
            <AuthContainer>
                <AuthContent spacing={80} children={<SignUpForm />} />
            </AuthContainer>
        </ScrollView>
    )
}

export default SignUp