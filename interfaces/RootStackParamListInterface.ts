import { ParamListBase } from "@react-navigation/native";

import chatRoomParamsInterface from "./chatRoomInterface";
import { SignInParamsInterface } from "./signInParamsInterface";

export default interface RootStackParamListInterface extends ParamListBase {
    SignIn: SignInParamsInterface;
    SignUp: undefined;
    AccountRecovery: undefined;
    Home: undefined;
    Menu: undefined;
    Groups: undefined;
    Friends: undefined;
    Messenger: undefined;
    NewMessage: undefined;
    ChatRoom: chatRoomParamsInterface;
    UserProfile: undefined;
    Notifications: undefined;
}