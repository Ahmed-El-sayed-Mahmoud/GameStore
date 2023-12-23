import React from 'react';

import Login from './pages/Login/Login';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from"../src/pages/Home/home"
import SignUp from './pages/SignUp/SignUp';
import AddCompany from './pages/AddCompany/Company';
import AddAdv from './pages/AddAd/Ad';
function App() {
  console.log(localStorage.getItem("Email"))
  return (
    <BrowserRouter>
      <Routes>
      <Route exact path='/'element={<Home/>}></Route>
        <Route path='/Login'element={<Login/>}>
        </Route>
        <Route path='/Signup'element={<SignUp/>}>
        </Route>
        <Route path='/CreateComapny'element={<AddCompany/>}>
        </Route>
        <Route path='/CreateAdv'element={<AddAdv/>}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
