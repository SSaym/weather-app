import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Alerts from './Alerts'
import WeatherIcon from './WeatherIcon';
import './Weather.css';
import LocationIcon from '../assets/location.png';
import Hourly from './Hourly.js'; 
import HamburgerMenu from './HamburgerMenu.js'
// require('dotenv').config(); // React doesn't need dotenv library to use environment variables


const Weather = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [savedLocations, setSavedLocations] = useState([]); // used to track saved locations
    const api_key = process.env.REACT_APP_API_KEY;

    // load saved locations and default city on component mount
    useEffect(() => {
        // get saved locations from local storage
        const locations = JSON.parse(localStorage.getItem('savedLocations')) || [];
        setSavedLocations(locations);

        // set Mile End as default and fetch its weather
        fetchWeather('Mile End');
    }, []);

    const fetchWeather = async (city) => {
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

    const fetchData = () => {
        fetchWeather(city);
    };

    const handleInputChange = (e) => {
        setCity(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchData();
        setCity('')
    };

    // location based functions are here for now just incase we need them somewhere else, can move them into HamburgerMenu.js if you want

    // used to save a new location to local storage
    const saveLocation = async (city) => {
        try {
            // get current data
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`
            );
            
            // get the city name from the response
            const cityName = response.data.name;
            
            // update the weather data
            setWeatherData(response.data);
            
            // check if it's already in saved locations
            if (!savedLocations.includes(cityName)) {
                const updatedLocations = [...savedLocations, cityName]; 
                setSavedLocations(updatedLocations);
                localStorage.setItem('savedLocations', JSON.stringify(updatedLocations));
            }
        } catch (error) {
            console.error('Error saving location:', error);
        }
    }

    // similr to save location but removes the location from local storage upon the trash icon being clicked
    const removeLocation = (location) => {
        const updatedLocations = savedLocations.filter(item => item !== location);
        setSavedLocations(updatedLocations);
        localStorage.setItem('savedLocations', JSON.stringify(updatedLocations));
    };

    // on click of any saved locations, load its weather data
    const selectSavedLocation = (location) => {
        setCity(location);
        fetchWeather(location);
    };

    return (
        <div>
            <HamburgerMenu // pass the saved locations and location based functions as props to HamburgerMenu component
                locations={savedLocations}
                saveLocation={saveLocation}
                removeLocation={removeLocation}
                selectSavedLocation={selectSavedLocation}
            />

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
