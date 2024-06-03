import { View, StyleSheet, TouchableOpacity, Image, Pressable, ImageSourcePropType } from "react-native";
import { memo, useState } from "react";

import TextRegular from "../common/textComponent/textRegular/textRegular";

import { RPW, RPH } from "../../../constants/utils/utils";

import UserActionsInterface from "./interfaces/userActionsInterface";
import UserActionsProps from "./interfaces/userActionsProps";
import OverlayActionsInterface from "./interfaces/overlayActions";

import Icons from "../../../constants/icons";

import useSliceSelector from "../../../hooks/useSliceSelector";
import useReducerDispatch from "../../../hooks/useReducerDispatch";
import { setActivePostId, setCommentModal } from "../../../reducers/app/appSlice";

const UserActions = (props: UserActionsProps) => {
    const { onLongPress, showOverlay, closeOverlay, activeId } = props;
    const isCommentModalVisible = useSliceSelector(state => state.app.commentModal.isVisible);
    const dispatch = useReducerDispatch();
    const [selectedIcon, setSelectedIcon] = useState<string>('');
    const messages = useSliceSelector(state => state.language.messages);

    const changeIcon = (selectedIconText: string): ImageSourcePropType => {
        switch (selectedIconText) {
            case messages.likeAction:
                return require("../../../assets/icons/liked.svg");
            case messages.love:
                return require("../../../assets/icons/loved.png");
            case messages.sad:
                return require("../../../assets/icons/sadness.png");
            case messages.shock:
                return require("../../../assets/icons/shocked.png");
            case messages.laugh:
                return require("../../../assets/icons/laughed.png");
            case messages.angry:
                return require("../../../assets/icons/angered.png");
            default:
                return require("../../../assets/icons/likes.svg");
        }
    };

    const handleAction = (text: string) => {
        closeOverlay();
        setSelectedIcon(text)
    };

    const handleLike = () => {
        console.log('Liked!');
        if (selectedIcon) {
            setSelectedIcon('')
        } else {
            setSelectedIcon(messages.liked)
        }
    }

    const handleComment = () => {
        console.log('Commented!');
        dispatch(setActivePostId(activeId))
        dispatch(setCommentModal(!isCommentModalVisible))
        closeOverlay();
    }

    const handleShare = () => {
        console.log('Shared!');
        closeOverlay();
    }

    const overlayActions: OverlayActionsInterface[] = [
        {
            text: messages.liked,
            icon: require("../../../assets/icons/like.gif"),
            onPress: () => handleAction(messages.liked)
        },
        {
            text: messages.love,
            icon: require("../../../assets/icons/love.gif"),
            onPress: () => handleAction(messages.love)
        },
        {
            text: messages.sad,
            icon: require("../../../assets/icons/sad.gif"),
            onPress: () => handleAction(messages.sad)
        },
        {
            text: messages.shock,
            icon: require("../../../assets/icons/shock.gif"),
            onPress: () => handleAction(messages.shock)
        },
        {
            text: messages.laugh,
            icon: require("../../../assets/icons/laugh.gif"),
            onPress: () => handleAction(messages.laugh)
        },
        {
            text: messages.angry,
            icon: require("../../../assets/icons/angry.gif"),
            onPress: () => handleAction(messages.angry)
        }
    ];

    const userActions: UserActionsInterface[] = [
        {
            icon: changeIcon(selectedIcon),
            text: selectedIcon ? selectedIcon : messages.likeAction,
            onPress: handleLike,
            onLongPress: onLongPress
        },
        {
            icon: require("../../../assets/icons/comment.svg"),
            text: messages.commentAction,
            onPress: handleComment
        },
        {
            icon: require("../../../assets/icons/share.svg"),
            text: messages.shareAction,
            onPress: handleShare
        },
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
                        >{
                                item.text === messages.likeAction ? Icons.likeIcon :
                                    item.text === messages.liked ? Icons.likedIcon :
                                        item.text === messages.commentAction ? Icons.commentIcon :
                                            item.text === messages.shareAction ? Icons.shareIcon :
                                                <Image
                                                    source={item.icon}
                                                    style={{ width: 20, height: 20 }}
                                                />
                            }
                            <TextRegular
                                fontSize={11}
                                color={index === 0 ?
                                    (selectedIcon === messages.laugh || selectedIcon === messages.sad || selectedIcon === messages.shock ? "#fcba03" :
                                        selectedIcon === messages.angry || selectedIcon === messages.love ? "#fc0303" :
                                            selectedIcon === messages.likeAction ? "#308AFF" :
                                                "rgba(95, 99, 117, 0.74)") :
                                    "rgba(95, 99, 117, 0.74)"}
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
        width: 40,
        height: 40
    },
    userActions: {
        flexDirection: "row",
        justifyContent: "center",
        position: "relative",
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
        gap: RPW(6),
        alignItems: 'center'
    },
    overlayContainer: {
        position: "absolute",
        top: RPH(-7),
        paddingHorizontal: 12,
        paddingBottom: 8,
        paddingTop: 6,
        borderRadius: 16,
        left: RPW(10),
        backgroundColor: '#fefefe',
        alignItems: 'center',
        flexDirection: "row",
        gap: 10,
        borderColor: "#eee",
        borderWidth: 1
    }
})