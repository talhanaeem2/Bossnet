import CreatePostModalInterface from "./createPosModalInterface/createPostModalInterface";
import GroupsStateInterface from "./groups/groupsStateInterface";
import ImageFullScreenModalInterface from "./imageFullScreenModalInterface/imageFullScreenModalInterface";
import NewsFeedInterface from "./newsFeed/newsFeedInterface";
import UsersStateInterface from "./users/usersStateInterface";

export default interface AppStateInterface {
    createPostModal: CreatePostModalInterface;
    imageFullScreeenModal: ImageFullScreenModalInterface;
    newsFeed: NewsFeedInterface;
    users: UsersStateInterface;
    groups: GroupsStateInterface;
}