import UserDataInterface from "./userDataInterface";

export default interface AuthStateInterface {
    isAuthenticated: boolean;
    isLoading: boolean;
    userData: UserDataInterface;
}