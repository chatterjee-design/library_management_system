import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './Redux/store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter basename="/">
  <Provider store={store}>
    <App />
    <Toaster/>
    </Provider>
  </BrowserRouter>,
)
