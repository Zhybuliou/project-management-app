import { Card, CardActions, CardContent, IconButton, Typography } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import React from 'react';

type Props = {
  title: string;
  description: string;
};

export default function Task(props: Props) {
  return (
    <>
      <Card
        sx={{ minWidth: 200 }}
        style={{ display: 'flex', marginBottom: '10px', justifyContent: 'space-between' }}
      >
        <CardContent>
          <Typography sx={{ fontSize: 18 }} color='text.secondary' gutterBottom>
            {props.title}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color='text.secondary'>
            {props.description}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color='text.secondary'>
            User: admin
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton color='info'>
            <DeleteForeverIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
}
