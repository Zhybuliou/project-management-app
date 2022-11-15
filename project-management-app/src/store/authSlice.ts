import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { decodeToken } from 'react-jwt';
import { changeOpenErrorSnackBar, getErrorMessage } from './userSlice';

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
  token: null | string;
  exp: number | null;
  password: string | undefined;
  isLoaded: boolean;
  openErrorSnackBar: boolean;
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
  openErrorSnackBar: false,
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
      dispatch(changeOpenErrorSnackBar(true));
      if (response.status === 409) {
        dispatch(getErrorMessage('error409'));
        return rejectWithValue('error409');
      }
      if (response.status === 400) {
        dispatch(getErrorMessage('errorCommon'));
        return rejectWithValue('errorCommon');
      }
      dispatch(getErrorMessage('errorCommon'));
      return rejectWithValue('errorCommon');
    }

    dispatch(fetchSignInData({ login: body.login, password: body.password as string }));
    dispatch(changeNameUser(body.name as string));

    return data;
  },
);

export const fetchSignInData = createAsyncThunk<FetchDataSignIn, UserData, { rejectValue: string }>(
  'auth/fetchSignInData',
  async function (body, { rejectWithValue, dispatch }) {
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
      dispatch(changeOpenErrorSnackBar(true));
      if (response.status === 403) {
        dispatch(getErrorMessage('error403'));
        return rejectWithValue('error403');
      }
      if (response.status === 400) {
        dispatch(getErrorMessage('errorCommon'));
        return rejectWithValue('errorCommon');
      }
      if (response.status === 401) {
        dispatch(getErrorMessage('error401'));
        return rejectWithValue('error401');
      }
      dispatch(getErrorMessage('errorCommon'));
      return rejectWithValue('errorCommon');
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
        state.isLoaded = true;
      })
      .addCase(fetchSignUpData.fulfilled, (state, action: PayloadAction<UserData>) => {
        state.isLoaded = false;
        state.name = action.payload.login;
      })
      .addCase(fetchSignUpData.rejected, (state) => {
        state.isLoaded = false;
        state.openErrorSnackBar = true;
      })
      .addCase(fetchSignInData.pending, (state) => {
        state.isLoaded = true;
      })
      .addCase(fetchSignInData.fulfilled, (state, action: PayloadAction<FetchDataSignIn>) => {
        state.auth = true;
        state.isLoaded = false;
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
      .addCase(fetchSignInData.rejected, (state) => {
        state.isLoaded = false;
        state.openErrorSnackBar = true;
      });
  },
});

export const { changeStatusAuth, changePassword, changeNameUser, changeLoaderStatus } =
  authSlice.actions;

export default authSlice.reducer;
