export default interface UserActionsProps {
    showOverlay: boolean;
    onLongPress?: () => void;
    closeOverlay: () => void;
}