import { View, StyleSheet, TouchableOpacity, Image } from "react-native"

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
    const { onLongPress, showOverlay } = props
    const isCommentModalVisible = useSliceSelector(state => state.app.commentModal.isVisible)
    const dispatch = useReducerDispatch()

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

    const handleLove = () => {
        console.log('Love!');
    }

    const handleSad = () => {
        console.log('Sad!');
    }

    const handleShock = () => {
        console.log('Shock!');
    }

    const handleLaugh = () => {
        console.log('Laugh!');
    }

    const handleAngry = () => {
        console.log('Angry!');
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
            onPress: handleLike
        },
        {
            icon: require("../../../assets/icons/love.gif"),
            onPress: handleLove
        },
        {
            icon: require("../../../assets/icons/sad.gif"),
            onPress: handleSad
        },
        {
            icon: require("../../../assets/icons/shocked.gif"),
            onPress: handleShock
        },
        {
            icon: require("../../../assets/icons/laugh.gif"),
            onPress: handleLaugh
        },
        {
            icon: require("../../../assets/icons/angry.gif"),
            onPress: handleAngry
        }
    ];

    return (
        <View style={styles.userActions}>
            <View style={styles.actionsContainer}>
                {userActions.map((item, index) => {
                    return (
                        <TouchableOpacity
                            key={index}
                            onPress={item.onPress}
                            style={styles.action}
                            onLongPress={item.onLongPress}
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

export default UserActions

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
        top: -52,
        paddingHorizontal: 12,
        paddingBottom: 8,
        paddingTop: 6,
        borderRadius: 16,
        left: RPW(12.8),
        backgroundColor: '#fff',
        justifyContent: "space-evenly",
        alignItems: 'center',
        flexDirection: "row",
        gap: 8,
        borderColor: "rgba(0, 0, 0, 0.26)",
        borderWidth: 1
    }
})