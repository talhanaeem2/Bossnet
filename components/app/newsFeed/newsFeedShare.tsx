import { View, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard, Pressable, Image } from "react-native";
import { memo, useCallback } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

import Icons from "../../../constants/icons";
import { RPW, RPH, RFS } from "../../../constants/utils/utils";
import Apis from "../../../constants/apis";

import useSliceSelector from "../../../hooks/useSliceSelector";
import useReducerDispatch from "../../../hooks/useReducerDispatch";
import { setCreatePostModal } from "../../../reducers/app/appSlice";

import NewsFeedShareProps from "./interfaces/newsFeedShareProps";
import RootStackParamListInterface from "../../../interfaces/RootStackParamListInterface";

const NewsFeedShare = (props: NewsFeedShareProps) => {
    const { showUploadButtons } = props;
    const navigation = useNavigation<StackNavigationProp<RootStackParamListInterface>>();
    const isCreatePostModalVisible = useSliceSelector(state => state.app.createPostModal.isVisible);
    const dispatch = useReducerDispatch();
    const userData = useSliceSelector(state => state.auth.userData);
    const messages = useSliceSelector(state => state.language.messages);

    const handleToggleCreatePostModal = useCallback(() => {
        dispatch(setCreatePostModal(!isCreatePostModalVisible));
    }, [isCreatePostModalVisible]);

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.shareContainer}>
                    <TouchableOpacity style={styles.circle} onPress={() => navigation.navigate("UserProfile")}>
                        {userData.profileImage
                            ? <Image style={styles.roundImg} source={{ uri: `${Apis.homeUrl}${userData.profileImage}` }} />
                            : Icons.userPlaceholderIcon}
                    </TouchableOpacity>
                    <Pressable onPress={handleToggleCreatePostModal}>
                        <TextInput
                            style={styles.input}
                            placeholder={messages.newsfeedPlaceholder}
                            editable={false}
                        />
                    </Pressable>
                    <TouchableOpacity onPress={() => showUploadButtons(true)}>
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
    },
    roundImg: {
        width: '100%',
        height: '100%'
    },
    circle: {
        width: 34,
        height: 34,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        borderRadius: 70,
    }
})