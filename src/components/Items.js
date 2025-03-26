import Component from "../core/Component.js";


class Items extends Component {
    setup() {
        this.state = { items: ['item1', 'item2'] };
    }
    template() {
        const { items } = this.state;
        return `
        <div>
        <ul>
            ${items.map(item => `<li>${item}</li>`).join('')}
        </ul>
        <button>추가</button>
        </div>
        `
    }
    setEvent() {
        this.target.querySelector('button').addEventListener('click', () => {
            const { items } = this.state;
            this.setState({ items: [...items, `item${items.length + 1}`] });
        });
    }
}

export default Items;