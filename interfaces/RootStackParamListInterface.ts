import { ParamListBase } from "@react-navigation/native";

import chatRoomParamsInterface from "./chatRoomInterface";

export default interface RootStackParamListInterface extends ParamListBase {
    SignIn: undefined;
    SignUp: undefined;
    AccountRecovery: undefined;
    Home: undefined;
    Menu: undefined;
    Groups: undefined;
    Friends: undefined;
    Messenger: undefined;
    NewMessage: undefined;
    ChatRoom: chatRoomParamsInterface;
}