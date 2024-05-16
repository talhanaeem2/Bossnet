import { memo } from "react"
import { StyleSheet, View, Image } from "react-native"

import TextBold from "../../../app/common/textComponent/textBold/textBold"

import { RPH } from "../../../../constants/utils/utils"

const SignUpProfilePicture = () => {

    return (
        <View style={styles.inner}>
            <View style={{ alignSelf: 'center' }}>
                <TextBold fontSize={23}>
                    Update Profile Picture
                </TextBold>
            </View>
            <View style={styles.fieldContainer}>
                <View style={styles.circle}>
                    <Image style={styles.roundImg} source={require("../../../../assets/signup-picture.png")} />
                    <View style={styles.editImage}>
                        <Image source={require("../../../../assets/icons/editImg.png")} />
                    </View>
                </View>
            </View>
        </View>
    )
}

export default memo(SignUpProfilePicture)

const styles = StyleSheet.create({
    editImage: {
        width: 36,
        height: 25,
        backgroundColor: '#5890FF',
        borderRadius: 6,
        position: 'absolute',
        bottom: -1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    circle: {
        width: 174,
        height: 174,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 6,
        borderColor: '#5890FF',
        borderRadius: 90,
        position: 'relative',
        backgroundColor: '#767676',
        padding: 30,
        marginBottom: 52
    },
    roundImg: {
        width: "100%",
        objectFit: "contain"
    },
    inner: {
        marginTop: 94
    },
    fieldContainer: {
        paddingTop: RPH(4),
        gap: RPH(2),
        alignItems: 'center'
    }
})