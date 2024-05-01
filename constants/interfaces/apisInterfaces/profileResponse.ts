export default interface ProfileResponse<T> {
    data: {
        status: boolean;
        data: T;
    }
}