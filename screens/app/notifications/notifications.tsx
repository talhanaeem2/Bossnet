import { ScrollView, StyleSheet, TouchableOpacity, View, Image } from "react-native"

import MainWapper from "../../../components/app/mainWrapper/mainWrapper"
import TextBold from "../../../components/app/textComponent/textBold/textBold"
import { LinearGradient } from "expo-linear-gradient"
import TextRegular from "../../../components/app/textComponent/textRegular/textRegular"
import { RPH, RPW } from "../../../constants/utils"
import PostDotMenu from "../../../components/app/postDotMenu/postDotMenu"

const Notifications = () => {
    return (
        <MainWapper isHeader={true} icon={true} headerText="Notifications">
            <LinearGradient
                colors={['rgba(39, 60, 255, 0.20)', 'rgba(0, 163, 255, 0.20)']}
                style={styles.container}
            >
                <View style={{ paddingHorizontal: 22, paddingVertical: 8 }}>
                    <TextBold fontSize={16}>New</TextBold>
                </View>
                <ScrollView>
                    <View style={styles.friendListContainer}>
                        <View style={styles.friendListItem}>
                            <View style={styles.friendListContent}>
                                <TouchableOpacity>
                                    <View style={styles.friendListCircle}>
                                        <Image style={styles.activeRoundImg} source={require("../../../assets/dummy-profile.png")} />
                                    </View>
                                </TouchableOpacity>
                                <View style={{ paddingRight: 60, flex: 1, gap: 2 }}>
                                    <TextRegular fontSize={12}>
                                        Darrell Trivedi has a new story up.
                                    </TextRegular>
                                    <TextRegular fontSize={12}>
                                        What’s your reaction?
                                    </TextRegular>
                                    <TextRegular fontSize={11} color="#555">
                                        2 hours ago
                                    </TextRegular>
                                </View>
                                <View style={{ position: "absolute", top: 0, right: 0 }}>
                                    <PostDotMenu direction={"right"} />
                                </View>
                            </View>
                        </View>
                        <View style={styles.friendListItem}>
                            <View style={styles.friendListContent}>
                                <TouchableOpacity>
                                    <View style={styles.friendListCircle}>
                                        <Image style={styles.activeRoundImg} source={require("../../../assets/dummy-profile.png")} />
                                    </View>
                                </TouchableOpacity>
                                <View style={{ paddingRight: 60, flex: 1, gap: 2 }}>
                                    <TextRegular fontSize={12}>
                                        Darrell Trivedi has a new story up.
                                    </TextRegular>
                                    <TextRegular fontSize={12}>
                                        What’s your reaction?
                                    </TextRegular>
                                    <TextRegular fontSize={11} color="#555">
                                        2 hours ago
                                    </TextRegular>
                                </View>
                                <View style={{ position: "absolute", top: 0, right: 0 }}>
                                    <PostDotMenu direction={"right"} />
                                </View>
                            </View>
                        </View>
                        <View style={{ paddingHorizontal: 22, paddingVertical: 8 }}>
                            <TextBold fontSize={16}>Earlier</TextBold>
                        </View>
                        <View style={styles.friendListItem}>
                            <View style={styles.friendListContent}>
                                <TouchableOpacity>
                                    <View style={styles.friendListCircle}>
                                        <Image style={styles.activeRoundImg} source={require("../../../assets/dummy-profile.png")} />
                                    </View>
                                </TouchableOpacity>
                                <View style={{ paddingRight: 60, flex: 1, gap: 2 }}>
                                    <TextRegular fontSize={12}>
                                        Darrell Trivedi has a new story up.
                                    </TextRegular>
                                    <TextRegular fontSize={12}>
                                        What’s your reaction?
                                    </TextRegular>
                                    <TextRegular fontSize={11} color="#555">
                                        2 hours ago
                                    </TextRegular>
                                </View>
                                <View style={{ position: "absolute", top: 0, right: 0 }}>
                                    <PostDotMenu direction={"right"} />
                                </View>
                            </View>
                        </View>
                        <View style={styles.friendListItem}>
                            <View style={styles.friendListContent}>
                                <TouchableOpacity>
                                    <View style={styles.friendListCircle}>
                                        <Image style={styles.activeRoundImg} source={require("../../../assets/dummy-profile.png")} />
                                    </View>
                                </TouchableOpacity>
                                <View style={{ paddingRight: 60, flex: 1, gap: 2 }}>
                                    <TextRegular fontSize={12}>
                                        Darrell Trivedi has a new story up.
                                    </TextRegular>
                                    <TextRegular fontSize={12}>
                                        What’s your reaction?
                                    </TextRegular>
                                    <TextRegular fontSize={11} color="#555">
                                        2 hours ago
                                    </TextRegular>
                                </View>
                                <View style={{ position: "absolute", top: 0, right: 0 }}>
                                    <PostDotMenu direction={"right"} />
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </LinearGradient>
        </MainWapper>
    )
}

export default Notifications

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    friendListCircle: {
        width: 55,
        justifyContent: "center",
        alignItems: "center",
        position: "relative"
    },
    friendListContainer: {
        // gap: 24
    },
    activeRoundImg: {
        borderRadius: 50,
        width: "100%",
        objectFit: "contain",
        height: 55
    },
    friendListItem: {
        paddingHorizontal: RPW(4.6),
        paddingVertical: RPH(1.1),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    friendListContent: {
        flexDirection: "row",
        alignItems: "center",
        gap: RPW(3.4)
    }
})