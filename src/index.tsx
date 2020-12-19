import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import { configureStore } from './store';

import App from './components/App';

import { CssBaseline, ThemeProvider, createMuiTheme } from '@material-ui/core';


const theme = createMuiTheme({
  palette: {
    type: 'dark'
  }
})

const { store } = configureStore()

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <App />
      </ThemeProvider>  
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
