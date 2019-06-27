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
        <h2>Cart</h2>
        <hr/>
        <p class="no-items">You're cart is currently empty</p>
      `;
      return;
    }

    this.element.innerHTML = `
      <h2>Shopping Cart</h2>
      <hr/>
      <ul class="cart_items">
        ${items.map(item => {
          return `
            <li class="cart_item">
              <button class="cart_item-delete" aria-label="Delete this item">×</button>
              <img class="cart_item-image" src="/images/products/${item.image}"/>
              <div class="cart_item-name">${item.name}</div>
              <input type="text" class="cart_item-quantity" value="${item.quantity}"></input>
              <div class="cart_item-price">${item.price}</div>
            </li>
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
