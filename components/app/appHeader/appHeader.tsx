import { View, TouchableOpacity, StyleSheet, Image, TextInput, Animated } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { StackNavigationProp } from "@react-navigation/stack";

import TextBold from "../common/textComponent/textBold/textBold";
import TextRegular from "../common/textComponent/textRegular/textRegular";

import Apis from "../../../constants/apis";
import Icons from "../../../constants/icons";
import { RPW, RPH, getUserInitials, getColorForUser, RFS } from "../../../constants/utils/utils";

import useSliceSelector from "../../../hooks/useSliceSelector";
import useReducerDispatch from "../../../hooks/useReducerDispatch";
import { resetActiveTab, setCreatePostModal, setSearchText } from "../../../reducers/app/appSlice";

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
    const [isInputVisible, setInputVisible] = useState(false);
    const [animation] = useState(new Animated.Value(0));
    const searchText = useSliceSelector(state => state.app.searchText);
    const isFocused = useIsFocused();

    const inputRef = useRef<TextInput>(null);

    const handleToggleInput = () => {
        setInputVisible(!isInputVisible);
        Animated.timing(animation, {
            toValue: isInputVisible ? 0 : 1,
            duration: 300,
            useNativeDriver: false,
        }).start(() => {
            if (!isInputVisible && inputRef.current) {
                inputRef.current.blur();  // Blur the input when hidden
            }
            if (isInputVisible && inputRef.current) {
                inputRef.current.focus();  // Focus the input when visible
            }
        });
        if (!isInputVisible) {
            dispatch(setSearchText(''));
        }
    };

    const inputWidth = animation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '70%']
    });

    const handleToggleCreatePostModal = useCallback(() => {
        dispatch(setCreatePostModal(!isCreatePostModalVisible));
    }, [isCreatePostModalVisible]);

    const goBack = () => {
        navigation.goBack();
        dispatch(resetActiveTab());
    };
    const handleInputChange = (text: string) => {
        dispatch(setSearchText(text));
    };

    useEffect(() => {
        if (!isFocused) {
            setInputVisible(false);
        }
    }, [isFocused]);

    const renderChatHeader = () => (
        <View style={styles.chatHeader}>
            <View style={styles.iconText}>
                <TouchableOpacity onPress={goBack} style={styles.backIcon}>
                    {Icons.backIcon}
                </TouchableOpacity>
                {userData.profileImage ? (
                    <TouchableOpacity style={styles.circle} onPress={() => navigation.navigate('UserProfile')}>
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
        <View style={[styles.header, headerText ? { paddingVertical: RPH(.8) } : null]}>
            <TouchableOpacity onPress={goBack} style={icon ? styles.backIcon : null}>
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
                        <View style={styles.btnContainer}>
                            {/* <View style={styles.spacer}></View> */}
                            <TouchableOpacity onPress={handleToggleCreatePostModal} style={isInputVisible ? { flexGrow: 1 } : null}>
                                {Icons.postIcon}
                            </TouchableOpacity>
                            {
                                isInputVisible && (
                                    <Animated.View style={[styles.animatedInputContainer, { width: inputWidth }]}>
                                        <TextInput
                                            ref={inputRef}
                                            style={styles.input}
                                            placeholder="Search Feed Posts"
                                            value={searchText}
                                            onChangeText={handleInputChange}
                                        />
                                    </Animated.View>
                                )
                            }
                            <TouchableOpacity onPress={handleToggleInput}>
                                {Icons.searchIcon}
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate("Messenger")}>
                                {Icons.messagesIcon}
                            </TouchableOpacity>
                        </View>
                    )
                    }
                </>
            )
            }
        </View >
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
    animatedInputContainer: {
        overflow: 'hidden',
        position: 'absolute',
        top: RPH(-.8),
        right: RPW(16),
    },
    input: {
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.26)',
        borderRadius: 25,
        paddingHorizontal: RPW(2.5),
        paddingVertical: RPH(.6),
        color: "#767676",
        fontSize: RFS(13),
        fontFamily: "Lato-Regular",
        fontWeight: "400"
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: RPW(2),
        paddingRight: RPW(4),
        paddingLeft: RPW(1),
        position: 'relative'
    },
    btnContainer: {
        flexDirection: 'row',
        gap: 8,
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1,
        position: 'relative'
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
        paddingHorizontal: RPW(4),
        paddingVertical: RPH(2)
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