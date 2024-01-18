import { ColorValue } from "react-native";
import { StyleProps } from "react-native-reanimated";

export default interface TextProps {
    fontSize: number;
    fontFamily: string;
    color?: ColorValue;
    children: string;
    style?: StyleProps;
}