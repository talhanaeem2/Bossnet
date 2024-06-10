import MediaUploadResponseData from "./mediaUploadResponseData";

export default interface MediaUploadResponse {
    status: boolean;
    filePath: MediaUploadResponseData[];
}