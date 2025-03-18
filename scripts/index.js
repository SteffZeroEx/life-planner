"use strict";

import {initWeatherApp } from "./weather_app.js";
import { updateAllProgressBars } from "./progressbars.js";

document.addEventListener("DOMContentLoaded", () => {
  initWeatherApp();
  updateAllProgressBars();
});
