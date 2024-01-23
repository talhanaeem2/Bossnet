import * as Font from 'expo-font';
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AppStack from './navigation/appStack';
import AuthStack from './navigation/authStack';

const customFonts = {
  'Lato-Regular': require('./assets/fonts//Lato-Regular.ttf'),
  'Lato-Bold': require('./assets/fonts/Lato-Bold.ttf')
};

const isAuthenticated = true;

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
      {isAuthenticated ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default App
