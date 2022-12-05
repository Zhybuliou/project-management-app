import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { removeLocalStorage } from '../utils/signOut';
import { changeLoaderStatus, changeStatusAuth } from './authSlice';
import { changeOpenErrorSnackBar, getErrorMessage } from './userSlice';

export type ColumnData = {
  _id?: string;
  title: string;
  order: number;
  boardId: string;
};

type ColumnState = {
  allColumns: [] | FetchAllColumns;
  column: ColumnData;
};

const initialState: ColumnState = {
  allColumns: [],
  column: {} as ColumnData,
};

export type FetchColumnProps = {
  token: string;
  id?: string;
  columnId?: string;
  body?: {
    title: string;
    order: number;
  };
};

export type FetchAllColumns = ColumnData[];

const BASE_PATH = 'https://kanbanapi.adaptable.app/';

export const fetchAllColumns = createAsyncThunk<
  FetchAllColumns,
  { id: string; token: string },
  { rejectValue: string }
>('column/fetchAllColumns', async function ({ id, token }, { rejectWithValue, dispatch }) {
  dispatch(changeLoaderStatus(true));
  const response = await fetch(`${BASE_PATH}boards/${id}/columns`, {
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
});

export const fetchDeleteColumn = createAsyncThunk<
  ColumnData,
  FetchColumnProps,
  { rejectValue: string }
>(
  'column/fetchDeleteColumn',
  async function ({ id, columnId, token }, { rejectWithValue, dispatch }) {
    dispatch(changeLoaderStatus(true));
    const response = await fetch(`${BASE_PATH}boards/${id}/columns/${columnId}`, {
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
  },
);

export const fetchUpdateColumn = createAsyncThunk<
  ColumnData,
  FetchColumnProps,
  { rejectValue: string }
>(
  'column/fetchUpdateColumn',
  async function ({ body, token, id, columnId }, { rejectWithValue, dispatch }) {
    dispatch(changeLoaderStatus(true));
    const response = await fetch(`${BASE_PATH}boards/${id}/columns/${columnId}`, {
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
  },
);

export const fetchCreateColumn = createAsyncThunk<
  ColumnData,
  FetchColumnProps,
  { rejectValue: string }
>('column/fetchCreateColumn', async function ({ id, body, token }, { rejectWithValue, dispatch }) {
  dispatch(changeLoaderStatus(true));
  const response = await fetch(`${BASE_PATH}boards/${id}/columns`, {
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

export type BodyUpdate = {
  _id: string;
  order: number;
};

type FetchUpdateOrderProps = {
  body: BodyUpdate[];
  token: string;
};

export const fetchUpdateOrderColumns = createAsyncThunk<
  ColumnData[],
  FetchUpdateOrderProps,
  { rejectValue: string }
>('board/fetchUpdateOrderColumns', async function ({ body, token }, { rejectWithValue, dispatch }) {
  dispatch(changeLoaderStatus(true));
  const response = await fetch(`${BASE_PATH}columnsSet`, {
    method: 'PATCH',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + `${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  if (response.status !== 200) {
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
    dispatch(changeLoaderStatus(false));
  }
  dispatch(changeLoaderStatus(false));

  return data;
});

const columnSlice = createSlice({
  name: 'column',
  initialState,
  reducers: {
    changeAllColumns(state, action: PayloadAction<ColumnData[]>) {
      state.allColumns = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllColumns.fulfilled, (state, action: PayloadAction<FetchAllColumns>) => {
        state.allColumns = action.payload;
      })
      .addCase(fetchDeleteColumn.fulfilled, (state) => {
        state.column = {} as ColumnData;
      })
      .addCase(fetchUpdateColumn.fulfilled, (state, action: PayloadAction<ColumnData>) => {
        state.column = action.payload;
      })
      .addCase(fetchCreateColumn.fulfilled, (state, action: PayloadAction<ColumnData>) => {
        state.column = action.payload;
      })
      .addCase(fetchUpdateOrderColumns.fulfilled, (state, action: PayloadAction<ColumnData[]>) => {
        state.allColumns = [...action.payload];
      });
  },
});
export const { changeAllColumns } = columnSlice.actions;
export default columnSlice.reducer;
