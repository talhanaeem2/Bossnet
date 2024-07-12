import { memo } from "react"
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, useRoute } from "@react-navigation/native";

import MainWapper from "../../../components/app/mainWrapper/mainWrapper";

import Icons from "../../../constants/icons";
import { RPH, RPW } from "../../../constants/utils/utils";

import RootStackParamListInterface from "../../../interfaces/RootStackParamListInterface";
import IProfileData from "../../../interfaces/IProfileData";

const UserDetails = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamListInterface>>();
    const route = useRoute();
    const params = route.params as IProfileData;
    const name = `${params.firstName} ${params.lastName}`;
    const userName = params.userName;
    console.log(params)

    return (
        <MainWapper>
            <View style={styles.header}>
                <TouchableOpacity>
                    {Icons.backIcon}
                </TouchableOpacity>
                <View style={styles.headerOptions}>
                    <TouchableOpacity>
                        {Icons.userNotification}
                    </TouchableOpacity>
                    <TouchableOpacity>
                        {Icons.dotsEncircled}
                    </TouchableOpacity>
                </View>
            </View>
        </MainWapper>
    )
}

export default memo(UserDetails);

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: RPH(1),
        paddingHorizontal: RPW(5)
    },
    headerOptions: {
        flexDirection: 'row',
        gap: 10
    }
})