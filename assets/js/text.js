let contenedor = document.getElementById("contenedor");
function crearEventos(a) {
  contenedor.innerHTML = ``;
  for (let i = 0; i < a.length; i++) {
    let fecha = data.events[i].date.slice(0, 4);
    parseInt(fecha);
    let hoy = data.currentDate.slice(0, 4);
    parseInt(hoy);
    if (fecha < hoy) {
      let evento = document.createElement("div");
      evento.classList.add("card", "p-3");
      evento.innerHTML = `<img src=${a[i].image} class="card-img-top" alt="...">
  <div class="card-body d-flex flex-column justify-content-between">
    <h5 class="card-title">${a[i].name}</h5>
    <p class="card-text">${a[i].description}</p>
    <div><p class="fw-bold fs-5">Price: $${a[i].price}</p>
    <a href="#" class="btn btn-primary">Details</a></div>
  </div>`;

      contenedor.appendChild(evento);
    }
  }
}
crearEventos(data.events);

function crearCheckbox() {
  let checkboxcreate = [];
  for (let i = 0; i < data.events.length; i++) {
    let actual = data.events[i].category;
    if (checkboxcreate.includes(actual)) {
    } else {
      checkboxcreate.push(actual);
    }
  }
  let lugar = document.getElementById("checkBoxHome");
  let contador = 0;
  for (let i = 0; i < checkboxcreate.length; i++) {
    let label = document.createElement("label");
    contador++;
    label.innerHTML = `<input type="checkBox" name="option" value="${checkboxcreate[i]}">${checkboxcreate[i]}`;
    lugar.appendChild(label);
  }
}
crearCheckbox();
let filtros = document.querySelectorAll('#checkBoxHome input[type="checkbox"]');

function filterEvents() {
  let selecionarCategoria = Array.from(filtros)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value);

  let eventosFiltrados = data.events;

  if (selecionarCategoria.length > 0) {
    eventosFiltrados = eventosFiltrados.filter((event) =>
      selecionarCategoria.includes(event.category)
    );
  }

  return eventosFiltrados;
}

function searchEvents(eventosFiltrados) {
  let barraBusqueda = document.getElementById("buscador").value.toLowerCase();
  let eventosEncontrados = eventosFiltrados.filter(
    (evento) =>
      evento.name.toLowerCase().includes(barraBusqueda) ||
      evento.description.toLowerCase().includes(barraBusqueda)
  );

  crearEventos(eventosEncontrados);
}

filtros.forEach((checkbox) =>
  checkbox.addEventListener("change", function () {
    let eventosFiltrados = filterEvents();
    searchEvents(eventosFiltrados);
  })
);

document.getElementById("buscador").addEventListener("keydown", function () {
  let eventosFiltrados = filterEvents();
  searchEvents(eventosFiltrados);
});
