import { BlurView } from "expo-blur"
import { Keyboard, Modal, StyleSheet, TouchableWithoutFeedback } from "react-native"
import { memo, useCallback } from "react";

import CreatePost from "../../screens/app/createPost/createPost"

import useSliceSelector from "../../hooks/useSliceSelector";
import useReducerDispatch from "../../hooks/useReducerDispatch";
import { setCreatePostModal } from "../../reducers/app/appSlice";

const CreatePostModal = () => {
    const isCreatePostModalVisible = useSliceSelector(state => state.app.createPostModal.isVisible);
    const dispatch = useReducerDispatch();

    const handleToggleCreatePostModal = useCallback(() => {
        dispatch(setCreatePostModal({ isVisible: !isCreatePostModalVisible }));
    }, [isCreatePostModalVisible]);

    const closeModal = () => {
        dispatch(setCreatePostModal({ isVisible: false }));
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isCreatePostModalVisible}
            onRequestClose={handleToggleCreatePostModal}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <BlurView
                    intensity={100}
                    tint="dark"
                    style={StyleSheet.absoluteFill}
                >
                    <CreatePost closeModal={closeModal} />
                </BlurView>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

export default memo(CreatePostModal)