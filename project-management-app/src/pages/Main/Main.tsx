import './Main.scss';
import {
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ConfirmDialog from '../../components/popup/ConfirmDialog';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useAppDispatch, useAppSelector } from '../../hook';
import { fetchAllBoards, fetchDeleteBoard } from '../../store/boardSlice';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CreateBoardDialog from '../../components/popup/CreateBoardDialog';
import FormUpdateBoard from '../../components/forms/FormUpdateBoard';
import { SubTitle, Title } from '../../theme/styledComponents/styledComponents';
import { useTranslation } from 'react-i18next';
import { fetchGetUser } from '../../store/userSlice';

export const Main = () => {
  const allBoards = useAppSelector((state) => state.board.allBoards);
  const isLoaded = useAppSelector((state) => state.auth.isLoaded);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    onConfirm: () => {
      ('');
    },
  });
  const [updateStateBoard, setUpdateStateBoard] = useState({
    id: '',
    title: '',
    description: '',
  });
  const [dialogUpdate, setDialogUpdate] = useState(false);
  const getToken = localStorage.getItem('token');
  const id = useAppSelector((state) => state.auth.id);
  if (getToken) {
    const token = JSON.parse(getToken);
    useEffect(() => {
      dispatch(fetchAllBoards(token));
      dispatch(fetchGetUser({ id, token }));
    }, []);
  }

  return (
    <Container className='main' component='main' maxWidth='xl'>
      <Title variant='h2' component='h1'>
        {t('yourBoards')}
      </Title>
      <Grid container columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}>
        {!isLoaded && allBoards.length
          ? allBoards.map((board, index) => (
              <Grid item xs={1} key={index}>
                <Card className='board'>
                  <Link to={`/board/${board._id}`} state={{ id: board._id }}>
                    <CardContent className='board__title'>
                      <Typography variant='h5'>{board.title}</Typography>
                    </CardContent>
                    <CardContent className='board__description'>
                      <Typography variant='body2'>{board.owner}</Typography>
                    </CardContent>
                  </Link>
                  <CardActions sx={{ ml: 'auto' }}>
                    <IconButton
                      color='info'
                      onClick={async () => {
                        await setUpdateStateBoard({
                          id: board._id || '',
                          title: board.title,
                          description: board.owner,
                        });
                        await setDialogUpdate(true);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color='info'
                      onClick={async () => {
                        setConfirmDialog({
                          isOpen: true,
                          title: t('messageDeleteBoard'),
                          onConfirm: async () => {
                            const getToken = localStorage.getItem('token');
                            if (getToken) {
                              setConfirmDialog({
                                ...confirmDialog,
                                title: t('messageDeleteBoard'),
                                isOpen: false,
                              });
                              const id = board._id;
                              const token = JSON.parse(getToken);
                              await dispatch(fetchDeleteBoard({ id, token }));
                              await dispatch(fetchAllBoards(token));
                            }
                          },
                        });
                      }}
                    >
                      <DeleteForeverIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))
          : !isLoaded && <SubTitle variant='h6'>{t('noAvailableBoards')}</SubTitle>}
      </Grid>
      <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
      <CreateBoardDialog
        title={t('updateBoardTitle')}
        openPopup={dialogUpdate}
        setOpenPopup={setDialogUpdate}
      >
        <FormUpdateBoard form={updateStateBoard} setOpenPopup={setDialogUpdate} />
      </CreateBoardDialog>
    </Container>
  );
};
