import { useState, useEffect } from "react";
import bookmark from "../../../assets/images/info_bookmark.png";
import bookmarked from "../../../assets/images/info_bookmark_selected.png";
import locate from "../../../assets/images/info_loc.png";
import ReviewWindow from "../Reviews";
import useFetchReviews from "../mapHooks/useFetchReviews";
import { useAuth } from "../../../../routes/AuthProvider";
import {
  providers,
  connectorImages,
  connectorColors,
  connectorTypes,
  providerImages,
} from "../mapUtils/connectorUtils";

// Connector Component to display information for each connector
const ConnectorInfo = ({ connector, powerKW, count }) => {
  const connectorType = getConnectorTypeName(connector.connectionTypeID); // Get connector type

  return (
    <div className="relative p-3 bg-mediumBlue text-white rounded-md shadow space-y-1 w-64">
      <div className="flex items-center">
        {/* Display connector icon */}
        <img
          src={connectorImages[connectorType] || ""}
          alt={connectorType}
          className="w-7 h-7 mr-3"
        />
        <span
          className={`${connectorColors[connectorType] || "text-gray-400"
            } font-semibold font-Orbitron`}
        >
          {connectorType}
        </span>
        {/* Power */}
        <span className="font-Roboto ml-auto">{powerKW} kW</span>
        {/* Connector availability (commented out) */}
        {/* <span className="ml-1 font-Orbitron">{`${station.available}/${station.total}`}</span> */}
        {/* Display the count of connectors */}
        {count > 1 && (
          <span className="text-eGreen ml-2 font-Roboto">
            x{count}
          </span>
        )}
      </div>
    </div>
  );
};

// Helper functions

// Function to group connectors by type and power
const groupConnectors = (connectors) => {
  return connectors.reduce((acc, connector) => {
    // Create a unique key based on connection type ID and power which groups connectors
    const key = `${connector.connectionTypeID}-${connector.powerKW}`;
    // If the key doesn't exist, create a new key
    if (!acc[key]) {
      acc[key] = { connector, count: 0 }; // Initialize count to 0
    }
    acc[key].count += 1; // Increment count
    // Return the accumulator (grouped connectors) for the next iteration
    return acc;
  }, {}); // Initialize accumulator as an empty object
};

// Find the provider based on the station title
const findProvider = (title) => {
  return providers.find((provider) => title.includes(provider)) || "Unknown";
};

// Get the connector type name based on the connection type ID
const getConnectorTypeName = (connectionTypeID) => {
  return connectorTypes[connectionTypeID] || "Type 2";
};

// Calculate the average rating from the reviews
const calculateAverageRating = (reviews) => {
  if (!reviews || reviews.length === 0) return 0;
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  return Math.round(totalRating / reviews.length);
};

// InfoBox Component to display station information
function InfoBox({ station, onBookmark }) {
  const { user, isAuthenticated } = useAuth(); // Get user data
  const [isReviewWindowOpen, setReviewWindowOpen] = useState(false); // State to control review window visibility
  const [isBookmarked, setIsBookmarked] = useState(false); // State to track if the station is bookmarked

  // Google Maps links
  const googleMapsLink = `https://www.google.com/maps?q=${station.location.latitude},${station.location.longitude}`; // Google Maps link
  const googleMapsDirections = `https://www.google.com/maps/dir/?api=1&destination=${station.location.latitude},${station.location.longitude}`; // Google Maps directions link

  // Fetch reviews for the station
  const { reviews, loading, error } = useFetchReviews(station.id);

  // Calculate average rating
  const averageRating = calculateAverageRating(reviews); // Calculate average rating

  // Open and close review window
  const openReviewWindow = () => setReviewWindowOpen(true);
  const closeReviewWindow = () => setReviewWindowOpen(false);

  // Check if the station is bookmarked
  useEffect(() => {
    if (isAuthenticated && user.stations) {
      setIsBookmarked(user.stations.includes(station.id));
    }
  }, [user, station.id, isAuthenticated]);

  // Find the provider based on the station title
  const provider = findProvider(station.location.title);

  // Handle bookmark toggle
  const handleBookmarkToggle = () => {
    if (isAuthenticated) {
      onBookmark(station);
      setIsBookmarked(!isBookmarked);
    }
  };

  // Group connectors by type and power
  const groupedConnectors = groupConnectors(station.connections);

  return (
    <div className="absolute top-0 left-0 m-4 p-4 bg-gradient-to-b from-darkerBlue to-darkBlue text-white rounded-md shadow-lg w-fit">
      {/* Station info */}
      <div className="flex space-x-2">
        {/* Station title */}
        <h3 className="text-base font-semibold mb-2 font-Orbitron pr-14 break-words mt-1">
          {station.location.title}
        </h3>
        <div className="absolute top-4 right-4 flex">
          {/* Bookmark button */}
          {isAuthenticated && (
            <button
              onClick={handleBookmarkToggle}
              className="w-7 h-7 flex items-center justify-center transform transition-transform duration-200 hover:scale-110 hover:brightness-150"
              title="Bookmark"
            >
              <img
                src={isBookmarked ? bookmarked : bookmark}
                alt="Bookmark"
                className="w-4 h-4"
              />
            </button>
          )}
          {/* Navigate button */}
          <button
            onClick={() => window.open(googleMapsDirections, "_blank")}
            className="w-7 h-7 flex items-center justify-center transform transition-transform duration-200 hover:scale-110 hover:brightness-150"
            title="Navigate"
          >
            <img src={locate} alt="Navigate" className="w-4 h-4" />
          </button>
        </div>
      </div>
      {/* Station location */}
      <p className="font-Roboto">
        <strong>Location: </strong>{" "}
        <a
          href={googleMapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-300 hover:underline"
        >
          {station.location.title}, {station.location.addressLine1},{" "}
          {station.location.town}, {station.location.postcode}
        </a>
      </p>
      {/* Station provider */}
      <div className="flex items-center justify-between">
        <p className="font-Roboto">
          <strong>Provider:</strong> {provider}
        </p>
      </div>
      {/* Station usage cost */}
      <div className="flex items-center justify-between font-Roboto">
        <p>
          <strong>Usage Cost:</strong> {station.usageCost || "N/A"}
        </p>
        {/* Provider image */}
        {providerImages[provider] && (
          <img
            src={providerImages[provider]}
            alt={provider}
            className="w-10 h-10 ml-2 rounded-sm"
          />
        )}
      </div>
      {/* Average rating */}
      <div className="flex items-center justify-start">
        <span className="text-yellow-400">
          {"★".repeat(averageRating)}
          {"☆".repeat(5 - averageRating)}
        </span>
        {/* Show reviews button */}
        <button
          onClick={openReviewWindow}
          className="text-blue-300 hover:underline ml-2"
        >
          Show reviews
        </button>
      </div>
      {/* Connectors */}
      <div className="mt-3 space-y-3 max-h-[300px] overflow-y-auto">
        {Object.values(groupedConnectors).map(({ connector, count }, index) => (
          <ConnectorInfo
            key={index}
            connector={connector}
            powerKW={connector.powerKW}
            count={count}
          />
        ))}
      </div>
      {/* Review window */}
      {
        isReviewWindowOpen && (
          <ReviewWindow station={station} onClose={closeReviewWindow} />
        )
      }
    </div >
  );
}

export default InfoBox;
