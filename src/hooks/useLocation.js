import { useState, useEffect, useCallback } from "react";

const useLocation = () => {

    const geoAPIKey = import.meta.env.VITE_GEO_API_KEY;
    console.log(import.meta.env);

    const [location, setLocation] = useState(null);

    // Define loadDefaultLocation as a useCallback hook
    const loadDefaultLocation = useCallback(async () => {
        // Define setDefaultLocation inside loadDefaultLocation
        const setDefaultLocation = async () => {
            try {
                const response = await fetch(
                    `https://api.openweathermap.org/geo/1.0/direct?q=Tokyo&limit=1&appid=${geoAPIKey}`
                );
                if (response.ok) {
                    const data = await response.json();
                    if (data.length > 0) {
                        const tokyoLocation = {
                            city: data[0].name,
                            country: data[0].country,
                            latitude: data[0].lat,
                            longitude: data[0].lon,
                        };
                        setLocation(tokyoLocation);
                        localStorage.setItem(
                            "location",
                            JSON.stringify(tokyoLocation)
                        );
                    }
                } else {
                    throw new Error("Failed to fetch default location for Tokyo");
                }
            } catch (error) {
                console.error(
                    "Error setting the default location to Tokyo:",
                    error
                );
            }
        };

        try {
            const storedLocation = localStorage.getItem("location");
            if (storedLocation) {
                setLocation(JSON.parse(storedLocation));
            } else {
                await setDefaultLocation();
            }
        } catch (error) {
            console.error("Error loading the default location:", error);
        }
    }, [geoAPIKey]);

    const getLocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    try {
                        const response = await fetch(
                            `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${geoAPIKey}`
                        );
                        if (response.ok) {
                            const data = await response.json();
                            if (data.length > 0) {
                                const userLocation = {
                                    city: data[0].name,
                                    country: data[0].country,
                                    latitude: data[0].lat,
                                    longitude: data[0].lon,
                                };
                                setLocation(userLocation);
                                localStorage.setItem(
                                    "location",
                                    JSON.stringify(userLocation)
                                );
                            }
                        } else {
                            throw new Error(
                                "Failed to fetch location from coordinates"
                            );
                        }
                    } catch (error) {
                        console.error(
                            "Error fetching location data from coordinates:",
                            error
                        );
                    }
                },
                (error) => {
                    console.error("Error getting user's position:", error);
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    };

    useEffect(() => {
        // Call loadDefaultLocation inside useEffect
        loadDefaultLocation();
    }, [loadDefaultLocation]);

    return [location, getLocation];
};

export default useLocation;
