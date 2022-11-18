import { Dialog, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';

type Props = {
  title: string;
  children: React.ReactNode;
  openPopup: boolean;
  setOpenPopup: (value: boolean) => void;
};

export default function CreateBoardDialog(props: Props) {
  const { title, children, openPopup, setOpenPopup } = props;

  return (
    <Dialog open={openPopup} maxWidth='md'>
      <IconButton
        onClick={() => {
          setOpenPopup(false);
        }}
        sx={{ ml: 'auto' }}
      >
        <CloseIcon color='primary' />
      </IconButton>
      <DialogTitle sx={{ pt: 0 }}>
        <div style={{ display: 'flex' }}>
          <Typography variant='h4' color='#4D628B' component='div' style={{ flexGrow: 1 }}>
            {title}
          </Typography>
        </div>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  );
}
