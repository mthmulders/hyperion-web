# Status
I do no longer actively maintain this code base.
I have archived it; this means you can still inspect it and check it out.
Take care: the ideas on which I have initially built this project may now be outdated.

The code in this repo is NOT production grade anymore.
Its primary purpose has been learning React and Typescript concepts.
I have been running it in production myself, but I had additional security measures in place back then.

You can in no way hold me liable for damage caused directly or indirectly by using this code; see also the [license](#license).

# Hyperion Web
[![Circle CI](https://circleci.com/gh/mthmulders/hyperion-web/tree/master.svg?style=svg)](https://circleci.com/gh/mthmulders/hyperion-web/tree/master)
[![BCH compliance](https://bettercodehub.com/edge/badge/mthmulders/hyperion-web?branch=master)](https://bettercodehub.com/results/mthmulders/hyperion-web)
[![Mutation testing badge](https://badge.stryker-mutator.io/github.com/mthmulders/hyperion-web/master)](https://dashboard.stryker-mutator.io/reports/github.com/mthmulders/hyperion-web/master)

This is the web front-end to [Hyperion](https://github.com/mthmulders/hyperion).
Hyperion is an application to monitor a 'Smart Meter' that follows the Dutch "Smart Meter" Requirements, or DSMR for short.

## Building
There are two ways to build the Hyperion frontend.

### For development
Just run

    npm install
    API_HOST=http://your-hyperion-instance npm run start

### For production
Just run

    npm install
    npm run build

## About the code
Hyperion Web is written in [TypeScript](http://www.typescriptlang.org/) using the [React library](https://facebook.github.io/react/).

## Design
The code is structured according to the ["Presentational and Container Components"](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0) pattern.

In short, there are two main classes of React components:

1. *Container components*.
   * Are concerned with how things work.
   * May contain both presentational and container components** inside but usually don’t have any DOM markup of their own except for some wrapping divs, and never have any styles.
   * Provide the data and behavior to presentational or other container components.
   * Call Flux actions and provide these as callbacks to the presentational components.
   * Are often stateful, as they tend to serve as data sources.
   * Are usually generated using higher order components such as `connect()` from React Redux, `createContainer()` from Relay, or `Container.create()` from Flux Utils, rather than written by hand.
   * Examples: UserPage, FollowersSidebar, StoryContainer, FollowedUserList.
1. *Presentational components*.
   * Are concerned with how things look.
   * May contain both presentational and container components** inside, and usually have some DOM markup and styles of their own.
   * Often allow containment via this.props.children.
   * Have no dependencies on the rest of the app, such as Flux actions or stores.
   * Don’t specify how the data is loaded or mutated.
   * Receive data and callbacks exclusively via props.
   * Rarely have their own state (when they do, it’s UI state rather than data).
   * Are written as functional components unless they need state, lifecycle hooks, or performance    optimizations.
   * Examples: Page, Sidebar, Story, UserInfo, List.

## License
Hyperion Web is licensed under the MIT License. See the `LICENSE` file for details.