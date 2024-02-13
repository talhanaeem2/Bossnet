import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import AuthStateInterface from './interfaces/authStateInterface';

const initialState: AuthStateInterface = {
    isAuthenticated: false,
    token: "",
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
        }
    },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
