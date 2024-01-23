import { View, StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native"
import { useState } from "react"

import Icons from "../../../constants/icons";
import messages from "../../../constants/messages";
import { RFS } from "../../../constants/utils";

import PostDotMenuProps from "./interfaces/postDotMenuProps";

const PostDotMenu = ({ direction }: PostDotMenuProps) => {
    const [isMenuVisible, setMenuVisible] = useState(false);

    const handleIconPress = () => {
        setMenuVisible(!isMenuVisible);
    };

    const handleMenuItemPress = (action: string) => {
        console.log(`Selected action: ${action}`);
        setMenuVisible(false);
    };

    const getMenuStyle = () => {
        const positionStyles: Record<string, number | undefined> = {};

        switch (direction) {
            case 'top':
                positionStyles.top = 0;
                positionStyles.bottom = undefined;
                break;
            case 'bottom':
                positionStyles.top = undefined;
                positionStyles.bottom = 0;
                break;
            case 'left':
                positionStyles.left = 30;
                positionStyles.right = undefined;
                break;
            case 'right':
                positionStyles.left = undefined;
                positionStyles.right = 30;
                break;
            default:
                break;
        }

        return {
            position: 'absolute',
            backgroundColor: '#fff',
            borderRadius: 8,
            paddingVertical: 8,
            paddingHorizontal: 5,
            elevation: 5,
            width: 55,
            zIndex: 2,
            gap: 5,
            ...positionStyles,
        } as ViewStyle
    };

    return (
        <View style={styles.modal}>
            <TouchableOpacity onPress={handleIconPress}>
                {Icons.dotsIcon}
            </TouchableOpacity>
            {isMenuVisible && (
                <View style={getMenuStyle()}>
                    <TouchableOpacity onPress={() => handleMenuItemPress('delete')}>
                        <View style={styles.menuItem}>
                            {Icons.deleteIcon}
                            <Text style={styles.menuItemText}>{messages.delete}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleMenuItemPress('report')}>
                        <View style={styles.menuItem}>
                            {Icons.repostIcon}
                            <Text style={styles.menuItemText}>{messages.report}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleMenuItemPress('pin')}>
                        <View style={styles.menuItem}>
                            {Icons.pinIcon}
                            <Text style={styles.menuItemText}>{messages.pin}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    )
}

export default PostDotMenu

const styles = StyleSheet.create({

    modal: {
        alignSelf: "flex-end",
        marginRight: 20
    },
    menuItemText: {
        color: "#AFB1B9",
        fontSize: RFS(6),
        fontFamily: "Lato-Bold",
        fontWeight: "700",
    },
    menuItem: {
        padding: 4,
        borderWidth: .5,
        borderColor: "#DCDCDC",
        borderRadius: 10,
        flexDirection: "row",
        gap: 2
    },
})