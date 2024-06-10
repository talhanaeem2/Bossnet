import MediaUploadResponseData from "../../../../constants/interfaces/apisInterfaces/mediaUploadResponseData";

export default interface CreatePostResponse {
    _id: string;
    userId: string;
    username: string;
    title: string;
    description: string;
    media: MediaUploadResponseData[];
    date_posted: string;
}