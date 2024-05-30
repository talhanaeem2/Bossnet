export default interface ImagePickerButtonsModalProps {
    handleImagePicker: (action: 'gallery' | 'camera') => Promise<void>;
    showButtons: boolean;
    setShowButtons: (value: boolean) => void;
}