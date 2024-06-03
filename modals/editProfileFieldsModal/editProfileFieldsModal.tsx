import { memo, useCallback } from "react";
import { Modal, TouchableWithoutFeedback, View, TextInput, TouchableOpacity, StyleSheet } from "react-native";

import TextRegular from "../../components/app/common/textComponent/textRegular/textRegular";

import useSliceSelector from "../../hooks/useSliceSelector";

import EditProfileFieldsModalProps from "./interfaces/editProfileFieldsModalProps";

const EditProfileFieldsModal = (props: EditProfileFieldsModalProps) => {
    const { isModalVisible, setIsModalVisible, editingField, setEditValue, setFirstName, setLastName, handleSave } = props;
    const messages = useSliceSelector(state => state.language.messages);

    const Fieldlabel = useCallback(() => {
        let fieldName;
        editingField === 'bio'
            ? fieldName = `${messages.biography}:`
            : editingField === 'phone'
                ? fieldName = `${messages.phone}:`
                : editingField === 'education'
                    ? fieldName = `${messages.education}:`
                    : editingField === 'work'
                        ? fieldName = `${messages.work}:`
                        : editingField === 'socials'
                            ? fieldName = `${messages.socials}:`
                            : fieldName = ''

        return fieldName

    }, [editingField])

    return (
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
                                : <View style={styles.labels}>
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
    )
}

export default memo(EditProfileFieldsModal)

const styles = StyleSheet.create({
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
    },
    labels: {
        width: '100%',
        alignItems: 'flex-start',
        gap: 10
    }
})