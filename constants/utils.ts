import { Dimensions } from "react-native";

// Responsive Width
const screenWidth = Dimensions.get("window").width;
export const RPW = (percentage: number) => {
    return (percentage / 100) * screenWidth;
};

// Responsive Height
const screenHeight = Dimensions.get('window').height;
export const RPH = (percentage: number) => {
    return (percentage / 100) * screenHeight;
};

// Responsive Font Size
const standardWidth = 430;
export const RFS = (fontSize: number) => {
    const scale = screenWidth / standardWidth;
    const newSize = fontSize * scale;
    return newSize;
};

// Responsive Line Height
export const RLH = (fontSize: number, lineHeightMultiplier = 1.2): number =>
    Math.round(fontSize * lineHeightMultiplier);

// Truncate Text
export const truncateText = (str: string, maxLength: number) => {
    if (str.length > maxLength) {
        return str.slice(0, maxLength) + '...';
    }
    return str;
};