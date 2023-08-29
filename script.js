const API_KEY = "9f35446da4dcef9b62b657a73c172c5d";

const cityName = document.getElementById("cityName");

const weatherName = document.getElementById("weatherName");

const weatherIcon = document.getElementById("weather-logo");

const temperature = document.getElementById("temperature");

const feelsLike = document.getElementById("feels-like");

const dateTime = document.getElementById("date-time");

const humidity = document.getElementById("humidity");

const windSpeed = document.getElementById("wind-speed");

const pressure = document.getElementById("pressure");

const windDirection = document.getElementById("wind-direction");

const sunrise = document.getElementById("sunrise");

const sunset = document.getElementById("sunset");

const visibility = document.getElementById("visibility");

const cityInput = document.getElementById("city-input");

cityInput.addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {
        const city = e.target.value;
        if (city === "") return alert("Please enter a city name");
        else getWeatherByLocation(city);
    }
});

getWeatherByLocation("pune");

async function getWeatherByLocation(location) {
    try {
        // fetch data from api
        const repsonse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`
        );

        // convert response to json
        const data = await repsonse.json();

        // check if city is valid
        if (data.cod === "404") return alert("Please enter a valid city name");

        //set ui data
        setUiData(data);
    } catch (error) {
        console.log(error);
    }
}

function setUiData(data) {
    temperature.innerHTML = `${data.main.temp}°C`;
    feelsLike.innerHTML = `Feels like ${data.main.feels_like}°C`;
    humidity.innerHTML = data.main.humidity;
    visibility.innerHTML = ` ${data.visibility / 1000}`;

    windSpeed.innerHTML = ` ${data.wind.speed}`;
    windDirection.innerHTML = `${data.wind.deg}°`;
    sunrise.innerHTML = `${new Date(data.sys.sunrise * 1000).toLocaleTimeString(
        [],
        { hour: "2-digit", minute: "2-digit", hour12: false }
    )}`;
    sunset.innerHTML = `${new Date(data.sys.sunset * 1000).toLocaleTimeString(
        [],
        { hour: "2-digit", minute: "2-digit", hour12: false }
    )}`;

    weatherName.innerHTML = `${data.weather[0].main}`;
    // weatherIcon.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    console.log(data.weather[0].icon)
    weatherIcon.src = `./src/img/${data.weather[0].icon}.svg`;
    cityName.innerHTML = `${data.name}, ${data.sys.country}`;

    // Get the current date and time
    const currentDate = new Date();

    // Format the date and time
    const formattedDateTime = `${currentDate.toLocaleDateString("en-US", {
        weekday: "long",
    })}, ${currentDate.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    })}`;

    // Update the dateTime element
    dateTime.innerHTML = formattedDateTime;
}
