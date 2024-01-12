import { View, Text, StyleSheet, TouchableOpacity, TextInput, PanResponder, Animated } from "react-native"
import { useState } from "react";

import { RFS, RPH } from "../../constants/utils"
import Icons from "../../constants/icons"
import CreatePostProps from "./interfaces/createPostProps";

const icons = [
    Icons.galleryIcon,
    Icons.cameraIcon,
    Icons.gifIcon,
    Icons.atIcon,
    Icons.emojiIcon
]

const CreatePost = ({ closeModal }: CreatePostProps) => {
    const [panResponder] = useState(
        PanResponder.create({
            onMoveShouldSetPanResponder: (_, gestureState) => gestureState.dy > 100,
            onPanResponderRelease: (_, gestureState) => {
                if (gestureState.dy > 1) {
                    closeModal();
                }
            },
        })
    );
    return (
        <Animated.View {...panResponder.panHandlers} style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.text}>Create post</Text>
                <TouchableOpacity style={styles.btn}>
                    <Text style={styles.btnText}>Post</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.body}>
                <View style={styles.content}>
                    <View>
                        {Icons.userPlaceholderIcon}
                    </View>
                    <View>
                        <Text style={styles.title}>Aldin Mahmutovic</Text>
                    </View>
                </View>
                <TextInput style={styles.input} multiline={true} numberOfLines={4} placeholder="Share what's on your mind, Aldin Mahmutovic" />
            </View>
            <View style={styles.iconContainer}>
                {
                    icons.map((item, index) => {
                        return (
                            <TouchableOpacity key={index}>
                                {item}
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
            <View style={styles.arrowUp}>
                <TouchableOpacity onPress={closeModal}>
                    {Icons.arrowUpIcon}
                </TouchableOpacity>
            </View>
        </Animated.View>
    )
}

export default CreatePost


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        marginVertical: RPH(6.5),
        borderRadius: 24,
        marginHorizontal: 25,
        paddingVertical: 12
    },
    header: {
        borderBottomWidth: 1,
        borderBottomColor: "#EBEFF2",
        paddingBottom: 5,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    title: {
        fontFamily: "Lato-Bold",
        fontWeight: "700",
        color: "#000",
        fontSize: RFS(17)
    },
    text: {
        paddingLeft: 15,
        color: "#000",
        fontFamily: "Lato-Bold",
        fontWeight: "700",
        fontSize: RFS(13)
    },
    input: {
        color: "rgba(118, 118, 118, 0.77)",
        fontSize: RFS(14),
        fontFamily: "Lato-Regular",
        fontWeight: "400"
    },
    btn: {
        backgroundColor: "#385DFF",
        borderRadius: 12,
        marginRight: 15,
        paddingHorizontal: 10,
        paddingVertical: 4
    },
    btnText: {
        color: "#fff",
        fontFamily: "Lato-Bold",
        fontWeight: "700",
        fontSize: RFS(10)
    },
    body: {
        paddingHorizontal: 15,
        paddingVertical: 6,
    },
    content: {
        flexDirection: "row",
        gap: 5,
        alignItems: "center"
    },
    iconContainer: {
        flexDirection: "row",
        gap: 48,
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#EBEFF2",
        paddingBottom: 5,
        justifyContent: "center"
    },
    arrowUp: {
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 20
    }
})