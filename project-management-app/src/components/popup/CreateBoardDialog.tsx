import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
import { PopupTitle } from '../../theme/styledComponents/styledComponents';

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
      <DialogTitle color='primary' sx={{ pt: 0, textAlign: 'center' }}>
        <PopupTitle>{title}</PopupTitle>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  );
}
