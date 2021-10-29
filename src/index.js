import React from 'react';
import ReactDOM from 'react-dom';
import Routers from "./Routers";
import './css/index.css';
require('dotenv').config({ path: '../.env' })

ReactDOM.render(
    <Routers />,
  document.getElementById('root')
);
