import { combineReducers } from '@reduxjs/toolkit';

import appSlice from './app/appSlice';
import loadingSlice from './loading/loadingSlice';

const rootReducer = combineReducers({
    loading: loadingSlice,
    app: appSlice
});

export default rootReducer;