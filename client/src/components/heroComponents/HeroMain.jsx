import React, { useState } from "react";
import { Link } from "react-router-dom";
import ArrowLeft from "../../assets/images/expand_left_2.png";
import ArrowRight from "../../assets/images/expand_right_2.png";

function HeroMain() {
  const bgClasses = [
    "bg-herocar",
    "bg-herofind",
    "bg-herocharge",
    "bg-herogreen",
  ];

  const titles = [
    { main: "Find.", secondary: "Charge. Go Green." },
    { main: "Discover.", secondary: "New Adventures." },
    { main: "Charge.", secondary: "Anywhere, Anytime." },
    { main: "Go Green.", secondary: "For a Better Future." },
  ];

  const bgPositionByClass = {
    "bg-herocar": "right 15% center",
    "bg-herofind": "left 10% top 20%",
    "bg-herocharge": "right 15% center",
    "bg-herogreen": "left 5% bottom 10%",
  };

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleLeftClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + bgClasses.length) % bgClasses.length);
  };

  const handleRightClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % bgClasses.length);
  };

  return (
    <>
      {/* Main hero component */}
      <div
        className={`flex flex-col ${bgClasses[currentIndex]} bg-cover h-80 md:w-[60%]`}
        style={{ backgroundPosition: bgPositionByClass[bgClasses[currentIndex]] }}
      >
        {/* Main title container */}
        <div className="flex bg-opacity-70 py-4 bg-heroTitleBg text-center md:text-left">
          <h2 className="text-4xl md:ml-24 font-medium font-Orbitron tracking-wider w-full">
            <span className="text-white">{titles[currentIndex].main}</span>{" "}
            <span className="text-eGreen">{titles[currentIndex].secondary}</span>
          </h2>
        </div>

        {/* Arrow buttons container */}
        <div className="flex justify-between items-center h-full">
          {/* Left arrow */}
          <button
            onClick={handleLeftClick}
            className="ml-10 hover:bg-eGreen transition duration-300 p-2 rounded-full"
          >
            <img src={ArrowLeft} alt="Left Arrow" className="h-10 w-10" />
          </button>

          {/* Spacer */}
          <div className="flex-1"></div>

          {/* Right arrow */}
          <button
            onClick={handleRightClick}
            className="mr-10 hover:bg-eGreen transition duration-300 p-2 rounded-full"
          >
            <img src={ArrowRight} alt="Right Arrow" className="h-10 w-10" />
          </button>
        </div>

        {/* Sign up button container */}
        <div className="flex mx-auto md:justify-start md:mx-0 mb-12">
          <Link
            to="/registration"
            className="md:ml-24 bg-eGreen py-2 px-12 rounded-lg hover:bg-darkGreen hover:text-white transition duration-500 font-bold text-2xl font-Roboto"
          >
            Sign Up Here
          </Link>
        </div>
      </div>
    </>
  );
}

export default HeroMain;
