import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './authSlice';
import UserReducer from './userSlice';

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    user: UserReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
