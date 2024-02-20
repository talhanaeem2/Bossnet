import { View, StyleSheet, ActivityIndicator, FlatList } from "react-native"
import { memo, useCallback, useEffect, useState } from "react"
import axios from "axios"

import ImageFullScreenModal from "../../../modals/imageFullScreenModal/imageFullScreenModal"
import CommmentModal from "../../../modals/commentModal/commentModal"
import NewsFeedItem from "./newsfeedItem"

import { RPH, RPW } from "../../../constants/utils"

import ResponseItemInterface from "./interfaces/responseItemInterface"

import useSliceSelector from "../../../hooks/useSliceSelector"

const apiUrl = "https://bosnett.com/wp-json/buddyboss/v1/activity";

const NewsFeed = () => {
    const [newsFeedPosts, setNewsFeedPosts] = useState<ResponseItemInterface[]>([])
    const isImageFullScreenModalVisible = useSliceSelector(state => state.app.imageFullScreeenModal.isVisible);
    const isCommentModalVisible = useSliceSelector(state => state.app.commentModal.isVisible)
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

    return (
        <View style={styles.container}>
            <FlatList
                data={newsFeedPosts}
                renderItem={({ item, index }) => <NewsFeedItem item={item} index={index} />}
                keyExtractor={(item, index) => `${item.id}_${index}`}
                onEndReached={loadMorePosts}
                onEndReachedThreshold={0.5}
            />
            {!!isCommentModalVisible && <CommmentModal />}
            {!!isImageFullScreenModalVisible && <ImageFullScreenModal />}
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
    },
    shimmer: {
        flex: 1,
        flexDirection: "column"
    },
    shimmerPostContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff'
    },
    circleShimmer: {
        width: RPW(11.5),
        height: RPH(5.5),
        borderRadius: 25,
        backgroundColor: '#ccc',
        marginRight: 10,
    },
    textContainerShimmer: {
        justifyContent: 'space-between',
        backgroundColor: "#ccc",
        width: 200,
        height: 20,
        marginTop: 10,
        borderRadius: 12
    },
    imageShimmer: {
        width: "90%",
        height: 177,
        backgroundColor: '#ccc',
        borderRadius: 12
    }
})