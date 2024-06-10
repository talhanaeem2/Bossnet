import { View, StyleSheet, FlatList, RefreshControl } from "react-native";
import { memo, useCallback, useEffect, useState } from "react";

import ImageFullScreenModal from "../../../modals/imageFullScreenModal/imageFullScreenModal";
import CommmentModal from "../../../modals/commentModal/commentModal";
import NewsFeedItem from "./newsfeedItem";
import NewsFeedShare from "./newsFeedShare";

import { RPH, RPW } from "../../../constants/utils/utils";
import Apis from "../../../constants/apis";

import NewsFeedProps from "./interfaces/newsFeedShareProps";

import useSliceSelector from "../../../hooks/useSliceSelector";
import useToken from "../../../hooks/useToken";
import requestUtils from "../../../constants/utils/requestUtils";
import useErrorHandling from "../../../hooks/useErrorHandling";
import FeedPostResponse from "./interfaces/feedPostsResponse";

const NewsFeed = (props: NewsFeedProps) => {
    const { showUploadButtons, isPostCreated } = props;
    const [newsFeedPosts, setNewsFeedPosts] = useState<FeedPostResponse[]>([]);
    const isImageFullScreenModalVisible = useSliceSelector(state => state.app.imageFullScreeenModal.isVisible);
    const isCommentModalVisible = useSliceSelector(state => state.app.commentModal.isVisible);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number>(-1);
    const { getToken } = useToken();
    const { handleError } = useErrorHandling();

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        const accessToken = await getToken();
        if (!accessToken) return;

        try {
            const response = await requestUtils.request<FeedPostResponse[], void>(
                Apis.newsFeedApi,
                'GET',
                undefined,
                { 'Authorization': `Bearer ${accessToken}` }
            );

            setNewsFeedPosts(response);
            setIsLoading(false);

        } catch (error) {
            handleError(error);
        }
    }, [getToken, isPostCreated])

    useEffect(() => {
        fetchData();
    }, [isPostCreated, fetchData]);

    // const loadMorePosts = () => {
    //     if (currentPage < totalPages) {
    //         setCurrentPage((prevPage) => prevPage + 1);
    //     }
    // };

    const onRefresh = useCallback(() => {
        fetchData();
    }, [fetchData]);

    return (
        <View style={styles.container}>
            <FlatList
                data={newsFeedPosts}
                refreshControl={
                    <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
                }
                renderItem={({ item, index }) =>
                    <NewsFeedItem
                        activeIndex={activeIndex}
                        setActiveIndex={setActiveIndex}
                        item={item}
                        index={index}
                        newsFeedPosts={newsFeedPosts}
                        setNewsFeedPosts={setNewsFeedPosts}
                    />
                }
                keyExtractor={(item, index) => `${item._id}_${index}`}
                // onEndReached={loadMorePosts}
                // onEndReachedThreshold={0.5}
                ListHeaderComponent={<NewsFeedShare showUploadButtons={showUploadButtons} />}
            // initialNumToRender={10}
            // maxToRenderPerBatch={10}
            // windowSize={5}
            />
            <CommmentModal />
            <ImageFullScreenModal />
        </View>
    )
}

export default memo(NewsFeed)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        gap: RPH(1.2),
        paddingBottom: 60
    },
})