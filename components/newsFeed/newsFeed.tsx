import { View, StyleSheet, Text, Image } from "react-native"

import UserActions from "../userActions/userActions"
import { RFS } from "../../constants/utils"

const NewsFeed = () => {

    return (
        <View>
            <View style={styles.postContainer}>
                <View style={styles.post}>
                    <Image style={styles.userPlacholder} source={require('../../assets/icons/userPlaceholder.png')} />
                    <View>
                        <Text style={styles.postText}>
                            <Text style={styles.postTextTitle}>Aleksandar Marinov </Text>
                            became a registered member
                        </Text>
                        <Text>2 hours ago</Text>
                    </View>
                </View>
                <UserActions />
            </View>
        </View>
    )
}

export default NewsFeed

const styles = StyleSheet.create({
    postContainer: {
        borderRadius: 3,
        borderWidth: 1,
        borderColor: "#F0F0F0",
        backgroundColor: "#fff",
        paddingVertical: 16
    },
    post: {
        paddingLeft: 26,
        flexDirection: "row"
    },
    postTextTitle: {
        fontFamily: "Lato-Bold",
        fontWeight: "700"
    },
    postText: {
        fontSize: RFS(13),
        color: "#5F6373",
        fontFamily: "Lato-Regular",
        fontWeight: "400"
    },
    userPlacholder: {
        width: 30,
        height: 30
    }
})