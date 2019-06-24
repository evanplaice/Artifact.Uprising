import { PubSub } from './pubsub.js';

export class Store {

  actions = new Map();
  state;
  events = new PubSub();

  constructor(params = {}) {
    if (params.actions) {
      params.actions.map(action => {
        this.actions.set(action[0], action[1]);
      });
    }

    this.state = new Proxy(params.state || {}, {
      set: (state, key, value) => {
        state[key] = value;

        console.log(`stateChange: { ${key}: ${value} }`);

        this.events.publish('stateChange', this.state);

        return true;
      }
    });
  }

  dispatch(action, data) {
    if (!this.actions.has(action)) {
      console.error(`Action: ${action} doesn't exist`);
    }

    const newState = this.actions.get(action)(this.state, data);
    this.state = Object.assign(this.state, newState)
  }
  
}
