// renderWeather.js
import clearSky from './resources/Despejado.jpeg';
import someClouds from './resources/Algunas.jpg';
import thunderStorm from './resources/tormenta.jpg';
import rain from './resources/Lluvioso.jpg';
import tree from './resources/tree.jpg';
import fog from './resources/neblina.jpg';
import cloud from './resources/Nube.png';
import cloudRain from './resources/NubeyLluvia.png';
import cloudThunder from './resources/NubeyRayos.png';
import sun from './resources/Sol.png';

export function renderCurrentWeather(currentWeather) {
    const currentData = document.querySelector('.current-data');
    const currentDate = new Date();

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const dayOfWeek = daysOfWeek[currentDate.getDay()];
    const dayOfMonth = currentDate.getDate();
    const month = monthsOfYear[currentDate.getMonth()];

    currentData.innerHTML = '';

    const weatherIcons = {
        cloud: cloud,
        rain: cloudRain,
        clear: sun,
        thunder: cloudThunder,
    };

    let icon = '';

    if (currentWeather.weather[0].description.includes('cloud')) {
        icon = weatherIcons.cloud;
    } else if (currentWeather.weather[0].description.includes('rain')) {
        icon = weatherIcons.rain;
    } else if (currentWeather.weather[0].description.includes('clear')) {
        icon = weatherIcons.clear;
    } else if (currentWeather.weather[0].description.includes('thunder')) {
        icon = weatherIcons.thunder;
    } else{
        icon = weatherIcons.cloud;
    }

    currentData.innerHTML = `
        <div class='current-data-container'>
            <img src="${icon}" alt="${currentWeather.weather[0].description}">
            <div class ='current-text'>
                <p>${currentWeather.temp}°C</p>            
                <p>${currentWeather.weather[0].description}</p>
            </div>
            <p>${dayOfWeek}, ${dayOfMonth} of ${month}</p>            
        </div>
    `;
}

export function renderHourlyWeather(hourlyWeather) {
    const hourlyData = document.querySelector('.hourly-data');

    hourlyData.innerHTML = '';

    const weatherIcons = {
        cloud: cloud,
        rain: cloudRain,
        clear: sun,
        thunder: cloudThunder,
    };

    hourlyWeather.forEach(hour => {
        let icon = '';

        if (hour.description.includes('cloud')) {
            icon = weatherIcons.cloud;
        } else if (hour.description.includes('rain')) {
            icon = weatherIcons.rain;
        } else if (hour.description.includes('clear')) {
            icon = weatherIcons.clear;
        } else if (hour.description.includes('thunder')) {
            icon = weatherIcons.thunder;
        } else{
            icon = weatherIcons.cloud;
        }

        hourlyData.innerHTML += `
        <div class='image-data-container'>
            <img src="${icon}" alt="${hour.description}">
            <p>${hour.temp}°C</p>
            <p>${hour.dt_txt}</p>
        </div>
        `;
    });
}

export function renderNextDaysWeather(nextDaysWeather) {
    const nextDaysWeatherDiv = document.querySelector('.next-days-weather');
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    nextDaysWeatherDiv.innerHTML = '';

    const weatherIcons = {
        cloud: cloud,
        rain: cloudRain,
        clear: sun,
        thunder: cloudThunder,
    };

    nextDaysWeather.forEach(day => {
        let icon = '';

        if (day.description.includes('cloud')) {
            icon = weatherIcons.cloud;
        } else if (day.description.includes('rain')) {
            icon = weatherIcons.rain;
        } else if (day.description.includes('clear')) {
            icon = weatherIcons.clear;
        } else if (day.description.includes('thunder')) {
            icon = weatherIcons.thunder;
        } else{
            icon = weatherIcons.cloud;
        }

        const date = new Date(day.dt_txt);
        const dayOfWeek = daysOfWeek[date.getDay()];

        nextDaysWeatherDiv.innerHTML += `
        <div class='next-day-image-text'>
            <img src="${icon}" alt="${day.description}">
            <p>${day.temp}°C</p>
            <p>${dayOfWeek}</p>
        </div>
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
