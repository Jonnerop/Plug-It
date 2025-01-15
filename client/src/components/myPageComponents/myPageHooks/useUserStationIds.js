import { useEffect, useState } from "react";
import { useAuth } from "../../../../routes/AuthProvider";


export const useUserStationIds = () => {
    const [loadedUser, setLoadedUser] = useState(null);
    const { user, token } = useAuth();

    useEffect(() => {
        if (user) { 
            setLoadedUser(user);
        } 
    }, [user]); 

    const addStationId = async (stationId) => {
        const userId = loadedUser._id;
        try {
            const response = await fetch(`/api/users/${userId}/stations`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ stationId }),
            });
        } catch (error) {
            console.error("Failed to add station:", error);
        }
    };
    
    const removeStationId = async (stationId) => {
        const userId = loadedUser._id;
        try {
            await fetch(`/api/users/${userId}/stations/${stationId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (error) {
            console.error("Failed to remove station:", error);
        }
     };

    const getStationIds = (user) => {
        if (!user.stations) {
            return [];
        }
        return user.stations.map((id) => id);
    };


    return { getStationIds, addStationId, removeStationId, loadedUser };
 };