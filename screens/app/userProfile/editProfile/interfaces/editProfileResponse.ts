export default interface EditProfileResponse {
    data: {
        email: string;
        userId: string;
        firstName: string;
        lastName: string;
        userName: string;
        dayOfBirth: string;
        profileImage: string;
    }
}