import UserAvatarInterface from "./userAvatarInterface";
import MediaIdsInterface from "./mediaIdsInterface";

export default interface ResponseItemInterface {
    comment_count: number;
    content_stripped: string;
    date: string;
    favorite_count: number;
    favorited: boolean;
    id: number;
    link: string;
    name: string;
    title: string;
    user_avatar: UserAvatarInterface;
    user_id: number;
    bp_media_ids: MediaIdsInterface;
    showOverlay: boolean;
    reacted_names: string;
}