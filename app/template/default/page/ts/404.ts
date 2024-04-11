import "../../src/style/main.css"
import "../../src/style/load.css"
import "../../src/style/error.css"
import App from '../svelte/404.svelte';

let appElement: any = null
appElement = document.getElementById("app")


if (!appElement) {
    throw new Error("Element with id 'app' not found.")
}

const app = new App({
    target: appElement,
});

export default app;