import { PubSub } from './pubsub.js';

export class PersistentStore {

  actions = new Map();
  state = {};
  events = new PubSub();

  constructor(name, params = {}) {
    this.name = name;

    if (params.actions) {
      params.actions.map(action => {
        this.actions.set(action[0], action[1]);
      });
    }

    if (params.save) {
      this.save = params.save;
    }

    if (params.load) {
      this.load = params.load;
    }

    const initialState = (this.load(this.name))
      ? this.load(this.name) : params.state;

    this.state = new Proxy(initialState, {
      set: (state, key, value) => {
        state[key] = value;

        // persist state
        if (this.save) {
          this.save(this.name, this.state);
        }

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