import { FieldValues, useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import './SignIn.scss';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useAppDispatch } from '../../hook';
import { changePassword, fetchSignInData } from '../../store/authSlice';

export const SignIn = () => {
  const dispatch = useAppDispatch();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      login: '',
      password: '',
    },
  });

  function handleRegistration(data: FieldValues) {
    console.log({ login: data.login, password: data.password as string });
    dispatch(fetchSignInData({ login: data.login, password: data.password as string }));
    // dispatch(fetchSignInData({ login: body.login, password: body.password as string }));
    dispatch(changePassword(data.password as string));
    console.log(data.password);
  }

  return (
    <>
      <h1>Sign In</h1>
      <Box
        sx={{
          width: 500,
          backgroundColor: '#4D628B',
          margin: '0 auto',
        }}
      >
        <form className='form-signIn' onSubmit={handleSubmit(handleRegistration)}>
          <TextField
            id='outlined-basic'
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
            SIGN IN
          </Button>
        </form>
      </Box>
    </>
  );
};
