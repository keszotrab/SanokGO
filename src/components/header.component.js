import { logOff } from "../services/userService.js";

class SanGoHeader extends HTMLElement {
  connectedCallback() {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    this.innerHTML = `
    <header>
        <div class="nav-bar">
            <a href="index.html" class="nav-link">
                <h1>SanokGO</h1>
            </a>
            <a href="#" id="profile-link"> <h3>${isLoggedIn ? "Profile" : "Login"} </h3></a>
            ${isLoggedIn ? '<button id="btn-logout" style="cursor:pointer; margin-left:10px;">Wyloguj</button>' : ""}
        </div>
    </header>
    `;

    const profileLink = this.querySelector("#profile-link");
    const logoutBtn = this.querySelector("#btn-logout");

    profileLink.addEventListener("click", (event) => {
      event.preventDefault();
      window.location.href = isLoggedIn ? "profile.html" : "login.html";
    });

    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        logOff();
        window.location.href = "login.html";
      });
    }
  }
}

customElements.define("sanokgo-header", SanGoHeader);
                                                                  // ten kod powinien byc ladniej ulozony, ale to na przyszlosc
