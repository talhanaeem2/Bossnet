import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import AuthStateInterface from './interfaces/authStateInterface';
import UserDataInterface from './interfaces/userDataInterface';

const initialState: AuthStateInterface = {
    isAuthenticated: false,
    token: "",
    isLoading: false,
    userData: {
        email: '',
        userId: '',
        firstName: '',
        lastName: '',
        userName: '',
        nickName: '',
        day: 0,
        month: 0,
        year: 0
    }
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<string>) {
            state.isAuthenticated = true,
                state.token = action.payload
        },
        logout(state) {
            state.isAuthenticated = false,
                state.token = ""
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
