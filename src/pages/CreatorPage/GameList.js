// GameList.js

import React from 'react';
import GameComponent from './GameComponent';
import './css/game_list.css';

const GameList = ({ games, title, onDelete ,onAddBack,deleted }) => {
  const handleDelete = (gameName) => {
    // Call the onDelete prop to handle the deletion
    onDelete(gameName);
  };
  const handleAddBack = (name) => {
    onAddBack(name);
  };
  console.log(games);
  return (
    <div className={`game-list-container ${deleted?'deleted': ''}`}>
      <h1 className="game-list-header">{title}</h1>
      <div className="game-list">
    {games.length>0?games.map((game, index) => (
          <GameComponent
            key={index}
            name={game.Name}
            image={game.image}
            price={game.Price}
            onDelete={handleDelete}
            onAddBack={handleAddBack}
            deleted={deleted}
          />
        )):<p>No Games to Show</p>}
      </div>
    </div>
  );
};

export default GameList;
