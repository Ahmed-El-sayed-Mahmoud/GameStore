import React from 'react';

import Login from './pages/Login/Login';
import "../src/App.css"
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home/home'
import SignUp from './pages/SignUp/SignUp';
import { useEffect } from 'react';

function App() {

  return (
    <BrowserRouter>
      <Routes>
      <Route exact path='/'element={<Home/>}></Route>
        <Route path='/Login'element={<Login/>}>
        </Route>
        <Route path='/Signup'element={<SignUp/>}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
