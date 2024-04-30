import { StyleSheet, View, Image, ScrollView, TouchableOpacity, Modal, TextInput } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useEffect, useState } from "react"
import axios from "axios"

import MainWapper from "../../../../components/app/mainWrapper/mainWrapper"
import TextBold from "../../../../components/app/textComponent/textBold/textBold"

import { RPH } from "../../../../constants/utils"

import TextRegular from "../../../../components/app/textComponent/textRegular/textRegular"
import Apis from "../../../../constants/apis"

import UserDataInterface from "./interfaces/userDataInterface"
import EditDataInterface from "./interfaces/editDataInterface"

const EditProfile = () => {
    const [userData, setUserData] = useState<UserDataInterface>()
    const [editingField, setEditingField] = useState<string>("")
    const [editValue, setEditValue] = useState<string>("")
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

    const fetchProfile = async () => {
        const accessToken = await AsyncStorage.getItem('token');
        const parsedToken = accessToken && JSON.parse(accessToken)

        console.log(parsedToken)

        const config = {
            method: 'get',
            url: Apis.profileApi,
            headers: {
                'Authorization': `Bearer ${parsedToken}`
            }
        };

        try {
            const response: EditDataInterface = await axios(config);
            console.log(JSON.stringify(response.data));
            setUserData(response.data.data)
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    useEffect(() => {
        fetchProfile()
    }, [])

    const handleEditClick = (fieldName: keyof UserDataInterface, value: string) => {
        setEditingField(fieldName.toString())
        setEditValue(value)
        setIsModalVisible(true);
    };

    const handleSave = () => {
        console.log(editValue, editingField)
        if (!editingField) {
            setIsModalVisible(false);
            return;
        }

        setUserData(prevUserData => {
            if (!prevUserData) return prevUserData;
            return {
                ...prevUserData,
                [editingField]: editValue
            };
        });

        setIsModalVisible(false);
    };

    return (
        <MainWapper isHeader={true} isFooter={false} icon={true}>
            <View style={styles.container}>
                <ScrollView style={{ width: 400, height: 460 }}>
                    <View style={styles.content}>
                        <View style={styles.circle}>
                            <Image style={styles.roundImg} source={require("../../../../assets/user-placeholder.png")} />
                            <View style={styles.editImage}>
                                <Image source={require("../../../../assets/icons/editImg.png")} />
                            </View>
                        </View>
                        <TextBold fontSize={23} style={{ paddingTop: 20, paddingBottom: 35 }}>
                            Edit profile
                        </TextBold>
                        <View style={styles.editFieldsContainer}>
                            <TouchableOpacity onPress={() => handleEditClick('firstName', userData?.firstName || '')}>
                                <View style={styles.editField}>
                                    <View style={styles.fieldText}>
                                        <View style={styles.iconContainer}>
                                            <Image source={require("../../../../assets/icons/editUsername.png")} />
                                        </View>
                                        <TextRegular fontSize={17}>
                                            {userData?.firstName as string}
                                        </TextRegular>
                                    </View>
                                    <View style={styles.arrowContainer}>
                                        <TextRegular fontSize={17} color='rgba(0, 0, 0, 0.35)'>Edit</TextRegular>
                                        <Image source={require("../../../../assets/icons/editArrowR.png")} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <View style={styles.borderBottom}></View>
                            <TouchableOpacity onPress={() => handleEditClick('lastName', userData?.lastName || '')}>
                                <View style={styles.editField}>
                                    <View style={styles.fieldText}>
                                        <View style={styles.iconContainerWithout}>
                                            <Image source={require("../../../../assets/icons/editDob.png")} />
                                        </View>
                                        <TextRegular fontSize={17}>Birthday</TextRegular>
                                    </View>
                                    <View style={styles.arrowContainer}>
                                        <TextRegular fontSize={17} color='rgba(0, 0, 0, 0.35)'>Edit</TextRegular>
                                        <Image source={require("../../../../assets/icons/editArrowR.png")} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <View style={styles.borderBottom}></View>
                            <TouchableOpacity onPress={() => handleEditClick('year', userData?.firstName || '')}>
                                <View style={styles.editField}>
                                    <View style={styles.fieldText}>
                                        <View style={styles.iconContainerWithout}>
                                            <Image source={require("../../../../assets/icons/editBio.png")} />
                                        </View>
                                        <TextRegular fontSize={17}>Biography</TextRegular>
                                    </View>
                                    <View style={styles.arrowContainer}>
                                        <TextRegular fontSize={17} color='rgba(0, 0, 0, 0.35)'>Edit</TextRegular>
                                        <Image source={require("../../../../assets/icons/editArrowR.png")} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <View style={styles.borderBottom}></View>
                            <TouchableOpacity onPress={() => handleEditClick('userName', userData?.firstName || '')}>
                                <View style={styles.editField}>
                                    <View style={styles.fieldText}>
                                        <View style={styles.iconContainerWithout}>
                                            <Image source={require("../../../../assets/icons/editPhone.png")} />
                                        </View>
                                        <TextRegular fontSize={17}>Phone</TextRegular>
                                    </View>
                                    <View style={styles.arrowContainer}>
                                        <TextRegular fontSize={17} color='rgba(0, 0, 0, 0.35)'>Edit</TextRegular>
                                        <Image source={require("../../../../assets/icons/editArrowR.png")} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <TextBold style={styles.prefText} fontSize={15} color='rgba(0, 0, 0, 0.35)'>
                            Preferences
                        </TextBold>
                        <View style={[styles.editFieldsContainer, { paddingBottom: 30 }]}>
                            <TouchableOpacity onPress={() => handleEditClick('nickName', userData?.firstName || '')}>
                                <View style={styles.editField}>
                                    <View style={styles.fieldText}>
                                        <View style={styles.iconContainerEd}>
                                            <Image source={require("../../../../assets/icons/editEdu.png")} />
                                        </View>
                                        <TextRegular fontSize={17}>Education</TextRegular>
                                    </View>
                                    <View style={styles.arrowContainer}>
                                        <TextRegular fontSize={17} color='rgba(0, 0, 0, 0.35)'>Edit</TextRegular>
                                        <Image source={require("../../../../assets/icons/editArrowR.png")} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <View style={styles.borderBottom}></View>
                            <TouchableOpacity onPress={() => handleEditClick('day', userData?.firstName || '')}>
                                <View style={styles.editField}>
                                    <View style={styles.fieldText}>
                                        <View style={styles.iconContainerWithout}>
                                            <Image source={require("../../../../assets/icons/editSocials.png")} />
                                        </View>
                                        <TextRegular fontSize={17}>Social Networks</TextRegular>
                                    </View>
                                    <View style={styles.arrowContainer}>
                                        <TextRegular fontSize={17} color='rgba(0, 0, 0, 0.35)'>Edit</TextRegular>
                                        <Image source={require("../../../../assets/icons/editArrowR.png")} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <View style={styles.borderBottom}></View>
                            <TouchableOpacity onPress={() => handleEditClick('month', userData?.firstName || '')}>
                                <View style={styles.editField}>
                                    <View style={styles.fieldText}>
                                        <View style={styles.iconContainerWork}>
                                            <Image source={require("../../../../assets/icons/editWork.png")} />
                                        </View>
                                        <TextRegular fontSize={17}>Work Experiences</TextRegular>
                                    </View>
                                    <View style={styles.arrowContainer}>
                                        <TextRegular fontSize={17} color='rgba(0, 0, 0, 0.35)'>Edit</TextRegular>
                                        <Image source={require("../../../../assets/icons/editArrowR.png")} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
            <Modal visible={isModalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TextInput
                            style={styles.input}
                            onChangeText={setEditValue}
                            autoFocus={true}
                        />
                        <TouchableOpacity onPress={handleSave}>
                            <TextRegular fontSize={17} color='blue'>Save</TextRegular>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </MainWapper>
    )
}

export default EditProfile

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
        backgroundColor: '#5890FF',
        borderRadius: 6,
        position: 'absolute',
        bottom: -1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    prefText: {
        alignSelf: 'flex-start',
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
        borderColor: '#5890FF',
        borderRadius: 70,
        position: 'relative'
    },
    roundImg: {
        width: "100%",
        objectFit: "contain",
    },
    editField: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10,
        justifyContent: 'space-between'
    },
    fieldText: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12
    },
    editFieldsContainer: {
        display: 'flex'
    },
    arrowContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 12,
        alignItems: 'center'
    },
    iconContainer: {
        backgroundColor: "#000",
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconContainerWithout: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconContainerEd: {
        backgroundColor: '#8A54FF',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconContainerWork: {
        backgroundColor: '#131CA8',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    borderBottom: {
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.12)',
        alignSelf: 'flex-end',
        width: 304,
        display: 'flex',
        marginRight: 20
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    input: {
        // Your input styles
    },
})