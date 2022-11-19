import { Card, CardActions, CardContent, IconButton, Typography } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import React, { useState } from 'react';
import ConfirmDialog from '../popup/ConfirmDialog';
import { useAppDispatch } from '../../hook';
import { fetchDeleteTask, fetchBoardIdTasks } from '../../store/taskSlice';

type Props = {
  title: string;
  description: string;
  id: string;
  columnId: string;
  taskId: string;
};

export default function Task(props: Props) {
  const dispatch = useAppDispatch();
  const [confirmTask, setConfirmTask] = useState({
    isOpen: false,
    title: '',
    subTitle: '',
    onConfirm: () => {
      ('');
    },
  });
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
          <IconButton
            color='info'
            onClick={async () => {
              setConfirmTask({
                isOpen: true,
                title: 'Are you sure what you want delete this task',
                subTitle: 'Click button yes',
                onConfirm: async () => {
                  const { columnId, id, taskId } = props;
                  const token = JSON.parse(localStorage.getItem('token') || '');
                  setConfirmTask({ ...confirmTask, isOpen: false });
                  await dispatch(fetchDeleteTask({ id, columnId, token, taskId }));
                  await dispatch(fetchBoardIdTasks({ id, token }));
                },
              });
            }}
          >
            <DeleteForeverIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </CardActions>
        <ConfirmDialog confirmDialog={confirmTask} setConfirmDialog={setConfirmTask} />
      </Card>
    </>
  );
}
