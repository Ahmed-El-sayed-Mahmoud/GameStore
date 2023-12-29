import React from 'react';
import Search from './pages/Search/Search'
import Login from './pages/Login/Login';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from"../src/pages/home/home"
import SignUp from './pages/SignUp/SignUp';
import AddCompany from './pages/AddCompany/Company';
import AddAdv from './pages/AddAd/Ad';
import ShowCompany from './pages/ShowAllCompany/ShowCompany';
import ShowAdv from './pages/ShowAdv/ShowAdv';
import Ad from './pages/Ad/Ad';
import ShowGame from './pages/ShowGames/ShowGame';
import Event from './pages/Event/event';
import EventShow from './pages/EventShow/EventShow';
import CreatorPage from './pages/CreatorPage/CreatorPage';
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
        <Route path='/Ad'element={<Ad/>}></Route>
        <Route path='/Search/:query?'element={<Search/>}>
        </Route>
        <Route path='/Games'element={<ShowGame/>}>
        </Route>
        <Route path='/Event'element={<Event/>}>
        </Route>
        <Route path='/ShowEvent'element={<EventShow/>}>
        </Route>
        <Route path='/CreatorPage'element={<CreatorPage/>}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;