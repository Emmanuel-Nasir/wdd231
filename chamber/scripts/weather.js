document.addEventListener("DOMContentLoaded", function() {
    const apiKey = '019051a93d167cced4a106c06867004c';
    const lat = 7.1516;
    const lon = 3.3486;

    function getCurrentWeather() {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                document.getElementById('current-weather').innerHTML = `
                    <h4>Current Weather</h4>
                    <p>Temperature: ${data.main.temp}°C</p>
                    <p>Condition: ${data.weather[0].description}</p>
                `;
            })
            .catch(() => {
                document.getElementById('current-weather').innerText = 'Unable to load current weather.';
            });
    }

    function getWeatherForecast() {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                const forecast = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);
                document.getElementById('forecast').innerHTML = `
                    <h4>3-Day Forecast</h4>
                    ${forecast.map(f => `
                        <p><strong>${new Date(f.dt_txt).toDateString()}</strong>: ${f.main.temp}°C, ${f.weather[0].description}</p>
                    `).join('')}
                `;
            })
            .catch(() => {
                document.getElementById('forecast').innerText = 'Unable to load forecast data.';
            });
    }

    getCurrentWeather();
    getWeatherForecast();
});
