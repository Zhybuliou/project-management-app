import { AppBar, Toolbar, IconButton, Container } from '@mui/material';
import { NavLink } from 'react-router-dom';
import mainLogo from '../../assets/MainLogo.png';
import { Menu } from './components/Menu/Menu';

export const Header = () => {
  return (
    <Container maxWidth='xl'>
      <AppBar position='static' sx={{ boxShadow: 'none' }}>
        <Toolbar component='nav' sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <NavLink to='/'>
            <IconButton size='small'>
              <img src={mainLogo} style={{ width: '70px' }} alt='Project Logo' />
            </IconButton>
          </NavLink>
          <Menu />
        </Toolbar>
      </AppBar>
    </Container>
  );
};
