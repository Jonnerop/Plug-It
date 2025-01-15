import { useState, useEffect, useRef } from "react";
import logo from "../../assets/images/logo.png";
import userCircle from "../../assets/images/user.png";
import menuIcon from "../../assets/images/menu.png";
import PageLinks from "./PageLinks";
import Search from "../../assets/images/search.png";
import { Link } from "react-router-dom";
import { useAuth } from "../../../routes/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { useFilterData } from "../../../routes/FilterDataContext";

function NavBar() {
  const { user, logOut } = useAuth();
  const { providers, locations } = useFilterData();
  const navigate = useNavigate();
  const location = useLocation();
  const searchInputRef = useRef(null);
  const [searchSuggestions, setSearchSuggestions] = useState([]);

  function capitalizeString(str) {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  const loginButton = (
    <Link to="/login">
      <button className="bg-gradient-to-r from-eGreen to-darkGreen py-2 px-6 nav-phone:px-12 rounded-full hover:bg-darkGreen hover:text-white transition-all duration-500 font-bold text-1xl font-Roboto">
        Log In
      </button>
    </Link>
  );
  const logoutButton = (
    <button
      onClick={logOut}
      className="bg-gradient-to-r from-eGreen to-darkGreen py-2 px-6 nav-phone:px-12 rounded-full hover:bg-darkGreen hover:text-white transition-all duration-500 font-bold text-1xl font-Roboto"
    >
      Log Out
    </button>
  );

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [logButton, setLogButton] = useState(loginButton);
  const [profilePic, setProfilePic] = useState(userCircle);

  useEffect(() => {
    if (user) {
      setLogButton(logoutButton);
      setProfilePic(user.picture || userCircle);
    } else {
      setLogButton(loginButton);
      setProfilePic(userCircle);
    }
  }, [user]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const searchValue = capitalizeString(searchInputRef.current.value);
    if (location.pathname !== "/map") {
      navigate("/map");
    }
    const query = "api/stations/customSearch?location=" + searchValue;
    const res = await fetch(query);
    const data = await res.json();
    console.log(data);
  };

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

  const handleSuggestionClick = (suggestion) => {
    searchInputRef.current.value = suggestion;
    setSearchSuggestions([]);
  };

  return (
    <div className="relative flex items-center justify-between px-4 py-2 bg-gradient-to-b from-darkerBlue to-darkBlue nav-phone:px-12">
      {/* Logo on the left */}
      <div className="flex items-center">
        <Link to={'/'}>
          <img src={logo} alt="Plug It company logo" className="h-10 w-auto" />
        </Link>
      </div>

      {/* Search bar visible only on medium and larger screens */}
      <div className="relative items-center w-1/4 mx-6 ml-6 hidden search-bar-bp:flex">
        <form className="flex" onSubmit={handleSubmit} name="SearchForm">
          <input
            type="text"
            id="searchQuery"
            name="query"
            placeholder="Search"
            ref={searchInputRef}
            onChange={handleInputChange}
            className="w-full py-1 pl-10 pr-4 text-white rounded-full bg-searchBarBg focus:outline-none focus:ring-2 focus:ring-searchBarSelected shadow-inner-lg font-Roboto"
          />
          <img
            src={Search}
            alt="Search Icon"
            className="absolute left-3 h-5 w-5 text-gray-400 font-Roboto mt-1.5"
          />
          <button
            type="submit"
            id="searchButton"
            name="submitbutton"
            className="bg-gradient-to-r from-eGreen to-darkGreen py-1 ml-3 nav-phone:px-6 rounded-full hover:bg-darkGreen hover:text-white transition-all duration-500 font-bold text-1xl font-Roboto"
          >
            Search
          </button>
        </form>
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
      </div>

      {/* Page links visible on medium and larger screens */}
      <div className="hidden md:flex items-center space-x-6 ml-auto">
        <PageLinks
          parentClass="flex space-x-6"
          itemClass="text-white hover:text-gray-300 transition duration-300 font-Roboto"
        />
        <a href="#user-profile">
          <img
            src={profilePic}
            alt="User profile"
            className="h-10 w-10 rounded-full"
          />
        </a>
      </div>

      {/* User icon, log in button, and menu icon */}
      <div className="flex items-center space-x-4 sm:space-x-6 md:space-x-8">
        <div className="md:hidden">
          <img
            src={Search}
            alt="Search icon"
            className="h-8 w-auto cursor-pointer"
            onClick={toggleSearch}
          />
        </div>
        <button onClick={toggleMenu} className="md:hidden">
          <img src={menuIcon} alt="Menu icon" className="h-8 w-auto" />
        </button>
        {logButton}
      </div>

      {/* Conditional rendering of search bar */}
      {searchOpen && (
        <div className="absolute top-full left-0 w-full bg-gradient-to-b from-darkerBlue to-darkBlue p-4 md:hidden z-10">
          <form onSubmit={handleSubmit} name="SearchForm">
            <input
              type="text"
              id="searchQuery"
              name="query"
              placeholder="Search for locations and providers"
              onChange={handleInputChange}
              ref={searchInputRef}
              className="w-full py-2 px-4 text-white rounded-full pl-10 bg-searchBarBg focus:outline-none focus:ring-2 focus:ring-searchBarSelected shadow-inner-lg font-Roboto"
            />
            <button
              type="submit"
              id="searchButton"
              name="submitbutton"
              className="absolute left-5 h-5 w-5 mt-2.5 text-gray-400 font-Roboto"
            >
              <img src={Search} alt="Search Icon" className="h-full w-full ml-2 transform transition-transform duration-200 hover:scale-125 hover:brightness-150" />
            </button>
          </form>
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
        </div>
      )}

      {/* Conditional rendering of PageLinks for smaller screens */}
      {menuOpen && (
        <div className="absolute top-14 left-0 w-full bg-gradient-to-b from-darkerBlue to-darkBlue md:hidden z-20">
          <nav className="flex flex-col space-y-4 p-4">
            <PageLinks
              parentClass="flex flex-col space-y-4"
              itemClass="text-white hover:text-gray-300 transition duration-300 font-Roboto"
            />
            <a
              href="#user-profile"
              className="text-white font-Roboto hover:text-gray-300 transition duration-300"
            >
              Profile
            </a>
          </nav>
        </div>
      )}
    </div>
  );
}

export default NavBar;
