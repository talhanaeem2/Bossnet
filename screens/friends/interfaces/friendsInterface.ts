import { ImageProps } from "react-native";

export default interface FriendsInterface {
    image: ImageProps;
    text: string;
    isSeen?: boolean;
}