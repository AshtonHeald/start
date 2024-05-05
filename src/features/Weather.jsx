import { useState, useEffect } from 'react';

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

const units = "imperial";
const weatherApiKey = import.meta.env.VITE_WEATHER_API_KEY;

const Weather = ({ location }) => {
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        if (location.latitude && location.longitude) {
            fetchWeatherData(location.latitude, location.longitude);
        }
    }, [location]);

    const fetchWeatherData = async (latitude, longitude) => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${weatherApiKey}`);
            if (!response.ok) {
                throw new Error('Failed to fetch weather data');
            }
            const data = await response.json();
            setWeatherData(data);
        } catch (error) {
            console.error(error);
        }
    };

    if (!weatherData) {
        return <div>Loading...</div>;
    }

		const sunriseTime = new Date(weatherData.sys.sunrise * 1000);
	const sunsetTime = new Date(weatherData.sys.sunset * 1000);
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
        <div>
            <h2>Weather for {location.city}, {location.country}</h2>
						{weatherConditionCodes[weatherData.weather[0].id.toString()]}
            <p>Description: {weatherData.weather[0].description}</p>
            <p>Temperature: {weatherData.main.temp} °F</p>
        </div>
    );
};

export default Weather;
