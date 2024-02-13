import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import LoadingInterface from './interfaces/loadingInterface';
import LoadingPayload from './interfaces/loadingPayload';

const initialState: LoadingInterface = {
    isLoading: true
};

const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        setIsLoading(state, action: PayloadAction<LoadingPayload>) {
            const { isLoading } = action.payload
            state.isLoading = isLoading
        }
    },
});

export const { setIsLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
