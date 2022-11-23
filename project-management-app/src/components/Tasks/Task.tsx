import { Card, CardActions, CardContent, IconButton, Typography } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { TaskData, fetchDeleteTask, fetchBoardIdTasks } from '../../store/taskSlice';
import { useAppDispatch } from '../../hook';
import ConfirmDialog from '../popup/ConfirmDialog';
import CreateBoardDialog from '../popup/CreateBoardDialog';

type TaskProps = {
  task: TaskData;
  index: number;
  id: string;
};

export default function Task({ task, index, id }: TaskProps) {
  const dispatch = useAppDispatch();
  const [openPopup, isOpenPopup] = useState(false);
  const [confirmTask, setConfirmTask] = useState({
    isOpen: false,
    title: '',
    subTitle: '',
    onConfirm: () => {
      ('');
    },
  });

  return (
    <Draggable draggableId={task._id as string} index={index}>
      {(provided, snapshot) => (
        <Card
          sx={{ minWidth: 200 }}
          style={{ display: 'flex', marginBottom: '10px', justifyContent: 'space-between' }}
          className={`column ${snapshot.isDragging ? 'drag' : ''}`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <CardContent onClick={() => isOpenPopup(true)} >
            <Typography sx={{ fontSize: 18 }} color='text.secondary' gutterBottom>
              {task.title}
            </Typography>
          </CardContent>
          <CardActions >
            <IconButton
              color='info'
              onClick={async () => {
                setConfirmTask({
                  isOpen: true,
                  title: 'Are you sure what you want delete this task',
                  subTitle: 'Click button yes',
                  onConfirm: async () => {
                    const { columnId } = task;
                    const taskId = task._id;
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
          <CreateBoardDialog openPopup={openPopup} setOpenPopup={isOpenPopup} title={task.title}>
            <Typography sx={{ mb: 1.5 }} color='text.secondary'>
              {task.description}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color='text.secondary'>
              User: admin
            </Typography>
          </CreateBoardDialog>
        </Card>
      )}
    </Draggable>
  );
}
