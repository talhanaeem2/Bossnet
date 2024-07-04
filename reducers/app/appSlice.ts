import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import AppStateInterface from './interfaces/appStateInterface';
import ImageFullScreenModalPayload from './interfaces/imageFullScreenModalInterface/imageFullScreenModalPayload';

const initialState: AppStateInterface = {
    createPostModal: {
        isVisible: false
    },
    imageFullScreeenModal: {
        isVisible: false,
        imageUris: [],
        startIndex: 0
    },
    commentModal: {
        isVisible: false
    },
    successModal: {
        isVisible: false
    },
    footerActiveButton: {
        activeTab: 'Home'
    },
    newsFeedActiveItem: {
        postId: ''
    }
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setCreatePostModal(state, action: PayloadAction<boolean>) {
            state.createPostModal.isVisible = action.payload
        },
        setImageFullScreenModal(state, action: PayloadAction<ImageFullScreenModalPayload>) {
            const { isVisible, uris, startIndex } = action.payload
            state.imageFullScreeenModal.isVisible = isVisible,
                state.imageFullScreeenModal.imageUris = uris,
                state.imageFullScreeenModal.startIndex = startIndex
        },
        setCommentModal(state, action: PayloadAction<boolean>) {
            state.commentModal.isVisible = action.payload
        },
        setSuccessModal(state, action: PayloadAction<boolean>) {
            state.successModal.isVisible = action.payload
        },
        setActiveTab(state, action: PayloadAction<string>) {
            state.footerActiveButton.activeTab = action.payload
        },
        resetActiveTab: (state) => {
            state.footerActiveButton.activeTab = 'Home';
        },
        setActivePostId(state, action: PayloadAction<string>) {
            state.newsFeedActiveItem.postId = action.payload
        }
    }
});

export const {
    setCreatePostModal,
    setImageFullScreenModal,
    setCommentModal,
    setSuccessModal,
    setActiveTab,
    resetActiveTab,
    setActivePostId
} = appSlice.actions;

export default appSlice.reducer;
