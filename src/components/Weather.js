import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Alerts from './Alerts'
import WeatherIcon from './WeatherIcon';
import './Weather.css';
import LocationIcon from '../assets/location.png';
import Hourly from './Hourly.js'; 
// require('dotenv').config(); // React doesn't need dotenv library to use environment variables


const Weather = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const api_key = process.env.REACT_APP_API_KEY;
    const fetchData = async () => {
        try {
            // get current data
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`
            );
            setWeatherData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleInputChange = (e) => {
        setCity(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchData();
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter location name"
                    value={city}
                    onChange={handleInputChange}
                />
                <button type="submit">Get Weather</button>
            </form>
            {weatherData ? (
                <>
                    <div className='outer-container'>
                        <div className='weather-container'>
                            <div className='weather-info'>
                                <p className='temperature'>{Math.round(weatherData.main.temp)}°C</p>
                                <p>{weatherData.weather[0].description}</p>
                            </div>
                            <div className='icon-container'> 
                                <WeatherIcon condition={weatherData.weather[0].description} iconCode={weatherData.weather[0].icon}/> 
                            </div>
                        </div>
                        <div className='location'>
                            <p>
                                {weatherData.name}
                                <img src={LocationIcon} alt="Location" className="location-icon" /> 
                            </p>
                        </div>
                        <div className='alert'>
                            <Alerts weatherData={weatherData} />
                        </div>
                        <div className='hourly-forecast'>
                            <Hourly city={weatherData}/>
                        </div>
                    </div>
                </>
            ) : (
                <p>Enter a location...</p>
            )}
        </div>
    );
};
export default Weather;
