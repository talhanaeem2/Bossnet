import { View, StyleSheet, Image, ActivityIndicator, TouchableOpacity, TouchableWithoutFeedback } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { memo, useCallback, useEffect, useState } from "react"
import { StackNavigationProp } from "@react-navigation/stack"
import axios from "axios"

import UserActions from "../userActions/userActions"
import PostDotMenu from "../postDotMenu/postDotMenu"
import ReadMore from "../readMoreText/readMoreText"
import TextBold from "../textComponent/textBold/textBold"
import TextRegular from "../textComponent/textRegular/textRegular"
import ImageFullScreenModal from "../../../modals/imageFullScreenModal/imageFullScreenModal"
import CommmentModal from "../../../modals/commentModal/commentModal"

import { stripHtmlTags, RPH, RPW } from "../../../constants/utils"

import RootStackParamListInterface from "../../../interfaces/RootStackParamListInterface"
import ResponseItemInterface from "./interfaces/responseItemInterface"

import useSliceSelector from "../../../hooks/useSliceSelector"
import useReducerDispatch from "../../../hooks/useReducerDispatch"
import { setImageFullScreenModal } from "../../../reducers/app/appSlice"

const apiUrl = "https://bosnett.com/wp-json/buddyboss/v1/activity";

const NewsFeed = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamListInterface>>();
    const [newsFeedPosts, setNewsFeedPosts] = useState<ResponseItemInterface[]>([])
    const isImageFullScreenModalVisible = useSliceSelector(state => state.app.imageFullScreeenModal.isVisible);
    const isCommentModalVisible = useSliceSelector(state => state.app.commentModal.isVisible)
    const dispatch = useReducerDispatch();
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [isLoading, setIsLoading] = useState(false)

    const fetchData = useCallback(async (page: number) => {
        try {
            setIsLoading(true)
            const response = await axios.get(`${apiUrl}?page=${page}`);
            setNewsFeedPosts((prevPosts) => [...prevPosts, ...response.data]);
            setTotalPages(response.headers["x-wp-totalpages"]);
            setIsLoading(false)
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false)
        }
    }, [currentPage])

    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage]);

    const loadMorePosts = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const toggleModal = useCallback((uri: string) => {
        dispatch(setImageFullScreenModal({ isVisible: !isImageFullScreenModalVisible, uri }))
    }, []);

    const handleLongPress = useCallback((index: number) => {
        setNewsFeedPosts(prevState => {
            if (prevState) {
                return prevState.map((post, i) => ({
                    ...post,
                    showOverlay: i === index
                }));
            }
            return []
        });
    }, [newsFeedPosts]);

    const handleCloseOverlay = useCallback((index: number) => {
        setNewsFeedPosts(prevState => {
            if (prevState) {
                return prevState.map((post, i) => ({
                    ...post,
                    showOverlay: i === index ? false : post.showOverlay
                }));
            }
            return []
        });
    }, [newsFeedPosts])

    return (
        <View style={styles.container}>
            {newsFeedPosts && newsFeedPosts.map((post, index) => {
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
                            {/* {post.reacted_names && (
                                <TextRegular fontSize={10} color="#5F6373">
                                    {post.reacted_names}
                                </TextRegular>
                            )} */}
                            <View style={!post.bp_media_ids ? { paddingTop: RPH(1) } : { paddingTop: RPH(1.2) }}>
                                <UserActions showOverlay={post.showOverlay}
                                    onLongPress={() => handleLongPress(index)}
                                />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                )
            })}
            {isLoading && (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )}
            <TouchableOpacity onPress={loadMorePosts}>
                <TextRegular fontSize={16} color="#5F6373">Load More</TextRegular>
            </TouchableOpacity>
            {isCommentModalVisible && <CommmentModal />}
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