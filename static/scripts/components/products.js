import { Component } from './component.js';

export class Products extends Component {

  products;

  constructor({ store, element }) {
    super({ store, element });
  }

  async getProducts() {
    return fetch('http://localhost:3000/products')
      .then(response => response.text())
      .then(body => JSON.parse(body))
  }

  async render() {
    // prevent re-fetch + re-render
    if (this.products) { return; }

    this.products = this.products || await this.getProducts() || [];
    const products = this.products;

    this.element.innerHTML = `
      ${products.map(product => {
        return `
          <div class="product">
            <img src="/images/products/${product.image}" alt="Product image for ${product.name}"/>
            <h3>${product.name}</h3>
            <p class="price">$19.99</p>
            <button>Add to Cart</button>
          </div>
        `
      }).join('')}
    `

    this.element.querySelectorAll('button').forEach((product, index) => {
      product.addEventListener('click', () => {
        this.store.dispatch('ADD', { item: products[index] });
      });
    });
  }

}
