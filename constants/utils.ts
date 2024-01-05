import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;
export const RPW = (percentage: number) => {
    return (percentage / 100) * screenWidth;
};

const screenHeight = Dimensions.get('window').height;
export const RPH = (percentage: number) => {
    return (percentage / 100) * screenHeight;
};

const standardWidth = 430;
export const RFS = (fontSize: number) => {
    const scale = screenWidth / standardWidth;
    const newSize = fontSize * scale;
    return newSize;
};