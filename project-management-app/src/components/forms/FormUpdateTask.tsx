import { Button } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../hook';
import { fetchBoardIdTasks, fetchUpdateTask, TaskData } from '../../store/taskSlice';
import { FormFieldError, PopupField } from '../../theme/styledComponents/styledComponents';

type DataForm = {
  title?: string;
  description?: string;
  users?: string;
};
type Props = {
  id: string;
  columnId: string;
  task: TaskData;
  setOpenPopup: (value: boolean) => void;
};

export default function FormUpdateTask(props: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
  } = useForm();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const onSubmit = async (data: DataForm) => {
    const getToken = localStorage.getItem('token');
    if (getToken) {
      const token = JSON.parse(getToken);
      props.setOpenPopup(false);
      if (data.title && data.description) {
        const columnId = props.columnId;
        const taskId = props.task._id
        const body = {
          title: data.title,
          order: props.task.order,
          columnId: props.task.columnId,
          description: data.description,
          userId: props.task.userId,
          users: props.task.users,
        };
        const id = props.id;
        await dispatch(fetchUpdateTask({ body, id, columnId, token, taskId }));
        await dispatch(fetchBoardIdTasks({ id, token }));
      }
    }
  };

  return (
    <Box component='form' onSubmit={handleSubmit(onSubmit)} display='flex' flexDirection='column'>
      <PopupField
        label={t('titleLabel')}
        defaultValue={props.task.title}
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
        defaultValue={props.task.description}
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
        {t('updateButton')}
      </Button>
    </Box>
  );
}