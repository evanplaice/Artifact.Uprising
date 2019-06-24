import { Store } from './store.js';

const store = new Store({
  state: { items: []},
  actions: [
    ['ADD', (state, item) => {
      state.items.push(item);

      return state
    }],
    ['DELETE', (state, index) =>  {
      state.items.splice(index, 1);

      return newState;
    }],
    ['UPDATE', state => state]
  ]
});

console.dir(store);
store.dispatch('ADD', 'test1');
store.dispatch('ADD', 'test2');
store.dispatch('ADD', 'test3');
store.dispatch('ADD', 'test4');
store.dispatch('DELETE', 'test1');
store.dispatch('DELETE', 'test3');
store.dispatch('UPDATE', '');
console.dir(store);