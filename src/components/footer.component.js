class SanGoFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <footer>
        <div>
           Author's Websites: <br>
            <a href="">Author's ugly page, because he doesn't have time to make it pretty</a> <br>
            <a href="">WIP of Lithia Map</a>

        </div>
    </footer>
    `;
  }
}

//<p>&copy; 2026 Wszelkie prawa zastrzeżone.</p>
customElements.define("sanokgo-footer", SanGoFooter);
