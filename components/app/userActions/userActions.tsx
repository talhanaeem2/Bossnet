import { View, StyleSheet, TouchableOpacity, Image, Pressable } from "react-native"
import { memo } from "react";

import TextRegular from "../textComponent/textRegular/textRegular";

import icons from "../../../constants/icons"
import messages from "../../../constants/messages"
import { RPW, RPH } from "../../../constants/utils"

import UserActionsInterface from "./interfaces/userActionsInterface"
import UserActionsProps from "./interfaces/userActionsProps"
import OverlayActionsInterface from "./interfaces/overlayActions"

import useSliceSelector from "../../../hooks/useSliceSelector"
import useReducerDispatch from "../../../hooks/useReducerDispatch"
import { setCommentModal } from "../../../reducers/app/appSlice"

const UserActions = (props: UserActionsProps) => {
    const { onLongPress, showOverlay, closeOverlay } = props
    const isCommentModalVisible = useSliceSelector(state => state.app.commentModal.isVisible)
    const dispatch = useReducerDispatch()

    const handleAction = (actionType: string) => {
        if (actionType === 'like' || actionType === 'love' || actionType === 'sad' || actionType === 'shock' || actionType === 'laugh' || actionType === 'angry') {
            closeOverlay();
        }
    };

    const handleLike = () => {
        console.log('Liked!');
    }

    const handleComment = () => {
        console.log('Commented!');
        dispatch(setCommentModal({ isVisible: !isCommentModalVisible }))
    }

    const handleShare = () => {
        console.log('Shared!');
    }

    const userActions: UserActionsInterface[] = [
        {
            icon: icons.likeIcon,
            text: messages.likeAction,
            onPress: handleLike,
            onLongPress: onLongPress
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

    const overlayActions: OverlayActionsInterface[] = [
        {
            icon: require("../../../assets/icons/like.gif"),
            onPress: () => handleAction('like')
        },
        {
            icon: require("../../../assets/icons/love.gif"),
            onPress: () => handleAction('love')
        },
        {
            icon: require("../../../assets/icons/sad.gif"),
            onPress: () => handleAction('sad')
        },
        {
            icon: require("../../../assets/icons/shocked.gif"),
            onPress: () => handleAction('shock')
        },
        {
            icon: require("../../../assets/icons/laugh.gif"),
            onPress: () => handleAction('laugh')
        },
        {
            icon: require("../../../assets/icons/angry.gif"),
            onPress: () => handleAction('angry')
        }
    ];

    return (
        <View style={styles.userActions}>
            <View style={styles.actionsContainer}>
                {userActions.map((item, index) => {
                    return (
                        <Pressable
                            key={index}
                            onPress={item.onPress}
                            onLongPress={item.onLongPress}
                            style={({ pressed }) => [
                                styles.action,
                                pressed && styles.actionOnPress
                            ]}
                        >
                            {item.icon}
                            <TextRegular
                                fontSize={11}
                                color="rgba(95, 99, 117, 0.74)"
                                style={styles.actionText}
                            >
                                {item.text}
                            </TextRegular>
                        </Pressable>
                    )
                })}
            </View>
            {showOverlay && (
                <View style={styles.overlayContainer}>
                    {overlayActions.map((item, index) => {
                        return (
                            <TouchableOpacity key={index} onPress={item.onPress} >
                                <Image style={styles.overlayImg} source={item.icon} />
                            </TouchableOpacity>
                        )
                    })}
                </View>
            )
            }
        </View>
    )
}

export default memo(UserActions)

const styles = StyleSheet.create({
    overlayImg: {
        width: 30,
        height: 30
    },
    userActions: {
        flexDirection: "row",
        gap: RPW(16.5),
        justifyContent: "center",
        paddingTop: RPH(.3),
        position: "relative"
    },
    action: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: RPH(1.6),
        paddingHorizontal: RPW(4)
    },
    actionOnPress: {
        backgroundColor: "#eee",
        borderRadius: 12
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
        top: -46,
        paddingHorizontal: 12,
        paddingBottom: 8,
        paddingTop: 6,
        borderRadius: 16,
        left: RPW(16),
        backgroundColor: '#fefefe',
        alignItems: 'center',
        flexDirection: "row",
        gap: 10,
        borderColor: "#eee",
        borderWidth: 1
    }
})