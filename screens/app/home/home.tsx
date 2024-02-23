import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native"
import { memo, useCallback, useState } from "react";
import * as ImagePicker from 'expo-image-picker'

import Header from "../../../components/app/header/header";
import Footer from "../../../components/app/footer/footer";
import NewsFeed from "../../../components/app/newsFeed/newsFeed";
import NewsFeedShare from "../../../components/app/newsFeed/newsFeedShare";
import SafeAreaViewComponent from "../../../components/app/SafeAreaViewComponent/SafeAreaViewComponent";
import CreatePostModal from "../../../modals/createPostModal/createPostModal";

import { RPH, RPW } from "../../../constants/utils";
import Icons from "../../../constants/icons";

import useReducerDispatch from "../../../hooks/useReducerDispatch";
import useSliceSelector from "../../../hooks/useSliceSelector";
import { setCreatePostModal } from "../../../reducers/app/appSlice";

const { height } = Dimensions.get("window");

const Home = () => {
    const isCreatePostModalVisible = useSliceSelector(state => state.app.createPostModal.isVisible);
    const dispatch = useReducerDispatch();
    const [images, setImages] = useState<string[]>([]);

    const handleToggleCreatePostModal = useCallback(() => {
        dispatch(setCreatePostModal({ isVisible: !isCreatePostModalVisible }));
    }, [isCreatePostModalVisible]);

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

    return (
        <SafeAreaViewComponent>
            <View style={styles.container}>
                <Header />
                <NewsFeedShare handleImagePicker={handleImagePicker} />
                <NewsFeed />
                <View style={styles.newpostContainer}>
                    <TouchableOpacity style={styles.newPostBtn} onPress={handleToggleCreatePostModal}>
                        {Icons.postIcon}
                    </TouchableOpacity>
                </View>
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
    newPostBtn: {
        backgroundColor: "#385DFF",
        borderRadius: 50,
        paddingVertical: RPH(1.6),
        paddingHorizontal: RPW(3.2)
    },
    newpostContainer: {
        position: "absolute",
        bottom: height * .16,
        right: RPW(2.2)
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