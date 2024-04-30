export default interface SignUpFormInterface {
    email: string;
    confirmEmail: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    userName: string;
    birthday: Date;
    agreeToTerms: boolean;
}