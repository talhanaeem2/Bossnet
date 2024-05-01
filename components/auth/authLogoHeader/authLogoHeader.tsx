import { StyleSheet, View, Text } from "react-native"
import { Picker } from '@react-native-picker/picker';
import { memo } from "react";

import { languageOptions } from "../../../constants/constants";
import { RPH, RPW, RFS } from "../../../constants/utils";

import AuthLogoHeaderProps from "./interfaces/AuthLogoHeaderProps";

const AuthLogoHeader = (props: AuthLogoHeaderProps) => {
    const { formik, selectedLanguage, setSelectedLanguage } = props

    return (
        <View>
            <View style={styles.languageDropdown}>
                <Picker
                    mode="dropdown"
                    dropdownIconColor="#000"
                    selectedValue={selectedLanguage}
                    onValueChange={(itemValue) => {
                        setSelectedLanguage(itemValue);
                        formik?.setFieldValue('selectedLanguage', itemValue);
                    }}>
                    {languageOptions.map((item, index) => {
                        return (
                            <Picker.Item style={styles.dropdownText} key={index} label={item.label} value={item.value} />
                        )
                    })}
                </Picker>
            </View>
            <View style={styles.logo}>
                <Text style={styles.logoText}>bosnett</Text>
            </View>
        </View>
    )
}
export default memo(AuthLogoHeader)

const styles = StyleSheet.create({
    logoText: {
        color: '#2196f3',
        fontSize: 46,
        fontFamily: 'ReadexPro-Regular'
    },
    languageDropdown: {
        borderRadius: 10,
        width: '100%',
        height: RPH(5),
        alignSelf: "center",
        justifyContent: "center",
        marginBottom: 70,
        paddingHorizontal: RPW(19)
    },
    dropdownText: {
        fontSize: RFS(17),
        fontFamily: "Lato-Regular"
    },
    logo: {
        paddingBottom: 70,
        alignItems: 'center',
    },
})