import { Component } from './component.js';

export class Cart extends Component {

  constructor({ store, element }) {
    super({ store, element });
  }

  render() {
    const items = this.store.state.items;

    if(items.length === 0) {
      this.element.innerHTML = `<p class="no-items">You've done nothing yet &#x1f622;</p>`;
      return;
    }

    this.element.innerHTML = `
      <ul class="cart_items">
        ${items.map(item => {
          return `
            <li>${item}<button aria-label="Delete this item">×</button></li>
          `
        }).join('')}
      </ul>
    `

    this.element.querySelectorAll('button').forEach((button, index) => {
      button.addEventListener('click', () => {
        this.store.dispatch('DELETE', index);
      });
    });
  }

}
