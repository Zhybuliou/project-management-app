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
  const [openPopup, setOpenPopup] = useState(false);
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
          className={`column-task ${snapshot.isDragging ? 'drag' : ''}`}
          style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <CardContent onClick={() => setOpenPopup(true)}>
            <Typography sx={{ fontSize: 18 }} color='text.secondary' gutterBottom>
              {task.title}
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
          <CreateBoardDialog openPopup={openPopup} setOpenPopup={setOpenPopup} title={task.title}>
            <Card>
              <CardContent>
                <Typography sx={{ mb: 1.5 }} color='text.secondary'>
                  Description:
                </Typography>
                <Typography sx={{ mb: 1.5 }} color='text.secondary'>
                  {task.description}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color='text.secondary'>
                  Assigned to: admin
                </Typography>
              </CardContent>
              <CardActions style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <IconButton
                  color='info'
                  onClick={async () => {
                    setOpenPopup(false);
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
                  <DeleteForeverIcon />
                </IconButton>
              </CardActions>
            </Card>
          </CreateBoardDialog>
        </Card>
      )}
    </Draggable>
  );
}
