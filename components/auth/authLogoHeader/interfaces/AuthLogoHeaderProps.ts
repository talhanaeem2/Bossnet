export default interface AuthLogoHeaderProps {
    formik?: {
        setFieldValue: (field: string, value: string, shouldValidate?: boolean | undefined) => void;
    };
}