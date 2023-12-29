import React, { useState , useEffect } from 'react';
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
import Cart from './pages/ViewCart/ViewCart'
import Fav from "./pages/Fav/Fav"
import ShowGame from './pages/ShowGames/ShowGame';
import Event from './pages/Event/event';
import EventShow from './pages/EventShow/EventShow';
import CreatorPage from './pages/CreatorPage/CreatorPage';
import Banplayer from './pages/banplayer/Banplayer';
import Bancreator from './pages/bancreator/Bancreator';
import Createpost from './pages/CreatePost/Createpost';
import Postslist from './pages/Postslist/Postslist'
import Postpage from './pages/Postpage/Postpage';
import ShowCreator from './pages/ShowCreator/ShowCreator';
import GameProfile from './pages/GamePage/GameProfile';
function App() {
  console.log(localStorage.getItem("Email"))
  const [posts,setPosts] = useState([])

  useEffect (() => {
    const fetchPosts = async () => {
      const res = await fetch('http://localhost:3000/post/getall')
      const data = await res.json()
      setPosts(data)
    };

    fetchPosts();

    
  },[]);


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
        <Route path='/Banplayer'element={<Banplayer/>}>
        </Route>
        <Route path='/Bancreator'element={<Bancreator/>}>
        </Route>
        <Route path='/Createpost'element={<Createpost/>}>
        </Route>
        <Route path='/Postlist' element={<Postslist posts = {posts} />}>
        </Route>
        {posts.map((post) => (
          <Route key={post.PostID} path= {`/Post/${post.PostID}`} element={<Postpage id={post.PostID} posts={posts}/>}>
          </Route>
        ))}
        <Route path='/CreateAdv'element={<AddAdv/>}>
        </Route>
        <Route path='/ShowCompany'element={<ShowCompany/>}>
        </Route>
        <Route path='/MyCart'element={<Cart/>}>
        </Route>
        <Route path='/MyFav'element={<Fav/>}>
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
        <Route path='/gameProfile/:gameName'element={<GameProfile/>}>
        </Route>
        <Route path='/ShowCreator/:email'element={<ShowCreator/>}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;