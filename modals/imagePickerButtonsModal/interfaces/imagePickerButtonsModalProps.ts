import ImagePickerOptions from "../../../hooks/useImagePicker/interfaces/imagePickerOptions";

export default interface ImagePickerButtonsModalProps {
    handleImagePicker: (action: string, options?: ImagePickerOptions) => Promise<void>;
    showButtons: boolean;
    setShowButtons: (value: boolean) => void;
}