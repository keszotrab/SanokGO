class SanGoHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <header>
        <div class="nav-bar">
            <a href="index.html" class="nav-link">
                <h1>SanokGO</h1>
            </a>
            <a href="" class="nav-link">About</a>
            <a href="#" id="profile-link">Profile/Login</a>
        </div>
    </header>
    `;


    ////// code

    const profileLink = this.querySelector("#profile-link");
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const profileText = document.getElementById("profile-link")

    profileLink.addEventListener("click", function (event) {
      event.preventDefault();

      if (isLoggedIn) {
        window.location.href = "profile.html";
      } else {
        window.location.href = "login.html";
      }
    });
    if (isLoggedIn) {
      profileText.innerText = "Profile";
    } else {
      profileText.innerText = "Login";
    }
  }
}


customElements.define("sanokgo-header", SanGoHeader);
