import Component from "../core/Component.js";
import { html } from "../utils/html.js";
import Input from "./Input.js";

class Form extends Component {
    template() {
        const { label, id, useHelperText } = this.props;
        return html`
        <div class="${this.cls('container')}">
              <label class="${this.cls('label')}">${label}</label>
              <div id="${id}" class="${this.cls('input-container')}"></div>
              ${useHelperText ? `<div class="${this.cls('helper-text')}" id="helperText">*helper text</div>` : ""}
        </div>
      `;
    }

    mounted() {
        const inputContainer = document.getElementById(this.props.id);
        new Input(inputContainer, { placeholder: this.props.placeholder })

        // const { fields = [] } = this.props;
        // this.inputs = {};

        // fields.forEach(field => {
        //     const container = document.getElementById(this.id(`field-${id}`));
        //     this.inputs[field.id] = new Input(container, {
        //         id: this.id(`input-${field.id}`),
        //         type: field.type || 'text',
        //         placeholder: field.placeholder,
        //         value: field.value,
        //         required: field.required,
        //         validators: field.validators
        //     });
        // });
    }

    // getFormData() {
    //     const data = {};
    //     Object.keys(this.inputs).forEach(key => {
    //         data[key] = this.inputs[key].getValue();
    //     });
    //     return data;
    // }

    // validate() {
    //     let isValid = true;
    //     Object.keys(this.inputs).forEach(key => {
    //         const fieldValid = this.inputs[key].validate();
    //         isValid = isValid && fieldValid;
    //     });
    //     return isValid;
    // }
}

export default Form;