import React from 'react';
import Navbar from './Navbar';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    secondary: {
      main: '#f44336',
    },
  },
});

const Layout = ({ children, username }) => {
  return (
    <ThemeProvider theme={theme}>
      <Navbar username={username} />
      <main>
        {children}
      </main>
    </ThemeProvider>
  );
};

export default Layout;
