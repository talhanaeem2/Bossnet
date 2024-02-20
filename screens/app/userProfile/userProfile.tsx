import { StyleSheet, View, Image, TouchableOpacity } from "react-native"
import { Path } from "react-native-svg"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"

import MainWapper from "../../../components/app/mainWrapper/mainWrapper"
import TextBold from "../../../components/app/textComponent/textBold/textBold"
import TextRegular from "../../../components/app/textComponent/textRegular/textRegular"
import IconContainer from "../../../components/app/iconContainer/iconContainer"

import { RPW, RPH } from "../../../constants/utils"
import Icons from "../../../constants/icons"

import footerIconsInterface from "./interfaces/footerIconsInterface"
import RootStackParamListInterface from "../../../interfaces/RootStackParamListInterface"

const plusIcon = <IconContainer width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path d="M18 13.998H12V19.998H10V13.998H4V11.998H10V5.998H12V11.998H18V13.998Z" fill="white" />
</IconContainer>;

const editIcon = <IconContainer width="21" height="21" viewBox="0 0 21 21" fill="none">
    <Path d="M11.2875 5.99812L14.9993 9.70987L6.33675 18.3724H2.625V14.6597L11.2875 5.99812ZM12.5247 4.76L14.3806 2.90412C14.5447 2.74008 14.7672 2.64793 14.9993 2.64793C15.2313 2.64793 15.4538 2.74008 15.6179 2.90412L18.0932 5.37862C18.1746 5.45989 18.2391 5.55639 18.2832 5.66261C18.3272 5.76883 18.3499 5.8827 18.3499 5.99768C18.3499 6.11267 18.3272 6.22653 18.2832 6.33276C18.2391 6.43898 18.1746 6.53548 18.0932 6.61675L16.2365 8.47262L12.5247 4.76Z" fill="black" />
</IconContainer>;

const arrowUp = <IconContainer width="22" height="23" viewBox="0 0 22 23" fill="none">
    <Path d="M2.80958 14.8029C3.05571 15.0606 3.38948 15.2055 3.73751 15.2055C4.08554 15.2055 4.41932 15.0606 4.66545 14.8029L11.1623 7.99662L17.6592 14.8029C17.9067 15.0533 18.2383 15.1919 18.5824 15.1888C18.9265 15.1857 19.2557 15.0411 19.4991 14.7861C19.7424 14.5312 19.8805 14.1863 19.8835 13.8258C19.8864 13.4653 19.7542 13.118 19.5151 12.8586L12.0903 5.08025C11.8441 4.82247 11.5104 4.67767 11.1623 4.67767C10.8143 4.67767 10.4805 4.82247 10.2344 5.08025L2.80958 12.8586C2.56352 13.1165 2.42529 13.4661 2.42529 13.8307C2.42529 14.1953 2.56352 14.545 2.80958 14.8029Z" fill="black" />
</IconContainer>;

const notificationIcon = <IconContainer width="26" height="27" viewBox="0 0 26 27" fill="none">
    <Path d="M18.9844 2.53125H6.32813C3.71065 2.53125 1.58203 4.80178 1.58203 7.59375V16.4143C1.58203 18.754 3.36656 20.6584 5.56084 20.6584H11.7925C13.3879 20.6584 14.9557 21.2397 16.2071 22.2952L18.4291 24.1684C18.6656 24.3675 18.9488 24.4696 19.2359 24.4696C19.4297 24.4696 19.6243 24.4232 19.807 24.3287C20.2611 24.0941 20.5435 23.614 20.5435 23.0766V20.5748C22.3596 20.1825 23.7313 18.4663 23.7313 16.4152V7.59375C23.7305 4.80178 21.6018 2.53125 18.9844 2.53125ZM14.5183 12.1998C14.4621 12.8166 13.9812 13.2815 13.3998 13.2815H11.9127C11.3313 13.2815 10.8512 12.8166 10.7942 12.1998L10.2769 6.55594C10.2365 6.12056 10.3718 5.68519 10.6479 5.36119C10.9231 5.03719 11.3163 4.85156 11.726 4.85156H13.5865C13.9962 4.85156 14.3894 5.03719 14.6646 5.36119C14.9407 5.68519 15.076 6.12056 15.0356 6.55594L14.5183 12.1998ZM14.7785 16.0878C14.7785 17.3357 13.8262 18.3516 12.6563 18.3516C11.4863 18.3516 10.534 17.3357 10.534 16.0878C10.534 14.8399 11.4863 13.8248 12.6563 13.8248C13.8262 13.8248 14.7785 14.8399 14.7785 16.0878Z" fill="#E4EDF2" />
    <Path d="M14.6647 5.36119C14.3894 5.03719 13.9963 4.85156 13.5865 4.85156H11.726C11.3163 4.85156 10.9232 5.03719 10.6479 5.36119C10.3718 5.68519 10.2366 6.12056 10.2769 6.55594L10.7942 12.1998C10.8504 12.8166 11.3313 13.2815 11.9127 13.2815H13.4006C13.982 13.2815 14.4622 12.8166 14.5191 12.1998L15.0364 6.55594C15.076 6.12056 14.9407 5.68519 14.6647 5.36119Z" fill="#FBC34E" />
    <Path d="M12.6562 13.8248C11.4863 13.8248 10.5339 14.8399 10.5339 16.0878C10.5339 17.3357 11.4863 18.3516 12.6562 18.3516C13.8261 18.3516 14.7785 17.3357 14.7785 16.0878C14.7785 14.8399 13.8261 13.8248 12.6562 13.8248Z" fill="#FBC34E" />
</IconContainer>;

const privacyIcon = <IconContainer width="27" height="27" viewBox="0 0 27 27" fill="none">
    <Path d="M5.625 10.125C4.38233 10.125 3.375 11.1375 3.375 12.375V13.5V20.25V21.375C3.375 22.6125 4.38233 23.625 5.625 23.625H7.875H19.125H21.375C22.6181 23.625 23.625 22.6125 23.625 21.375V13.5V12.375C23.625 11.1375 22.6181 10.125 21.375 10.125H19.125H5.625Z" fill="#F1C40F" />
    <Path d="M5.625 13.5C4.38233 13.5 3.375 14.5125 3.375 15.75V16.875V23.625V24.75C3.375 25.9875 4.38233 27 5.625 27H7.875H19.125H21.375C22.6181 27 23.625 25.9875 23.625 24.75V16.875V15.75C23.625 14.5125 22.6181 13.5 21.375 13.5H19.125H5.625Z" fill="#F39C12" />
    <Path d="M13.5 1.125C9.15075 1.125 5.625 4.65075 5.625 9H9C9 6.51476 11.0148 4.5 13.5 4.5C15.5959 4.5 17.3239 5.93516 17.8245 7.875H21.2692C20.7214 4.06125 17.4656 1.125 13.5 1.125Z" fill="#BDC3C7" />
    <Path d="M5.625 15.75V16.875H21.375V15.75H5.625ZM5.625 18V19.125H21.375V18H5.625ZM5.625 20.25V21.375H21.375V20.25H5.625ZM5.625 22.5V23.625H21.375V22.5H5.625Z" fill="#E67E22" />
    <Path d="M5.625 10.125V11.25C5.625 11.8125 6.38055 12.375 7.3125 12.375C8.24445 12.375 9 11.8125 9 11.25V10.125C9 10.6875 8.24445 11.25 7.3125 11.25C6.38055 11.25 5.625 10.6875 5.625 10.125Z" fill="#7F8C8D" />
    <Path d="M13.5 2.74219C13.1051 2.74219 12.7136 2.78021 12.3401 2.8476C12.0622 2.89777 11.7923 2.97461 11.5312 3.05865C11.2871 3.13718 11.0555 3.23426 10.8281 3.3399C10.7089 3.39525 10.5909 3.4533 10.4766 3.51562C10.3282 3.59651 10.1939 3.70485 10.0547 3.79688C9.92441 3.88294 9.78964 3.94785 9.66802 4.04303C9.50974 4.16644 9.35314 4.29176 9.21094 4.42969C9.16943 4.47041 9.14557 4.52846 9.10552 4.57031C8.91607 4.76651 8.73281 4.94786 8.57812 5.16803C8.4204 5.39224 8.27393 5.62534 8.15625 5.87115C8.15175 5.8806 8.16075 5.89669 8.15625 5.90625C8.03126 6.17164 7.91336 6.46414 7.8399 6.75C7.55528 7.40745 6.7797 7.875 5.87115 7.875C5.80365 7.875 5.77755 7.87703 5.73053 7.875C5.71871 7.87455 5.71163 7.87657 5.69531 7.875L5.625 9V10.125V11.25H9V10.125V9C9 8.68939 9.04556 8.37889 9.10552 8.08594C9.52504 6.0354 11.3254 4.5 13.5 4.5C15.5959 4.5 17.3239 5.93516 17.8245 7.875H21.1286C20.2207 7.875 19.4445 7.40745 19.1599 6.75C19.0868 6.46414 18.9686 6.17164 18.8438 5.90625C18.8392 5.89669 18.8483 5.8806 18.8438 5.87115C18.7256 5.62534 18.5794 5.39224 18.4219 5.16803C18.2666 4.94786 18.0844 4.76651 17.8942 4.57031C17.8538 4.52756 17.8324 4.4712 17.7885 4.42969C17.6468 4.29176 17.4904 4.16644 17.3317 4.04303C17.2148 3.95111 17.0708 3.88013 16.9447 3.79688C16.8075 3.70586 16.6702 3.59572 16.524 3.51562C16.4104 3.45375 16.29 3.3948 16.1719 3.3399C15.9446 3.23426 15.7129 3.13718 15.4688 3.05865C15.2078 2.97461 14.9377 2.89777 14.6599 2.8476C14.2864 2.78021 13.8949 2.74219 13.5 2.74219Z" fill="#95A5A6" />
    <Path d="M18 11.25C18 11.871 18.756 12.375 19.6875 12.375C20.619 12.375 21.375 11.871 21.375 11.25H18Z" fill="#E67E22" />
</IconContainer>;

const blockedIcon = <IconContainer width="41" height="40" viewBox="0 0 41 40" fill="none">
    <Path fill-rule="evenodd" clip-rule="evenodd" d="M12.5524 10.0038C12.5524 5.45628 16.2522 1.76981 20.8161 1.76981C25.38 1.76981 29.0798 5.45628 29.0798 10.0038C29.0798 14.5512 25.38 18.2377 20.8161 18.2377C16.2522 18.2377 12.5524 14.5512 12.5524 10.0038ZM20.8161 5.06338C18.0777 5.06338 15.8579 7.27527 15.8579 10.0038C15.8579 12.7322 18.0777 14.9441 20.8161 14.9441C23.5545 14.9441 25.7743 12.7322 25.7743 10.0038C25.7743 7.27527 23.5545 5.06338 20.8161 5.06338Z" fill="white" />
    <Path d="M7.69648 34.7056C8.5098 28.2069 14.0736 23.1781 20.8162 23.1781C22.2327 23.1781 23.5943 23.3994 24.8695 23.8083L26.443 24.3125L27.4551 21.1772L25.8818 20.6728C24.2835 20.1605 22.5805 19.8845 20.8162 19.8845C11.6883 19.8845 4.2887 27.2575 4.2887 36.3524V37.9992H23.5822V34.7056H7.69648Z" fill="white" />
    <Path fill-rule="evenodd" clip-rule="evenodd" d="M25.7743 31.412C25.7743 27.7741 28.7342 24.8249 32.3853 24.8249C36.0364 24.8249 38.9963 27.7741 38.9963 31.412C38.9963 35.05 36.0364 37.9992 32.3853 37.9992C28.7342 37.9992 25.7743 35.05 25.7743 31.412ZM32.3853 28.1185C30.5597 28.1185 29.0798 29.593 29.0798 31.412C29.0798 31.7072 29.1188 31.993 29.1917 32.2651L33.2414 28.23C32.9684 28.1573 32.6814 28.1185 32.3853 28.1185ZM35.5789 30.559L31.5292 34.5941C31.8022 34.6668 32.0891 34.7056 32.3853 34.7056C34.2109 34.7056 35.6908 33.2311 35.6908 31.412C35.6908 31.1169 35.6518 30.8311 35.5789 30.559Z" fill="white" />
</IconContainer>;

const groupIcon = <IconContainer width="40" height="40" viewBox="0 0 40 40" fill="none">
    <Path fill-rule="evenodd" clip-rule="evenodd" d="M11.9796 10.1999C11.9796 5.65241 15.6661 1.96594 20.2135 1.96594C24.761 1.96594 28.4475 5.65241 28.4475 10.1999C28.4475 14.7474 24.761 18.4338 20.2135 18.4338C15.6661 18.4338 11.9796 14.7474 11.9796 10.1999ZM20.2135 5.25952C17.485 5.25952 15.2732 7.47141 15.2732 10.1999C15.2732 12.9284 17.485 15.1403 20.2135 15.1403C22.9421 15.1403 25.1539 12.9284 25.1539 10.1999C25.1539 7.47141 22.9421 5.25952 20.2135 5.25952Z" fill="white" />
    <Path d="M7.14122 34.9017C7.95161 28.403 13.4953 23.3742 20.2136 23.3742C22.131 23.3742 23.9485 23.7828 25.5876 24.5161L27.0908 25.1886L28.4359 22.1823L26.9327 21.5097C24.8788 20.5908 22.6036 20.0806 20.2136 20.0806C11.1186 20.0806 3.74573 27.4536 3.74573 36.5485V38.1953H24.0905V34.9017H7.14122Z" fill="white" />
    <Path d="M33.3879 25.021V29.9614H38.3282V33.255H33.3879V38.1953H30.0943V33.255H25.1539V29.9614H30.0943V25.021H33.3879Z" fill="white" />
</IconContainer>;

const exportIcon = <IconContainer width="46" height="46" viewBox="0 0 46 46" fill="none">
    <Path fill-rule="evenodd" clip-rule="evenodd" d="M33.4024 35.2688V31.5483C36.4846 31.5483 38.9832 29.0497 38.9832 25.9675C38.9832 22.8853 36.4846 20.3867 33.4024 20.3867C33.3441 20.3869 33.3441 20.3869 33.2861 20.3879L31.6794 20.4205L31.4137 18.8355C30.6685 14.3897 26.8006 11.0854 22.2408 11.0854C18.8782 11.0854 15.8309 12.8832 14.1792 15.7435L13.6663 16.6318L12.6412 16.672C8.6597 16.8283 5.49848 20.1085 5.49848 24.1072C5.49848 27.5744 7.86989 30.4878 11.0793 31.3138V35.1145C5.80037 34.2288 1.77795 29.6378 1.77795 24.1072C1.77795 18.4497 5.99523 13.752 11.4883 13.0392C13.8864 9.53221 17.8756 7.36487 22.2408 7.36487C28.1167 7.36487 33.1699 11.2819 34.7519 16.7634C39.2493 17.417 42.7037 21.2888 42.7037 25.9675C42.7037 31.1044 38.5394 35.2688 33.4024 35.2688ZM20.3806 33.8796V22.247H24.1011V33.8796L28.3665 29.7053L30.9973 32.2799L22.2408 40.8496L13.4844 32.2799L16.1152 29.7053L20.3806 33.8796Z" fill="#FEFEFE" />
</IconContainer>;

const delIcon = <IconContainer width="41" height="41" viewBox="0 0 41 41" fill="none">
    <Path fill-rule="evenodd" clip-rule="evenodd" d="M12.0225 10.7435C12.0225 6.19602 15.7223 2.50955 20.2862 2.50955C24.8501 2.50955 28.5499 6.19602 28.5499 10.7435C28.5499 15.291 24.8501 18.9774 20.2862 18.9774C15.7223 18.9774 12.0225 15.291 12.0225 10.7435ZM20.2862 5.80313C17.5478 5.80313 15.328 8.01502 15.328 10.7435C15.328 13.472 17.5478 15.6839 20.2862 15.6839C23.0246 15.6839 25.2444 13.472 25.2444 10.7435C25.2444 8.01502 23.0246 5.80313 20.2862 5.80313Z" fill="white" />
    <Path d="M7.16657 35.4453C7.97989 28.9466 13.5437 23.9178 20.2863 23.9178C23.4366 23.9178 26.3256 25.0136 28.5968 26.8448L29.8816 27.8807L31.9608 25.3204L30.6761 24.2844C27.8378 21.996 24.2206 20.6242 20.2863 20.6242C11.1584 20.6242 3.75879 27.9972 3.75879 37.0921V38.7389H24.1772V35.4453H7.16657Z" fill="white" />
    <Path d="M25.2444 30.505H38.4664V33.7986H25.2444V30.505Z" fill="white" />
</IconContainer>;


const footerIcons: footerIconsInterface[] = [
    {
        icon: blockedIcon,
        text: "Blocked Members"

    },
    {
        icon: groupIcon,
        text: "Group Invites"
    },
    {
        icon: exportIcon,
        text: "Export Data"
    },
    {
        icon: delIcon,
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
                            {plusIcon}
                            <TextBold fontSize={19} color="#fff">
                                Create post
                            </TextBold>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.editBtn}>
                            {editIcon}
                            <TextRegular fontSize={19}>
                                Edit Profile
                            </TextRegular>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.editBtn}>
                            {arrowUp}
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
                        {notificationIcon}
                        <TextRegular fontSize={22} color="#1B1B1B">
                            Notification Settings
                        </TextRegular>
                    </TouchableOpacity>
                    <View style={styles.divider}></View>
                    <TouchableOpacity style={styles.setting}>
                        {privacyIcon}
                        <TextRegular fontSize={22} color="#1B1B1B">
                            Privacy
                        </TextRegular>
                    </TouchableOpacity>
                </View>
                <View style={styles.footer}>
                    {footerIcons.map((item, index) => {
                        return (
                            <TouchableOpacity key={index} style={styles.footerBtnItem}>
                                <View style={styles.footerBtn}>
                                    {item.icon}
                                </View>
                                <TextRegular fontSize={12}>
                                    {item.text}
                                </TextRegular>
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
        paddingTop: RPH(10),
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
        gap: RPW(9.2),
        position: "absolute",
        bottom: RPH(2),
        left: RPW(8.8)
    },
    footerBtn: {
        backgroundColor: "#616161",
        borderRadius: 50,
        paddingHorizontal: RPW(1.6),
        paddingVertical: RPH(.8)
    },
    footerBtnItem: {
        width: RPW(13.8),
        alignItems: "center",
        justifyContent: "center"
    }
})