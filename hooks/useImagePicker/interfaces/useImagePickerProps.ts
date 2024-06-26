import ImageInterface from "../../../components/common/interfaces/imageInterface";

export default interface UseImagePickerProps {
    onImagesSelected?: (selectedImages: ImageInterface[]) => void;
    onImageSelected?: (file: ImageInterface) => void;
    handleProfileUpdate?: (file: ImageInterface) => Promise<void>;
    setShowButtons: (show: boolean) => void;
}