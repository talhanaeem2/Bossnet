import { StyleSheet, View, Image, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { useCallback, useState } from "react"
import * as ImagePicker from 'expo-image-picker'

import MainWapper from "../../../components/app/mainWrapper/mainWrapper"
import TextBold from "../../../components/app/common/textComponent/textBold/textBold"
import TextRegular from "../../../components/app/common/textComponent/textRegular/textRegular"
import CreatePostModal from "../../../modals/createPostModal/createPostModal"

import { RPW, RPH } from "../../../constants/utils/utils"
import Icons from "../../../constants/icons"
import Apis from "../../../constants/apis"

import useSliceSelector from "../../../hooks/useSliceSelector"
import useReducerDispatch from "../../../hooks/useReducerDispatch"
import { setCreatePostModal } from "../../../reducers/app/appSlice"

import footerIconsInterface from "./interfaces/footerIconsInterface"
import RootStackParamListInterface from "../../../interfaces/RootStackParamListInterface"

const footerIcons: footerIconsInterface[] = [
    {
        icon: Icons.blockedIcon,
        text: "Blocked Members"

    },
    {
        icon: Icons.groupIcon,
        text: "Group Invites"
    },
    {
        icon: Icons.exportIcon,
        text: "Export Data"
    },
    {
        icon: Icons.delIcon,
        text: "Delete Account"
    }
]

const UserProfile = () => {
    const userData = useSliceSelector(state => state.auth.userData)
    const navigation = useNavigation<StackNavigationProp<RootStackParamListInterface>>();
    const [images, setImages] = useState<string[]>([]);
    const isCreatePostModalVisible = useSliceSelector(state => state.app.createPostModal.isVisible);
    const dispatch = useReducerDispatch();
    console.log(userData)

    const handleToggleCreatePostModal = useCallback(() => {
        dispatch(setCreatePostModal({ isVisible: !isCreatePostModalVisible }));
    }, [isCreatePostModalVisible]);

    const handleImagePicker = useCallback(async (action: 'gallery' | 'camera' | 'giphy') => {
        let result: ImagePicker.ImagePickerResult;
        if (action === 'gallery') {
            result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                aspect: [1, 1],
                quality: 1,
                allowsMultipleSelection: true
            });
            if (!result.canceled) {
                const selectedImages = result.assets.map((asset) => asset.uri);
                setImages((prevImages) => [...prevImages, ...selectedImages]);
            }

        } else if (action === 'camera') {
            result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });
            if (!result.canceled) {
                const selectedImages = result.assets.map((asset) => asset.uri);
                setImages((prevImages) => [...prevImages, ...selectedImages]);
            }
        }
    }, [])

    const removeImage = useCallback((index: number) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);
    }, [images])

    return (
        <MainWapper isHeader={true} isFooter={false} icon={true}>
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.circle}>
                        {userData.profileImage
                            ? <Image style={styles.roundImg} source={{ uri: `${Apis.homeUrl}${userData.profileImage}` }} />
                            : <Image style={styles.roundImg} source={require("../../../assets/user-placeholder.png")} />
                        }
                    </View>
                    <TextBold fontSize={35} style={{ paddingTop: 20, textTransform: 'capitalize' }}>
                        {userData.firstName}
                    </TextBold>
                    <View style={styles.followContainer}>
                        <TextRegular fontSize={19} color="#787878">
                            1 followers
                        </TextRegular>
                        <TextRegular fontSize={19} color="#787878">
                            2 following
                        </TextRegular>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.createBtn} onPress={handleToggleCreatePostModal}>
                            {Icons.userPlusIcon}
                            <TextBold fontSize={19} color="#fff">
                                Create post
                            </TextBold>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.editBtn} onPress={() => navigation.navigate("EditProfile")}>
                            {Icons.userEditIcon}
                            <TextRegular fontSize={19}>
                                Edit Profile
                            </TextRegular>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.settingsContainer}>
                    <TouchableOpacity style={styles.setting}>
                        {Icons.logoutIcon}
                        <TextRegular fontSize={22} color="#1B1B1B">
                            Login Information
                        </TextRegular>
                    </TouchableOpacity>
                    <View style={styles.divider}></View>
                    <TouchableOpacity style={styles.setting}>
                        {Icons.notificationIcon}
                        <TextRegular fontSize={22} color="#1B1B1B">
                            Notification Settings
                        </TextRegular>
                    </TouchableOpacity>
                    <View style={styles.divider}></View>
                    <TouchableOpacity style={styles.setting}>
                        {Icons.privacyIcon}
                        <TextRegular fontSize={22} color="#1B1B1B">
                            Privacy
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
            {isCreatePostModalVisible && (
                <CreatePostModal
                    images={images}
                    handleImagePicker={handleImagePicker}
                    removeImage={removeImage} />
            )}
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
        width: 139,
        height: 139,
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
        paddingHorizontal: RPW(2.4),
        paddingVertical: RPH(1.5),
        alignItems: "center",
        justifyContent: "center"
    },
    editBtn: {
        backgroundColor: "#BEBEBE",
        borderRadius: 38,
        flexDirection: "row",
        paddingHorizontal: RPW(2.4),
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