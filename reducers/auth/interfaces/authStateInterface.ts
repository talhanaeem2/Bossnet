export default interface AuthStateInterface {
    isAuthenticated: boolean;
    token: string;
    isLoading: boolean;
    userId: string;
}