import { Container } from '@mui/material';

export const Error = () => {
  return (
    <Container
      color='blue'
      maxWidth='xl'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h2>Whoops! Looks like something went wrong!</h2>
      <div>
        <span>You can either reload the page, or report this error to us on our </span>
        <a href='https://github.com/Zhybuliou/project-management-app'>
          <u> GitHub</u>
        </a>
      </div>
    </Container>
  );
};
