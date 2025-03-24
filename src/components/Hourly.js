import React, { useState, useEffect, use } from 'react';
import axios from 'axios';
import WeatherIcon from './WeatherIcon';
/* eslint-disable no-unused-expressions */
const Hourly = ({city}) => {
    const [weatherData, setWeatherData] = useState(null);
    const api_key = process.env.REACT_APP_API_KEY;
    useEffect(() => {
        const fetchData = async () => {
            try {
                // get current data
                const response = await axios.get(
                    `https://pro.openweathermap.org/data/2.5/forecast/hourly?q=${city.name}&units=metric&appid=${api_key}&cnt=7`
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
    for (let i = 0; i < 7; i++) {
        {weatherData ? (
            datetime = weatherData.list[i].dt_txt,
            time = datetime.split(" ")[1],
            hourlyElements.push(
                <div key={i}>
                    <p>
                        <p>{time.split(":")[0]}:{time.split(":")[1]}</p>
                        <WeatherIcon condition={weatherData.list[i].weather[0].description} />
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