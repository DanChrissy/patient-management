import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import {store} from '../src/store';
import persistStore from 'redux-persist/es/persistStore';
import { PersistGate } from 'redux-persist/integration/react';


const persistedStore = persistStore(store);

ReactDOM.render(
  
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistedStore}>
        <React.StrictMode>
          <App />
         </React.StrictMode>
      </PersistGate>
     
    </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
