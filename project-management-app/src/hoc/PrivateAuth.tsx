import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hook';

type PrivateAuthProps = {
  children: JSX.Element;
};

export function PrivateAuth({ children }: PrivateAuthProps) {
  const auth = useAppSelector((state) => state.auth.auth);

  if (!auth) {
    return <Navigate to={'/'} />;
  }

  return children;
}
