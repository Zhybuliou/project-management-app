import { useEffect, useState } from 'react';
import { Box, Container, Stack } from '@mui/material';
import { FieldValues, useForm } from 'react-hook-form';
import ConfirmDialog from '../../components/popup/ConfirmDialog';
import { useAppDispatch, useAppSelector } from '../../hook';
import { changeLoaderStatus, changeStatusAuth } from '../../store/authSlice';
import { DeleteForever } from '@mui/icons-material';
import {
  changeOpenErrorSnackBar,
  fetchDeleteUser,
  fetchUpdateUser,
  getErrorMessage,
} from '../../store/userSlice';
import { isExpired } from 'react-jwt';
import { removeLocalStorage } from '../../utils/signOut';
import {
  FormField,
  FormFieldError,
  Title,
  WhiteButton,
} from '../../theme/styledComponents/styledComponents';
import { useTranslation } from 'react-i18next';

export const EditProfile = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { token, id, name, login, password } = useAppSelector((state) => state.auth);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    onConfirm: () => {
      ('');
    },
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: name ? (name as string) : localStorage.getItem('name'),
      login: login as string,
      password: password as string,
    },
  });

  function handleRegistration(data: FieldValues) {
    if (token) {
      dispatch(
        fetchUpdateUser({
          id,
          token,
          body: { name: data.name, login: data.login, password: data.password },
        }),
      );
      localStorage.setItem('name', data.name);
    }
  }

  function deleteUser() {
    dispatch(changeLoaderStatus(true));
    if (token) {
      dispatch(fetchDeleteUser({ id, token }));
      setConfirmDialog({ ...confirmDialog, isOpen: false });
      localStorage.removeItem('name');
    }
  }

  function openConfirmDialog() {
    setConfirmDialog({
      isOpen: true,
      title: t('messageDeleteUser'),
      onConfirm: () => {
        deleteUser();
      },
    });
  }

  useEffect(() => {
    if (token) {
      const expired = isExpired(token);
      if (expired) {
        dispatch(changeOpenErrorSnackBar(true));
        dispatch(changeStatusAuth(false));
        removeLocalStorage();
        dispatch(getErrorMessage('error403'));
      }
    }
  }, []);

  return (
    <Container className='main' maxWidth='xl' component='main'>
      <Title variant='h2' component='h1'>
        {t('editProfile')}
      </Title>
      <Box component='form' className='form' onSubmit={handleSubmit(handleRegistration)}>
        <FormField
          defaultValue={name}
          label={t('nameLabel')}
          color='secondary'
          autoComplete='off'
          {...register('name', {
            required: 'nameInputRequired',
            minLength: {
              value: 2,
              message: 'nameInputRequired2',
            },
            pattern: {
              value: /^[a-zа-яё]+$/i,
              message: 'nameInputRequired3',
            },
          })}
        />
        <FormFieldError>{errors.name ? t(errors.name.message + '') : ''}</FormFieldError>
        <FormField
          defaultValue={login}
          label={t('loginLabel')}
          color='secondary'
          autoComplete='off'
          {...register('login', {
            required: 'loginInputRequired',
            minLength: {
              value: 5,
              message: 'loginInputRequired2',
            },
          })}
        />
        <FormFieldError>{errors.login ? t(errors.login.message + '') : ''}</FormFieldError>
        <FormField
          defaultValue={password}
          label={t('passwordLabel')}
          type='password'
          color='secondary'
          autoComplete='off'
          {...register('password', {
            required: 'passwordInputRequired',
            minLength: {
              value: 6,
              message: 'passwordInputRequired2',
            },
          })}
        />
        <FormFieldError>{errors.password ? t(errors.password.message + '') : ''}</FormFieldError>
        <Stack
          direction={localStorage.getItem('lng') === 'en' ? 'row' : 'column-reverse'}
          rowGap={1}
          columnGap={4}
        >
          <WhiteButton
            endIcon={<DeleteForever color='error' />}
            variant='contained'
            onClick={openConfirmDialog}
          >
            {t('deleteProfile')}
          </WhiteButton>
          <WhiteButton type='submit' variant='contained'>
            {t('editProfile')}
          </WhiteButton>
        </Stack>
      </Box>
      <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
    </Container>
  );
};
