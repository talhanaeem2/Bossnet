import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { produce } from 'immer';

import AppStateInterface from './interfaces/appStateInterface';
import CreatePostModalPayload from './interfaces/createPosModalInterface/createPostModalPayload';
import ImageFullScreenModalPayload from './interfaces/imageFullScreenModalInterface/imageFullScreenModalPayload';
import NewsFeedInterface from './interfaces/newsFeed/newsFeedInterface';
import UsersStateInterface from './interfaces/users/usersStateInterface';
import GroupsStateInterface from './interfaces/groups/groupsStateInterface';

const initialState: AppStateInterface = {
    createPostModal: {
        isVisible: false
    },
    imageFullScreeenModal: {
        isVisible: false,
        imageUri: undefined
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
        setCreatePostModal(state, action: PayloadAction<CreatePostModalPayload>) {
            const { isVisible } = action.payload
            return produce(state, draftState => {
                draftState.createPostModal.isVisible = isVisible
            });
        },
        setImageFullScreenModal(state, action: PayloadAction<ImageFullScreenModalPayload>) {
            const { isVisible, uri } = action.payload
            return produce(state, draftState => {
                draftState.imageFullScreeenModal.isVisible = isVisible,
                    draftState.imageFullScreeenModal.imageUri = uri
            });
        },
        setNewsFeedPosts(state, action: PayloadAction<NewsFeedInterface>) {
            const { newsFeedPosts } = action.payload
            return produce(state, draftState => {
                draftState.newsFeed.newsFeedPosts = newsFeedPosts
            })
        },
        setUsersData(state, action: PayloadAction<UsersStateInterface>) {
            const { usersData } = action.payload
            return produce(state, draftState => {
                draftState.users.usersData = usersData
            })
        },
        setGroupsData(state, action: PayloadAction<GroupsStateInterface>) {
            const { groupsData } = action.payload
            return produce(state, draftState => {
                draftState.groups.groupsData = groupsData
            })
        },
    }
});

export const {
    setCreatePostModal,
    setImageFullScreenModal,
    setNewsFeedPosts,
    setUsersData,
    setGroupsData
} = appSlice.actions;

export default appSlice.reducer;
