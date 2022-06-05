const email = document.getElementById("email");
const password = document.getElementById("password");
const login = document.getElementById("login");
const register = document.getElementById("register");

email.onchange = (e) => {
  console.log(e.target.value);
  if (email.value !== "" && password.value !== "") {
    login.disabled = false;
  } else {
    login.disabled = true;
  }
};

password.onchange = (e) => {
  console.log(e.target.value);
  if (email.value !== "" && password.value !== "") {
    login.disabled = false;
  } else {
    login.disabled = true;
  }
};
register.onclick = (e) => {
  window.location = "http://localhost/register";
};
