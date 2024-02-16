import { ScrollView, View, ActivityIndicator, StyleSheet } from 'react-native'

import AuthContainer from '../../../components/auth/authContainer/authContainer'
import SignInForm from '../../../components/auth/signInForm/signInForm'
import AuthContent from '../../../components/auth/authContent/authContent'
import SafeAreaViewComponent from '../../../components/app/SafeAreaViewComponent/SafeAreaViewComponent'

import useSliceSelector from '../../../hooks/useSliceSelector'

const SignIn = () => {
  const isLoading = useSliceSelector(state => state.auth.isLoading)

  return (
    <SafeAreaViewComponent>
      {isLoading ?
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View> :
        <ScrollView nestedScrollEnabled>
          <AuthContainer>
            <AuthContent spacing={4} children={<SignInForm />} />
          </AuthContainer>
        </ScrollView>
      }
    </SafeAreaViewComponent>
  )
}

export default SignIn

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})