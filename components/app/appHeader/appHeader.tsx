import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { memo, useCallback, useMemo } from "react";
import { StackNavigationProp } from "@react-navigation/stack";

import TextBold from "../common/textComponent/textBold/textBold";
import TextRegular from "../common/textComponent/textRegular/textRegular";

import Apis from "../../../constants/apis";
import Icons from "../../../constants/icons";
import { RPW, RPH, getUserInitials, getColorForUser } from "../../../constants/utils/utils";

import useSliceSelector from "../../../hooks/useSliceSelector";
import useReducerDispatch from "../../../hooks/useReducerDispatch";
import { resetActiveTab, setCreatePostModal } from "../../../reducers/app/appSlice";

import RootStackParamListInterface from "../../../interfaces/RootStackParamListInterface";
import AppHeaderProps from "./interfaces/appHeaderProps";

const AppHeader = (props: AppHeaderProps) => {
    const { chatHeader = false, icon = false, headerText } = props;
    const navigation = useNavigation<StackNavigationProp<RootStackParamListInterface>>();
    const messages = useSliceSelector(state => state.language.messages);
    const userData = useSliceSelector(state => state.auth.userData);
    const isCreatePostModalVisible = useSliceSelector(state => state.app.createPostModal.isVisible);
    const dispatch = useReducerDispatch();
    const loggedInUserColor = useMemo(() => getColorForUser(userData.userId), []);

    const handleToggleCreatePostModal = useCallback(() => {
        dispatch(setCreatePostModal(!isCreatePostModalVisible));
    }, [isCreatePostModalVisible]);

    const goBack = () => {
        navigation.goBack();
        dispatch(resetActiveTab());
    };

    const renderChatHeader = () => (
        <View style={styles.chatHeader}>
            <View style={styles.iconText}>
                <TouchableOpacity onPress={goBack} style={styles.backIcon}>
                    {Icons.backIcon}
                </TouchableOpacity>
                {userData.profileImage ? (
                    <TouchableOpacity style={styles.circle} onPress={() => navigation.navigate("UserProfile")}>
                        <Image style={styles.roundImg} source={{ uri: `${Apis.homeUrl}${userData.profileImage}` }} />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        style={[styles.circle, { backgroundColor: loggedInUserColor }]}
                        onPress={() => navigation.navigate("UserProfile")}
                    >
                        <TextBold fontSize={16} color='#fff'>
                            {getUserInitials(`${userData.firstName} ${userData.lastName}`)}
                        </TextBold>
                    </TouchableOpacity>
                )}
                <TextBold fontSize={23}>
                    {headerText as string}
                </TextBold>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("NewMessage")}>
                {Icons.newMessage}
            </TouchableOpacity>
        </View>
    );

    const renderHeader = () => (
        <View style={[styles.header, headerText ? { paddingVertical: RPH(1.8) } : null]}>
            <TouchableOpacity onPress={goBack}>
                {icon ? Icons.backIcon : <TextRegular fontSize={17}>{headerText as string}</TextRegular>}
            </TouchableOpacity>
            {icon ? (
                <TextBold fontSize={23}>{headerText as string}</TextBold>
            ) : (
                <>
                    {headerText ? (
                        <TextBold fontSize={17} style={styles.friendstext}>
                            {messages.friends}
                        </TextBold>
                    ) : headerText === messages.cancel || !headerText && (
                        <>
                            <View style={styles.spacer}></View>
                            <TouchableOpacity onPress={handleToggleCreatePostModal}>
                                {Icons.postIcon}
                            </TouchableOpacity>
                            <TouchableOpacity>
                                {Icons.searchIcon}
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate("Messenger")}>
                                {Icons.messagesIcon}
                            </TouchableOpacity>
                        </>
                    )
                    }
                </>
            )}
        </View>
    );

    return <>{chatHeader ? renderChatHeader() : renderHeader()}</>;
};

export default memo(AppHeader);

const styles = StyleSheet.create({
    container: {
        paddingLeft: RPW(8),
        paddingRight: RPW(5),
        paddingTop: 10
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: RPW(5),
        paddingHorizontal: 15
    },
    chatHeader: {
        flexDirection: "row",
        gap: RPW(4),
        paddingRight: RPW(2.8),
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        paddingVertical: RPH(1),
        borderBottomWidth: 1,
        borderBottomColor: "#EBEFF2",
        paddingTop: 10
    },
    backIcon: {
        paddingHorizontal: RPW(2)
    },
    iconText: {
        flexDirection: "row",
        alignItems: "center",
        gap: RPW(2.6)
    },
    circle: {
        width: RPW(11.5),
        height: RPH(5.8),
        justifyContent: "center",
        alignItems: "center",
    },
    roundImg: {
        borderRadius: 50,
        width: "100%",
        objectFit: "contain",
        height: RPH(5.8)
    },
    friendstext: {
        textAlign: "center",
        paddingLeft: RPW(25),
        paddingTop: 4
    },
    spacer: {
        flex: 1
    }
});