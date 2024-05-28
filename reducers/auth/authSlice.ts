import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import AuthStateInterface from './interfaces/authStateInterface';
import UserDataInterface from './interfaces/authUserDataInterface';

const initialState: AuthStateInterface = {
    isAuthenticated: false,
    isLoading: false,
    userData: {
        email: '',
        userId: '',
        firstName: '',
        lastName: '',
        userName: '',
        profileImage: '',
        dayOfBirth: ''
    }
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state) {
            state.isAuthenticated = true
        },
        logout(state) {
            state.isAuthenticated = false
        },
        setIsLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload
        },
        setUserData(state, action: PayloadAction<UserDataInterface>) {
            state.userData = action.payload
        }
    },
});

export const {
    login,
    logout,
    setIsLoading,
    setUserData
} = authSlice.actions;

export default authSlice.reducer;
