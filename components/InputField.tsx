import { useState } from "react";
import { TextInput, StyleSheet, View, TouchableOpacity } from "react-native"

import inputFieldInterface from "../interaces/inputFieldInterface";

const InputField = (props: inputFieldInterface) => {
    const [text, setText] = useState<string>('');
    const [secureText, setSecureText] = useState<Boolean>(true);

    const handleSecureText = () => {
        setSecureText(!secureText);
    }

    return (
        <>
            <View style={styles.inputContainer}>
                {props.leftIcon && <View style={styles.iconContainerLeft}>{props.leftIcon}</View>}
                <TextInput
                    style={[styles.input, { paddingLeft: props.leftIcon ? 35 : 13 }]}
                    onChangeText={(newText) => setText(newText)}
                    value={text}
                    placeholder={props.placeholder}
                    secureTextEntry={secureText && props.secureTextEntry}
                    keyboardType={
                        props.type === "email" ? "email-address" :
                            props.type === "password" ? "default" :
                                props.type === "number" ? "number-pad" :
                                    props.type === "text" ? "default" :
                                        "default"
                    }
                />
                {
                    props.rightIcon &&
                    <View style={styles.iconContainerRight}>
                        <TouchableOpacity onPress={handleSecureText}>
                            {props.rightIcon}
                        </TouchableOpacity>
                    </View>
                }
            </View>
        </>
    )
}


export default InputField

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        position: "relative"
    },
    iconContainerLeft: {
        position: "absolute",
        left: 11,
    },
    iconContainerRight: {
        position: "absolute",
        right: 11,
    },
    input: {
        borderRadius: 10,
        backgroundColor: "rgba(240, 240, 240, 0.29)",
        paddingTop: 12,
        paddingRight: 37,
        paddingBottom: 8,
        flex: 1,
        color: "#000",
        fontFamily: "Roboto-Regular",
        fontWeight: "400",
        fontSize: 18,
        height: 41,
    }
})