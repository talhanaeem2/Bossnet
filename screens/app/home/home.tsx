import { Alert, StyleSheet, View } from "react-native";
import { memo, useCallback, useEffect, useState } from "react";
import * as ImagePicker from 'expo-image-picker';

import Header from "../../../components/app/header/header";
import Footer from "../../../components/app/footer/footer";
import NewsFeed from "../../../components/app/newsFeed/newsFeed";
import SafeAreaViewComponent from "../../../components/app/common/SafeAreaViewComponent/SafeAreaViewComponent";
import CreatePostModal from "../../../modals/createPostModal/createPostModal";
import ImagePickerButtonsModal from "../../../modals/imagePickerButtonsModal/imagePickerButtonsModal";
import ImageInterface from "../../../components/common/interfaces/imageInterface";

import Apis from "../../../constants/apis";
import { RPH } from "../../../constants/utils/utils";
import requestUtils from "../../../constants/utils/requestUtils";

import useToken from "../../../hooks/useToken";
import useReducerDispatch from "../../../hooks/useReducerDispatch";
import useErrorHandling from "../../../hooks/useErrorHandling";
import useSuccessHandling from "../../../hooks/useSuccessHandling";

import { setCreatePostModal } from "../../../reducers/app/appSlice";
import { setUserData } from "../../../reducers/auth/authSlice";

import MediaUploadResponseData from "../../../constants/interfaces/apisInterfaces/mediaUploadResponseData";
import IProfileData from "../../../interfaces/IProfileData";
import CreatePostResponse from "./interfaces/createPostResponse";

const Home = () => {
    const [images, setImages] = useState<ImageInterface[]>([]);
    const dispatch = useReducerDispatch();
    const { getToken } = useToken();
    const [showButtons, setShowButtons] = useState(false);
    const { handleError } = useErrorHandling();
    const [fileIds, setFileIds] = useState<string[]>();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const { handleSuccess } = useSuccessHandling();
    const [isPostCreated, setIsPostCreated] = useState(false);
    const [isUploadComplete, setIsUploadComplete] = useState(false);

    const showUploadButtons = () => {
        setShowButtons(!showButtons)
    }

    const createPost = useCallback(async () => {
        const accessToken = await getToken();
        if (!accessToken) return;

        try {
            await requestUtils.request<CreatePostResponse, { title: string, description: string, media?: string[] }>(
                Apis.newsFeedApi,
                'POST',
                {
                    title: title,
                    description: description,
                    media: fileIds

                },
                { 'Authorization': `Bearer ${accessToken}` }
            );
            handleSuccess('Post Created!');
            setIsPostCreated(!isPostCreated);
            dispatch(setCreatePostModal(false));
            resetPostState();
        } catch (error) {
            handleError(error);
        }

    }, [getToken, title, description, fileIds, isPostCreated, handleError, dispatch])

    const resetPostState = useCallback(() => {
        setTitle('');
        setDescription('');
        setFileIds([]);
        setImages([]);
        setIsUploadComplete(false);
    }, []);

    const uploadImages = useCallback(async () => {
        const accessToken = await getToken();
        if (!accessToken) return;

        const formData = new FormData();
        images.forEach((image) => {
            // @ts-ignore: Unreachable code error
            formData.append("file", { uri: image.uri, type: image.type, name: image.filename })
        })

        try {
            const response = await requestUtils.request<MediaUploadResponseData[], FormData>(
                Apis.uploadMedia,
                'POST',
                formData,
                { 'Authorization': `Bearer ${accessToken}` },
                true
            );

            const ids = response.map(item => item._id);
            setFileIds(ids);
            setIsUploadComplete(true);
        } catch (error) {
            handleError(error);
        }
    }, [getToken, images, handleError])

    useEffect(() => {
        if (isUploadComplete) {
            createPost();
        }
    }, [createPost, isUploadComplete]);

    const handleImagePicker = useCallback(async (action: string) => {
        const permission = await ImagePicker.requestCameraPermissionsAsync();

        if (permission.granted === false) {
            Alert.alert("You've refused to allow this app to access your photos!");
        } else {
            const result = action === "gallery"
                ? await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    aspect: [1, 1],
                    quality: 1,
                    allowsMultipleSelection: true
                })
                : await ImagePicker.launchCameraAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [1, 1],
                    quality: 1,
                });

            if (!result.canceled && result.assets.length > 0) {
                const selectedImages = result.assets.map((image) => {
                    let filename = image.uri.split("/").pop();
                    let uri = image.uri

                    // Infer the type of the image
                    let match = /\.(\w+)$/.exec(filename as string);
                    let type = match ? `image/${match[1]}` : `image`;

                    return {
                        uri: uri,
                        type: type,
                        filename: filename || ""
                    };
                })
                setShowButtons(false);
                setImages((prevImages) => [...prevImages, ...selectedImages]);
            }
        }
    }, []);

    const removeImage = useCallback((index: number) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);
    }, [images])

    const fetchData = useCallback(async () => {
        const accessToken = await getToken();
        if (!accessToken) return;

        try {
            const response = await requestUtils.request<IProfileData, void>(
                Apis.profileApi,
                'GET',
                undefined,
                { 'Authorization': `Bearer ${accessToken}` }
            );

            dispatch(setUserData(response))

        } catch (error) {
            console.log(error);
        }
    }, [getToken, dispatch])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    return (
        <SafeAreaViewComponent>
            <View style={styles.container}>
                <Header />
                <NewsFeed showUploadButtons={showUploadButtons} isPostCreated={isPostCreated} />
                <CreatePostModal
                    uploadImages={uploadImages}
                    images={images}
                    handleImagePicker={handleImagePicker}
                    removeImage={removeImage}
                    setTitle={setTitle}
                    setDescription={setDescription}
                    description={description}
                />
                <ImagePickerButtonsModal
                    handleImagePicker={handleImagePicker}
                    showButtons={showButtons}
                    setShowButtons={setShowButtons}
                />
                <View style={styles.footer}>
                    <Footer />
                </View>
            </View>
        </SafeAreaViewComponent>
    )
}

export default memo(Home)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: RPH(.8),
        backgroundColor: "#FFFDFA",
        position: "relative"
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
    }
})