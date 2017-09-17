'use strict';

const expect = require('chai').expect;
const path = require('path');
const fi = require('..');

describe('Fi Utils', function () {

  it('should be an object', function () {
    expect(fi).to.be.an('object');
  });

  it('should have an init method', function () {
    expect(fi.init).to.be.a('function');
  });

  it('should have an include method', function () {
    expect(fi.include).to.be.a('function');
  });

  it('should have a basedir method', function () {
    expect(fi.basedir).to.be.a('function');
  });

  it('should have a serverdir method', function () {
    expect(fi.serverdir).to.be.a('function');
  });

  it('should have a component method', function () {
    expect(fi.component).to.be.a('function');
  });

  it('should have a config method', function () {
    expect(fi.config).to.be.a('function');
  });

  it('should initialize without a config object', function () {
    expect(fi.init).to.not.throw();
  });

  it('should initialize with an empty config object', function () {
    expect(fi.init.bind(null, {})).to.not.throw();
  });

  it('should initialize with a config object', function () {
    const config = {
      serverdir: path.join(process.cwd(), 'test', 'server'),
      basedir: path.join(process.cwd(), 'test'),
      debug: true
    };

    expect(fi.init.bind(null, config)).to.not.throw();
    expect(fi.serverdir()).to.equal(path.join(process.cwd(), 'test', 'server'));
    expect(fi.basedir()).to.equal(path.join(process.cwd(), 'test'));
  });

  it('should keep initialized values', function () {
    expect(fi.serverdir()).to.equal(path.join(process.cwd(), 'test', 'server'));
    expect(fi.basedir()).to.equal(path.join(process.cwd(), 'test'));
  });

  it('should load a component', function () {
    expect(fi.component('my-component')).to.be.an('object')
      .that.has.property('name', 'component');
  });

  it('should load a config', function () {
    expect(fi.config('my-config')).to.be.an('object')
      .that.has.property('name', 'config');
  });

});
