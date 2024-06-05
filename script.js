const inputBox = document.getElementById("input-box");
const searchBtn = document.getElementById("search-btn");
const weatherTitle = document.querySelector("h1");
const forecastTitle = document.querySelector("h2");
const loadingIcon = document.querySelector(".loading-icon");
const inputBtnContainer = document.querySelector(".input-btn-container");

async function weatherApi(city) {
  const apiKey = "1e958d572843603c370ad31bc6fbfda2";
  const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  function resultWeather() {
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

    document.body.appendChild(location);

    document.body.appendChild(weatherIcon);
    weatherIcon.src = iconUrl;
    document.body.appendChild(temp);
    document.body.appendChild(weatherState);
  }

  const weatherData = await fetch(`${api}`).then((response) => response.json());
  resultWeather();
  console.log(weatherData);
}
function showingCss() {
  weatherTitle.classList.add("hide");
  forecastTitle.classList.add("hide");
  loadingIcon.classList.add("hide");
  inputBtnContainer.classList.add("input-container");
  inputBox.classList.add("input-box2");
  searchBtn.classList.add("search-btn2");
}

searchBtn.addEventListener("click", () => {
  showingCss();

  weatherApi(inputBox.value);
});
