import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { changeLoaderStatus } from './authSlice';

type ColumnData = {
  _id?: string;
  title: string;
  order: number;
  boardId: string;
};

type ColumnState = {
  error: null | string;
  allColumns: [] | FetchAllColumns;
  column: ColumnData;
};

const initialState: ColumnState = {
  error: null,
  allColumns: [],
  column: {} as ColumnData,
};

export type FetchColumnProps = {
  token: string;
  id?: string;
  body?: {
    title: string;
    order: number;
  };
};

export type FetchAllColumns = ColumnData[];

const BASE_PATH = 'https://kanbanapi.adaptable.app/';

export const fetchAllColumns = createAsyncThunk<FetchAllColumns, { id: string, token: string }, { rejectValue: string }>(
  'columns/fetchAllColumns',
  async function ({ id, token }, { rejectWithValue, dispatch }) {
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
      if (response.status === 401) {
        return rejectWithValue('Unauthorized');
      }
      dispatch(changeLoaderStatus(false));
    }
    dispatch(changeLoaderStatus(false));
    return data;
  },
);

// export const fetchGetBoard = createAsyncThunk<BoardData, FetchBoardProps, { rejectValue: string }>(
//   'board/fetchGetBoard',
//   async function ({ id, token }, { rejectWithValue, dispatch }) {
//     dispatch(changeLoaderStatus(true));
//     const response = await fetch(`${BASE_PATH}boards/${id}`, {
//       method: 'GET',
//       headers: {
//         accept: 'application/json',
//         Authorization: 'Bearer ' + `${token}`,
//       },
//     });
//     const data = await response.json();
//     if (response.status !== 200) {
//       if (response.status === 401) {
//         return rejectWithValue('Unauthorized');
//       }
//       dispatch(changeLoaderStatus(false));
//     }
//     dispatch(changeLoaderStatus(false));
//     return data;
//   },
// );

// export const fetchDeleteBoard = createAsyncThunk<
//   BoardData,
//   FetchBoardProps,
//   { rejectValue: string }
// >('boards/fetchDeleteBoard', async function ({ id, token }, { rejectWithValue, dispatch }) {
//   dispatch(changeLoaderStatus(true));
//   const response = await fetch(`${BASE_PATH}boards/${id}`, {
//     method: 'DELETE',
//     headers: {
//       accept: 'application/json',
//       Authorization: 'Bearer ' + `${token}`,
//     },
//   });
//   const data = await response.json();
//   if (response.status !== 200) {
//     if (response.status === 404) {
//       return rejectWithValue('User was not founded!');
//     }
//     if (response.status === 403) {
//       return rejectWithValue('Invalid token');
//     }
//     if (response.status === 502) {
//       return rejectWithValue('Bad Gateway');
//     }
//     dispatch(changeLoaderStatus(false));
//   }
//   dispatch(changeLoaderStatus(false));
//   return data;
// });

// export const fetchUpdateBoard = createAsyncThunk<
//   BoardData,
//   FetchBoardProps,
//   { rejectValue: string }
// >('boards/fetchUpdateBoard', async function ({ body, token, id }, { rejectWithValue, dispatch }) {
//   dispatch(changeLoaderStatus(true));
//   const response = await fetch(`${BASE_PATH}boards/${id}`, {
//     method: 'PUT',
//     headers: {
//       accept: 'application/json',
//       Authorization: 'Bearer ' + `${token}`,
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(body),
//   });
//   const data = await response.json();

//   if (response.status !== 200) {
//     if (response.status === 500) {
//       return rejectWithValue('Internal server error');
//     }
//     if (response.status === 404) {
//       return rejectWithValue('User was not founded!');
//     }
//     if (response.status === 400) {
//       return rejectWithValue('Validation failed (uuid  is expected)');
//     }
//     dispatch(changeLoaderStatus(false));
//   }
//   dispatch(changeLoaderStatus(false));
//   return data;
// });

export const fetchCreateColumn = createAsyncThunk<
  ColumnData,
  FetchColumnProps,
  { rejectValue: string }
>('columns/fetchCreateColumn', async function ({ id, body, token }, { rejectWithValue, dispatch }) {
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

const columnSlice = createSlice({
  name: 'column',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllColumns.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchAllColumns.fulfilled, (state, action: PayloadAction<FetchAllColumns>) => {
        state.error = null;
        state.allColumns = action.payload;
      })
      .addCase(fetchAllColumns.rejected, (state, action) => {
        state.error = action.payload as string;
        alert(state.error);
      })
    //   .addCase(fetchGetBoard.pending, (state) => {
    //     state.error = null;
    //   })
    //   .addCase(fetchGetBoard.fulfilled, (state, action: PayloadAction<BoardData>) => {
    //     state.error = null;
    //     state.board = action.payload;
    //   })
    //   .addCase(fetchGetBoard.rejected, (state, action) => {
    //     state.error = action.payload as string;
    //     alert(state.error);
    //   })
    //   .addCase(fetchDeleteBoard.pending, (state) => {
    //     state.error = null;
    //   })
    //   .addCase(fetchDeleteBoard.fulfilled, (state) => {
    //     state.error = null;
    //     state.board = {} as BoardData;
    //   })
    //   .addCase(fetchDeleteBoard.rejected, (state, action) => {
    //     state.error = action.payload as string;
    //     alert(state.error);
    //   })
    //   .addCase(fetchUpdateBoard.pending, (state) => {
    //     state.error = null;
    //   })
    //   .addCase(fetchUpdateBoard.fulfilled, (state, action: PayloadAction<BoardData>) => {
    //     state.error = null;
    //     state.board = action.payload;
    //   })
    //   .addCase(fetchUpdateBoard.rejected, (state, action) => {
    //     state.error = action.payload as string;
    //     alert(state.error);
    //   })
      .addCase(fetchCreateColumn.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchCreateColumn.fulfilled, (state, action: PayloadAction<ColumnData>) => {
        state.error = null;
        state.column = action.payload;
      })
      .addCase(fetchCreateColumn.rejected, (state, action) => {
        state.error = action.payload as string;
        alert(state.error);
      });
  },
});

export default columnSlice.reducer;