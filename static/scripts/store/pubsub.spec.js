import PubSub from "./pubsub.js";

const pubsub = new PubSub();

const sub1 = () => { console.log('first subscription fired')}
const sub2 = () => { console.log('second subscription fired')}
const sub3 = () => { console.log('third subscription fired')}

pubsub.subscribe('test-event', sub1);
pubsub.subscribe('test-event', sub2);
pubsub.subscribe('test-event', sub3);

console.dir(pubsub.events);

pubsub.publish('test-event');