import React, { useState } from 'react';
import '@progress/kendo-theme-default/dist/all.css';
import './App.css';
import Home from './components/users-list/Home';


import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


function App () {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path='/detail/:user' />
        </Routes>
      </BrowserRouter>
    </>
  )

}

export default App;