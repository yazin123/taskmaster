import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6366F1', // Indigo
      light: '#818CF8',
      dark: '#4F46E5',
      contrastText: '#fff',
    },
    secondary: {
      main: '#EC4899', // Pink
      light: '#F472B6',
      dark: '#DB2777',
      contrastText: '#fff',
    },
    background: {
      default: '#F9FAFB',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1F2937',
      secondary: '#6B7280',
    },
    success: {
      main: '#10B981',
      light: '#34D399',
      dark: '#059669',
    },
    warning: {
      main: '#F59E0B',
      light: '#FBBF24',
      dark: '#D97706',
    },
    error: {
      main: '#EF4444',
      light: '#F87171',
      dark: '#DC2626',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
    button: {
      fontWeight: 500,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    'none',
    '0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)',
    '0px 2px 4px rgba(0, 0, 0, 0.06), 0px 4px 6px rgba(0, 0, 0, 0.1)',
    '0px 4px 8px rgba(0, 0, 0, 0.06), 0px 8px 16px rgba(0, 0, 0, 0.1)',
    '0px 6px 12px rgba(0, 0, 0, 0.06), 0px 12px 24px rgba(0, 0, 0, 0.1)',
    '0px 8px 16px rgba(0, 0, 0, 0.06), 0px 16px 32px rgba(0, 0, 0, 0.1)',
    // ... rest of the default shadows
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
          boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
        },
        containedPrimary: {
          '&:hover': {
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)',
        },
      },
    },
  },
});

export default theme;