import { Navigate, Route, Routes } from 'react-router-dom'
import { PrivateAuth } from '../../hoc/PrivateAuth';
import { useAppSelector } from '../../hook';
import { SignIn } from '../../pages/signIn/SignIn';
import { SignUp } from '../../pages/signUp/SignUp';

export const Router = () => {
  const auth = useAppSelector((state) => state.auth.auth);

  return (
    <Routes>
      <Route path='/' element={<h1>Welcome page</h1>}></Route>
      <Route path='/main' element={<PrivateAuth><h1>Main page</h1></PrivateAuth>}></Route>
      <Route path='/login' element={!auth ? <SignIn /> : <Navigate to={'/main'}/>}></Route>
      <Route path='/register' element={!auth ? <SignUp /> : <Navigate to={'/main'}/>}></Route>
      <Route path='/profile' element={<PrivateAuth><h1>Profile page</h1></PrivateAuth>}></Route>
      <Route path='/board/:id' element={<PrivateAuth><h1>Board page</h1></PrivateAuth>}></Route>
      <Route path='*' element={<h1>Error page</h1>}></Route>
    </Routes>
  )
}