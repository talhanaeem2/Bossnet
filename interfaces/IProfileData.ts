import UserValuePairs from "./userValuePairs";

export default interface IProfileData {
    email: string;
    userId: string;
    firstName: string;
    lastName: string;
    userName: string;
    dayOfBirth: string;
    profileImage: string;
    bio: string;
    socialMedia: UserValuePairs[];
    education: UserValuePairs[];
    workExperience: UserValuePairs[];
    token?: string;
}