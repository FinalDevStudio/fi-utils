# Fi Utils [![Build Status](https://travis-ci.org/FinalDevStudio/fi-utils.svg?branch=master)](https://travis-ci.org/FinalDevStudio/fi-schemas)

Utilities and helpers for Fi Seed based projects.


## Installing

```sh
npm install --save fi-utils
```


## Usage

```js
const fi = require('fi-utils');
```


### Initialization

This module exports an `Object` that exposes various methods:

```js
const fi = require('fi-utils');

fi.init(config));

const mycomp = fi.component('my-component');

mycomp.configure(fi.config('my-comp-cfg));

// ...
```


### Configuration

An optional `Object` with the following parameters:

| Param | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `debug` | `Function\|Boolean` | No | `Function` | Can be a `Function` to log with or a `Boolean`. If `true` it will use `console.log`. |
| `basedir` | `String` | No | `path.normalize(path.join(__dirname, '..'))` | Absolute path to the app's base dir. |
| `serverdir` | `String` | No | `__dirname` | Absolute path to the app's server dir. |


# API

| Method | Arguments | Description |
| --- | --- | --- |
| `init` | `config` | This method wil initialize the module with the provided config. |
| `serverdir` | None | Retruns the configured server dir. |
| `basedir` | None | Retruns the configured base dir. |
| `include` | `relpath`, `name` | Requires a file relative to the server folder. |
| `config` | `name` | Wrapper to include a config file relative to the `<serverdir>/configs` folder. |
| `component` | `name` | Wrapper to include a component file relative to the `<serverdir>/components` folder. |
