import ResponseItemInterface from "../../../components/app/newsFeed/interfaces/responseItemInterface";
import UsersInterface from "../../../screens/app/friends/interfaces/usersInterface";
import GroupsInterface from "../../../screens/app/groups/interfaces/groupsInterface";
import ModalsPayload from "./modals/modalsPayload";

export default interface AppPayloadInterface {
    modals?: ModalsPayload;
    newsFeedPosts?: ResponseItemInterface[];
    usersData?: UsersInterface[];
    groupsData?: GroupsInterface[];
}