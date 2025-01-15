import { useCallback } from "react";
import { debounce } from "lodash";

export const useDebounce = (fetchStations) => {
    const handleMapMove = useCallback(
        debounce((map) => {
            const bounds = map.getBounds();
            const boundsData = {
                north: bounds.getNorth(),
                east: bounds.getEast(),
                south: bounds.getSouth(),
                west: bounds.getWest(),
            };
            fetchStations(boundsData);
        }, 500),
        [fetchStations]
    );

    return handleMapMove;
};
