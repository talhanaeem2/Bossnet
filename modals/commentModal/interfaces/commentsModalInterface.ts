import CommentsModalReplyInterface from "./CommentsModalReplyInterface";



export default interface CommentsModalInterface {
    id: number;
    name: string;
    text: string;
    liked: boolean;
    createdAt: string;
    replies: CommentsModalReplyInterface[];
}