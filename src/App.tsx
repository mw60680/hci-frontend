import React from 'react';
import { CssBaseline, ThemeProvider, useTheme } from '@mui/material';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import MyRoutes from './routes/MyRoutes';
import store from './store';
import createTheme from './theme';

const App: React.FC = () => {
  const theme = useTheme();
  return (
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider theme={createTheme(theme)}>
          <CssBaseline />
          <MyRoutes />
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
