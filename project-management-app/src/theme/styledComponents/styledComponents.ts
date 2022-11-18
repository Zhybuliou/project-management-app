import { Button, MenuItem, styled, TextField, Typography } from '@mui/material';

export const FormField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.secondary.main,
  },
  '& .MuiOutlinedInput-root': {
    color: 'inherit',
    fontSize: '20px',

    '&:hover fieldset': {
      border: '2px solid ' + theme.palette.secondary.main,
    },
  },
  '& .MuiInputLabel-root': {
    color: 'inherit',
    fontSize: '18px',
  },
})) as typeof TextField;

export const FormFieldError = styled(Typography)(({ theme }) => ({
  height: '20px',
  fontSize: '14px',
  paddingBottom: '8px',
  color: theme.palette.info.main,
})) as typeof Typography;

export const WhiteButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  fontSize: '14px',
  color: theme.palette.primary.main,
  fontWeight: 700,
  ':hover': {
    backgroundColor: '#e1edef',
  },
  ':disabled': {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
})) as typeof Button;

export const MyMenuItem = styled(MenuItem)(({ theme }) => ({
  fontSize: '14px',
  color: theme.palette.primary.main,
  fontWeight: 700,
  textTransform: 'uppercase',
  ':hover': {
    backgroundColor: '#e1edef',
  },
})) as typeof MenuItem;
