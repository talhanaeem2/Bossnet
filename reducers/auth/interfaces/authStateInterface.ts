import UserDataInterface from "./userDataInterface";

export default interface AuthStateInterface {
    isAuthenticated: boolean;
    token: string;
    isLoading: boolean;
    userData: UserDataInterface;
}