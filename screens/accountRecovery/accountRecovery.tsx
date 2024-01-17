import { ScrollView } from "react-native"

import AuthContainer from "../../components/auth/authContainer/authContainer"
import AuthContent from "../../components/auth/authContent/authContent"
import AccountRecoveryForm from "../../components/accountRecoveryForm/accountRecoveryForm"
import SafeAreaViewComponent from "../../components/SafeAreaViewComponent/SafeAreaViewComponent"

const AccountRecovery = () => {
    return (
        <SafeAreaViewComponent>
            <ScrollView nestedScrollEnabled>
                <AuthContainer>
                    <AuthContent spacing={4} children={<AccountRecoveryForm />} />
                </AuthContainer>
            </ScrollView>
        </SafeAreaViewComponent>
    )
}

export default AccountRecovery