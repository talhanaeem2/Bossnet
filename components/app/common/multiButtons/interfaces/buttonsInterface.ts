export default interface ButtonsInterface {
    label: string;
    action: (action?: string) => Promise<void> | void;
    icon: JSX.Element;
}