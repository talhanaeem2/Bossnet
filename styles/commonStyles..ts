import { StyleSheet } from "react-native";

import CommonStylesInterface from "../interaces/commonStylesInterface";

const commonStyles: CommonStylesInterface = StyleSheet.create({
    heading: {
        fontFamily: "Lato-Bold",
        fontWeight: "700",
        fontSize: 23,
        color: "#000",
    },
    subHeading: {
        fontFamily: "Roboto-Regular",
        fontWeight: "400",
        fontSize: 15,
        color: "#000",
    },
    inputText: {
        fontFamily: "Roboto-Regular",
        fontWeight: "400",
        fontSize: 18,
        color: "#000",
    }
})

export default commonStyles