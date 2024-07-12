import IProfileData from "../../../../interfaces/IProfileData";
import FeedPOstMediaInterface from "./feedPostMediaInterface";

export default interface FeedPostResponse {
    _id: string;
    userdetail: IProfileData,
    title: string;
    description: string;
    media: FeedPOstMediaInterface[];
    date_posted: string;
    showOverlay?: boolean;
} 