const template = document.createElement("template");
template.innerHTML = `
         <section class="extension">
            <section class="extension-info">
              <img src="./assets/images/logo-devlens.svg" alt="Dev lens">
              <h2>
                DevLens
              </h2>
              <p>
                Quickly inspect page layouts and visualize element boundaries.
                Remove
              </p>
              <section class="actions">
                <button>Remove</button>
                <section class="toggle-extension" tabindex="1">
                  <label for="disable" aria-label="Disable extension">
                    <input type="radio" name="enable-extension" id="disable" checked>
                  </label>
                  <label for="enable" aria-label="Enable extension">
                    <input type="radio" name="enable-extension" id="enable">
                  </label>
                </section>
              </section>
            </section>
          </section>
          <style>
            section[class="extension"] {
              height: 100%;
              width:100%;
              background-color: var(--component-background);
              box-sizing: border-box;
              padding: 20px;
              border-radius: 10px;
            }

            section[class="extension-info"] {
              display: grid;
              grid-template-areas:
                "img name"
                "img description"
                "actions actions";
                 column-gap: 10px;
            }

            section[class="extension-info"] img {
              grid-area: img;
            }

            section[class="extension-info"] h2 {
              font-weight: 700;
              color: var(--body-color-2);
              grid-area: name;
              margin: 0;
            }

            section[class="extension-info"] p {
              grid-area: description;

            }

            section[class="actions"] {
              margin-top: 50px;
              align-self: end;
              grid-column: 1 / -1;
              display: grid;
              grid-template-columns: 1fr auto;
            }

            section[class="extension-info"] button {
              display: grid;
              place-items: center;
              width: 100px;
              padding: 5px 10px;
              border-radius: 30px;
              background-color: var(--component-background);
              border: 1px solid var(--neutral-600);
              color: var(--logo-fill);
              border-width: thin;
              cursor: pointer;
            }

            section[class="extension-info"] button:hover {
              background-color: var(--red-700);
            }

            section[class="toggle-extension"] {
              display: grid;
              grid-template-columns: 50% 50%;
              width: 55px;
              height: max-content;
              padding:5px 0px;
              background-color: var(--neutral-600);
              border-radius: 30px;
            }

            input[type="radio"] {
              display: none;
            }

            label[for="enable"],
            label[for="disable"] {
              display: grid;
              align-items: center;
              cursor: pointer;
            }

            section[class="toggle-extension"]:has(input[id="enable"]:checked) {
              background-color: var(--red-700);
            }

            label[for="enable"]:has(input:checked),
            label[for="disable"]:has(input:checked) {
              height: 25px;
              width: 25px;
              border-radius: 50%;
              background-color: var(--neutral-0);
            }

            button:focus{
              outline:2px solid var(--red-500);
            }

            section[class="toggle-extension"]:focus {
              outline:2px solid var(--red-500);
            }
          </style> 
`;
export default class ExtensionComponent extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback(
  ) {
    const shadowRoot = this.attachShadow({ mode: "open" })
    shadowRoot.appendChild(template.content.cloneNode(true));
    if (this.hasAttribute('logo')) {
      this.shadowRoot.querySelector('img').src = this.getAttribute('logo');
    }
    if (this.hasAttribute('name')) {
      this.shadowRoot.querySelector("h2").innerHTML = this.getAttribute('name');
      if (this.hasAttribute('logo')) {
        this.shadowRoot.querySelector('img').alt = this.getAttribute('name');
      }
    }
    if (this.hasAttribute('description')) {
      this.shadowRoot.querySelector("p").innerHTML = this.getAttribute('description');
    }
    if (this.hasAttribute('isActive')) {
      if (this.getAttribute('isActive') == "true") {
        this.shadowRoot.querySelector("input[id='enable']").checked = "true";
      } else {
        this.shadowRoot.querySelector("input[id='disable']").checked = "true";
      }
    }
    this.shadowRoot.querySelector('button').addEventListener('click', (event) => {
      localStorage.removeItem(this.getAttribute('name'));
      window.dispatchEvent(new CustomEvent("Item removed from cart", {}));
    });
    this.shadowRoot.querySelector("input[id='enable']").addEventListener('change', () => {
      if (this.shadowRoot.querySelector("input[id='enable']").checked) {
        this.setAttribute('isActive', "true");
      }
    })
    this.shadowRoot.querySelector("input[id='disable']").addEventListener('change', () => {
      if (this.shadowRoot.querySelector("input[id='disable']").checked) {
        this.setAttribute('isActive', "false");
      }
    })
    this.shadowRoot.querySelector("section[class='toggle-extension']").addEventListener('keypress', () => {
      if (this.shadowRoot.querySelector("input[id='disable']").checked) {
        this.shadowRoot.querySelector("input[id='enable']").checked = true;
        this.setAttribute('isActive', "true");
      } else {
        this.shadowRoot.querySelector("input[id='disable']").checked = true;
        this.setAttribute('isActive', "false");
      }
    })
    this.shadowRoot.querySelector("button").addEventListener('click', () => {
      window.dispatchEvent(new CustomEvent("remove", { detail: { name: this.getAttribute('name') } }));
    })
  }

  static get observedAttributes() {
    return [
      'logo',
      'name',
      'description',
      'isActive'
    ];
  }
}
if (!customElements.get("extension-component")) {
  customElements.define("extension-component", ExtensionComponent);
}
