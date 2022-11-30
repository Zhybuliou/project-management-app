import './Board.scss';
import { Button, Container, Select, Stack } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hook';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Add } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import CreateBoardDialog from '../../components/popup/CreateBoardDialog';
import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { BoardData, changeBoard, fetchGetBoard } from '../../store/boardSlice';
import {
  BodyUpdate,
  changeAllColumns,
  ColumnData,
  fetchAllColumns,
  fetchCreateColumn,
  fetchDeleteColumn,
  fetchUpdateOrderColumns,
} from '../../store/columnSlice';
import ConfirmDialog from '../../components/popup/ConfirmDialog';
import {
  BodyTasksUpdate,
  changeAllTasks,
  fetchBoardIdTasks,
  fetchUpdateOrderTasks,
  TaskData,
} from '../../store/taskSlice';
import { DragDropContext, DraggableLocation, Droppable, DropResult } from 'react-beautiful-dnd';
import { BordColumn } from './components/BoardColumn';
import {
  FormFieldError,
  MyMenuItem,
  PopupField,
  Title,
  WhiteButton,
} from '../../theme/styledComponents/styledComponents';
import { useTranslation } from 'react-i18next';
import { fetchAllUsers } from '../../store/userSlice';

export const DragType = {
  TASK: 'task',
  COLUMN: 'column',
};

export const Board = () => {
  const board = useAppSelector((state) => state.board.board);
  const allColumns = useAppSelector((state) => state.column.allColumns);
  const allTasks = useAppSelector((state) => state.task.allTasks);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const id = location.state.id;
  const getToken = localStorage.getItem('token');
  const token = getToken ? JSON.parse(getToken) : '';
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    // subTitle: '',
    onConfirm: () => {
      ('');
    },
  });
  const [orderedColumn, setOrderedColumn] = useState([] as ColumnData[] | null);
  const allUsers = useAppSelector((state) => state.user.allUsers);
  const [userValue, setUserValue] = useState('');
  const [users, setUsers] = useState<Array<string>>([]);

  useEffect(() => {
    dispatch(fetchGetBoard({ id, token }));
    dispatch(fetchAllColumns({ id, token }));
    dispatch(fetchBoardIdTasks({ id, token }));
    dispatch(fetchAllUsers(token as string));
    console.log(userValue);
  }, []);

  useEffect(() => {
    if (allColumns) {
      const orderedColumn = [...allColumns].sort(
        (columnPrev, columnNext) => columnPrev.order - columnNext.order,
      );
      setOrderedColumn(orderedColumn);
    }
    if (allUsers) {
      const boardTasks = allTasks.filter((el) => el.boardId === board._id);
      const usersArray: Array<string> = [];
      for (let i = 0; i < boardTasks.length; i++) {
        const user = boardTasks[i].users[0];

        if (
          usersArray.filter((item) => item === user).length === 0 &&
          allUsers.find((item) => item.login === user)
        ) {
          usersArray.push(user);
        }
      }
      setUsers(usersArray);
    }
    if (allTasks.filter((task) => task.users.includes(userValue)).length === 0) {
      setUserValue('');
    }
  }, [allColumns, allTasks, allUsers]);

  const {
    register,
    formState: { errors, isValid, isSubmitted },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      columnTitle: '',
    },
  });

  const submit = async (data: FieldValues) => {
    const body = {
      title: data.columnTitle,
      order: allColumns.length,
    };
    setIsOpen(!isOpen);
    await dispatch(fetchCreateColumn({ id, body, token }));
    await dispatch(fetchAllColumns({ id, token }));
    setTimeout(() => reset());
  };

  const changeConfirmDialog = (column: ColumnData) => {
    setConfirmDialog({
      isOpen: true,
      // title: 'Are you sure what you want delete this column',
      title: t('messageDeleteColumn'),
      // subTitle: 'Click button yes',
      onConfirm: async () => {
        const columnId = column._id;
        setConfirmDialog({ ...confirmDialog, isOpen: false });
        await dispatch(fetchDeleteColumn({ id, columnId, token }));
        await dispatch(fetchAllColumns({ id, token }));
        await dispatch(fetchBoardIdTasks({ id, token }));
      },
    });
  };

  const changeUserValue = (value: string) => {
    if (value === 'All board users' || value === 'Все пользователи доски') {
      setUserValue('');
    } else {
      setUserValue(value);
    }
  };

  async function onDragEnd(result: DropResult) {
    const { source, destination, type } = result;

    if (destination === null) {
      return;
    }

    if (destination?.droppableId === source.droppableId && destination?.index === source.index) {
      return;
    }

    if (type === DragType.COLUMN) {
      let add;
      const active = [...(orderedColumn as ColumnData[])];
      if (source.droppableId === 'ColumnsList') {
        add = { ...(active[source.index] as ColumnData) };
        active.splice(source.index, 1);
      }
      if ((destination as DraggableLocation).droppableId === 'ColumnsList') {
        active.splice((destination as DraggableLocation).index, 0, add as ColumnData);
      }

      const newColumnsOrder = active.map((column, index) => ({ ...column, order: index }));
      setOrderedColumn(newColumnsOrder);
      const body = newColumnsOrder.map((column) => {
        const newColumn = { _id: column._id, order: column.order };
        return newColumn;
      }) as BodyUpdate[];
      dispatch(fetchUpdateOrderColumns({ body, token }));
    }

    if (type === DragType.TASK) {
      const sourceColumn =
        allColumns[allColumns.findIndex((task) => task._id === source.droppableId)];
      const destinationColumn =
        allColumns[
          allColumns.findIndex(
            (column) => column._id === (destination as DraggableLocation).droppableId,
          )
        ];

      if (sourceColumn._id === destinationColumn._id) {
        let add = {} as TaskData;
        const active = userValue
          ? [...allTasks.filter((task) => task.users.includes(userValue))]
          : [...allTasks];
        if (source.droppableId === sourceColumn._id) {
          add = { ...active[source.index] };
          active.splice(source.index, 1);
        }
        if ((destination as DraggableLocation).droppableId === destinationColumn._id) {
          active.splice((destination as DraggableLocation).index, 0, add as TaskData);
        }
        const newOrderTasks = active.map((task, index) => ({ ...task, order: index }));
        await dispatch(changeAllTasks(newOrderTasks));
        const body = newOrderTasks.map((task) => {
          const newArrForUpdate = { _id: task._id, order: task.order, columnId: task.columnId };
          return newArrForUpdate;
        }) as BodyTasksUpdate[];
        await dispatch(fetchUpdateOrderTasks({ body, token }));
        await dispatch(fetchBoardIdTasks({ id, token }));
      } else {
        const active = userValue
          ? [...allTasks.filter((task) => task.users.includes(userValue))]
          : [...allTasks];

        if (source.droppableId !== destinationColumn._id) {
          let add = {} as TaskData;
          const destinationTasks = active.filter((task) => task.columnId === destinationColumn._id);
          if (source.droppableId === sourceColumn._id) {
            add = { ...(active[source.index] as TaskData) };
            add.columnId = destinationColumn._id as string;
            const findNewIndex = destinationTasks.findIndex(
              (task) =>
                task._id ===
                { ...(active[(destination as DraggableLocation).index] as TaskData) }._id,
            );
            const destinationTask = destinationTasks.find(
              (task) =>
                task._id ===
                { ...(active[(destination as DraggableLocation).index] as TaskData) }._id,
            );
            if (findNewIndex === -1) {
              add.order = destination?.index as number;
            } else {
              if (destinationTask) {
                add.order = (destination?.index as number) - 1;
              }
            }
            active.splice(source.index, 1);
          }
          if ((destination as DraggableLocation).droppableId === destinationColumn._id) {
            active.splice((destination as DraggableLocation).index, 0, add as TaskData);
          }
        }
        const sortedActive = active
          .sort((a, b) => a.order - b.order)
          .map((task, index) => ({ ...task, order: index }));
        await dispatch(changeAllTasks([...sortedActive]));
        const body = sortedActive.map((task) => {
          const newTask = { _id: task._id, order: task.order, columnId: task.columnId };
          return newTask;
        }) as BodyTasksUpdate[];

        await dispatch(fetchUpdateOrderTasks({ body, token }));
        await dispatch(fetchBoardIdTasks({ id, token }));
      }
    }
  }

  return (
    <Container
      className='main'
      component='main'
      maxWidth='xl'
      sx={{ display: 'flex', flexDirection: 'column' }}
    >
      <Title variant='h2' component='h1'>
        {board.title}
      </Title>

      <Stack
        gap={0.5}
        sx={{ p: 1 }}
        alignItems='center'
        direction='row'
        justifyContent='flex-start'
        className='menu'
        flexWrap='wrap'
      >
        <WhiteButton
          className='back-btn'
          onClick={async () => {
            navigate('/main');
            dispatch(changeAllColumns([]));
            dispatch(changeBoard({} as BoardData));
          }}
          startIcon={<ArrowBackIosIcon />}
        >
          {t('backButton')}
        </WhiteButton>
        <WhiteButton onClick={() => setIsOpen(true)} startIcon={<Add />} sx={{ minWidth: 160 }}>
          {t('addColumnButton')}
        </WhiteButton>
        {users && (
          <Select
            value={users.filter((el) => el === userValue).length ? userValue : t('allUsers')}
            onChange={(event) => changeUserValue(event.target.value + '')}
            size='small'
          >
            <MyMenuItem value={t('allUsers')}>{t('allUsers')}</MyMenuItem>
            {users.map((user) => (
              <MyMenuItem key={user} value={user}>
                {user}
              </MyMenuItem>
            ))}
          </Select>
        )}
      </Stack>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='ColumnsList' direction='horizontal' type={DragType.COLUMN}>
          {(provided, snapshot) => (
            <Stack
              sx={{ m: '8px 3px', overflow: 'auto', flexGrow: 1 }}
              direction='row'
              className={`${snapshot.isDraggingOver ? 'dragActive' : ''}`}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {orderedColumn && orderedColumn.length
                ? orderedColumn.map((column: ColumnData, index: number) => (
                    <BordColumn
                      key={column._id as string}
                      index={index}
                      column={column}
                      setConfirmDialog={() => changeConfirmDialog(column)}
                      confirmDialog={confirmDialog}
                      userValue={userValue}
                      allTasks={
                        userValue
                          ? allTasks.filter((task) => task.users.includes(userValue))
                          : allTasks
                      }
                    />
                  ))
                : null}
              {provided.placeholder}
            </Stack>
          )}
        </Droppable>
      </DragDropContext>
      <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
      <CreateBoardDialog
        title={t('addColumnButton')}
        openPopup={isOpen}
        setOpenPopup={() => {
          setIsOpen(!isOpen);
          setTimeout(() => reset());
        }}
      >
        <Stack alignItems='center' onSubmit={handleSubmit(submit)} component='form'>
          <PopupField
            type='search'
            label={t('titleLabel')}
            autoComplete='off'
            {...register('columnTitle', {
              required: 'titleRequiredTextError',
              minLength: {
                value: 2,
                message: 'titleMinLengthTextError',
              },
              maxLength: {
                value: 20,
                message: 'titleMaxLengthTextError',
              },
            })}
          />
          <FormFieldError>
            {errors.columnTitle ? t(errors.columnTitle.message + '') : ''}
          </FormFieldError>
          <Button
            disabled={!isValid && isSubmitted}
            type='submit'
            variant='contained'
            color='success'
            sx={{ width: '100%' }}
          >
            {t('addButton')}
          </Button>
        </Stack>
      </CreateBoardDialog>
    </Container>
  );
};
