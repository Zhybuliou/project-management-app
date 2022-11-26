import { Box, Card, CardContent, IconButton, Typography } from '@mui/material';
import { Draggable } from 'react-beautiful-dnd';
import { useLocation } from 'react-router-dom';
import Tasks from '../../../components/Tasks/Tasks';
import { ColumnData } from '../../../store/columnSlice';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useState } from 'react';
import FormUpdateColumn from '../../../components/forms/FormUpdateColumn';
import { FetchAllTasks } from '../../../store/taskSlice';

type PropsConfirmDialog = {
  isOpen: boolean;
  title: string;
  subTitle: string;
  onConfirm: () => void;
};

type BoardColumnProps = {
  column: ColumnData;
  setConfirmDialog: (column: ColumnData) => void;
  index: number;
  confirmDialog: PropsConfirmDialog;
  userValue: string;
  allTasks: FetchAllTasks;
};

export function BordColumn({
  column,
  setConfirmDialog,
  index,
  userValue,
  allTasks,
}: BoardColumnProps) {
  const location = useLocation();
  const id = location.state.id;
  const [titleColumn, setTitleColumn] = useState('');

  return (
    <Draggable draggableId={column._id as string} index={index}>
      {(provided, snapshot) => (
        <Box>
          <Card
            className={`column ${snapshot.isDragging ? 'drag' : ''}`}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <CardContent className='column-title'>
              <Typography
                variant='h5'
                className='column-title-header'
                onClick={() => {
                  setTitleColumn(column.title);
                }}
              >
                {titleColumn !== column.title ? (
                  column.title
                ) : (
                  <FormUpdateColumn
                    form={{
                      title: column.title,
                      id: id,
                      columnId: column._id || '',
                      order: column.order,
                    }}
                    setTitleColumn={setTitleColumn}
                    titleColumn={titleColumn}
                  />
                )}
              </Typography>
              <IconButton
                color='info'
                onClick={() => {
                  setConfirmDialog(column);
                }}
              >
                <DeleteForeverIcon />
              </IconButton>
            </CardContent>
            <Tasks id={id} columnId={column._id || ''} allTasks={allTasks} userValue={userValue} />
          </Card>
        </Box>
      )}
    </Draggable>
  );
}
