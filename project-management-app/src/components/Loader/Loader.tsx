import { Backdrop, CircularProgress } from '@mui/material';
import { useAppSelector } from '../../hook';

export const Loader = () => {
  const isLoading = useAppSelector((state) => state.auth.isLoaded);
  return (
    <Backdrop sx={{ color: '#fff', zIndex: 1500 }} open={isLoading}>
      <CircularProgress color='inherit' />
    </Backdrop>
  );
};
