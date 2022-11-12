import { Button, Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';
import React from 'react'

type Props = {
  title: string; 
  children: React.ReactNode; 
  openPopup: boolean; 
  setOpenPopup: (value: boolean)=> void;
}

export default function CreateBoardDialog(props: Props) {
  const { title, children, openPopup, setOpenPopup } = props;

  return (
    <Dialog open={openPopup} maxWidth="md" >
    <DialogTitle >
        <div style={{ display: 'flex' }}>
            <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                {title}
            </Typography>
            < Button
                color="secondary"
                onClick={()=>{setOpenPopup(false)}}>
            </Button>
        </div>
    </DialogTitle>
    <DialogContent dividers>
        {children}
    </DialogContent>
</Dialog>
  )
}
