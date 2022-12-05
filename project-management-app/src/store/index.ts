import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './authSlice';
import UserReducer from './userSlice';
import BoardReducer from './boardSlice';
import ColumnReducer from './columnSlice';
import TaskReducer from './taskSlice';
import HeaderReducer from './headerSlice';

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    user: UserReducer,
    board: BoardReducer,
    column: ColumnReducer,
    task: TaskReducer,
    header: HeaderReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
