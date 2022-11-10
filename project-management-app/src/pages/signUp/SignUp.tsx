import { FieldValues, useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useAppDispatch } from '../../hook';
import { fetchSignUpData } from '../../store/authSlice';

export const SignUp = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: '',
      login: '',
      password: '',
    },
  });

  function handleRegistration(data: FieldValues) {
    dispatch(fetchSignUpData({ name: data.name, login: data.login, password: data.password }));
  }

  return (
    <>
      <h1>Sign Up</h1>
      <Box sx={{
        width: 500,
        backgroundColor: '#4D628B',
        margin: '0 auto',
        }}>
        <form className="form-signIn" onSubmit={handleSubmit(handleRegistration)}>
        <TextField 
            id="outlined-basic" 
            label="name" 
            variant="outlined" 
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
            }}/>
          <div style={{ 'color': ' red' }}>{errors.name ? errors.name.message : ''}</div>
          <TextField 
            id="outlined-basic" 
            label="login" 
            variant="outlined" 
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
            }}/>
          <div style={{ 'color': ' red' }}>{errors.login ? errors.login.message : ''}</div>
          <TextField
            id="outlined-password-input"
            label="password"
            type="password"
            autoComplete="current-password"
            {...register('password', { required: 'Please enter your password',
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
          <div style={{ 'color': ' red' }}>{errors.password ? errors.password.message : ''}</div>
          <Button type="submit" variant="outlined"
            sx={{
              backgroundColor: '#ffffff',
              borderRadius: 1,
            }}>
              SIGN IN
          </Button>
        </form>
      </Box>
    </>
  )
}
