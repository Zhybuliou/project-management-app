import { Navigate, Route, Routes } from 'react-router-dom';
import { PrivateAuth } from '../../hoc/PrivateAuth';
import { useAppSelector } from '../../hook';
import { Board } from '../../pages/Board/Board';
import { EditProfile } from '../../pages/editProfile/editProfile';
import { Main } from '../../pages/Main/Main';
import { SignIn } from '../../pages/signIn/SignIn';
import { SignUp } from '../../pages/signUp/SignUp';
import { Welcome } from '../../pages/Welcome/Welcome';
import { Error } from '../../pages/Error/Error';

export const Router = () => {
  const auth = useAppSelector((state) => state.auth.auth);

  return (
    <Routes>
      <Route path='/' element={<Welcome />}></Route>
      <Route
        path='/main'
        element={
          <PrivateAuth>
            <Main />
          </PrivateAuth>
        }
      ></Route>
      <Route path='/login' element={!auth ? <SignIn /> : <Navigate to={'/main'} />}></Route>
      <Route path='/register' element={!auth ? <SignUp /> : <Navigate to={'/main'} />}></Route>
      <Route
        path='/profile'
        element={
          <PrivateAuth>
            <EditProfile />
          </PrivateAuth>
        }
      ></Route>
      <Route
        path='/board/:id'
        element={
          <PrivateAuth>
            <Board />
          </PrivateAuth>
        }
      ></Route>
      <Route path='/404' element={<Error />}></Route>
      <Route path='*' element={<Navigate to={'/404'} />}></Route>
    </Routes>
  );
};
