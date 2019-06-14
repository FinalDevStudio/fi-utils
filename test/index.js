'use strict';

const expect = require('chai').expect;
const path = require('path');
const fi = require('..');

describe('Fi Utils', function() {
  it('should be an object', () => {
    expect(fi).to.be.a('function'); // Class really...
  });

  it('should have an init method', () => {
    expect(fi.init).to.be.a('function');
  });

  it('should have an include method', () => {
    expect(fi.include).to.be.a('function');
  });

  it('should have a basedir method', () => {
    expect(fi.basedir).to.be.a('function');
  });

  it('should have a serverdir method', () => {
    expect(fi.serverdir).to.be.a('function');
  });

  it('should have a component method', () => {
    expect(fi.component).to.be.a('function');
  });

  it('should have a config method', () => {
    expect(fi.config).to.be.a('function');
  });

  it('should initialize without a config object', () => {
    expect(fi.init).to.not.throw();
  });

  it('should initialize with an empty config object', () => {
    const config = {};
    expect(fi.init.bind(fi, config)).to.not.throw();
  });

  it('should initialize with a function as a debug option', () => {
    const config = { debug() {} };
    expect(fi.init.bind(fi, config)).to.not.throw();
  });

  it('should initialize with a config object', () => {
    const config = {
      serverdir: path.join(process.cwd(), 'test', 'server'),
      basedir: path.join(process.cwd(), 'test'),
      debug: true
    };

    expect(fi.init.bind(fi, config)).to.not.throw();
    expect(fi.serverdir()).to.equal(path.join(process.cwd(), 'test', 'server'));
    expect(fi.basedir()).to.equal(path.join(process.cwd(), 'test'));
  });

  it('should keep initialized values', function() {
    expect(fi.serverdir()).to.equal(path.join(process.cwd(), 'test', 'server'));
    expect(fi.basedir()).to.equal(path.join(process.cwd(), 'test'));
  });

  it('should load a component', () => {
    expect(fi.component('my-component'))
      .to.be.an('object')
      .that.has.property('name', 'component');
  });

  it('should load a config', () => {
    expect(fi.config('my-config'))
      .to.be.an('object')
      .that.has.property('name', 'config');
  });
});
