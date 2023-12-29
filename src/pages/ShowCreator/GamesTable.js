// GamesTable.js

import React from 'react';
import './GamesTable.css'; // Import the CSS file for styling
import Game from './Game';

const GamesTable = ({ games, title }) => {
  return (
    <div className="game-list-container">
      <h1 className="game-list-header">{title}</h1>
      <div className="game-list">
        {games.map((game, index) => (
          <Game
            key={index}
            Name={game.Name}
            image={game.image}
            Price={game.Price}
          />
        ))}
      </div>
    </div>
  );
};

export default GamesTable;
