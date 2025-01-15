import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Search from "../../assets/images/search.png";
import Map from "../mapComponents/Map";
import { useFilterData } from "../../../routes/FilterDataContext";

function HeroMap() {
  const navigate = useNavigate();
  const { providers, locations } = useFilterData();

  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const searchInputRef = useRef(null);

  // Handle input change to filter suggestions
  const handleInputChange = (e) => {
    const value = e.target.value.toLowerCase();
    if (value.length > 2) {
      const locationSuggestions = locations
        .filter((location) => location.location.toLowerCase().includes(value))
        .map((location) => location.location);
      const providerSuggestions = providers
        .filter((provider) => provider.provider.toLowerCase().includes(value))
        .map((provider) => provider.provider);
      setSearchSuggestions([...locationSuggestions, ...providerSuggestions]);
    } else {
      setSearchSuggestions([]);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    searchInputRef.current.value = suggestion;
    setSearchSuggestions([]);
  };

  // Handle form submission to navigate to map page
  const handleSubmit = async (e) => {
    e.preventDefault();
    const searchValue = searchInputRef.current.value;
    navigate(`/map?query=${encodeURIComponent(searchValue)}`);
  };

  return (
    <>
      {/* Map container */}
      <div className="relative h-80 md:w-[40%] mt-8 md:mt-0">
        <Map minimap={true} />
        {/* Small search bar in the top left corner */}
        <div className="absolute top-4 left-4 w-72 flex flex-col md:map-buttons-size:flex-row map-buttons-size:items-center map-buttons-size:space-x-4">
          <form onSubmit={handleSubmit} className="relative w-full">
            <input
              type="text"
              name="query"
              placeholder="Search"
              ref={searchInputRef}
              onChange={handleInputChange}
              className="w-full py-1 pl-10 pr-4 text-white rounded-full bg-searchBarBg focus:outline-none focus:ring-2 focus:ring-searchBarSelected shadow-inner-lg font-Roboto"
            />
            <button
              type="submit"
              id="searchButton"
              name="submitbutton"
              className="absolute left-1 h-5 w-5 mt-1.5  text-gray-400 font-Roboto"
            >
              <img
                src={Search}
                alt="Search Icon"
                className="h-full w-full ml-2 transform transition-transform duration-200 hover:scale-125 hover:brightness-150"
              />
            </button>
            {searchSuggestions.length > 0 && (
              <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
                {searchSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </form>
          <Link
            to="/map"
            className="mt-4 map-buttons-size:mt-0 w-fit py-1.5 px-7 text-sm text-white rounded-full bg-gradient-to-b from-darkerBlue to-darkBlue font-Roboto whitespace-nowrap transform transition-transform duration-200 hover:scale-110 hover:brightness-150"
          >
            Open Map
          </Link>
        </div>
      </div>
    </>
  );
}

export default HeroMap;
