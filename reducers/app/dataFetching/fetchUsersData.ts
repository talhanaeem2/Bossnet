import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { setUsersPosts } from '../appSlice';
import { setIsLoading } from '../../loading/loadingSlice';

const fetchUsersData = createAsyncThunk(
    'friends/fetchData',
    async (_, { dispatch }) => {
        const apiUrl = "https://bosnett.com/wp-json/buddyboss/v1/members";
        try {
            const response = await axios.get(apiUrl);
            dispatch(setUsersPosts({ usersData: response.data }))
            dispatch(setIsLoading({ isLoading: false }))
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }
);

export default fetchUsersData;