import { StyleSheet, View, Image, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useCallback, useState } from "react";
import * as ImagePicker from 'expo-image-picker';

import MainWapper from "../../../components/app/mainWrapper/mainWrapper";
import TextBold from "../../../components/app/common/textComponent/textBold/textBold";
import TextRegular from "../../../components/app/common/textComponent/textRegular/textRegular";
import CreatePostModal from "../../../modals/createPostModal/createPostModal";

import { RPW, RPH, getRandomColor, getUserInitials } from "../../../constants/utils/utils";
import Icons from "../../../constants/icons";
import Apis from "../../../constants/apis";

import useSliceSelector from "../../../hooks/useSliceSelector";
import useReducerDispatch from "../../../hooks/useReducerDispatch";
import { setCreatePostModal } from "../../../reducers/app/appSlice";

import footerIconsInterface from "./interfaces/footerIconsInterface";
import RootStackParamListInterface from "../../../interfaces/RootStackParamListInterface";
import ImageInterface from "../../../components/common/interfaces/imageInterface";
import AppHeader from "../../../components/app/appHeader/appHeader";

const UserProfile = () => {
    const userData = useSliceSelector(state => state.auth.userData);
    const navigation = useNavigation<StackNavigationProp<RootStackParamListInterface>>();
    const [images, setImages] = useState<ImageInterface[]>([]);
    const isCreatePostModalVisible = useSliceSelector(state => state.app.createPostModal.isVisible);
    const dispatch = useReducerDispatch();
    const messages = useSliceSelector(state => state.language.messages);

    const handleToggleCreatePostModal = useCallback(() => {
        dispatch(setCreatePostModal(!isCreatePostModalVisible));
    }, [isCreatePostModalVisible]);

    const handleImagePicker = useCallback(async (action: string) => {
        const permission = await ImagePicker.requestCameraPermissionsAsync();

        if (permission.granted === false) {
            Alert.alert("You've refused to allow this app to access your photos!");
        } else {
            const result = action === "gallery"
                ? await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    aspect: [1, 1],
                    quality: 1,
                    allowsMultipleSelection: true
                })
                : await ImagePicker.launchCameraAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [1, 1],
                    quality: 1,
                });

            if (!result.canceled && result.assets.length > 0) {
                const selectedImages = result.assets.map((image) => {
                    let filename = image.uri.split("/").pop();
                    let uri = image.uri

                    // Infer the type of the image
                    let match = /\.(\w+)$/.exec(filename as string);
                    let type = match ? `image/${match[1]}` : `image`;

                    return {
                        uri: uri,
                        type: type,
                        filename: filename || ""
                    };
                })
                setImages((prevImages) => [...prevImages, ...selectedImages]);
            }
        }
    }, []);

    const removeImage = useCallback((index: number) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);
    }, [images])

    const footerIcons: footerIconsInterface[] = [
        {
            icon: Icons.blockedIcon,
            text: messages.blockedMembers

        },
        {
            icon: Icons.groupIcon,
            text: messages.groupInvites
        },
        {
            icon: Icons.exportIcon,
            text: messages.exportData
        },
        {
            icon: Icons.delIcon,
            text: messages.deleteAcc
        }
    ]

    const name = `${userData.firstName} ${userData.lastName}`;

    return (
        <MainWapper>
            <View style={styles.container}>
                <AppHeader icon={true} />
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
                    <TextBold fontSize={35} style={{ paddingTop: 20, textTransform: 'capitalize' }}>
                        {userData.firstName}
                    </TextBold>
                    <View style={styles.followContainer}>
                        <TextRegular fontSize={19} color="#787878">
                            1 {messages.followers}
                        </TextRegular>
                        <TextRegular fontSize={19} color="#787878">
                            2 {messages.following}
                        </TextRegular>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.createBtn} onPress={handleToggleCreatePostModal}>
                            {Icons.userPlusIcon}
                            <TextBold fontSize={17} color="#fff">
                                {messages.createPost}
                            </TextBold>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.editBtn} onPress={() => navigation.navigate("EditProfile")}>
                            {Icons.userEditIcon}
                            <TextRegular fontSize={17}>
                                {messages.editProfile}
                            </TextRegular>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.settingsContainer}>
                    <TouchableOpacity style={styles.setting}>
                        {Icons.logoutIcon}
                        <TextRegular fontSize={22} color="#1B1B1B">
                            {messages.loginInfo}
                        </TextRegular>
                    </TouchableOpacity>
                    <View style={styles.divider}></View>
                    <TouchableOpacity style={styles.setting}>
                        {Icons.notificationIcon}
                        <TextRegular fontSize={22} color="#1B1B1B">
                            {messages.notificationSettings}
                        </TextRegular>
                    </TouchableOpacity>
                    <View style={styles.divider}></View>
                    <TouchableOpacity style={styles.setting}>
                        {Icons.privacyIcon}
                        <TextRegular fontSize={22} color="#1B1B1B">
                            {messages.privacy}
                        </TextRegular>
                    </TouchableOpacity>
                </View>
                <View style={styles.footer}>
                    {footerIcons.map((item, index) => {
                        return (
                            <TouchableOpacity key={index} style={styles.footerBtnItem}>
                                {item.icon}
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </View>
            <CreatePostModal
                images={images}
                handleImagePicker={handleImagePicker}
                removeImage={removeImage} description={""} />
        </MainWapper>
    )
}

export default UserProfile

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFDFA",
        flex: 1,
        paddingTop: RPH(4),
        position: "relative"
    },
    content: {
        alignItems: "center"
    },
    circle: {
        width: 137,
        height: 137,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        borderRadius: 70,
    },
    roundImg: {
        width: "100%",
        height: '100%'
    },
    followContainer: {
        flexDirection: "row",
        gap: RPW(1),
        paddingVertical: RPH(2.4)
    },
    buttonContainer: {
        flexDirection: "row",
        gap: RPW(3.6)
    },
    createBtn: {
        backgroundColor: "#385DFF",
        borderRadius: 38,
        flexDirection: "row",
        paddingHorizontal: RPW(3),
        paddingVertical: RPH(1.5),
        alignItems: "center",
        justifyContent: "center"
    },
    editBtn: {
        backgroundColor: "#BEBEBE",
        borderRadius: 38,
        flexDirection: "row",
        paddingHorizontal: RPW(3),
        paddingVertical: RPH(1.5),
        alignItems: "center",
        justifyContent: "center",
        gap: RPW(.4)
    },
    settingsContainer: {
        paddingTop: RPH(6.2),
        alignItems: "flex-start",
        marginLeft: RPW(5.4),
        gap: RPW(5)
    },
    setting: {
        flexDirection: "row",
        gap: RPW(2.8)
    },
    divider: {
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        width: "100%"
    },
    footer: {
        flexDirection: "row",
        gap: 6,
        position: "absolute",
        bottom: RPH(2),
        left: RPW(7.2)
    },
    footerBtnItem: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F6F6F6",
        borderWidth: 1,
        borderColor: "#E9E9E9",
        paddingHorizontal: 16,
        paddingVertical: 10
    }
})