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

export const Menu = () => {
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
    <Stack className='nav-menu' direction='row' spacing={1}>
      <Select
        size='small'
        IconComponent={Language}
        value={localStorage.getItem('lng') || 'en'}
        onChange={(event) => handleChangeLng(event.target.value)}
      >
        <MyMenuItem value='en'>en</MyMenuItem>
        <MyMenuItem value='ru'>ru</MyMenuItem>
      </Select>
      {!auth && location !== 'main' ? (
        <>
          <NavLink to='/login'>
            <WhiteButton variant='contained' endIcon={<Login />} disabled={!(location !== 'login')}>
              {t('signIn')}
            </WhiteButton>
          </NavLink>
          <NavLink to='/register'>
            <WhiteButton
              variant='contained'
              endIcon={<AppRegistration />}
              disabled={!(location !== 'register')}
            >
              {t('signUp')}
            </WhiteButton>
          </NavLink>
        </>
      ) : null}
      {auth && !location ? (
        <NavLink to='/main'>
          <WhiteButton variant='contained' endIcon={<Home />}>
            {t('goToMainPage')}
          </WhiteButton>
        </NavLink>
      ) : null}

      {auth && (location === 'main' || location === 'profile' || location === 'board') ? (
        <>
          <WhiteButton
            variant='contained'
            endIcon={<DashboardCustomize />}
            onClick={() => setBoardDialog(true)}
          >
            {t('createNewBoard')}
          </WhiteButton>
          <CreateBoardDialog
            title={'Create Board'}
            openPopup={boardDialog}
            setOpenPopup={setBoardDialog}
          >
            <FormCreateBoard setOpenPopup={setBoardDialog} />
          </CreateBoardDialog>
          <NavLink to='/profile'>
            <WhiteButton variant='contained' endIcon={<Edit />}>
              {t('editProfile')}
            </WhiteButton>
          </NavLink>
          <WhiteButton onClick={logOut} endIcon={<Logout />}>
            {t('signOut')}
          </WhiteButton>
        </>
      ) : null}
    </Stack>
  );
};
