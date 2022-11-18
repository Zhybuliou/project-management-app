import welcomeLogo from './assets/WelcomeLogo.png';
import { Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const About = () => {
  const { t } = useTranslation();
  return (
    <Grid
      container
      rowGap={2}
      component='section'
      alignItems='center'
      justifyContent='center'
      maxWidth='xl'
      minHeight='93vh'
      sx={{ m: '0 auto' }}
    >
      <Grid item xs={12}>
        <Typography
          variant='h2'
          component='h1'
          className='section-title'
          maxWidth={700}
          sx={{ m: '0 auto' }}
        >
          {t('aboutTitle1')}
        </Typography>
      </Grid>
      <Grid item lg={6} md={12}>
        <Typography variant='h4' className='section-subtitle' sx={{ p: '0 5px 40px' }}>
          {t('aboutTitle2')}
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
