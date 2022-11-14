import { Box, Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import ConfirmDialog from '../../components/popup/ConfirmDialog';
import { useAppDispatch, useAppSelector } from '../../hook';
import { changeLoaderStatus, changeStatusAuth } from '../../store/authSlice';
import {
  fetchAllUsers,
  fetchDeleteUser,
  fetchGetUser,
  fetchUpdateUser,
} from '../../store/userSlice';
import { isExpired } from 'react-jwt';
import { removeLocalStorage } from '../../utils/signOut';

export const EditProfile = () => {
  const dispatch = useAppDispatch();
  const { token, id, name, login, password } = useAppSelector((state) => state.auth);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    subTitle: '',
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
      name: name as string,
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

  function getUsers() {
    dispatch(fetchAllUsers(token as string));
  }

  function getUser() {
    if (token) {
      dispatch(fetchGetUser({ id, token }));
    }
  }

  function deleteUser() {
    dispatch(changeLoaderStatus(true));
    if (token) {
      dispatch(fetchDeleteUser({ id, token }));
      setConfirmDialog({ ...confirmDialog, isOpen: false });
    }
  }

  function openConfirmDialog() {
    setConfirmDialog({
      isOpen: true,
      title: 'Are you sure? This action is irreversible! ',
      subTitle: 'Click button yes',
      onConfirm: () => {
        deleteUser();
      },
    });
  }

  useEffect(() => {
    if (token) {
      const expired = isExpired(token);
      if (expired) {
        dispatch(changeStatusAuth(false));
        removeLocalStorage();
      }
    }
  });

  return (
    <div>
      <h1>Edit profile</h1>
      <Box
        sx={{
          width: 500,
          backgroundColor: '#4D628B',
          margin: '0 auto',
        }}
      >
        <form className='form-signIn' onSubmit={handleSubmit(handleRegistration)}>
          <TextField
            defaultValue={name}
            id='outlined-basic'
            label='name'
            variant='outlined'
            {...register('name', {
              required: 'Please enter your name',
              minLength: {
                value: 2,
                message: 'Name must contain at least 2 letters',
              },
              pattern: {
                value: /^[a-zа-яё]+$/i,
                message: 'Name must contain only letters',
              },
            })}
            sx={{
              backgroundColor: '#ffffff',
              borderRadius: 1,
            }}
          />
          <div style={{ color: 'red' }}>{errors.name ? errors.name.message : ''}</div>
          <TextField
            id='outlined-basic'
            defaultValue={login}
            label='login'
            variant='outlined'
            {...register('login', {
              required: 'Please enter your login',
              minLength: {
                value: 5,
                message: 'Login must contain at least 5 letters',
              },
            })}
            sx={{
              backgroundColor: '#ffffff',
              borderRadius: 1,
            }}
          />
          <div style={{ color: ' red' }}>{errors.login ? errors.login.message : ''}</div>
          <TextField
            defaultValue={password}
            id='outlined-password-input'
            label='password'
            type='password'
            autoComplete='current-password'
            {...register('password', {
              required: 'Please enter your password',
              minLength: {
                value: 6,
                message: 'Password must contain at least 5 letters',
              },
            })}
            sx={{
              backgroundColor: '#ffffff',
              borderRadius: 1,
            }}
          />
          <div style={{ color: ' red' }}>{errors.password ? errors.password.message : ''}</div>
          <Button
            type='submit'
            variant='outlined'
            sx={{
              backgroundColor: '#ffffff',
              borderRadius: 1,
            }}
          >
            Update
          </Button>
        </form>
      </Box>
      <button onClick={getUsers}>Get all users</button>
      <button onClick={getUser}>Get user by id</button>
      <button onClick={openConfirmDialog}>Delete user by id</button>
      <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
    </div>
  );
};
