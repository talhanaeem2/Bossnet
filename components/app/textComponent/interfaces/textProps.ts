import { ColorValue, ViewStyle } from "react-native";

export default interface TextProps {
    fontSize: number;
    color?: ColorValue;
    children: string;
    style?: ViewStyle;
}