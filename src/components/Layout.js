import Component from "../core/Component.js";
import { html } from "../utils/html.js";
import Form from "./Form.js";

class Layout extends Component {
    template() {
        const { title, fields } = this.props;
        let result = ''
        fields.map((field) => {
            result += `<div id="${field.id}Form"></div>`
        })
        return html`
                <div class="${this.cls("container")}">
                    <div class="${this.cls("page-title")}">${title}</div>
                    ${result}
                    <div class="${this.cls("helper-text")}" id="helperText">*helper text</div>
                    <button class="${this.cls("submit-btn")}" id="submit-btn">로그인</button>
                    <a href="#/signup" class="${this.cls("signin-btn")}">회원 가입</a>
                </div>`
    }
    mounted() {
        const fields = this.props.fields;
        const contentElement = document.getElementById(`${fields[0].id}Form`);
        new Form(contentElement, { label: "Email", id: "email", placeholder: fields[0].placeholder });

        const contentElement2 = document.getElementById(`${fields[1].id}Form`);
        new Form(contentElement2, { label: fields[1].label, id: "password", placeholder: fields[1].placeholder });
    }
    setup() {

    }

    setEvent() {

    }
}
export default Layout;