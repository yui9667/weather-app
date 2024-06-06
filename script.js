const inputBox = document.getElementById("input-box");
const searchBtn = document.getElementById("search-btn");
const weatherTitle = document.querySelector("h1");
const forecastTitle = document.querySelector("h2");
const landingIcon = document.querySelector(".landing-icon");
const inputBtnContainer = document.querySelector(".input-btn-container");
const weatherContainer = document.querySelector(".weather-container");
const errorMessage = document.querySelector(".error-container");
const weeklyContainer = document.querySelector(".weekly-container");
const weeklyDates = document.querySelectorAll(".weekly-date");
const today = new Date();
const month = today.getMonth();
const date = today.getDate();
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

//Weekly weather
async function weeklyWeather(lat, lon) {
  const apiKey = "1e958d572843603c370ad31bc6fbfda2";
  const api = `http://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&appid=${apiKey}`;

  const response = await fetch(api)
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < 7; i++) {}
    });
}
async function weatherApi(city) {
  const apiKey = "1e958d572843603c370ad31bc6fbfda2";
  const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  try {
    const response = await fetch(api);
    if (!response) {
      errorMessage.style.display = "flex";
      throw new Error("City not found!");
    }

    const weatherData = await response.json();
    weatherContainer.innerHTML = "";
    //Spell error
    if (weatherData.cod === `404`) {
      errorMessage.style.display = "flex";

      return;
    }
    const currentDate = document.createElement("h3");
    currentDate.innerText = `${monthNames[month]} ${date} `;
    const location = document.createElement("h1");
    location.innerText = `${weatherData.name}`;
    const temp = document.createElement("h3");
    temp.innerText = `${Math.round(
      weatherData.main.temp - 273.15
    )} ℃ / ${Math.round(1.8 * (weatherData.main.temp - 273) + 32)} °F`;
    const weatherState = document.createElement("h3");
    weatherState.innerText = `${weatherData.weather[0].description}`;
    const weatherIcon = document.createElement("img");
    const iconCode = `${weatherData.weather[0].icon}`;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

    weatherIcon.src = iconUrl;
    weatherContainer.appendChild(currentDate);
    weatherContainer.appendChild(location);
    weatherContainer.appendChild(weatherIcon);
    weatherContainer.appendChild(temp);
    weatherContainer.appendChild(weatherState);

    console.log(weatherData);
    // No enter any words
  } catch (error) {
    errorMessage.style.display = "flex";
  }
}

function showingCss() {
  weatherTitle.classList.add("hide");
  forecastTitle.classList.add("hide");
  landingIcon.classList.add("hide");
  inputBtnContainer.classList.add("input-container");
  inputBox.classList.add("input-box2");
  searchBtn.classList.add("search-btn2");
}

searchBtn.addEventListener("click", () => {
  showingCss();
  errorMessage.style.display = "none";
  weatherApi(inputBox.value);
});
