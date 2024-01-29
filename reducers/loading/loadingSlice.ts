import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { produce } from 'immer';

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
            return produce(state, draftState => {
                const { isLoading } = action.payload
                draftState.isLoading = isLoading
            })
        }
    },
});

export const { setIsLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
