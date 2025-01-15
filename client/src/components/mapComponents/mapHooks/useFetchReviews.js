import { useState, useEffect } from "react";
import axios from "axios";

const useFetchReviews = (stationId) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/reviews/station/${stationId}`);
        setReviews(response.data);
      } catch (err) {
        setError(err);
        console.error("Error fetching reviews:", err);
      } finally {
        setLoading(false);
      }
    };

    if (stationId) {
      fetchReviews();
    }
  }, [stationId]);

  return { reviews, setReviews, loading, error };
};

export default useFetchReviews;
