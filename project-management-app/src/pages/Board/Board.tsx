import './Board.scss';
import { Button, Container, Stack, TextField, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hook';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import AddIcon from '@mui/icons-material/Add';
import { useLocation, useNavigate } from 'react-router-dom';
import CreateBoardDialog from '../../components/popup/CreateBoardDialog';
import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { fetchGetBoard } from '../../store/boardSlice';
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
import { changeAllTasks, fetchBoardIdTasks, TaskData } from '../../store/taskSlice';
import { DragDropContext, DraggableLocation, Droppable, DropResult } from 'react-beautiful-dnd';
import { BordColumn } from './components/BoardColumn';

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
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const id = location.state.id;
  const getToken = localStorage.getItem('token');
  const token = getToken ? JSON.parse(getToken) : '';
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    subTitle: '',
    onConfirm: () => {
      ('');
    },
  });
  const [orderedColumn, setOrderedColumn] = useState([] as ColumnData[]);

  useEffect(() => {
    dispatch(fetchGetBoard({ id, token }));
    dispatch(fetchAllColumns({ id, token }));
    dispatch(fetchBoardIdTasks({ id, token }));
  }, []);

  useEffect(() => {
    if (allColumns) {
      const orderedColumn = [...allColumns].sort(
        (columnPrev, columnNext) => columnPrev.order - columnNext.order,
      );
      setOrderedColumn(orderedColumn);
    }
  }, [allColumns]);

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
      order: 1,
    };
    await dispatch(fetchCreateColumn({ id, body, token }));
    await dispatch(fetchAllColumns({ id, token }));
    setIsOpen(!isOpen);
    setTimeout(() => reset());
  };

  const changeConfirmDialog = (column: ColumnData) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Are you sure what you want delete this column',
      subTitle: 'Click button yes',
      onConfirm: async () => {
        const columnId = column._id;
        setConfirmDialog({ ...confirmDialog, isOpen: false });
        await dispatch(fetchDeleteColumn({ id, columnId, token }));
        await dispatch(fetchAllColumns({ id, token }));
      },
    });
  };

  function onDragEnd(result: DropResult) {
    const { source, destination, type } = result;

    if (destination === null) {
      return;
    }

    if (destination?.droppableId === source.droppableId && destination?.index === source.index) {
      return;
    }

    if (type === DragType.COLUMN) {
      let add;
      const active = [...orderedColumn];
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
        allColumns[allColumns.findIndex((column) => column._id === source.droppableId)];
      const destinationColumn =
        allColumns[
          allColumns.findIndex(
            (column) => column._id === (destination as DraggableLocation).droppableId,
          )
        ];

      if (sourceColumn._id === destinationColumn._id) {
        let add;
        const active = [...allTasks];
        if (source.droppableId === sourceColumn._id) {
          add = active[source.index] as ColumnData;
          active.splice(source.index, 1);
        }
        if ((destination as DraggableLocation).droppableId === destinationColumn._id) {
          active.splice((destination as DraggableLocation).index, 0, add as TaskData);
        }
        dispatch(changeAllTasks(active));
        // здесь должен быть запрос на обновление порядка задач
      } else {
        const active = [...allTasks].filter((task) => task.columnId === sourceColumn._id);
        const newActive = [...allTasks].filter((task) => task.columnId === destinationColumn._id);
        const oldArr = [...allTasks].filter(
          (task) => task.columnId !== destinationColumn._id && task.columnId !== sourceColumn._id,
        );

        if (source.droppableId !== destinationColumn._id) {
          const add = { ...(allTasks[source.index] as TaskData) };
          add.columnId = destinationColumn._id as string;
          const findIndex = active.findIndex((task) => task._id === add._id);
          active.splice(findIndex, 1);
          newActive.splice((destination as DraggableLocation).index, 0, add as TaskData);
        }
        dispatch(changeAllTasks([...active, ...newActive, ...oldArr]));
        // здесь должен быть запрос на обновление порядка задач и колонок с задачами
      }
    }
  }

  return (
    <Container className='main' component='section' maxWidth='xl'>
      <Typography className='main-title' variant='h2'>
        {board.title}
      </Typography>

      <Stack spacing={3} alignItems='flex-start'>
        <Button
          className='back-btn'
          onClick={() => navigate('/main')}
          startIcon={<ArrowBackIosIcon color='primary' />}
          variant='contained'
        >
          back
        </Button>
        <Button
          onClick={() => setIsOpen(true)}
          startIcon={<AddIcon color='primary' />}
          sx={{ width: 180 }}
          variant='contained'
        >
          add column
        </Button>
      </Stack>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='ColumnsList' direction='horizontal' type={DragType.COLUMN}>
          {(provided, snapshot) => (
            <Stack
              direction='row'
              className={`${snapshot.isDraggingOver ? 'dragActive' : ''}`}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {orderedColumn.length
                ? orderedColumn.map((column: ColumnData, index: number) => (
                    <BordColumn
                      key={column._id as string}
                      index={index}
                      column={column}
                      setConfirmDialog={() => changeConfirmDialog(column)}
                      confirmDialog={confirmDialog}
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
        title='ADD COLUMN'
        openPopup={isOpen}
        setOpenPopup={() => {
          setIsOpen(!isOpen);
          setTimeout(() => reset());
        }}
      >
        <Stack alignItems='center' onSubmit={handleSubmit(submit)} component='form' minWidth={300}>
          <TextField
            type='search'
            fullWidth={true}
            label='Column title'
            autoComplete='off'
            {...register('columnTitle', {
              required: 'Please enter column title',
              minLength: {
                value: 5,
                message: 'Title must contain at least 5 letters',
              },
              onChange: (e) => console.log(e),
            })}
          />
          <div style={{ color: ' red', height: 10 }}>
            {errors.columnTitle ? errors.columnTitle.message : ''}
          </div>
          <Button
            disabled={!isValid && isSubmitted}
            type='submit'
            variant='contained'
            sx={{ mt: 2, width: 180 }}
          >
            ADD
          </Button>
        </Stack>
      </CreateBoardDialog>
    </Container>
  );
};
