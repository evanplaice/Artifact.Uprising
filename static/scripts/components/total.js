import { Component } from './component.js';

export class Total extends Component {

  constructor({ store, element}) {
    super({ store, element });
  }

  render() {
    const items = this.store.items;
    const total = items.reduce((curr, acc) => {
      acc = acc + curr.price;
    })

    this.element.innerHTML = `
      <p>Total: ${total};
    `
  }

}