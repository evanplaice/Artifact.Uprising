import { Cart, Products } from './components/index.js';
import store from './store/index.js';

const productsElement = document.querySelector('#products');
const products = new Products({ store, element: productsElement })
products.render();

const cartElement = document.querySelector('#cart');
const cart = new Cart({ store, element: cartElement });
cart.render();

const cartLinkElement = document.querySelector('#cart-link');
cartLinkElement.addEventListener('click', e => {
  productsElement.classList.toggle('mobile_hide');
  cartElement.classList.toggle('mobile_show');
});