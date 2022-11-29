import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import React from 'react';
import './confirmDialog.scss';
import { useTranslation } from 'react-i18next';

type Props = {
  confirmDialog: {
    isOpen: boolean;
    title: string;
    onConfirm: () => void;
  };
  setConfirmDialog: React.Dispatch<
    React.SetStateAction<{
      isOpen: boolean;
      title: string;
      onConfirm: () => void;
    }>
  >;
};

export default function ConfirmDialog(props: Props) {
  const { confirmDialog, setConfirmDialog } = props;
  const { t } = useTranslation();
  return (
    <>
      <Dialog open={confirmDialog.isOpen}>
        <DialogTitle className='dialog-title'>
          <WarningAmberIcon color='error' className='dialog-title-icon' />
        </DialogTitle>
        <DialogContent>
          <Typography variant='h6' color='primary'>
            {confirmDialog.title}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' color='success' onClick={confirmDialog.onConfirm}>
            {t('yes')}
          </Button>
          <Button
            variant='outlined'
            color='error'
            onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
          >
            {t('no')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
