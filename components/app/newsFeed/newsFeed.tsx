import { View, StyleSheet, FlatList, RefreshControl } from "react-native";
import { memo, useCallback, useEffect, useMemo, useState } from "react";

import ImageFullScreenModal from "../../../modals/imageFullScreenModal/imageFullScreenModal";
import CommmentModal from "../../../modals/commentModal/commentModal";
import NewsFeedItem from "./newsfeedItem";
import NewsFeedShare from "./newsFeedShare";
import TextRegular from "../common/textComponent/textRegular/textRegular";

import { getColorForUser, RPH } from "../../../constants/utils/utils";
import Apis from "../../../constants/apis";
import requestUtils from "../../../constants/utils/requestUtils";

import useToken from "../../../hooks/useToken";
import useErrorHandling from "../../../hooks/useErrorHandling";
import useSliceSelector from "../../../hooks/useSliceSelector";

import NewsFeedProps from "./interfaces/newsFeedShareProps";
import FeedPostResponse from "./interfaces/feedPostsResponse";

const NewsFeed = (props: NewsFeedProps) => {
    const { showUploadButtons, isPostCreated } = props;
    const [newsFeedPosts, setNewsFeedPosts] = useState<FeedPostResponse[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const { getToken } = useToken();
    const { handleError } = useErrorHandling();
    const messages = useSliceSelector(state => state.language.messages);
    const [userColors, setUserColors] = useState<{ [key: string]: string }>({});

    const pageSize = 10;

    const fetchData = useCallback(async (page: number) => {
        const accessToken = await getToken();
        if (!accessToken) return;

        const setLoadingState = page === 1 ? setIsLoading : setIsFetchingMore;
        setLoadingState(true);

        try {
            const { data, pagination } = await requestUtils.request<FeedPostResponse[], void>(
                `${Apis.newsFeedApi}?pageSize=${pageSize}&page=${page}`,
                'GET',
                undefined,
                { 'Authorization': `Bearer ${accessToken}` }
            );

            setNewsFeedPosts(prevPosts => page === 1 ? data : [...prevPosts, ...data]);
            if (pagination) {
                setTotalPages(pagination.totalPages);
            }

            setLoadingState(false);
            if (page === 1) {
                setIsRefreshing(false);
            }
            setCurrentPage(page);

            const newColors = { ...userColors };
            data.forEach(post => {
                const userId = post.userdetail.userId;
                if (!newColors[userId]) {
                    newColors[userId] = getColorForUser(userId);
                }
            });
            setUserColors(newColors);

        } catch (error) {
            handleError(error);
        }
    }, [getToken, isPostCreated, pageSize]);

    useEffect(() => {
        fetchData(1);
    }, [isPostCreated, fetchData]);

    const loadMorePosts = useCallback(() => {
        if (!isFetchingMore && currentPage < totalPages) {
            fetchData(currentPage + 1);
        }
    }, [fetchData, currentPage, totalPages]);

    const onRefresh = useCallback(() => {
        setIsRefreshing(true);
        fetchData(1);
    }, [fetchData]);

    const renderFooter = () => {
        return isFetchingMore ? <NewsFeedItem isLoading loadingMore /> : null;
    };

    const renderNoPosts = () => {
        if (isLoading) return null;
        return (
            <View style={styles.emptyContainer}>
                <TextRegular fontSize={16}>{messages.noPosts}</TextRegular>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={newsFeedPosts}
                refreshControl={
                    <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
                }
                renderItem={({ item, index }) =>
                    <NewsFeedItem
                        item={item}
                        index={index}
                        newsFeedPosts={newsFeedPosts}
                        setNewsFeedPosts={setNewsFeedPosts}
                        isLoading={isLoading}
                        userColors={userColors}
                    />
                }
                keyExtractor={(item, index) => `${item._id}_${index}`}
                onEndReached={loadMorePosts}
                onEndReachedThreshold={0.5}
                ListHeaderComponent={<NewsFeedShare isLoading={isLoading} showUploadButtons={showUploadButtons} />}
                initialNumToRender={10}
                maxToRenderPerBatch={10}
                windowSize={5}
                ListFooterComponent={renderFooter}
                ListEmptyComponent={renderNoPosts}
            />
            <CommmentModal />
            <ImageFullScreenModal />
        </View>
    )
}

export default memo(NewsFeed)

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        gap: RPH(1.2),
        paddingBottom: 60
    },
    emptyContainer: {
        alignItems: 'center',
        padding: 20,
        color: '#767676',
        backgroundColor: '#F9F9F9'
    },
})