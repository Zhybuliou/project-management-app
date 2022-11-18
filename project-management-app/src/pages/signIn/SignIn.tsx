import { FieldValues, useForm } from 'react-hook-form';
import { Box, Container, Typography } from '@mui/material';
import { useAppDispatch } from '../../hook';
import { changePassword, fetchSignInData } from '../../store/authSlice';
import { useTranslation } from 'react-i18next';
import {
  FormField,
  FormFieldError,
  WhiteButton,
} from '../../theme/styledComponents/styledComponents';

export const SignIn = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const {
    register,
    formState: { errors, isValid, isSubmitted },
    handleSubmit,
  } = useForm({
    defaultValues: {
      login: '',
      password: '',
    },
  });

  function handleRegistration(data: FieldValues) {
    dispatch(fetchSignInData({ login: data.login, password: data.password as string }));
    dispatch(changePassword(data.password as string));
  }

  return (
    <Container className='main' maxWidth='xl' component='main'>
      <Typography className='section-title' variant='h2'>
        {t('signIn')}
      </Typography>
      <Box component='form' className='form' onSubmit={handleSubmit(handleRegistration)}>
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
          autoComplete='off'
          type='password'
          color='secondary'
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
          {t('signIn')}
        </WhiteButton>
      </Box>
    </Container>
  );
};
