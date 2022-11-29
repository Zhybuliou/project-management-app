import { Button } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../hook';
import { fetchBoardIdTasks, fetchCreateTask } from '../../store/taskSlice';
import { FormFieldError, PopupField } from '../../theme/styledComponents/styledComponents';

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
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
  } = useForm();
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
          description: data.description,
          userId: auth.id,
          users: [auth.login],
        };
        const id = props.id;
        await dispatch(fetchCreateTask({ id, body, token, columnId }));
        await dispatch(fetchBoardIdTasks({ id, token }));
      }
    }
  };

  return (
    <Box component='form' onSubmit={handleSubmit(onSubmit)} display='flex' flexDirection='column'>
      <PopupField
        label={t('titleLabel')}
        {...register('title', {
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
      <FormFieldError>{errors.title ? t(errors.title.message + '') : ''}</FormFieldError>
      <PopupField
        label={t('descriptionLabel')}
        multiline
        rows={4}
        {...register('description', {
          required: 'descriptionRequiredTextError',
          minLength: {
            value: 2,
            message: 'descriptionMinLengthTextError',
          },
          maxLength: {
            value: 80,
            message: 'descriptionMaxLengthTextError',
          },
        })}
      />
      <FormFieldError>
        {errors.description ? t(errors.description.message + '') : ''}
      </FormFieldError>
      <Button variant='contained' color='success' type='submit' disabled={!isValid && isSubmitted}>
        {t('addButton')}
      </Button>
    </Box>
  );
}
