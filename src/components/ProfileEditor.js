import Component from "../core/Component.js";
import { html } from "../utils/html.js";
import Form from "./Form.js";

class ProfileEditor extends Component {
    template() {
        const { title, useHelperText, fields } = this.props;
        let result = ''
        fields.map((field) => {
            result += `<div id="${field.id}Form"></div>`
        })
        return html`
                <div class="${this.cls("container")}">
                    <div class="${this.cls("page-title")}">${title}</div>
                    ${result}
                    ${useHelperText ? '<div class="${this.cls("helper-text")}" id="helperText">*helper text</div>' : ""}
                    <button class="${this.cls("submit-btn")}" id="submit-btn">제출하기</button>
                </div>`
    }

    mounted() {
        const { label, id, fields } = this.props;
        fields.forEach(field => {
            const contentElement = document.getElementById(`${field.id}Form`);
            new Form(contentElement, { label: field.label, id: field.id, placeholder: field.placeholder, useHelperText: true });
        });
    }
}

export default ProfileEditor;