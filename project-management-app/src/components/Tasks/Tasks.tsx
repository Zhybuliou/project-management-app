import { Button } from '@mui/material';
import React, { useState } from 'react';
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
};

export default function Tasks(props: TasksProps) {
  const [isOpenTask, setIsOpenTask] = useState(false);
  const { id, columnId, allTasks } = props;

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
                    task.columnId == columnId && <Task key={task._id} task={task} index={index} />,
                )
              : 'please create task...'}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
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
