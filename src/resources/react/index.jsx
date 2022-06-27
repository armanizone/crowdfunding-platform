import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import {render} from 'react-dom';
import Home from './Home.jsx';

const Index = (
   <React.StrictMode>
      <BrowserRouter>
         <Home/>
      </BrowserRouter>
   </React.StrictMode>
);

render (
   Index,
   document.getElementById('root')
);
