import * as funAma from "../modules/functions.js";
let URLFetch = "https://aulamindhub.github.io/amazing-api/events.json";

fetch(URLFetch)
  .then((response) => response.json())
  .then((res) => {
    funAma.tablaStats(res.events);
  });
