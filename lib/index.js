'use strict';

const chalk = require('chalk');
const path = require('path');
const is = require('fi-is');

const COMPONENTS = 'components';
const CONFIGS = 'configs';

const CONFIG = {
  basedir: path.normalize(path.join(__dirname, '..')),
  serverdir: __dirname
};

let debug = () => {};

/**
 * Retrieves the serverdir.
 *
 * @returns {String} The app's server absolute path.
 */
function serverdir() {
  return CONFIG.serverdir;
}

/**
 * Retrieves the app's base dir.
 *
 * @returns {String} The app's absolute base path.
 */
function basedir() {
  return CONFIG.basedir;
}

/**
 * Requires a file relative to the server folder.
 *
 * @param {String} relpath The relative directory route.
 * @param {String} name The file name to require.
 *
 * @returns {Mixed} The required file contents.
 */
function include(relpath, name) {
  const target = path.normalize(path.join(serverdir(), relpath, name));

  debug(chalk.bold('Including ') + path.join(relpath, name));

  /* Try to require the module */
  return require(target);
}

/**
 * Requiress a config file.
 *
 * @param {String} name The config name.
 *
 * @returns {Mixed} The required file contents.
 */
function config(name) {
  return include(CONFIGS, name);
}

/**
 * Requires a component.
 *
 * @param {String} name The component name.
 *
 * @returns {Mixed} The required file contents.
 */
function component(name) {
  return include(COMPONENTS, name);
}

/**
 * Initializes the module.
 *
 * @param {Object} config The configuration options.
 *
 * @returns {void}
 */
function init(config) {
  if (is.not.object(config)) {
    return;
  }

  if (is.function(config.debug)) {
    debug = config.debug;
  } else if (is.boolean(config.debug) && config.debug) {
    debug = console.log;
  }

  if (is.string(config.basedir)) {
    CONFIG.basedir = config.basedir;
  }

  if (is.string(config.serverdir)) {
    CONFIG.serverdir = config.serverdir;
  }

  debug(chalk.bold('Base directory: ') + basedir());
  debug(chalk.bold('Server directory: ') + serverdir());
}

Object.defineProperties(module.exports, {
  basedir: {
    value: basedir
  },

  serverdir: {
    value: serverdir
  },

  include: {
    value: include
  },

  component: {
    value: component
  },

  config: {
    value: config
  },

  init: {
    value: init
  }
});
