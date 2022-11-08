import { Navigate } from 'react-router-dom';

type PrivateAuthProps = {
  children: JSX.Element,
  auth: boolean,
}

export function PrivateAuth( { children, auth }: PrivateAuthProps ){
  if (!auth) {
    return <Navigate to={'/'} />
  }

  return children;
}