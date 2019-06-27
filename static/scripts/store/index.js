export { Store } from './store.js';
import { PersistentStore } from './persistent-store.js';

export { PersistentStore };
export default new PersistentStore('cart', {
  state: { items: [] },
  actions: [
    ['ADD', (state, {item}) => {
      let index;
      const match = state.items.filter((sItem, idx) => {
        if (sItem.id === item.id) {
          index = idx;
          return true;
        }
      })

      // add item if it doesn't exist in cart
      if (match.length === 0) {
        item.quantity = 1;
        state.items.push(item);
        return state
      }
      
      // if item is in cart increment the quantity
      state.items[index].quantity += 1;
      return state;
    }],
    ['DELETE', (state, {index}) =>  {
      state.items.splice(index, 1);
      return state;
    }],
    ['UPDATE', (state, {index, quantity}) => {
      state.items[index].quantity = parseInt(quantity);
      return state;
    }]
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
