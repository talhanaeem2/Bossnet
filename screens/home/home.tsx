import { Dimensions, Modal, ScrollView, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"
import { useState } from "react"
import { BlurView } from 'expo-blur';

import Header from "../../components/header/header"
import Footer from "../../components/footer/footer"
import NewsFeedShare from "../../components/newsFeedShare/newsFeedShare"
import { RPH, RPW } from "../../constants/utils"
import NewsFeed from "../../components/newsFeed/newsFeed"
import Icons from "../../constants/icons"
import CreatePost from "../createPost/createPost"

const { height } = Dimensions.get("window");

const Home = () => {
    const [isCreatePostModalVisible, setCreatePostModalVisible] = useState(false);

    const toggleCreatePostModal = () => {
        setCreatePostModalVisible(!isCreatePostModalVisible);
    };

    const closeModal = () => {
        setCreatePostModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <Header />
            <NewsFeedShare />
            <ScrollView>
                <NewsFeed />
            </ScrollView>
            <Footer />
            <View style={styles.newpostContainer}>
                <TouchableOpacity onPress={toggleCreatePostModal}>
                    {Icons.newPostIcon}
                </TouchableOpacity>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isCreatePostModalVisible}
                onRequestClose={toggleCreatePostModal}
            >
                <BlurView
                    intensity={100}
                    tint="dark"
                    style={StyleSheet.absoluteFill}
                >
                    <CreatePost closeModal={closeModal} />
                </BlurView>
            </Modal>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: RPH(6.5),
        backgroundColor: "#FFFDFA",
        position: "relative"
    },
    newpostContainer: {
        position: "absolute",
        bottom: height * .16,
        right: RPW(2.2)
    }
})