import { ScrollView } from "react-native"

import AuthContainer from "../../components/auth/authContainer/authContainer"
import AuthContent from "../../components/auth/authContent/authContent"
import AccountRecoveryForm from "../../components/accountRecoveryForm/accountRecoveryForm"

const AccountRecovery = () => {
    return (
        <ScrollView nestedScrollEnabled>
            <AuthContainer>
                <AuthContent spacing={4} children={<AccountRecoveryForm />} />
            </AuthContainer>
        </ScrollView>
    )
}

export default AccountRecovery