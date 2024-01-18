import { StyleSheet, Text } from "react-native"

import TextProps from "../interfaces/textProps";
import { RFS, RLH } from "../../../constants/utils";

const TextBold = (props: TextProps) => {
    const black = "#000";
    const { color = black } = props

    return (
        <Text
            style={[styles.boldText,
            props.style, {
                fontSize: RFS(props.fontSize),
                fontFamily: `${props.fontFamily}-Bold`,
                lineHeight: RLH(RFS(props.fontSize)),
                color: color
            }]}
        >
            {props.children}
        </Text>
    )
}

export default TextBold

const styles = StyleSheet.create({
    boldText: {
        fontWeight: "700",
    }
})