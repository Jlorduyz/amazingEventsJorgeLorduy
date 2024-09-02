import * as funAma from "../modules/functions.js";
let URLFetch = "https://aulamindhub.github.io/amazing-api/events.json";
fetch(URLFetch)
  .then((response) => response.json())
  .then((response) => {
    funAma.crearEventos(response.events);
    funAma.crearCheckbox(response);
    let filtros = document.querySelectorAll(
      '#checkBoxHome input[type="checkbox"]'
    );
    filtros.forEach((checkbox) =>
      checkbox.addEventListener("change", function () {
        let eventosFiltrados = funAma.filterEvents(response);
        funAma.searchEvents(eventosFiltrados);
      })
    );
    document
      .getElementById("buscador")
      .addEventListener("keydown", function () {
        let eventosFiltrados = funAma.filterEvents(response);
        funAma.searchEvents(eventosFiltrados);
      });
  });
