import ExtensionComponent from "./ExtensionComponent.js";

ExtensionComponent
export default class ExtensionsComponent extends HTMLElement {
    #internals;
    constructor() {
        super();
        this.#internals = this.attachInternals();
    }
    connectedCallback(
    ) {
        this.getExtensionsData();
        window.addEventListener('filter', (event) => {
            const filterType = event.detail.filter;
            if (filterType) {
                this.setAttribute('filter', filterType);
            }
        });
        window.addEventListener('remove', (event) => {
            const extensionName = event.detail.name;
            if (extensionName) {
                localStorage.removeItem(extensionName);
                this.getExtensionsData();
            }
        });
    }
    getExtensionsData = () => {
        if (localStorage.length == 0) {
            this.getExtensionsDataFromJson();
        } else {
            this.getExtensionsDataFromLocalStorage();
        }
    }
    getExtensionsDataFromJson = () => {
        let html = "";
        fetch('data.json').then((response) => {
            response.text().then((response) => {
                return JSON.parse(response);
            }).then(data => {
                data.forEach(element => {
                    html += `
                <extension-component 
                  logo="${element.logo}" 
                  name="${element.name}" 
                  description="${element.description}" 
                  isActive="${element.isActive}"
                  >
                </extension-component>`;
                    localStorage.setItem(element.name, JSON.stringify(element));
                });
                this.shadowRoot.querySelector("section[class='extensions']").innerHTML = html;
            })
        });
    }

    getExtensionsDataFromLocalStorage = () => {
        let html = "";

        Object.keys(localStorage).forEach(function (name) {
            const extension = JSON.parse(localStorage.getItem(name));
            html += `
            <extension-component 
              logo="${extension.logo}" 
              name="${extension.name}" 
              description="${extension.description}" 
              isActive="${extension.isActive}"
              >
            </extension-component>`;
        });
        this.shadowRoot.querySelector("section[class='extensions']").innerHTML = html;
    }
    disconnectedCallback() {
    }

}
if (!customElements.get("extensions-component")) {
    customElements.define("extensions-component", ExtensionsComponent);
}