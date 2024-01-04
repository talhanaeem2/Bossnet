import { ScrollView } from 'react-native'

import AuthContainer from '../../components/auth/authContainer/authContainer'
import SignInForm from '../../components/signInForm/signInForm'
import AuthContent from '../../components/auth/authContent/authContent'

const SignIn = () => {
  return (
    <ScrollView nestedScrollEnabled>
      <AuthContainer>
        <AuthContent spacing={50} children={<SignInForm />} />
      </AuthContainer>
    </ScrollView>
  )
}

export default SignIn