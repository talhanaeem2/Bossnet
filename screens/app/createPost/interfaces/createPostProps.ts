import CreatePostModalProps from "../../../../modals/createPostModal/interfaces/createPostModalProps";

export default interface CreatePostProps extends CreatePostModalProps {
    closeModal: () => void;
}