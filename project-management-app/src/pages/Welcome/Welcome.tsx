import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hook';
import { changeStatusAuth } from '../../store/authSlice';
import { removeLocalStorage } from '../../utils/signOut';
import { isExpired } from 'react-jwt';
import { About } from './components/About/About';
import { Benefits } from './components/Benefits/Benefits';
import { Team } from './components/Team/Team';
import { changeOpenErrorSnackBar, getErrorMessage } from '../../store/userSlice';

export const Welcome = () => {
  const token = useAppSelector((state) => state.auth.token);
  const dispatch = useAppDispatch();

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
    <main className='main'>
      <About />
      <Benefits />
      <Team />
    </main>
  );
};
