import Component from "../core/Component.js";

class Input extends Component {
    setup() {
        this.state = { value: '' };
    }

    template() {

        const placeholder = this.props.placeholder || "이메일을 입력하세요";
        return `
            <input class="${this.cls('inputField')}" type="text" placeholder="${placeholder}" autofocus>
        `
    }
}

export default Input; 