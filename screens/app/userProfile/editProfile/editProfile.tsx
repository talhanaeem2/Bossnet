import { StyleSheet, View, Image, ScrollView, TouchableOpacity, Modal, TextInput, ImageProps, TouchableWithoutFeedback } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { memo, useCallback, useEffect, useState } from "react"
import * as ImagePicker from "expo-image-picker"
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import moment from "moment"

import MainWapper from "../../../../components/app/mainWrapper/mainWrapper"
import TextBold from "../../../../components/app/common/textComponent/textBold/textBold"
import TextRegular from "../../../../components/app/common/textComponent/textRegular/textRegular"

import { RPH } from "../../../../constants/utils/utils"
import Apis from "../../../../constants/apis"
import requestUtils from "../../../../constants/utils/requestUtils"

import useErrorHandling from "../../../../hooks/useErrorHandling"
import useSliceSelector from "../../../../hooks/useSliceSelector";
import useReducerDispatch from "../../../../hooks/useReducerDispatch";
import { setUserData } from "../../../../reducers/auth/authSlice";

import EditProfileResponse from "./interfaces/editProfileResponse";
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
    const data = useSliceSelector(state => state.auth.userData)
    const [editingField, setEditingField] = useState("")
    const [editValue, setEditValue] = useState("")
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [showButtons, setShowButtons] = useState(false)
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [image, setImage] = useState<ImageInterface>();
    const [firstName, setFirstName] = useState(data?.firstName || "");
    const [lastName, setLastName] = useState(data?.lastName || "");
    const { handleError } = useErrorHandling();
    const dispatch = useReducerDispatch()

    const getToken = useCallback(async () => {
        const accessToken = await AsyncStorage.getItem("token");
        return accessToken && JSON.parse(accessToken);
    }, []);

    const handleProfileUpdate = useCallback(async () => {
        const accessToken = await getToken();
        if (!accessToken) return;

        try {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${accessToken}`);

            const formdata = new FormData();
            formdata.append("firstName", firstName);
            formdata.append("lastName", lastName);
            if (editingField !== "firstName" && editingField !== "lastName") {
                formdata.append(editingField, editValue);
            }
            // @ts-ignore:next-line
            formdata.append("image", { type: image?.type, uri: image?.uri, name: image?.filename }, "file");

            const response = await requestUtils.request<EditProfileResponse, FormData>(
                Apis.profileApi,
                'POST',
                formdata,
                myHeaders
            );
            console.log(response)
            dispatch(setUserData(response.data))

        } catch (error) {
            handleError(error)
        }

        // const requestOptions = {
        //     method: "POST",
        //     headers: myHeaders,
        //     body: formdata,
        // };

        // fetch("https://app.bosnett.com/api/v1/profile", requestOptions)
        //     .then((response) => response.text())
        //     .then((result) => console.log(result))
        //     .catch((error) => console.error(error));
    }, [firstName, lastName, editingField, editValue, image, getToken]);

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
            setImage(file);
            setShowButtons(false);
            handleProfileUpdate();
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
            heading: "Personal Information",
            fields: [
                { fieldName: "firstName", icon: editUsernameIcon, label: data?.firstName || "Name", value: data.firstName },
                { fieldName: "dayOfBirth", icon: editDobIcon, label: "Birthday", value: data.dayOfBirth },
                { fieldName: "bio", icon: editBioIcon, label: "Biography", value: "bio", borderBottom: false },
            ],
        },
        {
            heading: "Contact Information",
            fields: [
                { fieldName: "phone", icon: editPhoneIcon, label: "Phone", value: "phone" },
                { fieldName: "email", icon: editPhoneIcon, label: "Email", value: "email", borderBottom: false },
            ],
        },
        {
            heading: "Preferences",
            fields: [
                { fieldName: "education", icon: editEduIcon, label: "Education", value: "education" },
                { fieldName: "socials", icon: editSocialsIcon, label: "Social Networks", value: "socials" },
                { fieldName: "work", icon: editWorkIcon, label: "Work Experiences", value: "work", borderBottom: false },
            ],
        },
    ];

    const Fieldlabel = useCallback(() => {
        let fieldName;
        editingField === 'bio'
            ? fieldName = 'Biography:'
            : editingField === 'phone'
                ? fieldName = 'Phone:'
                : editingField === 'email'
                    ? fieldName = 'Email:'
                    : editingField === 'education'
                        ? fieldName = 'Education:'
                        : editingField === 'work'
                            ? fieldName = 'Work Experiences:'
                            : editingField === 'socials'
                                ? fieldName = 'Social Networks:'
                                : fieldName = ''

        return fieldName

    }, [editingField])

    return (
        <MainWapper isHeader={true} isFooter={false} icon={true}>
            <View style={styles.container}>
                <ScrollView style={{ width: 400, height: 460 }}>
                    <View style={styles.content}>
                        <TouchableOpacity style={styles.circle} onPress={showUploadButtons}>
                            {data.profileImage ?
                                <Image style={styles.roundImg} source={{ uri: data.profileImage }} /> :
                                <Image style={styles.roundImg} source={userPlaceholder} />
                            }
                            <View style={styles.editImage}>
                                <Image source={editImgIcon} />
                            </View>
                        </TouchableOpacity>
                        <TextBold fontSize={23} style={[{ paddingTop: 20 }, extraSpacing]}>
                            Edit profile
                        </TextBold>
                        {
                            showButtons && (
                                <View style={{ flexDirection: "row", gap: 16, paddingBottom: 20 }}>
                                    <TouchableOpacity style={styles.nextButton} onPress={() => handleImagePicker("gallery")}>
                                        <TextRegular fontSize={16} color="#fff">Open Gallery</TextRegular>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.nextButton} onPress={() => handleImagePicker("camera")}>
                                        <TextRegular fontSize={16} color="#fff">Open Camera</TextRegular>
                                    </TouchableOpacity>
                                </View>
                            )
                        }
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
            <Modal
                visible={isModalVisible}
                animationType="fade"
                transparent={true}
            >
                <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
                    <View style={styles.modalContainer}>
                        <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
                            <View style={styles.modalContent}>
                                {editingField === 'firstName'
                                    ? <View style={styles.modalFields}>
                                        <View style={styles.modalField}>
                                            <TextRegular fontSize={15}>
                                                First Name:
                                            </TextRegular>
                                            <TextInput
                                                style={styles.input}
                                                onChangeText={setFirstName}
                                                autoFocus={true}
                                            />
                                        </View>
                                        <View style={styles.modalField}>
                                            <TextRegular fontSize={15}>
                                                Last Name:
                                            </TextRegular>
                                            <TextInput
                                                style={styles.input}
                                                onChangeText={setLastName}
                                            />
                                        </View>
                                    </View>
                                    : <View style={{ width: '100%', alignItems: 'flex-start', gap: 10 }}>
                                        <TextRegular fontSize={15}>
                                            {Fieldlabel()}
                                        </TextRegular>
                                        <TextInput
                                            style={styles.input}
                                            onChangeText={setEditValue}
                                            autoFocus={true}
                                        />
                                    </View>
                                }
                                <TouchableOpacity onPress={handleSave} style={styles.nextButton}>
                                    <TextRegular fontSize={17} color='#fff'>Save</TextRegular>
                                </TouchableOpacity>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
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
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        width: "80%",
        alignItems: "center",
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        width: '80%',
        fontSize: 16,
        color: '#000',
        fontWeight: "400",
        fontFamily: "Lato-Regular"
    },
    nextButton: {
        backgroundColor: "#308AFF",
        borderRadius: 34,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        paddingVertical: 11,
        paddingHorizontal: 26,
        marginTop: 15
    },
    modalFields: {
        flexDirection: 'row',
        width: '100%',
        gap: 10,
        justifyContent: 'space-evenly'
    },
    modalField: {
        width: "30%",
        gap: 6
    }
})