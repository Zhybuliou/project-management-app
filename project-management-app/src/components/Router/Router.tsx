import { Navigate, Route, Routes } from 'react-router-dom'
import { PrivateAuth } from '../../hoc/PrivateAuth';
import { useAppSelector } from '../../hook';

export const Router = () => {
  const auth = useAppSelector((state) => state.auth.auth);

  return (
    <Routes>
      <Route path='/' element={<h1>Welcome page</h1>}></Route>
      <Route path='/main' element={<PrivateAuth><h1>Main page</h1></PrivateAuth>}></Route>
      <Route path='/login' element={!auth ? <h1>Sign in page</h1> : <Navigate to={'/'}/>}></Route>
      <Route path='/register' element={!auth ? <h1>Sign up page</h1> : <Navigate to={'/'}/>}></Route>
      <Route path='/profile' element={<PrivateAuth><h1>Profile page</h1></PrivateAuth>}></Route>
      <Route path='/board/:id' element={<PrivateAuth><h1>Board page</h1></PrivateAuth>}></Route>
      <Route path='*' element={<h1>Error page</h1>}></Route>
    </Routes>
  )
}