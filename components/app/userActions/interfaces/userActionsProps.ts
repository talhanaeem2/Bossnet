import ReactedCounts from "../../newsFeed/interfaces/reactedCountsInterface";

export default interface UserActionsProps {
    showOverlay: boolean;
    onLongPress?: () => void;
    reactedCounts: ReactedCounts[];
    totalReactedCounts: number;
    reactedNames: string;
    commentCount: number;
}