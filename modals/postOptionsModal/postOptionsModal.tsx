import { memo } from "react"
import { Modal, TouchableWithoutFeedback, View, StyleSheet } from "react-native";

import Icons from "../../constants/icons";

import useSliceSelector from "../../hooks/useSliceSelector";

import MultiButtons from "../../components/app/common/multiButtons/multiButtons";

import ButtonsInterface from "../../components/app/common/multiButtons/interfaces/buttonsInterface";
import PostOptionsModalProps from "./interfaces/postOptionsModal";

const PostOptionsModal = (props: PostOptionsModalProps) => {
    const { isModalVisible, setIsModalVisible, postId } = props;
    const messages = useSliceSelector(state => state.language.messages);
    const test = (val: string) => {
        console.log(val)
    }

    const buttons: ButtonsInterface[] = [
        {
            label: messages.pin,
            action: () => test(postId),
            icon: Icons.galleryIcon,
        },
        {
            label: messages.report,
            action: () => test(postId),
            icon: Icons.atIcon,
        },
        {
            label: messages.delete,
            action: () => test(postId),
            icon: Icons.cameraIcon,
        },
        {
            label: messages.save,
            action: () => test(postId),
            icon: Icons.gifIcon,
        },
    ];

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={() => {
                setIsModalVisible(false);
            }}
        >
            <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
                <View style={styles.modalContainer}>
                    <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
                        <View style={styles.modalView}>
                            <MultiButtons buttons={buttons} />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

export default memo(PostOptionsModal);

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
    }
})