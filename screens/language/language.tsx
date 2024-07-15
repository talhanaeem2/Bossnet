import { memo, useEffect, useState } from "react"
import { StyleSheet, TouchableOpacity, View } from "react-native";

import AppHeader from "../../components/app/appHeader/appHeader";
import MainWrapper from "../../components/app/mainWrapper/mainWrapper";
import TextRegular from "../../components/app/common/textComponent/textRegular/textRegular";

import useSliceSelector from "../../hooks/useSliceSelector";
import useReducerDispatch from "../../hooks/useReducerDispatch";
import { loadLanguage, setLanguage } from "../../reducers/language/languageSlice";

import LanguageOptionInterface from "../../interfaces/languageOptionInterface";

const Language = () => {
    const messages = useSliceSelector(state => state.language.messages);
    const currentLanguage = useSliceSelector(state => state.language.language);
    const dispatch = useReducerDispatch();

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

    const [selectedOptionIndex, setSelectedOptionIndex] = useState(
        languageOptions.findIndex(option => option.value === currentLanguage)
    );

    useEffect(() => {
        dispatch(loadLanguage());
    }, [dispatch]);

    useEffect(() => {
        setSelectedOptionIndex(
            languageOptions.findIndex(option => option.value === currentLanguage)
        );
    }, [currentLanguage]);

    const handleOption = (index: number) => {
        setSelectedOptionIndex(index);
        dispatch(setLanguage(languageOptions[index].value));
    };

    return (
        <MainWrapper isFooter={false}>
            <AppHeader icon={true} headerText={messages.language} />
            <View style={styles.content}>
                {
                    languageOptions.map((item, index) => {
                        const isSelected = index === selectedOptionIndex;
                        return (
                            <TouchableOpacity
                                style={styles.option}
                                key={index}
                                onPress={() => handleOption(index)}
                            >
                                <View style={styles.textContainer}>
                                    <TextRegular fontSize={17}>
                                        {item.label}
                                    </TextRegular>
                                </View>
                                <View
                                    style={[styles.checkbox, isSelected && styles.CheckboxActive]}>
                                    {isSelected && <View style={styles.checkboxInner}></View>}
                                </View>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        </MainWrapper>
    )
}

export default memo(Language);

const styles = StyleSheet.create({
    option: {
        flexDirection: 'row',
        alignItems: "center",
        paddingHorizontal: 30,
        justifyContent: 'center'
    },
    content: {
        gap: 10,
        paddingTop: 10
    },
    textContainer: {
        flexGrow: 1
    },
    checkboxInner: {
        backgroundColor: '#385DFF',
        width: 19,
        height: 19,
        borderRadius: 19,
        overflow: 'hidden'
    },
    checkbox: {
        width: 33,
        height: 33,
        borderColor: '#A7A7A7',
        borderWidth: 2,
        borderRadius: 30,
        flexShrink: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    CheckboxActive: {
        borderColor: '#385DFF'
    }
});