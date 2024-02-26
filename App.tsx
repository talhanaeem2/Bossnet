import * as Font from 'expo-font';
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { StatusBar } from "expo-status-bar";
import { View, ActivityIndicator } from 'react-native';

import WithAuthentication from './withAuthentication';

import store from './store';

const customFonts = {
  'Lato-Regular': require('./assets/fonts//Lato-Regular.ttf'),
  'Lato-Bold': require('./assets/fonts/Lato-Bold.ttf')
};

const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [isAppReady, setIsAppReady] = useState(false);

  // Simulate a delay of 2 seconds
  const simulateDelay = () => {
    return new Promise(resolve => setTimeout(resolve, 2000));
  };

  // Use useEffect to simulate the delay when the component mounts
  useEffect(() => {
    const delay = async () => {
      await simulateDelay(); // Simulate delay
      setIsAppReady(true); // Set app ready state
    };
    delay();
  }, []); // Empty dependency array to simulate componentDidMount

  const loadFontsAsync = async () => {
    await Font.loadAsync(customFonts);
    setFontsLoaded(true);
  };

  useEffect(() => {
    loadFontsAsync();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  // Render the app loading screen until the app is ready
  if (!isAppReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Provider store={store}>
        <StatusBar style="dark" translucent={true} hidden={false} />
        <WithAuthentication />
      </Provider>
    </NavigationContainer>
  );
}

export default App
