import { View } from "react-native";

import AuthContentInterface from "./interfaces/AuthContentInterface";

const AuthContent = ({ spacing, children }: AuthContentInterface) => {
    return (
        <View style={{ marginTop: spacing }}>
            {children}
        </View>
    )
}

export default AuthContent