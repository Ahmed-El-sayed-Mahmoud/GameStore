// ReviewList.js

import React from 'react';
import Review from './Review';

const ReviewList = ({ reviews }) => {
    console.log(reviews);
  return (
    <div>
       {reviews.length>0&&reviews.map((review) => (
        <Review
          playerName={review.fname+" "+review.Lname}
          playerImage={review.Image}
          rating={review.Rating}
          reviewComment={review.Reviewcomment}
          reviewDate={review.Revdate}
        />
      ))}
    </div>
  );
};

export default ReviewList;
