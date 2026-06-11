import { User } from "../model/user.model.js";
import { Location } from "../model/location.model.js";

function toggleAuth() {
  const login = document.getElementById("login-form-div");
  const reg = document.getElementById("register-form-div");
  login.style.display = login.style.display === "none" ? "block" : "none";
  reg.style.display = reg.style.display === "none" ? "block" : "none";
}

function handleRegister() {
  const email = document.getElementById("reg-email").value;
  const pass = document.getElementById("reg-pass").value;
  const username = "New User";

  if (!email || !pass) return alert("Wypełnij pola!");

  const users = JSON.parse(localStorage.getItem("users") || "[]");
  if (users.find((u) => u.email === email.toLowerCase()))
    return alert("Użytkownik istnieje!");

  var newUser = new User(username, email.toLowerCase(), pass);

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  alert("Konto założone! Możesz się zalogować.");
  toggleAuth();
}

function handleLogin() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-pass").value;

  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const user = users.find(
    (u) => u.email === email.toLowerCase() && u.password === password,
  );

  if (user) {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("currentUser", email); // Zapamiętaj kto się zalogował
    window.location.href = "index.html"; // Powrót na stronę główną (z mapą)
  } else {
    alert("Błędne dane logowania!");
  }
}

function handleLogOff() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("currentUser");

  location.reload();
}

