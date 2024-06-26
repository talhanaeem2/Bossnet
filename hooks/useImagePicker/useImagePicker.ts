import { useCallback } from 'react';
import * as ImagePicker from 'expo-image-picker';

import useErrorHandling from '../useErrorHandling';

import UseImagePickerProps from './interfaces/useImagePickerProps';
import HandleImagePickerProps from './interfaces/handleImagePickerProps';

const useImagePicker = (props: UseImagePickerProps) => {
    const { onImagesSelected, onImageSelected, handleProfileUpdate, setShowButtons } = props;
    const { handleError } = useErrorHandling();

    const handleImagePicker = useCallback(async (props: HandleImagePickerProps) => {
        const { action, options } = props;
        const permission = await ImagePicker.requestCameraPermissionsAsync();

        if (permission.granted === false) {
            handleError(new Error("You've refused to allow this app to access your photos!"));
            return;
        } else {
            const result = action === "gallery"
                ? await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    aspect: [1, 1],
                    quality: 1,
                    allowsMultipleSelection: options?.allowsMultipleSelection || true,
                    allowsEditing: options?.allowsEditing || false,
                })
                : await ImagePicker.launchCameraAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: options?.allowsEditing || false,
                    aspect: [1, 1],
                    quality: 1,
                });

            if (!result.canceled && result.assets.length > 0) {
                if (options?.allowsMultipleSelection) {
                    const selectedImages = result.assets.map((image) => {
                        let filename = image.uri.split("/").pop()!;
                        let uri = image.uri;

                        let match = /\.(\w+)$/.exec(filename);
                        let type = match ? `image/${match[1]}` : `image`;

                        return {
                            uri: uri,
                            type: type,
                            filename: filename
                        };
                    });
                    setShowButtons(false);
                    onImagesSelected && onImagesSelected(selectedImages);
                } else {
                    let selectedImage = result.assets[0];
                    let filename = selectedImage.uri.split("/").pop()!;
                    let uri = selectedImage.uri;

                    let match = /\.(\w+)$/.exec(filename);
                    let type = match ? `image/${match[1]}` : `image`;

                    const file = {
                        uri: uri,
                        type: type,
                        filename: filename
                    };
                    setShowButtons(false);
                    onImageSelected && onImageSelected(file);
                }
            }
        }
    }, [onImagesSelected, onImageSelected, handleProfileUpdate, setShowButtons]);

    return handleImagePicker;
};

export default useImagePicker;
