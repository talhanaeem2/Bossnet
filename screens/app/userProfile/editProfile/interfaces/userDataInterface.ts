import ImageInterface from "../../../../../components/common/interfaces/imageInterface";

export default interface UserDataInterface {
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
    userName: string;
    dayOfBirth: string;
    profileImage: ImageInterface;
    token: string;
    bio?: string;
    phone?: string;
    education?: string;
    socials?: string;
    work?: string;
}