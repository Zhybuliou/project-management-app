import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { changeLoaderStatus } from './authSlice';

type BoardData = {
  _id?: string;
  title: string;
  owner: string;
  users: string[];
};

type BoardState = {
  error: null | string;
  allBoards: [] | FetchAllBoards;
  board: BoardData;
};

const initialState: BoardState = {
  error: null,
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
  'boards/fetchAllBoards',
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
      if (response.status === 401) {
        return rejectWithValue('Unauthorized');
      }
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
      if (response.status === 401) {
        return rejectWithValue('Unauthorized');
      }
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
>('boards/fetchDeleteBoard', async function ({ id, token }, { rejectWithValue, dispatch }) {
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
    if (response.status === 404) {
      return rejectWithValue('User was not founded!');
    }
    if (response.status === 403) {
      return rejectWithValue('Invalid token');
    }
    if (response.status === 502) {
      return rejectWithValue('Bad Gateway');
    }
    dispatch(changeLoaderStatus(false));
  }
  dispatch(changeLoaderStatus(false));
  return data;
});

export const fetchUpdateBoard = createAsyncThunk<
  BoardData,
  FetchBoardProps,
  { rejectValue: string }
>('boards/fetchUpdateBoard', async function ({ body, token, id }, { rejectWithValue, dispatch }) {
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
    if (response.status === 500) {
      return rejectWithValue('Internal server error');
    }
    if (response.status === 404) {
      return rejectWithValue('User was not founded!');
    }
    if (response.status === 400) {
      return rejectWithValue('Validation failed (uuid  is expected)');
    }
    dispatch(changeLoaderStatus(false));
  }
  dispatch(changeLoaderStatus(false));
  return data;
});

export const fetchCreateBoard = createAsyncThunk<
  BoardData,
  FetchBoardProps,
  { rejectValue: string }
>('boards/fetchCreateBoard', async function ({ body, token }, { rejectWithValue, dispatch }) {
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
    if (response.status === 500) {
      return rejectWithValue('Internal server error');
    }
    if (response.status === 404) {
      return rejectWithValue('User was not founded!');
    }
    if (response.status === 400) {
      return rejectWithValue('Validation failed (uuid  is expected)');
    }
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
      .addCase(fetchAllBoards.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchAllBoards.fulfilled, (state, action: PayloadAction<FetchAllBoards>) => {
        state.error = null;
        state.allBoards = action.payload;
      })
      .addCase(fetchAllBoards.rejected, (state, action) => {
        state.error = action.payload as string;
        alert(state.error);
      })
      .addCase(fetchGetBoard.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchGetBoard.fulfilled, (state, action: PayloadAction<BoardData>) => {
        state.error = null;
        state.board = action.payload;
      })
      .addCase(fetchGetBoard.rejected, (state, action) => {
        state.error = action.payload as string;
        alert(state.error);
      })
      .addCase(fetchDeleteBoard.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchDeleteBoard.fulfilled, (state) => {
        state.error = null;
        state.board = {} as BoardData;
      })
      .addCase(fetchDeleteBoard.rejected, (state, action) => {
        state.error = action.payload as string;
        alert(state.error);
      })
      .addCase(fetchUpdateBoard.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchUpdateBoard.fulfilled, (state, action: PayloadAction<BoardData>) => {
        state.error = null;
        state.board = action.payload;
      })
      .addCase(fetchUpdateBoard.rejected, (state, action) => {
        state.error = action.payload as string;
        alert(state.error);
      })
      .addCase(fetchCreateBoard.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchCreateBoard.fulfilled, (state, action: PayloadAction<BoardData>) => {
        state.error = null;
        state.board = action.payload;
      })
      .addCase(fetchCreateBoard.rejected, (state, action) => {
        state.error = action.payload as string;
        alert(state.error);
      });
  },
});

export default boardSlice.reducer;
