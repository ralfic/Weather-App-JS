// APIDATA
const API_KEY = "980a02c5f8d140c8947134254242609";
const BASE_URL = "http://api.weatherapi.com/v1";
// APIDATA

const weatherMenuList = document.querySelector(".weather-menu__list");
const inputSerach = document.querySelector(".input__serach");
const btnSerach = document.querySelector(".weather-menu__serach svg");
const menuSerach = document.querySelector(".weather-menu__serach");
const weatherForecastList = document.querySelector(".weather-forecast__list");
const btnCloseWeatherMenu = document.querySelector(".weather-menu__btn");
const weatherMenu = document.querySelector(".weather-menu");

// WeatherMenu
btnCloseWeatherMenu.addEventListener("click", () => {
  weatherMenu.classList.toggle("weather-menu--hide");
  btnCloseWeatherMenu.classList.toggle("weather-menu__btn--hide");
  document
    .querySelector(`.wrapper-base`)
    .classList.toggle("wrapper-base--open");
});
// WeatherMenu

// Data now
const days = ["Sun", "Mon", "Tues", "Wed", "Thursday", "Friday", "Saturday"];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

setDataNow();

function setDataNow() {
  const theDay = new Date();
  document.querySelector(".info-data").textContent = `${theDay
    .toLocaleTimeString()
    .slice(0, -3)} - ${days[theDay.getDay()]}, ${theDay.getMonth() + 1} ${
    months[theDay.getMonth()]
  } ${theDay.getDate()}`;
}

const intervalData = setInterval(setDataNow, 10000);
// Data now

// Search
menuSerach.addEventListener("submit", (e) => {
  e.preventDefault();
  if (inputSerach.value.length > 4) getWeather(inputSerach.value);
});
// Search

// GetIconWeather
function getIconWeather(weather, is_day = 1) {
  switch (weather.trim()) {
    case "Patchy rain nearby":
      return `/img/icon/Rain.svg`;
    case "Clear":
      return `/img/icon/Nigth.svg`;
    case "Sunny":
      return `/img/icon/Sunn.svg`;
    case "Partly Cloudy":
      if (is_day == 1) return `/img/icon/Partly-cloudy.svg`;
      return `/img/icon/Partly-cloudy-night.svg`;
    case "Partly cloudy":
      if (is_day == 1) `/img/icon/Partly-cloudy.svg`;
      return `/img/icon/Partly-cloudy-night.svg`;
    case "Cloudy":
      return `/img/icon/Cloudy.svg`;
    case `Overcast`:
      return `/img/icon/Cloudy.svg`;
    case "Mist":
      return `/img/icon/Foggy.svg`;
    case "Patchy rain possible":
      return `/img/icon/Snow.svg`;
    case "Patchy sleet possible":
      return `/img/icon/Sleet.svg `;
    case "Patchy freezing drizzle possible":
      return `/img/icon/Drizzle.svg`;
    case "Thundery outbreaks possible":
      return `/img/icon/Thunderstorm.svg`;
    case "Blowing snow":
      return `/img/icon/Blowing-snow.svg `;
    case "Blizzard":
      return `/img/icon/Blizzard.svg`;
    case "Fog":
      return `/img/icon/Foggy.svg`;
    case "Freezing fog":
      return `/img/icon/Foggy.svg`;
    case "Patchy light drizzle":
      return `/img/icon/Rain.svg`;
    case "Light drizzle":
      return `/img/icon/Drizzle.svg`;
    case "Freezing drizzle":
      return `/img/icon/Drizzle.svg`;
    case "Heavy freezing drizzle":
      return `/img/icon/Drizzle.svg`;
    case "Patchy light rain":
      return `/img/icon/Rain.svg`;
    case "Light rain":
      return `/img/icon/Rain.svg`;
    case "Light rai":
      return `/img/icon/Rain.svg`;
    case "Moderate rain at times":
      return `/img/icon/Rain.svg`;
    case "Moderate rain":
      return `/img/icon/Rain.svg`;
    case "Heavy rain at times":
      return `/img/icon/Heavy-rain.svg`;
    case "Heavy rain":
      return `/img/icon/Heavy-rain.svg`;
    case "Light freezing rain":
      return `/img/icon/Rain.svg`;
    case "Moderate or heavy freezing rain":
      return `/img/icon/Heavy-rain.svg`;
    case "Light sleet":
      return `/img/icon/Sleet.svg`;
    case "Moderate or heavy sleet":
      return `/img/icon/Sleet.svg`;
    case "Patchy light snow":
      return `/img/icon/Snow.svg`;
    case "Light snow":
      return `/img/icon/Snow.svg`;
    case "Patchy moderate snow":
      return `/img/icon/Snow.svg`;
    case "Moderate snow":
      return `/img/icon/Snow.svg`;
    case "Patchy heavy snow":
      return `/img/icon/Blizzard.svg`;
    case "Heavy snow":
      return `/img/icon/Blizzard.svg`;
    case "Ice pellets":
      return `/img/icon/Hail.svg`;
    case "Light rain shower":
      return `/img/icon/Drizzle.svg`;
    case "Moderate or heavy rain shower":
      return `/img/icon/Heavy-rain.svg`;
    case "Torrential rain shower":
      return `/img/icon/Heavy-rain.svg`;
    case "Light sleet showers":
      return `/img/icon/Sleet.svg`;
    case "Moderate or heavy sleet showers":
      return `/img/icon/Sleet.svg`;
    case "Light snow showers":
      return `/img/icon/Snow.svg`;
    case "Moderate or heavy snow showers":
      return `/img/icon/Blizzard.svg`;
    case "Light showers of ice pellets":
      return `/img/icon/Hail.svg`;
    case "Moderate or heavy showers of ice pellets":
      return `/img/icon/Hail.svg`;
    case "Patchy light rain with thunder":
      return `/img/icon/Thunderstorm-rain.svg`;
    case "Moderate or heavy rain with thunder":
      return `/img/icon/Thunderstorm-rain.svg`;
    case "Patchy light snow with thunder":
      return `/img/icon/Thunderstorm.svg`;
    case "Moderate or heavy snow with thunder":
      return `/img/icon/Thunderstorm.svg`;
  }
}
// GetIconWeather

// Realtime
getWeather("London");

async function getWeather(cityName) {
  await fetch(`${BASE_URL}/forecast.json?key=${API_KEY}&q=${cityName}`)
    .then((resp) => resp.json())
    .then((res) => {
      setWeaterData(res);
      getWeatherForecastDays(cityName);
    })
    .catch((err) => console.error(err));
}

function setWeaterData(data) {
  const {
    temp_c,
    cloud,
    humidity,
    condition: { text: weather },
    wind_kph,
  } = data.current;

  const { maxtemp_c, mintemp_c } = data.forecast.forecastday[0].day;

  const { name } = data.location;

  weatherMenuList.innerHTML = `
          <div class="weather-menu__item">
            Temp °C<span>${temp_c}°C</span><img class="icon-menu" src="/img/icon-weather/temp.svg"></img>
          </div>
           <div class="weather-menu__item">
            Temp Max °C<span>${maxtemp_c}°C</span><img class="icon-menu" src="/img/icon-weather/temp-max.svg"></img>
          </div>
           <div class="weather-menu__item">
            Temp Min °C<span>${mintemp_c}°C</span><img class="icon-menu" src="/img/icon-weather/temp-min.svg"></img>
          </div>
  
          <div class="weather-menu__item">
            Humidity<span>${humidity}%</span><img class="icon-menu" src="/img/icon/Hymibity.svg"></img>
          </div>
          <div class="weather-menu__item">
            Wind<span>${wind_kph}km/h</span><img class="icon-menu" src="/img/icon/Wind.svg"></img>
          </div>
          <div class="weather-menu__item">
            Cloud<span>${cloud}%</span><img class="icon-menu" src="/img/icon/Cloudy.svg"></img>
          </div>
          `;

  renderWeatherInfoBox(temp_c, name, weather);

  renderWeatherForecast(data.forecast.forecastday[0]);
}

function renderWeatherInfoBox(temp, name, weather) {
  document.querySelector(".info-deg").textContent = temp + "°";
  document.querySelector(".info-title").textContent = name;
  document.querySelector(".info-weather__icon").src = getIconWeather(weather);
  document.querySelector(".info-weather__condit").textContent = weather;
}

// Realtime

// Forecast

function renderWeatherForecast(data) {
  document.querySelector(".swiper-wrapper").innerHTML = "";

  for (const elem of data.hour) {
    const {
      time,
      condition: { text: weather },
      is_day,
      temp_c,
    } = elem;

    document.querySelector(
      ".swiper-wrapper"
    ).innerHTML += `<div class="weather-forecast__item swiper-slide">
            <div class="weather-forecast__data">${
              time.slice(-5) === `${new Date().getHours()}:00`
                ? "Now"
                : time.slice(-5)
            }</div>
            <img
              src="${getIconWeather(weather, is_day)}"
              alt=""
              class=".info-weather__icon weather-forecast__icon"
            />
            <div class="weather-forecast__deg">${temp_c}°</div>
          </div>`;
  }

  // Slider
  new Swiper(".swiper", {
    speed: 1000,

    pagination: {
      el: ".swiper-pagination",
    },

    breakpoints: {
      0: {
        slidesPerView: 2,
      },
      864: {
        slidesPerView: 3,
        slidesPerGroup: 3,
      },
      1400: {
        slidesPerView: 4,
        slidesPerGroup: 2,
      },
      1600: {
        slidesPerView: 6,
        slidesPerGroup: 3,
      },
    },

    spaceBetween: 10,
  });
  // Slider
}
// Forecast

// Forecast Days

function renderDataForecast(date) {
  const dataTime = new Date(date);

  return ` ${days[dataTime.getDay()]} ${
    dataTime.getMonth() + 1
  }/${dataTime.getDate()}`;
}

function renderWeatherForecastFewDays(data) {
  const {
    date,
    day: {
      avgtemp_c,
      condition: { text },
    },
  } = data;
  document.querySelector(
    ".weather-menu__forecast-list-days"
  ).innerHTML += `<div class="weather-menu__forecast-item">
            <div> 
              <img class="forecast-item__icon" src="${getIconWeather(
                text
              )}"></img>
              <div>
                <div class="forecast-item__data">${renderDataForecast(
                  date
                )}</div>
                <div class="forecast-item__weather">${text}</div>
              </div>
            </div>
            <div class="forecast-item__temp">${avgtemp_c}°</div>
          </div>`;
}

async function getWeatherForecastDays(cityName) {
  document.querySelector(".weather-menu__forecast-list-days").innerHTML = "";
  const dataNow = new Date();
  for (let day = 1; day <= 5; day++) {
    dataNow.setDate(dataNow.getDate() + 1);

    const forecastDay = `${dataNow.getFullYear()}-${
      1 + dataNow.getMonth().toString().length == 1
        ? `0${dataNow.getMonth()}`
        : dataNow.getMonth() + 1
    }-${
      dataNow.getDate().toString().length == 1
        ? `0${dataNow.getDate()}`
        : dataNow.getDate()
    }`;

    await fetch(
      `${BASE_URL}/forecast.json?key=${API_KEY}&q=${cityName}&date=${forecastDay}`
    )
      .then((resp) => resp.json())
      .then((res) => {
        renderWeatherForecastFewDays(res.forecast.forecastday[0]);
      })
      .catch((err) => console.error(err));
  }
}
// Forecast Days
