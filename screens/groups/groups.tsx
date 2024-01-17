import { View, StyleSheet, Text, Image, TouchableOpacity, TextInput } from "react-native"
import { Path, Svg } from "react-native-svg"
import { useState } from "react"

import { RFS, RPH, RPW } from "../../constants/utils"
import groupItems from "./constants/groupItems"
import messages from "../../constants/messages"
import MainWapper from "../../components/mainWrapper/mainWrapper"

const Groups = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredGroups = groupItems.filter(item => {
        const itemText = `${item.heading} ${item.subHeading}`.toLowerCase();
        return itemText.includes(searchQuery.toLowerCase());
    });

    return (
        <MainWapper headerText={messages.myGroups}>
            <View style={styles.container}>
                <View style={styles.iconContainer}>
                    <View style={styles.icon}>
                        <Svg width="18" height="21" viewBox="0 0 18 21" fill="none">
                            <Path fill-rule="evenodd" clip-rule="evenodd" d="M14.5117 8.63598C14.5117 4.39242 11.2924 0.952332 7.32126 0.952332C3.35011 0.952332 0.130859 4.39242 0.130859 8.63598C0.130859 12.8795 3.35011 16.3196 7.32126 16.3196C8.87763 16.3196 10.3185 15.7912 11.4954 14.8931L16.0694 19.7805L16.1746 19.8787C16.5772 20.2061 17.1543 20.1734 17.5221 19.7805C17.9232 19.3518 17.9232 18.6568 17.5221 18.2281L12.981 13.3758C13.9399 12.0701 14.5117 10.4244 14.5117 8.63598ZM1.50046 8.63598C1.50046 5.20071 4.10652 2.41588 7.32126 2.41588C10.536 2.41588 13.1421 5.20071 13.1421 8.63598C13.1421 12.0712 10.536 14.8561 7.32126 14.8561C4.10652 14.8561 1.50046 12.0712 1.50046 8.63598Z" fill="#8E8E93" />
                        </Svg>
                    </View>
                    <TextInput
                        placeholder="Search Groups"
                        style={styles.input}
                        value={searchQuery}
                        onChangeText={(text) => setSearchQuery(text)}
                    />
                </View>
                <View style={styles.groupContainer}>
                    {
                        filteredGroups.map((item, index) => {
                            return (
                                <View style={styles.groupBox} key={index}>
                                    <TouchableOpacity>
                                        <View style={styles.circle}>
                                            <Image style={styles.roundImg} source={item.image} />
                                        </View>
                                        <View style={styles.textContainer}>
                                            <Text style={styles.heading}>{item.heading}</Text>
                                            <Text style={styles.subHeading}>{item.subHeading}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )
                        })
                    }
                </View>
            </View>
        </MainWapper>
    )
}

export default Groups

const styles = StyleSheet.create({
    container: {
        paddingTop: RPH(1.6),
        flex: 1,
        backgroundColor: "#fff"
    },
    iconContainer: {
        position:
            "relative"
    },
    textContainer: {
        alignItems: "center"
    },
    icon: {
        position: "absolute",
        left: 30,
        top: 16
    },
    input: {
        backgroundColor: "rgba(0, 0, 0, 0.05)",
        marginHorizontal: 23,
        color: "#8E8E93",
        fontSize: RFS(17),
        fontFamily: "Lato-Regular",
        fontWeight: "400",
        paddingVertical: 11,
        borderRadius: 10,
        paddingHorizontal: 30
    },
    subHeading: {
        color: "#B1B9D8",
        fontSize: RFS(8),
        fontFamily: "Lato-Regular",
        fontWeight: "400"
    },
    heading: {
        color: "#F9F9F9",
        fontSize: RFS(12),
        fontFamily: "Lato-Regular",
        fontWeight: "400",
    },
    groupContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: RPW(3),
        gap: RPW(2),
        alignItems: "center",
        paddingTop: RPH(1.6),
    },
    groupBox: {
        backgroundColor: "#3E3E3E",
        borderRadius: 5,
        paddingHorizontal: 16,
        paddingVertical: 18,
        borderWidth: 1,
        alignItems: "center",
        width: "23%"
    },
    circle: {
        width: 42,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 4
    },
    roundImg: {
        borderRadius: 50,
        width: "100%",
        objectFit: "contain",
        height: 42
    },
})