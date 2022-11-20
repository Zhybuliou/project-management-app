import { AppBar, Toolbar, IconButton, Container, useScrollTrigger, Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import headerLogo from './assets/headerLogo.png';
import { BurgerMenu } from './components/BurgerMenu/BurgerMenu';
import { Menu } from './components/Menu/Menu';

interface Props {
  children: React.ReactElement;
}
function ElevationScroll(props: Props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    sx: trigger
      ? {
          bgcolor: '#495e87',
        }
      : {
          boxShadow: 'none',
        },
    elevation: trigger ? 1 : 0,
  });
}

const getWidth = () => window.innerWidth;

export const Header = () => {
  const [width, setWidth] = useState(getWidth());
  useEffect(() => {
    const resizeListener = () => {
      setWidth(getWidth());
    };
    window.addEventListener('resize', resizeListener);

    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, []);

  return (
    <Box component='header'>
      <ElevationScroll>
        <AppBar component='nav'>
          <Container maxWidth='xl'>
            <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
              <NavLink to='/'>
                <IconButton size='small' color='secondary'>
                  <img src={headerLogo} style={{ width: '70px' }} alt='Project Logo' />
                </IconButton>
              </NavLink>
              {width > 899 ? <Menu buttonVariant='contained' direction='row' /> : <BurgerMenu />}
            </Toolbar>
          </Container>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
    </Box>
  );
};
