export default interface PostOptionsModalProps {
    isModalVisible: boolean;
    setIsModalVisible: (value: boolean) => void;
    postId: string | undefined;
}