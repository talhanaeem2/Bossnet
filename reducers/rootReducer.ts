import { combineReducers } from '@reduxjs/toolkit';

import appSlice from './app/appSlice';
import authSlice from './auth/authSlice';

const rootReducer = combineReducers({
    app: appSlice,
    auth: authSlice
});

export default rootReducer;