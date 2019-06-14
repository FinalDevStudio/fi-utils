const chalk = require('chalk');
const path = require('path');
const is = require('fi-is');

const config = {
  serverdir: path.join(process.cwd(), 'server'),
  basedir: process.cwd(),
  debug: () => {}
};

class FiUtils {
  /**
   * Debug proxy function.
   *
   * @returns {Mixed} Whatever `config.debug` returns.
   */
  static debug(...args) {
    return config.debug.apply(null, args);
  }

  /**
   * Retrieves the serverdir.
   *
   * @returns {String} The app's server absolute path.
   */
  static serverdir() {
    return config.serverdir;
  }

  /**
   * Retrieves the app's base dir.
   *
   * @returns {String} The app's absolute base path.
   */
  static basedir() {
    return config.basedir;
  }

  /**
   * Requires a file relative to the server folder.
   *
   * @param {String} relpath The relative directory route.
   * @param {String} name The file name to require.
   *
   * @returns {Mixed} The required file contents.
   */
  static include(relpath, name) {
    const target = path.normalize(path.join(this.serverdir(), relpath, name));

    this.debug(`${chalk.bold('Including')} ${path.join(relpath, name)}`);

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
  static config(name) {
    return this.include('configs', name);
  }

  /**
   * Requires a component.
   *
   * @param {String} name The component name.
   *
   * @returns {Mixed} The required file contents.
   */
  static component(name) {
    return this.include('components', name);
  }

  /**
   * Initializes the module.
   *
   * @param {Object} cfg The configuration options.
   *
   * @returns {void}
   */
  static init(cfg) {
    if (is.not.object(cfg)) {
      return;
    }

    if (is.function(cfg.debug)) {
      config.debug = cfg.debug;
    } else if (is.boolean(cfg.debug) && cfg.debug) {
      config.debug = console.log.bind(console);
    }

    if (is.string(cfg.basedir)) {
      config.basedir = cfg.basedir;
    }

    if (is.string(cfg.serverdir)) {
      config.serverdir = cfg.serverdir;
    }

    this.debug(`${chalk.bold('Base directory:')} ${this.basedir()}`);
    this.debug(`${chalk.bold('Server directory:')} ${this.serverdir()}`);
  }
}

module.exports = FiUtils;
