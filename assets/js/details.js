import * as funAma from "../modules/functions.js";
let urlObjeto = new URLSearchParams(window.location.search);
let identificador = urlObjeto.get("id");

let URLFetch = "https://aulamindhub.github.io/amazing-api/events.json";

fetch(URLFetch)
  .then((response) => response.json())
  .then((response) => {
    let eventoRender = response.events.find((i) => i._id == identificador);
    funAma.tarjetDetails(eventoRender);
  });
