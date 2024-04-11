import "../../src/style/main.css"
import "../../src/style/load.css"
import "../../src/style/home.css"
import "../../src/style/phones.css"
import App from '../svelte/Models.svelte'

let appElement: any = null;
appElement = document.getElementById("app")


if (!appElement) {
    throw new Error("Element with id 'app' not found.")
}

const app = new App({
    target: appElement,
});

export default app