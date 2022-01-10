---
title: React
description: Get started with React and components by building a React application
date: 2021-07-14
updated: 2021-07-14
slug: react
tags:
  - React
permalink: "{{ slug }}/"
lead: Build and deploy your first full React application
---

React is a big topic and there's a lot to learn. Let's get started by learning the basics and applying what we learn to create an application.

## What is React

Described as "a JavaScript library for building user interfaces", React is a tool we can use to build interactive user interfaces for web sites and applications.

When we build UI and applications with React we do so by creating components. These components are functions that generate the HTML displayed in the browser. React makes it easy to have our UI update and respond to changes, as it is built around the idea that we can pass data (known as state) between components, and the components handle updating their output HTML.

With React we don't need to create our applications with HTML then write JavaScript to update and change the HTML. Instead, React components take care of keeping the displayed HTML updated and letting us focus on how our application works.

## Components and props

We build React applications by putting together components, each responsible for receiving data and either passing it down to other components or generating `HTML`. Here's a simple component:

```jsx
function HelloWorld(props) {
  return <p>Hello {props.name}</p>;
}
```

This function takes `props`, and returns some output HTML (using a format called `JSX`).

Components, like the `HelloWorld` component above, start with a capital letter.

We can wrap components in other components. Let's take the simple `HelloWorld` component and use it within another component.

```jsx
function HelloWorld(props) {
  return <p>Hello {props.name}</p>;
}

function App() {
  return <HelloWorld name="dev" />;
}
```

The `App` component is also a simple function that returns `JSX` but this time rather than returning `HTML`, it's returning our `HelloWorld` component. It is also passing a `prop`, called `name`.

This example is live [on CodeSandBox](https://codesandbox.io/s/intelligent-gates-qfu1d?file=/src/App.js). Try changing the value in the `name` prop.

### Props

Props can be passed strings, numbers or JavaScript objects. For anything other than strings we wrap the value in braces.

```jsx
{% raw %}<HelloWorld myProp={123} /> // Passing a number as a prop
<HelloWorld myProp={{ key: 'value' }} /> // Passing an object as a prop
<HelloWorld a={1} b={2} /> // Multiple props{% endraw %}
```

When we pass multiple props, we can pass them through more succinctly by [destructing the object properties](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment).

```jsx
const multipleProps = {
  a: 1,
  b: 2,
};
<HelloWorld {...multipleProps} />;
```

This gives the component the props `a` and `b` without having to write each into the tag.

We can also pass functions as props. This is a very useful when we wrap components and want to let child components interact with their parents.

```jsx
function handleClick() {
  // Perform an action
}
<HelloWorld handleClick={handleClick} />;
```

This passes the `handleClick` function to the `HelloWorld` component. The `HelloWorld` component can then call this function as needed.

## Nesting components

So far we have been using single components. Let's see how we can make components more useful by wrapping them

### Children

## React's JSX

Closing tags, always returning a single (wrapped) component. React fragment.

## Types of components

Hooks, classes, HoC (https://reactjs.org/docs/higher-order-components.html), strengths and weaknesses of each

## Thinking about application structure

TODO: Diagram showing applications passing props, state coming from context or external state, which itself reaches out to APIs.

In this example we have a few things happening. It starts with data coming into the application. This is in the form of an API call, requesting data from somewhere outside our application.

TODO: Explain the sequence of data

Sequence of events, data A changes, component updates, passes the changed props to B, which reacts by re-rendering part of the HTML on the page.

Mention routing and serverside rendering, which has it's own section later

## Creating our own React application

Options including CRA, others... for this example we'll use Vite.js (why).

### Set up using Vite

Check `npm -v` first, then choose one of the following if it's version 6 or 7.

```bash
# npm 6.x
npm init vite@latest my-vue-app --template react

# npm 7+, extra double-dash is needed:
npm init vite@latest my-vue-app -- --template react
```

Then run with `npm run dev`. Visit [localhost:3000](http://localhost:3000) to see the demo app running locally.

TODO: Tour of the initial files, `vite.config.js`, `main.jsx` entry point, `App.jsx` the main component, `App.css` styles imported into the App component.

## Let's build

TODO: Overview of what we will work toward, and the steps involved

### Folder structure

- Advanced components (wrapper components, passing state, containing other components)

- JSX logic, arrays etc
- Form submissions
- Hooks
- Component state, useState - avoiding mutation, overwrite state to trigger renders
- The children prop: https://smashingmagazine.com/2021/08/react-children-iteration-methods/
- Using useContext
- Styling (emotion)
- Application state
- Redux toolkit
- UseEffect (timed changes, listeners, cleaning up)
- Testing
- Deploying a React App
- Serverside rendering

https://github.com/frandiox/vite-ssr

- React Dev tools
- Testing with testing-library.com
- Storybook development https://storybook.js.org/blog/testing-component-interactions/

## In-app routing

## Serverside rendering

## Next steps

- Using with GraphQL
- Styling with Emotion or other techniques
- Redux toolkit
- Theming
- Authentication
- Using with other build tools, CRA, NextJS, Gatsby...
- Best practices

Best practices: https://www.codeinwp.com/blog/react-best-practices/

May be some ideas here on best practices https://github.com/alan2207/bulletproof-react
