import { Component } from './component.js';

export class Cart extends Component {

  constructor({ store, element }) {
    super({ store, element });
  }

  render() {
    const items = this.store.state.items;

    // render this if cart is empty
    if(items.length === 0) {
      this.element.innerHTML = `
        <h2>Cart:</h2>
        <p class="no-items">You're cart is currently empty</p>
      `;
      return;
    }

    this.element.innerHTML = `
      <h2>Cart:</h2>
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
