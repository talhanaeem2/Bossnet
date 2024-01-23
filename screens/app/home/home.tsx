import { Dimensions, Modal, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native"
import { useState } from "react"
import { BlurView } from 'expo-blur';

import CreatePost from "../createPost/createPost"
import Header from "../../../components/app/header/header";
import Footer from "../../../components/app/footer/footer";
import NewsFeed from "../../../components/app/newsFeed/newsFeed";
import NewsFeedShare from "../../../components/app/newsFeedShare/newsFeedShare";
import SafeAreaViewComponent from "../../../components/app/SafeAreaViewComponent/SafeAreaViewComponent";

import Icons from "../../../constants/icons";
import { RPH, RPW } from "../../../constants/utils";

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
        <SafeAreaViewComponent>
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
        </SafeAreaViewComponent>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: RPH(.8),
        backgroundColor: "#FFFDFA",
        position: "relative"
    },
    newpostContainer: {
        position: "absolute",
        bottom: height * .16,
        right: RPW(2.2)
    }
})