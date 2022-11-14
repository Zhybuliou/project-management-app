import RSLogo from './assets/RSLogo.png';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Container, IconButton, Typography } from '@mui/material';
import { Stack } from '@mui/system';

export const Footer = () => {
  const developers = [
    {
      name: 'vitaliy',
      githubLink: 'https://github.com/Zhybuliou',
    },
    {
      name: 'katherina',
      githubLink: 'https://github.com/KateKaliaha',
    },
    {
      name: 'evgeniy',
      githubLink: 'https://github.com/kolyagae',
    },
  ];

  return (
    <Container
      component='footer'
      maxWidth='xl'
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Typography variant='body1' color='white' fontWeight='700'>
        2022
      </Typography>
      <Stack direction='row'>
        {developers.map(({ name, githubLink }) => (
          <IconButton
            color='secondary'
            key={name}
            href={githubLink}
            target='_blank'
            sx={{ fontSize: 14 }}
          >
            <GitHubIcon sx={{ mr: 0.5 }} />
            {name.toUpperCase()}
          </IconButton>
        ))}
      </Stack>
      <IconButton color='secondary' size='small' href='https://rs.school/react/' target='_blank'>
        <img src={RSLogo} alt='Project Logo' />
      </IconButton>
    </Container>
  );
};
