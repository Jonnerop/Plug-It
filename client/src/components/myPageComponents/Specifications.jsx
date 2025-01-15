import React, { useEffect, useState } from "react";
import Car from "../../assets/images/tesla_car.png";
import Charger from "../../assets/images/Tesla.png";
import { chargerTypes, chargerPowers, serviceProviders } from "./selectOptions";
import { useAuth } from "../../../routes/AuthProvider";
import Find from "../../assets/images/find_me.png";
import { Link } from "react-router-dom";
import useFetch from "./myPageHooks/useFetch";

function Specifications() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const { user } = useAuth();

  const { reviews } = useFetch();

  // Render stars based on the rating
  const renderStars = (rating) => (
    <span className="text-yellow-400">
      {"★".repeat(rating)}
      {"☆".repeat(5 - rating)}
    </span>
  );

  useEffect(() => {
    if (user) {
      setName(user.username);
      setEmail(user.email);
      setLocation(user.location);
    }
  }, [user]);

  return (
    <div className="flex flex-col lg:flex-row justify-center gap-4 lg:gap-7 p-4 mb-12">
      {/* Main specifications section */}
      <div className="flex flex-col main-spec:flex-row bg-gradient-to-b from-darkerBlue to-darkBlue rounded-md gap-4 p-4 w-fit mx-auto lg:mx-0">
        {/* Left side car spec and filters */}
        <div className="flex flex-col space-y-4">
          <div className="p-5 text-left text-white bg-myPageBlue rounded-md">
            <h1 className="text-base font-Orbitron">Tesla</h1>
            <h2 className="text-base font-Orbitron">Model Y</h2>
            <img
              src={Charger}
              alt="Tesla Charger"
              className="h-10 max-w-xs ml-2 mt-1"
            />
          </div>

          {/* Map filters section */}
          <div className="text-base font-Orbitron text-white bg-myPageBlue p-4 pb-20 rounded-md h-full">
            <h3 className="mb-2 text-salmonRed">Map Filters</h3>

            <div className="mb-4">
              <label className="block mb-1">Charger Type</label>
              <select className="w-full p-2 bg-mediumBlue text-white rounded-md bg-no-repeat bg-[calc(100%-1rem)_center] bg-[length:1.25rem_1.25rem] bg-dropdownArrow appearance-none hover:bg-myPageBlue hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500">
                {chargerTypes.map((type, index) => (
                  <option key={index}>{type}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block mb-1">Charger Power (kW)</label>
              <select className="w-full p-2 bg-mediumBlue text-white rounded-md bg-no-repeat bg-[calc(100%-1rem)_center] bg-[length:1.25rem_1.25rem] bg-dropdownArrow appearance-none hover:bg-myPageBlue hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500">
                {chargerPowers.map((power, index) => (
                  <option key={index}>{power}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1">Service Provider</label>
              <select className="w-full p-2 bg-mediumBlue text-white rounded-md bg-no-repeat bg-[calc(100%-1rem)_center] bg-[length:1.25rem_1.25rem] bg-dropdownArrow appearance-none hover:bg-myPageBlue hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500">
                {serviceProviders.map((provider, index) => (
                  <option key={index}>{provider}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Right side car image */}
        <div className="bg-myPageBlue pb-20 flex flex-col items-center relative rounded-b-md">
          <img
            src={Car}
            alt="Tesla Model X"
            className="h-auto w-60 rounded-t-md"
          />
          <div className="absolute bottom-10 flex flex-col items-center">
            <Link to="/map">
              <img
                src={Find}
                alt="Locate Me"
                className="w-16 h-16 cursor-pointer hover:scale-105 transition-transform"
                onClick={() => console.log("Locate button clicked")} // locate logic here
              />
            </Link>
            <span className="text-white font-semibold mt-2 font-Roboto">
              Locate Me
            </span>
          </div>
        </div>
      </div>

      {/* Reviews and profile Section */}
      <div className="flex flex-col gap-4 lg:items-start items-center">
        {/* Reviews Section */}
        {/* Reviews Section */}
        <div className="bg-gradient-to-b from-darkerBlue to-darkBlue text-white rounded-md p-4 w-80 h-96 flex flex-col">
          <h2 className="p-3 text-lg font-Orbitron text-eGreen rounded-md pl-4 sticky top-0 z-10">
            My Reviews
          </h2>
          <div className="flex-1 overflow-y-scroll space-y-4 scrollbar-thin scrollbar-thumb-darkBlue scrollbar-track-mediumBlue">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="p-3 pl-4 bg-myPageBlue rounded-md h-24 overflow-y-scroll scrollbar-thin scrollbar-thumb-darkBlue scrollbar-track-mediumBlue"
              >
                <p className="text-sm">{review.text}</p>
                <div>{renderStars(review.rating)}</div>
                <p className="text-sm">
                  {review.stationTitle || "Station N/A"}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Profile section */}
        <div className="bg-gradient-to-b from-darkerBlue to-darkBlue text-white rounded-md shadow-md px-4 py-3 w-80">
          <h3 className="text-sm font-Orbitron mb-2 font-bold pl-1 border-b border-myPageBlue pb-1">
            Profile Information
          </h3>
          <div className="space-y-1 bg-myPageBlue p-3 rounded-md">
            <div className="flex items-center justify-start space-x-2">
              <span className="font-bold text-sm font-Roboto">Name:</span>
              <span className="text-xs font-Roboto">{name}</span>
            </div>
            <div className="flex items-center justify-start space-x-2">
              <span className="font-bold text-sm font-Roboto">Email:</span>
              <span className="text-xs font-Roboto break-all">{email}</span>
            </div>
            <div className="flex items-center justify-start space-x-2">
              <span className="font-bold text-sm font-Roboto">Location:</span>
              <span className="text-xs font-Roboto">{location}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Specifications;
