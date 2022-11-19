import { Card, CardActions, CardContent, IconButton, Typography } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { TaskData } from '../../store/taskSlice';

type TaskProps = {
  task: TaskData;
  index: number;
};

export default function Task({ task, index }: TaskProps) {
  return (
    <Draggable draggableId={task._id as string} index={index}>
      {(provided, snapshot) => (
        <Card
          sx={{ minWidth: 200 }}
          style={{ display: 'flex', marginBottom: '10px', justifyContent: 'space-between' }}
          className={`column ${snapshot.isDragging ? 'drag' : ''}`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <CardContent>
            <Typography sx={{ fontSize: 18 }} color='text.secondary' gutterBottom>
              {task.title}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color='text.secondary'>
              {task.description}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color='text.secondary'>
              User: admin
            </Typography>
          </CardContent>
          <CardActions>
            <IconButton color='info'>
              <DeleteForeverIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </CardActions>
        </Card>
      )}
    </Draggable>
  );
}
