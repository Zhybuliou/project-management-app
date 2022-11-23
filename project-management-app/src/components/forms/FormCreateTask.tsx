import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../hook';
import { fetchBoardIdTasks, fetchCreateTask } from '../../store/taskSlice';
import { PopupField } from '../../theme/styledComponents/styledComponents';

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
  const allTasks = useAppSelector((state) => state.task.allTasks);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const onSubmit = async (data: DataForm) => {
    const getToken = localStorage.getItem('token');
    if (getToken) {
      const token = JSON.parse(getToken);
      props.setOpenPopup(false);
      if (data.title && data.description) {
        const columnId = props.columnId;
        const body = {
          title: data.title,
          order: allTasks.length,
          // order: allTasks.length,
          description: data.description,
          userId: auth.id,
          users: [auth.name],
        };
        const id = props.id;
        await dispatch(fetchCreateTask({ id, body, token, columnId }));
        await dispatch(fetchBoardIdTasks({ id, token }));
      }
    }
  };

  return (
    <Box
      component='form'
      onSubmit={handleSubmit(onSubmit)}
      display='flex'
      flexDirection='column'
      rowGap={2}
    >
      <PopupField label={'Title'} {...register('title', { required: true })} />
      <PopupField
        label={'Description'}
        multiline
        rows={4}
        {...register('description', { required: true })}
      />
      <Button variant='contained' color='success' type='submit'>
        {t('createButton')}
      </Button>
    </Box>
  );
}
