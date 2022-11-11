import { AppBar, Toolbar, IconButton } from '@mui/material';
import { NavLink } from 'react-router-dom';
import mainLogo from '../../assets/MainLogo.png';
import { Menu } from './components/Menu/Menu';

export const Header = () => {
  return (
    <AppBar position='static'>
      <Toolbar component='nav' sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <NavLink to='/'>
          <IconButton size='small'>
            <img src={mainLogo} style={{ width: '70px' }} alt='Project Logo' />
          </IconButton>
        </NavLink>
        <Menu />
      </Toolbar>
    </AppBar>
  );
};
