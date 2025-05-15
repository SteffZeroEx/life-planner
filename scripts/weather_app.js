"use strict";

let locationInput, currWeatherTemp, currWeatherIcon, currWeatherText, forecastDays;
const API_Key = "c02ab58f17e84660a7b134735241612";

document.addEventListener("DOMContentLoaded", () => {
  locationInput = document.querySelector(".locationInput");
  currWeatherTemp = document.querySelector(".curr-w-temp");
  currWeatherIcon = document.querySelector(".curr-w-icon");
  currWeatherText = document.querySelector(".curr-w-text");
  forecastDays = document.querySelectorAll(".forecast-day");

  if (locationInput) {
    locationInput.value = localStorage.getItem("location") || "Standort";
  }

  initWeatherApp();
});

function getDataCurrent(location) {
  fetch(`https://api.weatherapi.com/v1/current.json?key=${API_Key}&q=${location}&aqi=no&lang=de`)
    .then((res) => res.json())
    .then((data) => {
      console.log("Empfangene API-Daten (Current):", data);
      replaceDataCurrent(data);
    })
    .catch((error) => console.error("Fehler beim Abrufen der Wetterdaten:", error));
}

function getDataForecast(location) {
  fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_Key}&q=${location}&aqi=no&lang=de&days=4`)
    .then((res) => res.json())
    .then((data) => replaceDataForecast(data.forecast.forecastday.slice(1)))
    .catch((error) => console.error("Fehler beim Abrufen der Wettervorhersage:", error));
}

function replaceDataCurrent(data) {
  if (!data || !data.current || !data.location) {
    console.error("Fehlerhafte API-Daten erhalten", data);
    if (currWeatherIcon) currWeatherIcon.src = "";
    if (currWeatherText) currWeatherText.textContent = "Daten nicht verfügbar";
    if (currWeatherTemp) currWeatherTemp.textContent = "--°C";
    if (locationInput) locationInput.value = "Unbekannt";
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

function adjustWidth() {
  if (!locationInput) return;
  const text = locationInput.value;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  ctx.font = getComputedStyle(locationInput).font;
  const textWidth = ctx.measureText(text).width;
  locationInput.style.width = textWidth + "px";
}

function initWeatherApp() {
  if (!locationInput) return;

  locationInput.addEventListener("input", adjustWidth);
  locationInput.addEventListener("click", () => {
    locationInput.value = "";
  });

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
  getDataCurrent(locationInput.value);
  getDataForecast(locationInput.value);
}

export { getDataCurrent, getDataForecast, initWeatherApp };
