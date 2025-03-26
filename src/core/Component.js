import CSSLoader from "./CssLoader.js";

class Component {
    target;
    state;
    element;
    props;

    constructor(target, props = {}) {
        this.target = target;
        this.props = props;
        this.componentId = this.constructor.name.toLowerCase();

        // 스타일 등록은 CssLoader에 위임
        CSSLoader.registerComponentStyles(this);

        this.setup();
        this.render();
    }

    setup() { }
    template() { return ''; }
    mounted() { }
    cls(className) {
        return `${this.componentId}__${className}`;
    }

    static getCssModule() {
        return {};
    }

    createDOMElement(htmlString) {
        const div = document.createElement('div');
        div.innerHTML = htmlString.trim();
        return div.firstElementChild;
    }

    render() {
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
        const htmlString = this.template();
        this.element = this.createDOMElement(htmlString);
        this.target.appendChild(this.element);
        console.log(this.componentId);
        this.mounted();
        this.setEvent();
    }

    setEvent() { }

    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.render();
    }

    // 컴포넌트 제거 시 스타일도 정리
    destroy() {
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }

        // 필요한 경우 스타일 제거
        // 주의: 같은 컴포넌트의 다른 인스턴스가 있을 수 있음
        // CssLoader.removeComponentStyles(this.componentId);
    }
}

export default Component;