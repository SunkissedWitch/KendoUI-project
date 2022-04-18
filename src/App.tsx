import React, { useState, createContext } from 'react';
import '@progress/kendo-theme-default/dist/all.css';
import './App.css';
import Home from './components/users-list/Home';
import UserDetail from './components/users-list/UserDetail';
import UsersStore from './stores/main';
import { NoMatch } from './components/users-list/NoMatch';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

export const StoreContext = createContext({});

function App () {

  return (
    <StoreContext.Provider value={new UsersStore()}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path='/detail/:user' element={<UserDetail />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </BrowserRouter>
    </StoreContext.Provider>
  )

}

export default App;