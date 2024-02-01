import CommentModalStateInterface from "./commentModalInterface/commentModalStateInterface";
import CreatePostModalStateInterface from "./createPosModalInterface/createPostModalStateInterface";
import GroupsStateInterface from "./groups/groupsStateInterface";
import ImageFullScreenModalStateInterface from "./imageFullScreenModalInterface/imageFullScreenModalStateInterface";
import UsersStateInterface from "./users/usersStateInterface";

export default interface AppStateInterface {
    createPostModal: CreatePostModalStateInterface;
    imageFullScreeenModal: ImageFullScreenModalStateInterface;
    commentModal: CommentModalStateInterface;
    users: UsersStateInterface;
    groups: GroupsStateInterface;
}