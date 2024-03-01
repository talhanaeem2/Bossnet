export default interface ProfileResponse<T> {
    status: boolean;
    data: {
        response: {
            status: boolean;
            data: {
                auth: T
            };
        };
    };
}