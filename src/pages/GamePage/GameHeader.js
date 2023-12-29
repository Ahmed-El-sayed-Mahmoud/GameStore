// GameHeader.js

import React from 'react';
import { Link } from 'react-router-dom';
import './GameHeader.css';

const GameHeader = ({ name, avgRating, image, creatorName,creatorEmail }) => {
  return (
    <div className="game-header-container">
      <div className="game-header">
        <div className="game-info">
          <img src={image} alt={name} className="game-header-image" />
          <div className="game-details">
            <h2>{name}</h2>
            <div className="star-rating">
              {Array.from({ length: Math.ceil(avgRating) }).map((_, index) => (
                <span key={index} className="star">&#9733;</span>
              ))}
            </div>
          </div>
        </div>
        <div className="created-by">
          Created by: <Link to={`/ShowCreator/${creatorEmail}`}>{creatorName}</Link>
        </div>
      </div>
    </div>
  );
};

export default GameHeader;
