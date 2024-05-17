export default interface UserDataInterface {
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
    userName: string;
    dayofBirth: string;
    profileImage: string;
    token: string;
    [key: string]: string | number | undefined;
}