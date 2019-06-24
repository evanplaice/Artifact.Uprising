export class PubSub {
  events = {}

  subscribe(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }

    this.events[event].push(callback);
  }

  publish(event, data = {}) {
    if (!this.events[event]) {
      return [];
    }

    return this.events[event].map(callback => callback(data));
  }
}
