import { Button, TextField } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../../hook';
import { fetchAllBoards, fetchUpdateBoard } from '../../store/boardSlice';
import './form.scss'

type DataForm = {
  title?: string;
  description?:  string;
  users?: string;
  }
type Props = {
    form: {
     id: string;
     title: string;
     description: string,
    }
    setOpenPopup: (value: boolean) => void;
}

export default function FormUpdateBoard(props: Props) {
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
        const id = props.form.id;
        const body = { title: data.title, owner: data.description, users: name}
        await dispatch(fetchUpdateBoard({body, token, id}))
      }
      await dispatch(fetchAllBoards(token))
    }
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-create-board">
      <TextField label={'Title'} defaultValue={props.form.title} {...register('title', {required: true, maxLength: 80})} />
      <TextField label={'Description'} defaultValue={props.form.description} multiline rows={5} {...register('description', {required: true, maxLength: 100})} />
      <Button variant="contained" color="success" type="submit">Update Board</Button>
    </form>
  );
}