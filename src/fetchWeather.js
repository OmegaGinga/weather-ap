// fetchData.js
import { validateInput } from './errorHandling';

export async function fetchWeather(input) {
    const inputType = validateInput(input);
    if (inputType === 'zipCode') {
        return await zipFetch(input);
    } else if (inputType === 'city') {
        return await cityFetch(input);
    }
}

export async function cityFetch(input) {
    try {
        const apiKey = 'e3823c80c446c56daab26091301fed14';
        const currentWeatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=${apiKey}`);
        
        if (!currentWeatherResponse.ok) {
            throw new Error('City not found');
        }

        const currentWeatherData = await currentWeatherResponse.json();

        const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${input}&units=metric&appid=${apiKey}`);
        
        if (!forecastResponse.ok) {
            throw new Error('Forecast data not found');
        }

        const forecastData = await forecastResponse.json();

        const currentWeather = {
            temp: currentWeatherData.main.temp,
            weather: currentWeatherData.weather,
        };

        const weatherStatus = currentWeatherData.weather[0].id;

        const hourlyWeather = forecastData.list.slice(0, 8).map(hour => ({
            temp: hour.main.temp,
            description: hour.weather[0].description,
            dt_txt: hour.dt_txt,
        }));

        const nextDaysWeather = forecastData.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 5).map(day => ({
            temp: day.main.temp,
            description: day.weather[0].description,
            dt_txt: day.dt_txt,
        }));

        return { currentWeather, hourlyWeather, weatherStatus, nextDaysWeather };

    } catch (error) {
        throw new Error(error.message);
    }
}

export async function zipFetch(input) {
    try {
        const apiKey = 'e3823c80c446c56daab26091301fed14';
        const zipCode = input.trim().split(' ');
        const currentWeatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode[0]},${zipCode[1]}&appid=${apiKey}&units=metric`, { mode: 'cors' });

        if (!currentWeatherResponse.ok) {
            throw new Error('Zip code or city not found');            
        }

        const currentWeatherData = await currentWeatherResponse.json();

        const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?zip=${zipCode[0]},${zipCode[1]}&appid=${apiKey}&units=metric`, { mode: 'cors' });

        if (!forecastResponse.ok) {
            throw new Error('Forecast data not found');
        }

        const forecastData = await forecastResponse.json();

        const currentWeather = {
            temp: currentWeatherData.main.temp,
            weather: currentWeatherData.weather,
        };

        const weatherStatus = currentWeatherData.weather[0].id;

        const hourlyWeather = forecastData.list.slice(0, 8).map(hour => ({
            temp: hour.main.temp,
            description: hour.weather[0].description,
            dt_txt: hour.dt_txt,
        }));

        const nextDaysWeather = forecastData.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 5).map(day => ({
            temp: day.main.temp,
            description: day.weather[0].description,
            dt_txt: day.dt_txt,
        }));

        return { currentWeather, hourlyWeather, weatherStatus, nextDaysWeather };

    } catch (error) {
        throw new Error('Error fetching zip code weather data: ' + error.message);  // Throw the error
    }
}
