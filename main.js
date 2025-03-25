import ExtensionComponent from "./scripts/ExtensionComponent.js";
import ExtensionsComponent from "./scripts/ExtensionsComponent.js";
import SelectFilterComponent from "./scripts/SelectFilterComponent.js";

if (sessionStorage.getItem('theme')) {
    const theme = sessionStorage.getItem('theme');
    if (theme == 'dark') {
        document.querySelector('input[id="dark-theme"]').checked = true;
    } else {
        document.querySelector('input[id="light-theme"]').checked = true;
    }
}
document.querySelector('input[id="dark-theme"]').addEventListener('change', () => {
    if (document.querySelector('input[id="dark-theme"]').checked) {
        sessionStorage.setItem('theme', 'dark')
    }
})
document.querySelector('input[id="light-theme"]').addEventListener('change', () => {
    if (document.querySelector('input[id="light-theme"]').checked) {
        sessionStorage.setItem('theme', 'light')
    }
})

document.querySelector('label').addEventListener('keypress', () => {
    if (document.querySelector('input[id="light-theme"]').checked) {
        document.querySelector('input[id="dark-theme"]').checked=true;
        sessionStorage.setItem('theme', 'dark')
    }else{
        document.querySelector('input[id="light-theme"]').checked=true;
            sessionStorage.setItem('theme', 'light')      
    }
})