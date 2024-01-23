import { View, TouchableOpacity, StyleSheet, Image } from "react-native"
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Svg, { Ellipse, Path } from "react-native-svg"

import TextBold from "../textComponent/textBold/textBold";
import TextRegular from "../textComponent/textRegular/textRegular";

import Icons from "../../../constants/icons";
import { RPW, RPH } from "../../../constants/utils";

import MainHeaderProps from "./interfaces/mainHeaderProps";
import RootStackParamListInterface from "../../../interaces/RootStackParamListInterface";

const MainHeader = (props: MainHeaderProps) => {
    const { chatHeader = false, icon = false } = props
    const navigation = useNavigation<StackNavigationProp<RootStackParamListInterface>>();

    const goBack = () => {
        navigation.goBack();
    };

    return (
        <>
            {
                chatHeader ?
                    <View style={styles.chatHeader}>
                        <View style={styles.iconText}>
                            <TouchableOpacity onPress={goBack} style={styles.backIcon}>
                                {Icons.backIcon}
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View style={styles.circle}>
                                    <Image style={styles.roundImg} source={require("../../../assets/dummy-profile.png")} />
                                </View>
                            </TouchableOpacity>
                            <TextBold fontSize={23}>
                                {props.headerText as string}
                            </TextBold>
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate("NewMessage")}>
                            <Svg width="47" height="49" viewBox="0 0 47 49" fill="none">
                                <Ellipse cx="23.984" cy="23.5" rx="22.5" ry="22.6433" fill="#F5F4F3" />
                                <Path d="M36.2417 15.3364L33.9151 17.663L29.4276 13.313L31.8229 10.9176C32.4089 10.3317 33.2036 10.0025 34.0323 10.0025C34.861 10.0025 35.6557 10.3317 36.2417 10.9176C36.8276 11.5036 37.1568 12.2983 37.1568 13.127C37.1568 13.9557 36.8276 14.7504 36.2417 15.3364ZM32.5526 19.0239L18.2479 33.3286L12.1573 35.0255L13.8276 28.9114L28.0792 14.6598L32.5526 19.0239Z" fill="black" />
                            </Svg>
                        </TouchableOpacity>
                    </View>
                    :
                    <View style={styles.header}>
                        {icon ?
                            <>
                                <TouchableOpacity onPress={goBack}>
                                    {Icons.backIcon}
                                </TouchableOpacity>
                                <TextBold fontSize={23}>
                                    {props.headerText as string}
                                </TextBold>
                            </> :
                            <>
                                <TouchableOpacity onPress={goBack}>
                                    <TextRegular fontSize={17}>
                                        {props.headerText as string}
                                    </TextRegular>
                                </TouchableOpacity>
                                <TextBold fontSize={17} style={styles.friendstext}>
                                    Friends
                                </TextBold>
                                <View style={styles.spacer}></View>
                            </>
                        }
                    </View>
            }

        </>
    )
}

export default MainHeader

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        gap: 15,
        paddingHorizontal: 11,
        paddingTop: 8,
        paddingBottom: 16,
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#EBEFF2",
        backgroundColor: "#fff"
    },
    chatHeader: {
        flexDirection: "row",
        gap: RPW(4),
        paddingRight: RPW(2.8),
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        paddingVertical: RPH(1),
        borderBottomWidth: 1,
        borderBottomColor: "#EBEFF2",
    },
    backIcon: {
        paddingHorizontal: RPW(2)
    },
    iconText: {
        flexDirection: "row",
        alignItems: "center",
        gap: RPW(2.6)
    },
    circle: {
        width: RPW(11.5),
        height: RPH(5.8),
        justifyContent: "center",
        alignItems: "center",
    },
    roundImg: {
        borderRadius: 50,
        width: "100%",
        objectFit: "contain",
        height: RPH(5.8)
    },
    friendstext: {
        textAlign: "center",
        paddingLeft: RPW(25)
    },
    spacer: {
        flex: 1
    }
})