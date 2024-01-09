import { View, StyleSheet, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard } from "react-native"

import { RFS, RPH, RPW } from "../../constants/utils"
import commonStyles from "../../styles/commonStyles."

const NewsFeedShare = () => {
    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View>
                    <View style={styles.shareContainer}>
                        <TouchableOpacity>
                            <Image style={commonStyles.imageContain} source={require('../../assets/icons/userPlaceholder.png')} />
                        </TouchableOpacity>
                        <TextInput style={styles.input} placeholder="Share what's on your mind, Aldin Mahmutovic" />
                        <TouchableOpacity>
                            <Image style={commonStyles.imageContain} source={require('../../assets/icons/upload.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default NewsFeedShare

const styles = StyleSheet.create({
    shareContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: RPW(5),
        paddingVertical: RPH(2.5),
        width: "100%",
        alignItems: "center"
    },
    input: {
        flex: 1,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.26)',
        borderRadius: 25,
        marginLeft: RPW(1.2),
        marginRight: RPW(4),
        paddingHorizontal: RPW(2.5),
        paddingVertical: RPH(.6),
        color: "#767676",
        fontSize: RFS(12),
        fontFamily: "Lato-Regular",
        fontWeight: "400"
    }
})