import { BlurView } from "expo-blur"
import { Modal, StyleSheet } from "react-native"
import { memo, useCallback } from "react";

import CreatePost from "../screens/app/createPost/createPost"

import useSliceSelector from "../hooks/useSliceSelector";
import useReducerDispatch from "../hooks/useReducerDispatch";
import { toggleCreatePostModal } from "../reducers/appSlice";

const CreatePostModal = () => {
    const isCreatePostModalVisible = useSliceSelector(state => state.app.createPostModal.isCreatePostModalVisible);
    const dispatch = useReducerDispatch();

    const handleToggleCreatePostModal = useCallback(() => {
        dispatch(toggleCreatePostModal({ isVisible: !isCreatePostModalVisible }));
    }, [isCreatePostModalVisible]);

    const closeModal = () => {
        dispatch(toggleCreatePostModal({ isVisible: false }));
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isCreatePostModalVisible}
            onRequestClose={handleToggleCreatePostModal}
        >
            <BlurView
                intensity={100}
                tint="dark"
                style={StyleSheet.absoluteFill}
            >
                <CreatePost closeModal={closeModal} />
            </BlurView>
        </Modal>
    )
}

export default memo(CreatePostModal)