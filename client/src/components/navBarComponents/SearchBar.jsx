import Search from "../../assets/images/search.png";

export default function SearchBar() {
  return (
    <>
      {/* Search bar visible only on medium and larger screens */}
      <div className="relative items-center w-1/4 mx-6 ml-20 hidden md:flex">
        <input
          type="text"
          name="query"
          placeholder="Search"
          className="w-full py-1 pl-10 pr-4 text-white rounded-full bg-searchBarBg focus:outline-none focus:ring-2 focus:ring-searchBarSelected shadow-inner-lg font-Roboto"
        />
        <img
          src={Search}
          alt="Search Icon"
          className="absolute left-3 h-5 w-5 text-gray-400 font-Roboto"
        />
      </div>

      {/* Replacement image visible only on smaller screens */}
      <div className="md:hidden flex items-center mx-6">
        <img
          src={Search}
          alt="Replacement for search bar"
          className="h-8 w-auto"
        />
      </div>
    </>
  );
}
