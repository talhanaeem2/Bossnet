import { ScrollView } from 'react-native'

import AuthContainer from '../../../components/auth/authContainer/authContainer'
import SignInForm from '../../../components/auth/signInForm/signInForm'
import AuthContent from '../../../components/auth/authContent/authContent'
import SafeAreaViewComponent from '../../../components/app/SafeAreaViewComponent/SafeAreaViewComponent'

const SignIn = () => {
  return (
    <SafeAreaViewComponent>
      <ScrollView nestedScrollEnabled>
        <AuthContainer>
          <AuthContent spacing={4} children={<SignInForm />} />
        </AuthContainer>
      </ScrollView>
    </SafeAreaViewComponent>
  )
}

export default SignIn