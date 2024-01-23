import { View, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard } from "react-native"
import { useState } from "react"
import * as ImagePicker from 'expo-image-picker'

import Icons from "../../../constants/icons";
import messages from "../../../constants/messages";
import { RPW, RPH, RFS } from "../../../constants/utils";

const NewsFeedShare = () => {
    const [images, setImages] = useState<string[]>([]);

    const handleImagePicker = async () => {
        let result: ImagePicker.ImagePickerResult;
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
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View>
                    <View style={styles.shareContainer}>
                        <TouchableOpacity>
                            {Icons.userPlaceholderIcon}
                        </TouchableOpacity>
                        <TextInput style={styles.input} placeholder={messages.newsfeedPlaceholder} />
                        <TouchableOpacity onPress={() => handleImagePicker()}>
                            {Icons.uploadIcon}
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default NewsFeedShare

const styles = StyleSheet.create({
    shareContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: RPW(5),
        paddingVertical: RPH(2.5),
        width: "100%",
        alignItems: "center"
    },
    input: {
        flex: 1,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.26)',
        borderRadius: 25,
        marginLeft: RPW(1.2),
        marginRight: RPW(4),
        paddingHorizontal: RPW(2.5),
        paddingVertical: RPH(.6),
        color: "#767676",
        fontSize: RFS(12),
        fontFamily: "Lato-Regular",
        fontWeight: "400"
    }
})