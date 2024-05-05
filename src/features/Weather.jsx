import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
	CloudSun,
	CloudMoon,
	CloudRain,
	CloudDrizzle,
	CloudSnow,
	CloudHail,
	CloudFog,
	Wind,
	Tornado,
	CloudRainWind,
	Sun,
	Moon,
	Cloudy,
	CloudLightning,
} from "lucide-react";

const Weather = () => {
	const [weather, setWeather] = useState(null);
	const units = "imperial";

	useEffect(() => {
		const fetchWeather = async () => {
			const storedLocation = JSON.parse(localStorage.getItem("location"));
			if (!storedLocation) {
				setTimeout(fetchWeather, 1000);
				return;
			}
			const { latitude, longitude } = storedLocation;
			console.log(latitude, longitude);
			const response = await fetch(
				`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=bd5e378503939ddaee76f12ad7a97608`
			);
			const data = await response.json();
			setWeather(data);
		};
		fetchWeather();
	}, []);

	if (!weather) return <div>Loading...</div>;

	const locationData = JSON.parse(localStorage.getItem("location"));
	const sunriseTime = new Date(weather.sys.sunrise * 1000);
	const sunsetTime = new Date(weather.sys.sunset * 1000);
	const currentTime = new Date();

	// Determine whether it's currently daytime or nighttime
	const isDaytime = currentTime > sunriseTime && currentTime < sunsetTime;
	//console.log(isDaytime);
	const weatherConditionCodes = {
		200: <CloudLightning />, // Thunderstorm with light rain
		201: <CloudLightning />, // Thunderstorm with rain
		202: <CloudLightning />, // Thunderstorm with heavy rain
		210: <CloudLightning />, // Light thunderstorm
		211: <CloudLightning />, // Thunderstorm
		212: <CloudLightning />, // Heavy thunderstorm
		221: <CloudLightning />, // Ragged thunderstorm
		230: <CloudLightning />, // Thunderstorm with light drizzle
		231: <CloudLightning />, // Thunderstorm with drizzle
		232: <CloudLightning />, // Thunderstorm with heavy drizzle

		300: <CloudDrizzle />, // Light intensity drizzle
		301: <CloudDrizzle />, // Drizzle
		302: <CloudDrizzle />, // Heavy intensity drizzle
		310: <CloudDrizzle />, // Light intensity drizzle rain
		311: <CloudDrizzle />, // Drizzle rain
		312: <CloudDrizzle />, // Heavy intensity drizzle rain
		313: <CloudDrizzle />, // Shower rain and drizzle
		314: <CloudDrizzle />, // Heavy shower rain and drizzle
		321: <CloudDrizzle />, // Shower drizzle

		500: <CloudRain />, // Light rain
		501: <CloudRain />, // Moderate rain
		502: <CloudRain />, // Heavy intensity rain
		503: <CloudRain />, // Very heavy rain
		504: <CloudRain />, // Extreme rain

		511: <CloudHail />, // Freezing rain

		520: <CloudRainWind />, // Light intensity shower rain
		521: <CloudRainWind />, // Shower rain
		522: <CloudRainWind />, // Heavy intensity shower rain
		531: <CloudRainWind />, // Ragged shower rain

		600: <CloudSnow />, // Light snow
		601: <CloudSnow />, // Snow
		602: <CloudSnow />, // Heavy snow
		611: <CloudSnow />, // Sleet
		612: <CloudSnow />, // Light shower sleet
		613: <CloudSnow />, // Shower sleet

		615: <CloudHail />, // Light rain and snow
		616: <CloudHail />, // Rain and snow
		620: <CloudHail />, // Light shower snow
		621: <CloudHail />, // Shower snow
		622: <CloudHail />, // Heavy shower snow

		701: <CloudFog />, // Mist
		711: <CloudFog />, // Smoke
		721: <CloudFog />, // Haze
		731: <CloudFog />, // Dust
		741: <CloudFog />, // Fog
		751: <CloudFog />, // Sand
		761: <CloudFog />, // Dust
		762: <CloudFog />, // Ash

		771: <Wind />, // Squalls
		781: <Tornado />, // Tornado

		800: isDaytime ? <Sun /> : <Moon />, // Clear sky
		801: isDaytime ? <CloudSun /> : <CloudMoon />, // Few clouds
		802: isDaytime ? <CloudSun /> : <CloudMoon />, // Scattered clouds
		803: isDaytime ? <CloudSun /> : <CloudMoon />, // Broken clouds

		804: <Cloudy />, // Overcast clouds
	};

	return (
		<Box sx={{textAlign: "right", padding: "6px 12px", width: "250px"}}>
			{locationData && locationData.city && locationData.country && (
				<Typography variant="body1" sx={{ fontWeight: "bold" }}>
					{locationData.city}, {locationData.country}
				</Typography>
			)}
			{weather &&
				weather.main &&
				weather.main.temp &&
				weather.weather &&
				weather.weather[0] && (
					<Box sx={{ display: "flex", alignItems: "center", justifyContent: "end" }}>
						{
							weatherConditionCodes[
								weather.weather[0].id.toString()
							]
						}
						&nbsp;
						{weather.weather[0].description.replace(/\b\w/g, (l) =>
							l.toUpperCase()
						)}
						&nbsp;
						{Math.round(weather.main.temp)}°F
					</Box>
				)}
		</Box>
	);
};

export default Weather;
