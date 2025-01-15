import React from "react";
import lightning from "../../assets/images/lightning_pic2.png";

function PowerUp() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-mediumGreen to-purplish w-full text-center py-2 my-9 tracking-wide h-14">
      <div className="absolute flex space-x-96 items-center animate-scrollRight">
        <div className="flex items-center mx-80">
          <img src={lightning} alt="Lightning" className="mr-4 w-10 h-10" />
          <h2 className="text-white font-Orbitron text-xl whitespace-nowrap">
            Stay Powered Up with Real-Time Updates
          </h2>
          <img src={lightning} alt="Lightning" className="ml-4 w-10 h-10" />
        </div>
      </div>
    </div>
  );
}

export default PowerUp;
