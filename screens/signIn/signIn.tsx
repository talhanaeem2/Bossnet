import { ScrollView } from 'react-native'

import AuthContainer from '../../components/auth/authContainer/authContainer'
import SignInForm from '../../components/signInForm/signInForm'
import AuthContent from '../../components/auth/authContent/authContent'

const SignIn = () => {
  return (
    <ScrollView>
      <AuthContainer>
        <AuthContent spacing={100} children={<SignInForm />} />
      </AuthContainer>
    </ScrollView>
  )
}

export default SignIn