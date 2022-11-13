import { AppBar, Toolbar, IconButton, Container } from '@mui/material';
import { NavLink } from 'react-router-dom';
import headerLogo from './assets/headerLogo.png';
import { Menu } from './components/Menu/Menu';

export const Header = () => {
  return (
    <AppBar position='static' sx={{ boxShadow: 'none' }}>
      <Container maxWidth='xl'>
        <Toolbar component='nav' sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <NavLink to='/'>
            <IconButton color='secondary' size='small'>
              <img src={headerLogo} style={{ width: '70px' }} alt='Project Logo' />
            </IconButton>
          </NavLink>
          <Menu />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
