export default interface CreatePostModalProps {
    images: string[];
    handleImagePicker: (action: 'gallery' | 'camera' | 'giphy') => Promise<void>;
    removeImage: (index: number) => void;
}