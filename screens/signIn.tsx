import { ScrollView } from 'react-native'

import AuthContainer from '../components/authContainer'
import SignInForm from '../components/signInForm'
import AuthContent from '../components/authContent'

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