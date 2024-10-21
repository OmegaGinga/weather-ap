// renderWeather.js
export function renderCurrentWeather(currentWeather) {
    const currentWeatherDiv = document.querySelector('.current-weather');
    currentWeatherDiv.innerHTML = `
        <h2>Current Weather</h2>
        <p>Temperature: ${currentWeather.temp}°C</p>
        <p>Condition: ${currentWeather.weather[0].description}</p>
    `;
}

export function renderHourlyWeather(hourlyWeather) {
    const hourlyWeatherDiv = document.querySelector('.hourly-weather');
    hourlyWeatherDiv.innerHTML = '<h2>Hourly Forecast</h2>';
    hourlyWeather.forEach(hour => {
        hourlyWeatherDiv.innerHTML += `
            <p>${hour.dt_txt}: ${hour.temp}°C, ${hour.description}</p>
        `;
    });
}

export function renderNextDaysWeather(nextDaysWeather) {
    const nextDaysWeatherDiv = document.querySelector('.next-days-weather');
    nextDaysWeatherDiv.innerHTML = '<h2>Next Days</h2>';
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
        background.style.backgroundImage = "url('path/to/clear-sky.jpg')";
    } else if (statusCode >= 801 && statusCode <= 804) {
        background.style.backgroundImage = "url('path/to/cloudy-sky.jpg')";
    } else if (statusCode >= 200 && statusCode < 300) {
        background.style.backgroundImage = "url('path/to/thunderstorm.jpg')";
    } else if (statusCode >= 500 && statusCode < 600) {
        background.style.backgroundImage = "url('path/to/rain.jpg')";
    } else {
        background.style.backgroundImage = "url('path/to/default-weather.jpg')";
    }
}
