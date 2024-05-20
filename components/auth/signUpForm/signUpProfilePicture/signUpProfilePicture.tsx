import { memo, useCallback, useState } from "react"
import { StyleSheet, View, Image, TouchableOpacity } from "react-native"
import * as ImagePicker from 'expo-image-picker'

import TextBold from "../../../app/common/textComponent/textBold/textBold"
import TextRegular from "../../../app/common/textComponent/textRegular/textRegular"

import { RPH } from "../../../../constants/utils/utils"

import SignUpProfilePictureProps from "./interfaces/signUpProfilePictureProps"

const SignUpProfilePicture = (props: SignUpProfilePictureProps) => {
    const { formik } = props
    const [showButtons, setShowButtons] = useState<boolean>(false)

    const showUploadButtons = () => {
        setShowButtons(true)
    }

    const handleImagePicker = useCallback(async (action: 'gallery' | 'camera') => {
        let result: ImagePicker.ImagePickerResult;
        if (action === 'gallery') {
            result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                aspect: [1, 1],
                quality: 1,
                allowsMultipleSelection: false
            });
            if (!result.canceled) {
                const selectedImage = result.assets[0];
                const file = {
                    uri: selectedImage.uri,
                    type: selectedImage.type,
                    name: selectedImage.uri.split('/').pop(),
                    width: selectedImage.width,
                    height: selectedImage.height
                };
                formik.setFieldValue('image', file)
                setShowButtons(false)
            }

        } else if (action === 'camera') {
            result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });
            if (!result.canceled) {
                const selectedImage = result.assets[0];
                console.log(result.assets)
                const file = {
                    uri: selectedImage.uri,
                    type: selectedImage.type,
                    name: selectedImage.uri,
                    width: selectedImage.width,
                    height: selectedImage.height
                };
                formik.setFieldValue('image', file)
                setShowButtons(false)
            }
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
                        <Image style={styles.roundImg} source={require("../../../../assets/signup-picture.png")} />
                    )}
                    <View style={styles.editImage}>
                        <Image source={require("../../../../assets/icons/editImg.png")} />
                    </View>
                </TouchableOpacity>
                {
                    showButtons && (
                        <View style={{ flexDirection: 'row', gap: 16 }}>
                            <TouchableOpacity style={styles.nextButton} onPress={() => handleImagePicker('gallery')}>
                                <TextRegular fontSize={16} color="#fff">Open Gallery</TextRegular>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.nextButton} onPress={() => handleImagePicker('camera')}>
                                <TextRegular fontSize={16} color="#fff">Open Camera</TextRegular>
                            </TouchableOpacity>
                        </View>
                    )
                }
            </View>
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
        width: 174,
        height: 174,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 6,
        borderColor: '#5890FF',
        borderRadius: 90,
        position: 'relative',
        padding: 30,
        marginBottom: 52
    },
    roundImg: {
        width: "100%",
        height: "100%",
        resizeMode: "contain"
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
})