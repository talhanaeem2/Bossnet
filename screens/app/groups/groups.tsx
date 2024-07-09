import { View, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator, TouchableWithoutFeedback, Keyboard, Text, Dimensions, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";

import MainWapper from "../../../components/app/mainWrapper/mainWrapper";
import TextRegular from "../../../components/app/common/textComponent/textRegular/textRegular";
import AppHeader from "../../../components/app/appHeader/appHeader";

import { RPH, RPW, RFS } from "../../../constants/utils/utils";
import Apis from "../../../constants/apis";
import Icons from "../../../constants/icons";

import useSliceSelector from "../../../hooks/useSliceSelector";

import GroupsInterface from "./interfaces/groupsInterface";

const { width } = Dimensions.get("window");
// first is padding second is gap
const boxWidth = (width - RPW(3) * 2 - RPW(2) * 3) / 4;

const Groups = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [groupsData, setGroupsData] = useState<GroupsInterface[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const messages = useSliceSelector(state => state.language.messages);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await axios.get(Apis.groupsApi);
                setGroupsData(response.data);
                setIsLoading(false)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [])

    const filteredGroups = groupsData.filter(item => {
        const itemText = item.name.toLowerCase();
        return itemText.includes(searchQuery.toLowerCase());
    });

    if (isLoading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        )
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <MainWapper>
                <View style={styles.container}>
                    <AppHeader headerText={messages.myGroups} icon={true} />
                    <View style={styles.iconContainer}>
                        <View style={styles.icon}>
                            {Icons.inputSearchIcon}
                        </View>
                        <TextInput
                            placeholder={messages.searchGroups}
                            style={styles.input}
                            value={searchQuery}
                            onChangeText={(text) => setSearchQuery(text)}
                        />
                    </View>
                    <ScrollView>
                        <View style={styles.groupContainer}>
                            {
                                filteredGroups.map((item, index) => {
                                    return (
                                        <View style={styles.groupBox} key={index}>
                                            <TouchableOpacity>
                                                <View style={styles.circle}>
                                                    {/* <Image style={styles.roundImg} source={{ uri: item.avatar_urls.thumb }} /> */}
                                                </View>
                                                <View style={styles.textContainer}>
                                                    <Text style={styles.groupName} numberOfLines={1}>{item.name}</Text>
                                                    <TextRegular fontSize={9} color="#B1B9D8">
                                                        {item.total_members}
                                                    </TextRegular>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                })
                            }
                        </View>
                    </ScrollView>
                </View>
            </MainWapper>
        </TouchableWithoutFeedback>
    )
}

export default Groups

const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    groupName: {
        fontWeight: "400",
        fontFamily: "Lato-Regular",
        fontSize: 12,
        color: "#F9F9F9",
        paddingBottom: 2
    },
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
        left: RPW(7.8),
        top: RPH(1.7)
    },
    input: {
        backgroundColor: "rgba(0, 0, 0, 0.05)",
        marginHorizontal: RPW(5.9),
        color: "#8E8E93",
        fontSize: RFS(17),
        fontFamily: "Lato-Regular",
        fontWeight: "400",
        paddingVertical: RPH(1.3),
        borderRadius: 10,
        paddingHorizontal: RPW(7.8)
    },
    groupContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: RPW(3),
        gap: RPW(2),
        alignItems: "center",
        paddingTop: RPH(1.6)
    },
    groupBox: {
        backgroundColor: "#3E3E3E",
        borderRadius: 5,
        paddingHorizontal: RPW(2),
        paddingVertical: RPH(2.2),
        borderWidth: 1,
        alignItems: "center",
        width: boxWidth
    },
    circle: {
        width: RPW(10.6),
        justifyContent: "center",
        alignItems: "center",
        marginBottom: RPH(.5)
    },
    roundImg: {
        borderRadius: 50,
        width: "100%",
        objectFit: "contain",
        height: RPH(5.1)
    },
})