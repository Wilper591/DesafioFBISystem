const URL_BASE = "https://fbisystem.onrender.com";
const email = document.getElementById("email");
const password = document.getElementById("password");
const logInBtn = document.getElementById("logIn");
const secretRoute = document.getElementById("restringida");
const welcomeMsg = document.getElementById("bienvenida");
const errorMsg = document.getElementById("errorMsj");

logInBtn.addEventListener("click", async () => {
  if (email.value === "" || password.value === "") {
    errorMsg.innerHTML += `<p>Ingresa un usuario y/o contraseña</p>`;
    setTimeout(() => {
      limpiarHTML(errorMsg);
    }, 3000);
    return;
  }
  let { data } = await login(email.value, password.value);
  if (!data.is_Active) {
    location.replace(`${URL_BASE}/error.html`);
  } else {
    /* Guardo el token */
    sessionStorage.setItem("token", JSON.stringify(data.token));
    sessionStorage.setItem("email", `${data.loggedUser.email}`);
    let logged = await peticionToken();
    welcomeMsg.innerHTML += `Bienvenido agente ${data.loggedUser.email}`;
  }
});

const login = async (email, password) => {
  const response = await axios.get(
    `${URL_BASE}/apiV1/SignIn?email=${email}&password=${password}`
  );
  return response;
};

const peticionToken = async () => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const response = await axios.get(
    `${URL_BASE}/apiV1/Logged?token=${token}`
  );
  if (response.data.is_Active === true) {
    secretRoute.classList.remove("d-none");
    welcomeMsg.classList.remove("d-none");
  } else {
    return response.data.error;
  }
};

const limpiarHTML = (tagHtml) => {
  while (tagHtml.firstChild) {
    tagHtml.removeChild(tagHtml.firstChild);
  }
};
