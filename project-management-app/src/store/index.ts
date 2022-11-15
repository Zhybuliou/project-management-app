import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './authSlice';
import UserReducer from './userSlice';
import BoardReducer from './boardSlice';
import ColumnReducer from './columnSlice';

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    user: UserReducer,
    board: BoardReducer,
    column: ColumnReducer
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
