import { Grid, List, ListItem, ListItemIcon, Typography } from '@mui/material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

export const Benefits = () => {
  const benefits = {
    leftBlock: [
      'real-time project budget management',
      'balanced resource management',
      'effective communication',
      'effortless project planning',
    ],
    rightBlock: [
      'solid up-to-the-minute reporting',
      'pipeline forecasting',
      'improved team collaboration',
      'enhanced customer satisfaction',
    ],
  };

  return (
    <Grid
      container
      component='section'
      alignItems='center'
      justifyContent='center'
      sx={{ backgroundColor: 'white', pb: 5 }}
    >
      <Grid item xs={12} justifyContent='center'>
        <Typography variant='h2' component='h1' className='section-title --blueColor'>
          benefits of using
        </Typography>
      </Grid>
      <Grid item md={4} xs={8}>
        <List>
          {benefits.leftBlock.map((advantage) => (
            <ListItem key={advantage}>
              <ListItemIcon>
                <TaskAltIcon color='success' />
              </ListItemIcon>
              <Typography variant='h6' className='section-text'>
                {advantage[0].toUpperCase() + advantage.slice(1)}
              </Typography>
            </ListItem>
          ))}
        </List>
      </Grid>
      <Grid item md={4} xs={8}>
        <List>
          {benefits.rightBlock.map((advantage) => (
            <ListItem key={advantage}>
              <ListItemIcon>
                <TaskAltIcon color='success' />
              </ListItemIcon>
              <Typography variant='h6' className='section-text'>
                {advantage[0].toUpperCase() + advantage.slice(1)}
              </Typography>
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  );
};
