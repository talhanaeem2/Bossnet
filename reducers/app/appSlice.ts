import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import AppStateInterface from './interfaces/appStateInterface';
import CreatePostModalPayload from './interfaces/createPosModalInterface/createPostModalPayload';
import ImageFullScreenModalPayload from './interfaces/imageFullScreenModalInterface/imageFullScreenModalPayload';
import CommentModalPayload from './interfaces/commentModalInterface/commentModalPayload';

const initialState: AppStateInterface = {
    createPostModal: {
        isVisible: false
    },
    imageFullScreeenModal: {
        isVisible: false,
        imageUri: undefined
    },
    commentModal: {
        isVisible: false
    }
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setCreatePostModal(state, action: PayloadAction<CreatePostModalPayload>) {
            const { isVisible } = action.payload
            state.createPostModal.isVisible = isVisible
        },
        setImageFullScreenModal(state, action: PayloadAction<ImageFullScreenModalPayload>) {
            const { isVisible, uri } = action.payload
            state.imageFullScreeenModal.isVisible = isVisible,
                state.imageFullScreeenModal.imageUri = uri
        },
        setCommentModal(state, action: PayloadAction<CommentModalPayload>) {
            const { isVisible } = action.payload
            state.commentModal.isVisible = isVisible
        }
    }
});

export const {
    setCreatePostModal,
    setImageFullScreenModal,
    setCommentModal
} = appSlice.actions;

export default appSlice.reducer;
