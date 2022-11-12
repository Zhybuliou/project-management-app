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
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useAppSelector } from '../../hook';

export const Main = () => {
  const allBoards = useAppSelector((state) => state.board.allBoards);

  return (
    <Container className='boards' component='section' maxWidth='xl'>
      <Typography className='main-title' variant='h2'>
        Your Boards
      </Typography>
      <Grid container columns={{ xs: 1, sm: 2, md: 4 }}>
        {allBoards.length ? (
          allBoards.map((el, index) => (
            <Grid item xs={1} key={index}>
              <Card className='board'>
                <CardContent className='board__title'>
                  <Typography variant='h5'>{el.title}</Typography>
                </CardContent>
                <CardContent className='board__description'>
                  <Typography variant='body2'>Description</Typography>
                </CardContent>
                <CardActions sx={{ ml: 'auto' }}>
                  <IconButton color='secondary'>
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
    </Container>
  );
};
