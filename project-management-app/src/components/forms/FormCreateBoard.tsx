import React from 'react';
import { useForm } from 'react-hook-form';

type DataForm = {
    Name?: string;
    LastName?:  string;
    Email?: string;
  }
type Props = {
    setOpenPopup: (value: boolean) => void;
}

export default function FormCreateBoard(props: Props) {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: DataForm) => console.log(data);
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="First name" {...register('Name', {required: true, maxLength: 80})} />
      <input type="text" placeholder="Last name" {...register('LastName', {required: true, maxLength: 100})} />
      <input type="text" placeholder="Email" {...register('Email', {required: true, pattern: /^\S+@\S+$/i})} />

      <input type="submit" onClick={() => props.setOpenPopup(false)}/>
    </form>
  );
}