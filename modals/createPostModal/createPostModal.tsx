import { BlurView } from "expo-blur"
import { Modal, StyleSheet } from "react-native"
import { memo, useCallback } from "react";

import CreatePost from "../../screens/app/createPost/createPost"

import useSliceSelector from "../../hooks/useSliceSelector";
import useReducerDispatch from "../../hooks/useReducerDispatch";
import { setCreatePostModal } from "../../reducers/app/appSlice";

const CreatePostModal = () => {
    const isCreatePostModalVisible = useSliceSelector(state => state.app.modals.createPostModal.isVisible);
    const dispatch = useReducerDispatch();

    const handleToggleCreatePostModal = useCallback(() => {
        dispatch(setCreatePostModal({ modals: { isVisible: !isCreatePostModalVisible } }));
    }, [isCreatePostModalVisible]);

    const closeModal = () => {
        dispatch(setCreatePostModal({ modals: { isVisible: false } }));
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