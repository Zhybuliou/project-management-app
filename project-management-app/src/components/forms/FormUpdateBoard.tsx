import { Button } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../hook';
import { fetchAllBoards, fetchUpdateBoard } from '../../store/boardSlice';
import { FormFieldError, PopupField } from '../../theme/styledComponents/styledComponents';

type DataForm = {
  title?: string;
  description?: string;
  users?: string;
};
type Props = {
  form: {
    id: string;
    title: string;
    description: string;
  };
  setOpenPopup: (value: boolean) => void;
};

export default function FormUpdateBoard(props: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
  } = useForm();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const onSubmit = async (data: DataForm) => {
    const getToken = localStorage.getItem('token');
    const getName = localStorage.getItem('name');
    if (getToken && getName) {
      const name = [getName];
      const token = JSON.parse(getToken);
      props.setOpenPopup(false);
      if (data.title && data.description) {
        const id = props.form.id;
        const body = { title: data.title, owner: data.description, users: name };
        await dispatch(fetchUpdateBoard({ body, token, id }));
      }
      await dispatch(fetchAllBoards(token));
    }
  };

  return (
    <Box component='form' onSubmit={handleSubmit(onSubmit)} display='flex' flexDirection='column'>
      <PopupField
        type='search'
        label={t('titleLabel')}
        defaultValue={props.form.title}
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
        defaultValue={props.form.description}
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
        {t('updateBoardButton')}
      </Button>
    </Box>
  );
}
