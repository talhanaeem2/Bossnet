import { View, Text, StyleSheet, TouchableOpacity, TextInput, PanResponder, Animated, Image, ScrollView } from "react-native"
import { useState } from "react"
import * as ImagePicker from 'expo-image-picker'
import { Path } from "react-native-svg"

import { RFS, RPH } from "../../constants/utils"
import Icons from "../../constants/icons"
import CreatePostProps from "./interfaces/createPostProps"
import IconContainer from "../../components/iconContainer/iconContainer"
import messages from "../../constants/messages"

const CreatePost = ({ closeModal }: CreatePostProps) => {
    const [images, setImages] = useState<string[]>([]);

    const [panResponder] = useState(
        PanResponder.create({
            onMoveShouldSetPanResponder: (_, gestureState) => gestureState.dy > 100,
            onPanResponderRelease: (_, gestureState) => {
                if (gestureState.dy > 1) {
                    closeModal();
                }
            },
        })
    );

    const handleImagePicker = async (action: 'gallery' | 'camera') => {
        let result: ImagePicker.ImagePickerResult;
        if (action === 'gallery') {
            result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                aspect: [4, 3],
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
                aspect: [4, 3],
                quality: 1,
            });
            if (!result.canceled) {
                const selectedImages = result.assets.map((asset) => asset.uri);
                setImages((prevImages) => [...prevImages, ...selectedImages]);
            }
        }

        else if (action === 'giphy') {

        }
    }

    const removeImage = (index: number) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);
    };

    return (
        <Animated.View {...panResponder.panHandlers} style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.text}>{messages.createPost}</Text>
                <TouchableOpacity style={styles.btn}>
                    <Text style={styles.btnText}>{messages.postBtn}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.body}>
                <View style={styles.content}>
                    <View>
                        {Icons.userPlaceholderIcon}
                    </View>
                    <View>
                        <Text style={styles.title}>Aldin Mahmutovic</Text>
                    </View>
                </View>
                <TextInput
                    style={styles.input}
                    multiline={true}
                    numberOfLines={8}
                    placeholder={`${messages.shareMind} Aldin Mahmutovic`}
                />
            </View>
            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={() => handleImagePicker("gallery")}>
                    {Icons.galleryIcon}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleImagePicker("camera")}>
                    {Icons.cameraIcon}
                </TouchableOpacity>
                <TouchableOpacity>
                    {Icons.gifIcon}
                </TouchableOpacity>
                <TouchableOpacity>
                    {Icons.atIcon}
                </TouchableOpacity>
                <TouchableOpacity>
                    {Icons.emojiIcon}
                </TouchableOpacity>
            </View>
            <View style={styles.arrowUp}>
                <TouchableOpacity onPress={closeModal}>
                    {Icons.arrowUpIcon}
                </TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {images && images.map((uri, index) => (
                    <View key={index} style={styles.uploadedImageContainer}>
                        <TouchableOpacity onPress={() => removeImage(index)} style={styles.closeIcon}>
                            <IconContainer width="16px" height="16px" viewBox="0 0 24 24" fill="none">
                                <Path d="M16 8L8 16M8.00001 8L16 16M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </IconContainer>
                        </TouchableOpacity>
                        <Image style={styles.uploadedImage} source={{ uri }} />
                    </View>
                ))}
            </ScrollView>
        </Animated.View>
    )
}

export default CreatePost


const styles = StyleSheet.create({
    closeIcon: {
        position: "absolute",
        zIndex: 2,
        top: 3,
        left: 3
    },
    uploadedImage: {
        marginTop: 10,
        width: 50,
        height: 50,
        resizeMode: 'cover',
        borderRadius: 8
    },
    uploadedImageContainer: {
        justifyContent: "flex-start",
        position: "relative",
        paddingHorizontal: 10
    },
    container: {
        backgroundColor: "#fff",
        marginVertical: RPH(6.5),
        borderRadius: 24,
        marginHorizontal: 25,
        paddingVertical: 12
    },
    header: {
        borderBottomWidth: 1,
        borderBottomColor: "#EBEFF2",
        paddingBottom: 5,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    title: {
        fontFamily: "Lato-Bold",
        fontWeight: "700",
        color: "#000",
        fontSize: RFS(17)
    },
    text: {
        paddingLeft: 15,
        color: "#000",
        fontFamily: "Lato-Bold",
        fontWeight: "700",
        fontSize: RFS(13)
    },
    input: {
        color: "rgba(118, 118, 118, 0.77)",
        fontSize: RFS(14),
        fontFamily: "Lato-Regular",
        fontWeight: "400"
    },
    btn: {
        backgroundColor: "#385DFF",
        borderRadius: 12,
        marginRight: 15,
        paddingHorizontal: 10,
        paddingVertical: 4
    },
    btnText: {
        color: "#fff",
        fontFamily: "Lato-Bold",
        fontWeight: "700",
        fontSize: RFS(10)
    },
    body: {
        paddingHorizontal: 15,
        paddingVertical: 6,
    },
    content: {
        flexDirection: "row",
        gap: 5,
        alignItems: "center"
    },
    iconContainer: {
        flexDirection: "row",
        gap: 48,
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#EBEFF2",
        paddingBottom: 5,
        justifyContent: "center"
    },
    arrowUp: {
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 20
    }
})