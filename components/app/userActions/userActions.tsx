import { View, StyleSheet, TouchableOpacity } from "react-native"

import TextRegular from "../textComponent/textRegular/textRegular";

import icons from "../../../constants/icons";
import messages from "../../../constants/messages";
import { RPW, RPH } from "../../../constants/utils";

import UserActionsInterface from "./interfaces/userActionsInterface";
import UserActionsProps from "./interfaces/userActionsProps";

const UserActions = (props: UserActionsProps) => {
    const { onLongPress, showOverlay } = props

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
            <View style={styles.actionsContainer}>
                {userActions.map((item, index) => {
                    return (
                        <TouchableOpacity
                            key={index}
                            onPress={index != 0 ? item.onPress : undefined}
                            style={styles.action}
                            onLongPress={index === 0 ? () => onLongPress() : undefined}
                        >
                            {item.icon}
                            <TextRegular
                                fontSize={11}
                                color="rgba(95, 99, 117, 0.74)"
                                style={styles.actionText}
                            >
                                {item.text}
                            </TextRegular>
                        </TouchableOpacity>
                    )
                })}
            </View>
            {showOverlay && (
                <View style={styles.overlayContainer}>
                    {userActions.map((item, index) => {
                        return (
                            <TouchableOpacity key={index} onPress={item.onPress} >
                                {item.icon}
                            </TouchableOpacity>
                        )
                    })}
                </View>
            )
            }
        </View>
    )
}

export default UserActions

const styles = StyleSheet.create({
    userActions: {
        flexDirection: "row",
        gap: RPW(16.5),
        justifyContent: "center",
        paddingTop: RPH(.3),
        position: "relative"
    },
    action: {
        flexDirection: "row",
        alignItems: "center"
    },
    actionText: {
        alignContent: "center",
        paddingLeft: RPW(.9)
    },
    actionsContainer: {
        flexDirection: 'row',
        gap: RPW(16.5),
        alignItems: 'center',
    },
    overlayContainer: {
        position: "absolute",
        top: -32,
        paddingHorizontal: 12,
        paddingBottom: 8,
        paddingTop: 6,
        borderRadius: 16,
        left: RPW(13.8),
        backgroundColor: '#fff',
        justifyContent: "space-evenly",
        alignItems: 'center',
        flexDirection: "row",
        gap: 12,
        borderColor: "rgba(0, 0, 0, 0.26)",
        borderWidth: 1
    }
})