import Content from "./components/Body.js";
import Header from "./components/Header.js";

class App {
    constructor() {
        const app = document.getElementById("app");
        new Header(app);
        new Content(app);
    }
}
export default App;