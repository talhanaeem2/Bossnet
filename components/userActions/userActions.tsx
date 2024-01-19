import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native"

import UserActionsInterface from "./interfaces/userActionsInterface";
import { RFS, RPW } from "../../constants/utils";
import icons from "../../constants/icons";
import messages from "../../constants/messages";
import TextRegular from "../textComponent/textRegular/textRegular";

const UserActions = () => {
    const handleLike = () => {
        console.log('Liked!');
    };

    const handleComment = () => {
        console.log('Commented!');
    };

    const handleShare = () => {
        console.log('Shared!');
    };

    const userActions: UserActionsInterface[] = [
        {
            icon: icons.likeIcon,
            text: messages.likeAction,
            onPress: handleLike
        },
        {
            icon: icons.commentIcon,
            text: messages.commentAction,
            onPress: handleComment
        },
        {
            icon: icons.shareIcon,
            text: messages.shareAction,
            onPress: handleShare
        },
    ];
    return (
        <View style={styles.userActions}>
            {userActions.map((item, index) => {
                return (
                    <TouchableOpacity onPress={item.onPress} style={styles.action} key={index}>
                        {item.icon}
                        <TextRegular fontSize={11} color="rgba(95, 99, 117, 0.74)" style={styles.actionText}>
                            {item.text}
                        </TextRegular>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

export default UserActions

const styles = StyleSheet.create({
    userActions: {
        flexDirection: "row",
        gap: RPW(16.5),
        justifyContent: "center"
    },
    action: {
        flexDirection: "row",
        alignItems: "center"
    },
    actionText: {
        alignContent: "center",
        paddingLeft: RPW(.9)
    }
})