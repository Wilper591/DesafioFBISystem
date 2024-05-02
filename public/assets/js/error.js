const mensajeError = document.getElementById("messageError");
const Errormensaje = document.getElementById("msjError");

const autenticarSesion = async () => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  if (!token) {
    let errorResquest = await axios.get("http://localhost:3000/apiV1/notFound");

    Errormensaje.innerHTML += `${errorResquest.data.error.message}`;
    mensajeError.innerHTML += `${errorResquest.data.message}`;
  }
};
autenticarSesion();
