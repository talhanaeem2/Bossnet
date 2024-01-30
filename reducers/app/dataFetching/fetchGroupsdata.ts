import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { setGroupsData } from '../appSlice';
import { setIsLoading } from '../../loading/loadingSlice';

const fetchGroupsData = createAsyncThunk(
    'groups/fetchData',
    async (_, { dispatch }) => {
        const apiUrl = "https://bosnett.com/wp-json/buddyboss/v1/groups";
        try {
            const response = await axios.get(apiUrl);
            dispatch(setGroupsData({ groupsData: response.data }))
            dispatch(setIsLoading({ isLoading: false }))
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }
);

export default fetchGroupsData;