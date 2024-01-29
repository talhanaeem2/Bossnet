import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { setNewsFeedPosts } from '../../appSlice';
import { setIsLoading } from '../../../loading/loadingSlice';

const fetchNewsFeedData = createAsyncThunk(
    'newsFeed/fetchData',
    async (_, { dispatch }) => {
        const apiUrl = "https://bosnett.com/wp-json/buddyboss/v1/activity";
        try {
            const response = await axios.get(apiUrl);
            dispatch(setNewsFeedPosts({ newsFeedPosts: response.data }))
            dispatch(setIsLoading({ isLoading: false }))
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }
);

export default fetchNewsFeedData;