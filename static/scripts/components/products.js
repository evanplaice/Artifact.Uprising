import { Component } from './component.js';

export class Products extends Component {

  constructor({ store, element }) {
    super({ store, element });
  }

  async getProducts() {
    return fetch('http://localhost:3000/products')
      .then(response => response.text())
      .then(body => JSON.parse(body));

  }

  addToCart(id) {
    console.log(id);
  }

  async render() {
    const products = await this.getProducts() || [];

    this.element.innerHTML = `
      ${products.map(product => {
        return `
          <div class="product">
            <img src="/images/products/${product.image}" alt="Product image for ${product.name}"/>
            <h2>${product.name}</h2>
            <p class="price">$19.99</p>
            <button>Add to Cart</button>
          </div>
        `
      }).join('')}
    `

    this.element.querySelectorAll('button').forEach((product, index) => {
      product.addEventListener('click', () => {
        console.log(products[index]);
        this.store.dispatch('ADD', products[index]);
      });
    });
  }

}
