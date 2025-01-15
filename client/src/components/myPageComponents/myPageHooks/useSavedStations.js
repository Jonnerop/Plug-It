import { useEffect, useState } from "react";
import axios from "axios";

// Hook to fetch saved stations from the backend
export const useSavedStations = (query) => {
  const [stations, setStations] = useState([]);
  const [error, setError] = useState(null);

  const fetchStations = async (queryString) => {
    console.log(queryString);
    if (queryString) {
      try {
        const response = await axios.get(`/api/chargers/bookmarks/${queryString}`, {
        });
        setStations(response.data);
        console.log(response.data);
      } catch (err) {
        setError(err);
        console.error("Error fetching stations:", err);
      }
    };
  };
  useEffect(() => {
    fetchStations(query); // Fetch initial stations on load
  }, []);

  return { stations, setStations, fetchStations, error };
};