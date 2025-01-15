import React from "react";
import { reviews } from "./reviewData.js";
import Review from "./Review.jsx";

function ReviewList() {
  return (
    <div className="flex flex-col align-middle md:max-w-[40%] bg-gradient-to-b from-darkerBlue to-darkBlue rounded-md mx-10 py-3 shadow-xl shadow-lightGreen">
      {reviews.map((review) => {
        return <Review key={review.id} {...review} />;
      })}
    </div>
  );
}

export default ReviewList;
