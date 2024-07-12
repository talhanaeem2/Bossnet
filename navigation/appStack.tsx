import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ChatRoom from '../screens/app/chatRoom/chatRoom';
import Friends from '../screens/app/friends/friends';
import Groups from '../screens/app/groups/groups';
import Home from '../screens/app/home/home';
import Menu from '../screens/app/menu/menu';
import Messenger from '../screens/app/messenger/messenger';
import NewMessage from '../screens/app/newMessage/newMessage';
import UserProfile from '../screens/app/userProfile/userProfile';
import Notifications from '../screens/app/notifications/notifications';
import EditProfile from '../screens/app/userProfile/editProfile/editProfile';
import userDetails from '../screens/app/userDetails/userDetails';

const Stack = createStackNavigator();

const AppStack = () => {

    return (
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Menu" component={Menu} />
            <Stack.Screen name="Groups" component={Groups} />
            <Stack.Screen name="Friends" component={Friends} />
            <Stack.Screen name="Messenger" component={Messenger} />
            <Stack.Screen name="NewMessage" component={NewMessage} />
            <Stack.Screen name="ChatRoom" component={ChatRoom} />
            <Stack.Screen name="UserProfile" component={UserProfile} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="Notifications" component={Notifications} />
            <Stack.Screen name="UserDetails" component={userDetails} />
        </Stack.Navigator>
    );
};

export default AppStack;
