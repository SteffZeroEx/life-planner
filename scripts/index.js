"use strict";

import { initRouter } from "./router.js";
import "./settings.js";

import { initWeatherApp } from "./weather_app.js";
import { updateAllProgressBars } from "./progressbars.js";

document.addEventListener("DOMContentLoaded", () => {
  // const savedDefault = localStorage.getItem("defaultPage") || 'dashboard.html';
  // document.getElementById("currentPage").textContent = savedDefault;

  initWeatherApp();
  updateAllProgressBars();
  initRouter();

  const menueBtn = document.querySelector(".menue-btn");
  menueBtn.addEventListener("click", (e) => {
    const navText = document.querySelectorAll(".nav-text");
    const navigationBar = document.getElementById("navigation");
    const mainContent = document.getElementById("mainContent");
    navText.forEach((text) => {
      text.classList.toggle("nav-text-hidden");
    });
    navigationBar.classList.toggle("navigation-shrink");
    mainContent.classList.toggle("mainContent-max")
  });
});
