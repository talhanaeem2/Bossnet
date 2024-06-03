import ImageFullScreenModalStateInterface from "./imageFullScreenModalInterface/imageFullScreenModalStateInterface";

export default interface AppStateInterface {
    createPostModal: { isVisible: boolean };
    imageFullScreeenModal: ImageFullScreenModalStateInterface;
    commentModal: { isVisible: boolean };
    successModal: { isVisible: boolean };
    footerActiveButton: { activeTab: string };
    newsFeedActiveItem: { postId: string };
}