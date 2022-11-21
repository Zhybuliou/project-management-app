import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Drawer, IconButton } from '@mui/material';
import { Menu } from '../Menu/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch, useAppSelector } from '../../../../hook';
import { setBurgerVisible } from '../../../../store/headerSlice';

export const BurgerMenu = () => {
  const dispatch = useAppDispatch();
  const { burgerIsVisible } = useAppSelector((state) => state.header);
  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    dispatch(setBurgerVisible(open));
  };

  return (
    <>
      <IconButton
        edge='start'
        color='secondary'
        aria-label='open drawer'
        onClick={toggleDrawer(true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor='right'
        variant='temporary'
        open={burgerIsVisible}
        onClose={toggleDrawer(false)}
      >
        <Box sx={{ minWidth: 250, position: 'relative' }}>
          <IconButton
            color='primary'
            onClick={toggleDrawer(false)}
            sx={{ position: 'absolute', top: 5, left: 200 }}
          >
            <CloseIcon />
          </IconButton>
          <Menu buttonVariant='text' direction='column' />
        </Box>
      </Drawer>
    </>
  );
};
