import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const FilterDataContext = createContext();

export const useFilterData = () => useContext(FilterDataContext);

export const FilterDataProvider = ({ children }) => {
  const [providers, setProviders] = useState([]);
  const [locations, setLocations] = useState([]);
  const [titles, setTitles] = useState([]);
  const [stations, setStations] = useState([]);

  const getAllFilterData = async () => {
    try {
      const res = await axios.get(`/api/chargers/filters`, {});
      const data = res.data;
      console.log(data);
      return data;
    } catch (error) {
      console.error("Failed to fetch providers and stations", error);
      return { locations: [], providers: [] }; // Return empty arrays in case of error
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const { locations, providers, titles, stations } =
        await getAllFilterData();
      if (locations && providers && titles && stations) {
        setLocations(locations);
        setProviders(providers);
        setTitles(titles);
        setStations(stations);
      }
    };

    fetchData();
  }, []);

  return (
    <FilterDataContext.Provider
      value={{ providers, locations, titles, stations }}
    >
      {children}
    </FilterDataContext.Provider>
  );
};
