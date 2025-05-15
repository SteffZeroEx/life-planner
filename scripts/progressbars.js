"use strict";

function updateProgressBar(elementId, startTime, endTime) {
  const now = new Date();
  const totalDuration = (endTime - startTime) / 1000;
  const elapsed = (now - startTime) / 1000;
  const percentage = Math.floor((elapsed / totalDuration) * 100);

  const progressBar = document.getElementById(elementId);
  if (progressBar) {
    progressBar.value = Math.max(0, Math.min(percentage, 100));
    

    const percentageDisplay = document.getElementById(`${elementId}-percentage`);
    if (percentageDisplay) {
      percentageDisplay.textContent = `${Math.max(0, Math.min(percentage, 100))}%`;
    }
  }
}

function updateAllProgressBars() {
  const now = new Date();

  const startOfYear = new Date(now.getFullYear(), 0);
  const endOfYear = new Date(now.getFullYear() + 1, 0);
  updateProgressBar("progressBarYear", startOfYear, endOfYear);

  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
  updateProgressBar("progressBarMonth", startOfMonth, endOfMonth);

  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay() + 1);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59);
  updateProgressBar("progressBarWeek", startOfWeek, endOfWeek);

  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
  const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
  updateProgressBar("progressBarDay", startOfDay, endOfDay);
}
updateAllProgressBars();

setInterval(updateAllProgressBars, 1000);

export {updateAllProgressBars};
