import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {App,App2, App3} from './App';
import {BrowserRouter} from 'react-router-dom'

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
  <BrowserRouter basename="/NewApp">
  <App/>

  </BrowserRouter>
 {/* <Login/> */}
  {/* <App2>
  </App2>
  <App3 name='akbar alauddin sb' age={17}>
    <h2>itischildren</h2>
  </App3> */}
  {/* <div>
    <h1>This is sidebar</h1>
  </div>
  <footer>
    <h1>This is footer</h1>
  </footer> */}
 </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
