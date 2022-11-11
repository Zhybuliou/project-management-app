import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import jwt from 'jwt-decode';

export type UserData = {
  name?: string;
  login: string;
  password?: string;
  _id?: string;
};

type FetchDataSignIn = {
  token: string;
  id: string;
  login: string;
  iat: number;
  exp: number;
};

type AuthState = {
  auth: boolean;
  name: string;
  login: string;
  id: string;
  error: null | string;
  token: null | string;
  exp: number | null;
  password: string | undefined;
};

type DecodedToken = {
  id: string;
  login: string;
  iat: number;
  exp: number;
};

const expTokenTime = localStorage.getItem('exp' as string);

const initialState: AuthState = {
  auth: !!localStorage.getItem('auth' as string) || false,
  name:
    localStorage
      .getItem('name' as string)
      ?.replace(/"/g, '')
      .trim() || '',
  login:
    localStorage
      .getItem('login' as string)
      ?.replace(/"/g, '')
      .trim() || '',
  error: null,
  token:
    localStorage
      .getItem('token' as string)
      ?.replace(/"/g, '')
      .trim() || null,
  id:
    localStorage
      .getItem('id' as string)
      ?.replace(/"/g, '')
      .trim() || '',
  exp: expTokenTime ? +expTokenTime : null,
  password: localStorage.getItem('password' as string) || undefined,
};

const BASE_PATH = 'https://kanbanapi.adaptable.app/';

export const fetchSignUpData = createAsyncThunk<UserData, UserData, { rejectValue: string }>(
  'auth/fetchSignUpData',
  async function (body, { rejectWithValue, dispatch }) {
    const response = await fetch(`${BASE_PATH}auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    if (response.status !== 200) {
      if (response.status === 409) {
        return rejectWithValue('User login already exists!');
      }
      if (response.status === 400) {
        return rejectWithValue('Bad Request');
      }
      return rejectWithValue('Some error');
    }

    dispatch(fetchSignInData({ login: body.login, password: body.password as string }));
    dispatch(changeNameUser(body.name as string));

    return data;
  },
);

export const fetchSignInData = createAsyncThunk<FetchDataSignIn, UserData, { rejectValue: string }>(
  'auth/fetchSignInData',
  async function (body, { rejectWithValue }) {
    const response = await fetch(`${BASE_PATH}auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    if (response.status !== 200) {
      if (response.status === 403) {
        return rejectWithValue('User login already exists!');
      }
      if (response.status === 400) {
        return rejectWithValue('Bad Request');
      }
      if (response.status === 401) {
        return rejectWithValue('Authorization error');
      }
      return rejectWithValue('Some error');
    }
    const decoded = jwt<DecodedToken>(data.token);

    return {
      token: data.token,
      id: decoded.id,
      login: decoded.login,
      iat: decoded.iat,
      exp: decoded.exp,
    };
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    changeStatusAuth(state, action: PayloadAction<boolean>) {
      state.auth = action.payload;
    },
    changePassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
      localStorage.setItem('password', state.password);
    },
    changeNameUser(state, action: PayloadAction<string>) {
      state.name = action.payload;
      localStorage.setItem('name', state.name);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSignUpData.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchSignUpData.fulfilled, (state, action: PayloadAction<UserData>) => {
        state.error = null;
        state.name = action.payload.login;
      })
      .addCase(fetchSignUpData.rejected, (state, action) => {
        state.error = action.payload as string;
        alert(state.error);
      })
      .addCase(fetchSignInData.fulfilled, (state, action: PayloadAction<FetchDataSignIn>) => {
        state.error = null;
        state.auth = true;
        state.token = action.payload.token;
        state.id = action.payload.id;
        state.login = action.payload.login;
        state.exp = action.payload.exp;
        localStorage.setItem('auth', JSON.stringify(state.auth));
        localStorage.setItem('login', JSON.stringify(state.login));
        localStorage.setItem('id', JSON.stringify(state.id));
        localStorage.setItem('token', JSON.stringify(state.token));
        localStorage.setItem('exp', JSON.stringify(state.exp));
        localStorage.setItem('password', JSON.stringify(state.password));
      })
      .addCase(fetchSignInData.rejected, (state, action) => {
        state.error = action.payload as string;
        alert(state.error);
      });
  },
});

export const { changeStatusAuth, changePassword, changeNameUser } = authSlice.actions;

export default authSlice.reducer;
