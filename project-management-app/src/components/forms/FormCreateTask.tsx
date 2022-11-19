import { Button, TextField } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../hook';
import { fetchBoardIdTasks, fetchCreateTask } from '../../store/taskSlice';
import './form.scss';

type DataForm = {
  title?: string;
  description?: string;
  users?: string;
};
type Props = {
  id: string;
  columnId: string;
  setOpenPopup: (value: boolean) => void;
};

export default function FormCreateTask(props: Props) {
  const { register, handleSubmit } = useForm();
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const onSubmit = async (data: DataForm) => {
    const getToken = localStorage.getItem('token');
    if (getToken) {
      const token = JSON.parse(getToken);
      props.setOpenPopup(false);
      if (data.title && data.description) {
        const body = {
          title: data.title,
          order: 1,
          description: data.description,
          userId: auth.id,
          users: [auth.name],
        };
        const id = props.id;
        const columnId = props.columnId;
        await dispatch(fetchCreateTask({ id, body, token, columnId }));
        await dispatch(fetchBoardIdTasks({ id, token }));
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='form-create-board'>
      <TextField label={'Title'} {...register('title', { required: true, maxLength: 80 })} />
      <TextField
        label={'Description'}
        multiline
        rows={5}
        {...register('description', { required: true, maxLength: 100 })}
      />
      <Button variant='contained' color='success' type='submit'>
        Create Task
      </Button>
    </form>
  );
}
