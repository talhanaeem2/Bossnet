export default interface FormValuesInterface {
    email: string;
    confirmEmail: string;
    password: string;
    confirmPassword: string;
    name: string;
    nickName: string;
    lastName: string;
    birthday: Date | string;
    address?: string;
    agreeToTerms: boolean;
}