import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AccountRecovery from '../screens/auth/accountRecovery/accountRecovery';
import SignIn from '../screens/auth/signIn/signIn';
import SignUp from '../screens/auth/signUp/signup';

const Stack = createStackNavigator();

const AuthStack = () => {
    const headerShow = { headerShown: false };

    return (
        <Stack.Navigator initialRouteName="SignIn">
            <Stack.Screen options={headerShow} name="SignIn" component={SignIn} />
            <Stack.Screen options={headerShow} name="SignUp" component={SignUp} />
            <Stack.Screen options={headerShow} name="AccountRecovery" component={AccountRecovery} />
        </Stack.Navigator>
    );
};

export default AuthStack;
