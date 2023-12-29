// GameProfile.js
import {  Link } from "react-router-dom"
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './GameProfile.css'; // Import the CSS file
import GameHeader from "./GameHeader";
import Header from "../home/components/header";
import GameDetailsSection from "./GameDetailsSection";
const GameProfile = () => {
    const { gameName } = useParams();
  const [gameData, setGameData] = useState([]);
  const [creatorData,setCreatorData]=useState([]);
  useEffect(() => {
    const getGameData=async()=>
    {
        const response = await fetch("http://localhost:3000/game/GameInfo",{
            method:'POST',
            headers:{
              'Content-Type':'application/json'
            },
            body:JSON.stringify({
              name:gameName,
            }),
          })
          const data= await response.json();
          setGameData(data[0]);
    }
    getGameData();
  }, [gameName]);
  useEffect(() => {
  const getCreatorData=async()=>
  {
      console.log(gameData.cemail);
      const response = await fetch("http://localhost:3000/creator/CreatorInfo",{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify({
            Email:gameData.cemail,
          }),
        })
        const info= await response.json();
        setCreatorData(info[0]);
        console.log(gameData);
        return info;
  }
  if(gameData.cemail)
  getCreatorData();
},[gameData])
  if (!creatorData) {
    // Loading state
    return <div className="loading">Loading...</div>;
  }


    
  return (
    <div>
      <Header/>
      <GameHeader name={gameData.Name} avgRating={gameData.AVGRating} image={gameData.image} creatorName={creatorData.FNAME+" "+creatorData.LNAME} creatorEmail={gameData.cemail} />
      <GameDetailsSection description={gameData.description} gName={gameName}/>
    </div>
  );
};

export default GameProfile;
