import AttachmentDataInterface from "./attachmentDataInterface";

export default interface MediaIdInterface {
    id: number;
    blog_id: number;
    attachment_id: number;
    user_id: number;
    title: string;
    description: string;
    album_id: number;
    group_id: number;
    activity_id: number;
    message_id: number;
    hide_activity_actions: boolean;
    privacy: string;
    menu_order: number;
    date_created: string;
    attachment_data: AttachmentDataInterface;
}