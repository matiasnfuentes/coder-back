const email = document.getElementById("email");
const password = document.getElementById("password");
const login = document.getElementById("login");
const register = document.getElementById("register");

email.onchange = (e) => {
  console.log(e.target.value);
  if (email.value !== "" && password.value !== "") {
    register.disabled = false;
  } else {
    register.disabled = true;
  }
};

password.onchange = (e) => {
  console.log(e.target.value);
  if (email.value !== "" && password.value !== "") {
    register.disabled = false;
  } else {
    register.disabled = true;
  }
};

login.onclick = (e) => {
  console.log("asd");
  window.location = "http://localhost/";
};
