import { Button } from '@mui/material';
import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import FormCreateTask from '../forms/FormCreateTask';
import CreateBoardDialog from '../popup/CreateBoardDialog';
import { TaskData } from '../../store/taskSlice';
import Task from './Task';
import { Droppable } from 'react-beautiful-dnd';
import { DragType } from '../../pages/Board/Board';
import { useTranslation } from 'react-i18next';

type TasksProps = {
  id: string;
  columnId: string;
  allTasks: TaskData[];
  userValue: string[] | null;
};

export default function Tasks(props: TasksProps) {
  const [isOpenTask, setIsOpenTask] = useState(false);
  const { id, columnId, allTasks } = props;
  const { t } = useTranslation();

  return (
    <>
      <Droppable droppableId={columnId} type={DragType.TASK}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`tasks ${snapshot.isDraggingOver ? 'dragTasksActive' : ''}`}
          >
            {allTasks.length ?
              allTasks.map(
                (task, index) =>
                  task.columnId == columnId && (
                    <Task key={task._id} task={task} id={id} index={index} />
                  ),
              ) : ''}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <div className='task-create-btn'>
        <Button
          startIcon={<AddIcon color='secondary' />}
          fullWidth={true}
          variant='contained'
          onClick={() => {
            setIsOpenTask(true);
          }}
        >
          {t('addTask')}
        </Button>
      </div>
      <CreateBoardDialog title={t('addTask')} openPopup={isOpenTask} setOpenPopup={setIsOpenTask}>
        <FormCreateTask setOpenPopup={setIsOpenTask} id={id} columnId={columnId} />
      </CreateBoardDialog>
    </>
  );
}
