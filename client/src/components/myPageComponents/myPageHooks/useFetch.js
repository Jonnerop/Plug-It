import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../../../routes/AuthProvider";

const useFetch = () => {
    const [reviews, setReviews] = useState([]);
    const { user, token } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const reviewsRes = await axios.get(`/api/reviews/user/${user._id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setReviews(reviewsRes.data);
            } catch (error) {
                console.error("Error fetching reviews", error);
            }
        };

        if (user) {
            fetchData();
        }
    }, [user, token]);

    return { reviews };
};

export default useFetch;
