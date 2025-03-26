import Router from "./core/Router.js";
import LoginPage from './pages/LoginPage.js';
import SignupPage from "./pages/SignupPage.js";


const appElement = document.getElementById('app');
Router.setContainer(appElement);

Router.addRoute('/', LoginPage);
Router.addRoute('/login', LoginPage);
Router.addRoute('/signup', SignupPage);
//Router.addRoute('*', HomePage);

Router.init();