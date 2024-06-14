const inputBox = document.getElementById("input-box");
const searchBtn = document.getElementById("search-btn");
const weatherTitle = document.querySelector("h1");
const forecastTitle = document.querySelector("h2");
const landingIcon = document.querySelector(".landing-icon");
const inputBtnContainer = document.querySelector(".input-btn-container");
const weatherContainer = document.querySelector(".weather-container");
const currentDate = document.querySelector(".date");
const place = document.querySelector(".place");
const weatherImg = document.querySelector(".weather-img");
const description = document.querySelector(".description");
const temp = document.querySelector(".temp");
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");
const errorMessage = document.querySelector(".error-container");
const weeklyContainer = document.querySelector(".weekly-container");
const weeklyDates = document.querySelectorAll(".weekly-date");
const weeklyImg = document.querySelectorAll(".weekly-img");
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
const apiKey = "1e958d572843603c370ad31bc6fbfda2";
//Weekly weather
async function weeklyWeather(lat, lon) {
  const api = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  let shouldContinue = true;
  const WeeklyToday = new Date();
  try {
    const response = await fetch(api);
    if (!response) {
      throw new Error("City not found!");
    }

    const weatherData = await response.json();

    if (weatherData && weatherData.list) {
      for (let i = 0; i < 7; i++) {
        if (!shouldContinue) break;
        const days = weatherData.list[i];
        const nextSevenDays = new Date(
          WeeklyToday.setDate(WeeklyToday.getDate() + 1)
        );
        const options = { month: "numeric", day: "numeric" };
        const newOptions = nextSevenDays.toLocaleDateString("en-US", options);
        const iconCode = `${days.weather[0].icon}`;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        weeklyImg[i].src = iconUrl;
        weeklyDates[i].innerHTML = newOptions;
        weeklyContainer.style.display = "grid";
      }
    } else {
      console.log(error.message);
    }
  } catch (error) {
    console.log(error.message);
  }
}

async function weatherApi(city) {
  const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  try {
    const response = await fetch(api);
    if (!response) {
      errorMessage.style.display = "flex";
      throw new Error("City not found!");
    }

    const weatherData = await response.json();
    //weatherContainer.innerHTML = "";
    //Spell error
    if (weatherData.cod === `404`) {
      errorMessage.style.display = "flex";
      weeklyContainer.style.display = "none";
      weatherContainer.style.display = "none";
      return;
    }
    //const currentDate = document.createElement("h3");
    //const location = document.createElement("h1");
    //location.style.fontSize = "60px"
    //const temp = document.createElement("h3");
    //const weatherState = document.createElement("h3");
    //const weatherIcon = document.createElement("img");
    // weatherContainer.appendChild(currentDate);
    // weatherContainer.appendChild(place);
    // weatherContainer.appendChild(weatherImg);
    // weatherContainer.appendChild(temp);
    // weatherContainer.appendChild(description);

    temp.innerHTML = `${Math.round(
      weatherData.main.temp - 273.15
    )} ℃ / ${Math.round(1.8 * (weatherData.main.temp - 273) + 32)} °F`;

    const iconCode = `${weatherData.weather[0].icon}`;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
    weatherImg.src = iconUrl;
    currentDate.innerHTML = `${monthNames[month]} ${date} `;
    place.innerText = `${weatherData.name}`;
    description.innerText = `${weatherData.weather[0].description}`;
    humidity.innerText = `Humidity: ${weatherData.main.humidity} %`;
    wind.innerText = `Wind: ${weatherData.wind.speed}km/h`;
    weatherContainer.style.display = "flex";
    weeklyWeather(weatherData.coord.lat, weatherData.coord.lon);
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
