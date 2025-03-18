"use strict";

const locationInput = document.querySelector(".locationInput");
const currWeatherTemp = document.querySelector(".curr-w-temp");
const currWeatherIcon = document.querySelector(".curr-w-icon");
const currWeatherText = document.querySelector(".curr-w-text");
const forecastDays = document.querySelectorAll(".forecast-day");

const defaultLocation = localStorage.getItem("location") || "Standort";
locationInput.value = defaultLocation;

function getDataCurrent(location) {
  fetch(
    `http://api.weatherapi.com/v1/current.json?key=c02ab58f17e84660a7b134735241612&q=${location}&aqi=no&lang=${"de"}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log("Empfangene API-Daten (Current):", data);
      replaceDataCurrent(data);
    })
    .catch((error) => console.error("Fehler beim Abrufen der Wetterdaten:", error));
}
function getDataForecast(location) {
  fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=c02ab58f17e84660a7b134735241612&q=${location}&aqi=no&lang=${"de"}&days=4`
  )
    .then((res) => res.json())
    .then((data) => replaceDataForecast(data.forecast.forecastday.slice(1)))
    .catch((error) => console.error("Fehler beim Abrufen der Wettervorhersage:", error));
}

function replaceDataCurrent(data) {
  if (!data || !data.current || !data.location) {
    console.error("Fehlerhafte API-Daten erhalten", data);
     currWeatherIcon.src = "";
     currWeatherText.textContent = "Daten nicht verfügbar";
     currWeatherTemp.textContent = "--°C";
     locationInput.value = "Unbekannt";
     return;
  }

  currWeatherIcon.src = `https:${data.current.condition.icon.replaceAll(64, 128)}`;
  currWeatherText.textContent = `${data.current.condition.text}`.toLowerCase();
  currWeatherTemp.textContent = `${data.current.temp_c.toFixed()}°C`;
  locationInput.value = data.location.name || "Unbekannter Ort";

   adjustWidth();
}

function replaceDataForecast(forecastData) {
  forecastDays.forEach((dayEl, index) => {
    if (forecastData[index]) {
      const date = new Date(forecastData[index].date);

      dayEl.querySelector(".forecast-weekday").textContent = getWeekday(date);
      dayEl.querySelector(".forecast-date").textContent = formatDate(date);
      dayEl.querySelector(".forecast-temp").textContent = `${forecastData[
        index
      ].day.maxtemp_c.toFixed()}°C ${forecastData[index].day.mintemp_c.toFixed()}°C`;
      dayEl.querySelector(".forecast-icon").src = `https:${forecastData[index].day.condition.icon.replaceAll(64, 128)}`;
      dayEl.querySelector(".forecast-text").textContent = forecastData[index].day.condition.text.toLowerCase();
    }
  });
}

function getWeekday(date) {
  return date.toLocaleDateString("de-DE", { weekday: "short" });
}

function formatDate(date) {
  return date.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit" });
}
/* 
Dynamische Anpassung der Breite des Input Feldes ".locationInput"
*/
function adjustWidth() {
  const text = locationInput.value;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  ctx.font = getComputedStyle(locationInput).font;
  const textWidth = ctx.measureText(text).width;
  locationInput.style.width = textWidth + "px";
}
locationInput.addEventListener("input", adjustWidth);


locationInput.addEventListener("click", (e)=> {
  locationInput.value = "";
})
document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const newLocation = locationInput.value.trim();
    if (newLocation) {
      localStorage.setItem("location", locationInput.value);
      getDataCurrent(newLocation);
      getDataForecast(newLocation);
    }
    locationInput.blur();
  }
});

adjustWidth();
getDataCurrent(defaultLocation);
getDataForecast(defaultLocation);
