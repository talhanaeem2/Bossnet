import { combineReducers } from '@reduxjs/toolkit';

import appSlice from './appSlice';

const rootReducer = combineReducers({
    app: appSlice
});

export default rootReducer;