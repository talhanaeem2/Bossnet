import { StyleSheet } from "react-native";

import CommonStylesInterface from "../interaces/commonStylesInterface";
import { RFS } from "../constants/utils";

const commonStyles: CommonStylesInterface = StyleSheet.create({
    heading: {
        fontFamily: "Lato-Bold",
        fontWeight: "700",
        fontSize: RFS(23),
        color: "#000",
    },
    subHeading: {
        fontFamily: "Roboto-Regular",
        fontWeight: "400",
        fontSize: RFS(15),
        color: "#000",
    },
    imageContain: {
        objectFit: "contain"
    }
})

export default commonStyles