import { Box, Card, CardContent, Container, Grid, Typography } from '@mui/material';
import React from 'react';
import { data } from './data';

export const Main = () => {
  return (
    <Container maxWidth='xl'>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant='h2' position='static'>
          Dashboards
        </Typography>
        <Grid container columns={{ xs: 1, sm: 3, md: 4 }}>
          {data.map((_, index) => (
            <Grid xs={3} sm={1} md={1} key={index}>
              <Card sx={{ m: 3 }}>
                <CardContent>
                  <Typography variant='h4'>Title</Typography>
                </CardContent>
                <CardContent>
                  <Typography variant='body2'>Description</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};
