import React from 'react'
import Header from '../home/components/header'
import CreatorProfile from '../CreatorPage/CreatorProfile'
import GamesTable from './GamesTable'
import { useParams } from 'react-router-dom';
import  { useEffect, useState } from 'react';
const ShowCreator = () => {
    const{email}=useParams();
    const [creatorData,setCreatorData]=useState([]);
    const [gamesData, setGamesData] = useState([]);
    useEffect(()=>
    {
      console.log(email);
        const getCreatorData=async()=>
        {
            const response = await fetch("http://localhost:3000/creator/CreatorInfo",{
                method:'POST',
                headers:{
                  'Content-Type':'application/json'
                },
                body:JSON.stringify({
                  Email:email,
                }),
              })
              const info= await response.json();
              setCreatorData(info[0]);
              console.log(info[0]);
              return info;
        }
        const getCreated= async()=>
    {
    const response = await fetch("http://localhost:3000/creator/Created",{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          Email:email,
        }),
      })
    const games= await response.json(); 
    setGamesData(games);
    }
        getCreatorData();
        getCreated();
    },[])
   
    
    
  return (
    <div>
      <Header/>
      <CreatorProfile {...creatorData}/>
      <GamesTable games={gamesData} title="Created by this Creator"/>
    </div>
  )
}

export default ShowCreator
