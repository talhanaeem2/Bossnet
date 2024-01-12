import { Dimensions, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native"

import Header from "../../components/header/header"
import Footer from "../../components/footer/footer"
import NewsFeedShare from "../../components/newsFeedShare/newsFeedShare"
import { RPH, RPW } from "../../constants/utils"
import NewsFeed from "../../components/newsFeed/newsFeed"
import Icons from "../../constants/icons"

const { height } = Dimensions.get("window");

const Home = () => {
    return (
        <View style={styles.container}>
            <Header />
            <NewsFeedShare />
            <ScrollView>
                <NewsFeed />
            </ScrollView>
            <Footer />
            <View style={styles.newpostContainer}>
                <TouchableOpacity>
                    {Icons.newPostIcon}
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: RPH(6.5),
        backgroundColor: "#FFFDFA",
        position:"relative"
    },
    newpostContainer: {
        position: "absolute",
        bottom: height * .16,
        right: RPW(2.2)
    }
})