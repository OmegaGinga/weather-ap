// index.js
// main module

import './styles.css';
import { fetchWeather } from './fetchWeather.js';
import { renderCurrentWeather, renderHourlyWeather, renderNextDaysWeather, setWeatherBackground } from './renderWeather.js';

async function getWeatherData(input) {
    try {        
        const { currentWeather, hourlyWeather, weatherStatus, nextDaysWeather } = await fetchWeather(input);

        renderCurrentWeather(currentWeather);
        renderHourlyWeather(hourlyWeather);
        renderNextDaysWeather(nextDaysWeather);
        setWeatherBackground(weatherStatus);

    } catch (error) {
        console.error('Error fetching weather data:', error);   
    }
}

document.querySelector('.search-button').addEventListener('click', () => {
    const input = document.querySelector('#city-code').value;
    getWeatherData(input);
});