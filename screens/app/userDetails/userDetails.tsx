import { memo, useMemo, useState } from "react"
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, useRoute } from "@react-navigation/native";

import MainWapper from "../../../components/app/mainWrapper/mainWrapper";
import TextBold from "../../../components/app/common/textComponent/textBold/textBold";
import TextRegular from "../../../components/app/common/textComponent/textRegular/textRegular";

import Apis from "../../../constants/apis";
import Icons from "../../../constants/icons";
import { getColorForUser, getUserInitials, RPH, RPW, truncateText } from "../../../constants/utils/utils";

import RootStackParamListInterface from "../../../interfaces/RootStackParamListInterface";
import IProfileData from "../../../interfaces/IProfileData";
import TabHeading from "../../../components/app/common/tabs/interfaces/tabbHeading";
import Tabs from "../../../components/app/common/tabs/tabs";
import Posts from "./tabs/posts";
import Photos from "./tabs/photos";

const UserDetails = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamListInterface>>();
    const route = useRoute();
    const params = route.params as IProfileData;
    const name = `${params.firstName} ${params.lastName}`;
    const userName = params.userName;
    const bio = params.bio;
    const userInitials = useMemo(() => getUserInitials(name), [params]);
    const bgUser = useMemo(() => getColorForUser(params.userId), [params]);
    const [selectedTab, setSelectedTab] = useState('Post');

    const goBack = () => {
        navigation.goBack();
    }

    const tabHeadings: TabHeading[] = [
        { title: 'Post' },
        { title: 'Photos' },
        { title: 'Reels' }
    ];

    const renderTabContent = () => {
        switch (selectedTab) {
            case 'Post':
                return <Posts />;
            case 'Photos':
                return <Photos />;
            case 'Reels':
                return <TextRegular fontSize={14}>Reels Content</TextRegular>;
            default:
                return null;
        }
    }

    return (
        <MainWapper>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={goBack}>
                        {Icons.backIcon}
                    </TouchableOpacity>
                    <View style={styles.headerOptions}>
                        <TouchableOpacity>
                            {Icons.userNotification}
                        </TouchableOpacity>
                        <TouchableOpacity>
                            {Icons.dotsEncircled}
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.body}>
                    <View style={styles.details}>
                        <View style={styles.userDetails}>
                            <TextBold fontSize={16}>
                                {name}
                            </TextBold>
                            <TextRegular fontSize={13}>
                                {userName}
                            </TextRegular>
                            <TextBold fontSize={12}>
                                {bio ? bio : truncateText("Lorem Ipsum is simply dummy text of the printing and typesetting", 40)}
                            </TextBold>
                        </View>
                        <View style={styles.userImage}>
                            {params.profileImage
                                ? <View style={styles.circle}>
                                    <Image style={styles.roundImg} source={{ uri: `${Apis.homeUrl}${params.profileImage}` }} />
                                </View>
                                : <View style={[styles.circle, { backgroundColor: bgUser }]}>
                                    <TextBold fontSize={14} color='#fff'>
                                        {userInitials}
                                    </TextBold>
                                </View>
                            }
                        </View>
                    </View>
                    <View style={styles.bthContainer}>
                        <TouchableOpacity style={[styles.btn, styles.btnBlue]}>
                            <TextBold fontSize={16} color="#fff">
                                Follow
                            </TextBold>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.btn, styles.btnWhite]}>
                            <TextBold fontSize={16}>
                                Message
                            </TextBold>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.content}>
                        <Tabs tabs={tabHeadings} onTabPress={setSelectedTab} activeTab={selectedTab} />
                        <View style={styles.tabContent}>
                            {renderTabContent()}
                        </View>
                    </View>
                </View>
            </View>
        </MainWapper>
    )
}

export default memo(UserDetails);

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FCFCFC',
        flex: 1
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: RPH(1),
        paddingHorizontal: RPW(5)
    },
    headerOptions: {
        flexDirection: 'row',
        gap: 10
    },
    body: {
        flex: 1,
        paddingVertical: RPH(1)
    },
    content: {
        flex: 1
    },
    tabHeader: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: '#c1c1c1',
        paddingVertical: 14,
        paddingHorizontal: 20,
        gap: 24
    },
    tabContent: {
        flex: 1
    },
    details: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: RPW(5),
    },
    userDetails: {
        gap: 2
    },
    userImage: {
    },
    bthContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        gap: 10,
        paddingVertical: RPH(3),
        paddingHorizontal: RPW(5),
    },
    btn: {
        borderRadius: 12,
        paddingHorizontal: RPW(6),
        paddingVertical: RPH(1.4),
        alignItems: "center",
        flexGrow: 1
    },
    btnBlue: {
        backgroundColor: "#308AFF"
    },
    btnWhite: {
        backgroundColor: "#fff"
    },
    circle: {
        width: 60,
        height: 60,
        borderRadius: 50,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    roundImg: {
        width: "100%",
        height: '100%'
    },
})