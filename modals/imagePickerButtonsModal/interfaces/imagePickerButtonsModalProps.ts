export default interface ImagePickerButtonsModalProps {
    handleImagePicker: (action: string) => Promise<void>;
    showButtons: boolean;
    setShowButtons: (value: boolean) => void;
}