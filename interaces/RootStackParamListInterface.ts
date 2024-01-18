import { ParamListBase } from "@react-navigation/native";
import ChatRoomProps from "../screens/chatRoom/interfaces/chatRoomProps";

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
    ChatRoom: { user: ChatRoomProps };
}