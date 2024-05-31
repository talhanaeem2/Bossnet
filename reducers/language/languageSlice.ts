import { createSlice } from '@reduxjs/toolkit';

import enMessages from '../../constants/translations/enMessages';
import bsMessages from '../../constants/translations/bsMessages';

const initialState = {
    language: 'en',
    messages: enMessages,
};

const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        setLanguage: (state, action) => {
            state.language = action.payload;
            state.messages = action.payload === 'bs' ? bsMessages : enMessages;
        }
    }
});

export const { setLanguage } = languageSlice.actions;

export default languageSlice.reducer;
