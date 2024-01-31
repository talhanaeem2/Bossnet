import { View, StyleSheet, Image, ActivityIndicator, TouchableOpacity, TouchableWithoutFeedback } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { memo, useCallback } from "react"
import { StackNavigationProp } from "@react-navigation/stack"

import UserActions from "../userActions/userActions"
import PostDotMenu from "../postDotMenu/postDotMenu"
import ReadMore from "../readMoreText/readMoreText"
import TextBold from "../textComponent/textBold/textBold"
import TextRegular from "../textComponent/textRegular/textRegular"
import ImageFullScreenModal from "../../../modals/imageFullScreenModal/imageFullScreenModal"

import { stripHtmlTags, RPH, RPW } from "../../../constants/utils"

import RootStackParamListInterface from "../../../interfaces/RootStackParamListInterface"

import useSliceSelector from "../../../hooks/useSliceSelector"
import useReducerDispatch from "../../../hooks/useReducerDispatch"
import { setImageFullScreenModal, setNewsFeedPosts } from "../../../reducers/app/appSlice"
import IconContainer from "../iconContainer/iconContainer"
import { Circle, Path } from "react-native-svg"

const likedIcon = <IconContainer width="16" height="16" viewBox="0 0 16 16" fill="none">
    <Circle cx="8" cy="8" r="8" fill="#4A5BF6" />
    <Path d="M8.15501 3.20001C8.65288 3.20001 9.81007 3.474 9.81007 5.1432C9.81007 5.60814 9.7546 5.89836 9.71582 6.09951C9.70814 6.13895 9.70092 6.17845 9.69417 6.21801L9.69372 6.2199C9.69075 6.2392 9.69276 6.25882 9.69964 6.27742C9.70651 6.29601 9.71808 6.31316 9.73356 6.32768C9.74904 6.34221 9.76807 6.35379 9.78936 6.36163C9.81066 6.36947 9.83371 6.37338 9.85697 6.37312C11.8408 6.37312 12.9001 6.8124 12.9001 7.26112C12.9001 7.46227 12.8099 7.64606 12.6625 7.78758C12.6579 7.79205 12.6546 7.79728 12.6526 7.80291C12.6506 7.80855 12.6501 7.81447 12.6511 7.82029C12.6521 7.8261 12.6545 7.83168 12.6583 7.83664C12.662 7.84161 12.667 7.84585 12.6728 7.84909C12.8092 7.92121 12.9216 8.02089 12.9998 8.13895C13.078 8.25701 13.1194 8.38965 13.1202 8.52462C13.1202 8.84918 12.9051 9.12769 12.5723 9.25789C12.566 9.26041 12.5604 9.26401 12.5559 9.26844C12.5514 9.27288 12.5481 9.27806 12.5461 9.28365C12.5442 9.28924 12.5436 9.29511 12.5446 9.30088C12.5455 9.30665 12.5479 9.31219 12.5515 9.31714C12.6449 9.44093 12.6999 9.58622 12.6999 9.74284C12.6999 10.0999 12.4532 10.3999 12.0658 10.5086C12.0536 10.5121 12.0436 10.5195 12.0378 10.5292C12.0321 10.5388 12.0311 10.55 12.0352 10.5603C12.0627 10.6297 12.0794 10.7037 12.0794 10.7807C12.0794 11.1792 11.2784 11.5026 9.39608 11.5026C8.02062 11.5026 7.07178 11.2969 6.70694 11.1494C6.43862 11.0407 6.1315 10.8437 6.1315 10.2663V7.96948C6.1315 7.32037 6.56353 6.88637 6.99331 6.45463C7.41993 6.02667 7.84519 5.60022 7.84519 4.96658C7.84519 4.46088 7.80415 4.14009 7.77349 3.90347C7.7559 3.76459 7.74192 3.65439 7.74192 3.55325C7.74192 3.35437 7.91509 3.20077 8.15501 3.20001ZM4.77859 7.35131H3.87665C3.42568 7.35131 3.2002 8.36499 3.2002 9.61566C3.2002 10.8663 3.42568 11.88 3.87665 11.88H4.77859C4.8982 11.88 5.0129 11.8402 5.09748 11.7695C5.18205 11.6987 5.22956 11.6027 5.22956 11.5026V7.72871C5.22956 7.62862 5.18205 7.53262 5.09748 7.46185C5.0129 7.39108 4.8982 7.35131 4.77859 7.35131Z" fill="white" />
</IconContainer>;

const NewsFeed = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamListInterface>>();
    const newsFeedPosts = useSliceSelector(state => state.app.newsFeed.newsFeedPosts);
    const isLoading = useSliceSelector(state => state.loading.isLoading);
    const isImageFullScreenModalVisible = useSliceSelector(state => state.app.modals.imageFullScreeenModal.isVisible);
    const dispatch = useReducerDispatch();

    const toggleModal = useCallback((uri: string) => {
        dispatch(setImageFullScreenModal({ modals: { isVisible: !isImageFullScreenModalVisible, uri } }))
    }, []);

    const handleLongPress = useCallback((index: number) => {
        dispatch(setNewsFeedPosts({
            newsFeedPosts: newsFeedPosts.map((post, i) => ({
                ...post,
                showOverlay: i === index
            }))
        }));
    }, [dispatch, newsFeedPosts]);

    const handleCloseOverlay = useCallback((index: number) => {
        const updatedPosts = newsFeedPosts.map((post, i) => {
            if (i === index) {
                return {
                    ...post,
                    showOverlay: false
                };
            }
            return post;
        });
        dispatch(setNewsFeedPosts({ newsFeedPosts: updatedPosts }));
    }, [dispatch, newsFeedPosts])

    if (isLoading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {newsFeedPosts.map((post, index) => {
                const title = post.title;
                const sanitizedTitle = stripHtmlTags(title)
                const imageUri = post.bp_media_ids?.[0]?.attachment_data?.full;
                const userId = post.user_id;
                const postId = post.id;

                return (
                    <TouchableWithoutFeedback key={index}
                        onPress={() => handleCloseOverlay(index)}
                    >
                        <View style={styles.postContainer}>
                            <View style={styles.dotsContainer}>
                                <PostDotMenu />
                            </View>
                            <View style={styles.post}>
                                <TouchableOpacity onPress={() => navigation.navigate("UserProfile")}>
                                    <View style={styles.circle}>
                                        <Image style={styles.roundImg} source={{ uri: (post.user_avatar)["thumb"] }} />
                                    </View>
                                </TouchableOpacity>
                                <View style={styles.textContainer}>
                                    <View style={styles.postTextContainer}>
                                        <TextBold fontSize={13} color="#5F6373">
                                            {sanitizedTitle}
                                        </TextBold>
                                    </View>
                                    <TextRegular fontSize={9} color="#5F6373">
                                        2 hours ago
                                    </TextRegular>
                                </View>
                            </View>
                            {post.content_stripped && (
                                <View style={styles.readmoreContainer}>
                                    <ReadMore text={post.content_stripped} />
                                </View>
                            )}
                            {post.bp_media_ids && (
                                <TouchableWithoutFeedback onPress={() => toggleModal(imageUri)}>
                                    <View>
                                        <Image source={{ uri: imageUri }} style={{ width: 421, height: 177 }} />
                                    </View>
                                </TouchableWithoutFeedback>
                            )}
                            {
                                <View style={styles.likeText}>
                                    {likedIcon}
                                    <TextRegular fontSize={11}>
                                        {post.reacted_names}
                                    </TextRegular>
                                </View>
                            }
                            {/* <View style={!post.bp_media_ids ? { paddingTop: RPH(1) } : { paddingTop: RPH(1.2) }}>
                                <UserActions
                                    commentCount={post.comment_count}
                                    reactedNames={post.reacted_names}
                                    totalReactedCounts={post.favorite_count}
                                    reactedCounts={post.reacted_counts}
                                    showOverlay={post.showOverlay}
                                    onLongPress={() => handleLongPress(index)}
                                />
                            </View> */}
                        </View>
                    </TouchableWithoutFeedback>
                )
            })}
            {isImageFullScreenModalVisible && <ImageFullScreenModal />}
        </View>
    )
}

export default memo(NewsFeed)

const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    likeText: {
        flexDirection: "row",
        alignItems: "center",
        gap: 3,
        paddingLeft: 10,
        paddingTop: 10
    },
    circle: {
        width: RPW(11.5),
        justifyContent: "center",
        alignItems: "center"
    },
    roundImg: {
        borderRadius: 50,
        width: "100%",
        objectFit: "contain",
        height: RPH(5.5)
    },
    container: {
        flexDirection: "column",
        gap: RPH(1.2),
        position: "relative"
    },
    readmoreContainer: {
        paddingRight: RPW(5),
        paddingLeft: 30,
        paddingTop: RPH(.6),
        marginBottom: RPH(1.8)
    },
    dotsContainer: {
        position: "absolute",
        right: RPW(2.5),
        top: RPH(.5)
    },
    postContainer: {
        borderRadius: 3,
        borderWidth: 1,
        borderColor: "#F0F0F0",
        backgroundColor: "#fff",
        paddingVertical: RPH(2.3),
        position: "relative",
        borderLeftWidth: 0
    },
    postTextContainer: {
        flexDirection: "row",
        paddingRight: RPW(5)
    },
    post: {
        paddingLeft: RPW(7.2),
        flexDirection: "row",
        alignContent: "center"
    },
    textContainer: {
        justifyContent: "center",
        paddingLeft: RPW(2.5),
        paddingBottom: RPH(1.8),
        flex: 1
    }
})