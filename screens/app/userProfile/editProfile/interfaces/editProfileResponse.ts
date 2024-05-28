export default interface EditProfileResponse {
    status: boolean;
    message: string;
    data: {
        userId: string;
        email: string;
        firstName: string;
        lastName: string;
        userName: string;
        dayOfBirth: string;
        profileImage: string;
    }
}