import { useUserStationIds } from "../../myPageComponents/myPageHooks/useUserStationIds";
import { useAuth } from "../../../../routes/AuthProvider";

export const useBookMark = () => {
    const { addStationId, removeStationId, getStationIds } = useUserStationIds();
    const { user } = useAuth();

    const onBookmark = (station) => {
        if (user) {
            const stationIds = getStationIds(user);
            if (stationIds.includes(station.id)) {
                removeStationId(station.id);
                user.stations = user.stations.filter((id) => id !== station.id);
            } else {
                addStationId(station.id);
                user.stations.push(station.id);
            }
        } else {
            console.log("Please log in to save stations");
        }
    };

    return { onBookmark };
 };