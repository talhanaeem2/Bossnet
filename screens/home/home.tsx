import { ScrollView, StyleSheet, View } from "react-native"

import Header from "../../components/header/header"
import Footer from "../../components/footer/footer"
import NewsFeedShare from "../../components/newsFeedShare/newsFeedShare"
import { RPH, RPW } from "../../constants/utils"
import NewsFeed from "../../components/newsFeed/newsFeed"

const Home = () => {
    return (
        <View style={styles.container}>
            <Header />
            <NewsFeedShare />
            <ScrollView>
                <NewsFeed />
            </ScrollView>
            <Footer />
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: RPW(.7),
        marginTop: RPH(6.5)
    }
})