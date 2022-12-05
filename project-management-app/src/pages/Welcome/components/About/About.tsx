import welcomeLogo from './assets/WelcomeLogo.png';
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { SubTitle, Title } from '../../../../theme/styledComponents/styledComponents';

export const About = () => {
  const { t } = useTranslation();
  return (
    <Grid
      container
      component='section'
      alignItems='center'
      justifyContent='center'
      maxWidth='xl'
      minHeight={{ sx: '', md: 'calc(100vh - 80px)' }}
      sx={{ m: '0 auto' }}
    >
      <Grid item xs={12}>
        <Title variant='h2' component='h1' maxWidth={700}>
          {t('aboutTitle1')}
        </Title>
      </Grid>
      <Grid item lg={6} md={12}>
        <SubTitle variant='h5' component='h3'>
          {t('aboutTitle2')}
        </SubTitle>
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
