// import required icons from assets folder
// day
import React from 'react';
import SunnyIcon from '../assets/sunny.png';
import CloudyIcon from '../assets/cloudy.png';
import MistIcon from '../assets/mist.png';
import RainIcon from '../assets/rain.png';
import ThunderIcon from '../assets/thunder.png';
import SnowIcon from '../assets/snow.png';
import DefaultIcon from '../assets/default.png';
// night
import ClearNightIcon from '../assets/clear-night.png';
import CloudyNightIcon from '../assets/cloudy-night.png';

// uses the condition to return an img tag with an icon based on the condition
const WeatherIcon = ({ condition, iconCode }) => {
    const lowerCondition = condition.toLowerCase();
    const isNight = iconCode && iconCode.endsWith('n'); // check if its night time
    
    if (lowerCondition.includes('clear') || lowerCondition.includes('sun')) { // check if its sunny
      // if its night time, return corresponding icon 
      return <img src={isNight ? ClearNightIcon : SunnyIcon} alt={isNight ? "Clear Night" : "Sunny"} className="weather-icon" />;
    }
    else if (lowerCondition.includes('cloud')) {
      return <img src={isNight ? CloudyNightIcon : CloudyIcon} alt="Cloudy" className="weather-icon" />;
    }
    else if (lowerCondition.includes('rain') || lowerCondition.includes('drizzle')) { // self explanatory
      return <img src={RainIcon} alt="Rainy" className="weather-icon" />;
    }
    else if (lowerCondition.includes('thunder')) {
      return <img src={ThunderIcon} alt="Thunder" className="weather-icon" />;
    }
    else if (lowerCondition.includes('snow')) {
      return <img src={SnowIcon} alt="Snow" className="weather-icon" />;
    }
    else if (lowerCondition.includes('mist') || lowerCondition.includes('fog') || lowerCondition.includes('haze') || lowerCondition.includes('smoke') || lowerCondition.includes('dust')) {
      return <img src={MistIcon} alt="Misty" className="weather-icon" />;
    }
    else {
      return <img src={DefaultIcon} alt="Default" className="weather-icon" />; // Default icon
    }
  };

  export default WeatherIcon;