// renderWeather.js
import treeImage from './resources/tree.jpg';

export function renderCurrentWeather(currentWeather) {
    const currentData = document.querySelector('.current-data')

    currentData.innerHTML = `
        <p>Temperature: ${currentWeather.temp}°C</p>
        <p>Condition: ${currentWeather.weather[0].description}</p>
    `;
}

export function renderHourlyWeather(hourlyWeather) {
    const hourlyData = document.querySelector('.hourly-data')

    hourlyWeather.forEach(hour => {
        hourlyData.innerHTML += `
            <p>${hour.dt_txt}: ${hour.temp}°C, ${hour.description}</p>
        `;
    });
}

export function renderNextDaysWeather(nextDaysWeather) {
    const nextDaysWeatherDiv = document.querySelector('.next-days-weather');
    nextDaysWeather.forEach(day => {
        nextDaysWeatherDiv.innerHTML += `
            <p>${day.dt_txt}: ${day.temp}°C, ${day.description}</p>
        `;
    });
}

export function setWeatherBackground(weatherStatus) {
    const background = document.querySelector('body');
    const statusCode = Number(weatherStatus);

    if (statusCode === 800) {
        console.log('1');
        background.style.backgroundImage = `url(./resources/tree.jpg)`;
    } else if (statusCode >= 801 && statusCode <= 804) {
        console.log('2');
        background.style.backgroundImage = `url(${treeImage})`;
    } else if (statusCode >= 200 && statusCode < 300) {
        console.log('3');
        background.style.backgroundImage = `url(./resources/tree.jpg)`;
    } else if (statusCode >= 500 && statusCode < 600) {
        console.log('4');
        background.style.backgroundImage = `url(./resources/tree.jpg)`;
    } else {
        console.log('5');
        background.style.backgroundImage = `url(./resources/tree.jpg)`;
    }
}
