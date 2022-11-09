import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

type AuthState = {
  auth: boolean;
  name: string;
  login: string;
  password: string;
  error: null | string;
  token: null | string;
};

const initialState: AuthState = {
  auth: !!localStorage.getItem('auth' as string) || false,
  name: '',
  login: '',
  password: '',
  error: null,
  token: null,
};

const BASE_PATH = 'http://localhost:4000/';

export const fetchSignUpData = createAsyncThunk<FetchDataSignUp, AuthBody, { rejectValue: string }>(
  'auth/fetchSignUpData', async function (body, { rejectWithValue, dispatch }) {
    const response = await fetch(`${BASE_PATH}signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify(body)
    });

    const data = (await response.json());

    if (response.status !== 201) {
      return rejectWithValue('User login already exists!');
    }

    dispatch(fetchSignInData({ login: body.login, password: body.password }))
    return data ;
});


export type AuthBody = {
    name?: string;
    login: string;
    password:string;
};

export type FetchDataSignUp = {
  name: string;
  login: string;
  password:string;
};

export type FetchErrorSignUp = {
  statusCode:number;
  message: string;
};

export type FetchDataSignIn = {
  token: string;
};

export const fetchSignInData = createAsyncThunk<FetchDataSignIn, AuthBody, { rejectValue: string }>(
  'auth/fetchSignInData', async function (body, { rejectWithValue }) {
    const response = await fetch(`${BASE_PATH}signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify(body)
    });

    const data = (await response.json());

    if (response.status !== 201) {
      return rejectWithValue('Some errors');
    }

    return data ;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSignUpData.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchSignUpData.fulfilled, (state, action: PayloadAction<FetchDataSignUp>) => {
        state.error = null;
        state.auth = true;
        state.name = action.payload.login;
        state.password = action.payload.password;
        localStorage.setItem('auth', JSON.stringify(state.auth));
      })
      .addCase(fetchSignUpData.rejected, (state, action) => {
        state.error = action.payload as string
      })
      .addCase(fetchSignInData.fulfilled, (state, action: PayloadAction<FetchDataSignIn>) => {
        state.token = action.payload.token
        localStorage.setItem('token', JSON.stringify(state.token));
      })
      .addCase(fetchSignInData.rejected, (state, action) => {
        state.error = action.payload as string
      })
  },
});

export default authSlice.reducer;
