# Fi Utils [![Build Status](https://travis-ci.org/FinalDevStudio/fi-utils.svg?branch=master)](https://travis-ci.org/FinalDevStudio/fi-schemas)

Utilities and helpers for Fi Seed based projects.

## Installing

```
npm i fi-utils
```

## Usage

```js
const fi = require('fi-utils');
```

### Initialization

This module exports a `Class` that exposes multiple `static` methods intended to be used as a singleton.

#### Example:

```js
/**
 * @file server/index.js
 */

const fi = require('fi-utils');

// ...

fi.init(config));

// ...

const mycomp = fi.component('my-component'); // require('/home/user/workspace/app/server/components/my-component.js')

mycomp.configure(fi.config('my-component')); // require('/home/user/workspace/app/server/configs/my-component.js')

// ...

console.log(fi.serverdir()) // /home/user/workspace/app/server
console.log(fi.basedir()) // /home/user/workspace/app

// ...
```

```js
/**
 * @file server/some/where/deep/in/your/project.js
 */

const fi = require('fi-utils');

module.exports = () => {
  // ...

  const othercomp = fi.component('other-component'); // require('/home/user/workspace/app/server/components/other-component.js')

  // ...
};
```

### Configuration

An optional `Object` with the following properties:

| Param       | Type                    | Required | Default                              | Description                                                                          |
| ----------- | ----------------------- | -------- | ------------------------------------ | ------------------------------------------------------------------------------------ |
| `debug`     | `Function` or `Boolean` | No       | `() => {}`                           | Can be a `Function` to log with or a `Boolean`. If `true` it will use `console.log`. |
| `basedir`   | `String`                | No       | `process.cwd()`                      | Absolute path to the app's base dir.                                                 |
| `serverdir` | `String`                | No       | `path.join(process.cwd(), 'server')` | Absolute path to the app's server dir.                                               |

# API

| Method      | Type       | Arguments                           | Returns  | Description                                                                                          |
| ----------- | ---------- | ----------------------------------- | -------- | ---------------------------------------------------------------------------------------------------- |
| `init`      | `Function` | `{Object} config`                   | `void`   | This method wil initialize the module with the provided config.                                      |
| `serverdir` | `Function` | None                                | `String` | Returns the configured server dir.                                                                   |
| `basedir`   | `Function` | None                                | `String` | Returns the configured base dir.                                                                     |
| `include`   | `Function` | `{String} relpath`, `{String} name` | `Mixed`  | Requires a file relative to the server folder.                                                       |
| `config`    | `Function` | `{String} name`                     | `Mixed`  | Wrapper to require a config file relative to the `<serverdir>/configs` folder using `include`.       |
| `component` | `Function` | `{String} name`                     | `Mixed`  | Wrapper to require a component file relative to the `<serverdir>/components` folder using `include`. |
