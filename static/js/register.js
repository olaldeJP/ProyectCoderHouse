const formReg = document.querySelector("#formRegister");
const enviarR = document.querySelector("#enviarRegistro");

formReg?.addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    const inputsValores = JSON.stringify({
      email: document.querySelector("#email").value,
      password: document.querySelector("#password").value,
      first_name: document.querySelector("#first_name").value,
    });
    //Se envia la peticion POST con la informacion del formulario y se redirige al home con el res.session['usser] {first_name , last_name. isAdmin}
    const response = await fetch("/api/sessions/register", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      // @ts-ignore
      body: new URLSearchParams(new FormData(formRegister)),
    });
    if (response.status == 201) {
      // el satatus esta bien redirecciona a /
      window.location.href = `/`;
    }
    window.location.href = `/login`;
    alert(response.message); // casi contrario muestra el error en una alerta
  } catch (error) {
    alert(error.message);
  }
});
