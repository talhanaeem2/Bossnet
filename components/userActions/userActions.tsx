import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native"

import UserActionsInterface from "./interfaces/userActionsInterface";
import { RFS, RPW } from "../../constants/utils";
import icons from "../../constants/icons";
import messages from "../../constants/messages";

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
                        <Text style={styles.actionText}>{item.text}</Text>
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
        color: "rgba(95, 99, 117, 0.74)",
        fontSize: RFS(11),
        fontFamily: "Lato-Regular",
        fontWeight: "400",
        alignContent: "center",
        paddingLeft: RPW(.9)
    }
})