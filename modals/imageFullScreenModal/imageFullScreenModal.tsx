import { Modal, View, TouchableWithoutFeedback, Image, StyleSheet, Animated } from "react-native";
import { memo, useEffect, useRef } from "react";

import { setImageFullScreenModal } from "../../reducers/app/appSlice";
import useReducerDispatch from "../../hooks/useReducerDispatch";
import useSliceSelector from "../../hooks/useSliceSelector";

const ImageFullScreenModal = () => {
    const isImageFullScreenModalVisible = useSliceSelector(state => state.app.imageFullScreeenModal.isVisible);
    const imageModalUri = useSliceSelector(state => state.app.imageFullScreeenModal.imageUri);
    const dispatch = useReducerDispatch();

    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (isImageFullScreenModalVisible) {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true
            }).start();
        }
    }, [isImageFullScreenModalVisible]);

    const closeModal = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true
        }).start(() => {
            dispatch(setImageFullScreenModal({ isVisible: false }));
        });
    };

    return (
        <Modal visible={isImageFullScreenModalVisible} transparent={true}>
            <Animated.View style={[styles.modalContainer, { opacity: fadeAnim }]}>
                <TouchableWithoutFeedback onPress={closeModal}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalContent}>
                            {imageModalUri && <Image source={{ uri: imageModalUri }} style={styles.modalImage} />}
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Animated.View>
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