// API key for OpenWeather API
const apiKey = `bcff680676cdb6a673067d2c064f8c9c`;

// Fetches weather data for the specified city
async function fetchWeatherData(city) {
  try {
    // Fetching weather data from the API
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );
    if (!response.ok) {
      throw new Error("Unable to fetch weather data");
    }
    const data = await response.json();
    console.log(data); // For debugging
    updateWeatherUI(data); // Update the UI with fetched data
  } catch (error) {
    console.error(error); // Handle errors
  }
}

// DOM elements for displaying data
const cityElement = document.querySelector(".search-city");
const temperature = document.querySelector(".temperature");
const windSpeed = document.querySelector(".wind-speed");
const humidity = document.querySelector(".humidity");
const visibility = document.querySelector(".visibility");
const decText = document.querySelector(".dec-text");
const date = document.querySelector(".date");
const descriptionIcon = document.querySelector(".dec-h4 i");

// Updates the UI with weather data
function updateWeatherUI(data) {
  // Display city name, temperature, wind speed, humidity, and visibility
  cityElement.textContent = data.name;
  temperature.textContent = `${Math.round(data.main.temp)}`;
  windSpeed.textContent = `${data.wind.speed} km/h`;
  humidity.textContent = `${data.main.humidity}%`;
  visibility.textContent = data.visibility / 1000; // Convert meters to km
  decText.textContent = data.weather[0].description;

  // Display current date
  const currentDate = new Date();
  date.textContent = currentDate.toDateString();
  // Set appropriate weather icon based on condition
  const weatherIconName = getWeatherIconName(data.weather[0].main);
  descriptionIcon.innerHTML = `<i class="${weatherIconName}"></i>`;
}

// Handle form submission to search for a city
const formElement = document.querySelector(".search-form");
const inputElement = document.querySelector(".cityname");

formElement.addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent page refresh on form submit

  const city = inputElement.value; // Get city name from input
  if (city != "") {
    fetchWeatherData(city); // Fetch weather for the entered city
  }
});

// Map weather conditions to icon classes from remixicon library
function getWeatherIconName(weatherCondition) {
  const iconMap = {
    Clear: "ri-sun-line",
    Clouds: "ri-cloudy-2-line",
    Rain: "ri-rainy-fill",
    Thunderstrom: "ri-thunderstorms-fill",
    Drizzle: "ri-drizzle-line",
    Snow: "ri-snowy-fill",
    Mist: "ri-mist-fill",
    Smoke: "ri-moon-foggy-fill",
    Haze: "ri-haze-line",
    Fog: "ri-sun-foggy-fil",
  };

  return iconMap[weatherCondition] || "help"; // Default icon if condition not found
}
