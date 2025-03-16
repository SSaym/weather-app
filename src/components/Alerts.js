import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Alerts = ({weatherData}) => {
    // function checks if weather conditions will affect travel,
    const api_key = process.env.REACT_APP_API_KEY;
    const [forecastData, setForecastData] = useState(null);
    // checks forecast on location change
    useEffect(() => {
        const fetchForecast = async () => {
            try {
                // get forecast data using axios (3 hour intervals)
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/forecast?q=${weatherData.name}&units=metric&appid=${api_key}`
                )
                setForecastData(response.data); 
                console.log(response.data); // checking if data is successfully retrieved
            }
            catch (error) {
                console.error(error);
            }
        };
        fetchForecast();
    }, [weatherData.name, api_key]); // change the forecast data if the location/api_key changes

    // checks if its raining currently
    if (weatherData.weather && weatherData.weather[0]) {
        const currentWeather = weatherData.weather[0].main;
        if (currentWeather === 'Rain' || currentWeather === 'Drizzle' || currentWeather === 'Thunderstorm' || currentWeather === 'Snow') {
            return 'Current precipitation - umbrella recommended.'
        }
    }
    // this checks if rain expected within next 3 hours if its not already raining
    if (forecastData && forecastData.list) {
        const now = new Date(); // get time now
        const sixHours = new Date(now.getTime() + (6 * 60 * 60 * 1000)); // get time 6 hours from now
        for (let i = 0; i < forecastData.list.length; i++) {
            const forecast = forecastData.list[i];
            const forecastTime = new Date(forecast.dt * 1000);
            const weatherType = forecast.weather[0].main;

            // check if any form of precipitation within next 6 hours
            if ((weatherType === 'Rain' || weatherType === 'Snow' || weatherType == 'Drizzle' || weatherType == 'Thunderstorm') && forecastTime > now && forecastTime <= sixHours) {
                // calculate hours and mins until precipitation
                const mDiff = forecastTime - now; // millisecond difference (used for the two below)
                const hDiff = Math.floor(mDiff / (1000 * 60 * 60)); // hour difference
                const minDiff = Math.floor((mDiff % (1000 * 60 * 60)) / (1000 * 60)); // minute difference

                return `${weatherType} may start in ${hDiff} hour(s) and ${minDiff} minute(s).`
            }

        }
    }
    // checks for potential icy roads
    if(weatherData.main.temp <= 0 ) {
        const recentPrecipitation = (weatherData.rain?.["1h"] ?? 0) > 0 || (weatherData.snow?.["1h"] ?? 0) > 0; // checks if there is rain or snow in last hour
        const freezingPrecipitation = weatherData.weather?.some(({ id }) => id === 511 || (id >= 600 && id < 700)); // checks the id for any freezing rain/snow in last hour (codes 511 or 600-699)

        if(recentPrecipitation && freezingPrecipitation) {
            return 'Icy roads possible - drive with caution.';
        }
    }
    // other simple checks
    if(weatherData.visibility < 500) return 'Low visibility - avoid driving if possible.'
    if(weatherData.main.temp < 0) return 'Cold temperatures - dress appropriately before travelling.'
    if(weatherData.main.temp > 35) return 'Extreme heat - avoid the outdoors and stay hydrated.'

    return 'No weather alerts - good conditions.'
}

export default Alerts;