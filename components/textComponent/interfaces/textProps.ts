import { ColorValue } from "react-native";
import { StyleProps } from "react-native-reanimated";

export default interface TextProps {
    fontSize: number;
    color?: ColorValue;
    children: string;
    style?: StyleProps;
}