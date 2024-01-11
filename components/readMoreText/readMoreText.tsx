import React, { useState } from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';

import { RFS, RLH } from '../../constants/utils';
import messages from '../../constants/messages';
import ReadMoreProps from './interfaces/ReadMoreProps';

const ReadMore = ({ text, numberOfLines = 2 }: ReadMoreProps) => {
    const [showFullText, setShowFullText] = useState(false);

    const toggleReadMore = () => {
        setShowFullText(!showFullText);
    };

    return (
        <View style={styles.container}>
            <Text numberOfLines={showFullText ? undefined : numberOfLines} style={styles.text}>
                {text}
            </Text>
            {!showFullText ?
                <TouchableOpacity onPress={toggleReadMore}>
                    <Text style={styles.readMore}>{messages.readMore}</Text>
                </TouchableOpacity> :
                <TouchableOpacity onPress={toggleReadMore}>
                    <Text style={styles.readMore}>{messages.readLess}</Text>
                </TouchableOpacity>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flexWrap: "wrap"
    },
    text: {
        fontSize: RFS(13),
        color: '#5F6373',
        fontFamily: "Lato-Regular",
        fontWeight: "400",
        lineHeight: RLH(RFS(13), 1.3)
    },
    readMore: {
        color: '#385DFF',
        fontFamily: "Lato-Regular",
        fontWeight: "400",
        fontSize: RFS(13),
        lineHeight: RLH(RFS(13), 1.3)
    },
});

export default ReadMore;
