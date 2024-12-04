import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ConnectedRouter } from 'connected-react-router';
import TagManager from 'react-gtm-module';
import configureStore, { history } from './Store/configureStore';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Component/scss/app.scss';
import App from './Component/App';

import * as serviceWorker from './serviceWorker';

const tagManagerArgs = {
  gtmId: process.env.REACT_APP_GTMID
}

TagManager.initialize(tagManagerArgs)

const store = configureStore();

ReactDOM.render(
  <Provider store={store.store}>
    <PersistGate loading={null} persistor={store.persistor}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
