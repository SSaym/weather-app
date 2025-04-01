import React, { useState, useEffect, use } from 'react';
import axios from 'axios';
import WeatherIcon from './WeatherIcon';
/* eslint-disable no-unused-expressions */
const Hourly = ({city}) => {
    const [weatherData, setWeatherData] = useState(null);
    const api_key = "f4b7a21b858deafe49d13aaf2bc013f2";
    const count_hours = 15;
    useEffect(() => {
        const fetchData = async () => {
            try {
                // get current data
                const response = await axios.get(
                    `https://pro.openweathermap.org/data/2.5/forecast/hourly?q=${city.name}&units=metric&appid=${api_key}&cnt=${count_hours}`
                );
                setWeatherData(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [city, api_key]);
    const hourlyElements = [];
    let datetime = "";
    let time = "";
    for (let i = 0; i < count_hours; i++) {
        {weatherData ? (
            // convert time to local time of location entered
            datetime = new Date(weatherData.list[i].dt * 1000),
            // add city timezone offset in seconds
            datetime.setTime(datetime.getTime() + (weatherData.city.timezone * 1000)),
            // format time as hh:mm, add a leading 0 if needed
            time = datetime.getHours().toString().padStart(2, '0') + ':00',
            hourlyElements.push(
                <div key={i}>
                    <p>
                        <p>{time}</p>
                        <WeatherIcon condition={weatherData.list[i].weather[0].description} iconCode={weatherData.list[i].weather[0].icon}/>
                        <p>{Math.round(weatherData.list[i].main.temp)}°C</p>
                    </p>
                </div>  
            )
        ) : (
            <p>Loading...</p>
        )}
    }

    return (
        <div>
            {hourlyElements}
        </div>
    );

}
export default Hourly;