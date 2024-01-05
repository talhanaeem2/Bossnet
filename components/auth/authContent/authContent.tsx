import { View } from "react-native";

import AuthContentInterface from "./interfaces/AuthContentInterface";
import { RPH } from "../../../constants/utils";

const AuthContent = ({ spacing, children }: AuthContentInterface) => {
    return (
        <View style={{ marginVertical: RPH(spacing) }}>
            {children}
        </View>
    )
}

export default AuthContent