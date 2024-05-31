import { View, StyleSheet, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { useCallback } from "react"

import TextBold from "../common/textComponent/textBold/textBold"
import TextRegular from "../common/textComponent/textRegular/textRegular"

import Icons from "../../../constants/icons"
import { RPW, RPH } from "../../../constants/utils/utils"

import useReducerDispatch from "../../../hooks/useReducerDispatch"
import useSliceSelector from "../../../hooks/useSliceSelector"
import { setCreatePostModal } from "../../../reducers/app/appSlice"

import RootStackParamListInterface from "../../../interfaces/RootStackParamListInterface"

const Header = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamListInterface>>()
    const isCreatePostModalVisible = useSliceSelector(state => state.app.createPostModal.isVisible);
    const dispatch = useReducerDispatch();
    const messages = useSliceSelector(state => state.language.messages);

    const handleToggleCreatePostModal = useCallback(() => {
        dispatch(setCreatePostModal({ isVisible: !isCreatePostModalVisible }));
    }, [isCreatePostModalVisible]);

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.headingsContainer}>
                    <TextBold fontSize={23} >
                        {messages.headerTitle}
                    </TextBold>
                    <TextRegular fontSize={15} style={{ paddingBottom: RPH(2) }}>
                        {messages.headerSubTitle}
                    </TextRegular>
                </View>
                <View style={styles.imagesContainer}>
                    <TouchableOpacity onPress={handleToggleCreatePostModal}>
                        {Icons.postIcon}
                    </TouchableOpacity>
                    <TouchableOpacity>
                        {Icons.searchIcon}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("Messenger")}>
                        {Icons.messagesIcon}
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        paddingLeft: RPW(8),
        paddingRight: RPW(5),
        paddingTop: 10
    },
    content: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    headingsContainer: {
        gap: 2
    },
    imagesContainer: {
        flexDirection: "row",
        gap: RPW(5)
    }
})