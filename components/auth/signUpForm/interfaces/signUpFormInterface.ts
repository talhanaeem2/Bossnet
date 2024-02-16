export default interface SignUpFormInterface {
    email: string;
    confirmEmail: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    nickname: string;
    lastName: string;
    birthday: Date;
    address?: string;
    agreeToTerms: boolean;
}