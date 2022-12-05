import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { removeLocalStorage } from '../utils/signOut';
import { changeLoaderStatus, changeNameUser, changeStatusAuth, UserData } from './authSlice';

type UserState = {
  error: null | string;
  allUsers: null | FetchAllUsers;
  user: UserData;
  openErrorSnackBar: boolean;
};

const initialState: UserState = {
  error: null,
  allUsers: null,
  user: {} as UserData,
  openErrorSnackBar: false,
};

export type FetchUserProps = {
  token: string;
  id: string;
  body?: UserData;
};

const BASE_PATH = 'https://kanbanapi.adaptable.app/';

export const fetchAllUsers = createAsyncThunk<FetchAllUsers, string, { rejectValue: string }>(
  'users/fetchAllUsers',
  async function (token: string, { rejectWithValue, dispatch }) {
    dispatch(changeLoaderStatus(true));
    const response = await fetch(`${BASE_PATH}users`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + `${token}`,
      },
    });

    const data = await response.json();

    if (response.status !== 200) {
      if (response.status === 401) {
        return rejectWithValue('errorUnAuth');
      }
      if (response.status === 403) {
        dispatch(changeStatusAuth(false));
        dispatch(changeLoaderStatus(false));
        removeLocalStorage();
        return rejectWithValue('error403');
      }
      dispatch(changeLoaderStatus(false));
      return rejectWithValue('errorCommon');
    }
    dispatch(changeLoaderStatus(false));
    return data;
  },
);

export const fetchGetUser = createAsyncThunk<UserData, FetchUserProps, { rejectValue: string }>(
  'users/fetchGetUser',
  async function ({ id, token }, { rejectWithValue, dispatch }) {
    dispatch(changeLoaderStatus(true));
    const response = await fetch(`${BASE_PATH}users/${id}`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + `${token}`,
      },
    });

    const data = await response.json();
    if (response.status !== 200) {
      if (response.status === 401) {
        return rejectWithValue('errorUnAuth');
      }
      if (response.status === 403) {
        dispatch(changeStatusAuth(false));
        dispatch(changeLoaderStatus(false));
        removeLocalStorage();
        return rejectWithValue('error403');
      }
      dispatch(changeLoaderStatus(false));
      return rejectWithValue('errorCommon');
    }
    dispatch(changeLoaderStatus(false));
    localStorage.setItem('name', data.name);
    return data;
  },
);

export const fetchDeleteUser = createAsyncThunk<UserData, FetchUserProps, { rejectValue: string }>(
  'users/fetchDeleteUser',
  async function ({ id, token }, { rejectWithValue, dispatch }) {
    dispatch(changeLoaderStatus(true));
    const response = await fetch(`${BASE_PATH}users/${id}`, {
      method: 'DELETE',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + `${token}`,
      },
    });

    const data = await response.json();
    if (response.status !== 200) {
      if (response.status === 404) {
        return rejectWithValue('error404');
      }
      if (response.status === 403) {
        dispatch(changeStatusAuth(false));
        dispatch(changeLoaderStatus(false));
        removeLocalStorage();
        return rejectWithValue('error403');
      }
      if (response.status === 502) {
        return rejectWithValue('error502');
      }
      dispatch(changeLoaderStatus(false));
      return rejectWithValue('errorCommon');
    }

    dispatch(changeStatusAuth(false));
    dispatch(changeLoaderStatus(false));
    removeLocalStorage();
    return data;
  },
);

export const fetchUpdateUser = createAsyncThunk<UserData, FetchUserProps, { rejectValue: string }>(
  'users/fetchUpdateUser',
  async function ({ body, token, id }, { rejectWithValue, dispatch }) {
    dispatch(changeLoaderStatus(true));
    const response = await fetch(`${BASE_PATH}users/${id}`, {
      method: 'PUT',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + `${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    if (response.status !== 200) {
      if (response.status === 500) {
        return rejectWithValue('error500');
      }
      if (response.status === 403) {
        dispatch(changeStatusAuth(false));
        dispatch(changeLoaderStatus(false));
        removeLocalStorage();
        return rejectWithValue('error403');
      }
      if (response.status === 404) {
        return rejectWithValue('error404');
      }
      if (response.status === 400) {
        return rejectWithValue('error400');
      }
      dispatch(changeLoaderStatus(false));
      return rejectWithValue('errorCommon');
    }
    if (body) {
      dispatch(changeNameUser(body.name as string));
    }

    dispatch(changeLoaderStatus(false));
    return data;
  },
);

export type FetchAllUsers = UserData[];

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeOpenErrorSnackBar(state, action: PayloadAction<boolean>) {
      state.openErrorSnackBar = action.payload;
    },
    getErrorMessage(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action: PayloadAction<FetchAllUsers>) => {
        state.error = null;
        state.allUsers = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.openErrorSnackBar = true;
        state.error = action.payload as string;
      })
      .addCase(fetchGetUser.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchGetUser.fulfilled, (state, action: PayloadAction<UserData>) => {
        state.error = null;
        state.user = action.payload;
      })
      .addCase(fetchGetUser.rejected, (state, action) => {
        state.openErrorSnackBar = true;
        state.error = action.payload as string;
      })
      .addCase(fetchDeleteUser.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchDeleteUser.fulfilled, (state) => {
        state.error = null;
        state.user = {} as UserData;
      })
      .addCase(fetchDeleteUser.rejected, (state, action) => {
        state.openErrorSnackBar = true;
        state.error = action.payload as string;
      })
      .addCase(fetchUpdateUser.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchUpdateUser.fulfilled, (state, action: PayloadAction<UserData>) => {
        state.error = null;
        state.user = action.payload;
      })
      .addCase(fetchUpdateUser.rejected, (state, action) => {
        state.openErrorSnackBar = true;
        state.error = action.payload as string;
      });
  },
});

export const { changeOpenErrorSnackBar, getErrorMessage } = userSlice.actions;

export default userSlice.reducer;
