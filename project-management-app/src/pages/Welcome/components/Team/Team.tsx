import { Grid, Stack, Typography } from '@mui/material';
import evgenIcon from './assets/evgen.png';
import kateIcon from './assets/kate.png';
import vitaliusIcon from './assets/vitalius.png';
import { useTranslation } from 'react-i18next';

export const Team = () => {
  const { t } = useTranslation();
  const team = [
    {
      name: 'vitaliy',
      avatar: vitaliusIcon,
    },
    {
      name: 'katherina',
      avatar: kateIcon,
    },
    {
      name: 'evgeniy',
      avatar: evgenIcon,
    },
  ];

  return (
    <Grid
      container
      columnGap={40}
      rowGap={4}
      component='section'
      alignItems='center'
      justifyContent='center'
      sx={{ pb: 5 }}
    >
      <Grid item xs={12} justifyContent='center'>
        <Typography variant='h2' component='h1' className='section-title'>
          {t('teamTitle')}
        </Typography>
      </Grid>
      {team.map(({ name, avatar }) => (
        <Grid key={name} item>
          <Stack justifyContent='center' alignItems='center'>
            <img src={avatar} alt={name} />
            <Typography textTransform='uppercase' variant='h6' fontFamily='Ubuntu'>
              {t(name)}
            </Typography>
          </Stack>
        </Grid>
      ))}
      <Grid item xs={12} justifyContent='center'>
        <Typography
          variant='h5'
          className='section-subtitle'
          sx={{ m: '0 auto', pb: '40px' }}
          maxWidth='xl'
        >
          {t('aboutTeam')}
        </Typography>
      </Grid>
    </Grid>
  );
};
