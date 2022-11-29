import { createTheme, ThemeOptions } from '@mui/material';

export const theme: ThemeOptions = createTheme({
  palette: {
    primary: {
      main: '#4D628B',
      light: '#ffffff',
    },
    secondary: {
      main: '#ffffff',
    },
    info: {
      main: '#FF6584',
    },
    action: {
      hoverOpacity: 0.2,
    },
  },
  typography: {
    fontFamily: 'Ubuntu',
  },
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltipArrow: {
          backgroundColor: '#ffffff',
          color: '#4D628B',
          fontSize: '16px',
          border: '0.5px solid #4D628B',
        },
      },
    },
  },
});
