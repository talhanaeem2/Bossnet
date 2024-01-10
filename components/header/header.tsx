import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native"
import commonStyles from "../../styles/commonStyles."
import { RFS, RPH, RPW } from "../../constants/utils"
import Icons from "../../constants/icons"

const Header = () => {
    return (
        <View style={styles.container}>
            <View style={styles.headingsContainer}>
                <View>
                    <Text style={commonStyles.heading}>News Feed</Text>
                    <Text style={styles.subHeading}>All Updates</Text>
                </View>
                <View style={styles.imagesContainer}>
                    <TouchableOpacity>
                        {Icons.searchIcon}
                    </TouchableOpacity>
                    <TouchableOpacity>
                        {Icons.messagesIcon}
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        paddingLeft: RPW(8),
        paddingRight: RPW(5)
    },
    headingsContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    imagesContainer: {
        flexDirection: "row",
        gap: RPW(5)
    },
    subHeading: {
        fontFamily: "Lato-Bold",
        fontWeight: "700",
        fontSize: RFS(13),
        color: "#000",
        paddingTop: RPH(1)
    }
})