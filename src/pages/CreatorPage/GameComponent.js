// GameComponent.js

import React from 'react';
import { FaTimes, FaUndo } from 'react-icons/fa';
import './css/game_component.css';

const GameComponent = ({ name, image, price, onDelete,onAddBack,deleted }) => {
  const handleDelete = () => {
    // Call the onDelete prop to handle the deletion
    onDelete(name);
  };
  const handleAddBack = () => {
    onAddBack(name);
  };

  return (
    <div className="game-card">
       {deleted ? (
        <span className="add-back-icon" onClick={handleAddBack}>
          <FaUndo />
        </span>
      ) : (
        <span className="delete-icon" onClick={handleDelete}>
          <FaTimes />
        </span>
      )}
      <img src={image} alt={name} className="game-image" />
      <div className="game-details">
        <h2 className="game-name">{name}</h2>
        <p className="game-price">${price}</p>
      </div>
    </div>
  );
};

export default GameComponent;
