import Header from "../components/Header.js";
import Page from "../components/Page.js";
import ProfileEditor from "../components/ProfileEditor.js";
import { html } from "../utils/html.js";

class SignupPage extends Page {
    template() {
        return html`
            <div>
                <div id="header-container"></div>
                <div style="display : grid ; grid-template-columns: 1fr 592px 1fr; 	height: calc(100vh - 104px);">
                    <div class="left-padding"></div>
                    <div>
                        <div id="content-container"></div>
                        <a href="#/" class="${this.cls("signin-btn")}">로그인 하러 가기</a>
                    </div>
                    <div class="right-padding"></div>
                </div>
            </div>`;
    }

    mounted() {
        const headerContainer = document.getElementById("header-container");
        this.header = new Header(headerContainer, this.getHeaderProps());

        const contentContainer = document.getElementById("content-container");
        this.layout = new ProfileEditor(contentContainer, this.getLayoutProps());
    }
    getHeaderProps() {
        return {
            navigateBtn: true,
            navigateTo: "#/login"
        }
    }

    getLayoutProps() {
        return {
            title: "회원 가입",
            useHelperText: false,
            fields: [
                {
                    label: "Email",
                    id: "email",
                    placeholder: "이메일을 입력하세요 : init",
                    useHelperText: true
                },
                {
                    label: "password",
                    id: "password",
                    placeholder: "비밀번호를 입력하세요 : init",
                    useHelperText: true
                },
                {
                    label: "confirm",
                    id: "confirm",
                    placeholder: "비밀번호를 한번 더 입력하세요. : init",
                    useHelperText: true
                },
                {
                    label: "Nickname",
                    id: "nickname",
                    placeholder: "닉네임을 입력하세요. : init",
                    useHelperText: true
                }
            ]
        }
    }
}


export default SignupPage;