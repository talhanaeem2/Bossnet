import React, { useCallback, useEffect, useState } from 'react';
import { Image, View, StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

const InitialScreen = () => {
    const [appIsReady, setAppIsReady] = useState(false);

    useEffect(() => {
        async function prepare() {
            try {
                await new Promise(resolve => setTimeout(resolve, 2000));
            } catch (e) {
                console.warn(e);
            } finally {
                setAppIsReady(true);
            }
        }

        prepare();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
            await SplashScreen.hideAsync();
        }
    }, [appIsReady]);

    if (!appIsReady) {
        return null;
    }

    return (
        <View
            style={styles.container}
            onLayout={onLayoutRootView}>
            <Image source={require('../assets/initial.png')} />
        </View>
    );
}

export default InitialScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        position: "relative",
        top: 220
    }
});