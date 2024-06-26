import FeedPostResponse from "./feedPostsResponse";

export default interface NewsFeedItemProps {
    item: FeedPostResponse;
    index: number;
    activeIndex: number;
    setActiveIndex: (index: number) => void;
    newsFeedPosts: FeedPostResponse[];
    setNewsFeedPosts: React.Dispatch<React.SetStateAction<FeedPostResponse[]>>;
    isLoading: boolean;
}