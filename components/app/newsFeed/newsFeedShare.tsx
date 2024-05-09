import { View, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard, Pressable } from "react-native"
import { memo, useCallback } from "react"
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

import Icons from "../../../constants/icons";
import messages from "../../../constants/messages";
import { RPW, RPH, RFS } from "../../../constants/utils/utils";

import useSliceSelector from "../../../hooks/useSliceSelector";
import useReducerDispatch from "../../../hooks/useReducerDispatch";
import { setCreatePostModal } from "../../../reducers/app/appSlice";

import RootStackParamListInterface from "../../../interfaces/RootStackParamListInterface";
import NewsFeedShareProps from "./interfaces/newsFeedShareProps";

const NewsFeedShare = (props: NewsFeedShareProps) => {
    const { handleImagePicker } = props
    const navigation = useNavigation<StackNavigationProp<RootStackParamListInterface>>();
    const isCreatePostModalVisible = useSliceSelector(state => state.app.createPostModal.isVisible);
    const dispatch = useReducerDispatch();

    const handleToggleCreatePostModal = useCallback(() => {
        dispatch(setCreatePostModal({ isVisible: !isCreatePostModalVisible }));
    }, [isCreatePostModalVisible]);

    const handleOpenGallery = useCallback(() => {
        dispatch(setCreatePostModal({ isVisible: !isCreatePostModalVisible }));
        handleImagePicker('gallery')
    }, [])

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.shareContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate("UserProfile")}>
                        {Icons.userPlaceholderIcon}
                    </TouchableOpacity>
                    <Pressable onPress={handleToggleCreatePostModal}>
                        <TextInput
                            style={styles.input}
                            placeholder={messages.newsfeedPlaceholder}
                            editable={false}
                        />
                    </Pressable>
                    <TouchableOpacity onPress={handleOpenGallery}>
                        {Icons.uploadIcon}
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default memo(NewsFeedShare)

const styles = StyleSheet.create({
    shareContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: RPW(5),
        paddingBottom: RPH(2),
        width: "100%",
        alignItems: "center"
    },
    input: {
        flex: 1,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.26)',
        borderRadius: 25,
        marginLeft: RPW(1.2),
        marginRight: RPW(4),
        paddingHorizontal: RPW(2.5),
        paddingVertical: RPH(.6),
        color: "#767676",
        fontSize: RFS(12),
        fontFamily: "Lato-Regular",
        fontWeight: "400"
    }
})