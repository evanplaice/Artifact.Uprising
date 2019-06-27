import { PersistentStore } from './store/index.js';
import { Cart, Products } from './components/index.js';

const store = new PersistentStore('cart', {
  state: { items: [] },
  actions: [
    ['ADD', (state, item) => {
      state.items.push(item);
      return state
    }],
    ['DELETE', (state, index) =>  {
      state.items.splice(index, 1);
      return state;
    }],
    ['UPDATE', state => state]
  ],
  save: (name, state) => {
    localStorage.setItem(name, JSON.stringify(state));
  },
  load: (name) => {
    if (localStorage.getItem(name) !== null) {
      return JSON.parse(localStorage.getItem(name));
    }
  }
});

const cartElement = document.querySelector('#cart');
const cart = new Cart({ store, element: cartElement });
cart.render();

const productsElement = document.querySelector('#products');
const products = new Products({ store, element: productsElement })
products.render();
