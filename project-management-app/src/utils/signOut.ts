import { isExpired } from 'react-jwt';
import { useAppDispatch, useAppSelector } from '../hook';
import { changeStatusAuth } from '../store/authSlice';

export function signOutByToken() {
  const token = useAppSelector((state) => state.auth.token);
  const dispatch = useAppDispatch();

  if (token) {
    const expired = isExpired(token);
    if (expired) {
      dispatch(changeStatusAuth(false));
      removeLocalStorage();
    }
  }
}

export function removeLocalStorage() {
  localStorage.removeItem('token');
  localStorage.removeItem('id');
  localStorage.removeItem('login');
  localStorage.removeItem('exp');
  localStorage.removeItem('password');
}
