const logout = document.querySelector("#logOut");
const agentLogged = document.querySelector("#usuario");

logout.addEventListener("click", () => {
  loggedOut();
});

if (
  window.location.href === "http://localhost:3000/admin.html" &&
  !sessionStorage.getItem("token")
) {
  location.replace("http://localhost:3000");
} else {
  const user = sessionStorage.getItem("email");
  agentLogged.innerHTML += `${user}`;
}

const verificarToken = async () => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const response = await axios.get(
    `http://localhost:3000/apiV1/admin?token=${token}`
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
  location.replace("http://localhost:3000");
};

setInterval(() => {
  verificarToken();
}, 130000);
verificarToken();