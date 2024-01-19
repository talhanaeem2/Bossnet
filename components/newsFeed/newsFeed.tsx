import { View, StyleSheet, Image } from "react-native"

import UserActions from "../userActions/userActions"
import { RPH, RPW } from "../../constants/utils"
import Icons from "../../constants/icons"
import messages from "../../constants/messages"
import PostDotMenu from "../postDotMenu/postDotMenu"
import ReadMore from "../readMoreText/readMoreText"
import TextBold from "../textComponent/textBold/textBold"
import TextRegular from "../textComponent/textRegular/textRegular"

const NewsFeed = () => {
    const name: string = "Aleksandar Marinov "

    return (
        <View style={styles.container}>
            <View style={styles.postContainer}>
                <View style={styles.dotsContainer}>
                    <PostDotMenu direction="right" />
                </View>
                <View style={styles.post}>
                    {Icons.userPlaceholderNewsfeedIcon}
                    <View style={styles.textContainer}>
                        <View style={styles.postTextContainer}>
                            <TextBold fontSize={13} color="#5F6373">
                                {name}
                            </TextBold>
                            <TextRegular fontSize={13} color="#5F6373">
                                {messages.newsfeedTitle}
                            </TextRegular>
                        </View>
                        <TextRegular fontSize={9} color="#5F6373">
                            2 hours ago
                        </TextRegular>
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
                        <View style={styles.postTextContainer}>
                            <TextBold fontSize={13} color="#5F6373">
                                Historija
                            </TextBold>
                            <TextRegular fontSize={13} color="#5F6373">
                                {messages.groupText}
                            </TextRegular>
                            <TextBold fontSize={13} color="#5F6373">
                                Bošnjače
                            </TextBold>
                        </View>
                        <TextRegular fontSize={9} color="#5F6373">
                            2 hours ago
                        </TextRegular>
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
                        <View style={styles.postTextContainer}>
                            <TextBold fontSize={13} color="#5F6373">
                                Osama
                            </TextBold>
                            <TextRegular fontSize={13} color="#5F6373">
                                {messages.groupText}
                            </TextRegular>
                            <TextBold fontSize={13} color="#5F6373">
                                Juice fuel
                            </TextBold>
                        </View>
                        <TextRegular fontSize={9} color="#5F6373">
                            2 hours ago
                        </TextRegular>
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
                        <View style={styles.postTextContainer}>
                            <TextBold fontSize={13} color="#5F6373">
                                {name}
                            </TextBold>
                            <TextRegular fontSize={13} color="#5F6373">
                                {messages.newsfeedTitle}
                            </TextRegular>
                        </View>
                        <TextRegular fontSize={9} color="#5F6373">
                            2 hours ago
                        </TextRegular>
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
        gap: RPH(1.2),
        position: "relative"
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
    postTextContainer: {
        flexDirection: "row"
    },
    post: {
        paddingLeft: RPW(7.2),
        flexDirection: "row",
        alignContent: "center"
    },
    textContainer: {
        justifyContent: "center",
        paddingLeft: RPW(2.5),
        paddingBottom: RPH(1.8),
        flex: 1
    }
})