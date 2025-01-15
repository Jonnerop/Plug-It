import React, { useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "leaflet/dist/leaflet.css";
import "mapbox-gl/dist/mapbox-gl.css";
import "react-leaflet-markercluster/dist/styles.min.css";
import { useStations } from "./mapHooks/useStations";
import { useDebounce } from "./mapHooks/useDebounce";
import MapEventHandler from "./mapHooks/MapEventHandler";
import FetchStations from "./mapUtils/FetchStations";
import CustomMarker from "./components/CustomMarker";
import InfoBox from "./components/InfoBoxV3";
import FilterButtons from "./FilterButtons";
import MapButtons from "./components/MapButtons";
import { useBookMark } from "./mapHooks/useBookMark";
import { useLocation } from "react-router-dom";
import userMarkerIcon from "../../assets/images/user_marker.png";

// Environment variables
const {
  VITE_REACT_MAPBOX_STYLE_ID,
  VITE_REACT_MAPBOX_USERNAME,
  VITE_REACT_MAPBOX_TOKEN,
} = import.meta.env;

// Check if environment variables are set
if (
  !VITE_REACT_MAPBOX_TOKEN ||
  !VITE_REACT_MAPBOX_STYLE_ID ||
  !VITE_REACT_MAPBOX_USERNAME
) {
  throw new Error(
    "Mapbox environment variables are missing. Please check your .env file."
  );
}

const Map = ({ minimap = false }) => {
  // minimap is false by default
  // Initial bounds for fetching stations
  const initialBounds = {
    north: 71.1,
    south: 59.4,
    east: 33.6,
    west: 18.7,
    maxResults: 100,
  };

  const location = useLocation();
  const { latitude, longitude } = location.state || {};

  // Default map bounds and settings
  const INITIAL_BOUNDS = [
    [59.4, 18.7], // South West
    [71.1, 33.6], // North East
  ];
  const INITIAL_POSITION =
    latitude && longitude ? [latitude, longitude] : [64.4191221, 25.3824874]; // Default center
  const INITIAL_ZOOM = latitude && longitude ? 14 : 5; // Default zoom

  // Setup bookmark hook
  const { onBookmark } = useBookMark();

  // Fetch stations hook with initial bounds
  const {
    customSearch,
    stations,
    fetchStations,
    error: stationsError,
  } = useStations(initialBounds);
  // Debounce the fetchStations function to avoid calling it too often
  const handleMapMove = useDebounce(fetchStations);

  // State variables for selected dtation and geolocation
  const [selectedStation, setSelectedStation] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(INITIAL_POSITION);
  const [accuracy, setAccuracy] = useState(null);
  const [isGeolocated, setIsGeolocated] = useState(false);
  // Set map height based on whether the map is a minimap
  const mapHeight = minimap ? "h-80" : "h-[calc(100vh-56px)]"; // if minimap is true, set height to 36px, else set height to 100vh-56px

  // User marker icon for geolocation
  const userMarker = new L.Icon({
    iconUrl: userMarkerIcon,
    iconSize: [43, 43],
    iconAnchor: [16, 43],
  });

  return (
    <div className={`relative w-full ${mapHeight}`}>
      {/* Display filter buttons if the map is not a minimap */}
      {!minimap && <FilterButtons customSearch={customSearch}/>}
      {/* Map container */}
      <MapContainer
        center={INITIAL_POSITION}
        zoom={INITIAL_ZOOM}
        minZoom={5}
        maxBounds={INITIAL_BOUNDS}
        maxBoundsViscosity={1.0}
        zoomControl={false}
        className="absolute w-full h-full z-0"
      >
        {/* Mapbox tile layer */}
        <TileLayer
          attribution='Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
          url={`https://api.mapbox.com/styles/v1/${VITE_REACT_MAPBOX_USERNAME}/${VITE_REACT_MAPBOX_STYLE_ID}/tiles/256/{z}/{x}/{y}@2x?access_token=${VITE_REACT_MAPBOX_TOKEN}`}
        />
        {/* Geolocation circle */}
        {isGeolocated && currentPosition && accuracy && (
          <Marker position={currentPosition} icon={userMarker} />
        )}
        {/* Display map buttons if map isn't a minimap */}
        {!minimap && (
          <MapButtons
            setCurrentPosition={setCurrentPosition}
            setAccuracy={setAccuracy}
            isGeolocated={isGeolocated}
            setIsGeolocated={setIsGeolocated}
          />
        )}
        {/* Fetch stations when the map moves */}
        <FetchStations handleMapMove={handleMapMove} />
        {/* Cluster stations for better performance */}
        <MarkerClusterGroup>
          {stations.map((station) => (
            <CustomMarker
              key={station.id} // Unique key for each station marker
              station={station} // Station data
              isSelected={selectedStation?.id === station.id} // Highlight selected station
              onClick={() => setSelectedStation(station)} // Handle marker click
            />
          ))}
        </MarkerClusterGroup>
        {/* Handle map click (close infobox and change marker icon)*/}
        <MapEventHandler onMapClick={() => setSelectedStation(null)} />
      </MapContainer>
      {/* Display error message if stations fail to load */}
      {!minimap && stationsError && (
        <div className="absolute top-0 left-0 right-0 bg-red-600 text-white p-2 text-center z-50">
          Error loading stations. Please try again later.
        </div>
      )}
      {/* Display station info box */}
      {!minimap && selectedStation && (
        <div className="absolute top-4 left-4 z-50">
          <InfoBox station={selectedStation} onBookmark={onBookmark} />
        </div>
      )}
    </div>
  );
};

export default Map;
