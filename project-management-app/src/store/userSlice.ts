import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { changeNameUser, changeStatusAuth, UserData } from './authSlice';

type UserState = {
  error: null | string;
  allUsers: null | FetchAllUsers;
  user: UserData;
};

const initialState: UserState = {
  error: null,
  allUsers: null,
  user: {} as UserData,
};

export type FetchUserProps = {
  token: string;
  id: string;
  body?: UserData;
};

const BASE_PATH = 'https://kanbanapi.adaptable.app/';

export const fetchAllUsers = createAsyncThunk<FetchAllUsers, string, { rejectValue: string }>(
  'users/fetchAllUsers',
  async function (token: string, { rejectWithValue }) {
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
        return rejectWithValue('Unauthorized');
      }
    }

    return data;
  },
);

export const fetchGetUser = createAsyncThunk<UserData, FetchUserProps, { rejectValue: string }>(
  'users/fetchGetUser',
  async function ({ id, token }, { rejectWithValue }) {
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
        return rejectWithValue('Unauthorized');
      }
    }

    return data;
  },
);

export const fetchDeleteUser = createAsyncThunk<UserData, FetchUserProps, { rejectValue: string }>(
  'users/fetchDeleteUser',
  async function ({ id, token }, { rejectWithValue, dispatch }) {
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
        return rejectWithValue('User was not founded!');
      }
      if (response.status === 403) {
        return rejectWithValue('Invalid token');
      }
      if (response.status === 502) {
        return rejectWithValue('Bad Gateway');
      }
    }

    dispatch(changeStatusAuth(false));
    return data;
  },
);

export const fetchUpdateUser = createAsyncThunk<UserData, FetchUserProps, { rejectValue: string }>(
  'users/fetchUpdateUser',
  async function ({ body, token, id }, { rejectWithValue, dispatch }) {
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
        return rejectWithValue('Internal server error');
      }
      if (response.status === 404) {
        return rejectWithValue('User was not founded!');
      }
      if (response.status === 400) {
        return rejectWithValue('Validation failed (uuid  is expected)');
      }
    }
    if (body) {
      dispatch(changeNameUser(body.name as string));
    }
    console.log(data);

    return data;
  },
);

export type FetchAllUsers = UserData[];

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
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
        state.error = action.payload as string;
        alert(state.error);
      })
      .addCase(fetchGetUser.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchGetUser.fulfilled, (state, action: PayloadAction<UserData>) => {
        state.error = null;
        state.user = action.payload;
      })
      .addCase(fetchGetUser.rejected, (state, action) => {
        state.error = action.payload as string;
        alert(state.error);
      })
      .addCase(fetchDeleteUser.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchDeleteUser.fulfilled, (state) => {
        state.error = null;
        localStorage.removeItem('token');
        localStorage.removeItem('auth');
        localStorage.removeItem('id');
        state.user = {} as UserData;
      })
      .addCase(fetchDeleteUser.rejected, (state, action) => {
        state.error = action.payload as string;
        alert(state.error);
      })
      .addCase(fetchUpdateUser.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchUpdateUser.fulfilled, (state, action: PayloadAction<UserData>) => {
        state.error = null;
        state.user = action.payload;
      })
      .addCase(fetchUpdateUser.rejected, (state, action) => {
        state.error = action.payload as string;
        alert(state.error);
      });
  },
});

export default userSlice.reducer;
