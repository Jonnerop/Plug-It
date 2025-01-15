import React from "react";
import arrow from "../../assets/images/arrow_right.png";

function Process({ id, image, text }) {
  const arrowImg = arrow;

  return (
    <div className="flex flex-col items-center sm:flex-row my-3 text-sm gap-2">
      <div className="flex text-center items-center max-w-44">
        <p className="text-white font-Roboto text-base">{text}</p>
      </div>
      <div className="flex flex-col">
        <img src={image} alt={text} className="w-24 h-24" />
      </div>
      {id !== 4 && (
        <div className="flex items-center justify-center rotate-90 sm:rotate-0 mr-2">
          <img src={arrowImg} alt="Arrow" id="arrow-image" className="w-14 h-auto" />
        </div>
      )}
    </div>
  );
}

export default Process;
