import CreatePostModalInterface from "./createPosModalInterface/createPostModalInterface";
import ImageFullScreenModalInterface from "./imageFullScreenModalInterface/imageFullScreenModalInterface";
import NewsFeedInterface from "./newsFeed/newsFeedInterface";

export default interface AppStateInterface {
    createPostModal: CreatePostModalInterface;
    imageFullScreeenModal: ImageFullScreenModalInterface;
    newsFeed: NewsFeedInterface;
}