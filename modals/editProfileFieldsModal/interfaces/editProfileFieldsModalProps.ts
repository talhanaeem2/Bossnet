export default interface EditProfileFieldsModalProps {
    isModalVisible: boolean;
    setIsModalVisible: (value: boolean) => void;
    editingField: string;
    setEditValue: (value: string) => void;
    setFirstName: (value: string) => void;
    setLastName: (value: string) => void;
    handleSave: () => void;
    value: string;
    firstName: string;
    lastName: string;
}