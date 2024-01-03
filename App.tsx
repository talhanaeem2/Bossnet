import SafeAreaViewComponent from './components/SafeAreaViewComponent';
import * as Font from 'expo-font';
import { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import SignIn from './screens/signIn';
import SignUp from './screens/signup';

const customFonts = {
  'Lato-Bold': require('./assets/fonts/Lato-Bold.ttf'),
  'Roboto-Regular': require('./assets/fonts//Roboto-Regular.ttf'),
  'Lato-Regular': require('./assets/fonts//Lato-Regular.ttf'),
};

const Stack = createStackNavigator();

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
      <SafeAreaViewComponent>
        <Stack.Navigator initialRouteName='SignIn'>
          <Stack.Screen name='SignIn' component={SignIn} />
          <Stack.Screen name='SignUp' component={SignUp} />
        </Stack.Navigator>
      </SafeAreaViewComponent>
    </NavigationContainer>
  );
}

export default App
