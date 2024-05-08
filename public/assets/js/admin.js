const URL_BASE = "https://fbisystem.onrender.com";
const logout = document.querySelector("#logOut");
const agentLogged = document.querySelector("#usuario");

logout.addEventListener("click", () => {
  loggedOut();
});

if (
  window.location.href === `${URL_BASE}/admin.html` &&
  !sessionStorage.getItem("token")
) {
  location.replace(`${URL_BASE}`);
} else {
  const user = sessionStorage.getItem("email");
  agentLogged.innerHTML += `${user}`;
}

const verificarToken = async () => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const response = await axios.get(
    `${URL_BASE}/apiV1/admin?token=${token}`
  );
  if (!response.data.is_Active) {
    loggedOut();
  } else {
    return response;
  }
};

const loggedOut = () => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("email");
  location.replace(`${URL_BASE}`);
};

setInterval(() => {
  verificarToken();
}, 130000);
verificarToken();
