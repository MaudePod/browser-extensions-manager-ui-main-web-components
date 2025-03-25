export default class SelectFilterComponent extends HTMLElement {
    #internals;
    constructor() {
        super();
        this.#internals = this.attachInternals();
    }
    connectedCallback(
    ) {
        if (sessionStorage.getItem('filter')) {
            const filterType = sessionStorage.getItem('filter');
            window.dispatchEvent(new CustomEvent("filter", { detail: { filter: filterType } }));
            this.shadowRoot.querySelector(`input[id='${filterType}']`).checked=true;
        }
        this.shadowRoot.querySelector("input[id='all']").addEventListener('change', () => {
            if (this.shadowRoot.querySelector("input[id='all']").checked) {
                window.dispatchEvent(new CustomEvent("filter", { detail: { filter: "all" } }));
                sessionStorage.setItem("filter", "all")
            }
        })
        this.shadowRoot.querySelector("input[id='active']").addEventListener('change', () => {
            if (this.shadowRoot.querySelector("input[id='active']").checked) {
                window.dispatchEvent(new CustomEvent("filter", { detail: { filter: "active" } }));
                sessionStorage.setItem("filter", "active")
            }
        })
        this.shadowRoot.querySelector("input[id='inactive']").addEventListener('change', () => {
            if (this.shadowRoot.querySelector("input[id='inactive']").checked) {
                window.dispatchEvent(new CustomEvent("filter", { detail: { filter: "inactive" } }));
                sessionStorage.setItem("filter", "inactive")
            }
        })
    }
 
}
if (!customElements.get("select-filter-component")) {
    customElements.define("select-filter-component", SelectFilterComponent);
}
