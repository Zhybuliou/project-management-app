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
import { useAppSelector } from '../../hook';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import CreateBoardDialog from '../../components/popup/CreateBoardDialog';
import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

export const Board = () => {
  const allBoards = useAppSelector((state) => state.board.allBoards);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

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

  const submit = (data: FieldValues) => {
    console.log(data);
    setIsOpen(!isOpen);
    setTimeout(() => reset());
  };

  return (
    <Container component='section' maxWidth='xl'>
      <Typography className='main-title' variant='h2'>
        Task name
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
        {allBoards.length
          ? allBoards.map((el, index) => (
              <Grid item xs={1} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant='h5'>{el.title}</Typography>
                  </CardContent>
                  <CardContent>
                    <Typography variant='body2'>Description</Typography>
                  </CardContent>
                  <CardActions sx={{ ml: 'auto' }}>
                    <IconButton color='secondary'>
                      <DeleteForeverIcon />
                    </IconButton>
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
    </Container>
  );
};
