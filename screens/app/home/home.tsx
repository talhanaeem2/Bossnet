import { StyleSheet, View } from "react-native"
import { memo, useCallback, useEffect, useState } from "react";
import * as ImagePicker from 'expo-image-picker'
import axios from "axios";

import Header from "../../../components/app/header/header";
import Footer from "../../../components/app/footer/footer";
import NewsFeed from "../../../components/app/newsFeed/newsFeed";
import SafeAreaViewComponent from "../../../components/app/SafeAreaViewComponent/SafeAreaViewComponent";
import CreatePostModal from "../../../modals/createPostModal/createPostModal";

import { RPH } from "../../../constants/utils";
import Apis from "../../../constants/apis";

import useSliceSelector from "../../../hooks/useSliceSelector";
import useReducerDispatch from "../../../hooks/useReducerDispatch";
import { setUserData } from "../../../reducers/auth/authSlice";

import ProfileResponse from "../../../constants/interfaces/apisInterfaces/profileResponse";
import AuthData from "../../../constants/interfaces/apisInterfaces/authData";

const Home = () => {
    const isCreatePostModalVisible = useSliceSelector(state => state.app.createPostModal.isVisible);
    const [images, setImages] = useState<string[]>([]);
    const token = useSliceSelector(state => state.auth.token)
    const dispatch = useReducerDispatch()
    const userData = useSliceSelector(state => state.auth.userData)
    console.log('state', userData)

    const handleImagePicker = useCallback(async (action: 'gallery' | 'camera' | 'giphy') => {
        let result: ImagePicker.ImagePickerResult;
        if (action === 'gallery') {
            result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                aspect: [1, 1],
                quality: 1,
                allowsMultipleSelection: true
            });
            if (!result.canceled) {
                const selectedImages = result.assets.map((asset) => asset.uri);
                setImages((prevImages) => [...prevImages, ...selectedImages]);
            }

        } else if (action === 'camera') {
            result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });
            if (!result.canceled) {
                const selectedImages = result.assets.map((asset) => asset.uri);
                setImages((prevImages) => [...prevImages, ...selectedImages]);
            }
        }
    }, [])

    const removeImage = useCallback((index: number) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);
    }, [images])

    const fetchData = async () => {
        try {
            const response: ProfileResponse<AuthData> = await axios.get(Apis.profileApi, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(JSON.stringify(response.data.response.data.auth));
            dispatch(setUserData(response.data.response.data.auth))

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <SafeAreaViewComponent>
            <View style={styles.container}>
                <Header />
                <NewsFeed handleImagePicker={handleImagePicker} />
                {isCreatePostModalVisible && (
                    <CreatePostModal
                        images={images}
                        handleImagePicker={handleImagePicker}
                        removeImage={removeImage} />
                )}
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