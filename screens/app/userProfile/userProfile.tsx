import { StyleSheet, View, Image, TouchableOpacity } from "react-native"

import MainWapper from "../../../components/app/mainWrapper/mainWrapper"
import TextBold from "../../../components/app/textComponent/textBold/textBold"
import TextRegular from "../../../components/app/textComponent/textRegular/textRegular"

import { RPW, RPH } from "../../../constants/utils"
import Icons from "../../../constants/icons"

import footerIconsInterface from "./interfaces/footerIconsInterface"


const footerIcons: footerIconsInterface[] = [
    {
        icon: Icons.blockedIcon,
        text: "Blocked Members"

    },
    {
        icon: Icons.groupIcon,
        text: "Group Invites"
    },
    {
        icon: Icons.exportIcon,
        text: "Export Data"
    },
    {
        icon: Icons.delIcon,
        text: "Delete Account"
    }
]

const UserProfile = () => {
    return (
        <MainWapper isHeader={true} isFooter={false} icon={true}>
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.circle}>
                        <Image style={styles.roundImg} source={require("../../../assets/dummy-profile.png")} />
                    </View>
                    <TextBold fontSize={35} style={{ paddingTop: 20 }}>
                        Aldin Mahmutovic
                    </TextBold>
                    <View style={styles.followContainer}>
                        <TextRegular fontSize={19} color="#787878">
                            1 followers
                        </TextRegular>
                        <TextRegular fontSize={19} color="#787878">
                            2 following
                        </TextRegular>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.createBtn}>
                            {Icons.userPlusIcon}
                            <TextBold fontSize={19} color="#fff">
                                Create post
                            </TextBold>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.editBtn}>
                            {Icons.userEditIcon}
                            <TextRegular fontSize={19}>
                                Edit Profile
                            </TextRegular>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.editBtn}>
                            {Icons.userArrowUpIcon}
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.settingsContainer}>
                    <TouchableOpacity style={styles.setting}>
                        {Icons.logoutIcon}
                        <TextRegular fontSize={22} color="#1B1B1B">
                            Login Information
                        </TextRegular>
                    </TouchableOpacity>
                    <View style={styles.divider}></View>
                    <TouchableOpacity style={styles.setting}>
                        {Icons.notificationIcon}
                        <TextRegular fontSize={22} color="#1B1B1B">
                            Notification Settings
                        </TextRegular>
                    </TouchableOpacity>
                    <View style={styles.divider}></View>
                    <TouchableOpacity style={styles.setting}>
                        {Icons.privacyIcon}
                        <TextRegular fontSize={22} color="#1B1B1B">
                            Privacy
                        </TextRegular>
                    </TouchableOpacity>
                </View>
                <View style={styles.footer}>
                    {footerIcons.map((item, index) => {
                        return (
                            <TouchableOpacity key={index} style={styles.footerBtnItem}>
                                {item.icon}
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </View>
        </MainWapper>
    )
}

export default UserProfile

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFDFA",
        flex: 1,
        paddingTop: RPH(6),
        position: "relative"
    },
    content: {
        alignItems: "center"
    },
    circle: {
        width: 139,
        height: 139,
        justifyContent: "center",
        alignItems: "center",
    },
    roundImg: {
        borderRadius: 80,
        width: "100%",
        objectFit: "contain",
        height: 139
    },
    followContainer: {
        flexDirection: "row",
        gap: RPW(1),
        paddingVertical: RPH(2.4)
    },
    buttonContainer: {
        flexDirection: "row",
        gap: RPW(3.6)
    },
    createBtn: {
        backgroundColor: "#385DFF",
        borderRadius: 38,
        flexDirection: "row",
        paddingHorizontal: RPW(2.4),
        paddingVertical: RPH(1.5),
        alignItems: "center",
        justifyContent: "center"
    },
    editBtn: {
        backgroundColor: "#BEBEBE",
        borderRadius: 38,
        flexDirection: "row",
        paddingHorizontal: RPW(2.4),
        paddingVertical: RPH(1.5),
        alignItems: "center",
        justifyContent: "center",
        gap: RPW(.4)
    },
    settingsContainer: {
        paddingTop: RPH(6.2),
        alignItems: "flex-start",
        marginLeft: RPW(5.4),
        gap: RPW(5)
    },
    setting: {
        flexDirection: "row",
        gap: RPW(2.8)
    },
    divider: {
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        width: "100%"
    },
    footer: {
        flexDirection: "row",
        gap: 6,
        position: "absolute",
        bottom: RPH(2),
        left: RPW(7.2)
    },
    footerBtnItem: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F6F6F6",
        borderWidth: 1,
        borderColor: "#E9E9E9",
        paddingHorizontal: 16,
        paddingVertical: 10
    }
})