import { Dimensions, Modal, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native"
import { BlurView } from 'expo-blur';
import { memo, useCallback } from "react";

import CreatePost from "../createPost/createPost"
import Header from "../../../components/app/header/header";
import Footer from "../../../components/app/footer/footer";
import NewsFeed from "../../../components/app/newsFeed/newsFeed";
import NewsFeedShare from "../../../components/app/newsFeedShare/newsFeedShare";
import SafeAreaViewComponent from "../../../components/app/SafeAreaViewComponent/SafeAreaViewComponent";

import Icons from "../../../constants/icons";
import { RPH, RPW } from "../../../constants/utils";

import useReducerDispatch from "../../../hooks/useReducerDispatch";
import useSliceSelector from "../../../hooks/useSliceSelector";
import { toggleCreatePostModal } from "../../../reducers/appSlice";

const { height } = Dimensions.get("window");

const Home = () => {
    const isCreatePostModalVisible = useSliceSelector(state => state.app.createPostModal.isCreatePostModalVisible);
    const dispatch = useReducerDispatch();

    const handleToggleCreatePostModal = useCallback(() => {
        dispatch(toggleCreatePostModal({ isVisible: !isCreatePostModalVisible }));
    }, [isCreatePostModalVisible]);

    const closeModal = () => {
        dispatch(toggleCreatePostModal({ isVisible: false }));
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
                    <TouchableOpacity onPress={handleToggleCreatePostModal}>
                        {Icons.newPostIcon}
                    </TouchableOpacity>
                </View>
                {isCreatePostModalVisible && (
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={isCreatePostModalVisible}
                        onRequestClose={handleToggleCreatePostModal}
                    >
                        <BlurView
                            intensity={100}
                            tint="dark"
                            style={StyleSheet.absoluteFill}
                        >
                            <CreatePost closeModal={closeModal} />
                        </BlurView>
                    </Modal>
                )}
            </View>
        </SafeAreaViewComponent>
    )
}

export default memo(Home)

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