# Shopping Cart

This repo contains a basic shopping cart demo written for Artifact Uprising.

It's comprised of 2 parts:

- Server - written in Go that provides static resources and hardcoded API values
- Client - written in vanilla JS that includes Store, Publisher-Subscribe, and Component modules

## Getting started

Clone the repo to a local dir and change to it.

Start the Go server

```sh
go run main.go
```

Then, open the browser and navigate to [http://localhost:3000](http://localhost:3000)

## Implementation Specifics

The spec calls for a few hours to a half day to implement this. That would've been possible using Node.js/React but I wanted to try something a little more interesting and useful for this specific position.

### Server

I have zero prior experience using Go bug since it is one of the BackEnd languages used at ArtifactUprising, I thought I'd give it a try. I spent 1 day familiarizing myself with the language, common patterns, popular libraries, etc prior to writing any code. That gave me enough of a foundation to get started.

The implementation itself only took a few hours. Most of which was spent up how to implement common patterns (ex using JSON for data, query-params, etc). `server.md` contains the steps required to install the Go environment in Linux.

### Client

From what I gathered in the tech screen. The front-end is a bit of a painpoint, it sounds like a mishmash of legacy code written in Knockout.js and a patchwork of JS for the rest. I mention before that React would've been faster to implement but throwing another framework into the mix will likely just add to the already existing tech debt.

Instead, I opted to go with a completely VanillaJS implementation. I didn't want to go the jQuery-esque route of render thrashing by treating the DOM as the single-source-of-truth for state. I also opted-out of leveraging Web Components because they're still a bit too bleeding edge. The approach I took is a happy medium somewhere between that provides all the niceties you'd expect from a full framework (ie minus the overhead).

**PubSub**

For immediate/auto change propagation, I needed a way for elements to subscribe to a common listener and re-render when the state changes. Observables are a great model for this pattern, so I implemented the Observer pattern as a generic and reusable Publisher/Subscriber module.

**Store**

Next up was the Store. I wanted something like Redux but with less bloat and boilerplate. I've never implemented a store from scratch so I took this as a learning opportunity.

I took some time to really study it in detail, implement it as-is, then trimmed the fat and reduced the API surface to the absolute minimum. This makes the module easier to understand and easier to maintain.

**PersistentStore**

From the start I was eager to address 'persistence'. I knew immediately that I wanted to use LocalStorage, the next step was to integrate LocalStorage access into my Store implementation. Piece of cake, the initial implementation only took about 5 more lines.

The second version abstracts out the load/save methods so they can be DependencyInjected during creation. That makes it possible to use this store with any persistence type (ex database, SasS, SessionStorage, etc).

**Component**

To avoid JS spaghetti, I wrapped up the common functionality into a basic Component class. The rest was just a matter of wiring everything up. I changed the API up a bit as I gained a better feel of how it would work in practice.

All-in-all, I spent half a day researching different store implementations. Then half a day implementing the modules.

### Design

I know there wasn't a requirement for design, but most of these demos will end up being thrown away. I don't like to invest time/energy into throwaway code unless I can learn something from it.

With that in mind. I decided to throw together a basic design that relies heavily on flexbox and includes responsive styling for mobile. My own preferred CSS style uses a mixture of BEM and CSS direct decendent selection. It's not quite as efficient as BEM but it's a hell of a lot more pleasant to write.

The design probably took the longest at the better part of a day. When possible, I prefer to lean on the expertise of a Designer for matters of aesthetic taste. Not my forte but it's always good to get some practice. 

## Pros-Cons

As with all design/development decisions, anything interesting involves tradeoffs. In this implementation, I chose to maximize bleeding edge techniques. The intrinsic value is this it also functions as a useful learning experience. For me personally, and for those who take the time to study it in-depth.

### Pros

**Maintainability**

No framework. No build step. No major breaking changes. No slippery-slope of de-facto conventions. Nothing fancy, special, or over-engineered.

It's dumb (ie not complex), boring (ie not clever), and small (ie easy to test, document, etc).


**Simplicity**

It has all the benefits of a framework without the fractal of complexity that has become the status quo in the current FrontEnd framework ecosystem.

Complexity, expecially over the long-term cannot be solved by throwing more tools at the problem. The tools we need exist already, what's lacking are modern workflows to use them effectively.

For a team, this code is approachable, easy to understand, easy to use. Barrier-to-entry is very low so it'll be very easy to onboard new devs.


### Cons

***Compatibility**

None of this will work in IE11. If IEll is a significant source of customers then relying on build tools or ditching the modern workflows altogether may be necessary.

IEll will break; ES module imports, flexbox, JS proxies, ES template strings, ES Map usage, etc. Pretty much everythign that is good about this.


**Familiartiy**

Not all JS devs are super comfortable working in ES6+. I used some emerging dev patterns (ex facade pattern) that are still very new to the JS ecosystem. Working on the bleeding edge isn't always a good thing, especially if the team culture is already established around working with older patterns/tools.


## Appendix A: Sources

The following resource(s) were used to build this demo.

- https://burst.shopify.com/watch - Production images w/ OSS-friendly licensing
