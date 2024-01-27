import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { produce } from 'immer';

import AppStateInterface from './interfaces/appStateInterface';
import ToggleCreatePostModalPayload from './interfaces/createPosModalInterface/toggleCreatePostModalPayload';

const initialState: AppStateInterface = {
    createPostModal: {
        isCreatePostModalVisible: false
    }
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        toggleCreatePostModal(state, action: PayloadAction<ToggleCreatePostModalPayload>) {
            const { isVisible } = action.payload
            return produce(state, draftState => {
                draftState.createPostModal.isCreatePostModalVisible = isVisible
            });
        }
    },
});

export const { toggleCreatePostModal } = appSlice.actions;
export default appSlice.reducer;
