import { StyleProp, TextStyle, ViewStyle } from "react-native";

import extendedDropdownInterface from "./extendedDropdownInterface";

export default interface DropdownInterace {
    options: string[];
    onSelect: (value: string) => void;
    style?: StyleProp<ViewStyle & extendedDropdownInterface>;
    textStyle?: StyleProp<TextStyle & extendedDropdownInterface>;
}