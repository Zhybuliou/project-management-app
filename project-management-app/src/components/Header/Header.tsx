import { AppBar, Toolbar, IconButton, Container, useScrollTrigger } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';
import mainLogo from '../../assets/MainLogo.png';
import { Menu } from './components/Menu/Menu';

// export const Header = () => {
//   return (
//     <Container maxWidth='xl'>
//       <AppBar position='static' sx={{ boxShadow: 'none' }}>
//         <Toolbar component='nav' sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
//           <NavLink to='/'>
//             <IconButton size='small'>
//               <img src={mainLogo} style={{ width: '70px' }} alt='Project Logo' />
//             </IconButton>
//           </NavLink>
//           <Menu />
//         </Toolbar>
//       </AppBar>
//     </Container>
//   );
// };

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

export const Header = () => {
  return (
    <Container maxWidth='xl'>
      <ElevationScroll>
        <AppBar>
          <Toolbar component='nav' sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <NavLink to='/'>
              <IconButton size='small'>
                <img src={mainLogo} style={{ width: '70px' }} alt='Project Logo' />
              </IconButton>
            </NavLink>
            <Menu />
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
    </Container>
  );
};
