import { StyleSheet, View, Image, ScrollView, TouchableOpacity, ImageProps } from "react-native";
import { memo, useCallback, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import moment from "moment";

import MainWapper from "../../../../components/app/mainWrapper/mainWrapper";
import TextBold from "../../../../components/app/common/textComponent/textBold/textBold";
import TextRegular from "../../../../components/app/common/textComponent/textRegular/textRegular";
import ImagePickerButtonsModal from "../../../../modals/imagePickerButtonsModal/imagePickerButtonsModal";
import EditProfileFieldsModal from "../../../../modals/editProfileFieldsModal/editProfileFieldsModal";

import { RPH } from "../../../../constants/utils/utils";
import Apis from "../../../../constants/apis";
import requestUtils from "../../../../constants/utils/requestUtils";

import useErrorHandling from "../../../../hooks/useErrorHandling";
import useSliceSelector from "../../../../hooks/useSliceSelector";
import useReducerDispatch from "../../../../hooks/useReducerDispatch";
import useSuccessHandling from "../../../../hooks/useSuccessHandling";
import useToken from "../../../../hooks/useToken";
import { setIsLoading, setUserData } from "../../../../reducers/auth/authSlice";

import IProfileData from "../../../../interfaces/IProfileData";
import ImageInterface from "../../../../components/common/interfaces/imageInterface";

const userPlaceholder = require("../../../../assets/user-placeholder.png");
const editImgIcon = require("../../../../assets/icons/editImg.png");
const editUsernameIcon = require("../../../../assets/icons/editUsername.png");
const editDobIcon = require("../../../../assets/icons/editDob.png");
const editBioIcon = require("../../../../assets/icons/editBio.png");
const editPhoneIcon = require("../../../../assets/icons/editPhone.png");
const editArrowIcon = require("../../../../assets/icons/editArrowR.png");
const editEduIcon = require("../../../../assets/icons/editEdu.png");
const editSocialsIcon = require("../../../../assets/icons/editSocials.png");
const editWorkIcon = require("../../../../assets/icons/editWork.png");

const EditProfile = () => {
    const data = useSliceSelector(state => state.auth.userData);
    const [editingField, setEditingField] = useState("");
    const [editValue, setEditValue] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [showButtons, setShowButtons] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [firstName, setFirstName] = useState(data?.firstName || "");
    const [lastName, setLastName] = useState(data?.lastName || "");
    const { handleError } = useErrorHandling();
    const dispatch = useReducerDispatch();
    const { handleSuccess } = useSuccessHandling();
    const { getToken } = useToken();
    const messages = useSliceSelector(state => state.language.messages);

    const handleProfileUpdate = useCallback(async (file?: ImageInterface) => {
        const accessToken = await getToken();
        if (!accessToken) return;

        try {
            dispatch(setIsLoading(true))
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${accessToken}`);

            const formdata = new FormData();
            formdata.append("firstName", firstName);
            formdata.append("lastName", lastName);
            if (editingField !== "firstName" && editingField !== "lastName") {
                formdata.append(editingField, editValue);
            }
            if (file) {
                // @ts-ignore: Unreachable code error
                formdata.append("image", { uri: file.uri, type: file.type, name: file.filename });
            }

            const response = await requestUtils.request<IProfileData, FormData>(
                Apis.profileApi,
                'POST',
                formdata,
                { Authorization: `Bearer ${accessToken}` },
                true
            );
            dispatch(setUserData(response));
            dispatch(setIsLoading(false))
            handleSuccess(messages.profileUpdated);
        } catch (error) {
            dispatch(setIsLoading(false))
            handleError(error);
        }
    }, [firstName, lastName, editingField, editValue, getToken, dispatch, handleError, handleSuccess]);

    const handleImagePicker = useCallback(async (action: "gallery" | "camera") => {
        const result = action === "gallery"
            ? await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                aspect: [1, 1],
                quality: 1,
                allowsEditing: true,
                allowsMultipleSelection: false
            })
            : await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });

        if (!result.canceled && result.assets.length > 0) {
            let selectedImage = result.assets[0];
            let filename = selectedImage.uri.split("/").pop();
            let uri = selectedImage.uri

            // Infer the type of the image
            let match = /\.(\w+)$/.exec(filename as string);
            let type = match ? `image/${match[1]}` : `image`;

            const file = {
                uri: uri,
                type: type,
                filename: filename || ""
            };
            setShowButtons(false);
            handleProfileUpdate(file);
        }
    }, [handleProfileUpdate]);

    const showUploadButtons = () => {
        setShowButtons(!showButtons)
    }

    const handleEditClick = (fieldName: string, value: string) => {
        setShowDatePicker(fieldName === "dayOfBirth");
        setEditingField(fieldName)
        setEditValue(value)
        setIsModalVisible(true);
    };

    const handleSave = () => {
        if (!editingField) {
            setIsModalVisible(false);
            return;
        }

        setIsModalVisible(false);
        handleProfileUpdate();
    };

    const handleDateChange = (event: DateTimePickerEvent, date: Date) => {
        const formattedDate = moment(date).format("YYYY/MM/DD");
        if (event.type === 'dismissed') {
            setShowDatePicker(false);
            return;
        }

        if (date) {
            setShowDatePicker(false);
            setSelectedDate(date);
            setEditValue(formattedDate);
            handleProfileUpdate();
        }
    };

    const EditField = ({
        fieldName,
        value,
        icon,
        label,
        borderBottom = true
    }: {
        fieldName: string,
        value: string,
        icon: ImageProps,
        label: string,
        borderBottom?: boolean
    }
    ) => (
        <TouchableOpacity
            onPress={fieldName === "dayOfBirth"
                ? () => setShowDatePicker(true)
                : () => handleEditClick(fieldName, value)}
        >
            <View style={styles.editField}>
                <View style={styles.fieldText}>
                    <View style={fieldName === "firstName" ? styles.iconContainer
                        : fieldName === "education" ? styles.iconContainerEd
                            : fieldName === "work" ? styles.iconContainerWork
                                : styles.iconContainerWithout}>
                        <Image source={icon} />
                    </View>
                    <TextRegular fontSize={17}>{label}</TextRegular>
                </View>
                <View style={styles.arrowContainer}>
                    <TextRegular fontSize={17} color="rgba(0, 0, 0, 0.35)">Edit</TextRegular>
                    <Image source={editArrowIcon} />
                </View>
            </View>
            {borderBottom && (
                <View style={styles.borderBottom}></View>
            )}
        </TouchableOpacity>
    );

    const extraSpacing = !showButtons ? { paddingBottom: 35 } : { paddingBottom: 20 };

    const fieldGroups = [
        {
            heading: messages.personalInfo,
            fields: [
                { fieldName: "firstName", icon: editUsernameIcon, label: data?.firstName || messages.name, value: data.firstName },
                { fieldName: "dayOfBirth", icon: editDobIcon, label: messages.birthday, value: data.dayOfBirth },
                { fieldName: "bio", icon: editBioIcon, label: messages.biography, value: "bio", borderBottom: false },
            ],
        },
        {
            heading: messages.contactInfo,
            fields: [
                { fieldName: "phone", icon: editPhoneIcon, label: messages.phone, value: "phone" }
            ],
        },
        {
            heading: messages.preferences,
            fields: [
                { fieldName: "education", icon: editEduIcon, label: messages.education, value: "education" },
                { fieldName: "socials", icon: editSocialsIcon, label: messages.socials, value: "socials" },
                { fieldName: "work", icon: editWorkIcon, label: messages.work, value: "work", borderBottom: false },
            ],
        },
    ];

    return (
        <MainWapper isHeader={true} isFooter={false} icon={true}>
            <View style={styles.container}>
                <ScrollView style={{ width: 400, height: 460 }}>
                    <View style={styles.content}>
                        <TouchableOpacity style={styles.circle} onPress={showUploadButtons}>
                            {data.profileImage ?
                                <Image style={styles.roundImg} source={{ uri: `${Apis.homeUrl}${data.profileImage}` }} /> :
                                <Image style={styles.roundImg} source={userPlaceholder} />
                            }
                            <View style={styles.editImage}>
                                <Image source={editImgIcon} />
                            </View>
                        </TouchableOpacity>
                        <TextBold fontSize={23} style={[{ paddingTop: 20 }, extraSpacing]}>
                            {messages.editProfile}
                        </TextBold>
                        {fieldGroups.map((group, index) => {
                            return (
                                <View key={index} style={{ width: '100%', paddingHorizontal: 30 }}>
                                    <TextBold style={styles.prefText} fontSize={15} color="rgba(0, 0, 0, 0.35)">
                                        {group.heading}
                                    </TextBold>
                                    <View style={[styles.editFieldsContainer, { paddingBottom: 16 }]}>
                                        {group.fields.map((field, fieldIndex) => {
                                            return (
                                                <EditField
                                                    key={fieldIndex}
                                                    fieldName={field.fieldName}
                                                    icon={field.icon}
                                                    value={field.value as string}
                                                    label={field.label}
                                                    borderBottom={field.borderBottom}
                                                />
                                            )
                                        })}
                                    </View>
                                </View>
                            )
                        })}
                    </View>
                </ScrollView>
            </View>
            <ImagePickerButtonsModal
                handleImagePicker={handleImagePicker}
                showButtons={showButtons}
                setShowButtons={setShowButtons}
            />
            <EditProfileFieldsModal
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
                editingField={editingField}
                setEditValue={setEditValue}
                setFirstName={setFirstName}
                setLastName={setLastName}
                handleSave={handleSave}
            />
            {showDatePicker && (
                <DateTimePicker
                    value={selectedDate}
                    mode="date"
                    display="spinner"
                    onChange={(event, date) => {
                        if (date) {
                            handleDateChange(event, date);
                        }
                    }}
                />
            )}
        </MainWapper>
    )
}

export default memo(EditProfile);

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFDFA",
        flex: 1,
        paddingTop: RPH(4),
        position: "relative"
    },
    editImage: {
        width: 36,
        height: 25,
        backgroundColor: "#5890FF",
        borderRadius: 6,
        position: "absolute",
        bottom: -1,
        justifyContent: "center",
        alignItems: "center"
    },
    prefText: {
        alignSelf: "flex-start",
        paddingLeft: 20,
        paddingTop: 20,
        paddingBottom: 9
    },
    content: {
        alignItems: "center"
    },
    circle: {
        width: 139,
        height: 139,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 6,
        borderColor: "#5890FF",
        borderRadius: 70,
        position: "relative",
        overflow: "hidden"
    },
    roundImg: {
        width: "100%",
        height: "100%"
    },
    editField: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 10,
        justifyContent: "space-between"
    },
    fieldText: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 12
    },
    editFieldsContainer: {
        display: "flex"
    },
    arrowContainer: {
        display: "flex",
        flexDirection: "row",
        gap: 12,
        alignItems: "center"
    },
    iconContainer: {
        backgroundColor: "#000",
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center"
    },
    iconContainerWithout: {
        justifyContent: "center",
        alignItems: "center"
    },
    iconContainerEd: {
        backgroundColor: "#8A54FF",
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center"
    },
    iconContainerWork: {
        backgroundColor: "#131CA8",
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center"
    },
    borderBottom: {
        borderBottomWidth: 1,
        borderBottomColor: "rgba(0, 0, 0, 0.12)",
        alignSelf: "flex-end",
        width: '75%',
        display: "flex",
        marginRight: 20
    }
})