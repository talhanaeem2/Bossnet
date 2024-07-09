import { memo, useCallback, useState } from "react";
import { TouchableWithoutFeedback, View, TouchableOpacity, Image, StyleSheet } from "react-native";
import moment from "moment";

import ReadMore from "../common/readMoreText/readMoreText";
import TextBold from "../common/textComponent/textBold/textBold";
import TextRegular from "../common/textComponent/textRegular/textRegular";
import UserActions from "../userActions/userActions";
import PostOptionsModal from "../../../modals/postOptionsModal/postOptionsModal";
import Shimmer from "../common/shimmer/shimmer";

import Apis from "../../../constants/apis";
import Icons from "../../../constants/icons";
import { RPH, RPW, getRandomColor, getUserInitials } from "../../../constants/utils/utils";

import useReducerDispatch from "../../../hooks/useReducerDispatch";
import { setImageFullScreenModal } from "../../../reducers/app/appSlice";
import useSliceSelector from "../../../hooks/useSliceSelector";

import NewsFeedItemProps from "./interfaces/newsFeedItemProps";
import FeedPostResponse from "./interfaces/feedPostsResponse";

const NewsFeedItem = (props: NewsFeedItemProps) => {
    const { item, index, activeIndex, setActiveIndex, newsFeedPosts, setNewsFeedPosts, isLoading } = props;
    const isImageFullScreenModalVisible = useSliceSelector(state => state.app.imageFullScreeenModal.isVisible);
    const dispatch = useReducerDispatch();
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const userData = useSliceSelector(state => state.auth.userData);

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
        const allUris = item.media?.map((media) => media.path).filter(uri => uri) || [];
        dispatch(setImageFullScreenModal({ isVisible: !isImageFullScreenModalVisible, uris: allUris, startIndex }))
    }, [dispatch, isImageFullScreenModalVisible, item.media]);

    const toggleShowOverlay = useCallback((prevState: FeedPostResponse[], index: number) => {
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
    const postId = item._id;
    const imageUris = item.media.map((media) => media.path).filter(uri => uri);
    const datePostedAgo = moment(item.date_posted).fromNow();
    const name = `${userData.firstName} ${userData.lastName}`;

    return (
        <View>
            <TouchableWithoutFeedback onPress={() => { handleCloseOverlay(); closeMenu(); }}>
                <View style={styles.postContainer}>
                    <View style={styles.post}>
                        {isLoading
                            ? <Shimmer isLoading={isLoading} width={RPW(11.5)} height={RPH(5.6)} borderRadius={50} />
                            : userData.profileImage
                                ? <View style={styles.circle}>
                                    <Image style={styles.roundImg} source={{ uri: `${Apis.homeUrl}${userData.profileImage}` }} />
                                </View>
                                : <View style={[styles.circle, { backgroundColor: getRandomColor() }]}>
                                    <TextBold fontSize={16} color='#fff'>
                                        {getUserInitials(name)}
                                    </TextBold>
                                </View>
                        }
                        <View style={styles.textContainer}>
                            {isLoading
                                ? <Shimmer isLoading={isLoading} width='60%' height={14} borderRadius={20} />
                                : <TextBold fontSize={13} color="#5F6373">
                                    {`${userData.firstName} ${userData.lastName}`}
                                </TextBold>
                            }
                            {
                                isLoading
                                    ? <Shimmer isLoading={isLoading} width='30%' height={10} borderRadius={20} />
                                    : <TextRegular fontSize={9} color="#5F6373">
                                        {datePostedAgo}
                                    </TextRegular>
                            }
                        </View>
                        {isLoading
                            ? <Shimmer isLoading={isLoading} width='10%' height={12} borderRadius={20} marginRight={10} />
                            : <TouchableOpacity style={styles.dots} onPress={() => setIsMenuVisible(!isMenuVisible)}>
                                {Icons.dotsIcon}
                            </TouchableOpacity>}
                    </View>
                    {isLoading
                        ? <Shimmer isLoading={isLoading} width='40%' height={15} borderRadius={20} marginLeft={30} />
                        : item.description && (
                            <View style={styles.readmoreContainer}>
                                <ReadMore text={item.description} />
                            </View>
                        )}
                    {isLoading
                        ? <Shimmer isLoading={isLoading} width={421} height={155} borderRadius={0} />
                        : imageUris && imageUris.length > 0 && (
                            <View style={styles.imagesContainer}>
                                {imageUris.map((uri, i) => (
                                    <TouchableWithoutFeedback key={i} onPress={() => toggleModal(i)}>
                                        <Image
                                            source={{ uri: `${Apis.homeUrl}${uri}` }}
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
                    {isLoading
                        ? <Shimmer isLoading={isLoading} width='96%' height={35} borderRadius={8} marginLeft={10} marginRight={10} />
                        : <UserActions
                            showOverlay={item.showOverlay}
                            onLongPress={() => handleLongPress(index)}
                            closeOverlay={handleCloseOverlay}
                            activeId={postId}
                        />}
                </View>
            </TouchableWithoutFeedback>
            <PostOptionsModal
                isModalVisible={isMenuVisible}
                setIsModalVisible={setIsMenuVisible}
                postId={postId}
            />
        </View>
    )
}

export default memo(NewsFeedItem)

const styles = StyleSheet.create({
    postContainer: {
        borderRadius: 3,
        borderWidth: 1,
        borderColor: "#F0F0F0",
        backgroundColor: "#F9F9F9",
        paddingVertical: RPH(2.3),
        borderLeftWidth: 0,
        gap: 10,
        marginBottom: 10
    },
    post: {
        paddingLeft: RPW(7.2),
        flexDirection: "row",
        width: '100%'
    },
    circle: {
        width: RPW(11.5),
        height: RPH(5.6),
        borderRadius: 50,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        flexShrink: 1
    },
    imagesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: "center"
    },
    roundImg: {
        width: "100%",
        height: '100%'
    },
    readmoreContainer: {
        paddingRight: RPW(5),
        paddingLeft: 30
    },
    textContainer: {
        paddingLeft: RPW(2.5),
        alignItems: 'flex-start',
        justifyContent: 'center',
        flexGrow: 1,
        flexDirection: "column",
        gap: 4,
    },
    dots: {
        flexShrink: 1,
        padding: 10
    }
})