import {
  Card,
  CardActions,
  CardContent,
  FormControl,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Stack,
  Tooltip,
  Typography,
  Zoom,
} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import {
  TaskData,
  fetchDeleteTask,
  fetchBoardIdTasks,
  fetchUpdateTask,
} from '../../store/taskSlice';
import { useAppDispatch, useAppSelector } from '../../hook';
import ConfirmDialog from '../popup/ConfirmDialog';
import CreateBoardDialog from '../popup/CreateBoardDialog';
import { useTranslation } from 'react-i18next';
import { Text } from '../../theme/styledComponents/styledComponents';

type TaskProps = {
  task: TaskData;
  index: number;
  id: string;
};

type TBody = {
  title: string;
  order: number;
  columnId: string;
  description: string;
  userId: string;
  users: [string];
};

export default function Task({ task, index, id }: TaskProps) {
  const allUsers = useAppSelector((state) => state.user.allUsers);
  const dispatch = useAppDispatch();
  const [openPopup, setOpenPopup] = useState(false);
  const [userValue, setUserValue] = useState('');
  const [confirmTask, setConfirmTask] = useState({
    isOpen: false,
    title: '',
    onConfirm: () => {
      ('');
    },
  });
  const { t } = useTranslation();

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
            <Tooltip
              title={task.title.length > 15 ? task.title : ''}
              arrow={true}
              TransitionComponent={Zoom}
              placement='top'
            >
              <Typography className='task-name' sx={{ fontSize: 18, m: 0 }} color='primary'>
                {task.title}
              </Typography>
            </Tooltip>
          </CardContent>
          <CardActions sx={{ p: 0.5 }}>
            <IconButton
              color='info'
              onClick={async () => {
                setConfirmTask({
                  isOpen: true,
                  title: t('messageDeleteTask'),
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
            <Stack minWidth={300} sx={{ mb: 0.5 }}>
              <Text>{t('description')}</Text>
              <Paper elevation={2} sx={{ minHeight: 100, p: 1 }}>
                <Typography color='primary'>{task.description}</Typography>
              </Paper>
            </Stack>
            <Text>{t('assign')}</Text>
            <FormControl sx={{ minWidth: '200px' }} fullWidth>
              <Select
                className='popup-select'
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                value={userValue}
                sx={{
                  '&:hover': { '&& fieldset': { border: '2px solid #4D628B' } },
                  color: '#4D628B',
                }}
                onChange={async (e) => {
                  const { columnId } = task;
                  const taskId = task._id;
                  const token = JSON.parse(localStorage.getItem('token') || '');
                  const body: TBody = {
                    title: task.title,
                    order: task.order,
                    columnId: columnId,
                    description: task.description,
                    userId: task.userId,
                    users: [e.target.value],
                  };
                  setUserValue(e.target.value);
                  await dispatch(fetchUpdateTask({ body, id, columnId, token, taskId }));
                  await dispatch(fetchBoardIdTasks({ id, token }));
                }}
              >
                <MenuItem value={userValue} disabled>
                  {task.users}
                </MenuItem>
                {allUsers
                  ?.filter((user) => user.login !== task.users[0])
                  .map((user) => (
                    <MenuItem sx={{ color: '#4D628B' }} key={user._id} value={user.login}>
                      {user.login}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </CreateBoardDialog>
        </Card>
      )}
    </Draggable>
  );
}
