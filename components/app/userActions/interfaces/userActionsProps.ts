export default interface UserActionsProps {
    showOverlay?: boolean;
    onLongPress?: () => void;
    closeOverlay: () => void;
    activeId: string | undefined;
    commentsCount: number | undefined;
}