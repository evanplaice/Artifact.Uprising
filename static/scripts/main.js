import { PersistentStore } from './store/index.js';
import { Cart, Products, Total } from './components/index.js';

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

// const totalElement = document.querySelector('.total');
// const total = new total({ store, element: totalElement });
// total.render();

const formElement = document.querySelector('#form');
const inputElement = document.querySelector('#input');
formElement.addEventListener('submit', e => {
  e.preventDefault();

  let value = inputElement.value.trim();

  if (value.length) {
    store.dispatch('ADD', value);
    inputElement.value = '';
    inputElement.focus();
  }
});

const products = document.querySelector('#products');
products.addEventListener('click', e => {

});
