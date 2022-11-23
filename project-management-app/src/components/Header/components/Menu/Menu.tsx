import './Menu.scss';
import { Stack, Select } from '@mui/material';
import {
  AppRegistration,
  DashboardCustomize,
  Edit,
  Home,
  Language,
  Login,
  Logout,
} from '@mui/icons-material';
import { NavLink, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../hook';
import { changeStatusAuth } from '../../../../store/authSlice';
import { removeLocalStorage } from '../../../../utils/signOut';
import CreateBoardDialog from '../../../popup/CreateBoardDialog';
import FormCreateBoard from '../../../forms/FormCreateBoard';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MyMenuItem, WhiteButton } from '../../../../theme/styledComponents/styledComponents';
import { setBurgerVisible } from '../../../../store/headerSlice';

type MenuProps = {
  buttonVariant: 'text' | 'contained';
  direction: 'row' | 'column';
};

export const Menu = ({ buttonVariant, direction }: MenuProps) => {
  const auth = useAppSelector((state) => state.auth.auth);
  const location = useLocation().pathname.split('/')[1];
  const dispatch = useAppDispatch();
  const [boardDialog, setBoardDialog] = useState(false);
  const { t, i18n } = useTranslation();

  function logOut() {
    dispatch(changeStatusAuth(false));
    removeLocalStorage();
  }

  function handleChangeLng(lng: string) {
    i18n.changeLanguage(lng);
    localStorage.setItem('lng', lng);
  }

  return (
    <Stack
      className='nav-menu'
      direction={direction}
      flexWrap='wrap'
      justifyContent='end'
      gap={0.5}
      sx={{ p: 1 }}
    >
      <Select
        size='small'
        IconComponent={Language}
        value={localStorage.getItem('lng') || 'en'}
        onChange={(event) => {
          dispatch(setBurgerVisible(false));
          handleChangeLng(event.target.value);
        }}
      >
        <MyMenuItem value='en'>en</MyMenuItem>
        <MyMenuItem value='ru'>ru</MyMenuItem>
      </Select>
      {!auth && location !== 'main' ? (
        <>
          <WhiteButton
            onClick={() => dispatch(setBurgerVisible(false))}
            component={NavLink}
            to='/login'
            variant={buttonVariant}
            endIcon={<Login />}
            disabled={!(location !== 'login')}
            sx={{ minWidth: { sm: '100%', md: '64px' } }}
          >
            {t('signIn')}
          </WhiteButton>
          <WhiteButton
            onClick={() => dispatch(setBurgerVisible(false))}
            component={NavLink}
            to='/register'
            variant={buttonVariant}
            endIcon={<AppRegistration />}
            disabled={!(location !== 'register')}
            sx={{ minWidth: { sm: '100%', md: '64px' } }}
          >
            {t('signUp')}
          </WhiteButton>
        </>
      ) : null}
      {auth && (!location || location === 'profile' || location === '404') ? (
        <WhiteButton
          onClick={() => dispatch(setBurgerVisible(false))}
          component={NavLink}
          to='/main'
          variant={buttonVariant}
          endIcon={<Home />}
          sx={{ minWidth: { sm: '100%', md: '64px' } }}
        >
          {t('goToMainPage')}
        </WhiteButton>
      ) : null}

      {auth &&
      (location === 'main' ||
        location === 'profile' ||
        location === 'board' ||
        location === '404') ? (
        <>
          <WhiteButton
            variant={buttonVariant}
            endIcon={<DashboardCustomize />}
            onClick={() => {
              setBoardDialog(true);
            }}
            sx={{ minWidth: { sm: '100%', md: '64px' } }}
          >
            {t('createNewBoard')}
          </WhiteButton>
          <CreateBoardDialog
            title={t('createTitle')}
            openPopup={boardDialog}
            setOpenPopup={setBoardDialog}
          >
            <FormCreateBoard setOpenPopup={setBoardDialog} />
          </CreateBoardDialog>
          <WhiteButton
            onClick={() => dispatch(setBurgerVisible(false))}
            component={NavLink}
            to='/profile'
            variant={buttonVariant}
            endIcon={<Edit />}
            sx={{ minWidth: { sm: '100%', md: '64px' } }}
          >
            {t('editProfile')}
          </WhiteButton>
        </>
      ) : null}
      {auth ? (
        <WhiteButton
          variant={buttonVariant}
          onClick={() => {
            dispatch(setBurgerVisible(false));
            logOut();
          }}
          endIcon={<Logout />}
          sx={{ minWidth: { sm: '100%', md: '64px' } }}
        >
          {t('signOut')}
        </WhiteButton>
      ) : null}
    </Stack>
  );
};
