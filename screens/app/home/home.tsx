import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native"
import { memo, useCallback } from "react";
import { Path, Svg } from "react-native-svg";

import Header from "../../../components/app/header/header";
import Footer from "../../../components/app/footer/footer";
import NewsFeed from "../../../components/app/newsFeed/newsFeed";
import NewsFeedShare from "../../../components/app/newsFeed/newsFeedShare";
import SafeAreaViewComponent from "../../../components/app/SafeAreaViewComponent/SafeAreaViewComponent";
import CreatePostModal from "../../../modals/createPostModal/createPostModal";

import { RPH, RPW } from "../../../constants/utils";
import Icons from "../../../constants/icons";

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
                <NewsFeed />
                <View style={styles.newpostContainer}>
                    <TouchableOpacity style={styles.newPostBtn} onPress={handleToggleCreatePostModal}>
                        {Icons.postIcon}
                    </TouchableOpacity>
                </View>
                {isCreatePostModalVisible && (
                    <CreatePostModal />
                )}
                <View style={styles.footer}>
                    <Footer />
                </View>
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
    newPostBtn: {
        backgroundColor: "#385DFF",
        borderRadius: 50,
        paddingVertical: RPH(1.6),
        paddingHorizontal: RPW(3.2)
    },
    newpostContainer: {
        position: "absolute",
        bottom: height * .16,
        right: RPW(2.2)
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
    }
})