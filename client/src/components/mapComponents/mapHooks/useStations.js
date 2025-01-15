import { useEffect, useState } from "react";
import axios from "axios";

// Hook to fetch stations from the backend
export const useStations = (initialBounds) => {
  const [stations, setStations] = useState([]);
  const [error, setError] = useState(null);

  const fetchStations = async (bounds) => {
    setError(null);
    try {
      const response = await axios.get("/api/chargers", {
        params: { ...bounds, maxResults: 100 },
      });
      setStations(response.data);
    } catch (err) {
      setError(err);
      console.error("Error fetching stations:", err);
    }
  };

  const customSearch = async (query) => {
    const stationSearch = "api/chargers/customSearch/" + query;
    console.log(stationSearch);
    try {
      const response = await axios.get(stationSearch);
      console.log(response.data);
      setStations(response.data);
    } catch (error) {
      console.error("Failed to fetch stations", error);
    }
  };

  useEffect(() => {
    fetchStations(initialBounds); // Fetch initial stations on load
  }, []);

  return { stations, fetchStations, customSearch, error };
};
