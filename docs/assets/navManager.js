class Nav extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <nav class="flex-container" aria-label="Main navigation">
                <div class="btn-group">
                    <button type="button" onclick="location.href='index.html';">Home</button>
                    <button type="button" onclick="location.href='availableanimals.html';">Available Animals</button>
                    <button type="button" onclick="location.href='adoptionapplication.html';">Submit Adoption Application</button>
                    <button type="button" onclick="location.href='fosterapplication.html';">Submit Foster Application</button>
                    <button type="button" onclick="location.href='volunteerapplication.html';">Submit Volunteer Application</button>
                    <button type="button" onclick="location.href='donations.html';">Donations</button>
                    <button type="button" onclick="location.href='meettheteam.html';">Meet the Team</button>
                    <div class="nav-dropdown">
                        <button type="button" class="nav-dropdown-toggle" aria-expanded="false" aria-controls="other-forms-menu">Other Forms</button>
                        <div class="nav-dropdown-menu" id="other-forms-menu" hidden>
                            <a href="spayneuterassistance.html">Spay/Neuter Assistance</a>
                            <a href="petfoodassistance.html">Pet Food Request</a>
                            <a href="petsurrender.html">Owner / Community Pet Surrender</a>
                        </div>
                    </div>
                </div>
            </nav>
        `;

        const dropdown = this.querySelector('.nav-dropdown');
        const toggle = this.querySelector('.nav-dropdown-toggle');
        const menu = this.querySelector('.nav-dropdown-menu');

        toggle.addEventListener('click', () => {
            const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
            toggle.setAttribute('aria-expanded', String(!isExpanded));
            menu.hidden = isExpanded;
        });

        dropdown.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && !menu.hidden) {
                menu.hidden = true;
                toggle.setAttribute('aria-expanded', 'false');
                toggle.focus();
            }
        });
    }
}

customElements.define('special-nav', Nav);

