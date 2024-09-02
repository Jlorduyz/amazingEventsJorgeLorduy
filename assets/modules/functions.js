export function tarjetDetails(a) {
  let contenedor = document.getElementById("containerr");
  let tarjeta = document.createElement("div");

  tarjeta.classList.add("card", "mb-3", "col-8", "bg-dark", "bg-gradient");

  tarjeta.innerHTML = `<div class="row g-0 h-100">
        <div class="col-md-4">
          <img
            src="${a.image}"
            class="object-fit-cover img-fluid rounded-start h-100"
            alt="..."
          />
        </div>
        <div class="col-md-8">
          <div
            class="card-body d-flex flex-column justify-content-around h-100"
          >
            <h3 class="card-title fs-1 text-light">${a.name}</h3>
            <ul class="list-group gap-3 ">
              <li class="list-group-item bg-secondary bg-gradient text-light">
                Description: <span class="fw-bold fs-6">${a.description}</span>
              </li>
              <li class="list-group-item bg-secondary bg-gradient text-light">
                Category: <span class="fw-bold fs-6">${a.category}</span>
              </li>
              <li class="list-group-item bg-secondary bg-gradient text-light">
                Place: <span class="fw-bold fs-6">${a.place}</span>
              </li>
              <li class="list-group-item bg-secondary bg-gradient text-light">
                Date: <span class="fw-bold fs-6">${a.date}</span>
              </li>
            </ul>
            <p class="align-self-center text-light">
              Price: $<span class="fw-bold fs-5">${a.price}</span>
            </p>
          </div>
        </div>
      </div>`;

  contenedor.appendChild(tarjeta);
}

export function crearEventos(a) {
  let contenedor = document.getElementById("contenedor");
  contenedor.innerHTML = ``;
  for (let i = 0; i < a.length; i++) {
    let evento = document.createElement("div");
    evento.classList.add("card", "p-3");
    evento.innerHTML = `<img src=${a[i].image} class="card-img-top" alt="...">
    <div class="card-body d-flex flex-column justify-content-between">
      <h5 class="card-title">${a[i].name}</h5>
      <p class="card-text">${a[i].description}</p>
      <div><p class="fw-bold fs-5">Price: $${a[i].price}</p>
      <a href="./assets/pages/details.html?id=${a[i]._id}" class="btn btn-primary">Details</a></div>
    </div>`;

    contenedor.appendChild(evento);
  }
}
export function crearEventosFuturos(a) {
  let contenedor = document.getElementById("contenedor");
  contenedor.innerHTML = ``;
  for (let i = 0; i < a.length; i++) {
    let fecha = a[i].date.slice(0, 4);

    parseInt(fecha);
    let hoy = 2023;
    parseInt(hoy);
    if (fecha >= hoy) {
      let evento = document.createElement("div");
      evento.classList.add("card", "p-3");
      evento.innerHTML = `<img src=${a[i].image} class="card-img-top" alt="...">
    <div class="card-body d-flex flex-column justify-content-between">
      <h5 class="card-title">${a[i].name}</h5>
      <p class="card-text">${a[i].description}</p>
      <div><p class="fw-bold fs-5">Price: $${a[i].price}</p>
      <a href="./details.html?id=${a[i]._id}" class="btn btn-primary">Details</a></div>
    </div>`;

      contenedor.appendChild(evento);
    }
  }
}

export function crearEventosPasados(a) {
  let contenedor = document.getElementById("contenedor");
  contenedor.innerHTML = ``;
  for (let i = 0; i < a.length; i++) {
    let fecha = a[i].date.slice(0, 4);
    parseInt(fecha);
    let hoy = 2023;
    parseInt(hoy);
    if (fecha < hoy) {
      let evento = document.createElement("div");
      evento.classList.add("card", "p-3");
      evento.innerHTML = `<img src=${a[i].image} class="card-img-top" alt="...">
    <div class="card-body d-flex flex-column justify-content-between">
      <h5 class="card-title">${a[i].name}</h5>
      <p class="card-text">${a[i].description}</p>
      <div><p class="fw-bold fs-5">Price: $${a[i].price}</p>
      <a href="./details.html?id=${a[i]._id}" class="btn btn-primary">Details</a></div>
    </div>`;

      contenedor.appendChild(evento);
    }
  }
}

export function crearCheckbox(a) {
  let checkboxcreate = [];
  for (let i = 0; i < a.events.length; i++) {
    let actual = a.events[i].category;
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

export function filterEvents(a) {
  let filtros = document.querySelectorAll(
    '#checkBoxHome input[type="checkbox"]'
  );
  let selecionarCategoria = Array.from(filtros)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value);

  let eventosFiltrados = a.events;

  if (selecionarCategoria.length > 0) {
    eventosFiltrados = eventosFiltrados.filter((event) =>
      selecionarCategoria.includes(event.category)
    );
  }

  return eventosFiltrados;
}

export function searchEvents(eventosFiltrados) {
  let barraBusqueda = document.getElementById("buscador").value.toLowerCase();
  let eventosEncontrados = eventosFiltrados.filter(
    (evento) =>
      evento.name.toLowerCase().includes(barraBusqueda) ||
      evento.description.toLowerCase().includes(barraBusqueda)
  );

  if (eventosEncontrados.length > 0) {
    crearEventos(eventosEncontrados);
  } else {
    document.getElementById(
      "contenedor"
    ).innerHTML = `<p class="fs-3">Ningun evento coincide con su busqueda.</p>`;
  }
}
export function tablaStats(a) {
  let contenedor = document.getElementById("tablaStats");
  function mayorAsistencia() {
    let evento = { assistance: 0, capacity: 0 };
    let porcentajeResultado = 0;
    for (let i = 0; i < a.length; i++) {
      let porcentajeAsistencia = (a[i].assistance / a[i].capacity) * 100;
      if (porcentajeAsistencia > porcentajeResultado) {
        evento = a[i];
        porcentajeResultado = porcentajeAsistencia.toFixed(2);
      }
      document.getElementById(
        "eh"
      ).innerHTML = `${evento.name} (${porcentajeResultado}%)`;
    }
  }
  function menorAsistencia() {
    let evento = { assistance: 0, capacity: 0 };
    let porcentajeResultado = 100;
    for (let i = 0; i < a.length; i++) {
      let porcentajeAsistencia = (a[i].assistance / a[i].capacity) * 100;
      if (porcentajeAsistencia < porcentajeResultado) {
        evento = a[i];
        porcentajeResultado = porcentajeAsistencia.toFixed(2);
      }
      document.getElementById(
        "el"
      ).innerHTML = `${evento.name} (${porcentajeResultado}%)`;
    }
  }
  function mayorCapacidad() {
    let evento = { capacity: 0 };
    let capacidad = 0;
    for (let i = 0; i < a.length; i++) {
      if (a[i].capacity > evento.capacity) {
        evento = a[i];
        capacidad = a[i].capacity;
      }
    }
    document.getElementById("ec").innerHTML = `${evento.name} (${capacidad})`;
  }
  function upcoming() {
    let eventos = a.filter((res) => res.date.slice(0, 4) >= 2023);

    let categoriasU = eventos.reduce((acc, evento) => {
      if (!acc.includes(evento.category)) {
        acc.push(evento.category);
      }
      return acc;
    }, []);

    let gananciasU = categoriasU.map((categoria) => {
      let porCategory = eventos.filter((res) => res.category == categoria);
      let gananciasFinal = porCategory.reduce((acumulador, evento) => {
        return acumulador + evento.estimate * evento.price;
      }, 0);
      return gananciasFinal;
    });

    let asistenciasU = categoriasU.map((categoria) => {
      let porCategory = eventos.filter((res) => res.category == categoria);
      let estimados = porCategory.reduce((acumulador, evento) => {
        return acumulador + +evento.estimate;
      }, 0);
      let capacidades = porCategory.reduce((acumulador, evento) => {
        return acumulador + +evento.capacity;
      }, 0);
      let porcentajeFinal = (estimados / capacidades) * 100;
      return porcentajeFinal.toFixed(2);
    });

    categoriasU.forEach((categoria, index) => {
      let fila = document.createElement("tr");
      fila.innerHTML = `<td>${categoria}</td>
                        <td>$${gananciasU[index]}</td>
                        <td>${asistenciasU[index]}%</td>`;
      contenedor.appendChild(fila);
    });
  }

  function past() {
    let eventos = a.filter((res) => res.date.slice(0, 4) < 2023);

    let categoriasU = eventos.reduce((acc, evento) => {
      if (!acc.includes(evento.category)) {
        acc.push(evento.category);
      }
      return acc;
    }, []);

    let gananciasU = categoriasU.map((categoria) => {
      let porCategory = eventos.filter((res) => res.category == categoria);
      let gananciasFinal = porCategory.reduce((acumulador, evento) => {
        return acumulador + evento.assistance * evento.price;
      }, 0);
      return gananciasFinal;
    });

    let asistenciasU = categoriasU.map((categoria) => {
      let porCategory = eventos.filter((res) => res.category == categoria);
      let estimados = porCategory.reduce((acumulador, evento) => {
        return acumulador + +evento.assistance;
      }, 0);
      let capacidades = porCategory.reduce((acumulador, evento) => {
        return acumulador + +evento.capacity;
      }, 0);
      let porcentajeFinal = (estimados / capacidades) * 100;
      return porcentajeFinal.toFixed(2);
    });

    let pasttitles = document.createElement("tr");
    pasttitles.innerHTML = `<th class="text-center bg-danger bg-gradient" colspan="3">Past events statistics by category</th></tr>`;
    contenedor.appendChild(pasttitles);

    let pasttitlesb = document.createElement("tr");
    pasttitlesb.innerHTML = `<td class="text-bg-dark">Categories</td><td class="text-bg-dark">Revenues</td><td class="text-bg-dark">Percentage of assistance</td>`;
    contenedor.appendChild(pasttitlesb);

    categoriasU.forEach((categoria, index) => {
      let fila = document.createElement("tr");
      fila.innerHTML = `<td>${categoria}</td>
                        <td>$${gananciasU[index]}</td>
                        <td>${asistenciasU[index]}%</td>`;
      contenedor.appendChild(fila);
    });
  }
  mayorAsistencia();
  menorAsistencia();
  mayorCapacidad();
  upcoming();
  past();
}
