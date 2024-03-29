import { PersistentStore } from '../store/index.js';

export class Component {
  element;

  constructor(props = {}) {
    if (props.store instanceof PersistentStore) {
      this.store = props.store;
      props.store.events.subscribe('stateChange', () => this.render());
    }

    if (props.element) {
      this.element = props.element;
    }

    this.render = this.render || function() {};
  }

}
