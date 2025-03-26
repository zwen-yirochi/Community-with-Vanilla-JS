import Header from "../components/Header.js";
import Layout from "../components/Layout.js";
import Page from "../components/Page.js";
import { html } from "../utils/html.js";

class LoginPage extends Page {
    template() {
        return html`
        <div>
            <div id="header-container"></div>
            <div style="display : grid ; grid-template-columns: 1fr 592px 1fr; 	height: calc(100vh - 104px);">
                <div class="left-padding"></div>
                <div id="content-container"></div>
                <div class="right-padding"></div>
            </div>
        </div>`;
    }

    mounted() {
        const headerContainer = document.getElementById("header-container");
        this.header = new Header(headerContainer, this.getHeaderProps());

        const layoutContainer = document.getElementById("content-container");
        this.layout = new Layout(layoutContainer, this.getLayoutProps());
    }

    getHeaderProps() {
        return {
            navigateBtn: false
        }
    }

    getLayoutProps() {
        return {
            title: "로그인",
            fields: [
                {
                    label: "Email",
                    id: "email",
                    placeholder: "이메일을 입력하세요 : target"
                },
                {
                    label: "password",
                    id: "password",
                    placeholder: "비밀번호를 입력하세요 : target"
                }

            ]
        }
    }
}

export default LoginPage;