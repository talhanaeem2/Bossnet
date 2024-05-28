export default interface ProfileResponse {
    status: boolean;
    data: {
        data: {
            userId: string;
            email: string;
            firstName: string;
            lastName: string;
            userName: string;
            dayOfBirth: string;
            profileImage: string;
        }
    };
}