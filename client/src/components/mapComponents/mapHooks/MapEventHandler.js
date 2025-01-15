import { useMapEvents } from "react-leaflet";

const MapEventHandler = ({ onMapClick }) => {
  useMapEvents({
    click: () => {
      if (onMapClick) {
        onMapClick();
      }
    },
  });

  return null; // No need to render anything
};

export default MapEventHandler;
