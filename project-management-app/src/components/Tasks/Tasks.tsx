import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import FormCreateTask from '../forms/FormCreateTask';
import CreateBoardDialog from '../popup/CreateBoardDialog';
import { TaskData } from '../../store/taskSlice';
import Task from './Task';
import { Droppable } from 'react-beautiful-dnd';
import { DragType } from '../../pages/Board/Board';

type TasksProps = {
  id: string;
  columnId: string;
  allTasks: TaskData[];
  userValue: string;
};

export default function Tasks(props: TasksProps) {
  const [isOpenTask, setIsOpenTask] = useState(false);
  const { id, columnId, allTasks, userValue } = props;

  useEffect(() => {
    const filterAllTasks = allTasks.filter((task) => task.users.includes('newUser'));
    console.log(filterAllTasks, allTasks);
  }, [userValue]);

  return (
    <>
      <Droppable droppableId={columnId} type={DragType.TASK}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`${snapshot.isDraggingOver ? 'dragTasksActive' : ''}`}
          >
            {allTasks.length
              ? allTasks.map(
                  (task, index) =>
                    task.columnId == columnId && (
                      <Task key={task._id} task={task} id={id} index={index} />
                    ),
                )
              : 'please create task...'}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <div className='task-create-btn'>
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
      </div>
      <CreateBoardDialog title={'Create Task'} openPopup={isOpenTask} setOpenPopup={setIsOpenTask}>
        <FormCreateTask setOpenPopup={setIsOpenTask} id={id} columnId={columnId} />
      </CreateBoardDialog>
    </>
  );
}
