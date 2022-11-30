import {
  Card,
  CardActions,
  CardContent,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { TaskData, fetchDeleteTask, fetchBoardIdTasks, fetchUpdateTask } from '../../store/taskSlice';
import { useAppDispatch, useAppSelector } from '../../hook';
import ConfirmDialog from '../popup/ConfirmDialog';
import CreateBoardDialog from '../popup/CreateBoardDialog';

type TaskProps = {
  task: TaskData;
  index: number;
  id: string;
};

export default function Task({ task, index, id }: TaskProps) {
  const allUsers = useAppSelector((state) => state.user.allUsers);
  const dispatch = useAppDispatch();
  const [openPopup, setOpenPopup] = useState(false);
  const [userValue, setUserValue] = useState('');
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
          <CardContent
            onClick={() => setOpenPopup(true)}
            sx={{ p: 0, flexGrow: 1, display: 'flex', alignItems: 'center' }}
          >
            <Typography
              className='task-name'
              sx={{ fontSize: 18, m: 0 }}
              color='primary'
              gutterBottom
            >
              {task.title}
            </Typography>
          </CardContent>
          <CardActions sx={{ p: 0.5 }}>
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
                  Assigned to: {task.users}
                </Typography>
              </CardContent>
              <CardActions style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <FormControl sx={{minWidth: '200px'}} fullWidth>
                  <InputLabel id='user-select-label'>Change User</InputLabel>
                  <Select
                    labelId='user-select-label'
                    id='user-select'
                    value={userValue}
                    label='Change User'
                    onChange={async (e) => {
                      const { columnId } = task;
                      const taskId = task._id;
                      const token = JSON.parse(localStorage.getItem('token') || '');
                      const body = {
                        title: task.title,
                        order: task.order,
                        columnId: columnId,
                        description: task.description,
                        userId: task.userId,
                        users: [
                          e.target.value
                        ]
                      }
                      setUserValue(e.target.value)
                      await dispatch(fetchUpdateTask({ body, id, columnId, token, taskId }));
                      await dispatch(fetchBoardIdTasks({ id, token }));
                    }}
                  >
                    {allUsers?.map((user) => <MenuItem key={user._id} value={user.login}>{user.login}</MenuItem>)}
                  </Select>
                </FormControl>
              </CardActions>
            </Card>
          </CreateBoardDialog>
        </Card>
      )}
    </Draggable>
  );
}
