import { Button, TextField } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../../hook';
import { fetchAllBoards, fetchCreateBoard } from '../../store/boardSlice';
import './form.scss'

type DataForm = {
  title?: string;
  description?:  string;
  users?: string;
  }
type Props = {
    setOpenPopup: (value: boolean) => void;
}

export default function FormCreateBoard(props: Props) {
  const { register, handleSubmit } = useForm();
  const dispatch = useAppDispatch();

  const onSubmit = async (data: DataForm) =>  {
    const getToken = localStorage.getItem('token');
    const getName = localStorage.getItem('name');
    if(getToken && getName){
      const name = [getName];
      const token = JSON.parse(getToken);
      props.setOpenPopup(false)
      if(data.title && data.description){
        const body = { title: data.title, owner: data.description, users: name}
        await dispatch(fetchCreateBoard({body, token}))
      }
      await dispatch(fetchAllBoards(token))
    }
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-create-board">
      <TextField label={'Title'} {...register('title', {required: true, maxLength: 80})} />
      <TextField label={'Description'} multiline rows={5} {...register('description', {required: true, maxLength: 100})} />
      <Button variant="contained" color="success" type="submit">Create Board</Button>
    </form>
  );
}