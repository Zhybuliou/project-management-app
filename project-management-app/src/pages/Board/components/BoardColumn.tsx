import { Box, Card, CardContent, IconButton, Tooltip, Typography, Zoom } from '@mui/material';
import { Draggable } from 'react-beautiful-dnd';
import { useLocation } from 'react-router-dom';
import Tasks from '../../../components/Tasks/Tasks';
import { ColumnData } from '../../../store/columnSlice';
import { DeleteForever } from '@mui/icons-material';
import { useState } from 'react';
import FormUpdateColumn from '../../../components/forms/FormUpdateColumn';
import { FetchAllTasks } from '../../../store/taskSlice';

type PropsConfirmDialog = {
  isOpen: boolean;
  title: string;
  onConfirm: () => void;
};

type BoardColumnProps = {
  column: ColumnData;
  setConfirmDialog: (column: ColumnData) => void;
  index: number;
  confirmDialog: PropsConfirmDialog;
  userValue: string[] | null;
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
              <Tooltip
                title={column.title.length > 11 ? column.title : ''}
                arrow={true}
                TransitionComponent={Zoom}
                placement='top'
              >
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
              </Tooltip>
              {titleColumn !== column.title ? (
                <IconButton
                  color='info'
                  onClick={() => {
                    setConfirmDialog(column);
                  }}
                >
                  <DeleteForever />
                </IconButton>
              ) : null}
            </CardContent>
            <Tasks id={id} columnId={column._id || ''} allTasks={allTasks} userValue={userValue} />
          </Card>
        </Box>
      )}
    </Draggable>
  );
}
