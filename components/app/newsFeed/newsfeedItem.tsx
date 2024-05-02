import { memo, useCallback, useState } from "react"
import { TouchableWithoutFeedback, View, TouchableOpacity, Image, StyleSheet } from "react-native"

import PostDotMenu from "../postDotMenu/postDotMenu"
import ReadMore from "../readMoreText/readMoreText"
import TextBold from "../textComponent/textBold/textBold"
import TextRegular from "../textComponent/textRegular/textRegular"

import { RPH, RPW, stripHtmlTags } from "../../../constants/utils"
import UserActions from "../userActions/userActions"

import useReducerDispatch from "../../../hooks/useReducerDispatch"
import { setImageFullScreenModal } from "../../../reducers/app/appSlice"
import useSliceSelector from "../../../hooks/useSliceSelector"

import NewsFeedItemProps from "./interfaces/newsFeedItemProps"
import ResponseItemInterface from "./interfaces/responseItemInterface"

const NewsFeedItem = (props: NewsFeedItemProps) => {
    const { item, index, activeIndex, setActiveIndex, newsFeedPosts, setNewsFeedPosts } = props
    const isImageFullScreenModalVisible = useSliceSelector(state => state.app.imageFullScreeenModal.isVisible);
    const dispatch = useReducerDispatch();
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    const handleCloseOverlay = useCallback(() => {
        setNewsFeedPosts(prevState => {
            if (prevState) {
                return prevState.map((post, i) => ({
                    ...post,
                    showOverlay: false
                }));
            }
            return []
        });
    }, [newsFeedPosts])

    const toggleModal = useCallback((startIndex: number) => {
        const allUris = item.bp_media_ids?.map((media) => media.attachment_data?.full).filter(uri => uri) || [];
        dispatch(setImageFullScreenModal({ isVisible: !isImageFullScreenModalVisible, uris: allUris, startIndex }))
    }, [dispatch, isImageFullScreenModalVisible, item.bp_media_ids]);

    const toggleShowOverlay = useCallback((prevState: ResponseItemInterface[], index: number) => {
        if (!prevState) return [];

        const updatedPosts = prevState.map((post, i) => {
            if (i !== index) {
                return { ...post, showOverlay: false };
            } else {
                return { ...post, showOverlay: !post.showOverlay };
            }
        });

        return updatedPosts;
    }, []);

    const handleLongPress = useCallback((index: number) => {
        setNewsFeedPosts(prevState => toggleShowOverlay(prevState, index));
    }, [newsFeedPosts]);

    const closeMenu = () => {
        setIsMenuVisible(false)
        setActiveIndex(-1)
    }

    const title = item.title;
    const sanitizedTitle = stripHtmlTags(title);
    const imageUri = item.bp_media_ids?.[0]?.attachment_data?.full;
    const userId = item.user_id;
    const postId = item.id;
    const imageUris = item.bp_media_ids?.map((media) => media.attachment_data?.full).filter(uri => uri);

    return (
        <TouchableWithoutFeedback onPress={() => { handleCloseOverlay(); closeMenu(); }}>
            <View style={styles.postContainer}>
                <View style={styles.dotsContainer}>
                    <PostDotMenu
                        activeIndex={activeIndex}
                        index={index}
                        onMenuPress={setActiveIndex}
                        isMenuVisible={isMenuVisible}
                        setIsMenuVisible={setIsMenuVisible}
                        postId={postId}
                    />
                </View>
                <View style={styles.post}>
                    <TouchableOpacity>
                        <View style={styles.circle}>
                            <Image style={styles.roundImg} source={{ uri: (item.user_avatar)["thumb"] }} />
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
                {item.content_stripped && (
                    <View style={styles.readmoreContainer}>
                        <ReadMore text={item.content_stripped} />
                    </View>
                )}
                {imageUris && imageUris.length > 0 && (
                    <View style={styles.imagesContainer}>
                        {imageUris.map((uri, i) => (
                            <TouchableWithoutFeedback key={i} onPress={() => toggleModal(i)}>
                                <Image
                                    source={{ uri: uri }}
                                    style={{
                                        width: imageUris.length === 1 ? 421 : "45%",
                                        height: imageUris.length === 1 ? 177 : 140,
                                        margin: imageUris.length === 1 ? 0 : 2
                                    }}
                                />
                            </TouchableWithoutFeedback>
                        ))}
                    </View>
                )}
                <UserActions
                    showOverlay={item.showOverlay}
                    onLongPress={() => handleLongPress(index)}
                    closeOverlay={handleCloseOverlay}
                    activeId={postId}
                />
            </View>
        </TouchableWithoutFeedback>
    )
}

export default memo(NewsFeedItem)

const styles = StyleSheet.create({
    circle: {
        width: RPW(11.5),
        justifyContent: "center",
        alignItems: "center"
    },
    imagesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: "center"
    },
    roundImg: {
        borderRadius: 50,
        width: "100%",
        objectFit: "contain",
        height: RPH(5.6)
    },
    readmoreContainer: {
        paddingRight: RPW(5),
        paddingLeft: 30
    },
    dotsContainer: {
        position: "relative"
    },
    postContainer: {
        borderRadius: 3,
        borderWidth: 1,
        borderColor: "#F0F0F0",
        backgroundColor: "#fff",
        paddingVertical: RPH(2.3),
        position: "relative",
        borderLeftWidth: 0,
        gap: 10
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
        flex: 1
    },
})