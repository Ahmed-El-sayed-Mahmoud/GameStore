import React, { useState , useEffect } from 'react';

import Login from './pages/Login/Login';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import SignUp from './pages/SignUp/SignUp';
import AddCompany from './pages/AddCompany/Company';
import AddAdv from './pages/AddAd/Ad';
import ShowCompany from './pages/ShowAllCompany/ShowCompany';
import ShowAdv from './pages/ShowAdv/ShowAdv';
import Ad from './pages/Ad/Ad';
import Banplayer from './pages/banplayer/Banplayer';
import Bancreator from './pages/bancreator/Bancreator';
import Createpost from './pages/CreatePost/Createpost';
import Postslist from './pages/Postslist/Postslist'
import Postpage from './pages/Postpage/Postpage';
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
        <Route path='/ShowADv'element={<ShowAdv/>}>
        </Route>
        <Route path='/Ad'element={<Ad/>}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
