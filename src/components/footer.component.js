class SanGoFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <footer>
        <div>
           Author's Websites: <br>
            <a href="https://keszotrab.github.io/index.html">Author's ugly page, because he doesn't have time to make it pretty</a> <br>
        </div>
    </footer>
    `;
  }
}
//<a href="">WIP of Lithia Map</a>
//<p>&copy; 2026 Wszelkie prawa zastrzeżone.</p>
customElements.define("sanokgo-footer", SanGoFooter);
