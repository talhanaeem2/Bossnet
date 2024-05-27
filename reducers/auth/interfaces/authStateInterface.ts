import AuthUserDataInterface from "./authUserDataInterface";

export default interface AuthStateInterface {
    isAuthenticated: boolean;
    isLoading: boolean;
    userData: AuthUserDataInterface;
}