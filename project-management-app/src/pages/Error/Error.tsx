import { Container, Stack } from '@mui/material';
import { Title } from '../../theme/styledComponents/styledComponents';
import { useTranslation } from 'react-i18next';

export const Error = () => {
  const { t } = useTranslation();
  return (
    <Container className='main' component='main' maxWidth='xl'>
      <Title variant='h2' component='h1'>
        {t('error')}
      </Title>
      <Stack alignItems='center' fontSize='10rem'>
        404
      </Stack>
    </Container>
  );
};
