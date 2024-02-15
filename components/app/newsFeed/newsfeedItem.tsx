import { memo, useCallback, useState } from "react"
import { TouchableWithoutFeedback, View, TouchableOpacity, Image, StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"

import PostDotMenu from "../postDotMenu/postDotMenu"
import ReadMore from "../readMoreText/readMoreText"
import TextBold from "../textComponent/textBold/textBold"
import TextRegular from "../textComponent/textRegular/textRegular"

import { RPH, RPW, stripHtmlTags } from "../../../constants/utils"
import UserActions from "../userActions/userActions"

import useReducerDispatch from "../../../hooks/useReducerDispatch"
import { setImageFullScreenModal } from "../../../reducers/app/appSlice"
import useSliceSelector from "../../../hooks/useSliceSelector"

import ResponseItemInterface from "./interfaces/responseItemInterface"
import RootStackParamListInterface from "../../../interfaces/RootStackParamListInterface"

const NewsFeedItem = ({ item, index }: { item: ResponseItemInterface, index: number }) => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamListInterface>>();
    const [newsFeedPosts, setNewsFeedPosts] = useState<ResponseItemInterface[]>([])
    const isImageFullScreenModalVisible = useSliceSelector(state => state.app.imageFullScreeenModal.isVisible);
    const dispatch = useReducerDispatch();

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

    const title = item.title;
    const sanitizedTitle = stripHtmlTags(title);
    const imageUri = item.bp_media_ids?.[0]?.attachment_data?.full;
    const userId = item.user_id;
    const postId = item.id;
    const imageUris = item.bp_media_ids?.map((media) => media.attachment_data?.full).filter(uri => uri);
    return (
        <TouchableWithoutFeedback onPress={() => handleCloseOverlay(index)}>
            <View style={styles.postContainer}>
                <View style={styles.dotsContainer}>
                    <PostDotMenu />
                </View>
                <View style={styles.post}>
                    <TouchableOpacity onPress={() => navigation.navigate("UserProfile")}>
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
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: "center" }}>
                        {imageUris.map((uri, i) => (
                            <TouchableWithoutFeedback key={i} onPress={() => toggleModal(uri)}>
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
                <View style={!item.bp_media_ids ? { paddingTop: RPH(1) } : { paddingTop: RPH(1.2) }}>
                    <UserActions showOverlay={item.showOverlay} onLongPress={() => handleLongPress(index)} />
                </View>
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
    roundImg: {
        borderRadius: 50,
        width: "100%",
        objectFit: "contain",
        height: RPH(5.5)
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
    },
})