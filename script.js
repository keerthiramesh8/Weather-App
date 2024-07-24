
document.addEventListener("DOMContentLoaded", function() {
    const searchButton = document.querySelector('.search button');
    const cityInput = document.querySelector('.search input');
    const weatherIcon = document.querySelector('.weather-icon');
    const tempElement = document.querySelector('.temp');
    const cityElement = document.querySelector('.city');
    const humidityElement = document.querySelector('.humidity');
    const windElement = document.querySelector('.Wind');
    const weatherSection = document.querySelector('.weather');
    const invalidCityMessage = document.createElement('p');

    invalidCityMessage.textContent = 'Invalid city name';
    invalidCityMessage.style.color = 'white';
    invalidCityMessage.style.display = 'none';
    document.querySelector('.search').appendChild(invalidCityMessage);

    const apiKey = 'dbfb4387fd9746a5b28afc31b7e1f761'; 

    weatherSection.style.display = 'none';

    searchButton.addEventListener('click', () => {
        const city = cityInput.value;
        getWeather(city);
    });

    function getWeather(city) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.cod === 200) {
                    updateWeather(data);
                    invalidCityMessage.style.display = 'none';
                    weatherSection.style.display = 'block';
                } else {
                    invalidCityMessage.style.display = 'block';
                    weatherSection.style.display = 'none';
                }
            })
            .catch(error => {
                console.error('Error fetching the weather data:', error);
                invalidCityMessage.style.display = 'block';
                weatherSection.style.display = 'none';
            });
    }

    function updateWeather(data) {
        cityElement.textContent = `${data.name}, ${data.sys.country}`;
        tempElement.textContent = `${Math.round(data.main.temp)}°C`;
        humidityElement.textContent = `${data.main.humidity}%`;
        windElement.textContent = `${data.wind.speed} km/h`;

        const weatherMain = data.weather[0].main.toLowerCase();
        if (weatherMain.includes('cloud')) {
            weatherIcon.src = 'images/clouds.png';
        } else if (weatherMain.includes('rain')) {
            weatherIcon.src = 'images/rain.png';
        } else if (weatherMain.includes('clear')) {
            weatherIcon.src = 'images/clear.png';
        } else if (weatherMain.includes('snow')) {
            weatherIcon.src = 'images/snow.png';
        } else if (weatherMain.includes('drizzle')) {
            weatherIcon.src = 'images/drizzle.png';
        } else if (weatherMain.includes('mist')) {
            weatherIcon.src = 'images/mist.png';
        } else {
            weatherIcon.src = 'images/default.png';
        }
    }
});

