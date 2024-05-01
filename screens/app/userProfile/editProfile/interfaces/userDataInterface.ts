export default interface UserDataInterface {
    email: string;
    firstName: string;
    lastName: string;
    userName: string;
    nickName: string;
    day: number;
    month: number;
    year: number;
    [key: string]: string | number | undefined;
}