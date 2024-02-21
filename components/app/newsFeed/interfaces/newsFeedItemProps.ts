import ResponseItemInterface from "./responseItemInterface";

export default interface NewsFeedItemProps {
    item: ResponseItemInterface;
    index: number;
    activeIndex: number;
    setActiveIndex: (index: number) => void
}