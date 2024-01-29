import { Modal, View, TouchableWithoutFeedback, Image, StyleSheet } from "react-native";
import { memo } from "react";

import { setImageFullScreenModal } from "../../reducers/app/appSlice";
import useReducerDispatch from "../../hooks/useReducerDispatch";
import useSliceSelector from "../../hooks/useSliceSelector";

const ImageFullScreenModal = () => {
    const isImageFullScreenModalVisible = useSliceSelector(state => state.app.imageFullScreeenModal.isVisible);
    const imageModalUri = useSliceSelector(state => state.app.imageFullScreeenModal.imageUri);
    const dispatch = useReducerDispatch();

    return (
        <Modal visible={isImageFullScreenModalVisible} transparent={true}>
            <View style={styles.modalContainer}>
                <TouchableWithoutFeedback onPress={() => dispatch(setImageFullScreenModal({ isVisible: false }))}>
                    <View style={styles.modalContent}>
                        {imageModalUri && <Image source={{ uri: imageModalUri }} style={styles.modalImage} />}
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </Modal>
    )
}

export default memo(ImageFullScreenModal)

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },
    modalContent: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    }
})