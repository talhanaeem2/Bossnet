import { View, Text, StyleSheet, Platform, Image, TouchableOpacity } from "react-native"

import commonStyles from "../../styles/commonStyles."
import { RPW, RPH, RFS } from "../../constants/utils"
import Footer from "../../components/footer/footer"
import { menuButtons } from "./constants/menuButtons"

const Menu = () => {
    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <Text style={[commonStyles.heading, styles.textSpacing]}>Menu</Text>
                <View style={styles.buttonsContainer}>
                    {menuButtons.map((item, index) => {
                        if (index % 2 === 0) {
                            return (
                                <View style={styles.rowContainer} key={index}>
                                    <View style={styles.btnContainer}>
                                        <TouchableOpacity>
                                            <Image style={commonStyles.imageContain} source={item.url} />
                                            <Text style={styles.btnText}>{item.text}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    {index + 1 < menuButtons.length && (
                                        <View style={styles.btnContainer}>
                                            <TouchableOpacity>
                                                <Image style={commonStyles.imageContain} source={menuButtons[index + 1].url} />
                                                <Text style={styles.btnText}>{menuButtons[index + 1].text}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                </View>
                            );
                        }
                        return null;
                    })}
                </View>
                <TouchableOpacity style={styles.logout}>
                    <Image style={commonStyles.imageContain} source={require('../../assets/icons/logout.png')} />
                    <Text style={styles.logoutText}>Log out</Text>
                </TouchableOpacity>
            </View>
            <Footer />
        </View>
    )
}

export default Menu

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: RPH(6.5),
        flexDirection: "column",
        justifyContent: 'space-between',
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: RPW(2),
    },
    textSpacing: {
        paddingLeft: RPW(5.5)
    },
    btnText: {
        fontFamily: "Lato-Bold",
        fontWeight: "700",
        fontSize: RFS(19),
        color: "#000",
        paddingTop: RPH(.2)
    },
    buttonsContainer: {
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#F7F6F5",
        backgroundColor: "#fff",
        marginTop: RPH(1.8),
        marginHorizontal: RPW(2),
        flexDirection: "column",
        paddingHorizontal: RPW(2.7),
        paddingTop: RPH(2),
        paddingBottom: RPH(4.9)
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: RPW(2.8),
    },
    btnContainer: {
        flex: 1,
        backgroundColor: '#FFF',
        borderRadius: 10,
        borderColor: "rgba(247, 246, 245, 0.16)",
        paddingHorizontal: RPW(2.1),
        paddingVertical: RPH(.6),
        marginTop: RPH(1.9),
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(0, 0, 0, 0.15)',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 1,
                shadowRadius: 4,
            },
            android: {
                elevation: 4,
            },
        }),
    },
    logout: {
        flexDirection: "row",
        gap: RPW(2.8),
        borderWidth: 0.5,
        borderColor: 'rgba(247, 246, 245, 0.16)',
        backgroundColor: '#E7E7E7',
        marginHorizontal: RPW(3),
        paddingVertical: RPH(1.1),
        justifyContent: "center",
        borderRadius: 10,
        marginTop: RPH(4.3)
    },
    logoutText: {
        fontFamily: "Lato-Bold",
        fontWeight: "700",
        fontSize: RFS(19),
        color: "#000"
    }
})