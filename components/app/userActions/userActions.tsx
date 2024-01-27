import { View, StyleSheet, TouchableOpacity, Modal, Image, TextInput } from "react-native"
import { useState } from "react";
import { Defs, LinearGradient, Path, Stop } from "react-native-svg";

import IconContainer from "../iconContainer/iconContainer";
import TextRegular from "../textComponent/textRegular/textRegular";
import TextBold from "../textComponent/textBold/textBold";

import icons from "../../../constants/icons";
import messages from "../../../constants/messages";
import { RPW, RPH } from "../../../constants/utils";

import UserActionsInterface from "./interfaces/userActionsInterface";
import UserActionsProps from "./interfaces/userActionsProps";

const likedIcon = <IconContainer width="19" height="20" viewBox="0 0 19 20" fill="none">
    <Path d="M18.4754 9.94638C18.4754 14.6944 14.6264 18.5435 9.87834 18.5435C5.1303 18.5435 1.28125 14.6944 1.28125 9.94638C1.28125 5.19834 5.1303 1.34929 9.87834 1.34929C14.6264 1.34929 18.4754 5.19834 18.4754 9.94638Z" fill="url(#paint0_linear_1_128)" stroke="white" />
    <Path d="M9.87162 4.74815C10.3934 4.74815 11.6062 5.03531 11.6062 6.78472C11.6062 7.272 11.5481 7.57616 11.5074 7.78698C11.4994 7.82831 11.4918 7.86971 11.4847 7.91117L11.4843 7.91315C11.4811 7.93338 11.4833 7.95394 11.4905 7.97343C11.4977 7.99292 11.5098 8.01089 11.526 8.02612C11.5422 8.04135 11.5622 8.05348 11.5845 8.06169C11.6068 8.06991 11.631 8.07401 11.6554 8.07373C13.7345 8.07373 14.8447 8.53412 14.8447 9.00441C14.8447 9.21522 14.7502 9.40784 14.5957 9.55616C14.5909 9.56085 14.5874 9.56633 14.5853 9.57224C14.5833 9.57815 14.5827 9.58435 14.5838 9.59045C14.5848 9.59654 14.5874 9.60238 14.5913 9.60758C14.5952 9.61279 14.6004 9.61724 14.6065 9.62063C14.7494 9.69621 14.8673 9.80069 14.9492 9.92442C15.0312 10.0482 15.0746 10.1872 15.0754 10.3286C15.0754 10.6688 14.8499 10.9607 14.5011 11.0971C14.4946 11.0998 14.4887 11.1035 14.484 11.1082C14.4793 11.1128 14.4758 11.1183 14.4737 11.1241C14.4717 11.13 14.4711 11.1361 14.4721 11.1422C14.4731 11.1482 14.4756 11.154 14.4794 11.1592C14.5772 11.289 14.6349 11.4412 14.6349 11.6054C14.6349 11.9795 14.3764 12.294 13.9704 12.4079C13.9576 12.4116 13.947 12.4193 13.941 12.4295C13.935 12.4396 13.934 12.4513 13.9382 12.4621C13.967 12.5349 13.9845 12.6124 13.9845 12.6931C13.9845 13.1108 13.1451 13.4497 11.1723 13.4497C9.73077 13.4497 8.73633 13.2342 8.35397 13.0795C8.07275 12.9656 7.75088 12.7591 7.75088 12.154V9.74681C7.75088 9.0665 8.20367 8.61165 8.65409 8.15917C9.10121 7.71064 9.54691 7.2637 9.54691 6.59961C9.54691 6.0696 9.5039 5.73341 9.47176 5.48541C9.45333 5.33986 9.43868 5.22437 9.43868 5.11837C9.43868 4.90992 9.62017 4.74894 9.87162 4.74815ZM6.33295 9.09894H5.38767C4.91503 9.09894 4.67871 10.1613 4.67871 11.4721C4.67871 12.7829 4.91503 13.8452 5.38767 13.8452H6.33295C6.45831 13.8452 6.57852 13.8036 6.66716 13.7294C6.7558 13.6552 6.80559 13.5546 6.80559 13.4497V9.49446C6.80559 9.38956 6.7558 9.28896 6.66716 9.21478C6.57852 9.14061 6.45831 9.09894 6.33295 9.09894Z" fill="white" />
    <Defs>
        <LinearGradient id="paint0_linear_1_128" x1="9.87834" y1="-3.04946" x2="9.87834" y2="23.592" gradientUnits="userSpaceOnUse">
            <Stop stop-color="#6B79F2" />
            <Stop offset="1" stop-color="#0019FE" />
        </LinearGradient>
    </Defs>
</IconContainer>;

const cameraIcon = <IconContainer width="20" height="18" viewBox="0 0 20 18" fill="none">
    <Path d="M8.2298 9.74557C8.2298 8.51333 9.22001 7.5144 10.4415 7.5144C11.663 7.5144 12.6532 8.51333 12.6532 9.74557C12.6532 10.9778 11.663 11.9767 10.4415 11.9767C9.22001 11.9767 8.2298 10.9778 8.2298 9.74557Z" stroke="#555555" />
    <Path fill-rule="evenodd" clip-rule="evenodd" d="M5.99223 4.43285C5.99223 2.71184 7.37519 1.3167 9.08116 1.3167H11.8018C13.5077 1.3167 14.8907 2.71184 14.8907 4.43285C14.8907 4.44756 14.9019 4.45982 14.9164 4.46101L17.1081 4.64056C18.0898 4.721 18.8971 5.45336 19.0804 6.42964C19.548 8.92092 19.5828 11.4752 19.1834 13.9786L19.0878 14.5777C18.9076 15.7071 17.9862 16.5663 16.856 16.6589L14.9468 16.8153C11.9482 17.061 8.93475 17.061 5.93613 16.8153L4.02688 16.6589C2.89668 16.5663 1.97528 15.7071 1.79508 14.5777L1.69949 13.9786C1.30008 11.4752 1.33494 8.92092 1.80253 6.42964C1.98577 5.45336 2.79314 4.721 3.77486 4.64056L5.96649 4.46101C5.98103 4.45982 5.99223 4.44756 5.99223 4.43285ZM10.4415 6.02695C8.40569 6.02695 6.75535 7.69183 6.75535 9.74557C6.75535 11.7993 8.40569 13.4642 10.4415 13.4642C12.4773 13.4642 14.1276 11.7993 14.1276 9.74557C14.1276 7.69183 12.4773 6.02695 10.4415 6.02695Z" stroke="#555555" />
</IconContainer>;

const emojiIcon = <IconContainer width="18" height="18" viewBox="0 0 18 18" fill="none">
    <Path d="M9.05661 12.3997C10.1591 12.3996 11.1672 11.9995 11.9484 11.336L11.9484 11.336L11.9508 11.334C11.9675 11.3196 11.9867 11.3088 12.0071 11.3022C12.0276 11.2956 12.049 11.2931 12.0702 11.2949L12.1118 10.7966L12.0702 11.2949C12.0914 11.2966 12.1122 11.3026 12.1315 11.3127C12.1507 11.3227 12.1681 11.3366 12.1825 11.3539C12.1969 11.3711 12.208 11.3913 12.2149 11.4134C12.2218 11.4354 12.2243 11.4587 12.2222 11.4819L12.7203 11.5258L12.2222 11.4819C12.2202 11.5051 12.2136 11.5274 12.2031 11.5477C12.1926 11.568 12.1783 11.5857 12.1614 11.5999L12.1614 11.5999L12.1586 11.6022C11.2904 12.341 10.1915 12.7451 9.057 12.7436L9.05576 12.7436C7.92122 12.7449 6.8223 12.3406 5.95416 11.6016L5.95372 11.6012C5.91975 11.5724 5.89757 11.5302 5.89359 11.4834C5.8896 11.4365 5.90433 11.3907 5.93335 11.3559L5.94146 11.3462C5.95388 11.3334 5.96809 11.3229 5.9835 11.3149C6.00267 11.3048 6.02342 11.2988 6.04457 11.297L6.03878 11.2296L6.03878 11.2296L6.04458 11.297C6.06573 11.2952 6.08707 11.2976 6.10743 11.3041L6.18928 11.0492L6.10744 11.3041C6.12782 11.3107 6.14698 11.3213 6.16377 11.3356L6.16382 11.3356C6.97231 12.024 7.99729 12.4013 9.05661 12.3997ZM9.05661 12.3997C9.05652 12.3997 9.05643 12.3997 9.05634 12.3997V11.8997L9.05719 12.3997C9.057 12.3997 9.05681 12.3997 9.05661 12.3997ZM12.6467 11.7784C12.6059 11.8568 12.5502 11.9264 12.4826 11.983C11.5242 12.7986 10.3102 13.2452 9.05634 13.2436C7.80235 13.245 6.58842 12.7982 5.63005 11.9823L12.6467 11.7784ZM9.059 16.5993C13.3857 16.5993 16.8858 13.062 16.8858 8.70794C16.8858 4.35387 13.3857 0.816544 9.059 0.816544C4.73233 0.816544 1.23218 4.35387 1.23218 8.70794C1.23218 13.062 4.73233 16.5993 9.059 16.5993ZM6.06211 7.36405C6.06211 7.01014 6.14218 6.79204 6.22885 6.67549C6.30222 6.57681 6.40036 6.52016 6.56122 6.52016C6.72254 6.52016 6.82057 6.5769 6.89378 6.6754C6.98035 6.79187 7.06034 7.00996 7.06034 7.36405C7.06034 7.71795 6.98027 7.93606 6.8936 8.0526C6.82022 8.15128 6.72208 8.20794 6.56122 8.20794C6.3999 8.20794 6.30187 8.15119 6.22867 8.0527C6.14209 7.93622 6.06211 7.71813 6.06211 7.36405ZM11.0577 7.36405C11.0577 7.01014 11.1377 6.79204 11.2244 6.67549C11.2978 6.57681 11.3959 6.52016 11.5568 6.52016C11.7181 6.52016 11.8161 6.5769 11.8893 6.6754C11.9759 6.79187 12.0559 7.00996 12.0559 7.36405C12.0559 7.71795 11.9758 7.93606 11.8892 8.0526C11.8158 8.15128 11.7176 8.20794 11.5568 8.20794C11.3955 8.20794 11.2974 8.15119 11.2242 8.0527C11.1377 7.93622 11.0577 7.71813 11.0577 7.36405Z" stroke="#555555" />
</IconContainer>;

const UserActions = (props: UserActionsProps) => {
    const { onLongPress, showOverlay } = props
    const [isCommentModalVisible, setIsCommentModalVisible] = useState(false);

    const handleLike = () => {
        console.log('Liked!');
    };

    const handleComment = () => {
        console.log('Commented!');
        setIsCommentModalVisible(true);
    };

    const handleShare = () => {
        console.log('Shared!');
    };

    const userActions: UserActionsInterface[] = [
        {
            icon: icons.likeIcon,
            text: messages.likeAction,
            onPress: handleLike,
            onLongPress: !isCommentModalVisible ? onLongPress : undefined,
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
            <Modal visible={isCommentModalVisible} transparent={true}>
                <TouchableOpacity
                    style={styles.modalBackground}
                    activeOpacity={1}
                    onPress={() => setIsCommentModalVisible(false)}
                >
                    <View style={styles.commentModalContainer}>
                        <UserActions showOverlay={showOverlay} />
                        <View style={styles.likeContainer}>
                            <View style={styles.likeText}>
                                {likedIcon}
                                <TextRegular fontSize={11}>
                                    You, Anin Kale and 205 others
                                </TextRegular>
                            </View>
                            <TextRegular fontSize={11}>14 Comments</TextRegular>
                        </View>
                        <View>
                            <View style={styles.commentContainer}>
                                <View style={styles.circle}>
                                    <Image style={styles.roundImg} source={require("../../../assets/dummy-profile.png")} />
                                </View>
                                <View style={styles.commentContent}>
                                    <TextBold fontSize={12}>
                                        Amir Shenoy
                                    </TextBold>
                                    <TextRegular fontSize={12}>
                                        Beautiful place.
                                    </TextRegular>
                                </View>
                            </View>
                            <View style={styles.commentAction}>
                                <TextBold fontSize={12} color="#555">1h</TextBold>
                                <TouchableOpacity>
                                    <TextBold fontSize={12} color="#555">Like</TextBold>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <TextBold fontSize={12} color="#555">Reply</TextBold>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View>
                            <View style={styles.commentContainer}>
                                <View style={styles.circle}>
                                    <Image style={styles.roundImg} source={require("../../../assets/dummy-profile.png")} />
                                </View>
                                <View style={styles.commentContent}>
                                    <TextBold fontSize={12}>
                                        Amir Shenoy
                                    </TextBold>
                                    <TextRegular fontSize={12}>
                                        Beautiful place.
                                    </TextRegular>
                                </View>
                            </View>
                            <View style={styles.commentAction}>
                                <TextBold fontSize={12} color="#555">1h</TextBold>
                                <TouchableOpacity>
                                    <TextBold fontSize={12} color="#555">Like</TextBold>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <TextBold fontSize={12} color="#555">Reply</TextBold>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View>
                            <View style={styles.commentContainer}>
                                <View style={styles.circle}>
                                    <Image style={styles.roundImg} source={require("../../../assets/dummy-profile.png")} />
                                </View>
                                <View style={styles.commentContent}>
                                    <TextBold fontSize={12}>
                                        Amir Shenoy
                                    </TextBold>
                                    <TextRegular fontSize={12}>
                                        Beautiful place.
                                    </TextRegular>
                                </View>
                            </View>
                            <View style={styles.commentAction}>
                                <TextBold fontSize={12} color="#555">1h</TextBold>
                                <TouchableOpacity>
                                    <TextBold fontSize={12} color="#555">Like</TextBold>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <TextBold fontSize={12} color="#555">Reply</TextBold>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.writeComment}>
                            <View style={styles.circle}>
                                <Image style={styles.roundImg} source={require("../../../assets/dummy-profile.png")} />
                            </View>
                            <TextInput style={styles.input} placeholder="Write a comment.." />
                            <View style={styles.iconContainer}>
                                <TouchableOpacity>
                                    {cameraIcon}
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    {emojiIcon}
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>
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
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    commentModalContainer: {
        width: '100%',
        backgroundColor: '#fff',
        paddingVertical: 20,
        paddingHorizontal: 10,
        flex: 1,
        borderWidth: 1,
        borderColor: "#F0F0F0",
        position: "relative"
    },
    likeContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: 20,
        paddingBottom: 10,
        alignItems: "center",
        paddingHorizontal: 15
    },
    likeText: {
        flexDirection: "row",
        alignItems: "center",
        gap: 3
    },
    circle: {
        width: 40,
        justifyContent: "center",
        alignItems: "center"
    },
    roundImg: {
        borderRadius: 50,
        width: "100%",
        objectFit: "contain",
        height: 40
    },
    commentContainer: {
        flexDirection: "row",
        gap: 8,
        alignItems: "center"
    },
    commentContent: {
        paddingLeft: 8,
        paddingRight: 11,
        paddingVertical: 6,
        backgroundColor: "'rgba(221, 221, 221, 0.5)'",
        borderRadius: 10
    },
    commentAction: {
        flexDirection: "row",
        gap: 10,
        paddingTop: 8,
        paddingBottom: 12,
        paddingLeft: 48
    },
    writeComment: {
        position: "absolute",
        bottom: 40,
        left: 10,
        flexDirection: "row",
        gap: 10
    },
    input: {
        borderRadius: 10,
        backgroundColor: "'rgba(221, 221, 221, 0.5)'",
        padding: 8,
        width: "80%"
    },
    iconContainer: {
        flexDirection: "row",
        alignSelf: "center",
        gap: 10,
        position: "absolute",
        right: 30
    }
})