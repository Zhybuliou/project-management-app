import { Grid, List, ListItem, ListItemIcon } from '@mui/material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { useTranslation } from 'react-i18next';
import { Text, Title } from '../../../../theme/styledComponents/styledComponents';

export const Benefits = () => {
  const { t } = useTranslation();
  const benefits = {
    leftBlock: ['benefitLeftItem1', 'benefitLeftItem2', 'benefitLeftItem3', 'benefitLeftItem4'],
    rightBlock: [
      'benefitRightItem1',
      'benefitRightItem2',
      'benefitRightItem3',
      'benefitRightItem4',
    ],
  };

  return (
    <Grid
      container
      component='section'
      alignItems='center'
      justifyContent='center'
      sx={{ backgroundColor: 'white', pb: 5 }}
    >
      <Grid item xs={12} justifyContent='center'>
        <Title variant='h2' component='h2' color='primary'>
          {t('benefitsTitle')}
        </Title>
      </Grid>
      <Grid item md={4} xs={8}>
        <List>
          {benefits.leftBlock.map((advantage) => (
            <ListItem key={advantage}>
              <ListItemIcon>
                <TaskAltIcon color='success' />
              </ListItemIcon>
              <Text variant='h6'>{t(advantage)}</Text>
            </ListItem>
          ))}
        </List>
      </Grid>
      <Grid item md={4} xs={8}>
        <List>
          {benefits.rightBlock.map((advantage) => (
            <ListItem key={advantage}>
              <ListItemIcon>
                <TaskAltIcon color='success' />
              </ListItemIcon>
              <Text variant='h6'>{t(advantage)}</Text>
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  );
};
