// import required icons from assets folder
import React from 'react';
import SunnyIcon from '../assets/sunny.png';
import CloudyIcon from '../assets/cloudy.png';
import MistIcon from '../assets/mist.png';
import RainIcon from '../assets/rain.png';
import ThunderIcon from '../assets/thunder.png';
import SnowIcon from '../assets/snow.png';
import DefaultIcon from '../assets/default.png';

// uses the condition to return an img tag with an icon based on the condition
const WeatherIcon = ({ condition }) => {
    const lowerCondition = condition.toLowerCase();
    
    if (lowerCondition.includes('clear') || lowerCondition.includes('sun')) { // if its sunny
      return <img src={SunnyIcon} alt="Sunny" className="weather-icon" />;
    }
    else if (lowerCondition.includes('cloud')) {
      return <img src={CloudyIcon} alt="Cloudy" className="weather-icon" />; // cloudy
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