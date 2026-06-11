import { User } from "../model/user.model.js";
import { Location } from "../model/location.model.js";

export function registerUser(email, pass) {
  const username = "New User";

  const users = JSON.parse(localStorage.getItem("users") || "[]");
  if (users.find((u) => u.email === email.toLowerCase()))
    return { success: false, msg: "Użytkownik istnieje!" };

  var newUser = new User(username, email.toLowerCase(), pass);

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  return true;
}

export function loginUser(email, pass) {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const user = users.find(
    (u) => u.email === email.toLowerCase() && u.password === pass,
  );

  if (user) {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("currentUser", email);
    return true;
  } else {
    return false;
  }
}

export function logOff() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("currentUser");
}

