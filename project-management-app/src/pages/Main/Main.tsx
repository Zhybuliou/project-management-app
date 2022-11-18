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
// import { signOutByToken } from '../../utils/signOut';
import { Link } from 'react-router-dom';
import CreateBoardDialog from '../../components/popup/CreateBoardDialog';
import FormUpdateBoard from '../../components/forms/FormUpdateBoard';

export const Main = () => {
  const allBoards = useAppSelector((state) => state.board.allBoards);
  const dispatch = useAppDispatch();
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    subTitle: '',
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
  if (getToken) {
    const token = JSON.parse(getToken);
    useEffect(() => {
      dispatch(fetchAllBoards(token));
    }, []);
  }
  // signOutByToken();

  return (
    <Container className='main' component='main' maxWidth='xl'>
      <Typography className='section-title' variant='h2'>
        Your Boards
      </Typography>
      <Grid container columns={{ xs: 1, sm: 2, md: 4 }}>
        {allBoards.length ? (
          allBoards.map((board, index) => (
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
                        title: 'Are you sure what you want delete this board',
                        subTitle: 'Click button yes',
                        onConfirm: async () => {
                          const getToken = localStorage.getItem('token');
                          if (getToken) {
                            setConfirmDialog({ ...confirmDialog, isOpen: false });
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
        ) : (
          <Typography variant='h6' color='white'>
            No available boards
          </Typography>
        )}
      </Grid>
      <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
      <CreateBoardDialog
        title={'Update Board'}
        openPopup={dialogUpdate}
        setOpenPopup={setDialogUpdate}
      >
        <FormUpdateBoard form={updateStateBoard} setOpenPopup={setDialogUpdate} />
      </CreateBoardDialog>
    </Container>
  );
};
