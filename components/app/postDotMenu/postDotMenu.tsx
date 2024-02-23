import { View, StyleSheet, TouchableOpacity } from "react-native"
import { memo, useEffect, useState } from "react";

import TextRegular from "../textComponent/textRegular/textRegular";

import messages from "../../../constants/messages";
import Icons from "../../../constants/icons";
import debounce from "../../../constants/debounceFunction";

import PostDotMenuProps from "./interfaces/postDotMenuProps";

const PostDotMenu = (props: PostDotMenuProps) => {
    const { activeIndex, onMenuPress, index } = props

    const [isMenuVisible, setMenuVisible] = useState(false);

    useEffect(() => {
        setMenuVisible(activeIndex === index);
    }, [activeIndex, index]);

    const toggleMenu = debounce((isOpen: boolean) => {
        setMenuVisible(isOpen);
        if (!isOpen) {
            onMenuPress(-1);
        } else {
            onMenuPress(index);
        }
    }, 100);

    const handleIconPress = () => {
        toggleMenu(!isMenuVisible);
    };

    const handleMenuItemPress = (action: string) => {
        console.log(`Selected action: ${action}`);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleIconPress}>
                {Icons.dotsIcon}
            </TouchableOpacity>
            {
                isMenuVisible && (
                    <View style={styles.menu}>
                        <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuItemPress('delete')}>
                            {Icons.deleteIcon}
                            <TextRegular fontSize={12} color="#AFB1B9">
                                {messages.delete}
                            </TextRegular>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuItemPress('report')}>
                            {Icons.repostIcon}
                            <TextRegular fontSize={12} color="#AFB1B9">
                                {messages.report}
                            </TextRegular>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuItemPress('pin')}>
                            {Icons.pinIcon}
                            <TextRegular fontSize={12} color="#AFB1B9">
                                {messages.pin}
                            </TextRegular>
                        </TouchableOpacity>
                    </View>
                )
            }
        </View>
    );
};

export default memo(PostDotMenu);

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 1
    },
    menu: {
        position: 'absolute',
        top: 20,
        right: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingVertical: 12,
        elevation: 5,
        width: 100,
        paddingHorizontal: 20,
        gap: 10
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
});