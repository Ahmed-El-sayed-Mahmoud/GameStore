// Review.js

import React from 'react';
import './Review.css';

const Review = ({ playerName, playerImage, rating, reviewComment, reviewDate }) => {
  return (
    <div className="review">
      <div className="player-info">
        <img src={playerImage} alt={playerName} className="player-image" />
        <div className="player-details">
          <h4>{playerName}</h4>
          <div className="star-rating">
            {Array.from({ length: Math.ceil(rating) }).map((_, index) => (
              <span key={index} className="star">&#9733;</span>
            ))}
          </div>
        </div>
      </div>
      <p className="review-comment">{reviewComment}</p>
      <p className="review-date">Reviewed on {reviewDate}</p>
    </div>
  );
};

export default Review;
