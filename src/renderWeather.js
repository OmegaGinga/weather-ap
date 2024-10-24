// renderWeather.js
import clearSky from './resources/Despejado.jpeg';
import someClouds from './resources/Algunas.jpg';
import thunderStorm from './resources/tormenta.jpg';
import rain from './resources/Lluvioso.jpg';
import tree from './resources/tree.jpg';
import fog from './resources/neblina.jpg';


export function renderCurrentWeather(currentWeather) {
    const currentData = document.querySelector('.current-data')
    currentData.innerHTML = '';
    currentData.innerHTML = `
        <div class='current-data-container'>
            <p>Temperature: ${currentWeather.temp}°C</p>
            <p>Condition: ${currentWeather.weather[0].description}</p>
        </div>
    `;
}

export function renderHourlyWeather(hourlyWeather) {
    const hourlyData = document.querySelector('.hourly-data')
    
    hourlyData.innerHTML = '';
    hourlyWeather.forEach(hour => {
        hourlyData.innerHTML += `
        
            <div><p>${hour.temp}°C, ${hour.description}</p></div>
        `;
    });
}

export function renderNextDaysWeather(nextDaysWeather) {
    const nextDaysWeatherDiv = document.querySelector('.next-days-weather');

    nextDaysWeatherDiv.innerHTML = '';
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
        //clear sky
        background.style.backgroundImage = `url(${clearSky})`;
    } else if (statusCode >= 801 && statusCode <= 804) {
        //some clouds
        background.style.backgroundImage = `url(${someClouds})`;
    } else if (statusCode >= 200 && statusCode < 300) {
        //thunder storm
        background.style.backgroundImage = `url(${thunderStorm})`;
    } else if (statusCode >= 500 && statusCode < 600) {
        //rain
        background.style.backgroundImage = `url(${rain})`;
    } else if(statusCode >=700 && statusCode < 800){
        //fog
        background.style.backgroundImage = `url(${fog})`;
    }else {
        //tree?
        background.style.backgroundImage = `url(${tree})`;
    }
}
