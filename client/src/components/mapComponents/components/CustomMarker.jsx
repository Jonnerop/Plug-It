import React from 'react';
import L from 'leaflet';
import { Marker } from 'react-leaflet';

import { connectorTypes, connectorMarkerImages } from '../mapUtils/connectorUtils';

// Get the connector type name based on the connection type ID
const getConnectorTypeName = (connectionTypeID) => {
    return connectorTypes[connectionTypeID] || "Type 2"; // Default to Type 2
};

// Create a marker based on the connector type and whether it is selected
const createMarker = ({ connectorType, isSelected }) => {
    const markerType = isSelected ? 'selected' : 'unselected';
    const iconUrl = connectorMarkerImages[markerType][connectorType] || connectorMarkerImages.unselected["Type 2"];
    // Return a Leaflet icon with the icon URL and size
    return L.icon({
        iconUrl,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
    });
}

// Custom marker component
const CustomMarker = ({ station, isSelected, onClick }) => {
    // Get the connector type name based on the connection type ID
    const connectorType = getConnectorTypeName(station?.connections?.[0]?.connectionTypeID);

    return (
        <Marker
            position={[station.location.latitude, station.location.longitude]} // Marker position
            icon={createMarker({ connectorType, isSelected })} // Set the marker icon
            // Handle marker click
            eventHandlers={{
                click: () => {
                    onClick(station);
                }
            }}
        >
        </Marker>
    );
};

export default CustomMarker;
