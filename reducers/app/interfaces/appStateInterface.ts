import CreatePostModalStateInterface from "./createPosModalInterface/createPostModalStateInterface";
import GroupsStateInterface from "./groups/groupsStateInterface";
import ImageFullScreenModalStateInterface from "./imageFullScreenModalInterface/imageFullScreenModalStateInterface";
import NewsFeedStateInterface from "./newsFeed/newsFeedStateInterface";
import UsersStateInterface from "./users/usersStateInterface";

export default interface AppStateInterface {
    createPostModal: CreatePostModalStateInterface;
    imageFullScreeenModal: ImageFullScreenModalStateInterface;
    newsFeed: NewsFeedStateInterface;
    users: UsersStateInterface;
    groups: GroupsStateInterface;
}