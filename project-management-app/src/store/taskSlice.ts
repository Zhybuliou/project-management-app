import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { removeLocalStorage } from '../utils/signOut';
import { changeLoaderStatus, changeStatusAuth } from './authSlice';
import { changeOpenErrorSnackBar, getErrorMessage } from './userSlice';

export type TaskData = {
  _id?: string;
  title: string;
  order: number;
  boardId: string;
  columnId: string;
  description: string;
  userId: string;
  users: string[];
};

type TaskState = {
  // error: null | string;
  allTasks: [] | FetchAllTasks;
  task: TaskData;
};

const initialState: TaskState = {
  // error: null,
  allTasks: [],
  task: {} as TaskData,
};

export type FetchTaskProps = {
  token: string;
  id?: string;
  columnId?: string;
  taskId?: string;
  body?: {
    title: string;
    order: number;
    description: string;
    userId: string | number;
    users: string[];
  };
};

export type FetchAllTasks = TaskData[];

const BASE_PATH = 'https://kanbanapi.adaptable.app/';

export const fetchAllTasks = createAsyncThunk<
  FetchAllTasks,
  { id: string; token: string; columnId?: string },
  { rejectValue: string }
>('task/fetchAllTasks', async function ({ id, token, columnId }, { rejectWithValue, dispatch }) {
  dispatch(changeLoaderStatus(true));
  const response = await fetch(`${BASE_PATH}boards/${id}/columns/${columnId}/tasks`, {
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
  console.log(data);
  return data;
});

export const fetchBoardIdTasks = createAsyncThunk<
  FetchAllTasks,
  { id: string; token: string },
  { rejectValue: string }
>('task/fetchBoardIdTasks', async function ({ id, token }, { rejectWithValue, dispatch }) {
  dispatch(changeLoaderStatus(true));
  const response = await fetch(`${BASE_PATH}tasksSet/${id}`, {
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

export const fetchDeleteTask = createAsyncThunk<TaskData, FetchTaskProps, { rejectValue: string }>(
  'task/fetchDeleteTask',
  async function ({ id, columnId, token, taskId }, { rejectWithValue, dispatch }) {
    dispatch(changeLoaderStatus(true));
    const response = await fetch(`${BASE_PATH}boards/${id}/columns/${columnId}/tasks/${taskId}`, {
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

export type BodyTasksUpdate = {
  _id: string;
  order: number;
  columnId: string;
};

type FetchUpdateOrderTasksProps = {
  body: BodyTasksUpdate[];
  token: string;
};

export const fetchUpdateOrderTasks = createAsyncThunk<
  TaskData[],
  FetchUpdateOrderTasksProps,
  { rejectValue: string }
>('board/fetchUpdateOrderTasks', async function ({ body, token }, { rejectWithValue, dispatch }) {
  dispatch(changeLoaderStatus(true));
  const response = await fetch(`${BASE_PATH}tasksSet`, {
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

export const fetchCreateTask = createAsyncThunk<TaskData, FetchTaskProps, { rejectValue: string }>(
  'task/fetchCreateTask',
  async function ({ id, body, token, columnId }, { rejectWithValue, dispatch }) {
    dispatch(changeLoaderStatus(true));
    const response = await fetch(`${BASE_PATH}boards/${id}/columns/${columnId}/tasks`, {
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
  },
);

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    changeAllTasks(state, action: PayloadAction<TaskData[]>) {
      state.allTasks = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTasks.fulfilled, (state, action: PayloadAction<FetchAllTasks>) => {
        // state.error = null;
        state.allTasks = action.payload;
        console.log(state.allTasks);
      })
      .addCase(fetchBoardIdTasks.fulfilled, (state, action: PayloadAction<FetchAllTasks>) => {
        // state.error = null;
        state.allTasks = action.payload.sort((a, b) => a.order - b.order);
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
      .addCase(fetchDeleteTask.fulfilled, (state) => {
        // state.error = null;
        state.task = {} as TaskData;
      })
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
      .addCase(fetchCreateTask.fulfilled, (state, action: PayloadAction<TaskData>) => {
        // state.error = null;
        state.task = action.payload;
      })
      .addCase(fetchUpdateOrderTasks.fulfilled, (state, action: PayloadAction<TaskData[]>) => {
        // state.error = null;
        state.allTasks = action.payload;
      });
  },
});

export const { changeAllTasks } = taskSlice.actions;
export default taskSlice.reducer;
