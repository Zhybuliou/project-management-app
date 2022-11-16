import './Board.scss';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useAppDispatch, useAppSelector } from '../../hook';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import AddIcon from '@mui/icons-material/Add';
import { useLocation, useNavigate } from 'react-router-dom';
import CreateBoardDialog from '../../components/popup/CreateBoardDialog';
import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { fetchGetBoard } from '../../store/boardSlice';
import { fetchAllColumns, fetchCreateColumn, fetchDeleteColumn } from '../../store/columnSlice';
import ConfirmDialog from '../../components/popup/ConfirmDialog';
import Tasks from '../../components/Tasks/Tasks';
import { fetchBoardIdTasks } from '../../store/taskSlice';

export const Board = () => {
  const board = useAppSelector((state) => state.board.board);
  const allColumns = useAppSelector((state) => state.column.allColumns);
  const allTasks = useAppSelector((state) => state.task.allTasks);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const id = location.state.id;
  const getToken = localStorage.getItem('token')
  const token = getToken ? JSON.parse(getToken) : '';
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    subTitle: '',
    onConfirm: () => {
      ('');
    },
  });

  useEffect(() => {
     dispatch(fetchGetBoard({id, token}));
     dispatch(fetchAllColumns({id, token}));
     dispatch(fetchBoardIdTasks({id, token}))
  },[])

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
      order: 1
    }
    await dispatch(fetchCreateColumn({id, body, token}));
    await dispatch(fetchAllColumns({id, token}));
    setIsOpen(!isOpen);
    setTimeout(() => reset());
  };

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
      <Grid container columns={{ xs: 1, sm: 2, md: 4 }}>
        {allColumns.length
          ? allColumns.map((column) => (
              <Grid item xs={1} key={column._id}>
                <Card className="column">
                  <CardContent className='column-title' >
                    <Typography variant='h5'>{column.title}</Typography>
                    <IconButton color='info' onClick={ async () => {
                       setConfirmDialog({
                        isOpen: true,
                        title: 'Are you sure what you want delete this column',
                        subTitle: 'Click button yes',
                        onConfirm: async () => {
                          const columnId = column._id;
                          setConfirmDialog({ ...confirmDialog, isOpen: false }); 
                          await dispatch(fetchDeleteColumn({id, columnId, token}));
                          await  dispatch(fetchAllColumns({id, token}));
                        },
                      });
                    }}>
                      <DeleteForeverIcon />
                    </IconButton>
                  </CardContent>
                  <CardContent>
                    <Tasks id={id}  columnId={column._id || ''} allTasks={allTasks}/>
                  </CardContent>
                  <CardActions sx={{ ml: 'auto' }}>

                  </CardActions>
                </Card>
              </Grid>
            ))
          : null}
      </Grid>
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

      <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
    </Container>
  );
};

