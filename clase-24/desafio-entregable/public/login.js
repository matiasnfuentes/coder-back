const nombre = document.getElementById("nombre");
const login = document.getElementById("login");

nombre.onchange = (e) => {
  console.log(e.target.value);
  if (nombre.value !== "") {
    login.disabled = false;
  } else {
    login.disabled = true;
  }
};
