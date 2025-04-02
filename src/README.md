# A Weather App for Commuters
This project is a React-based weather application designed to provide commuters with real-time weather updates, weather based recommendations/alerts, hourly forecasts, and Transport for London (TfL) line statuses for travel planning.

## Prerequisites
Ensure you have the following installed before running the application:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Installation
1. Create a new React app
```bash
npx create-react-app weather-app
cd weather-app
```
2. Extract the contents of src folder to replace the existing src folder
3. Install axios
```bash
npm install axios
```
## API Key
This application uses the OpenWeatherMap API. We have included an API key within the Weather.js file but if you want your own:
1. Sign up for a free API key at [OpenWeatherMap](https://openweathermap.org/api). (You will need an account)
2. Create a .env file in the project root directory
3. Add this line to the .env file replacing your_api_key_here with your key:
```bash
REACT_APP_API_KEY=your_api_key_here
```
4. Find this line in both Weather.js and Hourly.js
```bash
const api_key = "f4b7a21b858deafe49d13aaf2bc013f2";
```
and replace with

```bash
const api_key = process.env.REACT_APP_API_KEY;
```
- Important: the hourly forecast feature wont work properly without a pro API key.

## Running the Application
1. Start the development server using:
```bash
npm start
```
2. This will start a development server at: http://localhost:3000
## Overview
- Displays weather information for a selected area. Information such as temperature, a simple description of
conditions with a matching icon, and hourly forecasts are shown in a simple UI. (Defaults to Mile End)
- Provides alerts and recommendations for weather conditions that could affect travel.
- Allows users to manage locations in togglable sidebar menu.
- Displays the status of selected TfL transport lines. The user can select specific transport lines using the previously mentioned menu.


