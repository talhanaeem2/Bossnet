import * as Font from 'expo-font';
import { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import SafeAreaViewComponent from './components/SafeAreaViewComponent/SafeAreaViewComponent';
import SignIn from './screens/signIn/signIn';
import SignUp from './screens/signUp/signup';
import AccountRecovery from './screens/accountRecovery/accountRecovery';
import Home from './screens/home/home';
import Menu from './screens/menu/menu';

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

  const headerShow = { headerShown: false };

  return (
    <NavigationContainer>
      <SafeAreaViewComponent>
        <Stack.Navigator initialRouteName='Menu'>
          <Stack.Screen options={headerShow} name='SignIn' component={SignIn} />
          <Stack.Screen options={headerShow} name='SignUp' component={SignUp} />
          <Stack.Screen options={headerShow} name='AccountRecovery' component={AccountRecovery} />
          <Stack.Screen options={headerShow} name='Home' component={Home} />
          <Stack.Screen options={headerShow} name='Menu' component={Menu} />
        </Stack.Navigator>
      </SafeAreaViewComponent>
    </NavigationContainer>
  );
}

export default App
