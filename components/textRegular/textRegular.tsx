import { StyleSheet, Text } from "react-native"

import { RFS, RLH } from "../../constants/utils";
import TextProps from "../textComponent/interfaces/textProps";

const TextBold = (props: TextProps) => {
    const black = "#000";
    const { color = black } = props

    return (
        <Text
            style={[styles.regularText,
            props.style, {
                fontSize: RFS(props.fontSize),
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
    regularText: {
        fontWeight: "400",
        fontFamily: "Lato-Regular"
    }
})