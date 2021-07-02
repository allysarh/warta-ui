import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk'
import { Reducers } from './reducer';
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'primereact/resources/themes/fluent-light/theme.css'
// import 'react-open-weather/lib/css/ReactWeather.css';

const globalStore = createStore(Reducers, {}, composeWithDevTools(applyMiddleware(ReduxThunk)))

ReactDOM.render(
  <Provider store={globalStore}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
