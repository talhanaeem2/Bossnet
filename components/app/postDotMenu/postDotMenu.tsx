import { View, StyleSheet, TouchableOpacity, Modal } from "react-native"
import { useState } from "react"

import TextRegular from "../textComponent/textRegular/textRegular";

import messages from "../../../constants/messages";
import Icons from "../../../constants/icons";
import { RFS } from "../../../constants/utils";

const PostDotMenu = () => {
    const [isMenuVisible, setMenuVisible] = useState(false);

    const handleIconPress = () => {
        setMenuVisible(!isMenuVisible);
    };

    const handleMenuItemPress = (action: string) => {
        console.log(`Selected action: ${action}`);
        setMenuVisible(false);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleIconPress}>
                {Icons.dotsIcon}
            </TouchableOpacity>
            <Modal visible={isMenuVisible} transparent animationType="slide">
                <TouchableOpacity
                    style={styles.modalContainer}
                    onPress={() => setMenuVisible(false)}>
                    <View style={styles.menu}>
                        <TouchableOpacity onPress={() => handleMenuItemPress('delete')}>
                            <View style={styles.menuItem}>
                                {Icons.deleteIcon}
                                <TextRegular fontSize={12} color="#AFB1B9">
                                    {messages.delete}
                                </TextRegular>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleMenuItemPress('report')}>
                            <View style={styles.menuItem}>
                                {Icons.repostIcon}
                                <TextRegular fontSize={12} color="#AFB1B9">
                                    {messages.report}
                                </TextRegular>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleMenuItemPress('pin')}>
                            <View style={styles.menuItem}>
                                {Icons.pinIcon}
                                <TextRegular fontSize={12} color="#AFB1B9">
                                    {messages.pin}
                                </TextRegular>
                            </View>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

export default PostDotMenu;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 1,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    menu: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 5,
        elevation: 5,
    },
    menuItemText: {
        color: '#AFB1B9',
        fontSize: RFS(6),
        fontFamily: 'Lato-Bold',
        fontWeight: '700',
    },
    menuItem: {
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
});