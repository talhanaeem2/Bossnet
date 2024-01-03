import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import SafeAreaViewInterface from '../interaces/SafeAreaViewInterface';

const SafeAreaViewComponent = ({ children }: SafeAreaViewInterface) => {
    return (
        <SafeAreaView style={styles.safeArea}>
            {children}
        </SafeAreaView>
    );
};

export default SafeAreaViewComponent;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
});