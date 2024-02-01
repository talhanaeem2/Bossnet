import { Dimensions, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native"
import { memo, useCallback } from "react";

import Header from "../../../components/app/header/header";
import Footer from "../../../components/app/footer/footer";
import NewsFeed from "../../../components/app/newsFeed/newsFeed";
import NewsFeedShare from "../../../components/app/newsFeedShare/newsFeedShare";
import SafeAreaViewComponent from "../../../components/app/SafeAreaViewComponent/SafeAreaViewComponent";
import CreatePostModal from "../../../modals/createPostModal/createPostModal";

import Icons from "../../../constants/icons";
import { RPH, RPW } from "../../../constants/utils";

import useReducerDispatch from "../../../hooks/useReducerDispatch";
import useSliceSelector from "../../../hooks/useSliceSelector";
import { setCreatePostModal } from "../../../reducers/app/appSlice";

const { height } = Dimensions.get("window");

const Home = () => {
    const isCreatePostModalVisible = useSliceSelector(state => state.app.createPostModal.isVisible);
    const dispatch = useReducerDispatch();

    const handleToggleCreatePostModal = useCallback(() => {
        dispatch(setCreatePostModal({ isVisible: !isCreatePostModalVisible }));
    }, [isCreatePostModalVisible]);

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
                    <CreatePostModal />
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