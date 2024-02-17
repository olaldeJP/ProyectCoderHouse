const usserName = "unUsuario";
const ordenDeProduct = document.querySelector("#ordenar");
const botonBuscar = document.querySelector("#botonBuscar");
const botonDesc = document.querySelectorAll("#botonDescripcon");
const divContainer = document.querySelector("#containerProducts");
const buttonAddProduct = document.querySelector("#addProduct");
const limit = document.querySelector("#limit");
const inpB = document.querySelector("#inputBuscador");
const buttonLimit = document.querySelector("#limitButton");
const buttonNext = document.querySelector("#aNext");
const buttonPrev = document.querySelector("#aPrev");

let ordenar = true;
window.addEventListener("load", async () => {
  let productsPag = await fetch(`/api/products/productsPaginate`).then(
    async (res) => {
      return await res.json();
    }
  );
  mostrarProductosPaginados(productsPag.payload);

  buttonLimit.addEventListener("click", async () => {
    let productsPag = await fetch(
      `/api/products/productsPaginate/?limit=${limit.value}`
    ).then(async (res) => {
      return await res.json();
    });
    mostrarProductosPaginados(productsPag.payload);
  });
  if (productsPag.hasNextPage) {
    buttonNext.addEventListener("click", async () => {
      productsPag = await fetch(
        `/api/products/productsPaginate/?limit=${limit.value}&page=${productsPag.nextPage}`
      ).then(async (res) => {
        return await res.json();
      });
      mostrarProductosPaginados(productsPag.payload);
    });
  }
  if (productsPag.hasPrevPage) {
    buttonPrev.addEventListener("click", async () => {
      productsPag = await fetch(
        `/api/products/productsPaginate/??limit=${limit.value}&page=${productsPag.hasPrevPage}`
      ).then(async (res) => {
        return await res.json();
      });
      mostrarProductosPaginados(productsPag.payload);
    });
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

async function mostrarProductosPaginados(payload) {
  divContainer.innerHTML = "";
  for (let index = 0; index < payload.length; index++) {
    const newElement = document.createElement("div");
    newElement.classList.add("box");
    newElement.innerHTML = `<p>title: ${payload[index].title}</p>
    <p>description: ${payload[index].description}</p>
    <p>price:${payload[index].price} </p>
    <p> STOCK: ${payload[index].stock}</p>
    <button > + </button><br>
    <button> Description </button>  
    `;
    divContainer.appendChild(newElement);
  }
}

botonBuscar.addEventListener("click", async (e) => {
  e.preventDefault();
  const valor = inpB.value;
  let productsPag = await fetch(
    `/api/products/productsPaginate/?title=${valor}`
  ).then(async (res) => {
    return await res.json();
  });
  mostrarProductosPaginados(productsPag.payload);
});
