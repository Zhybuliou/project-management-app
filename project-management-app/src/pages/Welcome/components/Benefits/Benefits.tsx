import { Grid, List, ListItem, ListItemIcon, Typography } from '@mui/material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { useTranslation } from 'react-i18next';

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
        <Typography variant='h2' component='h1' className='section-title --blueColor'>
          {t('benefitsTitle')}
        </Typography>
      </Grid>
      <Grid item md={4} xs={8}>
        <List>
          {benefits.leftBlock.map((advantage) => (
            <ListItem key={advantage}>
              <ListItemIcon>
                <TaskAltIcon color='success' />
              </ListItemIcon>
              <Typography variant='h6' className='section-text'>
                {t(advantage)}
              </Typography>
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
              <Typography variant='h6' className='section-text'>
                {t(advantage)}
              </Typography>
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  );
};
