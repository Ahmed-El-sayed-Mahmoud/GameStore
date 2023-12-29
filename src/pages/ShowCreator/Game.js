// GameComponent.js

import React from 'react';
import '../CreatorPage/css/game_component.css';

const Game = ({ Name, image, Price }) => {
  return (
    <div className="game-card">
      <a href={`/gameProfile/${Name}`}><img src={image} alt={Name} className="game-image" /></a>
      <div className="game-details">
        <h2 className="game-name">{Name}</h2>
        <p className="game-price">${Price}</p>
      </div>
    </div>
  );
};

export default Game;
