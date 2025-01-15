import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSavedStations } from "./myPageHooks/useSavedStations";
import { useUserStationIds } from "./myPageHooks/useUserStationIds";
import { useAuth } from "../../../routes/AuthProvider";
import Station from "./Station";

function SavedStations() {
  const { fetchStations, stations, setStations } = useSavedStations();
  const { getStationIds, removeStationId } = useUserStationIds();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const query = getStationIds(user);
      if (query) {
        const queryString = query.join(",");
        fetchStations(queryString);
      }
    }
  }, [user]);

  const removeStation = (id) => {
    removeStationId(id);
    setStations(stations.filter((station) => station.id !== id));
  };

  const toStation = (station) => {
    navigate("/map", {
      state: {
        latitude: station.location.latitude,
        longitude: station.location.longitude,
      },
    });
  };

  return (
    <div className="flex justify-center items-center mx-4 my-page:ml-0 bg-gradient-to-b from-darkerBlue to-darkBlue rounded-md my-page:max-w-xl md:min-w-96 mt-4 my-page:mt-10">
      <div className="flex flex-col bg-mediumBlue py-6 px-4 m-5 rounded-md max-h-36 saved-stations:min-h-[144px] saved-stations:min-w-[425px] w-32">
        <h2 className="text-xl font-Orbitron  text-ctaYellow text-center my-page:text-left font--medium tracking-wider pb-0 top-0 bg-mediumBlue z-10">
          Saved Stations
        </h2>
        <div className="grid grid-cols-1 saved-stations:grid-cols-2 overflow-y-scroll">
          {stations.length > 0 ? (
            stations.map((item) => (
              <Station
                key={item.id}
                name={item.location.title}
                removeStation={() => removeStation(item.id)}
                toStation={() => toStation(item)}
              />
            ))
          ) : (
            <p className="text-gray-400 text-center col-span-2">
              No stations saved
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SavedStations;
