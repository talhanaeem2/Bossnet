import CommentModalStateInterface from "./commentModalInterface/commentModalStateInterface";
import CreatePostModalStateInterface from "./createPosModalInterface/createPostModalStateInterface";
import ImageFullScreenModalStateInterface from "./imageFullScreenModalInterface/imageFullScreenModalStateInterface";

export default interface AppStateInterface {
    createPostModal: CreatePostModalStateInterface;
    imageFullScreeenModal: ImageFullScreenModalStateInterface;
    commentModal: CommentModalStateInterface;
    successModal: { isVisible: boolean };
    footerActiveButton: { activeTab: string };
    newsFeedActiveItem: { postId: number };
}