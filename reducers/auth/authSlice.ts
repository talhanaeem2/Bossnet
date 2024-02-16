import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import AuthStateInterface from './interfaces/authStateInterface';

const initialState: AuthStateInterface = {
    isAuthenticated: false,
    token: "",
    isLoading: false
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
        }
    },
});

export const { login, logout, setIsLoading } = authSlice.actions;

export default authSlice.reducer;
