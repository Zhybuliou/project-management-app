import welcomeLogo from './assets/WelcomeLogo.png';
import { Grid, Typography } from '@mui/material';

export const About = () => {
  return (
    <Grid
      container
      rowGap={3}
      component='section'
      alignItems='center'
      justifyContent='center'
      maxWidth='xl'
      minHeight='92vh'
      sx={{ m: '0 auto' }}
    >
      <Grid item xs={12}>
        <Typography variant='h2' component='h1' className='section-title'>
          simplify work and get more done
        </Typography>
      </Grid>
      <Grid item lg={6} md={12}>
        <Typography variant='h4' className='section-subtitle' sx={{ p: '0 5px' }}>
          plan, track, and manage any type of work with project management that flexes to your
          team`s needs
        </Typography>
      </Grid>
      <Grid item lg={6} md={12}>
        <img
          src={welcomeLogo}
          alt='Welcome Logo'
          style={{ display: 'block', margin: '0 auto', maxWidth: '100%', height: 'auto' }}
        />
      </Grid>
    </Grid>
  );
};
