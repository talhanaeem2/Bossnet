import { ImageProps } from "react-native";

export default interface OverlayActionsInterface {
    icon: ImageProps;
    onPress: () => void;
}