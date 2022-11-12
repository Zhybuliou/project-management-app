import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#4D628B',
    },
    secondary: {
      main: '#FF6584',
    },
    background: {
      default: '#4d628b',
      paper: '#ffffff',
    },
    text: {
      primary: '#4d628b',
      secondary: '#ffffff',
    },
    action: {
      hoverOpacity: 0.2,
      disabled: '',
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        maxWidthXl: 1440,
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          background: '#ffffff',
          fontSize: '14px',
          color: '#4d628b',
          fontWeight: 700,
          ':hover': {
            backgroundColor: '#e1edef',
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
          background: '#ffffff',
          fontSize: '14px',
          color: '#4d628b',
          fontWeight: 700,
          textTransform: 'uppercase',
          ':hover': {
            backgroundColor: '#e1edef',
          },
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          fill: '#4d628b',
          width: '20px',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: '14px',
          color: '#4d628b',
          fontWeight: 700,
          textTransform: 'uppercase',
        },
      },
    },
  },
});
