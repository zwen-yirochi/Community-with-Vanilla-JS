import Component from "../core/Component.js";
import { html } from "../utils/html.js";
import Header from "./Header.js";
import Layout from "./Layout.js";

class Page extends Component {
    template() {
        return html`
        <div>
            <div id="header-container"></div>
            <div style="display : grid ; grid-template-columns: 1fr 592px 1fr; 	height: calc(100vh - 104px);">
                <div class="left-padding"></div>
                <div id="layout-container"></div>
                <div class="right-padding"></div>
            </div>
        </div>

        `;
    }

    mounted() {
        const headerContainer = document.getElementById("header-container");
        this.header = new Header(headerContainer, this.getHeaderProps());

        const layoutContainer = document.getElementById("layout-container");
        this.layout = new Layout(layoutContainer, this.getLayoutProps());
    }

    // 헤더 속성 - 하위 클래스에서 오버라이드 가능
    getHeaderProps() {
        return {};
    }

    // 레이아웃 속성 - 하위 클래스에서 오버라이드 필수
    getLayoutProps() {
        return {};
    }
}

export default Page;