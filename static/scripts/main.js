import { Cart, Products } from './components/index.js';
import store from './store/index.js';

const cartElement = document.querySelector('#cart');
const cart = new Cart({ store, element: cartElement });
cart.render();

const productsElement = document.querySelector('#products');
const products = new Products({ store, element: productsElement })
products.render();
