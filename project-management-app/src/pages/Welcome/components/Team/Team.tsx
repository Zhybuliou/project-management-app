import { Grid, Stack, Typography } from '@mui/material';
import evgenIcon from './assets/evgen.png';
import kateIcon from './assets/kate.png';
import vitaliusIcon from './assets/vitalius.png';

export const Team = () => {
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
      component='section'
      alignItems='center'
      justifyContent='center'
      sx={{ pb: 5 }}
    >
      <Grid item xs={12} justifyContent='center'>
        <Typography variant='h2' component='h1' className='section-title'>
          our team
        </Typography>
      </Grid>
      {team.map(({ name, avatar }) => (
        <Grid key={name} item>
          <Stack justifyContent='center' alignItems='center'>
            <img src={avatar} alt={name} />
            <Typography textTransform='uppercase' variant='h6' fontFamily='Ubuntu'>
              {name}
            </Typography>
          </Stack>
        </Grid>
      ))}
    </Grid>
  );
};
