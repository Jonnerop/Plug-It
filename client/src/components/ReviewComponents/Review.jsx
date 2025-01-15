import React from "react";
import star from "../../assets/images/star.png";

function Review({ img, name, text, stars }) {
  return (
    <div className="flex bg-mediumBlue rounded-lg p-2 pl-4 py-3 mx-6 my-1.5">
      <div className="flex items-center">
        <img src={img} alt={name} className="w-40 rounded-full" />
      </div>
      <div className="flex flex-col ml-4">
        <p className="text-white font-Roboto text-xs">
          {text}  {name}
        </p>
        <div className="flex mt-2 justify-end">
          {Array.from({ length: stars }, (_, index) => {
            return (
              <img key={index} src={star} alt="Star" className="w-4 h-4 mr-3" />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Review;
