import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native"

import UserActionsInterface from "./interfaces/userActionsInterface";
import { RFS } from "../../constants/utils";
import { commentIcon, likeIcon, shareIcon } from "../../constants/svgs";

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
            icon: likeIcon,
            text: 'Like',
            onPress: handleLike
        },
        {
            icon: commentIcon,
            text: 'Comment',
            onPress: handleComment
        },
        {
            icon: shareIcon,
            text: 'Share',
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
        gap: 60,
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
        paddingLeft: 3
    }
})