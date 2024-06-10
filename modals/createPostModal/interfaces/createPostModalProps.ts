import ImageInterface from "../../../components/common/interfaces/imageInterface";

export default interface CreatePostModalProps {
    images: ImageInterface[];
    handleImagePicker: (action: string) => Promise<void>;
    removeImage: (index: number) => void;
    uploadImages?: () => void;
    setTitle?: (value: string) => void;
    setDescription?: (value: string) => void;
    description: string;
}