import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import ThemeProvider from "@material-ui/styles/ThemeProvider";


const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#9c27b0',
        },
        secondary: {
            main: '#145647'
        }
    }
});

ReactDOM.render(<ThemeProvider theme={theme}> <App/> </ThemeProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
