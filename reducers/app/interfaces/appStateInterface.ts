import GroupsStateInterface from "./groups/groupsStateInterface";
import ModalsState from "./modals/modalsState";
import NewsFeedStateInterface from "./newsFeed/newsFeedStateInterface";
import UsersStateInterface from "./users/usersStateInterface";

export default interface AppStateInterface {
    modals: ModalsState;
    newsFeed: NewsFeedStateInterface;
    users: UsersStateInterface;
    groups: GroupsStateInterface;
}