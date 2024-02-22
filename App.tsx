import * as Font from 'expo-font';
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { StatusBar } from "expo-status-bar";

import WithAuthentication from './withAuthentication';

import store from './store';

const customFonts = {
  'Lato-Regular': require('./assets/fonts//Lato-Regular.ttf'),
  'Lato-Bold': require('./assets/fonts/Lato-Bold.ttf')
};

const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

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
