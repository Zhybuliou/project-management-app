import { Button } from '@mui/material';
import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import FormCreateTask from '../forms/FormCreateTask';
import CreateBoardDialog from '../popup/CreateBoardDialog';
import { TaskData } from '../../store/taskSlice';
import Task from './Task';

type Props = {
  id: string;
  columnId: string;
  allTasks: TaskData[];
};

export default function Tasks(props: Props) {
  const [isOpenTask, setIsOpenTask] = useState(false);
  const { id, columnId, allTasks } = props;

  return (
    <>
      {allTasks.length
        ? allTasks.map(
            (task) =>
              task.columnId == columnId && (
                <Task key={task._id} title={task.title} description={task.description} />
              ),
          )
        : 'please create task...'}
      <Button
        startIcon={<AddIcon color='primary' />}
        fullWidth={true}
        variant='contained'
        onClick={() => {
          setIsOpenTask(true);
        }}
      >
        add task
      </Button>
      <CreateBoardDialog title={'Create Task'} openPopup={isOpenTask} setOpenPopup={setIsOpenTask}>
        <FormCreateTask setOpenPopup={setIsOpenTask} id={id} columnId={columnId} />
      </CreateBoardDialog>
    </>
  );
}
