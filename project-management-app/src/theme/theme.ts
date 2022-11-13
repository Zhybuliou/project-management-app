import { createTheme } from '@mui/material';

const colors = {
  blue: '#4D628B',
  pink: '#FF6584',
  white: '#ffffff',
  snow: '#e1edef',
};

export const theme = createTheme({
  palette: {
    primary: {
      main: colors.blue,
    },
    secondary: {
      main: colors.white,
    },
    background: {
      default: colors.blue,
      paper: colors.white,
    },
    text: {
      primary: colors.white,
      secondary: colors.blue,
    },
    action: {
      hoverOpacity: 0.2,
      disabled: '',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          background: colors.white,
          fontSize: '14px',
          color: colors.blue,
          fontWeight: 700,
          ':hover': {
            backgroundColor: colors.snow,
          },
          ':disabled': {
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          background: colors.white,
          fontSize: '14px',
          color: colors.blue,
          fontWeight: 700,
          textTransform: 'uppercase',
          ':hover': {
            backgroundColor: colors.snow,
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: '14px',
          color: colors.blue,
          fontWeight: 700,
          textTransform: 'uppercase',
        },
      },
    },
  },
});
