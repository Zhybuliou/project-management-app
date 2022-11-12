import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import React from 'react'
import './confirmDialog.scss'

type Props = {
    confirmDialog: {
        isOpen: boolean,
        title: string,
        subTitle: string,
        onConfirm: () => void
    },
    setConfirmDialog: React.Dispatch<React.SetStateAction<{
        isOpen: boolean;
        title: string;
        subTitle: string;
        onConfirm: () => void
    }>>
}

export default function ConfirmDialog(props: Props) {
    const {confirmDialog, setConfirmDialog} = props;
  return (
    <>
    <Dialog open={confirmDialog.isOpen}>
        <DialogTitle className='dialog-title' >
            <WarningAmberIcon color="error" className='dialog-title-icon'/>
        </DialogTitle>
        <DialogContent>
            <Typography variant="h6">
                {confirmDialog.title}
            </Typography>
            <Typography variant="subtitle2">
                {confirmDialog.subTitle}
            </Typography>
        </DialogContent>
        <DialogActions>
        <Button variant="contained" color="success" onClick={confirmDialog.onConfirm}>
            Yes
        </Button>
        <Button variant="outlined" color="error" onClick={() => setConfirmDialog({...confirmDialog, isOpen: false})}>
             No
        </Button>
        </DialogActions>
    </Dialog>
    </>
  )
}
