const inputBox = document.getElementById("input-box");
const searchBtn = document.getElementById("search-btn");
const weatherTitle = document.querySelector("h1");
const forecastTitle = document.querySelector("h2");

function weatherApi() {
  const api =
    "https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid={API key}";
}

searchBtn.addEventListener("click", () => {
  weatherTitle.classList.add("hide");
  forecastTitle.classList.add("hide");
  weatherApi(inputBox);
});
