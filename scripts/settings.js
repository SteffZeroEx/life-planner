import { setDefaultPage } from "./router.js";

document.addEventListener("DOMContentLoaded", () => {
  const savedDefault = localStorage.getItem("defaultPage") || "./pages/dashboard.html";
  const defaultPageSelect = document.getElementById("defaultPageSelect");
  const saveButton = document.getElementById("saveSettings");

  if (defaultPageSelect) {
    defaultPageSelect.value = savedDefault;
  }

  if (saveButton) {
    saveButton.addEventListener("click", () => {
      const newDefault = defaultPageSelect.value;
      setDefaultPage(newDefault);
      alert("Standardseite gespeichert: " + newDefault);
    });
  }
});
