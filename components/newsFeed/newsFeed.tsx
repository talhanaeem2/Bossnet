import { View, StyleSheet, Text, Image } from "react-native"

import UserActions from "../userActions/userActions"
import { RFS, RPH, RPW } from "../../constants/utils"
import Icons from "../../constants/icons"
import messages from "../../constants/messages"
import PostDotMenu from "../postDotMenu/postDotMenu"
import ReadMore from "../readMoreText/readMoreText"

const NewsFeed = () => {

    return (
        <View style={styles.container}>
            <View style={styles.postContainer}>
                <View style={styles.dotsContainer}>
                    <PostDotMenu direction="right" />
                </View>
                <View style={styles.post}>
                    {Icons.userPlaceholderNewsfeedIcon}
                    <View style={styles.textContainer}>
                        <Text style={styles.postText}>
                            <Text style={styles.postTextTitle}>Aleksandar Marinov </Text>
                            {messages.newsfeedTitle}
                        </Text>
                        <Text style={styles.timeText}>2 hours ago</Text>
                    </View>
                </View>
                <UserActions />
            </View>
            <View style={styles.postContainer}>
                <View style={styles.dotsContainer}>
                    <PostDotMenu direction="right" />
                </View>
                <View style={styles.post}>
                    {Icons.userPlaceholderNewsfeedIcon}
                    <View style={styles.textContainer}>
                        <Text style={styles.postText}>
                            <Text style={styles.postTextTitle}>Historija
                            </Text>
                            {messages.groupText}
                            <Text style={styles.postTextTitle}>Bošnjače </Text>
                        </Text>
                        <Text style={styles.timeText}>2 hours ago</Text>
                    </View>
                </View>
                <View style={styles.readmoreContainer}>
                    <ReadMore text="Zmajevi su mitološka bića koja se često nalaze u folkloru i legendama različitih kultura, uklj Zmajevi su mitološka bića koja se često nalaze u folkloru i legendama različitih kultura, uklj" />
                </View>
                <View style={styles.imageContainer}>
                    <Image source={require("../../assets/dragon.png")} />
                </View>
                <UserActions />
            </View>
            <View style={styles.postContainer}>
                <View style={styles.dotsContainer}>
                    <PostDotMenu direction="right" />
                </View>
                <View style={styles.post}>
                    {Icons.userPlaceholderNewsfeedIcon}
                    <View style={styles.textContainer}>
                        <Text style={styles.postText}>
                            <Text style={styles.postTextTitle}>Osama</Text>
                            {messages.groupText}
                            <Text style={styles.postTextTitle}>Juice fuel</Text>
                        </Text>
                        <Text style={styles.timeText}>2 hours ago</Text>
                    </View>
                </View>
                <View style={styles.readmoreContainer}>
                    <ReadMore text="Zmajevi su mitološka bića koja se često nalaze u folkloru i legendama različitih kultura, uklj Zmajevi su mitološka bića koja se često nalaze u folkloru i legendama različitih kultura, uklj" />
                </View>
                <View style={styles.imageContainer}>
                    <Image source={require("../../assets/dragon.png")} />
                </View>
                <UserActions />
            </View>
            <View style={styles.postContainer}>
                <View style={styles.dotsContainer}>
                    <PostDotMenu direction="right" />
                </View>
                <View style={styles.post}>
                    {Icons.userPlaceholderNewsfeedIcon}
                    <View style={styles.textContainer}>
                        <Text style={styles.postText}>
                            <Text style={styles.postTextTitle}>Aleksandar Marinov </Text>
                            {messages.newsfeedTitle}
                        </Text>
                        <Text style={styles.timeText}>2 hours ago</Text>
                    </View>
                </View>
                <UserActions />
            </View>
        </View>
    )
}

export default NewsFeed

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        gap: RPH(1.2)
    },
    readmoreContainer: {
        paddingHorizontal: RPW(6.4)
    },
    imageContainer: {
        marginTop: RPH(1.2),
        marginBottom: RPH(1.8),
    },
    dotsContainer: {
        position: "absolute",
        right: RPW(2),
        top: RPH(1)
    },
    postContainer: {
        borderRadius: 3,
        borderWidth: 1,
        borderColor: "#F0F0F0",
        backgroundColor: "#fff",
        paddingVertical: RPH(2.3),
        position: "relative"
    },
    post: {
        paddingLeft: RPW(7.2),
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
    timeText: {
        color: "#5F6373",
        fontSize: RFS(9),
        fontFamily: "Lato-Regular",
        fontWeight: "400"
    },
    textContainer: {
        justifyContent: "center",
        paddingLeft: RPW(2.5),
        paddingBottom: RPH(1.8),
        flex: 1,
    }
})