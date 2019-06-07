import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'antd/dist/antd.css';
import './styles.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import registerServiceWorker from './registerServiceWorker';

import ScreensContainer from './containers/ScreensContainer';

import configureStore from './configureStore';
const store = configureStore();
store.dispatch({type: 'INIT'});

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider >
      <ScreensContainer />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
