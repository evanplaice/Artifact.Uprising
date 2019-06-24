import { PubSub } from './pubsub.js';

export class LocalStore {

  actions = new Map();
  state;
  events = new PubSub();

  constructor(name, params = {}) {
    this.name = name;

    if (params.actions) {
      params.actions.map(action => {
        this.actions.set(action[0], action[1]);
      });
    }

    this.state = new Proxy(this.restore() || params.state, {
      set: (state, key, value) => {
        state[key] = value;
        localStorage.setItem(this.name, JSON.stringify(this.state));

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

  restore() {
    if (localStorage.getItem(this.name) !== null) {
      return JSON.parse(localStorage.getItem(this.name));
    }

    return false;
  }
}