import FeedPOstMediaInterface from "./feedPostMediaInterface";

export default interface FeedPostResponse {
    _id: string;
    userId: string;
    username: string;
    title: string;
    description: string;
    media: FeedPOstMediaInterface[];
    date_posted: string;
    showOverlay?: boolean;
} 