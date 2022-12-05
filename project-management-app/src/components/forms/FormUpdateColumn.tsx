import { Box, IconButton, TextField } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../../hook';
import { Done, Close } from '@mui/icons-material';
import { fetchAllColumns, fetchUpdateColumn } from '../../store/columnSlice';

type DataForm = {
  title?: string;
};
type Props = {
  form: {
    id: string;
    title: string;
    order: number;
    columnId: string;
  };
  setTitleColumn: (value: string) => void;
  titleColumn: string;
};

export default function FormUpdateColumn(props: Props) {
  const { register, handleSubmit } = useForm();
  const dispatch = useAppDispatch();
  const setTitleColumn = props.setTitleColumn;

  const onSubmit = async (data: DataForm) => {
    const getToken = localStorage.getItem('token');
    if (getToken) {
      const token = JSON.parse(getToken);
      const id = props.form.id;
      if (data.title) {
        const body = { title: data.title, order: props.form.order };
        const columnId = props.form.columnId;
        await setTitleColumn('');
        await dispatch(fetchUpdateColumn({ body, token, id, columnId }));
        await dispatch(fetchAllColumns({ id: id, token: token }));
      }
    }
  };

  const handleReset = () => {
    setTitleColumn('');
  };

  return (
    <Box
      component='form'
      onSubmit={handleSubmit(onSubmit)}
      onReset={handleReset}
      display='flex'
      flexDirection='row'
      rowGap={2}
    >
      <TextField
        size='small'
        defaultValue={props.form.title}
        color='primary'
        {...register('title', { required: true, maxLength: 80 })}
        sx={{ paddingRight: 0.5 }}
        className='edit-title-input'
        autoFocus
      />
      <IconButton color='success' type='submit'>
        <Done />
      </IconButton>
      <IconButton color='error' type='reset'>
        <Close />
      </IconButton>
    </Box>
  );
}
