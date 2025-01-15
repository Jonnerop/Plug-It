import { useMapEvents } from "react-leaflet";

const FetchStations = ({ handleMapMove }) => {
    useMapEvents({
        moveend: (e) => {
            handleMapMove(e.target);
        },
    });

    return null;
};

export default FetchStations;
