import { Keyboard, Modal, ScrollView, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, Image } from "react-native"
import { memo, useCallback, useState } from "react";

import TextBold from "../../components/app/common/textComponent/textBold/textBold";
import MultiButtons from "../../components/app/common/multiButtons/multiButtons";
import TextRegular from "../../components/app/common/textComponent/textRegular/textRegular";
import PostVisibilityModal from "../postVisibilityModal/postVisibilityModal";
import SafeAreaViewComponent from "../../components/app/common/SafeAreaViewComponent/SafeAreaViewComponent";

import Apis from "../../constants/apis";
import Icons from "../../constants/icons";
import { RPW, RPH, RFS, getRandomColor, getUserInitials, insertAtCursor } from "../../constants/utils/utils";

import useSliceSelector from "../../hooks/useSliceSelector";
import useReducerDispatch from "../../hooks/useReducerDispatch";
import { setCreatePostModal } from "../../reducers/app/appSlice";

import CreatePostModalProps from "./interfaces/createPostModalProps";
import ButtonsInterface from "../../components/app/common/multiButtons/interfaces/buttonsInterface";

const CreatePostModal = (props: CreatePostModalProps) => {
    const { images, removeImage, handleImagePicker, uploadImages, setDescription, setTitle, description } = props
    const isCreatePostModalVisible = useSliceSelector(state => state.app.createPostModal.isVisible);
    const [selection, setSelection] = useState<{ start: number, end: number }>({ start: 0, end: 0 });
    const userData = useSliceSelector(state => state.auth.userData);
    const messages = useSliceSelector(state => state.language.messages);
    const name = `${userData.firstName} ${userData.lastName}`;
    const dispatch = useReducerDispatch();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState(messages.public);

    const handleToggleCreatePostModal = useCallback(() => {
        dispatch(setCreatePostModal(!isCreatePostModalVisible));
    }, [isCreatePostModalVisible]);

    const closeModal = () => {
        dispatch(setCreatePostModal(false));
        setSelectedOption('Public');
    };

    const buttons: ButtonsInterface[] = [
        {
            label: messages.photoVideo,
            action: () => handleImagePicker('gallery'),
            icon: Icons.galleryIcon,
        },
        {
            label: messages.tagPeople,
            action: () => handleTagPeople('@'),
            icon: Icons.atIcon,
        },
        {
            label: messages.camera,
            action: () => handleImagePicker('camera'),
            icon: Icons.cameraIcon,
        },
        {
            label: messages.gif,
            action: () => handleImagePicker('gallery'),
            icon: Icons.gifIcon,
        },
    ];

    const handleTagPeople = (at: string) => {
        const { newText, newCursorPos } = insertAtCursor(description, selection, at);
        if (setDescription) {
            setSelection({ start: newCursorPos, end: newCursorPos });
            setDescription(newText);
        }
    };

    return (
        <Modal
            animationType="fade"
            visible={isCreatePostModalVisible}
            onRequestClose={handleToggleCreatePostModal}
        >
            <SafeAreaViewComponent>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <View style={styles.container}>
                        <View style={styles.header}>
                            <View style={{ flexDirection: 'row', gap: 12 }}>
                                <TouchableOpacity onPress={() => closeModal()}>
                                    {Icons.backIcon}
                                </TouchableOpacity>
                                <TextBold fontSize={19}>
                                    {messages.createPost}
                                </TextBold>
                            </View>
                            <TouchableOpacity style={styles.btn} onPress={() => uploadImages && uploadImages()}>
                                <TextBold fontSize={16} color="#fff">
                                    {messages.postBtn}
                                </TextBold>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.body}>
                            <View style={styles.content}>
                                {userData.profileImage
                                    ? <View style={styles.circle}>
                                        <Image style={styles.roundImg} source={{ uri: `${Apis.homeUrl}${userData.profileImage}` }} />
                                    </View>
                                    : <View style={[styles.circle, { backgroundColor: getRandomColor() }]}>
                                        <TextBold fontSize={16} color='#fff'>
                                            {getUserInitials(name)}
                                        </TextBold>
                                    </View>
                                }
                                <View style={styles.nameContainer}>
                                    <TextBold fontSize={17}>
                                        {name}
                                    </TextBold>
                                    <TouchableOpacity
                                        style={styles.postVisibility}
                                        onPress={() => setIsModalVisible(true)}
                                    >
                                        {Icons.globe}
                                        <TextRegular fontSize={12} color='#fff'>
                                            {selectedOption}
                                        </TextRegular>
                                        {Icons.downArrow}
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View>
                                <TextInput
                                    style={styles.input}
                                    placeholder='Title'
                                    onChangeText={setTitle}
                                />
                                <TextInput
                                    style={styles.input}
                                    multiline={true}
                                    numberOfLines={8}
                                    placeholder={`${messages.shareMind} ${name}`}
                                    onChangeText={setDescription}
                                    value={description}
                                    selection={selection}
                                    onSelectionChange={({ nativeEvent: { selection } }) => setSelection(selection)}
                                />
                            </View>
                            {images && (
                                <ScrollView>
                                    {images.map((image, index) => (
                                        <View key={index} style={styles.uploadedImageContainer}>
                                            <TouchableOpacity onPress={() => removeImage(index)} style={styles.closeIcon}>
                                                {Icons.grayCross}
                                            </TouchableOpacity>
                                            <Image style={styles.uploadedImage} source={{ uri: image.uri }} />
                                        </View>
                                    ))}
                                </ScrollView>
                            )}
                        </View>
                        <View style={styles.footer}>
                            <MultiButtons buttons={buttons} />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                <PostVisibilityModal
                    isModalVisible={isModalVisible}
                    setIsModalVisible={setIsModalVisible}
                    setSelectedOption={setSelectedOption}
                />
            </SafeAreaViewComponent>
        </Modal >
    )
}

export default memo(CreatePostModal);

const styles = StyleSheet.create({
    closeIcon: {
        position: "absolute",
        zIndex: 2,
        top: RPW(.7),
        left: RPH(.4)
    },
    nameContainer: {
        flexDirection: 'column',
        gap: 4
    },
    postVisibility: {
        backgroundColor: '#308AFF',
        flexDirection: 'row',
        padding: 4,
        alignItems: 'center',
        borderRadius: 5,
        justifyContent: 'space-evenly',
        gap: 6
    },
    uploadedImage: {
        marginTop: RPH(1.2),
        width: "100%",
        height: '100%',
        borderRadius: 8
    },
    uploadedImageContainer: {
        position: "relative",
        paddingHorizontal: RPW(2.5)
    },
    container: {
        backgroundColor: "#fff",
        justifyContent: 'flex-start',
        flexDirection: 'column',
        flex: 1
    },
    header: {
        borderBottomWidth: 1,
        borderBottomColor: "#EBEFF2",
        paddingBottom: RPH(2.4),
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: "center",
        paddingHorizontal: RPW(4)
    },
    body: {
        paddingHorizontal: RPW(3.8),
        paddingVertical: RPH(3.4),
        flexGrow: 1
    },
    footer: {
        alignItems: 'center',
        paddingVertical: RPH(2),
        borderTopWidth: 1,
        borderTopColor: "#EBEFF2",
    },
    input: {
        color: "rgba(118, 118, 118, 0.77)",
        fontSize: RFS(14),
        fontFamily: "Lato-Regular",
        fontWeight: "400"
    },
    btn: {
        backgroundColor: "#308AFF",
        borderRadius: 12,
        paddingHorizontal: RPW(6),
        paddingVertical: RPH(1.4),
        alignItems: "center"
    },
    content: {
        flexDirection: "row",
        gap: RPW(2.6),
        alignItems: "center"
    },
    roundImg: {
        width: '100%',
        height: '100%'
    },
    circle: {
        borderRadius: 80,
        width: 50,
        height: 50,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    }
})