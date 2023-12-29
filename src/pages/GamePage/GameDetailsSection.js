// GameDetailsSection.js

import React, { useState,useEffect } from 'react';
import './GameDetailsSection.css';
import ReviewList from './ReviewList';
const GameDetailsSection = ({ description, gName }) => {
  const [activeTab, setActiveTab] = useState('description');
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  const[Reviews,setReviews]=useState(null);
  useEffect( ()=> {
    const getReviews=async()=>
    {
        const response = await fetch("http://localhost:3000/game/GetReviews",{
            method:'POST',
            headers:{
              'Content-Type':'application/json'
            },
            body:JSON.stringify({
              name:gName,
            }),
          })
          const data= await response.json();
          setReviews(data[0]);
          console.log(data[0]);
          return data[0];
    }
    getReviews();
  }, []);
  console.log(description);
  const sampleReviews = [
    {
      fname: 'Lionel',
      Lname:'Messi',
      Image: 'https://i.pinimg.com/236x/85/22/57/852257f8e57d815f18b9fb79deeeb6bc.jpg',
      Rating: 4.5,
      Reviewcomment: 'Great game! Enjoyed the experience.',
      Revdate:'12/12/2023'
    },
  ];
  return (
    <div className="game-details-section">
      <div className="tab-navigation">
        <button
          className={activeTab === 'description' ? 'active' : ''}
          onClick={() => handleTabChange('description')}
        >
          Description
        </button>
        <button
          className={activeTab === 'reviews' ? 'active' : ''}
          onClick={() => handleTabChange('reviews')}
        >
          Reviews
        </button>
      </div>

      {activeTab === 'description' && (
        <div className="description-section">
          <p>{description}</p>
        </div>
      )}

      {activeTab === 'reviews' && (
        <div className="reviews-section">
          <ReviewList reviews={Reviews}/>
        </div>
      )}
    </div>
  );
};

export default GameDetailsSection;
