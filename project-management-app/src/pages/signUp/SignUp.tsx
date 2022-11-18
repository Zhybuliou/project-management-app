import { FieldValues, useForm } from 'react-hook-form';
import { Box, Container, Typography } from '@mui/material';
import { useAppDispatch } from '../../hook';
import { fetchSignUpData } from '../../store/authSlice';
import { useTranslation } from 'react-i18next';
import {
  FormField,
  FormFieldError,
  WhiteButton,
} from '../../theme/styledComponents/styledComponents';

export const SignUp = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    formState: { errors, isValid, isSubmitted },
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: '',
      login: '',
      password: '',
    },
  });
  const { t } = useTranslation();

  function handleRegistration(data: FieldValues) {
    dispatch(fetchSignUpData({ name: data.name, login: data.login, password: data.password }));
  }

  return (
    <Container className='main' maxWidth='xl' component='main'>
      <Typography className='section-title' variant='h2'>
        {t('signUp')}
      </Typography>
      <Box className='form' component='form' onSubmit={handleSubmit(handleRegistration)}>
        <FormField
          label={t('nameLabel')}
          color='secondary'
          autoComplete='off'
          {...register('name', {
            required: 'Please enter your name',
            minLength: {
              value: 2,
              message: 'nameInputRequired',
            },
            pattern: {
              value: /^[a-zа-яё]+$/i,
              message: 'nameInputRequired2',
            },
          })}
        />
        <FormFieldError>{errors.name ? t(errors.name.message + '') : ''}</FormFieldError>
        <FormField
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
        <FormFieldError>{errors.password ? t(errors.password?.message + '') : ''}</FormFieldError>
        <WhiteButton
          variant='contained'
          disabled={!isValid && isSubmitted}
          type='submit'
          sx={{ mt: 1 }}
        >
          {t('signUp')}
        </WhiteButton>
      </Box>
    </Container>
  );
};
