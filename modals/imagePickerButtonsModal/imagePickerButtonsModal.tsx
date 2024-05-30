import { memo } from "react"
import { Modal, TouchableWithoutFeedback, View, TouchableOpacity, Pressable, StyleSheet } from "react-native"

import TextRegular from "../../components/app/common/textComponent/textRegular/textRegular"

import ImagePickerButtonsModalProps from "./interfaces/imagePickerButtonsModalProps";

const ImagePickerButtonsModal = (props: ImagePickerButtonsModalProps) => {
    const { handleImagePicker, showButtons, setShowButtons } = props;

    return (
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
    )
}

export default memo(ImagePickerButtonsModal)

const styles = StyleSheet.create({
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