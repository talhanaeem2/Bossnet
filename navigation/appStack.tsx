import React, { useEffect } from 'react';
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

import fetchNewsFeedData from '../reducers/app/dataFetching/fetchNewsFeedData';
import useReducerDispatch from '../hooks/useReducerDispatch';
import fetchUsersData from '../reducers/app/dataFetching/fetchUsersData';
import fetchGroupsData from '../reducers/app/dataFetching/fetchGroupsdata';

const Stack = createStackNavigator();

const AppStack = () => {
    const headerShow = { headerShown: false };
    const dispatch = useReducerDispatch();

    useEffect(() => {
        dispatch(fetchNewsFeedData());
        dispatch(fetchUsersData());
        dispatch(fetchGroupsData());
    }, []);

    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen options={headerShow} name="Home" component={Home} />
            <Stack.Screen options={headerShow} name="Menu" component={Menu} />
            <Stack.Screen options={headerShow} name="Groups" component={Groups} />
            <Stack.Screen options={headerShow} name="Friends" component={Friends} />
            <Stack.Screen options={headerShow} name="Messenger" component={Messenger} />
            <Stack.Screen options={headerShow} name="NewMessage" component={NewMessage} />
            <Stack.Screen options={headerShow} name="ChatRoom" component={ChatRoom} />
            <Stack.Screen options={headerShow} name="UserProfile" component={UserProfile} />
            <Stack.Screen options={headerShow} name="Notifications" component={Notifications} />
        </Stack.Navigator>
    );
};

export default AppStack;
