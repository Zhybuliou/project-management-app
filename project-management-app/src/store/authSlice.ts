import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { decodeToken } from 'react-jwt';

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
  isLoaded: boolean;
};

type DecodedToken = {
  id: string;
  login: string;
  iat: number;
  exp: number;
};

const expTokenTime = localStorage.getItem('exp' as string);
const authLocal = localStorage.getItem('exp');

const initialState: AuthState = {
  auth: authLocal ? JSON.parse(authLocal) : false,
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
  isLoaded: false,
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
    const decodedToken = decodeToken(data.token) as DecodedToken;

    return {
      token: data.token,
      id: decodedToken.id,
      login: decodedToken.login,
      iat: decodedToken.iat,
      exp: decodedToken.exp,
    };
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    changeStatusAuth(state, action: PayloadAction<boolean>) {
      state.auth = action.payload;
      localStorage.setItem('auth', JSON.stringify(action.payload));
    },
    changePassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
      localStorage.setItem('password', state.password);
    },
    changeNameUser(state, action: PayloadAction<string>) {
      state.name = action.payload;
      localStorage.setItem('name', state.name);
    },
    changeLoaderStatus(state, action: PayloadAction<boolean>) {
      state.isLoaded = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSignUpData.pending, (state) => {
        state.error = null;
        state.isLoaded = true;
      })
      .addCase(fetchSignUpData.fulfilled, (state, action: PayloadAction<UserData>) => {
        state.isLoaded = false;
        state.error = null;
        state.name = action.payload.login;
      })
      .addCase(fetchSignUpData.rejected, (state, action) => {
        state.isLoaded = false;
        state.error = action.payload as string;
        alert(state.error);
      })
      .addCase(fetchSignInData.pending, (state) => {
        state.error = null;
        state.isLoaded = true;
      })
      .addCase(fetchSignInData.fulfilled, (state, action: PayloadAction<FetchDataSignIn>) => {
        state.auth = true;
        state.isLoaded = false;
        state.error = null;
        state.token = action.payload.token;
        state.id = action.payload.id;
        state.login = action.payload.login;
        state.exp = action.payload.exp;
        localStorage.setItem('auth', JSON.stringify(state.auth));
        localStorage.setItem('login', state.login);
        localStorage.setItem('id', state.id);
        localStorage.setItem('token', JSON.stringify(state.token));
        localStorage.setItem('exp', JSON.stringify(state.exp));
        localStorage.setItem('password', state.password as string);
      })
      .addCase(fetchSignInData.rejected, (state, action) => {
        state.isLoaded = false;
        state.error = action.payload as string;
        alert(state.error);
      });
  },
});

export const { changeStatusAuth, changePassword, changeNameUser, changeLoaderStatus } =
  authSlice.actions;

export default authSlice.reducer;
