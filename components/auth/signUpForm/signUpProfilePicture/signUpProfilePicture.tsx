import { memo, useCallback, useState } from "react"
import { StyleSheet, View, Image, TouchableOpacity, Modal, Pressable, TouchableWithoutFeedback } from "react-native"
import * as ImagePicker from 'expo-image-picker'

import TextBold from "../../../app/common/textComponent/textBold/textBold"
import TextRegular from "../../../app/common/textComponent/textRegular/textRegular"

import { RPH } from "../../../../constants/utils/utils"

import SignUpProfilePictureProps from "./interfaces/signUpProfilePictureProps"

const userPlaceholder = require("../../../../assets/user-placeholder.png");

const SignUpProfilePicture = (props: SignUpProfilePictureProps) => {
    const { formik } = props
    const [showButtons, setShowButtons] = useState<boolean>(false)

    const showUploadButtons = () => {
        setShowButtons(true)
    }

    const handleImagePicker = useCallback(async (action: 'gallery' | 'camera') => {
        const result = action === 'gallery' ?
            await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                aspect: [1, 1],
                quality: 1,
                allowsEditing: true,
                allowsMultipleSelection: false
            }) :
            await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });

        if (!result.canceled && result.assets.length > 0) {
            let selectedImage = result.assets[0];
            let filename = selectedImage.uri.split('/').pop();
            let uri = selectedImage.uri

            // Infer the type of the image
            let match = /\.(\w+)$/.exec(filename as string);
            let type = match ? `image/${match[1]}` : `image`;

            const file = {
                uri: uri,
                type: type,
                filename: filename || ''
            };
            formik.setFieldValue('image', file);
            setShowButtons(false)
        }
    }, [formik])

    return (
        <View style={styles.inner}>
            <View style={{ alignSelf: 'center' }}>
                <TextBold fontSize={23}>
                    Update Profile Picture
                </TextBold>
            </View>
            <View style={styles.fieldContainer}>
                <TouchableOpacity style={[styles.circle, formik.values.image ? {} : { backgroundColor: '#767676' }]} onPress={showUploadButtons}>
                    {formik.values.image.uri ? (
                        <Image style={styles.roundImg} source={{ uri: formik.values.image.uri }} />
                    ) : (
                        <Image style={styles.roundImg} source={userPlaceholder} />
                    )}
                    <View style={styles.editImage}>
                        <Image source={require("../../../../assets/icons/editImg.png")} />
                    </View>
                </TouchableOpacity>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={showButtons}
                onRequestClose={() => {
                    setShowButtons(false);
                }}
            >
                <TouchableWithoutFeedback onPress={() => setShowButtons(false)}>
                    <View style={styles.modalContainer}>
                        <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
                            <View style={styles.modalView}>
                                <TouchableOpacity style={styles.w100} onPress={() => handleImagePicker('gallery')}>
                                    <TextRegular fontSize={16} color="#000">Open Gallery</TextRegular>
                                </TouchableOpacity>
                                <View style={styles.borderBottom}></View>
                                <TouchableOpacity style={styles.w100} onPress={() => handleImagePicker('camera')}>
                                    <TextRegular fontSize={16} color="#000">Open Camera</TextRegular>
                                </TouchableOpacity>
                                <View style={styles.borderBottom}></View>
                                <Pressable style={styles.w100} onPress={() => setShowButtons(false)}>
                                    <TextRegular fontSize={16} color="#000">Cancel</TextRegular>
                                </Pressable>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    )
}

export default memo(SignUpProfilePicture)

const styles = StyleSheet.create({
    editImage: {
        width: 36,
        height: 25,
        backgroundColor: '#5890FF',
        borderRadius: 6,
        position: 'absolute',
        bottom: -1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    circle: {
        width: 170,
        height: 170,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 6,
        borderColor: "#5890FF",
        borderRadius: 90,
        position: "relative",
        overflow: "hidden"
    },
    roundImg: {
        width: "100%",
        height: "100%"
    },
    inner: {
        marginTop: 94
    },
    fieldContainer: {
        paddingTop: RPH(4),
        gap: RPH(2),
        alignItems: 'center'
    },
    nextButton: {
        backgroundColor: "#308AFF",
        borderRadius: 34,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        paddingVertical: 11,
        paddingHorizontal: 16
    },
    modalContainer: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0, 0, 0, 0.5)"
    },
    modalView: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        alignItems: "flex-start",
        justifyContent: "center",
        gap: 10
    },
    borderBottom: {
        borderBottomWidth: 1,
        borderBottomColor: '#cecece',
        width: '100%'
    },
    w100: {
        width: '100%'
    }
})