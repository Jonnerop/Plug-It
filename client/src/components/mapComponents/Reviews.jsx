import React, { useState } from "react";
import Cancel from "../../assets/images/close.png";
import { useAuth } from "../../../routes/AuthProvider";
import useFetchReviews from "./mapHooks/useFetchReviews";
import axios from "axios";

// Review window component
function ReviewWindow({ station, onClose }) {
  // Get the user and token from the AuthProvider
  const { user, token } = useAuth();

  // Fetch reviews for the station
  const { reviews, setReviews } = useFetchReviews(station.id);

  // State variables
  const [newReview, setNewReview] = useState(""); // New review text
  const [newRating, setNewRating] = useState(0); // New review rating
  const [activeTab, setActiveTab] = useState("existing"); // Active tab (existing/new)
  const [expandedReviewIndex, setExpandedReviewIndex] = useState(null); // Expanded review index

  // Handle review submission
  const handleSubmit = async () => {
    if (!user) {
      // If the user is not logged in, display an alert
      alert("You must be logged in to submit a review.");
      return;
    }

    if (newReview.trim() && newRating > 0) {
      // If the review text and rating are valid, submit the review
      try {
        const payload = {
          text: newReview, // Review text
          rating: newRating, // Review rating
          user: user.id, // User submitting the review
          station: station.id, // Station being reviewed
          stationTitle: station.location.title, // Station name
        };

        // Submit the review to the server
        const res = await axios.post("/api/reviews", payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Update the reviews state variable with the new review
        setReviews([...reviews, res.data]);
        setNewReview(""); // Clear the review text
        setNewRating(0); // Reset the review rating
        setActiveTab("existing"); // Switch back to the existing reviews tab
      } catch (error) {
        console.error("Error submitting review", error);
        alert("Failed to submit review. Please try again.");
      }
    } else {
      alert("Please enter a review and rating.");
    }
  };

  // Render stars based on the rating
  const renderStars = (rating) => (
    <span className="text-yellow-400">
      {"★".repeat(rating)}
      {"☆".repeat(5 - rating)}
    </span>
  );

  // Truncate text to a specified length
  const truncateText = (text, length) => {
    return text.length > length ? text.slice(0, length) + "..." : text;
  };

  return (
    <div className="fixed inset-0 w-full h-full bg-black bg-opacity-30 flex justify-center items-center z-50 mt-0">
      <div className="bg-white rounded-md shadow-lg p-6 w-96 max-h-[80vh] overflow-auto">
        {/* Header section */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-black font-Orbitron">
            {station.name}
          </h3>
          <button
            onClick={onClose}
            className="transition-transform duration-200 hover:scale-125 hover:brightness-150 pr-1"
          >
            <img src={Cancel} alt="Cancel" className="w-3 h-3" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b mb-4">
          <button
            onClick={() => setActiveTab("existing")}
            className={`px-4 py-2 ${activeTab === "existing"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500 font-Roboto"
              }`}
          >
            Existing Reviews
          </button>
          <button
            onClick={() => setActiveTab("new")}
            className={`px-4 py-2 ${activeTab === "new"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500 font-Roboto"
              }`}
          >
            Write a Review
          </button>
        </div>

        {/* Existing reviews tab */}
        {activeTab === "existing" && (
          <div className="space-y-4">
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <div
                  key={index}
                  className="bg-gray-100 p-2 rounded shadow-sm text-sm text-black overflow-hidden break-words font-Roboto"
                >
                  <p className="font-semibold">{review.user.username}:</p>
                  <p className="break-words">
                    {expandedReviewIndex === index
                      ? review.text
                      : truncateText(review.text, 100)}{" "}
                    {review.text.length > 100 && (
                      <span
                        className="text-blue-500 cursor-pointer"
                        onClick={() =>
                          setExpandedReviewIndex(
                            expandedReviewIndex === index ? null : index
                          )
                        }
                      >
                        {expandedReviewIndex === index
                          ? "Show less"
                          : "Read more"}
                      </span>
                    )}
                  </p>
                  <div>{renderStars(review.rating)}</div>
                </div>
              ))
            ) : (
              <p className="text-black text-sm font-Roboto">No reviews yet.</p>
            )}
          </div>
        )}

        {/* New review tab */}
        {activeTab === "new" && (
          <div className="flex flex-col h-full">
            {!user && (
              <p className="text-sm text-gray-500 mb-2 font-Roboto">
                You must log in to write a review.
              </p>
            )}
            <textarea
              className={`w-full p-2 border rounded mb-2 text-sm text-black flex-grow min-h-36 font-Roboto ${!user ? "bg-gray-200 cursor-not-allowed" : ""
                }`}
              placeholder={
                user ? "Write your review here..." : "Log in to write a review."
              }
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              disabled={!user}
            ></textarea>
            {/* Rating */}
            <div className="flex items-center mb-4">
              <span
                className={`text-sm mr-2 font-Roboto ${user ? "text-black" : "text-gray-400"
                  }`}
              >
                Rating:
              </span>
              <div className="flex">
                {Array.from({ length: 5 }, (_, i) => (
                  <span
                    key={i}
                    className={`text-2xl ${i < newRating
                      ? user
                        ? "text-yellow-400"
                        : "text-gray-400"
                      : "text-gray-300"
                      } ${user ? "cursor-pointer" : "cursor-not-allowed"}`}
                    onClick={() => {
                      if (user) setNewRating(i + 1);
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
            {/* Submit button */}
            <button
              onClick={handleSubmit}
              className={`w-full py-2 rounded transition font-Roboto ${user
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              disabled={!user}
            >
              Submit Review
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReviewWindow;
