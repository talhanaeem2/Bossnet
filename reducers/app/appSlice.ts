import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { produce } from 'immer';

import AppStateInterface from './interfaces/appStateInterface';
import AppPayloadInterface from './interfaces/appPayloadInterface';

const initialState: AppStateInterface = {
    modals: {
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
    },
    newsFeed: {
        newsFeedPosts: []
    },
    users: {
        usersData: []
    },
    groups: {
        groupsData: []
    }
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setCreatePostModal(state, action: PayloadAction<AppPayloadInterface>) {
            const { modals } = action.payload
            return produce(state, draftState => {
                if (modals?.isVisible) {
                    draftState.modals.createPostModal.isVisible = modals.isVisible
                }
            });
        },
        setImageFullScreenModal(state, action: PayloadAction<AppPayloadInterface>) {
            const { modals } = action.payload
            return produce(state, draftState => {
                if (modals?.isVisible) {
                    draftState.modals.imageFullScreeenModal.isVisible = modals.isVisible,
                        draftState.modals.imageFullScreeenModal.imageUri = modals.uri
                }
            });
        },
        setCommentModal(state, action: PayloadAction<AppPayloadInterface>) {
            const { modals } = action.payload
            return produce(state, draftState => {
                if (modals?.isVisible) {
                    draftState.modals.commentModal.isVisible = modals.isVisible
                }
            })
        },
        setNewsFeedPosts(state, action: PayloadAction<AppPayloadInterface>) {
            const { newsFeedPosts } = action.payload
            return produce(state, draftState => {
                if (newsFeedPosts) {
                    draftState.newsFeed.newsFeedPosts = newsFeedPosts
                }
            })
        },
        setUsersData(state, action: PayloadAction<AppPayloadInterface>) {
            const { usersData } = action.payload
            return produce(state, draftState => {
                if (usersData) {
                    draftState.users.usersData = usersData
                }
            })
        },
        setGroupsData(state, action: PayloadAction<AppPayloadInterface>) {
            const { groupsData } = action.payload
            return produce(state, draftState => {
                if (groupsData) {
                    draftState.groups.groupsData = groupsData
                }
            })
        }
    }
});

export const {
    setCreatePostModal,
    setImageFullScreenModal,
    setNewsFeedPosts,
    setUsersData,
    setGroupsData,
    setCommentModal
} = appSlice.actions;

export default appSlice.reducer;
