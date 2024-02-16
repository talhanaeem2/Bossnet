import { ScrollView, View, ActivityIndicator, StyleSheet } from "react-native"

import AuthContainer from "../../../components/auth/authContainer/authContainer"
import AuthContent from "../../../components/auth/authContent/authContent"
import SafeAreaViewComponent from "../../../components/app/SafeAreaViewComponent/SafeAreaViewComponent"
import SignUpForm from "../../../components/auth/signUpForm/signUpForm"

import useSliceSelector from "../../../hooks/useSliceSelector"

const SignUp = () => {
    const isLoading = useSliceSelector(state => state.auth.isLoading)

    return (
        <SafeAreaViewComponent>
            {isLoading ?
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View> :
                <ScrollView nestedScrollEnabled>
                    <AuthContainer>
                        <AuthContent spacing={4} children={<SignUpForm />} />
                    </AuthContainer>
                </ScrollView>
            }
        </SafeAreaViewComponent>
    )
}

export default SignUp

const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})