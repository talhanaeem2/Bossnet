import { ScrollView } from "react-native"

import AuthContainer from "../components/authContainer"
import AuthContent from "../components/authContent"
import SignUpForm from "../components/signUpForm"

const SignUp = () => {
    return (
        <ScrollView>
            <AuthContainer>
                <AuthContent spacing={80} children={<SignUpForm />} />
            </AuthContainer>
        </ScrollView>
    )
}

export default SignUp