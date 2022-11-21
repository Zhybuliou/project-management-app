import { Box, Button } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hook';
import { fetchAllBoards, fetchCreateBoard } from '../../store/boardSlice';
import { setBurgerVisible } from '../../store/headerSlice';
import { FormFieldError, PopupField } from '../../theme/styledComponents/styledComponents';

type DataForm = {
  title?: string;
  description?: string;
  users?: string;
};
type Props = {
  setOpenPopup: (value: boolean) => void;
};

export default function FormCreateBoard(props: Props) {
  const {
    register,
    formState: { errors, isValid, isSubmitted },
    handleSubmit,
  } = useForm();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation().pathname.split('/')[1];

  const onSubmit = async (data: DataForm) => {
    location !== 'main' ? navigate('/main') : null;
    await dispatch(setBurgerVisible(false));
    const getToken = localStorage.getItem('token');
    const getName = localStorage.getItem('name');
    if (getToken && getName) {
      const name = [getName];
      const token = JSON.parse(getToken);
      props.setOpenPopup(false);
      if (data.title && data.description) {
        const body = { title: data.title, owner: data.description, users: name };
        await dispatch(fetchCreateBoard({ body, token }));
      }
      await dispatch(fetchAllBoards(token));
    }
  };

  return (
    <Box component='form' onSubmit={handleSubmit(onSubmit)} display='flex' flexDirection='column'>
      <PopupField
        type='search'
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
        {t('createButton')}
      </Button>
    </Box>
  );
}
