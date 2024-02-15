export default interface FormValuesInterface {
    email: string;
    confirmEmail: string;
    password: string;
    confirmPassword: string;
    name: string;
    nickname: string;
    lastName: string;
    birthday: Date;
    address?: string;
    agreeToTerms: boolean;
}