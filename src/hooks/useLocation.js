import { useState, useEffect } from "react";

const apiKey = import.meta.env.VITE_GEO_API_KEY;

const useLocation = () => {
	const [location, setLocation] = useState({
		latitude: null,
		longitude: null,
		city: "",
		country: "",
	});

	useEffect(() => {
		const storedLocation = JSON.parse(localStorage.getItem("location"));
		if (storedLocation) {
			setLocation(storedLocation);
		} else {
			fetchDefaultLocation();
		}
	}, []);

	const fetchDefaultLocation = async () => {
		try {
			const response = await fetch(
				`https://api.openweathermap.org/geo/1.0/direct?q=Tokyo&limit=1&appid=${apiKey}`
			);
			if (!response.ok) {
				throw new Error("Failed to fetch default location");
			}
			const data = await response.json();
			const defaultLocation = {
				latitude: data[0].lat,
				longitude: data[0].lon,
				city: data[0].name,
				country: data[0].country,
			};
			setLocation(defaultLocation);
			localStorage.setItem("location", JSON.stringify(defaultLocation));
		} catch (error) {
			console.error(error);
		}
	};

	const getCurrentLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const { latitude, longitude } = position.coords;
					fetchLocationFromCoords(latitude, longitude);
				},
				(error) => {
					console.error(error);
				}
			);
		} else {
			console.error("Geolocation is not supported by this browser.");
		}
	};

	const fetchLocationFromCoords = async (latitude, longitude) => {
		try {
			const response = await fetch(
				`https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}`
			);
			if (!response.ok) {
				throw new Error("Failed to fetch location from coordinates");
			}
			const data = await response.json();
			const currentLocation = {
				latitude: latitude,
				longitude: longitude,
				city: data[0].name,
				country: data[0].country,
			};
			setLocation(currentLocation);
			localStorage.setItem("location", JSON.stringify(currentLocation));
		} catch (error) {
			console.error(error);
		}
	};

	return { location, getCurrentLocation };
};

export default useLocation;
