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
                sessionStorage.removeItem(extensionName);
                this.getExtensionsData();
            }
        });
    }
    getExtensionsData = () => {
        if (sessionStorage.length == 0) {
            this.getExtensionsDataFromJson();
        } else {
            this.getExtensionsDataFromsessionStorage();
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
                    sessionStorage.setItem(element.name, JSON.stringify(element));
                });
                this.shadowRoot.querySelector("section[class='extensions']").innerHTML = html;
            })
        });
    }

    getExtensionsDataFromsessionStorage = () => {
        let html = "";

        Object.keys(sessionStorage).forEach(function (name) {
            const extension = JSON.parse(sessionStorage.getItem(name));
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