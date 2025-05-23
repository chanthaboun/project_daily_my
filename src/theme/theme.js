// src/theme/theme.js
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

// ສ້າງ theme ພື້ນຖານ
let theme = createTheme({
    palette: {
        primary: {
            main: '#3498db',
            light: '#5dade2',
            dark: '#2980b9'
        },
        secondary: {
            main: '#2c3e50',
            light: '#34495e',
            dark: '#1a252f'
        },
        error: {
            main: '#e74c3c',
        },
        background: {
            default: '#f9f9f9',
            paper: '#ffffff'
        },
    },
    typography: {
        fontFamily: "'Noto Sans Lao', 'Roboto', 'Arial', sans-serif",
        h1: {
            fontSize: '2.5rem',
            fontWeight: 500,
            color: '#2c3e50',
            marginBottom: '1.5rem',
            paddingBottom: '0.5rem',
            borderBottom: '2px solid #3498db',
            textAlign: 'center',
            [breakpoints => breakpoints.down('sm')]: {
                fontSize: '1.8rem',
            },
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 500,
            color: '#2c3e50',
            [breakpoints => breakpoints.down('sm')]: {
                fontSize: '1.5rem',
            },
        },
        h3: {
            fontSize: '1.5rem',
            fontWeight: 500,
            color: '#2c3e50',
            [breakpoints => breakpoints.down('sm')]: {
                fontSize: '1.2rem',
            },
        },
        h4: {
            fontSize: '1.3rem',
            fontWeight: 500,
            color: '#2c3e50',
        },
        body1: {
            fontSize: '1rem',
            [breakpoints => breakpoints.down('sm')]: {
                fontSize: '0.9rem',
            },
        },
        body2: {
            fontSize: '0.875rem',
            color: 'rgba(0, 0, 0, 0.7)',
        },
    },
    components: {
        MuiTableCell: {
            styleOverrides: {
                head: {
                    backgroundColor: '#3498db',
                    color: 'white',
                    fontWeight: 'bold',
                    [breakpoints => breakpoints.down('sm')]: {
                        padding: '8px',
                        fontSize: '0.8rem',
                    },
                },
                root: {
                    [breakpoints => breakpoints.down('sm')]: {
                        padding: '8px',
                        fontSize: '0.8rem',
                    },
                },
            },
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    fontSize: '1rem',
                    [breakpoints => breakpoints.down('sm')]: {
                        fontSize: '0.8rem',
                        minWidth: 'auto',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                        transform: 'translateY(-2px)',
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontWeight: 500,
                },
            },
        },
        MuiBottomNavigation: {
            styleOverrides: {
                root: {
                    backgroundColor: '#3498db',
                },
            },
        },
        MuiBottomNavigationAction: {
            styleOverrides: {
                root: {
                    color: 'rgba(255, 255, 255, 0.7)',
                    '&.Mui-selected': {
                        color: 'white',
                    },
                },
                label: {
                    fontSize: '0.7rem',
                    '&.Mui-selected': {
                        fontSize: '0.7rem',
                    },
                },
            },
        },
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920,
        },
    },
});

// ເຮັດໃຫ້ຂະໜາດຕົວອັກສອນປັບຕາມຂະໜາດໜ້າຈໍ
theme = responsiveFontSizes(theme);

export default theme;