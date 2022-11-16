import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { removeLocalStorage } from '../utils/signOut';
import { changeLoaderStatus, changeStatusAuth } from './authSlice';
import { changeOpenErrorSnackBar, getErrorMessage } from './userSlice';

type BoardData = {
  _id?: string;
  title: string;
  owner: string;
  users: string[];
};

type BoardState = {
  allBoards: [] | FetchAllBoards;
  board: BoardData;
};

const initialState: BoardState = {
  allBoards: [],
  board: {} as BoardData,
};

export type FetchBoardProps = {
  token: string;
  id?: string;
  body?: BoardData;
};

export type FetchAllBoards = BoardData[];

const BASE_PATH = 'https://kanbanapi.adaptable.app/';

export const fetchAllBoards = createAsyncThunk<FetchAllBoards, string, { rejectValue: string }>(
  'board/fetchAllBoards',
  async function (token: string, { rejectWithValue, dispatch }) {
    dispatch(changeLoaderStatus(true));
    const response = await fetch(`${BASE_PATH}boards`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + `${token}`,
      },
    });

    const data = await response.json();

    if (response.status !== 200) {
      dispatch(changeOpenErrorSnackBar(true));
      if (response.status === 401) {
        dispatch(getErrorMessage('errorUnAuth'));
        return rejectWithValue('errorUnAuth');
      }
      if (response.status === 403) {
        dispatch(changeStatusAuth(false));
        dispatch(changeLoaderStatus(false));
        removeLocalStorage();
        dispatch(getErrorMessage('error403'));
        return rejectWithValue('error403');
      }
      dispatch(getErrorMessage('errorCommon'));
      dispatch(changeLoaderStatus(false));
    }
    dispatch(changeLoaderStatus(false));
    return data;
  },
);

export const fetchGetBoard = createAsyncThunk<BoardData, FetchBoardProps, { rejectValue: string }>(
  'board/fetchGetBoard',
  async function ({ id, token }, { rejectWithValue, dispatch }) {
    dispatch(changeLoaderStatus(true));
    const response = await fetch(`${BASE_PATH}boards/${id}`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + `${token}`,
      },
    });
    const data = await response.json();
    if (response.status !== 200) {
      dispatch(changeOpenErrorSnackBar(true));
      if (response.status === 401) {
        dispatch(getErrorMessage('errorUnAuth'));
        return rejectWithValue('errorUnAuth');
      }
      if (response.status === 403) {
        dispatch(changeStatusAuth(false));
        dispatch(changeLoaderStatus(false));
        removeLocalStorage();
        dispatch(getErrorMessage('error403'));
        return rejectWithValue('error403');
      }
      dispatch(getErrorMessage('errorCommon'));
      dispatch(changeLoaderStatus(false));
    }
    dispatch(changeLoaderStatus(false));
    return data;
  },
);

export const fetchDeleteBoard = createAsyncThunk<
  BoardData,
  FetchBoardProps,
  { rejectValue: string }
>('board/fetchDeleteBoard', async function ({ id, token }, { rejectWithValue, dispatch }) {
  dispatch(changeLoaderStatus(true));
  const response = await fetch(`${BASE_PATH}boards/${id}`, {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + `${token}`,
    },
  });
  const data = await response.json();
  if (response.status !== 200) {
    dispatch(changeOpenErrorSnackBar(true));
    if (response.status === 404) {
      dispatch(getErrorMessage('error404'));
      return rejectWithValue('error404');
    }
    if (response.status === 403) {
      dispatch(changeStatusAuth(false));
      dispatch(changeLoaderStatus(false));
      removeLocalStorage();
      dispatch(getErrorMessage('error403'));
      return rejectWithValue('error403');
    }
    if (response.status === 502) {
      dispatch(getErrorMessage('error502'));
      return rejectWithValue('error502');
    }
    dispatch(getErrorMessage('errorCommon'));
    dispatch(changeLoaderStatus(false));
  }
  dispatch(changeLoaderStatus(false));
  return data;
});

export const fetchUpdateBoard = createAsyncThunk<
  BoardData,
  FetchBoardProps,
  { rejectValue: string }
>('board/fetchUpdateBoard', async function ({ body, token, id }, { rejectWithValue, dispatch }) {
  dispatch(changeLoaderStatus(true));
  const response = await fetch(`${BASE_PATH}boards/${id}`, {
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
    dispatch(changeOpenErrorSnackBar(true));
    if (response.status === 500) {
      dispatch(getErrorMessage('error500'));
      return rejectWithValue('error500');
    }
    if (response.status === 404) {
      dispatch(getErrorMessage('error404'));
      return rejectWithValue('error404');
    }
    if (response.status === 403) {
      dispatch(changeStatusAuth(false));
      dispatch(changeLoaderStatus(false));
      removeLocalStorage();
      dispatch(getErrorMessage('error403'));
      return rejectWithValue('error403');
    }
    if (response.status === 400) {
      dispatch(getErrorMessage('error400'));
      return rejectWithValue('error400');
    }
    dispatch(getErrorMessage('errorCommon'));
    dispatch(changeLoaderStatus(false));
  }
  dispatch(changeLoaderStatus(false));
  return data;
});

export const fetchCreateBoard = createAsyncThunk<
  BoardData,
  FetchBoardProps,
  { rejectValue: string }
>('board/fetchCreateBoard', async function ({ body, token }, { rejectWithValue, dispatch }) {
  dispatch(changeLoaderStatus(true));
  const response = await fetch(`${BASE_PATH}boards/`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + `${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();

  if (response.status !== 200) {
    dispatch(changeOpenErrorSnackBar(true));
    if (response.status === 500) {
      dispatch(getErrorMessage('error500'));
      return rejectWithValue('error500');
    }
    if (response.status === 404) {
      dispatch(getErrorMessage('error404'));
      return rejectWithValue('error404');
    }
    if (response.status === 400) {
      dispatch(getErrorMessage('error400'));
      return rejectWithValue('error400');
    }
    if (response.status === 403) {
      dispatch(changeStatusAuth(false));
      dispatch(changeLoaderStatus(false));
      removeLocalStorage();
      dispatch(getErrorMessage('error403'));
      return rejectWithValue('error403');
    }
    dispatch(getErrorMessage('errorCommon'));
    dispatch(changeLoaderStatus(false));
  }
  dispatch(changeLoaderStatus(false));
  return data;
});

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // .addCase(fetchAllBoards.pending, (state) => {
      // })
      .addCase(fetchAllBoards.fulfilled, (state, action: PayloadAction<FetchAllBoards>) => {
        state.allBoards = action.payload;
      })
      // .addCase(fetchAllBoards.rejected, (state, action) => {
      // })
      // .addCase(fetchGetBoard.pending, (state) => {
      // })
      .addCase(fetchGetBoard.fulfilled, (state, action: PayloadAction<BoardData>) => {
        state.board = action.payload;
      })
      // .addCase(fetchGetBoard.rejected, (state, action) => {
      // })
      // .addCase(fetchDeleteBoard.pending, (state) => {
      // })
      .addCase(fetchDeleteBoard.fulfilled, (state) => {
        state.board = {} as BoardData;
      })
      // .addCase(fetchDeleteBoard.rejected, (state, action) => {
      // })
      // .addCase(fetchUpdateBoard.pending, (state) => {
      // })
      .addCase(fetchUpdateBoard.fulfilled, (state, action: PayloadAction<BoardData>) => {
        state.board = action.payload;
      })
      // .addCase(fetchUpdateBoard.rejected, (state, action) => {
      // })
      // .addCase(fetchCreateBoard.pending, (state) => {
      // })
      .addCase(fetchCreateBoard.fulfilled, (state, action: PayloadAction<BoardData>) => {
        state.board = action.payload;
      });
    // .addCase(fetchCreateBoard.rejected, (state, action) => {
    // });
  },
});

export default boardSlice.reducer;
