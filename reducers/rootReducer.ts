import { combineReducers } from '@reduxjs/toolkit';

import appSlice from './app/appSlice';
import loadingSlice from './loading/loadingSlice';
import authSlice from './auth/authSlice';

const rootReducer = combineReducers({
    loading: loadingSlice,
    app: appSlice,
    auth: authSlice
});

export default rootReducer;