import { View, StyleSheet, Platform, TouchableOpacity, ActivityIndicator } from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import MainWapper from "../../../components/app/mainWrapper/mainWrapper";
import TextBold from "../../../components/app/common/textComponent/textBold/textBold";
import AppHeader from "../../../components/app/appHeader/appHeader";

import Icons from "../../../constants/icons";
import { RPH, RPW } from "../../../constants/utils/utils";

import useReducerDispatch from "../../../hooks/useReducerDispatch";
import useSliceSelector from "../../../hooks/useSliceSelector";
import { logout } from "../../../reducers/auth/authSlice";
import { resetActiveTab } from "../../../reducers/app/appSlice";

import RootStackParamListInterface from "../../../interfaces/RootStackParamListInterface";
import menuButtonsInterface from "./interfaces/menuButtonsInterface";

const Menu = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation<StackNavigationProp<RootStackParamListInterface>>();
    const dispatch = useReducerDispatch();
    const messages = useSliceSelector(state => state.language.messages);

    const handleLogout = async () => {
        try {
            setIsLoading(true);

            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('userData');

            dispatch(logout());
            dispatch(resetActiveTab());
            setIsLoading(false);

        } catch (error) {
            console.error('Error during logout:', error);
            setIsLoading(false);
            console.log('Error', 'An error occurred during logout. Please try again later.');
        }
    };

    if (isLoading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        )
    }

    const menuButtons: menuButtonsInterface[] = [
        {
            icon: Icons.forumsIcon,
            text: messages.forums
        },
        {
            icon: Icons.historyIcon,
            text: messages.history
        },
        {
            icon: Icons.ebooksIcon,
            text: messages.ebooks
        },
        {
            icon: Icons.photosIcon,
            text: messages.photos
        },
        {
            icon: Icons.accSettingsIcon,
            text: messages.accSettings
        },
        {
            icon: Icons.timelineIcon,
            text: messages.timeline
        },
        {
            icon: Icons.profileIcon,
            text: messages.profile,
            screenName: 'UserProfile'
        },
        {
            icon: Icons.documentsIcon,
            text: messages.documents
        },
        {
            icon: Icons.videosIcon,
            text: messages.videos
        },
        {
            icon: Icons.emailIcon,
            text: messages.emailInvites
        },
        {
            icon: Icons.membersIcon,
            text: messages.members
        },
        {
            icon: Icons.donateIcon,
            text: messages.donate
        }
    ]

    return (
        <MainWapper>
            <View style={styles.container}>
                <AppHeader headerText={messages.menu} icon={true} />
                <View style={styles.contentContainer}>
                    <View style={styles.buttonsContainer}>
                        {menuButtons.map((item, index) => {
                            if (index % 2 === 0) {
                                return (
                                    <View style={styles.rowContainer} key={index}>
                                        <View style={styles.btnContainer}>
                                            <TouchableOpacity onPress={() => navigation.navigate(item.screenName as string)}>
                                                {item.icon}
                                                <TextBold fontSize={19} style={styles.btnText}>
                                                    {item.text}
                                                </TextBold>
                                            </TouchableOpacity>
                                        </View>
                                        {index + 1 < menuButtons.length && (
                                            <View style={styles.btnContainer}>
                                                <TouchableOpacity>
                                                    {menuButtons[index + 1].icon}
                                                    <TextBold fontSize={19} style={styles.btnText}>
                                                        {menuButtons[index + 1].text}
                                                    </TextBold>
                                                </TouchableOpacity>
                                            </View>
                                        )}
                                    </View>
                                );
                            }
                            return null;
                        })}
                    </View>
                    <TouchableOpacity style={styles.logout} onPress={handleLogout}>
                        {Icons.logoutIcon}
                        <TextBold fontSize={19} style={styles.logoutText}>
                            {messages.logout}
                        </TextBold>
                    </TouchableOpacity>
                </View>
            </View>
        </MainWapper>
    )
}

export default Menu

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: RPH(1.6),
        flexDirection: "column",
        justifyContent: 'space-between',
        backgroundColor: "#fff"
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentContainer: {
        paddingHorizontal: RPW(2),
        paddingBottom: RPH(4.9)
    },
    textSpacing: {
        paddingLeft: RPW(5.5)
    },
    btnText: {
        paddingTop: RPH(.2)
    },
    buttonsContainer: {
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#E7E7E7",
        backgroundColor: "#fff",
        marginHorizontal: RPW(2),
        flexDirection: "column",
        paddingHorizontal: RPW(2.7),
        paddingTop: RPH(2),
        paddingBottom: RPH(2.5)
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: RPW(2.8),
    },
    btnContainer: {
        flex: 1,
        backgroundColor: '#FFF',
        borderRadius: 10,
        borderColor: "rgba(247, 246, 245, 0.16)",
        paddingHorizontal: RPW(2.1),
        paddingVertical: RPH(.7),
        marginTop: RPH(1.9),
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(0, 0, 0, 0.15)',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 1,
                shadowRadius: 4,
            },
            android: {
                elevation: 4,
            },
        }),
    },
    logout: {
        flexDirection: "row",
        gap: RPW(2.8),
        borderWidth: 0.5,
        borderColor: 'rgba(247, 246, 245, 0.16)',
        backgroundColor: '#E7E7E7',
        marginHorizontal: RPW(3),
        paddingVertical: RPH(1.1),
        justifyContent: "center",
        borderRadius: 10,
        marginTop: RPH(2.5),
        marginBottom: 10
    },
    logoutText: {
        alignSelf: "center"
    }
})