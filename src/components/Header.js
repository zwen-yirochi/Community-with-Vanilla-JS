import { CommunityTitle } from "../../TEXT.js";
import Component from "../core/Component.js";
import { html } from "../utils/html.js";

class Header extends Component {
    template() {
        const navigateBtn = this.props.navigateBtn;
        return html`
        <header>
            ${navigateBtn ? `<button type="button" class="${this.cls("navigate-before")}" id="navigate-before">
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                </svg>
            </button>` : ""}
            <div class="${this.cls("title")}">${CommunityTitle}</div>
        </header>
        `
    }
    mounted() {
        if (this.props.navigateBtn) {
            document.getElementById("navigate-before").addEventListener('click', () => {
                window.location.href = this.props.navigateTo;
            })
        }
    }
}

export default Header;