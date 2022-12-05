import RSLogo from './assets/RSLogo.png';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Container, IconButton, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const { t } = useTranslation();
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
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Typography variant='body1' color='white' fontWeight='700' sx={{ mt: { xs: 3, sm: 0 } }}>
        2022
      </Typography>
      <Stack flexDirection='row' p={{ xs: '1px 0', md: '4px 0' }}>
        {developers.map(({ name, githubLink }) => (
          <IconButton
            color='secondary'
            key={name}
            href={githubLink}
            target='_blank'
            sx={{ fontSize: 14, fontFamily: 'Ubuntu', p: { xs: 0.5, md: 1 } }}
          >
            <GitHubIcon sx={{ mr: 0.5 }} />
            {t(name).toUpperCase()}
          </IconButton>
        ))}
      </Stack>
      <IconButton color='secondary' size='small' href='https://rs.school/react/' target='_blank'>
        <img src={RSLogo} alt='Project Logo' />
      </IconButton>
    </Container>
  );
};
