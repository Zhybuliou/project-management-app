import './Menu.scss';
import { Button, Stack, Select, MenuItem } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import LanguageIcon from '@mui/icons-material/Language';
import EditIcon from '@mui/icons-material/Edit';
import HomeIcon from '@mui/icons-material/Home';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import LogoutIcon from '@mui/icons-material/Logout';
import { NavLink, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../../../hook';

export const Menu = () => {
  const auth = useAppSelector((state) => state.auth.auth);
  const location = useLocation().pathname;

  return (
    <Stack className='nav-menu' direction='row' spacing={1}>
      <Select size='small' IconComponent={LanguageIcon} defaultValue={'en'}>
        <MenuItem value='en'>en</MenuItem>
        <MenuItem value='ru'>ru</MenuItem>
      </Select>
      {!auth && location !== '/main' ? (
        <>
          <NavLink to='/login'>
            <Button variant='contained' endIcon={<LoginIcon />} disabled={!(location !== '/login')}>
              sign in
            </Button>
          </NavLink>
          <NavLink to='/register'>
            <Button
              variant='contained'
              endIcon={<AppRegistrationIcon />}
              disabled={!(location !== '/register')}
            >
              sign up
            </Button>
          </NavLink>
        </>
      ) : null}
      {auth && location === '/' ? (
        <NavLink to='/main'>
          <Button variant='contained' endIcon={<HomeIcon />}>
            go to main page
          </Button>
        </NavLink>
      ) : null}

      {auth && (location === '/main' || location === '/profile') ? (
        <>
          <Button variant='contained' endIcon={<DashboardCustomizeIcon />}>
            create new board
          </Button>
          <NavLink to='/profile'>
            <Button variant='contained' endIcon={<EditIcon />}>
              edit profile
            </Button>
          </NavLink>
          <Button variant='contained' endIcon={<LogoutIcon />}>
            sign out
          </Button>
        </>
      ) : null}
    </Stack>
  );
};
