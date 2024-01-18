import * as Font from 'expo-font';
import { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import SignIn from './screens/signIn/signIn';
import SignUp from './screens/signUp/signup';
import AccountRecovery from './screens/accountRecovery/accountRecovery';
import Home from './screens/home/home';
import Menu from './screens/menu/menu';
import Groups from './screens/groups/groups';
import Friends from './screens/friends/friends';
import Messenger from './screens/messenger/messenger';
import NewMessage from './screens/newMessage/newMessage';
import ChatRoom from './screens/chatRoom/chatRoom';

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
      <Stack.Navigator initialRouteName='SignUp'>
        <Stack.Screen options={headerShow} name='SignIn' component={SignIn} />
        <Stack.Screen options={headerShow} name='SignUp' component={SignUp} />
        <Stack.Screen options={headerShow} name='AccountRecovery' component={AccountRecovery} />
        <Stack.Screen options={headerShow} name='Home' component={Home} />
        <Stack.Screen options={headerShow} name='Menu' component={Menu} />
        <Stack.Screen options={headerShow} name='Groups' component={Groups} />
        <Stack.Screen options={headerShow} name='Friends' component={Friends} />
        <Stack.Screen options={headerShow} name='Messenger' component={Messenger} />
        <Stack.Screen options={headerShow} name='NewMessage' component={NewMessage} />
        <Stack.Screen options={headerShow} name='ChatRoom' component={ChatRoom} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App
