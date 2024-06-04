const inputBox = document.getElementById("input-box");
const searchBtn = document.getElementById("search-btn");
const weatherTitle = document.querySelector("h1");
const forecastTitle = document.querySelector("h2");
const loadingIcon = document.querySelector(".loading-icon");
const inputBtnContainer = document.querySelector(".input-btn-container");

async function weatherApi(city) {
  const apiKey = "1e958d572843603c370ad31bc6fbfda2";
  const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  const weatherData = await fetch(`${api}`).then((response) => response.json());
  console.log(weatherData);
}

searchBtn.addEventListener("click", () => {
  weatherTitle.classList.add("hide");
  forecastTitle.classList.add("hide");
  loadingIcon.classList.add("hide");
  inputBtnContainer.classList.add("input-container");
  inputBox.classList.add("input-box2");
  searchBtn.classList.add("search-btn2");
  const temp = document.createElement("h3");
  temp.innerText = "Hi";
  document.body.appendChild(temp);
  weatherApi(inputBox.value);
});
