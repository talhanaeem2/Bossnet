import { View } from "react-native";

import AuthHeader from "./authHeader";
import AuthContentInterface from "../interaces/AuthContentInterface";

const AuthContent = ({ spacing, children }: AuthContentInterface) => {
    return (
        <>
            <AuthHeader />
            <View style={{ marginTop: spacing }}>
                {children}
            </View>
        </>
    )
}

export default AuthContent