import { combineReducers } from '@reduxjs/toolkit';

import appSlice from './app/appSlice';
import authSlice from './auth/authSlice';
import errorSlice from './error/errorSlice';

const rootReducer = combineReducers({
    app: appSlice,
    auth: authSlice,
    error: errorSlice
});

export default rootReducer;