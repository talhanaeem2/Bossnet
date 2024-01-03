import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

import DropdownInterace from '../interaces/DropdownInterface';

const Dropdown = ({ options, onSelect, style, textStyle }: DropdownInterace) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(options.length > 0 ? options[0] : null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleSelect = (value: string) => {
        setSelectedOption(value);
        onSelect(value);
        toggleDropdown();
    };

    return (
        <View style={[styles.container, style]}>
            <TouchableOpacity onPress={toggleDropdown} style={[styles.header, style]}>
                <Text style={[styles.headerText, textStyle && textStyle]}>{selectedOption}</Text>
            </TouchableOpacity>
            {isOpen && (
                <View style={styles.dropdown}>
                    <FlatList
                        data={options}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity onPress={() => handleSelect(item)} key={index}>
                                <Text style={styles.option}>{item}</Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(_, index) => index.toString()}
                    />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        zIndex: 1,
    },
    header: {
        padding: 8,
        borderWidth: 1,
        borderColor: '#6C6363',
        borderRadius: 6,
    },
    headerText: {
        color: "#000"
    },
    dropdown: {
        position: 'absolute',
        top: 40,
        left: 0,
        right: 0,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    option: {
        padding: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#6C6363',
        color: "#000"
    },
});

export default Dropdown;
