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
import { useAppDispatch, useAppSelector } from '../../../../hook';
import { changeStatusAuth } from '../../../../store/authSlice';
import { removeLocalStorage } from '../../../../utils/signOut';
import CreateBoardDialog from '../../../popup/CreateBoardDialog';
import FormCreateBoard from '../../../forms/FormCreateBoard';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

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
        IconComponent={LanguageIcon}
        value={localStorage.getItem('lng') || 'en'}
        onChange={(event) => handleChangeLng(event.target.value)}
      >
        <MenuItem value='en'>en</MenuItem>
        <MenuItem value='ru'>ru</MenuItem>
      </Select>
      {!auth && location !== 'main' ? (
        <>
          <NavLink to='/login'>
            <Button variant='contained' endIcon={<LoginIcon />} disabled={!(location !== 'login')}>
              {t('signIn')}
            </Button>
          </NavLink>
          <NavLink to='/register'>
            <Button
              variant='contained'
              endIcon={<AppRegistrationIcon />}
              disabled={!(location !== 'register')}
            >
              {t('signUp')}
            </Button>
          </NavLink>
        </>
      ) : null}
      {auth && !location ? (
        <NavLink to='/main'>
          <Button variant='contained' endIcon={<HomeIcon />}>
            {t('goToMainPage')}
          </Button>
        </NavLink>
      ) : null}

      {auth && (location === 'main' || location === 'profile' || location === 'board') ? (
        <>
          <Button
            variant='contained'
            endIcon={<DashboardCustomizeIcon />}
            onClick={() => setBoardDialog(true)}
          >
            {t('createNewBoard')}
          </Button>
          <CreateBoardDialog
            title={'Create Board'}
            openPopup={boardDialog}
            setOpenPopup={setBoardDialog}
          >
            <FormCreateBoard setOpenPopup={setBoardDialog} />
          </CreateBoardDialog>
          <NavLink to='/profile'>
            <Button variant='contained' endIcon={<EditIcon />}>
              {t('editProfile')}
            </Button>
          </NavLink>
          <Button onClick={logOut} variant='contained' endIcon={<LogoutIcon />}>
            {t('signOut')}
          </Button>
        </>
      ) : null}
    </Stack>
  );
};
