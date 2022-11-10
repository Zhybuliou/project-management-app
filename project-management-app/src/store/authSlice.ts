import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

type AuthState = {
  auth: boolean;
  name: string;
  login: string;
  id: string;
  error: null | string;
  token: null | string;
};

const initialState: AuthState = {
  auth: !!localStorage.getItem('auth' as string) || false,
  name: '',
  login: '',
  error: null,
  token: null,
  id: '',
};

const BASE_PATH = 'https://kanbanapi.adaptable.app/';

export const fetchSignUpData = createAsyncThunk<FetchDataSignUp, AuthBody, { rejectValue: string }>(
  'auth/fetchSignUpData', async function (body, { rejectWithValue, dispatch }) {
    const response = await fetch(`${BASE_PATH}auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify(body)
    });

    const data = (await response.json());

    if (response.status !== 200) {
      if (response.status === 409) {
        return rejectWithValue('User login already exists!');
      }
      if (response.status === 400) {
        return rejectWithValue('Bad Request');
      }
      return rejectWithValue('Some error');
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
  _id:string;
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
    const response = await fetch(`${BASE_PATH}auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify(body)
    });

    const data = (await response.json());

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
        state.name = action.payload.login;
        state.id = action.payload._id;
      })
      .addCase(fetchSignUpData.rejected, (state, action) => {
        state.error = action.payload as string;
        alert(state.error);
      })
      .addCase(fetchSignInData.fulfilled, (state, action: PayloadAction<FetchDataSignIn>) => {
        state.auth = true;
        state.token = action.payload.token
        localStorage.setItem('auth', JSON.stringify(state.auth));
        localStorage.setItem('id', JSON.stringify(state.id));
        localStorage.setItem('token', JSON.stringify(state.token));
      })
      .addCase(fetchSignInData.rejected, (state, action) => {
        state.error = action.payload as string;
        alert(state.error)
      })
  },
});

export default authSlice.reducer;
