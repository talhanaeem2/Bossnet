import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native"
import { memo, useCallback } from "react";
import { Path, Svg } from "react-native-svg";

import Header from "../../../components/app/header/header";
import Footer from "../../../components/app/footer/footer";
import NewsFeed from "../../../components/app/newsFeed/newsFeed";
import NewsFeedShare from "../../../components/app/newsFeedShare/newsFeedShare";
import SafeAreaViewComponent from "../../../components/app/SafeAreaViewComponent/SafeAreaViewComponent";
import CreatePostModal from "../../../modals/createPostModal/createPostModal";

import { RPH, RPW } from "../../../constants/utils";

import useReducerDispatch from "../../../hooks/useReducerDispatch";
import useSliceSelector from "../../../hooks/useSliceSelector";
import { setCreatePostModal } from "../../../reducers/app/appSlice";

const { height } = Dimensions.get("window");

const plusIcon = <Svg width="30" height="30" viewBox="0 0 37 37" fill="none">
    <Path fill-rule="evenodd" clip-rule="evenodd" d="M22.2 3.7C22.2 1.65656 20.5434 0 18.5 0C16.4566 0 14.8 1.65656 14.8 3.7V14.8H3.7C1.65656 14.8 0 16.4566 0 18.5C0 20.5434 1.65656 22.2 3.7 22.2H14.8V33.3C14.8 35.3434 16.4566 37 18.5 37C20.5434 37 22.2 35.3434 22.2 33.3V22.2H33.3C35.3434 22.2 37 20.5434 37 18.5C37 16.4566 35.3434 14.8 33.3 14.8H22.2V3.7Z" fill="white" />
</Svg>;

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
                        {plusIcon}
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