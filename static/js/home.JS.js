const usserName = "unUsuario";
const ordenDeProduct = document.querySelector("#ordenar");
const botonBuscar = document.querySelector("#botonBuscar");
const botonDesc = document.querySelectorAll("#botonDescripcon");
const buttonAddProduct = document.querySelector("#addProduct");
const socket = io("http://localhost:8080/", {
  auth: {
    usserName,
  },
});

let ordenar = true;
fetch("/api/sessions/current")
  .then(async (res) => {
    const data = await res.json();
    return JSON.stringify(data);
  })
  .then(async (req) => {
    const currentUser = await JSON.parse(req);
    if (currentUser.user.role === "admin") {
      buttonAddProduct.style.visibility = "hidden";
    }
  });
function irPagina(limit) {
  const pagDeseada = document.querySelector("input").value || 1;
  window.location = `/?limit=${limit}&page=${pagDeseada}&sort=${ordenar}`;
}
ordenDeProduct.addEventListener("change", function cambioOrden(limit) {
  try {
    ordenar = document.querySelector("#ordenar").value;
    console.log(ordenar);
    window.location = `/?sort=${ordenar}`;
  } catch (error) {
    console.log(error.message);
  }
});

async function descripcionProducto(button) {
  window.location = `/${button.parentNode.childNodes[1].textContent}`;
}

async function volver() {
  window.location = `/`;
}
