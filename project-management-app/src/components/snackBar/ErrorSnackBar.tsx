import { Alert, Snackbar } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hook';
import { changeOpenErrorSnackBar } from '../../store/userSlice';
import { useTranslation } from 'react-i18next';

export const ErrorSnackBar = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.user.error) as string;
  const open = useAppSelector((state) => state.user.openErrorSnackBar);
  const { t } = useTranslation();
  function handleClose(event: React.SyntheticEvent | Event, reason?: string) {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(changeOpenErrorSnackBar(false));
  }
  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity='error' sx={{ width: '100%', color: '#e4605e' }}>
        {t(error)}
      </Alert>
    </Snackbar>
  );
};
