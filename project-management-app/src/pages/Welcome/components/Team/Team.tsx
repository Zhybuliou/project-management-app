import { Grid, Stack, Typography } from '@mui/material';
import evgenIcon from './assets/evgen.png';
import kateIcon from './assets/kate.png';
import vitaliusIcon from './assets/vitalius.png';
import { useTranslation } from 'react-i18next';
import { SubTitle, Title } from '../../../../theme/styledComponents/styledComponents';

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
    >
      <Grid item xs={12} justifyContent='center'>
        <Title variant='h2' component='h2'>
          {t('teamTitle')}
        </Title>
      </Grid>
      {team.map(({ name, avatar }) => (
        <Grid key={name} item>
          <Stack justifyContent='center' alignItems='center'>
            <img src={avatar} alt={name} />
            <Typography variant='h6'>{t(name)}</Typography>
          </Stack>
        </Grid>
      ))}
      <Grid item xs={12} justifyContent='center'>
        <SubTitle variant='h4' component='h3'>
          {t('aboutTeam')}
        </SubTitle>
      </Grid>
    </Grid>
  );
};
