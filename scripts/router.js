"use strict";

export function initRouter() {
  const contentDiv = document.getElementById("content");

  function loadPage(url, saveToHistory = true) {
    fetch(url)
      .then((response) => response.text())
      .then((html) => {
        let range = document.createRange();
        let fragment = range.createContextualFragment(html);
        contentDiv.innerHTML = "";
        contentDiv.appendChild(fragment);
      })
      .catch((error) => console.log("Fehler beim Laden:", error));
  }
  function getDefaultPage() {
    return localStorage.getItem("defaultPage") || "./pages/dashboard.html";
  }
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      loadPage(this.getAttribute("href"));
    });
  });

  window.addEventListener("load", () => {
    const defaultPage = getDefaultPage();
    loadPage(defaultPage, false);
  });

  window.addEventListener("popstate", () => {
    let path = window.location.pathname;
    loadPage(path, false);
  });
}

export function setDefaultPage(url) {
  localStorage.setItem("defaultPage", url);
}
