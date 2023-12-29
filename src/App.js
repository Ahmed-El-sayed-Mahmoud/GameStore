import React from 'react';

import Login from './pages/Login/Login';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
<<<<<<< Updated upstream
import Home from "./pages/home/home";
=======
import Home from"../src/pages/home/home"
>>>>>>> Stashed changes
import SignUp from './pages/SignUp/SignUp';
import AddCompany from './pages/AddCompany/Company';
import AddAdv from './pages/AddAd/Ad';
import ShowCompany from './pages/ShowAllCompany/ShowCompany';
import ShowAdv from './pages/ShowAdv/ShowAdv';
import Ad from './pages/Ad/Ad';
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
        <Route path='/CreateCompany'element={<AddCompany/>}>
        </Route>
        <Route path='/CreateAdv'element={<AddAdv/>}>
        </Route>
        <Route path='/ShowCompany'element={<ShowCompany/>}>
        </Route>
        <Route path='/ShowADv'element={<ShowAdv/>}>
        </Route>
        <Route path='/Ad'element={<Ad/>}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
