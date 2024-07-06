import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import { Provider } from 'react-redux';
import store from "./redux/store";
import {BrowserRouter} from 'react-router-dom';











ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
    
    <App />
    </BrowserRouter>
  </Provider>,

)
