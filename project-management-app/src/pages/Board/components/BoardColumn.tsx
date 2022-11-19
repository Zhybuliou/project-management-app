import { Box, Card, CardActions, CardContent, IconButton, Typography } from '@mui/material';
import { Draggable } from 'react-beautiful-dnd';
import { useLocation } from 'react-router-dom';
import Tasks from '../../../components/Tasks/Tasks';
import { useAppSelector } from '../../../hook';
import { ColumnData } from '../../../store/columnSlice';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

type PropsConfirmDialog = {
  isOpen: boolean;
  title: string;
  subTitle: string;
  onConfirm: () => void;
};

type BordColumnProps = {
  column: ColumnData;
  setConfirmDialog: (column: ColumnData) => void;
  index: number;
  confirmDialog: PropsConfirmDialog;
};

export function BordColumn({ column, setConfirmDialog, index }: BordColumnProps) {
  const allTasks = useAppSelector((state) => state.task.allTasks);
  const location = useLocation();
  const id = location.state.id;

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
              <Typography variant='h5'>{column.title}</Typography>
              <IconButton
                color='info'
                onClick={() => {
                  setConfirmDialog(column);
                }}
              >
                <DeleteForeverIcon />
              </IconButton>
            </CardContent>
            <Tasks id={id} columnId={column._id || ''} allTasks={allTasks} />
            <CardActions sx={{ ml: 'auto' }}></CardActions>
          </Card>
        </Box>
      )}
    </Draggable>
  );
}
