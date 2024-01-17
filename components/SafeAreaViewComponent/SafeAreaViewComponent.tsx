import React from 'react';
import { View } from 'react-native';

import SafeAreaViewInterface from './interfaces/SafeAreaViewInterface';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SafeAreaViewComponent = ({ children }: SafeAreaViewInterface) => {
    const insets = useSafeAreaInsets();

    return (
        <View style={{ flex: 1, paddingTop: insets.top }}>
            {children}
        </View>
    );
};

export default SafeAreaViewComponent;