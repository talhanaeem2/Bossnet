import { Modal, TouchableOpacity, View, TextInput, StyleSheet, Image, FlatList } from "react-native"
import { useRef, useState, memo } from "react"
import { Circle, Path } from "react-native-svg"
import moment from "moment"

import TextBold from "../../components/app/common/textComponent/textBold/textBold"
import TextRegular from "../../components/app/common/textComponent/textRegular/textRegular"
import IconContainer from "../../components/app/common/iconContainer/iconContainer"

import Icons from "../../constants/icons"

import useSliceSelector from "../../hooks/useSliceSelector"
import useReducerDispatch from "../../hooks/useReducerDispatch"
import { setCommentModal } from "../../reducers/app/appSlice"

import CommentsModalInterface from "./interfaces/commentsModalInterface"
import CommentsModalReplyInterface from "./interfaces/CommentsModalReplyInterface"

const likedIcon = <IconContainer width="16" height="16" viewBox="0 0 16 16" fill="none">
    <Circle cx="8" cy="8" r="8" fill="#4A5BF6" />
    <Path d="M8.15501 3.20001C8.65288 3.20001 9.81007 3.474 9.81007 5.1432C9.81007 5.60814 9.7546 5.89836 9.71582 6.09951C9.70814 6.13895 9.70092 6.17845 9.69417 6.21801L9.69372 6.2199C9.69075 6.2392 9.69276 6.25882 9.69964 6.27742C9.70651 6.29601 9.71808 6.31316 9.73356 6.32768C9.74904 6.34221 9.76807 6.35379 9.78936 6.36163C9.81066 6.36947 9.83371 6.37338 9.85697 6.37312C11.8408 6.37312 12.9001 6.8124 12.9001 7.26112C12.9001 7.46227 12.8099 7.64606 12.6625 7.78758C12.6579 7.79205 12.6546 7.79728 12.6526 7.80291C12.6506 7.80855 12.6501 7.81447 12.6511 7.82029C12.6521 7.8261 12.6545 7.83168 12.6583 7.83664C12.662 7.84161 12.667 7.84585 12.6728 7.84909C12.8092 7.92121 12.9216 8.02089 12.9998 8.13895C13.078 8.25701 13.1194 8.38965 13.1202 8.52462C13.1202 8.84918 12.9051 9.12769 12.5723 9.25789C12.566 9.26041 12.5604 9.26401 12.5559 9.26844C12.5514 9.27288 12.5481 9.27806 12.5461 9.28365C12.5442 9.28924 12.5436 9.29511 12.5446 9.30088C12.5455 9.30665 12.5479 9.31219 12.5515 9.31714C12.6449 9.44093 12.6999 9.58622 12.6999 9.74284C12.6999 10.0999 12.4532 10.3999 12.0658 10.5086C12.0536 10.5121 12.0436 10.5195 12.0378 10.5292C12.0321 10.5388 12.0311 10.55 12.0352 10.5603C12.0627 10.6297 12.0794 10.7037 12.0794 10.7807C12.0794 11.1792 11.2784 11.5026 9.39608 11.5026C8.02062 11.5026 7.07178 11.2969 6.70694 11.1494C6.43862 11.0407 6.1315 10.8437 6.1315 10.2663V7.96948C6.1315 7.32037 6.56353 6.88637 6.99331 6.45463C7.41993 6.02667 7.84519 5.60022 7.84519 4.96658C7.84519 4.46088 7.80415 4.14009 7.77349 3.90347C7.7559 3.76459 7.74192 3.65439 7.74192 3.55325C7.74192 3.35437 7.91509 3.20077 8.15501 3.20001ZM4.77859 7.35131H3.87665C3.42568 7.35131 3.2002 8.36499 3.2002 9.61566C3.2002 10.8663 3.42568 11.88 3.87665 11.88H4.77859C4.8982 11.88 5.0129 11.8402 5.09748 11.7695C5.18205 11.6987 5.22956 11.6027 5.22956 11.5026V7.72871C5.22956 7.62862 5.18205 7.53262 5.09748 7.46185C5.0129 7.39108 4.8982 7.35131 4.77859 7.35131Z" fill="white" />
</IconContainer>;

const cameraIcon = <IconContainer width="20" height="18" viewBox="0 0 20 18" fill="none">
    <Path d="M8.2298 9.74557C8.2298 8.51333 9.22001 7.5144 10.4415 7.5144C11.663 7.5144 12.6532 8.51333 12.6532 9.74557C12.6532 10.9778 11.663 11.9767 10.4415 11.9767C9.22001 11.9767 8.2298 10.9778 8.2298 9.74557Z" stroke="#555555" />
    <Path fill-rule="evenodd" clip-rule="evenodd" d="M5.99223 4.43285C5.99223 2.71184 7.37519 1.3167 9.08116 1.3167H11.8018C13.5077 1.3167 14.8907 2.71184 14.8907 4.43285C14.8907 4.44756 14.9019 4.45982 14.9164 4.46101L17.1081 4.64056C18.0898 4.721 18.8971 5.45336 19.0804 6.42964C19.548 8.92092 19.5828 11.4752 19.1834 13.9786L19.0878 14.5777C18.9076 15.7071 17.9862 16.5663 16.856 16.6589L14.9468 16.8153C11.9482 17.061 8.93475 17.061 5.93613 16.8153L4.02688 16.6589C2.89668 16.5663 1.97528 15.7071 1.79508 14.5777L1.69949 13.9786C1.30008 11.4752 1.33494 8.92092 1.80253 6.42964C1.98577 5.45336 2.79314 4.721 3.77486 4.64056L5.96649 4.46101C5.98103 4.45982 5.99223 4.44756 5.99223 4.43285ZM10.4415 6.02695C8.40569 6.02695 6.75535 7.69183 6.75535 9.74557C6.75535 11.7993 8.40569 13.4642 10.4415 13.4642C12.4773 13.4642 14.1276 11.7993 14.1276 9.74557C14.1276 7.69183 12.4773 6.02695 10.4415 6.02695Z" stroke="#555555" />
</IconContainer>;

const emojiIcon = <IconContainer width="18" height="18" viewBox="0 0 18 18" fill="none">
    <Path d="M9.05661 12.3997C10.1591 12.3996 11.1672 11.9995 11.9484 11.336L11.9484 11.336L11.9508 11.334C11.9675 11.3196 11.9867 11.3088 12.0071 11.3022C12.0276 11.2956 12.049 11.2931 12.0702 11.2949L12.1118 10.7966L12.0702 11.2949C12.0914 11.2966 12.1122 11.3026 12.1315 11.3127C12.1507 11.3227 12.1681 11.3366 12.1825 11.3539C12.1969 11.3711 12.208 11.3913 12.2149 11.4134C12.2218 11.4354 12.2243 11.4587 12.2222 11.4819L12.7203 11.5258L12.2222 11.4819C12.2202 11.5051 12.2136 11.5274 12.2031 11.5477C12.1926 11.568 12.1783 11.5857 12.1614 11.5999L12.1614 11.5999L12.1586 11.6022C11.2904 12.341 10.1915 12.7451 9.057 12.7436L9.05576 12.7436C7.92122 12.7449 6.8223 12.3406 5.95416 11.6016L5.95372 11.6012C5.91975 11.5724 5.89757 11.5302 5.89359 11.4834C5.8896 11.4365 5.90433 11.3907 5.93335 11.3559L5.94146 11.3462C5.95388 11.3334 5.96809 11.3229 5.9835 11.3149C6.00267 11.3048 6.02342 11.2988 6.04457 11.297L6.03878 11.2296L6.03878 11.2296L6.04458 11.297C6.06573 11.2952 6.08707 11.2976 6.10743 11.3041L6.18928 11.0492L6.10744 11.3041C6.12782 11.3107 6.14698 11.3213 6.16377 11.3356L6.16382 11.3356C6.97231 12.024 7.99729 12.4013 9.05661 12.3997ZM9.05661 12.3997C9.05652 12.3997 9.05643 12.3997 9.05634 12.3997V11.8997L9.05719 12.3997C9.057 12.3997 9.05681 12.3997 9.05661 12.3997ZM12.6467 11.7784C12.6059 11.8568 12.5502 11.9264 12.4826 11.983C11.5242 12.7986 10.3102 13.2452 9.05634 13.2436C7.80235 13.245 6.58842 12.7982 5.63005 11.9823L12.6467 11.7784ZM9.059 16.5993C13.3857 16.5993 16.8858 13.062 16.8858 8.70794C16.8858 4.35387 13.3857 0.816544 9.059 0.816544C4.73233 0.816544 1.23218 4.35387 1.23218 8.70794C1.23218 13.062 4.73233 16.5993 9.059 16.5993ZM6.06211 7.36405C6.06211 7.01014 6.14218 6.79204 6.22885 6.67549C6.30222 6.57681 6.40036 6.52016 6.56122 6.52016C6.72254 6.52016 6.82057 6.5769 6.89378 6.6754C6.98035 6.79187 7.06034 7.00996 7.06034 7.36405C7.06034 7.71795 6.98027 7.93606 6.8936 8.0526C6.82022 8.15128 6.72208 8.20794 6.56122 8.20794C6.3999 8.20794 6.30187 8.15119 6.22867 8.0527C6.14209 7.93622 6.06211 7.71813 6.06211 7.36405ZM11.0577 7.36405C11.0577 7.01014 11.1377 6.79204 11.2244 6.67549C11.2978 6.57681 11.3959 6.52016 11.5568 6.52016C11.7181 6.52016 11.8161 6.5769 11.8893 6.6754C11.9759 6.79187 12.0559 7.00996 12.0559 7.36405C12.0559 7.71795 11.9758 7.93606 11.8892 8.0526C11.8158 8.15128 11.7176 8.20794 11.5568 8.20794C11.3955 8.20794 11.2974 8.15119 11.2242 8.0527C11.1377 7.93622 11.0577 7.71813 11.0577 7.36405Z" stroke="#555555" />
</IconContainer>;

const CommmentModal = () => {
    const isCommentModalVisible = useSliceSelector(state => state.app.commentModal.isVisible)
    const userData = useSliceSelector(state => state.auth.userData)
    const name = `${userData.firstName} ${userData.lastName}`
    const dispatch = useReducerDispatch()
    const [newCommentText, setNewCommentText] = useState<string>("");
    const flatListRef = useRef<FlatList>(null);
    const [comments, setComments] = useState<CommentsModalInterface[]>([]);
    const [replyTo, setReplyTo] = useState<number | null>(null);
    const [newText, setNewText] = useState("");
    const postId = useSliceSelector(state => state.app.newsFeedActiveItem.postId);

    const closeModal = () => {
        dispatch(setCommentModal({ isVisible: !isCommentModalVisible }))
    }

    const resetReplyTo = () => {
        setReplyTo(null);
    };

    const addComment = () => {
        if (newCommentText.trim() === "") {
            return;
        }
        const newComment: CommentsModalInterface = {
            id: comments.length + 1,
            name: name,
            text: newCommentText,
            liked: false,
            createdAt: moment().toISOString(),
            replies: [],
        };

        setComments([...comments, newComment]);
        setNewCommentText("");
        flatListRef.current?.scrollToEnd({ animated: true });
    };

    const addReply = (commentId: number) => {
        if (newText.trim() === "") {
            return;
        }

        const reply: CommentsModalReplyInterface = {
            id: new Date().getTime(),
            name,
            text: newText,
            createdAt: moment().toISOString(),
            liked: false,
        };

        setComments((prevComments) =>
            prevComments.map((comment) =>
                comment.id === commentId
                    ? {
                        ...comment,
                        replies: [...comment.replies, reply],
                    }
                    : comment
            )
        );

        setNewText("");
        setReplyTo(null);
    };

    const toggleLikeReply = (commentId: number, replyId: number) => {
        setComments((prevComments) =>
            prevComments.map((comment) =>
                comment.id === commentId
                    ? {
                        ...comment,
                        replies: comment.replies.map((reply) =>
                            reply.id === replyId
                                ? { ...reply, liked: !reply.liked }
                                : reply
                        ),
                    }
                    : comment
            )
        );
    };

    const handleReply = (commentId: number) => {
        setReplyTo(commentId);
    };

    const toggleCommentLike = (id: number) => {
        setComments((prevComments) =>
            prevComments.map((comment) =>
                comment.id === id
                    ? { ...comment, liked: !comment.liked }
                    : comment
            )
        );
    };

    const CommentList = () => (
        <FlatList
            ref={flatListRef}
            style={{ height: 600 }}
            data={comments}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <View style={styles.commentContainer}>
                    <View style={{ flexDirection: 'row', gap: 10 }}>
                        <View style={styles.circle}>
                            <Image style={styles.roundImg} source={require("../../assets/dummy-profile.png")} />
                        </View>
                        <View style={styles.commentContent}>
                            <TextBold fontSize={12} style={{ textTransform: 'capitalize' }}>
                                {item.name}
                            </TextBold>
                            <TextRegular fontSize={12}>
                                {item.text}
                            </TextRegular>
                            <View style={styles.likeIcon}>
                                {item.liked ? likedIcon : ""}
                            </View>
                        </View>
                    </View>
                    <View style={styles.commentAction}>
                        <TouchableOpacity onPress={() => toggleCommentLike(item.id)}>
                            <TextBold fontSize={12} color={item.liked ? "#308AFF" : "#555"}>
                                {item.liked ? "Liked" : "Like"}
                            </TextBold>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleReply(item.id)}>
                            <TextBold fontSize={12} color="#555">
                                Reply
                            </TextBold>
                        </TouchableOpacity>
                        <TextBold fontSize={12} color="#555" style={{ textTransform: 'capitalize' }}>
                            {moment(item.createdAt).fromNow()}
                        </TextBold>
                    </View>
                    {item.replies && item.replies.length > 0 && (
                        <FlatList
                            data={item.replies}
                            keyExtractor={(reply) => reply.id.toString()}
                            renderItem={({ item: reply }) => (
                                <View style={styles.replyContainer}>
                                    <View style={{ flexDirection: 'row', gap: 8 }}>
                                        <View style={styles.circle}>
                                            <Image style={styles.roundImg} source={require("../../assets/dummy-profile.png")} />
                                        </View>
                                        <View style={styles.commentContent}>
                                            <TextBold fontSize={12} style={{ textTransform: 'capitalize' }}>
                                                {reply.name}
                                            </TextBold>
                                            <TextRegular fontSize={12}>
                                                {reply.text}
                                            </TextRegular>
                                            <View style={styles.likeIcon}>
                                                {reply.liked ? likedIcon : ""}
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ paddingLeft: 50, paddingTop: 6, gap: 8, flexDirection: 'row' }}>
                                        <TouchableOpacity onPress={() => toggleLikeReply(item.id, reply.id)}>
                                            <TextBold fontSize={12} color={reply.liked ? "#308AFF" : "#555"}>
                                                {reply.liked ? "Liked" : "Like"}
                                            </TextBold>
                                        </TouchableOpacity>
                                        <TextBold fontSize={12} color="#555" style={{ textTransform: 'capitalize' }}>
                                            {moment(reply.createdAt).fromNow()}
                                        </TextBold>
                                    </View>
                                </View>
                            )}
                        />
                    )}
                </View>
            )
            }
        />
    );

    return (
        <Modal visible={isCommentModalVisible} transparent={true}>
            <TouchableOpacity
                style={styles.modalBackground}
                activeOpacity={1}
                onPress={resetReplyTo}
            >
                <View style={styles.commentModalContainer}>
                    <View style={styles.reactedContainer}>
                        <TouchableOpacity onPress={closeModal} style={styles.backIcon}>
                            {Icons.backIcon}
                        </TouchableOpacity>
                        {/* <TextRegular fontSize={14} style={styles.reactedText}>
                            4
                        </TextRegular> */}
                    </View>
                    <View style={styles.likeContainer}>
                        <View style={styles.likeText}>
                            {likedIcon}
                            <TextRegular fontSize={11}>
                                You, Anin Kale and 205 others
                            </TextRegular>
                        </View>
                        <TextRegular fontSize={11}>
                            {comments.length.toString()} {comments.length === 1 ? 'Comment' : 'Comments'}
                        </TextRegular>
                    </View>
                    <View style={{ paddingTop: 10 }}>
                        {comments.length === 0 ? (
                            <TextRegular fontSize={14} style={{ textAlign: 'center' }}>
                                No comments yet. Add one!
                            </TextRegular>
                        ) : (
                            <CommentList />
                        )
                        }
                    </View>
                    <View style={styles.writeComment}>
                        <View style={styles.circle}>
                            <Image style={styles.roundImg} source={require("../../assets/dummy-profile.png")} />
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder={replyTo ? `Replying to ${name}` : "Write a comment..."}
                            value={replyTo ? newText : newCommentText}
                            onChangeText={replyTo ? setNewText : setNewCommentText}
                        />
                        <View style={styles.iconContainer}>
                            <TouchableOpacity>
                                {cameraIcon}
                            </TouchableOpacity>
                            <TouchableOpacity>
                                {emojiIcon}
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => (replyTo ? addReply(replyTo) : addComment())}>
                                <TextRegular fontSize={14} color='#308AFF'>
                                    {replyTo ? "Reply" : "Add"}
                                </TextRegular>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </Modal>
    )
}

export default memo(CommmentModal)

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    likeIcon: {
        position: 'absolute',
        bottom: -3,
        right: -3
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
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 6
    },
    commentContent: {
        paddingLeft: 8,
        paddingRight: 14,
        paddingVertical: 6,
        backgroundColor: "'rgba(221, 221, 221, 0.5)'",
        borderRadius: 10,
        position: 'relative',
        maxWidth: '80%'
    },
    commentAction: {
        flexDirection: "row",
        gap: 8,
        paddingLeft: 55,
        paddingBottom: 12
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
        backgroundColor: "'rgba(221, 221, 221, 1)'",
        padding: 8,
        width: "82%",
        paddingRight: 114
    },
    iconContainer: {
        flexDirection: "row",
        alignSelf: "center",
        gap: 10,
        position: "absolute",
        right: 30
    },
    reactedText: {
        paddingTop: 6
    },
    backIcon: {
        paddingHorizontal: 6,
        paddingTop: 6
    },
    reactedContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6
    },
    replyContainer: {
        paddingLeft: 40,
        borderLeftWidth: 1,
        borderLeftColor: "#ddd",
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 16,
        marginTop: 0
    },
})