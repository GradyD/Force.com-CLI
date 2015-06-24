#! /usr/bin/env node

// This is a REST/Tooling API Salesforce script for developers
// Some of the code was taken from https://github.com/kevinohara80/nforce
// It has seen been modified

var http = require('http');
var options = {
  host: 'www.random.org',
  path: '/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
};

callback = function(response) {
  var str = '';

  //another chunk of data has been recieved, so append it to `str`
  response.on('data', function (chunk) {
    str += chunk;
  });

  //the whole response has been recieved, so we just print it out here
  response.on('end', function () {
    // console.log(str);
  });
};

http.request(options, callback).end();


// HERE STARTS THE NFORCE code
// THE CODE LOOKS GOOD AND JUST NEEDS MINOR
// ADJUSTMENTS FOR OUR USE CASE

/*****************************
 * constants
 *****************************/

var AUTH_ENDPOINT      = 'https://login.salesforce.com/services/oauth2/authorize';
var TEST_AUTH_ENDPOINT = 'https://test.salesforce.com/services/oauth2/authorize';
var LOGIN_URI          = 'https://login.salesforce.com/services/oauth2/token';
var TEST_LOGIN_URI     = 'https://test.salesforce.com/services/oauth2/token';
var ENVS               = ['sandbox', 'production'];
var MODES              = ['multi', 'single'];
var API_VERSIONS       = [
  'v20.0', 'v21.0', 'v22.0', 'v23.0', 'v24.0',
  'v25.0', 'v26.0', 'v27.0', 'v28.0', 'v29.0',
  'v30.0', 'v31.0', 'v32.0', 'v33.0'
];

/*****************************
 * connection object
 *****************************/

// This should be removed once all of lodash is removed
var _ = require('lodash');

Connection = function(opts) {
  var self = this;

  opts = (opts || {}, {
    clientId:         null,
    clientSecret:     null,
    redirectUri:      null,
    authEndpoint:     AUTH_ENDPOINT,
    testAuthEndpoint: TEST_AUTH_ENDPOINT,
    loginUri:         LOGIN_URI,
    testLoginUri:     TEST_LOGIN_URI,
    apiVersion:       API_VERSIONS[API_VERSIONS.length-1],
    environment:      'production',
    mode:             'multi',
    gzip:             false,
    autoRefresh:      false,
    onRefresh:        undefined,
    timeout:          undefined,
    oauth:            undefined,
    username:         undefined,
    password:         undefined,
    securityToken:    undefined
  });

  // convert option values
  opts.apiVersion = opts.apiVersion.toString().toLowerCase().replace('v', '').replace('.0', '');
  opts.environment = opts.environment.toLowerCase();
  opts.mode = opts.mode.toLowerCase();

  // console.log(self);
  // self = _.assign(this, opts);

  // console.log(self);

  console.log(opts);
  // var self = opts;

  // console.log(self);

  // validate options
  if(opts.clientId) throw new Error('invalid or missing clientId');
  if(opts.redirectUri) throw new Error('invalid or missing redirectUri');
  if(opts.authEndpoint.length === 0) throw new Error('invalid or missing authEndpoint');
  if(opts.testAuthEndpoint.length === 0) throw new Error('invalid or missing testAuthEndpoint');
  if(opts.loginUri.length === 0) throw new Error('invalid or missing loginUri');
  if(opts.testLoginUri.length === 0) throw new Error('invalid or missing testLoginUri');
  if((opts.gzip !== false) && (opts.gzip !== true)) throw new Error('gzip must be a boolean');
  // Need to add sandbox to this IF
  // if((opts.environment.toLowerCase() !== 'production')) {
  //   throw new Error('invalid environment, only production and sandbox are allowed');
  // }
  // if(!_.isString(this.mode) || _.indexOf(MODES, this.mode) === -1) {
  //   throw new Error('invalid mode, only ' + MODES.join(' and ') + ' are allowed');
  // }
  // if(this.onRefresh && !_.isFunction(this.onRefresh)) throw new Error('onRefresh must be a function');
  // if(this.timeout && !_.isNumber(this.timeout)) throw new Error('timeout must be a number');

  // // parse api version
  // try {
  //   this.apiVersion = 'v' + parseInt(this.apiVersion, 10) + '.0';
  // } catch (err) {
  //   throw new Error('invalid apiVersion number');
  // }
  // if(API_VERSIONS.indexOf(this.apiVersion) === -1) {
  //   throw new Error('api version ' + this.apiVersion + ' is not supported');
  // }
  //
  // // parse timeout into integer in case it's a floating point.
  // this.timeout = parseInt(this.timeout, 10);
  //
  // // load plugins
  // if(opts.plugins && _.isArray(opts.plugins)) {
  //   opts.plugins.forEach(function(pname) {
  //     if(!plugins[pname]) throw new Error('plugin ' + pname + ' not found');
  //     // clone the object
  //     self[pname] = _.clone(plugins[pname]._fns);
  //
  //     // now bind to the connection object
  //     _.forOwn(self[pname], function(fn, key) {
  //       self[pname][key] = _.bind(self[pname][key], self);
  //     });
  //   });
  // }
};

// Calling the connection function for debuging reasons
// Remove once complete
Connection();
