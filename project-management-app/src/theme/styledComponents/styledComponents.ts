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

export const PopupField = styled(FormField)(({ theme }) => ({
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.main,
  },
  '& .MuiOutlinedInput-root': {
    color: theme.palette.primary.main,
    '&:hover fieldset': {
      border: '2px solid ' + theme.palette.primary.main,
    },
  },
  '& .MuiInputLabel-root': {
    color: theme.palette.primary.main,
    fontSize: '18px',
  },
})) as typeof FormField;

export const FormFieldError = styled(Typography)(({ theme }) => ({
  height: '18px',
  fontSize: '14px',
  paddingBottom: '8px',
  fontWeight: 500,
  textAlign: 'center',
  color: theme.palette.info.main,
  [theme.breakpoints.up('sm')]: {
    fontSize: '14px',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '9px',
  },
})) as typeof Typography;

export const WhiteButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  fontSize: '14px',
  color: theme.palette.primary.main,
  fontWeight: 700,
  ':hover': {
    backgroundColor: '#e1edef',
    cursor: 'pointer',
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

export const Title = styled(Typography)(({ theme }) => ({
  padding: '25px 10px 25px 10px',
  textTransform: 'uppercase',
  fontWeight: 700,
  letterSpacing: '0.4px',
  textAlign: 'center',
  margin: '0 auto',
  [theme.breakpoints.up('lg')]: {
    fontSize: '3.5rem',
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '3rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '2rem',
  },
})) as typeof Typography;

export const PopupTitle = styled(Title)(({ theme }) => ({
  textTransform: 'lowercase',
  padding: 0,
  ':first-letter': {
    textTransform: 'uppercase',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2rem',
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '1.75rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.5rem',
  },
})) as typeof Title;

export const SubTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  letterSpacing: '0.4px',
  textAlign: 'center',
  margin: '0 auto',
  maxWidth: theme.breakpoints.values.xl,
  [theme.breakpoints.up('lg')]: {
    fontSize: '2rem',
    padding: '0 10px 150px 10px',
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '1.75rem',
    padding: '0 10px 50px 10px',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.5rem',
    padding: '0 10px 10px 10px',
  },
})) as typeof Typography;

export const Text = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 400,
  [theme.breakpoints.up('lg')]: {
    fontSize: '1.25rem',
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '1rem',
  },
})) as typeof Typography;
