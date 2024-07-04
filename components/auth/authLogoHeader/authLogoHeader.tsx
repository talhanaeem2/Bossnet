import { StyleSheet, View, Text } from "react-native"
import { Picker } from '@react-native-picker/picker';
import { memo, useEffect } from "react";

import { RPH, RPW, RFS } from "../../../constants/utils/utils";

import useSliceSelector from "../../../hooks/useSliceSelector";
import useReducerDispatch from "../../../hooks/useReducerDispatch";
import { loadLanguage, setLanguage } from "../../../reducers/language/languageSlice";

import AuthLogoHeaderProps from "./interfaces/AuthLogoHeaderProps";
import LanguageOptionInterface from "../../../interfaces/languageOptionInterface";

const AuthLogoHeader = (props: AuthLogoHeaderProps) => {
    const { formik } = props;
    const currentLanguage = useSliceSelector(state => state.language.language);
    const dispatch = useReducerDispatch();
    const messages = useSliceSelector(state => state.language.messages);

    useEffect(() => {
        dispatch(loadLanguage());
    }, [dispatch]);

    const handleLanguageChange = (itemValue: string) => {
        dispatch(setLanguage(itemValue));
        formik?.setFieldValue('selectedLanguage', itemValue);
    };

    const languageOptions: LanguageOptionInterface[] = [
        {
            label: messages.english,
            value: 'en'
        },
        {
            label: messages.bosnia,
            value: 'bs'
        }
    ];

    return (
        <View>
            <View style={styles.languageDropdown}>
                <Picker
                    mode="dropdown"
                    dropdownIconColor="#000"
                    selectedValue={currentLanguage}
                    onValueChange={handleLanguageChange}>
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