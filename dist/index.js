module.exports =
/******/ (function(modules, runtime) { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	__webpack_require__.ab = __dirname + "/";
/******/
/******/ 	// the startup function
/******/ 	function startup() {
/******/ 		// Load entry module and return exports
/******/ 		return __webpack_require__(325);
/******/ 	};
/******/
/******/ 	// run startup
/******/ 	return startup();
/******/ })
/************************************************************************/
/******/ ({

/***/ 11:
/***/ (function(module) {

// Returns a wrapper function that returns a wrapped callback
// The wrapper function should do some stuff, and return a
// presumably different callback function.
// This makes sure that own properties are retained, so that
// decorations and such are not lost along the way.
module.exports = wrappy
function wrappy (fn, cb) {
  if (fn && cb) return wrappy(fn)(cb)

  if (typeof fn !== 'function')
    throw new TypeError('need wrapper function')

  Object.keys(fn).forEach(function (k) {
    wrapper[k] = fn[k]
  })

  return wrapper

  function wrapper() {
    var args = new Array(arguments.length)
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i]
    }
    var ret = fn.apply(this, args)
    var cb = args[args.length-1]
    if (typeof ret === 'function' && ret !== cb) {
      Object.keys(cb).forEach(function (k) {
        ret[k] = cb[k]
      })
    }
    return ret
  }
}


/***/ }),

/***/ 16:
/***/ (function(module) {

module.exports = require("tls");

/***/ }),

/***/ 18:
/***/ (function(module) {

module.exports = eval("require")("encoding");


/***/ }),

/***/ 49:
/***/ (function(module, __unusedexports, __webpack_require__) {

var wrappy = __webpack_require__(11)
module.exports = wrappy(once)
module.exports.strict = wrappy(onceStrict)

once.proto = once(function () {
  Object.defineProperty(Function.prototype, 'once', {
    value: function () {
      return once(this)
    },
    configurable: true
  })

  Object.defineProperty(Function.prototype, 'onceStrict', {
    value: function () {
      return onceStrict(this)
    },
    configurable: true
  })
})

function once (fn) {
  var f = function () {
    if (f.called) return f.value
    f.called = true
    return f.value = fn.apply(this, arguments)
  }
  f.called = false
  return f
}

function onceStrict (fn) {
  var f = function () {
    if (f.called)
      throw new Error(f.onceError)
    f.called = true
    return f.value = fn.apply(this, arguments)
  }
  var name = fn.name || 'Function wrapped with `once`'
  f.onceError = name + " shouldn't be called more than once"
  f.called = false
  return f
}


/***/ }),

/***/ 82:
/***/ (function(__unusedmodule, exports) {

"use strict";

// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", { value: true });
exports.toCommandValue = void 0;
/**
 * Sanitizes an input into a string so it can be passed into issueCommand safely
 * @param input input to sanitize into a string
 */
function toCommandValue(input) {
    if (input === null || input === undefined) {
        return '';
    }
    else if (typeof input === 'string' || input instanceof String) {
        return input;
    }
    return JSON.stringify(input);
}
exports.toCommandValue = toCommandValue;
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ 87:
/***/ (function(module) {

module.exports = require("os");

/***/ }),

/***/ 102:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

// For internal use, subject to change.
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.issueCommand = void 0;
// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
const fs = __importStar(__webpack_require__(747));
const os = __importStar(__webpack_require__(87));
const utils_1 = __webpack_require__(82);
function issueCommand(command, message) {
    const filePath = process.env[`GITHUB_${command}`];
    if (!filePath) {
        throw new Error(`Unable to find environment variable for file command ${command}`);
    }
    if (!fs.existsSync(filePath)) {
        throw new Error(`Missing file at path: ${filePath}`);
    }
    fs.appendFileSync(filePath, `${utils_1.toCommandValue(message)}${os.EOL}`, {
        encoding: 'utf8'
    });
}
exports.issueCommand = issueCommand;
//# sourceMappingURL=file-command.js.map

/***/ }),

/***/ 127:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApiBaseUrl = exports.getProxyAgent = exports.getAuthString = void 0;
const httpClient = __importStar(__webpack_require__(539));
function getAuthString(token, options) {
    if (!token && !options.auth) {
        throw new Error('Parameter token or opts.auth is required');
    }
    else if (token && options.auth) {
        throw new Error('Parameters token and opts.auth may not both be specified');
    }
    return typeof options.auth === 'string' ? options.auth : `token ${token}`;
}
exports.getAuthString = getAuthString;
function getProxyAgent(destinationUrl) {
    const hc = new httpClient.HttpClient();
    return hc.getAgent(destinationUrl);
}
exports.getProxyAgent = getProxyAgent;
function getApiBaseUrl() {
    return process.env['GITHUB_API_URL'] || 'https://api.github.com';
}
exports.getApiBaseUrl = getApiBaseUrl;
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ 141:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";


var net = __webpack_require__(631);
var tls = __webpack_require__(16);
var http = __webpack_require__(605);
var https = __webpack_require__(211);
var events = __webpack_require__(614);
var assert = __webpack_require__(357);
var util = __webpack_require__(669);


exports.httpOverHttp = httpOverHttp;
exports.httpsOverHttp = httpsOverHttp;
exports.httpOverHttps = httpOverHttps;
exports.httpsOverHttps = httpsOverHttps;


function httpOverHttp(options) {
  var agent = new TunnelingAgent(options);
  agent.request = http.request;
  return agent;
}

function httpsOverHttp(options) {
  var agent = new TunnelingAgent(options);
  agent.request = http.request;
  agent.createSocket = createSecureSocket;
  agent.defaultPort = 443;
  return agent;
}

function httpOverHttps(options) {
  var agent = new TunnelingAgent(options);
  agent.request = https.request;
  return agent;
}

function httpsOverHttps(options) {
  var agent = new TunnelingAgent(options);
  agent.request = https.request;
  agent.createSocket = createSecureSocket;
  agent.defaultPort = 443;
  return agent;
}


function TunnelingAgent(options) {
  var self = this;
  self.options = options || {};
  self.proxyOptions = self.options.proxy || {};
  self.maxSockets = self.options.maxSockets || http.Agent.defaultMaxSockets;
  self.requests = [];
  self.sockets = [];

  self.on('free', function onFree(socket, host, port, localAddress) {
    var options = toOptions(host, port, localAddress);
    for (var i = 0, len = self.requests.length; i < len; ++i) {
      var pending = self.requests[i];
      if (pending.host === options.host && pending.port === options.port) {
        // Detect the request to connect same origin server,
        // reuse the connection.
        self.requests.splice(i, 1);
        pending.request.onSocket(socket);
        return;
      }
    }
    socket.destroy();
    self.removeSocket(socket);
  });
}
util.inherits(TunnelingAgent, events.EventEmitter);

TunnelingAgent.prototype.addRequest = function addRequest(req, host, port, localAddress) {
  var self = this;
  var options = mergeOptions({request: req}, self.options, toOptions(host, port, localAddress));

  if (self.sockets.length >= this.maxSockets) {
    // We are over limit so we'll add it to the queue.
    self.requests.push(options);
    return;
  }

  // If we are under maxSockets create a new one.
  self.createSocket(options, function(socket) {
    socket.on('free', onFree);
    socket.on('close', onCloseOrRemove);
    socket.on('agentRemove', onCloseOrRemove);
    req.onSocket(socket);

    function onFree() {
      self.emit('free', socket, options);
    }

    function onCloseOrRemove(err) {
      self.removeSocket(socket);
      socket.removeListener('free', onFree);
      socket.removeListener('close', onCloseOrRemove);
      socket.removeListener('agentRemove', onCloseOrRemove);
    }
  });
};

TunnelingAgent.prototype.createSocket = function createSocket(options, cb) {
  var self = this;
  var placeholder = {};
  self.sockets.push(placeholder);

  var connectOptions = mergeOptions({}, self.proxyOptions, {
    method: 'CONNECT',
    path: options.host + ':' + options.port,
    agent: false,
    headers: {
      host: options.host + ':' + options.port
    }
  });
  if (options.localAddress) {
    connectOptions.localAddress = options.localAddress;
  }
  if (connectOptions.proxyAuth) {
    connectOptions.headers = connectOptions.headers || {};
    connectOptions.headers['Proxy-Authorization'] = 'Basic ' +
        new Buffer(connectOptions.proxyAuth).toString('base64');
  }

  debug('making CONNECT request');
  var connectReq = self.request(connectOptions);
  connectReq.useChunkedEncodingByDefault = false; // for v0.6
  connectReq.once('response', onResponse); // for v0.6
  connectReq.once('upgrade', onUpgrade);   // for v0.6
  connectReq.once('connect', onConnect);   // for v0.7 or later
  connectReq.once('error', onError);
  connectReq.end();

  function onResponse(res) {
    // Very hacky. This is necessary to avoid http-parser leaks.
    res.upgrade = true;
  }

  function onUpgrade(res, socket, head) {
    // Hacky.
    process.nextTick(function() {
      onConnect(res, socket, head);
    });
  }

  function onConnect(res, socket, head) {
    connectReq.removeAllListeners();
    socket.removeAllListeners();

    if (res.statusCode !== 200) {
      debug('tunneling socket could not be established, statusCode=%d',
        res.statusCode);
      socket.destroy();
      var error = new Error('tunneling socket could not be established, ' +
        'statusCode=' + res.statusCode);
      error.code = 'ECONNRESET';
      options.request.emit('error', error);
      self.removeSocket(placeholder);
      return;
    }
    if (head.length > 0) {
      debug('got illegal response body from proxy');
      socket.destroy();
      var error = new Error('got illegal response body from proxy');
      error.code = 'ECONNRESET';
      options.request.emit('error', error);
      self.removeSocket(placeholder);
      return;
    }
    debug('tunneling connection has established');
    self.sockets[self.sockets.indexOf(placeholder)] = socket;
    return cb(socket);
  }

  function onError(cause) {
    connectReq.removeAllListeners();

    debug('tunneling socket could not be established, cause=%s\n',
          cause.message, cause.stack);
    var error = new Error('tunneling socket could not be established, ' +
                          'cause=' + cause.message);
    error.code = 'ECONNRESET';
    options.request.emit('error', error);
    self.removeSocket(placeholder);
  }
};

TunnelingAgent.prototype.removeSocket = function removeSocket(socket) {
  var pos = this.sockets.indexOf(socket)
  if (pos === -1) {
    return;
  }
  this.sockets.splice(pos, 1);

  var pending = this.requests.shift();
  if (pending) {
    // If we have pending requests and a socket gets closed a new one
    // needs to be created to take over in the pool for the one that closed.
    this.createSocket(pending, function(socket) {
      pending.request.onSocket(socket);
    });
  }
};

function createSecureSocket(options, cb) {
  var self = this;
  TunnelingAgent.prototype.createSocket.call(self, options, function(socket) {
    var hostHeader = options.request.getHeader('host');
    var tlsOptions = mergeOptions({}, self.options, {
      socket: socket,
      servername: hostHeader ? hostHeader.replace(/:.*$/, '') : options.host
    });

    // 0 is dummy port for v0.6
    var secureSocket = tls.connect(0, tlsOptions);
    self.sockets[self.sockets.indexOf(socket)] = secureSocket;
    cb(secureSocket);
  });
}


function toOptions(host, port, localAddress) {
  if (typeof host === 'string') { // since v0.10
    return {
      host: host,
      port: port,
      localAddress: localAddress
    };
  }
  return host; // for v0.11 or later
}

function mergeOptions(target) {
  for (var i = 1, len = arguments.length; i < len; ++i) {
    var overrides = arguments[i];
    if (typeof overrides === 'object') {
      var keys = Object.keys(overrides);
      for (var j = 0, keyLen = keys.length; j < keyLen; ++j) {
        var k = keys[j];
        if (overrides[k] !== undefined) {
          target[k] = overrides[k];
        }
      }
    }
  }
  return target;
}


var debug;
if (process.env.NODE_DEBUG && /\btunnel\b/.test(process.env.NODE_DEBUG)) {
  debug = function() {
    var args = Array.prototype.slice.call(arguments);
    if (typeof args[0] === 'string') {
      args[0] = 'TUNNEL: ' + args[0];
    } else {
      args.unshift('TUNNEL:');
    }
    console.error.apply(console, args);
  }
} else {
  debug = function() {};
}
exports.debug = debug; // for test


/***/ }),

/***/ 211:
/***/ (function(module) {

module.exports = require("https");

/***/ }),

/***/ 262:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Context = void 0;
const fs_1 = __webpack_require__(747);
const os_1 = __webpack_require__(87);
class Context {
    /**
     * Hydrate the context from the environment
     */
    constructor() {
        var _a, _b, _c;
        this.payload = {};
        if (process.env.GITHUB_EVENT_PATH) {
            if (fs_1.existsSync(process.env.GITHUB_EVENT_PATH)) {
                this.payload = JSON.parse(fs_1.readFileSync(process.env.GITHUB_EVENT_PATH, { encoding: 'utf8' }));
            }
            else {
                const path = process.env.GITHUB_EVENT_PATH;
                process.stdout.write(`GITHUB_EVENT_PATH ${path} does not exist${os_1.EOL}`);
            }
        }
        this.eventName = process.env.GITHUB_EVENT_NAME;
        this.sha = process.env.GITHUB_SHA;
        this.ref = process.env.GITHUB_REF;
        this.workflow = process.env.GITHUB_WORKFLOW;
        this.action = process.env.GITHUB_ACTION;
        this.actor = process.env.GITHUB_ACTOR;
        this.job = process.env.GITHUB_JOB;
        this.runNumber = parseInt(process.env.GITHUB_RUN_NUMBER, 10);
        this.runId = parseInt(process.env.GITHUB_RUN_ID, 10);
        this.apiUrl = (_a = process.env.GITHUB_API_URL) !== null && _a !== void 0 ? _a : `https://api.github.com`;
        this.serverUrl = (_b = process.env.GITHUB_SERVER_URL) !== null && _b !== void 0 ? _b : `https://github.com`;
        this.graphqlUrl = (_c = process.env.GITHUB_GRAPHQL_URL) !== null && _c !== void 0 ? _c : `https://api.github.com/graphql`;
    }
    get issue() {
        const payload = this.payload;
        return Object.assign(Object.assign({}, this.repo), { number: (payload.issue || payload.pull_request || payload).number });
    }
    get repo() {
        if (process.env.GITHUB_REPOSITORY) {
            const [owner, repo] = process.env.GITHUB_REPOSITORY.split('/');
            return { owner, repo };
        }
        if (this.payload.repository) {
            return {
                owner: this.payload.repository.owner.login,
                repo: this.payload.repository.name
            };
        }
        throw new Error("context.repo requires a GITHUB_REPOSITORY environment variable like 'owner/repo'");
    }
}
exports.Context = Context;
//# sourceMappingURL=context.js.map

/***/ }),

/***/ 280:
/***/ (function(module) {

module.exports = register;

function register(state, name, method, options) {
  if (typeof method !== "function") {
    throw new Error("method for before hook must be a function");
  }

  if (!options) {
    options = {};
  }

  if (Array.isArray(name)) {
    return name.reverse().reduce(function (callback, name) {
      return register.bind(null, state, name, callback, options);
    }, method)();
  }

  return Promise.resolve().then(function () {
    if (!state.registry[name]) {
      return method(options);
    }

    return state.registry[name].reduce(function (method, registered) {
      return registered.hook.bind(null, method, options);
    }, method)();
  });
}


/***/ }),

/***/ 299:
/***/ (function(__unusedmodule, exports) {

"use strict";


Object.defineProperty(exports, '__esModule', { value: true });

const VERSION = "2.14.0";

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);

    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }

    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

/**
 * Some “list” response that can be paginated have a different response structure
 *
 * They have a `total_count` key in the response (search also has `incomplete_results`,
 * /installation/repositories also has `repository_selection`), as well as a key with
 * the list of the items which name varies from endpoint to endpoint.
 *
 * Octokit normalizes these responses so that paginated results are always returned following
 * the same structure. One challenge is that if the list response has only one page, no Link
 * header is provided, so this header alone is not sufficient to check wether a response is
 * paginated or not.
 *
 * We check if a "total_count" key is present in the response data, but also make sure that
 * a "url" property is not, as the "Get the combined status for a specific ref" endpoint would
 * otherwise match: https://developer.github.com/v3/repos/statuses/#get-the-combined-status-for-a-specific-ref
 */
function normalizePaginatedListResponse(response) {
  // endpoints can respond with 204 if repository is empty
  if (!response.data) {
    return _objectSpread2(_objectSpread2({}, response), {}, {
      data: []
    });
  }

  const responseNeedsNormalization = "total_count" in response.data && !("url" in response.data);
  if (!responseNeedsNormalization) return response; // keep the additional properties intact as there is currently no other way
  // to retrieve the same information.

  const incompleteResults = response.data.incomplete_results;
  const repositorySelection = response.data.repository_selection;
  const totalCount = response.data.total_count;
  delete response.data.incomplete_results;
  delete response.data.repository_selection;
  delete response.data.total_count;
  const namespaceKey = Object.keys(response.data)[0];
  const data = response.data[namespaceKey];
  response.data = data;

  if (typeof incompleteResults !== "undefined") {
    response.data.incomplete_results = incompleteResults;
  }

  if (typeof repositorySelection !== "undefined") {
    response.data.repository_selection = repositorySelection;
  }

  response.data.total_count = totalCount;
  return response;
}

function iterator(octokit, route, parameters) {
  const options = typeof route === "function" ? route.endpoint(parameters) : octokit.request.endpoint(route, parameters);
  const requestMethod = typeof route === "function" ? route : octokit.request;
  const method = options.method;
  const headers = options.headers;
  let url = options.url;
  return {
    [Symbol.asyncIterator]: () => ({
      async next() {
        if (!url) return {
          done: true
        };

        try {
          const response = await requestMethod({
            method,
            url,
            headers
          });
          const normalizedResponse = normalizePaginatedListResponse(response); // `response.headers.link` format:
          // '<https://api.github.com/users/aseemk/followers?page=2>; rel="next", <https://api.github.com/users/aseemk/followers?page=2>; rel="last"'
          // sets `url` to undefined if "next" URL is not present or `link` header is not set

          url = ((normalizedResponse.headers.link || "").match(/<([^>]+)>;\s*rel="next"/) || [])[1];
          return {
            value: normalizedResponse
          };
        } catch (error) {
          if (error.status !== 409) throw error;
          url = "";
          return {
            value: {
              status: 200,
              headers: {},
              data: []
            }
          };
        }
      }

    })
  };
}

function paginate(octokit, route, parameters, mapFn) {
  if (typeof parameters === "function") {
    mapFn = parameters;
    parameters = undefined;
  }

  return gather(octokit, [], iterator(octokit, route, parameters)[Symbol.asyncIterator](), mapFn);
}

function gather(octokit, results, iterator, mapFn) {
  return iterator.next().then(result => {
    if (result.done) {
      return results;
    }

    let earlyExit = false;

    function done() {
      earlyExit = true;
    }

    results = results.concat(mapFn ? mapFn(result.value, done) : result.value.data);

    if (earlyExit) {
      return results;
    }

    return gather(octokit, results, iterator, mapFn);
  });
}

const composePaginateRest = Object.assign(paginate, {
  iterator
});

const paginatingEndpoints = ["GET /app/hook/deliveries", "GET /app/installations", "GET /applications/grants", "GET /authorizations", "GET /enterprises/{enterprise}/actions/permissions/organizations", "GET /enterprises/{enterprise}/actions/runner-groups", "GET /enterprises/{enterprise}/actions/runner-groups/{runner_group_id}/organizations", "GET /enterprises/{enterprise}/actions/runner-groups/{runner_group_id}/runners", "GET /enterprises/{enterprise}/actions/runners", "GET /enterprises/{enterprise}/actions/runners/downloads", "GET /events", "GET /gists", "GET /gists/public", "GET /gists/starred", "GET /gists/{gist_id}/comments", "GET /gists/{gist_id}/commits", "GET /gists/{gist_id}/forks", "GET /installation/repositories", "GET /issues", "GET /marketplace_listing/plans", "GET /marketplace_listing/plans/{plan_id}/accounts", "GET /marketplace_listing/stubbed/plans", "GET /marketplace_listing/stubbed/plans/{plan_id}/accounts", "GET /networks/{owner}/{repo}/events", "GET /notifications", "GET /organizations", "GET /orgs/{org}/actions/permissions/repositories", "GET /orgs/{org}/actions/runner-groups", "GET /orgs/{org}/actions/runner-groups/{runner_group_id}/repositories", "GET /orgs/{org}/actions/runner-groups/{runner_group_id}/runners", "GET /orgs/{org}/actions/runners", "GET /orgs/{org}/actions/runners/downloads", "GET /orgs/{org}/actions/secrets", "GET /orgs/{org}/actions/secrets/{secret_name}/repositories", "GET /orgs/{org}/blocks", "GET /orgs/{org}/credential-authorizations", "GET /orgs/{org}/events", "GET /orgs/{org}/failed_invitations", "GET /orgs/{org}/hooks", "GET /orgs/{org}/hooks/{hook_id}/deliveries", "GET /orgs/{org}/installations", "GET /orgs/{org}/invitations", "GET /orgs/{org}/invitations/{invitation_id}/teams", "GET /orgs/{org}/issues", "GET /orgs/{org}/members", "GET /orgs/{org}/migrations", "GET /orgs/{org}/migrations/{migration_id}/repositories", "GET /orgs/{org}/outside_collaborators", "GET /orgs/{org}/projects", "GET /orgs/{org}/public_members", "GET /orgs/{org}/repos", "GET /orgs/{org}/team-sync/groups", "GET /orgs/{org}/teams", "GET /orgs/{org}/teams/{team_slug}/discussions", "GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments", "GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}/reactions", "GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/reactions", "GET /orgs/{org}/teams/{team_slug}/invitations", "GET /orgs/{org}/teams/{team_slug}/members", "GET /orgs/{org}/teams/{team_slug}/projects", "GET /orgs/{org}/teams/{team_slug}/repos", "GET /orgs/{org}/teams/{team_slug}/team-sync/group-mappings", "GET /orgs/{org}/teams/{team_slug}/teams", "GET /projects/columns/{column_id}/cards", "GET /projects/{project_id}/collaborators", "GET /projects/{project_id}/columns", "GET /repos/{owner}/{repo}/actions/artifacts", "GET /repos/{owner}/{repo}/actions/runners", "GET /repos/{owner}/{repo}/actions/runners/downloads", "GET /repos/{owner}/{repo}/actions/runs", "GET /repos/{owner}/{repo}/actions/runs/{run_id}/artifacts", "GET /repos/{owner}/{repo}/actions/runs/{run_id}/jobs", "GET /repos/{owner}/{repo}/actions/secrets", "GET /repos/{owner}/{repo}/actions/workflows", "GET /repos/{owner}/{repo}/actions/workflows/{workflow_id}/runs", "GET /repos/{owner}/{repo}/assignees", "GET /repos/{owner}/{repo}/branches", "GET /repos/{owner}/{repo}/check-runs/{check_run_id}/annotations", "GET /repos/{owner}/{repo}/check-suites/{check_suite_id}/check-runs", "GET /repos/{owner}/{repo}/code-scanning/alerts", "GET /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}/instances", "GET /repos/{owner}/{repo}/code-scanning/analyses", "GET /repos/{owner}/{repo}/collaborators", "GET /repos/{owner}/{repo}/comments", "GET /repos/{owner}/{repo}/comments/{comment_id}/reactions", "GET /repos/{owner}/{repo}/commits", "GET /repos/{owner}/{repo}/commits/{commit_sha}/branches-where-head", "GET /repos/{owner}/{repo}/commits/{commit_sha}/comments", "GET /repos/{owner}/{repo}/commits/{commit_sha}/pulls", "GET /repos/{owner}/{repo}/commits/{ref}/check-runs", "GET /repos/{owner}/{repo}/commits/{ref}/check-suites", "GET /repos/{owner}/{repo}/commits/{ref}/statuses", "GET /repos/{owner}/{repo}/contributors", "GET /repos/{owner}/{repo}/deployments", "GET /repos/{owner}/{repo}/deployments/{deployment_id}/statuses", "GET /repos/{owner}/{repo}/events", "GET /repos/{owner}/{repo}/forks", "GET /repos/{owner}/{repo}/git/matching-refs/{ref}", "GET /repos/{owner}/{repo}/hooks", "GET /repos/{owner}/{repo}/hooks/{hook_id}/deliveries", "GET /repos/{owner}/{repo}/invitations", "GET /repos/{owner}/{repo}/issues", "GET /repos/{owner}/{repo}/issues/comments", "GET /repos/{owner}/{repo}/issues/comments/{comment_id}/reactions", "GET /repos/{owner}/{repo}/issues/events", "GET /repos/{owner}/{repo}/issues/{issue_number}/comments", "GET /repos/{owner}/{repo}/issues/{issue_number}/events", "GET /repos/{owner}/{repo}/issues/{issue_number}/labels", "GET /repos/{owner}/{repo}/issues/{issue_number}/reactions", "GET /repos/{owner}/{repo}/issues/{issue_number}/timeline", "GET /repos/{owner}/{repo}/keys", "GET /repos/{owner}/{repo}/labels", "GET /repos/{owner}/{repo}/milestones", "GET /repos/{owner}/{repo}/milestones/{milestone_number}/labels", "GET /repos/{owner}/{repo}/notifications", "GET /repos/{owner}/{repo}/pages/builds", "GET /repos/{owner}/{repo}/projects", "GET /repos/{owner}/{repo}/pulls", "GET /repos/{owner}/{repo}/pulls/comments", "GET /repos/{owner}/{repo}/pulls/comments/{comment_id}/reactions", "GET /repos/{owner}/{repo}/pulls/{pull_number}/comments", "GET /repos/{owner}/{repo}/pulls/{pull_number}/commits", "GET /repos/{owner}/{repo}/pulls/{pull_number}/files", "GET /repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers", "GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews", "GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}/comments", "GET /repos/{owner}/{repo}/releases", "GET /repos/{owner}/{repo}/releases/{release_id}/assets", "GET /repos/{owner}/{repo}/secret-scanning/alerts", "GET /repos/{owner}/{repo}/stargazers", "GET /repos/{owner}/{repo}/subscribers", "GET /repos/{owner}/{repo}/tags", "GET /repos/{owner}/{repo}/teams", "GET /repositories", "GET /repositories/{repository_id}/environments/{environment_name}/secrets", "GET /scim/v2/enterprises/{enterprise}/Groups", "GET /scim/v2/enterprises/{enterprise}/Users", "GET /scim/v2/organizations/{org}/Users", "GET /search/code", "GET /search/commits", "GET /search/issues", "GET /search/labels", "GET /search/repositories", "GET /search/topics", "GET /search/users", "GET /teams/{team_id}/discussions", "GET /teams/{team_id}/discussions/{discussion_number}/comments", "GET /teams/{team_id}/discussions/{discussion_number}/comments/{comment_number}/reactions", "GET /teams/{team_id}/discussions/{discussion_number}/reactions", "GET /teams/{team_id}/invitations", "GET /teams/{team_id}/members", "GET /teams/{team_id}/projects", "GET /teams/{team_id}/repos", "GET /teams/{team_id}/team-sync/group-mappings", "GET /teams/{team_id}/teams", "GET /user/blocks", "GET /user/emails", "GET /user/followers", "GET /user/following", "GET /user/gpg_keys", "GET /user/installations", "GET /user/installations/{installation_id}/repositories", "GET /user/issues", "GET /user/keys", "GET /user/marketplace_purchases", "GET /user/marketplace_purchases/stubbed", "GET /user/memberships/orgs", "GET /user/migrations", "GET /user/migrations/{migration_id}/repositories", "GET /user/orgs", "GET /user/public_emails", "GET /user/repos", "GET /user/repository_invitations", "GET /user/starred", "GET /user/subscriptions", "GET /user/teams", "GET /users", "GET /users/{username}/events", "GET /users/{username}/events/orgs/{org}", "GET /users/{username}/events/public", "GET /users/{username}/followers", "GET /users/{username}/following", "GET /users/{username}/gists", "GET /users/{username}/gpg_keys", "GET /users/{username}/keys", "GET /users/{username}/orgs", "GET /users/{username}/projects", "GET /users/{username}/received_events", "GET /users/{username}/received_events/public", "GET /users/{username}/repos", "GET /users/{username}/starred", "GET /users/{username}/subscriptions"];

function isPaginatingEndpoint(arg) {
  if (typeof arg === "string") {
    return paginatingEndpoints.includes(arg);
  } else {
    return false;
  }
}

/**
 * @param octokit Octokit instance
 * @param options Options passed to Octokit constructor
 */

function paginateRest(octokit) {
  return {
    paginate: Object.assign(paginate.bind(null, octokit), {
      iterator: iterator.bind(null, octokit)
    })
  };
}
paginateRest.VERSION = VERSION;

exports.composePaginateRest = composePaginateRest;
exports.isPaginatingEndpoint = isPaginatingEndpoint;
exports.paginateRest = paginateRest;
exports.paginatingEndpoints = paginatingEndpoints;
//# sourceMappingURL=index.js.map


/***/ }),

/***/ 325:
/***/ (function(__unusedmodule, __unusedexports, __webpack_require__) {

"use strict";

const core = __webpack_require__(470);
const github = __webpack_require__(469);
const { PDFNet } = __webpack_require__(551);
try {
    // `who-to-greet` input defined in action metadata file
    const nameToGreet = core.getInput('who-to-greet');
    console.log(`Hello ${nameToGreet}!`);
    const time = (new Date()).toTimeString();
    core.setOutput("time", time);
    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2);
    console.log(`The event payload: ${payload}`);
}
catch (error) {
    core.setFailed(error.message);
}
PDFNet.addResourceSearchPath("./Lib");


/***/ }),

/***/ 356:
/***/ (function(__unusedmodule, exports) {

"use strict";


Object.defineProperty(exports, '__esModule', { value: true });

/*!
 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

function isObject(o) {
  return Object.prototype.toString.call(o) === '[object Object]';
}

function isPlainObject(o) {
  var ctor,prot;

  if (isObject(o) === false) return false;

  // If has modified constructor
  ctor = o.constructor;
  if (ctor === undefined) return true;

  // If has modified prototype
  prot = ctor.prototype;
  if (isObject(prot) === false) return false;

  // If constructor does not have an Object-specific method
  if (prot.hasOwnProperty('isPrototypeOf') === false) {
    return false;
  }

  // Most likely a plain Object
  return true;
}

exports.isPlainObject = isPlainObject;


/***/ }),

/***/ 357:
/***/ (function(module) {

module.exports = require("assert");

/***/ }),

/***/ 385:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', { value: true });

var isPlainObject = __webpack_require__(356);
var universalUserAgent = __webpack_require__(796);

function lowercaseKeys(object) {
  if (!object) {
    return {};
  }

  return Object.keys(object).reduce((newObj, key) => {
    newObj[key.toLowerCase()] = object[key];
    return newObj;
  }, {});
}

function mergeDeep(defaults, options) {
  const result = Object.assign({}, defaults);
  Object.keys(options).forEach(key => {
    if (isPlainObject.isPlainObject(options[key])) {
      if (!(key in defaults)) Object.assign(result, {
        [key]: options[key]
      });else result[key] = mergeDeep(defaults[key], options[key]);
    } else {
      Object.assign(result, {
        [key]: options[key]
      });
    }
  });
  return result;
}

function removeUndefinedProperties(obj) {
  for (const key in obj) {
    if (obj[key] === undefined) {
      delete obj[key];
    }
  }

  return obj;
}

function merge(defaults, route, options) {
  if (typeof route === "string") {
    let [method, url] = route.split(" ");
    options = Object.assign(url ? {
      method,
      url
    } : {
      url: method
    }, options);
  } else {
    options = Object.assign({}, route);
  } // lowercase header names before merging with defaults to avoid duplicates


  options.headers = lowercaseKeys(options.headers); // remove properties with undefined values before merging

  removeUndefinedProperties(options);
  removeUndefinedProperties(options.headers);
  const mergedOptions = mergeDeep(defaults || {}, options); // mediaType.previews arrays are merged, instead of overwritten

  if (defaults && defaults.mediaType.previews.length) {
    mergedOptions.mediaType.previews = defaults.mediaType.previews.filter(preview => !mergedOptions.mediaType.previews.includes(preview)).concat(mergedOptions.mediaType.previews);
  }

  mergedOptions.mediaType.previews = mergedOptions.mediaType.previews.map(preview => preview.replace(/-preview/, ""));
  return mergedOptions;
}

function addQueryParameters(url, parameters) {
  const separator = /\?/.test(url) ? "&" : "?";
  const names = Object.keys(parameters);

  if (names.length === 0) {
    return url;
  }

  return url + separator + names.map(name => {
    if (name === "q") {
      return "q=" + parameters.q.split("+").map(encodeURIComponent).join("+");
    }

    return `${name}=${encodeURIComponent(parameters[name])}`;
  }).join("&");
}

const urlVariableRegex = /\{[^}]+\}/g;

function removeNonChars(variableName) {
  return variableName.replace(/^\W+|\W+$/g, "").split(/,/);
}

function extractUrlVariableNames(url) {
  const matches = url.match(urlVariableRegex);

  if (!matches) {
    return [];
  }

  return matches.map(removeNonChars).reduce((a, b) => a.concat(b), []);
}

function omit(object, keysToOmit) {
  return Object.keys(object).filter(option => !keysToOmit.includes(option)).reduce((obj, key) => {
    obj[key] = object[key];
    return obj;
  }, {});
}

// Based on https://github.com/bramstein/url-template, licensed under BSD
// TODO: create separate package.
//
// Copyright (c) 2012-2014, Bram Stein
// All rights reserved.
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions
// are met:
//  1. Redistributions of source code must retain the above copyright
//     notice, this list of conditions and the following disclaimer.
//  2. Redistributions in binary form must reproduce the above copyright
//     notice, this list of conditions and the following disclaimer in the
//     documentation and/or other materials provided with the distribution.
//  3. The name of the author may not be used to endorse or promote products
//     derived from this software without specific prior written permission.
// THIS SOFTWARE IS PROVIDED BY THE AUTHOR "AS IS" AND ANY EXPRESS OR IMPLIED
// WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO
// EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
// INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
// BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
// DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
// OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
// NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
// EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

/* istanbul ignore file */
function encodeReserved(str) {
  return str.split(/(%[0-9A-Fa-f]{2})/g).map(function (part) {
    if (!/%[0-9A-Fa-f]/.test(part)) {
      part = encodeURI(part).replace(/%5B/g, "[").replace(/%5D/g, "]");
    }

    return part;
  }).join("");
}

function encodeUnreserved(str) {
  return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
    return "%" + c.charCodeAt(0).toString(16).toUpperCase();
  });
}

function encodeValue(operator, value, key) {
  value = operator === "+" || operator === "#" ? encodeReserved(value) : encodeUnreserved(value);

  if (key) {
    return encodeUnreserved(key) + "=" + value;
  } else {
    return value;
  }
}

function isDefined(value) {
  return value !== undefined && value !== null;
}

function isKeyOperator(operator) {
  return operator === ";" || operator === "&" || operator === "?";
}

function getValues(context, operator, key, modifier) {
  var value = context[key],
      result = [];

  if (isDefined(value) && value !== "") {
    if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
      value = value.toString();

      if (modifier && modifier !== "*") {
        value = value.substring(0, parseInt(modifier, 10));
      }

      result.push(encodeValue(operator, value, isKeyOperator(operator) ? key : ""));
    } else {
      if (modifier === "*") {
        if (Array.isArray(value)) {
          value.filter(isDefined).forEach(function (value) {
            result.push(encodeValue(operator, value, isKeyOperator(operator) ? key : ""));
          });
        } else {
          Object.keys(value).forEach(function (k) {
            if (isDefined(value[k])) {
              result.push(encodeValue(operator, value[k], k));
            }
          });
        }
      } else {
        const tmp = [];

        if (Array.isArray(value)) {
          value.filter(isDefined).forEach(function (value) {
            tmp.push(encodeValue(operator, value));
          });
        } else {
          Object.keys(value).forEach(function (k) {
            if (isDefined(value[k])) {
              tmp.push(encodeUnreserved(k));
              tmp.push(encodeValue(operator, value[k].toString()));
            }
          });
        }

        if (isKeyOperator(operator)) {
          result.push(encodeUnreserved(key) + "=" + tmp.join(","));
        } else if (tmp.length !== 0) {
          result.push(tmp.join(","));
        }
      }
    }
  } else {
    if (operator === ";") {
      if (isDefined(value)) {
        result.push(encodeUnreserved(key));
      }
    } else if (value === "" && (operator === "&" || operator === "?")) {
      result.push(encodeUnreserved(key) + "=");
    } else if (value === "") {
      result.push("");
    }
  }

  return result;
}

function parseUrl(template) {
  return {
    expand: expand.bind(null, template)
  };
}

function expand(template, context) {
  var operators = ["+", "#", ".", "/", ";", "?", "&"];
  return template.replace(/\{([^\{\}]+)\}|([^\{\}]+)/g, function (_, expression, literal) {
    if (expression) {
      let operator = "";
      const values = [];

      if (operators.indexOf(expression.charAt(0)) !== -1) {
        operator = expression.charAt(0);
        expression = expression.substr(1);
      }

      expression.split(/,/g).forEach(function (variable) {
        var tmp = /([^:\*]*)(?::(\d+)|(\*))?/.exec(variable);
        values.push(getValues(context, operator, tmp[1], tmp[2] || tmp[3]));
      });

      if (operator && operator !== "+") {
        var separator = ",";

        if (operator === "?") {
          separator = "&";
        } else if (operator !== "#") {
          separator = operator;
        }

        return (values.length !== 0 ? operator : "") + values.join(separator);
      } else {
        return values.join(",");
      }
    } else {
      return encodeReserved(literal);
    }
  });
}

function parse(options) {
  // https://fetch.spec.whatwg.org/#methods
  let method = options.method.toUpperCase(); // replace :varname with {varname} to make it RFC 6570 compatible

  let url = (options.url || "/").replace(/:([a-z]\w+)/g, "{$1}");
  let headers = Object.assign({}, options.headers);
  let body;
  let parameters = omit(options, ["method", "baseUrl", "url", "headers", "request", "mediaType"]); // extract variable names from URL to calculate remaining variables later

  const urlVariableNames = extractUrlVariableNames(url);
  url = parseUrl(url).expand(parameters);

  if (!/^http/.test(url)) {
    url = options.baseUrl + url;
  }

  const omittedParameters = Object.keys(options).filter(option => urlVariableNames.includes(option)).concat("baseUrl");
  const remainingParameters = omit(parameters, omittedParameters);
  const isBinaryRequest = /application\/octet-stream/i.test(headers.accept);

  if (!isBinaryRequest) {
    if (options.mediaType.format) {
      // e.g. application/vnd.github.v3+json => application/vnd.github.v3.raw
      headers.accept = headers.accept.split(/,/).map(preview => preview.replace(/application\/vnd(\.\w+)(\.v3)?(\.\w+)?(\+json)?$/, `application/vnd$1$2.${options.mediaType.format}`)).join(",");
    }

    if (options.mediaType.previews.length) {
      const previewsFromAcceptHeader = headers.accept.match(/[\w-]+(?=-preview)/g) || [];
      headers.accept = previewsFromAcceptHeader.concat(options.mediaType.previews).map(preview => {
        const format = options.mediaType.format ? `.${options.mediaType.format}` : "+json";
        return `application/vnd.github.${preview}-preview${format}`;
      }).join(",");
    }
  } // for GET/HEAD requests, set URL query parameters from remaining parameters
  // for PATCH/POST/PUT/DELETE requests, set request body from remaining parameters


  if (["GET", "HEAD"].includes(method)) {
    url = addQueryParameters(url, remainingParameters);
  } else {
    if ("data" in remainingParameters) {
      body = remainingParameters.data;
    } else {
      if (Object.keys(remainingParameters).length) {
        body = remainingParameters;
      } else {
        headers["content-length"] = 0;
      }
    }
  } // default content-type for JSON if body is set


  if (!headers["content-type"] && typeof body !== "undefined") {
    headers["content-type"] = "application/json; charset=utf-8";
  } // GitHub expects 'content-length: 0' header for PUT/PATCH requests without body.
  // fetch does not allow to set `content-length` header, but we can set body to an empty string


  if (["PATCH", "PUT"].includes(method) && typeof body === "undefined") {
    body = "";
  } // Only return body/request keys if present


  return Object.assign({
    method,
    url,
    headers
  }, typeof body !== "undefined" ? {
    body
  } : null, options.request ? {
    request: options.request
  } : null);
}

function endpointWithDefaults(defaults, route, options) {
  return parse(merge(defaults, route, options));
}

function withDefaults(oldDefaults, newDefaults) {
  const DEFAULTS = merge(oldDefaults, newDefaults);
  const endpoint = endpointWithDefaults.bind(null, DEFAULTS);
  return Object.assign(endpoint, {
    DEFAULTS,
    defaults: withDefaults.bind(null, DEFAULTS),
    merge: merge.bind(null, DEFAULTS),
    parse
  });
}

const VERSION = "6.0.12";

const userAgent = `octokit-endpoint.js/${VERSION} ${universalUserAgent.getUserAgent()}`; // DEFAULTS has all properties set that EndpointOptions has, except url.
// So we use RequestParameters and add method as additional required property.

const DEFAULTS = {
  method: "GET",
  baseUrl: "https://api.github.com",
  headers: {
    accept: "application/vnd.github.v3+json",
    "user-agent": userAgent
  },
  mediaType: {
    format: "",
    previews: []
  }
};

const endpoint = withDefaults(null, DEFAULTS);

exports.endpoint = endpoint;
//# sourceMappingURL=index.js.map


/***/ }),

/***/ 405:
/***/ (function(module, __unusedexports, __webpack_require__) {

// Generated by CoffeeScript 2.4.1
(function() {
  // This file's name is set up in such a way that it will always show up first in
  // the list of files given to coffee --join, so that the other files can assume
  // that XMLHttpRequestEventTarget was already defined.

  // The DOM EventTarget subclass used by XMLHttpRequest.

  // @see http://xhr.spec.whatwg.org/#interface-xmlhttprequest
  var InvalidStateError, NetworkError, ProgressEvent, SecurityError, SyntaxError, XMLHttpRequest, XMLHttpRequestEventTarget, XMLHttpRequestUpload, http, https, os, url;

  XMLHttpRequestEventTarget = (function() {
    class XMLHttpRequestEventTarget {
      // @private
      // This is an abstract class and should not be instantiated directly.
      constructor() {
        this.onloadstart = null;
        this.onprogress = null;
        this.onabort = null;
        this.onerror = null;
        this.onload = null;
        this.ontimeout = null;
        this.onloadend = null;
        this._listeners = {};
      }

      // Adds a new-style listener for one of the XHR events.

      // @see http://www.w3.org/TR/XMLHttpRequest/#events

      // @param {String} eventType an XHR event type, such as 'readystatechange'
      // @param {function(ProgressEvent)} listener function that will be called when
      //   the event fires
      // @return {undefined} undefined
      addEventListener(eventType, listener) {
        var base;
        eventType = eventType.toLowerCase();
        (base = this._listeners)[eventType] || (base[eventType] = []);
        this._listeners[eventType].push(listener);
        return void 0;
      }

      // Removes an event listener added by calling addEventListener.

      // @param {String} eventType an XHR event type, such as 'readystatechange'
      // @param {function(ProgressEvent)} listener the value passed in a previous
      //   call to addEventListener.
      // @return {undefined} undefined
      removeEventListener(eventType, listener) {
        var index;
        eventType = eventType.toLowerCase();
        if (this._listeners[eventType]) {
          index = this._listeners[eventType].indexOf(listener);
          if (index !== -1) {
            this._listeners[eventType].splice(index, 1);
          }
        }
        return void 0;
      }

      // Calls all the listeners for an event.

      // @param {ProgressEvent} event the event to be dispatched
      // @return {undefined} undefined
      dispatchEvent(event) {
        var eventType, j, len, listener, listeners;
        event.currentTarget = event.target = this;
        eventType = event.type;
        if (listeners = this._listeners[eventType]) {
          for (j = 0, len = listeners.length; j < len; j++) {
            listener = listeners[j];
            listener.call(this, event);
          }
        }
        if (listener = this[`on${eventType}`]) {
          listener.call(this, event);
        }
        return void 0;
      }

    };

    // @property {function(ProgressEvent)} DOM level 0-style handler
    //   for the 'loadstart' event
    XMLHttpRequestEventTarget.prototype.onloadstart = null;

    // @property {function(ProgressEvent)} DOM level 0-style handler
    //   for the 'progress' event
    XMLHttpRequestEventTarget.prototype.onprogress = null;

    // @property {function(ProgressEvent)} DOM level 0-style handler
    //   for the 'abort' event
    XMLHttpRequestEventTarget.prototype.onabort = null;

    // @property {function(ProgressEvent)} DOM level 0-style handler
    //   for the 'error' event
    XMLHttpRequestEventTarget.prototype.onerror = null;

    // @property {function(ProgressEvent)} DOM level 0-style handler
    //   for the 'load' event
    XMLHttpRequestEventTarget.prototype.onload = null;

    // @property {function(ProgressEvent)} DOM level 0-style handler
    //   for the 'timeout' event
    XMLHttpRequestEventTarget.prototype.ontimeout = null;

    // @property {function(ProgressEvent)} DOM level 0-style handler
    //   for the 'loadend' event
    XMLHttpRequestEventTarget.prototype.onloadend = null;

    return XMLHttpRequestEventTarget;

  }).call(this);

  // This file's name is set up in such a way that it will always show up second
  // in the list of files given to coffee --join, so it can use the
  // XMLHttpRequestEventTarget definition and so that the other files can assume
  // that XMLHttpRequest was already defined.
  http = __webpack_require__(605);

  https = __webpack_require__(211);

  os = __webpack_require__(87);

  url = __webpack_require__(835);

  XMLHttpRequest = (function() {
    // The ECMAScript HTTP API.

    // @see http://www.w3.org/TR/XMLHttpRequest/#introduction
    class XMLHttpRequest extends XMLHttpRequestEventTarget {
      // Creates a new request.

      // @param {Object} options one or more of the options below
      // @option options {Boolean} anon if true, the request's anonymous flag
      //   will be set
      // @see http://www.w3.org/TR/XMLHttpRequest/#constructors
      // @see http://www.w3.org/TR/XMLHttpRequest/#anonymous-flag
      constructor(options) {
        super();
        this.onreadystatechange = null;
        this._anonymous = options && options.anon;
        this.readyState = XMLHttpRequest.UNSENT;
        this.response = null;
        this.responseText = '';
        this.responseType = '';
        this.responseURL = '';
        this.status = 0;
        this.statusText = '';
        this.timeout = 0;
        this.upload = new XMLHttpRequestUpload(this);
        this._method = null; // String
        this._url = null; // Return value of url.parse()
        this._sync = false;
        this._headers = null; // Object<String, String>
        this._loweredHeaders = null; // Object<lowercase String, String>
        this._mimeOverride = null;
        this._request = null; // http.ClientRequest
        this._response = null; // http.ClientResponse
        this._responseParts = null; // Array<Buffer, String>
        this._responseHeaders = null; // Object<lowercase String, String>
        this._aborting = null;
        this._error = null;
        this._loadedBytes = 0;
        this._totalBytes = 0;
        this._lengthComputable = false;
      }

      // Sets the XHR's method, URL, synchronous flag, and authentication params.

      // @param {String} method the HTTP method to be used
      // @param {String} url the URL that the request will be made to
      // @param {?Boolean} async if false, the XHR should be processed
      //   synchronously; true by default
      // @param {?String} user the user credential to be used in HTTP basic
      //   authentication
      // @param {?String} password the password credential to be used in HTTP basic
      //   authentication
      // @return {undefined} undefined
      // @throw {SecurityError} method is not one of the allowed methods
      // @throw {SyntaxError} urlString is not a valid URL
      // @throw {Error} the URL contains an unsupported protocol; the supported
      //   protocols are file, http and https
      // @see http://www.w3.org/TR/XMLHttpRequest/#the-open()-method
      open(method, url, async, user, password) {
        var xhrUrl;
        method = method.toUpperCase();
        if (method in this._restrictedMethods) {
          throw new SecurityError(`HTTP method ${method} is not allowed in XHR`);
        }
        xhrUrl = this._parseUrl(url);
        if (async === void 0) {
          async = true;
        }
        switch (this.readyState) {
          case XMLHttpRequest.UNSENT:
          case XMLHttpRequest.OPENED:
          case XMLHttpRequest.DONE:
            // Nothing to do here.
            null;
            break;
          case XMLHttpRequest.HEADERS_RECEIVED:
          case XMLHttpRequest.LOADING:
            // TODO(pwnall): terminate abort(), terminate send()
            null;
        }
        this._method = method;
        this._url = xhrUrl;
        this._sync = !async;
        this._headers = {};
        this._loweredHeaders = {};
        this._mimeOverride = null;
        this._setReadyState(XMLHttpRequest.OPENED);
        this._request = null;
        this._response = null;
        this.status = 0;
        this.statusText = '';
        this._responseParts = [];
        this._responseHeaders = null;
        this._loadedBytes = 0;
        this._totalBytes = 0;
        this._lengthComputable = false;
        return void 0;
      }

      // Appends a header to the list of author request headers.

      // @param {String} name the HTTP header name
      // @param {String} value the HTTP header value
      // @return {undefined} undefined
      // @throw {InvalidStateError} readyState is not OPENED
      // @throw {SyntaxError} name is not a valid HTTP header name or value is not
      //   a valid HTTP header value
      // @see http://www.w3.org/TR/XMLHttpRequest/#the-setrequestheader()-method
      setRequestHeader(name, value) {
        var loweredName;
        if (this.readyState !== XMLHttpRequest.OPENED) {
          throw new InvalidStateError("XHR readyState must be OPENED");
        }
        loweredName = name.toLowerCase();
        if (this._restrictedHeaders[loweredName] || /^sec\-/.test(loweredName) || /^proxy-/.test(loweredName)) {
          console.warn(`Refused to set unsafe header "${name}"`);
          return void 0;
        }
        value = value.toString();
        if (loweredName in this._loweredHeaders) {
          // Combine value with the existing header value.
          name = this._loweredHeaders[loweredName];
          this._headers[name] = this._headers[name] + ', ' + value;
        } else {
          // New header.
          this._loweredHeaders[loweredName] = name;
          this._headers[name] = value;
        }
        return void 0;
      }

      // Initiates the request.

      // @param {?String, ?ArrayBufferView} data the data to be sent; ignored for
      //   GET and HEAD requests
      // @return {undefined} undefined
      // @throw {InvalidStateError} readyState is not OPENED
      // @see http://www.w3.org/TR/XMLHttpRequest/#the-send()-method
      send(data) {
        if (this.readyState !== XMLHttpRequest.OPENED) {
          throw new InvalidStateError("XHR readyState must be OPENED");
        }
        if (this._request) {
          throw new InvalidStateError("send() already called");
        }
        switch (this._url.protocol) {
          case 'file:':
            this._sendFile(data);
            break;
          case 'http:':
          case 'https:':
            this._sendHttp(data);
            break;
          default:
            throw new NetworkError(`Unsupported protocol ${this._url.protocol}`);
        }
        return void 0;
      }

      // Cancels the network activity performed by this request.

      // @return {undefined} undefined
      // @see http://www.w3.org/TR/XMLHttpRequest/#the-abort()-method
      abort() {
        if (!this._request) {
          return;
        }
        this._request.abort();
        this._setError();
        this._dispatchProgress('abort');
        this._dispatchProgress('loadend');
        return void 0;
      }

      // Returns a header value in the HTTP response for this XHR.

      // @param {String} name case-insensitive HTTP header name
      // @return {?String} value the value of the header whose name matches the
      //   given name, or null if there is no such header
      // @see http://www.w3.org/TR/XMLHttpRequest/#the-getresponseheader()-method
      getResponseHeader(name) {
        var loweredName;
        if (!this._responseHeaders) {
          return null;
        }
        loweredName = name.toLowerCase();
        if (loweredName in this._responseHeaders) {
          return this._responseHeaders[loweredName];
        } else {
          return null;
        }
      }

      // Returns all the HTTP headers in this XHR's response.

      // @return {String} header lines separated by CR LF, where each header line
      //   has the name and value separated by a ": " (colon, space); the empty
      //   string is returned if the headers are not available
      // @see http://www.w3.org/TR/XMLHttpRequest/#the-getallresponseheaders()-method
      getAllResponseHeaders() {
        var lines, name, value;
        if (!this._responseHeaders) {
          return '';
        }
        lines = (function() {
          var ref, results;
          ref = this._responseHeaders;
          results = [];
          for (name in ref) {
            value = ref[name];
            results.push(`${name}: ${value}`);
          }
          return results;
        }).call(this);
        return lines.join("\r\n");
      }

      // Overrides the Content-Type

      // @return {undefined} undefined
      // @see http://www.w3.org/TR/XMLHttpRequest/#the-overridemimetype()-method
      overrideMimeType(newMimeType) {
        if (this.readyState === XMLHttpRequest.LOADING || this.readyState === XMLHttpRequest.DONE) {
          throw new InvalidStateError("overrideMimeType() not allowed in LOADING or DONE");
        }
        this._mimeOverride = newMimeType.toLowerCase();
        return void 0;
      }

      // Network configuration not exposed in the XHR API.

      // Although the XMLHttpRequest specification calls itself "ECMAScript HTTP",
      // it assumes that requests are always performed in the context of a browser
      // application, where some network parameters are set by the browser user and
      // should not be modified by Web applications. This API provides access to
      // these network parameters.

      // NOTE: this is not in the XMLHttpRequest API, and will not work in
      // browsers.  It is a stable node-xhr2 API.

      // @param {Object} options one or more of the options below
      // @option options {?http.Agent} httpAgent the value for the nodejsHttpAgent
      //   property (the agent used for HTTP requests)
      // @option options {?https.Agent} httpsAgent the value for the
      //   nodejsHttpsAgent property (the agent used for HTTPS requests)
      // @return {undefined} undefined
      nodejsSet(options) {
        var baseUrl, parsedUrl;
        if ('httpAgent' in options) {
          this.nodejsHttpAgent = options.httpAgent;
        }
        if ('httpsAgent' in options) {
          this.nodejsHttpsAgent = options.httpsAgent;
        }
        if ('baseUrl' in options) {
          baseUrl = options.baseUrl;
          if (baseUrl !== null) {
            parsedUrl = url.parse(baseUrl, false, true);
            if (!parsedUrl.protocol) {
              throw new SyntaxError("baseUrl must be an absolute URL");
            }
          }
          this.nodejsBaseUrl = baseUrl;
        }
        return void 0;
      }

      // Default settings for the network configuration not exposed in the XHR API.

      // NOTE: this is not in the XMLHttpRequest API, and will not work in
      // browsers.  It is a stable node-xhr2 API.

      // @param {Object} options one or more of the options below
      // @option options {?http.Agent} httpAgent the default value for the
      //   nodejsHttpAgent property (the agent used for HTTP requests)
      // @option options {https.Agent} httpsAgent the default value for the
      //   nodejsHttpsAgent property (the agent used for HTTPS requests)
      // @return {undefined} undefined
      // @see XMLHttpRequest.nodejsSet
      static nodejsSet(options) {
        // "this" will be set to XMLHttpRequest.prototype, so the instance nodejsSet
        // operates on default property values.
        XMLHttpRequest.prototype.nodejsSet(options);
        return void 0;
      }

      // Sets the readyState property and fires the readystatechange event.

      // @private
      // @param {Number} newReadyState the new value of readyState
      // @return {undefined} undefined
      _setReadyState(newReadyState) {
        var event;
        this.readyState = newReadyState;
        event = new ProgressEvent('readystatechange');
        this.dispatchEvent(event);
        return void 0;
      }

      // XMLHttpRequest#send() implementation for the file: protocol.

      // @private
      _sendFile() {
        if (this._url.method !== 'GET') {
          throw new NetworkError('The file protocol only supports GET');
        }
        throw new Error("Protocol file: not implemented");
      }

      // XMLHttpRequest#send() implementation for the http: and https: protocols.

      // @private
      // This method sets the instance variables and calls _sendHxxpRequest(), which
      // is responsible for building a node.js request and firing it off. The code
      // in _sendHxxpRequest() is separated off so it can be reused when handling
      // redirects.

      // @see http://www.w3.org/TR/XMLHttpRequest/#infrastructure-for-the-send()-method
      _sendHttp(data) {
        if (this._sync) {
          throw new Error("Synchronous XHR processing not implemented");
        }
        if ((data != null) && (this._method === 'GET' || this._method === 'HEAD')) {
          console.warn(`Discarding entity body for ${this._method} requests`);
          data = null;
        } else {
          // Send Content-Length: 0
          data || (data = '');
        }
        // NOTE: this is called before finalizeHeaders so that the uploader can
        //       figure out Content-Length and Content-Type.
        this.upload._setData(data);
        this._finalizeHeaders();
        this._sendHxxpRequest();
        return void 0;
      }

      // Sets up and fires off a HTTP/HTTPS request using the node.js API.

      // @private
      // This method contains the bulk of the XMLHttpRequest#send() implementation,
      // and is also used to issue new HTTP requests when handling HTTP redirects.

      // @see http://www.w3.org/TR/XMLHttpRequest/#infrastructure-for-the-send()-method
      _sendHxxpRequest() {
        var agent, hxxp, request;
        if (this._url.protocol === 'http:') {
          hxxp = http;
          agent = this.nodejsHttpAgent;
        } else {
          hxxp = https;
          agent = this.nodejsHttpsAgent;
        }
        request = hxxp.request({
          hostname: this._url.hostname,
          port: this._url.port,
          path: this._url.path,
          auth: this._url.auth,
          method: this._method,
          headers: this._headers,
          agent: agent
        });
        this._request = request;
        if (this.timeout) {
          request.setTimeout(this.timeout, () => {
            return this._onHttpTimeout(request);
          });
        }
        request.on('response', (response) => {
          return this._onHttpResponse(request, response);
        });
        request.on('error', (error) => {
          return this._onHttpRequestError(request, error);
        });
        this.upload._startUpload(request);
        if (this._request === request) { // An http error might have already fired.
          this._dispatchProgress('loadstart');
        }
        return void 0;
      }

      // Fills in the restricted HTTP headers with default values.

      // This is called right before the HTTP request is sent off.

      // @private
      // @return {undefined} undefined
      _finalizeHeaders() {
        this._headers['Connection'] = 'keep-alive';
        this._headers['Host'] = this._url.host;
        if (this._anonymous) {
          this._headers['Referer'] = 'about:blank';
        }
        this._headers['User-Agent'] = this._userAgent;
        this.upload._finalizeHeaders(this._headers, this._loweredHeaders);
        return void 0;
      }

      // Called when the headers of an HTTP response have been received.

      // @private
      // @param {http.ClientRequest} request the node.js ClientRequest instance that
      //   produced this response
      // @param {http.ClientResponse} response the node.js ClientResponse instance
      //   passed to
      _onHttpResponse(request, response) {
        var lengthString;
        if (this._request !== request) {
          return;
        }
        // Transparent redirection handling.
        switch (response.statusCode) {
          case 301:
          case 302:
          case 303:
          case 307:
          case 308:
            this._url = this._parseUrl(response.headers['location']);
            this._method = 'GET';
            if ('content-type' in this._loweredHeaders) {
              delete this._headers[this._loweredHeaders['content-type']];
              delete this._loweredHeaders['content-type'];
            }
            // XMLHttpRequestUpload#_finalizeHeaders() sets Content-Type directly.
            if ('Content-Type' in this._headers) {
              delete this._headers['Content-Type'];
            }
            // Restricted headers can't be set by the user, no need to check
            // loweredHeaders.
            delete this._headers['Content-Length'];
            this.upload._reset();
            this._finalizeHeaders();
            this._sendHxxpRequest();
            return;
        }
        this._response = response;
        this._response.on('data', (data) => {
          return this._onHttpResponseData(response, data);
        });
        this._response.on('end', () => {
          return this._onHttpResponseEnd(response);
        });
        this._response.on('close', () => {
          return this._onHttpResponseClose(response);
        });
        this.responseURL = this._url.href.split('#')[0];
        this.status = this._response.statusCode;
        this.statusText = http.STATUS_CODES[this.status];
        this._parseResponseHeaders(response);
        if (lengthString = this._responseHeaders['content-length']) {
          this._totalBytes = parseInt(lengthString);
          this._lengthComputable = true;
        } else {
          this._lengthComputable = false;
        }
        return this._setReadyState(XMLHttpRequest.HEADERS_RECEIVED);
      }

      // Called when some data has been received on a HTTP connection.

      // @private
      // @param {http.ClientResponse} response the node.js ClientResponse instance
      //   that fired this event
      // @param {String, Buffer} data the data that has been received
      _onHttpResponseData(response, data) {
        if (this._response !== response) {
          return;
        }
        this._responseParts.push(data);
        this._loadedBytes += data.length;
        if (this.readyState !== XMLHttpRequest.LOADING) {
          this._setReadyState(XMLHttpRequest.LOADING);
        }
        return this._dispatchProgress('progress');
      }

      // Called when the HTTP request finished processing.

      // @private
      // @param {http.ClientResponse} response the node.js ClientResponse instance
      //   that fired this event
      _onHttpResponseEnd(response) {
        if (this._response !== response) {
          return;
        }
        this._parseResponse();
        this._request = null;
        this._response = null;
        this._setReadyState(XMLHttpRequest.DONE);
        this._dispatchProgress('load');
        return this._dispatchProgress('loadend');
      }

      // Called when the underlying HTTP connection was closed prematurely.

      // If this method is called, it will be called after or instead of
      // onHttpResponseEnd.

      // @private
      // @param {http.ClientResponse} response the node.js ClientResponse instance
      //   that fired this event
      _onHttpResponseClose(response) {
        var request;
        if (this._response !== response) {
          return;
        }
        request = this._request;
        this._setError();
        request.abort();
        this._setReadyState(XMLHttpRequest.DONE);
        this._dispatchProgress('error');
        return this._dispatchProgress('loadend');
      }

      // Called when the timeout set on the HTTP socket expires.

      // @private
      // @param {http.ClientRequest} request the node.js ClientRequest instance that
      //   fired this event
      _onHttpTimeout(request) {
        if (this._request !== request) {
          return;
        }
        this._setError();
        request.abort();
        this._setReadyState(XMLHttpRequest.DONE);
        this._dispatchProgress('timeout');
        return this._dispatchProgress('loadend');
      }

      // Called when something wrong happens on the HTTP socket

      // @private
      // @param {http.ClientRequest} request the node.js ClientRequest instance that
      //   fired this event
      // @param {Error} error emitted exception
      _onHttpRequestError(request, error) {
        if (this._request !== request) {
          return;
        }
        this._setError();
        request.abort();
        this._setReadyState(XMLHttpRequest.DONE);
        this._dispatchProgress('error');
        return this._dispatchProgress('loadend');
      }

      // Fires an XHR progress event.

      // @private
      // @param {String} eventType one of the XHR progress event types, such as
      //   'load' and 'progress'
      _dispatchProgress(eventType) {
        var event;
        event = new ProgressEvent(eventType);
        event.lengthComputable = this._lengthComputable;
        event.loaded = this._loadedBytes;
        event.total = this._totalBytes;
        this.dispatchEvent(event);
        return void 0;
      }

      // Sets up the XHR to reflect the fact that an error has occurred.

      // The possible errors are a network error, a timeout, or an abort.

      // @private
      _setError() {
        this._request = null;
        this._response = null;
        this._responseHeaders = null;
        this._responseParts = null;
        return void 0;
      }

      // Parses a request URL string.

      // @private
      // This method is a thin wrapper around url.parse() that normalizes HTTP
      // user/password credentials. It is used to parse the URL string passed to
      // XMLHttpRequest#open() and the URLs in the Location headers of HTTP redirect
      // responses.

      // @param {String} urlString the URL to be parsed
      // @return {Object} parsed URL
      _parseUrl(urlString) {
        var absoluteUrlString, index, password, user, xhrUrl;
        if (this.nodejsBaseUrl === null) {
          absoluteUrlString = urlString;
        } else {
          absoluteUrlString = url.resolve(this.nodejsBaseUrl, urlString);
        }
        xhrUrl = url.parse(absoluteUrlString, false, true);
        xhrUrl.hash = null;
        if (xhrUrl.auth && ((typeof user !== "undefined" && user !== null) || (typeof password !== "undefined" && password !== null))) {
          index = xhrUrl.auth.indexOf(':');
          if (index === -1) {
            if (!user) {
              user = xhrUrl.auth;
            }
          } else {
            if (!user) {
              user = xhrUrl.substring(0, index);
            }
            if (!password) {
              password = xhrUrl.substring(index + 1);
            }
          }
        }
        if (user || password) {
          xhrUrl.auth = `${user}:${password}`;
        }
        return xhrUrl;
      }

      // Reads the headers from a node.js ClientResponse instance.

      // @private
      // @param {http.ClientResponse} response the response whose headers will be
      //   imported into this XMLHttpRequest's state
      // @return {undefined} undefined
      // @see http://www.w3.org/TR/XMLHttpRequest/#the-getresponseheader()-method
      // @see http://www.w3.org/TR/XMLHttpRequest/#the-getallresponseheaders()-method
      _parseResponseHeaders(response) {
        var loweredName, name, ref, value;
        this._responseHeaders = {};
        ref = response.headers;
        for (name in ref) {
          value = ref[name];
          loweredName = name.toLowerCase();
          if (this._privateHeaders[loweredName]) {
            continue;
          }
          if (this._mimeOverride !== null && loweredName === 'content-type') {
            value = this._mimeOverride;
          }
          this._responseHeaders[loweredName] = value;
        }
        if (this._mimeOverride !== null && !('content-type' in this._responseHeaders)) {
          this._responseHeaders['content-type'] = this._mimeOverride;
        }
        return void 0;
      }

      // Sets the response and responseText properties when an XHR completes.

      // @private
      // @return {undefined} undefined
      _parseResponse() {
        var arrayBuffer, buffer, i, j, jsonError, ref, view;
        if (Buffer.concat) {
          buffer = Buffer.concat(this._responseParts);
        } else {
          // node 0.6
          buffer = this._concatBuffers(this._responseParts);
        }
        this._responseParts = null;
        switch (this.responseType) {
          case 'text':
            this._parseTextResponse(buffer);
            break;
          case 'json':
            this.responseText = null;
            try {
              this.response = JSON.parse(buffer.toString('utf-8'));
            } catch (error1) {
              jsonError = error1;
              this.response = null;
            }
            break;
          case 'buffer':
            this.responseText = null;
            this.response = buffer;
            break;
          case 'arraybuffer':
            this.responseText = null;
            arrayBuffer = new ArrayBuffer(buffer.length);
            view = new Uint8Array(arrayBuffer);
            for (i = j = 0, ref = buffer.length; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
              view[i] = buffer[i];
            }
            this.response = arrayBuffer;
            break;
          default:
            // TODO(pwnall): content-base detection
            this._parseTextResponse(buffer);
        }
        return void 0;
      }

      // Sets response and responseText for a 'text' response type.

      // @private
      // @param {Buffer} buffer the node.js Buffer containing the binary response
      // @return {undefined} undefined
      _parseTextResponse(buffer) {
        var e;
        try {
          this.responseText = buffer.toString(this._parseResponseEncoding());
        } catch (error1) {
          e = error1;
          // Unknown encoding.
          this.responseText = buffer.toString('binary');
        }
        this.response = this.responseText;
        return void 0;
      }

      // Figures out the string encoding of the XHR's response.

      // This is called to determine the encoding when responseText is set.

      // @private
      // @return {String} a string encoding, e.g. 'utf-8'
      _parseResponseEncoding() {
        var contentType, encoding, match;
        encoding = null;
        if (contentType = this._responseHeaders['content-type']) {
          if (match = /\;\s*charset\=(.*)$/.exec(contentType)) {
            return match[1];
          }
        }
        return 'utf-8';
      }

      // Buffer.concat implementation for node 0.6.

      // @private
      // @param {Array<Buffer>} buffers the buffers whose contents will be merged
      // @return {Buffer} same as Buffer.concat(buffers) in node 0.8 and above
      _concatBuffers(buffers) {
        var buffer, j, k, len, len1, length, target;
        if (buffers.length === 0) {
          return Buffer.alloc(0);
        }
        if (buffers.length === 1) {
          return buffers[0];
        }
        length = 0;
        for (j = 0, len = buffers.length; j < len; j++) {
          buffer = buffers[j];
          length += buffer.length;
        }
        target = Buffer.alloc(length);
        length = 0;
        for (k = 0, len1 = buffers.length; k < len1; k++) {
          buffer = buffers[k];
          buffer.copy(target, length);
          length += buffer.length;
        }
        return target;
      }

    };

    // @property {function(ProgressEvent)} DOM level 0-style handler for the
    //   'readystatechange' event
    XMLHttpRequest.prototype.onreadystatechange = null;

    // @property {Number} the current state of the XHR object
    // @see http://www.w3.org/TR/XMLHttpRequest/#states
    XMLHttpRequest.prototype.readyState = null;

    // @property {String, ArrayBuffer, Buffer, Object} processed XHR response
    // @see http://www.w3.org/TR/XMLHttpRequest/#the-response-attribute
    XMLHttpRequest.prototype.response = null;

    // @property {String} response string, if responseType is '' or 'text'
    // @see http://www.w3.org/TR/XMLHttpRequest/#the-responsetext-attribute
    XMLHttpRequest.prototype.responseText = null;

    // @property {String} sets the parsing method for the XHR response
    // @see http://www.w3.org/TR/XMLHttpRequest/#the-responsetype-attribute
    XMLHttpRequest.prototype.responseType = null;

    // @property {Number} the HTTP
    // @see http://www.w3.org/TR/XMLHttpRequest/#the-status-attribute
    XMLHttpRequest.prototype.status = null;

    // @property {Number} milliseconds to wait for the request to complete
    // @see http://www.w3.org/TR/XMLHttpRequest/#the-timeout-attribute
    XMLHttpRequest.prototype.timeout = null;

    // @property {XMLHttpRequestUpload} the associated upload information
    // @see http://www.w3.org/TR/XMLHttpRequest/#the-upload-attribute
    XMLHttpRequest.prototype.upload = null;

    // readyState value before XMLHttpRequest#open() is called
    XMLHttpRequest.prototype.UNSENT = 0;

    // readyState value before XMLHttpRequest#open() is called
    XMLHttpRequest.UNSENT = 0;

    // readyState value after XMLHttpRequest#open() is called, and before
    //   XMLHttpRequest#send() is called; XMLHttpRequest#setRequestHeader() can be
    //   called in this state
    XMLHttpRequest.prototype.OPENED = 1;

    // readyState value after XMLHttpRequest#open() is called, and before
    //   XMLHttpRequest#send() is called; XMLHttpRequest#setRequestHeader() can be
    //   called in this state
    XMLHttpRequest.OPENED = 1;

    // readyState value after redirects have been followed and the HTTP headers of
    //   the final response have been received
    XMLHttpRequest.prototype.HEADERS_RECEIVED = 2;

    // readyState value after redirects have been followed and the HTTP headers of
    //   the final response have been received
    XMLHttpRequest.HEADERS_RECEIVED = 2;

    // readyState value when the response entity body is being received
    XMLHttpRequest.prototype.LOADING = 3;

    // readyState value when the response entity body is being received
    XMLHttpRequest.LOADING = 3;

    // readyState value after the request has been completely processed
    XMLHttpRequest.prototype.DONE = 4;

    // readyState value after the request has been completely processed
    XMLHttpRequest.DONE = 4;

    // @property {http.Agent} the agent option passed to HTTP requests

    // NOTE: this is not in the XMLHttpRequest API, and will not work in browsers.
    // It is a stable node-xhr2 API that is useful for testing & going through
    // web-proxies.
    XMLHttpRequest.prototype.nodejsHttpAgent = http.globalAgent;

    // @property {https.Agent} the agent option passed to HTTPS requests

    // NOTE: this is not in the XMLHttpRequest API, and will not work in browsers.
    // It is a stable node-xhr2 API that is useful for testing & going through
    // web-proxies.
    XMLHttpRequest.prototype.nodejsHttpsAgent = https.globalAgent;

    // @property {String} the base URL that relative URLs get resolved to

    // NOTE: this is not in the XMLHttpRequest API, and will not work in browsers.
    // Its browser equivalent is the base URL of the document associated with the
    // Window object. It is a stable node-xhr2 API provided for libraries such as
    // Angular Universal.
    XMLHttpRequest.prototype.nodejsBaseUrl = null;

    // HTTP methods that are disallowed in the XHR spec.

    // @private
    // @see Step 6 in http://www.w3.org/TR/XMLHttpRequest/#the-open()-method
    XMLHttpRequest.prototype._restrictedMethods = {
      CONNECT: true,
      TRACE: true,
      TRACK: true
    };

    // HTTP request headers that are disallowed in the XHR spec.

    // @private
    // @see Step 5 in
    //   http://www.w3.org/TR/XMLHttpRequest/#the-setrequestheader()-method
    XMLHttpRequest.prototype._restrictedHeaders = {
      'accept-charset': true,
      'accept-encoding': true,
      'access-control-request-headers': true,
      'access-control-request-method': true,
      connection: true,
      'content-length': true,
      cookie: true,
      cookie2: true,
      date: true,
      dnt: true,
      expect: true,
      host: true,
      'keep-alive': true,
      origin: true,
      referer: true,
      te: true,
      trailer: true,
      'transfer-encoding': true,
      upgrade: true,
      'user-agent': true,
      via: true
    };

    // HTTP response headers that should not be exposed according to the XHR spec.

    // @private
    // @see Step 3 in
    //     http://www.w3.org/TR/XMLHttpRequest/#the-getresponseheader()-method
    XMLHttpRequest.prototype._privateHeaders = {
      'set-cookie': true,
      'set-cookie2': true
    };

    // The value of the User-Agent header.
    XMLHttpRequest.prototype._userAgent = `Mozilla/5.0 (${os.type()} ${os.arch()}) ` + `node.js/${process.versions.node} v8/${process.versions.v8}`;

    return XMLHttpRequest;

  }).call(this);

  // XMLHttpRequest is the result of require('node-xhr2').
  module.exports = XMLHttpRequest;

  // Make node-xhr2 work as a drop-in replacement for libraries that promote the
  // following usage pattern:
  //     var XMLHttpRequest = require('xhr-library-name').XMLHttpRequest
  XMLHttpRequest.XMLHttpRequest = XMLHttpRequest;

  // This file defines the custom errors used in the XMLHttpRequest specification.

  // Thrown if the XHR security policy is violated.
  SecurityError = class SecurityError extends Error {
    // @private
    constructor() {
      super();
    }

  };

  // Thrown if the XHR security policy is violated.
  XMLHttpRequest.SecurityError = SecurityError;

  // Usually thrown if the XHR is in the wrong readyState for an operation.
  InvalidStateError = class InvalidStateError extends Error {
    // @private
    constructor() {
      super();
    }

  };

  // Usually thrown if the XHR is in the wrong readyState for an operation.
  InvalidStateError = class InvalidStateError extends Error {};

  XMLHttpRequest.InvalidStateError = InvalidStateError;

  // Thrown if there is a problem with the URL passed to the XHR.
  NetworkError = class NetworkError extends Error {
    // @private
    constructor() {
      super();
    }

  };

  // Thrown if parsing URLs errors out.
  XMLHttpRequest.SyntaxError = SyntaxError;

  SyntaxError = class SyntaxError extends Error {
    // @private:
    constructor() {
      super();
    }

  };

  ProgressEvent = (function() {
    // http://xhr.spec.whatwg.org/#interface-progressevent
    class ProgressEvent {
      // Creates a new event.

      // @param {String} type the event type, e.g. 'readystatechange'; must be
      //   lowercased
      constructor(type) {
        this.type = type;
        this.target = null;
        this.currentTarget = null;
        this.lengthComputable = false;
        this.loaded = 0;
        this.total = 0;
      }

    };

    // Getting the time from the OS is expensive, skip on that for now.
    // @timeStamp = Date.now()

    // @property {Boolean} for compatibility with DOM events
    ProgressEvent.prototype.bubbles = false;

    // @property {Boolean} for fompatibility with DOM events
    ProgressEvent.prototype.cancelable = false;

    // @property {XMLHttpRequest} the request that caused this event
    ProgressEvent.prototype.target = null;

    // @property {Number} number of bytes that have already been downloaded or
    //   uploaded
    ProgressEvent.prototype.loaded = null;

    // @property {Boolean} true if the Content-Length response header is available
    //   and the value of the event's total property is meaningful
    ProgressEvent.prototype.lengthComputable = null;

    // @property {Number} number of bytes that will be downloaded or uploaded by
    //   the request that fired the event
    ProgressEvent.prototype.total = null;

    return ProgressEvent;

  }).call(this);

  // The XHR spec exports the ProgressEvent constructor.
  XMLHttpRequest.ProgressEvent = ProgressEvent;

  // @see http://xhr.spec.whatwg.org/#interface-xmlhttprequest
  XMLHttpRequestUpload = class XMLHttpRequestUpload extends XMLHttpRequestEventTarget {
    // @private
    // @param {XMLHttpRequest} the XMLHttpRequest that this upload object is
    //   associated with
    constructor(request) {
      super();
      this._request = request;
      this._reset();
    }

    // Sets up this Upload to handle a new request.

    // @private
    // @return {undefined} undefined
    _reset() {
      this._contentType = null;
      this._body = null;
      return void 0;
    }

    // Implements the upload-related part of the send() XHR specification.

    // @private
    // @param {?String, ?Buffer, ?ArrayBufferView} data the argument passed to
    //   XMLHttpRequest#send()
    // @return {undefined} undefined
    // @see step 4 of http://www.w3.org/TR/XMLHttpRequest/#the-send()-method
    _setData(data) {
      var body, i, j, k, offset, ref, ref1, view;
      if (typeof data === 'undefined' || data === null) {
        return;
      }
      if (typeof data === 'string') {
        // DOMString
        if (data.length !== 0) {
          this._contentType = 'text/plain;charset=UTF-8';
        }
        this._body = Buffer.from(data, 'utf8');
      } else if (Buffer.isBuffer(data)) {
        // node.js Buffer
        this._body = data;
      } else if (data instanceof ArrayBuffer) {
        // ArrayBuffer arguments were supported in an old revision of the spec.
        body = Buffer.alloc(data.byteLength);
        view = new Uint8Array(data);
        for (i = j = 0, ref = data.byteLength; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
          body[i] = view[i];
        }
        this._body = body;
      } else if (data.buffer && data.buffer instanceof ArrayBuffer) {
        // ArrayBufferView
        body = Buffer.alloc(data.byteLength);
        offset = data.byteOffset;
        view = new Uint8Array(data.buffer);
        for (i = k = 0, ref1 = data.byteLength; (0 <= ref1 ? k < ref1 : k > ref1); i = 0 <= ref1 ? ++k : --k) {
          body[i] = view[i + offset];
        }
        this._body = body;
      } else {
        // NOTE: diverging from the XHR specification of coercing everything else
        //       to Strings via toString() because that behavior masks bugs and is
        //       rarely useful
        throw new Error(`Unsupported send() data ${data}`);
      }
      return void 0;
    }

    // Updates the HTTP headers right before the request is sent.

    // This is used to set data-dependent headers such as Content-Length and
    // Content-Type.

    // @private
    // @param {Object<String, String>} headers the HTTP headers to be sent
    // @param {Object<String, String>} loweredHeaders maps lowercased HTTP header
    //   names (e.g., 'content-type') to the actual names used in the headers
    //   parameter (e.g., 'Content-Type')
    // @return {undefined} undefined
    _finalizeHeaders(headers, loweredHeaders) {
      if (this._contentType) {
        if (!('content-type' in loweredHeaders)) {
          headers['Content-Type'] = this._contentType;
        }
      }
      if (this._body) {
        // Restricted headers can't be set by the user, no need to check
        // loweredHeaders.
        headers['Content-Length'] = this._body.length.toString();
      }
      return void 0;
    }

    // Starts sending the HTTP request data.

    // @private
    // @param {http.ClientRequest} request the HTTP request
    // @return {undefined} undefined
    _startUpload(request) {
      if (this._body) {
        request.write(this._body);
      }
      request.end();
      return void 0;
    }

  };

  // Export the XMLHttpRequestUpload constructor.
  XMLHttpRequest.XMLHttpRequestUpload = XMLHttpRequestUpload;

}).call(this);


/***/ }),

/***/ 413:
/***/ (function(module, __unusedexports, __webpack_require__) {

module.exports = __webpack_require__(141);


/***/ }),

/***/ 431:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.issue = exports.issueCommand = void 0;
const os = __importStar(__webpack_require__(87));
const utils_1 = __webpack_require__(82);
/**
 * Commands
 *
 * Command Format:
 *   ::name key=value,key=value::message
 *
 * Examples:
 *   ::warning::This is the message
 *   ::set-env name=MY_VAR::some value
 */
function issueCommand(command, properties, message) {
    const cmd = new Command(command, properties, message);
    process.stdout.write(cmd.toString() + os.EOL);
}
exports.issueCommand = issueCommand;
function issue(name, message = '') {
    issueCommand(name, {}, message);
}
exports.issue = issue;
const CMD_STRING = '::';
class Command {
    constructor(command, properties, message) {
        if (!command) {
            command = 'missing.command';
        }
        this.command = command;
        this.properties = properties;
        this.message = message;
    }
    toString() {
        let cmdStr = CMD_STRING + this.command;
        if (this.properties && Object.keys(this.properties).length > 0) {
            cmdStr += ' ';
            let first = true;
            for (const key in this.properties) {
                if (this.properties.hasOwnProperty(key)) {
                    const val = this.properties[key];
                    if (val) {
                        if (first) {
                            first = false;
                        }
                        else {
                            cmdStr += ',';
                        }
                        cmdStr += `${key}=${escapeProperty(val)}`;
                    }
                }
            }
        }
        cmdStr += `${CMD_STRING}${escapeData(this.message)}`;
        return cmdStr;
    }
}
function escapeData(s) {
    return utils_1.toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A');
}
function escapeProperty(s) {
    return utils_1.toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A')
        .replace(/:/g, '%3A')
        .replace(/,/g, '%2C');
}
//# sourceMappingURL=command.js.map

/***/ }),

/***/ 448:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', { value: true });

var universalUserAgent = __webpack_require__(796);
var beforeAfterHook = __webpack_require__(523);
var request = __webpack_require__(753);
var graphql = __webpack_require__(898);
var authToken = __webpack_require__(813);

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

const VERSION = "3.5.1";

const _excluded = ["authStrategy"];
class Octokit {
  constructor(options = {}) {
    const hook = new beforeAfterHook.Collection();
    const requestDefaults = {
      baseUrl: request.request.endpoint.DEFAULTS.baseUrl,
      headers: {},
      request: Object.assign({}, options.request, {
        // @ts-ignore internal usage only, no need to type
        hook: hook.bind(null, "request")
      }),
      mediaType: {
        previews: [],
        format: ""
      }
    }; // prepend default user agent with `options.userAgent` if set

    requestDefaults.headers["user-agent"] = [options.userAgent, `octokit-core.js/${VERSION} ${universalUserAgent.getUserAgent()}`].filter(Boolean).join(" ");

    if (options.baseUrl) {
      requestDefaults.baseUrl = options.baseUrl;
    }

    if (options.previews) {
      requestDefaults.mediaType.previews = options.previews;
    }

    if (options.timeZone) {
      requestDefaults.headers["time-zone"] = options.timeZone;
    }

    this.request = request.request.defaults(requestDefaults);
    this.graphql = graphql.withCustomRequest(this.request).defaults(requestDefaults);
    this.log = Object.assign({
      debug: () => {},
      info: () => {},
      warn: console.warn.bind(console),
      error: console.error.bind(console)
    }, options.log);
    this.hook = hook; // (1) If neither `options.authStrategy` nor `options.auth` are set, the `octokit` instance
    //     is unauthenticated. The `this.auth()` method is a no-op and no request hook is registered.
    // (2) If only `options.auth` is set, use the default token authentication strategy.
    // (3) If `options.authStrategy` is set then use it and pass in `options.auth`. Always pass own request as many strategies accept a custom request instance.
    // TODO: type `options.auth` based on `options.authStrategy`.

    if (!options.authStrategy) {
      if (!options.auth) {
        // (1)
        this.auth = async () => ({
          type: "unauthenticated"
        });
      } else {
        // (2)
        const auth = authToken.createTokenAuth(options.auth); // @ts-ignore  ¯\_(ツ)_/¯

        hook.wrap("request", auth.hook);
        this.auth = auth;
      }
    } else {
      const {
        authStrategy
      } = options,
            otherOptions = _objectWithoutProperties(options, _excluded);

      const auth = authStrategy(Object.assign({
        request: this.request,
        log: this.log,
        // we pass the current octokit instance as well as its constructor options
        // to allow for authentication strategies that return a new octokit instance
        // that shares the same internal state as the current one. The original
        // requirement for this was the "event-octokit" authentication strategy
        // of https://github.com/probot/octokit-auth-probot.
        octokit: this,
        octokitOptions: otherOptions
      }, options.auth)); // @ts-ignore  ¯\_(ツ)_/¯

      hook.wrap("request", auth.hook);
      this.auth = auth;
    } // apply plugins
    // https://stackoverflow.com/a/16345172


    const classConstructor = this.constructor;
    classConstructor.plugins.forEach(plugin => {
      Object.assign(this, plugin(this, options));
    });
  }

  static defaults(defaults) {
    const OctokitWithDefaults = class extends this {
      constructor(...args) {
        const options = args[0] || {};

        if (typeof defaults === "function") {
          super(defaults(options));
          return;
        }

        super(Object.assign({}, defaults, options, options.userAgent && defaults.userAgent ? {
          userAgent: `${options.userAgent} ${defaults.userAgent}`
        } : null));
      }

    };
    return OctokitWithDefaults;
  }
  /**
   * Attach a plugin (or many) to your Octokit instance.
   *
   * @example
   * const API = Octokit.plugin(plugin1, plugin2, plugin3, ...)
   */


  static plugin(...newPlugins) {
    var _a;

    const currentPlugins = this.plugins;
    const NewOctokit = (_a = class extends this {}, _a.plugins = currentPlugins.concat(newPlugins.filter(plugin => !currentPlugins.includes(plugin))), _a);
    return NewOctokit;
  }

}
Octokit.VERSION = VERSION;
Octokit.plugins = [];

exports.Octokit = Octokit;
//# sourceMappingURL=index.js.map


/***/ }),

/***/ 454:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Stream = _interopDefault(__webpack_require__(794));
var http = _interopDefault(__webpack_require__(605));
var Url = _interopDefault(__webpack_require__(835));
var https = _interopDefault(__webpack_require__(211));
var zlib = _interopDefault(__webpack_require__(761));

// Based on https://github.com/tmpvar/jsdom/blob/aa85b2abf07766ff7bf5c1f6daafb3726f2f2db5/lib/jsdom/living/blob.js

// fix for "Readable" isn't a named export issue
const Readable = Stream.Readable;

const BUFFER = Symbol('buffer');
const TYPE = Symbol('type');

class Blob {
	constructor() {
		this[TYPE] = '';

		const blobParts = arguments[0];
		const options = arguments[1];

		const buffers = [];
		let size = 0;

		if (blobParts) {
			const a = blobParts;
			const length = Number(a.length);
			for (let i = 0; i < length; i++) {
				const element = a[i];
				let buffer;
				if (element instanceof Buffer) {
					buffer = element;
				} else if (ArrayBuffer.isView(element)) {
					buffer = Buffer.from(element.buffer, element.byteOffset, element.byteLength);
				} else if (element instanceof ArrayBuffer) {
					buffer = Buffer.from(element);
				} else if (element instanceof Blob) {
					buffer = element[BUFFER];
				} else {
					buffer = Buffer.from(typeof element === 'string' ? element : String(element));
				}
				size += buffer.length;
				buffers.push(buffer);
			}
		}

		this[BUFFER] = Buffer.concat(buffers);

		let type = options && options.type !== undefined && String(options.type).toLowerCase();
		if (type && !/[^\u0020-\u007E]/.test(type)) {
			this[TYPE] = type;
		}
	}
	get size() {
		return this[BUFFER].length;
	}
	get type() {
		return this[TYPE];
	}
	text() {
		return Promise.resolve(this[BUFFER].toString());
	}
	arrayBuffer() {
		const buf = this[BUFFER];
		const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
		return Promise.resolve(ab);
	}
	stream() {
		const readable = new Readable();
		readable._read = function () {};
		readable.push(this[BUFFER]);
		readable.push(null);
		return readable;
	}
	toString() {
		return '[object Blob]';
	}
	slice() {
		const size = this.size;

		const start = arguments[0];
		const end = arguments[1];
		let relativeStart, relativeEnd;
		if (start === undefined) {
			relativeStart = 0;
		} else if (start < 0) {
			relativeStart = Math.max(size + start, 0);
		} else {
			relativeStart = Math.min(start, size);
		}
		if (end === undefined) {
			relativeEnd = size;
		} else if (end < 0) {
			relativeEnd = Math.max(size + end, 0);
		} else {
			relativeEnd = Math.min(end, size);
		}
		const span = Math.max(relativeEnd - relativeStart, 0);

		const buffer = this[BUFFER];
		const slicedBuffer = buffer.slice(relativeStart, relativeStart + span);
		const blob = new Blob([], { type: arguments[2] });
		blob[BUFFER] = slicedBuffer;
		return blob;
	}
}

Object.defineProperties(Blob.prototype, {
	size: { enumerable: true },
	type: { enumerable: true },
	slice: { enumerable: true }
});

Object.defineProperty(Blob.prototype, Symbol.toStringTag, {
	value: 'Blob',
	writable: false,
	enumerable: false,
	configurable: true
});

/**
 * fetch-error.js
 *
 * FetchError interface for operational errors
 */

/**
 * Create FetchError instance
 *
 * @param   String      message      Error message for human
 * @param   String      type         Error type for machine
 * @param   String      systemError  For Node.js system error
 * @return  FetchError
 */
function FetchError(message, type, systemError) {
  Error.call(this, message);

  this.message = message;
  this.type = type;

  // when err.type is `system`, err.code contains system error code
  if (systemError) {
    this.code = this.errno = systemError.code;
  }

  // hide custom error implementation details from end-users
  Error.captureStackTrace(this, this.constructor);
}

FetchError.prototype = Object.create(Error.prototype);
FetchError.prototype.constructor = FetchError;
FetchError.prototype.name = 'FetchError';

let convert;
try {
	convert = __webpack_require__(18).convert;
} catch (e) {}

const INTERNALS = Symbol('Body internals');

// fix an issue where "PassThrough" isn't a named export for node <10
const PassThrough = Stream.PassThrough;

/**
 * Body mixin
 *
 * Ref: https://fetch.spec.whatwg.org/#body
 *
 * @param   Stream  body  Readable stream
 * @param   Object  opts  Response options
 * @return  Void
 */
function Body(body) {
	var _this = this;

	var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	    _ref$size = _ref.size;

	let size = _ref$size === undefined ? 0 : _ref$size;
	var _ref$timeout = _ref.timeout;
	let timeout = _ref$timeout === undefined ? 0 : _ref$timeout;

	if (body == null) {
		// body is undefined or null
		body = null;
	} else if (isURLSearchParams(body)) {
		// body is a URLSearchParams
		body = Buffer.from(body.toString());
	} else if (isBlob(body)) ; else if (Buffer.isBuffer(body)) ; else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
		// body is ArrayBuffer
		body = Buffer.from(body);
	} else if (ArrayBuffer.isView(body)) {
		// body is ArrayBufferView
		body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
	} else if (body instanceof Stream) ; else {
		// none of the above
		// coerce to string then buffer
		body = Buffer.from(String(body));
	}
	this[INTERNALS] = {
		body,
		disturbed: false,
		error: null
	};
	this.size = size;
	this.timeout = timeout;

	if (body instanceof Stream) {
		body.on('error', function (err) {
			const error = err.name === 'AbortError' ? err : new FetchError(`Invalid response body while trying to fetch ${_this.url}: ${err.message}`, 'system', err);
			_this[INTERNALS].error = error;
		});
	}
}

Body.prototype = {
	get body() {
		return this[INTERNALS].body;
	},

	get bodyUsed() {
		return this[INTERNALS].disturbed;
	},

	/**
  * Decode response as ArrayBuffer
  *
  * @return  Promise
  */
	arrayBuffer() {
		return consumeBody.call(this).then(function (buf) {
			return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
		});
	},

	/**
  * Return raw response as Blob
  *
  * @return Promise
  */
	blob() {
		let ct = this.headers && this.headers.get('content-type') || '';
		return consumeBody.call(this).then(function (buf) {
			return Object.assign(
			// Prevent copying
			new Blob([], {
				type: ct.toLowerCase()
			}), {
				[BUFFER]: buf
			});
		});
	},

	/**
  * Decode response as json
  *
  * @return  Promise
  */
	json() {
		var _this2 = this;

		return consumeBody.call(this).then(function (buffer) {
			try {
				return JSON.parse(buffer.toString());
			} catch (err) {
				return Body.Promise.reject(new FetchError(`invalid json response body at ${_this2.url} reason: ${err.message}`, 'invalid-json'));
			}
		});
	},

	/**
  * Decode response as text
  *
  * @return  Promise
  */
	text() {
		return consumeBody.call(this).then(function (buffer) {
			return buffer.toString();
		});
	},

	/**
  * Decode response as buffer (non-spec api)
  *
  * @return  Promise
  */
	buffer() {
		return consumeBody.call(this);
	},

	/**
  * Decode response as text, while automatically detecting the encoding and
  * trying to decode to UTF-8 (non-spec api)
  *
  * @return  Promise
  */
	textConverted() {
		var _this3 = this;

		return consumeBody.call(this).then(function (buffer) {
			return convertBody(buffer, _this3.headers);
		});
	}
};

// In browsers, all properties are enumerable.
Object.defineProperties(Body.prototype, {
	body: { enumerable: true },
	bodyUsed: { enumerable: true },
	arrayBuffer: { enumerable: true },
	blob: { enumerable: true },
	json: { enumerable: true },
	text: { enumerable: true }
});

Body.mixIn = function (proto) {
	for (const name of Object.getOwnPropertyNames(Body.prototype)) {
		// istanbul ignore else: future proof
		if (!(name in proto)) {
			const desc = Object.getOwnPropertyDescriptor(Body.prototype, name);
			Object.defineProperty(proto, name, desc);
		}
	}
};

/**
 * Consume and convert an entire Body to a Buffer.
 *
 * Ref: https://fetch.spec.whatwg.org/#concept-body-consume-body
 *
 * @return  Promise
 */
function consumeBody() {
	var _this4 = this;

	if (this[INTERNALS].disturbed) {
		return Body.Promise.reject(new TypeError(`body used already for: ${this.url}`));
	}

	this[INTERNALS].disturbed = true;

	if (this[INTERNALS].error) {
		return Body.Promise.reject(this[INTERNALS].error);
	}

	let body = this.body;

	// body is null
	if (body === null) {
		return Body.Promise.resolve(Buffer.alloc(0));
	}

	// body is blob
	if (isBlob(body)) {
		body = body.stream();
	}

	// body is buffer
	if (Buffer.isBuffer(body)) {
		return Body.Promise.resolve(body);
	}

	// istanbul ignore if: should never happen
	if (!(body instanceof Stream)) {
		return Body.Promise.resolve(Buffer.alloc(0));
	}

	// body is stream
	// get ready to actually consume the body
	let accum = [];
	let accumBytes = 0;
	let abort = false;

	return new Body.Promise(function (resolve, reject) {
		let resTimeout;

		// allow timeout on slow response body
		if (_this4.timeout) {
			resTimeout = setTimeout(function () {
				abort = true;
				reject(new FetchError(`Response timeout while trying to fetch ${_this4.url} (over ${_this4.timeout}ms)`, 'body-timeout'));
			}, _this4.timeout);
		}

		// handle stream errors
		body.on('error', function (err) {
			if (err.name === 'AbortError') {
				// if the request was aborted, reject with this Error
				abort = true;
				reject(err);
			} else {
				// other errors, such as incorrect content-encoding
				reject(new FetchError(`Invalid response body while trying to fetch ${_this4.url}: ${err.message}`, 'system', err));
			}
		});

		body.on('data', function (chunk) {
			if (abort || chunk === null) {
				return;
			}

			if (_this4.size && accumBytes + chunk.length > _this4.size) {
				abort = true;
				reject(new FetchError(`content size at ${_this4.url} over limit: ${_this4.size}`, 'max-size'));
				return;
			}

			accumBytes += chunk.length;
			accum.push(chunk);
		});

		body.on('end', function () {
			if (abort) {
				return;
			}

			clearTimeout(resTimeout);

			try {
				resolve(Buffer.concat(accum, accumBytes));
			} catch (err) {
				// handle streams that have accumulated too much data (issue #414)
				reject(new FetchError(`Could not create Buffer from response body for ${_this4.url}: ${err.message}`, 'system', err));
			}
		});
	});
}

/**
 * Detect buffer encoding and convert to target encoding
 * ref: http://www.w3.org/TR/2011/WD-html5-20110113/parsing.html#determining-the-character-encoding
 *
 * @param   Buffer  buffer    Incoming buffer
 * @param   String  encoding  Target encoding
 * @return  String
 */
function convertBody(buffer, headers) {
	if (typeof convert !== 'function') {
		throw new Error('The package `encoding` must be installed to use the textConverted() function');
	}

	const ct = headers.get('content-type');
	let charset = 'utf-8';
	let res, str;

	// header
	if (ct) {
		res = /charset=([^;]*)/i.exec(ct);
	}

	// no charset in content type, peek at response body for at most 1024 bytes
	str = buffer.slice(0, 1024).toString();

	// html5
	if (!res && str) {
		res = /<meta.+?charset=(['"])(.+?)\1/i.exec(str);
	}

	// html4
	if (!res && str) {
		res = /<meta[\s]+?http-equiv=(['"])content-type\1[\s]+?content=(['"])(.+?)\2/i.exec(str);
		if (!res) {
			res = /<meta[\s]+?content=(['"])(.+?)\1[\s]+?http-equiv=(['"])content-type\3/i.exec(str);
			if (res) {
				res.pop(); // drop last quote
			}
		}

		if (res) {
			res = /charset=(.*)/i.exec(res.pop());
		}
	}

	// xml
	if (!res && str) {
		res = /<\?xml.+?encoding=(['"])(.+?)\1/i.exec(str);
	}

	// found charset
	if (res) {
		charset = res.pop();

		// prevent decode issues when sites use incorrect encoding
		// ref: https://hsivonen.fi/encoding-menu/
		if (charset === 'gb2312' || charset === 'gbk') {
			charset = 'gb18030';
		}
	}

	// turn raw buffers into a single utf-8 buffer
	return convert(buffer, 'UTF-8', charset).toString();
}

/**
 * Detect a URLSearchParams object
 * ref: https://github.com/bitinn/node-fetch/issues/296#issuecomment-307598143
 *
 * @param   Object  obj     Object to detect by type or brand
 * @return  String
 */
function isURLSearchParams(obj) {
	// Duck-typing as a necessary condition.
	if (typeof obj !== 'object' || typeof obj.append !== 'function' || typeof obj.delete !== 'function' || typeof obj.get !== 'function' || typeof obj.getAll !== 'function' || typeof obj.has !== 'function' || typeof obj.set !== 'function') {
		return false;
	}

	// Brand-checking and more duck-typing as optional condition.
	return obj.constructor.name === 'URLSearchParams' || Object.prototype.toString.call(obj) === '[object URLSearchParams]' || typeof obj.sort === 'function';
}

/**
 * Check if `obj` is a W3C `Blob` object (which `File` inherits from)
 * @param  {*} obj
 * @return {boolean}
 */
function isBlob(obj) {
	return typeof obj === 'object' && typeof obj.arrayBuffer === 'function' && typeof obj.type === 'string' && typeof obj.stream === 'function' && typeof obj.constructor === 'function' && typeof obj.constructor.name === 'string' && /^(Blob|File)$/.test(obj.constructor.name) && /^(Blob|File)$/.test(obj[Symbol.toStringTag]);
}

/**
 * Clone body given Res/Req instance
 *
 * @param   Mixed  instance  Response or Request instance
 * @return  Mixed
 */
function clone(instance) {
	let p1, p2;
	let body = instance.body;

	// don't allow cloning a used body
	if (instance.bodyUsed) {
		throw new Error('cannot clone body after it is used');
	}

	// check that body is a stream and not form-data object
	// note: we can't clone the form-data object without having it as a dependency
	if (body instanceof Stream && typeof body.getBoundary !== 'function') {
		// tee instance body
		p1 = new PassThrough();
		p2 = new PassThrough();
		body.pipe(p1);
		body.pipe(p2);
		// set instance body to teed body and return the other teed body
		instance[INTERNALS].body = p1;
		body = p2;
	}

	return body;
}

/**
 * Performs the operation "extract a `Content-Type` value from |object|" as
 * specified in the specification:
 * https://fetch.spec.whatwg.org/#concept-bodyinit-extract
 *
 * This function assumes that instance.body is present.
 *
 * @param   Mixed  instance  Any options.body input
 */
function extractContentType(body) {
	if (body === null) {
		// body is null
		return null;
	} else if (typeof body === 'string') {
		// body is string
		return 'text/plain;charset=UTF-8';
	} else if (isURLSearchParams(body)) {
		// body is a URLSearchParams
		return 'application/x-www-form-urlencoded;charset=UTF-8';
	} else if (isBlob(body)) {
		// body is blob
		return body.type || null;
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		return null;
	} else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
		// body is ArrayBuffer
		return null;
	} else if (ArrayBuffer.isView(body)) {
		// body is ArrayBufferView
		return null;
	} else if (typeof body.getBoundary === 'function') {
		// detect form data input from form-data module
		return `multipart/form-data;boundary=${body.getBoundary()}`;
	} else if (body instanceof Stream) {
		// body is stream
		// can't really do much about this
		return null;
	} else {
		// Body constructor defaults other things to string
		return 'text/plain;charset=UTF-8';
	}
}

/**
 * The Fetch Standard treats this as if "total bytes" is a property on the body.
 * For us, we have to explicitly get it with a function.
 *
 * ref: https://fetch.spec.whatwg.org/#concept-body-total-bytes
 *
 * @param   Body    instance   Instance of Body
 * @return  Number?            Number of bytes, or null if not possible
 */
function getTotalBytes(instance) {
	const body = instance.body;


	if (body === null) {
		// body is null
		return 0;
	} else if (isBlob(body)) {
		return body.size;
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		return body.length;
	} else if (body && typeof body.getLengthSync === 'function') {
		// detect form data input from form-data module
		if (body._lengthRetrievers && body._lengthRetrievers.length == 0 || // 1.x
		body.hasKnownLength && body.hasKnownLength()) {
			// 2.x
			return body.getLengthSync();
		}
		return null;
	} else {
		// body is stream
		return null;
	}
}

/**
 * Write a Body to a Node.js WritableStream (e.g. http.Request) object.
 *
 * @param   Body    instance   Instance of Body
 * @return  Void
 */
function writeToStream(dest, instance) {
	const body = instance.body;


	if (body === null) {
		// body is null
		dest.end();
	} else if (isBlob(body)) {
		body.stream().pipe(dest);
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		dest.write(body);
		dest.end();
	} else {
		// body is stream
		body.pipe(dest);
	}
}

// expose Promise
Body.Promise = global.Promise;

/**
 * headers.js
 *
 * Headers class offers convenient helpers
 */

const invalidTokenRegex = /[^\^_`a-zA-Z\-0-9!#$%&'*+.|~]/;
const invalidHeaderCharRegex = /[^\t\x20-\x7e\x80-\xff]/;

function validateName(name) {
	name = `${name}`;
	if (invalidTokenRegex.test(name) || name === '') {
		throw new TypeError(`${name} is not a legal HTTP header name`);
	}
}

function validateValue(value) {
	value = `${value}`;
	if (invalidHeaderCharRegex.test(value)) {
		throw new TypeError(`${value} is not a legal HTTP header value`);
	}
}

/**
 * Find the key in the map object given a header name.
 *
 * Returns undefined if not found.
 *
 * @param   String  name  Header name
 * @return  String|Undefined
 */
function find(map, name) {
	name = name.toLowerCase();
	for (const key in map) {
		if (key.toLowerCase() === name) {
			return key;
		}
	}
	return undefined;
}

const MAP = Symbol('map');
class Headers {
	/**
  * Headers class
  *
  * @param   Object  headers  Response headers
  * @return  Void
  */
	constructor() {
		let init = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

		this[MAP] = Object.create(null);

		if (init instanceof Headers) {
			const rawHeaders = init.raw();
			const headerNames = Object.keys(rawHeaders);

			for (const headerName of headerNames) {
				for (const value of rawHeaders[headerName]) {
					this.append(headerName, value);
				}
			}

			return;
		}

		// We don't worry about converting prop to ByteString here as append()
		// will handle it.
		if (init == null) ; else if (typeof init === 'object') {
			const method = init[Symbol.iterator];
			if (method != null) {
				if (typeof method !== 'function') {
					throw new TypeError('Header pairs must be iterable');
				}

				// sequence<sequence<ByteString>>
				// Note: per spec we have to first exhaust the lists then process them
				const pairs = [];
				for (const pair of init) {
					if (typeof pair !== 'object' || typeof pair[Symbol.iterator] !== 'function') {
						throw new TypeError('Each header pair must be iterable');
					}
					pairs.push(Array.from(pair));
				}

				for (const pair of pairs) {
					if (pair.length !== 2) {
						throw new TypeError('Each header pair must be a name/value tuple');
					}
					this.append(pair[0], pair[1]);
				}
			} else {
				// record<ByteString, ByteString>
				for (const key of Object.keys(init)) {
					const value = init[key];
					this.append(key, value);
				}
			}
		} else {
			throw new TypeError('Provided initializer must be an object');
		}
	}

	/**
  * Return combined header value given name
  *
  * @param   String  name  Header name
  * @return  Mixed
  */
	get(name) {
		name = `${name}`;
		validateName(name);
		const key = find(this[MAP], name);
		if (key === undefined) {
			return null;
		}

		return this[MAP][key].join(', ');
	}

	/**
  * Iterate over all headers
  *
  * @param   Function  callback  Executed for each item with parameters (value, name, thisArg)
  * @param   Boolean   thisArg   `this` context for callback function
  * @return  Void
  */
	forEach(callback) {
		let thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

		let pairs = getHeaders(this);
		let i = 0;
		while (i < pairs.length) {
			var _pairs$i = pairs[i];
			const name = _pairs$i[0],
			      value = _pairs$i[1];

			callback.call(thisArg, value, name, this);
			pairs = getHeaders(this);
			i++;
		}
	}

	/**
  * Overwrite header values given name
  *
  * @param   String  name   Header name
  * @param   String  value  Header value
  * @return  Void
  */
	set(name, value) {
		name = `${name}`;
		value = `${value}`;
		validateName(name);
		validateValue(value);
		const key = find(this[MAP], name);
		this[MAP][key !== undefined ? key : name] = [value];
	}

	/**
  * Append a value onto existing header
  *
  * @param   String  name   Header name
  * @param   String  value  Header value
  * @return  Void
  */
	append(name, value) {
		name = `${name}`;
		value = `${value}`;
		validateName(name);
		validateValue(value);
		const key = find(this[MAP], name);
		if (key !== undefined) {
			this[MAP][key].push(value);
		} else {
			this[MAP][name] = [value];
		}
	}

	/**
  * Check for header name existence
  *
  * @param   String   name  Header name
  * @return  Boolean
  */
	has(name) {
		name = `${name}`;
		validateName(name);
		return find(this[MAP], name) !== undefined;
	}

	/**
  * Delete all header values given name
  *
  * @param   String  name  Header name
  * @return  Void
  */
	delete(name) {
		name = `${name}`;
		validateName(name);
		const key = find(this[MAP], name);
		if (key !== undefined) {
			delete this[MAP][key];
		}
	}

	/**
  * Return raw headers (non-spec api)
  *
  * @return  Object
  */
	raw() {
		return this[MAP];
	}

	/**
  * Get an iterator on keys.
  *
  * @return  Iterator
  */
	keys() {
		return createHeadersIterator(this, 'key');
	}

	/**
  * Get an iterator on values.
  *
  * @return  Iterator
  */
	values() {
		return createHeadersIterator(this, 'value');
	}

	/**
  * Get an iterator on entries.
  *
  * This is the default iterator of the Headers object.
  *
  * @return  Iterator
  */
	[Symbol.iterator]() {
		return createHeadersIterator(this, 'key+value');
	}
}
Headers.prototype.entries = Headers.prototype[Symbol.iterator];

Object.defineProperty(Headers.prototype, Symbol.toStringTag, {
	value: 'Headers',
	writable: false,
	enumerable: false,
	configurable: true
});

Object.defineProperties(Headers.prototype, {
	get: { enumerable: true },
	forEach: { enumerable: true },
	set: { enumerable: true },
	append: { enumerable: true },
	has: { enumerable: true },
	delete: { enumerable: true },
	keys: { enumerable: true },
	values: { enumerable: true },
	entries: { enumerable: true }
});

function getHeaders(headers) {
	let kind = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'key+value';

	const keys = Object.keys(headers[MAP]).sort();
	return keys.map(kind === 'key' ? function (k) {
		return k.toLowerCase();
	} : kind === 'value' ? function (k) {
		return headers[MAP][k].join(', ');
	} : function (k) {
		return [k.toLowerCase(), headers[MAP][k].join(', ')];
	});
}

const INTERNAL = Symbol('internal');

function createHeadersIterator(target, kind) {
	const iterator = Object.create(HeadersIteratorPrototype);
	iterator[INTERNAL] = {
		target,
		kind,
		index: 0
	};
	return iterator;
}

const HeadersIteratorPrototype = Object.setPrototypeOf({
	next() {
		// istanbul ignore if
		if (!this || Object.getPrototypeOf(this) !== HeadersIteratorPrototype) {
			throw new TypeError('Value of `this` is not a HeadersIterator');
		}

		var _INTERNAL = this[INTERNAL];
		const target = _INTERNAL.target,
		      kind = _INTERNAL.kind,
		      index = _INTERNAL.index;

		const values = getHeaders(target, kind);
		const len = values.length;
		if (index >= len) {
			return {
				value: undefined,
				done: true
			};
		}

		this[INTERNAL].index = index + 1;

		return {
			value: values[index],
			done: false
		};
	}
}, Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]())));

Object.defineProperty(HeadersIteratorPrototype, Symbol.toStringTag, {
	value: 'HeadersIterator',
	writable: false,
	enumerable: false,
	configurable: true
});

/**
 * Export the Headers object in a form that Node.js can consume.
 *
 * @param   Headers  headers
 * @return  Object
 */
function exportNodeCompatibleHeaders(headers) {
	const obj = Object.assign({ __proto__: null }, headers[MAP]);

	// http.request() only supports string as Host header. This hack makes
	// specifying custom Host header possible.
	const hostHeaderKey = find(headers[MAP], 'Host');
	if (hostHeaderKey !== undefined) {
		obj[hostHeaderKey] = obj[hostHeaderKey][0];
	}

	return obj;
}

/**
 * Create a Headers object from an object of headers, ignoring those that do
 * not conform to HTTP grammar productions.
 *
 * @param   Object  obj  Object of headers
 * @return  Headers
 */
function createHeadersLenient(obj) {
	const headers = new Headers();
	for (const name of Object.keys(obj)) {
		if (invalidTokenRegex.test(name)) {
			continue;
		}
		if (Array.isArray(obj[name])) {
			for (const val of obj[name]) {
				if (invalidHeaderCharRegex.test(val)) {
					continue;
				}
				if (headers[MAP][name] === undefined) {
					headers[MAP][name] = [val];
				} else {
					headers[MAP][name].push(val);
				}
			}
		} else if (!invalidHeaderCharRegex.test(obj[name])) {
			headers[MAP][name] = [obj[name]];
		}
	}
	return headers;
}

const INTERNALS$1 = Symbol('Response internals');

// fix an issue where "STATUS_CODES" aren't a named export for node <10
const STATUS_CODES = http.STATUS_CODES;

/**
 * Response class
 *
 * @param   Stream  body  Readable stream
 * @param   Object  opts  Response options
 * @return  Void
 */
class Response {
	constructor() {
		let body = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
		let opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		Body.call(this, body, opts);

		const status = opts.status || 200;
		const headers = new Headers(opts.headers);

		if (body != null && !headers.has('Content-Type')) {
			const contentType = extractContentType(body);
			if (contentType) {
				headers.append('Content-Type', contentType);
			}
		}

		this[INTERNALS$1] = {
			url: opts.url,
			status,
			statusText: opts.statusText || STATUS_CODES[status],
			headers,
			counter: opts.counter
		};
	}

	get url() {
		return this[INTERNALS$1].url || '';
	}

	get status() {
		return this[INTERNALS$1].status;
	}

	/**
  * Convenience property representing if the request ended normally
  */
	get ok() {
		return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
	}

	get redirected() {
		return this[INTERNALS$1].counter > 0;
	}

	get statusText() {
		return this[INTERNALS$1].statusText;
	}

	get headers() {
		return this[INTERNALS$1].headers;
	}

	/**
  * Clone this response
  *
  * @return  Response
  */
	clone() {
		return new Response(clone(this), {
			url: this.url,
			status: this.status,
			statusText: this.statusText,
			headers: this.headers,
			ok: this.ok,
			redirected: this.redirected
		});
	}
}

Body.mixIn(Response.prototype);

Object.defineProperties(Response.prototype, {
	url: { enumerable: true },
	status: { enumerable: true },
	ok: { enumerable: true },
	redirected: { enumerable: true },
	statusText: { enumerable: true },
	headers: { enumerable: true },
	clone: { enumerable: true }
});

Object.defineProperty(Response.prototype, Symbol.toStringTag, {
	value: 'Response',
	writable: false,
	enumerable: false,
	configurable: true
});

const INTERNALS$2 = Symbol('Request internals');

// fix an issue where "format", "parse" aren't a named export for node <10
const parse_url = Url.parse;
const format_url = Url.format;

const streamDestructionSupported = 'destroy' in Stream.Readable.prototype;

/**
 * Check if a value is an instance of Request.
 *
 * @param   Mixed   input
 * @return  Boolean
 */
function isRequest(input) {
	return typeof input === 'object' && typeof input[INTERNALS$2] === 'object';
}

function isAbortSignal(signal) {
	const proto = signal && typeof signal === 'object' && Object.getPrototypeOf(signal);
	return !!(proto && proto.constructor.name === 'AbortSignal');
}

/**
 * Request class
 *
 * @param   Mixed   input  Url or Request instance
 * @param   Object  init   Custom options
 * @return  Void
 */
class Request {
	constructor(input) {
		let init = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		let parsedURL;

		// normalize input
		if (!isRequest(input)) {
			if (input && input.href) {
				// in order to support Node.js' Url objects; though WHATWG's URL objects
				// will fall into this branch also (since their `toString()` will return
				// `href` property anyway)
				parsedURL = parse_url(input.href);
			} else {
				// coerce input to a string before attempting to parse
				parsedURL = parse_url(`${input}`);
			}
			input = {};
		} else {
			parsedURL = parse_url(input.url);
		}

		let method = init.method || input.method || 'GET';
		method = method.toUpperCase();

		if ((init.body != null || isRequest(input) && input.body !== null) && (method === 'GET' || method === 'HEAD')) {
			throw new TypeError('Request with GET/HEAD method cannot have body');
		}

		let inputBody = init.body != null ? init.body : isRequest(input) && input.body !== null ? clone(input) : null;

		Body.call(this, inputBody, {
			timeout: init.timeout || input.timeout || 0,
			size: init.size || input.size || 0
		});

		const headers = new Headers(init.headers || input.headers || {});

		if (inputBody != null && !headers.has('Content-Type')) {
			const contentType = extractContentType(inputBody);
			if (contentType) {
				headers.append('Content-Type', contentType);
			}
		}

		let signal = isRequest(input) ? input.signal : null;
		if ('signal' in init) signal = init.signal;

		if (signal != null && !isAbortSignal(signal)) {
			throw new TypeError('Expected signal to be an instanceof AbortSignal');
		}

		this[INTERNALS$2] = {
			method,
			redirect: init.redirect || input.redirect || 'follow',
			headers,
			parsedURL,
			signal
		};

		// node-fetch-only options
		this.follow = init.follow !== undefined ? init.follow : input.follow !== undefined ? input.follow : 20;
		this.compress = init.compress !== undefined ? init.compress : input.compress !== undefined ? input.compress : true;
		this.counter = init.counter || input.counter || 0;
		this.agent = init.agent || input.agent;
	}

	get method() {
		return this[INTERNALS$2].method;
	}

	get url() {
		return format_url(this[INTERNALS$2].parsedURL);
	}

	get headers() {
		return this[INTERNALS$2].headers;
	}

	get redirect() {
		return this[INTERNALS$2].redirect;
	}

	get signal() {
		return this[INTERNALS$2].signal;
	}

	/**
  * Clone this request
  *
  * @return  Request
  */
	clone() {
		return new Request(this);
	}
}

Body.mixIn(Request.prototype);

Object.defineProperty(Request.prototype, Symbol.toStringTag, {
	value: 'Request',
	writable: false,
	enumerable: false,
	configurable: true
});

Object.defineProperties(Request.prototype, {
	method: { enumerable: true },
	url: { enumerable: true },
	headers: { enumerable: true },
	redirect: { enumerable: true },
	clone: { enumerable: true },
	signal: { enumerable: true }
});

/**
 * Convert a Request to Node.js http request options.
 *
 * @param   Request  A Request instance
 * @return  Object   The options object to be passed to http.request
 */
function getNodeRequestOptions(request) {
	const parsedURL = request[INTERNALS$2].parsedURL;
	const headers = new Headers(request[INTERNALS$2].headers);

	// fetch step 1.3
	if (!headers.has('Accept')) {
		headers.set('Accept', '*/*');
	}

	// Basic fetch
	if (!parsedURL.protocol || !parsedURL.hostname) {
		throw new TypeError('Only absolute URLs are supported');
	}

	if (!/^https?:$/.test(parsedURL.protocol)) {
		throw new TypeError('Only HTTP(S) protocols are supported');
	}

	if (request.signal && request.body instanceof Stream.Readable && !streamDestructionSupported) {
		throw new Error('Cancellation of streamed requests with AbortSignal is not supported in node < 8');
	}

	// HTTP-network-or-cache fetch steps 2.4-2.7
	let contentLengthValue = null;
	if (request.body == null && /^(POST|PUT)$/i.test(request.method)) {
		contentLengthValue = '0';
	}
	if (request.body != null) {
		const totalBytes = getTotalBytes(request);
		if (typeof totalBytes === 'number') {
			contentLengthValue = String(totalBytes);
		}
	}
	if (contentLengthValue) {
		headers.set('Content-Length', contentLengthValue);
	}

	// HTTP-network-or-cache fetch step 2.11
	if (!headers.has('User-Agent')) {
		headers.set('User-Agent', 'node-fetch/1.0 (+https://github.com/bitinn/node-fetch)');
	}

	// HTTP-network-or-cache fetch step 2.15
	if (request.compress && !headers.has('Accept-Encoding')) {
		headers.set('Accept-Encoding', 'gzip,deflate');
	}

	let agent = request.agent;
	if (typeof agent === 'function') {
		agent = agent(parsedURL);
	}

	if (!headers.has('Connection') && !agent) {
		headers.set('Connection', 'close');
	}

	// HTTP-network fetch step 4.2
	// chunked encoding is handled by Node.js

	return Object.assign({}, parsedURL, {
		method: request.method,
		headers: exportNodeCompatibleHeaders(headers),
		agent
	});
}

/**
 * abort-error.js
 *
 * AbortError interface for cancelled requests
 */

/**
 * Create AbortError instance
 *
 * @param   String      message      Error message for human
 * @return  AbortError
 */
function AbortError(message) {
  Error.call(this, message);

  this.type = 'aborted';
  this.message = message;

  // hide custom error implementation details from end-users
  Error.captureStackTrace(this, this.constructor);
}

AbortError.prototype = Object.create(Error.prototype);
AbortError.prototype.constructor = AbortError;
AbortError.prototype.name = 'AbortError';

// fix an issue where "PassThrough", "resolve" aren't a named export for node <10
const PassThrough$1 = Stream.PassThrough;
const resolve_url = Url.resolve;

/**
 * Fetch function
 *
 * @param   Mixed    url   Absolute url or Request instance
 * @param   Object   opts  Fetch options
 * @return  Promise
 */
function fetch(url, opts) {

	// allow custom promise
	if (!fetch.Promise) {
		throw new Error('native promise missing, set fetch.Promise to your favorite alternative');
	}

	Body.Promise = fetch.Promise;

	// wrap http.request into fetch
	return new fetch.Promise(function (resolve, reject) {
		// build request object
		const request = new Request(url, opts);
		const options = getNodeRequestOptions(request);

		const send = (options.protocol === 'https:' ? https : http).request;
		const signal = request.signal;

		let response = null;

		const abort = function abort() {
			let error = new AbortError('The user aborted a request.');
			reject(error);
			if (request.body && request.body instanceof Stream.Readable) {
				request.body.destroy(error);
			}
			if (!response || !response.body) return;
			response.body.emit('error', error);
		};

		if (signal && signal.aborted) {
			abort();
			return;
		}

		const abortAndFinalize = function abortAndFinalize() {
			abort();
			finalize();
		};

		// send request
		const req = send(options);
		let reqTimeout;

		if (signal) {
			signal.addEventListener('abort', abortAndFinalize);
		}

		function finalize() {
			req.abort();
			if (signal) signal.removeEventListener('abort', abortAndFinalize);
			clearTimeout(reqTimeout);
		}

		if (request.timeout) {
			req.once('socket', function (socket) {
				reqTimeout = setTimeout(function () {
					reject(new FetchError(`network timeout at: ${request.url}`, 'request-timeout'));
					finalize();
				}, request.timeout);
			});
		}

		req.on('error', function (err) {
			reject(new FetchError(`request to ${request.url} failed, reason: ${err.message}`, 'system', err));
			finalize();
		});

		req.on('response', function (res) {
			clearTimeout(reqTimeout);

			const headers = createHeadersLenient(res.headers);

			// HTTP fetch step 5
			if (fetch.isRedirect(res.statusCode)) {
				// HTTP fetch step 5.2
				const location = headers.get('Location');

				// HTTP fetch step 5.3
				const locationURL = location === null ? null : resolve_url(request.url, location);

				// HTTP fetch step 5.5
				switch (request.redirect) {
					case 'error':
						reject(new FetchError(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, 'no-redirect'));
						finalize();
						return;
					case 'manual':
						// node-fetch-specific step: make manual redirect a bit easier to use by setting the Location header value to the resolved URL.
						if (locationURL !== null) {
							// handle corrupted header
							try {
								headers.set('Location', locationURL);
							} catch (err) {
								// istanbul ignore next: nodejs server prevent invalid response headers, we can't test this through normal request
								reject(err);
							}
						}
						break;
					case 'follow':
						// HTTP-redirect fetch step 2
						if (locationURL === null) {
							break;
						}

						// HTTP-redirect fetch step 5
						if (request.counter >= request.follow) {
							reject(new FetchError(`maximum redirect reached at: ${request.url}`, 'max-redirect'));
							finalize();
							return;
						}

						// HTTP-redirect fetch step 6 (counter increment)
						// Create a new Request object.
						const requestOpts = {
							headers: new Headers(request.headers),
							follow: request.follow,
							counter: request.counter + 1,
							agent: request.agent,
							compress: request.compress,
							method: request.method,
							body: request.body,
							signal: request.signal,
							timeout: request.timeout,
							size: request.size
						};

						// HTTP-redirect fetch step 9
						if (res.statusCode !== 303 && request.body && getTotalBytes(request) === null) {
							reject(new FetchError('Cannot follow redirect with body being a readable stream', 'unsupported-redirect'));
							finalize();
							return;
						}

						// HTTP-redirect fetch step 11
						if (res.statusCode === 303 || (res.statusCode === 301 || res.statusCode === 302) && request.method === 'POST') {
							requestOpts.method = 'GET';
							requestOpts.body = undefined;
							requestOpts.headers.delete('content-length');
						}

						// HTTP-redirect fetch step 15
						resolve(fetch(new Request(locationURL, requestOpts)));
						finalize();
						return;
				}
			}

			// prepare response
			res.once('end', function () {
				if (signal) signal.removeEventListener('abort', abortAndFinalize);
			});
			let body = res.pipe(new PassThrough$1());

			const response_options = {
				url: request.url,
				status: res.statusCode,
				statusText: res.statusMessage,
				headers: headers,
				size: request.size,
				timeout: request.timeout,
				counter: request.counter
			};

			// HTTP-network fetch step 12.1.1.3
			const codings = headers.get('Content-Encoding');

			// HTTP-network fetch step 12.1.1.4: handle content codings

			// in following scenarios we ignore compression support
			// 1. compression support is disabled
			// 2. HEAD request
			// 3. no Content-Encoding header
			// 4. no content response (204)
			// 5. content not modified response (304)
			if (!request.compress || request.method === 'HEAD' || codings === null || res.statusCode === 204 || res.statusCode === 304) {
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// For Node v6+
			// Be less strict when decoding compressed responses, since sometimes
			// servers send slightly invalid responses that are still accepted
			// by common browsers.
			// Always using Z_SYNC_FLUSH is what cURL does.
			const zlibOptions = {
				flush: zlib.Z_SYNC_FLUSH,
				finishFlush: zlib.Z_SYNC_FLUSH
			};

			// for gzip
			if (codings == 'gzip' || codings == 'x-gzip') {
				body = body.pipe(zlib.createGunzip(zlibOptions));
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// for deflate
			if (codings == 'deflate' || codings == 'x-deflate') {
				// handle the infamous raw deflate response from old servers
				// a hack for old IIS and Apache servers
				const raw = res.pipe(new PassThrough$1());
				raw.once('data', function (chunk) {
					// see http://stackoverflow.com/questions/37519828
					if ((chunk[0] & 0x0F) === 0x08) {
						body = body.pipe(zlib.createInflate());
					} else {
						body = body.pipe(zlib.createInflateRaw());
					}
					response = new Response(body, response_options);
					resolve(response);
				});
				return;
			}

			// for br
			if (codings == 'br' && typeof zlib.createBrotliDecompress === 'function') {
				body = body.pipe(zlib.createBrotliDecompress());
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// otherwise, use response as-is
			response = new Response(body, response_options);
			resolve(response);
		});

		writeToStream(req, request);
	});
}
/**
 * Redirect code matching
 *
 * @param   Number   code  Status code
 * @return  Boolean
 */
fetch.isRedirect = function (code) {
	return code === 301 || code === 302 || code === 303 || code === 307 || code === 308;
};

// expose Promise
fetch.Promise = global.Promise;

module.exports = exports = fetch;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports;
exports.Headers = Headers;
exports.Request = Request;
exports.Response = Response;
exports.FetchError = FetchError;


/***/ }),

/***/ 463:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var deprecation = __webpack_require__(692);
var once = _interopDefault(__webpack_require__(49));

const logOnceCode = once(deprecation => console.warn(deprecation));
const logOnceHeaders = once(deprecation => console.warn(deprecation));
/**
 * Error with extra properties to help with debugging
 */

class RequestError extends Error {
  constructor(message, statusCode, options) {
    super(message); // Maintains proper stack trace (only available on V8)

    /* istanbul ignore next */

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }

    this.name = "HttpError";
    this.status = statusCode;
    let headers;

    if ("headers" in options && typeof options.headers !== "undefined") {
      headers = options.headers;
    }

    if ("response" in options) {
      this.response = options.response;
      headers = options.response.headers;
    } // redact request credentials without mutating original request options


    const requestCopy = Object.assign({}, options.request);

    if (options.request.headers.authorization) {
      requestCopy.headers = Object.assign({}, options.request.headers, {
        authorization: options.request.headers.authorization.replace(/ .*$/, " [REDACTED]")
      });
    }

    requestCopy.url = requestCopy.url // client_id & client_secret can be passed as URL query parameters to increase rate limit
    // see https://developer.github.com/v3/#increasing-the-unauthenticated-rate-limit-for-oauth-applications
    .replace(/\bclient_secret=\w+/g, "client_secret=[REDACTED]") // OAuth tokens can be passed as URL query parameters, although it is not recommended
    // see https://developer.github.com/v3/#oauth2-token-sent-in-a-header
    .replace(/\baccess_token=\w+/g, "access_token=[REDACTED]");
    this.request = requestCopy; // deprecations

    Object.defineProperty(this, "code", {
      get() {
        logOnceCode(new deprecation.Deprecation("[@octokit/request-error] `error.code` is deprecated, use `error.status`."));
        return statusCode;
      }

    });
    Object.defineProperty(this, "headers", {
      get() {
        logOnceHeaders(new deprecation.Deprecation("[@octokit/request-error] `error.headers` is deprecated, use `error.response.headers`."));
        return headers || {};
      }

    });
  }

}

exports.RequestError = RequestError;
//# sourceMappingURL=index.js.map


/***/ }),

/***/ 469:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOctokit = exports.context = void 0;
const Context = __importStar(__webpack_require__(262));
const utils_1 = __webpack_require__(521);
exports.context = new Context.Context();
/**
 * Returns a hydrated octokit ready to use for GitHub Actions
 *
 * @param     token    the repo PAT or GITHUB_TOKEN
 * @param     options  other options to set
 */
function getOctokit(token, options) {
    return new utils_1.GitHub(utils_1.getOctokitOptions(token, options));
}
exports.getOctokit = getOctokit;
//# sourceMappingURL=github.js.map

/***/ }),

/***/ 470:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getState = exports.saveState = exports.group = exports.endGroup = exports.startGroup = exports.info = exports.warning = exports.error = exports.debug = exports.isDebug = exports.setFailed = exports.setCommandEcho = exports.setOutput = exports.getBooleanInput = exports.getMultilineInput = exports.getInput = exports.addPath = exports.setSecret = exports.exportVariable = exports.ExitCode = void 0;
const command_1 = __webpack_require__(431);
const file_command_1 = __webpack_require__(102);
const utils_1 = __webpack_require__(82);
const os = __importStar(__webpack_require__(87));
const path = __importStar(__webpack_require__(622));
/**
 * The code to exit an action
 */
var ExitCode;
(function (ExitCode) {
    /**
     * A code indicating that the action was successful
     */
    ExitCode[ExitCode["Success"] = 0] = "Success";
    /**
     * A code indicating that the action was a failure
     */
    ExitCode[ExitCode["Failure"] = 1] = "Failure";
})(ExitCode = exports.ExitCode || (exports.ExitCode = {}));
//-----------------------------------------------------------------------
// Variables
//-----------------------------------------------------------------------
/**
 * Sets env variable for this action and future actions in the job
 * @param name the name of the variable to set
 * @param val the value of the variable. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function exportVariable(name, val) {
    const convertedVal = utils_1.toCommandValue(val);
    process.env[name] = convertedVal;
    const filePath = process.env['GITHUB_ENV'] || '';
    if (filePath) {
        const delimiter = '_GitHubActionsFileCommandDelimeter_';
        const commandValue = `${name}<<${delimiter}${os.EOL}${convertedVal}${os.EOL}${delimiter}`;
        file_command_1.issueCommand('ENV', commandValue);
    }
    else {
        command_1.issueCommand('set-env', { name }, convertedVal);
    }
}
exports.exportVariable = exportVariable;
/**
 * Registers a secret which will get masked from logs
 * @param secret value of the secret
 */
function setSecret(secret) {
    command_1.issueCommand('add-mask', {}, secret);
}
exports.setSecret = setSecret;
/**
 * Prepends inputPath to the PATH (for this action and future actions)
 * @param inputPath
 */
function addPath(inputPath) {
    const filePath = process.env['GITHUB_PATH'] || '';
    if (filePath) {
        file_command_1.issueCommand('PATH', inputPath);
    }
    else {
        command_1.issueCommand('add-path', {}, inputPath);
    }
    process.env['PATH'] = `${inputPath}${path.delimiter}${process.env['PATH']}`;
}
exports.addPath = addPath;
/**
 * Gets the value of an input.
 * Unless trimWhitespace is set to false in InputOptions, the value is also trimmed.
 * Returns an empty string if the value is not defined.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string
 */
function getInput(name, options) {
    const val = process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] || '';
    if (options && options.required && !val) {
        throw new Error(`Input required and not supplied: ${name}`);
    }
    if (options && options.trimWhitespace === false) {
        return val;
    }
    return val.trim();
}
exports.getInput = getInput;
/**
 * Gets the values of an multiline input.  Each value is also trimmed.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string[]
 *
 */
function getMultilineInput(name, options) {
    const inputs = getInput(name, options)
        .split('\n')
        .filter(x => x !== '');
    return inputs;
}
exports.getMultilineInput = getMultilineInput;
/**
 * Gets the input value of the boolean type in the YAML 1.2 "core schema" specification.
 * Support boolean input list: `true | True | TRUE | false | False | FALSE` .
 * The return value is also in boolean type.
 * ref: https://yaml.org/spec/1.2/spec.html#id2804923
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   boolean
 */
function getBooleanInput(name, options) {
    const trueValue = ['true', 'True', 'TRUE'];
    const falseValue = ['false', 'False', 'FALSE'];
    const val = getInput(name, options);
    if (trueValue.includes(val))
        return true;
    if (falseValue.includes(val))
        return false;
    throw new TypeError(`Input does not meet YAML 1.2 "Core Schema" specification: ${name}\n` +
        `Support boolean input list: \`true | True | TRUE | false | False | FALSE\``);
}
exports.getBooleanInput = getBooleanInput;
/**
 * Sets the value of an output.
 *
 * @param     name     name of the output to set
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setOutput(name, value) {
    process.stdout.write(os.EOL);
    command_1.issueCommand('set-output', { name }, value);
}
exports.setOutput = setOutput;
/**
 * Enables or disables the echoing of commands into stdout for the rest of the step.
 * Echoing is disabled by default if ACTIONS_STEP_DEBUG is not set.
 *
 */
function setCommandEcho(enabled) {
    command_1.issue('echo', enabled ? 'on' : 'off');
}
exports.setCommandEcho = setCommandEcho;
//-----------------------------------------------------------------------
// Results
//-----------------------------------------------------------------------
/**
 * Sets the action status to failed.
 * When the action exits it will be with an exit code of 1
 * @param message add error issue message
 */
function setFailed(message) {
    process.exitCode = ExitCode.Failure;
    error(message);
}
exports.setFailed = setFailed;
//-----------------------------------------------------------------------
// Logging Commands
//-----------------------------------------------------------------------
/**
 * Gets whether Actions Step Debug is on or not
 */
function isDebug() {
    return process.env['RUNNER_DEBUG'] === '1';
}
exports.isDebug = isDebug;
/**
 * Writes debug message to user log
 * @param message debug message
 */
function debug(message) {
    command_1.issueCommand('debug', {}, message);
}
exports.debug = debug;
/**
 * Adds an error issue
 * @param message error issue message. Errors will be converted to string via toString()
 */
function error(message) {
    command_1.issue('error', message instanceof Error ? message.toString() : message);
}
exports.error = error;
/**
 * Adds an warning issue
 * @param message warning issue message. Errors will be converted to string via toString()
 */
function warning(message) {
    command_1.issue('warning', message instanceof Error ? message.toString() : message);
}
exports.warning = warning;
/**
 * Writes info to log with console.log.
 * @param message info message
 */
function info(message) {
    process.stdout.write(message + os.EOL);
}
exports.info = info;
/**
 * Begin an output group.
 *
 * Output until the next `groupEnd` will be foldable in this group
 *
 * @param name The name of the output group
 */
function startGroup(name) {
    command_1.issue('group', name);
}
exports.startGroup = startGroup;
/**
 * End an output group.
 */
function endGroup() {
    command_1.issue('endgroup');
}
exports.endGroup = endGroup;
/**
 * Wrap an asynchronous function call in a group.
 *
 * Returns the same type as the function itself.
 *
 * @param name The name of the group
 * @param fn The function to wrap in the group
 */
function group(name, fn) {
    return __awaiter(this, void 0, void 0, function* () {
        startGroup(name);
        let result;
        try {
            result = yield fn();
        }
        finally {
            endGroup();
        }
        return result;
    });
}
exports.group = group;
//-----------------------------------------------------------------------
// Wrapper action state
//-----------------------------------------------------------------------
/**
 * Saves state for current action, the state can only be retrieved by this action's post job execution.
 *
 * @param     name     name of the state to store
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function saveState(name, value) {
    command_1.issueCommand('save-state', { name }, value);
}
exports.saveState = saveState;
/**
 * Gets the value of an state set by this action's main execution.
 *
 * @param     name     name of the state to get
 * @returns   string
 */
function getState(name) {
    return process.env[`STATE_${name}`] || '';
}
exports.getState = getState;
//# sourceMappingURL=core.js.map

/***/ }),

/***/ 510:
/***/ (function(module) {

module.exports = addHook;

function addHook(state, kind, name, hook) {
  var orig = hook;
  if (!state.registry[name]) {
    state.registry[name] = [];
  }

  if (kind === "before") {
    hook = function (method, options) {
      return Promise.resolve()
        .then(orig.bind(null, options))
        .then(method.bind(null, options));
    };
  }

  if (kind === "after") {
    hook = function (method, options) {
      var result;
      return Promise.resolve()
        .then(method.bind(null, options))
        .then(function (result_) {
          result = result_;
          return orig(result, options);
        })
        .then(function () {
          return result;
        });
    };
  }

  if (kind === "error") {
    hook = function (method, options) {
      return Promise.resolve()
        .then(method.bind(null, options))
        .catch(function (error) {
          return orig(error, options);
        });
    };
  }

  state.registry[name].push({
    hook: hook,
    orig: orig,
  });
}


/***/ }),

/***/ 521:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOctokitOptions = exports.GitHub = exports.context = void 0;
const Context = __importStar(__webpack_require__(262));
const Utils = __importStar(__webpack_require__(127));
// octokit + plugins
const core_1 = __webpack_require__(448);
const plugin_rest_endpoint_methods_1 = __webpack_require__(842);
const plugin_paginate_rest_1 = __webpack_require__(299);
exports.context = new Context.Context();
const baseUrl = Utils.getApiBaseUrl();
const defaults = {
    baseUrl,
    request: {
        agent: Utils.getProxyAgent(baseUrl)
    }
};
exports.GitHub = core_1.Octokit.plugin(plugin_rest_endpoint_methods_1.restEndpointMethods, plugin_paginate_rest_1.paginateRest).defaults(defaults);
/**
 * Convience function to correctly format Octokit Options to pass into the constructor.
 *
 * @param     token    the repo PAT or GITHUB_TOKEN
 * @param     options  other options to set
 */
function getOctokitOptions(token, options) {
    const opts = Object.assign({}, options || {}); // Shallow clone - don't mutate the object provided by the caller
    // Auth
    const auth = Utils.getAuthString(token, opts);
    if (auth) {
        opts.auth = auth;
    }
    return opts;
}
exports.getOctokitOptions = getOctokitOptions;
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ 523:
/***/ (function(module, __unusedexports, __webpack_require__) {

var register = __webpack_require__(280)
var addHook = __webpack_require__(510)
var removeHook = __webpack_require__(866)

// bind with array of arguments: https://stackoverflow.com/a/21792913
var bind = Function.bind
var bindable = bind.bind(bind)

function bindApi (hook, state, name) {
  var removeHookRef = bindable(removeHook, null).apply(null, name ? [state, name] : [state])
  hook.api = { remove: removeHookRef }
  hook.remove = removeHookRef

  ;['before', 'error', 'after', 'wrap'].forEach(function (kind) {
    var args = name ? [state, kind, name] : [state, kind]
    hook[kind] = hook.api[kind] = bindable(addHook, null).apply(null, args)
  })
}

function HookSingular () {
  var singularHookName = 'h'
  var singularHookState = {
    registry: {}
  }
  var singularHook = register.bind(null, singularHookState, singularHookName)
  bindApi(singularHook, singularHookState, singularHookName)
  return singularHook
}

function HookCollection () {
  var state = {
    registry: {}
  }

  var hook = register.bind(null, state)
  bindApi(hook, state)

  return hook
}

var collectionHookDeprecationMessageDisplayed = false
function Hook () {
  if (!collectionHookDeprecationMessageDisplayed) {
    console.warn('[before-after-hook]: "Hook()" repurposing warning, use "Hook.Collection()". Read more: https://git.io/upgrade-before-after-hook-to-1.4')
    collectionHookDeprecationMessageDisplayed = true
  }
  return HookCollection()
}

Hook.Singular = HookSingular.bind()
Hook.Collection = HookCollection.bind()

module.exports = Hook
// expose constructors as a named property for TypeScript
module.exports.Hook = Hook
module.exports.Singular = Hook.Singular
module.exports.Collection = Hook.Collection


/***/ }),

/***/ 539:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const http = __webpack_require__(605);
const https = __webpack_require__(211);
const pm = __webpack_require__(950);
let tunnel;
var HttpCodes;
(function (HttpCodes) {
    HttpCodes[HttpCodes["OK"] = 200] = "OK";
    HttpCodes[HttpCodes["MultipleChoices"] = 300] = "MultipleChoices";
    HttpCodes[HttpCodes["MovedPermanently"] = 301] = "MovedPermanently";
    HttpCodes[HttpCodes["ResourceMoved"] = 302] = "ResourceMoved";
    HttpCodes[HttpCodes["SeeOther"] = 303] = "SeeOther";
    HttpCodes[HttpCodes["NotModified"] = 304] = "NotModified";
    HttpCodes[HttpCodes["UseProxy"] = 305] = "UseProxy";
    HttpCodes[HttpCodes["SwitchProxy"] = 306] = "SwitchProxy";
    HttpCodes[HttpCodes["TemporaryRedirect"] = 307] = "TemporaryRedirect";
    HttpCodes[HttpCodes["PermanentRedirect"] = 308] = "PermanentRedirect";
    HttpCodes[HttpCodes["BadRequest"] = 400] = "BadRequest";
    HttpCodes[HttpCodes["Unauthorized"] = 401] = "Unauthorized";
    HttpCodes[HttpCodes["PaymentRequired"] = 402] = "PaymentRequired";
    HttpCodes[HttpCodes["Forbidden"] = 403] = "Forbidden";
    HttpCodes[HttpCodes["NotFound"] = 404] = "NotFound";
    HttpCodes[HttpCodes["MethodNotAllowed"] = 405] = "MethodNotAllowed";
    HttpCodes[HttpCodes["NotAcceptable"] = 406] = "NotAcceptable";
    HttpCodes[HttpCodes["ProxyAuthenticationRequired"] = 407] = "ProxyAuthenticationRequired";
    HttpCodes[HttpCodes["RequestTimeout"] = 408] = "RequestTimeout";
    HttpCodes[HttpCodes["Conflict"] = 409] = "Conflict";
    HttpCodes[HttpCodes["Gone"] = 410] = "Gone";
    HttpCodes[HttpCodes["TooManyRequests"] = 429] = "TooManyRequests";
    HttpCodes[HttpCodes["InternalServerError"] = 500] = "InternalServerError";
    HttpCodes[HttpCodes["NotImplemented"] = 501] = "NotImplemented";
    HttpCodes[HttpCodes["BadGateway"] = 502] = "BadGateway";
    HttpCodes[HttpCodes["ServiceUnavailable"] = 503] = "ServiceUnavailable";
    HttpCodes[HttpCodes["GatewayTimeout"] = 504] = "GatewayTimeout";
})(HttpCodes = exports.HttpCodes || (exports.HttpCodes = {}));
var Headers;
(function (Headers) {
    Headers["Accept"] = "accept";
    Headers["ContentType"] = "content-type";
})(Headers = exports.Headers || (exports.Headers = {}));
var MediaTypes;
(function (MediaTypes) {
    MediaTypes["ApplicationJson"] = "application/json";
})(MediaTypes = exports.MediaTypes || (exports.MediaTypes = {}));
/**
 * Returns the proxy URL, depending upon the supplied url and proxy environment variables.
 * @param serverUrl  The server URL where the request will be sent. For example, https://api.github.com
 */
function getProxyUrl(serverUrl) {
    let proxyUrl = pm.getProxyUrl(new URL(serverUrl));
    return proxyUrl ? proxyUrl.href : '';
}
exports.getProxyUrl = getProxyUrl;
const HttpRedirectCodes = [
    HttpCodes.MovedPermanently,
    HttpCodes.ResourceMoved,
    HttpCodes.SeeOther,
    HttpCodes.TemporaryRedirect,
    HttpCodes.PermanentRedirect
];
const HttpResponseRetryCodes = [
    HttpCodes.BadGateway,
    HttpCodes.ServiceUnavailable,
    HttpCodes.GatewayTimeout
];
const RetryableHttpVerbs = ['OPTIONS', 'GET', 'DELETE', 'HEAD'];
const ExponentialBackoffCeiling = 10;
const ExponentialBackoffTimeSlice = 5;
class HttpClientError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = 'HttpClientError';
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, HttpClientError.prototype);
    }
}
exports.HttpClientError = HttpClientError;
class HttpClientResponse {
    constructor(message) {
        this.message = message;
    }
    readBody() {
        return new Promise(async (resolve, reject) => {
            let output = Buffer.alloc(0);
            this.message.on('data', (chunk) => {
                output = Buffer.concat([output, chunk]);
            });
            this.message.on('end', () => {
                resolve(output.toString());
            });
        });
    }
}
exports.HttpClientResponse = HttpClientResponse;
function isHttps(requestUrl) {
    let parsedUrl = new URL(requestUrl);
    return parsedUrl.protocol === 'https:';
}
exports.isHttps = isHttps;
class HttpClient {
    constructor(userAgent, handlers, requestOptions) {
        this._ignoreSslError = false;
        this._allowRedirects = true;
        this._allowRedirectDowngrade = false;
        this._maxRedirects = 50;
        this._allowRetries = false;
        this._maxRetries = 1;
        this._keepAlive = false;
        this._disposed = false;
        this.userAgent = userAgent;
        this.handlers = handlers || [];
        this.requestOptions = requestOptions;
        if (requestOptions) {
            if (requestOptions.ignoreSslError != null) {
                this._ignoreSslError = requestOptions.ignoreSslError;
            }
            this._socketTimeout = requestOptions.socketTimeout;
            if (requestOptions.allowRedirects != null) {
                this._allowRedirects = requestOptions.allowRedirects;
            }
            if (requestOptions.allowRedirectDowngrade != null) {
                this._allowRedirectDowngrade = requestOptions.allowRedirectDowngrade;
            }
            if (requestOptions.maxRedirects != null) {
                this._maxRedirects = Math.max(requestOptions.maxRedirects, 0);
            }
            if (requestOptions.keepAlive != null) {
                this._keepAlive = requestOptions.keepAlive;
            }
            if (requestOptions.allowRetries != null) {
                this._allowRetries = requestOptions.allowRetries;
            }
            if (requestOptions.maxRetries != null) {
                this._maxRetries = requestOptions.maxRetries;
            }
        }
    }
    options(requestUrl, additionalHeaders) {
        return this.request('OPTIONS', requestUrl, null, additionalHeaders || {});
    }
    get(requestUrl, additionalHeaders) {
        return this.request('GET', requestUrl, null, additionalHeaders || {});
    }
    del(requestUrl, additionalHeaders) {
        return this.request('DELETE', requestUrl, null, additionalHeaders || {});
    }
    post(requestUrl, data, additionalHeaders) {
        return this.request('POST', requestUrl, data, additionalHeaders || {});
    }
    patch(requestUrl, data, additionalHeaders) {
        return this.request('PATCH', requestUrl, data, additionalHeaders || {});
    }
    put(requestUrl, data, additionalHeaders) {
        return this.request('PUT', requestUrl, data, additionalHeaders || {});
    }
    head(requestUrl, additionalHeaders) {
        return this.request('HEAD', requestUrl, null, additionalHeaders || {});
    }
    sendStream(verb, requestUrl, stream, additionalHeaders) {
        return this.request(verb, requestUrl, stream, additionalHeaders);
    }
    /**
     * Gets a typed object from an endpoint
     * Be aware that not found returns a null.  Other errors (4xx, 5xx) reject the promise
     */
    async getJson(requestUrl, additionalHeaders = {}) {
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
        let res = await this.get(requestUrl, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
    }
    async postJson(requestUrl, obj, additionalHeaders = {}) {
        let data = JSON.stringify(obj, null, 2);
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
        additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
        let res = await this.post(requestUrl, data, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
    }
    async putJson(requestUrl, obj, additionalHeaders = {}) {
        let data = JSON.stringify(obj, null, 2);
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
        additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
        let res = await this.put(requestUrl, data, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
    }
    async patchJson(requestUrl, obj, additionalHeaders = {}) {
        let data = JSON.stringify(obj, null, 2);
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
        additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
        let res = await this.patch(requestUrl, data, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
    }
    /**
     * Makes a raw http request.
     * All other methods such as get, post, patch, and request ultimately call this.
     * Prefer get, del, post and patch
     */
    async request(verb, requestUrl, data, headers) {
        if (this._disposed) {
            throw new Error('Client has already been disposed.');
        }
        let parsedUrl = new URL(requestUrl);
        let info = this._prepareRequest(verb, parsedUrl, headers);
        // Only perform retries on reads since writes may not be idempotent.
        let maxTries = this._allowRetries && RetryableHttpVerbs.indexOf(verb) != -1
            ? this._maxRetries + 1
            : 1;
        let numTries = 0;
        let response;
        while (numTries < maxTries) {
            response = await this.requestRaw(info, data);
            // Check if it's an authentication challenge
            if (response &&
                response.message &&
                response.message.statusCode === HttpCodes.Unauthorized) {
                let authenticationHandler;
                for (let i = 0; i < this.handlers.length; i++) {
                    if (this.handlers[i].canHandleAuthentication(response)) {
                        authenticationHandler = this.handlers[i];
                        break;
                    }
                }
                if (authenticationHandler) {
                    return authenticationHandler.handleAuthentication(this, info, data);
                }
                else {
                    // We have received an unauthorized response but have no handlers to handle it.
                    // Let the response return to the caller.
                    return response;
                }
            }
            let redirectsRemaining = this._maxRedirects;
            while (HttpRedirectCodes.indexOf(response.message.statusCode) != -1 &&
                this._allowRedirects &&
                redirectsRemaining > 0) {
                const redirectUrl = response.message.headers['location'];
                if (!redirectUrl) {
                    // if there's no location to redirect to, we won't
                    break;
                }
                let parsedRedirectUrl = new URL(redirectUrl);
                if (parsedUrl.protocol == 'https:' &&
                    parsedUrl.protocol != parsedRedirectUrl.protocol &&
                    !this._allowRedirectDowngrade) {
                    throw new Error('Redirect from HTTPS to HTTP protocol. This downgrade is not allowed for security reasons. If you want to allow this behavior, set the allowRedirectDowngrade option to true.');
                }
                // we need to finish reading the response before reassigning response
                // which will leak the open socket.
                await response.readBody();
                // strip authorization header if redirected to a different hostname
                if (parsedRedirectUrl.hostname !== parsedUrl.hostname) {
                    for (let header in headers) {
                        // header names are case insensitive
                        if (header.toLowerCase() === 'authorization') {
                            delete headers[header];
                        }
                    }
                }
                // let's make the request with the new redirectUrl
                info = this._prepareRequest(verb, parsedRedirectUrl, headers);
                response = await this.requestRaw(info, data);
                redirectsRemaining--;
            }
            if (HttpResponseRetryCodes.indexOf(response.message.statusCode) == -1) {
                // If not a retry code, return immediately instead of retrying
                return response;
            }
            numTries += 1;
            if (numTries < maxTries) {
                await response.readBody();
                await this._performExponentialBackoff(numTries);
            }
        }
        return response;
    }
    /**
     * Needs to be called if keepAlive is set to true in request options.
     */
    dispose() {
        if (this._agent) {
            this._agent.destroy();
        }
        this._disposed = true;
    }
    /**
     * Raw request.
     * @param info
     * @param data
     */
    requestRaw(info, data) {
        return new Promise((resolve, reject) => {
            let callbackForResult = function (err, res) {
                if (err) {
                    reject(err);
                }
                resolve(res);
            };
            this.requestRawWithCallback(info, data, callbackForResult);
        });
    }
    /**
     * Raw request with callback.
     * @param info
     * @param data
     * @param onResult
     */
    requestRawWithCallback(info, data, onResult) {
        let socket;
        if (typeof data === 'string') {
            info.options.headers['Content-Length'] = Buffer.byteLength(data, 'utf8');
        }
        let callbackCalled = false;
        let handleResult = (err, res) => {
            if (!callbackCalled) {
                callbackCalled = true;
                onResult(err, res);
            }
        };
        let req = info.httpModule.request(info.options, (msg) => {
            let res = new HttpClientResponse(msg);
            handleResult(null, res);
        });
        req.on('socket', sock => {
            socket = sock;
        });
        // If we ever get disconnected, we want the socket to timeout eventually
        req.setTimeout(this._socketTimeout || 3 * 60000, () => {
            if (socket) {
                socket.end();
            }
            handleResult(new Error('Request timeout: ' + info.options.path), null);
        });
        req.on('error', function (err) {
            // err has statusCode property
            // res should have headers
            handleResult(err, null);
        });
        if (data && typeof data === 'string') {
            req.write(data, 'utf8');
        }
        if (data && typeof data !== 'string') {
            data.on('close', function () {
                req.end();
            });
            data.pipe(req);
        }
        else {
            req.end();
        }
    }
    /**
     * Gets an http agent. This function is useful when you need an http agent that handles
     * routing through a proxy server - depending upon the url and proxy environment variables.
     * @param serverUrl  The server URL where the request will be sent. For example, https://api.github.com
     */
    getAgent(serverUrl) {
        let parsedUrl = new URL(serverUrl);
        return this._getAgent(parsedUrl);
    }
    _prepareRequest(method, requestUrl, headers) {
        const info = {};
        info.parsedUrl = requestUrl;
        const usingSsl = info.parsedUrl.protocol === 'https:';
        info.httpModule = usingSsl ? https : http;
        const defaultPort = usingSsl ? 443 : 80;
        info.options = {};
        info.options.host = info.parsedUrl.hostname;
        info.options.port = info.parsedUrl.port
            ? parseInt(info.parsedUrl.port)
            : defaultPort;
        info.options.path =
            (info.parsedUrl.pathname || '') + (info.parsedUrl.search || '');
        info.options.method = method;
        info.options.headers = this._mergeHeaders(headers);
        if (this.userAgent != null) {
            info.options.headers['user-agent'] = this.userAgent;
        }
        info.options.agent = this._getAgent(info.parsedUrl);
        // gives handlers an opportunity to participate
        if (this.handlers) {
            this.handlers.forEach(handler => {
                handler.prepareRequest(info.options);
            });
        }
        return info;
    }
    _mergeHeaders(headers) {
        const lowercaseKeys = obj => Object.keys(obj).reduce((c, k) => ((c[k.toLowerCase()] = obj[k]), c), {});
        if (this.requestOptions && this.requestOptions.headers) {
            return Object.assign({}, lowercaseKeys(this.requestOptions.headers), lowercaseKeys(headers));
        }
        return lowercaseKeys(headers || {});
    }
    _getExistingOrDefaultHeader(additionalHeaders, header, _default) {
        const lowercaseKeys = obj => Object.keys(obj).reduce((c, k) => ((c[k.toLowerCase()] = obj[k]), c), {});
        let clientHeader;
        if (this.requestOptions && this.requestOptions.headers) {
            clientHeader = lowercaseKeys(this.requestOptions.headers)[header];
        }
        return additionalHeaders[header] || clientHeader || _default;
    }
    _getAgent(parsedUrl) {
        let agent;
        let proxyUrl = pm.getProxyUrl(parsedUrl);
        let useProxy = proxyUrl && proxyUrl.hostname;
        if (this._keepAlive && useProxy) {
            agent = this._proxyAgent;
        }
        if (this._keepAlive && !useProxy) {
            agent = this._agent;
        }
        // if agent is already assigned use that agent.
        if (!!agent) {
            return agent;
        }
        const usingSsl = parsedUrl.protocol === 'https:';
        let maxSockets = 100;
        if (!!this.requestOptions) {
            maxSockets = this.requestOptions.maxSockets || http.globalAgent.maxSockets;
        }
        if (useProxy) {
            // If using proxy, need tunnel
            if (!tunnel) {
                tunnel = __webpack_require__(413);
            }
            const agentOptions = {
                maxSockets: maxSockets,
                keepAlive: this._keepAlive,
                proxy: {
                    ...((proxyUrl.username || proxyUrl.password) && {
                        proxyAuth: `${proxyUrl.username}:${proxyUrl.password}`
                    }),
                    host: proxyUrl.hostname,
                    port: proxyUrl.port
                }
            };
            let tunnelAgent;
            const overHttps = proxyUrl.protocol === 'https:';
            if (usingSsl) {
                tunnelAgent = overHttps ? tunnel.httpsOverHttps : tunnel.httpsOverHttp;
            }
            else {
                tunnelAgent = overHttps ? tunnel.httpOverHttps : tunnel.httpOverHttp;
            }
            agent = tunnelAgent(agentOptions);
            this._proxyAgent = agent;
        }
        // if reusing agent across request and tunneling agent isn't assigned create a new agent
        if (this._keepAlive && !agent) {
            const options = { keepAlive: this._keepAlive, maxSockets: maxSockets };
            agent = usingSsl ? new https.Agent(options) : new http.Agent(options);
            this._agent = agent;
        }
        // if not using private agent and tunnel agent isn't setup then use global agent
        if (!agent) {
            agent = usingSsl ? https.globalAgent : http.globalAgent;
        }
        if (usingSsl && this._ignoreSslError) {
            // we don't want to set NODE_TLS_REJECT_UNAUTHORIZED=0 since that will affect request for entire process
            // http.RequestOptions doesn't expose a way to modify RequestOptions.agent.options
            // we have to cast it to any and change it directly
            agent.options = Object.assign(agent.options || {}, {
                rejectUnauthorized: false
            });
        }
        return agent;
    }
    _performExponentialBackoff(retryNumber) {
        retryNumber = Math.min(ExponentialBackoffCeiling, retryNumber);
        const ms = ExponentialBackoffTimeSlice * Math.pow(2, retryNumber);
        return new Promise(resolve => setTimeout(() => resolve(), ms));
    }
    static dateTimeDeserializer(key, value) {
        if (typeof value === 'string') {
            let a = new Date(value);
            if (!isNaN(a.valueOf())) {
                return a;
            }
        }
        return value;
    }
    async _processResponse(res, options) {
        return new Promise(async (resolve, reject) => {
            const statusCode = res.message.statusCode;
            const response = {
                statusCode: statusCode,
                result: null,
                headers: {}
            };
            // not found leads to null obj returned
            if (statusCode == HttpCodes.NotFound) {
                resolve(response);
            }
            let obj;
            let contents;
            // get the result from the body
            try {
                contents = await res.readBody();
                if (contents && contents.length > 0) {
                    if (options && options.deserializeDates) {
                        obj = JSON.parse(contents, HttpClient.dateTimeDeserializer);
                    }
                    else {
                        obj = JSON.parse(contents);
                    }
                    response.result = obj;
                }
                response.headers = res.message.headers;
            }
            catch (err) {
                // Invalid resource (contents not json);  leaving result obj null
            }
            // note that 3xx redirects are handled by the http layer.
            if (statusCode > 299) {
                let msg;
                // if exception/error in body, attempt to get better error
                if (obj && obj.message) {
                    msg = obj.message;
                }
                else if (contents && contents.length > 0) {
                    // it may be the case that the exception is in the body message as string
                    msg = contents;
                }
                else {
                    msg = 'Failed request: (' + statusCode + ')';
                }
                let err = new HttpClientError(msg, statusCode);
                err.result = response.result;
                reject(err);
            }
            else {
                resolve(response);
            }
        });
    }
}
exports.HttpClient = HttpClient;


/***/ }),

/***/ 551:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.arrayIteratorImpl=function(h){var g=0;return function(){return g<h.length?{done:!1,value:h[g++]}:{done:!0}}};$jscomp.arrayIterator=function(h){return{next:$jscomp.arrayIteratorImpl(h)}};$jscomp.makeIterator=function(h){var g="undefined"!=typeof Symbol&&Symbol.iterator&&h[Symbol.iterator];return g?g.call(h):$jscomp.arrayIterator(h)};
$jscomp.getGlobal=function(h){return"undefined"!=typeof window&&window===h?h:"undefined"!=typeof global&&null!=global?global:h};$jscomp.global=$jscomp.getGlobal(this);$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.SIMPLE_FROUND_POLYFILL=!1;$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(h,g,q){h!=Array.prototype&&h!=Object.prototype&&(h[g]=q.value)};
$jscomp.polyfill=function(h,g,q,a){if(g){q=$jscomp.global;h=h.split(".");for(a=0;a<h.length-1;a++){var t=h[a];t in q||(q[t]={});q=q[t]}h=h[h.length-1];a=q[h];g=g(a);g!=a&&null!=g&&$jscomp.defineProperty(q,h,{configurable:!0,writable:!0,value:g})}};$jscomp.FORCE_POLYFILL_PROMISE=!1;
$jscomp.polyfill("Promise",function(h){function g(){this.batch_=null}function q(a){return a instanceof t?a:new t(function(d,g){d(a)})}if(h&&!$jscomp.FORCE_POLYFILL_PROMISE)return h;g.prototype.asyncExecute=function(a){if(null==this.batch_){this.batch_=[];var d=this;this.asyncExecuteFunction(function(){d.executeBatch_()})}this.batch_.push(a)};var a=$jscomp.global.setTimeout;g.prototype.asyncExecuteFunction=function(d){a(d,0)};g.prototype.executeBatch_=function(){for(;this.batch_&&this.batch_.length;){var a=
this.batch_;this.batch_=[];for(var g=0;g<a.length;++g){var h=a[g];a[g]=null;try{h()}catch(v){this.asyncThrow_(v)}}}this.batch_=null};g.prototype.asyncThrow_=function(a){this.asyncExecuteFunction(function(){throw a;})};var t=function(a){this.state_=0;this.result_=void 0;this.onSettledCallbacks_=[];var d=this.createResolveAndReject_();try{a(d.resolve,d.reject)}catch(n){d.reject(n)}};t.prototype.createResolveAndReject_=function(){function a(a){return function(d){h||(h=!0,a.call(g,d))}}var g=this,h=!1;
return{resolve:a(this.resolveTo_),reject:a(this.reject_)}};t.prototype.resolveTo_=function(a){if(a===this)this.reject_(new TypeError("A Promise cannot resolve to itself"));else if(a instanceof t)this.settleSameAsPromise_(a);else{a:switch(typeof a){case "object":var d=null!=a;break a;case "function":d=!0;break a;default:d=!1}d?this.resolveToNonPromiseObj_(a):this.fulfill_(a)}};t.prototype.resolveToNonPromiseObj_=function(a){var d=void 0;try{d=a.then}catch(n){this.reject_(n);return}"function"==typeof d?
this.settleSameAsThenable_(d,a):this.fulfill_(a)};t.prototype.reject_=function(a){this.settle_(2,a)};t.prototype.fulfill_=function(a){this.settle_(1,a)};t.prototype.settle_=function(a,g){if(0!=this.state_)throw Error("Cannot settle("+a+", "+g+"): Promise already settled in state"+this.state_);this.state_=a;this.result_=g;this.executeOnSettledCallbacks_()};t.prototype.executeOnSettledCallbacks_=function(){if(null!=this.onSettledCallbacks_){for(var a=0;a<this.onSettledCallbacks_.length;++a)u.asyncExecute(this.onSettledCallbacks_[a]);
this.onSettledCallbacks_=null}};var u=new g;t.prototype.settleSameAsPromise_=function(a){var d=this.createResolveAndReject_();a.callWhenSettled_(d.resolve,d.reject)};t.prototype.settleSameAsThenable_=function(a,g){var d=this.createResolveAndReject_();try{a.call(g,d.resolve,d.reject)}catch(v){d.reject(v)}};t.prototype.then=function(a,g){function d(a,d){return"function"==typeof a?function(d){try{l(a(d))}catch(r){h(r)}}:d}var l,h,q=new t(function(a,d){l=a;h=d});this.callWhenSettled_(d(a,l),d(g,h));return q};
t.prototype.catch=function(a){return this.then(void 0,a)};t.prototype.callWhenSettled_=function(a,g){function d(){switch(l.state_){case 1:a(l.result_);break;case 2:g(l.result_);break;default:throw Error("Unexpected state: "+l.state_);}}var l=this;null==this.onSettledCallbacks_?u.asyncExecute(d):this.onSettledCallbacks_.push(d)};t.resolve=q;t.reject=function(a){return new t(function(d,g){g(a)})};t.race=function(a){return new t(function(d,g){for(var l=$jscomp.makeIterator(a),h=l.next();!h.done;h=l.next())q(h.value).callWhenSettled_(d,
g)})};t.all=function(a){var d=$jscomp.makeIterator(a),g=d.next();return g.done?q([]):new t(function(a,l){function h(d){return function(g){k[d]=g;f--;0==f&&a(k)}}var k=[],f=0;do k.push(void 0),f++,q(g.value).callWhenSettled_(h(k.length-1),l),g=d.next();while(!g.done)})};return t},"es6","es3");$jscomp.SYMBOL_PREFIX="jscomp_symbol_";$jscomp.initSymbol=function(){$jscomp.initSymbol=function(){};$jscomp.global.Symbol||($jscomp.global.Symbol=$jscomp.Symbol)};
$jscomp.SymbolClass=function(h,g){this.$jscomp$symbol$id_=h;$jscomp.defineProperty(this,"description",{configurable:!0,writable:!0,value:g})};$jscomp.SymbolClass.prototype.toString=function(){return this.$jscomp$symbol$id_};$jscomp.Symbol=function(){function h(q){if(this instanceof h)throw new TypeError("Symbol is not a constructor");return new $jscomp.SymbolClass($jscomp.SYMBOL_PREFIX+(q||"")+"_"+g++,q)}var g=0;return h}();
$jscomp.initSymbolIterator=function(){$jscomp.initSymbol();var h=$jscomp.global.Symbol.iterator;h||(h=$jscomp.global.Symbol.iterator=$jscomp.global.Symbol("Symbol.iterator"));"function"!=typeof Array.prototype[h]&&$jscomp.defineProperty(Array.prototype,h,{configurable:!0,writable:!0,value:function(){return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this))}});$jscomp.initSymbolIterator=function(){}};
$jscomp.initSymbolAsyncIterator=function(){$jscomp.initSymbol();var h=$jscomp.global.Symbol.asyncIterator;h||(h=$jscomp.global.Symbol.asyncIterator=$jscomp.global.Symbol("Symbol.asyncIterator"));$jscomp.initSymbolAsyncIterator=function(){}};$jscomp.iteratorPrototype=function(h){$jscomp.initSymbolIterator();h={next:h};h[$jscomp.global.Symbol.iterator]=function(){return this};return h};
$jscomp.iteratorFromArray=function(h,g){$jscomp.initSymbolIterator();h instanceof String&&(h+="");var q=0,a={next:function(){if(q<h.length){var t=q++;return{value:g(t,h[t]),done:!1}}a.next=function(){return{done:!0,value:void 0}};return a.next()}};a[Symbol.iterator]=function(){return a};return a};$jscomp.polyfill("Array.prototype.keys",function(h){return h?h:function(){return $jscomp.iteratorFromArray(this,function(g){return g})}},"es6","es3");
$jscomp.checkStringArgs=function(h,g,q){if(null==h)throw new TypeError("The 'this' value for String.prototype."+q+" must not be null or undefined");if(g instanceof RegExp)throw new TypeError("First argument to String.prototype."+q+" must not be a regular expression");return h+""};
$jscomp.polyfill("String.prototype.startsWith",function(h){return h?h:function(g,h){var a=$jscomp.checkStringArgs(this,g,"startsWith");g+="";var q=a.length,u=g.length;h=Math.max(0,Math.min(h|0,a.length));for(var d=0;d<u&&h<q;)if(a[h++]!=g[d++])return!1;return d>=u}},"es6","es3");
$jscomp.polyfill("Array.from",function(h){return h?h:function(g,h,a){h=null!=h?h:function(a){return a};var q=[],u="undefined"!=typeof Symbol&&Symbol.iterator&&g[Symbol.iterator];if("function"==typeof u){g=u.call(g);for(var d=0;!(u=g.next()).done;)q.push(h.call(a,u.value,d++))}else for(u=g.length,d=0;d<u;d++)q.push(h.call(a,g[d],d));return q}},"es6","es3");
$jscomp.polyfill("String.prototype.endsWith",function(h){return h?h:function(g,h){var a=$jscomp.checkStringArgs(this,g,"endsWith");g+="";void 0===h&&(h=a.length);h=Math.max(0,Math.min(h|0,a.length));for(var q=g.length;0<q&&0<h;)if(a[--h]!=g[--q])return!1;return 0>=q}},"es6","es3");
(function(h){h.MessageHandler=function(g,q){this.name=g;this.comObj=q;this.callbackIndex=1;this.postMessageTransfers=!0;this.callbacksCapabilities={};g=this.actionHandler={};this.actionHandlerAsync={};this.nextAsync=null;g.console_log=[function(a){h.utils.log(a)}];g.console_error=[function(a){h.utils.error(a)}];g.workerLoaded=[function(a){}];q.addEventListener("message",this.handleMessage.bind(this))};h.MessageHandler.prototype={on:function(g,q,a){var t=this.actionHandler;t[g]&&h.utils.error('There is already an actionName called "'+
g+'"');t[g]=[q,a]},replace:function(g,h,a){this.actionHandler[g]=[h,a]},onAsync:function(g,q,a){var t=this.actionHandlerAsync;t[g]&&h.utils.error('There is already an actionName called "'+g+'"');t[g]=[q,a]},replaceAsync:function(g,h,a){var q=this.actionHandlerAsync,u=this.actionHandler;u[g]&&delete u[g];q[g]=[h,a]},onNextAsync:function(g){this.nextAsync=g},send:function(g,h){this.postMessage({action:g,data:h})},getNextId:function(){return this.callbackIndex++},sendWithPromise:function(g,h,a){var q=
this.getNextId();g={action:g,data:h,callbackId:q,priority:a};h=createPromiseCapability();this.callbacksCapabilities[q]=h;try{this.postMessage(g)}catch(u){h.reject(u)}return h.promise},sendWithPromiseReturnId:function(g,h,a){var q=this.getNextId();g={action:g,data:h,callbackId:q,priority:a};h=createPromiseCapability();this.callbacksCapabilities[q]=h;try{this.postMessage(g)}catch(u){h.reject(u)}return{promise:h.promise,callbackId:q}},sendWithPromiseWithId:function(g,q,a,t){q>this.callbackIndex&&h.utils.error("Can't reuse callbackId "+
q+" lesser than callbackIndex "+this.callbackIndex);q in this.callbacksCapabilities&&h.utils.error("Can't reuse callbackId "+q+". There is a capability waiting to be resolved. ");g={action:g,data:a,callbackId:q};a=createPromiseCapability();this.callbacksCapabilities[q]=a;try{this.postMessage(g)}catch(u){a.reject(u)}return a.promise},sendError:function(g,h){if(g.message||g.errorData){g.message&&g.message.message&&(g.message=g.message.message);var a=g.errorData;g={type:g.type?g.type:"JavascriptError",
message:g.message};if(a)for(var q in a)a.hasOwnProperty(q)&&(g[q]=a[q])}this.postMessage({isReply:!0,callbackId:h,error:g})},getPromise:function(g){if(g in this.callbacksCapabilities)return this.callbacksCapabilities[g];h.utils.error("Cannot get promise for callback "+g)},cancelPromise:function(g){if(g in this.callbacksCapabilities){var q=this.callbacksCapabilities[g];delete this.callbacksCapabilities[g];q.reject({type:"Cancelled",message:"Request has been cancelled."});this.postMessage({action:"actionCancel",
data:{callbackId:g}})}else h.utils.warn("Cannot cancel callback "+g)},postMessage:function(g){if(this.postMessageTransfers){var h=this.getTransfersArray(g);this.comObj.postMessage(g,h)}else this.comObj.postMessage(g)},getObjectTransfers:function(g,h){if("object"===typeof g)if(g instanceof Uint8Array)h.push(g.buffer);else if(g instanceof ArrayBuffer)h.push(g);else for(var a in g)g.hasOwnProperty(a)&&this.getObjectTransfers(g[a],h)},getTransfersArray:function(g){var h=[];this.getObjectTransfers(g,h);
return 0===h.length?void 0:h},handleMessage:function(g){var q=this,a=g.data,t=this.actionHandler,u=this.actionHandlerAsync;g=this.callbacksCapabilities;if(a.isReply)t=a.callbackId,t in g?(u=g[t],delete g[t],"error"in a?u.reject(a.error):u.resolve(a.data)):h.utils.warn("Cannot resolve callback "+t);else if(a.action in t){var d=t[a.action];a.callbackId?Promise.resolve().then(function(){return d[0].call(d[1],a.data)}).then(function(d){q.postMessage({isReply:!0,callbackId:a.callbackId,data:d})},function(d){q.sendError(d,
a.callbackId)}):d[0].call(d[1],a.data)}else a.action in u?(d=u[a.action],a.callbackId?d[0].call(d[1],a).then(function(d){q.postMessage({isReply:!0,callbackId:a.callbackId,data:d});q.nextAsync()},function(d){q.sendError(d,a.callbackId);q.nextAsync()}):d[0].call(d[1],a).then(function(){q.nextAsync()},function(){q.nextAsync()})):h.utils.error("Unknown action from worker: "+a.action)}}})("undefined"===typeof window?this:window);(function(h){h.utils=h.utils||{};h.utils.isJSWorker=!0;h.utils.isNodeJS=!0;h.jsworker={loadWorker:function(){try{var g=__webpack_require__(630)}catch(q){if("object"===typeof q&&Object.keys(q).length)throw q;throw{addon:""+q};}g.getWorkerType=function(){return"node"};return g},utils:{getResourcesDir:function(g){g(null,"./pdfnet.res")}}}})("undefined"===typeof window?this:window);var XMLHttpRequest=__webpack_require__(405).XMLHttpRequest;
(function(h){function g(){return{putBool:function(a,c,e){if(!1!==e&&!0!==e)throw new TypeError("An boolean value is expected for putBool");a[c]=e},putNumber:function(a,c,e){a[c]=0+e},jsColorToNumber:function(a){return 16777216*Math.floor(a.A)+65536*Math.floor(a.R)+256*Math.floor(a.G)+Math.floor(a.B)},jsColorFromNumber:function(a){return{A:5.9604644775390625E-8*a&255,R:((a|0)&16711680)>>>16,G:((a|0)&65280)>>>8,B:(a|0)&255}}}}function q(a){function b(c){c=a.next(c);var e=c.value;return c.done?c.value:
e.then(b)}return Promise.resolve().then(b)}var a=h.PDFNet?h.PDFNet:{};a.Convert=h.PDFNet&&h.PDFNet.Convert?h.PDFNet.Convert:{};a.Optimizer={};h.CoreControls&&h.CoreControls.enableFullPDF(!0);h.isArrayBuffer=function(a){return a instanceof ArrayBuffer||null!=a&&null!=a.constructor&&"ArrayBuffer"===a.constructor.name&&"number"===typeof a.byteLength};a.Destroyable=function(){if(this.constructor===a.Destroyable)throw Error("Can't instantiate abstract class!");};a.Destroyable.prototype.takeOwnership=function(){r(this.id)};
a.Destroyable.prototype.destroy=function(){this.takeOwnership();return a.messageHandler.sendWithPromise(this.name+".destroy",{auto_dealloc_obj:this.id},this.userPriority)};a.createRefreshOptions=function(){return Promise.resolve(new a.RefreshOptions)};a.RefreshOptions=function(){this.mImpl={};this.mHelpers=g()};a.RefreshOptions.prototype.getDrawBackgroundOnly=function(){return"DrawBackgroundOnly"in mImpl?!!mImpl.DrawBackgroundOnly:!0};a.RefreshOptions.prototype.setDrawBackgroundOnly=function(a){mHelpers.putBool(mImpl,
"DrawBackgroundOnly",a);return this};a.RefreshOptions.prototype.getRefreshExisting=function(){return"RefreshExisting"in mImpl?!!mImpl.RefreshExisting:!0};a.RefreshOptions.prototype.setRefreshExisting=function(a){mHelpers.putBool(mImpl,"RefreshExisting",a);return this};a.RefreshOptions.prototype.getUseNonStandardRotation=function(){return"UseNonStandardRotation"in mImpl?!!mImpl.UseNonStandardRotation:!1};a.RefreshOptions.prototype.setUseNonStandardRotation=function(a){mHelpers.putBool(mImpl,"UseNonStandardRotation",
a);return this};a.RefreshOptions.prototype.getUseRoundedCorners=function(){return"UseRoundedCorners"in mImpl?!!mImpl.UseRoundedCorners:!1};a.RefreshOptions.prototype.setUseRoundedCorners=function(a){mHelpers.putBool(mImpl,"UseRoundedCorners",a);return this};a.RefreshOptions.prototype.getJsonString=function(){return JSON.stringify(this.mImpl)};a.createDiffOptions=function(){return Promise.resolve(new a.DiffOptions)};a.DiffOptions=function(){this.mImpl={};this.mHelpers=g()};a.DiffOptions.prototype.getAddGroupAnnots=
function(){return"AddGroupAnnots"in this.mImpl?!!this.mImpl.AddGroupAnnots:!1};a.DiffOptions.prototype.setAddGroupAnnots=function(a){this.mHelpers.putBool(this.mImpl,"AddGroupAnnots",a);return this};a.DiffOptions.prototype.getBlendMode=function(){return"BlendMode"in this.mImpl?this.mImpl.BlendMode:5};a.DiffOptions.prototype.setBlendMode=function(a){this.mHelpers.putNumber(this.mImpl,"BlendMode",a);return this};a.DiffOptions.prototype.getColorA=function(){return"ColorA"in this.mImpl?this.mHelpers.jsColorFromNumber(this.mImpl.ColorA):
this.mHelpers.jsColorFromNumber(4291559424)};a.DiffOptions.prototype.setColorA=function(a){this.mHelpers.putNumber(this.mImpl,"ColorA",this.mHelpers.jsColorToNumber(a));return this};a.DiffOptions.prototype.getColorB=function(){return"ColorB"in this.mImpl?this.mHelpers.jsColorFromNumber(this.mImpl.ColorB):this.mHelpers.jsColorFromNumber(4278242508)};a.DiffOptions.prototype.setColorB=function(a){this.mHelpers.putNumber(this.mImpl,"ColorB",this.mHelpers.jsColorToNumber(a));return this};a.DiffOptions.prototype.getJsonString=
function(){return JSON.stringify(this.mImpl)};a.Action=function(a){this.name="Action";this.id=a};a.ActionParameter=function(a){this.name="ActionParameter";this.id=a};a.ActionParameter.prototype=Object.create(a.Destroyable.prototype);a.AdvancedImagingModule=function(a){this.name="AdvancedImagingModule";this.id=a};a.Annot=function(a){this.name="Annot";this.id=a};a.AnnotBorderStyle=function(a){this.name="AnnotBorderStyle";this.id=a};a.AnnotBorderStyle.prototype=Object.create(a.Destroyable.prototype);
a.AppearanceReferenceList=function(a){this.name="AppearanceReferenceList";this.id=a};a.AttrObj=function(a){this.name="AttrObj";this.id=a};a.Bookmark=function(a){this.name="Bookmark";this.id=a};a.ByteRange=function(b,c){this.name="ByteRange";if(b&&"undefined"===typeof c)p(b,this);else return"undefined"===typeof b&&(b=0),"undefined"===typeof c&&(c=0),new a.ByteRange({m_offset:b,m_size:c})};a.CADModule=function(a){this.name="CADModule";this.id=a};a.CaretAnnot=function(a){this.name="CaretAnnot";this.id=
a};a.CheckBoxWidget=function(a){this.name="CheckBoxWidget";this.id=a};a.ChunkRenderer=function(a){this.name="ChunkRenderer";this.id=a};a.CircleAnnot=function(a){this.name="CircleAnnot";this.id=a};a.ClassMap=function(a){this.name="ClassMap";this.id=a};a.ColorPt=function(a){this.name="ColorPt";this.id=a};a.ColorPt.prototype=Object.create(a.Destroyable.prototype);a.ColorSpace=function(a){this.name="ColorSpace";this.id=a};a.ColorSpace.prototype=Object.create(a.Destroyable.prototype);a.ComboBoxWidget=
function(a){this.name="ComboBoxWidget";this.id=a};a.ContentItem=function(b,c){this.name="ContentItem";if(b&&"undefined"===typeof c)p(b,this);else return"undefined"===typeof b&&(b="0"),"undefined"===typeof c&&(c="0"),new a.ContentItem({o:b,p:c})};a.ContentReplacer=function(a){this.name="ContentReplacer";this.id=a};a.ContentReplacer.prototype=Object.create(a.Destroyable.prototype);a.ConversionMonitor=function(a){this.name="ConversionMonitor";this.id=a};a.ConversionMonitor.prototype=Object.create(a.Destroyable.prototype);
a.Date=function(b,c,e,d,f,g,h,k,l,q){this.name="Date";if(b&&"undefined"===typeof c)p(b,this);else return"undefined"===typeof b&&(b=0),"undefined"===typeof c&&(c=0),"undefined"===typeof e&&(e=0),"undefined"===typeof d&&(d=0),"undefined"===typeof f&&(f=0),"undefined"===typeof g&&(g=0),"undefined"===typeof h&&(h=0),"undefined"===typeof k&&(k=0),"undefined"===typeof l&&(l=0),"undefined"===typeof q&&(q="0"),new a.Date({year:b,month:c,day:e,hour:d,minute:f,second:g,UT:h,UT_hour:k,UT_minutes:l,mp_obj:q})};
a.Destination=function(a){this.name="Destination";this.id=a};a.DictIterator=function(a){this.name="DictIterator";this.id=a};a.DictIterator.prototype=Object.create(a.Destroyable.prototype);a.DigestAlgorithm=function(a){this.name="DigestAlgorithm";this.id=a};a.DigitalSignatureField=function(b){this.name="DigitalSignatureField";if("object"===typeof b)p(b,this);else if("undefined"!==typeof b)return new a.DigitalSignatureField({mp_field_dict_obj:b})};a.DisallowedChange=function(a){this.name="DisallowedChange";
this.id=a};a.DisallowedChange.prototype=Object.create(a.Destroyable.prototype);a.DocSnapshot=function(a){this.name="DocSnapshot";this.id=a};a.DocSnapshot.prototype=Object.create(a.Destroyable.prototype);a.DocumentConversion=function(a){this.name="DocumentConversion";this.id=a};a.DocumentConversion.prototype=Object.create(a.Destroyable.prototype);a.Element=function(a){this.name="Element";this.id=a};a.ElementBuilder=function(a){this.name="ElementBuilder";this.id=a};a.ElementBuilder.prototype=Object.create(a.Destroyable.prototype);
a.ElementReader=function(a){this.name="ElementReader";this.id=a};a.ElementReader.prototype=Object.create(a.Destroyable.prototype);a.ElementWriter=function(a){this.name="ElementWriter";this.id=a};a.ElementWriter.prototype=Object.create(a.Destroyable.prototype);a.EmbeddedTimestampVerificationResult=function(a){this.name="EmbeddedTimestampVerificationResult";this.id=a};a.EmbeddedTimestampVerificationResult.prototype=Object.create(a.Destroyable.prototype);a.FDFDoc=function(a){this.name="FDFDoc";this.id=
a};a.FDFDoc.prototype=Object.create(a.Destroyable.prototype);a.FDFField=function(b,c){this.name="FDFField";if(b&&"undefined"===typeof c)p(b,this);else return"undefined"===typeof b&&(b="0"),"undefined"===typeof c&&(c="0"),new a.FDFField({mp_leaf_node:b,mp_root_array:c})};a.Field=function(b,c){this.name="Field";if(b&&"undefined"===typeof c)p(b,this);else return"undefined"===typeof b&&(b="0"),"undefined"===typeof c&&(c="0"),new a.Field({leaf_node:b,builder:c})};a.FileAttachmentAnnot=function(a){this.name=
"FileAttachmentAnnot";this.id=a};a.FileSpec=function(a){this.name="FileSpec";this.id=a};a.Filter=function(a){this.name="Filter";this.id=a};a.Filter.prototype=Object.create(a.Destroyable.prototype);a.FilterReader=function(a){this.name="FilterReader";this.id=a};a.FilterReader.prototype=Object.create(a.Destroyable.prototype);a.FilterWriter=function(a){this.name="FilterWriter";this.id=a};a.FilterWriter.prototype=Object.create(a.Destroyable.prototype);a.Flattener=function(a){this.name="Flattener";this.id=
a};a.Flattener.prototype=Object.create(a.Destroyable.prototype);a.Font=function(a){this.name="Font";this.id=a};a.Font.prototype=Object.create(a.Destroyable.prototype);a.FreeTextAnnot=function(a){this.name="FreeTextAnnot";this.id=a};a.Function=function(a){this.name="Function";this.id=a};a.Function.prototype=Object.create(a.Destroyable.prototype);a.GState=function(a){this.name="GState";this.id=a};a.GeometryCollection=function(a){this.name="GeometryCollection";this.id=a};a.GeometryCollection.prototype=
Object.create(a.Destroyable.prototype);a.HTML2PDF=function(a){this.name="HTML2PDF";this.id=a};a.HTML2PDF.prototype=Object.create(a.Destroyable.prototype);a.HTML2PDF.Proxy=function(a){this.name="HTML2PDF.Proxy";this.id=a};a.HTML2PDF.Proxy.prototype=Object.create(a.Destroyable.prototype);a.HTML2PDF.TOCSettings=function(a){this.name="HTML2PDF.TOCSettings";this.id=a};a.HTML2PDF.TOCSettings.prototype=Object.create(a.Destroyable.prototype);a.HTML2PDF.WebPageSettings=function(a){this.name="HTML2PDF.WebPageSettings";
this.id=a};a.HTML2PDF.WebPageSettings.prototype=Object.create(a.Destroyable.prototype);a.HighlightAnnot=function(a){this.name="HighlightAnnot";this.id=a};a.Highlights=function(a){this.name="Highlights";this.id=a};a.Highlights.prototype=Object.create(a.Destroyable.prototype);a.Image=function(a){this.name="Image";this.id=a};a.InkAnnot=function(a){this.name="InkAnnot";this.id=a};a.Iterator=function(a,c){this.name="Iterator";this.id=a;this.type=c};a.Iterator.prototype=Object.create(a.Destroyable.prototype);
a.KeyStrokeActionResult=function(a){this.name="KeyStrokeActionResult";this.id=a};a.KeyStrokeActionResult.prototype=Object.create(a.Destroyable.prototype);a.KeyStrokeEventData=function(a){this.name="KeyStrokeEventData";this.id=a};a.KeyStrokeEventData.prototype=Object.create(a.Destroyable.prototype);a.LineAnnot=function(a){this.name="LineAnnot";this.id=a};a.LinkAnnot=function(a){this.name="LinkAnnot";this.id=a};a.ListBoxWidget=function(a){this.name="ListBoxWidget";this.id=a};a.MarkupAnnot=function(a){this.name=
"MarkupAnnot";this.id=a};a.Matrix2D=function(b,c,e,d,f,g){this.name="Matrix2D";if(b&&"undefined"===typeof c)p(b,this);else return"undefined"===typeof b&&(b=0),"undefined"===typeof c&&(c=0),"undefined"===typeof e&&(e=0),"undefined"===typeof d&&(d=0),"undefined"===typeof f&&(f=0),"undefined"===typeof g&&(g=0),new a.Matrix2D({m_a:b,m_b:c,m_c:e,m_d:d,m_h:f,m_v:g})};a.MovieAnnot=function(a){this.name="MovieAnnot";this.id=a};a.NameTree=function(a){this.name="NameTree";this.id=a};a.NumberTree=function(a){this.name=
"NumberTree";this.id=a};a.OCG=function(a){this.name="OCG";this.id=a};a.OCGConfig=function(a){this.name="OCGConfig";this.id=a};a.OCGContext=function(a){this.name="OCGContext";this.id=a};a.OCGContext.prototype=Object.create(a.Destroyable.prototype);a.OCMD=function(a){this.name="OCMD";this.id=a};a.OCRModule=function(a){this.name="OCRModule";this.id=a};a.Obj=function(a){this.name="Obj";this.id=a};a.ObjSet=function(a){this.name="ObjSet";this.id=a};a.ObjSet.prototype=Object.create(a.Destroyable.prototype);
a.ObjectIdentifier=function(a){this.name="ObjectIdentifier";this.id=a};a.ObjectIdentifier.prototype=Object.create(a.Destroyable.prototype);a.OwnedBitmap=function(a){this.name="OwnedBitmap";this.id=a};a.PDF2HtmlReflowParagraphsModule=function(a){this.name="PDF2HtmlReflowParagraphsModule";this.id=a};a.PDF2WordModule=function(a){this.name="PDF2WordModule";this.id=a};a.PDFACompliance=function(a){this.name="PDFACompliance";this.id=a};a.PDFACompliance.prototype=Object.create(a.Destroyable.prototype);a.PDFDC=
function(a){this.name="PDFDC";this.id=a};a.PDFDCEX=function(a){this.name="PDFDCEX";this.id=a};a.PDFDoc=function(a){this.name="PDFDoc";this.id=a};a.PDFDoc.prototype=Object.create(a.Destroyable.prototype);a.PDFDocInfo=function(a){this.name="PDFDocInfo";this.id=a};a.PDFDocViewPrefs=function(a){this.name="PDFDocViewPrefs";this.id=a};a.PDFDraw=function(a){this.name="PDFDraw";this.id=a};a.PDFDraw.prototype=Object.create(a.Destroyable.prototype);a.PDFRasterizer=function(a){this.name="PDFRasterizer";this.id=
a};a.PDFRasterizer.prototype=Object.create(a.Destroyable.prototype);a.PDFTronCustomSecurityHandler=function(a){this.name="PDFTronCustomSecurityHandler";this.id=a};a.PDFView=function(a){this.name="PDFView";this.id=a};a.PDFViewCtrl=function(a){this.name="PDFViewCtrl";this.id=a};a.Page=function(a){this.name="Page";this.id=a};a.PageLabel=function(b,c,e){this.name="PageLabel";if(b&&"undefined"===typeof c)p(b,this);else return"undefined"===typeof b&&(b="0"),"undefined"===typeof c&&(c=0),"undefined"===typeof e&&
(e=0),new a.PageLabel({mp_obj:b,m_first_page:c,m_last_page:e})};a.PageSet=function(a){this.name="PageSet";this.id=a};a.PageSet.prototype=Object.create(a.Destroyable.prototype);a.PatternColor=function(a){this.name="PatternColor";this.id=a};a.PatternColor.prototype=Object.create(a.Destroyable.prototype);a.PolyLineAnnot=function(a){this.name="PolyLineAnnot";this.id=a};a.PolygonAnnot=function(a){this.name="PolygonAnnot";this.id=a};a.PopupAnnot=function(a){this.name="PopupAnnot";this.id=a};a.PrinterMode=
function(a){this.name="PrinterMode";this.id=a};a.PushButtonWidget=function(a){this.name="PushButtonWidget";this.id=a};a.RadioButtonGroup=function(a){this.name="RadioButtonGroup";this.id=a};a.RadioButtonGroup.prototype=Object.create(a.Destroyable.prototype);a.RadioButtonWidget=function(a){this.name="RadioButtonWidget";this.id=a};a.Rect=function(b,c,e,d,f){this.name="Rect";if(b&&"undefined"===typeof c)p(b,this);else return"undefined"===typeof b&&(b=0),"undefined"===typeof c&&(c=0),"undefined"===typeof e&&
(e=0),"undefined"===typeof d&&(d=0),"undefined"===typeof f&&(f="0"),new a.Rect({x1:b,y1:c,x2:e,y2:d,mp_rect:f})};a.Redaction=function(a){this.name="Redaction";this.id=a};a.RedactionAnnot=function(a){this.name="RedactionAnnot";this.id=a};a.Redactor=function(a){this.name="Redactor";this.id=a};a.Reflow=function(a){this.name="Reflow";this.id=a};a.Reflow.prototype=Object.create(a.Destroyable.prototype);a.ResultSnapshot=function(a){this.name="ResultSnapshot";this.id=a};a.ResultSnapshot.prototype=Object.create(a.Destroyable.prototype);
a.RoleMap=function(a){this.name="RoleMap";this.id=a};a.RubberStampAnnot=function(a){this.name="RubberStampAnnot";this.id=a};a.SDFDoc=function(a){this.name="SDFDoc";this.id=a};a.SElement=function(b,c){this.name="SElement";if(b&&"undefined"===typeof c)p(b,this);else return"undefined"===typeof b&&(b="0"),"undefined"===typeof c&&(c="0"),new a.SElement({obj:b,k:c})};a.STree=function(a){this.name="STree";this.id=a};a.ScreenAnnot=function(a){this.name="ScreenAnnot";this.id=a};a.SecurityHandler=function(a){this.name=
"SecurityHandler";this.id=a};a.SecurityHandler.prototype=Object.create(a.Destroyable.prototype);a.Shading=function(a){this.name="Shading";this.id=a};a.Shading.prototype=Object.create(a.Destroyable.prototype);a.ShapedText=function(a){this.name="ShapedText";this.id=a};a.ShapedText.prototype=Object.create(a.Destroyable.prototype);a.SignatureHandler=function(a){this.name="SignatureHandler";this.id=a};a.SignatureWidget=function(a){this.name="SignatureWidget";this.id=a};a.SoundAnnot=function(a){this.name=
"SoundAnnot";this.id=a};a.SquareAnnot=function(a){this.name="SquareAnnot";this.id=a};a.SquigglyAnnot=function(a){this.name="SquigglyAnnot";this.id=a};a.Stamper=function(a){this.name="Stamper";this.id=a};a.Stamper.prototype=Object.create(a.Destroyable.prototype);a.StrikeOutAnnot=function(a){this.name="StrikeOutAnnot";this.id=a};a.TextAnnot=function(a){this.name="TextAnnot";this.id=a};a.TextExtractor=function(a){this.name="TextExtractor";this.id=a};a.TextExtractor.prototype=Object.create(a.Destroyable.prototype);
a.TextExtractorLine=function(b,c,e,d,f,g){this.name="TextExtractorLine";if(b&&"undefined"===typeof c)p(b,this);else return"undefined"===typeof b&&(b="0"),"undefined"===typeof c&&(c="0"),"undefined"===typeof e&&(e=0),"undefined"===typeof d&&(d=0),"undefined"===typeof f&&(f=0),"undefined"===typeof g&&(g="0"),new a.TextExtractorLine({line:b,uni:c,num:e,cur_num:d,m_direction:f,mp_bld:g})};a.TextExtractorStyle=function(b){this.name="TextExtractorStyle";if("object"===typeof b)p(b,this);else if("undefined"!==
typeof b)return new a.TextExtractorStyle({mp_imp:b})};a.TextExtractorWord=function(b,c,e,d,f,g,h){this.name="TextExtractorWord";if(b&&"undefined"===typeof c)p(b,this);else return"undefined"===typeof b&&(b="0"),"undefined"===typeof c&&(c="0"),"undefined"===typeof e&&(e="0"),"undefined"===typeof d&&(d="0"),"undefined"===typeof f&&(f=0),"undefined"===typeof g&&(g=0),"undefined"===typeof h&&(h="0"),new a.TextExtractorWord({line:b,word:c,end:e,uni:d,num:f,cur_num:g,mp_bld:h})};a.TextMarkupAnnot=function(a){this.name=
"TextMarkupAnnot";this.id=a};a.TextSearch=function(a){this.name="TextSearch";this.id=a};a.TextSearch.prototype=Object.create(a.Destroyable.prototype);a.TextWidget=function(a){this.name="TextWidget";this.id=a};a.TimestampingConfiguration=function(a){this.name="TimestampingConfiguration";this.id=a};a.TimestampingConfiguration.prototype=Object.create(a.Destroyable.prototype);a.TimestampingTestResult=function(a){this.name="TimestampingTestResult";this.id=a};a.TimestampingTestResult.prototype=Object.create(a.Destroyable.prototype);
a.TrustVerificationResult=function(a){this.name="TrustVerificationResult";this.id=a};a.TrustVerificationResult.prototype=Object.create(a.Destroyable.prototype);a.UnderlineAnnot=function(a){this.name="UnderlineAnnot";this.id=a};a.UndoManager=function(a){this.name="UndoManager";this.id=a};a.UndoManager.prototype=Object.create(a.Destroyable.prototype);a.VerificationOptions=function(a){this.name="VerificationOptions";this.id=a};a.VerificationOptions.prototype=Object.create(a.Destroyable.prototype);a.VerificationResult=
function(a){this.name="VerificationResult";this.id=a};a.VerificationResult.prototype=Object.create(a.Destroyable.prototype);a.ViewChangeCollection=function(a){this.name="ViewChangeCollection";this.id=a};a.ViewChangeCollection.prototype=Object.create(a.Destroyable.prototype);a.WatermarkAnnot=function(a){this.name="WatermarkAnnot";this.id=a};a.WebFontDownloader=function(a){this.name="WebFontDownloader";this.id=a};a.WidgetAnnot=function(a){this.name="WidgetAnnot";this.id=a};a.X501AttributeTypeAndValue=
function(a){this.name="X501AttributeTypeAndValue";this.id=a};a.X501AttributeTypeAndValue.prototype=Object.create(a.Destroyable.prototype);a.X501DistinguishedName=function(a){this.name="X501DistinguishedName";this.id=a};a.X501DistinguishedName.prototype=Object.create(a.Destroyable.prototype);a.X509Certificate=function(a){this.name="X509Certificate";this.id=a};a.X509Certificate.prototype=Object.create(a.Destroyable.prototype);a.X509Extension=function(a){this.name="X509Extension";this.id=a};a.X509Extension.prototype=
Object.create(a.Destroyable.prototype);a.QuadPoint=function(b,c,e,d,f,g,h,k){this.name="QuadPoint";if(b&&"undefined"===typeof c)p(b,this);else return"undefined"===typeof b&&(b=0),"undefined"===typeof c&&(c=0),"undefined"===typeof e&&(e=0),"undefined"===typeof d&&(d=0),"undefined"===typeof f&&(f=0),"undefined"===typeof g&&(g=0),"undefined"===typeof h&&(h=0),"undefined"===typeof k&&(k=0),new a.QuadPoint({p1x:b,p1y:c,p2x:e,p2y:d,p3x:f,p3y:g,p4x:h,p4y:k})};a.Point=function(b,c){this.name="Point";if(b&&
"undefined"===typeof c)p(b,this);else return"undefined"===typeof b&&(b=0),"undefined"===typeof c&&(c=0),new a.Point({x:b,y:c})};a.CharData=function(a){if("undefined"===typeof a)throw new TypeError("CharData requires an object to construct with.");this.name="CharData";p(a,this)};a.Separation=function(a){if("undefined"===typeof a)throw new TypeError("Separation requires an object to construct with.");this.name="Separation";p(a,this)};a.Optimizer.createImageSettings=function(){return Promise.resolve(new a.Optimizer.ImageSettings)};
a.Optimizer.ImageSettings=function(){this.m_max_pixels=4294967295;this.m_max_dpi=225;this.m_resample_dpi=150;this.m_quality=5;this.m_compression_mode=a.Optimizer.ImageSettings.CompressionMode.e_retain;this.m_downsample_mode=a.Optimizer.ImageSettings.DownsampleMode.e_default;this.m_force_changes=this.m_force_recompression=!1};a.Optimizer.ImageSettings.prototype.setImageDPI=function(a,c){this.m_max_dpi=a;this.m_resample_dpi=c;return this};a.Optimizer.ImageSettings.prototype.setCompressionMode=function(a){this.m_compression_mode=
a;return this};a.Optimizer.ImageSettings.prototype.setDownsampleMode=function(a){this.m_downsample_mode=a;return this};a.Optimizer.ImageSettings.prototype.setQuality=function(a){this.m_quality=a;return this};a.Optimizer.ImageSettings.prototype.forceRecompression=function(a){this.m_force_recompression=a;return this};a.Optimizer.ImageSettings.prototype.forceChanges=function(a){this.m_force_changes=a;return this};a.Optimizer.createMonoImageSettings=function(){return Promise.resolve(new a.Optimizer.MonoImageSettings)};
a.Optimizer.MonoImageSettings=function(){this.m_max_pixels=4294967295;this.m_max_dpi=450;this.m_resample_dpi=300;this.m_jbig2_threshold=8.5;this.m_compression_mode=a.Optimizer.ImageSettings.CompressionMode.e_retain;this.m_downsample_mode=a.Optimizer.ImageSettings.DownsampleMode.e_default;this.m_force_changes=this.m_force_recompression=!1};a.Optimizer.MonoImageSettings.prototype.setImageDPI=function(a,c){this.m_max_dpi=a;this.m_resample_dpi=c;return this};a.Optimizer.MonoImageSettings.prototype.setCompressionMode=
function(a){this.m_compression_mode=a;return this};a.Optimizer.MonoImageSettings.prototype.setDownsampleMode=function(a){this.m_downsample_mode=a;return this};a.Optimizer.MonoImageSettings.prototype.setJBIG2Threshold=function(a){this.m_jbig2_threshold=quality;return this};a.Optimizer.MonoImageSettings.prototype.forceRecompression=function(a){this.m_force_recompression=a;return this};a.Optimizer.MonoImageSettings.prototype.forceChanges=function(a){this.m_force_changes=a;return this};a.Optimizer.createTextSettings=
function(){return Promise.resolve(new a.Optimizer.TextSettings)};a.Optimizer.TextSettings=function(){this.m_embed_fonts=this.m_subset_fonts=!1};a.Optimizer.TextSettings.prototype.subsetFonts=function(a){this.m_subset_fonts=a;return this};a.Optimizer.TextSettings.prototype.embedFonts=function(a){this.m_embed_fonts=a;return this};a.Optimizer.createOptimizerSettings=function(){return Promise.resolve(new a.Optimizer.OptimizerSettings)};a.Optimizer.OptimizerSettings=function(){this.color_image_settings=
new a.Optimizer.ImageSettings;this.grayscale_image_settings=new a.Optimizer.ImageSettings;this.mono_image_settings=new a.Optimizer.MonoImageSettings;this.text_settings=new a.Optimizer.TextSettings;this.remove_custom=!0};a.Optimizer.OptimizerSettings.prototype.setColorImageSettings=function(a){this.color_image_settings=a;return this};a.Optimizer.OptimizerSettings.prototype.setGrayscaleImageSettings=function(a){this.grayscale_image_settings=a;return this};a.Optimizer.OptimizerSettings.prototype.setMonoImageSettings=
function(a){this.mono_image_settings=a;return this};a.Optimizer.OptimizerSettings.prototype.setTextSettings=function(a){this.text_settings=a;return this};a.Optimizer.OptimizerSettings.prototype.removeCustomEntries=function(a){this.remove_custom=a;return this};a.Optimizer.ImageSettings.CompressionMode={e_retain:0,e_flate:1,e_jpeg:2,e_jpeg2000:3,e_none:4};a.Optimizer.ImageSettings.DownsampleMode={e_off:0,e_default:1};a.Optimizer.MonoImageSettings.CompressionMode={e_jbig2:0,e_flate:1,e_none:2};a.Optimizer.MonoImageSettings.DownsampleMode=
{e_off:0,e_default:1};a.Convert.ConversionOptions=function(a){this.name="PDFNet.Convert.ConversionOptions";a&&p(JSON.parse(a),this)};a.Convert.createOfficeToPDFOptions=function(b){return Promise.resolve(new a.Convert.OfficeToPDFOptions(b))};a.Convert.OfficeToPDFOptions=function(b){a.Convert.ConversionOptions.call(this,b)};a.Convert.OfficeToPDFOptions.prototype.setApplyPageBreaksToSheet=function(a){this.ApplyPageBreaksToSheet=a;return this};a.Convert.OfficeToPDFOptions.prototype.setDisplayChangeTracking=
function(a){this.DisplayChangeTracking=a;return this};a.Convert.OfficeToPDFOptions.prototype.setExcelDefaultCellBorderWidth=function(a){this.ExcelDefaultCellBorderWidth=a;return this};a.Convert.OfficeToPDFOptions.prototype.setExcelMaxAllowedCellCount=function(a){this.ExcelMaxAllowedCellCount=a;return this};a.Convert.OfficeToPDFOptions.prototype.setLocale=function(a){this.Locale=a;return this};a.Convert.OfficeToPDFOptions.prototype.setTemplateParamsJson=function(a){this.TemplateParamsJson=a;return this};
a.Convert.OverprintPreviewMode={e_op_off:0,e_op_on:1,e_op_pdfx_on:2};a.Convert.XPSOutputCommonOptions=function(){this.name="PDFNet.Convert.XPSOutputCommonOptions"};a.Convert.XPSOutputCommonOptions.prototype.setPrintMode=function(a){this.PRINTMODE=a;return this};a.Convert.XPSOutputCommonOptions.prototype.setDPI=function(a){this.DPI=a;return this};a.Convert.XPSOutputCommonOptions.prototype.setRenderPages=function(a){this.RENDER=a;return this};a.Convert.XPSOutputCommonOptions.prototype.setThickenLines=
function(a){this.THICKENLINES=a;return this};a.Convert.XPSOutputCommonOptions.prototype.generateURLLinks=function(a){this.URL_LINKS=a;return this};a.Convert.XPSOutputCommonOptions.prototype.setOverprint=function(b){switch(b){case a.Convert.OverprintPreviewMode.e_op_off:this.OVERPRINT_MODE="OFF";break;case a.Convert.OverprintPreviewMode.e_op_on:this.OVERPRINT_MODE="ON";break;case a.Convert.OverprintPreviewMode.e_op_pdfx_on:this.OVERPRINT_MODE="PDFX";break;default:console.log("unrecognized PDFNet.Convert.OverprintPreviewMode type: "+
b)}return this};a.Convert.createXPSOutputOptions=function(){return Promise.resolve(new a.Convert.XPSOutputOptions)};a.Convert.XPSOutputOptions=function(){this.name="PDFNet.Convert.XPSOutputOptions"};a.Convert.XPSOutputOptions.prototype=Object.create(a.Convert.XPSOutputCommonOptions.prototype);a.Convert.XPSOutputOptions.prototype.setOpenXps=function(a){this.OPENXPS=a;return this};a.Convert.FlattenFlag={e_off:0,e_simple:1,e_fast:2,e_high_quality:3};a.Convert.FlattenThresholdFlag={e_very_strict:0,e_strict:1,
e_default:2,e_keep_most:3,e_keep_all:4};a.Convert.AnnotationOutputFlag={e_internal_xfdf:0,e_external_xfdf:1,e_flatten:2};a.Convert.createXODOutputOptions=function(){return Promise.resolve(new a.Convert.XODOutputOptions)};a.Convert.XODOutputOptions=function(){this.name="PDFNet.Convert.XODOutputOptions"};a.Convert.XODOutputOptions.prototype=Object.create(a.Convert.XPSOutputCommonOptions.prototype);a.Convert.XODOutputOptions.prototype.setOutputThumbnails=function(a){this.NOTHUMBS=a;return this};a.Convert.XODOutputOptions.prototype.setOutputThumbnails=
function(a){this.NOTHUMBS=a;return this};a.Convert.XODOutputOptions.prototype.setThumbnailSize=function(a,c){this.THUMB_SIZE=a;this.LARGE_THUMB_SIZE=c?c:a;return this};a.Convert.XODOutputOptions.prototype.setElementLimit=function(a){this.ELEMENTLIMIT=a;return this};a.Convert.XODOutputOptions.prototype.setOpacityMaskWorkaround=function(a){this.MASKRENDER=a;return this};a.Convert.XODOutputOptions.prototype.setMaximumImagePixels=function(a){this.MAX_IMAGE_PIXELS=a;return this};a.Convert.XODOutputOptions.prototype.setFlattenContent=
function(b){switch(b){case a.Convert.FlattenFlag.e_off:this.FLATTEN_CONTENT="OFF";break;case a.Convert.FlattenFlag.e_simple:this.FLATTEN_CONTENT="SIMPLE";break;case a.Convert.FlattenFlag.e_fast:this.FLATTEN_CONTENT="FAST";break;case a.Convert.FlattenFlag.e_high_quality:this.FLATTEN_CONTENT="HIGH_QUALITY";break;default:console.log("unrecognized PDFNet.Convert.FlattenFlag type: "+b)}return this};a.Convert.XODOutputOptions.prototype.setFlattenThreshold=function(b){switch(b){case a.Convert.FlattenThresholdFlag.e_very_strict:this.FLATTEN_THRESHOLD=
"VERY_STRICT";break;case a.Convert.FlattenThresholdFlag.e_strict:this.FLATTEN_THRESHOLD="STRICT";break;case a.Convert.FlattenThresholdFlag.e_default:this.FLATTEN_THRESHOLD="DEFAULT";break;case a.Convert.FlattenThresholdFlag.e_keep_most:this.FLATTEN_THRESHOLD="KEEP_MOST";break;case a.Convert.FlattenThresholdFlag.e_keep_all:this.FLATTEN_THRESHOLD="KEEP_ALL";break;default:console.log("unrecognized PDFNet.Convert.FlattenThresholdFlag type: "+b)}return this};a.Convert.XODOutputOptions.prototype.setPreferJPG=
function(a){this.PREFER_JPEG=a;return this};a.Convert.XODOutputOptions.prototype.setJPGQuality=function(a){this.JPEG_QUALITY=a;return this};a.Convert.XODOutputOptions.prototype.setSilverlightTextWorkaround=function(a){this.REMOVE_ROTATED_TEXT=a;return this};a.Convert.XODOutputOptions.prototype.setAnnotationOutput=function(b){switch(b){case a.Convert.AnnotationOutputFlag.e_internal_xfdf:this.ANNOTATION_OUTPUT="INTERNAL";break;case a.Convert.AnnotationOutputFlag.e_external_xfdf:this.ANNOTATION_OUTPUT=
"EXTERNAL";break;case a.Convert.AnnotationOutputFlag.e_flatten:this.ANNOTATION_OUTPUT="FLATTEN";break;default:console.log("unrecognized PDFNet.Convert.AnnotationOutputFlag type: "+b)}return this};a.Convert.XODOutputOptions.prototype.setExternalParts=function(a){this.EXTERNAL_PARTS=a;return this};a.Convert.XODOutputOptions.prototype.setEncryptPassword=function(a){this.ENCRYPT_PASSWORD=a;return this};a.Convert.XODOutputOptions.prototype.useSilverlightFlashCompatible=function(a){this.COMPATIBLE_XOD=
a;return this};a.Convert.createTiffOutputOptions=function(){return Promise.resolve(new a.Convert.TiffOutputOptions)};a.Convert.TiffOutputOptions=function(){this.name="PDFNet.Convert.TiffOutputOptions"};a.Convert.TiffOutputOptions.prototype.setBox=function(b){switch(b){case a.Page.Box.e_media:this.BOX="media";break;case a.Page.Box.e_crop:this.BOX="crop";break;case a.Page.Box.e_bleed:this.BOX="bleed";break;case a.Page.Box.e_trim:this.BOX="trim";break;case a.Page.Box.e_art:this.BOX="art";break;default:console.log("unrecognized PDFNet.Page.Box type: "+
b)}return this};a.Convert.TiffOutputOptions.prototype.setRotate=function(b){switch(b){case a.Page.Box.e_0:this.ROTATE="0";break;case a.Page.Box.e_90:this.ROTATE="90";break;case a.Page.Box.e_180:this.ROTATE="180";break;case a.Page.Box.e_270:this.ROTATE="270";break;default:console.log("unrecognized PDFNet.Page.Rotate type: "+b)}return this};a.Convert.TiffOutputOptions.prototype.setClip=function(a,c,e,d){this.CLIP_X1=a;this.CLIP_Y1=c;this.CLIP_X2=e;this.CLIP_Y2=d;return this};a.Convert.TiffOutputOptions.prototype.setPages=
function(a){this.PAGES=a;return this};a.Convert.TiffOutputOptions.prototype.setOverprint=function(b){switch(b){case a.PDFRasterizer.OverprintPreviewMode.e_op_off:this.OVERPRINT_MODE="OFF";break;case a.PDFRasterizer.OverprintPreviewMode.e_op_on:this.OVERPRINT_MODE="ON";break;case a.PDFRasterizer.OverprintPreviewMode.e_op_pdfx_on:this.OVERPRINT_MODE="PDFX";break;default:console.log("unrecognized PDFNet.PDFRasterizer.OverprintPreviewMode type: "+b)}return this};a.Convert.TiffOutputOptions.prototype.setCMYK=
function(a){this.CMYK=a;return this};a.Convert.TiffOutputOptions.prototype.setDither=function(a){this.DITHER=a;return this};a.Convert.TiffOutputOptions.prototype.setGray=function(a){this.GRAY=a;return this};a.Convert.TiffOutputOptions.prototype.setMono=function(a){this.MONO=a;return this};a.Convert.TiffOutputOptions.prototype.setAnnots=function(a){this.ANNOTS=a;return this};a.Convert.TiffOutputOptions.prototype.setSmooth=function(a){this.SMOOTH=a;return this};a.Convert.TiffOutputOptions.prototype.setPrintmode=
function(a){this.PRINTMODE=a;return this};a.Convert.TiffOutputOptions.prototype.setTransparentPage=function(a){this.TRANSPARENT_PAGE=a;return this};a.Convert.TiffOutputOptions.prototype.setPalettized=function(a){this.PALETTIZED=a;return this};a.Convert.TiffOutputOptions.prototype.setDPI=function(a){this.DPI=a;return this};a.Convert.TiffOutputOptions.prototype.setGamma=function(a){this.GAMMA=a;return this};a.Convert.TiffOutputOptions.prototype.setHRes=function(a){this.HRES=a;return this};a.Convert.TiffOutputOptions.prototype.setVRes=
function(a){this.VRES=a;return this};a.Convert.createHTMLOutputOptions=function(){return Promise.resolve(new a.Convert.HTMLOutputOptions)};a.Convert.HTMLOutputOptions=function(){this.name="PDFNet.Convert.HTMLOutputOptions"};a.Convert.HTMLOutputOptions.prototype.setPreferJPG=function(a){this.PREFER_JPEG=a;return this};a.Convert.HTMLOutputOptions.prototype.setJPGQuality=function(a){this.JPEG_QUALITY=a;return this};a.Convert.HTMLOutputOptions.prototype.setDPI=function(a){this.DPI=a;return this};a.Convert.HTMLOutputOptions.prototype.setMaximumImagePixels=
function(a){this.MAX_IMAGE_PIXELS=a;return this};a.Convert.HTMLOutputOptions.ContentReflowSetting={e_fixed_position:0,e_reflow_paragraphs:1};a.Convert.HTMLOutputOptions.prototype.setContentReflowSetting=function(b){switch(b){case a.Convert.HTMLOutputOptions.ContentReflowSetting.e_fixed_position:this.REFLOW="FIXED_POSITION";break;case a.Convert.HTMLOutputOptions.ContentReflowSetting.e_reflow_paragraphs:this.REFLOW="REFLOW_PARAGRAPHS";break;default:console.log("unrecognized PDFNet.Convert.HTMLOutputOptions.ContentReflowSetting type: "+
b)}return this};a.Convert.HTMLOutputOptions.prototype.setScale=function(a){this.SCALE=a;return this};a.Convert.HTMLOutputOptions.prototype.setExternalLinks=function(a){this.EXTERNAL_LINKS=a;return this};a.Convert.HTMLOutputOptions.prototype.setInternalLinks=function(a){this.INTERNAL_LINKS=a;return this};a.Convert.HTMLOutputOptions.prototype.setSimplifyText=function(a){this.SIMPLIFY_TEXT=a;return this};a.Convert.HTMLOutputOptions.prototype.setTitle=function(a){this.TITLE=a;return this};a.Convert.HTMLOutputOptions.prototype.setImageDPI=
function(a){this.IMAGE_DPI=a;return this};a.Convert.HTMLOutputOptions.prototype.setEmbedImages=function(a){this.EMBED_IMAGES=a;return this};a.Convert.HTMLOutputOptions.prototype.setFileConversionTimeoutSeconds=function(a){this.FILE_TIMEOUT=a;return this};a.Convert.HTMLOutputOptions.prototype.setPages=function(a,c){this.PAGE_FROM=a;this.PAGE_TO=c;return this};a.Convert.HTMLOutputOptions.prototype.setPDFPassword=function(a){this.PASSWORD=a;return this};a.Convert.HTMLOutputOptions.SearchableImageSetting=
{e_ocr_image_text:0,e_ocr_image:1,e_ocr_text:2};a.Convert.HTMLOutputOptions.prototype.setSearchableImageSetting=function(b){switch(b){case a.Convert.HTMLOutputOptions.SearchableImageSetting.e_ocr_image_text:this.OCRED="IMAGE+TEXT";break;case a.Convert.HTMLOutputOptions.SearchableImageSetting.e_ocr_image:this.OCRED="IMAGE";break;case a.Convert.HTMLOutputOptions.SearchableImageSetting.e_ocr_text:this.OCRED="TEXT";break;default:console.log("unrecognized PDFNet.Convert.HTMLOutputOptions.SearchableImageSetting type: "+
b)}return this};a.Convert.HTMLOutputOptions.prototype.setSimpleLists=function(a){this.SIMPLE_LISTS=a;return this};a.Convert.HTMLOutputOptions.prototype.setConnectHyphens=function(a){this.CONNECT_HYPHENS=a;return this};a.Convert.HTMLOutputOptions.prototype.setDisableVerticalSplit=function(a){this.DISABLE_VERTICAL_SPLIT=a;return this};a.Convert.HTMLOutputOptions.prototype.setNoPageWidth=function(a){this.NO_PAGE_WIDTH=a;return this};a.Convert.createEPUBOutputOptions=function(){return Promise.resolve(new a.Convert.EPUBOutputOptions)};
a.Convert.EPUBOutputOptions=function(){this.name="PDFNet.Convert.EPUBOutputOptions"};a.Convert.EPUBOutputOptions.prototype.setExpanded=function(a){this.EPUB_EXPANDED=a;return this};a.Convert.EPUBOutputOptions.prototype.setReuseCover=function(a){this.EPUB_REUSE_COVER=a;return this};a.Convert.createSVGOutputOptions=function(){return Promise.resolve(new a.Convert.SVGOutputOptions)};a.Convert.SVGOutputOptions=function(){this.name="PDFNet.Convert.SVGOutputOptions"};a.Convert.SVGOutputOptions.prototype.setEmbedImages=
function(a){this.EMBEDIMAGES=a;return this};a.Convert.SVGOutputOptions.prototype.setNoFonts=function(a){this.NOFONTS=a;return this};a.Convert.SVGOutputOptions.prototype.setSvgFonts=function(a){this.SVGFONTS=a;return this};a.Convert.SVGOutputOptions.prototype.setEmbedFonts=function(a){this.EMBEDFONTS=a;return this};a.Convert.SVGOutputOptions.prototype.setNoUnicode=function(a){this.NOUNICODE=a;return this};a.Convert.SVGOutputOptions.prototype.setIndividualCharPlacement=function(a){this.INDIVIDUALCHARPLACEMENT=
a;return this};a.Convert.SVGOutputOptions.prototype.setRemoveCharPlacement=function(a){this.REMOVECHARPLACEMENT=a;return this};a.Convert.SVGOutputOptions.prototype.setFlattenContent=function(b){switch(b){case a.Convert.FlattenFlag.e_off:this.FLATTEN_CONTENT="OFF";break;case a.Convert.FlattenFlag.e_simple:this.FLATTEN_CONTENT="SIMPLE";break;case a.Convert.FlattenFlag.e_fast:this.FLATTEN_CONTENT="FAST";break;case a.Convert.FlattenFlag.e_high_quality:this.FLATTEN_CONTENT="HIGH_QUALITY";break;default:console.log("unrecognized PDFNet.Convert.FlattenFlag type: "+
b)}return this};a.Convert.SVGOutputOptions.prototype.setFlattenThreshold=function(b){switch(b){case a.Convert.FlattenThresholdFlag.e_very_strict:this.FLATTEN_THRESHOLD="VERY_STRICT";break;case a.Convert.FlattenThresholdFlag.e_strict:this.FLATTEN_THRESHOLD="STRICT";break;case a.Convert.FlattenThresholdFlag.e_default:this.FLATTEN_THRESHOLD="DEFAULT";break;case a.Convert.FlattenThresholdFlag.e_keep_most:this.FLATTEN_THRESHOLD="KEEP_MOST";break;case a.Convert.FlattenThresholdFlag.e_keep_all:this.FLATTEN_THRESHOLD=
"KEEP_ALL";break;default:console.log("unrecognized PDFNet.Convert.FlattenThresholdFlag type: "+b)}return this};a.Convert.SVGOutputOptions.prototype.setFlattenDPI=function(a){this.DPI=a;return this};a.Convert.SVGOutputOptions.prototype.setFlattenMaximumImagePixels=function(a){this.MAX_IMAGE_PIXELS=a;return this};a.Convert.SVGOutputOptions.prototype.setCompress=function(a){this.SVGZ=a;return this};a.Convert.SVGOutputOptions.prototype.setOutputThumbnails=function(a){this.NOTHUMBS=a;return this};a.Convert.SVGOutputOptions.prototype.setThumbnailSize=
function(a){this.THUMB_SIZE=a;return this};a.Convert.SVGOutputOptions.prototype.setCreateXmlWrapper=function(a){this.NOXMLDOC=a;return this};a.Convert.SVGOutputOptions.prototype.setDtd=function(a){this.OMITDTD=a;return this};a.Convert.SVGOutputOptions.prototype.setAnnots=function(a){this.NOANNOTS=a;return this};a.Convert.SVGOutputOptions.prototype.setOverprint=function(b){switch(b){case a.PDFRasterizer.OverprintPreviewMode.e_op_off:this.OVERPRINT_MODE="OFF";break;case a.PDFRasterizer.OverprintPreviewMode.e_op_on:this.OVERPRINT_MODE=
"ON";break;case a.PDFRasterizer.OverprintPreviewMode.e_op_pdfx_on:this.OVERPRINT_MODE="PDFX";break;default:console.log("unrecognized PDFNet.PDFRasterizer.OverprintPreviewMode type: "+b)}return this};a.Convert.OfficeToPDFOptions.prototype.setLayoutResourcesPluginPath=function(a){this.LayoutResourcesPluginPath=a;return this};a.Convert.OfficeToPDFOptions.prototype.setResourceDocPath=function(a){this.ResourceDocPath=a;return this};a.Convert.OfficeToPDFOptions.prototype.setSmartSubstitutionPluginPath=
function(a){this.SmartSubstitutionPluginPath=a;return this};a.Convert.HTMLOutputOptions.prototype.setReportFile=function(a){this.REPORT_FILE=a;return this};a.Convert.createWordOutputOptions=function(){return Promise.resolve(new a.Convert.WordOutputOptions)};a.Convert.WordOutputOptions=function(){this.name="PDFNet.Convert.WordOutputOptions"};a.Convert.WordOutputOptions.prototype.setJPGQuality=function(a){this.JPEG_QUALITY=a;return this};a.Convert.WordOutputOptions.prototype.setImageDPI=function(a){this.IMAGE_DPI=
a;return this};a.Convert.WordOutputOptions.WordOutputFormat={e_wof_docx:0,e_wof_doc:1,e_wof_rtf:2};a.Convert.WordOutputOptions.prototype.setWordOutputFormat=function(b){switch(b){case a.Convert.WordOutputOptions.WordOutputFormat.e_wof_docx:this.OUTPUT_FORMAT="DOCX";break;case a.Convert.WordOutputOptions.WordOutputFormat.e_wof_doc:this.OUTPUT_FORMAT="DOC";break;case a.Convert.WordOutputOptions.WordOutputFormat.e_wof_rtf:this.OUTPUT_FORMAT="RTF";break;default:console.log("unrecognized PDFNet.Convert.WordOutputOptions.WordOutputFormat type: "+
b)}return this};a.Convert.WordOutputOptions.prototype.setFileConversionTimeoutSeconds=function(a){this.FILE_TIMEOUT=a;return this};a.Convert.WordOutputOptions.prototype.setPages=function(a,c){this.PAGE_FROM=a;this.PAGE_TO=c;return this};a.Convert.WordOutputOptions.prototype.setPDFPassword=function(a){this.PASSWORD=a;return this};a.Convert.WordOutputOptions.BookmarkConversionMethod={e_bm_none:0,e_bm_page:1,e_bm_extract:2};a.Convert.WordOutputOptions.prototype.setBookmarkConversionMethod=function(b){switch(b){case a.Convert.WordOutputOptions.BookmarkConversionMethod.e_bm_none:this.BOOKMARKS=
"NONE";break;case a.Convert.WordOutputOptions.BookmarkConversionMethod.e_bm_page:this.BOOKMARKS="PAGE";break;case a.Convert.WordOutputOptions.BookmarkConversionMethod.e_bm_extract:this.BOOKMARKS="EXTRACT";break;default:console.log("unrecognized PDFNet.Convert.WordOutputOptions.BookmarkConversionMethod type: "+b)}return this};a.Convert.WordOutputOptions.SearchableImageSetting={e_ocr_image_text:0,e_ocr_image:1,e_ocr_text:2};a.Convert.WordOutputOptions.prototype.setSearchableImageSetting=function(b){switch(b){case a.Convert.WordOutputOptions.SearchableImageSetting.e_ocr_image_text:this.OCRED=
"IMAGE+TEXT";break;case a.Convert.WordOutputOptions.SearchableImageSetting.e_ocr_image:this.OCRED="IMAGE";break;case a.Convert.WordOutputOptions.SearchableImageSetting.e_ocr_text:this.OCRED="TEXT";break;default:console.log("unrecognized PDFNet.Convert.WordOutputOptions.SearchableImageSetting type: "+b)}return this};a.Convert.WordOutputOptions.prototype.setShrinkCharacterSpacingToPreventWrap=function(a){this.CONDENSE=a;return this};a.Convert.WordOutputOptions.prototype.setMatchPDFLineBreaks=function(a){this.MATCH_LINES=
a;return this};a.Convert.WordOutputOptions.prototype.setConnectHyphens=function(a){this.CONNECT_HYPHENS=a;return this};a.Convert.WordOutputOptions.prototype.setDoNotAdjustFonts=function(a){this.NO_ADJUST_FONTS=a;return this};a.Convert.WordOutputOptions.prototype.setDisableVerticalSplit=function(a){this.DISABLE_VERTICAL_SPLIT=a;return this};a.Convert.createCADConvertOptions=function(){return Promise.resolve(new a.Convert.CADConvertOptions)};a.Convert.CADConvertOptions=function(){this.name="PDFNet.Convert.CADConvertOptions"};
a.Convert.CADConvertOptions.prototype.setAutoRotate=function(a){this["Auto-rotate"]=a;return this};a.Convert.CADConvertOptions.prototype.setLineWeight=function(a){this["Line-weight"]=a;return this};a.Convert.CADConvertOptions.prototype.setPageHeight=function(a){this["Page-height"]=a;return this};a.Convert.CADConvertOptions.prototype.setPageWidth=function(a){this["Page-width"]=a;return this};a.Convert.CADConvertOptions.prototype.setRasterDPI=function(a){this["Raster-dpi"]=a;return this};a.Convert.CADConvertOptions.prototype.addSheets=
function(a){this.Sheets=a;return this};a.Convert.createAdvancedImagingConvertOptions=function(){return Promise.resolve(new a.Convert.AdvancedImagingConvertOptions)};a.Convert.AdvancedImagingConvertOptions=function(){this.name="PDFNet.Convert.AdvancedImagingConvertOptions"};a.Convert.AdvancedImagingConvertOptions.prototype.setDefaultDPI=function(a){this["Default-dpi"]=a;return this};a.OCRModule.createOCROptions=function(){return Promise.resolve(new a.OCRModule.OCROptions)};a.OCRModule.OCROptions=function(){this.name=
"PDFNet.OCRModule.OCROptions"};a.OCRModule.OCROptions.prototype.addZonesForPage=function(a,c,e){"undefined"===typeof this[a]&&(this[a]=[]);if(this[a].length<e)for(var b=this[a].length;b<e;b++)this[a].push([]);c=c.map(function(a){return[a.x1,a.y1,a.x2,a.y2]});this[a][e-1]=c};a.OCRModule.OCROptions.prototype.addIgnoreZonesForPage=function(a,c){this.addZonesForPage("IgnoreZones",a,c);return this};a.OCRModule.OCROptions.prototype.addLang=function(a){"undefined"===typeof this.Langs&&(this.Langs=[]);this.Langs.push(a);
return this};a.OCRModule.OCROptions.prototype.addTextZonesForPage=function(a,c){this.addZonesForPage("TextZones",a,c);return this};a.OCRModule.OCROptions.prototype.addDPI=function(a){this.DPI=a;return this};a.PDFDoc.createViewerOptimizedOptions=function(){return Promise.resolve(new a.PDFDoc.ViewerOptimizedOptions)};a.PDFDoc.ViewerOptimizedOptions=function(){this.name="PDFNet.PDFDoc.ViewerOptimizedOptions"};a.PDFDoc.ViewerOptimizedOptions.prototype.setThumbnailRenderingThreshold=function(a){this.COMPLEXITY_THRESHOLD=
a;return this};a.PDFDoc.ViewerOptimizedOptions.prototype.setThumbnailSize=function(a){this.THUMB_SIZE=a;return this};a.PDFDoc.ViewerOptimizedOptions.prototype.setOverprint=function(b){switch(b){case a.PDFRasterizer.OverprintPreviewMode.e_op_off:this.OVERPRINT_MODE="OFF";break;case a.PDFRasterizer.OverprintPreviewMode.e_op_on:this.OVERPRINT_MODE="ON";break;case a.PDFRasterizer.OverprintPreviewMode.e_op_pdfx_on:this.OVERPRINT_MODE="PDFX";break;default:console.log("unrecognized PDFNet.PDFRasterizer.OverprintPreviewMode type: "+
b)}return this};a.MarkupAnnot.prototype=new a.Annot;a.TextMarkupAnnot.prototype=new a.MarkupAnnot;a.CaretAnnot.prototype=new a.MarkupAnnot;a.LineAnnot.prototype=new a.MarkupAnnot;a.CircleAnnot.prototype=new a.MarkupAnnot;a.FileAttachmentAnnot.prototype=new a.MarkupAnnot;a.FreeTextAnnot.prototype=new a.MarkupAnnot;a.HighlightAnnot.prototype=new a.TextMarkupAnnot;a.InkAnnot.prototype=new a.MarkupAnnot;a.LinkAnnot.prototype=new a.Annot;a.MovieAnnot.prototype=new a.Annot;a.PolyLineAnnot.prototype=new a.LineAnnot;
a.PolygonAnnot.prototype=new a.PolyLineAnnot;a.PopupAnnot.prototype=new a.Annot;a.RedactionAnnot.prototype=new a.MarkupAnnot;a.RubberStampAnnot.prototype=new a.MarkupAnnot;a.ScreenAnnot.prototype=new a.Annot;a.SoundAnnot.prototype=new a.MarkupAnnot;a.SquareAnnot.prototype=new a.MarkupAnnot;a.SquigglyAnnot.prototype=new a.TextMarkupAnnot;a.StrikeOutAnnot.prototype=new a.TextMarkupAnnot;a.TextAnnot.prototype=new a.MarkupAnnot;a.UnderlineAnnot.prototype=new a.TextMarkupAnnot;a.WatermarkAnnot.prototype=
new a.Annot;a.WidgetAnnot.prototype=new a.Annot;a.SignatureWidget.prototype=new a.WidgetAnnot;a.ComboBoxWidget.prototype=new a.WidgetAnnot;a.ListBoxWidget.prototype=new a.WidgetAnnot;a.TextWidget.prototype=new a.WidgetAnnot;a.CheckBoxWidget.prototype=new a.WidgetAnnot;a.RadioButtonWidget.prototype=new a.WidgetAnnot;a.PushButtonWidget.prototype=new a.WidgetAnnot;a.PrinterMode.PaperSize={e_custom:0,e_letter:1,e_letter_small:2,e_tabloid:3,e_ledger:4,e_legal:5,e_statement:6,e_executive:7,e_a3:8,e_a4:9,
e_a4_mall:10,e_a5:11,e_b4_jis:12,e_b5_jis:13,e_folio:14,e_quarto:15,e_10x14:16,e_11x17:17,e_note:18,e_envelope_9:19,e_envelope_10:20,e_envelope_11:21,e_envelope_12:22,e_envelope_14:23,e_c_size_sheet:24,e_d_size_sheet:25,e_e_size_sheet:26,e_envelope_dl:27,e_envelope_c5:28,e_envelope_c3:29,e_envelope_c4:30,e_envelope_c6:31,e_envelope_c65:32,e_envelope_b4:33,e_envelope_b5:34,e_envelope_b6:35,e_envelope_italy:36,e_envelope_monarch:37,e_6_3_quarters_envelope:38,e_us_std_fanfold:39,e_german_std_fanfold:40,
e_german_legal_fanfold:41,e_b4_iso:42,e_japanese_postcard:43,e_9x11:44,e_10x11:45,e_15x11:46,e_envelope_invite:47,e_reserved_48:48,e_reserved_49:49,e_letter_extra:50,e_legal_extra:51,e_tabloid_extra:52,e_a4_extra:53,e_letter_transverse:54,e_a4_transverse:55,e_letter_extra_transverse:56,e_supera_supera_a4:57,e_Superb_Superb_a3:58,e_letter_plus:59,e_a4_plus:60,e_a5_transverse:61,e_b5_jis_transverse:62,e_a3_extra:63,e_a5_extra:64,e_b5_iso_extra:65,e_a2:66,e_a3_transverse:67,e_a3_extra_transverse:68,
e_japanese_double_postcard:69,e_a6:70,e_japanese_envelope_kaku_2:71,e_japanese_envelope_kaku_3:72,e_japanese_envelope_chou_3:73,e_japanese_envelope_chou_4:74,e_letter_rotated:75,e_a3_rotated:76,e_a4_rotated:77,e_a5_rotated:78,e_b4_jis_rotated:79,e_b5_jis_rotated:80,e_japanese_postcard_rotated:81,e_double_japanese_postcard_rotated:82,e_a6_rotated:83,e_japanese_envelope_kaku_2_rotated:84,e_japanese_envelope_kaku_3_rotated:85,e_japanese_envelope_chou_3_rotated:86,e_japanese_envelope_chou_4_rotated:87,
e_b6_jis:88,e_b6_jis_rotated:89,e_12x11:90,e_japanese_envelope_you_4:91,e_japanese_envelope_you_4_rotated:92,e_PrinterMode_prc_16k:93,e_prc_32k:94,e_prc_32k_big:95,e_prc_envelop_1:96,e_prc_envelop_2:97,e_prc_envelop_3:98,e_prc_envelop_4:99,e_prc_envelop_5:100,e_prc_envelop_6:101,e_prc_envelop_7:102,e_prc_envelop_8:103,e_prc_envelop_9:104,e_prc_envelop_10:105,e_prc_16k_rotated:106,e_prc_32k_rotated:107,e_prc_32k_big__rotated:108,e_prc_envelop_1_rotated:109,e_prc_envelop_2_rotated:110,e_prc_envelop_3_rotated:111,
e_prc_envelop_4_rotated:112,e_prc_envelop_5_rotated:113,e_prc_envelop_6_rotated:114,e_prc_envelop_7_rotated:115,e_prc_envelop_8_rotated:116,e_prc_envelop_9_rotated:117,e_prc_envelop_10_rotated:118};a.Field.EventType={e_action_trigger_keystroke:13,e_action_trigger_format:14,e_action_trigger_validate:15,e_action_trigger_calculate:16};a.Field.Type={e_button:0,e_check:1,e_radio:2,e_text:3,e_choice:4,e_signature:5,e_null:6};a.Field.Flag={e_read_only:0,e_required:1,e_no_export:2,e_pushbutton_flag:3,e_radio_flag:4,
e_toggle_to_off:5,e_radios_in_unison:6,e_multiline:7,e_password:8,e_file_select:9,e_no_spellcheck:10,e_no_scroll:11,e_comb:12,e_rich_text:13,e_combo:14,e_edit:15,e_sort:16,e_multiselect:17,e_commit_on_sel_change:18};a.Field.TextJustification={e_left_justified:0,e_centered:1,e_right_justified:2};a.Filter.StdFileOpenMode={e_read_mode:0,e_write_mode:1,e_append_mode:2};a.Filter.ReferencePos={e_begin:0,e_end:2,e_cur:1};a.OCGContext.OCDrawMode={e_VisibleOC:0,e_AllOC:1,e_NoOC:2};a.OCMD.VisibilityPolicyType=
{e_AllOn:0,e_AnyOn:1,e_AnyOff:2,e_AllOff:3};a.PDFACompliance.Conformance={e_Level1A:1,e_Level1B:2,e_Level2A:3,e_Level2B:4,e_Level2U:5,e_Level3A:6,e_Level3B:7,e_Level3U:8};a.PDFACompliance.ErrorCode={e_PDFA0_1_0:10,e_PDFA0_1_1:11,e_PDFA0_1_2:12,e_PDFA0_1_3:13,e_PDFA0_1_4:14,e_PDFA0_1_5:15,e_PDFA1_2_1:121,e_PDFA1_2_2:122,e_PDFA1_3_1:131,e_PDFA1_3_2:132,e_PDFA1_3_3:133,e_PDFA1_3_4:134,e_PDFA1_4_1:141,e_PDFA1_4_2:142,e_PDFA1_6_1:161,e_PDFA1_7_1:171,e_PDFA1_7_2:172,e_PDFA1_7_3:173,e_PDFA1_7_4:174,e_PDFA1_8_1:181,
e_PDFA1_8_2:182,e_PDFA1_8_3:183,e_PDFA1_8_4:184,e_PDFA1_8_5:185,e_PDFA1_8_6:186,e_PDFA1_10_1:1101,e_PDFA1_11_1:1111,e_PDFA1_11_2:1112,e_PDFA1_12_1:1121,e_PDFA1_12_2:1122,e_PDFA1_12_3:1123,e_PDFA1_12_4:1124,e_PDFA1_12_5:1125,e_PDFA1_12_6:1126,e_PDFA1_13_1:1131,e_PDFA2_2_1:221,e_PDFA2_3_2:232,e_PDFA2_3_3:233,e_PDFA2_3_3_1:2331,e_PDFA2_3_3_2:2332,e_PDFA2_3_4_1:2341,e_PDFA2_4_1:241,e_PDFA2_4_2:242,e_PDFA2_4_3:243,e_PDFA2_4_4:244,e_PDFA2_5_1:251,e_PDFA2_5_2:252,e_PDFA2_6_1:261,e_PDFA2_7_1:271,e_PDFA2_8_1:281,
e_PDFA2_9_1:291,e_PDFA2_10_1:2101,e_PDFA3_2_1:321,e_PDFA3_3_1:331,e_PDFA3_3_2:332,e_PDFA3_3_3_1:3331,e_PDFA3_3_3_2:3332,e_PDFA3_4_1:341,e_PDFA3_5_1:351,e_PDFA3_5_2:352,e_PDFA3_5_3:353,e_PDFA3_5_4:354,e_PDFA3_5_5:355,e_PDFA3_5_6:356,e_PDFA3_6_1:361,e_PDFA3_7_1:371,e_PDFA3_7_2:372,e_PDFA3_7_3:373,e_PDFA4_1:41,e_PDFA4_2:42,e_PDFA4_3:43,e_PDFA4_4:44,e_PDFA4_5:45,e_PDFA4_6:46,e_PDFA5_2_1:521,e_PDFA5_2_2:522,e_PDFA5_2_3:523,e_PDFA5_2_4:524,e_PDFA5_2_5:525,e_PDFA5_2_6:526,e_PDFA5_2_7:527,e_PDFA5_2_8:528,
e_PDFA5_2_9:529,e_PDFA5_2_10:5210,e_PDFA5_2_11:5211,e_PDFA5_3_1:531,e_PDFA5_3_2_1:5321,e_PDFA5_3_2_2:5322,e_PDFA5_3_2_3:5323,e_PDFA5_3_2_4:5324,e_PDFA5_3_2_5:5325,e_PDFA5_3_3_1:5331,e_PDFA5_3_3_2:5332,e_PDFA5_3_3_3:5333,e_PDFA5_3_3_4:5334,e_PDFA5_3_4_0:5340,e_PDFA5_3_4_1:5341,e_PDFA5_3_4_2:5342,e_PDFA5_3_4_3:5343,e_PDFA6_1_1:611,e_PDFA6_1_2:612,e_PDFA6_2_1:621,e_PDFA6_2_2:622,e_PDFA6_2_3:623,e_PDFA7_2_1:721,e_PDFA7_2_2:722,e_PDFA7_2_3:723,e_PDFA7_2_4:724,e_PDFA7_2_5:725,e_PDFA7_3_1:731,e_PDFA7_3_2:732,
e_PDFA7_3_3:733,e_PDFA7_3_4:734,e_PDFA7_3_5:735,e_PDFA7_3_6:736,e_PDFA7_3_7:737,e_PDFA7_3_8:738,e_PDFA7_3_9:739,e_PDFA7_5_1:751,e_PDFA7_8_1:781,e_PDFA7_8_2:782,e_PDFA7_8_3:783,e_PDFA7_8_4:784,e_PDFA7_8_5:785,e_PDFA7_8_6:786,e_PDFA7_8_7:787,e_PDFA7_8_8:788,e_PDFA7_8_9:789,e_PDFA7_8_10:7810,e_PDFA7_8_11:7811,e_PDFA7_8_12:7812,e_PDFA7_8_13:7813,e_PDFA7_8_14:7814,e_PDFA7_8_15:7815,e_PDFA7_8_16:7816,e_PDFA7_8_17:7817,e_PDFA7_8_18:7818,e_PDFA7_8_19:7819,e_PDFA7_8_20:7820,e_PDFA7_8_21:7821,e_PDFA7_8_22:7822,
e_PDFA7_8_23:7823,e_PDFA7_8_24:7824,e_PDFA7_8_25:7825,e_PDFA7_8_26:7826,e_PDFA7_8_27:7827,e_PDFA7_8_28:7828,e_PDFA7_8_29:7829,e_PDFA7_8_30:7830,e_PDFA7_8_31:7831,e_PDFA7_11_1:7111,e_PDFA7_11_2:7112,e_PDFA7_11_3:7113,e_PDFA7_11_4:7114,e_PDFA7_11_5:7115,e_PDFA9_1:91,e_PDFA9_2:92,e_PDFA9_3:93,e_PDFA9_4:94,e_PDFA3_8_1:381,e_PDFA8_2_2:822,e_PDFA8_3_3_1:8331,e_PDFA8_3_3_2:8332,e_PDFA8_3_4_1:8341,e_PDFA1_2_3:123,e_PDFA1_10_2:1102,e_PDFA1_10_3:1103,e_PDFA1_12_10:11210,e_PDFA1_13_5:1135,e_PDFA2_3_10:2310,
e_PDFA2_4_2_10:24220,e_PDFA2_4_2_11:24221,e_PDFA2_4_2_12:24222,e_PDFA2_4_2_13:24223,e_PDFA2_5_10:2510,e_PDFA2_5_11:2511,e_PDFA2_5_12:2512,e_PDFA2_8_3_1:2831,e_PDFA2_8_3_2:2832,e_PDFA2_8_3_3:2833,e_PDFA2_8_3_4:2834,e_PDFA2_8_3_5:2835,e_PDFA2_10_20:21020,e_PDFA2_10_21:21021,e_PDFA11_0_0:11E3,e_PDFA6_2_11_8:62118,e_PDFA8_1:81,e_PDFA_3E1:1,e_PDFA_3E2:2,e_PDFA_3E3:3,e_PDFA_LAST:4};a.ContentItem.Type={e_MCR:0,e_MCID:1,e_OBJR:2,e_Unknown:3};a.Action.Type={e_GoTo:0,e_GoToR:1,e_GoToE:2,e_Launch:3,e_Thread:4,
e_URI:5,e_Sound:6,e_Movie:7,e_Hide:8,e_Named:9,e_SubmitForm:10,e_ResetForm:11,e_ImportData:12,e_JavaScript:13,e_SetOCGState:14,e_Rendition:15,e_Trans:16,e_GoTo3DView:17,e_RichMediaExecute:18,e_Unknown:19};a.Action.FormActionFlag={e_exclude:0,e_include_no_value_fields:1,e_export_format:2,e_get_method:3,e_submit_coordinates:4,e_xfdf:5,e_include_append_saves:6,e_include_annotations:7,e_submit_pdf:8,e_canonical_format:9,e_excl_non_user_annots:10,e_excl_F_key:11,e_embed_form:13};a.Page.EventType={e_action_trigger_page_open:11,
e_action_trigger_page_close:12};a.Page.Box={e_media:0,e_crop:1,e_bleed:2,e_trim:3,e_art:4};a.Page.Rotate={e_0:0,e_90:1,e_180:2,e_270:3};a.Annot.EventType={e_action_trigger_activate:0,e_action_trigger_annot_enter:1,e_action_trigger_annot_exit:2,e_action_trigger_annot_down:3,e_action_trigger_annot_up:4,e_action_trigger_annot_focus:5,e_action_trigger_annot_blur:6,e_action_trigger_annot_page_open:7,e_action_trigger_annot_page_close:8,e_action_trigger_annot_page_visible:9,e_action_trigger_annot_page_invisible:10};
a.Annot.Type={e_Text:0,e_Link:1,e_FreeText:2,e_Line:3,e_Square:4,e_Circle:5,e_Polygon:6,e_Polyline:7,e_Highlight:8,e_Underline:9,e_Squiggly:10,e_StrikeOut:11,e_Stamp:12,e_Caret:13,e_Ink:14,e_Popup:15,e_FileAttachment:16,e_Sound:17,e_Movie:18,e_Widget:19,e_Screen:20,e_PrinterMark:21,e_TrapNet:22,e_Watermark:23,e_3D:24,e_Redact:25,e_Projection:26,e_RichMedia:27,e_Unknown:28};a.Annot.Flag={e_invisible:0,e_hidden:1,e_print:2,e_no_zoom:3,e_no_rotate:4,e_no_view:5,e_annot_read_only:6,e_locked:7,e_toggle_no_view:8,
e_locked_contents:9};a.AnnotBorderStyle.Style={e_solid:0,e_dashed:1,e_beveled:2,e_inset:3,e_underline:4};a.Annot.State={e_normal:0,e_rollover:1,e_down:2};a.LineAnnot.EndingStyle={e_Square:0,e_Circle:1,e_Diamond:2,e_OpenArrow:3,e_ClosedArrow:4,e_Butt:5,e_ROpenArrow:6,e_RClosedArrow:7,e_Slash:8,e_None:9,e_Unknown:10};a.LineAnnot.IntentType={e_LineArrow:0,e_LineDimension:1,e_null:2};a.LineAnnot.CapPos={e_Inline:0,e_Top:1};a.FileAttachmentAnnot.Icon={e_Graph:0,e_PushPin:1,e_Paperclip:2,e_Tag:3,e_Unknown:4};
a.FreeTextAnnot.IntentName={e_FreeText:0,e_FreeTextCallout:1,e_FreeTextTypeWriter:2,e_Unknown:3};a.LinkAnnot.HighlightingMode={e_none:0,e_invert:1,e_outline:2,e_push:3};a.MarkupAnnot.BorderEffect={e_None:0,e_Cloudy:1};a.PolyLineAnnot.IntentType={e_PolygonCloud:0,e_PolyLineDimension:1,e_PolygonDimension:2,e_Unknown:3};a.RedactionAnnot.QuadForm={e_LeftJustified:0,e_Centered:1,e_RightJustified:2,e_None:3};a.RubberStampAnnot.Icon={e_Approved:0,e_Experimental:1,e_NotApproved:2,e_AsIs:3,e_Expired:4,e_NotForPublicRelease:5,
e_Confidential:6,e_Final:7,e_Sold:8,e_Departmental:9,e_ForComment:10,e_TopSecret:11,e_ForPublicRelease:12,e_Draft:13,e_Unknown:14};a.ScreenAnnot.ScaleType={e_Anamorphic:0,e_Proportional:1};a.ScreenAnnot.ScaleCondition={e_Always:0,e_WhenBigger:1,e_WhenSmaller:2,e_Never:3};a.ScreenAnnot.IconCaptionRelation={e_NoIcon:0,e_NoCaption:1,e_CBelowI:2,e_CAboveI:3,e_CRightILeft:4,e_CLeftIRight:5,e_COverlayI:6};a.SoundAnnot.Icon={e_Speaker:0,e_Mic:1,e_Unknown:2};a.TextAnnot.Icon={e_Comment:0,e_Key:1,e_Help:2,
e_NewParagraph:3,e_Paragraph:4,e_Insert:5,e_Note:6,e_Unknown:7};a.WidgetAnnot.HighlightingMode={e_none:0,e_invert:1,e_outline:2,e_push:3,e_toggle:4};a.WidgetAnnot.ScaleType={e_Anamorphic:0,e_Proportional:1};a.WidgetAnnot.IconCaptionRelation={e_NoIcon:0,e_NoCaption:1,e_CBelowI:2,e_CAboveI:3,e_CRightILeft:4,e_CLeftIRight:5,e_COverlayI:6};a.WidgetAnnot.ScaleCondition={e_Always:0,e_WhenBigger:1,e_WhenSmaller:2,e_Never:3};a.ColorSpace.Type={e_device_gray:0,e_device_rgb:1,e_device_cmyk:2,e_cal_gray:3,e_cal_rgb:4,
e_lab:5,e_icc:6,e_indexed:7,e_pattern:8,e_separation:9,e_device_n:10,e_null:11};a.DocumentConversion.Result={e_Success:0,e_Incomplete:1,e_Failure:2};a.Convert.PrinterMode={e_auto:0,e_interop_only:1,e_printer_only:2,e_prefer_builtin_converter:3};a.Destination.FitType={e_XYZ:0,e_Fit:1,e_FitH:2,e_FitV:3,e_FitR:4,e_FitB:5,e_FitBH:6,e_FitBV:7};a.GState.Attribute={e_transform:0,e_rendering_intent:1,e_stroke_cs:2,e_stroke_color:3,e_fill_cs:4,e_fill_color:5,e_line_width:6,e_line_cap:7,e_line_join:8,e_flatness:9,
e_miter_limit:10,e_dash_pattern:11,e_char_spacing:12,e_word_spacing:13,e_horizontal_scale:14,e_leading:15,e_font:16,e_font_size:17,e_text_render_mode:18,e_text_rise:19,e_text_knockout:20,e_text_pos_offset:21,e_blend_mode:22,e_opacity_fill:23,e_opacity_stroke:24,e_alpha_is_shape:25,e_soft_mask:26,e_smoothnes:27,e_auto_stoke_adjust:28,e_stroke_overprint:29,e_fill_overprint:30,e_overprint_mode:31,e_transfer_funct:32,e_BG_funct:33,e_UCR_funct:34,e_halftone:35,e_null:36};a.GState.LineCap={e_butt_cap:0,
e_round_cap:1,e_square_cap:2};a.GState.LineJoin={e_miter_join:0,e_round_join:1,e_bevel_join:2};a.GState.TextRenderingMode={e_fill_text:0,e_stroke_text:1,e_fill_stroke_text:2,e_invisible_text:3,e_fill_clip_text:4,e_stroke_clip_text:5,e_fill_stroke_clip_text:6,e_clip_text:7};a.GState.RenderingIntent={e_absolute_colorimetric:0,e_relative_colorimetric:1,e_saturation:2,e_perceptual:3};a.GState.BlendMode={e_bl_compatible:0,e_bl_normal:1,e_bl_multiply:2,e_bl_screen:3,e_bl_difference:4,e_bl_darken:5,e_bl_lighten:6,
e_bl_color_dodge:7,e_bl_color_burn:8,e_bl_exclusion:9,e_bl_hard_light:10,e_bl_overlay:11,e_bl_soft_light:12,e_bl_luminosity:13,e_bl_hue:14,e_bl_saturation:15,e_bl_color:16};a.Element.Type={e_null:0,e_path:1,e_text_begin:2,e_text:3,e_text_new_line:4,e_text_end:5,e_image:6,e_inline_image:7,e_shading:8,e_form:9,e_group_begin:10,e_group_end:11,e_marked_content_begin:12,e_marked_content_end:13,e_marked_content_point:14};a.Element.PathSegmentType={e_moveto:1,e_lineto:2,e_cubicto:3,e_conicto:4,e_rect:5,
e_closepath:6};a.ShapedText.ShapingStatus={e_FullShaping:0,e_PartialShaping:1,e_NoShaping:2};a.ShapedText.FailureReason={e_NoFailure:0,e_UnsupportedFontType:1,e_NotIndexEncoded:2,e_FontDataNotFound:3};a.ElementWriter.WriteMode={e_underlay:0,e_overlay:1,e_replacement:2};a.Flattener.Threshold={e_very_strict:0,e_strict:1,e_default:2,e_keep_most:3,e_keep_all:4};a.Flattener.Mode={e_simple:0,e_fast:1};a.Font.StandardType1Font={e_times_roman:0,e_times_bold:1,e_times_italic:2,e_times_bold_italic:3,e_helvetica:4,
e_helvetica_bold:5,e_helvetica_oblique:6,e_helvetica_bold_oblique:7,e_courier:8,e_courier_bold:9,e_courier_oblique:10,e_courier_bold_oblique:11,e_symbol:12,e_zapf_dingbats:13,e_null:14};a.Font.Encoding={e_IdentityH:0,e_Indices:1};a.Font.Type={e_Type1:0,e_TrueType:1,e_MMType1:2,e_Type3:3,e_Type0:4,e_CIDType0:5,e_CIDType2:6};a.Function.Type={e_sampled:0,e_exponential:2,e_stitching:3,e_postscript:4};a.HTML2PDF.WebPageSettings.ErrorHandling={e_abort:0,e_skip:1,e_ignore:2};a.HTML2PDF.Proxy.Type={e_default:0,
e_none:1,e_http:2,e_socks5:3};a.Image.InputFilter={e_none:0,e_jpeg:1,e_jp2:2,e_flate:3,e_g3:4,e_g4:5,e_ascii_hex:6};a.PageLabel.Style={e_decimal:0,e_roman_uppercase:1,e_roman_lowercase:2,e_alphabetic_uppercase:3,e_alphabetic_lowercase:4,e_none:5};a.PageSet.Filter={e_all:0,e_even:1,e_odd:2};a.PatternColor.Type={e_uncolored_tiling_pattern:0,e_colored_tiling_pattern:1,e_shading:2,e_null:3};a.PatternColor.TilingType={e_constant_spacing:0,e_no_distortion:1,e_constant_spacing_fast_fill:2};a.GeometryCollection.SnappingMode=
{e_DefaultSnapMode:14,e_PointOnLine:1,e_LineMidpoint:2,e_LineIntersection:4,e_PathEndpoint:8};a.ObjectIdentifier.Predefined={e_commonName:0,e_surname:1,e_countryName:2,e_localityName:3,e_stateOrProvinceName:4,e_streetAddress:5,e_organizationName:6,e_organizationalUnitName:7};a.DigestAlgorithm.Type={e_SHA1:0,e_SHA256:1,e_SHA384:2,e_SHA512:3,e_RIPEMD160:4,e_unknown_digest_algorithm:5};a.DigitalSignatureField.SubFilterType={e_adbe_x509_rsa_sha1:0,e_adbe_pkcs7_detached:1,e_adbe_pkcs7_sha1:2,e_ETSI_CAdES_detached:3,
e_ETSI_RFC3161:4,e_unknown:5,e_absent:6};a.DigitalSignatureField.DocumentPermissions={e_no_changes_allowed:1,e_formfilling_signing_allowed:2,e_annotating_formfilling_signing_allowed:3,e_unrestricted:4};a.DigitalSignatureField.FieldPermissions={e_lock_all:0,e_include:1,e_exclude:2};a.PDFDoc.EventType={e_action_trigger_doc_will_close:17,e_action_trigger_doc_will_save:18,e_action_trigger_doc_did_save:19,e_action_trigger_doc_will_print:20,e_action_trigger_doc_did_print:21};a.PDFDoc.InsertFlag={e_none:0,
e_insert_bookmark:1};a.PDFDoc.ExtractFlag={e_forms_only:0,e_annots_only:1,e_both:2};a.PDFDoc.SignaturesVerificationStatus={e_unsigned:0,e_failure:1,e_untrusted:2,e_unsupported:3,e_verified:4};a.PDFDocViewPrefs.PageMode={e_UseNone:0,e_UseThumbs:1,e_UseBookmarks:2,e_FullScreen:3,e_UseOC:4,e_UseAttachments:5};a.PDFDocViewPrefs.PageLayout={e_Default:0,e_SinglePage:1,e_OneColumn:2,e_TwoColumnLeft:3,e_TwoColumnRight:4,e_TwoPageLeft:5,e_TwoPageRight:6};a.PDFDocViewPrefs.ViewerPref={e_HideToolbar:0,e_HideMenubar:1,
e_HideWindowUI:2,e_FitWindow:3,e_CenterWindow:4,e_DisplayDocTitle:5};a.PDFRasterizer.Type={e_BuiltIn:0,e_GDIPlus:1};a.PDFRasterizer.OverprintPreviewMode={e_op_off:0,e_op_on:1,e_op_pdfx_on:2};a.PDFRasterizer.ColorPostProcessMode={e_postprocess_none:0,e_postprocess_invert:1};a.PDFDraw.PixelFormat={e_rgba:0,e_bgra:1,e_rgb:2,e_bgr:3,e_gray:4,e_gray_alpha:5,e_cmyk:6};a.CMSType={e_lcms:0,e_icm:1,e_no_cms:2};a.CharacterOrdering={e_Identity:0,e_Japan1:1,e_Japan2:2,e_GB1:3,e_CNS1:4,e_Korea1:5};a.LogLevel=
{e_LogLevel_Off:-1,e_LogLevel_Fatal:5,e_LogLevel_Error:4,e_LogLevel_Warning:3,e_LogLevel_Info:2,e_LogLevel_Trace:1,e_LogLevel_Debug:0};a.Shading.Type={e_function_shading:0,e_axial_shading:1,e_radial_shading:2,e_free_gouraud_shading:3,e_lattice_gouraud_shading:4,e_coons_shading:5,e_tensor_shading:6,e_null:7};a.Stamper.SizeType={e_relative_scale:1,e_absolute_size:2,e_font_size:3};a.Stamper.TextAlignment={e_align_left:-1,e_align_center:0,e_align_right:1};a.Stamper.HorizontalAlignment={e_horizontal_left:-1,
e_horizontal_center:0,e_horizontal_right:1};a.Stamper.VerticalAlignment={e_vertical_bottom:-1,e_vertical_center:0,e_vertical_top:1};a.TextExtractor.ProcessingFlags={e_no_ligature_exp:1,e_no_dup_remove:2,e_punct_break:4,e_remove_hidden_text:8,e_no_invisible_text:16};a.TextExtractor.XMLOutputFlags={e_words_as_elements:1,e_output_bbox:2,e_output_style_info:4};a.TextSearch.ResultCode={e_done:0,e_page:1,e_found:2};a.TextSearch.Mode={e_reg_expression:1,e_case_sensitive:2,e_whole_word:4,e_search_up:8,e_page_stop:16,
e_highlight:32,e_ambient_string:64};a.Obj.Type={e_null:0,e_bool:1,e_number:2,e_name:3,e_string:4,e_dict:5,e_array:6,e_stream:7};a.SDFDoc.SaveOptions={e_incremental:1,e_remove_unused:2,e_hex_strings:4,e_omit_xref:8,e_linearized:16,e_compatibility:32};a.SecurityHandler.Permission={e_owner:1,e_doc_open:2,e_doc_modify:3,e_print:4,e_print_high:5,e_extract_content:6,e_mod_annot:7,e_fill_forms:8,e_access_support:9,e_assemble_doc:10};a.SecurityHandler.AlgorithmType={e_RC4_40:1,e_RC4_128:2,e_AES:3,e_AES_256:4};
a.VerificationOptions.SecurityLevel={e_compatibility_and_archiving:0,e_maximum:1};a.VerificationOptions.TimeMode={e_signing:0,e_timestamp:1,e_current:2};a.VerificationOptions.CertificateTrustFlag={e_signing_trust:1,e_certification_trust:2,e_dynamic_content:4,e_javascript:16,e_identity:32,e_trust_anchor:64,e_default_trust:97,e_complete_trust:119};a.VerificationResult.DocumentStatus={e_no_error:0,e_corrupt_file:1,e_unsigned:2,e_bad_byteranges:3,e_corrupt_cryptographic_contents:4};a.VerificationResult.DigestStatus=
{e_digest_invalid:0,e_digest_verified:1,e_digest_verification_disabled:2,e_weak_digest_algorithm_but_digest_verifiable:3,e_no_digest_status:4,e_unsupported_encoding:5};a.VerificationResult.TrustStatus={e_trust_verified:0,e_untrusted:1,e_trust_verification_disabled:2,e_no_trust_status:3};a.VerificationResult.ModificationPermissionsStatus={e_invalidated_by_disallowed_changes:0,e_has_allowed_changes:1,e_unmodified:2,e_permissions_verification_disabled:3,e_no_permissions_status:4};a.DisallowedChange.Type=
{e_form_filled:0,e_digital_signature_signed:1,e_page_template_instantiated:2,e_annotation_created_or_updated_or_deleted:3,e_other:4,e_unknown:5};a.Iterator.prototype.hasNext=function(){return a.messageHandler.sendWithPromise("Iterator.hasNext",{itr:this.id},this.userPriority)};a.Iterator.prototype.next=function(){return a.messageHandler.sendWithPromise("Iterator.next",{itr:this.id},this.userPriority)};a.DictIterator.prototype.hasNext=function(){return a.messageHandler.sendWithPromise("DictIterator.hasNext",
{itr:this.id},this.userPriority)};a.DictIterator.prototype.key=function(){return a.messageHandler.sendWithPromise("DictIterator.key",{itr:this.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.DictIterator.prototype.value=function(){return a.messageHandler.sendWithPromise("DictIterator.value",{itr:this.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.DictIterator.prototype.next=function(){return a.messageHandler.sendWithPromise("DictIterator.next",{itr:this.id},this.userPriority)};
a.Matrix2D.prototype.copy=function(){l("copy",this.yieldFunction);return a.messageHandler.sendWithPromise("Matrix2D.copy",{m:this},this.userPriority).then(function(b){return new a.Matrix2D(b)})};a.Matrix2D.prototype.set=function(b,c,e,m,f,g){d(arguments.length,6,"set","(number, number, number, number, number, number)",[[b,"number"],[c,"number"],[e,"number"],[m,"number"],[f,"number"],[g,"number"]]);l("set",this.yieldFunction);var x=this;this.yieldFunction="Matrix2D.set";return a.messageHandler.sendWithPromise("Matrix2D.set",
{matrix:this,a:b,b:c,c:e,d:m,h:f,v:g},this.userPriority).then(function(a){x.yieldFunction=void 0;p(a,x)})};a.Matrix2D.prototype.concat=function(b,c,e,m,f,g){d(arguments.length,6,"concat","(number, number, number, number, number, number)",[[b,"number"],[c,"number"],[e,"number"],[m,"number"],[f,"number"],[g,"number"]]);l("concat",this.yieldFunction);var x=this;this.yieldFunction="Matrix2D.concat";return a.messageHandler.sendWithPromise("Matrix2D.concat",{matrix:this,a:b,b:c,c:e,d:m,h:f,v:g},this.userPriority).then(function(a){x.yieldFunction=
void 0;p(a,x)})};a.Matrix2D.prototype.equals=function(b){d(arguments.length,1,"equals","(PDFNet.Matrix2D)",[[b,"Structure",a.Matrix2D,"Matrix2D"]]);l("equals",this.yieldFunction);n("equals",[[b,0]]);return a.messageHandler.sendWithPromise("Matrix2D.equals",{m1:this,m2:b},this.userPriority)};a.Matrix2D.prototype.inverse=function(){l("inverse",this.yieldFunction);return a.messageHandler.sendWithPromise("Matrix2D.inverse",{matrix:this},this.userPriority).then(function(b){return new a.Matrix2D(b)})};
a.Matrix2D.prototype.translate=function(b,c){d(arguments.length,2,"translate","(number, number)",[[b,"number"],[c,"number"]]);l("translate",this.yieldFunction);var e=this;this.yieldFunction="Matrix2D.translate";return a.messageHandler.sendWithPromise("Matrix2D.translate",{matrix:this,h:b,v:c},this.userPriority).then(function(a){e.yieldFunction=void 0;p(a,e)})};a.Matrix2D.prototype.preTranslate=function(b,c){d(arguments.length,2,"preTranslate","(number, number)",[[b,"number"],[c,"number"]]);l("preTranslate",
this.yieldFunction);var e=this;this.yieldFunction="Matrix2D.preTranslate";return a.messageHandler.sendWithPromise("Matrix2D.preTranslate",{matrix:this,h:b,v:c},this.userPriority).then(function(a){e.yieldFunction=void 0;p(a,e)})};a.Matrix2D.prototype.postTranslate=function(b,c){d(arguments.length,2,"postTranslate","(number, number)",[[b,"number"],[c,"number"]]);l("postTranslate",this.yieldFunction);var e=this;this.yieldFunction="Matrix2D.postTranslate";return a.messageHandler.sendWithPromise("Matrix2D.postTranslate",
{matrix:this,h:b,v:c},this.userPriority).then(function(a){e.yieldFunction=void 0;p(a,e)})};a.Matrix2D.prototype.scale=function(b,c){d(arguments.length,2,"scale","(number, number)",[[b,"number"],[c,"number"]]);l("scale",this.yieldFunction);var e=this;this.yieldFunction="Matrix2D.scale";return a.messageHandler.sendWithPromise("Matrix2D.scale",{matrix:this,h:b,v:c},this.userPriority).then(function(a){e.yieldFunction=void 0;p(a,e)})};a.Matrix2D.createZeroMatrix=function(){return a.messageHandler.sendWithPromise("matrix2DCreateZeroMatrix",
{},this.userPriority).then(function(b){return new a.Matrix2D(b)})};a.Matrix2D.createIdentityMatrix=function(){return a.messageHandler.sendWithPromise("matrix2DCreateIdentityMatrix",{},this.userPriority).then(function(b){return new a.Matrix2D(b)})};a.Matrix2D.createRotationMatrix=function(b){d(arguments.length,1,"createRotationMatrix","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("matrix2DCreateRotationMatrix",{angle:b},this.userPriority).then(function(b){return new a.Matrix2D(b)})};
a.Matrix2D.prototype.multiply=function(b){d(arguments.length,1,"multiply","(PDFNet.Matrix2D)",[[b,"Structure",a.Matrix2D,"Matrix2D"]]);l("multiply",this.yieldFunction);n("multiply",[[b,0]]);var c=this;this.yieldFunction="Matrix2D.multiply";return a.messageHandler.sendWithPromise("Matrix2D.multiply",{matrix:this,m:b},this.userPriority).then(function(a){c.yieldFunction=void 0;p(a,c)})};a.Field.create=function(b){d(arguments.length,1,"create","(PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("fieldCreate",
{field_dict:b.id},this.userPriority).then(function(b){return new a.Field(b)})};a.Field.prototype.isValid=function(){l("isValid",this.yieldFunction);return a.messageHandler.sendWithPromise("Field.isValid",{field:this},this.userPriority)};a.Field.prototype.getType=function(){l("getType",this.yieldFunction);return a.messageHandler.sendWithPromise("Field.getType",{field:this},this.userPriority)};a.Field.prototype.getValue=function(){l("getValue",this.yieldFunction);return a.messageHandler.sendWithPromise("Field.getValue",
{field:this},this.userPriority).then(function(b){return f(a.Obj,b)})};a.Field.prototype.getValueAsString=function(){l("getValueAsString",this.yieldFunction);return a.messageHandler.sendWithPromise("Field.getValueAsString",{field:this},this.userPriority)};a.Field.prototype.getDefaultValueAsString=function(){l("getDefaultValueAsString",this.yieldFunction);return a.messageHandler.sendWithPromise("Field.getDefaultValueAsString",{field:this},this.userPriority)};a.Field.prototype.setValueAsString=function(b){d(arguments.length,
1,"setValueAsString","(string)",[[b,"string"]]);l("setValueAsString",this.yieldFunction);var c=this;this.yieldFunction="Field.setValueAsString";return a.messageHandler.sendWithPromise("Field.setValueAsString",{field:this,value:b},this.userPriority).then(function(b){c.yieldFunction=void 0;b.result=k(a.ViewChangeCollection,b.result);p(b.field,c);return b.result})};a.Field.prototype.setValue=function(b){d(arguments.length,1,"setValue","(PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"]]);l("setValue",this.yieldFunction);
var c=this;this.yieldFunction="Field.setValue";return a.messageHandler.sendWithPromise("Field.setValue",{field:this,value:b.id},this.userPriority).then(function(b){c.yieldFunction=void 0;b.result=k(a.ViewChangeCollection,b.result);p(b.field,c);return b.result})};a.Field.prototype.setValueAsBool=function(b){d(arguments.length,1,"setValueAsBool","(boolean)",[[b,"boolean"]]);l("setValueAsBool",this.yieldFunction);var c=this;this.yieldFunction="Field.setValueAsBool";return a.messageHandler.sendWithPromise("Field.setValueAsBool",
{field:this,value:b},this.userPriority).then(function(b){c.yieldFunction=void 0;b.result=k(a.ViewChangeCollection,b.result);p(b.field,c);return b.result})};a.Field.prototype.getTriggerAction=function(b){d(arguments.length,1,"getTriggerAction","(number)",[[b,"number"]]);l("getTriggerAction",this.yieldFunction);return a.messageHandler.sendWithPromise("Field.getTriggerAction",{field:this,trigger:b},this.userPriority).then(function(b){return f(a.Obj,b)})};a.Field.prototype.getValueAsBool=function(){l("getValueAsBool",
this.yieldFunction);return a.messageHandler.sendWithPromise("Field.getValueAsBool",{field:this},this.userPriority)};a.Field.prototype.refreshAppearance=function(){l("refreshAppearance",this.yieldFunction);var b=this;this.yieldFunction="Field.refreshAppearance";return a.messageHandler.sendWithPromise("Field.refreshAppearance",{field:this},this.userPriority).then(function(a){b.yieldFunction=void 0;p(a,b)})};a.Field.prototype.eraseAppearance=function(){l("eraseAppearance",this.yieldFunction);var b=this;
this.yieldFunction="Field.eraseAppearance";return a.messageHandler.sendWithPromise("Field.eraseAppearance",{field:this},this.userPriority).then(function(a){b.yieldFunction=void 0;p(a,b)})};a.Field.prototype.getDefaultValue=function(){l("getDefaultValue",this.yieldFunction);return a.messageHandler.sendWithPromise("Field.getDefaultValue",{field:this},this.userPriority).then(function(b){return f(a.Obj,b)})};a.Field.prototype.getName=function(){l("getName",this.yieldFunction);return a.messageHandler.sendWithPromise("Field.getName",
{field:this},this.userPriority)};a.Field.prototype.getPartialName=function(){l("getPartialName",this.yieldFunction);return a.messageHandler.sendWithPromise("Field.getPartialName",{field:this},this.userPriority)};a.Field.prototype.rename=function(b){d(arguments.length,1,"rename","(string)",[[b,"string"]]);l("rename",this.yieldFunction);var c=this;this.yieldFunction="Field.rename";return a.messageHandler.sendWithPromise("Field.rename",{field:this,field_name:b},this.userPriority).then(function(a){c.yieldFunction=
void 0;p(a,c)})};a.Field.prototype.isAnnot=function(){l("isAnnot",this.yieldFunction);return a.messageHandler.sendWithPromise("Field.isAnnot",{field:this},this.userPriority)};a.Field.prototype.useSignatureHandler=function(b){d(arguments.length,1,"useSignatureHandler","(number)",[[b,"number"]]);l("useSignatureHandler",this.yieldFunction);var c=this;this.yieldFunction="Field.useSignatureHandler";return a.messageHandler.sendWithPromise("Field.useSignatureHandler",{field:this,signature_handler_id:b},
this.userPriority).then(function(b){c.yieldFunction=void 0;b.result=f(a.Obj,b.result);p(b.field,c);return b.result})};a.Field.prototype.getFlag=function(b){d(arguments.length,1,"getFlag","(number)",[[b,"number"]]);l("getFlag",this.yieldFunction);return a.messageHandler.sendWithPromise("Field.getFlag",{field:this,flag:b},this.userPriority)};a.Field.prototype.setFlag=function(b,c){d(arguments.length,2,"setFlag","(number, boolean)",[[b,"number"],[c,"boolean"]]);l("setFlag",this.yieldFunction);var e=
this;this.yieldFunction="Field.setFlag";return a.messageHandler.sendWithPromise("Field.setFlag",{field:this,flag:b,value:c},this.userPriority).then(function(a){e.yieldFunction=void 0;p(a,e)})};a.Field.prototype.getJustification=function(){l("getJustification",this.yieldFunction);var b=this;this.yieldFunction="Field.getJustification";return a.messageHandler.sendWithPromise("Field.getJustification",{field:this},this.userPriority).then(function(a){b.yieldFunction=void 0;p(a.field,b);return a.result})};
a.Field.prototype.setJustification=function(b){d(arguments.length,1,"setJustification","(number)",[[b,"number"]]);l("setJustification",this.yieldFunction);var c=this;this.yieldFunction="Field.setJustification";return a.messageHandler.sendWithPromise("Field.setJustification",{field:this,j:b},this.userPriority).then(function(a){c.yieldFunction=void 0;p(a,c)})};a.Field.prototype.setMaxLen=function(b){d(arguments.length,1,"setMaxLen","(number)",[[b,"number"]]);l("setMaxLen",this.yieldFunction);var c=
this;this.yieldFunction="Field.setMaxLen";return a.messageHandler.sendWithPromise("Field.setMaxLen",{field:this,max_len:b},this.userPriority).then(function(a){c.yieldFunction=void 0;p(a,c)})};a.Field.prototype.getMaxLen=function(){l("getMaxLen",this.yieldFunction);return a.messageHandler.sendWithPromise("Field.getMaxLen",{field:this},this.userPriority)};a.Field.prototype.getDefaultAppearance=function(){l("getDefaultAppearance",this.yieldFunction);var b=this;this.yieldFunction="Field.getDefaultAppearance";
return a.messageHandler.sendWithPromise("Field.getDefaultAppearance",{field:this},this.userPriority).then(function(c){b.yieldFunction=void 0;c.result=f(a.GState,c.result);p(c.field,b);return c.result})};a.Field.prototype.getUpdateRect=function(){l("getUpdateRect",this.yieldFunction);return a.messageHandler.sendWithPromise("Field.getUpdateRect",{field:this},this.userPriority).then(function(b){return new a.Rect(b)})};a.Field.prototype.flatten=function(b){d(arguments.length,1,"flatten","(PDFNet.Page)",
[[b,"Object",a.Page,"Page"]]);l("flatten",this.yieldFunction);var c=this;this.yieldFunction="Field.flatten";return a.messageHandler.sendWithPromise("Field.flatten",{field:this,page:b.id},this.userPriority).then(function(a){c.yieldFunction=void 0;p(a,c)})};a.Field.prototype.findInheritedAttribute=function(b){d(arguments.length,1,"findInheritedAttribute","(string)",[[b,"string"]]);l("findInheritedAttribute",this.yieldFunction);return a.messageHandler.sendWithPromise("Field.findInheritedAttribute",{field:this,
attrib:b},this.userPriority).then(function(b){return f(a.Obj,b)})};a.Field.prototype.getSDFObj=function(){l("getSDFObj",this.yieldFunction);return a.messageHandler.sendWithPromise("Field.getSDFObj",{field:this},this.userPriority).then(function(b){return f(a.Obj,b)})};a.Field.prototype.getOptCount=function(){l("getOptCount",this.yieldFunction);return a.messageHandler.sendWithPromise("Field.getOptCount",{field:this},this.userPriority)};a.Field.prototype.getOpt=function(b){d(arguments.length,1,"getOpt",
"(number)",[[b,"number"]]);l("getOpt",this.yieldFunction);return a.messageHandler.sendWithPromise("Field.getOpt",{field:this,index:b},this.userPriority)};a.Field.prototype.isLockedByDigitalSignature=function(){l("isLockedByDigitalSignature",this.yieldFunction);return a.messageHandler.sendWithPromise("Field.isLockedByDigitalSignature",{field:this},this.userPriority)};a.FDFDoc.create=function(){return a.messageHandler.sendWithPromise("fdfDocCreate",{},this.userPriority).then(function(b){return k(a.FDFDoc,
b)})};a.FDFDoc.createFromFilePath=function(b){d(arguments.length,1,"createFromFilePath","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("fdfDocCreateFromFilePath",{filepath:b},this.userPriority).then(function(b){return k(a.FDFDoc,b)})};a.FDFDoc.createFromUFilePath=function(b){d(arguments.length,1,"createFromUFilePath","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("fdfDocCreateFromUFilePath",{filepath:b},this.userPriority).then(function(b){return k(a.FDFDoc,
b)})};a.FDFDoc.createFromStream=function(b){d(arguments.length,1,"createFromStream","(PDFNet.Filter)",[[b,"Object",a.Filter,"Filter"]]);0!=b.id&&r(b.id);return a.messageHandler.sendWithPromise("fdfDocCreateFromStream",{no_own_stream:b.id},this.userPriority).then(function(b){return k(a.FDFDoc,b)})};a.FDFDoc.createFromMemoryBuffer=function(b){d(arguments.length,1,"createFromMemoryBuffer","(ArrayBuffer|TypedArray)",[[b,"ArrayBuffer"]]);var c=v(b,!1);return a.messageHandler.sendWithPromise("fdfDocCreateFromMemoryBuffer",
{buf:c},this.userPriority).then(function(b){return k(a.FDFDoc,b)})};a.FDFDoc.prototype.isModified=function(){return a.messageHandler.sendWithPromise("FDFDoc.isModified",{doc:this.id},this.userPriority)};a.FDFDoc.prototype.save=function(b){d(arguments.length,1,"save","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("FDFDoc.save",{doc:this.id,path:b},this.userPriority)};a.FDFDoc.prototype.saveMemoryBuffer=function(){return a.messageHandler.sendWithPromise("FDFDoc.saveMemoryBuffer",
{doc:this.id},this.userPriority).then(function(a){return new Uint8Array(a)})};a.FDFDoc.prototype.getTrailer=function(){return a.messageHandler.sendWithPromise("FDFDoc.getTrailer",{doc:this.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.FDFDoc.prototype.getRoot=function(){return a.messageHandler.sendWithPromise("FDFDoc.getRoot",{doc:this.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.FDFDoc.prototype.getFDF=function(){return a.messageHandler.sendWithPromise("FDFDoc.getFDF",
{doc:this.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.FDFDoc.prototype.getPDFFileName=function(){return a.messageHandler.sendWithPromise("FDFDoc.getPDFFileName",{doc:this.id},this.userPriority)};a.FDFDoc.prototype.setPDFFileName=function(b){d(arguments.length,1,"setPDFFileName","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("FDFDoc.setPDFFileName",{doc:this.id,filepath:b},this.userPriority)};a.FDFDoc.prototype.getID=function(){return a.messageHandler.sendWithPromise("FDFDoc.getID",
{doc:this.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.FDFDoc.prototype.setID=function(b){d(arguments.length,1,"setID","(PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("FDFDoc.setID",{doc:this.id,id:b.id},this.userPriority)};a.FDFDoc.prototype.getFieldIteratorBegin=function(){return a.messageHandler.sendWithPromise("FDFDoc.getFieldIteratorBegin",{doc:this.id},this.userPriority).then(function(b){return k(a.Iterator,b,"FDFField")})};a.FDFDoc.prototype.getFieldIterator=
function(b){d(arguments.length,1,"getFieldIterator","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("FDFDoc.getFieldIterator",{doc:this.id,field_name:b},this.userPriority).then(function(b){return k(a.Iterator,b,"FDFField")})};a.FDFDoc.prototype.getField=function(b){d(arguments.length,1,"getField","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("FDFDoc.getField",{doc:this.id,field_name:b},this.userPriority).then(function(b){return new a.FDFField(b)})};a.FDFDoc.prototype.fieldCreate=
function(b,c,e){"undefined"===typeof e&&(e=new a.Obj("0"));d(arguments.length,2,"fieldCreate","(string, number, PDFNet.Obj)",[[b,"string"],[c,"number"],[e,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("FDFDoc.fieldCreate",{doc:this.id,field_name:b,type:c,field_value:e.id},this.userPriority).then(function(b){return new a.FDFField(b)})};a.FDFDoc.prototype.fieldCreateFromString=function(b,c,e){d(arguments.length,3,"fieldCreateFromString","(string, number, string)",[[b,"string"],[c,
"number"],[e,"string"]]);return a.messageHandler.sendWithPromise("FDFDoc.fieldCreateFromString",{doc:this.id,field_name:b,type:c,field_value:e},this.userPriority).then(function(b){return new a.FDFField(b)})};a.FDFDoc.prototype.getSDFDoc=function(){return a.messageHandler.sendWithPromise("FDFDoc.getSDFDoc",{doc:this.id},this.userPriority).then(function(b){return f(a.SDFDoc,b)})};a.FDFDoc.createFromXFDF=function(b){d(arguments.length,1,"createFromXFDF","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("fdfDocCreateFromXFDF",
{file_name:b},this.userPriority).then(function(b){return k(a.FDFDoc,b)})};a.FDFDoc.prototype.saveAsXFDF=function(b){d(arguments.length,1,"saveAsXFDF","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("FDFDoc.saveAsXFDF",{doc:this.id,filepath:b},this.userPriority)};a.FDFDoc.prototype.saveAsXFDFAsString=function(){return a.messageHandler.sendWithPromise("FDFDoc.saveAsXFDFAsString",{doc:this.id},this.userPriority)};a.FDFDoc.prototype.mergeAnnots=function(b,c){"undefined"===typeof c&&
(c="");d(arguments.length,1,"mergeAnnots","(string, string)",[[b,"string"],[c,"string"]]);return a.messageHandler.sendWithPromise("FDFDoc.mergeAnnots",{doc:this.id,command_file:b,permitted_user:c},this.userPriority)};a.FDFField.create=function(b,c){"undefined"===typeof b&&(b=new a.Obj("0"));"undefined"===typeof c&&(c=new a.Obj("0"));d(arguments.length,0,"create","(PDFNet.Obj, PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"],[c,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("fdfFieldCreate",
{field_dict:b.id,fdf_dict:c.id},this.userPriority).then(function(b){return new a.FDFField(b)})};a.FDFField.prototype.getValue=function(){l("getValue",this.yieldFunction);var b=this;this.yieldFunction="FDFField.getValue";return a.messageHandler.sendWithPromise("FDFField.getValue",{field:this},this.userPriority).then(function(c){b.yieldFunction=void 0;c.result=f(a.Obj,c.result);p(c.field,b);return c.result})};a.FDFField.prototype.setValue=function(b){d(arguments.length,1,"setValue","(PDFNet.Obj)",[[b,
"Object",a.Obj,"Obj"]]);l("setValue",this.yieldFunction);var c=this;this.yieldFunction="FDFField.setValue";return a.messageHandler.sendWithPromise("FDFField.setValue",{field:this,value:b.id},this.userPriority).then(function(a){c.yieldFunction=void 0;p(a,c)})};a.FDFField.prototype.getName=function(){l("getName",this.yieldFunction);var b=this;this.yieldFunction="FDFField.getName";return a.messageHandler.sendWithPromise("FDFField.getName",{field:this},this.userPriority).then(function(a){b.yieldFunction=
void 0;p(a.field,b);return a.result})};a.FDFField.prototype.getPartialName=function(){l("getPartialName",this.yieldFunction);var b=this;this.yieldFunction="FDFField.getPartialName";return a.messageHandler.sendWithPromise("FDFField.getPartialName",{field:this},this.userPriority).then(function(a){b.yieldFunction=void 0;p(a.field,b);return a.result})};a.FDFField.prototype.getSDFObj=function(){l("getSDFObj",this.yieldFunction);return a.messageHandler.sendWithPromise("FDFField.getSDFObj",{field:this},
this.userPriority).then(function(b){return f(a.Obj,b)})};a.FDFField.prototype.findAttribute=function(b){d(arguments.length,1,"findAttribute","(string)",[[b,"string"]]);l("findAttribute",this.yieldFunction);return a.messageHandler.sendWithPromise("FDFField.findAttribute",{field:this,attrib:b},this.userPriority).then(function(b){return f(a.Obj,b)})};a.Filter.prototype.createASCII85Encode=function(b,c){d(arguments.length,2,"createASCII85Encode","(number, number)",[[b,"number"],[c,"number"]]);return a.messageHandler.sendWithPromise("Filter.createASCII85Encode",
{no_own_input_filter:this.id,line_width:b,buf_sz:c},this.userPriority).then(function(b){return k(a.Filter,b)})};a.Filter.createMappedFileFromUString=function(b){d(arguments.length,1,"createMappedFileFromUString","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("filterCreateMappedFileFromUString",{filename:b},this.userPriority).then(function(b){return k(a.Filter,b)})};a.Filter.createMemoryFilter=function(b,c){d(arguments.length,2,"createMemoryFilter","(number, boolean)",[[b,"number"],
[c,"boolean"]]);return a.messageHandler.sendWithPromise("filterCreateMemoryFilter",{buf_sz:b,is_input:c},this.userPriority).then(function(b){return k(a.Filter,b)})};a.Filter.createImage2RGBFromElement=function(b){d(arguments.length,1,"createImage2RGBFromElement","(PDFNet.Element)",[[b,"Object",a.Element,"Element"]]);return a.messageHandler.sendWithPromise("filterCreateImage2RGBFromElement",{elem:b.id},this.userPriority).then(function(b){return k(a.Filter,b)})};a.Filter.createImage2RGBFromObj=function(b){d(arguments.length,
1,"createImage2RGBFromObj","(PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("filterCreateImage2RGBFromObj",{obj:b.id},this.userPriority).then(function(b){return k(a.Filter,b)})};a.Filter.createImage2RGB=function(b){d(arguments.length,1,"createImage2RGB","(PDFNet.Image)",[[b,"Object",a.Image,"Image"]]);return a.messageHandler.sendWithPromise("filterCreateImage2RGB",{img:b.id},this.userPriority).then(function(b){return k(a.Filter,b)})};a.Filter.createImage2RGBAFromElement=
function(b,c){d(arguments.length,2,"createImage2RGBAFromElement","(PDFNet.Element, boolean)",[[b,"Object",a.Element,"Element"],[c,"boolean"]]);return a.messageHandler.sendWithPromise("filterCreateImage2RGBAFromElement",{elem:b.id,premultiply:c},this.userPriority).then(function(b){return k(a.Filter,b)})};a.Filter.createImage2RGBAFromObj=function(b,c){d(arguments.length,2,"createImage2RGBAFromObj","(PDFNet.Obj, boolean)",[[b,"Object",a.Obj,"Obj"],[c,"boolean"]]);return a.messageHandler.sendWithPromise("filterCreateImage2RGBAFromObj",
{obj:b.id,premultiply:c},this.userPriority).then(function(b){return k(a.Filter,b)})};a.Filter.createImage2RGBA=function(b,c){d(arguments.length,2,"createImage2RGBA","(PDFNet.Image, boolean)",[[b,"Object",a.Image,"Image"],[c,"boolean"]]);return a.messageHandler.sendWithPromise("filterCreateImage2RGBA",{img:b.id,premultiply:c},this.userPriority).then(function(b){return k(a.Filter,b)})};a.Filter.prototype.mappedFileFileSize=function(){return a.messageHandler.sendWithPromise("Filter.mappedFileFileSize",
{filter:this.id},this.userPriority)};a.Filter.prototype.mappedFileCompare=function(b){d(arguments.length,1,"mappedFileCompare","(PDFNet.Filter)",[[b,"Object",a.Filter,"Filter"]]);return a.messageHandler.sendWithPromise("Filter.mappedFileCompare",{mf1:this.id,mf2:b.id},this.userPriority)};a.Filter.prototype.attachFilter=function(b){d(arguments.length,1,"attachFilter","(PDFNet.Filter)",[[b,"Object",a.Filter,"Filter"]]);0!=b.id&&r(b.id);return a.messageHandler.sendWithPromise("Filter.attachFilter",{filter:this.id,
no_own_attach_filter:b.id},this.userPriority)};a.Filter.prototype.releaseAttachedFilter=function(){return a.messageHandler.sendWithPromise("Filter.releaseAttachedFilter",{filter:this.id},this.userPriority).then(function(b){return k(a.Filter,b)})};a.Filter.prototype.getAttachedFilter=function(){return a.messageHandler.sendWithPromise("Filter.getAttachedFilter",{filter:this.id},this.userPriority).then(function(b){return f(a.Filter,b)})};a.Filter.prototype.getSourceFilter=function(){return a.messageHandler.sendWithPromise("Filter.getSourceFilter",
{filter:this.id},this.userPriority).then(function(b){return f(a.Filter,b)})};a.Filter.prototype.getName=function(){return a.messageHandler.sendWithPromise("Filter.getName",{filter:this.id},this.userPriority)};a.Filter.prototype.getDecodeName=function(){return a.messageHandler.sendWithPromise("Filter.getDecodeName",{filter:this.id},this.userPriority)};a.Filter.prototype.begin=function(){return a.messageHandler.sendWithPromise("Filter.begin",{filter:this.id},this.userPriority)};a.Filter.prototype.size=
function(){return a.messageHandler.sendWithPromise("Filter.size",{filter:this.id},this.userPriority)};a.Filter.prototype.consume=function(b){d(arguments.length,1,"consume","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("Filter.consume",{filter:this.id,num_bytes:b},this.userPriority)};a.Filter.prototype.count=function(){return a.messageHandler.sendWithPromise("Filter.count",{filter:this.id},this.userPriority)};a.Filter.prototype.setCount=function(b){d(arguments.length,1,"setCount",
"(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("Filter.setCount",{filter:this.id,new_count:b},this.userPriority)};a.Filter.prototype.setStreamLength=function(b){d(arguments.length,1,"setStreamLength","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("Filter.setStreamLength",{filter:this.id,bytes:b},this.userPriority)};a.Filter.prototype.flush=function(){return a.messageHandler.sendWithPromise("Filter.flush",{filter:this.id},this.userPriority)};a.Filter.prototype.flushAll=
function(){return a.messageHandler.sendWithPromise("Filter.flushAll",{filter:this.id},this.userPriority)};a.Filter.prototype.isInputFilter=function(){return a.messageHandler.sendWithPromise("Filter.isInputFilter",{filter:this.id},this.userPriority)};a.Filter.prototype.canSeek=function(){return a.messageHandler.sendWithPromise("Filter.canSeek",{filter:this.id},this.userPriority)};a.Filter.prototype.writeToFile=function(b,c){d(arguments.length,2,"writeToFile","(string, boolean)",[[b,"string"],[c,"boolean"]]);
return a.messageHandler.sendWithPromise("Filter.writeToFile",{filter:this.id,path:b,append:c},this.userPriority)};a.Filter.prototype.seek=function(b,c){d(arguments.length,2,"seek","(number, number)",[[b,"number"],[c,"number"]]);return a.messageHandler.sendWithPromise("Filter.seek",{filter:this.id,offset:b,origin:c},this.userPriority)};a.Filter.prototype.tell=function(){return a.messageHandler.sendWithPromise("Filter.tell",{filter:this.id},this.userPriority)};a.Filter.prototype.createInputIterator=
function(){return a.messageHandler.sendWithPromise("Filter.createInputIterator",{filter:this.id},this.userPriority).then(function(b){return k(a.Filter,b)})};a.Filter.prototype.getFilePath=function(){return a.messageHandler.sendWithPromise("Filter.getFilePath",{filter:this.id},this.userPriority)};a.Filter.prototype.memoryFilterGetBuffer=function(){return a.messageHandler.sendWithPromise("Filter.memoryFilterGetBuffer",{filter:this.id},this.userPriority)};a.Filter.prototype.memoryFilterSetAsInputFilter=
function(){return a.messageHandler.sendWithPromise("Filter.memoryFilterSetAsInputFilter",{filter:this.id},this.userPriority)};a.Filter.prototype.memoryFilterReset=function(){return a.messageHandler.sendWithPromise("Filter.memoryFilterReset",{filter:this.id},this.userPriority)};a.FilterReader.create=function(b){d(arguments.length,1,"create","(PDFNet.Filter)",[[b,"Object",a.Filter,"Filter"]]);return a.messageHandler.sendWithPromise("filterReaderCreate",{filter:b.id},this.userPriority).then(function(b){return k(a.FilterReader,
b)})};a.FilterReader.prototype.attachFilter=function(b){d(arguments.length,1,"attachFilter","(PDFNet.Filter)",[[b,"Object",a.Filter,"Filter"]]);return a.messageHandler.sendWithPromise("FilterReader.attachFilter",{reader:this.id,filter:b.id},this.userPriority)};a.FilterReader.prototype.getAttachedFilter=function(){return a.messageHandler.sendWithPromise("FilterReader.getAttachedFilter",{reader:this.id},this.userPriority).then(function(b){return f(a.Filter,b)})};a.FilterReader.prototype.seek=function(b,
c){d(arguments.length,2,"seek","(number, number)",[[b,"number"],[c,"number"]]);return a.messageHandler.sendWithPromise("FilterReader.seek",{reader:this.id,offset:b,origin:c},this.userPriority)};a.FilterReader.prototype.tell=function(){return a.messageHandler.sendWithPromise("FilterReader.tell",{reader:this.id},this.userPriority)};a.FilterReader.prototype.count=function(){return a.messageHandler.sendWithPromise("FilterReader.count",{reader:this.id},this.userPriority)};a.FilterReader.prototype.flush=
function(){return a.messageHandler.sendWithPromise("FilterReader.flush",{reader:this.id},this.userPriority)};a.FilterReader.prototype.flushAll=function(){return a.messageHandler.sendWithPromise("FilterReader.flushAll",{reader:this.id},this.userPriority)};a.FilterReader.prototype.get=function(){return a.messageHandler.sendWithPromise("FilterReader.get",{reader:this.id},this.userPriority)};a.FilterReader.prototype.peek=function(){return a.messageHandler.sendWithPromise("FilterReader.peek",{reader:this.id},
this.userPriority)};a.FilterWriter.create=function(b){d(arguments.length,1,"create","(PDFNet.Filter)",[[b,"Object",a.Filter,"Filter"]]);return a.messageHandler.sendWithPromise("filterWriterCreate",{filter:b.id},this.userPriority).then(function(b){return k(a.FilterWriter,b)})};a.FilterWriter.prototype.attachFilter=function(b){d(arguments.length,1,"attachFilter","(PDFNet.Filter)",[[b,"Object",a.Filter,"Filter"]]);return a.messageHandler.sendWithPromise("FilterWriter.attachFilter",{writer:this.id,filter:b.id},
this.userPriority)};a.FilterWriter.prototype.getAttachedFilter=function(){return a.messageHandler.sendWithPromise("FilterWriter.getAttachedFilter",{writer:this.id},this.userPriority).then(function(b){return f(a.Filter,b)})};a.FilterWriter.prototype.seek=function(b,c){d(arguments.length,2,"seek","(number, number)",[[b,"number"],[c,"number"]]);return a.messageHandler.sendWithPromise("FilterWriter.seek",{writer:this.id,offset:b,origin:c},this.userPriority)};a.FilterWriter.prototype.tell=function(){return a.messageHandler.sendWithPromise("FilterWriter.tell",
{writer:this.id},this.userPriority)};a.FilterWriter.prototype.count=function(){return a.messageHandler.sendWithPromise("FilterWriter.count",{writer:this.id},this.userPriority)};a.FilterWriter.prototype.flush=function(){return a.messageHandler.sendWithPromise("FilterWriter.flush",{writer:this.id},this.userPriority)};a.FilterWriter.prototype.flushAll=function(){return a.messageHandler.sendWithPromise("FilterWriter.flushAll",{writer:this.id},this.userPriority)};a.FilterWriter.prototype.writeUChar=function(b){d(arguments.length,
1,"writeUChar","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("FilterWriter.writeUChar",{writer:this.id,ch:b},this.userPriority)};a.FilterWriter.prototype.writeInt16=function(b){d(arguments.length,1,"writeInt16","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("FilterWriter.writeInt16",{writer:this.id,num:b},this.userPriority)};a.FilterWriter.prototype.writeUInt16=function(b){d(arguments.length,1,"writeUInt16","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("FilterWriter.writeUInt16",
{writer:this.id,num:b},this.userPriority)};a.FilterWriter.prototype.writeInt32=function(b){d(arguments.length,1,"writeInt32","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("FilterWriter.writeInt32",{writer:this.id,num:b},this.userPriority)};a.FilterWriter.prototype.writeUInt32=function(b){d(arguments.length,1,"writeUInt32","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("FilterWriter.writeUInt32",{writer:this.id,num:b},this.userPriority)};a.FilterWriter.prototype.writeInt64=
function(b){d(arguments.length,1,"writeInt64","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("FilterWriter.writeInt64",{writer:this.id,num:b},this.userPriority)};a.FilterWriter.prototype.writeUInt64=function(b){d(arguments.length,1,"writeUInt64","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("FilterWriter.writeUInt64",{writer:this.id,num:b},this.userPriority)};a.FilterWriter.prototype.writeString=function(b){d(arguments.length,1,"writeString","(string)",[[b,
"string"]]);return a.messageHandler.sendWithPromise("FilterWriter.writeString",{writer:this.id,str:b},this.userPriority)};a.FilterWriter.prototype.writeFilter=function(b){d(arguments.length,1,"writeFilter","(PDFNet.FilterReader)",[[b,"Object",a.FilterReader,"FilterReader"]]);return a.messageHandler.sendWithPromise("FilterWriter.writeFilter",{writer:this.id,reader:b.id},this.userPriority)};a.FilterWriter.prototype.writeLine=function(b,c){"undefined"===typeof c&&(c=13);d(arguments.length,1,"writeLine",
"(string, number)",[[b,"const char* = 0"],[c,"number"]]);return a.messageHandler.sendWithPromise("FilterWriter.writeLine",{writer:this.id,line:b,eol:c},this.userPriority)};a.FilterWriter.prototype.writeBuffer=function(b){d(arguments.length,1,"writeBuffer","(ArrayBuffer|TypedArray)",[[b,"ArrayBuffer"]]);var c=v(b,!1);return a.messageHandler.sendWithPromise("FilterWriter.writeBuffer",{writer:this.id,buf:c},this.userPriority)};a.OCG.create=function(b,c){d(arguments.length,2,"create","(PDFNet.PDFDoc, string)",
[[b,"PDFDoc"],[c,"string"]]);return a.messageHandler.sendWithPromise("ocgCreate",{pdfdoc:b.id,name:c},this.userPriority).then(function(b){return f(a.OCG,b)})};a.OCG.createFromObj=function(b){d(arguments.length,1,"createFromObj","(PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("ocgCreateFromObj",{ocg_dict:b.id},this.userPriority).then(function(b){return f(a.OCG,b)})};a.OCG.prototype.copy=function(){return a.messageHandler.sendWithPromise("OCG.copy",{ocg:this.id},this.userPriority).then(function(b){return f(a.OCG,
b)})};a.OCG.prototype.getSDFObj=function(){return a.messageHandler.sendWithPromise("OCG.getSDFObj",{ocg:this.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.OCG.prototype.isValid=function(){return a.messageHandler.sendWithPromise("OCG.isValid",{ocg:this.id},this.userPriority)};a.OCG.prototype.getName=function(){return a.messageHandler.sendWithPromise("OCG.getName",{c:this.id},this.userPriority)};a.OCG.prototype.setName=function(b){d(arguments.length,1,"setName","(string)",[[b,"string"]]);
return a.messageHandler.sendWithPromise("OCG.setName",{c:this.id,value:b},this.userPriority)};a.OCG.prototype.getIntent=function(){return a.messageHandler.sendWithPromise("OCG.getIntent",{c:this.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.OCG.prototype.setIntent=function(b){d(arguments.length,1,"setIntent","(PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("OCG.setIntent",{c:this.id,value:b.id},this.userPriority)};a.OCG.prototype.hasUsage=function(){return a.messageHandler.sendWithPromise("OCG.hasUsage",
{c:this.id},this.userPriority)};a.OCG.prototype.getUsage=function(b){d(arguments.length,1,"getUsage","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("OCG.getUsage",{c:this.id,key:b},this.userPriority).then(function(b){return f(a.Obj,b)})};a.OCG.prototype.getCurrentState=function(b){d(arguments.length,1,"getCurrentState","(PDFNet.OCGContext)",[[b,"Object",a.OCGContext,"OCGContext"]]);return a.messageHandler.sendWithPromise("OCG.getCurrentState",{c:this.id,ctx:b.id},this.userPriority)};
a.OCG.prototype.setCurrentState=function(b,c){d(arguments.length,2,"setCurrentState","(PDFNet.OCGContext, boolean)",[[b,"Object",a.OCGContext,"OCGContext"],[c,"boolean"]]);return a.messageHandler.sendWithPromise("OCG.setCurrentState",{c:this.id,ctx:b.id,state:c},this.userPriority)};a.OCG.prototype.getInitialState=function(b){d(arguments.length,1,"getInitialState","(PDFNet.OCGConfig)",[[b,"Object",a.OCGConfig,"OCGConfig"]]);return a.messageHandler.sendWithPromise("OCG.getInitialState",{c:this.id,cfg:b.id},
this.userPriority)};a.OCG.prototype.setInitialState=function(b,c){d(arguments.length,2,"setInitialState","(PDFNet.OCGConfig, boolean)",[[b,"Object",a.OCGConfig,"OCGConfig"],[c,"boolean"]]);return a.messageHandler.sendWithPromise("OCG.setInitialState",{c:this.id,cfg:b.id,state:c},this.userPriority)};a.OCG.prototype.isLocked=function(b){d(arguments.length,1,"isLocked","(PDFNet.OCGConfig)",[[b,"Object",a.OCGConfig,"OCGConfig"]]);return a.messageHandler.sendWithPromise("OCG.isLocked",{c:this.id,cfg:b.id},
this.userPriority)};a.OCG.prototype.setLocked=function(b,c){d(arguments.length,2,"setLocked","(PDFNet.OCGConfig, boolean)",[[b,"Object",a.OCGConfig,"OCGConfig"],[c,"boolean"]]);return a.messageHandler.sendWithPromise("OCG.setLocked",{c:this.id,cfg:b.id,state:c},this.userPriority)};a.OCGConfig.createFromObj=function(b){d(arguments.length,1,"createFromObj","(PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("ocgConfigCreateFromObj",{dict:b.id},this.userPriority).then(function(b){return f(a.OCGConfig,
b)})};a.OCGConfig.create=function(b,c){d(arguments.length,2,"create","(PDFNet.PDFDoc, boolean)",[[b,"PDFDoc"],[c,"boolean"]]);return a.messageHandler.sendWithPromise("ocgConfigCreate",{pdfdoc:b.id,default_config:c},this.userPriority).then(function(b){return f(a.OCGConfig,b)})};a.OCGConfig.prototype.copy=function(){return a.messageHandler.sendWithPromise("OCGConfig.copy",{c:this.id},this.userPriority).then(function(b){return f(a.OCGConfig,b)})};a.OCGConfig.prototype.getSDFObj=function(){return a.messageHandler.sendWithPromise("OCGConfig.getSDFObj",
{c:this.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.OCGConfig.prototype.getOrder=function(){return a.messageHandler.sendWithPromise("OCGConfig.getOrder",{c:this.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.OCGConfig.prototype.setOrder=function(b){d(arguments.length,1,"setOrder","(PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("OCGConfig.setOrder",{c:this.id,value:b.id},this.userPriority)};a.OCGConfig.prototype.getName=function(){return a.messageHandler.sendWithPromise("OCGConfig.getName",
{c:this.id},this.userPriority)};a.OCGConfig.prototype.setName=function(b){d(arguments.length,1,"setName","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("OCGConfig.setName",{c:this.id,value:b},this.userPriority)};a.OCGConfig.prototype.getCreator=function(){return a.messageHandler.sendWithPromise("OCGConfig.getCreator",{c:this.id},this.userPriority)};a.OCGConfig.prototype.setCreator=function(b){d(arguments.length,1,"setCreator","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("OCGConfig.setCreator",
{c:this.id,value:b},this.userPriority)};a.OCGConfig.prototype.getInitBaseState=function(){return a.messageHandler.sendWithPromise("OCGConfig.getInitBaseState",{c:this.id},this.userPriority)};a.OCGConfig.prototype.setInitBaseState=function(b){"undefined"===typeof b&&(b="ON");d(arguments.length,0,"setInitBaseState","(string)",[[b,"const char* = 0"]]);return a.messageHandler.sendWithPromise("OCGConfig.setInitBaseState",{c:this.id,value:b},this.userPriority)};a.OCGConfig.prototype.getInitOnStates=function(){return a.messageHandler.sendWithPromise("OCGConfig.getInitOnStates",
{c:this.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.OCGConfig.prototype.setInitOnStates=function(b){d(arguments.length,1,"setInitOnStates","(PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("OCGConfig.setInitOnStates",{c:this.id,value:b.id},this.userPriority)};a.OCGConfig.prototype.getInitOffStates=function(){return a.messageHandler.sendWithPromise("OCGConfig.getInitOffStates",{c:this.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.OCGConfig.prototype.setInitOffStates=
function(b){d(arguments.length,1,"setInitOffStates","(PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("OCGConfig.setInitOffStates",{c:this.id,value:b.id},this.userPriority)};a.OCGConfig.prototype.getIntent=function(){return a.messageHandler.sendWithPromise("OCGConfig.getIntent",{c:this.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.OCGConfig.prototype.setIntent=function(b){d(arguments.length,1,"setIntent","(PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"]]);
return a.messageHandler.sendWithPromise("OCGConfig.setIntent",{c:this.id,value:b.id},this.userPriority)};a.OCGConfig.prototype.getLockedOCGs=function(){return a.messageHandler.sendWithPromise("OCGConfig.getLockedOCGs",{c:this.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.OCGConfig.prototype.setLockedOCGs=function(b){d(arguments.length,1,"setLockedOCGs","(PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("OCGConfig.setLockedOCGs",{c:this.id,value:b.id},
this.userPriority)};a.OCGContext.createFromConfig=function(b){d(arguments.length,1,"createFromConfig","(PDFNet.OCGConfig)",[[b,"Object",a.OCGConfig,"OCGConfig"]]);return a.messageHandler.sendWithPromise("ocgContextCreateFromConfig",{cfg:b.id},this.userPriority).then(function(b){return k(a.OCGContext,b)})};a.OCGContext.prototype.copy=function(){return a.messageHandler.sendWithPromise("OCGContext.copy",{c:this.id},this.userPriority).then(function(b){return k(a.OCGContext,b)})};a.OCGContext.prototype.getState=
function(b){d(arguments.length,1,"getState","(PDFNet.OCG)",[[b,"Object",a.OCG,"OCG"]]);return a.messageHandler.sendWithPromise("OCGContext.getState",{c:this.id,grp:b.id},this.userPriority)};a.OCGContext.prototype.setState=function(b,c){d(arguments.length,2,"setState","(PDFNet.OCG, boolean)",[[b,"Object",a.OCG,"OCG"],[c,"boolean"]]);return a.messageHandler.sendWithPromise("OCGContext.setState",{c:this.id,grp:b.id,state:c},this.userPriority)};a.OCGContext.prototype.resetStates=function(b){d(arguments.length,
1,"resetStates","(boolean)",[[b,"boolean"]]);return a.messageHandler.sendWithPromise("OCGContext.resetStates",{c:this.id,all_on:b},this.userPriority)};a.OCGContext.prototype.setNonOCDrawing=function(b){d(arguments.length,1,"setNonOCDrawing","(boolean)",[[b,"boolean"]]);return a.messageHandler.sendWithPromise("OCGContext.setNonOCDrawing",{c:this.id,draw_non_OC:b},this.userPriority)};a.OCGContext.prototype.getNonOCDrawing=function(){return a.messageHandler.sendWithPromise("OCGContext.getNonOCDrawing",
{c:this.id},this.userPriority)};a.OCGContext.prototype.setOCDrawMode=function(b){d(arguments.length,1,"setOCDrawMode","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("OCGContext.setOCDrawMode",{c:this.id,oc_draw_mode:b},this.userPriority)};a.OCGContext.prototype.getOCMode=function(){return a.messageHandler.sendWithPromise("OCGContext.getOCMode",{c:this.id},this.userPriority)};a.OCMD.createFromObj=function(b){d(arguments.length,1,"createFromObj","(PDFNet.Obj)",[[b,"Object",a.Obj,
"Obj"]]);return a.messageHandler.sendWithPromise("ocmdCreateFromObj",{ocmd_dict:b.id},this.userPriority).then(function(b){return f(a.OCMD,b)})};a.OCMD.create=function(b,c,e){d(arguments.length,3,"create","(PDFNet.PDFDoc, PDFNet.Obj, number)",[[b,"PDFDoc"],[c,"Object",a.Obj,"Obj"],[e,"number"]]);return a.messageHandler.sendWithPromise("ocmdCreate",{pdfdoc:b.id,ocgs:c.id,vis_policy:e},this.userPriority).then(function(b){return f(a.OCMD,b)})};a.OCMD.prototype.copy=function(){return a.messageHandler.sendWithPromise("OCMD.copy",
{ocmd:this.id},this.userPriority).then(function(b){return f(a.OCMD,b)})};a.OCMD.prototype.getSDFObj=function(){return a.messageHandler.sendWithPromise("OCMD.getSDFObj",{ocmd:this.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.OCMD.prototype.getOCGs=function(){return a.messageHandler.sendWithPromise("OCMD.getOCGs",{ocmd:this.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.OCMD.prototype.getVisibilityExpression=function(){return a.messageHandler.sendWithPromise("OCMD.getVisibilityExpression",
{ocmd:this.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.OCMD.prototype.isValid=function(){return a.messageHandler.sendWithPromise("OCMD.isValid",{ocmd:this.id},this.userPriority)};a.OCMD.prototype.isCurrentlyVisible=function(b){d(arguments.length,1,"isCurrentlyVisible","(PDFNet.OCGContext)",[[b,"Object",a.OCGContext,"OCGContext"]]);return a.messageHandler.sendWithPromise("OCMD.isCurrentlyVisible",{ocmd:this.id,ctx:b.id},this.userPriority)};a.OCMD.prototype.getVisibilityPolicy=function(){return a.messageHandler.sendWithPromise("OCMD.getVisibilityPolicy",
{ocmd:this.id},this.userPriority)};a.OCMD.prototype.setVisibilityPolicy=function(b){d(arguments.length,1,"setVisibilityPolicy","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("OCMD.setVisibilityPolicy",{ocmd:this.id,vis_policy:b},this.userPriority)};a.PDFACompliance.prototype.getErrorCount=function(){return a.messageHandler.sendWithPromise("PDFACompliance.getErrorCount",{pdfac:this.id},this.userPriority)};a.PDFACompliance.prototype.getError=function(b){d(arguments.length,1,"getError",
"(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("PDFACompliance.getError",{pdfac:this.id,idx:b},this.userPriority)};a.PDFACompliance.prototype.getRefObjCount=function(b){d(arguments.length,1,"getRefObjCount","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("PDFACompliance.getRefObjCount",{pdfac:this.id,id:b},this.userPriority)};a.PDFACompliance.prototype.getRefObj=function(b,c){d(arguments.length,2,"getRefObj","(number, number)",[[b,"number"],[c,"number"]]);return a.messageHandler.sendWithPromise("PDFACompliance.getRefObj",
{pdfac:this.id,id:b,err_idx:c},this.userPriority)};a.PDFACompliance.getPDFAErrorMessage=function(b){d(arguments.length,1,"getPDFAErrorMessage","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("pdfaComplianceGetPDFAErrorMessage",{id:b},this.userPriority)};a.PDFACompliance.getDeclaredConformance=function(b){d(arguments.length,1,"getDeclaredConformance","(PDFNet.PDFDoc)",[[b,"PDFDoc"]]);return a.messageHandler.sendWithPromise("pdfaComplianceGetDeclaredConformance",{doc:b.id},this.userPriority)};
a.PDFACompliance.prototype.saveAsFromFileName=function(b,c){"undefined"===typeof c&&(c=!1);d(arguments.length,1,"saveAsFromFileName","(string, boolean)",[[b,"string"],[c,"boolean"]]);return a.messageHandler.sendWithPromise("PDFACompliance.saveAsFromFileName",{pdfac:this.id,file_path:b,linearized:c},this.userPriority)};a.PDFACompliance.prototype.saveAsFromBuffer=function(b){"undefined"===typeof b&&(b=!1);d(arguments.length,0,"saveAsFromBuffer","(boolean)",[[b,"boolean"]]);return a.messageHandler.sendWithPromise("PDFACompliance.saveAsFromBuffer",
{pdfac:this.id,linearized:b},this.userPriority).then(function(a){return new Uint8Array(a)})};a.AttrObj.create=function(b){"undefined"===typeof b&&(b=new a.Obj("0"));d(arguments.length,0,"create","(PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("attrObjCreate",{dict:b.id},this.userPriority).then(function(b){return f(a.AttrObj,b)})};a.AttrObj.prototype.copy=function(){return a.messageHandler.sendWithPromise("AttrObj.copy",{a:this.id},this.userPriority).then(function(b){return f(a.AttrObj,
b)})};a.AttrObj.prototype.getOwner=function(){return a.messageHandler.sendWithPromise("AttrObj.getOwner",{obj:this.id},this.userPriority)};a.AttrObj.prototype.getSDFObj=function(){return a.messageHandler.sendWithPromise("AttrObj.getSDFObj",{obj:this.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.ClassMap.create=function(b){"undefined"===typeof b&&(b=new a.Obj("0"));d(arguments.length,0,"create","(PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("classMapCreate",
{dict:b.id},this.userPriority).then(function(b){return f(a.ClassMap,b)})};a.ClassMap.prototype.copy=function(){return a.messageHandler.sendWithPromise("ClassMap.copy",{p:this.id},this.userPriority).then(function(b){return f(a.ClassMap,b)})};a.ClassMap.prototype.isValid=function(){return a.messageHandler.sendWithPromise("ClassMap.isValid",{map:this.id},this.userPriority)};a.ClassMap.prototype.getSDFObj=function(){return a.messageHandler.sendWithPromise("ClassMap.getSDFObj",{map:this.id},this.userPriority).then(function(b){return f(a.Obj,
b)})};a.ContentItem.prototype.copy=function(){l("copy",this.yieldFunction);return a.messageHandler.sendWithPromise("ContentItem.copy",{c:this},this.userPriority).then(function(b){return new a.ContentItem(b)})};a.ContentItem.prototype.getType=function(){l("getType",this.yieldFunction);return a.messageHandler.sendWithPromise("ContentItem.getType",{item:this},this.userPriority)};a.ContentItem.prototype.getParent=function(){l("getParent",this.yieldFunction);var b=this;this.yieldFunction="ContentItem.getParent";
return a.messageHandler.sendWithPromise("ContentItem.getParent",{item:this},this.userPriority).then(function(c){b.yieldFunction=void 0;c.result=new a.SElement(c.result);p(c.item,b);return c.result})};a.ContentItem.prototype.getPage=function(){l("getPage",this.yieldFunction);var b=this;this.yieldFunction="ContentItem.getPage";return a.messageHandler.sendWithPromise("ContentItem.getPage",{item:this},this.userPriority).then(function(c){b.yieldFunction=void 0;c.result=f(a.Page,c.result);p(c.item,b);return c.result})};
a.ContentItem.prototype.getSDFObj=function(){l("getSDFObj",this.yieldFunction);return a.messageHandler.sendWithPromise("ContentItem.getSDFObj",{item:this},this.userPriority).then(function(b){return f(a.Obj,b)})};a.ContentItem.prototype.getMCID=function(){l("getMCID",this.yieldFunction);return a.messageHandler.sendWithPromise("ContentItem.getMCID",{item:this},this.userPriority)};a.ContentItem.prototype.getContainingStm=function(){l("getContainingStm",this.yieldFunction);return a.messageHandler.sendWithPromise("ContentItem.getContainingStm",
{item:this},this.userPriority).then(function(b){return f(a.Obj,b)})};a.ContentItem.prototype.getStmOwner=function(){l("getStmOwner",this.yieldFunction);return a.messageHandler.sendWithPromise("ContentItem.getStmOwner",{item:this},this.userPriority).then(function(b){return f(a.Obj,b)})};a.ContentItem.prototype.getRefObj=function(){l("getRefObj",this.yieldFunction);return a.messageHandler.sendWithPromise("ContentItem.getRefObj",{item:this},this.userPriority).then(function(b){return f(a.Obj,b)})};a.RoleMap.create=
function(b){d(arguments.length,1,"create","(PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("roleMapCreate",{dict:b.id},this.userPriority).then(function(b){return f(a.RoleMap,b)})};a.RoleMap.prototype.copy=function(){return a.messageHandler.sendWithPromise("RoleMap.copy",{p:this.id},this.userPriority).then(function(b){return f(a.RoleMap,b)})};a.RoleMap.prototype.isValid=function(){return a.messageHandler.sendWithPromise("RoleMap.isValid",{map:this.id},this.userPriority)};
a.RoleMap.prototype.getDirectMap=function(b){d(arguments.length,1,"getDirectMap","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("RoleMap.getDirectMap",{map:this.id,type:b},this.userPriority)};a.RoleMap.prototype.getSDFObj=function(){return a.messageHandler.sendWithPromise("RoleMap.getSDFObj",{map:this.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.SElement.create=function(b){"undefined"===typeof b&&(b=new a.Obj("0"));d(arguments.length,0,"create","(PDFNet.Obj)",
[[b,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("sElementCreate",{dict:b.id},this.userPriority).then(function(b){return new a.SElement(b)})};a.SElement.createFromPDFDoc=function(b,c){d(arguments.length,2,"createFromPDFDoc","(PDFNet.PDFDoc, string)",[[b,"PDFDoc"],[c,"string"]]);return a.messageHandler.sendWithPromise("sElementCreateFromPDFDoc",{doc:b.id,struct_type:c},this.userPriority).then(function(b){return new a.SElement(b)})};a.SElement.prototype.insert=function(b,c){d(arguments.length,
2,"insert","(PDFNet.SElement, number)",[[b,"Structure",a.SElement,"SElement"],[c,"number"]]);l("insert",this.yieldFunction);n("insert",[[b,0]]);var e=this;this.yieldFunction="SElement.insert";b.yieldFunction="SElement.insert";return a.messageHandler.sendWithPromise("SElement.insert",{e:this,kid:b,insert_before:c},this.userPriority).then(function(a){e.yieldFunction=void 0;b.yieldFunction=void 0;p(a.e,e);p(a.kid,b)})};a.SElement.prototype.createContentItem=function(b,c,e){"undefined"===typeof e&&(e=
-1);d(arguments.length,2,"createContentItem","(PDFNet.PDFDoc, PDFNet.Page, number)",[[b,"PDFDoc"],[c,"Object",a.Page,"Page"],[e,"number"]]);l("createContentItem",this.yieldFunction);var m=this;this.yieldFunction="SElement.createContentItem";return a.messageHandler.sendWithPromise("SElement.createContentItem",{e:this,doc:b.id,page:c.id,insert_before:e},this.userPriority).then(function(a){m.yieldFunction=void 0;p(a.e,m);return a.result})};a.SElement.prototype.isValid=function(){l("isValid",this.yieldFunction);
return a.messageHandler.sendWithPromise("SElement.isValid",{e:this},this.userPriority)};a.SElement.prototype.getType=function(){l("getType",this.yieldFunction);return a.messageHandler.sendWithPromise("SElement.getType",{e:this},this.userPriority)};a.SElement.prototype.getNumKids=function(){l("getNumKids",this.yieldFunction);return a.messageHandler.sendWithPromise("SElement.getNumKids",{e:this},this.userPriority)};a.SElement.prototype.isContentItem=function(b){d(arguments.length,1,"isContentItem",
"(number)",[[b,"number"]]);l("isContentItem",this.yieldFunction);return a.messageHandler.sendWithPromise("SElement.isContentItem",{e:this,index:b},this.userPriority)};a.SElement.prototype.getAsContentItem=function(b){d(arguments.length,1,"getAsContentItem","(number)",[[b,"number"]]);l("getAsContentItem",this.yieldFunction);return a.messageHandler.sendWithPromise("SElement.getAsContentItem",{e:this,index:b},this.userPriority).then(function(b){return new a.ContentItem(b)})};a.SElement.prototype.getAsStructElem=
function(b){d(arguments.length,1,"getAsStructElem","(number)",[[b,"number"]]);l("getAsStructElem",this.yieldFunction);return a.messageHandler.sendWithPromise("SElement.getAsStructElem",{e:this,index:b},this.userPriority).then(function(b){return new a.SElement(b)})};a.SElement.prototype.getParent=function(){l("getParent",this.yieldFunction);return a.messageHandler.sendWithPromise("SElement.getParent",{e:this},this.userPriority).then(function(b){return new a.SElement(b)})};a.SElement.prototype.getStructTreeRoot=
function(){l("getStructTreeRoot",this.yieldFunction);return a.messageHandler.sendWithPromise("SElement.getStructTreeRoot",{e:this},this.userPriority).then(function(b){return f(a.STree,b)})};a.SElement.prototype.hasTitle=function(){l("hasTitle",this.yieldFunction);return a.messageHandler.sendWithPromise("SElement.hasTitle",{e:this},this.userPriority)};a.SElement.prototype.getTitle=function(){l("getTitle",this.yieldFunction);return a.messageHandler.sendWithPromise("SElement.getTitle",{e:this},this.userPriority)};
a.SElement.prototype.getID=function(){l("getID",this.yieldFunction);return a.messageHandler.sendWithPromise("SElement.getID",{e:this},this.userPriority).then(function(b){return f(a.Obj,b)})};a.SElement.prototype.hasActualText=function(){l("hasActualText",this.yieldFunction);return a.messageHandler.sendWithPromise("SElement.hasActualText",{e:this},this.userPriority)};a.SElement.prototype.getActualText=function(){l("getActualText",this.yieldFunction);return a.messageHandler.sendWithPromise("SElement.getActualText",
{e:this},this.userPriority)};a.SElement.prototype.hasAlt=function(){l("hasAlt",this.yieldFunction);return a.messageHandler.sendWithPromise("SElement.hasAlt",{e:this},this.userPriority)};a.SElement.prototype.getAlt=function(){l("getAlt",this.yieldFunction);return a.messageHandler.sendWithPromise("SElement.getAlt",{e:this},this.userPriority)};a.SElement.prototype.getSDFObj=function(){l("getSDFObj",this.yieldFunction);return a.messageHandler.sendWithPromise("SElement.getSDFObj",{e:this},this.userPriority).then(function(b){return f(a.Obj,
b)})};a.STree.create=function(b){d(arguments.length,1,"create","(PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("sTreeCreate",{struct_dict:b.id},this.userPriority).then(function(b){return f(a.STree,b)})};a.STree.createFromPDFDoc=function(b){d(arguments.length,1,"createFromPDFDoc","(PDFNet.PDFDoc)",[[b,"PDFDoc"]]);return a.messageHandler.sendWithPromise("sTreeCreateFromPDFDoc",{doc:b.id},this.userPriority).then(function(b){return f(a.STree,b)})};a.STree.prototype.insert=
function(b,c){d(arguments.length,2,"insert","(PDFNet.SElement, number)",[[b,"Structure",a.SElement,"SElement"],[c,"number"]]);n("insert",[[b,0]]);b.yieldFunction="STree.insert";return a.messageHandler.sendWithPromise("STree.insert",{tree:this.id,kid:b,insert_before:c},this.userPriority).then(function(a){b.yieldFunction=void 0;p(a,b)})};a.STree.prototype.copy=function(){return a.messageHandler.sendWithPromise("STree.copy",{c:this.id},this.userPriority).then(function(b){return f(a.STree,b)})};a.STree.prototype.isValid=
function(){return a.messageHandler.sendWithPromise("STree.isValid",{tree:this.id},this.userPriority)};a.STree.prototype.getNumKids=function(){return a.messageHandler.sendWithPromise("STree.getNumKids",{tree:this.id},this.userPriority)};a.STree.prototype.getKid=function(b){d(arguments.length,1,"getKid","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("STree.getKid",{tree:this.id,index:b},this.userPriority).then(function(b){return new a.SElement(b)})};a.STree.prototype.getRoleMap=
function(){return a.messageHandler.sendWithPromise("STree.getRoleMap",{tree:this.id},this.userPriority).then(function(b){return f(a.RoleMap,b)})};a.STree.prototype.getClassMap=function(){return a.messageHandler.sendWithPromise("STree.getClassMap",{tree:this.id},this.userPriority).then(function(b){return f(a.ClassMap,b)})};a.STree.prototype.getSDFObj=function(){return a.messageHandler.sendWithPromise("STree.getSDFObj",{tree:this.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.Action.createGoto=
function(b){d(arguments.length,1,"createGoto","(PDFNet.Destination)",[[b,"Object",a.Destination,"Destination"]]);return a.messageHandler.sendWithPromise("actionCreateGoto",{dest:b.id},this.userPriority).then(function(b){return f(a.Action,b)})};a.Action.createGotoWithKey=function(b,c){d(arguments.length,2,"createGotoWithKey","(string, PDFNet.Destination)",[[b,"string"],[c,"Object",a.Destination,"Destination"]]);return a.messageHandler.sendWithPromise("actionCreateGotoWithKey",{key:b,dest:c.id},this.userPriority).then(function(b){return f(a.Action,
b)})};a.Action.createGotoRemote=function(b,c){d(arguments.length,2,"createGotoRemote","(PDFNet.FileSpec, number)",[[b,"Object",a.FileSpec,"FileSpec"],[c,"number"]]);return a.messageHandler.sendWithPromise("actionCreateGotoRemote",{file:b.id,page_num:c},this.userPriority).then(function(b){return f(a.Action,b)})};a.Action.createGotoRemoteSetNewWindow=function(b,c,e){d(arguments.length,3,"createGotoRemoteSetNewWindow","(PDFNet.FileSpec, number, boolean)",[[b,"Object",a.FileSpec,"FileSpec"],[c,"number"],
[e,"boolean"]]);return a.messageHandler.sendWithPromise("actionCreateGotoRemoteSetNewWindow",{file:b.id,page_num:c,new_window:e},this.userPriority).then(function(b){return f(a.Action,b)})};a.Action.createURI=function(b,c){d(arguments.length,2,"createURI","(PDFNet.SDFDoc, string)",[[b,"SDFDoc"],[c,"string"]]);return a.messageHandler.sendWithPromise("actionCreateURI",{sdfdoc:b.id,uri:c},this.userPriority).then(function(b){return f(a.Action,b)})};a.Action.createURIWithUString=function(b,c){d(arguments.length,
2,"createURIWithUString","(PDFNet.SDFDoc, string)",[[b,"SDFDoc"],[c,"string"]]);return a.messageHandler.sendWithPromise("actionCreateURIWithUString",{sdfdoc:b.id,uri:c},this.userPriority).then(function(b){return f(a.Action,b)})};a.Action.createSubmitForm=function(b){d(arguments.length,1,"createSubmitForm","(PDFNet.FileSpec)",[[b,"Object",a.FileSpec,"FileSpec"]]);return a.messageHandler.sendWithPromise("actionCreateSubmitForm",{url:b.id},this.userPriority).then(function(b){return f(a.Action,b)})};
a.Action.createLaunch=function(b,c){d(arguments.length,2,"createLaunch","(PDFNet.SDFDoc, string)",[[b,"SDFDoc"],[c,"string"]]);return a.messageHandler.sendWithPromise("actionCreateLaunch",{sdfdoc:b.id,path:c},this.userPriority).then(function(b){return f(a.Action,b)})};a.Action.createHideField=function(b,c){d(arguments.length,2,"createHideField","(PDFNet.SDFDoc, Array<string>)",[[b,"SDFDoc"],[c,"Array"]]);return a.messageHandler.sendWithPromise("actionCreateHideField",{sdfdoc:b.id,field_names_list:c},
this.userPriority).then(function(b){return f(a.Action,b)})};a.Action.createImportData=function(b,c){d(arguments.length,2,"createImportData","(PDFNet.SDFDoc, string)",[[b,"SDFDoc"],[c,"string"]]);return a.messageHandler.sendWithPromise("actionCreateImportData",{sdfdoc:b.id,path:c},this.userPriority).then(function(b){return f(a.Action,b)})};a.Action.createResetForm=function(b){d(arguments.length,1,"createResetForm","(PDFNet.SDFDoc)",[[b,"SDFDoc"]]);return a.messageHandler.sendWithPromise("actionCreateResetForm",
{sdfdoc:b.id},this.userPriority).then(function(b){return f(a.Action,b)})};a.Action.createJavaScript=function(b,c){d(arguments.length,2,"createJavaScript","(PDFNet.SDFDoc, string)",[[b,"SDFDoc"],[c,"string"]]);return a.messageHandler.sendWithPromise("actionCreateJavaScript",{sdfdoc:b.id,script:c},this.userPriority).then(function(b){return f(a.Action,b)})};a.Action.create=function(b){"undefined"===typeof b&&(b=new a.Obj("0"));d(arguments.length,0,"create","(PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"]]);
return a.messageHandler.sendWithPromise("actionCreate",{in_obj:b.id},this.userPriority).then(function(b){return f(a.Action,b)})};a.Action.prototype.copy=function(){return a.messageHandler.sendWithPromise("Action.copy",{in_action:this.id},this.userPriority).then(function(b){return f(a.Action,b)})};a.Action.prototype.compare=function(b){d(arguments.length,1,"compare","(PDFNet.Action)",[[b,"Object",a.Action,"Action"]]);return a.messageHandler.sendWithPromise("Action.compare",{action:this.id,in_action:b.id},
this.userPriority)};a.Action.prototype.isValid=function(){return a.messageHandler.sendWithPromise("Action.isValid",{action:this.id},this.userPriority)};a.Action.prototype.getType=function(){return a.messageHandler.sendWithPromise("Action.getType",{action:this.id},this.userPriority)};a.Action.prototype.getDest=function(){return a.messageHandler.sendWithPromise("Action.getDest",{action:this.id},this.userPriority).then(function(b){return f(a.Destination,b)})};a.Action.prototype.getNext=function(){return a.messageHandler.sendWithPromise("Action.getNext",
{action:this.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.Action.prototype.getSDFObj=function(){return a.messageHandler.sendWithPromise("Action.getSDFObj",{action:this.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.Action.prototype.getFormActionFlag=function(b){d(arguments.length,1,"getFormActionFlag","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("Action.getFormActionFlag",{action:this.id,flag:b},this.userPriority)};a.Action.prototype.setFormActionFlag=
function(b,c){d(arguments.length,2,"setFormActionFlag","(number, boolean)",[[b,"number"],[c,"boolean"]]);return a.messageHandler.sendWithPromise("Action.setFormActionFlag",{action:this.id,flag:b,value:c},this.userPriority)};a.Action.prototype.needsWriteLock=function(){return a.messageHandler.sendWithPromise("Action.needsWriteLock",{action:this.id},this.userPriority)};a.Action.prototype.execute=function(){return a.messageHandler.sendWithPromise("Action.execute",{action:this.id},this.userPriority)};
a.Action.prototype.executeKeyStrokeAction=function(b){d(arguments.length,1,"executeKeyStrokeAction","(PDFNet.KeyStrokeEventData)",[[b,"Object",a.KeyStrokeEventData,"KeyStrokeEventData"]]);return a.messageHandler.sendWithPromise("Action.executeKeyStrokeAction",{action:this.id,data:b.id},this.userPriority).then(function(b){return k(a.KeyStrokeActionResult,b)})};a.KeyStrokeActionResult.prototype.isValid=function(){return a.messageHandler.sendWithPromise("KeyStrokeActionResult.isValid",{action_ret:this.id},
this.userPriority)};a.KeyStrokeActionResult.prototype.getText=function(){return a.messageHandler.sendWithPromise("KeyStrokeActionResult.getText",{action_ret:this.id},this.userPriority)};a.KeyStrokeActionResult.prototype.copy=function(){return a.messageHandler.sendWithPromise("KeyStrokeActionResult.copy",{action_ret:this.id},this.userPriority).then(function(b){return k(a.KeyStrokeActionResult,b)})};a.KeyStrokeEventData.create=function(b,c,e,m,f){d(arguments.length,5,"create","(string, string, string, number, number)",
[[b,"string"],[c,"string"],[e,"string"],[m,"number"],[f,"number"]]);return a.messageHandler.sendWithPromise("keyStrokeEventDataCreate",{field_name:b,current:c,change:e,selection_start:m,selection_end:f},this.userPriority).then(function(b){return k(a.KeyStrokeEventData,b)})};a.KeyStrokeEventData.prototype.copy=function(){return a.messageHandler.sendWithPromise("KeyStrokeEventData.copy",{data:this.id},this.userPriority).then(function(b){return k(a.KeyStrokeEventData,b)})};a.Page.create=function(b){"undefined"===
typeof b&&(b=new a.Obj("0"));d(arguments.length,0,"create","(PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("pageCreate",{page_dict:b.id},this.userPriority).then(function(b){return f(a.Page,b)})};a.Page.prototype.copy=function(){return a.messageHandler.sendWithPromise("Page.copy",{p:this.id},this.userPriority).then(function(b){return f(a.Page,b)})};a.Page.prototype.isValid=function(){return a.messageHandler.sendWithPromise("Page.isValid",{page:this.id},this.userPriority)};
a.Page.prototype.getIndex=function(){return a.messageHandler.sendWithPromise("Page.getIndex",{page:this.id},this.userPriority)};a.Page.prototype.getTriggerAction=function(b){d(arguments.length,1,"getTriggerAction","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("Page.getTriggerAction",{page:this.id,trigger:b},this.userPriority).then(function(b){return f(a.Obj,b)})};a.Page.prototype.getBox=function(b){d(arguments.length,1,"getBox","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("Page.getBox",
{page:this.id,type:b},this.userPriority).then(function(b){return new a.Rect(b)})};a.Page.prototype.setBox=function(b,c){d(arguments.length,2,"setBox","(number, PDFNet.Rect)",[[b,"number"],[c,"Structure",a.Rect,"Rect"]]);n("setBox",[[c,1]]);return a.messageHandler.sendWithPromise("Page.setBox",{page:this.id,type:b,box:c},this.userPriority)};a.Page.prototype.getCropBox=function(){return a.messageHandler.sendWithPromise("Page.getCropBox",{page:this.id},this.userPriority).then(function(b){return new a.Rect(b)})};
a.Page.prototype.setCropBox=function(b){d(arguments.length,1,"setCropBox","(PDFNet.Rect)",[[b,"Structure",a.Rect,"Rect"]]);n("setCropBox",[[b,0]]);return a.messageHandler.sendWithPromise("Page.setCropBox",{page:this.id,box:b},this.userPriority)};a.Page.prototype.getMediaBox=function(){return a.messageHandler.sendWithPromise("Page.getMediaBox",{page:this.id},this.userPriority).then(function(b){return new a.Rect(b)})};a.Page.prototype.setMediaBox=function(b){d(arguments.length,1,"setMediaBox","(PDFNet.Rect)",
[[b,"Structure",a.Rect,"Rect"]]);n("setMediaBox",[[b,0]]);return a.messageHandler.sendWithPromise("Page.setMediaBox",{page:this.id,box:b},this.userPriority)};a.Page.prototype.getVisibleContentBox=function(){return a.messageHandler.sendWithPromise("Page.getVisibleContentBox",{page:this.id},this.userPriority).then(function(b){return new a.Rect(b)})};a.Page.prototype.getRotation=function(){return a.messageHandler.sendWithPromise("Page.getRotation",{page:this.id},this.userPriority)};a.Page.prototype.setRotation=
function(b){d(arguments.length,1,"setRotation","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("Page.setRotation",{page:this.id,angle:b},this.userPriority)};a.Page.addRotations=function(b,c){d(arguments.length,2,"addRotations","(number, number)",[[b,"number"],[c,"number"]]);return a.messageHandler.sendWithPromise("pageAddRotations",{r0:b,r1:c},this.userPriority)};a.Page.subtractRotations=function(b,c){d(arguments.length,2,"subtractRotations","(number, number)",[[b,"number"],[c,
"number"]]);return a.messageHandler.sendWithPromise("pageSubtractRotations",{r0:b,r1:c},this.userPriority)};a.Page.rotationToDegree=function(b){d(arguments.length,1,"rotationToDegree","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("pageRotationToDegree",{r:b},this.userPriority)};a.Page.degreeToRotation=function(b){d(arguments.length,1,"degreeToRotation","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("pageDegreeToRotation",{r:b},this.userPriority)};a.Page.prototype.getPageWidth=
function(b){"undefined"===typeof b&&(b=a.Page.Box.e_crop);d(arguments.length,0,"getPageWidth","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("Page.getPageWidth",{page:this.id,box_type:b},this.userPriority)};a.Page.prototype.getPageHeight=function(b){"undefined"===typeof b&&(b=a.Page.Box.e_crop);d(arguments.length,0,"getPageHeight","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("Page.getPageHeight",{page:this.id,box_type:b},this.userPriority)};a.Page.prototype.getDefaultMatrix=
function(b,c,e){"undefined"===typeof b&&(b=!1);"undefined"===typeof c&&(c=a.Page.Box.e_crop);"undefined"===typeof e&&(e=a.Page.Rotate.e_0);d(arguments.length,0,"getDefaultMatrix","(boolean, number, number)",[[b,"boolean"],[c,"number"],[e,"number"]]);return a.messageHandler.sendWithPromise("Page.getDefaultMatrix",{page:this.id,flip_y:b,box_type:c,angle:e},this.userPriority).then(function(b){return new a.Matrix2D(b)})};a.Page.prototype.getAnnots=function(){return a.messageHandler.sendWithPromise("Page.getAnnots",
{page:this.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.Page.prototype.getNumAnnots=function(){return a.messageHandler.sendWithPromise("Page.getNumAnnots",{page:this.id},this.userPriority)};a.Page.prototype.getAnnot=function(b){d(arguments.length,1,"getAnnot","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("Page.getAnnot",{page:this.id,index:b},this.userPriority).then(function(b){return f(a.Annot,b)})};a.Page.prototype.annotInsert=function(b,c){d(arguments.length,
2,"annotInsert","(number, PDFNet.Annot)",[[b,"number"],[c,"Object",a.Annot,"Annot"]]);return a.messageHandler.sendWithPromise("Page.annotInsert",{page:this.id,pos:b,annot:c.id},this.userPriority)};a.Page.prototype.annotPushBack=function(b){d(arguments.length,1,"annotPushBack","(PDFNet.Annot)",[[b,"Object",a.Annot,"Annot"]]);return a.messageHandler.sendWithPromise("Page.annotPushBack",{page:this.id,annot:b.id},this.userPriority)};a.Page.prototype.annotPushFront=function(b){d(arguments.length,1,"annotPushFront",
"(PDFNet.Annot)",[[b,"Object",a.Annot,"Annot"]]);return a.messageHandler.sendWithPromise("Page.annotPushFront",{page:this.id,annot:b.id},this.userPriority)};a.Page.prototype.annotRemove=function(b){d(arguments.length,1,"annotRemove","(PDFNet.Annot)",[[b,"Object",a.Annot,"Annot"]]);return a.messageHandler.sendWithPromise("Page.annotRemove",{page:this.id,annot:b.id},this.userPriority)};a.Page.prototype.annotRemoveByIndex=function(b){d(arguments.length,1,"annotRemoveByIndex","(number)",[[b,"number"]]);
return a.messageHandler.sendWithPromise("Page.annotRemoveByIndex",{page:this.id,index:b},this.userPriority)};a.Page.prototype.scale=function(b){d(arguments.length,1,"scale","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("Page.scale",{page:this.id,scale:b},this.userPriority)};a.Page.prototype.flattenField=function(b){d(arguments.length,1,"flattenField","(PDFNet.Field)",[[b,"Structure",a.Field,"Field"]]);n("flattenField",[[b,0]]);b.yieldFunction="Page.flattenField";return a.messageHandler.sendWithPromise("Page.flattenField",
{page:this.id,field_to_flatten:b},this.userPriority).then(function(a){b.yieldFunction=void 0;p(a,b)})};a.Page.prototype.hasTransition=function(){return a.messageHandler.sendWithPromise("Page.hasTransition",{page:this.id},this.userPriority)};a.Page.prototype.getUserUnitSize=function(){return a.messageHandler.sendWithPromise("Page.getUserUnitSize",{page:this.id},this.userPriority)};a.Page.prototype.setUserUnitSize=function(b){d(arguments.length,1,"setUserUnitSize","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("Page.setUserUnitSize",
{page:this.id,unit_size:b},this.userPriority)};a.Page.prototype.getResourceDict=function(){return a.messageHandler.sendWithPromise("Page.getResourceDict",{page:this.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.Page.prototype.getContents=function(){return a.messageHandler.sendWithPromise("Page.getContents",{page:this.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.Page.prototype.getThumb=function(){return a.messageHandler.sendWithPromise("Page.getThumb",{page:this.id},
this.userPriority).then(function(b){return f(a.Obj,b)})};a.Page.prototype.getSDFObj=function(){return a.messageHandler.sendWithPromise("Page.getSDFObj",{page:this.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.Page.prototype.findInheritedAttribute=function(b){d(arguments.length,1,"findInheritedAttribute","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("Page.findInheritedAttribute",{page:this.id,attrib:b},this.userPriority).then(function(b){return f(a.Obj,b)})};a.Annot.create=
function(b,c,e){d(arguments.length,3,"create","(PDFNet.SDFDoc, number, PDFNet.Rect)",[[b,"SDFDoc"],[c,"number"],[e,"Structure",a.Rect,"Rect"]]);n("create",[[e,2]]);return a.messageHandler.sendWithPromise("annotCreate",{doc:b.id,type:c,pos:e},this.userPriority).then(function(b){return f(a.Annot,b)})};a.Annot.createFromObj=function(b){"undefined"===typeof b&&(b=new a.Obj("0"));d(arguments.length,0,"createFromObj","(PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("annotCreateFromObj",
{d:b.id},this.userPriority).then(function(b){return f(a.Annot,b)})};a.Annot.prototype.copy=function(){return a.messageHandler.sendWithPromise("Annot.copy",{d:this.id},this.userPriority).then(function(b){return f(a.Annot,b)})};a.Annot.prototype.compare=function(b){d(arguments.length,1,"compare","(PDFNet.Annot)",[[b,"Object",a.Annot,"Annot"]]);return a.messageHandler.sendWithPromise("Annot.compare",{annot:this.id,d:b.id},this.userPriority)};a.Annot.prototype.isValid=function(){return a.messageHandler.sendWithPromise("Annot.isValid",
{annot:this.id},this.userPriority)};a.Annot.prototype.getSDFObj=function(){return a.messageHandler.sendWithPromise("Annot.getSDFObj",{annot:this.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.Annot.prototype.getType=function(){return a.messageHandler.sendWithPromise("Annot.getType",{annot:this.id},this.userPriority)};a.Annot.prototype.isMarkup=function(){return a.messageHandler.sendWithPromise("Annot.isMarkup",{annot:this.id},this.userPriority)};a.Annot.prototype.getRect=function(){return a.messageHandler.sendWithPromise("Annot.getRect",
{annot:this.id},this.userPriority).then(function(b){return new a.Rect(b)})};a.Annot.prototype.getVisibleContentBox=function(){return a.messageHandler.sendWithPromise("Annot.getVisibleContentBox",{annot:this.id},this.userPriority).then(function(b){return new a.Rect(b)})};a.Annot.prototype.setRect=function(b){d(arguments.length,1,"setRect","(PDFNet.Rect)",[[b,"Structure",a.Rect,"Rect"]]);n("setRect",[[b,0]]);return a.messageHandler.sendWithPromise("Annot.setRect",{annot:this.id,pos:b},this.userPriority)};
a.Annot.prototype.resize=function(b){d(arguments.length,1,"resize","(PDFNet.Rect)",[[b,"Structure",a.Rect,"Rect"]]);n("resize",[[b,0]]);return a.messageHandler.sendWithPromise("Annot.resize",{annot:this.id,newrect:b},this.userPriority)};a.Annot.prototype.setContents=function(b){d(arguments.length,1,"setContents","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("Annot.setContents",{annot:this.id,contents:b},this.userPriority)};a.Annot.prototype.getContents=function(){return a.messageHandler.sendWithPromise("Annot.getContents",
{annot:this.id},this.userPriority)};a.Annot.prototype.getTriggerAction=function(b){d(arguments.length,1,"getTriggerAction","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("Annot.getTriggerAction",{annot:this.id,trigger:b},this.userPriority).then(function(b){return f(a.Obj,b)})};a.Annot.prototype.getCustomData=function(b){d(arguments.length,1,"getCustomData","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("Annot.getCustomData",{annot:this.id,key:b},this.userPriority)};
a.Annot.prototype.setCustomData=function(b,c){d(arguments.length,2,"setCustomData","(string, string)",[[b,"string"],[c,"string"]]);return a.messageHandler.sendWithPromise("Annot.setCustomData",{annot:this.id,key:b,value:c},this.userPriority)};a.Annot.prototype.deleteCustomData=function(b){d(arguments.length,1,"deleteCustomData","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("Annot.deleteCustomData",{annot:this.id,key:b},this.userPriority)};a.Annot.prototype.getPage=function(){return a.messageHandler.sendWithPromise("Annot.getPage",
{annot:this.id},this.userPriority).then(function(b){return f(a.Page,b)})};a.Annot.prototype.setPage=function(b){d(arguments.length,1,"setPage","(PDFNet.Page)",[[b,"Object",a.Page,"Page"]]);return a.messageHandler.sendWithPromise("Annot.setPage",{annot:this.id,page:b.id},this.userPriority)};a.Annot.prototype.getUniqueID=function(){return a.messageHandler.sendWithPromise("Annot.getUniqueID",{annot:this.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.Annot.prototype.getDate=function(){return a.messageHandler.sendWithPromise("Annot.getDate",
{annot:this.id},this.userPriority).then(function(b){return new a.Date(b)})};a.Annot.prototype.setDate=function(b){d(arguments.length,1,"setDate","(PDFNet.Date)",[[b,"Structure",a.Date,"Date"]]);n("setDate",[[b,0]]);return a.messageHandler.sendWithPromise("Annot.setDate",{annot:this.id,date:b},this.userPriority)};a.Annot.prototype.getFlag=function(b){d(arguments.length,1,"getFlag","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("Annot.getFlag",{annot:this.id,flag:b},this.userPriority)};
a.Annot.prototype.setFlag=function(b,c){d(arguments.length,2,"setFlag","(number, boolean)",[[b,"number"],[c,"boolean"]]);return a.messageHandler.sendWithPromise("Annot.setFlag",{annot:this.id,flag:b,value:c},this.userPriority)};a.AnnotBorderStyle.create=function(b,c,e,m){"undefined"===typeof e&&(e=0);"undefined"===typeof m&&(m=0);d(arguments.length,2,"create","(number, number, number, number)",[[b,"number"],[c,"number"],[e,"number"],[m,"number"]]);return a.messageHandler.sendWithPromise("annotBorderStyleCreate",
{s:b,b_width:c,b_hr:e,b_vr:m},this.userPriority).then(function(b){return k(a.AnnotBorderStyle,b)})};a.AnnotBorderStyle.createWithDashPattern=function(b,c,e,m,f){d(arguments.length,5,"createWithDashPattern","(number, number, number, number, Array<number>)",[[b,"number"],[c,"number"],[e,"number"],[m,"number"],[f,"Array"]]);return a.messageHandler.sendWithPromise("annotBorderStyleCreateWithDashPattern",{s:b,b_width:c,b_hr:e,b_vr:m,b_dash_list:f},this.userPriority).then(function(b){return k(a.AnnotBorderStyle,
b)})};a.AnnotBorderStyle.prototype.copy=function(){return a.messageHandler.sendWithPromise("AnnotBorderStyle.copy",{bs:this.id},this.userPriority).then(function(b){return k(a.AnnotBorderStyle,b)})};a.AnnotBorderStyle.prototype.getStyle=function(){return a.messageHandler.sendWithPromise("AnnotBorderStyle.getStyle",{bs:this.id},this.userPriority)};a.AnnotBorderStyle.prototype.setStyle=function(b){d(arguments.length,1,"setStyle","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("AnnotBorderStyle.setStyle",
{bs:this.id,style:b},this.userPriority)};a.Annot.prototype.getAppearance=function(b,c){"undefined"===typeof b&&(b=a.Annot.State.e_normal);"undefined"===typeof c&&(c=null);d(arguments.length,0,"getAppearance","(number, string)",[[b,"number"],[c,"const char* = 0"]]);return a.messageHandler.sendWithPromise("Annot.getAppearance",{annot:this.id,annot_state:b,app_state:c},this.userPriority).then(function(b){return f(a.Obj,b)})};a.Annot.prototype.setAppearance=function(b,c,e){"undefined"===typeof c&&(c=
a.Annot.State.e_normal);"undefined"===typeof e&&(e=null);d(arguments.length,1,"setAppearance","(PDFNet.Obj, number, string)",[[b,"Object",a.Obj,"Obj"],[c,"number"],[e,"const char* = 0"]]);return a.messageHandler.sendWithPromise("Annot.setAppearance",{annot:this.id,app_stream:b.id,annot_state:c,app_state:e},this.userPriority)};a.Annot.prototype.removeAppearance=function(b,c){"undefined"===typeof b&&(b=a.Annot.State.e_normal);"undefined"===typeof c&&(c=null);d(arguments.length,0,"removeAppearance",
"(number, string)",[[b,"number"],[c,"const char* = 0"]]);return a.messageHandler.sendWithPromise("Annot.removeAppearance",{annot:this.id,annot_state:b,app_state:c},this.userPriority)};a.Annot.prototype.flatten=function(b){d(arguments.length,1,"flatten","(PDFNet.Page)",[[b,"Object",a.Page,"Page"]]);return a.messageHandler.sendWithPromise("Annot.flatten",{annot:this.id,page:b.id},this.userPriority)};a.Annot.prototype.getActiveAppearanceState=function(){return a.messageHandler.sendWithPromise("Annot.getActiveAppearanceState",
{annot:this.id},this.userPriority)};a.Annot.prototype.setActiveAppearanceState=function(b){d(arguments.length,1,"setActiveAppearanceState","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("Annot.setActiveAppearanceState",{annot:this.id,astate:b},this.userPriority)};a.Annot.prototype.getColor=function(){return a.messageHandler.sendWithPromise("Annot.getColor",{annot:this.id},this.userPriority).then(function(b){return k(a.ColorPt,b)})};a.Annot.prototype.getColorAsRGB=function(){return a.messageHandler.sendWithPromise("Annot.getColorAsRGB",
{annot:this.id},this.userPriority).then(function(b){return k(a.ColorPt,b)})};a.Annot.prototype.getColorAsCMYK=function(){return a.messageHandler.sendWithPromise("Annot.getColorAsCMYK",{annot:this.id},this.userPriority).then(function(b){return k(a.ColorPt,b)})};a.Annot.prototype.getColorAsGray=function(){return a.messageHandler.sendWithPromise("Annot.getColorAsGray",{annot:this.id},this.userPriority).then(function(b){return k(a.ColorPt,b)})};a.Annot.prototype.getColorCompNum=function(){return a.messageHandler.sendWithPromise("Annot.getColorCompNum",
{annot:this.id},this.userPriority)};a.Annot.prototype.setColorDefault=function(b){d(arguments.length,1,"setColorDefault","(PDFNet.ColorPt)",[[b,"Object",a.ColorPt,"ColorPt"]]);return a.messageHandler.sendWithPromise("Annot.setColorDefault",{annot:this.id,col:b.id},this.userPriority)};a.Annot.prototype.setColor=function(b,c){"undefined"===typeof c&&(c=3);d(arguments.length,1,"setColor","(PDFNet.ColorPt, number)",[[b,"Object",a.ColorPt,"ColorPt"],[c,"number"]]);return a.messageHandler.sendWithPromise("Annot.setColor",
{annot:this.id,col:b.id,numcomp:c},this.userPriority)};a.Annot.prototype.getStructParent=function(){return a.messageHandler.sendWithPromise("Annot.getStructParent",{annot:this.id},this.userPriority)};a.Annot.prototype.setStructParent=function(b){d(arguments.length,1,"setStructParent","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("Annot.setStructParent",{annot:this.id,parkeyval:b},this.userPriority)};a.Annot.prototype.getOptionalContent=function(){return a.messageHandler.sendWithPromise("Annot.getOptionalContent",
{annot:this.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.Annot.prototype.setOptionalContent=function(b){d(arguments.length,1,"setOptionalContent","(PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("Annot.setOptionalContent",{annot:this.id,content:b.id},this.userPriority)};a.Annot.prototype.refreshAppearance=function(){return a.messageHandler.sendWithPromise("Annot.refreshAppearance",{annot:this.id},this.userPriority)};a.Annot.prototype.refreshAppearanceRefreshOptions=
function(b){"undefined"===typeof b&&(b=null);d(arguments.length,0,"refreshAppearanceRefreshOptions","(PDFNet.OptionBase)",[[b,"OptionBase"]]);n("refreshAppearanceRefreshOptions",[[b,0]]);b=b?b.getJsonString():"{}";return a.messageHandler.sendWithPromise("Annot.refreshAppearanceRefreshOptions",{annot:this.id,options:b},this.userPriority)};a.Annot.prototype.getRotation=function(){return a.messageHandler.sendWithPromise("Annot.getRotation",{annot:this.id},this.userPriority)};a.Annot.prototype.setRotation=
function(b){d(arguments.length,1,"setRotation","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("Annot.setRotation",{annot:this.id,angle:b},this.userPriority)};a.AnnotBorderStyle.prototype.getWidth=function(){return a.messageHandler.sendWithPromise("AnnotBorderStyle.getWidth",{bs:this.id},this.userPriority)};a.AnnotBorderStyle.prototype.setWidth=function(b){d(arguments.length,1,"setWidth","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("AnnotBorderStyle.setWidth",
{bs:this.id,width:b},this.userPriority)};a.AnnotBorderStyle.prototype.getHR=function(){return a.messageHandler.sendWithPromise("AnnotBorderStyle.getHR",{bs:this.id},this.userPriority)};a.AnnotBorderStyle.prototype.setHR=function(b){d(arguments.length,1,"setHR","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("AnnotBorderStyle.setHR",{bs:this.id,horizontal_radius:b},this.userPriority)};a.AnnotBorderStyle.prototype.getVR=function(){return a.messageHandler.sendWithPromise("AnnotBorderStyle.getVR",
{bs:this.id},this.userPriority)};a.AnnotBorderStyle.prototype.setVR=function(b){d(arguments.length,1,"setVR","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("AnnotBorderStyle.setVR",{bs:this.id,vertical_radius:b},this.userPriority)};a.AnnotBorderStyle.prototype.getDashPattern=function(){return a.messageHandler.sendWithPromise("AnnotBorderStyle.getDashPattern",{bs:this.id},this.userPriority).then(function(a){return new Float64Array(a)})};a.Annot.prototype.getBorderStyle=function(){return a.messageHandler.sendWithPromise("Annot.getBorderStyle",
{annot:this.id},this.userPriority).then(function(b){return k(a.AnnotBorderStyle,b)})};a.Annot.prototype.setBorderStyle=function(b,c){"undefined"===typeof c&&(c=!1);d(arguments.length,1,"setBorderStyle","(PDFNet.AnnotBorderStyle, boolean)",[[b,"Object",a.AnnotBorderStyle,"AnnotBorderStyle"],[c,"boolean"]]);return a.messageHandler.sendWithPromise("Annot.setBorderStyle",{annot:this.id,bs:b.id,oldStyleOnly:c},this.userPriority)};a.Annot.getBorderStyleStyle=function(b){d(arguments.length,1,"getBorderStyleStyle",
"(PDFNet.AnnotBorderStyle)",[[b,"Object",a.AnnotBorderStyle,"AnnotBorderStyle"]]);return a.messageHandler.sendWithPromise("annotGetBorderStyleStyle",{bs:b.id},this.userPriority)};a.Annot.setBorderStyleStyle=function(b,c){d(arguments.length,2,"setBorderStyleStyle","(PDFNet.AnnotBorderStyle, number)",[[b,"Object",a.AnnotBorderStyle,"AnnotBorderStyle"],[c,"number"]]);return a.messageHandler.sendWithPromise("annotSetBorderStyleStyle",{bs:b.id,bst:c},this.userPriority)};a.AnnotBorderStyle.prototype.compare=
function(b){d(arguments.length,1,"compare","(PDFNet.AnnotBorderStyle)",[[b,"Object",a.AnnotBorderStyle,"AnnotBorderStyle"]]);return a.messageHandler.sendWithPromise("AnnotBorderStyle.compare",{a:this.id,b:b.id},this.userPriority)};a.CaretAnnot.createFromObj=function(b){"undefined"===typeof b&&(b=new a.Obj("0"));d(arguments.length,0,"createFromObj","(PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("caretAnnotCreateFromObj",{d:b.id},this.userPriority).then(function(b){return f(a.CaretAnnot,
b)})};a.CaretAnnot.createFromAnnot=function(b){d(arguments.length,1,"createFromAnnot","(PDFNet.Annot)",[[b,"Object",a.Annot,"Annot"]]);return a.messageHandler.sendWithPromise("caretAnnotCreateFromAnnot",{ann:b.id},this.userPriority).then(function(b){return f(a.CaretAnnot,b)})};a.CaretAnnot.create=function(b,c){d(arguments.length,2,"create","(PDFNet.SDFDoc, PDFNet.Rect)",[[b,"SDFDoc"],[c,"Structure",a.Rect,"Rect"]]);n("create",[[c,1]]);return a.messageHandler.sendWithPromise("caretAnnotCreate",{doc:b.id,
pos:c},this.userPriority).then(function(b){return f(a.CaretAnnot,b)})};a.CaretAnnot.prototype.getSymbol=function(){return a.messageHandler.sendWithPromise("CaretAnnot.getSymbol",{caret:this.id},this.userPriority)};a.CaretAnnot.prototype.setSymbol=function(b){d(arguments.length,1,"setSymbol","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("CaretAnnot.setSymbol",{caret:this.id,symbol:b},this.userPriority)};a.LineAnnot.createFromObj=function(b){"undefined"===typeof b&&(b=new a.Obj("0"));
d(arguments.length,0,"createFromObj","(PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("lineAnnotCreateFromObj",{d:b.id},this.userPriority).then(function(b){return f(a.LineAnnot,b)})};a.LineAnnot.createFromAnnot=function(b){d(arguments.length,1,"createFromAnnot","(PDFNet.Annot)",[[b,"Object",a.Annot,"Annot"]]);return a.messageHandler.sendWithPromise("lineAnnotCreateFromAnnot",{ann:b.id},this.userPriority).then(function(b){return f(a.LineAnnot,b)})};a.LineAnnot.create=
function(b,c){d(arguments.length,2,"create","(PDFNet.SDFDoc, PDFNet.Rect)",[[b,"SDFDoc"],[c,"Structure",a.Rect,"Rect"]]);n("create",[[c,1]]);return a.messageHandler.sendWithPromise("lineAnnotCreate",{doc:b.id,pos:c},this.userPriority).then(function(b){return f(a.LineAnnot,b)})};a.LineAnnot.prototype.getStartPoint=function(){return a.messageHandler.sendWithPromise("LineAnnot.getStartPoint",{line:this.id},this.userPriority)};a.LineAnnot.prototype.setStartPoint=function(b){d(arguments.length,1,"setStartPoint",
"(PDFNet.Point)",[[b,"Structure",a.Point,"Point"]]);n("setStartPoint",[[b,0]]);return a.messageHandler.sendWithPromise("LineAnnot.setStartPoint",{line:this.id,sp:b},this.userPriority)};a.LineAnnot.prototype.getEndPoint=function(){return a.messageHandler.sendWithPromise("LineAnnot.getEndPoint",{line:this.id},this.userPriority)};a.LineAnnot.prototype.setEndPoint=function(b){d(arguments.length,1,"setEndPoint","(PDFNet.Point)",[[b,"Structure",a.Point,"Point"]]);n("setEndPoint",[[b,0]]);return a.messageHandler.sendWithPromise("LineAnnot.setEndPoint",
{line:this.id,ep:b},this.userPriority)};a.LineAnnot.prototype.getStartStyle=function(){return a.messageHandler.sendWithPromise("LineAnnot.getStartStyle",{line:this.id},this.userPriority)};a.LineAnnot.prototype.setStartStyle=function(b){d(arguments.length,1,"setStartStyle","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("LineAnnot.setStartStyle",{line:this.id,ss:b},this.userPriority)};a.LineAnnot.prototype.getEndStyle=function(){return a.messageHandler.sendWithPromise("LineAnnot.getEndStyle",
{line:this.id},this.userPriority)};a.LineAnnot.prototype.setEndStyle=function(b){d(arguments.length,1,"setEndStyle","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("LineAnnot.setEndStyle",{line:this.id,es:b},this.userPriority)};a.LineAnnot.prototype.getLeaderLineLength=function(){return a.messageHandler.sendWithPromise("LineAnnot.getLeaderLineLength",{line:this.id},this.userPriority)};a.LineAnnot.prototype.setLeaderLineLength=function(b){d(arguments.length,1,"setLeaderLineLength",
"(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("LineAnnot.setLeaderLineLength",{line:this.id,length:b},this.userPriority)};a.LineAnnot.prototype.getLeaderLineExtensionLength=function(){return a.messageHandler.sendWithPromise("LineAnnot.getLeaderLineExtensionLength",{line:this.id},this.userPriority)};a.LineAnnot.prototype.setLeaderLineExtensionLength=function(b){d(arguments.length,1,"setLeaderLineExtensionLength","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("LineAnnot.setLeaderLineExtensionLength",
{line:this.id,length:b},this.userPriority)};a.LineAnnot.prototype.getShowCaption=function(){return a.messageHandler.sendWithPromise("LineAnnot.getShowCaption",{line:this.id},this.userPriority)};a.LineAnnot.prototype.setShowCaption=function(b){d(arguments.length,1,"setShowCaption","(boolean)",[[b,"boolean"]]);return a.messageHandler.sendWithPromise("LineAnnot.setShowCaption",{line:this.id,showCaption:b},this.userPriority)};a.LineAnnot.prototype.getIntentType=function(){return a.messageHandler.sendWithPromise("LineAnnot.getIntentType",
{line:this.id},this.userPriority)};a.LineAnnot.prototype.setIntentType=function(b){d(arguments.length,1,"setIntentType","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("LineAnnot.setIntentType",{line:this.id,it:b},this.userPriority)};a.LineAnnot.prototype.getCapPos=function(){return a.messageHandler.sendWithPromise("LineAnnot.getCapPos",{line:this.id},this.userPriority)};a.LineAnnot.prototype.setCapPos=function(b){d(arguments.length,1,"setCapPos","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("LineAnnot.setCapPos",
{line:this.id,it:b},this.userPriority)};a.LineAnnot.prototype.getLeaderLineOffset=function(){return a.messageHandler.sendWithPromise("LineAnnot.getLeaderLineOffset",{line:this.id},this.userPriority)};a.LineAnnot.prototype.setLeaderLineOffset=function(b){d(arguments.length,1,"setLeaderLineOffset","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("LineAnnot.setLeaderLineOffset",{line:this.id,length:b},this.userPriority)};a.LineAnnot.prototype.getTextHOffset=function(){return a.messageHandler.sendWithPromise("LineAnnot.getTextHOffset",
{line:this.id},this.userPriority)};a.LineAnnot.prototype.setTextHOffset=function(b){d(arguments.length,1,"setTextHOffset","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("LineAnnot.setTextHOffset",{line:this.id,offset:b},this.userPriority)};a.LineAnnot.prototype.getTextVOffset=function(){return a.messageHandler.sendWithPromise("LineAnnot.getTextVOffset",{line:this.id},this.userPriority)};a.LineAnnot.prototype.setTextVOffset=function(b){d(arguments.length,1,"setTextVOffset","(number)",
[[b,"number"]]);return a.messageHandler.sendWithPromise("LineAnnot.setTextVOffset",{line:this.id,offset:b},this.userPriority)};a.CircleAnnot.createFromObj=function(b){"undefined"===typeof b&&(b=new a.Obj("0"));d(arguments.length,0,"createFromObj","(PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("circleAnnotCreateFromObj",{d:b.id},this.userPriority).then(function(b){return f(a.CircleAnnot,b)})};a.CircleAnnot.createFromAnnot=function(b){d(arguments.length,1,"createFromAnnot",
"(PDFNet.Annot)",[[b,"Object",a.Annot,"Annot"]]);return a.messageHandler.sendWithPromise("circleAnnotCreateFromAnnot",{circle:b.id},this.userPriority).then(function(b){return f(a.CircleAnnot,b)})};a.CircleAnnot.create=function(b,c){d(arguments.length,2,"create","(PDFNet.SDFDoc, PDFNet.Rect)",[[b,"SDFDoc"],[c,"Structure",a.Rect,"Rect"]]);n("create",[[c,1]]);return a.messageHandler.sendWithPromise("circleAnnotCreate",{doc:b.id,pos:c},this.userPriority).then(function(b){return f(a.CircleAnnot,b)})};
a.CircleAnnot.prototype.getInteriorColor=function(){return a.messageHandler.sendWithPromise("CircleAnnot.getInteriorColor",{circle:this.id},this.userPriority).then(function(b){return k(a.ColorPt,b)})};a.CircleAnnot.prototype.getInteriorColorCompNum=function(){return a.messageHandler.sendWithPromise("CircleAnnot.getInteriorColorCompNum",{circle:this.id},this.userPriority)};a.CircleAnnot.prototype.setInteriorColorDefault=function(b){d(arguments.length,1,"setInteriorColorDefault","(PDFNet.ColorPt)",
[[b,"Object",a.ColorPt,"ColorPt"]]);return a.messageHandler.sendWithPromise("CircleAnnot.setInteriorColorDefault",{circle:this.id,col:b.id},this.userPriority)};a.CircleAnnot.prototype.setInteriorColor=function(b,c){d(arguments.length,2,"setInteriorColor","(PDFNet.ColorPt, number)",[[b,"Object",a.ColorPt,"ColorPt"],[c,"number"]]);return a.messageHandler.sendWithPromise("CircleAnnot.setInteriorColor",{circle:this.id,col:b.id,numcomp:c},this.userPriority)};a.CircleAnnot.prototype.getContentRect=function(){return a.messageHandler.sendWithPromise("CircleAnnot.getContentRect",
{circle:this.id},this.userPriority).then(function(b){return new a.Rect(b)})};a.CircleAnnot.prototype.setContentRect=function(b){d(arguments.length,1,"setContentRect","(PDFNet.Rect)",[[b,"Structure",a.Rect,"Rect"]]);n("setContentRect",[[b,0]]);return a.messageHandler.sendWithPromise("CircleAnnot.setContentRect",{circle:this.id,cr:b},this.userPriority)};a.CircleAnnot.prototype.getPadding=function(){return a.messageHandler.sendWithPromise("CircleAnnot.getPadding",{circle:this.id},this.userPriority).then(function(b){return new a.Rect(b)})};
a.CircleAnnot.prototype.setPadding=function(b){d(arguments.length,1,"setPadding","(PDFNet.Rect)",[[b,"Structure",a.Rect,"Rect"]]);n("setPadding",[[b,0]]);return a.messageHandler.sendWithPromise("CircleAnnot.setPadding",{circle:this.id,cr:b},this.userPriority)};a.FileAttachmentAnnot.createFromObj=function(b){"undefined"===typeof b&&(b=new a.Obj("0"));d(arguments.length,0,"createFromObj","(PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("fileAttachmentAnnotCreateFromObj",
{d:b.id},this.userPriority).then(function(b){return f(a.FileAttachmentAnnot,b)})};a.FileAttachmentAnnot.prototype.export=function(b){"undefined"===typeof b&&(b="");d(arguments.length,0,"export","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("FileAttachmentAnnot.export",{fileatt:this.id,save_as:b},this.userPriority)};a.FileAttachmentAnnot.prototype.createFromAnnot=function(){return a.messageHandler.sendWithPromise("FileAttachmentAnnot.createFromAnnot",{fileatt:this.id},this.userPriority).then(function(b){return f(a.Annot,
b)})};a.FileAttachmentAnnot.createWithFileSpec=function(b,c,e,m){"undefined"===typeof m&&(m=a.FileAttachmentAnnot.Icon.e_PushPin);d(arguments.length,3,"createWithFileSpec","(PDFNet.SDFDoc, PDFNet.Rect, PDFNet.FileSpec, number)",[[b,"SDFDoc"],[c,"Structure",a.Rect,"Rect"],[e,"Object",a.FileSpec,"FileSpec"],[m,"number"]]);n("createWithFileSpec",[[c,1]]);return a.messageHandler.sendWithPromise("fileAttachmentAnnotCreateWithFileSpec",{doc:b.id,pos:c,fs:e.id,icon_name:m},this.userPriority).then(function(b){return f(a.FileAttachmentAnnot,
b)})};a.FileAttachmentAnnot.createDefault=function(b,c,e){d(arguments.length,3,"createDefault","(PDFNet.SDFDoc, PDFNet.Rect, string)",[[b,"SDFDoc"],[c,"Structure",a.Rect,"Rect"],[e,"string"]]);n("createDefault",[[c,1]]);return a.messageHandler.sendWithPromise("fileAttachmentAnnotCreateDefault",{doc:b.id,pos:c,path:e},this.userPriority).then(function(b){return f(a.FileAttachmentAnnot,b)})};a.FileAttachmentAnnot.prototype.getFileSpec=function(){return a.messageHandler.sendWithPromise("FileAttachmentAnnot.getFileSpec",
{fileatt:this.id},this.userPriority).then(function(b){return f(a.FileSpec,b)})};a.FileAttachmentAnnot.prototype.setFileSpec=function(b){d(arguments.length,1,"setFileSpec","(PDFNet.FileSpec)",[[b,"Object",a.FileSpec,"FileSpec"]]);return a.messageHandler.sendWithPromise("FileAttachmentAnnot.setFileSpec",{fileatt:this.id,file:b.id},this.userPriority)};a.FileAttachmentAnnot.prototype.getIcon=function(){return a.messageHandler.sendWithPromise("FileAttachmentAnnot.getIcon",{fileatt:this.id},this.userPriority)};
a.FileAttachmentAnnot.prototype.setIcon=function(b){"undefined"===typeof b&&(b=a.FileAttachmentAnnot.Icon.e_PushPin);d(arguments.length,0,"setIcon","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("FileAttachmentAnnot.setIcon",{fileatt:this.id,type:b},this.userPriority)};a.FileAttachmentAnnot.prototype.getIconName=function(){return a.messageHandler.sendWithPromise("FileAttachmentAnnot.getIconName",{fileatt:this.id},this.userPriority)};a.FileAttachmentAnnot.prototype.setIconName=
function(b){d(arguments.length,1,"setIconName","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("FileAttachmentAnnot.setIconName",{fileatt:this.id,iname:b},this.userPriority)};a.FreeTextAnnot.createFromObj=function(b){"undefined"===typeof b&&(b=new a.Obj("0"));d(arguments.length,0,"createFromObj","(PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("freeTextAnnotCreateFromObj",{d:b.id},this.userPriority).then(function(b){return f(a.FreeTextAnnot,b)})};
a.FreeTextAnnot.createFromAnnot=function(b){d(arguments.length,1,"createFromAnnot","(PDFNet.Annot)",[[b,"Object",a.Annot,"Annot"]]);return a.messageHandler.sendWithPromise("freeTextAnnotCreateFromAnnot",{ann:b.id},this.userPriority).then(function(b){return f(a.FreeTextAnnot,b)})};a.FreeTextAnnot.create=function(b,c){d(arguments.length,2,"create","(PDFNet.SDFDoc, PDFNet.Rect)",[[b,"SDFDoc"],[c,"Structure",a.Rect,"Rect"]]);n("create",[[c,1]]);return a.messageHandler.sendWithPromise("freeTextAnnotCreate",
{doc:b.id,pos:c},this.userPriority).then(function(b){return f(a.FreeTextAnnot,b)})};a.FreeTextAnnot.prototype.getDefaultAppearance=function(){return a.messageHandler.sendWithPromise("FreeTextAnnot.getDefaultAppearance",{ft:this.id},this.userPriority)};a.FreeTextAnnot.prototype.setDefaultAppearance=function(b){d(arguments.length,1,"setDefaultAppearance","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("FreeTextAnnot.setDefaultAppearance",{ft:this.id,app_str:b},this.userPriority)};
a.FreeTextAnnot.prototype.getQuaddingFormat=function(){return a.messageHandler.sendWithPromise("FreeTextAnnot.getQuaddingFormat",{ft:this.id},this.userPriority)};a.FreeTextAnnot.prototype.setQuaddingFormat=function(b){d(arguments.length,1,"setQuaddingFormat","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("FreeTextAnnot.setQuaddingFormat",{ft:this.id,format:b},this.userPriority)};a.FreeTextAnnot.prototype.getCalloutLinePoints=function(){return a.messageHandler.sendWithPromise("FreeTextAnnot.getCalloutLinePoints",
{ft:this.id},this.userPriority)};a.FreeTextAnnot.prototype.setCalloutLinePoints=function(b,c,e){d(arguments.length,3,"setCalloutLinePoints","(PDFNet.Point, PDFNet.Point, PDFNet.Point)",[[b,"Structure",a.Point,"Point"],[c,"Structure",a.Point,"Point"],[e,"Structure",a.Point,"Point"]]);n("setCalloutLinePoints",[[b,0],[c,1],[e,2]]);return a.messageHandler.sendWithPromise("FreeTextAnnot.setCalloutLinePoints",{ft:this.id,p1:b,p2:c,p3:e},this.userPriority)};a.FreeTextAnnot.prototype.setCalloutLinePointsTwo=
function(b,c){d(arguments.length,2,"setCalloutLinePointsTwo","(PDFNet.Point, PDFNet.Point)",[[b,"Structure",a.Point,"Point"],[c,"Structure",a.Point,"Point"]]);n("setCalloutLinePointsTwo",[[b,0],[c,1]]);return a.messageHandler.sendWithPromise("FreeTextAnnot.setCalloutLinePointsTwo",{ft:this.id,p1:b,p2:c},this.userPriority)};a.FreeTextAnnot.prototype.getIntentName=function(){return a.messageHandler.sendWithPromise("FreeTextAnnot.getIntentName",{ft:this.id},this.userPriority)};a.FreeTextAnnot.prototype.setIntentName=
function(b){"undefined"===typeof b&&(b=a.FreeTextAnnot.IntentName.e_FreeText);d(arguments.length,0,"setIntentName","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("FreeTextAnnot.setIntentName",{ft:this.id,mode:b},this.userPriority)};a.FreeTextAnnot.prototype.setIntentNameDefault=function(){return a.messageHandler.sendWithPromise("FreeTextAnnot.setIntentNameDefault",{ft:this.id},this.userPriority)};a.FreeTextAnnot.prototype.getEndingStyle=function(){return a.messageHandler.sendWithPromise("FreeTextAnnot.getEndingStyle",
{ft:this.id},this.userPriority)};a.FreeTextAnnot.prototype.setEndingStyle=function(b){d(arguments.length,1,"setEndingStyle","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("FreeTextAnnot.setEndingStyle",{ft:this.id,style:b},this.userPriority)};a.FreeTextAnnot.prototype.setEndingStyleName=function(b){d(arguments.length,1,"setEndingStyleName","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("FreeTextAnnot.setEndingStyleName",{ft:this.id,est:b},this.userPriority)};
a.FreeTextAnnot.prototype.setTextColor=function(b,c){d(arguments.length,2,"setTextColor","(PDFNet.ColorPt, number)",[[b,"Object",a.ColorPt,"ColorPt"],[c,"number"]]);return a.messageHandler.sendWithPromise("FreeTextAnnot.setTextColor",{ft:this.id,color:b.id,col_comp:c},this.userPriority)};a.FreeTextAnnot.prototype.getTextColor=function(){return a.messageHandler.sendWithPromise("FreeTextAnnot.getTextColor",{ft:this.id},this.userPriority).then(function(b){b.color=k(a.ColorPt,b.color);return b})};a.FreeTextAnnot.prototype.setLineColor=
function(b,c){d(arguments.length,2,"setLineColor","(PDFNet.ColorPt, number)",[[b,"Object",a.ColorPt,"ColorPt"],[c,"number"]]);return a.messageHandler.sendWithPromise("FreeTextAnnot.setLineColor",{ft:this.id,color:b.id,col_comp:c},this.userPriority)};a.FreeTextAnnot.prototype.getLineColor=function(){return a.messageHandler.sendWithPromise("FreeTextAnnot.getLineColor",{ft:this.id},this.userPriority).then(function(b){b.color=k(a.ColorPt,b.color);return b})};a.FreeTextAnnot.prototype.setFontSize=function(b){d(arguments.length,
1,"setFontSize","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("FreeTextAnnot.setFontSize",{ft:this.id,font_size:b},this.userPriority)};a.FreeTextAnnot.prototype.getFontSize=function(){return a.messageHandler.sendWithPromise("FreeTextAnnot.getFontSize",{ft:this.id},this.userPriority)};a.HighlightAnnot.createFromObj=function(b){d(arguments.length,1,"createFromObj","(PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("highlightAnnotCreateFromObj",{d:b.id},
this.userPriority).then(function(b){return f(a.HighlightAnnot,b)})};a.HighlightAnnot.createFromAnnot=function(b){d(arguments.length,1,"createFromAnnot","(PDFNet.Annot)",[[b,"Object",a.Annot,"Annot"]]);return a.messageHandler.sendWithPromise("highlightAnnotCreateFromAnnot",{ann:b.id},this.userPriority).then(function(b){return f(a.HighlightAnnot,b)})};a.HighlightAnnot.create=function(b,c){d(arguments.length,2,"create","(PDFNet.SDFDoc, PDFNet.Rect)",[[b,"SDFDoc"],[c,"Structure",a.Rect,"Rect"]]);n("create",
[[c,1]]);return a.messageHandler.sendWithPromise("highlightAnnotCreate",{doc:b.id,pos:c},this.userPriority).then(function(b){return f(a.HighlightAnnot,b)})};a.InkAnnot.createFromObj=function(b){"undefined"===typeof b&&(b=new a.Obj("0"));d(arguments.length,0,"createFromObj","(PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("inkAnnotCreateFromObj",{d:b.id},this.userPriority).then(function(b){return f(a.InkAnnot,b)})};a.InkAnnot.createFromAnnot=function(b){d(arguments.length,
1,"createFromAnnot","(PDFNet.Annot)",[[b,"Object",a.Annot,"Annot"]]);return a.messageHandler.sendWithPromise("inkAnnotCreateFromAnnot",{ann:b.id},this.userPriority).then(function(b){return f(a.InkAnnot,b)})};a.InkAnnot.create=function(b,c){d(arguments.length,2,"create","(PDFNet.SDFDoc, PDFNet.Rect)",[[b,"SDFDoc"],[c,"Structure",a.Rect,"Rect"]]);n("create",[[c,1]]);return a.messageHandler.sendWithPromise("inkAnnotCreate",{doc:b.id,pos:c},this.userPriority).then(function(b){return f(a.InkAnnot,b)})};
a.InkAnnot.prototype.getPathCount=function(){return a.messageHandler.sendWithPromise("InkAnnot.getPathCount",{ink:this.id},this.userPriority)};a.InkAnnot.prototype.getPointCount=function(b){d(arguments.length,1,"getPointCount","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("InkAnnot.getPointCount",{ink:this.id,pathindex:b},this.userPriority)};a.InkAnnot.prototype.getPoint=function(b,c){d(arguments.length,2,"getPoint","(number, number)",[[b,"number"],[c,"number"]]);return a.messageHandler.sendWithPromise("InkAnnot.getPoint",
{ink:this.id,pathindex:b,pointindex:c},this.userPriority)};a.InkAnnot.prototype.setPoint=function(b,c,e){d(arguments.length,3,"setPoint","(number, number, PDFNet.Point)",[[b,"number"],[c,"number"],[e,"Structure",a.Point,"Point"]]);n("setPoint",[[e,2]]);return a.messageHandler.sendWithPromise("InkAnnot.setPoint",{ink:this.id,pathindex:b,pointindex:c,pt:e},this.userPriority)};a.InkAnnot.prototype.erase=function(b,c,e){d(arguments.length,3,"erase","(PDFNet.Point, PDFNet.Point, number)",[[b,"Structure",
a.Point,"Point"],[c,"Structure",a.Point,"Point"],[e,"number"]]);n("erase",[[b,0],[c,1]]);return a.messageHandler.sendWithPromise("InkAnnot.erase",{ink:this.id,pt1:b,pt2:c,width:e},this.userPriority)};a.InkAnnot.prototype.getHighlightIntent=function(){return a.messageHandler.sendWithPromise("InkAnnot.getHighlightIntent",{ink:this.id},this.userPriority)};a.InkAnnot.prototype.setHighlightIntent=function(b){d(arguments.length,1,"setHighlightIntent","(boolean)",[[b,"boolean"]]);return a.messageHandler.sendWithPromise("InkAnnot.setHighlightIntent",
{ink:this.id,highlight:b},this.userPriority)};a.LinkAnnot.createFromObj=function(b){"undefined"===typeof b&&(b=new a.Obj("0"));d(arguments.length,0,"createFromObj","(PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("linkAnnotCreateFromObj",{d:b.id},this.userPriority).then(function(b){return f(a.LinkAnnot,b)})};a.LinkAnnot.createFromAnnot=function(b){d(arguments.length,1,"createFromAnnot","(PDFNet.Annot)",[[b,"Object",a.Annot,"Annot"]]);return a.messageHandler.sendWithPromise("linkAnnotCreateFromAnnot",
{ann:b.id},this.userPriority).then(function(b){return f(a.LinkAnnot,b)})};a.LinkAnnot.create=function(b,c){d(arguments.length,2,"create","(PDFNet.SDFDoc, PDFNet.Rect)",[[b,"SDFDoc"],[c,"Structure",a.Rect,"Rect"]]);n("create",[[c,1]]);return a.messageHandler.sendWithPromise("linkAnnotCreate",{doc:b.id,pos:c},this.userPriority).then(function(b){return f(a.LinkAnnot,b)})};a.LinkAnnot.prototype.removeAction=function(){return a.messageHandler.sendWithPromise("LinkAnnot.removeAction",{link:this.id},this.userPriority)};
a.LinkAnnot.prototype.getAction=function(){return a.messageHandler.sendWithPromise("LinkAnnot.getAction",{link:this.id},this.userPriority).then(function(b){return f(a.Action,b)})};a.LinkAnnot.prototype.setAction=function(b){d(arguments.length,1,"setAction","(PDFNet.Action)",[[b,"Object",a.Action,"Action"]]);return a.messageHandler.sendWithPromise("LinkAnnot.setAction",{link:this.id,action:b.id},this.userPriority)};a.LinkAnnot.prototype.getHighlightingMode=function(){return a.messageHandler.sendWithPromise("LinkAnnot.getHighlightingMode",
{link:this.id},this.userPriority)};a.LinkAnnot.prototype.setHighlightingMode=function(b){d(arguments.length,1,"setHighlightingMode","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("LinkAnnot.setHighlightingMode",{link:this.id,value:b},this.userPriority)};a.LinkAnnot.prototype.getQuadPointCount=function(){return a.messageHandler.sendWithPromise("LinkAnnot.getQuadPointCount",{link:this.id},this.userPriority)};a.LinkAnnot.prototype.getQuadPoint=function(b){d(arguments.length,1,"getQuadPoint",
"(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("LinkAnnot.getQuadPoint",{link:this.id,idx:b},this.userPriority)};a.LinkAnnot.prototype.setQuadPoint=function(b,c){d(arguments.length,2,"setQuadPoint","(number, PDFNet.QuadPoint)",[[b,"number"],[c,"Structure",a.QuadPoint,"QuadPoint"]]);n("setQuadPoint",[[c,1]]);return a.messageHandler.sendWithPromise("LinkAnnot.setQuadPoint",{link:this.id,idx:b,qp:c},this.userPriority)};a.getNormalizedUrl=function(b){d(arguments.length,1,"getNormalizedUrl",
"(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("getNormalizedUrl",{url:b},this.userPriority)};a.MarkupAnnot.createFromObj=function(b){"undefined"===typeof b&&(b=new a.Obj("0"));d(arguments.length,0,"createFromObj","(PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("markupAnnotCreateFromObj",{d:b.id},this.userPriority).then(function(b){return f(a.MarkupAnnot,b)})};a.MarkupAnnot.createFromAnnot=function(b){d(arguments.length,1,"createFromAnnot","(PDFNet.Annot)",
[[b,"Object",a.Annot,"Annot"]]);return a.messageHandler.sendWithPromise("markupAnnotCreateFromAnnot",{ann:b.id},this.userPriority).then(function(b){return f(a.MarkupAnnot,b)})};a.MarkupAnnot.prototype.getTitle=function(){return a.messageHandler.sendWithPromise("MarkupAnnot.getTitle",{markup:this.id},this.userPriority)};a.MarkupAnnot.prototype.setTitle=function(b){d(arguments.length,1,"setTitle","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("MarkupAnnot.setTitle",{markup:this.id,
title:b},this.userPriority)};a.MarkupAnnot.prototype.setTitleUString=function(b){d(arguments.length,1,"setTitleUString","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("MarkupAnnot.setTitleUString",{markup:this.id,title:b},this.userPriority)};a.MarkupAnnot.prototype.getPopup=function(){return a.messageHandler.sendWithPromise("MarkupAnnot.getPopup",{markup:this.id},this.userPriority).then(function(b){return f(a.Annot,b)})};a.MarkupAnnot.prototype.setPopup=function(b){d(arguments.length,
1,"setPopup","(PDFNet.Annot)",[[b,"Object",a.Annot,"Annot"]]);return a.messageHandler.sendWithPromise("MarkupAnnot.setPopup",{markup:this.id,ppup:b.id},this.userPriority)};a.MarkupAnnot.prototype.getOpacity=function(){return a.messageHandler.sendWithPromise("MarkupAnnot.getOpacity",{markup:this.id},this.userPriority)};a.MarkupAnnot.prototype.setOpacity=function(b){d(arguments.length,1,"setOpacity","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("MarkupAnnot.setOpacity",{markup:this.id,
op:b},this.userPriority)};a.MarkupAnnot.prototype.getSubject=function(){return a.messageHandler.sendWithPromise("MarkupAnnot.getSubject",{markup:this.id},this.userPriority)};a.MarkupAnnot.prototype.setSubject=function(b){d(arguments.length,1,"setSubject","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("MarkupAnnot.setSubject",{markup:this.id,contents:b},this.userPriority)};a.MarkupAnnot.prototype.getCreationDates=function(){return a.messageHandler.sendWithPromise("MarkupAnnot.getCreationDates",
{markup:this.id},this.userPriority).then(function(b){return new a.Date(b)})};a.MarkupAnnot.prototype.getBorderEffect=function(){return a.messageHandler.sendWithPromise("MarkupAnnot.getBorderEffect",{markup:this.id},this.userPriority)};a.MarkupAnnot.prototype.setBorderEffect=function(b){"undefined"===typeof b&&(b=a.MarkupAnnot.BorderEffect.e_None);d(arguments.length,0,"setBorderEffect","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("MarkupAnnot.setBorderEffect",{markup:this.id,
effect:b},this.userPriority)};a.MarkupAnnot.prototype.getBorderEffectIntensity=function(){return a.messageHandler.sendWithPromise("MarkupAnnot.getBorderEffectIntensity",{markup:this.id},this.userPriority)};a.MarkupAnnot.prototype.setBorderEffectIntensity=function(b){"undefined"===typeof b&&(b=0);d(arguments.length,0,"setBorderEffectIntensity","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("MarkupAnnot.setBorderEffectIntensity",{markup:this.id,intensity:b},this.userPriority)};a.MarkupAnnot.prototype.setCreationDates=
function(b){d(arguments.length,1,"setCreationDates","(PDFNet.Date)",[[b,"Structure",a.Date,"Date"]]);n("setCreationDates",[[b,0]]);return a.messageHandler.sendWithPromise("MarkupAnnot.setCreationDates",{markup:this.id,dt:b},this.userPriority)};a.MarkupAnnot.prototype.getInteriorColor=function(){return a.messageHandler.sendWithPromise("MarkupAnnot.getInteriorColor",{markup:this.id},this.userPriority).then(function(b){return k(a.ColorPt,b)})};a.MarkupAnnot.prototype.getInteriorColorCompNum=function(){return a.messageHandler.sendWithPromise("MarkupAnnot.getInteriorColorCompNum",
{markup:this.id},this.userPriority)};a.MarkupAnnot.prototype.setInteriorColorRGB=function(b){d(arguments.length,1,"setInteriorColorRGB","(PDFNet.ColorPt)",[[b,"Object",a.ColorPt,"ColorPt"]]);return a.messageHandler.sendWithPromise("MarkupAnnot.setInteriorColorRGB",{markup:this.id,col:b.id},this.userPriority)};a.MarkupAnnot.prototype.setInteriorColor=function(b,c){d(arguments.length,2,"setInteriorColor","(PDFNet.ColorPt, number)",[[b,"Object",a.ColorPt,"ColorPt"],[c,"number"]]);return a.messageHandler.sendWithPromise("MarkupAnnot.setInteriorColor",
{markup:this.id,c:b.id,CompNum:c},this.userPriority)};a.MarkupAnnot.prototype.getContentRect=function(){return a.messageHandler.sendWithPromise("MarkupAnnot.getContentRect",{markup:this.id},this.userPriority).then(function(b){return new a.Rect(b)})};a.MarkupAnnot.prototype.setContentRect=function(b){d(arguments.length,1,"setContentRect","(PDFNet.Rect)",[[b,"Structure",a.Rect,"Rect"]]);n("setContentRect",[[b,0]]);return a.messageHandler.sendWithPromise("MarkupAnnot.setContentRect",{markup:this.id,
cr:b},this.userPriority)};a.MarkupAnnot.prototype.getPadding=function(){return a.messageHandler.sendWithPromise("MarkupAnnot.getPadding",{markup:this.id},this.userPriority).then(function(b){return new a.Rect(b)})};a.MarkupAnnot.prototype.setPadding=function(b){d(arguments.length,1,"setPadding","(PDFNet.Rect)",[[b,"Structure",a.Rect,"Rect"]]);n("setPadding",[[b,0]]);return a.messageHandler.sendWithPromise("MarkupAnnot.setPadding",{markup:this.id,rd:b},this.userPriority)};a.MarkupAnnot.prototype.rotateAppearance=
function(b){d(arguments.length,1,"rotateAppearance","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("MarkupAnnot.rotateAppearance",{markup:this.id,angle:b},this.userPriority)};a.MovieAnnot.createFromObj=function(b){"undefined"===typeof b&&(b=new a.Obj("0"));d(arguments.length,0,"createFromObj","(PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("movieAnnotCreateFromObj",{d:b.id},this.userPriority).then(function(b){return f(a.MovieAnnot,b)})};a.MovieAnnot.createFromAnnot=
function(b){d(arguments.length,1,"createFromAnnot","(PDFNet.Annot)",[[b,"Object",a.Annot,"Annot"]]);return a.messageHandler.sendWithPromise("movieAnnotCreateFromAnnot",{ann:b.id},this.userPriority).then(function(b){return f(a.MovieAnnot,b)})};a.MovieAnnot.create=function(b,c){d(arguments.length,2,"create","(PDFNet.SDFDoc, PDFNet.Rect)",[[b,"SDFDoc"],[c,"Structure",a.Rect,"Rect"]]);n("create",[[c,1]]);return a.messageHandler.sendWithPromise("movieAnnotCreate",{doc:b.id,pos:c},this.userPriority).then(function(b){return f(a.MovieAnnot,
b)})};a.MovieAnnot.prototype.getTitle=function(){return a.messageHandler.sendWithPromise("MovieAnnot.getTitle",{movie:this.id},this.userPriority)};a.MovieAnnot.prototype.setTitle=function(b){d(arguments.length,1,"setTitle","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("MovieAnnot.setTitle",{movie:this.id,title:b},this.userPriority)};a.MovieAnnot.prototype.isToBePlayed=function(){return a.messageHandler.sendWithPromise("MovieAnnot.isToBePlayed",{movie:this.id},this.userPriority)};
a.MovieAnnot.prototype.setToBePlayed=function(b){"undefined"===typeof b&&(b=!0);d(arguments.length,0,"setToBePlayed","(boolean)",[[b,"boolean"]]);return a.messageHandler.sendWithPromise("MovieAnnot.setToBePlayed",{movie:this.id,isplay:b},this.userPriority)};a.PolyLineAnnot.createFromObj=function(b){"undefined"===typeof b&&(b=new a.Obj("0"));d(arguments.length,0,"createFromObj","(PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("polyLineAnnotCreateFromObj",{d:b.id},
this.userPriority).then(function(b){return f(a.PolyLineAnnot,b)})};a.PolyLineAnnot.createFromAnnot=function(b){d(arguments.length,1,"createFromAnnot","(PDFNet.Annot)",[[b,"Object",a.Annot,"Annot"]]);return a.messageHandler.sendWithPromise("polyLineAnnotCreateFromAnnot",{ann:b.id},this.userPriority).then(function(b){return f(a.PolyLineAnnot,b)})};a.PolyLineAnnot.create=function(b,c){d(arguments.length,2,"create","(PDFNet.SDFDoc, PDFNet.Rect)",[[b,"SDFDoc"],[c,"Structure",a.Rect,"Rect"]]);n("create",
[[c,1]]);return a.messageHandler.sendWithPromise("polyLineAnnotCreate",{doc:b.id,pos:c},this.userPriority).then(function(b){return f(a.PolyLineAnnot,b)})};a.PolyLineAnnot.prototype.getVertexCount=function(){return a.messageHandler.sendWithPromise("PolyLineAnnot.getVertexCount",{polyline:this.id},this.userPriority)};a.PolyLineAnnot.prototype.getVertex=function(b){d(arguments.length,1,"getVertex","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("PolyLineAnnot.getVertex",{polyline:this.id,
idx:b},this.userPriority)};a.PolyLineAnnot.prototype.setVertex=function(b,c){d(arguments.length,2,"setVertex","(number, PDFNet.Point)",[[b,"number"],[c,"Structure",a.Point,"Point"]]);n("setVertex",[[c,1]]);return a.messageHandler.sendWithPromise("PolyLineAnnot.setVertex",{polyline:this.id,idx:b,pt:c},this.userPriority)};a.PolyLineAnnot.prototype.getStartStyle=function(){return a.messageHandler.sendWithPromise("PolyLineAnnot.getStartStyle",{polyline:this.id},this.userPriority)};a.PolyLineAnnot.prototype.setStartStyle=
function(b){d(arguments.length,1,"setStartStyle","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("PolyLineAnnot.setStartStyle",{polyline:this.id,style:b},this.userPriority)};a.PolyLineAnnot.prototype.getEndStyle=function(){return a.messageHandler.sendWithPromise("PolyLineAnnot.getEndStyle",{polyline:this.id},this.userPriority)};a.PolyLineAnnot.prototype.setEndStyle=function(b){d(arguments.length,1,"setEndStyle","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("PolyLineAnnot.setEndStyle",
{polyline:this.id,style:b},this.userPriority)};a.PolyLineAnnot.prototype.getIntentName=function(){return a.messageHandler.sendWithPromise("PolyLineAnnot.getIntentName",{polyline:this.id},this.userPriority)};a.PolyLineAnnot.prototype.setIntentName=function(b){d(arguments.length,1,"setIntentName","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("PolyLineAnnot.setIntentName",{polyline:this.id,mode:b},this.userPriority)};a.PolygonAnnot.createFromObj=function(b){"undefined"===typeof b&&
(b=new a.Obj("0"));d(arguments.length,0,"createFromObj","(PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("polygonAnnotCreateFromObj",{d:b.id},this.userPriority).then(function(b){return f(a.PolygonAnnot,b)})};a.PolygonAnnot.createFromAnnot=function(b){d(arguments.length,1,"createFromAnnot","(PDFNet.Annot)",[[b,"Object",a.Annot,"Annot"]]);return a.messageHandler.sendWithPromise("polygonAnnotCreateFromAnnot",{ann:b.id},this.userPriority).then(function(b){return f(a.PolygonAnnot,
b)})};a.PolygonAnnot.create=function(b,c){d(arguments.length,2,"create","(PDFNet.SDFDoc, PDFNet.Rect)",[[b,"SDFDoc"],[c,"Structure",a.Rect,"Rect"]]);n("create",[[c,1]]);return a.messageHandler.sendWithPromise("polygonAnnotCreate",{doc:b.id,pos:c},this.userPriority).then(function(b){return f(a.PolygonAnnot,b)})};a.PopupAnnot.createFromObj=function(b){"undefined"===typeof b&&(b=new a.Obj("0"));d(arguments.length,0,"createFromObj","(PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("popupAnnotCreateFromObj",
{d:b.id},this.userPriority).then(function(b){return f(a.PopupAnnot,b)})};a.PopupAnnot.createFromAnnot=function(b){d(arguments.length,1,"createFromAnnot","(PDFNet.Annot)",[[b,"Object",a.Annot,"Annot"]]);return a.messageHandler.sendWithPromise("popupAnnotCreateFromAnnot",{ann:b.id},this.userPriority).then(function(b){return f(a.PopupAnnot,b)})};a.PopupAnnot.create=function(b,c){d(arguments.length,2,"create","(PDFNet.SDFDoc, PDFNet.Rect)",[[b,"SDFDoc"],[c,"Structure",a.Rect,"Rect"]]);n("create",[[c,
1]]);return a.messageHandler.sendWithPromise("popupAnnotCreate",{doc:b.id,pos:c},this.userPriority).then(function(b){return f(a.PopupAnnot,b)})};a.PopupAnnot.prototype.getParent=function(){return a.messageHandler.sendWithPromise("PopupAnnot.getParent",{popup:this.id},this.userPriority).then(function(b){return f(a.Annot,b)})};a.PopupAnnot.prototype.setParent=function(b){d(arguments.length,1,"setParent","(PDFNet.Annot)",[[b,"Object",a.Annot,"Annot"]]);return a.messageHandler.sendWithPromise("PopupAnnot.setParent",
{popup:this.id,parent:b.id},this.userPriority)};a.PopupAnnot.prototype.isOpen=function(){return a.messageHandler.sendWithPromise("PopupAnnot.isOpen",{popup:this.id},this.userPriority)};a.PopupAnnot.prototype.setOpen=function(b){d(arguments.length,1,"setOpen","(boolean)",[[b,"boolean"]]);return a.messageHandler.sendWithPromise("PopupAnnot.setOpen",{popup:this.id,isopen:b},this.userPriority)};a.RedactionAnnot.createFromObj=function(b){"undefined"===typeof b&&(b=new a.Obj("0"));d(arguments.length,0,
"createFromObj","(PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("redactionAnnotCreateFromObj",{d:b.id},this.userPriority).then(function(b){return f(a.RedactionAnnot,b)})};a.RedactionAnnot.createFromAnnot=function(b){d(arguments.length,1,"createFromAnnot","(PDFNet.Annot)",[[b,"Object",a.Annot,"Annot"]]);return a.messageHandler.sendWithPromise("redactionAnnotCreateFromAnnot",{ann:b.id},this.userPriority).then(function(b){return f(a.RedactionAnnot,b)})};a.RedactionAnnot.create=
function(b,c){d(arguments.length,2,"create","(PDFNet.SDFDoc, PDFNet.Rect)",[[b,"SDFDoc"],[c,"Structure",a.Rect,"Rect"]]);n("create",[[c,1]]);return a.messageHandler.sendWithPromise("redactionAnnotCreate",{doc:b.id,pos:c},this.userPriority).then(function(b){return f(a.RedactionAnnot,b)})};a.RedactionAnnot.prototype.getQuadPointCount=function(){return a.messageHandler.sendWithPromise("RedactionAnnot.getQuadPointCount",{redaction:this.id},this.userPriority)};a.RedactionAnnot.prototype.getQuadPoint=function(b){d(arguments.length,
1,"getQuadPoint","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("RedactionAnnot.getQuadPoint",{redaction:this.id,idx:b},this.userPriority)};a.RedactionAnnot.prototype.setQuadPoint=function(b,c){d(arguments.length,2,"setQuadPoint","(number, PDFNet.QuadPoint)",[[b,"number"],[c,"Structure",a.QuadPoint,"QuadPoint"]]);n("setQuadPoint",[[c,1]]);return a.messageHandler.sendWithPromise("RedactionAnnot.setQuadPoint",{redaction:this.id,idx:b,qp:c},this.userPriority)};a.RedactionAnnot.prototype.setAppFormXO=
function(b){d(arguments.length,1,"setAppFormXO","(PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("RedactionAnnot.setAppFormXO",{redaction:this.id,formxo:b.id},this.userPriority)};a.RedactionAnnot.prototype.getOverlayText=function(){return a.messageHandler.sendWithPromise("RedactionAnnot.getOverlayText",{redaction:this.id},this.userPriority)};a.RedactionAnnot.prototype.setOverlayText=function(b){d(arguments.length,1,"setOverlayText","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("RedactionAnnot.setOverlayText",
{redaction:this.id,title:b},this.userPriority)};a.RedactionAnnot.prototype.getUseRepeat=function(){return a.messageHandler.sendWithPromise("RedactionAnnot.getUseRepeat",{redaction:this.id},this.userPriority)};a.RedactionAnnot.prototype.setUseRepeat=function(b){"undefined"===typeof b&&(b=!1);d(arguments.length,0,"setUseRepeat","(boolean)",[[b,"boolean"]]);return a.messageHandler.sendWithPromise("RedactionAnnot.setUseRepeat",{redaction:this.id,userepeat:b},this.userPriority)};a.RedactionAnnot.prototype.getOverlayTextAppearance=
function(){return a.messageHandler.sendWithPromise("RedactionAnnot.getOverlayTextAppearance",{redaction:this.id},this.userPriority)};a.RedactionAnnot.prototype.setOverlayTextAppearance=function(b){d(arguments.length,1,"setOverlayTextAppearance","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("RedactionAnnot.setOverlayTextAppearance",{redaction:this.id,app:b},this.userPriority)};a.RedactionAnnot.prototype.getQuadForm=function(){return a.messageHandler.sendWithPromise("RedactionAnnot.getQuadForm",
{redaction:this.id},this.userPriority)};a.RedactionAnnot.prototype.setQuadForm=function(b){"undefined"===typeof b&&(b=a.RedactionAnnot.QuadForm.e_LeftJustified);d(arguments.length,0,"setQuadForm","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("RedactionAnnot.setQuadForm",{redaction:this.id,form:b},this.userPriority)};a.RedactionAnnot.prototype.getAppFormXO=function(){return a.messageHandler.sendWithPromise("RedactionAnnot.getAppFormXO",{redaction:this.id},this.userPriority).then(function(b){return f(a.Obj,
b)})};a.RubberStampAnnot.createFromObj=function(b){"undefined"===typeof b&&(b=new a.Obj("0"));d(arguments.length,0,"createFromObj","(PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("rubberStampAnnotCreateFromObj",{d:b.id},this.userPriority).then(function(b){return f(a.RubberStampAnnot,b)})};a.RubberStampAnnot.createFromAnnot=function(b){d(arguments.length,1,"createFromAnnot","(PDFNet.Annot)",[[b,"Object",a.Annot,"Annot"]]);return a.messageHandler.sendWithPromise("rubberStampAnnotCreateFromAnnot",
{ann:b.id},this.userPriority).then(function(b){return f(a.RubberStampAnnot,b)})};a.RubberStampAnnot.create=function(b,c){d(arguments.length,2,"create","(PDFNet.SDFDoc, PDFNet.Rect)",[[b,"SDFDoc"],[c,"Structure",a.Rect,"Rect"]]);n("create",[[c,1]]);return a.messageHandler.sendWithPromise("rubberStampAnnotCreate",{doc:b.id,pos:c},this.userPriority).then(function(b){return f(a.RubberStampAnnot,b)})};a.RubberStampAnnot.createCustom=function(b,c,e){d(arguments.length,3,"createCustom","(PDFNet.SDFDoc, PDFNet.Rect, PDFNet.Obj)",
[[b,"SDFDoc"],[c,"Structure",a.Rect,"Rect"],[e,"Object",a.Obj,"Obj"]]);n("createCustom",[[c,1]]);return a.messageHandler.sendWithPromise("rubberStampAnnotCreateCustom",{doc:b.id,pos:c,form_xobject:e.id},this.userPriority).then(function(b){return f(a.RubberStampAnnot,b)})};a.RubberStampAnnot.prototype.getIcon=function(){return a.messageHandler.sendWithPromise("RubberStampAnnot.getIcon",{stamp:this.id},this.userPriority)};a.RubberStampAnnot.prototype.setIcon=function(b){"undefined"===typeof b&&(b=a.RubberStampAnnot.Icon.e_Draft);
d(arguments.length,0,"setIcon","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("RubberStampAnnot.setIcon",{stamp:this.id,type:b},this.userPriority)};a.RubberStampAnnot.prototype.setIconDefault=function(){return a.messageHandler.sendWithPromise("RubberStampAnnot.setIconDefault",{stamp:this.id},this.userPriority)};a.RubberStampAnnot.prototype.getIconName=function(){return a.messageHandler.sendWithPromise("RubberStampAnnot.getIconName",{stamp:this.id},this.userPriority)};a.RubberStampAnnot.prototype.setIconName=
function(b){d(arguments.length,1,"setIconName","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("RubberStampAnnot.setIconName",{stamp:this.id,iconstring:b},this.userPriority)};a.ScreenAnnot.createFromObj=function(b){"undefined"===typeof b&&(b=new a.Obj("0"));d(arguments.length,0,"createFromObj","(PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("screenAnnotCreateFromObj",{d:b.id},this.userPriority).then(function(b){return f(a.ScreenAnnot,b)})};a.ScreenAnnot.createFromAnnot=
function(b){d(arguments.length,1,"createFromAnnot","(PDFNet.Annot)",[[b,"Object",a.Annot,"Annot"]]);return a.messageHandler.sendWithPromise("screenAnnotCreateFromAnnot",{ann:b.id},this.userPriority).then(function(b){return f(a.ScreenAnnot,b)})};a.ScreenAnnot.prototype.getTitle=function(){return a.messageHandler.sendWithPromise("ScreenAnnot.getTitle",{s:this.id},this.userPriority)};a.ScreenAnnot.prototype.setTitle=function(b){d(arguments.length,1,"setTitle","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("ScreenAnnot.setTitle",
{s:this.id,title:b},this.userPriority)};a.ScreenAnnot.create=function(b,c){d(arguments.length,2,"create","(PDFNet.SDFDoc, PDFNet.Rect)",[[b,"SDFDoc"],[c,"Structure",a.Rect,"Rect"]]);n("create",[[c,1]]);return a.messageHandler.sendWithPromise("screenAnnotCreate",{doc:b.id,pos:c},this.userPriority).then(function(b){return f(a.ScreenAnnot,b)})};a.ScreenAnnot.prototype.getAction=function(){return a.messageHandler.sendWithPromise("ScreenAnnot.getAction",{s:this.id},this.userPriority).then(function(b){return f(a.Action,
b)})};a.ScreenAnnot.prototype.setAction=function(b){d(arguments.length,1,"setAction","(PDFNet.Action)",[[b,"Object",a.Action,"Action"]]);return a.messageHandler.sendWithPromise("ScreenAnnot.setAction",{s:this.id,action:b.id},this.userPriority)};a.ScreenAnnot.prototype.getBorderColor=function(){return a.messageHandler.sendWithPromise("ScreenAnnot.getBorderColor",{s:this.id},this.userPriority).then(function(b){return k(a.ColorPt,b)})};a.ScreenAnnot.prototype.setBorderColor=function(b,c){d(arguments.length,
2,"setBorderColor","(PDFNet.ColorPt, number)",[[b,"Object",a.ColorPt,"ColorPt"],[c,"number"]]);return a.messageHandler.sendWithPromise("ScreenAnnot.setBorderColor",{s:this.id,col:b.id,numcomp:c},this.userPriority)};a.ScreenAnnot.prototype.getBorderColorCompNum=function(){return a.messageHandler.sendWithPromise("ScreenAnnot.getBorderColorCompNum",{s:this.id},this.userPriority)};a.ScreenAnnot.prototype.getBackgroundColorCompNum=function(){return a.messageHandler.sendWithPromise("ScreenAnnot.getBackgroundColorCompNum",
{s:this.id},this.userPriority)};a.ScreenAnnot.prototype.getBackgroundColor=function(){return a.messageHandler.sendWithPromise("ScreenAnnot.getBackgroundColor",{s:this.id},this.userPriority).then(function(b){return k(a.ColorPt,b)})};a.ScreenAnnot.prototype.setBackgroundColor=function(b,c){d(arguments.length,2,"setBackgroundColor","(PDFNet.ColorPt, number)",[[b,"Object",a.ColorPt,"ColorPt"],[c,"number"]]);return a.messageHandler.sendWithPromise("ScreenAnnot.setBackgroundColor",{s:this.id,col:b.id,numcomp:c},
this.userPriority)};a.ScreenAnnot.prototype.getStaticCaptionText=function(){return a.messageHandler.sendWithPromise("ScreenAnnot.getStaticCaptionText",{s:this.id},this.userPriority)};a.ScreenAnnot.prototype.setStaticCaptionText=function(b){d(arguments.length,1,"setStaticCaptionText","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("ScreenAnnot.setStaticCaptionText",{s:this.id,contents:b},this.userPriority)};a.ScreenAnnot.prototype.getRolloverCaptionText=function(){return a.messageHandler.sendWithPromise("ScreenAnnot.getRolloverCaptionText",
{s:this.id},this.userPriority)};a.ScreenAnnot.prototype.setRolloverCaptionText=function(b){d(arguments.length,1,"setRolloverCaptionText","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("ScreenAnnot.setRolloverCaptionText",{s:this.id,contents:b},this.userPriority)};a.ScreenAnnot.prototype.getMouseDownCaptionText=function(){return a.messageHandler.sendWithPromise("ScreenAnnot.getMouseDownCaptionText",{s:this.id},this.userPriority)};a.ScreenAnnot.prototype.setMouseDownCaptionText=
function(b){d(arguments.length,1,"setMouseDownCaptionText","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("ScreenAnnot.setMouseDownCaptionText",{s:this.id,contents:b},this.userPriority)};a.ScreenAnnot.prototype.getStaticIcon=function(){return a.messageHandler.sendWithPromise("ScreenAnnot.getStaticIcon",{s:this.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.ScreenAnnot.prototype.setStaticIcon=function(b){d(arguments.length,1,"setStaticIcon","(PDFNet.Obj)",[[b,"Object",
a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("ScreenAnnot.setStaticIcon",{s:this.id,icon:b.id},this.userPriority)};a.ScreenAnnot.prototype.getRolloverIcon=function(){return a.messageHandler.sendWithPromise("ScreenAnnot.getRolloverIcon",{s:this.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.ScreenAnnot.prototype.setRolloverIcon=function(b){d(arguments.length,1,"setRolloverIcon","(PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("ScreenAnnot.setRolloverIcon",
{s:this.id,icon:b.id},this.userPriority)};a.ScreenAnnot.prototype.getMouseDownIcon=function(){return a.messageHandler.sendWithPromise("ScreenAnnot.getMouseDownIcon",{s:this.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.ScreenAnnot.prototype.setMouseDownIcon=function(b){d(arguments.length,1,"setMouseDownIcon","(PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("ScreenAnnot.setMouseDownIcon",{s:this.id,icon:b.id},this.userPriority)};a.ScreenAnnot.prototype.getScaleType=
function(){return a.messageHandler.sendWithPromise("ScreenAnnot.getScaleType",{s:this.id},this.userPriority)};a.ScreenAnnot.prototype.setScaleType=function(b){d(arguments.length,1,"setScaleType","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("ScreenAnnot.setScaleType",{s:this.id,st:b},this.userPriority)};a.ScreenAnnot.prototype.getIconCaptionRelation=function(){return a.messageHandler.sendWithPromise("ScreenAnnot.getIconCaptionRelation",{s:this.id},this.userPriority)};a.ScreenAnnot.prototype.setIconCaptionRelation=
function(b){d(arguments.length,1,"setIconCaptionRelation","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("ScreenAnnot.setIconCaptionRelation",{s:this.id,icr:b},this.userPriority)};a.ScreenAnnot.prototype.getScaleCondition=function(){return a.messageHandler.sendWithPromise("ScreenAnnot.getScaleCondition",{s:this.id},this.userPriority)};a.ScreenAnnot.prototype.setScaleCondition=function(b){d(arguments.length,1,"setScaleCondition","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("ScreenAnnot.setScaleCondition",
{s:this.id,sc:b},this.userPriority)};a.ScreenAnnot.prototype.getFitFull=function(){return a.messageHandler.sendWithPromise("ScreenAnnot.getFitFull",{s:this.id},this.userPriority)};a.ScreenAnnot.prototype.setFitFull=function(b){d(arguments.length,1,"setFitFull","(boolean)",[[b,"boolean"]]);return a.messageHandler.sendWithPromise("ScreenAnnot.setFitFull",{s:this.id,ff:b},this.userPriority)};a.ScreenAnnot.prototype.getHIconLeftOver=function(){return a.messageHandler.sendWithPromise("ScreenAnnot.getHIconLeftOver",
{s:this.id},this.userPriority)};a.ScreenAnnot.prototype.setHIconLeftOver=function(b){d(arguments.length,1,"setHIconLeftOver","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("ScreenAnnot.setHIconLeftOver",{s:this.id,hl:b},this.userPriority)};a.ScreenAnnot.prototype.getVIconLeftOver=function(){return a.messageHandler.sendWithPromise("ScreenAnnot.getVIconLeftOver",{s:this.id},this.userPriority)};a.ScreenAnnot.prototype.setVIconLeftOver=function(b){d(arguments.length,1,"setVIconLeftOver",
"(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("ScreenAnnot.setVIconLeftOver",{s:this.id,vl:b},this.userPriority)};a.SoundAnnot.createFromObj=function(b){"undefined"===typeof b&&(b=new a.Obj("0"));d(arguments.length,0,"createFromObj","(PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("soundAnnotCreateFromObj",{d:b.id},this.userPriority).then(function(b){return f(a.SoundAnnot,b)})};a.SoundAnnot.createFromAnnot=function(b){d(arguments.length,1,"createFromAnnot",
"(PDFNet.Annot)",[[b,"Object",a.Annot,"Annot"]]);return a.messageHandler.sendWithPromise("soundAnnotCreateFromAnnot",{ann:b.id},this.userPriority).then(function(b){return f(a.SoundAnnot,b)})};a.SoundAnnot.create=function(b,c){d(arguments.length,2,"create","(PDFNet.SDFDoc, PDFNet.Rect)",[[b,"SDFDoc"],[c,"Structure",a.Rect,"Rect"]]);n("create",[[c,1]]);return a.messageHandler.sendWithPromise("soundAnnotCreate",{doc:b.id,pos:c},this.userPriority).then(function(b){return f(a.SoundAnnot,b)})};a.SoundAnnot.createWithData=
function(b,c,e,m,x,g){d(arguments.length,6,"createWithData","(PDFNet.SDFDoc, PDFNet.Rect, PDFNet.Filter, number, number, number)",[[b,"SDFDoc"],[c,"Structure",a.Rect,"Rect"],[e,"Object",a.Filter,"Filter"],[m,"number"],[x,"number"],[g,"number"]]);n("createWithData",[[c,1]]);0!=e.id&&r(e.id);return a.messageHandler.sendWithPromise("soundAnnotCreateWithData",{doc:b.id,pos:c,no_own_stream:e.id,sample_bits:m,sample_freq:x,num_channels:g},this.userPriority).then(function(b){return f(a.SoundAnnot,b)})};
a.SoundAnnot.createAtPoint=function(b,c){d(arguments.length,2,"createAtPoint","(PDFNet.SDFDoc, PDFNet.Point)",[[b,"SDFDoc"],[c,"Structure",a.Point,"Point"]]);n("createAtPoint",[[c,1]]);return a.messageHandler.sendWithPromise("soundAnnotCreateAtPoint",{doc:b.id,pos:c},this.userPriority).then(function(b){return f(a.SoundAnnot,b)})};a.SoundAnnot.prototype.getSoundStream=function(){return a.messageHandler.sendWithPromise("SoundAnnot.getSoundStream",{sound:this.id},this.userPriority).then(function(b){return f(a.Obj,
b)})};a.SoundAnnot.prototype.setSoundStream=function(b){d(arguments.length,1,"setSoundStream","(PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("SoundAnnot.setSoundStream",{sound:this.id,icon:b.id},this.userPriority)};a.SoundAnnot.prototype.getIcon=function(){return a.messageHandler.sendWithPromise("SoundAnnot.getIcon",{sound:this.id},this.userPriority)};a.SoundAnnot.prototype.setIcon=function(b){"undefined"===typeof b&&(b=a.SoundAnnot.Icon.e_Speaker);d(arguments.length,
0,"setIcon","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("SoundAnnot.setIcon",{sound:this.id,type:b},this.userPriority)};a.SoundAnnot.prototype.getIconName=function(){return a.messageHandler.sendWithPromise("SoundAnnot.getIconName",{sound:this.id},this.userPriority)};a.SoundAnnot.prototype.setIconName=function(b){d(arguments.length,1,"setIconName","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("SoundAnnot.setIconName",{sound:this.id,type:b},this.userPriority)};
a.SquareAnnot.createFromObj=function(b){"undefined"===typeof b&&(b=new a.Obj("0"));d(arguments.length,0,"createFromObj","(PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("squareAnnotCreateFromObj",{d:b.id},this.userPriority).then(function(b){return f(a.SquareAnnot,b)})};a.SquareAnnot.createFromAnnot=function(b){d(arguments.length,1,"createFromAnnot","(PDFNet.Annot)",[[b,"Object",a.Annot,"Annot"]]);return a.messageHandler.sendWithPromise("squareAnnotCreateFromAnnot",
{ann:b.id},this.userPriority).then(function(b){return f(a.SquareAnnot,b)})};a.SquareAnnot.create=function(b,c){d(arguments.length,2,"create","(PDFNet.SDFDoc, PDFNet.Rect)",[[b,"SDFDoc"],[c,"Structure",a.Rect,"Rect"]]);n("create",[[c,1]]);return a.messageHandler.sendWithPromise("squareAnnotCreate",{doc:b.id,pos:c},this.userPriority).then(function(b){return f(a.SquareAnnot,b)})};a.SquareAnnot.prototype.getInteriorColor=function(){return a.messageHandler.sendWithPromise("SquareAnnot.getInteriorColor",
{square:this.id},this.userPriority).then(function(b){return k(a.ColorPt,b)})};a.SquareAnnot.prototype.getInteriorColorCompNum=function(){return a.messageHandler.sendWithPromise("SquareAnnot.getInteriorColorCompNum",{square:this.id},this.userPriority)};a.SquareAnnot.prototype.setInteriorColorDefault=function(b){d(arguments.length,1,"setInteriorColorDefault","(PDFNet.ColorPt)",[[b,"Object",a.ColorPt,"ColorPt"]]);return a.messageHandler.sendWithPromise("SquareAnnot.setInteriorColorDefault",{square:this.id,
col:b.id},this.userPriority)};a.SquareAnnot.prototype.setInteriorColor=function(b,c){d(arguments.length,2,"setInteriorColor","(PDFNet.ColorPt, number)",[[b,"Object",a.ColorPt,"ColorPt"],[c,"number"]]);return a.messageHandler.sendWithPromise("SquareAnnot.setInteriorColor",{square:this.id,col:b.id,numcomp:c},this.userPriority)};a.SquareAnnot.prototype.getContentRect=function(){return a.messageHandler.sendWithPromise("SquareAnnot.getContentRect",{square:this.id},this.userPriority).then(function(b){return new a.Rect(b)})};
a.SquareAnnot.prototype.setContentRect=function(b){d(arguments.length,1,"setContentRect","(PDFNet.Rect)",[[b,"Structure",a.Rect,"Rect"]]);n("setContentRect",[[b,0]]);return a.messageHandler.sendWithPromise("SquareAnnot.setContentRect",{square:this.id,cr:b},this.userPriority)};a.SquareAnnot.prototype.getPadding=function(){return a.messageHandler.sendWithPromise("SquareAnnot.getPadding",{square:this.id},this.userPriority).then(function(b){return new a.Rect(b)})};a.SquareAnnot.prototype.setPadding=function(b){d(arguments.length,
1,"setPadding","(PDFNet.Rect)",[[b,"Structure",a.Rect,"Rect"]]);n("setPadding",[[b,0]]);return a.messageHandler.sendWithPromise("SquareAnnot.setPadding",{square:this.id,cr:b},this.userPriority)};a.SquigglyAnnot.createFromObj=function(b){d(arguments.length,1,"createFromObj","(PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("squigglyAnnotCreateFromObj",{d:b.id},this.userPriority).then(function(b){return f(a.SquigglyAnnot,b)})};a.SquigglyAnnot.createFromAnnot=function(b){d(arguments.length,
1,"createFromAnnot","(PDFNet.Annot)",[[b,"Object",a.Annot,"Annot"]]);return a.messageHandler.sendWithPromise("squigglyAnnotCreateFromAnnot",{ann:b.id},this.userPriority).then(function(b){return f(a.SquigglyAnnot,b)})};a.SquigglyAnnot.create=function(b,c){d(arguments.length,2,"create","(PDFNet.SDFDoc, PDFNet.Rect)",[[b,"SDFDoc"],[c,"Structure",a.Rect,"Rect"]]);n("create",[[c,1]]);return a.messageHandler.sendWithPromise("squigglyAnnotCreate",{doc:b.id,pos:c},this.userPriority).then(function(b){return f(a.SquigglyAnnot,
b)})};a.StrikeOutAnnot.createFromObj=function(b){d(arguments.length,1,"createFromObj","(PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("strikeOutAnnotCreateFromObj",{d:b.id},this.userPriority).then(function(b){return f(a.StrikeOutAnnot,b)})};a.StrikeOutAnnot.createFromAnnot=function(b){d(arguments.length,1,"createFromAnnot","(PDFNet.Annot)",[[b,"Object",a.Annot,"Annot"]]);return a.messageHandler.sendWithPromise("strikeOutAnnotCreateFromAnnot",{ann:b.id},this.userPriority).then(function(b){return f(a.StrikeOutAnnot,
b)})};a.StrikeOutAnnot.create=function(b,c){d(arguments.length,2,"create","(PDFNet.SDFDoc, PDFNet.Rect)",[[b,"SDFDoc"],[c,"Structure",a.Rect,"Rect"]]);n("create",[[c,1]]);return a.messageHandler.sendWithPromise("strikeOutAnnotCreate",{doc:b.id,pos:c},this.userPriority).then(function(b){return f(a.StrikeOutAnnot,b)})};a.TextAnnot.createFromObj=function(b){"undefined"===typeof b&&(b=new a.Obj("0"));d(arguments.length,0,"createFromObj","(PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("textAnnotCreateFromObj",
{d:b.id},this.userPriority).then(function(b){return f(a.TextAnnot,b)})};a.TextAnnot.createFromAnnot=function(b){d(arguments.length,1,"createFromAnnot","(PDFNet.Annot)",[[b,"Object",a.Annot,"Annot"]]);return a.messageHandler.sendWithPromise("textAnnotCreateFromAnnot",{ann:b.id},this.userPriority).then(function(b){return f(a.TextAnnot,b)})};a.TextAnnot.createAtPoint=function(b,c){d(arguments.length,2,"createAtPoint","(PDFNet.SDFDoc, PDFNet.Point)",[[b,"SDFDoc"],[c,"Structure",a.Point,"Point"]]);n("createAtPoint",
[[c,1]]);return a.messageHandler.sendWithPromise("textAnnotCreateAtPoint",{doc:b.id,pos:c},this.userPriority).then(function(b){return f(a.TextAnnot,b)})};a.TextAnnot.create=function(b,c){d(arguments.length,2,"create","(PDFNet.SDFDoc, PDFNet.Rect)",[[b,"SDFDoc"],[c,"Structure",a.Rect,"Rect"]]);n("create",[[c,1]]);return a.messageHandler.sendWithPromise("textAnnotCreate",{doc:b.id,pos:c},this.userPriority).then(function(b){return f(a.TextAnnot,b)})};a.TextAnnot.prototype.isOpen=function(){return a.messageHandler.sendWithPromise("TextAnnot.isOpen",
{text:this.id},this.userPriority)};a.TextAnnot.prototype.setOpen=function(b){d(arguments.length,1,"setOpen","(boolean)",[[b,"boolean"]]);return a.messageHandler.sendWithPromise("TextAnnot.setOpen",{text:this.id,isopen:b},this.userPriority)};a.TextAnnot.prototype.getIcon=function(){return a.messageHandler.sendWithPromise("TextAnnot.getIcon",{text:this.id},this.userPriority)};a.TextAnnot.prototype.setIcon=function(b){"undefined"===typeof b&&(b=a.TextAnnot.Icon.e_Note);d(arguments.length,0,"setIcon",
"(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("TextAnnot.setIcon",{text:this.id,icon:b},this.userPriority)};a.TextAnnot.prototype.setIconDefault=function(){return a.messageHandler.sendWithPromise("TextAnnot.setIconDefault",{text:this.id},this.userPriority)};a.TextAnnot.prototype.getIconName=function(){return a.messageHandler.sendWithPromise("TextAnnot.getIconName",{text:this.id},this.userPriority)};a.TextAnnot.prototype.setIconName=function(b){d(arguments.length,1,"setIconName",
"(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("TextAnnot.setIconName",{text:this.id,icon:b},this.userPriority)};a.TextAnnot.prototype.getState=function(){return a.messageHandler.sendWithPromise("TextAnnot.getState",{text:this.id},this.userPriority)};a.TextAnnot.prototype.setState=function(b){"undefined"===typeof b&&(b="");d(arguments.length,0,"setState","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("TextAnnot.setState",{text:this.id,state:b},this.userPriority)};
a.TextAnnot.prototype.getStateModel=function(){return a.messageHandler.sendWithPromise("TextAnnot.getStateModel",{text:this.id},this.userPriority)};a.TextAnnot.prototype.setStateModel=function(b){d(arguments.length,1,"setStateModel","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("TextAnnot.setStateModel",{text:this.id,sm:b},this.userPriority)};a.UnderlineAnnot.createFromObj=function(b){d(arguments.length,1,"createFromObj","(PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("underlineAnnotCreateFromObj",
{d:b.id},this.userPriority).then(function(b){return f(a.UnderlineAnnot,b)})};a.UnderlineAnnot.createFromAnnot=function(b){d(arguments.length,1,"createFromAnnot","(PDFNet.Annot)",[[b,"Object",a.Annot,"Annot"]]);return a.messageHandler.sendWithPromise("underlineAnnotCreateFromAnnot",{ann:b.id},this.userPriority).then(function(b){return f(a.UnderlineAnnot,b)})};a.UnderlineAnnot.create=function(b,c){d(arguments.length,2,"create","(PDFNet.SDFDoc, PDFNet.Rect)",[[b,"SDFDoc"],[c,"Structure",a.Rect,"Rect"]]);
n("create",[[c,1]]);return a.messageHandler.sendWithPromise("underlineAnnotCreate",{doc:b.id,pos:c},this.userPriority).then(function(b){return f(a.UnderlineAnnot,b)})};a.WatermarkAnnot.createFromObj=function(b){"undefined"===typeof b&&(b=new a.Obj("0"));d(arguments.length,0,"createFromObj","(PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("watermarkAnnotCreateFromObj",{d:b.id},this.userPriority).then(function(b){return f(a.WatermarkAnnot,b)})};a.WatermarkAnnot.createFromAnnot=
function(b){d(arguments.length,1,"createFromAnnot","(PDFNet.Annot)",[[b,"Object",a.Annot,"Annot"]]);return a.messageHandler.sendWithPromise("watermarkAnnotCreateFromAnnot",{ann:b.id},this.userPriority).then(function(b){return f(a.WatermarkAnnot,b)})};a.WatermarkAnnot.create=function(b,c){d(arguments.length,2,"create","(PDFNet.SDFDoc, PDFNet.Rect)",[[b,"SDFDoc"],[c,"Structure",a.Rect,"Rect"]]);n("create",[[c,1]]);return a.messageHandler.sendWithPromise("watermarkAnnotCreate",{doc:b.id,pos:c},this.userPriority).then(function(b){return f(a.WatermarkAnnot,
b)})};a.TextMarkupAnnot.createFromObj=function(b){d(arguments.length,1,"createFromObj","(PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("textMarkupAnnotCreateFromObj",{d:b.id},this.userPriority).then(function(b){return f(a.TextMarkupAnnot,b)})};a.TextMarkupAnnot.createFromAnnot=function(b){d(arguments.length,1,"createFromAnnot","(PDFNet.Annot)",[[b,"Object",a.Annot,"Annot"]]);return a.messageHandler.sendWithPromise("textMarkupAnnotCreateFromAnnot",{ann:b.id},this.userPriority).then(function(b){return f(a.TextMarkupAnnot,
b)})};a.TextMarkupAnnot.prototype.getQuadPointCount=function(){return a.messageHandler.sendWithPromise("TextMarkupAnnot.getQuadPointCount",{textmarkup:this.id},this.userPriority)};a.TextMarkupAnnot.prototype.getQuadPoint=function(b){d(arguments.length,1,"getQuadPoint","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("TextMarkupAnnot.getQuadPoint",{textmarkup:this.id,idx:b},this.userPriority)};a.TextMarkupAnnot.prototype.setQuadPoint=function(b,c){d(arguments.length,2,"setQuadPoint",
"(number, PDFNet.QuadPoint)",[[b,"number"],[c,"Structure",a.QuadPoint,"QuadPoint"]]);n("setQuadPoint",[[c,1]]);return a.messageHandler.sendWithPromise("TextMarkupAnnot.setQuadPoint",{textmarkup:this.id,idx:b,qp:c},this.userPriority)};a.WidgetAnnot.create=function(b,c,e){d(arguments.length,3,"create","(PDFNet.SDFDoc, PDFNet.Rect, PDFNet.Field)",[[b,"SDFDoc"],[c,"Structure",a.Rect,"Rect"],[e,"Structure",a.Field,"Field"]]);n("create",[[c,1],[e,2]]);e.yieldFunction="WidgetAnnot.create";return a.messageHandler.sendWithPromise("widgetAnnotCreate",
{doc:b.id,pos:c,field:e},this.userPriority).then(function(b){e.yieldFunction=void 0;b.result=f(a.WidgetAnnot,b.result);p(b.field,e);return b.result})};a.WidgetAnnot.createFromObj=function(b){"undefined"===typeof b&&(b=new a.Obj("0"));d(arguments.length,0,"createFromObj","(PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("widgetAnnotCreateFromObj",{d:b.id},this.userPriority).then(function(b){return f(a.WidgetAnnot,b)})};a.WidgetAnnot.createFromAnnot=function(b){d(arguments.length,
1,"createFromAnnot","(PDFNet.Annot)",[[b,"Object",a.Annot,"Annot"]]);return a.messageHandler.sendWithPromise("widgetAnnotCreateFromAnnot",{ann:b.id},this.userPriority).then(function(b){return f(a.WidgetAnnot,b)})};a.WidgetAnnot.prototype.getField=function(){return a.messageHandler.sendWithPromise("WidgetAnnot.getField",{widget:this.id},this.userPriority).then(function(b){return new a.Field(b)})};a.WidgetAnnot.prototype.getHighlightingMode=function(){return a.messageHandler.sendWithPromise("WidgetAnnot.getHighlightingMode",
{widget:this.id},this.userPriority)};a.WidgetAnnot.prototype.setHighlightingMode=function(b){"undefined"===typeof b&&(b=a.WidgetAnnot.HighlightingMode.e_invert);d(arguments.length,0,"setHighlightingMode","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("WidgetAnnot.setHighlightingMode",{widget:this.id,value:b},this.userPriority)};a.WidgetAnnot.prototype.getAction=function(){return a.messageHandler.sendWithPromise("WidgetAnnot.getAction",{widget:this.id},this.userPriority).then(function(b){return f(a.Action,
b)})};a.WidgetAnnot.prototype.setAction=function(b){d(arguments.length,1,"setAction","(PDFNet.Action)",[[b,"Object",a.Action,"Action"]]);return a.messageHandler.sendWithPromise("WidgetAnnot.setAction",{widget:this.id,action:b.id},this.userPriority)};a.WidgetAnnot.prototype.getBorderColor=function(){return a.messageHandler.sendWithPromise("WidgetAnnot.getBorderColor",{widget:this.id},this.userPriority).then(function(b){return k(a.ColorPt,b)})};a.WidgetAnnot.prototype.setBorderColor=function(b,c){d(arguments.length,
2,"setBorderColor","(PDFNet.ColorPt, number)",[[b,"Object",a.ColorPt,"ColorPt"],[c,"number"]]);return a.messageHandler.sendWithPromise("WidgetAnnot.setBorderColor",{widget:this.id,col:b.id,compnum:c},this.userPriority)};a.WidgetAnnot.prototype.getBorderColorCompNum=function(){return a.messageHandler.sendWithPromise("WidgetAnnot.getBorderColorCompNum",{widget:this.id},this.userPriority)};a.WidgetAnnot.prototype.getBackgroundColorCompNum=function(){return a.messageHandler.sendWithPromise("WidgetAnnot.getBackgroundColorCompNum",
{widget:this.id},this.userPriority)};a.WidgetAnnot.prototype.getBackgroundColor=function(){return a.messageHandler.sendWithPromise("WidgetAnnot.getBackgroundColor",{widget:this.id},this.userPriority).then(function(b){return k(a.ColorPt,b)})};a.WidgetAnnot.prototype.setBackgroundColor=function(b,c){d(arguments.length,2,"setBackgroundColor","(PDFNet.ColorPt, number)",[[b,"Object",a.ColorPt,"ColorPt"],[c,"number"]]);return a.messageHandler.sendWithPromise("WidgetAnnot.setBackgroundColor",{widget:this.id,
col:b.id,compnum:c},this.userPriority)};a.WidgetAnnot.prototype.getStaticCaptionText=function(){return a.messageHandler.sendWithPromise("WidgetAnnot.getStaticCaptionText",{widget:this.id},this.userPriority)};a.WidgetAnnot.prototype.setStaticCaptionText=function(b){d(arguments.length,1,"setStaticCaptionText","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("WidgetAnnot.setStaticCaptionText",{widget:this.id,contents:b},this.userPriority)};a.WidgetAnnot.prototype.getRolloverCaptionText=
function(){return a.messageHandler.sendWithPromise("WidgetAnnot.getRolloverCaptionText",{widget:this.id},this.userPriority)};a.WidgetAnnot.prototype.setRolloverCaptionText=function(b){d(arguments.length,1,"setRolloverCaptionText","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("WidgetAnnot.setRolloverCaptionText",{widget:this.id,contents:b},this.userPriority)};a.WidgetAnnot.prototype.getMouseDownCaptionText=function(){return a.messageHandler.sendWithPromise("WidgetAnnot.getMouseDownCaptionText",
{widget:this.id},this.userPriority)};a.WidgetAnnot.prototype.setMouseDownCaptionText=function(b){d(arguments.length,1,"setMouseDownCaptionText","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("WidgetAnnot.setMouseDownCaptionText",{widget:this.id,contents:b},this.userPriority)};a.WidgetAnnot.prototype.getStaticIcon=function(){return a.messageHandler.sendWithPromise("WidgetAnnot.getStaticIcon",{widget:this.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.WidgetAnnot.prototype.setStaticIcon=
function(b){d(arguments.length,1,"setStaticIcon","(PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("WidgetAnnot.setStaticIcon",{widget:this.id,icon:b.id},this.userPriority)};a.WidgetAnnot.prototype.getRolloverIcon=function(){return a.messageHandler.sendWithPromise("WidgetAnnot.getRolloverIcon",{widget:this.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.WidgetAnnot.prototype.setRolloverIcon=function(b){d(arguments.length,1,"setRolloverIcon","(PDFNet.Obj)",
[[b,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("WidgetAnnot.setRolloverIcon",{widget:this.id,icon:b.id},this.userPriority)};a.WidgetAnnot.prototype.getMouseDownIcon=function(){return a.messageHandler.sendWithPromise("WidgetAnnot.getMouseDownIcon",{widget:this.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.WidgetAnnot.prototype.setMouseDownIcon=function(b){d(arguments.length,1,"setMouseDownIcon","(PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("WidgetAnnot.setMouseDownIcon",
{widget:this.id,icon:b.id},this.userPriority)};a.WidgetAnnot.prototype.getScaleType=function(){return a.messageHandler.sendWithPromise("WidgetAnnot.getScaleType",{widget:this.id},this.userPriority)};a.WidgetAnnot.prototype.setScaleType=function(b){d(arguments.length,1,"setScaleType","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("WidgetAnnot.setScaleType",{widget:this.id,st:b},this.userPriority)};a.WidgetAnnot.prototype.getIconCaptionRelation=function(){return a.messageHandler.sendWithPromise("WidgetAnnot.getIconCaptionRelation",
{widget:this.id},this.userPriority)};a.WidgetAnnot.prototype.setIconCaptionRelation=function(b){d(arguments.length,1,"setIconCaptionRelation","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("WidgetAnnot.setIconCaptionRelation",{widget:this.id,icr:b},this.userPriority)};a.WidgetAnnot.prototype.getScaleCondition=function(){return a.messageHandler.sendWithPromise("WidgetAnnot.getScaleCondition",{widget:this.id},this.userPriority)};a.WidgetAnnot.prototype.setScaleCondition=function(b){d(arguments.length,
1,"setScaleCondition","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("WidgetAnnot.setScaleCondition",{widget:this.id,sd:b},this.userPriority)};a.WidgetAnnot.prototype.getFitFull=function(){return a.messageHandler.sendWithPromise("WidgetAnnot.getFitFull",{widget:this.id},this.userPriority)};a.WidgetAnnot.prototype.setFitFull=function(b){d(arguments.length,1,"setFitFull","(boolean)",[[b,"boolean"]]);return a.messageHandler.sendWithPromise("WidgetAnnot.setFitFull",{widget:this.id,
ff:b},this.userPriority)};a.WidgetAnnot.prototype.getHIconLeftOver=function(){return a.messageHandler.sendWithPromise("WidgetAnnot.getHIconLeftOver",{widget:this.id},this.userPriority)};a.WidgetAnnot.prototype.setHIconLeftOver=function(b){d(arguments.length,1,"setHIconLeftOver","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("WidgetAnnot.setHIconLeftOver",{widget:this.id,hl:b},this.userPriority)};a.WidgetAnnot.prototype.getVIconLeftOver=function(){return a.messageHandler.sendWithPromise("WidgetAnnot.getVIconLeftOver",
{widget:this.id},this.userPriority)};a.WidgetAnnot.prototype.setVIconLeftOver=function(b){d(arguments.length,1,"setVIconLeftOver","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("WidgetAnnot.setVIconLeftOver",{widget:this.id,vl:b},this.userPriority)};a.WidgetAnnot.prototype.setFontSize=function(b){d(arguments.length,1,"setFontSize","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("WidgetAnnot.setFontSize",{widget:this.id,font_size:b},this.userPriority)};a.WidgetAnnot.prototype.setTextColor=
function(b,c){d(arguments.length,2,"setTextColor","(PDFNet.ColorPt, number)",[[b,"Object",a.ColorPt,"ColorPt"],[c,"number"]]);return a.messageHandler.sendWithPromise("WidgetAnnot.setTextColor",{widget:this.id,color:b.id,col_comp:c},this.userPriority)};a.WidgetAnnot.prototype.setFont=function(b){d(arguments.length,1,"setFont","(PDFNet.Font)",[[b,"Object",a.Font,"Font"]]);return a.messageHandler.sendWithPromise("WidgetAnnot.setFont",{widget:this.id,font:b.id},this.userPriority)};a.WidgetAnnot.prototype.getFontSize=
function(){return a.messageHandler.sendWithPromise("WidgetAnnot.getFontSize",{widget:this.id},this.userPriority)};a.WidgetAnnot.prototype.getTextColor=function(){return a.messageHandler.sendWithPromise("WidgetAnnot.getTextColor",{widget:this.id},this.userPriority).then(function(b){b.col=k(a.ColorPt,b.col);return b})};a.WidgetAnnot.prototype.getFont=function(){return a.messageHandler.sendWithPromise("WidgetAnnot.getFont",{widget:this.id},this.userPriority).then(function(b){return k(a.Font,b)})};a.SignatureWidget.create=
function(b,c,e){"undefined"===typeof e&&(e="");d(arguments.length,2,"create","(PDFNet.PDFDoc, PDFNet.Rect, string)",[[b,"PDFDoc"],[c,"Structure",a.Rect,"Rect"],[e,"string"]]);n("create",[[c,1]]);return a.messageHandler.sendWithPromise("signatureWidgetCreate",{doc:b.id,pos:c,field_name:e},this.userPriority).then(function(b){return f(a.SignatureWidget,b)})};a.SignatureWidget.createWithField=function(b,c,e){d(arguments.length,3,"createWithField","(PDFNet.PDFDoc, PDFNet.Rect, PDFNet.Field)",[[b,"PDFDoc"],
[c,"Structure",a.Rect,"Rect"],[e,"Structure",a.Field,"Field"]]);n("createWithField",[[c,1],[e,2]]);return a.messageHandler.sendWithPromise("signatureWidgetCreateWithField",{doc:b.id,pos:c,field:e},this.userPriority).then(function(b){return f(a.SignatureWidget,b)})};a.SignatureWidget.createWithDigitalSignatureField=function(b,c,e){d(arguments.length,3,"createWithDigitalSignatureField","(PDFNet.PDFDoc, PDFNet.Rect, PDFNet.DigitalSignatureField)",[[b,"PDFDoc"],[c,"Structure",a.Rect,"Rect"],[e,"Structure",
a.DigitalSignatureField,"DigitalSignatureField"]]);n("createWithDigitalSignatureField",[[c,1],[e,2]]);return a.messageHandler.sendWithPromise("signatureWidgetCreateWithDigitalSignatureField",{doc:b.id,pos:c,field:e},this.userPriority).then(function(b){return f(a.SignatureWidget,b)})};a.SignatureWidget.createFromObj=function(b){"undefined"===typeof b&&(b=new a.Obj("0"));d(arguments.length,0,"createFromObj","(PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("signatureWidgetCreateFromObj",
{d:b.id},this.userPriority).then(function(b){return f(a.SignatureWidget,b)})};a.SignatureWidget.createFromAnnot=function(b){d(arguments.length,1,"createFromAnnot","(PDFNet.Annot)",[[b,"Object",a.Annot,"Annot"]]);return a.messageHandler.sendWithPromise("signatureWidgetCreateFromAnnot",{annot:b.id},this.userPriority).then(function(b){return f(a.SignatureWidget,b)})};a.SignatureWidget.prototype.createSignatureAppearance=function(b){d(arguments.length,1,"createSignatureAppearance","(PDFNet.Image)",[[b,
"Object",a.Image,"Image"]]);return a.messageHandler.sendWithPromise("SignatureWidget.createSignatureAppearance",{self:this.id,img:b.id},this.userPriority)};a.SignatureWidget.prototype.getDigitalSignatureField=function(){return a.messageHandler.sendWithPromise("SignatureWidget.getDigitalSignatureField",{self:this.id},this.userPriority).then(function(b){return new a.DigitalSignatureField(b)})};a.ComboBoxWidget.create=function(b,c,e){"undefined"===typeof e&&(e="");d(arguments.length,2,"create","(PDFNet.PDFDoc, PDFNet.Rect, string)",
[[b,"PDFDoc"],[c,"Structure",a.Rect,"Rect"],[e,"string"]]);n("create",[[c,1]]);return a.messageHandler.sendWithPromise("comboBoxWidgetCreate",{doc:b.id,pos:c,field_name:e},this.userPriority).then(function(b){return f(a.ComboBoxWidget,b)})};a.ComboBoxWidget.createWithField=function(b,c,e){d(arguments.length,3,"createWithField","(PDFNet.PDFDoc, PDFNet.Rect, PDFNet.Field)",[[b,"PDFDoc"],[c,"Structure",a.Rect,"Rect"],[e,"Structure",a.Field,"Field"]]);n("createWithField",[[c,1],[e,2]]);return a.messageHandler.sendWithPromise("comboBoxWidgetCreateWithField",
{doc:b.id,pos:c,field:e},this.userPriority).then(function(b){return f(a.ComboBoxWidget,b)})};a.ComboBoxWidget.createFromObj=function(b){"undefined"===typeof b&&(b=new a.Obj("0"));d(arguments.length,0,"createFromObj","(PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("comboBoxWidgetCreateFromObj",{d:b.id},this.userPriority).then(function(b){return f(a.ComboBoxWidget,b)})};a.ComboBoxWidget.createFromAnnot=function(b){d(arguments.length,1,"createFromAnnot","(PDFNet.Annot)",
[[b,"Object",a.Annot,"Annot"]]);return a.messageHandler.sendWithPromise("comboBoxWidgetCreateFromAnnot",{annot:b.id},this.userPriority).then(function(b){return f(a.ComboBoxWidget,b)})};a.ComboBoxWidget.prototype.addOption=function(b){d(arguments.length,1,"addOption","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("ComboBoxWidget.addOption",{combobox:this.id,value:b},this.userPriority)};a.ComboBoxWidget.prototype.addOptions=function(b){d(arguments.length,1,"addOptions","(Array<string>)",
[[b,"Array"]]);return a.messageHandler.sendWithPromise("ComboBoxWidget.addOptions",{combobox:this.id,opts_list:b},this.userPriority)};a.ComboBoxWidget.prototype.setSelectedOption=function(b){d(arguments.length,1,"setSelectedOption","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("ComboBoxWidget.setSelectedOption",{combobox:this.id,value:b},this.userPriority)};a.ComboBoxWidget.prototype.getSelectedOption=function(){return a.messageHandler.sendWithPromise("ComboBoxWidget.getSelectedOption",
{combobox:this.id},this.userPriority)};a.ComboBoxWidget.prototype.replaceOptions=function(b){d(arguments.length,1,"replaceOptions","(Array<string>)",[[b,"Array"]]);return a.messageHandler.sendWithPromise("ComboBoxWidget.replaceOptions",{combobox:this.id,new_opts_list:b},this.userPriority)};a.ComboBoxWidget.prototype.removeOption=function(b){d(arguments.length,1,"removeOption","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("ComboBoxWidget.removeOption",{combobox:this.id,value:b},
this.userPriority)};a.ListBoxWidget.create=function(b,c,e){"undefined"===typeof e&&(e="");d(arguments.length,2,"create","(PDFNet.PDFDoc, PDFNet.Rect, string)",[[b,"PDFDoc"],[c,"Structure",a.Rect,"Rect"],[e,"string"]]);n("create",[[c,1]]);return a.messageHandler.sendWithPromise("listBoxWidgetCreate",{doc:b.id,pos:c,field_name:e},this.userPriority).then(function(b){return f(a.ListBoxWidget,b)})};a.ListBoxWidget.createWithField=function(b,c,e){d(arguments.length,3,"createWithField","(PDFNet.PDFDoc, PDFNet.Rect, PDFNet.Field)",
[[b,"PDFDoc"],[c,"Structure",a.Rect,"Rect"],[e,"Structure",a.Field,"Field"]]);n("createWithField",[[c,1],[e,2]]);return a.messageHandler.sendWithPromise("listBoxWidgetCreateWithField",{doc:b.id,pos:c,field:e},this.userPriority).then(function(b){return f(a.ListBoxWidget,b)})};a.ListBoxWidget.createFromObj=function(b){"undefined"===typeof b&&(b=new a.Obj("0"));d(arguments.length,0,"createFromObj","(PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("listBoxWidgetCreateFromObj",
{d:b.id},this.userPriority).then(function(b){return f(a.ListBoxWidget,b)})};a.ListBoxWidget.createFromAnnot=function(b){d(arguments.length,1,"createFromAnnot","(PDFNet.Annot)",[[b,"Object",a.Annot,"Annot"]]);return a.messageHandler.sendWithPromise("listBoxWidgetCreateFromAnnot",{annot:b.id},this.userPriority).then(function(b){return f(a.ListBoxWidget,b)})};a.ListBoxWidget.prototype.addOption=function(b){d(arguments.length,1,"addOption","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("ListBoxWidget.addOption",
{listbox:this.id,value:b},this.userPriority)};a.ListBoxWidget.prototype.addOptions=function(b){d(arguments.length,1,"addOptions","(Array<string>)",[[b,"Array"]]);return a.messageHandler.sendWithPromise("ListBoxWidget.addOptions",{listbox:this.id,opts_list:b},this.userPriority)};a.ListBoxWidget.prototype.setSelectedOptions=function(b){d(arguments.length,1,"setSelectedOptions","(Array<string>)",[[b,"Array"]]);return a.messageHandler.sendWithPromise("ListBoxWidget.setSelectedOptions",{listbox:this.id,
selected_opts_list:b},this.userPriority)};a.ListBoxWidget.prototype.replaceOptions=function(b){d(arguments.length,1,"replaceOptions","(Array<string>)",[[b,"Array"]]);return a.messageHandler.sendWithPromise("ListBoxWidget.replaceOptions",{listbox:this.id,new_opts_list:b},this.userPriority)};a.ListBoxWidget.prototype.removeOption=function(b){d(arguments.length,1,"removeOption","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("ListBoxWidget.removeOption",{listbox:this.id,value:b},this.userPriority)};
a.TextWidget.create=function(b,c,e){"undefined"===typeof e&&(e="");d(arguments.length,2,"create","(PDFNet.PDFDoc, PDFNet.Rect, string)",[[b,"PDFDoc"],[c,"Structure",a.Rect,"Rect"],[e,"string"]]);n("create",[[c,1]]);return a.messageHandler.sendWithPromise("textWidgetCreate",{doc:b.id,pos:c,field_name:e},this.userPriority).then(function(b){return f(a.TextWidget,b)})};a.TextWidget.createWithField=function(b,c,e){d(arguments.length,3,"createWithField","(PDFNet.PDFDoc, PDFNet.Rect, PDFNet.Field)",[[b,
"PDFDoc"],[c,"Structure",a.Rect,"Rect"],[e,"Structure",a.Field,"Field"]]);n("createWithField",[[c,1],[e,2]]);return a.messageHandler.sendWithPromise("textWidgetCreateWithField",{doc:b.id,pos:c,field:e},this.userPriority).then(function(b){return f(a.TextWidget,b)})};a.TextWidget.createFromObj=function(b){"undefined"===typeof b&&(b=new a.Obj("0"));d(arguments.length,0,"createFromObj","(PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("textWidgetCreateFromObj",{d:b.id},
this.userPriority).then(function(b){return f(a.TextWidget,b)})};a.TextWidget.createFromAnnot=function(b){d(arguments.length,1,"createFromAnnot","(PDFNet.Annot)",[[b,"Object",a.Annot,"Annot"]]);return a.messageHandler.sendWithPromise("textWidgetCreateFromAnnot",{annot:b.id},this.userPriority).then(function(b){return f(a.TextWidget,b)})};a.TextWidget.prototype.setText=function(b){d(arguments.length,1,"setText","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("TextWidget.setText",{widget:this.id,
text:b},this.userPriority)};a.TextWidget.prototype.getText=function(){return a.messageHandler.sendWithPromise("TextWidget.getText",{widget:this.id},this.userPriority)};a.CheckBoxWidget.create=function(b,c,e){"undefined"===typeof e&&(e="");d(arguments.length,2,"create","(PDFNet.PDFDoc, PDFNet.Rect, string)",[[b,"PDFDoc"],[c,"Structure",a.Rect,"Rect"],[e,"string"]]);n("create",[[c,1]]);return a.messageHandler.sendWithPromise("checkBoxWidgetCreate",{doc:b.id,pos:c,field_name:e},this.userPriority).then(function(b){return f(a.CheckBoxWidget,
b)})};a.CheckBoxWidget.createWithField=function(b,c,e){d(arguments.length,3,"createWithField","(PDFNet.PDFDoc, PDFNet.Rect, PDFNet.Field)",[[b,"PDFDoc"],[c,"Structure",a.Rect,"Rect"],[e,"Structure",a.Field,"Field"]]);n("createWithField",[[c,1],[e,2]]);return a.messageHandler.sendWithPromise("checkBoxWidgetCreateWithField",{doc:b.id,pos:c,field:e},this.userPriority).then(function(b){return f(a.CheckBoxWidget,b)})};a.CheckBoxWidget.createFromObj=function(b){"undefined"===typeof b&&(b=new a.Obj("0"));
d(arguments.length,0,"createFromObj","(PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("checkBoxWidgetCreateFromObj",{d:b.id},this.userPriority).then(function(b){return f(a.CheckBoxWidget,b)})};a.CheckBoxWidget.createFromAnnot=function(b){d(arguments.length,1,"createFromAnnot","(PDFNet.Annot)",[[b,"Object",a.Annot,"Annot"]]);return a.messageHandler.sendWithPromise("checkBoxWidgetCreateFromAnnot",{annot:b.id},this.userPriority).then(function(b){return f(a.CheckBoxWidget,
b)})};a.CheckBoxWidget.prototype.isChecked=function(){return a.messageHandler.sendWithPromise("CheckBoxWidget.isChecked",{button:this.id},this.userPriority)};a.CheckBoxWidget.prototype.setChecked=function(b){d(arguments.length,1,"setChecked","(boolean)",[[b,"boolean"]]);return a.messageHandler.sendWithPromise("CheckBoxWidget.setChecked",{button:this.id,checked:b},this.userPriority)};a.RadioButtonWidget.createFromObj=function(b){"undefined"===typeof b&&(b=new a.Obj("0"));d(arguments.length,0,"createFromObj",
"(PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("radioButtonWidgetCreateFromObj",{d:b.id},this.userPriority).then(function(b){return f(a.RadioButtonWidget,b)})};a.RadioButtonWidget.createFromAnnot=function(b){d(arguments.length,1,"createFromAnnot","(PDFNet.Annot)",[[b,"Object",a.Annot,"Annot"]]);return a.messageHandler.sendWithPromise("radioButtonWidgetCreateFromAnnot",{annot:b.id},this.userPriority).then(function(b){return f(a.RadioButtonWidget,b)})};a.RadioButtonWidget.prototype.isEnabled=
function(){return a.messageHandler.sendWithPromise("RadioButtonWidget.isEnabled",{button:this.id},this.userPriority)};a.RadioButtonWidget.prototype.enableButton=function(){return a.messageHandler.sendWithPromise("RadioButtonWidget.enableButton",{button:this.id},this.userPriority)};a.RadioButtonWidget.prototype.getGroup=function(){return a.messageHandler.sendWithPromise("RadioButtonWidget.getGroup",{button:this.id},this.userPriority).then(function(b){return k(a.RadioButtonGroup,b)})};a.PushButtonWidget.create=
function(b,c,e){"undefined"===typeof e&&(e="");d(arguments.length,2,"create","(PDFNet.PDFDoc, PDFNet.Rect, string)",[[b,"PDFDoc"],[c,"Structure",a.Rect,"Rect"],[e,"string"]]);n("create",[[c,1]]);return a.messageHandler.sendWithPromise("pushButtonWidgetCreate",{doc:b.id,pos:c,field_name:e},this.userPriority).then(function(b){return f(a.PushButtonWidget,b)})};a.PushButtonWidget.createWithField=function(b,c,e){d(arguments.length,3,"createWithField","(PDFNet.PDFDoc, PDFNet.Rect, PDFNet.Field)",[[b,"PDFDoc"],
[c,"Structure",a.Rect,"Rect"],[e,"Structure",a.Field,"Field"]]);n("createWithField",[[c,1],[e,2]]);return a.messageHandler.sendWithPromise("pushButtonWidgetCreateWithField",{doc:b.id,pos:c,field:e},this.userPriority).then(function(b){return f(a.PushButtonWidget,b)})};a.PushButtonWidget.createFromObj=function(b){"undefined"===typeof b&&(b=new a.Obj("0"));d(arguments.length,0,"createFromObj","(PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("pushButtonWidgetCreateFromObj",
{obj:b.id},this.userPriority).then(function(b){return f(a.PushButtonWidget,b)})};a.PushButtonWidget.createFromAnnot=function(b){d(arguments.length,1,"createFromAnnot","(PDFNet.Annot)",[[b,"Object",a.Annot,"Annot"]]);return a.messageHandler.sendWithPromise("pushButtonWidgetCreateFromAnnot",{annot:b.id},this.userPriority).then(function(b){return f(a.PushButtonWidget,b)})};a.Bookmark.create=function(b,c){d(arguments.length,2,"create","(PDFNet.PDFDoc, string)",[[b,"PDFDoc"],[c,"string"]]);return a.messageHandler.sendWithPromise("bookmarkCreate",
{in_doc:b.id,in_title:c},this.userPriority).then(function(b){return f(a.Bookmark,b)})};a.Bookmark.createFromObj=function(b){d(arguments.length,1,"createFromObj","(PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("bookmarkCreateFromObj",{in_bookmark_dict:b.id},this.userPriority).then(function(b){return f(a.Bookmark,b)})};a.Bookmark.prototype.copy=function(){return a.messageHandler.sendWithPromise("Bookmark.copy",{in_bookmark:this.id},this.userPriority).then(function(b){return f(a.Bookmark,
b)})};a.Bookmark.prototype.compare=function(b){d(arguments.length,1,"compare","(PDFNet.Bookmark)",[[b,"Object",a.Bookmark,"Bookmark"]]);return a.messageHandler.sendWithPromise("Bookmark.compare",{bm:this.id,in_bookmark:b.id},this.userPriority)};a.Bookmark.prototype.isValid=function(){return a.messageHandler.sendWithPromise("Bookmark.isValid",{bm:this.id},this.userPriority)};a.Bookmark.prototype.hasChildren=function(){return a.messageHandler.sendWithPromise("Bookmark.hasChildren",{bm:this.id},this.userPriority)};
a.Bookmark.prototype.getNext=function(){return a.messageHandler.sendWithPromise("Bookmark.getNext",{bm:this.id},this.userPriority).then(function(b){return f(a.Bookmark,b)})};a.Bookmark.prototype.getPrev=function(){return a.messageHandler.sendWithPromise("Bookmark.getPrev",{bm:this.id},this.userPriority).then(function(b){return f(a.Bookmark,b)})};a.Bookmark.prototype.getFirstChild=function(){return a.messageHandler.sendWithPromise("Bookmark.getFirstChild",{bm:this.id},this.userPriority).then(function(b){return f(a.Bookmark,
b)})};a.Bookmark.prototype.getLastChild=function(){return a.messageHandler.sendWithPromise("Bookmark.getLastChild",{bm:this.id},this.userPriority).then(function(b){return f(a.Bookmark,b)})};a.Bookmark.prototype.getParent=function(){return a.messageHandler.sendWithPromise("Bookmark.getParent",{bm:this.id},this.userPriority).then(function(b){return f(a.Bookmark,b)})};a.Bookmark.prototype.find=function(b){d(arguments.length,1,"find","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("Bookmark.find",
{bm:this.id,in_title:b},this.userPriority).then(function(b){return f(a.Bookmark,b)})};a.Bookmark.prototype.addNewChild=function(b){d(arguments.length,1,"addNewChild","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("Bookmark.addNewChild",{bm:this.id,in_title:b},this.userPriority).then(function(b){return f(a.Bookmark,b)})};a.Bookmark.prototype.addChild=function(b){d(arguments.length,1,"addChild","(PDFNet.Bookmark)",[[b,"Object",a.Bookmark,"Bookmark"]]);return a.messageHandler.sendWithPromise("Bookmark.addChild",
{bm:this.id,in_bookmark:b.id},this.userPriority)};a.Bookmark.prototype.addNewNext=function(b){d(arguments.length,1,"addNewNext","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("Bookmark.addNewNext",{bm:this.id,in_title:b},this.userPriority).then(function(b){return f(a.Bookmark,b)})};a.Bookmark.prototype.addNext=function(b){d(arguments.length,1,"addNext","(PDFNet.Bookmark)",[[b,"Object",a.Bookmark,"Bookmark"]]);return a.messageHandler.sendWithPromise("Bookmark.addNext",{bm:this.id,
in_bookmark:b.id},this.userPriority)};a.Bookmark.prototype.addNewPrev=function(b){d(arguments.length,1,"addNewPrev","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("Bookmark.addNewPrev",{bm:this.id,in_title:b},this.userPriority).then(function(b){return f(a.Bookmark,b)})};a.Bookmark.prototype.addPrev=function(b){d(arguments.length,1,"addPrev","(PDFNet.Bookmark)",[[b,"Object",a.Bookmark,"Bookmark"]]);return a.messageHandler.sendWithPromise("Bookmark.addPrev",{bm:this.id,in_bookmark:b.id},
this.userPriority)};a.Bookmark.prototype.delete=function(){return a.messageHandler.sendWithPromise("Bookmark.delete",{bm:this.id},this.userPriority)};a.Bookmark.prototype.unlink=function(){return a.messageHandler.sendWithPromise("Bookmark.unlink",{bm:this.id},this.userPriority)};a.Bookmark.prototype.getIndent=function(){return a.messageHandler.sendWithPromise("Bookmark.getIndent",{bm:this.id},this.userPriority)};a.Bookmark.prototype.isOpen=function(){return a.messageHandler.sendWithPromise("Bookmark.isOpen",
{bm:this.id},this.userPriority)};a.Bookmark.prototype.setOpen=function(b){d(arguments.length,1,"setOpen","(boolean)",[[b,"boolean"]]);return a.messageHandler.sendWithPromise("Bookmark.setOpen",{bm:this.id,in_open:b},this.userPriority)};a.Bookmark.prototype.getOpenCount=function(){return a.messageHandler.sendWithPromise("Bookmark.getOpenCount",{bm:this.id},this.userPriority)};a.Bookmark.prototype.getTitle=function(){return a.messageHandler.sendWithPromise("Bookmark.getTitle",{bm:this.id},this.userPriority)};
a.Bookmark.prototype.getTitleObj=function(){return a.messageHandler.sendWithPromise("Bookmark.getTitleObj",{bm:this.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.Bookmark.prototype.setTitle=function(b){d(arguments.length,1,"setTitle","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("Bookmark.setTitle",{bm:this.id,title:b},this.userPriority)};a.Bookmark.prototype.getAction=function(){return a.messageHandler.sendWithPromise("Bookmark.getAction",{bm:this.id},this.userPriority).then(function(b){return f(a.Action,
b)})};a.Bookmark.prototype.setAction=function(b){d(arguments.length,1,"setAction","(PDFNet.Action)",[[b,"Object",a.Action,"Action"]]);return a.messageHandler.sendWithPromise("Bookmark.setAction",{bm:this.id,in_action:b.id},this.userPriority)};a.Bookmark.prototype.removeAction=function(){return a.messageHandler.sendWithPromise("Bookmark.removeAction",{bm:this.id},this.userPriority)};a.Bookmark.prototype.getFlags=function(){return a.messageHandler.sendWithPromise("Bookmark.getFlags",{bm:this.id},this.userPriority)};
a.Bookmark.prototype.setFlags=function(b){d(arguments.length,1,"setFlags","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("Bookmark.setFlags",{bm:this.id,in_flags:b},this.userPriority)};a.Bookmark.prototype.getColor=function(){return a.messageHandler.sendWithPromise("Bookmark.getColor",{bm:this.id},this.userPriority)};a.Bookmark.prototype.setColor=function(b,c,e){"undefined"===typeof b&&(b=0);"undefined"===typeof c&&(c=0);"undefined"===typeof e&&(e=0);d(arguments.length,0,"setColor",
"(number, number, number)",[[b,"number"],[c,"number"],[e,"number"]]);return a.messageHandler.sendWithPromise("Bookmark.setColor",{bm:this.id,in_r:b,in_g:c,in_b:e},this.userPriority)};a.Bookmark.prototype.getSDFObj=function(){return a.messageHandler.sendWithPromise("Bookmark.getSDFObj",{bm:this.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.ColorPt.init=function(b,c,e,m){"undefined"===typeof b&&(b=0);"undefined"===typeof c&&(c=0);"undefined"===typeof e&&(e=0);"undefined"===typeof m&&
(m=0);d(arguments.length,0,"init","(number, number, number, number)",[[b,"number"],[c,"number"],[e,"number"],[m,"number"]]);return a.messageHandler.sendWithPromise("colorPtInit",{x:b,y:c,z:e,w:m},this.userPriority).then(function(b){return k(a.ColorPt,b)})};a.ColorPt.prototype.compare=function(b){d(arguments.length,1,"compare","(PDFNet.ColorPt)",[[b,"Object",a.ColorPt,"ColorPt"]]);return a.messageHandler.sendWithPromise("ColorPt.compare",{left:this.id,right:b.id},this.userPriority)};a.ColorPt.prototype.set=
function(b,c,e,m){"undefined"===typeof b&&(b=0);"undefined"===typeof c&&(c=0);"undefined"===typeof e&&(e=0);"undefined"===typeof m&&(m=0);d(arguments.length,0,"set","(number, number, number, number)",[[b,"number"],[c,"number"],[e,"number"],[m,"number"]]);return a.messageHandler.sendWithPromise("ColorPt.set",{cp:this.id,x:b,y:c,z:e,w:m},this.userPriority)};a.ColorPt.prototype.setByIndex=function(b,c){d(arguments.length,2,"setByIndex","(number, number)",[[b,"number"],[c,"number"]]);return a.messageHandler.sendWithPromise("ColorPt.setByIndex",
{cp:this.id,colorant_index:b,colorant_value:c},this.userPriority)};a.ColorPt.prototype.get=function(b){d(arguments.length,1,"get","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("ColorPt.get",{cp:this.id,colorant_index:b},this.userPriority)};a.ColorPt.prototype.setColorantNum=function(b){d(arguments.length,1,"setColorantNum","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("ColorPt.setColorantNum",{cp:this.id,num:b},this.userPriority)};a.ColorSpace.createDeviceGray=
function(){return a.messageHandler.sendWithPromise("colorSpaceCreateDeviceGray",{},this.userPriority).then(function(b){return k(a.ColorSpace,b)})};a.ColorSpace.createDeviceRGB=function(){return a.messageHandler.sendWithPromise("colorSpaceCreateDeviceRGB",{},this.userPriority).then(function(b){return k(a.ColorSpace,b)})};a.ColorSpace.createDeviceCMYK=function(){return a.messageHandler.sendWithPromise("colorSpaceCreateDeviceCMYK",{},this.userPriority).then(function(b){return k(a.ColorSpace,b)})};a.ColorSpace.createPattern=
function(){return a.messageHandler.sendWithPromise("colorSpaceCreatePattern",{},this.userPriority).then(function(b){return k(a.ColorSpace,b)})};a.ColorSpace.create=function(b){"undefined"===typeof b&&(b=new a.Obj("0"));d(arguments.length,0,"create","(PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("colorSpaceCreate",{color_space:b.id},this.userPriority).then(function(b){return k(a.ColorSpace,b)})};a.ColorSpace.createICCFromFile=function(b,c){d(arguments.length,2,"createICCFromFile",
"(PDFNet.SDFDoc, string)",[[b,"SDFDoc"],[c,"string"]]);return a.messageHandler.sendWithPromise("colorSpaceCreateICCFromFile",{doc:b.id,filepath:c},this.userPriority).then(function(b){return k(a.ColorSpace,b)})};a.ColorSpace.createICCFromFilter=function(b,c){d(arguments.length,2,"createICCFromFilter","(PDFNet.SDFDoc, PDFNet.Filter)",[[b,"SDFDoc"],[c,"Object",a.Filter,"Filter"]]);0!=c.id&&r(c.id);return a.messageHandler.sendWithPromise("colorSpaceCreateICCFromFilter",{doc:b.id,no_own_filter:c.id},this.userPriority).then(function(b){return k(a.ColorSpace,
b)})};a.ColorSpace.createICCFromBuffer=function(b,c){d(arguments.length,2,"createICCFromBuffer","(PDFNet.SDFDoc, ArrayBuffer|TypedArray)",[[b,"SDFDoc"],[c,"ArrayBuffer"]]);var e=v(c,!1);return a.messageHandler.sendWithPromise("colorSpaceCreateICCFromBuffer",{doc:b.id,buf:e},this.userPriority).then(function(b){return k(a.ColorSpace,b)})};a.ColorSpace.getComponentNumFromObj=function(b,c){d(arguments.length,2,"getComponentNumFromObj","(number, PDFNet.Obj)",[[b,"number"],[c,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("colorSpaceGetComponentNumFromObj",
{cs_type:b,cs_obj:c.id},this.userPriority)};a.ColorSpace.getTypeFromObj=function(b){d(arguments.length,1,"getTypeFromObj","(PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("colorSpaceGetTypeFromObj",{cs_obj:b.id},this.userPriority)};a.ColorSpace.prototype.getType=function(){return a.messageHandler.sendWithPromise("ColorSpace.getType",{cs:this.id},this.userPriority)};a.ColorSpace.prototype.getSDFObj=function(){return a.messageHandler.sendWithPromise("ColorSpace.getSDFObj",
{cs:this.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.ColorSpace.prototype.getComponentNum=function(){return a.messageHandler.sendWithPromise("ColorSpace.getComponentNum",{cs:this.id},this.userPriority)};a.ColorSpace.prototype.initColor=function(){return a.messageHandler.sendWithPromise("ColorSpace.initColor",{cs:this.id},this.userPriority).then(function(b){return k(a.ColorPt,b)})};a.ColorSpace.prototype.initComponentRanges=function(b){d(arguments.length,1,"initComponentRanges",
"(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("ColorSpace.initComponentRanges",{cs:this.id,num_comps:b},this.userPriority)};a.ColorSpace.prototype.convert2Gray=function(b){d(arguments.length,1,"convert2Gray","(PDFNet.ColorPt)",[[b,"Object",a.ColorPt,"ColorPt"]]);return a.messageHandler.sendWithPromise("ColorSpace.convert2Gray",{cs:this.id,in_color:b.id},this.userPriority).then(function(b){return k(a.ColorPt,b)})};a.ColorSpace.prototype.convert2RGB=function(b){d(arguments.length,
1,"convert2RGB","(PDFNet.ColorPt)",[[b,"Object",a.ColorPt,"ColorPt"]]);return a.messageHandler.sendWithPromise("ColorSpace.convert2RGB",{cs:this.id,in_color:b.id},this.userPriority).then(function(b){return k(a.ColorPt,b)})};a.ColorSpace.prototype.convert2CMYK=function(b){d(arguments.length,1,"convert2CMYK","(PDFNet.ColorPt)",[[b,"Object",a.ColorPt,"ColorPt"]]);return a.messageHandler.sendWithPromise("ColorSpace.convert2CMYK",{cs:this.id,in_color:b.id},this.userPriority).then(function(b){return k(a.ColorPt,
b)})};a.ColorSpace.prototype.getAlternateColorSpace=function(){return a.messageHandler.sendWithPromise("ColorSpace.getAlternateColorSpace",{cs:this.id},this.userPriority).then(function(b){return k(a.ColorSpace,b)})};a.ColorSpace.prototype.getBaseColorSpace=function(){return a.messageHandler.sendWithPromise("ColorSpace.getBaseColorSpace",{cs:this.id},this.userPriority).then(function(b){return k(a.ColorSpace,b)})};a.ColorSpace.prototype.getHighVal=function(){return a.messageHandler.sendWithPromise("ColorSpace.getHighVal",
{cs:this.id},this.userPriority)};a.ColorSpace.prototype.getLookupTable=function(){return a.messageHandler.sendWithPromise("ColorSpace.getLookupTable",{cs:this.id},this.userPriority)};a.ColorSpace.prototype.getBaseColor=function(b){d(arguments.length,1,"getBaseColor","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("ColorSpace.getBaseColor",{cs:this.id,color_idx:b},this.userPriority).then(function(b){return k(a.ColorPt,b)})};a.ColorSpace.prototype.getTintFunction=function(){return a.messageHandler.sendWithPromise("ColorSpace.getTintFunction",
{cs:this.id},this.userPriority).then(function(b){return k(a.Function,b)})};a.ColorSpace.prototype.isAll=function(){return a.messageHandler.sendWithPromise("ColorSpace.isAll",{cs:this.id},this.userPriority)};a.ColorSpace.prototype.isNone=function(){return a.messageHandler.sendWithPromise("ColorSpace.isNone",{cs:this.id},this.userPriority)};a.ContentReplacer.create=function(){return a.messageHandler.sendWithPromise("contentReplacerCreate",{},this.userPriority).then(function(b){return k(a.ContentReplacer,
b)})};a.ContentReplacer.prototype.addImage=function(b,c){d(arguments.length,2,"addImage","(PDFNet.Rect, PDFNet.Obj)",[[b,"Structure",a.Rect,"Rect"],[c,"Object",a.Obj,"Obj"]]);n("addImage",[[b,0]]);return a.messageHandler.sendWithPromise("ContentReplacer.addImage",{cr:this.id,target_region:b,replacement_image:c.id},this.userPriority)};a.ContentReplacer.prototype.addText=function(b,c){d(arguments.length,2,"addText","(PDFNet.Rect, string)",[[b,"Structure",a.Rect,"Rect"],[c,"string"]]);n("addText",[[b,
0]]);return a.messageHandler.sendWithPromise("ContentReplacer.addText",{cr:this.id,target_region:b,replacement_text:c},this.userPriority)};a.ContentReplacer.prototype.addString=function(b,c){d(arguments.length,2,"addString","(string, string)",[[b,"string"],[c,"string"]]);return a.messageHandler.sendWithPromise("ContentReplacer.addString",{cr:this.id,template_text:b,replacement_text:c},this.userPriority)};a.ContentReplacer.prototype.setMatchStrings=function(b,c){d(arguments.length,2,"setMatchStrings",
"(string, string)",[[b,"string"],[c,"string"]]);return a.messageHandler.sendWithPromise("ContentReplacer.setMatchStrings",{cr:this.id,start_str:b,end_str:c},this.userPriority)};a.ContentReplacer.prototype.process=function(b){d(arguments.length,1,"process","(PDFNet.Page)",[[b,"Object",a.Page,"Page"]]);return a.messageHandler.sendWithPromise("ContentReplacer.process",{cr:this.id,page:b.id},this.userPriority)};a.Reflow.prototype.getHtml=function(){return a.messageHandler.sendWithPromise("Reflow.getHtml",
{self:this.id},this.userPriority)};a.Reflow.prototype.getAnnot=function(b){d(arguments.length,1,"getAnnot","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("Reflow.getAnnot",{self:this.id,in_id:b},this.userPriority)};a.Reflow.prototype.setAnnot=function(b){d(arguments.length,1,"setAnnot","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("Reflow.setAnnot",{self:this.id,in_json:b},this.userPriority)};a.DocumentConversion.prototype.tryConvert=function(){return a.messageHandler.sendWithPromise("DocumentConversion.tryConvert",
{self:this.id},this.userPriority)};a.DocumentConversion.prototype.convert=function(){return a.messageHandler.sendWithPromise("DocumentConversion.convert",{self:this.id},this.userPriority)};a.DocumentConversion.prototype.convertNextPage=function(){return a.messageHandler.sendWithPromise("DocumentConversion.convertNextPage",{self:this.id},this.userPriority)};a.DocumentConversion.prototype.getDoc=function(){return a.messageHandler.sendWithPromise("DocumentConversion.getDoc",{self:this.id},this.userPriority).then(function(b){return k(a.PDFDoc,
b)})};a.DocumentConversion.prototype.getConversionStatus=function(){return a.messageHandler.sendWithPromise("DocumentConversion.getConversionStatus",{self:this.id},this.userPriority)};a.DocumentConversion.prototype.cancelConversion=function(){return a.messageHandler.sendWithPromise("DocumentConversion.cancelConversion",{self:this.id},this.userPriority)};a.DocumentConversion.prototype.isCancelled=function(){return a.messageHandler.sendWithPromise("DocumentConversion.isCancelled",{self:this.id},this.userPriority)};
a.DocumentConversion.prototype.hasProgressTracking=function(){return a.messageHandler.sendWithPromise("DocumentConversion.hasProgressTracking",{self:this.id},this.userPriority)};a.DocumentConversion.prototype.getProgress=function(){return a.messageHandler.sendWithPromise("DocumentConversion.getProgress",{self:this.id},this.userPriority)};a.DocumentConversion.prototype.getProgressLabel=function(){return a.messageHandler.sendWithPromise("DocumentConversion.getProgressLabel",{self:this.id},this.userPriority)};
a.DocumentConversion.prototype.getNumConvertedPages=function(){return a.messageHandler.sendWithPromise("DocumentConversion.getNumConvertedPages",{self:this.id},this.userPriority)};a.DocumentConversion.prototype.getErrorString=function(){return a.messageHandler.sendWithPromise("DocumentConversion.getErrorString",{self:this.id},this.userPriority)};a.DocumentConversion.prototype.getNumWarnings=function(){return a.messageHandler.sendWithPromise("DocumentConversion.getNumWarnings",{self:this.id},this.userPriority)};
a.DocumentConversion.prototype.getWarningString=function(b){d(arguments.length,1,"getWarningString","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("DocumentConversion.getWarningString",{self:this.id,index:b},this.userPriority)};a.Convert.fromXps=function(b,c){d(arguments.length,2,"fromXps","(PDFNet.PDFDoc, string)",[[b,"PDFDoc"],[c,"string"]]);return a.messageHandler.sendWithPromise("convertFromXps",{in_pdfdoc:b.id,in_filename:c},this.userPriority)};a.Convert.fromXpsMem=function(b,
c){d(arguments.length,2,"fromXpsMem","(PDFNet.PDFDoc, ArrayBuffer|TypedArray)",[[b,"PDFDoc"],[c,"ArrayBuffer"]]);var e=v(c,!1);return a.messageHandler.sendWithPromise("convertFromXpsMem",{in_pdfdoc:b.id,buf:e},this.userPriority)};a.Convert.createReflow=function(b,c){d(arguments.length,2,"createReflow","(PDFNet.Page, string)",[[b,"Object",a.Page,"Page"],[c,"string"]]);return a.messageHandler.sendWithPromise("convertCreateReflow",{in_page:b.id,json_zones:c},this.userPriority).then(function(b){return k(a.Reflow,
b)})};a.Convert.fromEmf=function(b,c){d(arguments.length,2,"fromEmf","(PDFNet.PDFDoc, string)",[[b,"PDFDoc"],[c,"string"]]);return a.messageHandler.sendWithPromise("convertFromEmf",{in_pdfdoc:b.id,in_filename:c},this.userPriority)};a.Convert.pageToEmf=function(b,c){d(arguments.length,2,"pageToEmf","(PDFNet.Page, string)",[[b,"Object",a.Page,"Page"],[c,"string"]]);return a.messageHandler.sendWithPromise("convertPageToEmf",{in_page:b.id,in_filename:c},this.userPriority)};a.Convert.docToEmf=function(b,
c){d(arguments.length,2,"docToEmf","(PDFNet.PDFDoc, string)",[[b,"PDFDoc"],[c,"string"]]);return a.messageHandler.sendWithPromise("convertDocToEmf",{in_pdfdoc:b.id,in_filename:c},this.userPriority)};a.Convert.fromText=function(b,c,e){"undefined"===typeof e&&(e=new a.Obj("0"));d(arguments.length,2,"fromText","(PDFNet.PDFDoc, string, PDFNet.Obj)",[[b,"PDFDoc"],[c,"string"],[e,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("convertFromText",{in_pdfdoc:b.id,in_filename:c,options:e.id},
this.userPriority)};a.Convert.fromTextWithBuffer=function(b,c,e){"undefined"===typeof e&&(e=new a.Obj("0"));d(arguments.length,2,"fromTextWithBuffer","(PDFNet.PDFDoc, ArrayBuffer|TypedArray, PDFNet.Obj)",[[b,"PDFDoc"],[c,"ArrayBuffer"],[e,"Object",a.Obj,"Obj"]]);c=v(c,!1);return a.messageHandler.sendWithPromise("convertFromTextWithBuffer",{in_pdfdoc:b.id,in_filename:c,options:e.id},this.userPriority)};a.Convert.pageToSvg=function(b,c){d(arguments.length,2,"pageToSvg","(PDFNet.Page, string)",[[b,"Object",
a.Page,"Page"],[c,"string"]]);return a.messageHandler.sendWithPromise("convertPageToSvg",{in_page:b.id,output_filename:c},this.userPriority)};a.Convert.pageToSvgWithOptions=function(b,c,e){"undefined"===typeof e&&(e=new a.Obj("0"));d(arguments.length,2,"pageToSvgWithOptions","(PDFNet.Page, string, PDFNet.Obj)",[[b,"Object",a.Page,"Page"],[c,"string"],[e,"OptionObject",a.Obj,"Obj","PDFNet.Convert.SVGOutputOptions"]]);if("PDFNet.Convert.SVGOutputOptions"===e.name){var m=e;e=a.ObjSet.create().then(function(a){return a.createFromJson(JSON.stringify(m))})}else e=
Promise.resolve(e);return e.then(function(e){return a.messageHandler.sendWithPromise("convertPageToSvgWithOptions",{in_page:b.id,output_filename:c,options:e.id},this.userPriority)})};a.Convert.docToSvg=function(b,c){d(arguments.length,2,"docToSvg","(PDFNet.PDFDoc, string)",[[b,"PDFDoc"],[c,"string"]]);return a.messageHandler.sendWithPromise("convertDocToSvg",{in_pdfdoc:b.id,in_filename:c},this.userPriority)};a.Convert.docToSvgWithOptions=function(b,c,e){"undefined"===typeof e&&(e=new a.Obj("0"));
d(arguments.length,2,"docToSvgWithOptions","(PDFNet.PDFDoc, string, PDFNet.Obj)",[[b,"PDFDoc"],[c,"string"],[e,"OptionObject",a.Obj,"Obj","PDFNet.Convert.SVGOutputOptions"]]);if("PDFNet.Convert.SVGOutputOptions"===e.name){var m=e;e=a.ObjSet.create().then(function(a){return a.createFromJson(JSON.stringify(m))})}else e=Promise.resolve(e);return e.then(function(e){return a.messageHandler.sendWithPromise("convertDocToSvgWithOptions",{in_pdfdoc:b.id,in_filename:c,options:e.id},this.userPriority)})};a.Convert.toXps=
function(b,c,e){"undefined"===typeof e&&(e=new a.Obj("0"));d(arguments.length,2,"toXps","(PDFNet.PDFDoc, string, PDFNet.Obj)",[[b,"PDFDoc"],[c,"string"],[e,"OptionObject",a.Obj,"Obj","PDFNet.Convert.XPSOutputOptions"]]);if("PDFNet.Convert.XPSOutputOptions"===e.name){var m=e;e=a.ObjSet.create().then(function(a){return a.createFromJson(JSON.stringify(m))})}else e=Promise.resolve(e);return e.then(function(e){return a.messageHandler.sendWithPromise("convertToXps",{in_pdfdoc:b.id,output_filename:c,options:e.id},
this.userPriority)})};a.Convert.toXpsBuffer=function(b,c){"undefined"===typeof c&&(c=new a.Obj("0"));d(arguments.length,1,"toXpsBuffer","(PDFNet.PDFDoc, PDFNet.Obj)",[[b,"PDFDoc"],[c,"OptionObject",a.Obj,"Obj","PDFNet.Convert.XPSOutputOptions"]]);if("PDFNet.Convert.XPSOutputOptions"===c.name){var e=c;c=a.ObjSet.create().then(function(a){return a.createFromJson(JSON.stringify(e))})}else c=Promise.resolve(c);return c.then(function(c){return a.messageHandler.sendWithPromise("convertToXpsBuffer",{in_pdfdoc:b.id,
options:c.id},this.userPriority).then(function(a){return new Uint8Array(a)})})};a.Convert.fileToXps=function(b,c,e){"undefined"===typeof e&&(e=new a.Obj("0"));d(arguments.length,2,"fileToXps","(string, string, PDFNet.Obj)",[[b,"string"],[c,"string"],[e,"OptionObject",a.Obj,"Obj","PDFNet.Convert.XPSOutputOptions"]]);if("PDFNet.Convert.XPSOutputOptions"===e.name){var m=e;e=a.ObjSet.create().then(function(a){return a.createFromJson(JSON.stringify(m))})}else e=Promise.resolve(e);return e.then(function(e){return a.messageHandler.sendWithPromise("convertFileToXps",
{in_inputFilename:b,in_outputFilename:c,options:e.id},this.userPriority)})};a.Convert.fileToXpsWithBuffer=function(b,c,e){"undefined"===typeof e&&(e=new a.Obj("0"));d(arguments.length,2,"fileToXpsWithBuffer","(ArrayBuffer|TypedArray, string, PDFNet.Obj)",[[b,"ArrayBuffer"],[c,"string"],[e,"OptionObject",a.Obj,"Obj","PDFNet.Convert.XPSOutputOptions"]]);c.startsWith(".")||(c="."+c);b=v(b,!1);if("PDFNet.Convert.XPSOutputOptions"===e.name){var m=e;e=a.ObjSet.create().then(function(a){return a.createFromJson(JSON.stringify(m))})}else e=
Promise.resolve(e);return e.then(function(e){return a.messageHandler.sendWithPromise("convertFileToXpsWithBuffer",{in_inputFilename:b,in_inputFilename_extension:c,options:e.id},this.userPriority).then(function(a){return new Uint8Array(a)})})};a.Convert.fileToXod=function(b,c,e){"undefined"===typeof e&&(e=new a.Obj("0"));d(arguments.length,2,"fileToXod","(string, string, PDFNet.Obj)",[[b,"string"],[c,"string"],[e,"OptionObject",a.Obj,"Obj","PDFNet.Convert.XODOutputOptions"]]);if("PDFNet.Convert.XODOutputOptions"===
e.name){var m=e;e=a.ObjSet.create().then(function(a){return a.createFromJson(JSON.stringify(m))})}else e=Promise.resolve(e);return e.then(function(e){return a.messageHandler.sendWithPromise("convertFileToXod",{in_filename:b,output_filename:c,options:e.id},this.userPriority)})};a.Convert.fileToXodWithBuffer=function(b,c,e){"undefined"===typeof e&&(e=new a.Obj("0"));d(arguments.length,2,"fileToXodWithBuffer","(ArrayBuffer|TypedArray, string, PDFNet.Obj)",[[b,"ArrayBuffer"],[c,"string"],[e,"OptionObject",
a.Obj,"Obj","PDFNet.Convert.XODOutputOptions"]]);c.startsWith(".")||(c="."+c);b=v(b,!1);if("PDFNet.Convert.XODOutputOptions"===e.name){var m=e;e=a.ObjSet.create().then(function(a){return a.createFromJson(JSON.stringify(m))})}else e=Promise.resolve(e);return e.then(function(e){return a.messageHandler.sendWithPromise("convertFileToXodWithBuffer",{in_filename:b,in_filename_extension:c,options:e.id},this.userPriority).then(function(a){return new Uint8Array(a)})})};a.Convert.toXod=function(b,c,e){"undefined"===
typeof e&&(e=new a.Obj("0"));d(arguments.length,2,"toXod","(PDFNet.PDFDoc, string, PDFNet.Obj)",[[b,"PDFDoc"],[c,"string"],[e,"OptionObject",a.Obj,"Obj","PDFNet.Convert.XODOutputOptions"]]);if("PDFNet.Convert.XODOutputOptions"===e.name){var m=e;e=a.ObjSet.create().then(function(a){return a.createFromJson(JSON.stringify(m))})}else e=Promise.resolve(e);return e.then(function(e){return a.messageHandler.sendWithPromise("convertToXod",{in_pdfdoc:b.id,output_filename:c,options:e.id},this.userPriority)})};
a.Convert.toXodBuffer=function(b,c){"undefined"===typeof c&&(c=new a.Obj("0"));d(arguments.length,1,"toXodBuffer","(PDFNet.PDFDoc, PDFNet.Obj)",[[b,"PDFDoc"],[c,"OptionObject",a.Obj,"Obj","PDFNet.Convert.XODOutputOptions"]]);if("PDFNet.Convert.XODOutputOptions"===c.name){var e=c;c=a.ObjSet.create().then(function(a){return a.createFromJson(JSON.stringify(e))})}else c=Promise.resolve(c);return c.then(function(c){return a.messageHandler.sendWithPromise("convertToXodBuffer",{in_pdfdoc:b.id,options:c.id},
this.userPriority).then(function(a){return new Uint8Array(a)})})};a.Convert.fileToXodStream=function(b,c){"undefined"===typeof c&&(c=new a.Obj("0"));d(arguments.length,1,"fileToXodStream","(string, PDFNet.Obj)",[[b,"string"],[c,"OptionObject",a.Obj,"Obj","PDFNet.Convert.XODOutputOptions"]]);if("PDFNet.Convert.XODOutputOptions"===c.name){var e=c;c=a.ObjSet.create().then(function(a){return a.createFromJson(JSON.stringify(e))})}else c=Promise.resolve(c);return c.then(function(c){return a.messageHandler.sendWithPromise("convertFileToXodStream",
{in_filename:b,options:c.id},this.userPriority).then(function(b){return k(a.Filter,b)})})};a.Convert.toXodStream=function(b,c){"undefined"===typeof c&&(c=new a.Obj("0"));d(arguments.length,1,"toXodStream","(PDFNet.PDFDoc, PDFNet.Obj)",[[b,"PDFDoc"],[c,"OptionObject",a.Obj,"Obj","PDFNet.Convert.XODOutputOptions"]]);if("PDFNet.Convert.XODOutputOptions"===c.name){var e=c;c=a.ObjSet.create().then(function(a){return a.createFromJson(JSON.stringify(e))})}else c=Promise.resolve(c);return c.then(function(c){return a.messageHandler.sendWithPromise("convertToXodStream",
{in_pdfdoc:b.id,options:c.id},this.userPriority).then(function(b){return k(a.Filter,b)})})};a.ConversionMonitor.prototype.next=function(){return a.messageHandler.sendWithPromise("ConversionMonitor.next",{conversionMonitor:this.id},this.userPriority)};a.ConversionMonitor.prototype.ready=function(){return a.messageHandler.sendWithPromise("ConversionMonitor.ready",{conversionMonitor:this.id},this.userPriority)};a.ConversionMonitor.prototype.progress=function(){return a.messageHandler.sendWithPromise("ConversionMonitor.progress",
{conversionMonitor:this.id},this.userPriority)};a.ConversionMonitor.prototype.filter=function(){return a.messageHandler.sendWithPromise("ConversionMonitor.filter",{conversionMonitor:this.id},this.userPriority).then(function(b){return k(a.Filter,b)})};a.Convert.officeToPdfWithPath=function(b,c,e){"undefined"===typeof e&&(e=new a.Obj("0"));d(arguments.length,2,"officeToPdfWithPath","(PDFNet.PDFDoc, string, PDFNet.Obj)",[[b,"PDFDoc"],[c,"string"],[e,"OptionObject",a.Obj,"Obj","PDFNet.Convert.ConversionOptions"]]);
if("PDFNet.Convert.ConversionOptions"===e.name){var m=e;e=a.ObjSet.create().then(function(a){return a.createFromJson(JSON.stringify(m))})}else e=Promise.resolve(e);return e.then(function(e){return a.messageHandler.sendWithPromise("convertOfficeToPdfWithPath",{in_pdfdoc:b.id,in_filename:c,options:e.id},this.userPriority)})};a.Convert.streamingPdfConversionWithPath=function(b,c){"undefined"===typeof c&&(c=new a.Obj("0"));d(arguments.length,1,"streamingPdfConversionWithPath","(string, PDFNet.Obj)",[[b,
"string"],[c,"OptionObject",a.Obj,"Obj","PDFNet.Convert.ConversionOptions"]]);if("PDFNet.Convert.ConversionOptions"===c.name){var e=c;c=a.ObjSet.create().then(function(a){return a.createFromJson(JSON.stringify(e))})}else c=Promise.resolve(c);return c.then(function(c){return a.messageHandler.sendWithPromise("convertStreamingPdfConversionWithPath",{in_filename:b,options:c.id},this.userPriority).then(function(b){return k(a.DocumentConversion,b)})})};a.Convert.streamingPdfConversionWithPdfAndPath=function(b,
c,e){"undefined"===typeof e&&(e=new a.Obj("0"));d(arguments.length,2,"streamingPdfConversionWithPdfAndPath","(PDFNet.PDFDoc, string, PDFNet.Obj)",[[b,"PDFDoc"],[c,"string"],[e,"OptionObject",a.Obj,"Obj","PDFNet.Convert.ConversionOptions"]]);if("PDFNet.Convert.ConversionOptions"===e.name){var m=e;e=a.ObjSet.create().then(function(a){return a.createFromJson(JSON.stringify(m))})}else e=Promise.resolve(e);return e.then(function(e){return a.messageHandler.sendWithPromise("convertStreamingPdfConversionWithPdfAndPath",
{in_pdfdoc:b.id,in_filename:c,options:e.id},this.userPriority).then(function(b){return k(a.DocumentConversion,b)})})};a.Convert.officeToPdfWithFilter=function(b,c,e){"undefined"===typeof e&&(e=new a.Obj("0"));d(arguments.length,2,"officeToPdfWithFilter","(PDFNet.PDFDoc, PDFNet.Filter, PDFNet.Obj)",[[b,"PDFDoc"],[c,"Object",a.Filter,"Filter"],[e,"OptionObject",a.Obj,"Obj","PDFNet.Convert.ConversionOptions"]]);0!=c.id&&r(c.id);if("PDFNet.Convert.ConversionOptions"===e.name){var m=e;e=a.ObjSet.create().then(function(a){return a.createFromJson(JSON.stringify(m))})}else e=
Promise.resolve(e);return e.then(function(e){return a.messageHandler.sendWithPromise("convertOfficeToPdfWithFilter",{in_pdfdoc:b.id,no_own_in_stream:c.id,options:e.id},this.userPriority)})};a.Convert.streamingPdfConversionWithFilter=function(b,c){"undefined"===typeof c&&(c=new a.Obj("0"));d(arguments.length,1,"streamingPdfConversionWithFilter","(PDFNet.Filter, PDFNet.Obj)",[[b,"Object",a.Filter,"Filter"],[c,"OptionObject",a.Obj,"Obj","PDFNet.Convert.ConversionOptions"]]);if("PDFNet.Convert.ConversionOptions"===
c.name){var e=c;c=a.ObjSet.create().then(function(a){return a.createFromJson(JSON.stringify(e))})}else c=Promise.resolve(c);return c.then(function(c){return a.messageHandler.sendWithPromise("convertStreamingPdfConversionWithFilter",{in_stream:b.id,options:c.id},this.userPriority).then(function(b){return k(a.DocumentConversion,b)})})};a.Convert.streamingPdfConversionWithPdfAndFilter=function(b,c,e){"undefined"===typeof e&&(e=new a.Obj("0"));d(arguments.length,2,"streamingPdfConversionWithPdfAndFilter",
"(PDFNet.PDFDoc, PDFNet.Filter, PDFNet.Obj)",[[b,"PDFDoc"],[c,"Object",a.Filter,"Filter"],[e,"OptionObject",a.Obj,"Obj","PDFNet.Convert.ConversionOptions"]]);if("PDFNet.Convert.ConversionOptions"===e.name){var m=e;e=a.ObjSet.create().then(function(a){return a.createFromJson(JSON.stringify(m))})}else e=Promise.resolve(e);return e.then(function(e){return a.messageHandler.sendWithPromise("convertStreamingPdfConversionWithPdfAndFilter",{in_pdfdoc:b.id,in_stream:c.id,options:e.id},this.userPriority).then(function(b){return k(a.DocumentConversion,
b)})})};a.Convert.toPdf=function(b,c){d(arguments.length,2,"toPdf","(PDFNet.PDFDoc, string)",[[b,"PDFDoc"],[c,"string"]]);return a.messageHandler.sendWithPromise("convertToPdf",{in_pdfdoc:b.id,in_filename:c},this.userPriority)};a.Convert.toPdfWithBuffer=function(b,c,e){d(arguments.length,3,"toPdfWithBuffer","(PDFNet.PDFDoc, ArrayBuffer|TypedArray, string)",[[b,"PDFDoc"],[c,"ArrayBuffer"],[e,"string"]]);e.startsWith(".")||(e="."+e);c=v(c,!1);return a.messageHandler.sendWithPromise("convertToPdfWithBuffer",
{in_pdfdoc:b.id,in_filename:c,in_filename_extension:e},this.userPriority)};a.Convert.fromCAD=function(b,c,e){"undefined"===typeof e&&(e=new a.Obj("0"));d(arguments.length,2,"fromCAD","(PDFNet.PDFDoc, string, PDFNet.Obj)",[[b,"PDFDoc"],[c,"string"],[e,"OptionObject",a.Obj,"Obj","PDFNet.Convert.CADConvertOptions"]]);if("PDFNet.Convert.CADConvertOptions"===e.name){var m=e;e=a.ObjSet.create().then(function(a){return a.createFromJson(JSON.stringify(m))})}else e=Promise.resolve(e);return e.then(function(e){return a.messageHandler.sendWithPromise("convertFromCAD",
{in_pdfdoc:b.id,in_filename:c,opts:e.id},this.userPriority)})};a.Convert.fromDICOM=function(b,c,e){"undefined"===typeof e&&(e=new a.Obj("0"));d(arguments.length,2,"fromDICOM","(PDFNet.PDFDoc, string, PDFNet.Obj)",[[b,"PDFDoc"],[c,"string"],[e,"OptionObject",a.Obj,"Obj","PDFNet.Convert.AdvancedImagingConvertOptions"]]);if("PDFNet.Convert.AdvancedImagingConvertOptions"===e.name){var m=e;e=a.ObjSet.create().then(function(a){return a.createFromJson(JSON.stringify(m))})}else e=Promise.resolve(e);return e.then(function(e){return a.messageHandler.sendWithPromise("convertFromDICOM",
{in_pdfdoc:b.id,in_filename:c,opts:e.id},this.userPriority)})};a.Convert.fromTiff=function(b,c){d(arguments.length,2,"fromTiff","(PDFNet.PDFDoc, PDFNet.Filter)",[[b,"PDFDoc"],[c,"Object",a.Filter,"Filter"]]);return a.messageHandler.sendWithPromise("convertFromTiff",{in_pdfdoc:b.id,in_data:c.id},this.userPriority)};a.Convert.requiresPrinter=function(b){d(arguments.length,1,"requiresPrinter","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("convertRequiresPrinter",{in_filename:b},
this.userPriority)};a.Convert.printerInstall=function(b){"undefined"===typeof b&&(b="PDFTron PDFNet");d(arguments.length,0,"printerInstall","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("convertPrinterInstall",{in_printerName:b},this.userPriority)};a.Convert.printerUninstall=function(){return a.messageHandler.sendWithPromise("convertPrinterUninstall",{},this.userPriority)};a.Convert.printerGetPrinterName=function(){return a.messageHandler.sendWithPromise("convertPrinterGetPrinterName",
{},this.userPriority)};a.Convert.printerSetPrinterName=function(b){"undefined"===typeof b&&(b="PDFTron PDFNet");d(arguments.length,0,"printerSetPrinterName","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("convertPrinterSetPrinterName",{in_printerName:b},this.userPriority)};a.Convert.printerIsInstalled=function(b){"undefined"===typeof b&&(b="PDFTron PDFNet");d(arguments.length,0,"printerIsInstalled","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("convertPrinterIsInstalled",
{in_printerName:b},this.userPriority)};a.Convert.printerSetMode=function(b){d(arguments.length,1,"printerSetMode","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("convertPrinterSetMode",{print_mode:b},this.userPriority)};a.Convert.printerGetMode=function(){return a.messageHandler.sendWithPromise("convertPrinterGetMode",{},this.userPriority)};a.Convert.pageToHtml=function(b){d(arguments.length,1,"pageToHtml","(PDFNet.Page)",[[b,"Object",a.Page,"Page"]]);return a.messageHandler.sendWithPromise("convertPageToHtml",
{page:b.id},this.userPriority)};a.Convert.pageToHtmlZoned=function(b,c){d(arguments.length,2,"pageToHtmlZoned","(PDFNet.Page, string)",[[b,"Object",a.Page,"Page"],[c,"string"]]);return a.messageHandler.sendWithPromise("convertPageToHtmlZoned",{page:b.id,json_zones:c},this.userPriority)};a.Convert.fileToHtml=function(b,c,e){"undefined"===typeof e&&(e=new a.Obj("0"));d(arguments.length,2,"fileToHtml","(string, string, PDFNet.Obj)",[[b,"string"],[c,"string"],[e,"OptionObject",a.Obj,"Obj","PDFNet.Convert.HTMLOutputOptions"]]);
if("PDFNet.Convert.HTMLOutputOptions"===e.name){var m=e;e=a.ObjSet.create().then(function(a){return a.createFromJson(JSON.stringify(m))})}else e=Promise.resolve(e);return e.then(function(e){return a.messageHandler.sendWithPromise("convertFileToHtml",{in_filename:b,output_path:c,options:e.id},this.userPriority)})};a.Convert.toHtml=function(b,c,e){"undefined"===typeof e&&(e=new a.Obj("0"));d(arguments.length,2,"toHtml","(PDFNet.PDFDoc, string, PDFNet.Obj)",[[b,"PDFDoc"],[c,"string"],[e,"OptionObject",
a.Obj,"Obj","PDFNet.Convert.HTMLOutputOptions"]]);if("PDFNet.Convert.HTMLOutputOptions"===e.name){var m=e;e=a.ObjSet.create().then(function(a){return a.createFromJson(JSON.stringify(m))})}else e=Promise.resolve(e);return e.then(function(e){return a.messageHandler.sendWithPromise("convertToHtml",{in_pdfdoc:b.id,output_path:c,options:e.id},this.userPriority)})};a.Convert.fileToWord=function(b,c,e){"undefined"===typeof e&&(e=new a.Obj("0"));d(arguments.length,2,"fileToWord","(string, string, PDFNet.Obj)",
[[b,"string"],[c,"string"],[e,"OptionObject",a.Obj,"Obj","PDFNet.Convert.WordOutputOptions"]]);if("PDFNet.Convert.WordOutputOptions"===e.name){var m=e;e=a.ObjSet.create().then(function(a){return a.createFromJson(JSON.stringify(m))})}else e=Promise.resolve(e);return e.then(function(e){return a.messageHandler.sendWithPromise("convertFileToWord",{inputFilename:b,outputPath:c,options:e.id},this.userPriority)})};a.Convert.toWord=function(b,c,e){"undefined"===typeof e&&(e=new a.Obj("0"));d(arguments.length,
2,"toWord","(PDFNet.PDFDoc, string, PDFNet.Obj)",[[b,"PDFDoc"],[c,"string"],[e,"OptionObject",a.Obj,"Obj","PDFNet.Convert.WordOutputOptions"]]);if("PDFNet.Convert.WordOutputOptions"===e.name){var m=e;e=a.ObjSet.create().then(function(a){return a.createFromJson(JSON.stringify(m))})}else e=Promise.resolve(e);return e.then(function(e){return a.messageHandler.sendWithPromise("convertToWord",{pdfdoc:b.id,outputPath:c,options:e.id},this.userPriority)})};a.Convert.fileToEpub=function(b,c,e,m){"undefined"===
typeof e&&(e=new a.Obj("0"));"undefined"===typeof m&&(m=new a.Obj("0"));d(arguments.length,2,"fileToEpub","(string, string, PDFNet.Obj, PDFNet.Obj)",[[b,"string"],[c,"string"],[e,"OptionObject",a.Obj,"Obj","PDFNet.Convert.HTMLOutputOptions"],[m,"OptionObject",a.Obj,"Obj","PDFNet.Convert.EPUBOutputOptions"]]);if("PDFNet.Convert.HTMLOutputOptions"===e.name){var f=e;e=a.ObjSet.create().then(function(a){return a.createFromJson(JSON.stringify(f))})}else e=Promise.resolve(e);if("PDFNet.Convert.EPUBOutputOptions"===
m.name){var g=m;m=a.ObjSet.create().then(function(a){return a.createFromJson(JSON.stringify(g))})}else m=Promise.resolve(m);return Promise.all([e,m]).then(function(d){e=d[0];m=d[1];return a.messageHandler.sendWithPromise("convertFileToEpub",{in_filename:b,output_path:c,html_options:e.id,epub_options:m.id},this.userPriority)})};a.Convert.toEpub=function(b,c,e,m){"undefined"===typeof e&&(e=new a.Obj("0"));"undefined"===typeof m&&(m=new a.Obj("0"));d(arguments.length,2,"toEpub","(PDFNet.PDFDoc, string, PDFNet.Obj, PDFNet.Obj)",
[[b,"PDFDoc"],[c,"string"],[e,"OptionObject",a.Obj,"Obj","PDFNet.Convert.HTMLOutputOptions"],[m,"OptionObject",a.Obj,"Obj","PDFNet.Convert.EPUBOutputOptions"]]);if("PDFNet.Convert.HTMLOutputOptions"===e.name){var f=e;e=a.ObjSet.create().then(function(a){return a.createFromJson(JSON.stringify(f))})}else e=Promise.resolve(e);if("PDFNet.Convert.EPUBOutputOptions"===m.name){var g=m;m=a.ObjSet.create().then(function(a){return a.createFromJson(JSON.stringify(g))})}else m=Promise.resolve(m);return Promise.all([e,
m]).then(function(d){e=d[0];m=d[1];return a.messageHandler.sendWithPromise("convertToEpub",{in_pdfdoc:b.id,output_path:c,html_options:e.id,epub_options:m.id},this.userPriority)})};a.Convert.fileToTiff=function(b,c,e){"undefined"===typeof e&&(e=new a.Obj("0"));d(arguments.length,2,"fileToTiff","(string, string, PDFNet.Obj)",[[b,"string"],[c,"string"],[e,"OptionObject",a.Obj,"Obj","PDFNet.Convert.TiffOutputOptions"]]);if("PDFNet.Convert.TiffOutputOptions"===e.name){var m=e;e=a.ObjSet.create().then(function(a){return a.createFromJson(JSON.stringify(m))})}else e=
Promise.resolve(e);return e.then(function(e){return a.messageHandler.sendWithPromise("convertFileToTiff",{in_filename:b,output_path:c,options:e.id},this.userPriority)})};a.Convert.fileToTiffWithBuffer=function(b,c,e){"undefined"===typeof e&&(e=new a.Obj("0"));d(arguments.length,2,"fileToTiffWithBuffer","(ArrayBuffer|TypedArray, string, PDFNet.Obj)",[[b,"ArrayBuffer"],[c,"string"],[e,"OptionObject",a.Obj,"Obj","PDFNet.Convert.TiffOutputOptions"]]);c.startsWith(".")||(c="."+c);b=v(b,!1);if("PDFNet.Convert.TiffOutputOptions"===
e.name){var m=e;e=a.ObjSet.create().then(function(a){return a.createFromJson(JSON.stringify(m))})}else e=Promise.resolve(e);return e.then(function(e){return a.messageHandler.sendWithPromise("convertFileToTiffWithBuffer",{in_filename:b,in_filename_extension:c,options:e.id},this.userPriority).then(function(a){return new Uint8Array(a)})})};a.Convert.toTiff=function(b,c,e){"undefined"===typeof e&&(e=new a.Obj("0"));d(arguments.length,2,"toTiff","(PDFNet.PDFDoc, string, PDFNet.Obj)",[[b,"PDFDoc"],[c,"string"],
[e,"OptionObject",a.Obj,"Obj","PDFNet.Convert.TiffOutputOptions"]]);if("PDFNet.Convert.TiffOutputOptions"===e.name){var m=e;e=a.ObjSet.create().then(function(a){return a.createFromJson(JSON.stringify(m))})}else e=Promise.resolve(e);return e.then(function(e){return a.messageHandler.sendWithPromise("convertToTiff",{in_pdfdoc:b.id,output_path:c,options:e.id},this.userPriority)})};a.Convert.toTiffBuffer=function(b,c){"undefined"===typeof c&&(c=new a.Obj("0"));d(arguments.length,1,"toTiffBuffer","(PDFNet.PDFDoc, PDFNet.Obj)",
[[b,"PDFDoc"],[c,"OptionObject",a.Obj,"Obj","PDFNet.Convert.TiffOutputOptions"]]);if("PDFNet.Convert.TiffOutputOptions"===c.name){var e=c;c=a.ObjSet.create().then(function(a){return a.createFromJson(JSON.stringify(e))})}else c=Promise.resolve(c);return c.then(function(c){return a.messageHandler.sendWithPromise("convertToTiffBuffer",{in_pdfdoc:b.id,options:c.id},this.userPriority).then(function(a){return new Uint8Array(a)})})};a.Date.init=function(b,c,e,m,f,g){d(arguments.length,6,"init","(number, number, number, number, number, number)",
[[b,"number"],[c,"number"],[e,"number"],[m,"number"],[f,"number"],[g,"number"]]);return a.messageHandler.sendWithPromise("dateInit",{year:b,month:c,day:e,hour:m,minute:f,second:g},this.userPriority).then(function(b){return new a.Date(b)})};a.Date.prototype.isValid=function(){l("isValid",this.yieldFunction);return a.messageHandler.sendWithPromise("Date.isValid",{date:this},this.userPriority)};a.Date.prototype.attach=function(b){d(arguments.length,1,"attach","(PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"]]);
l("attach",this.yieldFunction);var c=this;this.yieldFunction="Date.attach";return a.messageHandler.sendWithPromise("Date.attach",{date:this,d:b.id},this.userPriority).then(function(a){c.yieldFunction=void 0;p(a,c)})};a.Date.prototype.update=function(b){"undefined"===typeof b&&(b=new a.Obj("__null"));d(arguments.length,0,"update","(PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"]]);l("update",this.yieldFunction);var c=this;this.yieldFunction="Date.update";return a.messageHandler.sendWithPromise("Date.update",
{date:this,d:b.id},this.userPriority).then(function(a){c.yieldFunction=void 0;p(a.date,c);return a.result})};a.Destination.createXYZ=function(b,c,e,m){d(arguments.length,4,"createXYZ","(PDFNet.Page, number, number, number)",[[b,"Object",a.Page,"Page"],[c,"number"],[e,"number"],[m,"number"]]);return a.messageHandler.sendWithPromise("destinationCreateXYZ",{page:b.id,left:c,top:e,zoom:m},this.userPriority).then(function(b){return f(a.Destination,b)})};a.Destination.createFit=function(b){d(arguments.length,
1,"createFit","(PDFNet.Page)",[[b,"Object",a.Page,"Page"]]);return a.messageHandler.sendWithPromise("destinationCreateFit",{page:b.id},this.userPriority).then(function(b){return f(a.Destination,b)})};a.Destination.createFitH=function(b,c){d(arguments.length,2,"createFitH","(PDFNet.Page, number)",[[b,"Object",a.Page,"Page"],[c,"number"]]);return a.messageHandler.sendWithPromise("destinationCreateFitH",{page:b.id,top:c},this.userPriority).then(function(b){return f(a.Destination,b)})};a.Destination.createFitV=
function(b,c){d(arguments.length,2,"createFitV","(PDFNet.Page, number)",[[b,"Object",a.Page,"Page"],[c,"number"]]);return a.messageHandler.sendWithPromise("destinationCreateFitV",{page:b.id,left:c},this.userPriority).then(function(b){return f(a.Destination,b)})};a.Destination.createFitR=function(b,c,e,m,g){d(arguments.length,5,"createFitR","(PDFNet.Page, number, number, number, number)",[[b,"Object",a.Page,"Page"],[c,"number"],[e,"number"],[m,"number"],[g,"number"]]);return a.messageHandler.sendWithPromise("destinationCreateFitR",
{page:b.id,left:c,bottom:e,right:m,top:g},this.userPriority).then(function(b){return f(a.Destination,b)})};a.Destination.createFitB=function(b){d(arguments.length,1,"createFitB","(PDFNet.Page)",[[b,"Object",a.Page,"Page"]]);return a.messageHandler.sendWithPromise("destinationCreateFitB",{page:b.id},this.userPriority).then(function(b){return f(a.Destination,b)})};a.Destination.createFitBH=function(b,c){d(arguments.length,2,"createFitBH","(PDFNet.Page, number)",[[b,"Object",a.Page,"Page"],[c,"number"]]);
return a.messageHandler.sendWithPromise("destinationCreateFitBH",{page:b.id,top:c},this.userPriority).then(function(b){return f(a.Destination,b)})};a.Destination.createFitBV=function(b,c){d(arguments.length,2,"createFitBV","(PDFNet.Page, number)",[[b,"Object",a.Page,"Page"],[c,"number"]]);return a.messageHandler.sendWithPromise("destinationCreateFitBV",{page:b.id,left:c},this.userPriority).then(function(b){return f(a.Destination,b)})};a.Destination.create=function(b){d(arguments.length,1,"create",
"(PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("destinationCreate",{dest:b.id},this.userPriority).then(function(b){return f(a.Destination,b)})};a.Destination.prototype.copy=function(){return a.messageHandler.sendWithPromise("Destination.copy",{d:this.id},this.userPriority).then(function(b){return f(a.Destination,b)})};a.Destination.prototype.isValid=function(){return a.messageHandler.sendWithPromise("Destination.isValid",{dest:this.id},this.userPriority)};a.Destination.prototype.getFitType=
function(){return a.messageHandler.sendWithPromise("Destination.getFitType",{dest:this.id},this.userPriority)};a.Destination.prototype.getPage=function(){return a.messageHandler.sendWithPromise("Destination.getPage",{dest:this.id},this.userPriority).then(function(b){return f(a.Page,b)})};a.Destination.prototype.setPage=function(b){d(arguments.length,1,"setPage","(PDFNet.Page)",[[b,"Object",a.Page,"Page"]]);return a.messageHandler.sendWithPromise("Destination.setPage",{dest:this.id,page:b.id},this.userPriority)};
a.Destination.prototype.getSDFObj=function(){return a.messageHandler.sendWithPromise("Destination.getSDFObj",{dest:this.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.Destination.prototype.getExplicitDestObj=function(){return a.messageHandler.sendWithPromise("Destination.getExplicitDestObj",{dest:this.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.GState.prototype.getTransform=function(){return a.messageHandler.sendWithPromise("GState.getTransform",{gs:this.id},this.userPriority).then(function(b){return new a.Matrix2D(b)})};
a.GState.prototype.getStrokeColorSpace=function(){return a.messageHandler.sendWithPromise("GState.getStrokeColorSpace",{gs:this.id},this.userPriority).then(function(b){return k(a.ColorSpace,b)})};a.GState.prototype.getFillColorSpace=function(){return a.messageHandler.sendWithPromise("GState.getFillColorSpace",{gs:this.id},this.userPriority).then(function(b){return k(a.ColorSpace,b)})};a.GState.prototype.getStrokeColor=function(){return a.messageHandler.sendWithPromise("GState.getStrokeColor",{gs:this.id},
this.userPriority).then(function(b){return k(a.ColorPt,b)})};a.GState.prototype.getStrokePattern=function(){return a.messageHandler.sendWithPromise("GState.getStrokePattern",{gs:this.id},this.userPriority).then(function(b){return k(a.PatternColor,b)})};a.GState.prototype.getFillColor=function(){return a.messageHandler.sendWithPromise("GState.getFillColor",{gs:this.id},this.userPriority).then(function(b){return k(a.ColorPt,b)})};a.GState.prototype.getFillPattern=function(){return a.messageHandler.sendWithPromise("GState.getFillPattern",
{gs:this.id},this.userPriority).then(function(b){return k(a.PatternColor,b)})};a.GState.prototype.getFlatness=function(){return a.messageHandler.sendWithPromise("GState.getFlatness",{gs:this.id},this.userPriority)};a.GState.prototype.getLineCap=function(){return a.messageHandler.sendWithPromise("GState.getLineCap",{gs:this.id},this.userPriority)};a.GState.prototype.getLineJoin=function(){return a.messageHandler.sendWithPromise("GState.getLineJoin",{gs:this.id},this.userPriority)};a.GState.prototype.getLineWidth=
function(){return a.messageHandler.sendWithPromise("GState.getLineWidth",{gs:this.id},this.userPriority)};a.GState.prototype.getMiterLimit=function(){return a.messageHandler.sendWithPromise("GState.getMiterLimit",{gs:this.id},this.userPriority)};a.GState.prototype.getPhase=function(){return a.messageHandler.sendWithPromise("GState.getPhase",{gs:this.id},this.userPriority)};a.GState.prototype.getCharSpacing=function(){return a.messageHandler.sendWithPromise("GState.getCharSpacing",{gs:this.id},this.userPriority)};
a.GState.prototype.getWordSpacing=function(){return a.messageHandler.sendWithPromise("GState.getWordSpacing",{gs:this.id},this.userPriority)};a.GState.prototype.getHorizontalScale=function(){return a.messageHandler.sendWithPromise("GState.getHorizontalScale",{gs:this.id},this.userPriority)};a.GState.prototype.getLeading=function(){return a.messageHandler.sendWithPromise("GState.getLeading",{gs:this.id},this.userPriority)};a.GState.prototype.getFont=function(){return a.messageHandler.sendWithPromise("GState.getFont",
{gs:this.id},this.userPriority).then(function(b){return k(a.Font,b)})};a.GState.prototype.getFontSize=function(){return a.messageHandler.sendWithPromise("GState.getFontSize",{gs:this.id},this.userPriority)};a.GState.prototype.getTextRenderMode=function(){return a.messageHandler.sendWithPromise("GState.getTextRenderMode",{gs:this.id},this.userPriority)};a.GState.prototype.getTextRise=function(){return a.messageHandler.sendWithPromise("GState.getTextRise",{gs:this.id},this.userPriority)};a.GState.prototype.isTextKnockout=
function(){return a.messageHandler.sendWithPromise("GState.isTextKnockout",{gs:this.id},this.userPriority)};a.GState.prototype.getRenderingIntent=function(){return a.messageHandler.sendWithPromise("GState.getRenderingIntent",{gs:this.id},this.userPriority)};a.GState.getRenderingIntentType=function(b){d(arguments.length,1,"getRenderingIntentType","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("gStateGetRenderingIntentType",{name:b},this.userPriority)};a.GState.prototype.getBlendMode=
function(){return a.messageHandler.sendWithPromise("GState.getBlendMode",{gs:this.id},this.userPriority)};a.GState.prototype.getFillOpacity=function(){return a.messageHandler.sendWithPromise("GState.getFillOpacity",{gs:this.id},this.userPriority)};a.GState.prototype.getStrokeOpacity=function(){return a.messageHandler.sendWithPromise("GState.getStrokeOpacity",{gs:this.id},this.userPriority)};a.GState.prototype.getAISFlag=function(){return a.messageHandler.sendWithPromise("GState.getAISFlag",{gs:this.id},
this.userPriority)};a.GState.prototype.getSoftMask=function(){return a.messageHandler.sendWithPromise("GState.getSoftMask",{gs:this.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.GState.prototype.getSoftMaskTransform=function(){return a.messageHandler.sendWithPromise("GState.getSoftMaskTransform",{gs:this.id},this.userPriority).then(function(b){return new a.Matrix2D(b)})};a.GState.prototype.getStrokeOverprint=function(){return a.messageHandler.sendWithPromise("GState.getStrokeOverprint",
{gs:this.id},this.userPriority)};a.GState.prototype.getFillOverprint=function(){return a.messageHandler.sendWithPromise("GState.getFillOverprint",{gs:this.id},this.userPriority)};a.GState.prototype.getOverprintMode=function(){return a.messageHandler.sendWithPromise("GState.getOverprintMode",{gs:this.id},this.userPriority)};a.GState.prototype.getAutoStrokeAdjust=function(){return a.messageHandler.sendWithPromise("GState.getAutoStrokeAdjust",{gs:this.id},this.userPriority)};a.GState.prototype.getSmoothnessTolerance=
function(){return a.messageHandler.sendWithPromise("GState.getSmoothnessTolerance",{gs:this.id},this.userPriority)};a.GState.prototype.getTransferFunct=function(){return a.messageHandler.sendWithPromise("GState.getTransferFunct",{gs:this.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.GState.prototype.getBlackGenFunct=function(){return a.messageHandler.sendWithPromise("GState.getBlackGenFunct",{gs:this.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.GState.prototype.getUCRFunct=
function(){return a.messageHandler.sendWithPromise("GState.getUCRFunct",{gs:this.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.GState.prototype.getHalftone=function(){return a.messageHandler.sendWithPromise("GState.getHalftone",{gs:this.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.GState.prototype.setTransformMatrix=function(b){d(arguments.length,1,"setTransformMatrix","(PDFNet.Matrix2D)",[[b,"Structure",a.Matrix2D,"Matrix2D"]]);n("setTransformMatrix",[[b,0]]);return a.messageHandler.sendWithPromise("GState.setTransformMatrix",
{gs:this.id,mtx:b},this.userPriority)};a.GState.prototype.setTransform=function(b,c,e,m,f,g){d(arguments.length,6,"setTransform","(number, number, number, number, number, number)",[[b,"number"],[c,"number"],[e,"number"],[m,"number"],[f,"number"],[g,"number"]]);return a.messageHandler.sendWithPromise("GState.setTransform",{gs:this.id,a:b,b:c,c:e,d:m,h:f,v:g},this.userPriority)};a.GState.prototype.concatMatrix=function(b){d(arguments.length,1,"concatMatrix","(PDFNet.Matrix2D)",[[b,"Structure",a.Matrix2D,
"Matrix2D"]]);n("concatMatrix",[[b,0]]);return a.messageHandler.sendWithPromise("GState.concatMatrix",{gs:this.id,mtx:b},this.userPriority)};a.GState.prototype.concat=function(b,c,e,m,f,g){d(arguments.length,6,"concat","(number, number, number, number, number, number)",[[b,"number"],[c,"number"],[e,"number"],[m,"number"],[f,"number"],[g,"number"]]);return a.messageHandler.sendWithPromise("GState.concat",{gs:this.id,a:b,b:c,c:e,d:m,h:f,v:g},this.userPriority)};a.GState.prototype.setStrokeColorSpace=
function(b){d(arguments.length,1,"setStrokeColorSpace","(PDFNet.ColorSpace)",[[b,"Object",a.ColorSpace,"ColorSpace"]]);return a.messageHandler.sendWithPromise("GState.setStrokeColorSpace",{gs:this.id,cs:b.id},this.userPriority)};a.GState.prototype.setFillColorSpace=function(b){d(arguments.length,1,"setFillColorSpace","(PDFNet.ColorSpace)",[[b,"Object",a.ColorSpace,"ColorSpace"]]);return a.messageHandler.sendWithPromise("GState.setFillColorSpace",{gs:this.id,cs:b.id},this.userPriority)};a.GState.prototype.setStrokeColorWithColorPt=
function(b){d(arguments.length,1,"setStrokeColorWithColorPt","(PDFNet.ColorPt)",[[b,"Object",a.ColorPt,"ColorPt"]]);return a.messageHandler.sendWithPromise("GState.setStrokeColorWithColorPt",{gs:this.id,c:b.id},this.userPriority)};a.GState.prototype.setStrokeColorWithPattern=function(b){d(arguments.length,1,"setStrokeColorWithPattern","(PDFNet.PatternColor)",[[b,"Object",a.PatternColor,"PatternColor"]]);return a.messageHandler.sendWithPromise("GState.setStrokeColorWithPattern",{gs:this.id,pattern:b.id},
this.userPriority)};a.GState.prototype.setStrokeColor=function(b,c){d(arguments.length,2,"setStrokeColor","(PDFNet.PatternColor, PDFNet.ColorPt)",[[b,"Object",a.PatternColor,"PatternColor"],[c,"Object",a.ColorPt,"ColorPt"]]);return a.messageHandler.sendWithPromise("GState.setStrokeColor",{gs:this.id,pattern:b.id,c:c.id},this.userPriority)};a.GState.prototype.setFillColorWithColorPt=function(b){d(arguments.length,1,"setFillColorWithColorPt","(PDFNet.ColorPt)",[[b,"Object",a.ColorPt,"ColorPt"]]);return a.messageHandler.sendWithPromise("GState.setFillColorWithColorPt",
{gs:this.id,c:b.id},this.userPriority)};a.GState.prototype.setFillColorWithPattern=function(b){d(arguments.length,1,"setFillColorWithPattern","(PDFNet.PatternColor)",[[b,"Object",a.PatternColor,"PatternColor"]]);return a.messageHandler.sendWithPromise("GState.setFillColorWithPattern",{gs:this.id,pattern:b.id},this.userPriority)};a.GState.prototype.setFillColor=function(b,c){d(arguments.length,2,"setFillColor","(PDFNet.PatternColor, PDFNet.ColorPt)",[[b,"Object",a.PatternColor,"PatternColor"],[c,"Object",
a.ColorPt,"ColorPt"]]);return a.messageHandler.sendWithPromise("GState.setFillColor",{gs:this.id,pattern:b.id,c:c.id},this.userPriority)};a.GState.prototype.setFlatness=function(b){d(arguments.length,1,"setFlatness","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("GState.setFlatness",{gs:this.id,flatness:b},this.userPriority)};a.GState.prototype.setLineCap=function(b){d(arguments.length,1,"setLineCap","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("GState.setLineCap",
{gs:this.id,cap:b},this.userPriority)};a.GState.prototype.setLineJoin=function(b){d(arguments.length,1,"setLineJoin","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("GState.setLineJoin",{gs:this.id,join:b},this.userPriority)};a.GState.prototype.setLineWidth=function(b){d(arguments.length,1,"setLineWidth","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("GState.setLineWidth",{gs:this.id,width:b},this.userPriority)};a.GState.prototype.setMiterLimit=function(b){d(arguments.length,
1,"setMiterLimit","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("GState.setMiterLimit",{gs:this.id,miter_limit:b},this.userPriority)};a.GState.prototype.setDashPattern=function(b,c){d(arguments.length,2,"setDashPattern","(Array<number>, number)",[[b,"Array"],[c,"number"]]);return a.messageHandler.sendWithPromise("GState.setDashPattern",{gs:this.id,dash_array:b,phase:c},this.userPriority)};a.GState.prototype.setCharSpacing=function(b){d(arguments.length,1,"setCharSpacing","(number)",
[[b,"number"]]);return a.messageHandler.sendWithPromise("GState.setCharSpacing",{gs:this.id,char_spacing:b},this.userPriority)};a.GState.prototype.setWordSpacing=function(b){d(arguments.length,1,"setWordSpacing","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("GState.setWordSpacing",{gs:this.id,word_spacing:b},this.userPriority)};a.GState.prototype.setHorizontalScale=function(b){d(arguments.length,1,"setHorizontalScale","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("GState.setHorizontalScale",
{gs:this.id,hscale:b},this.userPriority)};a.GState.prototype.setLeading=function(b){d(arguments.length,1,"setLeading","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("GState.setLeading",{gs:this.id,leading:b},this.userPriority)};a.GState.prototype.setFont=function(b,c){d(arguments.length,2,"setFont","(PDFNet.Font, number)",[[b,"Object",a.Font,"Font"],[c,"number"]]);return a.messageHandler.sendWithPromise("GState.setFont",{gs:this.id,font:b.id,font_sz:c},this.userPriority)};a.GState.prototype.setTextRenderMode=
function(b){d(arguments.length,1,"setTextRenderMode","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("GState.setTextRenderMode",{gs:this.id,rmode:b},this.userPriority)};a.GState.prototype.setTextRise=function(b){d(arguments.length,1,"setTextRise","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("GState.setTextRise",{gs:this.id,rise:b},this.userPriority)};a.GState.prototype.setTextKnockout=function(b){d(arguments.length,1,"setTextKnockout","(boolean)",[[b,"boolean"]]);
return a.messageHandler.sendWithPromise("GState.setTextKnockout",{gs:this.id,knockout:b},this.userPriority)};a.GState.prototype.setRenderingIntent=function(b){d(arguments.length,1,"setRenderingIntent","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("GState.setRenderingIntent",{gs:this.id,intent:b},this.userPriority)};a.GState.prototype.setBlendMode=function(b){d(arguments.length,1,"setBlendMode","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("GState.setBlendMode",
{gs:this.id,BM:b},this.userPriority)};a.GState.prototype.setFillOpacity=function(b){d(arguments.length,1,"setFillOpacity","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("GState.setFillOpacity",{gs:this.id,ca:b},this.userPriority)};a.GState.prototype.setStrokeOpacity=function(b){d(arguments.length,1,"setStrokeOpacity","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("GState.setStrokeOpacity",{gs:this.id,ca:b},this.userPriority)};a.GState.prototype.setAISFlag=function(b){d(arguments.length,
1,"setAISFlag","(boolean)",[[b,"boolean"]]);return a.messageHandler.sendWithPromise("GState.setAISFlag",{gs:this.id,AIS:b},this.userPriority)};a.GState.prototype.setSoftMask=function(b){d(arguments.length,1,"setSoftMask","(PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("GState.setSoftMask",{gs:this.id,SM:b.id},this.userPriority)};a.GState.prototype.setStrokeOverprint=function(b){d(arguments.length,1,"setStrokeOverprint","(boolean)",[[b,"boolean"]]);return a.messageHandler.sendWithPromise("GState.setStrokeOverprint",
{gs:this.id,OP:b},this.userPriority)};a.GState.prototype.setFillOverprint=function(b){d(arguments.length,1,"setFillOverprint","(boolean)",[[b,"boolean"]]);return a.messageHandler.sendWithPromise("GState.setFillOverprint",{gs:this.id,op:b},this.userPriority)};a.GState.prototype.setOverprintMode=function(b){d(arguments.length,1,"setOverprintMode","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("GState.setOverprintMode",{gs:this.id,OPM:b},this.userPriority)};a.GState.prototype.setAutoStrokeAdjust=
function(b){d(arguments.length,1,"setAutoStrokeAdjust","(boolean)",[[b,"boolean"]]);return a.messageHandler.sendWithPromise("GState.setAutoStrokeAdjust",{gs:this.id,SA:b},this.userPriority)};a.GState.prototype.setSmoothnessTolerance=function(b){d(arguments.length,1,"setSmoothnessTolerance","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("GState.setSmoothnessTolerance",{gs:this.id,SM:b},this.userPriority)};a.GState.prototype.setBlackGenFunct=function(b){d(arguments.length,1,"setBlackGenFunct",
"(PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("GState.setBlackGenFunct",{gs:this.id,BG:b.id},this.userPriority)};a.GState.prototype.setUCRFunct=function(b){d(arguments.length,1,"setUCRFunct","(PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("GState.setUCRFunct",{gs:this.id,UCR:b.id},this.userPriority)};a.GState.prototype.setTransferFunct=function(b){d(arguments.length,1,"setTransferFunct","(PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"]]);
return a.messageHandler.sendWithPromise("GState.setTransferFunct",{gs:this.id,TR:b.id},this.userPriority)};a.GState.prototype.setHalftone=function(b){d(arguments.length,1,"setHalftone","(PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("GState.setHalftone",{gs:this.id,HT:b.id},this.userPriority)};a.Element.prototype.getType=function(){return a.messageHandler.sendWithPromise("Element.getType",{e:this.id},this.userPriority)};a.Element.prototype.getGState=function(){return a.messageHandler.sendWithPromise("Element.getGState",
{e:this.id},this.userPriority).then(function(b){return f(a.GState,b)})};a.Element.prototype.getCTM=function(){return a.messageHandler.sendWithPromise("Element.getCTM",{e:this.id},this.userPriority).then(function(b){return new a.Matrix2D(b)})};a.Element.prototype.getParentStructElement=function(){return a.messageHandler.sendWithPromise("Element.getParentStructElement",{e:this.id},this.userPriority).then(function(b){return new a.SElement(b)})};a.Element.prototype.getStructMCID=function(){return a.messageHandler.sendWithPromise("Element.getStructMCID",
{e:this.id},this.userPriority)};a.Element.prototype.isOCVisible=function(){return a.messageHandler.sendWithPromise("Element.isOCVisible",{e:this.id},this.userPriority)};a.Element.prototype.isClippingPath=function(){return a.messageHandler.sendWithPromise("Element.isClippingPath",{e:this.id},this.userPriority)};a.Element.prototype.isStroked=function(){return a.messageHandler.sendWithPromise("Element.isStroked",{e:this.id},this.userPriority)};a.Element.prototype.isFilled=function(){return a.messageHandler.sendWithPromise("Element.isFilled",
{e:this.id},this.userPriority)};a.Element.prototype.isWindingFill=function(){return a.messageHandler.sendWithPromise("Element.isWindingFill",{e:this.id},this.userPriority)};a.Element.prototype.isClipWindingFill=function(){return a.messageHandler.sendWithPromise("Element.isClipWindingFill",{e:this.id},this.userPriority)};a.Element.prototype.setPathClip=function(b){d(arguments.length,1,"setPathClip","(boolean)",[[b,"boolean"]]);return a.messageHandler.sendWithPromise("Element.setPathClip",{e:this.id,
clip:b},this.userPriority)};a.Element.prototype.setPathStroke=function(b){d(arguments.length,1,"setPathStroke","(boolean)",[[b,"boolean"]]);return a.messageHandler.sendWithPromise("Element.setPathStroke",{e:this.id,stroke:b},this.userPriority)};a.Element.prototype.setPathFill=function(b){d(arguments.length,1,"setPathFill","(boolean)",[[b,"boolean"]]);return a.messageHandler.sendWithPromise("Element.setPathFill",{e:this.id,fill:b},this.userPriority)};a.Element.prototype.setWindingFill=function(b){d(arguments.length,
1,"setWindingFill","(boolean)",[[b,"boolean"]]);return a.messageHandler.sendWithPromise("Element.setWindingFill",{e:this.id,winding_rule:b},this.userPriority)};a.Element.prototype.setClipWindingFill=function(b){d(arguments.length,1,"setClipWindingFill","(boolean)",[[b,"boolean"]]);return a.messageHandler.sendWithPromise("Element.setClipWindingFill",{e:this.id,winding_rule:b},this.userPriority)};a.Element.prototype.setPathTypes=function(b,c){d(arguments.length,2,"setPathTypes","(string, number)",[[b,
"string"],[c,"number"]]);return a.messageHandler.sendWithPromise("Element.setPathTypes",{e:this.id,in_seg_types:b,count:c},this.userPriority)};a.Element.prototype.getXObject=function(){return a.messageHandler.sendWithPromise("Element.getXObject",{e:this.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.Element.prototype.getImageData=function(){return a.messageHandler.sendWithPromise("Element.getImageData",{e:this.id},this.userPriority).then(function(b){return f(a.Filter,b)})};a.Element.prototype.getImageDataSize=
function(){return a.messageHandler.sendWithPromise("Element.getImageDataSize",{e:this.id},this.userPriority)};a.Element.prototype.getImageColorSpace=function(){return a.messageHandler.sendWithPromise("Element.getImageColorSpace",{e:this.id},this.userPriority).then(function(b){return k(a.ColorSpace,b)})};a.Element.prototype.getImageWidth=function(){return a.messageHandler.sendWithPromise("Element.getImageWidth",{e:this.id},this.userPriority)};a.Element.prototype.getImageHeight=function(){return a.messageHandler.sendWithPromise("Element.getImageHeight",
{e:this.id},this.userPriority)};a.Element.prototype.getDecodeArray=function(){return a.messageHandler.sendWithPromise("Element.getDecodeArray",{e:this.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.Element.prototype.getBitsPerComponent=function(){return a.messageHandler.sendWithPromise("Element.getBitsPerComponent",{e:this.id},this.userPriority)};a.Element.prototype.getComponentNum=function(){return a.messageHandler.sendWithPromise("Element.getComponentNum",{e:this.id},this.userPriority)};
a.Element.prototype.isImageMask=function(){return a.messageHandler.sendWithPromise("Element.isImageMask",{e:this.id},this.userPriority)};a.Element.prototype.isImageInterpolate=function(){return a.messageHandler.sendWithPromise("Element.isImageInterpolate",{e:this.id},this.userPriority)};a.Element.prototype.getMask=function(){return a.messageHandler.sendWithPromise("Element.getMask",{e:this.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.Element.prototype.getImageRenderingIntent=function(){return a.messageHandler.sendWithPromise("Element.getImageRenderingIntent",
{e:this.id},this.userPriority)};a.Element.prototype.getTextString=function(){return a.messageHandler.sendWithPromise("Element.getTextString",{e:this.id},this.userPriority)};a.Element.prototype.getTextMatrix=function(){return a.messageHandler.sendWithPromise("Element.getTextMatrix",{e:this.id},this.userPriority).then(function(b){return new a.Matrix2D(b)})};a.Element.prototype.getCharIterator=function(){return a.messageHandler.sendWithPromise("Element.getCharIterator",{e:this.id},this.userPriority).then(function(b){return k(a.Iterator,
b,"CharData")})};a.Element.prototype.getTextLength=function(){return a.messageHandler.sendWithPromise("Element.getTextLength",{e:this.id},this.userPriority)};a.Element.prototype.getPosAdjustment=function(){return a.messageHandler.sendWithPromise("Element.getPosAdjustment",{e:this.id},this.userPriority)};a.Element.prototype.getNewTextLineOffset=function(){return a.messageHandler.sendWithPromise("Element.getNewTextLineOffset",{e:this.id},this.userPriority)};a.Element.prototype.hasTextMatrix=function(){return a.messageHandler.sendWithPromise("Element.hasTextMatrix",
{e:this.id},this.userPriority)};a.Element.prototype.setTextData=function(b){d(arguments.length,1,"setTextData","(ArrayBuffer|TypedArray)",[[b,"ArrayBuffer"]]);var c=v(b,!1);return a.messageHandler.sendWithPromise("Element.setTextData",{e:this.id,buf_text_data:c},this.userPriority)};a.Element.prototype.setTextMatrix=function(b){d(arguments.length,1,"setTextMatrix","(PDFNet.Matrix2D)",[[b,"Structure",a.Matrix2D,"Matrix2D"]]);n("setTextMatrix",[[b,0]]);return a.messageHandler.sendWithPromise("Element.setTextMatrix",
{e:this.id,mtx:b},this.userPriority)};a.Element.prototype.setTextMatrixEntries=function(b,c,e,m,f,g){d(arguments.length,6,"setTextMatrixEntries","(number, number, number, number, number, number)",[[b,"number"],[c,"number"],[e,"number"],[m,"number"],[f,"number"],[g,"number"]]);return a.messageHandler.sendWithPromise("Element.setTextMatrixEntries",{e:this.id,a:b,b:c,c:e,d:m,h:f,v:g},this.userPriority)};a.Element.prototype.setPosAdjustment=function(b){d(arguments.length,1,"setPosAdjustment","(number)",
[[b,"number"]]);return a.messageHandler.sendWithPromise("Element.setPosAdjustment",{e:this.id,adjust:b},this.userPriority)};a.Element.prototype.updateTextMetrics=function(){return a.messageHandler.sendWithPromise("Element.updateTextMetrics",{e:this.id},this.userPriority)};a.Element.prototype.setNewTextLineOffset=function(b,c){d(arguments.length,2,"setNewTextLineOffset","(number, number)",[[b,"number"],[c,"number"]]);return a.messageHandler.sendWithPromise("Element.setNewTextLineOffset",{e:this.id,
dx:b,dy:c},this.userPriority)};a.Element.prototype.getShading=function(){return a.messageHandler.sendWithPromise("Element.getShading",{e:this.id},this.userPriority).then(function(b){return k(a.Shading,b)})};a.Element.prototype.getMCPropertyDict=function(){return a.messageHandler.sendWithPromise("Element.getMCPropertyDict",{e:this.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.Element.prototype.getMCTag=function(){return a.messageHandler.sendWithPromise("Element.getMCTag",{e:this.id},
this.userPriority).then(function(b){return f(a.Obj,b)})};a.ShapedText.prototype.getScale=function(){return a.messageHandler.sendWithPromise("ShapedText.getScale",{self:this.id},this.userPriority)};a.ShapedText.prototype.getShapingStatus=function(){return a.messageHandler.sendWithPromise("ShapedText.getShapingStatus",{self:this.id},this.userPriority)};a.ShapedText.prototype.getFailureReason=function(){return a.messageHandler.sendWithPromise("ShapedText.getFailureReason",{self:this.id},this.userPriority)};
a.ShapedText.prototype.getText=function(){return a.messageHandler.sendWithPromise("ShapedText.getText",{self:this.id},this.userPriority)};a.ShapedText.prototype.getNumGlyphs=function(){return a.messageHandler.sendWithPromise("ShapedText.getNumGlyphs",{self:this.id},this.userPriority)};a.ShapedText.prototype.getGlyph=function(b){d(arguments.length,1,"getGlyph","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("ShapedText.getGlyph",{self:this.id,index:b},this.userPriority)};a.ShapedText.prototype.getGlyphXPos=
function(b){d(arguments.length,1,"getGlyphXPos","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("ShapedText.getGlyphXPos",{self:this.id,index:b},this.userPriority)};a.ShapedText.prototype.getGlyphYPos=function(b){d(arguments.length,1,"getGlyphYPos","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("ShapedText.getGlyphYPos",{self:this.id,index:b},this.userPriority)};a.ElementBuilder.create=function(){return a.messageHandler.sendWithPromise("elementBuilderCreate",
{},this.userPriority).then(function(b){return k(a.ElementBuilder,b)})};a.ElementBuilder.prototype.reset=function(b){"undefined"===typeof b&&(b=new a.GState("0"));d(arguments.length,0,"reset","(PDFNet.GState)",[[b,"Object",a.GState,"GState"]]);return a.messageHandler.sendWithPromise("ElementBuilder.reset",{b:this.id,gs:b.id},this.userPriority)};a.ElementBuilder.prototype.createImage=function(b){d(arguments.length,1,"createImage","(PDFNet.Image)",[[b,"Object",a.Image,"Image"]]);return a.messageHandler.sendWithPromise("ElementBuilder.createImage",
{b:this.id,img:b.id},this.userPriority).then(function(b){return f(a.Element,b)})};a.ElementBuilder.prototype.createImageFromMatrix=function(b,c){d(arguments.length,2,"createImageFromMatrix","(PDFNet.Image, PDFNet.Matrix2D)",[[b,"Object",a.Image,"Image"],[c,"Structure",a.Matrix2D,"Matrix2D"]]);n("createImageFromMatrix",[[c,1]]);return a.messageHandler.sendWithPromise("ElementBuilder.createImageFromMatrix",{b:this.id,img:b.id,mtx:c},this.userPriority).then(function(b){return f(a.Element,b)})};a.ElementBuilder.prototype.createImageScaled=
function(b,c,e,m,g){d(arguments.length,5,"createImageScaled","(PDFNet.Image, number, number, number, number)",[[b,"Object",a.Image,"Image"],[c,"number"],[e,"number"],[m,"number"],[g,"number"]]);return a.messageHandler.sendWithPromise("ElementBuilder.createImageScaled",{b:this.id,img:b.id,x:c,y:e,hscale:m,vscale:g},this.userPriority).then(function(b){return f(a.Element,b)})};a.ElementBuilder.prototype.createGroupBegin=function(){return a.messageHandler.sendWithPromise("ElementBuilder.createGroupBegin",
{b:this.id},this.userPriority).then(function(b){return f(a.Element,b)})};a.ElementBuilder.prototype.createGroupEnd=function(){return a.messageHandler.sendWithPromise("ElementBuilder.createGroupEnd",{b:this.id},this.userPriority).then(function(b){return f(a.Element,b)})};a.ElementBuilder.prototype.createShading=function(b){d(arguments.length,1,"createShading","(PDFNet.Shading)",[[b,"Object",a.Shading,"Shading"]]);return a.messageHandler.sendWithPromise("ElementBuilder.createShading",{b:this.id,sh:b.id},
this.userPriority).then(function(b){return f(a.Element,b)})};a.ElementBuilder.prototype.createFormFromStream=function(b){d(arguments.length,1,"createFormFromStream","(PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("ElementBuilder.createFormFromStream",{b:this.id,form:b.id},this.userPriority).then(function(b){return f(a.Element,b)})};a.ElementBuilder.prototype.createFormFromPage=function(b){d(arguments.length,1,"createFormFromPage","(PDFNet.Page)",[[b,"Object",a.Page,
"Page"]]);return a.messageHandler.sendWithPromise("ElementBuilder.createFormFromPage",{b:this.id,page:b.id},this.userPriority).then(function(b){return f(a.Element,b)})};a.ElementBuilder.prototype.createFormFromDoc=function(b,c){d(arguments.length,2,"createFormFromDoc","(PDFNet.Page, PDFNet.PDFDoc)",[[b,"Object",a.Page,"Page"],[c,"PDFDoc"]]);return a.messageHandler.sendWithPromise("ElementBuilder.createFormFromDoc",{b:this.id,page:b.id,doc:c.id},this.userPriority).then(function(b){return f(a.Element,
b)})};a.ElementBuilder.prototype.createTextBeginWithFont=function(b,c){d(arguments.length,2,"createTextBeginWithFont","(PDFNet.Font, number)",[[b,"Object",a.Font,"Font"],[c,"number"]]);return a.messageHandler.sendWithPromise("ElementBuilder.createTextBeginWithFont",{b:this.id,font:b.id,font_sz:c},this.userPriority).then(function(b){return f(a.Element,b)})};a.ElementBuilder.prototype.createTextBegin=function(){return a.messageHandler.sendWithPromise("ElementBuilder.createTextBegin",{b:this.id},this.userPriority).then(function(b){return f(a.Element,
b)})};a.ElementBuilder.prototype.createTextEnd=function(){return a.messageHandler.sendWithPromise("ElementBuilder.createTextEnd",{b:this.id},this.userPriority).then(function(b){return f(a.Element,b)})};a.ElementBuilder.prototype.createTextRun=function(b,c,e){d(arguments.length,3,"createTextRun","(string, PDFNet.Font, number)",[[b,"string"],[c,"Object",a.Font,"Font"],[e,"number"]]);return a.messageHandler.sendWithPromise("ElementBuilder.createTextRun",{b:this.id,text_data:b,font:c.id,font_sz:e},this.userPriority).then(function(b){return f(a.Element,
b)})};a.ElementBuilder.prototype.createTextRunWithSize=function(b,c,e,m){d(arguments.length,4,"createTextRunWithSize","(string, number, PDFNet.Font, number)",[[b,"string"],[c,"number"],[e,"Object",a.Font,"Font"],[m,"number"]]);return a.messageHandler.sendWithPromise("ElementBuilder.createTextRunWithSize",{b:this.id,text_data:b,text_data_sz:c,font:e.id,font_sz:m},this.userPriority).then(function(b){return f(a.Element,b)})};a.ElementBuilder.prototype.createTextRunUnsigned=function(b,c,e){d(arguments.length,
3,"createTextRunUnsigned","(string, PDFNet.Font, number)",[[b,"string"],[c,"Object",a.Font,"Font"],[e,"number"]]);return a.messageHandler.sendWithPromise("ElementBuilder.createTextRunUnsigned",{b:this.id,text_data:b,font:c.id,font_sz:e},this.userPriority).then(function(b){return f(a.Element,b)})};a.ElementBuilder.prototype.createNewTextRun=function(b){d(arguments.length,1,"createNewTextRun","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("ElementBuilder.createNewTextRun",{b:this.id,
text_data:b},this.userPriority).then(function(b){return f(a.Element,b)})};a.ElementBuilder.prototype.createNewTextRunWithSize=function(b,c){d(arguments.length,2,"createNewTextRunWithSize","(string, number)",[[b,"string"],[c,"number"]]);return a.messageHandler.sendWithPromise("ElementBuilder.createNewTextRunWithSize",{b:this.id,text_data:b,text_data_sz:c},this.userPriority).then(function(b){return f(a.Element,b)})};a.ElementBuilder.prototype.createNewTextRunUnsigned=function(b){d(arguments.length,
1,"createNewTextRunUnsigned","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("ElementBuilder.createNewTextRunUnsigned",{b:this.id,text_data:b},this.userPriority).then(function(b){return f(a.Element,b)})};a.ElementBuilder.prototype.createShapedTextRun=function(b){d(arguments.length,1,"createShapedTextRun","(PDFNet.ShapedText)",[[b,"Object",a.ShapedText,"ShapedText"]]);return a.messageHandler.sendWithPromise("ElementBuilder.createShapedTextRun",{b:this.id,text_data:b.id},this.userPriority).then(function(b){return f(a.Element,
b)})};a.ElementBuilder.prototype.createTextNewLineWithOffset=function(b,c){d(arguments.length,2,"createTextNewLineWithOffset","(number, number)",[[b,"number"],[c,"number"]]);return a.messageHandler.sendWithPromise("ElementBuilder.createTextNewLineWithOffset",{b:this.id,dx:b,dy:c},this.userPriority).then(function(b){return f(a.Element,b)})};a.ElementBuilder.prototype.createTextNewLine=function(){return a.messageHandler.sendWithPromise("ElementBuilder.createTextNewLine",{b:this.id},this.userPriority).then(function(b){return f(a.Element,
b)})};a.ElementBuilder.prototype.createPath=function(b,c){d(arguments.length,2,"createPath","(Array<number>, ArrayBuffer|TypedArray)",[[b,"Array"],[c,"ArrayBuffer"]]);var e=v(c,!1);return a.messageHandler.sendWithPromise("ElementBuilder.createPath",{b:this.id,points_list:b,buf_seg_types:e},this.userPriority).then(function(b){return f(a.Element,b)})};a.ElementBuilder.prototype.createRect=function(b,c,e,m){d(arguments.length,4,"createRect","(number, number, number, number)",[[b,"number"],[c,"number"],
[e,"number"],[m,"number"]]);return a.messageHandler.sendWithPromise("ElementBuilder.createRect",{b:this.id,x:b,y:c,width:e,height:m},this.userPriority).then(function(b){return f(a.Element,b)})};a.ElementBuilder.prototype.createEllipse=function(b,c,e,m){d(arguments.length,4,"createEllipse","(number, number, number, number)",[[b,"number"],[c,"number"],[e,"number"],[m,"number"]]);return a.messageHandler.sendWithPromise("ElementBuilder.createEllipse",{b:this.id,x:b,y:c,width:e,height:m},this.userPriority).then(function(b){return f(a.Element,
b)})};a.ElementBuilder.prototype.pathBegin=function(){return a.messageHandler.sendWithPromise("ElementBuilder.pathBegin",{b:this.id},this.userPriority)};a.ElementBuilder.prototype.pathEnd=function(){return a.messageHandler.sendWithPromise("ElementBuilder.pathEnd",{b:this.id},this.userPriority).then(function(b){return f(a.Element,b)})};a.ElementBuilder.prototype.rect=function(b,c,e,m){d(arguments.length,4,"rect","(number, number, number, number)",[[b,"number"],[c,"number"],[e,"number"],[m,"number"]]);
return a.messageHandler.sendWithPromise("ElementBuilder.rect",{b:this.id,x:b,y:c,width:e,height:m},this.userPriority)};a.ElementBuilder.prototype.ellipse=function(b,c,e,m){d(arguments.length,4,"ellipse","(number, number, number, number)",[[b,"number"],[c,"number"],[e,"number"],[m,"number"]]);return a.messageHandler.sendWithPromise("ElementBuilder.ellipse",{b:this.id,x:b,y:c,width:e,height:m},this.userPriority)};a.ElementBuilder.prototype.moveTo=function(b,c){d(arguments.length,2,"moveTo","(number, number)",
[[b,"number"],[c,"number"]]);return a.messageHandler.sendWithPromise("ElementBuilder.moveTo",{b:this.id,x:b,y:c},this.userPriority)};a.ElementBuilder.prototype.lineTo=function(b,c){d(arguments.length,2,"lineTo","(number, number)",[[b,"number"],[c,"number"]]);return a.messageHandler.sendWithPromise("ElementBuilder.lineTo",{b:this.id,x:b,y:c},this.userPriority)};a.ElementBuilder.prototype.curveTo=function(b,c,e,m,f,g){d(arguments.length,6,"curveTo","(number, number, number, number, number, number)",
[[b,"number"],[c,"number"],[e,"number"],[m,"number"],[f,"number"],[g,"number"]]);return a.messageHandler.sendWithPromise("ElementBuilder.curveTo",{b:this.id,cx1:b,cy1:c,cx2:e,cy2:m,x2:f,y2:g},this.userPriority)};a.ElementBuilder.prototype.arcTo=function(b,c,e,m,f,g){d(arguments.length,6,"arcTo","(number, number, number, number, number, number)",[[b,"number"],[c,"number"],[e,"number"],[m,"number"],[f,"number"],[g,"number"]]);return a.messageHandler.sendWithPromise("ElementBuilder.arcTo",{b:this.id,
x:b,y:c,width:e,height:m,start:f,extent:g},this.userPriority)};a.ElementBuilder.prototype.arcTo2=function(b,c,e,m,f,g,h){d(arguments.length,7,"arcTo2","(number, number, number, boolean, boolean, number, number)",[[b,"number"],[c,"number"],[e,"number"],[m,"boolean"],[f,"boolean"],[g,"number"],[h,"number"]]);return a.messageHandler.sendWithPromise("ElementBuilder.arcTo2",{b:this.id,xr:b,yr:c,rx:e,isLargeArc:m,sweep:f,endX:g,endY:h},this.userPriority)};a.ElementBuilder.prototype.closePath=function(){return a.messageHandler.sendWithPromise("ElementBuilder.closePath",
{b:this.id},this.userPriority)};a.ElementBuilder.prototype.createMarkedContentBeginInlineProperties=function(b){d(arguments.length,1,"createMarkedContentBeginInlineProperties","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("ElementBuilder.createMarkedContentBeginInlineProperties",{b:this.id,tag:b},this.userPriority).then(function(b){return f(a.Element,b)})};a.ElementBuilder.prototype.createMarkedContentBegin=function(b,c){d(arguments.length,2,"createMarkedContentBegin","(string, PDFNet.Obj)",
[[b,"string"],[c,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("ElementBuilder.createMarkedContentBegin",{b:this.id,tag:b,property_dict:c.id},this.userPriority).then(function(b){return f(a.Element,b)})};a.ElementBuilder.prototype.createMarkedContentEnd=function(){return a.messageHandler.sendWithPromise("ElementBuilder.createMarkedContentEnd",{b:this.id},this.userPriority).then(function(b){return f(a.Element,b)})};a.ElementBuilder.prototype.createMarkedContentPointInlineProperties=
function(b){d(arguments.length,1,"createMarkedContentPointInlineProperties","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("ElementBuilder.createMarkedContentPointInlineProperties",{b:this.id,tag:b},this.userPriority).then(function(b){return f(a.Element,b)})};a.ElementBuilder.prototype.createMarkedContentPoint=function(b,c){d(arguments.length,2,"createMarkedContentPoint","(string, PDFNet.Obj)",[[b,"string"],[c,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("ElementBuilder.createMarkedContentPoint",
{b:this.id,tag:b,property_dict:c.id},this.userPriority).then(function(b){return f(a.Element,b)})};a.ElementReader.create=function(){return a.messageHandler.sendWithPromise("elementReaderCreate",{},this.userPriority).then(function(b){return k(a.ElementReader,b)})};a.ElementReader.prototype.beginOnPage=function(b,c){"undefined"===typeof c&&(c=new a.OCGContext("0"));d(arguments.length,1,"beginOnPage","(PDFNet.Page, PDFNet.OCGContext)",[[b,"Object",a.Page,"Page"],[c,"Object",a.OCGContext,"OCGContext"]]);
return a.messageHandler.sendWithPromise("ElementReader.beginOnPage",{r:this.id,page:b.id,ctx:c.id},this.userPriority)};a.ElementReader.prototype.begin=function(b,c,e){"undefined"===typeof c&&(c=new a.Obj("0"));"undefined"===typeof e&&(e=new a.OCGContext("0"));d(arguments.length,1,"begin","(PDFNet.Obj, PDFNet.Obj, PDFNet.OCGContext)",[[b,"Object",a.Obj,"Obj"],[c,"Object",a.Obj,"Obj"],[e,"Object",a.OCGContext,"OCGContext"]]);return a.messageHandler.sendWithPromise("ElementReader.begin",{r:this.id,content_stream:b.id,
resource_dict:c.id,ctx:e.id},this.userPriority)};a.ElementReader.prototype.appendResource=function(b){d(arguments.length,1,"appendResource","(PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("ElementReader.appendResource",{r:this.id,res:b.id},this.userPriority)};a.ElementReader.prototype.next=function(){return a.messageHandler.sendWithPromise("ElementReader.next",{r:this.id},this.userPriority).then(function(b){return f(a.Element,b)})};a.ElementReader.prototype.current=
function(){return a.messageHandler.sendWithPromise("ElementReader.current",{r:this.id},this.userPriority).then(function(b){return f(a.Element,b)})};a.ElementReader.prototype.formBegin=function(){return a.messageHandler.sendWithPromise("ElementReader.formBegin",{r:this.id},this.userPriority)};a.ElementReader.prototype.patternBegin=function(b,c){"undefined"===typeof c&&(c=!1);d(arguments.length,1,"patternBegin","(boolean, boolean)",[[b,"boolean"],[c,"boolean"]]);return a.messageHandler.sendWithPromise("ElementReader.patternBegin",
{r:this.id,fill_pattern:b,reset_ctm_tfm:c},this.userPriority)};a.ElementReader.prototype.type3FontBegin=function(b,c){"undefined"===typeof c&&(c=new a.Obj("0"));d(arguments.length,1,"type3FontBegin","(PDFNet.CharData, PDFNet.Obj)",[[b,"Structure",a.CharData,"CharData"],[c,"Object",a.Obj,"Obj"]]);n("type3FontBegin",[[b,0]]);b.yieldFunction="ElementReader.type3FontBegin";return a.messageHandler.sendWithPromise("ElementReader.type3FontBegin",{r:this.id,char_data:b,resource_dict:c.id},this.userPriority).then(function(a){b.yieldFunction=
void 0;p(a,b)})};a.ElementReader.prototype.end=function(){return a.messageHandler.sendWithPromise("ElementReader.end",{r:this.id},this.userPriority)};a.ElementReader.prototype.getChangesIterator=function(){return a.messageHandler.sendWithPromise("ElementReader.getChangesIterator",{r:this.id},this.userPriority).then(function(b){return k(a.Iterator,b,"Int")})};a.ElementReader.prototype.isChanged=function(b){d(arguments.length,1,"isChanged","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("ElementReader.isChanged",
{r:this.id,attrib:b},this.userPriority)};a.ElementReader.prototype.clearChangeList=function(){return a.messageHandler.sendWithPromise("ElementReader.clearChangeList",{r:this.id},this.userPriority)};a.ElementReader.prototype.getFont=function(b){d(arguments.length,1,"getFont","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("ElementReader.getFont",{r:this.id,name:b},this.userPriority).then(function(b){return f(a.Obj,b)})};a.ElementReader.prototype.getXObject=function(b){d(arguments.length,
1,"getXObject","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("ElementReader.getXObject",{r:this.id,name:b},this.userPriority).then(function(b){return f(a.Obj,b)})};a.ElementReader.prototype.getShading=function(b){d(arguments.length,1,"getShading","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("ElementReader.getShading",{r:this.id,name:b},this.userPriority).then(function(b){return f(a.Obj,b)})};a.ElementReader.prototype.getColorSpace=function(b){d(arguments.length,
1,"getColorSpace","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("ElementReader.getColorSpace",{r:this.id,name:b},this.userPriority).then(function(b){return f(a.Obj,b)})};a.ElementReader.prototype.getPattern=function(b){d(arguments.length,1,"getPattern","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("ElementReader.getPattern",{r:this.id,name:b},this.userPriority).then(function(b){return f(a.Obj,b)})};a.ElementReader.prototype.getExtGState=function(b){d(arguments.length,
1,"getExtGState","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("ElementReader.getExtGState",{r:this.id,name:b},this.userPriority).then(function(b){return f(a.Obj,b)})};a.ElementWriter.create=function(){return a.messageHandler.sendWithPromise("elementWriterCreate",{},this.userPriority).then(function(b){return k(a.ElementWriter,b)})};a.ElementWriter.prototype.beginOnPage=function(b,c,e,m,f){"undefined"===typeof c&&(c=a.ElementWriter.WriteMode.e_overlay);"undefined"===typeof e&&
(e=!0);"undefined"===typeof m&&(m=!0);"undefined"===typeof f&&(f=new a.Obj("0"));d(arguments.length,1,"beginOnPage","(PDFNet.Page, number, boolean, boolean, PDFNet.Obj)",[[b,"Object",a.Page,"Page"],[c,"number"],[e,"boolean"],[m,"boolean"],[f,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("ElementWriter.beginOnPage",{w:this.id,page:b.id,placement:c,page_coord_sys:e,compress:m,resources:f.id},this.userPriority)};a.ElementWriter.prototype.begin=function(b,c){"undefined"===typeof c&&
(c=!0);d(arguments.length,1,"begin","(PDFNet.SDFDoc, boolean)",[[b,"SDFDoc"],[c,"boolean"]]);return a.messageHandler.sendWithPromise("ElementWriter.begin",{w:this.id,doc:b.id,compress:c},this.userPriority)};a.ElementWriter.prototype.beginOnObj=function(b,c,e){"undefined"===typeof c&&(c=!0);"undefined"===typeof e&&(e=new a.Obj("0"));d(arguments.length,1,"beginOnObj","(PDFNet.Obj, boolean, PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"],[c,"boolean"],[e,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("ElementWriter.beginOnObj",
{w:this.id,stream_obj_to_update:b.id,compress:c,resources:e.id},this.userPriority)};a.ElementWriter.prototype.end=function(){return a.messageHandler.sendWithPromise("ElementWriter.end",{w:this.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.ElementWriter.prototype.writeElement=function(b){d(arguments.length,1,"writeElement","(PDFNet.Element)",[[b,"Object",a.Element,"Element"]]);return a.messageHandler.sendWithPromise("ElementWriter.writeElement",{w:this.id,element:b.id},this.userPriority)};
a.ElementWriter.prototype.writePlacedElement=function(b){d(arguments.length,1,"writePlacedElement","(PDFNet.Element)",[[b,"Object",a.Element,"Element"]]);return a.messageHandler.sendWithPromise("ElementWriter.writePlacedElement",{w:this.id,element:b.id},this.userPriority)};a.ElementWriter.prototype.flush=function(){return a.messageHandler.sendWithPromise("ElementWriter.flush",{w:this.id},this.userPriority)};a.ElementWriter.prototype.writeBuffer=function(b,c){d(arguments.length,2,"writeBuffer","(string, number)",
[[b,"string"],[c,"number"]]);return a.messageHandler.sendWithPromise("ElementWriter.writeBuffer",{w:this.id,data:b,data_sz:c},this.userPriority)};a.ElementWriter.prototype.writeString=function(b){d(arguments.length,1,"writeString","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("ElementWriter.writeString",{w:this.id,str:b},this.userPriority)};a.ElementWriter.prototype.setDefaultGState=function(b){d(arguments.length,1,"setDefaultGState","(PDFNet.ElementReader)",[[b,"Object",a.ElementReader,
"ElementReader"]]);return a.messageHandler.sendWithPromise("ElementWriter.setDefaultGState",{w:this.id,reader:b.id},this.userPriority)};a.ElementWriter.prototype.writeGStateChanges=function(b){d(arguments.length,1,"writeGStateChanges","(PDFNet.Element)",[[b,"Object",a.Element,"Element"]]);return a.messageHandler.sendWithPromise("ElementWriter.writeGStateChanges",{w:this.id,element:b.id},this.userPriority)};a.FileSpec.create=function(b,c,e){"undefined"===typeof e&&(e=!0);d(arguments.length,2,"create",
"(PDFNet.SDFDoc, string, boolean)",[[b,"SDFDoc"],[c,"string"],[e,"boolean"]]);return a.messageHandler.sendWithPromise("fileSpecCreate",{doc:b.id,path:c,embed:e},this.userPriority).then(function(b){return f(a.FileSpec,b)})};a.FileSpec.createURL=function(b,c){d(arguments.length,2,"createURL","(PDFNet.SDFDoc, string)",[[b,"SDFDoc"],[c,"string"]]);return a.messageHandler.sendWithPromise("fileSpecCreateURL",{doc:b.id,url:c},this.userPriority).then(function(b){return f(a.FileSpec,b)})};a.FileSpec.createFromObj=
function(b){d(arguments.length,1,"createFromObj","(PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("fileSpecCreateFromObj",{f:b.id},this.userPriority).then(function(b){return f(a.FileSpec,b)})};a.FileSpec.prototype.copy=function(){return a.messageHandler.sendWithPromise("FileSpec.copy",{d:this.id},this.userPriority).then(function(b){return f(a.FileSpec,b)})};a.FileSpec.prototype.compare=function(b){d(arguments.length,1,"compare","(PDFNet.FileSpec)",[[b,"Object",a.FileSpec,
"FileSpec"]]);return a.messageHandler.sendWithPromise("FileSpec.compare",{fs:this.id,d:b.id},this.userPriority)};a.FileSpec.prototype.isValid=function(){return a.messageHandler.sendWithPromise("FileSpec.isValid",{fs:this.id},this.userPriority)};a.FileSpec.prototype.export=function(b){"undefined"===typeof b&&(b="");d(arguments.length,0,"export","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("FileSpec.export",{fs:this.id,save_as:b},this.userPriority)};a.FileSpec.prototype.getFileData=
function(){return a.messageHandler.sendWithPromise("FileSpec.getFileData",{fs:this.id},this.userPriority).then(function(b){return f(a.Filter,b)})};a.FileSpec.prototype.getFilePath=function(){return a.messageHandler.sendWithPromise("FileSpec.getFilePath",{fs:this.id},this.userPriority)};a.FileSpec.prototype.setDesc=function(b){d(arguments.length,1,"setDesc","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("FileSpec.setDesc",{fs:this.id,desc:b},this.userPriority)};a.FileSpec.prototype.getSDFObj=
function(){return a.messageHandler.sendWithPromise("FileSpec.getSDFObj",{fs:this.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.Flattener.create=function(){return a.messageHandler.sendWithPromise("flattenerCreate",{},this.userPriority).then(function(b){return k(a.Flattener,b)})};a.Flattener.prototype.setDPI=function(b){d(arguments.length,1,"setDPI","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("Flattener.setDPI",{flattener:this.id,dpi:b},this.userPriority)};a.Flattener.prototype.setThreshold=
function(b){d(arguments.length,1,"setThreshold","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("Flattener.setThreshold",{flattener:this.id,threshold:b},this.userPriority)};a.Flattener.prototype.setMaximumImagePixels=function(b){d(arguments.length,1,"setMaximumImagePixels","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("Flattener.setMaximumImagePixels",{flattener:this.id,max_pixels:b},this.userPriority)};a.Flattener.prototype.setPreferJPG=function(b){d(arguments.length,
1,"setPreferJPG","(boolean)",[[b,"boolean"]]);return a.messageHandler.sendWithPromise("Flattener.setPreferJPG",{flattener:this.id,jpg:b},this.userPriority)};a.Flattener.prototype.setJPGQuality=function(b){d(arguments.length,1,"setJPGQuality","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("Flattener.setJPGQuality",{flattener:this.id,quality:b},this.userPriority)};a.Flattener.prototype.setPathHinting=function(b){d(arguments.length,1,"setPathHinting","(boolean)",[[b,"boolean"]]);
return a.messageHandler.sendWithPromise("Flattener.setPathHinting",{flattener:this.id,hinting:b},this.userPriority)};a.Flattener.prototype.process=function(b,c){d(arguments.length,2,"process","(PDFNet.PDFDoc, number)",[[b,"PDFDoc"],[c,"number"]]);return a.messageHandler.sendWithPromise("Flattener.process",{flattener:this.id,doc:b.id,mode:c},this.userPriority)};a.Flattener.prototype.processPage=function(b,c){d(arguments.length,2,"processPage","(PDFNet.Page, number)",[[b,"Object",a.Page,"Page"],[c,
"number"]]);return a.messageHandler.sendWithPromise("Flattener.processPage",{flattener:this.id,page:b.id,mode:c},this.userPriority)};a.Font.createFromObj=function(b){"undefined"===typeof b&&(b=new a.Obj("0"));d(arguments.length,0,"createFromObj","(PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("fontCreateFromObj",{font_dict:b.id},this.userPriority).then(function(b){return k(a.Font,b)})};a.Font.create=function(b,c){d(arguments.length,2,"create","(PDFNet.SDFDoc, number)",
[[b,"SDFDoc"],[c,"number"]]);return a.messageHandler.sendWithPromise("fontCreate",{doc:b.id,type:c},this.userPriority).then(function(b){return k(a.Font,b)})};a.Font.createFromFontDescriptor=function(b,c,e){d(arguments.length,3,"createFromFontDescriptor","(PDFNet.SDFDoc, PDFNet.Font, string)",[[b,"SDFDoc"],[c,"Object",a.Font,"Font"],[e,"string"]]);return a.messageHandler.sendWithPromise("fontCreateFromFontDescriptor",{doc:b.id,from:c.id,char_set:e},this.userPriority).then(function(b){return k(a.Font,
b)})};a.Font.createFromName=function(b,c,e){d(arguments.length,3,"createFromName","(PDFNet.SDFDoc, string, string)",[[b,"SDFDoc"],[c,"string"],[e,"string"]]);return a.messageHandler.sendWithPromise("fontCreateFromName",{doc:b.id,name:c,char_set:e},this.userPriority).then(function(b){return k(a.Font,b)})};a.Font.createAndEmbed=function(b,c){d(arguments.length,2,"createAndEmbed","(PDFNet.SDFDoc, number)",[[b,"SDFDoc"],[c,"number"]]);return a.messageHandler.sendWithPromise("fontCreateAndEmbed",{doc:b.id,
type:c},this.userPriority).then(function(b){return k(a.Font,b)})};a.Font.createTrueTypeFont=function(b,c,e,m){"undefined"===typeof e&&(e=!0);"undefined"===typeof m&&(m=!0);d(arguments.length,2,"createTrueTypeFont","(PDFNet.SDFDoc, string, boolean, boolean)",[[b,"SDFDoc"],[c,"string"],[e,"boolean"],[m,"boolean"]]);return a.messageHandler.sendWithPromise("fontCreateTrueTypeFont",{doc:b.id,font_path:c,embed:e,subset:m},this.userPriority).then(function(b){return k(a.Font,b)})};a.Font.createCIDTrueTypeFont=
function(b,c,e,m,f,g){"undefined"===typeof e&&(e=!0);"undefined"===typeof m&&(m=!0);"undefined"===typeof f&&(f=a.Font.Encoding.e_IdentityH);"undefined"===typeof g&&(g=0);d(arguments.length,2,"createCIDTrueTypeFont","(PDFNet.SDFDoc, string, boolean, boolean, number, number)",[[b,"SDFDoc"],[c,"string"],[e,"boolean"],[m,"boolean"],[f,"number"],[g,"number"]]);return a.messageHandler.sendWithPromise("fontCreateCIDTrueTypeFont",{doc:b.id,font_path:c,embed:e,subset:m,encoding:f,ttc_font_index:g},this.userPriority).then(function(b){return k(a.Font,
b)})};a.Font.createType1Font=function(b,c,e){"undefined"===typeof e&&(e=!0);d(arguments.length,2,"createType1Font","(PDFNet.SDFDoc, string, boolean)",[[b,"SDFDoc"],[c,"string"],[e,"boolean"]]);return a.messageHandler.sendWithPromise("fontCreateType1Font",{doc:b.id,font_path:c,embed:e},this.userPriority).then(function(b){return k(a.Font,b)})};a.Font.prototype.getType=function(){return a.messageHandler.sendWithPromise("Font.getType",{font:this.id},this.userPriority)};a.Font.prototype.isSimple=function(){return a.messageHandler.sendWithPromise("Font.isSimple",
{font:this.id},this.userPriority)};a.Font.getTypeFromObj=function(b){d(arguments.length,1,"getTypeFromObj","(PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("fontGetTypeFromObj",{font_dict:b.id},this.userPriority)};a.Font.prototype.getSDFObj=function(){return a.messageHandler.sendWithPromise("Font.getSDFObj",{font:this.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.Font.prototype.getDescriptor=function(){return a.messageHandler.sendWithPromise("Font.getDescriptor",
{font:this.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.Font.prototype.getName=function(){return a.messageHandler.sendWithPromise("Font.getName",{font:this.id},this.userPriority)};a.Font.prototype.getFamilyName=function(){return a.messageHandler.sendWithPromise("Font.getFamilyName",{font:this.id},this.userPriority)};a.Font.prototype.isFixedWidth=function(){return a.messageHandler.sendWithPromise("Font.isFixedWidth",{font:this.id},this.userPriority)};a.Font.prototype.isSerif=function(){return a.messageHandler.sendWithPromise("Font.isSerif",
{font:this.id},this.userPriority)};a.Font.prototype.isSymbolic=function(){return a.messageHandler.sendWithPromise("Font.isSymbolic",{font:this.id},this.userPriority)};a.Font.prototype.isItalic=function(){return a.messageHandler.sendWithPromise("Font.isItalic",{font:this.id},this.userPriority)};a.Font.prototype.isAllCap=function(){return a.messageHandler.sendWithPromise("Font.isAllCap",{font:this.id},this.userPriority)};a.Font.prototype.isForceBold=function(){return a.messageHandler.sendWithPromise("Font.isForceBold",
{font:this.id},this.userPriority)};a.Font.prototype.isHorizontalMode=function(){return a.messageHandler.sendWithPromise("Font.isHorizontalMode",{font:this.id},this.userPriority)};a.Font.prototype.getWidth=function(b){d(arguments.length,1,"getWidth","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("Font.getWidth",{font:this.id,char_code:b},this.userPriority)};a.Font.prototype.getMaxWidth=function(){return a.messageHandler.sendWithPromise("Font.getMaxWidth",{font:this.id},this.userPriority)};
a.Font.prototype.getMissingWidth=function(){return a.messageHandler.sendWithPromise("Font.getMissingWidth",{font:this.id},this.userPriority)};a.Font.prototype.getCharCodeIterator=function(){return a.messageHandler.sendWithPromise("Font.getCharCodeIterator",{font:this.id},this.userPriority).then(function(b){return k(a.Iterator,b,"Int")})};a.Font.prototype.getShapedText=function(b){d(arguments.length,1,"getShapedText","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("Font.getShapedText",
{font:this.id,text_to_shape:b},this.userPriority).then(function(b){return k(a.ShapedText,b)})};a.Font.prototype.getEncoding=function(){return a.messageHandler.sendWithPromise("Font.getEncoding",{font:this.id},this.userPriority)};a.Font.prototype.isEmbedded=function(){return a.messageHandler.sendWithPromise("Font.isEmbedded",{font:this.id},this.userPriority)};a.Font.prototype.getEmbeddedFontName=function(){return a.messageHandler.sendWithPromise("Font.getEmbeddedFontName",{font:this.id},this.userPriority)};
a.Font.prototype.getEmbeddedFont=function(){return a.messageHandler.sendWithPromise("Font.getEmbeddedFont",{font:this.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.Font.prototype.getEmbeddedFontBufSize=function(){return a.messageHandler.sendWithPromise("Font.getEmbeddedFontBufSize",{font:this.id},this.userPriority)};a.Font.prototype.getUnitsPerEm=function(){return a.messageHandler.sendWithPromise("Font.getUnitsPerEm",{font:this.id},this.userPriority)};a.Font.prototype.getBBox=function(){return a.messageHandler.sendWithPromise("Font.getBBox",
{font:this.id},this.userPriority).then(function(b){return new a.Rect(b)})};a.Font.prototype.getAscent=function(){return a.messageHandler.sendWithPromise("Font.getAscent",{font:this.id},this.userPriority)};a.Font.prototype.getDescent=function(){return a.messageHandler.sendWithPromise("Font.getDescent",{font:this.id},this.userPriority)};a.Font.prototype.getStandardType1FontType=function(){return a.messageHandler.sendWithPromise("Font.getStandardType1FontType",{font:this.id},this.userPriority)};a.Font.prototype.isCFF=
function(){return a.messageHandler.sendWithPromise("Font.isCFF",{font:this.id},this.userPriority)};a.Font.prototype.getType3FontMatrix=function(){return a.messageHandler.sendWithPromise("Font.getType3FontMatrix",{font:this.id},this.userPriority).then(function(b){return new a.Matrix2D(b)})};a.Font.prototype.getType3GlyphStream=function(b){d(arguments.length,1,"getType3GlyphStream","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("Font.getType3GlyphStream",{font:this.id,char_code:b},
this.userPriority).then(function(b){return f(a.Obj,b)})};a.Font.prototype.getVerticalAdvance=function(b){d(arguments.length,1,"getVerticalAdvance","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("Font.getVerticalAdvance",{font:this.id,char_code:b},this.userPriority)};a.Font.prototype.getDescendant=function(){return a.messageHandler.sendWithPromise("Font.getDescendant",{font:this.id},this.userPriority).then(function(b){return k(a.Font,b)})};a.Font.prototype.mapToCID=function(b){d(arguments.length,
1,"mapToCID","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("Font.mapToCID",{font:this.id,char_code:b},this.userPriority)};a.Function.create=function(b){"undefined"===typeof b&&(b=new a.Obj("0"));d(arguments.length,0,"create","(PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("functionCreate",{funct_dict:b.id},this.userPriority).then(function(b){return k(a.Function,b)})};a.Function.prototype.getType=function(){return a.messageHandler.sendWithPromise("Function.getType",
{f:this.id},this.userPriority)};a.Function.prototype.getInputCardinality=function(){return a.messageHandler.sendWithPromise("Function.getInputCardinality",{f:this.id},this.userPriority)};a.Function.prototype.getOutputCardinality=function(){return a.messageHandler.sendWithPromise("Function.getOutputCardinality",{f:this.id},this.userPriority)};a.Function.prototype.eval=function(b,c){d(arguments.length,2,"eval","(number, number)",[[b,"number"],[c,"number"]]);return a.messageHandler.sendWithPromise("Function.eval",
{f:this.id,inval:b,outval:c},this.userPriority)};a.Function.prototype.getSDFObj=function(){return a.messageHandler.sendWithPromise("Function.getSDFObj",{f:this.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.Highlights.create=function(){return a.messageHandler.sendWithPromise("highlightsCreate",{},this.userPriority).then(function(b){return k(a.Highlights,b)})};a.Highlights.prototype.copyCtor=function(){return a.messageHandler.sendWithPromise("Highlights.copyCtor",{hlts:this.id},this.userPriority).then(function(b){return k(a.Highlights,
b)})};a.Highlights.prototype.add=function(b){d(arguments.length,1,"add","(PDFNet.Highlights)",[[b,"Object",a.Highlights,"Highlights"]]);return a.messageHandler.sendWithPromise("Highlights.add",{hlts2:this.id,hlts:b.id},this.userPriority)};a.Highlights.prototype.load=function(b){d(arguments.length,1,"load","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("Highlights.load",{hlts:this.id,file_name:b},this.userPriority)};a.Highlights.prototype.save=function(b){d(arguments.length,1,"save",
"(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("Highlights.save",{hlts:this.id,file_name:b},this.userPriority)};a.Highlights.prototype.clear=function(){return a.messageHandler.sendWithPromise("Highlights.clear",{hlts:this.id},this.userPriority)};a.Highlights.prototype.begin=function(b){d(arguments.length,1,"begin","(PDFNet.PDFDoc)",[[b,"PDFDoc"]]);return a.messageHandler.sendWithPromise("Highlights.begin",{hlts:this.id,doc:b.id},this.userPriority)};a.Highlights.prototype.hasNext=
function(){return a.messageHandler.sendWithPromise("Highlights.hasNext",{hlts:this.id},this.userPriority)};a.Highlights.prototype.next=function(){return a.messageHandler.sendWithPromise("Highlights.next",{hlts:this.id},this.userPriority)};a.Highlights.prototype.getCurrentPageNumber=function(){return a.messageHandler.sendWithPromise("Highlights.getCurrentPageNumber",{hlts:this.id},this.userPriority)};a.HTML2PDF.Proxy.create=function(){return a.messageHandler.sendWithPromise("HTML2PDF.proxyCreate",
{},this.userPriority).then(function(b){return k(a.HTML2PDF.Proxy,b)})};a.HTML2PDF.Proxy.prototype.setType=function(b){d(arguments.length,1,"setType","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("HTML2PDF.Proxy.setType",{proxy:this.id,type:b},this.userPriority)};a.HTML2PDF.Proxy.prototype.setPort=function(b){d(arguments.length,1,"setPort","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("HTML2PDF.Proxy.setPort",{proxy:this.id,port:b},this.userPriority)};a.HTML2PDF.Proxy.prototype.setHost=
function(b){d(arguments.length,1,"setHost","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("HTML2PDF.Proxy.setHost",{proxy:this.id,host:b},this.userPriority)};a.HTML2PDF.Proxy.prototype.setUsername=function(b){d(arguments.length,1,"setUsername","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("HTML2PDF.Proxy.setUsername",{proxy:this.id,username:b},this.userPriority)};a.HTML2PDF.Proxy.prototype.setPassword=function(b){d(arguments.length,1,"setPassword","(string)",
[[b,"string"]]);return a.messageHandler.sendWithPromise("HTML2PDF.Proxy.setPassword",{proxy:this.id,password:b},this.userPriority)};a.HTML2PDF.WebPageSettings.create=function(){return a.messageHandler.sendWithPromise("HTML2PDF.webPageSettingsCreate",{},this.userPriority).then(function(b){return k(a.HTML2PDF.WebPageSettings,b)})};a.HTML2PDF.WebPageSettings.prototype.setPrintBackground=function(b){d(arguments.length,1,"setPrintBackground","(boolean)",[[b,"boolean"]]);return a.messageHandler.sendWithPromise("HTML2PDF.WebPageSettings.setPrintBackground",
{settings:this.id,background:b},this.userPriority)};a.HTML2PDF.WebPageSettings.prototype.setLoadImages=function(b){d(arguments.length,1,"setLoadImages","(boolean)",[[b,"boolean"]]);return a.messageHandler.sendWithPromise("HTML2PDF.WebPageSettings.setLoadImages",{settings:this.id,load:b},this.userPriority)};a.HTML2PDF.WebPageSettings.prototype.setAllowJavaScript=function(b){d(arguments.length,1,"setAllowJavaScript","(boolean)",[[b,"boolean"]]);return a.messageHandler.sendWithPromise("HTML2PDF.WebPageSettings.setAllowJavaScript",
{settings:this.id,enable:b},this.userPriority)};a.HTML2PDF.WebPageSettings.prototype.setSmartShrinking=function(b){d(arguments.length,1,"setSmartShrinking","(boolean)",[[b,"boolean"]]);return a.messageHandler.sendWithPromise("HTML2PDF.WebPageSettings.setSmartShrinking",{settings:this.id,enable:b},this.userPriority)};a.HTML2PDF.WebPageSettings.prototype.setMinimumFontSize=function(b){d(arguments.length,1,"setMinimumFontSize","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("HTML2PDF.WebPageSettings.setMinimumFontSize",
{settings:this.id,size:b},this.userPriority)};a.HTML2PDF.WebPageSettings.prototype.setDefaultEncoding=function(b){d(arguments.length,1,"setDefaultEncoding","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("HTML2PDF.WebPageSettings.setDefaultEncoding",{settings:this.id,encoding:b},this.userPriority)};a.HTML2PDF.WebPageSettings.prototype.setUserStyleSheet=function(b){d(arguments.length,1,"setUserStyleSheet","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("HTML2PDF.WebPageSettings.setUserStyleSheet",
{settings:this.id,url:b},this.userPriority)};a.HTML2PDF.WebPageSettings.prototype.setAllowPlugins=function(b){d(arguments.length,1,"setAllowPlugins","(boolean)",[[b,"boolean"]]);return a.messageHandler.sendWithPromise("HTML2PDF.WebPageSettings.setAllowPlugins",{settings:this.id,enable:b},this.userPriority)};a.HTML2PDF.WebPageSettings.prototype.setPrintMediaType=function(b){d(arguments.length,1,"setPrintMediaType","(boolean)",[[b,"boolean"]]);return a.messageHandler.sendWithPromise("HTML2PDF.WebPageSettings.setPrintMediaType",
{settings:this.id,print:b},this.userPriority)};a.HTML2PDF.WebPageSettings.prototype.setIncludeInOutline=function(b){d(arguments.length,1,"setIncludeInOutline","(boolean)",[[b,"boolean"]]);return a.messageHandler.sendWithPromise("HTML2PDF.WebPageSettings.setIncludeInOutline",{settings:this.id,include:b},this.userPriority)};a.HTML2PDF.WebPageSettings.prototype.setUsername=function(b){d(arguments.length,1,"setUsername","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("HTML2PDF.WebPageSettings.setUsername",
{settings:this.id,username:b},this.userPriority)};a.HTML2PDF.WebPageSettings.prototype.setPassword=function(b){d(arguments.length,1,"setPassword","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("HTML2PDF.WebPageSettings.setPassword",{settings:this.id,password:b},this.userPriority)};a.HTML2PDF.WebPageSettings.prototype.setJavaScriptDelay=function(b){d(arguments.length,1,"setJavaScriptDelay","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("HTML2PDF.WebPageSettings.setJavaScriptDelay",
{settings:this.id,msec:b},this.userPriority)};a.HTML2PDF.WebPageSettings.prototype.setZoom=function(b){d(arguments.length,1,"setZoom","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("HTML2PDF.WebPageSettings.setZoom",{settings:this.id,zoom:b},this.userPriority)};a.HTML2PDF.WebPageSettings.prototype.setBlockLocalFileAccess=function(b){d(arguments.length,1,"setBlockLocalFileAccess","(boolean)",[[b,"boolean"]]);return a.messageHandler.sendWithPromise("HTML2PDF.WebPageSettings.setBlockLocalFileAccess",
{settings:this.id,block:b},this.userPriority)};a.HTML2PDF.WebPageSettings.prototype.setStopSlowScripts=function(b){d(arguments.length,1,"setStopSlowScripts","(boolean)",[[b,"boolean"]]);return a.messageHandler.sendWithPromise("HTML2PDF.WebPageSettings.setStopSlowScripts",{settings:this.id,stop:b},this.userPriority)};a.HTML2PDF.WebPageSettings.prototype.setDebugJavaScriptOutput=function(b){d(arguments.length,1,"setDebugJavaScriptOutput","(boolean)",[[b,"boolean"]]);return a.messageHandler.sendWithPromise("HTML2PDF.WebPageSettings.setDebugJavaScriptOutput",
{settings:this.id,forward:b},this.userPriority)};a.HTML2PDF.WebPageSettings.prototype.setLoadErrorHandling=function(b){d(arguments.length,1,"setLoadErrorHandling","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("HTML2PDF.WebPageSettings.setLoadErrorHandling",{settings:this.id,val:b},this.userPriority)};a.HTML2PDF.WebPageSettings.prototype.setExternalLinks=function(b){d(arguments.length,1,"setExternalLinks","(boolean)",[[b,"boolean"]]);return a.messageHandler.sendWithPromise("HTML2PDF.WebPageSettings.setExternalLinks",
{settings:this.id,convert:b},this.userPriority)};a.HTML2PDF.WebPageSettings.prototype.setInternalLinks=function(b){d(arguments.length,1,"setInternalLinks","(boolean)",[[b,"boolean"]]);return a.messageHandler.sendWithPromise("HTML2PDF.WebPageSettings.setInternalLinks",{settings:this.id,convert:b},this.userPriority)};a.HTML2PDF.WebPageSettings.prototype.setProduceForms=function(b){d(arguments.length,1,"setProduceForms","(boolean)",[[b,"boolean"]]);return a.messageHandler.sendWithPromise("HTML2PDF.WebPageSettings.setProduceForms",
{settings:this.id,forms:b},this.userPriority)};a.HTML2PDF.WebPageSettings.prototype.setProxy=function(b){d(arguments.length,1,"setProxy","(PDFNet.HTML2PDF.Proxy)",[[b,"Object",a.HTML2PDF.Proxy,"HTML2PDF.Proxy"]]);return a.messageHandler.sendWithPromise("HTML2PDF.WebPageSettings.setProxy",{settings:this.id,proxy:b.id},this.userPriority)};a.HTML2PDF.TOCSettings.create=function(){return a.messageHandler.sendWithPromise("HTML2PDF.tocSettingsCreate",{},this.userPriority).then(function(b){return k(a.HTML2PDF.TOCSettings,
b)})};a.HTML2PDF.TOCSettings.prototype.setDottedLines=function(b){d(arguments.length,1,"setDottedLines","(boolean)",[[b,"boolean"]]);return a.messageHandler.sendWithPromise("HTML2PDF.TOCSettings.setDottedLines",{settings:this.id,enable:b},this.userPriority)};a.HTML2PDF.TOCSettings.prototype.setLinks=function(b){d(arguments.length,1,"setLinks","(boolean)",[[b,"boolean"]]);return a.messageHandler.sendWithPromise("HTML2PDF.TOCSettings.setLinks",{settings:this.id,enable:b},this.userPriority)};a.HTML2PDF.TOCSettings.prototype.setCaptionText=
function(b){d(arguments.length,1,"setCaptionText","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("HTML2PDF.TOCSettings.setCaptionText",{settings:this.id,caption:b},this.userPriority)};a.HTML2PDF.TOCSettings.prototype.setLevelIndentation=function(b){d(arguments.length,1,"setLevelIndentation","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("HTML2PDF.TOCSettings.setLevelIndentation",{settings:this.id,indentation:b},this.userPriority)};a.HTML2PDF.TOCSettings.prototype.setTextSizeShrink=
function(b){d(arguments.length,1,"setTextSizeShrink","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("HTML2PDF.TOCSettings.setTextSizeShrink",{settings:this.id,shrink:b},this.userPriority)};a.HTML2PDF.TOCSettings.prototype.setXsl=function(b){d(arguments.length,1,"setXsl","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("HTML2PDF.TOCSettings.setXsl",{settings:this.id,style_sheet:b},this.userPriority)};a.HTML2PDF.staticConvert=function(b,c){d(arguments.length,2,
"staticConvert","(PDFNet.PDFDoc, string)",[[b,"PDFDoc"],[c,"string"]]);return a.messageHandler.sendWithPromise("htmL2PDFStaticConvert",{doc:b.id,url:c},this.userPriority)};a.HTML2PDF.staticConvert2=function(b,c,e){d(arguments.length,3,"staticConvert2","(PDFNet.PDFDoc, string, PDFNet.HTML2PDF.WebPageSettings)",[[b,"PDFDoc"],[c,"string"],[e,"Object",a.HTML2PDF.WebPageSettings,"HTML2PDF.WebPageSettings"]]);return a.messageHandler.sendWithPromise("htmL2PDFStaticConvert2",{doc:b.id,url:c,settings:e.id},
this.userPriority)};a.HTML2PDF.create=function(){return a.messageHandler.sendWithPromise("htmL2PDFCreate",{},this.userPriority).then(function(b){return k(a.HTML2PDF,b)})};a.HTML2PDF.prototype.insertFromUrl=function(b){d(arguments.length,1,"insertFromUrl","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("HTML2PDF.insertFromUrl",{html2pdf:this.id,url:b},this.userPriority)};a.HTML2PDF.prototype.insertFromUrl2=function(b,c){d(arguments.length,2,"insertFromUrl2","(string, PDFNet.HTML2PDF.WebPageSettings)",
[[b,"string"],[c,"Object",a.HTML2PDF.WebPageSettings,"HTML2PDF.WebPageSettings"]]);return a.messageHandler.sendWithPromise("HTML2PDF.insertFromUrl2",{html2pdf:this.id,url:b,settings:c.id},this.userPriority)};a.HTML2PDF.prototype.insertFromHtmlString=function(b){d(arguments.length,1,"insertFromHtmlString","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("HTML2PDF.insertFromHtmlString",{html2pdf:this.id,html:b},this.userPriority)};a.HTML2PDF.prototype.insertFromHtmlString2=function(b,
c){d(arguments.length,2,"insertFromHtmlString2","(string, PDFNet.HTML2PDF.WebPageSettings)",[[b,"string"],[c,"Object",a.HTML2PDF.WebPageSettings,"HTML2PDF.WebPageSettings"]]);return a.messageHandler.sendWithPromise("HTML2PDF.insertFromHtmlString2",{html2pdf:this.id,html:b,settings:c.id},this.userPriority)};a.HTML2PDF.prototype.insertTOC=function(){return a.messageHandler.sendWithPromise("HTML2PDF.insertTOC",{html2pdf:this.id},this.userPriority)};a.HTML2PDF.prototype.insertTOC2=function(b){d(arguments.length,
1,"insertTOC2","(PDFNet.HTML2PDF.TOCSettings)",[[b,"Object",a.HTML2PDF.TOCSettings,"HTML2PDF.TOCSettings"]]);return a.messageHandler.sendWithPromise("HTML2PDF.insertTOC2",{html2pdf:this.id,settings:b.id},this.userPriority)};a.HTML2PDF.prototype.convert=function(b){d(arguments.length,1,"convert","(PDFNet.PDFDoc)",[[b,"PDFDoc"]]);return a.messageHandler.sendWithPromise("HTML2PDF.convert",{html2pdf:this.id,doc:b.id},this.userPriority)};a.HTML2PDF.prototype.getHttpErrorCode=function(){return a.messageHandler.sendWithPromise("HTML2PDF.getHttpErrorCode",
{html2pdf:this.id},this.userPriority)};a.HTML2PDF.prototype.getLog=function(){return a.messageHandler.sendWithPromise("HTML2PDF.getLog",{html2pdf:this.id},this.userPriority)};a.HTML2PDF.prototype.setPaperSize=function(b){d(arguments.length,1,"setPaperSize","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("HTML2PDF.setPaperSize",{html2pdf:this.id,size:b},this.userPriority)};a.HTML2PDF.prototype.setPaperSize2=function(b,c){d(arguments.length,2,"setPaperSize2","(string, string)",[[b,
"string"],[c,"string"]]);return a.messageHandler.sendWithPromise("HTML2PDF.setPaperSize2",{html2pdf:this.id,width:b,height:c},this.userPriority)};a.HTML2PDF.prototype.setLandscape=function(b){d(arguments.length,1,"setLandscape","(boolean)",[[b,"boolean"]]);return a.messageHandler.sendWithPromise("HTML2PDF.setLandscape",{html2pdf:this.id,enable:b},this.userPriority)};a.HTML2PDF.prototype.setDPI=function(b){d(arguments.length,1,"setDPI","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("HTML2PDF.setDPI",
{html2pdf:this.id,dpi:b},this.userPriority)};a.HTML2PDF.prototype.setOutline=function(b,c){"undefined"===typeof c&&(c=4);d(arguments.length,1,"setOutline","(boolean, number)",[[b,"boolean"],[c,"number"]]);return a.messageHandler.sendWithPromise("HTML2PDF.setOutline",{html2pdf:this.id,enable:b,depth:c},this.userPriority)};a.HTML2PDF.prototype.dumpOutline=function(b){d(arguments.length,1,"dumpOutline","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("HTML2PDF.dumpOutline",{html2pdf:this.id,
xml_file:b},this.userPriority)};a.HTML2PDF.prototype.setPDFCompression=function(b){d(arguments.length,1,"setPDFCompression","(boolean)",[[b,"boolean"]]);return a.messageHandler.sendWithPromise("HTML2PDF.setPDFCompression",{html2pdf:this.id,enable:b},this.userPriority)};a.HTML2PDF.prototype.setMargins=function(b,c,e,m){d(arguments.length,4,"setMargins","(string, string, string, string)",[[b,"string"],[c,"string"],[e,"string"],[m,"string"]]);return a.messageHandler.sendWithPromise("HTML2PDF.setMargins",
{html2pdf:this.id,top:b,bottom:c,left:e,right:m},this.userPriority)};a.HTML2PDF.prototype.setImageDPI=function(b){d(arguments.length,1,"setImageDPI","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("HTML2PDF.setImageDPI",{html2pdf:this.id,dpi:b},this.userPriority)};a.HTML2PDF.prototype.setImageQuality=function(b){d(arguments.length,1,"setImageQuality","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("HTML2PDF.setImageQuality",{html2pdf:this.id,quality:b},this.userPriority)};
a.HTML2PDF.prototype.setCookieJar=function(b){d(arguments.length,1,"setCookieJar","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("HTML2PDF.setCookieJar",{html2pdf:this.id,path:b},this.userPriority)};a.HTML2PDF.prototype.setQuiet=function(b){d(arguments.length,1,"setQuiet","(boolean)",[[b,"boolean"]]);return a.messageHandler.sendWithPromise("HTML2PDF.setQuiet",{html2pdf:this.id,quiet:b},this.userPriority)};a.HTML2PDF.setModulePath=function(b){d(arguments.length,1,"setModulePath",
"(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("htmL2PDFSetModulePath",{path:b},this.userPriority)};a.Image.createFromFile=function(b,c,e){"undefined"===typeof e&&(e=new a.Obj("0"));d(arguments.length,2,"createFromFile","(PDFNet.SDFDoc, string, PDFNet.Obj)",[[b,"SDFDoc"],[c,"string"],[e,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("imageCreateFromFile",{doc:b.id,filename:c,encoder_hints:e.id},this.userPriority).then(function(b){return f(a.Image,b)})};a.Image.createFromMemory=
function(b,c,e,m,g,h,k){"undefined"===typeof k&&(k=new a.Obj("0"));d(arguments.length,6,"createFromMemory","(PDFNet.SDFDoc, ArrayBuffer|TypedArray, number, number, number, PDFNet.ColorSpace, PDFNet.Obj)",[[b,"SDFDoc"],[c,"ArrayBuffer"],[e,"number"],[m,"number"],[g,"number"],[h,"Object",a.ColorSpace,"ColorSpace"],[k,"Object",a.Obj,"Obj"]]);var x=v(c,!1);return a.messageHandler.sendWithPromise("imageCreateFromMemory",{doc:b.id,buf:x,width:e,height:m,bpc:g,color_space:h.id,encoder_hints:k.id},this.userPriority).then(function(b){return f(a.Image,
b)})};a.Image.createFromMemory2=function(b,c,e){"undefined"===typeof e&&(e=new a.Obj("0"));d(arguments.length,2,"createFromMemory2","(PDFNet.SDFDoc, ArrayBuffer|TypedArray, PDFNet.Obj)",[[b,"SDFDoc"],[c,"ArrayBuffer"],[e,"Object",a.Obj,"Obj"]]);var m=v(c,!1);return a.messageHandler.sendWithPromise("imageCreateFromMemory2",{doc:b.id,buf:m,encoder_hints:e.id},this.userPriority).then(function(b){return f(a.Image,b)})};a.Image.createFromStream=function(b,c,e,m,g,h,k){"undefined"===typeof k&&(k=new a.Obj("0"));
d(arguments.length,6,"createFromStream","(PDFNet.SDFDoc, PDFNet.FilterReader, number, number, number, PDFNet.ColorSpace, PDFNet.Obj)",[[b,"SDFDoc"],[c,"Object",a.FilterReader,"FilterReader"],[e,"number"],[m,"number"],[g,"number"],[h,"Object",a.ColorSpace,"ColorSpace"],[k,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("imageCreateFromStream",{doc:b.id,image_data:c.id,width:e,height:m,bpc:g,color_space:h.id,encoder_hints:k.id},this.userPriority).then(function(b){return f(a.Image,b)})};
a.Image.createFromStream2=function(b,c,e){"undefined"===typeof e&&(e=new a.Obj("0"));d(arguments.length,2,"createFromStream2","(PDFNet.SDFDoc, PDFNet.Filter, PDFNet.Obj)",[[b,"SDFDoc"],[c,"Object",a.Filter,"Filter"],[e,"Object",a.Obj,"Obj"]]);0!=c.id&&r(c.id);return a.messageHandler.sendWithPromise("imageCreateFromStream2",{doc:b.id,no_own_image_data:c.id,encoder_hints:e.id},this.userPriority).then(function(b){return f(a.Image,b)})};a.Image.createImageMask=function(b,c,e,m,g){"undefined"===typeof g&&
(g=new a.Obj("0"));d(arguments.length,4,"createImageMask","(PDFNet.SDFDoc, ArrayBuffer|TypedArray, number, number, PDFNet.Obj)",[[b,"SDFDoc"],[c,"ArrayBuffer"],[e,"number"],[m,"number"],[g,"Object",a.Obj,"Obj"]]);var h=v(c,!1);return a.messageHandler.sendWithPromise("imageCreateImageMask",{doc:b.id,buf:h,width:e,height:m,encoder_hints:g.id},this.userPriority).then(function(b){return f(a.Image,b)})};a.Image.createImageMaskFromStream=function(b,c,e,m,g){"undefined"===typeof g&&(g=new a.Obj("0"));d(arguments.length,
4,"createImageMaskFromStream","(PDFNet.SDFDoc, PDFNet.FilterReader, number, number, PDFNet.Obj)",[[b,"SDFDoc"],[c,"Object",a.FilterReader,"FilterReader"],[e,"number"],[m,"number"],[g,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("imageCreateImageMaskFromStream",{doc:b.id,image_data:c.id,width:e,height:m,encoder_hints:g.id},this.userPriority).then(function(b){return f(a.Image,b)})};a.Image.createSoftMask=function(b,c,e,m,g,h){"undefined"===typeof h&&(h=new a.Obj("0"));d(arguments.length,
5,"createSoftMask","(PDFNet.SDFDoc, ArrayBuffer|TypedArray, number, number, number, PDFNet.Obj)",[[b,"SDFDoc"],[c,"ArrayBuffer"],[e,"number"],[m,"number"],[g,"number"],[h,"Object",a.Obj,"Obj"]]);var x=v(c,!1);return a.messageHandler.sendWithPromise("imageCreateSoftMask",{doc:b.id,buf:x,width:e,height:m,bpc:g,encoder_hints:h.id},this.userPriority).then(function(b){return f(a.Image,b)})};a.Image.createSoftMaskFromStream=function(b,c,e,m,g,h){"undefined"===typeof h&&(h=new a.Obj("0"));d(arguments.length,
5,"createSoftMaskFromStream","(PDFNet.SDFDoc, PDFNet.FilterReader, number, number, number, PDFNet.Obj)",[[b,"SDFDoc"],[c,"Object",a.FilterReader,"FilterReader"],[e,"number"],[m,"number"],[g,"number"],[h,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("imageCreateSoftMaskFromStream",{doc:b.id,image_data:c.id,width:e,height:m,bpc:g,encoder_hints:h.id},this.userPriority).then(function(b){return f(a.Image,b)})};a.Image.createDirectFromMemory=function(b,c,e,m,g,h,k){d(arguments.length,
7,"createDirectFromMemory","(PDFNet.SDFDoc, ArrayBuffer|TypedArray, number, number, number, PDFNet.ColorSpace, number)",[[b,"SDFDoc"],[c,"ArrayBuffer"],[e,"number"],[m,"number"],[g,"number"],[h,"Object",a.ColorSpace,"ColorSpace"],[k,"number"]]);var x=v(c,!1);return a.messageHandler.sendWithPromise("imageCreateDirectFromMemory",{doc:b.id,buf:x,width:e,height:m,bpc:g,color_space:h.id,input_format:k},this.userPriority).then(function(b){return f(a.Image,b)})};a.Image.createDirectFromStream=function(b,
c,e,m,g,h,k){d(arguments.length,7,"createDirectFromStream","(PDFNet.SDFDoc, PDFNet.FilterReader, number, number, number, PDFNet.ColorSpace, number)",[[b,"SDFDoc"],[c,"Object",a.FilterReader,"FilterReader"],[e,"number"],[m,"number"],[g,"number"],[h,"Object",a.ColorSpace,"ColorSpace"],[k,"number"]]);return a.messageHandler.sendWithPromise("imageCreateDirectFromStream",{doc:b.id,image_data:c.id,width:e,height:m,bpc:g,color_space:h.id,input_format:k},this.userPriority).then(function(b){return f(a.Image,
b)})};a.Image.createFromObj=function(b){"undefined"===typeof b&&(b=new a.Obj("0"));d(arguments.length,0,"createFromObj","(PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("imageCreateFromObj",{image_xobject:b.id},this.userPriority).then(function(b){return f(a.Image,b)})};a.Image.prototype.copy=function(){return a.messageHandler.sendWithPromise("Image.copy",{c:this.id},this.userPriority).then(function(b){return f(a.Image,b)})};a.Image.prototype.getSDFObj=function(){return a.messageHandler.sendWithPromise("Image.getSDFObj",
{img:this.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.Image.prototype.isValid=function(){return a.messageHandler.sendWithPromise("Image.isValid",{img:this.id},this.userPriority)};a.Image.prototype.getImageData=function(){return a.messageHandler.sendWithPromise("Image.getImageData",{img:this.id},this.userPriority).then(function(b){return f(a.Filter,b)})};a.Image.prototype.getImageDataSize=function(){return a.messageHandler.sendWithPromise("Image.getImageDataSize",{img:this.id},this.userPriority)};
a.Image.prototype.getImageColorSpace=function(){return a.messageHandler.sendWithPromise("Image.getImageColorSpace",{img:this.id},this.userPriority).then(function(b){return k(a.ColorSpace,b)})};a.Image.prototype.getImageWidth=function(){return a.messageHandler.sendWithPromise("Image.getImageWidth",{img:this.id},this.userPriority)};a.Image.prototype.getImageHeight=function(){return a.messageHandler.sendWithPromise("Image.getImageHeight",{img:this.id},this.userPriority)};a.Image.prototype.getDecodeArray=
function(){return a.messageHandler.sendWithPromise("Image.getDecodeArray",{img:this.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.Image.prototype.getBitsPerComponent=function(){return a.messageHandler.sendWithPromise("Image.getBitsPerComponent",{img:this.id},this.userPriority)};a.Image.prototype.getComponentNum=function(){return a.messageHandler.sendWithPromise("Image.getComponentNum",{img:this.id},this.userPriority)};a.Image.prototype.isImageMask=function(){return a.messageHandler.sendWithPromise("Image.isImageMask",
{img:this.id},this.userPriority)};a.Image.prototype.isImageInterpolate=function(){return a.messageHandler.sendWithPromise("Image.isImageInterpolate",{img:this.id},this.userPriority)};a.Image.prototype.getMask=function(){return a.messageHandler.sendWithPromise("Image.getMask",{img:this.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.Image.prototype.setMask=function(b){d(arguments.length,1,"setMask","(PDFNet.Image)",[[b,"Object",a.Image,"Image"]]);return a.messageHandler.sendWithPromise("Image.setMask",
{img:this.id,image_mask:b.id},this.userPriority)};a.Image.prototype.setMaskWithObj=function(b){d(arguments.length,1,"setMaskWithObj","(PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("Image.setMaskWithObj",{img:this.id,mask:b.id},this.userPriority)};a.Image.prototype.getSoftMask=function(){return a.messageHandler.sendWithPromise("Image.getSoftMask",{img:this.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.Image.prototype.setSoftMask=function(b){d(arguments.length,
1,"setSoftMask","(PDFNet.Image)",[[b,"Object",a.Image,"Image"]]);return a.messageHandler.sendWithPromise("Image.setSoftMask",{img:this.id,soft_mask:b.id},this.userPriority)};a.Image.prototype.getImageRenderingIntent=function(){return a.messageHandler.sendWithPromise("Image.getImageRenderingIntent",{img:this.id},this.userPriority)};a.Image.prototype.export=function(b){d(arguments.length,1,"export","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("Image.export",{img:this.id,filename:b},
this.userPriority)};a.Image.prototype.exportFromStream=function(b){d(arguments.length,1,"exportFromStream","(PDFNet.FilterWriter)",[[b,"Object",a.FilterWriter,"FilterWriter"]]);return a.messageHandler.sendWithPromise("Image.exportFromStream",{img:this.id,writer:b.id},this.userPriority)};a.Image.prototype.exportAsTiff=function(b){d(arguments.length,1,"exportAsTiff","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("Image.exportAsTiff",{img:this.id,filename:b},this.userPriority)};a.Image.prototype.exportAsTiffFromStream=
function(b){d(arguments.length,1,"exportAsTiffFromStream","(PDFNet.FilterWriter)",[[b,"Object",a.FilterWriter,"FilterWriter"]]);return a.messageHandler.sendWithPromise("Image.exportAsTiffFromStream",{img:this.id,writer:b.id},this.userPriority)};a.Image.prototype.exportAsPng=function(b){d(arguments.length,1,"exportAsPng","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("Image.exportAsPng",{img:this.id,filename:b},this.userPriority)};a.Image.prototype.exportAsPngFromStream=function(b){d(arguments.length,
1,"exportAsPngFromStream","(PDFNet.FilterWriter)",[[b,"Object",a.FilterWriter,"FilterWriter"]]);return a.messageHandler.sendWithPromise("Image.exportAsPngFromStream",{img:this.id,writer:b.id},this.userPriority)};a.PageLabel.create=function(b,c,e,m){"undefined"===typeof e&&(e="");"undefined"===typeof m&&(m=1);d(arguments.length,2,"create","(PDFNet.SDFDoc, number, string, number)",[[b,"SDFDoc"],[c,"number"],[e,"string"],[m,"number"]]);return a.messageHandler.sendWithPromise("pageLabelCreate",{doc:b.id,
style:c,prefix:e,start_at:m},this.userPriority).then(function(b){return new a.PageLabel(b)})};a.PageLabel.createFromObj=function(b,c,e){"undefined"===typeof b&&(b=new a.Obj("0"));"undefined"===typeof c&&(c=-1);"undefined"===typeof e&&(e=-1);d(arguments.length,0,"createFromObj","(PDFNet.Obj, number, number)",[[b,"Object",a.Obj,"Obj"],[c,"number"],[e,"number"]]);return a.messageHandler.sendWithPromise("pageLabelCreateFromObj",{l:b.id,first_page:c,last_page:e},this.userPriority).then(function(b){return new a.PageLabel(b)})};
a.PageLabel.prototype.compare=function(b){d(arguments.length,1,"compare","(PDFNet.PageLabel)",[[b,"Structure",a.PageLabel,"PageLabel"]]);l("compare",this.yieldFunction);n("compare",[[b,0]]);var c=this;this.yieldFunction="PageLabel.compare";return a.messageHandler.sendWithPromise("PageLabel.compare",{l:this,d:b},this.userPriority).then(function(a){c.yieldFunction=void 0;p(a.l,c);return a.result})};a.PageLabel.prototype.isValid=function(){l("isValid",this.yieldFunction);return a.messageHandler.sendWithPromise("PageLabel.isValid",
{l:this},this.userPriority)};a.PageLabel.prototype.getLabelTitle=function(b){d(arguments.length,1,"getLabelTitle","(number)",[[b,"number"]]);l("getLabelTitle",this.yieldFunction);var c=this;this.yieldFunction="PageLabel.getLabelTitle";return a.messageHandler.sendWithPromise("PageLabel.getLabelTitle",{l:this,page_num:b},this.userPriority).then(function(a){c.yieldFunction=void 0;p(a.l,c);return a.result})};a.PageLabel.prototype.setStyle=function(b){d(arguments.length,1,"setStyle","(number)",[[b,"number"]]);
l("setStyle",this.yieldFunction);var c=this;this.yieldFunction="PageLabel.setStyle";return a.messageHandler.sendWithPromise("PageLabel.setStyle",{l:this,style:b},this.userPriority).then(function(a){c.yieldFunction=void 0;p(a,c)})};a.PageLabel.prototype.getStyle=function(){l("getStyle",this.yieldFunction);return a.messageHandler.sendWithPromise("PageLabel.getStyle",{l:this},this.userPriority)};a.PageLabel.prototype.getPrefix=function(){l("getPrefix",this.yieldFunction);return a.messageHandler.sendWithPromise("PageLabel.getPrefix",
{l:this},this.userPriority)};a.PageLabel.prototype.setPrefix=function(b){d(arguments.length,1,"setPrefix","(string)",[[b,"string"]]);l("setPrefix",this.yieldFunction);var c=this;this.yieldFunction="PageLabel.setPrefix";return a.messageHandler.sendWithPromise("PageLabel.setPrefix",{l:this,prefix:b},this.userPriority).then(function(a){c.yieldFunction=void 0;p(a,c)})};a.PageLabel.prototype.getStart=function(){l("getStart",this.yieldFunction);return a.messageHandler.sendWithPromise("PageLabel.getStart",
{l:this},this.userPriority)};a.PageLabel.prototype.setStart=function(b){d(arguments.length,1,"setStart","(number)",[[b,"number"]]);l("setStart",this.yieldFunction);var c=this;this.yieldFunction="PageLabel.setStart";return a.messageHandler.sendWithPromise("PageLabel.setStart",{l:this,start_at:b},this.userPriority).then(function(a){c.yieldFunction=void 0;p(a,c)})};a.PageLabel.prototype.getFirstPageNum=function(){l("getFirstPageNum",this.yieldFunction);var b=this;this.yieldFunction="PageLabel.getFirstPageNum";
return a.messageHandler.sendWithPromise("PageLabel.getFirstPageNum",{l:this},this.userPriority).then(function(a){b.yieldFunction=void 0;p(a.l,b);return a.result})};a.PageLabel.prototype.getLastPageNum=function(){l("getLastPageNum",this.yieldFunction);var b=this;this.yieldFunction="PageLabel.getLastPageNum";return a.messageHandler.sendWithPromise("PageLabel.getLastPageNum",{l:this},this.userPriority).then(function(a){b.yieldFunction=void 0;p(a.l,b);return a.result})};a.PageLabel.prototype.getSDFObj=
function(){l("getSDFObj",this.yieldFunction);return a.messageHandler.sendWithPromise("PageLabel.getSDFObj",{l:this},this.userPriority).then(function(b){return f(a.Obj,b)})};a.PageSet.create=function(){return a.messageHandler.sendWithPromise("pageSetCreate",{},this.userPriority).then(function(b){return k(a.PageSet,b)})};a.PageSet.createSinglePage=function(b){d(arguments.length,1,"createSinglePage","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("pageSetCreateSinglePage",{one_page:b},
this.userPriority).then(function(b){return k(a.PageSet,b)})};a.PageSet.createRange=function(b,c){d(arguments.length,2,"createRange","(number, number)",[[b,"number"],[c,"number"]]);return a.messageHandler.sendWithPromise("pageSetCreateRange",{range_start:b,range_end:c},this.userPriority).then(function(b){return k(a.PageSet,b)})};a.PageSet.createFilteredRange=function(b,c,e){"undefined"===typeof e&&(e=a.PageSet.Filter.e_all);d(arguments.length,2,"createFilteredRange","(number, number, number)",[[b,
"number"],[c,"number"],[e,"number"]]);return a.messageHandler.sendWithPromise("pageSetCreateFilteredRange",{range_start:b,range_end:c,filter:e},this.userPriority).then(function(b){return k(a.PageSet,b)})};a.PageSet.prototype.addPage=function(b){d(arguments.length,1,"addPage","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("PageSet.addPage",{page_set:this.id,one_page:b},this.userPriority)};a.PageSet.prototype.addRange=function(b,c,e){"undefined"===typeof e&&(e=a.PageSet.Filter.e_all);
d(arguments.length,2,"addRange","(number, number, number)",[[b,"number"],[c,"number"],[e,"number"]]);return a.messageHandler.sendWithPromise("PageSet.addRange",{page_set:this.id,range_start:b,range_end:c,filter:e},this.userPriority)};a.PatternColor.create=function(b){d(arguments.length,1,"create","(PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("patternColorCreate",{pattern:b.id},this.userPriority).then(function(b){return k(a.PatternColor,b)})};a.PatternColor.getTypeFromObj=
function(b){d(arguments.length,1,"getTypeFromObj","(PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("patternColorGetTypeFromObj",{pattern:b.id},this.userPriority)};a.PatternColor.prototype.getType=function(){return a.messageHandler.sendWithPromise("PatternColor.getType",{pc:this.id},this.userPriority)};a.PatternColor.prototype.getSDFObj=function(){return a.messageHandler.sendWithPromise("PatternColor.getSDFObj",{pc:this.id},this.userPriority).then(function(b){return f(a.Obj,
b)})};a.PatternColor.prototype.getMatrix=function(){return a.messageHandler.sendWithPromise("PatternColor.getMatrix",{pc:this.id},this.userPriority).then(function(b){return new a.Matrix2D(b)})};a.PatternColor.prototype.getShading=function(){return a.messageHandler.sendWithPromise("PatternColor.getShading",{pc:this.id},this.userPriority).then(function(b){return k(a.Shading,b)})};a.PatternColor.prototype.getTilingType=function(){return a.messageHandler.sendWithPromise("PatternColor.getTilingType",{pc:this.id},
this.userPriority)};a.PatternColor.prototype.getBBox=function(){return a.messageHandler.sendWithPromise("PatternColor.getBBox",{pc:this.id},this.userPriority).then(function(b){return new a.Rect(b)})};a.PatternColor.prototype.getXStep=function(){return a.messageHandler.sendWithPromise("PatternColor.getXStep",{pc:this.id},this.userPriority)};a.PatternColor.prototype.getYStep=function(){return a.messageHandler.sendWithPromise("PatternColor.getYStep",{pc:this.id},this.userPriority)};a.GeometryCollection.prototype.snapToNearest=
function(b,c,e){d(arguments.length,3,"snapToNearest","(number, number, number)",[[b,"number"],[c,"number"],[e,"number"]]);return a.messageHandler.sendWithPromise("GeometryCollection.snapToNearest",{self:this.id,x:b,y:c,mode:e},this.userPriority)};a.GeometryCollection.prototype.snapToNearestPixel=function(b,c,e,m){d(arguments.length,4,"snapToNearestPixel","(number, number, number, number)",[[b,"number"],[c,"number"],[e,"number"],[m,"number"]]);return a.messageHandler.sendWithPromise("GeometryCollection.snapToNearestPixel",
{self:this.id,x:b,y:c,dpi:e,mode:m},this.userPriority)};a.ObjectIdentifier.createFromPredefined=function(b){d(arguments.length,1,"createFromPredefined","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("objectIdentifierCreateFromPredefined",{in_oid_enum:b},this.userPriority).then(function(b){return k(a.ObjectIdentifier,b)})};a.ObjectIdentifier.createFromIntArray=function(b){d(arguments.length,1,"createFromIntArray","(Array<number>)",[[b,"Array"]]);return a.messageHandler.sendWithPromise("objectIdentifierCreateFromIntArray",
{in_list:b},this.userPriority).then(function(b){return k(a.ObjectIdentifier,b)})};a.ObjectIdentifier.prototype.getRawValue=function(){return a.messageHandler.sendWithPromise("ObjectIdentifier.getRawValue",{self:this.id},this.userPriority)};a.X501DistinguishedName.prototype.hasAttribute=function(b){d(arguments.length,1,"hasAttribute","(PDFNet.ObjectIdentifier)",[[b,"Object",a.ObjectIdentifier,"ObjectIdentifier"]]);return a.messageHandler.sendWithPromise("X501DistinguishedName.hasAttribute",{self:this.id,
in_oid:b.id},this.userPriority)};a.X501DistinguishedName.prototype.getStringValuesForAttribute=function(b){d(arguments.length,1,"getStringValuesForAttribute","(PDFNet.ObjectIdentifier)",[[b,"Object",a.ObjectIdentifier,"ObjectIdentifier"]]);return a.messageHandler.sendWithPromise("X501DistinguishedName.getStringValuesForAttribute",{self:this.id,in_oid:b.id},this.userPriority)};a.X501DistinguishedName.prototype.getAllAttributesAndValues=function(){return a.messageHandler.sendWithPromise("X501DistinguishedName.getAllAttributesAndValues",
{self:this.id},this.userPriority).then(function(b){for(var c=[],e=0;e<b.length;++e){var d=b[e];if("0"===d)return null;d=new a.X501AttributeTypeAndValue(d);c.push(d);createdObjects.push({name:d.name,id:d.id})}return c})};a.X509Certificate.prototype.getIssuerField=function(){return a.messageHandler.sendWithPromise("X509Certificate.getIssuerField",{self:this.id},this.userPriority).then(function(b){return k(a.X501DistinguishedName,b)})};a.X509Certificate.prototype.getSubjectField=function(){return a.messageHandler.sendWithPromise("X509Certificate.getSubjectField",
{self:this.id},this.userPriority).then(function(b){return k(a.X501DistinguishedName,b)})};a.X509Certificate.prototype.getNotBeforeEpochTime=function(){return a.messageHandler.sendWithPromise("X509Certificate.getNotBeforeEpochTime",{self:this.id},this.userPriority)};a.X509Certificate.prototype.getNotAfterEpochTime=function(){return a.messageHandler.sendWithPromise("X509Certificate.getNotAfterEpochTime",{self:this.id},this.userPriority)};a.X509Certificate.prototype.getRawX509VersionNumber=function(){return a.messageHandler.sendWithPromise("X509Certificate.getRawX509VersionNumber",
{self:this.id},this.userPriority)};a.X509Certificate.prototype.toString=function(){return a.messageHandler.sendWithPromise("X509Certificate.toString",{self:this.id},this.userPriority)};a.X509Certificate.prototype.getFingerprint=function(b){"undefined"===typeof b&&(b=a.DigestAlgorithm.Type.e_SHA256);d(arguments.length,0,"getFingerprint","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("X509Certificate.getFingerprint",{self:this.id,in_digest_algorithm:b},this.userPriority)};a.X509Certificate.prototype.getSerialNumber=
function(){return a.messageHandler.sendWithPromise("X509Certificate.getSerialNumber",{self:this.id},this.userPriority).then(function(a){return new Uint8Array(a)})};a.X509Certificate.prototype.getExtensions=function(){return a.messageHandler.sendWithPromise("X509Certificate.getExtensions",{self:this.id},this.userPriority).then(function(b){for(var c=[],e=0;e<b.length;++e){var d=b[e];if("0"===d)return null;d=new a.X509Extension(d);c.push(d);createdObjects.push({name:d.name,id:d.id})}return c})};a.X509Certificate.prototype.getData=
function(){return a.messageHandler.sendWithPromise("X509Certificate.getData",{self:this.id},this.userPriority).then(function(a){return new Uint8Array(a)})};a.TimestampingConfiguration.createFromURL=function(b){d(arguments.length,1,"createFromURL","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("timestampingConfigurationCreateFromURL",{in_url:b},this.userPriority).then(function(b){return k(a.TimestampingConfiguration,b)})};a.TimestampingConfiguration.prototype.setTimestampAuthorityServerURL=
function(b){d(arguments.length,1,"setTimestampAuthorityServerURL","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("TimestampingConfiguration.setTimestampAuthorityServerURL",{self:this.id,in_url:b},this.userPriority)};a.TimestampingConfiguration.prototype.setTimestampAuthorityServerUsername=function(b){d(arguments.length,1,"setTimestampAuthorityServerUsername","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("TimestampingConfiguration.setTimestampAuthorityServerUsername",
{self:this.id,in_username:b},this.userPriority)};a.TimestampingConfiguration.prototype.setTimestampAuthorityServerPassword=function(b){d(arguments.length,1,"setTimestampAuthorityServerPassword","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("TimestampingConfiguration.setTimestampAuthorityServerPassword",{self:this.id,in_password:b},this.userPriority)};a.TimestampingConfiguration.prototype.setUseNonce=function(b){d(arguments.length,1,"setUseNonce","(boolean)",[[b,"boolean"]]);return a.messageHandler.sendWithPromise("TimestampingConfiguration.setUseNonce",
{self:this.id,in_use_nonce:b},this.userPriority)};a.TimestampingConfiguration.prototype.testConfiguration=function(b){d(arguments.length,1,"testConfiguration","(PDFNet.VerificationOptions)",[[b,"Object",a.VerificationOptions,"VerificationOptions"]]);return a.messageHandler.sendWithPromise("TimestampingConfiguration.testConfiguration",{self:this.id,in_opts:b.id},this.userPriority).then(function(b){return k(a.TimestampingTestResult,b)})};a.DigitalSignatureField.prototype.hasCryptographicSignature=function(){l("hasCryptographicSignature",
this.yieldFunction);return a.messageHandler.sendWithPromise("DigitalSignatureField.hasCryptographicSignature",{self:this},this.userPriority)};a.DigitalSignatureField.prototype.getSubFilter=function(){l("getSubFilter",this.yieldFunction);return a.messageHandler.sendWithPromise("DigitalSignatureField.getSubFilter",{self:this},this.userPriority)};a.DigitalSignatureField.prototype.getSignatureName=function(){l("getSignatureName",this.yieldFunction);return a.messageHandler.sendWithPromise("DigitalSignatureField.getSignatureName",
{self:this},this.userPriority)};a.DigitalSignatureField.prototype.getLocation=function(){l("getLocation",this.yieldFunction);return a.messageHandler.sendWithPromise("DigitalSignatureField.getLocation",{self:this},this.userPriority)};a.DigitalSignatureField.prototype.getReason=function(){l("getReason",this.yieldFunction);return a.messageHandler.sendWithPromise("DigitalSignatureField.getReason",{self:this},this.userPriority)};a.DigitalSignatureField.prototype.getContactInfo=function(){l("getContactInfo",
this.yieldFunction);return a.messageHandler.sendWithPromise("DigitalSignatureField.getContactInfo",{self:this},this.userPriority)};a.DigitalSignatureField.prototype.getCertCount=function(){l("getCertCount",this.yieldFunction);return a.messageHandler.sendWithPromise("DigitalSignatureField.getCertCount",{self:this},this.userPriority)};a.DigitalSignatureField.prototype.hasVisibleAppearance=function(){l("hasVisibleAppearance",this.yieldFunction);return a.messageHandler.sendWithPromise("DigitalSignatureField.hasVisibleAppearance",
{self:this},this.userPriority)};a.DigitalSignatureField.prototype.setContactInfo=function(b){d(arguments.length,1,"setContactInfo","(string)",[[b,"string"]]);l("setContactInfo",this.yieldFunction);var c=this;this.yieldFunction="DigitalSignatureField.setContactInfo";return a.messageHandler.sendWithPromise("DigitalSignatureField.setContactInfo",{self:this,in_contact_info:b},this.userPriority).then(function(a){c.yieldFunction=void 0;p(a,c)})};a.DigitalSignatureField.prototype.setLocation=function(b){d(arguments.length,
1,"setLocation","(string)",[[b,"string"]]);l("setLocation",this.yieldFunction);var c=this;this.yieldFunction="DigitalSignatureField.setLocation";return a.messageHandler.sendWithPromise("DigitalSignatureField.setLocation",{self:this,in_location:b},this.userPriority).then(function(a){c.yieldFunction=void 0;p(a,c)})};a.DigitalSignatureField.prototype.setReason=function(b){d(arguments.length,1,"setReason","(string)",[[b,"string"]]);l("setReason",this.yieldFunction);var c=this;this.yieldFunction="DigitalSignatureField.setReason";
return a.messageHandler.sendWithPromise("DigitalSignatureField.setReason",{self:this,in_reason:b},this.userPriority).then(function(a){c.yieldFunction=void 0;p(a,c)})};a.DigitalSignatureField.prototype.setDocumentPermissions=function(b){d(arguments.length,1,"setDocumentPermissions","(number)",[[b,"number"]]);l("setDocumentPermissions",this.yieldFunction);var c=this;this.yieldFunction="DigitalSignatureField.setDocumentPermissions";return a.messageHandler.sendWithPromise("DigitalSignatureField.setDocumentPermissions",
{self:this,in_perms:b},this.userPriority).then(function(a){c.yieldFunction=void 0;p(a,c)})};a.DigitalSignatureField.prototype.signOnNextSave=function(b,c){d(arguments.length,2,"signOnNextSave","(string, string)",[[b,"string"],[c,"string"]]);l("signOnNextSave",this.yieldFunction);var e=this;this.yieldFunction="DigitalSignatureField.signOnNextSave";return a.messageHandler.sendWithPromise("DigitalSignatureField.signOnNextSave",{self:this,in_pkcs12_keyfile_path:b,in_password:c},this.userPriority).then(function(a){e.yieldFunction=
void 0;p(a,e)})};a.DigitalSignatureField.prototype.certifyOnNextSave=function(b,c){d(arguments.length,2,"certifyOnNextSave","(string, string)",[[b,"string"],[c,"string"]]);l("certifyOnNextSave",this.yieldFunction);var e=this;this.yieldFunction="DigitalSignatureField.certifyOnNextSave";return a.messageHandler.sendWithPromise("DigitalSignatureField.certifyOnNextSave",{self:this,in_pkcs12_keyfile_path:b,in_password:c},this.userPriority).then(function(a){e.yieldFunction=void 0;p(a,e)})};a.DigitalSignatureField.prototype.isLockedByDigitalSignature=
function(){l("isLockedByDigitalSignature",this.yieldFunction);return a.messageHandler.sendWithPromise("DigitalSignatureField.isLockedByDigitalSignature",{self:this},this.userPriority)};a.DigitalSignatureField.prototype.getDocumentPermissions=function(){l("getDocumentPermissions",this.yieldFunction);return a.messageHandler.sendWithPromise("DigitalSignatureField.getDocumentPermissions",{self:this},this.userPriority)};a.DigitalSignatureField.prototype.clearSignature=function(){l("clearSignature",this.yieldFunction);
var b=this;this.yieldFunction="DigitalSignatureField.clearSignature";return a.messageHandler.sendWithPromise("DigitalSignatureField.clearSignature",{self:this},this.userPriority).then(function(a){b.yieldFunction=void 0;p(a,b)})};a.DigitalSignatureField.createFromField=function(b){d(arguments.length,1,"createFromField","(PDFNet.Field)",[[b,"Structure",a.Field,"Field"]]);n("createFromField",[[b,0]]);return a.messageHandler.sendWithPromise("digitalSignatureFieldCreateFromField",{in_field:b},this.userPriority).then(function(b){return new a.DigitalSignatureField(b)})};
a.DigitalSignatureField.prototype.getSigningTime=function(){l("getSigningTime",this.yieldFunction);return a.messageHandler.sendWithPromise("DigitalSignatureField.getSigningTime",{self:this},this.userPriority).then(function(b){return new a.Date(b)})};a.DigitalSignatureField.prototype.getCert=function(b){d(arguments.length,1,"getCert","(number)",[[b,"number"]]);l("getCert",this.yieldFunction);return a.messageHandler.sendWithPromise("DigitalSignatureField.getCert",{self:this,in_index:b},this.userPriority).then(function(a){return new Uint8Array(a)})};
a.DigitalSignatureField.prototype.setFieldPermissions=function(b,c){"undefined"===typeof c&&(c=[]);d(arguments.length,1,"setFieldPermissions","(number, Array<string>)",[[b,"number"],[c,"Array"]]);l("setFieldPermissions",this.yieldFunction);var e=this;this.yieldFunction="DigitalSignatureField.setFieldPermissions";return a.messageHandler.sendWithPromise("DigitalSignatureField.setFieldPermissions",{self:this,in_action:b,in_field_names_list:c},this.userPriority).then(function(a){e.yieldFunction=void 0;
p(a,e)})};a.DigitalSignatureField.prototype.signOnNextSaveFromBuffer=function(b,c){d(arguments.length,2,"signOnNextSaveFromBuffer","(ArrayBuffer|TypedArray, string)",[[b,"ArrayBuffer"],[c,"string"]]);l("signOnNextSaveFromBuffer",this.yieldFunction);var e=this;this.yieldFunction="DigitalSignatureField.signOnNextSaveFromBuffer";var f=v(b,!1);return a.messageHandler.sendWithPromise("DigitalSignatureField.signOnNextSaveFromBuffer",{self:this,in_pkcs12_buffer:f,in_password:c},this.userPriority).then(function(a){e.yieldFunction=
void 0;p(a,e)})};a.DigitalSignatureField.prototype.signOnNextSaveWithCustomHandler=function(b){d(arguments.length,1,"signOnNextSaveWithCustomHandler","(number)",[[b,"number"]]);l("signOnNextSaveWithCustomHandler",this.yieldFunction);var c=this;this.yieldFunction="DigitalSignatureField.signOnNextSaveWithCustomHandler";return a.messageHandler.sendWithPromise("DigitalSignatureField.signOnNextSaveWithCustomHandler",{self:this,in_signature_handler_id:b},this.userPriority).then(function(a){c.yieldFunction=
void 0;p(a,c)})};a.DigitalSignatureField.prototype.certifyOnNextSaveFromBuffer=function(b,c){d(arguments.length,2,"certifyOnNextSaveFromBuffer","(ArrayBuffer|TypedArray, string)",[[b,"ArrayBuffer"],[c,"string"]]);l("certifyOnNextSaveFromBuffer",this.yieldFunction);var e=this;this.yieldFunction="DigitalSignatureField.certifyOnNextSaveFromBuffer";var f=v(b,!1);return a.messageHandler.sendWithPromise("DigitalSignatureField.certifyOnNextSaveFromBuffer",{self:this,in_pkcs12_buffer:f,in_password:c},this.userPriority).then(function(a){e.yieldFunction=
void 0;p(a,e)})};a.DigitalSignatureField.prototype.certifyOnNextSaveWithCustomHandler=function(b){d(arguments.length,1,"certifyOnNextSaveWithCustomHandler","(number)",[[b,"number"]]);l("certifyOnNextSaveWithCustomHandler",this.yieldFunction);var c=this;this.yieldFunction="DigitalSignatureField.certifyOnNextSaveWithCustomHandler";return a.messageHandler.sendWithPromise("DigitalSignatureField.certifyOnNextSaveWithCustomHandler",{self:this,in_signature_handler_id:b},this.userPriority).then(function(a){c.yieldFunction=
void 0;p(a,c)})};a.DigitalSignatureField.prototype.getSDFObj=function(){l("getSDFObj",this.yieldFunction);return a.messageHandler.sendWithPromise("DigitalSignatureField.getSDFObj",{self:this},this.userPriority).then(function(b){return f(a.Obj,b)})};a.DigitalSignatureField.prototype.getLockedFields=function(){l("getLockedFields",this.yieldFunction);return a.messageHandler.sendWithPromise("DigitalSignatureField.getLockedFields",{self:this},this.userPriority)};a.DigitalSignatureField.prototype.verify=
function(b){d(arguments.length,1,"verify","(PDFNet.VerificationOptions)",[[b,"Object",a.VerificationOptions,"VerificationOptions"]]);l("verify",this.yieldFunction);return a.messageHandler.sendWithPromise("DigitalSignatureField.verify",{self:this,in_opts:b.id},this.userPriority).then(function(b){return k(a.VerificationResult,b)})};a.DigitalSignatureField.prototype.isCertification=function(){l("isCertification",this.yieldFunction);return a.messageHandler.sendWithPromise("DigitalSignatureField.isCertification",
{self:this},this.userPriority)};a.DigitalSignatureField.prototype.getSignerCertFromCMS=function(){l("getSignerCertFromCMS",this.yieldFunction);return a.messageHandler.sendWithPromise("DigitalSignatureField.getSignerCertFromCMS",{self:this},this.userPriority).then(function(b){return k(a.X509Certificate,b)})};a.DigitalSignatureField.prototype.getByteRanges=function(){l("getByteRanges",this.yieldFunction);return a.messageHandler.sendWithPromise("DigitalSignatureField.getByteRanges",{self:this},this.userPriority).then(function(b){for(var c=
[],e=0;e<b.length;++e){var d=b[e];if("0"===d)return null;d=new a.ByteRange(d);c.push(d)}return c})};a.DigitalSignatureField.prototype.getCertPathsFromCMS=function(b){d(arguments.length,1,"getCertPathsFromCMS","(number)",[[b,"number"]]);l("getCertPathsFromCMS",this.yieldFunction);return a.messageHandler.sendWithPromise("DigitalSignatureField.getCertPathsFromCMS",{self:this,index:b},this.userPriority)};a.DigitalSignatureField.prototype.getCertPathsFromCMSGetOutterVecSize=function(){l("getCertPathsFromCMSGetOutterVecSize",
this.yieldFunction);return a.messageHandler.sendWithPromise("DigitalSignatureField.getCertPathsFromCMSGetOutterVecSize",{self:this},this.userPriority)};a.DigitalSignatureField.prototype.enableLTVOfflineVerification=function(b){d(arguments.length,1,"enableLTVOfflineVerification","(PDFNet.VerificationResult)",[[b,"Object",a.VerificationResult,"VerificationResult"]]);l("enableLTVOfflineVerification",this.yieldFunction);return a.messageHandler.sendWithPromise("DigitalSignatureField.enableLTVOfflineVerification",
{self:this,in_verification_result:b.id},this.userPriority)};a.DigitalSignatureField.prototype.timestampOnNextSave=function(b,c){d(arguments.length,2,"timestampOnNextSave","(PDFNet.TimestampingConfiguration, PDFNet.VerificationOptions)",[[b,"Object",a.TimestampingConfiguration,"TimestampingConfiguration"],[c,"Object",a.VerificationOptions,"VerificationOptions"]]);l("timestampOnNextSave",this.yieldFunction);return a.messageHandler.sendWithPromise("DigitalSignatureField.timestampOnNextSave",{self:this,
in_timestamping_config:b.id,in_timestamp_response_verification_options:c.id},this.userPriority)};a.DigitalSignatureField.prototype.useSubFilter=function(b,c){"undefined"===typeof c&&(c=!0);d(arguments.length,1,"useSubFilter","(number, boolean)",[[b,"number"],[c,"boolean"]]);l("useSubFilter",this.yieldFunction);var e=this;this.yieldFunction="DigitalSignatureField.useSubFilter";return a.messageHandler.sendWithPromise("DigitalSignatureField.useSubFilter",{self:this,in_subfilter_type:b,in_make_mandatory:c},
this.userPriority).then(function(a){e.yieldFunction=void 0;p(a,e)})};a.PDFDoc.prototype.getTriggerAction=function(b){d(arguments.length,1,"getTriggerAction","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("PDFDoc.getTriggerAction",{doc:this.id,trigger:b},this.userPriority).then(function(b){return f(a.Obj,b)})};a.PDFDoc.create=function(){return a.messageHandler.sendWithPromise("pdfDocCreate",{},this.userPriority).then(function(b){return k(a.PDFDoc,b)})};a.PDFDoc.createFromUFilePath=
function(b){d(arguments.length,1,"createFromUFilePath","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("pdfDocCreateFromUFilePath",{filepath:b},this.userPriority).then(function(b){return k(a.PDFDoc,b)})};a.PDFDoc.createFromFilePath=function(b){d(arguments.length,1,"createFromFilePath","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("pdfDocCreateFromFilePath",{filepath:b},this.userPriority).then(function(b){return k(a.PDFDoc,b)})};a.PDFDoc.createFromFilter=function(b){d(arguments.length,
1,"createFromFilter","(PDFNet.Filter)",[[b,"Object",a.Filter,"Filter"]]);0!=b.id&&r(b.id);return a.messageHandler.sendWithPromise("pdfDocCreateFromFilter",{no_own_stream:b.id},this.userPriority).then(function(b){return k(a.PDFDoc,b)})};a.PDFDoc.createFromBuffer=function(b){d(arguments.length,1,"createFromBuffer","(ArrayBuffer|TypedArray)",[[b,"ArrayBuffer"]]);var c=v(b,!1);return a.messageHandler.sendWithPromise("pdfDocCreateFromBuffer",{buf:c},this.userPriority).then(function(b){return k(a.PDFDoc,
b)})};a.PDFDoc.createFromLayoutEls=function(b){d(arguments.length,1,"createFromLayoutEls","(ArrayBuffer|TypedArray)",[[b,"ArrayBuffer"]]);var c=v(b,!1);return a.messageHandler.sendWithPromise("pdfDocCreateFromLayoutEls",{buf:c},this.userPriority).then(function(b){return k(a.PDFDoc,b)})};a.PDFDoc.prototype.createShallowCopy=function(){return a.messageHandler.sendWithPromise("PDFDoc.createShallowCopy",{source:this.id},this.userPriority).then(function(b){return k(a.PDFDoc,b)})};a.PDFDoc.prototype.isEncrypted=
function(){return a.messageHandler.sendWithPromise("PDFDoc.isEncrypted",{doc:this.id},this.userPriority)};a.PDFDoc.prototype.initStdSecurityHandlerUString=function(b){d(arguments.length,1,"initStdSecurityHandlerUString","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("PDFDoc.initStdSecurityHandlerUString",{doc:this.id,password:b},this.userPriority)};a.PDFDoc.prototype.initStdSecurityHandlerBuffer=function(b){d(arguments.length,1,"initStdSecurityHandlerBuffer","(ArrayBuffer|TypedArray)",
[[b,"ArrayBuffer"]]);var c=v(b,!1);return a.messageHandler.sendWithPromise("PDFDoc.initStdSecurityHandlerBuffer",{doc:this.id,password_buf:c},this.userPriority)};a.PDFDoc.prototype.getSecurityHandler=function(){return a.messageHandler.sendWithPromise("PDFDoc.getSecurityHandler",{doc:this.id},this.userPriority).then(function(b){return f(a.SecurityHandler,b)})};a.PDFDoc.prototype.setSecurityHandler=function(b){d(arguments.length,1,"setSecurityHandler","(PDFNet.SecurityHandler)",[[b,"Object",a.SecurityHandler,
"SecurityHandler"]]);0!=b.id&&r(b.id);return a.messageHandler.sendWithPromise("PDFDoc.setSecurityHandler",{doc:this.id,no_own_handler:b.id},this.userPriority)};a.PDFDoc.prototype.removeSecurity=function(){return a.messageHandler.sendWithPromise("PDFDoc.removeSecurity",{doc:this.id},this.userPriority)};a.PDFDoc.prototype.getDocInfo=function(){return a.messageHandler.sendWithPromise("PDFDoc.getDocInfo",{doc:this.id},this.userPriority).then(function(b){return f(a.PDFDocInfo,b)})};a.PDFDoc.prototype.getViewPrefs=
function(){return a.messageHandler.sendWithPromise("PDFDoc.getViewPrefs",{doc:this.id},this.userPriority).then(function(b){return f(a.PDFDocViewPrefs,b)})};a.PDFDoc.prototype.isModified=function(){return a.messageHandler.sendWithPromise("PDFDoc.isModified",{doc:this.id},this.userPriority)};a.PDFDoc.prototype.hasRepairedXRef=function(){return a.messageHandler.sendWithPromise("PDFDoc.hasRepairedXRef",{doc:this.id},this.userPriority)};a.PDFDoc.prototype.isLinearized=function(){return a.messageHandler.sendWithPromise("PDFDoc.isLinearized",
{doc:this.id},this.userPriority)};a.PDFDoc.prototype.save=function(b,c){d(arguments.length,2,"save","(string, number)",[[b,"string"],[c,"number"]]);return a.messageHandler.sendWithPromise("PDFDoc.save",{doc:this.id,path:b,flags:c},this.userPriority)};a.PDFDoc.prototype.saveMemoryBuffer=function(b){d(arguments.length,1,"saveMemoryBuffer","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("PDFDoc.saveMemoryBuffer",{doc:this.id,flags:b},this.userPriority).then(function(a){return new Uint8Array(a)})};
a.PDFDoc.prototype.saveStream=function(b,c){d(arguments.length,2,"saveStream","(PDFNet.Filter, number)",[[b,"Object",a.Filter,"Filter"],[c,"number"]]);return a.messageHandler.sendWithPromise("PDFDoc.saveStream",{doc:this.id,stream:b.id,flags:c},this.userPriority)};a.PDFDoc.prototype.getPageIterator=function(b){"undefined"===typeof b&&(b=1);d(arguments.length,0,"getPageIterator","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("PDFDoc.getPageIterator",{doc:this.id,page_number:b},
this.userPriority).then(function(b){return k(a.Iterator,b,"Page")})};a.PDFDoc.prototype.getPage=function(b){d(arguments.length,1,"getPage","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("PDFDoc.getPage",{doc:this.id,page_number:b},this.userPriority).then(function(b){return f(a.Page,b)})};a.PDFDoc.prototype.pageRemove=function(b){d(arguments.length,1,"pageRemove","(PDFNet.Iterator)",[[b,"Object",a.Iterator,"Iterator"]]);return a.messageHandler.sendWithPromise("PDFDoc.pageRemove",
{doc:this.id,page_itr:b.id},this.userPriority)};a.PDFDoc.prototype.pageInsert=function(b,c){d(arguments.length,2,"pageInsert","(PDFNet.Iterator, PDFNet.Page)",[[b,"Object",a.Iterator,"Iterator"],[c,"Object",a.Page,"Page"]]);return a.messageHandler.sendWithPromise("PDFDoc.pageInsert",{doc:this.id,where:b.id,page:c.id},this.userPriority)};a.PDFDoc.prototype.insertPages=function(b,c,e,f,g){d(arguments.length,5,"insertPages","(number, PDFNet.PDFDoc, number, number, number)",[[b,"number"],[c,"PDFDoc"],
[e,"number"],[f,"number"],[g,"number"]]);return a.messageHandler.sendWithPromise("PDFDoc.insertPages",{dest_doc:this.id,insert_before_page_number:b,src_doc:c.id,start_page:e,end_page:f,flag:g},this.userPriority)};a.PDFDoc.prototype.insertPageSet=function(b,c,e,f){d(arguments.length,4,"insertPageSet","(number, PDFNet.PDFDoc, PDFNet.PageSet, number)",[[b,"number"],[c,"PDFDoc"],[e,"Object",a.PageSet,"PageSet"],[f,"number"]]);return a.messageHandler.sendWithPromise("PDFDoc.insertPageSet",{dest_doc:this.id,
insert_before_page_number:b,src_doc:c.id,source_page_set:e.id,flag:f},this.userPriority)};a.PDFDoc.prototype.movePages=function(b,c,e,f,g){d(arguments.length,5,"movePages","(number, PDFNet.PDFDoc, number, number, number)",[[b,"number"],[c,"PDFDoc"],[e,"number"],[f,"number"],[g,"number"]]);return a.messageHandler.sendWithPromise("PDFDoc.movePages",{dest_doc:this.id,move_before_page_number:b,src_doc:c.id,start_page:e,end_page:f,flag:g},this.userPriority)};a.PDFDoc.prototype.movePageSet=function(b,c,
e,f){d(arguments.length,4,"movePageSet","(number, PDFNet.PDFDoc, PDFNet.PageSet, number)",[[b,"number"],[c,"PDFDoc"],[e,"Object",a.PageSet,"PageSet"],[f,"number"]]);return a.messageHandler.sendWithPromise("PDFDoc.movePageSet",{dest_doc:this.id,move_before_page_number:b,src_doc:c.id,source_page_set:e.id,flag:f},this.userPriority)};a.PDFDoc.prototype.pagePushFront=function(b){d(arguments.length,1,"pagePushFront","(PDFNet.Page)",[[b,"Object",a.Page,"Page"]]);return a.messageHandler.sendWithPromise("PDFDoc.pagePushFront",
{doc:this.id,page:b.id},this.userPriority)};a.PDFDoc.prototype.pagePushBack=function(b){d(arguments.length,1,"pagePushBack","(PDFNet.Page)",[[b,"Object",a.Page,"Page"]]);return a.messageHandler.sendWithPromise("PDFDoc.pagePushBack",{doc:this.id,page:b.id},this.userPriority)};a.PDFDoc.prototype.pageCreate=function(b){"undefined"===typeof b&&(b=new a.Rect(0,0,612,792));d(arguments.length,0,"pageCreate","(PDFNet.Rect)",[[b,"Structure",a.Rect,"Rect"]]);n("pageCreate",[[b,0]]);return a.messageHandler.sendWithPromise("PDFDoc.pageCreate",
{doc:this.id,media_box:b},this.userPriority).then(function(b){return f(a.Page,b)})};a.PDFDoc.prototype.appendTextDiffPage=function(b,c){d(arguments.length,2,"appendTextDiffPage","(PDFNet.Page, PDFNet.Page)",[[b,"Object",a.Page,"Page"],[c,"Object",a.Page,"Page"]]);return a.messageHandler.sendWithPromise("PDFDoc.appendTextDiffPage",{doc:this.id,page1:b.id,page2:c.id},this.userPriority)};a.PDFDoc.prototype.appendTextDiffDoc=function(b,c){d(arguments.length,2,"appendTextDiffDoc","(PDFNet.PDFDoc, PDFNet.PDFDoc)",
[[b,"PDFDoc"],[c,"PDFDoc"]]);return a.messageHandler.sendWithPromise("PDFDoc.appendTextDiffDoc",{doc:this.id,doc1:b.id,doc2:c.id},this.userPriority)};a.PDFDoc.prototype.getFirstBookmark=function(){return a.messageHandler.sendWithPromise("PDFDoc.getFirstBookmark",{doc:this.id},this.userPriority).then(function(b){return f(a.Bookmark,b)})};a.PDFDoc.prototype.addRootBookmark=function(b){d(arguments.length,1,"addRootBookmark","(PDFNet.Bookmark)",[[b,"Object",a.Bookmark,"Bookmark"]]);return a.messageHandler.sendWithPromise("PDFDoc.addRootBookmark",
{doc:this.id,root_bookmark:b.id},this.userPriority)};a.PDFDoc.prototype.getTrailer=function(){return a.messageHandler.sendWithPromise("PDFDoc.getTrailer",{doc:this.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.PDFDoc.prototype.getRoot=function(){return a.messageHandler.sendWithPromise("PDFDoc.getRoot",{doc:this.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.PDFDoc.prototype.jsContextInitialize=function(){return a.messageHandler.sendWithPromise("PDFDoc.jsContextInitialize",
{doc:this.id},this.userPriority)};a.PDFDoc.prototype.getPages=function(){return a.messageHandler.sendWithPromise("PDFDoc.getPages",{doc:this.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.PDFDoc.prototype.getPageCount=function(){return a.messageHandler.sendWithPromise("PDFDoc.getPageCount",{doc:this.id},this.userPriority)};a.PDFDoc.prototype.getDownloadedByteCount=function(){return a.messageHandler.sendWithPromise("PDFDoc.getDownloadedByteCount",{doc:this.id},this.userPriority)};a.PDFDoc.prototype.getTotalRemoteByteCount=
function(){return a.messageHandler.sendWithPromise("PDFDoc.getTotalRemoteByteCount",{doc:this.id},this.userPriority)};a.PDFDoc.prototype.getFieldIteratorBegin=function(){return a.messageHandler.sendWithPromise("PDFDoc.getFieldIteratorBegin",{doc:this.id},this.userPriority).then(function(b){return k(a.Iterator,b,"Field")})};a.PDFDoc.prototype.getFieldIterator=function(b){d(arguments.length,1,"getFieldIterator","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("PDFDoc.getFieldIterator",
{doc:this.id,field_name:b},this.userPriority).then(function(b){return k(a.Iterator,b,"Field")})};a.PDFDoc.prototype.getField=function(b){d(arguments.length,1,"getField","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("PDFDoc.getField",{doc:this.id,field_name:b},this.userPriority).then(function(b){return new a.Field(b)})};a.PDFDoc.prototype.fieldCreate=function(b,c,e,f){"undefined"===typeof e&&(e=new a.Obj("0"));"undefined"===typeof f&&(f=new a.Obj("0"));d(arguments.length,2,"fieldCreate",
"(string, number, PDFNet.Obj, PDFNet.Obj)",[[b,"string"],[c,"number"],[e,"Object",a.Obj,"Obj"],[f,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("PDFDoc.fieldCreate",{doc:this.id,field_name:b,type:c,field_value:e.id,def_field_value:f.id},this.userPriority).then(function(b){return new a.Field(b)})};a.PDFDoc.prototype.fieldCreateFromStrings=function(b,c,e,f){"undefined"===typeof f&&(f="");d(arguments.length,3,"fieldCreateFromStrings","(string, number, string, string)",[[b,"string"],
[c,"number"],[e,"string"],[f,"string"]]);return a.messageHandler.sendWithPromise("PDFDoc.fieldCreateFromStrings",{doc:this.id,field_name:b,type:c,field_value:e,def_field_value:f},this.userPriority).then(function(b){return new a.Field(b)})};a.PDFDoc.prototype.refreshFieldAppearances=function(){return a.messageHandler.sendWithPromise("PDFDoc.refreshFieldAppearances",{doc:this.id},this.userPriority)};a.PDFDoc.prototype.refreshAnnotAppearances=function(b){"undefined"===typeof b&&(b=null);d(arguments.length,
0,"refreshAnnotAppearances","(PDFNet.OptionBase)",[[b,"OptionBase"]]);n("refreshAnnotAppearances",[[b,0]]);b=b?b.getJsonString():"{}";return a.messageHandler.sendWithPromise("PDFDoc.refreshAnnotAppearances",{doc:this.id,options:b},this.userPriority)};a.PDFDoc.prototype.flattenAnnotations=function(b){"undefined"===typeof b&&(b=!1);d(arguments.length,0,"flattenAnnotations","(boolean)",[[b,"boolean"]]);return a.messageHandler.sendWithPromise("PDFDoc.flattenAnnotations",{doc:this.id,forms_only:b},this.userPriority)};
a.PDFDoc.prototype.flattenAnnotationsAdvanced=function(b){d(arguments.length,1,"flattenAnnotationsAdvanced","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("PDFDoc.flattenAnnotationsAdvanced",{doc:this.id,flags:b},this.userPriority)};a.PDFDoc.prototype.getAcroForm=function(){return a.messageHandler.sendWithPromise("PDFDoc.getAcroForm",{doc:this.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.PDFDoc.prototype.fdfExtract=function(b){"undefined"===typeof b&&(b=a.PDFDoc.ExtractFlag.e_forms_only);
d(arguments.length,0,"fdfExtract","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("PDFDoc.fdfExtract",{doc:this.id,flag:b},this.userPriority).then(function(b){return k(a.FDFDoc,b)})};a.PDFDoc.prototype.fdfExtractPageSet=function(b,c){"undefined"===typeof c&&(c=a.PDFDoc.ExtractFlag.e_forms_only);d(arguments.length,1,"fdfExtractPageSet","(PDFNet.PageSet, number)",[[b,"Object",a.PageSet,"PageSet"],[c,"number"]]);return a.messageHandler.sendWithPromise("PDFDoc.fdfExtractPageSet",{doc:this.id,
pages_to_extract:b.id,flag:c},this.userPriority).then(function(b){return k(a.FDFDoc,b)})};a.PDFDoc.prototype.fdfMerge=function(b){d(arguments.length,1,"fdfMerge","(PDFNet.FDFDoc)",[[b,"FDFDoc"]]);return a.messageHandler.sendWithPromise("PDFDoc.fdfMerge",{doc:this.id,fdf_doc:b.id},this.userPriority)};a.PDFDoc.prototype.fdfUpdate=function(b){d(arguments.length,1,"fdfUpdate","(PDFNet.FDFDoc)",[[b,"FDFDoc"]]);return a.messageHandler.sendWithPromise("PDFDoc.fdfUpdate",{doc:this.id,fdf_doc:b.id},this.userPriority)};
a.PDFDoc.prototype.getOpenAction=function(){return a.messageHandler.sendWithPromise("PDFDoc.getOpenAction",{doc:this.id},this.userPriority).then(function(b){return f(a.Action,b)})};a.PDFDoc.prototype.setOpenAction=function(b){d(arguments.length,1,"setOpenAction","(PDFNet.Action)",[[b,"Object",a.Action,"Action"]]);return a.messageHandler.sendWithPromise("PDFDoc.setOpenAction",{doc:this.id,action:b.id},this.userPriority)};a.PDFDoc.prototype.addFileAttachment=function(b,c){d(arguments.length,2,"addFileAttachment",
"(string, PDFNet.FileSpec)",[[b,"string"],[c,"Object",a.FileSpec,"FileSpec"]]);return a.messageHandler.sendWithPromise("PDFDoc.addFileAttachment",{doc:this.id,file_key:b,embedded_file:c.id},this.userPriority)};a.PDFDoc.prototype.getPageLabel=function(b){d(arguments.length,1,"getPageLabel","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("PDFDoc.getPageLabel",{doc:this.id,page_num:b},this.userPriority).then(function(b){return new a.PageLabel(b)})};a.PDFDoc.prototype.setPageLabel=
function(b,c){d(arguments.length,2,"setPageLabel","(number, PDFNet.PageLabel)",[[b,"number"],[c,"Structure",a.PageLabel,"PageLabel"]]);n("setPageLabel",[[c,1]]);return a.messageHandler.sendWithPromise("PDFDoc.setPageLabel",{doc:this.id,page_num:b,label:c},this.userPriority)};a.PDFDoc.prototype.removePageLabel=function(b){d(arguments.length,1,"removePageLabel","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("PDFDoc.removePageLabel",{doc:this.id,page_num:b},this.userPriority)};a.PDFDoc.prototype.getStructTree=
function(){return a.messageHandler.sendWithPromise("PDFDoc.getStructTree",{doc:this.id},this.userPriority).then(function(b){return f(a.STree,b)})};a.PDFDoc.prototype.hasOC=function(){return a.messageHandler.sendWithPromise("PDFDoc.hasOC",{doc:this.id},this.userPriority)};a.PDFDoc.prototype.getOCGs=function(){return a.messageHandler.sendWithPromise("PDFDoc.getOCGs",{doc:this.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.PDFDoc.prototype.getOCGConfig=function(){return a.messageHandler.sendWithPromise("PDFDoc.getOCGConfig",
{doc:this.id},this.userPriority).then(function(b){return f(a.OCGConfig,b)})};a.PDFDoc.prototype.createIndirectName=function(b){d(arguments.length,1,"createIndirectName","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("PDFDoc.createIndirectName",{doc:this.id,name:b},this.userPriority).then(function(b){return f(a.Obj,b)})};a.PDFDoc.prototype.createIndirectArray=function(){return a.messageHandler.sendWithPromise("PDFDoc.createIndirectArray",{doc:this.id},this.userPriority).then(function(b){return f(a.Obj,
b)})};a.PDFDoc.prototype.createIndirectBool=function(b){d(arguments.length,1,"createIndirectBool","(boolean)",[[b,"boolean"]]);return a.messageHandler.sendWithPromise("PDFDoc.createIndirectBool",{doc:this.id,value:b},this.userPriority).then(function(b){return f(a.Obj,b)})};a.PDFDoc.prototype.createIndirectDict=function(){return a.messageHandler.sendWithPromise("PDFDoc.createIndirectDict",{doc:this.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.PDFDoc.prototype.createIndirectNull=function(){return a.messageHandler.sendWithPromise("PDFDoc.createIndirectNull",
{doc:this.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.PDFDoc.prototype.createIndirectNumber=function(b){d(arguments.length,1,"createIndirectNumber","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("PDFDoc.createIndirectNumber",{doc:this.id,value:b},this.userPriority).then(function(b){return f(a.Obj,b)})};a.PDFDoc.prototype.createIndirectString=function(b,c){d(arguments.length,2,"createIndirectString","(number, number)",[[b,"number"],[c,"number"]]);return a.messageHandler.sendWithPromise("PDFDoc.createIndirectString",
{doc:this.id,value:b,buf_size:c},this.userPriority).then(function(b){return f(a.Obj,b)})};a.PDFDoc.prototype.createIndirectStringFromUString=function(b){d(arguments.length,1,"createIndirectStringFromUString","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("PDFDoc.createIndirectStringFromUString",{doc:this.id,str:b},this.userPriority).then(function(b){return f(a.Obj,b)})};a.PDFDoc.prototype.createIndirectStreamFromFilter=function(b,c){"undefined"===typeof c&&(c=new a.Filter("0"));
d(arguments.length,1,"createIndirectStreamFromFilter","(PDFNet.FilterReader, PDFNet.Filter)",[[b,"Object",a.FilterReader,"FilterReader"],[c,"Object",a.Filter,"Filter"]]);0!=c.id&&r(c.id);return a.messageHandler.sendWithPromise("PDFDoc.createIndirectStreamFromFilter",{doc:this.id,data:b.id,no_own_filter_chain:c.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.PDFDoc.prototype.createIndirectStream=function(b,c,e){"undefined"===typeof e&&(e=new a.Filter("0"));d(arguments.length,2,"createIndirectStream",
"(string, number, PDFNet.Filter)",[[b,"const char* = 0"],[c,"number"],[e,"Object",a.Filter,"Filter"]]);0!=e.id&&r(e.id);return a.messageHandler.sendWithPromise("PDFDoc.createIndirectStream",{doc:this.id,data:b,data_size:c,no_own_filter_chain:e.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.PDFDoc.prototype.getSDFDoc=function(){return a.messageHandler.sendWithPromise("PDFDoc.getSDFDoc",{doc:this.id},this.userPriority).then(function(b){return f(a.SDFDoc,b)})};a.PDFDoc.prototype.unlock=
function(){var b=this;return a.messageHandler.sendWithPromise("PDFDoc.unlock",{doc:this.id},this.userPriority).then(function(){A(b)})};a.PDFDoc.prototype.unlockRead=function(){var b=this;return a.messageHandler.sendWithPromise("PDFDoc.unlockRead",{doc:this.id},this.userPriority).then(function(){A(b)})};a.PDFDoc.prototype.addHighlights=function(b){d(arguments.length,1,"addHighlights","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("PDFDoc.addHighlights",{doc:this.id,hilite:b},this.userPriority)};
a.PDFDoc.prototype.isTagged=function(){return a.messageHandler.sendWithPromise("PDFDoc.isTagged",{doc:this.id},this.userPriority)};a.PDFDoc.prototype.hasSignatures=function(){return a.messageHandler.sendWithPromise("PDFDoc.hasSignatures",{doc:this.id},this.userPriority)};a.PDFDoc.prototype.addSignatureHandler=function(b){d(arguments.length,1,"addSignatureHandler","(PDFNet.SignatureHandler)",[[b,"Object",a.SignatureHandler,"SignatureHandler"]]);return a.messageHandler.sendWithPromise("PDFDoc.addSignatureHandler",
{doc:this.id,signature_handler:b.id},this.userPriority)};a.PDFDoc.prototype.addStdSignatureHandlerFromFile=function(b,c){d(arguments.length,2,"addStdSignatureHandlerFromFile","(string, string)",[[b,"string"],[c,"string"]]);return a.messageHandler.sendWithPromise("PDFDoc.addStdSignatureHandlerFromFile",{doc:this.id,pkcs12_file:b,pkcs12_pass:c},this.userPriority)};a.PDFDoc.prototype.addStdSignatureHandlerFromBuffer=function(b,c){d(arguments.length,2,"addStdSignatureHandlerFromBuffer","(ArrayBuffer|TypedArray, string)",
[[b,"ArrayBuffer"],[c,"string"]]);var e=v(b,!1);return a.messageHandler.sendWithPromise("PDFDoc.addStdSignatureHandlerFromBuffer",{doc:this.id,pkcs12_buffer:e,pkcs12_pass:c},this.userPriority)};a.PDFDoc.prototype.removeSignatureHandler=function(b){d(arguments.length,1,"removeSignatureHandler","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("PDFDoc.removeSignatureHandler",{doc:this.id,signature_handler_id:b},this.userPriority)};a.PDFDoc.prototype.getSignatureHandler=function(b){d(arguments.length,
1,"getSignatureHandler","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("PDFDoc.getSignatureHandler",{doc:this.id,signature_handler_id:b},this.userPriority).then(function(b){return f(a.SignatureHandler,b)})};a.PDFDoc.prototype.generateThumbnails=function(b){d(arguments.length,1,"generateThumbnails","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("PDFDoc.generateThumbnails",{doc:this.id,size:b},this.userPriority)};a.PDFDoc.prototype.appendVisualDiff=function(b,
c,e){"undefined"===typeof e&&(e=null);d(arguments.length,2,"appendVisualDiff","(PDFNet.Page, PDFNet.Page, PDFNet.OptionBase)",[[b,"Object",a.Page,"Page"],[c,"Object",a.Page,"Page"],[e,"OptionBase"]]);n("appendVisualDiff",[[e,2]]);e=e?e.getJsonString():"{}";return a.messageHandler.sendWithPromise("PDFDoc.appendVisualDiff",{doc:this.id,p1:b.id,p2:c.id,opts:e},this.userPriority)};a.PDFDoc.prototype.getGeometryCollectionForPage=function(b){d(arguments.length,1,"getGeometryCollectionForPage","(number)",
[[b,"number"]]);return a.messageHandler.sendWithPromise("PDFDoc.getGeometryCollectionForPage",{in_pdfdoc:this.id,page_num:b},this.userPriority).then(function(b){return k(a.GeometryCollection,b)})};a.PDFDoc.prototype.getUndoManager=function(){return a.messageHandler.sendWithPromise("PDFDoc.getUndoManager",{doc:this.id},this.userPriority).then(function(b){return k(a.UndoManager,b)})};a.PDFDoc.prototype.createDigitalSignatureField=function(b){"undefined"===typeof b&&(b="");d(arguments.length,0,"createDigitalSignatureField",
"(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("PDFDoc.createDigitalSignatureField",{doc:this.id,in_sig_field_name:b},this.userPriority).then(function(b){return new a.DigitalSignatureField(b)})};a.PDFDoc.prototype.getDigitalSignatureField=function(b){d(arguments.length,1,"getDigitalSignatureField","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("PDFDoc.getDigitalSignatureField",{doc:this.id,field_name:b},this.userPriority).then(function(b){return new a.DigitalSignatureField(b)})};
a.PDFDoc.prototype.getDigitalSignatureFieldIteratorBegin=function(){return a.messageHandler.sendWithPromise("PDFDoc.getDigitalSignatureFieldIteratorBegin",{doc:this.id},this.userPriority).then(function(b){return k(a.Iterator,b,"DigitalSignatureField")})};a.PDFDoc.prototype.getDigitalSignaturePermissions=function(){return a.messageHandler.sendWithPromise("PDFDoc.getDigitalSignaturePermissions",{doc:this.id},this.userPriority)};a.PDFDoc.prototype.saveViewerOptimized=function(b,c){d(arguments.length,
2,"saveViewerOptimized","(string, PDFNet.Obj)",[[b,"string"],[c,"OptionObject",a.Obj,"Obj","PDFNet.PDFDoc.ViewerOptimizedOptions"]]);if("PDFNet.PDFDoc.ViewerOptimizedOptions"===c.name){var e=c;c=a.ObjSet.create().then(function(a){return a.createFromJson(JSON.stringify(e))})}else c=Promise.resolve(c);var f=this;return c.then(function(c){return a.messageHandler.sendWithPromise("PDFDoc.saveViewerOptimized",{doc:f.id,path:b,opts:c.id},this.userPriority)})};a.PDFDoc.prototype.verifySignedDigitalSignatures=
function(b){d(arguments.length,1,"verifySignedDigitalSignatures","(PDFNet.VerificationOptions)",[[b,"Object",a.VerificationOptions,"VerificationOptions"]]);return a.messageHandler.sendWithPromise("PDFDoc.verifySignedDigitalSignatures",{doc:this.id,opts:b.id},this.userPriority)};a.PDFDocInfo.prototype.getTitle=function(){return a.messageHandler.sendWithPromise("PDFDocInfo.getTitle",{info:this.id},this.userPriority)};a.PDFDocInfo.prototype.getTitleObj=function(){return a.messageHandler.sendWithPromise("PDFDocInfo.getTitleObj",
{info:this.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.PDFDocInfo.prototype.setTitle=function(b){d(arguments.length,1,"setTitle","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("PDFDocInfo.setTitle",{info:this.id,title:b},this.userPriority)};a.PDFDocInfo.prototype.getAuthor=function(){return a.messageHandler.sendWithPromise("PDFDocInfo.getAuthor",{info:this.id},this.userPriority)};a.PDFDocInfo.prototype.getAuthorObj=function(){return a.messageHandler.sendWithPromise("PDFDocInfo.getAuthorObj",
{info:this.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.PDFDocInfo.prototype.setAuthor=function(b){d(arguments.length,1,"setAuthor","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("PDFDocInfo.setAuthor",{info:this.id,author:b},this.userPriority)};a.PDFDocInfo.prototype.getSubject=function(){return a.messageHandler.sendWithPromise("PDFDocInfo.getSubject",{info:this.id},this.userPriority)};a.PDFDocInfo.prototype.getSubjectObj=function(){return a.messageHandler.sendWithPromise("PDFDocInfo.getSubjectObj",
{info:this.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.PDFDocInfo.prototype.setSubject=function(b){d(arguments.length,1,"setSubject","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("PDFDocInfo.setSubject",{info:this.id,subject:b},this.userPriority)};a.PDFDocInfo.prototype.getKeywords=function(){return a.messageHandler.sendWithPromise("PDFDocInfo.getKeywords",{info:this.id},this.userPriority)};a.PDFDocInfo.prototype.getKeywordsObj=function(){return a.messageHandler.sendWithPromise("PDFDocInfo.getKeywordsObj",
{info:this.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.PDFDocInfo.prototype.setKeywords=function(b){d(arguments.length,1,"setKeywords","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("PDFDocInfo.setKeywords",{info:this.id,keywords:b},this.userPriority)};a.PDFDocInfo.prototype.getCreator=function(){return a.messageHandler.sendWithPromise("PDFDocInfo.getCreator",{info:this.id},this.userPriority)};a.PDFDocInfo.prototype.getCreatorObj=function(){return a.messageHandler.sendWithPromise("PDFDocInfo.getCreatorObj",
{info:this.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.PDFDocInfo.prototype.setCreator=function(b){d(arguments.length,1,"setCreator","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("PDFDocInfo.setCreator",{info:this.id,creator:b},this.userPriority)};a.PDFDocInfo.prototype.getProducer=function(){return a.messageHandler.sendWithPromise("PDFDocInfo.getProducer",{info:this.id},this.userPriority)};a.PDFDocInfo.prototype.getProducerObj=function(){return a.messageHandler.sendWithPromise("PDFDocInfo.getProducerObj",
{info:this.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.PDFDocInfo.prototype.setProducer=function(b){d(arguments.length,1,"setProducer","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("PDFDocInfo.setProducer",{info:this.id,producer:b},this.userPriority)};a.PDFDocInfo.prototype.getCreationDate=function(){return a.messageHandler.sendWithPromise("PDFDocInfo.getCreationDate",{info:this.id},this.userPriority).then(function(b){return new a.Date(b)})};a.PDFDocInfo.prototype.setCreationDate=
function(b){d(arguments.length,1,"setCreationDate","(PDFNet.Date)",[[b,"Structure",a.Date,"Date"]]);n("setCreationDate",[[b,0]]);return a.messageHandler.sendWithPromise("PDFDocInfo.setCreationDate",{info:this.id,creation_date:b},this.userPriority)};a.PDFDocInfo.prototype.getModDate=function(){return a.messageHandler.sendWithPromise("PDFDocInfo.getModDate",{info:this.id},this.userPriority).then(function(b){return new a.Date(b)})};a.PDFDocInfo.prototype.setModDate=function(b){d(arguments.length,1,"setModDate",
"(PDFNet.Date)",[[b,"Structure",a.Date,"Date"]]);n("setModDate",[[b,0]]);return a.messageHandler.sendWithPromise("PDFDocInfo.setModDate",{info:this.id,mod_date:b},this.userPriority)};a.PDFDocInfo.prototype.getSDFObj=function(){return a.messageHandler.sendWithPromise("PDFDocInfo.getSDFObj",{info:this.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.PDFDocInfo.create=function(b){d(arguments.length,1,"create","(PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("pdfDocInfoCreate",
{tr:b.id},this.userPriority).then(function(b){return f(a.PDFDocInfo,b)})};a.PDFDocInfo.prototype.copy=function(){return a.messageHandler.sendWithPromise("PDFDocInfo.copy",{info:this.id},this.userPriority).then(function(b){return f(a.PDFDocInfo,b)})};a.PDFDocViewPrefs.prototype.setInitialPage=function(b){d(arguments.length,1,"setInitialPage","(PDFNet.Destination)",[[b,"Object",a.Destination,"Destination"]]);return a.messageHandler.sendWithPromise("PDFDocViewPrefs.setInitialPage",{p:this.id,dest:b.id},
this.userPriority)};a.PDFDocViewPrefs.prototype.setPageMode=function(b){d(arguments.length,1,"setPageMode","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("PDFDocViewPrefs.setPageMode",{p:this.id,mode:b},this.userPriority)};a.PDFDocViewPrefs.prototype.getPageMode=function(){return a.messageHandler.sendWithPromise("PDFDocViewPrefs.getPageMode",{p:this.id},this.userPriority)};a.PDFDocViewPrefs.prototype.setLayoutMode=function(b){d(arguments.length,1,"setLayoutMode","(number)",[[b,
"number"]]);return a.messageHandler.sendWithPromise("PDFDocViewPrefs.setLayoutMode",{p:this.id,mode:b},this.userPriority)};a.PDFDocViewPrefs.prototype.getLayoutMode=function(){return a.messageHandler.sendWithPromise("PDFDocViewPrefs.getLayoutMode",{p:this.id},this.userPriority)};a.PDFDocViewPrefs.prototype.setPref=function(b,c){d(arguments.length,2,"setPref","(number, boolean)",[[b,"number"],[c,"boolean"]]);return a.messageHandler.sendWithPromise("PDFDocViewPrefs.setPref",{p:this.id,pref:b,value:c},
this.userPriority)};a.PDFDocViewPrefs.prototype.getPref=function(b){d(arguments.length,1,"getPref","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("PDFDocViewPrefs.getPref",{p:this.id,pref:b},this.userPriority)};a.PDFDocViewPrefs.prototype.setNonFullScreenPageMode=function(b){d(arguments.length,1,"setNonFullScreenPageMode","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("PDFDocViewPrefs.setNonFullScreenPageMode",{p:this.id,mode:b},this.userPriority)};a.PDFDocViewPrefs.prototype.getNonFullScreenPageMode=
function(){return a.messageHandler.sendWithPromise("PDFDocViewPrefs.getNonFullScreenPageMode",{p:this.id},this.userPriority)};a.PDFDocViewPrefs.prototype.setDirection=function(b){d(arguments.length,1,"setDirection","(boolean)",[[b,"boolean"]]);return a.messageHandler.sendWithPromise("PDFDocViewPrefs.setDirection",{p:this.id,left_to_right:b},this.userPriority)};a.PDFDocViewPrefs.prototype.getDirection=function(){return a.messageHandler.sendWithPromise("PDFDocViewPrefs.getDirection",{p:this.id},this.userPriority)};
a.PDFDocViewPrefs.prototype.setViewArea=function(b){d(arguments.length,1,"setViewArea","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("PDFDocViewPrefs.setViewArea",{p:this.id,box:b},this.userPriority)};a.PDFDocViewPrefs.prototype.getViewArea=function(){return a.messageHandler.sendWithPromise("PDFDocViewPrefs.getViewArea",{p:this.id},this.userPriority)};a.PDFDocViewPrefs.prototype.setViewClip=function(b){d(arguments.length,1,"setViewClip","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("PDFDocViewPrefs.setViewClip",
{p:this.id,box:b},this.userPriority)};a.PDFDocViewPrefs.prototype.getViewClip=function(){return a.messageHandler.sendWithPromise("PDFDocViewPrefs.getViewClip",{p:this.id},this.userPriority)};a.PDFDocViewPrefs.prototype.setPrintArea=function(b){d(arguments.length,1,"setPrintArea","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("PDFDocViewPrefs.setPrintArea",{p:this.id,box:b},this.userPriority)};a.PDFDocViewPrefs.prototype.getPrintArea=function(){return a.messageHandler.sendWithPromise("PDFDocViewPrefs.getPrintArea",
{p:this.id},this.userPriority)};a.PDFDocViewPrefs.prototype.setPrintClip=function(b){d(arguments.length,1,"setPrintClip","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("PDFDocViewPrefs.setPrintClip",{p:this.id,box:b},this.userPriority)};a.PDFDocViewPrefs.prototype.getPrintClip=function(){return a.messageHandler.sendWithPromise("PDFDocViewPrefs.getPrintClip",{p:this.id},this.userPriority)};a.PDFDocViewPrefs.prototype.getSDFObj=function(){return a.messageHandler.sendWithPromise("PDFDocViewPrefs.getSDFObj",
{p:this.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.PDFDocViewPrefs.create=function(b){d(arguments.length,1,"create","(PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("pdfDocViewPrefsCreate",{tr:b.id},this.userPriority).then(function(b){return f(a.PDFDocViewPrefs,b)})};a.PDFDocViewPrefs.prototype.copy=function(){return a.messageHandler.sendWithPromise("PDFDocViewPrefs.copy",{prefs:this.id},this.userPriority).then(function(b){return f(a.PDFDocViewPrefs,
b)})};a.PDFRasterizer.create=function(b){"undefined"===typeof b&&(b=a.PDFRasterizer.Type.e_BuiltIn);d(arguments.length,0,"create","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("pdfRasterizerCreate",{type:b},this.userPriority).then(function(b){return k(a.PDFRasterizer,b)})};a.PDFRasterizer.prototype.getChunkRendererPath=function(b,c,e,m,g,h,k,l,q){d(arguments.length,9,"getChunkRendererPath","(PDFNet.Page, string, number, number, boolean, PDFNet.Matrix2D, PDFNet.Rect, PDFNet.Rect, boolean)",
[[b,"Object",a.Page,"Page"],[c,"string"],[e,"number"],[m,"number"],[g,"boolean"],[h,"Structure",a.Matrix2D,"Matrix2D"],[k,"Structure",a.Rect,"Rect"],[l,"Structure",a.Rect,"Rect"],[q,"boolean"]]);n("getChunkRendererPath",[[h,5],[k,6],[l,7]]);return a.messageHandler.sendWithPromise("PDFRasterizer.getChunkRendererPath",{r:this.id,page:b.id,file_path:c,width:e,height:m,demult:g,device_mtx:h,clip:k,scrl_clp_regions:l,cancel:q},this.userPriority).then(function(b){return f(a.ChunkRenderer,b)})};a.PDFRasterizer.prototype.setDrawAnnotations=
function(b){d(arguments.length,1,"setDrawAnnotations","(boolean)",[[b,"boolean"]]);return a.messageHandler.sendWithPromise("PDFRasterizer.setDrawAnnotations",{r:this.id,render_annots:b},this.userPriority)};a.PDFRasterizer.prototype.setHighlightFields=function(b){d(arguments.length,1,"setHighlightFields","(boolean)",[[b,"boolean"]]);return a.messageHandler.sendWithPromise("PDFRasterizer.setHighlightFields",{r:this.id,highlight:b},this.userPriority)};a.PDFRasterizer.prototype.setAntiAliasing=function(b){d(arguments.length,
1,"setAntiAliasing","(boolean)",[[b,"boolean"]]);return a.messageHandler.sendWithPromise("PDFRasterizer.setAntiAliasing",{r:this.id,enable_aa:b},this.userPriority)};a.PDFRasterizer.prototype.setPathHinting=function(b){d(arguments.length,1,"setPathHinting","(boolean)",[[b,"boolean"]]);return a.messageHandler.sendWithPromise("PDFRasterizer.setPathHinting",{r:this.id,enable_hinting:b},this.userPriority)};a.PDFRasterizer.prototype.setThinLineAdjustment=function(b,c){d(arguments.length,2,"setThinLineAdjustment",
"(boolean, boolean)",[[b,"boolean"],[c,"boolean"]]);return a.messageHandler.sendWithPromise("PDFRasterizer.setThinLineAdjustment",{r:this.id,grid_fit:b,stroke_adjust:c},this.userPriority)};a.PDFRasterizer.prototype.setGamma=function(b){d(arguments.length,1,"setGamma","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("PDFRasterizer.setGamma",{r:this.id,expgamma:b},this.userPriority)};a.PDFRasterizer.prototype.setOCGContext=function(b){d(arguments.length,1,"setOCGContext","(PDFNet.OCGContext)",
[[b,"Object",a.OCGContext,"OCGContext"]]);return a.messageHandler.sendWithPromise("PDFRasterizer.setOCGContext",{r:this.id,ctx:b.id},this.userPriority)};a.PDFRasterizer.prototype.setPrintMode=function(b){d(arguments.length,1,"setPrintMode","(boolean)",[[b,"boolean"]]);return a.messageHandler.sendWithPromise("PDFRasterizer.setPrintMode",{r:this.id,is_printing:b},this.userPriority)};a.PDFRasterizer.prototype.setImageSmoothing=function(b,c){"undefined"===typeof b&&(b=!0);"undefined"===typeof c&&(c=!1);
d(arguments.length,0,"setImageSmoothing","(boolean, boolean)",[[b,"boolean"],[c,"boolean"]]);return a.messageHandler.sendWithPromise("PDFRasterizer.setImageSmoothing",{r:this.id,smoothing_enabled:b,hq_image_resampling:c},this.userPriority)};a.PDFRasterizer.prototype.setOverprint=function(b){d(arguments.length,1,"setOverprint","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("PDFRasterizer.setOverprint",{r:this.id,op:b},this.userPriority)};a.PDFRasterizer.prototype.setCaching=function(b){"undefined"===
typeof b&&(b=!0);d(arguments.length,0,"setCaching","(boolean)",[[b,"boolean"]]);return a.messageHandler.sendWithPromise("PDFRasterizer.setCaching",{r:this.id,enabled:b},this.userPriority)};a.PDFDraw.prototype.setOCGContext=function(b){d(arguments.length,1,"setOCGContext","(PDFNet.OCGContext)",[[b,"Object",a.OCGContext,"OCGContext"]]);return a.messageHandler.sendWithPromise("PDFDraw.setOCGContext",{r:this.id,ctx:b.id},this.userPriority)};a.PDFRasterizer.prototype.setAnnotationState=function(b,c){d(arguments.length,
2,"setAnnotationState","(PDFNet.Annot, number)",[[b,"Object",a.Annot,"Annot"],[c,"number"]]);return a.messageHandler.sendWithPromise("PDFRasterizer.setAnnotationState",{r:this.id,annot:b.id,new_view_state:c},this.userPriority)};a.PDFRasterizer.prototype.setRasterizerType=function(b){d(arguments.length,1,"setRasterizerType","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("PDFRasterizer.setRasterizerType",{r:this.id,type:b},this.userPriority)};a.PDFRasterizer.prototype.getRasterizerType=
function(){return a.messageHandler.sendWithPromise("PDFRasterizer.getRasterizerType",{r:this.id},this.userPriority)};a.PDFRasterizer.prototype.setColorPostProcessMode=function(b){d(arguments.length,1,"setColorPostProcessMode","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("PDFRasterizer.setColorPostProcessMode",{r:this.id,mode:b},this.userPriority)};a.PDFRasterizer.prototype.getColorPostProcessMode=function(){return a.messageHandler.sendWithPromise("PDFRasterizer.getColorPostProcessMode",
{r:this.id},this.userPriority)};a.PDFRasterizer.prototype.enableDisplayListCaching=function(b){d(arguments.length,1,"enableDisplayListCaching","(boolean)",[[b,"boolean"]]);return a.messageHandler.sendWithPromise("PDFRasterizer.enableDisplayListCaching",{r:this.id,enabled:b},this.userPriority)};a.PDFRasterizer.prototype.updateBuffer=function(){return a.messageHandler.sendWithPromise("PDFRasterizer.updateBuffer",{r:this.id},this.userPriority)};a.PDFRasterizer.prototype.rasterizeAnnot=function(b,c,e,
m,g){d(arguments.length,5,"rasterizeAnnot","(PDFNet.Annot, PDFNet.Page, PDFNet.Matrix2D, boolean, boolean)",[[b,"Object",a.Annot,"Annot"],[c,"Object",a.Page,"Page"],[e,"Structure",a.Matrix2D,"Matrix2D"],[m,"boolean"],[g,"boolean"]]);n("rasterizeAnnot",[[e,2]]);return a.messageHandler.sendWithPromise("PDFRasterizer.rasterizeAnnot",{r:this.id,annot:b.id,page:c.id,device_mtx:e,demult:m,cancel:g},this.userPriority).then(function(b){return f(a.OwnedBitmap,b)})};a.PDFRasterizer.prototype.rasterizeSeparations=
function(b,c,e,f,g,h){d(arguments.length,6,"rasterizeSeparations","(PDFNet.Page, number, number, PDFNet.Matrix2D, PDFNet.Rect, boolean)",[[b,"Object",a.Page,"Page"],[c,"number"],[e,"number"],[f,"Structure",a.Matrix2D,"Matrix2D"],[g,"Structure",a.Rect,"Rect"],[h,"boolean"]]);n("rasterizeSeparations",[[f,3],[g,4]]);return a.messageHandler.sendWithPromise("PDFRasterizer.rasterizeSeparations",{r:this.id,page:b.id,width:c,height:e,mtx:f,clip:g,cancel:h},this.userPriority).then(function(b){for(var c=[],
e=0;e<b.length;++e){var d=b[e];if("0"===d)return null;d=new a.Separation(d);c.push(d)}return c})};a.PDFDraw.create=function(b){"undefined"===typeof b&&(b=92);d(arguments.length,0,"create","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("pdfDrawCreate",{dpi:b},this.userPriority).then(function(b){return k(a.PDFDraw,b)})};a.PDFDraw.prototype.setRasterizerType=function(b){d(arguments.length,1,"setRasterizerType","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("PDFDraw.setRasterizerType",
{d:this.id,type:b},this.userPriority)};a.PDFDraw.prototype.setDPI=function(b){d(arguments.length,1,"setDPI","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("PDFDraw.setDPI",{d:this.id,dpi:b},this.userPriority)};a.PDFDraw.prototype.setImageSize=function(b,c,e){"undefined"===typeof e&&(e=!0);d(arguments.length,2,"setImageSize","(number, number, boolean)",[[b,"number"],[c,"number"],[e,"boolean"]]);return a.messageHandler.sendWithPromise("PDFDraw.setImageSize",{d:this.id,width:b,height:c,
preserve_aspect_ratio:e},this.userPriority)};a.PDFDraw.prototype.setPageBox=function(b){d(arguments.length,1,"setPageBox","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("PDFDraw.setPageBox",{d:this.id,region:b},this.userPriority)};a.PDFDraw.prototype.setClipRect=function(b){d(arguments.length,1,"setClipRect","(PDFNet.Rect)",[[b,"Structure",a.Rect,"Rect"]]);n("setClipRect",[[b,0]]);return a.messageHandler.sendWithPromise("PDFDraw.setClipRect",{d:this.id,rect:b},this.userPriority)};
a.PDFDraw.prototype.setFlipYAxis=function(b){d(arguments.length,1,"setFlipYAxis","(boolean)",[[b,"boolean"]]);return a.messageHandler.sendWithPromise("PDFDraw.setFlipYAxis",{d:this.id,flip_y:b},this.userPriority)};a.PDFDraw.prototype.setRotate=function(b){d(arguments.length,1,"setRotate","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("PDFDraw.setRotate",{d:this.id,angle:b},this.userPriority)};a.PDFDraw.prototype.setDrawAnnotations=function(b){d(arguments.length,1,"setDrawAnnotations",
"(boolean)",[[b,"boolean"]]);return a.messageHandler.sendWithPromise("PDFDraw.setDrawAnnotations",{d:this.id,render_annots:b},this.userPriority)};a.PDFDraw.prototype.setHighlightFields=function(b){d(arguments.length,1,"setHighlightFields","(boolean)",[[b,"boolean"]]);return a.messageHandler.sendWithPromise("PDFDraw.setHighlightFields",{d:this.id,highlight:b},this.userPriority)};a.PDFDraw.prototype.setAntiAliasing=function(b){d(arguments.length,1,"setAntiAliasing","(boolean)",[[b,"boolean"]]);return a.messageHandler.sendWithPromise("PDFDraw.setAntiAliasing",
{d:this.id,enable_aa:b},this.userPriority)};a.PDFDraw.prototype.setPathHinting=function(b){d(arguments.length,1,"setPathHinting","(boolean)",[[b,"boolean"]]);return a.messageHandler.sendWithPromise("PDFDraw.setPathHinting",{d:this.id,enable_hinting:b},this.userPriority)};a.PDFDraw.prototype.setThinLineAdjustment=function(b,c){d(arguments.length,2,"setThinLineAdjustment","(boolean, boolean)",[[b,"boolean"],[c,"boolean"]]);return a.messageHandler.sendWithPromise("PDFDraw.setThinLineAdjustment",{d:this.id,
grid_fit:b,stroke_adjust:c},this.userPriority)};a.PDFDraw.prototype.setGamma=function(b){d(arguments.length,1,"setGamma","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("PDFDraw.setGamma",{d:this.id,exp:b},this.userPriority)};a.PDFDraw.prototype.setPrintMode=function(b){d(arguments.length,1,"setPrintMode","(boolean)",[[b,"boolean"]]);return a.messageHandler.sendWithPromise("PDFDraw.setPrintMode",{d:this.id,is_printing:b},this.userPriority)};a.PDFDraw.prototype.setPageTransparent=
function(b){d(arguments.length,1,"setPageTransparent","(boolean)",[[b,"boolean"]]);return a.messageHandler.sendWithPromise("PDFDraw.setPageTransparent",{d:this.id,is_transparent:b},this.userPriority)};a.PDFDraw.prototype.setDefaultPageColor=function(b,c,e){d(arguments.length,3,"setDefaultPageColor","(number, number, number)",[[b,"number"],[c,"number"],[e,"number"]]);return a.messageHandler.sendWithPromise("PDFDraw.setDefaultPageColor",{d:this.id,r:b,g:c,b:e},this.userPriority)};a.PDFDraw.prototype.setOverprint=
function(b){d(arguments.length,1,"setOverprint","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("PDFDraw.setOverprint",{d:this.id,op:b},this.userPriority)};a.PDFDraw.prototype.setImageSmoothing=function(b,c){"undefined"===typeof b&&(b=!0);"undefined"===typeof c&&(c=!1);d(arguments.length,0,"setImageSmoothing","(boolean, boolean)",[[b,"boolean"],[c,"boolean"]]);return a.messageHandler.sendWithPromise("PDFDraw.setImageSmoothing",{d:this.id,smoothing_enabled:b,hq_image_resampling:c},
this.userPriority)};a.PDFDraw.prototype.setCaching=function(b){"undefined"===typeof b&&(b=!0);d(arguments.length,0,"setCaching","(boolean)",[[b,"boolean"]]);return a.messageHandler.sendWithPromise("PDFDraw.setCaching",{d:this.id,enabled:b},this.userPriority)};a.PDFDraw.prototype.export=function(b,c,e,f){"undefined"===typeof e&&(e="PNG");"undefined"===typeof f&&(f=new a.Obj("0"));d(arguments.length,2,"export","(PDFNet.Page, string, string, PDFNet.Obj)",[[b,"Object",a.Page,"Page"],[c,"string"],[e,"const char* = 0"],
[f,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("PDFDraw.export",{d:this.id,page:b.id,filename:c,format:e,encoder_params:f.id},this.userPriority)};a.PDFDraw.prototype.setColorPostProcessMode=function(b){d(arguments.length,1,"setColorPostProcessMode","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("PDFDraw.setColorPostProcessMode",{d:this.id,mode:b},this.userPriority)};a.PDFDraw.prototype.getSeparationBitmaps=function(b){d(arguments.length,1,"getSeparationBitmaps",
"(PDFNet.Page)",[[b,"Object",a.Page,"Page"]]);return a.messageHandler.sendWithPromise("PDFDraw.getSeparationBitmaps",{d:this.id,page:b.id},this.userPriority).then(function(b){for(var c=[],d=0;d<b.length;++d){var f=b[d];if("0"===f)return null;f=new a.Separation(f);c.push(f)}return c})};a.enableJavaScript=function(b){d(arguments.length,1,"enableJavaScript","(boolean)",[[b,"boolean"]]);return a.messageHandler.sendWithPromise("pdfNetEnableJavaScript",{enable:b},this.userPriority)};a.isJavaScriptEnabled=
function(){return a.messageHandler.sendWithPromise("pdfNetIsJavaScriptEnabled",{},this.userPriority)};a.setResourcesPath=function(b){d(arguments.length,1,"setResourcesPath","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("pdfNetSetResourcesPath",{path:b},this.userPriority)};a.addResourceSearchPath=function(b){d(arguments.length,1,"addResourceSearchPath","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("pdfNetAddResourceSearchPath",{path:b},this.userPriority)};
a.setColorManagement=function(b){"undefined"===typeof b&&(b=a.CMSType.e_lcms);d(arguments.length,0,"setColorManagement","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("pdfNetSetColorManagement",{t:b},this.userPriority)};a.setDefaultDeviceRGBProfile=function(b){d(arguments.length,1,"setDefaultDeviceRGBProfile","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("pdfNetSetDefaultDeviceRGBProfile",{icc_filename:b},this.userPriority)};a.setDefaultDeviceCMYKProfileFromFilter=
function(b){d(arguments.length,1,"setDefaultDeviceCMYKProfileFromFilter","(PDFNet.Filter)",[[b,"Object",a.Filter,"Filter"]]);return a.messageHandler.sendWithPromise("pdfNetSetDefaultDeviceCMYKProfileFromFilter",{stream:b.id},this.userPriority)};a.setDefaultDeviceRGBProfileFromFilter=function(b){d(arguments.length,1,"setDefaultDeviceRGBProfileFromFilter","(PDFNet.Filter)",[[b,"Object",a.Filter,"Filter"]]);return a.messageHandler.sendWithPromise("pdfNetSetDefaultDeviceRGBProfileFromFilter",{stream:b.id},
this.userPriority)};a.setDefaultFlateCompressionLevel=function(b){d(arguments.length,1,"setDefaultFlateCompressionLevel","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("pdfNetSetDefaultFlateCompressionLevel",{level:b},this.userPriority)};a.addFontSubstFromName=function(b,c){d(arguments.length,2,"addFontSubstFromName","(string, string)",[[b,"string"],[c,"string"]]);return a.messageHandler.sendWithPromise("pdfNetAddFontSubstFromName",{fontname:b,fontpath:c},this.userPriority)};a.getVersion=
function(){return a.messageHandler.sendWithPromise("pdfNetGetVersion",{},this.userPriority)};a.setLogLevel=function(b){"undefined"===typeof b&&(b=a.LogLevel.e_LogLevel_Fatal);d(arguments.length,0,"setLogLevel","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("pdfNetSetLogLevel",{level:b},this.userPriority)};a.getSystemFontList=function(){return a.messageHandler.sendWithPromise("pdfNetGetSystemFontList",{},this.userPriority)};a.addPDFTronCustomHandler=function(b){d(arguments.length,
1,"addPDFTronCustomHandler","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("pdfNetAddPDFTronCustomHandler",{custom_id:b},this.userPriority)};a.Rect.init=function(b,c,e,f){d(arguments.length,4,"init","(number, number, number, number)",[[b,"number"],[c,"number"],[e,"number"],[f,"number"]]);return a.messageHandler.sendWithPromise("rectInit",{x1:b,y1:c,x2:e,y2:f},this.userPriority).then(function(b){return new a.Rect(b)})};a.Rect.prototype.attach=function(b){d(arguments.length,1,"attach",
"(PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"]]);l("attach",this.yieldFunction);var c=this;this.yieldFunction="Rect.attach";return a.messageHandler.sendWithPromise("Rect.attach",{rect:this,obj:b.id},this.userPriority).then(function(a){c.yieldFunction=void 0;p(a,c)})};a.Rect.prototype.update=function(b){"undefined"===typeof b&&(b=new a.Obj("__null"));d(arguments.length,0,"update","(PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"]]);l("update",this.yieldFunction);var c=this;this.yieldFunction="Rect.update";return a.messageHandler.sendWithPromise("Rect.update",
{rect:this,obj:b.id},this.userPriority).then(function(a){c.yieldFunction=void 0;p(a.rect,c);return a.result})};a.Rect.prototype.get=function(){l("get",this.yieldFunction);return a.messageHandler.sendWithPromise("Rect.get",{rect:this},this.userPriority)};a.Rect.prototype.set=function(b,c,e,f){d(arguments.length,4,"set","(number, number, number, number)",[[b,"number"],[c,"number"],[e,"number"],[f,"number"]]);l("set",this.yieldFunction);var m=this;this.yieldFunction="Rect.set";return a.messageHandler.sendWithPromise("Rect.set",
{rect:this,x1:b,y1:c,x2:e,y2:f},this.userPriority).then(function(a){m.yieldFunction=void 0;p(a,m)})};a.Rect.prototype.width=function(){l("width",this.yieldFunction);return a.messageHandler.sendWithPromise("Rect.width",{rect:this},this.userPriority)};a.Rect.prototype.height=function(){l("height",this.yieldFunction);return a.messageHandler.sendWithPromise("Rect.height",{rect:this},this.userPriority)};a.Rect.prototype.contains=function(b,c){d(arguments.length,2,"contains","(number, number)",[[b,"number"],
[c,"number"]]);l("contains",this.yieldFunction);return a.messageHandler.sendWithPromise("Rect.contains",{rect:this,x:b,y:c},this.userPriority)};a.Rect.prototype.intersectRect=function(b,c){d(arguments.length,2,"intersectRect","(PDFNet.Rect, PDFNet.Rect)",[[b,"Structure",a.Rect,"Rect"],[c,"Structure",a.Rect,"Rect"]]);l("intersectRect",this.yieldFunction);n("intersectRect",[[b,0],[c,1]]);var e=this;this.yieldFunction="Rect.intersectRect";return a.messageHandler.sendWithPromise("Rect.intersectRect",
{rect:this,rect1:b,rect2:c},this.userPriority).then(function(a){e.yieldFunction=void 0;p(a.rect,e);return a.result})};a.Rect.prototype.normalize=function(){l("normalize",this.yieldFunction);var b=this;this.yieldFunction="Rect.normalize";return a.messageHandler.sendWithPromise("Rect.normalize",{rect:this},this.userPriority).then(function(a){b.yieldFunction=void 0;p(a,b)})};a.Rect.prototype.inflate1=function(b){d(arguments.length,1,"inflate1","(number)",[[b,"number"]]);l("inflate1",this.yieldFunction);
var c=this;this.yieldFunction="Rect.inflate1";return a.messageHandler.sendWithPromise("Rect.inflate1",{rect:this,amount:b},this.userPriority).then(function(a){c.yieldFunction=void 0;p(a,c)})};a.Rect.prototype.inflate2=function(b,c){d(arguments.length,2,"inflate2","(number, number)",[[b,"number"],[c,"number"]]);l("inflate2",this.yieldFunction);var e=this;this.yieldFunction="Rect.inflate2";return a.messageHandler.sendWithPromise("Rect.inflate2",{rect:this,x:b,y:c},this.userPriority).then(function(a){e.yieldFunction=
void 0;p(a,e)})};a.Redactor.redactionCreate=function(b,c,e,m){d(arguments.length,4,"redactionCreate","(number, PDFNet.Rect, boolean, string)",[[b,"number"],[c,"Structure",a.Rect,"Rect"],[e,"boolean"],[m,"string"]]);n("redactionCreate",[[c,1]]);return a.messageHandler.sendWithPromise("Redactor.redactionCreate",{page_num:b,bbox:c,negative:e,text:m},this.userPriority).then(function(b){return f(a.Redaction,b)})};a.Redactor.redactionDestroy=function(b){d(arguments.length,1,"redactionDestroy","(PDFNet.Redaction)",
[[b,"Object",a.Redaction,"Redaction"]]);return a.messageHandler.sendWithPromise("Redactor.redactionDestroy",{redaction:b.id},this.userPriority)};a.Redactor.redactionCopy=function(b){d(arguments.length,1,"redactionCopy","(PDFNet.Redaction)",[[b,"Object",a.Redaction,"Redaction"]]);return a.messageHandler.sendWithPromise("Redactor.redactionCopy",{other:b.id},this.userPriority).then(function(b){return f(a.Redaction,b)})};a.Shading.create=function(b){"undefined"===typeof b&&(b=new a.Obj("0"));d(arguments.length,
0,"create","(PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("shadingCreate",{shading_dict:b.id},this.userPriority).then(function(b){return k(a.Shading,b)})};a.Shading.getTypeFromObj=function(b){d(arguments.length,1,"getTypeFromObj","(PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("shadingGetTypeFromObj",{shading_dict:b.id},this.userPriority)};a.Shading.prototype.getType=function(){return a.messageHandler.sendWithPromise("Shading.getType",
{s:this.id},this.userPriority)};a.Shading.prototype.getSDFObj=function(){return a.messageHandler.sendWithPromise("Shading.getSDFObj",{s:this.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.Shading.prototype.getBaseColorSpace=function(){return a.messageHandler.sendWithPromise("Shading.getBaseColorSpace",{s:this.id},this.userPriority).then(function(b){return k(a.ColorSpace,b)})};a.Shading.prototype.hasBBox=function(){return a.messageHandler.sendWithPromise("Shading.hasBBox",{s:this.id},
this.userPriority)};a.Shading.prototype.getBBox=function(){return a.messageHandler.sendWithPromise("Shading.getBBox",{s:this.id},this.userPriority).then(function(b){return new a.Rect(b)})};a.Shading.prototype.hasBackground=function(){return a.messageHandler.sendWithPromise("Shading.hasBackground",{s:this.id},this.userPriority)};a.Shading.prototype.getBackground=function(){return a.messageHandler.sendWithPromise("Shading.getBackground",{s:this.id},this.userPriority).then(function(b){return k(a.ColorPt,
b)})};a.Shading.prototype.getAntialias=function(){return a.messageHandler.sendWithPromise("Shading.getAntialias",{s:this.id},this.userPriority)};a.Shading.prototype.getParamStart=function(){return a.messageHandler.sendWithPromise("Shading.getParamStart",{s:this.id},this.userPriority)};a.Shading.prototype.getParamEnd=function(){return a.messageHandler.sendWithPromise("Shading.getParamEnd",{s:this.id},this.userPriority)};a.Shading.prototype.isExtendStart=function(){return a.messageHandler.sendWithPromise("Shading.isExtendStart",
{s:this.id},this.userPriority)};a.Shading.prototype.isExtendEnd=function(){return a.messageHandler.sendWithPromise("Shading.isExtendEnd",{s:this.id},this.userPriority)};a.Shading.prototype.getColor=function(b){d(arguments.length,1,"getColor","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("Shading.getColor",{s:this.id,t:b},this.userPriority).then(function(b){return k(a.ColorPt,b)})};a.Shading.prototype.getCoords=function(){return a.messageHandler.sendWithPromise("Shading.getCoords",
{s:this.id},this.userPriority)};a.Shading.prototype.getCoordsRadial=function(){return a.messageHandler.sendWithPromise("Shading.getCoordsRadial",{s:this.id},this.userPriority)};a.Shading.prototype.getDomain=function(){return a.messageHandler.sendWithPromise("Shading.getDomain",{s:this.id},this.userPriority)};a.Shading.prototype.getMatrix=function(){return a.messageHandler.sendWithPromise("Shading.getMatrix",{s:this.id},this.userPriority).then(function(b){return new a.Matrix2D(b)})};a.Shading.prototype.getColorForFunction=
function(b,c){d(arguments.length,2,"getColorForFunction","(number, number)",[[b,"number"],[c,"number"]]);return a.messageHandler.sendWithPromise("Shading.getColorForFunction",{s:this.id,t1:b,t2:c},this.userPriority).then(function(b){return k(a.ColorPt,b)})};a.Stamper.create=function(b,c,e){d(arguments.length,3,"create","(number, number, number)",[[b,"number"],[c,"number"],[e,"number"]]);return a.messageHandler.sendWithPromise("stamperCreate",{size_type:b,a:c,b:e},this.userPriority).then(function(b){return k(a.Stamper,
b)})};a.Stamper.prototype.stampImage=function(b,c,e){d(arguments.length,3,"stampImage","(PDFNet.PDFDoc, PDFNet.Image, PDFNet.PageSet)",[[b,"PDFDoc"],[c,"Object",a.Image,"Image"],[e,"Object",a.PageSet,"PageSet"]]);return a.messageHandler.sendWithPromise("Stamper.stampImage",{stamp:this.id,dest_doc:b.id,img:c.id,dest_pages:e.id},this.userPriority)};a.Stamper.prototype.stampPage=function(b,c,e){d(arguments.length,3,"stampPage","(PDFNet.PDFDoc, PDFNet.Page, PDFNet.PageSet)",[[b,"PDFDoc"],[c,"Object",
a.Page,"Page"],[e,"Object",a.PageSet,"PageSet"]]);return a.messageHandler.sendWithPromise("Stamper.stampPage",{stamp:this.id,dest_doc:b.id,page:c.id,dest_pages:e.id},this.userPriority)};a.Stamper.prototype.stampText=function(b,c,e){d(arguments.length,3,"stampText","(PDFNet.PDFDoc, string, PDFNet.PageSet)",[[b,"PDFDoc"],[c,"string"],[e,"Object",a.PageSet,"PageSet"]]);return a.messageHandler.sendWithPromise("Stamper.stampText",{stamp:this.id,dest_doc:b.id,txt:c,dest_pages:e.id},this.userPriority)};
a.Stamper.prototype.setFont=function(b){d(arguments.length,1,"setFont","(PDFNet.Font)",[[b,"Object",a.Font,"Font"]]);return a.messageHandler.sendWithPromise("Stamper.setFont",{stamp:this.id,font:b.id},this.userPriority)};a.Stamper.prototype.setFontColor=function(b){d(arguments.length,1,"setFontColor","(PDFNet.ColorPt)",[[b,"Object",a.ColorPt,"ColorPt"]]);return a.messageHandler.sendWithPromise("Stamper.setFontColor",{stamp:this.id,font_color:b.id},this.userPriority)};a.Stamper.prototype.setTextAlignment=
function(b){d(arguments.length,1,"setTextAlignment","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("Stamper.setTextAlignment",{stamp:this.id,text_alignment:b},this.userPriority)};a.Stamper.prototype.setOpacity=function(b){d(arguments.length,1,"setOpacity","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("Stamper.setOpacity",{stamp:this.id,opacity:b},this.userPriority)};a.Stamper.prototype.setRotation=function(b){d(arguments.length,1,"setRotation","(number)",[[b,
"number"]]);return a.messageHandler.sendWithPromise("Stamper.setRotation",{stamp:this.id,rotation:b},this.userPriority)};a.Stamper.prototype.setAsBackground=function(b){d(arguments.length,1,"setAsBackground","(boolean)",[[b,"boolean"]]);return a.messageHandler.sendWithPromise("Stamper.setAsBackground",{stamp:this.id,background:b},this.userPriority)};a.Stamper.prototype.setAsAnnotation=function(b){d(arguments.length,1,"setAsAnnotation","(boolean)",[[b,"boolean"]]);return a.messageHandler.sendWithPromise("Stamper.setAsAnnotation",
{stamp:this.id,annotation:b},this.userPriority)};a.Stamper.prototype.showsOnScreen=function(b){d(arguments.length,1,"showsOnScreen","(boolean)",[[b,"boolean"]]);return a.messageHandler.sendWithPromise("Stamper.showsOnScreen",{stamp:this.id,on_screen:b},this.userPriority)};a.Stamper.prototype.showsOnPrint=function(b){d(arguments.length,1,"showsOnPrint","(boolean)",[[b,"boolean"]]);return a.messageHandler.sendWithPromise("Stamper.showsOnPrint",{stamp:this.id,on_print:b},this.userPriority)};a.Stamper.prototype.setAlignment=
function(b,c){d(arguments.length,2,"setAlignment","(number, number)",[[b,"number"],[c,"number"]]);return a.messageHandler.sendWithPromise("Stamper.setAlignment",{stamp:this.id,horizontal_alignment:b,vertical_alignment:c},this.userPriority)};a.Stamper.prototype.setPosition=function(b,c,e){"undefined"===typeof e&&(e=!1);d(arguments.length,2,"setPosition","(number, number, boolean)",[[b,"number"],[c,"number"],[e,"boolean"]]);return a.messageHandler.sendWithPromise("Stamper.setPosition",{stamp:this.id,
horizontal_distance:b,vertical_distance:c,use_percentage:e},this.userPriority)};a.Stamper.prototype.setSize=function(b,c,e){d(arguments.length,3,"setSize","(number, number, number)",[[b,"number"],[c,"number"],[e,"number"]]);return a.messageHandler.sendWithPromise("Stamper.setSize",{stamp:this.id,size_type:b,a:c,b:e},this.userPriority)};a.Stamper.deleteStamps=function(b,c){d(arguments.length,2,"deleteStamps","(PDFNet.PDFDoc, PDFNet.PageSet)",[[b,"PDFDoc"],[c,"Object",a.PageSet,"PageSet"]]);return a.messageHandler.sendWithPromise("stamperDeleteStamps",
{doc:b.id,page_set:c.id},this.userPriority)};a.Stamper.hasStamps=function(b,c){d(arguments.length,2,"hasStamps","(PDFNet.PDFDoc, PDFNet.PageSet)",[[b,"PDFDoc"],[c,"Object",a.PageSet,"PageSet"]]);return a.messageHandler.sendWithPromise("stamperHasStamps",{doc:b.id,page_set:c.id},this.userPriority)};a.TextExtractor.create=function(){return a.messageHandler.sendWithPromise("textExtractorCreate",{},this.userPriority).then(function(b){return k(a.TextExtractor,b)})};a.TextExtractor.prototype.setOCGContext=
function(b){d(arguments.length,1,"setOCGContext","(PDFNet.OCGContext)",[[b,"Object",a.OCGContext,"OCGContext"]]);return a.messageHandler.sendWithPromise("TextExtractor.setOCGContext",{te:this.id,ctx:b.id},this.userPriority)};a.TextExtractor.prototype.begin=function(b,c,e){"undefined"===typeof c&&(c=null);"undefined"===typeof e&&(e=0);d(arguments.length,1,"begin","(PDFNet.Page, PDFNet.Rect, number)",[[b,"Object",a.Page,"Page"],[c,"Structure",a.Rect,"Rect"],[e,"number"]]);n("begin",[[c,1]]);return a.messageHandler.sendWithPromise("TextExtractor.begin",
{te:this.id,page:b.id,clip_ptr:c,flags:e},this.userPriority)};a.TextExtractor.prototype.getWordCount=function(){return a.messageHandler.sendWithPromise("TextExtractor.getWordCount",{te:this.id},this.userPriority)};a.TextExtractor.prototype.setRightToLeftLanguage=function(b){d(arguments.length,1,"setRightToLeftLanguage","(boolean)",[[b,"boolean"]]);return a.messageHandler.sendWithPromise("TextExtractor.setRightToLeftLanguage",{te:this.id,rtl:b},this.userPriority)};a.TextExtractor.prototype.getRightToLeftLanguage=
function(){return a.messageHandler.sendWithPromise("TextExtractor.getRightToLeftLanguage",{te:this.id},this.userPriority)};a.TextExtractor.prototype.getAsText=function(b){"undefined"===typeof b&&(b=!0);d(arguments.length,0,"getAsText","(boolean)",[[b,"boolean"]]);return a.messageHandler.sendWithPromise("TextExtractor.getAsText",{te:this.id,dehyphen:b},this.userPriority)};a.TextExtractor.prototype.getTextUnderAnnot=function(b){d(arguments.length,1,"getTextUnderAnnot","(PDFNet.Annot)",[[b,"Object",
a.Annot,"Annot"]]);return a.messageHandler.sendWithPromise("TextExtractor.getTextUnderAnnot",{te:this.id,annot:b.id},this.userPriority)};a.TextExtractor.prototype.getAsXML=function(b){"undefined"===typeof b&&(b=0);d(arguments.length,0,"getAsXML","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("TextExtractor.getAsXML",{te:this.id,xml_output_flags:b},this.userPriority)};a.TextExtractorStyle.prototype.getFont=function(){l("getFont",this.yieldFunction);var b=this;this.yieldFunction=
"TextExtractorStyle.getFont";return a.messageHandler.sendWithPromise("TextExtractorStyle.getFont",{tes:this},this.userPriority).then(function(c){b.yieldFunction=void 0;c.result=f(a.Obj,c.result);p(c.tes,b);return c.result})};a.TextExtractorStyle.prototype.getFontName=function(){l("getFontName",this.yieldFunction);var b=this;this.yieldFunction="TextExtractorStyle.getFontName";return a.messageHandler.sendWithPromise("TextExtractorStyle.getFontName",{tes:this},this.userPriority).then(function(a){b.yieldFunction=
void 0;p(a.tes,b);return a.result})};a.TextExtractorStyle.prototype.getFontSize=function(){l("getFontSize",this.yieldFunction);var b=this;this.yieldFunction="TextExtractorStyle.getFontSize";return a.messageHandler.sendWithPromise("TextExtractorStyle.getFontSize",{tes:this},this.userPriority).then(function(a){b.yieldFunction=void 0;p(a.tes,b);return a.result})};a.TextExtractorStyle.prototype.getWeight=function(){l("getWeight",this.yieldFunction);var b=this;this.yieldFunction="TextExtractorStyle.getWeight";
return a.messageHandler.sendWithPromise("TextExtractorStyle.getWeight",{tes:this},this.userPriority).then(function(a){b.yieldFunction=void 0;p(a.tes,b);return a.result})};a.TextExtractorStyle.prototype.isItalic=function(){l("isItalic",this.yieldFunction);var b=this;this.yieldFunction="TextExtractorStyle.isItalic";return a.messageHandler.sendWithPromise("TextExtractorStyle.isItalic",{tes:this},this.userPriority).then(function(a){b.yieldFunction=void 0;p(a.tes,b);return a.result})};a.TextExtractorStyle.prototype.isSerif=
function(){l("isSerif",this.yieldFunction);var b=this;this.yieldFunction="TextExtractorStyle.isSerif";return a.messageHandler.sendWithPromise("TextExtractorStyle.isSerif",{tes:this},this.userPriority).then(function(a){b.yieldFunction=void 0;p(a.tes,b);return a.result})};a.TextExtractorStyle.prototype.compare=function(b){d(arguments.length,1,"compare","(PDFNet.TextExtractorStyle)",[[b,"Structure",a.TextExtractorStyle,"TextExtractorStyle"]]);l("compare",this.yieldFunction);n("compare",[[b,0]]);return a.messageHandler.sendWithPromise("TextExtractorStyle.compare",
{tes:this,s:b},this.userPriority)};a.TextExtractorStyle.create=function(){return a.messageHandler.sendWithPromise("textExtractorStyleCreate",{},this.userPriority).then(function(b){return new a.TextExtractorStyle(b)})};a.TextExtractorStyle.prototype.copy=function(){l("copy",this.yieldFunction);var b=this;this.yieldFunction="TextExtractorStyle.copy";return a.messageHandler.sendWithPromise("TextExtractorStyle.copy",{s:this},this.userPriority).then(function(c){b.yieldFunction=void 0;c.result=new a.TextExtractorStyle(c.result);
p(c.s,b);return c.result})};a.TextExtractorWord.prototype.getNumGlyphs=function(){l("getNumGlyphs",this.yieldFunction);var b=this;this.yieldFunction="TextExtractorWord.getNumGlyphs";return a.messageHandler.sendWithPromise("TextExtractorWord.getNumGlyphs",{tew:this},this.userPriority).then(function(a){b.yieldFunction=void 0;p(a.tew,b);return a.result})};a.TextExtractorWord.prototype.getCharStyle=function(b){d(arguments.length,1,"getCharStyle","(number)",[[b,"number"]]);l("getCharStyle",this.yieldFunction);
var c=this;this.yieldFunction="TextExtractorWord.getCharStyle";return a.messageHandler.sendWithPromise("TextExtractorWord.getCharStyle",{tew:this,char_idx:b},this.userPriority).then(function(b){c.yieldFunction=void 0;b.result=new a.TextExtractorStyle(b.result);p(b.tew,c);return b.result})};a.TextExtractorWord.prototype.getStyle=function(){l("getStyle",this.yieldFunction);var b=this;this.yieldFunction="TextExtractorWord.getStyle";return a.messageHandler.sendWithPromise("TextExtractorWord.getStyle",
{tew:this},this.userPriority).then(function(c){b.yieldFunction=void 0;c.result=new a.TextExtractorStyle(c.result);p(c.tew,b);return c.result})};a.TextExtractorWord.prototype.getStringLen=function(){l("getStringLen",this.yieldFunction);var b=this;this.yieldFunction="TextExtractorWord.getStringLen";return a.messageHandler.sendWithPromise("TextExtractorWord.getStringLen",{tew:this},this.userPriority).then(function(a){b.yieldFunction=void 0;p(a.tew,b);return a.result})};a.TextExtractorWord.prototype.getNextWord=
function(){l("getNextWord",this.yieldFunction);var b=this;this.yieldFunction="TextExtractorWord.getNextWord";return a.messageHandler.sendWithPromise("TextExtractorWord.getNextWord",{tew:this},this.userPriority).then(function(c){b.yieldFunction=void 0;c.result=new a.TextExtractorWord(c.result);p(c.tew,b);return c.result})};a.TextExtractorWord.prototype.getCurrentNum=function(){l("getCurrentNum",this.yieldFunction);var b=this;this.yieldFunction="TextExtractorWord.getCurrentNum";return a.messageHandler.sendWithPromise("TextExtractorWord.getCurrentNum",
{tew:this},this.userPriority).then(function(a){b.yieldFunction=void 0;p(a.tew,b);return a.result})};a.TextExtractorWord.prototype.compare=function(b){d(arguments.length,1,"compare","(PDFNet.TextExtractorWord)",[[b,"Structure",a.TextExtractorWord,"TextExtractorWord"]]);l("compare",this.yieldFunction);n("compare",[[b,0]]);return a.messageHandler.sendWithPromise("TextExtractorWord.compare",{tew:this,word:b},this.userPriority)};a.TextExtractorWord.create=function(){return a.messageHandler.sendWithPromise("textExtractorWordCreate",
{},this.userPriority).then(function(b){return new a.TextExtractorWord(b)})};a.TextExtractorWord.prototype.isValid=function(){l("isValid",this.yieldFunction);var b=this;this.yieldFunction="TextExtractorWord.isValid";return a.messageHandler.sendWithPromise("TextExtractorWord.isValid",{tew:this},this.userPriority).then(function(a){b.yieldFunction=void 0;p(a.tew,b);return a.result})};a.TextExtractorLine.prototype.getNumWords=function(){l("getNumWords",this.yieldFunction);var b=this;this.yieldFunction=
"TextExtractorLine.getNumWords";return a.messageHandler.sendWithPromise("TextExtractorLine.getNumWords",{line:this},this.userPriority).then(function(a){b.yieldFunction=void 0;p(a.line,b);return a.result})};a.TextExtractorLine.prototype.isSimpleLine=function(){l("isSimpleLine",this.yieldFunction);var b=this;this.yieldFunction="TextExtractorLine.isSimpleLine";return a.messageHandler.sendWithPromise("TextExtractorLine.isSimpleLine",{line:this},this.userPriority).then(function(a){b.yieldFunction=void 0;
p(a.line,b);return a.result})};a.TextExtractorLine.prototype.getFirstWord=function(){l("getFirstWord",this.yieldFunction);var b=this;this.yieldFunction="TextExtractorLine.getFirstWord";return a.messageHandler.sendWithPromise("TextExtractorLine.getFirstWord",{line:this},this.userPriority).then(function(c){b.yieldFunction=void 0;c.result=new a.TextExtractorWord(c.result);p(c.line,b);return c.result})};a.TextExtractorLine.prototype.getWord=function(b){d(arguments.length,1,"getWord","(number)",[[b,"number"]]);
l("getWord",this.yieldFunction);var c=this;this.yieldFunction="TextExtractorLine.getWord";return a.messageHandler.sendWithPromise("TextExtractorLine.getWord",{line:this,word_idx:b},this.userPriority).then(function(b){c.yieldFunction=void 0;b.result=new a.TextExtractorWord(b.result);p(b.line,c);return b.result})};a.TextExtractorLine.prototype.getNextLine=function(){l("getNextLine",this.yieldFunction);var b=this;this.yieldFunction="TextExtractorLine.getNextLine";return a.messageHandler.sendWithPromise("TextExtractorLine.getNextLine",
{line:this},this.userPriority).then(function(c){b.yieldFunction=void 0;c.result=new a.TextExtractorLine(c.result);p(c.line,b);return c.result})};a.TextExtractorLine.prototype.getCurrentNum=function(){l("getCurrentNum",this.yieldFunction);var b=this;this.yieldFunction="TextExtractorLine.getCurrentNum";return a.messageHandler.sendWithPromise("TextExtractorLine.getCurrentNum",{line:this},this.userPriority).then(function(a){b.yieldFunction=void 0;p(a.line,b);return a.result})};a.TextExtractorLine.prototype.getStyle=
function(){l("getStyle",this.yieldFunction);var b=this;this.yieldFunction="TextExtractorLine.getStyle";return a.messageHandler.sendWithPromise("TextExtractorLine.getStyle",{line:this},this.userPriority).then(function(c){b.yieldFunction=void 0;c.result=new a.TextExtractorStyle(c.result);p(c.line,b);return c.result})};a.TextExtractorLine.prototype.getParagraphID=function(){l("getParagraphID",this.yieldFunction);var b=this;this.yieldFunction="TextExtractorLine.getParagraphID";return a.messageHandler.sendWithPromise("TextExtractorLine.getParagraphID",
{line:this},this.userPriority).then(function(a){b.yieldFunction=void 0;p(a.line,b);return a.result})};a.TextExtractorLine.prototype.getFlowID=function(){l("getFlowID",this.yieldFunction);var b=this;this.yieldFunction="TextExtractorLine.getFlowID";return a.messageHandler.sendWithPromise("TextExtractorLine.getFlowID",{line:this},this.userPriority).then(function(a){b.yieldFunction=void 0;p(a.line,b);return a.result})};a.TextExtractorLine.prototype.endsWithHyphen=function(){l("endsWithHyphen",this.yieldFunction);
var b=this;this.yieldFunction="TextExtractorLine.endsWithHyphen";return a.messageHandler.sendWithPromise("TextExtractorLine.endsWithHyphen",{line:this},this.userPriority).then(function(a){b.yieldFunction=void 0;p(a.line,b);return a.result})};a.TextExtractorLine.prototype.compare=function(b){d(arguments.length,1,"compare","(PDFNet.TextExtractorLine)",[[b,"Structure",a.TextExtractorLine,"TextExtractorLine"]]);l("compare",this.yieldFunction);n("compare",[[b,0]]);return a.messageHandler.sendWithPromise("TextExtractorLine.compare",
{line:this,line2:b},this.userPriority)};a.TextExtractorLine.create=function(){return a.messageHandler.sendWithPromise("textExtractorLineCreate",{},this.userPriority).then(function(b){return new a.TextExtractorLine(b)})};a.TextExtractorLine.prototype.isValid=function(){l("isValid",this.yieldFunction);var b=this;this.yieldFunction="TextExtractorLine.isValid";return a.messageHandler.sendWithPromise("TextExtractorLine.isValid",{line:this},this.userPriority).then(function(a){b.yieldFunction=void 0;p(a.line,
b);return a.result})};a.TextExtractor.prototype.getNumLines=function(){return a.messageHandler.sendWithPromise("TextExtractor.getNumLines",{te:this.id},this.userPriority)};a.TextExtractor.prototype.getFirstLine=function(){return a.messageHandler.sendWithPromise("TextExtractor.getFirstLine",{te:this.id},this.userPriority).then(function(b){return new a.TextExtractorLine(b)})};a.TextExtractor.prototype.getQuads=function(b,c,e){d(arguments.length,3,"getQuads","(PDFNet.Matrix2D, number, number)",[[b,"Structure",
a.Matrix2D,"Matrix2D"],[c,"number"],[e,"number"]]);n("getQuads",[[b,0]]);return a.messageHandler.sendWithPromise("TextExtractor.getQuads",{te:this.id,mtx:b,quads:c,quads_size:e},this.userPriority)};a.TextSearch.create=function(){return a.messageHandler.sendWithPromise("textSearchCreate",{},this.userPriority).then(function(b){return k(a.TextSearch,b)})};a.TextSearch.prototype.begin=function(b,c,e,f,g){"undefined"===typeof f&&(f=-1);"undefined"===typeof g&&(g=-1);d(arguments.length,3,"begin","(PDFNet.PDFDoc, string, number, number, number)",
[[b,"PDFDoc"],[c,"string"],[e,"number"],[f,"number"],[g,"number"]]);return a.messageHandler.sendWithPromise("TextSearch.begin",{ts:this.id,doc:b.id,pattern:c,mode:e,start_page:f,end_page:g},this.userPriority)};a.TextSearch.prototype.setPattern=function(b){d(arguments.length,1,"setPattern","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("TextSearch.setPattern",{ts:this.id,pattern:b},this.userPriority)};a.TextSearch.prototype.getMode=function(){return a.messageHandler.sendWithPromise("TextSearch.getMode",
{ts:this.id},this.userPriority)};a.TextSearch.prototype.setMode=function(b){d(arguments.length,1,"setMode","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("TextSearch.setMode",{ts:this.id,mode:b},this.userPriority)};a.TextSearch.prototype.setRightToLeftLanguage=function(b){d(arguments.length,1,"setRightToLeftLanguage","(boolean)",[[b,"boolean"]]);return a.messageHandler.sendWithPromise("TextSearch.setRightToLeftLanguage",{ts:this.id,flag:b},this.userPriority)};a.TextSearch.prototype.getCurrentPage=
function(){return a.messageHandler.sendWithPromise("TextSearch.getCurrentPage",{ts:this.id},this.userPriority)};a.TextSearch.prototype.setOCGContext=function(b){d(arguments.length,1,"setOCGContext","(PDFNet.OCGContext)",[[b,"Object",a.OCGContext,"OCGContext"]]);return a.messageHandler.sendWithPromise("TextSearch.setOCGContext",{te:this.id,ctx:b.id},this.userPriority)};a.NameTree.create=function(b,c){d(arguments.length,2,"create","(PDFNet.SDFDoc, string)",[[b,"SDFDoc"],[c,"string"]]);return a.messageHandler.sendWithPromise("nameTreeCreate",
{doc:b.id,name:c},this.userPriority).then(function(b){return f(a.NameTree,b)})};a.NameTree.find=function(b,c){d(arguments.length,2,"find","(PDFNet.SDFDoc, string)",[[b,"SDFDoc"],[c,"string"]]);return a.messageHandler.sendWithPromise("nameTreeFind",{doc:b.id,name:c},this.userPriority).then(function(b){return f(a.NameTree,b)})};a.NameTree.createFromObj=function(b){d(arguments.length,1,"createFromObj","(PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("nameTreeCreateFromObj",
{name_tree:b.id},this.userPriority).then(function(b){return f(a.NameTree,b)})};a.NameTree.prototype.copy=function(){return a.messageHandler.sendWithPromise("NameTree.copy",{d:this.id},this.userPriority).then(function(b){return f(a.NameTree,b)})};a.NameTree.prototype.isValid=function(){return a.messageHandler.sendWithPromise("NameTree.isValid",{tree:this.id},this.userPriority)};a.NameTree.prototype.getIterator=function(b){d(arguments.length,1,"getIterator","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("NameTree.getIterator",
{tree:this.id,key:b},this.userPriority).then(function(b){return k(a.DictIterator,b)})};a.NameTree.prototype.getValue=function(b){d(arguments.length,1,"getValue","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("NameTree.getValue",{tree:this.id,key:b},this.userPriority).then(function(b){return f(a.Obj,b)})};a.NameTree.prototype.getIteratorBegin=function(){return a.messageHandler.sendWithPromise("NameTree.getIteratorBegin",{tree:this.id},this.userPriority).then(function(b){return k(a.DictIterator,
b)})};a.NameTree.prototype.put=function(b,c){d(arguments.length,2,"put","(string, PDFNet.Obj)",[[b,"string"],[c,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("NameTree.put",{tree:this.id,key:b,value:c.id},this.userPriority)};a.NameTree.prototype.eraseKey=function(b){d(arguments.length,1,"eraseKey","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("NameTree.eraseKey",{tree:this.id,key:b},this.userPriority)};a.NameTree.prototype.erase=function(b){d(arguments.length,
1,"erase","(PDFNet.DictIterator)",[[b,"Object",a.DictIterator,"DictIterator"]]);return a.messageHandler.sendWithPromise("NameTree.erase",{tree:this.id,pos:b.id},this.userPriority)};a.NameTree.prototype.getSDFObj=function(){return a.messageHandler.sendWithPromise("NameTree.getSDFObj",{tree:this.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.NumberTree.create=function(b){d(arguments.length,1,"create","(PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("numberTreeCreate",
{number_tree:b.id},this.userPriority).then(function(b){return f(a.NumberTree,b)})};a.NumberTree.prototype.copy=function(){return a.messageHandler.sendWithPromise("NumberTree.copy",{tree:this.id},this.userPriority).then(function(b){return f(a.NumberTree,b)})};a.NumberTree.prototype.isValid=function(){return a.messageHandler.sendWithPromise("NumberTree.isValid",{tree:this.id},this.userPriority)};a.NumberTree.prototype.getIterator=function(b){d(arguments.length,1,"getIterator","(number)",[[b,"number"]]);
return a.messageHandler.sendWithPromise("NumberTree.getIterator",{tree:this.id,key:b},this.userPriority).then(function(b){return k(a.DictIterator,b)})};a.NumberTree.prototype.getValue=function(b){d(arguments.length,1,"getValue","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("NumberTree.getValue",{tree:this.id,key:b},this.userPriority).then(function(b){return f(a.Obj,b)})};a.NumberTree.prototype.getIteratorBegin=function(){return a.messageHandler.sendWithPromise("NumberTree.getIteratorBegin",
{tree:this.id},this.userPriority).then(function(b){return k(a.DictIterator,b)})};a.NumberTree.prototype.put=function(b,c){d(arguments.length,2,"put","(number, PDFNet.Obj)",[[b,"number"],[c,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("NumberTree.put",{tree:this.id,key:b,value:c.id},this.userPriority)};a.NumberTree.prototype.eraseKey=function(b){d(arguments.length,1,"eraseKey","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("NumberTree.eraseKey",{tree:this.id,
key:b},this.userPriority)};a.NumberTree.prototype.erase=function(b){d(arguments.length,1,"erase","(PDFNet.DictIterator)",[[b,"Object",a.DictIterator,"DictIterator"]]);return a.messageHandler.sendWithPromise("NumberTree.erase",{tree:this.id,pos:b.id},this.userPriority)};a.NumberTree.prototype.getSDFObj=function(){return a.messageHandler.sendWithPromise("NumberTree.getSDFObj",{tree:this.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.Obj.prototype.getType=function(){return a.messageHandler.sendWithPromise("Obj.getType",
{o:this.id},this.userPriority)};a.Obj.prototype.getDoc=function(){return a.messageHandler.sendWithPromise("Obj.getDoc",{o:this.id},this.userPriority).then(function(b){return f(a.SDFDoc,b)})};a.Obj.prototype.write=function(b){d(arguments.length,1,"write","(PDFNet.FilterWriter)",[[b,"Object",a.FilterWriter,"FilterWriter"]]);return a.messageHandler.sendWithPromise("Obj.write",{o:this.id,stream:b.id},this.userPriority)};a.Obj.prototype.isEqual=function(b){d(arguments.length,1,"isEqual","(PDFNet.Obj)",
[[b,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("Obj.isEqual",{o:this.id,to:b.id},this.userPriority)};a.Obj.prototype.isBool=function(){return a.messageHandler.sendWithPromise("Obj.isBool",{o:this.id},this.userPriority)};a.Obj.prototype.getBool=function(){return a.messageHandler.sendWithPromise("Obj.getBool",{o:this.id},this.userPriority)};a.Obj.prototype.setBool=function(b){d(arguments.length,1,"setBool","(boolean)",[[b,"boolean"]]);return a.messageHandler.sendWithPromise("Obj.setBool",
{o:this.id,b:b},this.userPriority)};a.Obj.prototype.isNumber=function(){return a.messageHandler.sendWithPromise("Obj.isNumber",{o:this.id},this.userPriority)};a.Obj.prototype.getNumber=function(){return a.messageHandler.sendWithPromise("Obj.getNumber",{o:this.id},this.userPriority)};a.Obj.prototype.setNumber=function(b){d(arguments.length,1,"setNumber","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("Obj.setNumber",{o:this.id,n:b},this.userPriority)};a.Obj.prototype.isNull=function(){return a.messageHandler.sendWithPromise("Obj.isNull",
{o:this.id},this.userPriority)};a.Obj.prototype.isString=function(){return a.messageHandler.sendWithPromise("Obj.isString",{o:this.id},this.userPriority)};a.Obj.prototype.getBuffer=function(){return a.messageHandler.sendWithPromise("Obj.getBuffer",{o:this.id},this.userPriority)};a.Obj.prototype.setString=function(b){d(arguments.length,1,"setString","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("Obj.setString",{o:this.id,value:b},this.userPriority)};a.Obj.prototype.setUString=
function(b){d(arguments.length,1,"setUString","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("Obj.setUString",{o:this.id,value:b},this.userPriority)};a.Obj.prototype.isName=function(){return a.messageHandler.sendWithPromise("Obj.isName",{o:this.id},this.userPriority)};a.Obj.prototype.getName=function(){return a.messageHandler.sendWithPromise("Obj.getName",{o:this.id},this.userPriority)};a.Obj.prototype.setName=function(b){d(arguments.length,1,"setName","(string)",[[b,"string"]]);
return a.messageHandler.sendWithPromise("Obj.setName",{o:this.id,name:b},this.userPriority)};a.Obj.prototype.isIndirect=function(){return a.messageHandler.sendWithPromise("Obj.isIndirect",{o:this.id},this.userPriority)};a.Obj.prototype.getObjNum=function(){return a.messageHandler.sendWithPromise("Obj.getObjNum",{o:this.id},this.userPriority)};a.Obj.prototype.getGenNum=function(){return a.messageHandler.sendWithPromise("Obj.getGenNum",{o:this.id},this.userPriority)};a.Obj.prototype.getOffset=function(){return a.messageHandler.sendWithPromise("Obj.getOffset",
{o:this.id},this.userPriority)};a.Obj.prototype.isFree=function(){return a.messageHandler.sendWithPromise("Obj.isFree",{o:this.id},this.userPriority)};a.Obj.prototype.setMark=function(b){d(arguments.length,1,"setMark","(boolean)",[[b,"boolean"]]);return a.messageHandler.sendWithPromise("Obj.setMark",{o:this.id,mark:b},this.userPriority)};a.Obj.prototype.isMarked=function(){return a.messageHandler.sendWithPromise("Obj.isMarked",{o:this.id},this.userPriority)};a.Obj.prototype.isLoaded=function(){return a.messageHandler.sendWithPromise("Obj.isLoaded",
{o:this.id},this.userPriority)};a.Obj.prototype.isContainer=function(){return a.messageHandler.sendWithPromise("Obj.isContainer",{o:this.id},this.userPriority)};a.Obj.prototype.size=function(){return a.messageHandler.sendWithPromise("Obj.size",{o:this.id},this.userPriority)};a.Obj.prototype.getDictIterator=function(){return a.messageHandler.sendWithPromise("Obj.getDictIterator",{o:this.id},this.userPriority).then(function(b){return k(a.DictIterator,b)})};a.Obj.prototype.isDict=function(){return a.messageHandler.sendWithPromise("Obj.isDict",
{o:this.id},this.userPriority)};a.Obj.prototype.find=function(b){d(arguments.length,1,"find","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("Obj.find",{o:this.id,key:b},this.userPriority).then(function(b){return k(a.DictIterator,b)})};a.Obj.prototype.findObj=function(b){d(arguments.length,1,"findObj","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("Obj.findObj",{o:this.id,key:b},this.userPriority).then(function(b){return f(a.Obj,b)})};a.Obj.prototype.get=function(b){d(arguments.length,
1,"get","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("Obj.get",{o:this.id,key:b},this.userPriority).then(function(b){return k(a.DictIterator,b)})};a.Obj.prototype.putName=function(b,c){d(arguments.length,2,"putName","(string, string)",[[b,"string"],[c,"string"]]);return a.messageHandler.sendWithPromise("Obj.putName",{o:this.id,key:b,name:c},this.userPriority).then(function(b){return f(a.Obj,b)})};a.Obj.prototype.putArray=function(b){d(arguments.length,1,"putArray","(string)",
[[b,"string"]]);return a.messageHandler.sendWithPromise("Obj.putArray",{o:this.id,key:b},this.userPriority).then(function(b){return f(a.Obj,b)})};a.Obj.prototype.putBool=function(b,c){d(arguments.length,2,"putBool","(string, boolean)",[[b,"string"],[c,"boolean"]]);return a.messageHandler.sendWithPromise("Obj.putBool",{o:this.id,key:b,value:c},this.userPriority).then(function(b){return f(a.Obj,b)})};a.Obj.prototype.putDict=function(b){d(arguments.length,1,"putDict","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("Obj.putDict",
{o:this.id,key:b},this.userPriority).then(function(b){return f(a.Obj,b)})};a.Obj.prototype.putNumber=function(b,c){d(arguments.length,2,"putNumber","(string, number)",[[b,"string"],[c,"number"]]);return a.messageHandler.sendWithPromise("Obj.putNumber",{o:this.id,key:b,value:c},this.userPriority).then(function(b){return f(a.Obj,b)})};a.Obj.prototype.putString=function(b,c){d(arguments.length,2,"putString","(string, string)",[[b,"string"],[c,"string"]]);return a.messageHandler.sendWithPromise("Obj.putString",
{o:this.id,key:b,value:c},this.userPriority).then(function(b){return f(a.Obj,b)})};a.Obj.prototype.putStringWithSize=function(b,c,e){d(arguments.length,3,"putStringWithSize","(string, string, number)",[[b,"string"],[c,"string"],[e,"number"]]);return a.messageHandler.sendWithPromise("Obj.putStringWithSize",{o:this.id,key:b,value:c,size:e},this.userPriority).then(function(b){return f(a.Obj,b)})};a.Obj.prototype.putText=function(b,c){d(arguments.length,2,"putText","(string, string)",[[b,"string"],[c,
"string"]]);return a.messageHandler.sendWithPromise("Obj.putText",{o:this.id,key:b,t:c},this.userPriority).then(function(b){return f(a.Obj,b)})};a.Obj.prototype.putNull=function(b){d(arguments.length,1,"putNull","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("Obj.putNull",{o:this.id,key:b},this.userPriority)};a.Obj.prototype.put=function(b,c){d(arguments.length,2,"put","(string, PDFNet.Obj)",[[b,"string"],[c,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("Obj.put",
{o:this.id,key:b,input_obj:c.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.Obj.prototype.putRect=function(b,c,e,m,g){d(arguments.length,5,"putRect","(string, number, number, number, number)",[[b,"string"],[c,"number"],[e,"number"],[m,"number"],[g,"number"]]);return a.messageHandler.sendWithPromise("Obj.putRect",{o:this.id,key:b,x1:c,y1:e,x2:m,y2:g},this.userPriority).then(function(b){return f(a.Obj,b)})};a.Obj.prototype.putMatrix=function(b,c){d(arguments.length,2,"putMatrix","(string, PDFNet.Matrix2D)",
[[b,"string"],[c,"Structure",a.Matrix2D,"Matrix2D"]]);n("putMatrix",[[c,1]]);return a.messageHandler.sendWithPromise("Obj.putMatrix",{o:this.id,key:b,mtx:c},this.userPriority).then(function(b){return f(a.Obj,b)})};a.Obj.prototype.eraseFromKey=function(b){d(arguments.length,1,"eraseFromKey","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("Obj.eraseFromKey",{o:this.id,key:b},this.userPriority)};a.Obj.prototype.erase=function(b){d(arguments.length,1,"erase","(PDFNet.DictIterator)",
[[b,"Object",a.DictIterator,"DictIterator"]]);return a.messageHandler.sendWithPromise("Obj.erase",{o:this.id,pos:b.id},this.userPriority)};a.Obj.prototype.rename=function(b,c){d(arguments.length,2,"rename","(string, string)",[[b,"string"],[c,"string"]]);return a.messageHandler.sendWithPromise("Obj.rename",{o:this.id,old_key:b,new_key:c},this.userPriority)};a.Obj.prototype.isArray=function(){return a.messageHandler.sendWithPromise("Obj.isArray",{o:this.id},this.userPriority)};a.Obj.prototype.getAt=
function(b){d(arguments.length,1,"getAt","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("Obj.getAt",{o:this.id,index:b},this.userPriority).then(function(b){return f(a.Obj,b)})};a.Obj.prototype.insertName=function(b,c){d(arguments.length,2,"insertName","(number, string)",[[b,"number"],[c,"string"]]);return a.messageHandler.sendWithPromise("Obj.insertName",{o:this.id,pos:b,name:c},this.userPriority).then(function(b){return f(a.Obj,b)})};a.Obj.prototype.insertArray=function(b){d(arguments.length,
1,"insertArray","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("Obj.insertArray",{o:this.id,pos:b},this.userPriority).then(function(b){return f(a.Obj,b)})};a.Obj.prototype.insertBool=function(b,c){d(arguments.length,2,"insertBool","(number, boolean)",[[b,"number"],[c,"boolean"]]);return a.messageHandler.sendWithPromise("Obj.insertBool",{o:this.id,pos:b,value:c},this.userPriority).then(function(b){return f(a.Obj,b)})};a.Obj.prototype.insertDict=function(b){d(arguments.length,1,
"insertDict","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("Obj.insertDict",{o:this.id,pos:b},this.userPriority).then(function(b){return f(a.Obj,b)})};a.Obj.prototype.insertNumber=function(b,c){d(arguments.length,2,"insertNumber","(number, number)",[[b,"number"],[c,"number"]]);return a.messageHandler.sendWithPromise("Obj.insertNumber",{o:this.id,pos:b,value:c},this.userPriority).then(function(b){return f(a.Obj,b)})};a.Obj.prototype.insertString=function(b,c){d(arguments.length,
2,"insertString","(number, string)",[[b,"number"],[c,"string"]]);return a.messageHandler.sendWithPromise("Obj.insertString",{o:this.id,pos:b,value:c},this.userPriority).then(function(b){return f(a.Obj,b)})};a.Obj.prototype.insertStringWithSize=function(b,c,e){d(arguments.length,3,"insertStringWithSize","(number, string, number)",[[b,"number"],[c,"string"],[e,"number"]]);return a.messageHandler.sendWithPromise("Obj.insertStringWithSize",{o:this.id,pos:b,value:c,size:e},this.userPriority).then(function(b){return f(a.Obj,
b)})};a.Obj.prototype.insertText=function(b,c){d(arguments.length,2,"insertText","(number, string)",[[b,"number"],[c,"string"]]);return a.messageHandler.sendWithPromise("Obj.insertText",{o:this.id,pos:b,t:c},this.userPriority).then(function(b){return f(a.Obj,b)})};a.Obj.prototype.insertNull=function(b){d(arguments.length,1,"insertNull","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("Obj.insertNull",{o:this.id,pos:b},this.userPriority).then(function(b){return f(a.Obj,b)})};a.Obj.prototype.insert=
function(b,c){d(arguments.length,2,"insert","(number, PDFNet.Obj)",[[b,"number"],[c,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("Obj.insert",{o:this.id,pos:b,input_obj:c.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.Obj.prototype.insertRect=function(b,c,e,m,g){d(arguments.length,5,"insertRect","(number, number, number, number, number)",[[b,"number"],[c,"number"],[e,"number"],[m,"number"],[g,"number"]]);return a.messageHandler.sendWithPromise("Obj.insertRect",{o:this.id,
pos:b,x1:c,y1:e,x2:m,y2:g},this.userPriority).then(function(b){return f(a.Obj,b)})};a.Obj.prototype.insertMatrix=function(b,c){d(arguments.length,2,"insertMatrix","(number, PDFNet.Matrix2D)",[[b,"number"],[c,"Structure",a.Matrix2D,"Matrix2D"]]);n("insertMatrix",[[c,1]]);return a.messageHandler.sendWithPromise("Obj.insertMatrix",{o:this.id,pos:b,mtx:c},this.userPriority).then(function(b){return f(a.Obj,b)})};a.Obj.prototype.pushBackName=function(b){d(arguments.length,1,"pushBackName","(string)",[[b,
"string"]]);return a.messageHandler.sendWithPromise("Obj.pushBackName",{o:this.id,name:b},this.userPriority).then(function(b){return f(a.Obj,b)})};a.Obj.prototype.pushBackArray=function(){return a.messageHandler.sendWithPromise("Obj.pushBackArray",{o:this.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.Obj.prototype.pushBackBool=function(b){d(arguments.length,1,"pushBackBool","(boolean)",[[b,"boolean"]]);return a.messageHandler.sendWithPromise("Obj.pushBackBool",{o:this.id,value:b},
this.userPriority).then(function(b){return f(a.Obj,b)})};a.Obj.prototype.pushBackDict=function(){return a.messageHandler.sendWithPromise("Obj.pushBackDict",{o:this.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.Obj.prototype.pushBackNumber=function(b){d(arguments.length,1,"pushBackNumber","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("Obj.pushBackNumber",{o:this.id,value:b},this.userPriority).then(function(b){return f(a.Obj,b)})};a.Obj.prototype.pushBackString=
function(b){d(arguments.length,1,"pushBackString","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("Obj.pushBackString",{o:this.id,value:b},this.userPriority).then(function(b){return f(a.Obj,b)})};a.Obj.prototype.pushBackStringWithSize=function(b,c){d(arguments.length,2,"pushBackStringWithSize","(string, number)",[[b,"string"],[c,"number"]]);return a.messageHandler.sendWithPromise("Obj.pushBackStringWithSize",{o:this.id,value:b,size:c},this.userPriority).then(function(b){return f(a.Obj,
b)})};a.Obj.prototype.pushBackText=function(b){d(arguments.length,1,"pushBackText","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("Obj.pushBackText",{o:this.id,t:b},this.userPriority).then(function(b){return f(a.Obj,b)})};a.Obj.prototype.pushBackNull=function(){return a.messageHandler.sendWithPromise("Obj.pushBackNull",{o:this.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.Obj.prototype.pushBack=function(b){d(arguments.length,1,"pushBack","(PDFNet.Obj)",[[b,"Object",
a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("Obj.pushBack",{o:this.id,input_obj:b.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.Obj.prototype.pushBackRect=function(b,c,e,m){d(arguments.length,4,"pushBackRect","(number, number, number, number)",[[b,"number"],[c,"number"],[e,"number"],[m,"number"]]);return a.messageHandler.sendWithPromise("Obj.pushBackRect",{o:this.id,x1:b,y1:c,x2:e,y2:m},this.userPriority).then(function(b){return f(a.Obj,b)})};a.Obj.prototype.pushBackMatrix=
function(b){d(arguments.length,1,"pushBackMatrix","(PDFNet.Matrix2D)",[[b,"Structure",a.Matrix2D,"Matrix2D"]]);n("pushBackMatrix",[[b,0]]);return a.messageHandler.sendWithPromise("Obj.pushBackMatrix",{o:this.id,mtx:b},this.userPriority).then(function(b){return f(a.Obj,b)})};a.Obj.prototype.eraseAt=function(b){d(arguments.length,1,"eraseAt","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("Obj.eraseAt",{o:this.id,pos:b},this.userPriority)};a.Obj.prototype.isStream=function(){return a.messageHandler.sendWithPromise("Obj.isStream",
{o:this.id},this.userPriority)};a.Obj.prototype.getRawStreamLength=function(){return a.messageHandler.sendWithPromise("Obj.getRawStreamLength",{o:this.id},this.userPriority)};a.Obj.prototype.setStreamData=function(b,c){d(arguments.length,2,"setStreamData","(string, number)",[[b,"string"],[c,"number"]]);return a.messageHandler.sendWithPromise("Obj.setStreamData",{obj:this.id,data:b,data_size:c},this.userPriority)};a.Obj.prototype.setStreamDataWithFilter=function(b,c,e){"undefined"===typeof e&&(e=new a.Filter("0"));
d(arguments.length,2,"setStreamDataWithFilter","(string, number, PDFNet.Filter)",[[b,"const char* = 0"],[c,"number"],[e,"Object",a.Filter,"Filter"]]);0!=e.id&&r(e.id);return a.messageHandler.sendWithPromise("Obj.setStreamDataWithFilter",{obj:this.id,data:b,data_size:c,no_own_filter_chain:e.id},this.userPriority)};a.Obj.prototype.getRawStream=function(b){d(arguments.length,1,"getRawStream","(boolean)",[[b,"boolean"]]);return a.messageHandler.sendWithPromise("Obj.getRawStream",{o:this.id,decrypt:b},
this.userPriority).then(function(b){return f(a.Filter,b)})};a.Obj.prototype.getDecodedStream=function(){return a.messageHandler.sendWithPromise("Obj.getDecodedStream",{o:this.id},this.userPriority).then(function(b){return f(a.Filter,b)})};a.ObjSet.create=function(){return a.messageHandler.sendWithPromise("objSetCreate",{},this.userPriority).then(function(b){return k(a.ObjSet,b)})};a.ObjSet.prototype.createName=function(b){d(arguments.length,1,"createName","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("ObjSet.createName",
{set:this.id,name:b},this.userPriority).then(function(b){return f(a.Obj,b)})};a.ObjSet.prototype.createArray=function(){return a.messageHandler.sendWithPromise("ObjSet.createArray",{set:this.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.ObjSet.prototype.createBool=function(b){d(arguments.length,1,"createBool","(boolean)",[[b,"boolean"]]);return a.messageHandler.sendWithPromise("ObjSet.createBool",{set:this.id,value:b},this.userPriority).then(function(b){return f(a.Obj,b)})};a.ObjSet.prototype.createDict=
function(){return a.messageHandler.sendWithPromise("ObjSet.createDict",{set:this.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.ObjSet.prototype.createNull=function(){return a.messageHandler.sendWithPromise("ObjSet.createNull",{set:this.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.ObjSet.prototype.createNumber=function(b){d(arguments.length,1,"createNumber","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("ObjSet.createNumber",{set:this.id,value:b},
this.userPriority).then(function(b){return f(a.Obj,b)})};a.ObjSet.prototype.createString=function(b){d(arguments.length,1,"createString","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("ObjSet.createString",{set:this.id,value:b},this.userPriority).then(function(b){return f(a.Obj,b)})};a.ObjSet.prototype.createFromJson=function(b){d(arguments.length,1,"createFromJson","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("ObjSet.createFromJson",{set:this.id,json:b},
this.userPriority).then(function(b){return f(a.Obj,b)})};a.SDFDoc.createFromFileUString=function(b){d(arguments.length,1,"createFromFileUString","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("sdfDocCreateFromFileUString",{filepath:b},this.userPriority).then(function(b){return f(a.SDFDoc,b)})};a.SDFDoc.createFromFileString=function(b){d(arguments.length,1,"createFromFileString","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("sdfDocCreateFromFileString",{filepath:b},
this.userPriority).then(function(b){return f(a.SDFDoc,b)})};a.SDFDoc.prototype.createShallowCopy=function(){return a.messageHandler.sendWithPromise("SDFDoc.createShallowCopy",{source:this.id},this.userPriority).then(function(b){return f(a.SDFDoc,b)})};a.SDFDoc.prototype.releaseFileHandles=function(){return a.messageHandler.sendWithPromise("SDFDoc.releaseFileHandles",{doc:this.id},this.userPriority)};a.SDFDoc.prototype.isEncrypted=function(){return a.messageHandler.sendWithPromise("SDFDoc.isEncrypted",
{doc:this.id},this.userPriority)};a.SDFDoc.prototype.initStdSecurityHandler=function(b,c){d(arguments.length,2,"initStdSecurityHandler","(string, number)",[[b,"string"],[c,"number"]]);return a.messageHandler.sendWithPromise("SDFDoc.initStdSecurityHandler",{doc:this.id,password:b,password_sz:c},this.userPriority)};a.SDFDoc.prototype.initStdSecurityHandlerUString=function(b){d(arguments.length,1,"initStdSecurityHandlerUString","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("SDFDoc.initStdSecurityHandlerUString",
{doc:this.id,password:b},this.userPriority)};a.SDFDoc.prototype.isModified=function(){return a.messageHandler.sendWithPromise("SDFDoc.isModified",{doc:this.id},this.userPriority)};a.SDFDoc.prototype.hasRepairedXRef=function(){return a.messageHandler.sendWithPromise("SDFDoc.hasRepairedXRef",{doc:this.id},this.userPriority)};a.SDFDoc.prototype.isFullSaveRequired=function(){return a.messageHandler.sendWithPromise("SDFDoc.isFullSaveRequired",{doc:this.id},this.userPriority)};a.SDFDoc.prototype.getTrailer=
function(){return a.messageHandler.sendWithPromise("SDFDoc.getTrailer",{doc:this.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.SDFDoc.prototype.getObj=function(b){d(arguments.length,1,"getObj","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("SDFDoc.getObj",{doc:this.id,obj_num:b},this.userPriority).then(function(b){return f(a.Obj,b)})};a.SDFDoc.prototype.importObj=function(b,c){d(arguments.length,2,"importObj","(PDFNet.Obj, boolean)",[[b,"Object",a.Obj,"Obj"],[c,
"boolean"]]);return a.messageHandler.sendWithPromise("SDFDoc.importObj",{doc:this.id,obj:b.id,deep_copy:c},this.userPriority).then(function(b){return f(a.Obj,b)})};a.SDFDoc.prototype.importObjsWithExcludeList=function(b,c){d(arguments.length,2,"importObjsWithExcludeList","(Array<PDFNet.Obj>, Array<PDFNet.Obj>)",[[b,"Array"],[c,"Array"]]);b=Array.from(b,function(a){return a.id});c=Array.from(c,function(a){return a.id});return a.messageHandler.sendWithPromise("SDFDoc.importObjsWithExcludeList",{doc:this.id,
obj_list:b,exclude_list:c},this.userPriority).then(function(b){return f(a.Obj,b)})};a.SDFDoc.prototype.xRefSize=function(){return a.messageHandler.sendWithPromise("SDFDoc.xRefSize",{doc:this.id},this.userPriority)};a.SDFDoc.prototype.clearMarks=function(){return a.messageHandler.sendWithPromise("SDFDoc.clearMarks",{doc:this.id},this.userPriority)};a.SDFDoc.prototype.save=function(b,c,e){d(arguments.length,3,"save","(string, number, string)",[[b,"string"],[c,"number"],[e,"string"]]);return a.messageHandler.sendWithPromise("SDFDoc.save",
{doc:this.id,path:b,flags:c,header:e},this.userPriority)};a.SDFDoc.prototype.saveMemory=function(b,c){d(arguments.length,2,"saveMemory","(number, string)",[[b,"number"],[c,"string"]]);return a.messageHandler.sendWithPromise("SDFDoc.saveMemory",{doc:this.id,flags:b,header:c},this.userPriority).then(function(a){return new Uint8Array(a)})};a.SDFDoc.prototype.saveStream=function(b,c,e){d(arguments.length,3,"saveStream","(PDFNet.Filter, number, string)",[[b,"Object",a.Filter,"Filter"],[c,"number"],[e,
"string"]]);return a.messageHandler.sendWithPromise("SDFDoc.saveStream",{doc:this.id,stream:b.id,flags:c,header:e},this.userPriority)};a.SDFDoc.prototype.getHeader=function(){return a.messageHandler.sendWithPromise("SDFDoc.getHeader",{doc:this.id},this.userPriority)};a.SDFDoc.prototype.getSecurityHandler=function(){return a.messageHandler.sendWithPromise("SDFDoc.getSecurityHandler",{doc:this.id},this.userPriority).then(function(b){return f(a.SecurityHandler,b)})};a.SDFDoc.prototype.setSecurityHandler=
function(b){d(arguments.length,1,"setSecurityHandler","(PDFNet.SecurityHandler)",[[b,"Object",a.SecurityHandler,"SecurityHandler"]]);0!=b.id&&r(b.id);return a.messageHandler.sendWithPromise("SDFDoc.setSecurityHandler",{doc:this.id,no_own_handler:b.id},this.userPriority)};a.SDFDoc.prototype.removeSecurity=function(){return a.messageHandler.sendWithPromise("SDFDoc.removeSecurity",{doc:this.id},this.userPriority)};a.SDFDoc.prototype.swap=function(b,c){d(arguments.length,2,"swap","(number, number)",[[b,
"number"],[c,"number"]]);return a.messageHandler.sendWithPromise("SDFDoc.swap",{doc:this.id,obj_num1:b,obj_num2:c},this.userPriority)};a.SDFDoc.prototype.isLinearized=function(){return a.messageHandler.sendWithPromise("SDFDoc.isLinearized",{doc:this.id},this.userPriority)};a.SDFDoc.prototype.getLinearizationDict=function(){return a.messageHandler.sendWithPromise("SDFDoc.getLinearizationDict",{doc:this.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.SDFDoc.prototype.getHintStream=function(){return a.messageHandler.sendWithPromise("SDFDoc.getHintStream",
{doc:this.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.SDFDoc.prototype.enableDiskCaching=function(b){d(arguments.length,1,"enableDiskCaching","(boolean)",[[b,"boolean"]]);return a.messageHandler.sendWithPromise("SDFDoc.enableDiskCaching",{doc:this.id,use_cache_flag:b},this.userPriority)};a.SDFDoc.prototype.lock=function(){var b=this;return a.messageHandler.sendWithPromise("SDFDoc.lock",{doc:this.id},this.userPriority).then(function(){lockedObjects.push({name:"SDFDoc",id:b.id,unlocktype:"unlock"})})};
a.SDFDoc.prototype.unlock=function(){var b=this;return a.messageHandler.sendWithPromise("SDFDoc.unlock",{doc:this.id},this.userPriority).then(function(){A(b)})};a.SDFDoc.prototype.lockRead=function(){var b=this;return a.messageHandler.sendWithPromise("SDFDoc.lockRead",{doc:this.id},this.userPriority).then(function(){lockedObjects.push({name:"SDFDoc",id:b.id,unlocktype:"unlockRead"})})};a.SDFDoc.prototype.unlockRead=function(){var b=this;return a.messageHandler.sendWithPromise("SDFDoc.unlockRead",
{doc:this.id},this.userPriority).then(function(){A(b)})};a.SDFDoc.prototype.tryLock=function(){var b=this;return a.messageHandler.sendWithPromise("SDFDoc.tryLock",{doc:this.id},this.userPriority).then(function(a){a&&lockedObjects.push({name:"SDFDoc",id:b.id,unlocktype:"unlock"})})};a.SDFDoc.prototype.tryLockRead=function(){var b=this;return a.messageHandler.sendWithPromise("SDFDoc.tryLockRead",{doc:this.id},this.userPriority).then(function(a){a&&lockedObjects.push({name:"SDFDoc",id:b.id,unlocktype:"unlockRead"})})};
a.SDFDoc.prototype.getFileName=function(){return a.messageHandler.sendWithPromise("SDFDoc.getFileName",{doc:this.id},this.userPriority)};a.SDFDoc.prototype.createIndirectName=function(b){d(arguments.length,1,"createIndirectName","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("SDFDoc.createIndirectName",{doc:this.id,name:b},this.userPriority).then(function(b){return f(a.Obj,b)})};a.SDFDoc.prototype.createIndirectArray=function(){return a.messageHandler.sendWithPromise("SDFDoc.createIndirectArray",
{doc:this.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.SDFDoc.prototype.createIndirectBool=function(b){d(arguments.length,1,"createIndirectBool","(boolean)",[[b,"boolean"]]);return a.messageHandler.sendWithPromise("SDFDoc.createIndirectBool",{doc:this.id,value:b},this.userPriority).then(function(b){return f(a.Obj,b)})};a.SDFDoc.prototype.createIndirectDict=function(){return a.messageHandler.sendWithPromise("SDFDoc.createIndirectDict",{doc:this.id},this.userPriority).then(function(b){return f(a.Obj,
b)})};a.SDFDoc.prototype.createIndirectNull=function(){return a.messageHandler.sendWithPromise("SDFDoc.createIndirectNull",{doc:this.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.SDFDoc.prototype.createIndirectNumber=function(b){d(arguments.length,1,"createIndirectNumber","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("SDFDoc.createIndirectNumber",{doc:this.id,value:b},this.userPriority).then(function(b){return f(a.Obj,b)})};a.SDFDoc.prototype.createIndirectString=
function(b){d(arguments.length,1,"createIndirectString","(ArrayBuffer|TypedArray)",[[b,"ArrayBuffer"]]);var c=v(b,!1);return a.messageHandler.sendWithPromise("SDFDoc.createIndirectString",{doc:this.id,buf_value:c},this.userPriority).then(function(b){return f(a.Obj,b)})};a.SDFDoc.prototype.createIndirectStringFromUString=function(b){d(arguments.length,1,"createIndirectStringFromUString","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("SDFDoc.createIndirectStringFromUString",{doc:this.id,
str:b},this.userPriority).then(function(b){return f(a.Obj,b)})};a.SDFDoc.prototype.createIndirectStreamFromFilter=function(b,c){"undefined"===typeof c&&(c=new a.Filter("0"));d(arguments.length,1,"createIndirectStreamFromFilter","(PDFNet.FilterReader, PDFNet.Filter)",[[b,"Object",a.FilterReader,"FilterReader"],[c,"Object",a.Filter,"Filter"]]);0!=c.id&&r(c.id);return a.messageHandler.sendWithPromise("SDFDoc.createIndirectStreamFromFilter",{doc:this.id,data:b.id,no_own_filter_chain:c.id},this.userPriority).then(function(b){return f(a.Obj,
b)})};a.SDFDoc.prototype.createIndirectStream=function(b,c,e){"undefined"===typeof e&&(e=new a.Filter("0"));d(arguments.length,2,"createIndirectStream","(string, number, PDFNet.Filter)",[[b,"const char* = 0"],[c,"number"],[e,"Object",a.Filter,"Filter"]]);0!=e.id&&r(e.id);return a.messageHandler.sendWithPromise("SDFDoc.createIndirectStream",{doc:this.id,data:b,data_size:c,no_own_filter_chain:e.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.SecurityHandler.prototype.clone=function(){return a.messageHandler.sendWithPromise("SecurityHandler.clone",
{sh:this.id},this.userPriority).then(function(b){return k(a.SecurityHandler,b)})};a.SecurityHandler.prototype.getPermission=function(b){d(arguments.length,1,"getPermission","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("SecurityHandler.getPermission",{sh:this.id,p:b},this.userPriority)};a.SecurityHandler.prototype.getKeyLength=function(){return a.messageHandler.sendWithPromise("SecurityHandler.getKeyLength",{sh:this.id},this.userPriority)};a.SecurityHandler.prototype.getEncryptionAlgorithmID=
function(){return a.messageHandler.sendWithPromise("SecurityHandler.getEncryptionAlgorithmID",{sh:this.id},this.userPriority)};a.SecurityHandler.prototype.getHandlerDocName=function(){return a.messageHandler.sendWithPromise("SecurityHandler.getHandlerDocName",{sh:this.id},this.userPriority)};a.SecurityHandler.prototype.isModified=function(){return a.messageHandler.sendWithPromise("SecurityHandler.isModified",{sh:this.id},this.userPriority)};a.SecurityHandler.prototype.setModified=function(b){"undefined"===
typeof b&&(b=!0);d(arguments.length,0,"setModified","(boolean)",[[b,"boolean"]]);return a.messageHandler.sendWithPromise("SecurityHandler.setModified",{sh:this.id,is_modified:b},this.userPriority)};a.SecurityHandler.create=function(b){d(arguments.length,1,"create","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("securityHandlerCreate",{crypt_type:b},this.userPriority).then(function(b){return k(a.SecurityHandler,b)})};a.SecurityHandler.createFromEncCode=function(b,c,e){d(arguments.length,
3,"createFromEncCode","(string, number, number)",[[b,"string"],[c,"number"],[e,"number"]]);return a.messageHandler.sendWithPromise("securityHandlerCreateFromEncCode",{name:b,key_len:c,enc_code:e},this.userPriority).then(function(b){return k(a.SecurityHandler,b)})};a.SecurityHandler.createDefault=function(){return a.messageHandler.sendWithPromise("securityHandlerCreateDefault",{},this.userPriority).then(function(b){return k(a.SecurityHandler,b)})};a.SecurityHandler.prototype.setPermission=function(b,
c){d(arguments.length,2,"setPermission","(number, boolean)",[[b,"number"],[c,"boolean"]]);return a.messageHandler.sendWithPromise("SecurityHandler.setPermission",{sh:this.id,perm:b,value:c},this.userPriority)};a.SecurityHandler.prototype.changeRevisionNumber=function(b){d(arguments.length,1,"changeRevisionNumber","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("SecurityHandler.changeRevisionNumber",{sh:this.id,rev_num:b},this.userPriority)};a.SecurityHandler.prototype.setEncryptMetadata=
function(b){d(arguments.length,1,"setEncryptMetadata","(boolean)",[[b,"boolean"]]);return a.messageHandler.sendWithPromise("SecurityHandler.setEncryptMetadata",{sh:this.id,encrypt_metadata:b},this.userPriority)};a.SecurityHandler.prototype.getRevisionNumber=function(){return a.messageHandler.sendWithPromise("SecurityHandler.getRevisionNumber",{sh:this.id},this.userPriority)};a.SecurityHandler.prototype.isUserPasswordRequired=function(){return a.messageHandler.sendWithPromise("SecurityHandler.isUserPasswordRequired",
{sh:this.id},this.userPriority)};a.SecurityHandler.prototype.isMasterPasswordRequired=function(){return a.messageHandler.sendWithPromise("SecurityHandler.isMasterPasswordRequired",{sh:this.id},this.userPriority)};a.SecurityHandler.prototype.isAES=function(){return a.messageHandler.sendWithPromise("SecurityHandler.isAES",{sh:this.id},this.userPriority)};a.SecurityHandler.prototype.isAESObj=function(b){d(arguments.length,1,"isAESObj","(PDFNet.Obj)",[[b,"Object",a.Obj,"Obj"]]);return a.messageHandler.sendWithPromise("SecurityHandler.isAESObj",
{sh:this.id,stream:b.id},this.userPriority)};a.SecurityHandler.prototype.isRC4=function(){return a.messageHandler.sendWithPromise("SecurityHandler.isRC4",{sh:this.id},this.userPriority)};a.SecurityHandler.prototype.changeUserPasswordUString=function(b){d(arguments.length,1,"changeUserPasswordUString","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("SecurityHandler.changeUserPasswordUString",{sh:this.id,password:b},this.userPriority)};a.SecurityHandler.prototype.changeUserPasswordBuffer=
function(b){d(arguments.length,1,"changeUserPasswordBuffer","(ArrayBuffer|TypedArray)",[[b,"ArrayBuffer"]]);var c=v(b,!1);return a.messageHandler.sendWithPromise("SecurityHandler.changeUserPasswordBuffer",{sh:this.id,password_buf:c},this.userPriority)};a.SecurityHandler.prototype.changeMasterPasswordUString=function(b){d(arguments.length,1,"changeMasterPasswordUString","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("SecurityHandler.changeMasterPasswordUString",{sh:this.id,password:b},
this.userPriority)};a.SecurityHandler.prototype.changeMasterPasswordBuffer=function(b){d(arguments.length,1,"changeMasterPasswordBuffer","(ArrayBuffer|TypedArray)",[[b,"ArrayBuffer"]]);var c=v(b,!1);return a.messageHandler.sendWithPromise("SecurityHandler.changeMasterPasswordBuffer",{sh:this.id,password_buf:c},this.userPriority)};a.SecurityHandler.prototype.initPasswordUString=function(b){d(arguments.length,1,"initPasswordUString","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("SecurityHandler.initPasswordUString",
{sh:this.id,password:b},this.userPriority)};a.SecurityHandler.prototype.initPasswordBuffer=function(b){d(arguments.length,1,"initPasswordBuffer","(ArrayBuffer|TypedArray)",[[b,"ArrayBuffer"]]);var c=v(b,!1);return a.messageHandler.sendWithPromise("SecurityHandler.initPasswordBuffer",{sh:this.id,password_buf:c},this.userPriority)};a.SecurityHandler.prototype.authorize=function(b){d(arguments.length,1,"authorize","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("SecurityHandler.authorize",
{sh:this.id,p:b},this.userPriority)};a.SecurityHandler.prototype.authorizeFailed=function(){return a.messageHandler.sendWithPromise("SecurityHandler.authorizeFailed",{sh:this.id},this.userPriority)};a.SecurityHandler.prototype.getAuthorizationData=function(b){d(arguments.length,1,"getAuthorizationData","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("SecurityHandler.getAuthorizationData",{sh:this.id,req_opr:b},this.userPriority)};a.SecurityHandler.prototype.editSecurityData=function(b){d(arguments.length,
1,"editSecurityData","(PDFNet.SDFDoc)",[[b,"SDFDoc"]]);return a.messageHandler.sendWithPromise("SecurityHandler.editSecurityData",{sh:this.id,doc:b.id},this.userPriority)};a.SecurityHandler.prototype.fillEncryptDict=function(b){d(arguments.length,1,"fillEncryptDict","(PDFNet.SDFDoc)",[[b,"SDFDoc"]]);return a.messageHandler.sendWithPromise("SecurityHandler.fillEncryptDict",{sh:this.id,doc:b.id},this.userPriority).then(function(b){return f(a.Obj,b)})};a.SignatureHandler.prototype.getName=function(){return a.messageHandler.sendWithPromise("SignatureHandler.getName",
{signature_handler:this.id},this.userPriority)};a.SignatureHandler.prototype.reset=function(){return a.messageHandler.sendWithPromise("SignatureHandler.reset",{signature_handler:this.id},this.userPriority)};a.SignatureHandler.prototype.destructor=function(){return a.messageHandler.sendWithPromise("SignatureHandler.destructor",{signature_handler:this.id},this.userPriority)};a.UndoManager.prototype.discardAllSnapshots=function(){return a.messageHandler.sendWithPromise("UndoManager.discardAllSnapshots",
{self:this.id},this.userPriority).then(function(b){return k(a.DocSnapshot,b)})};a.UndoManager.prototype.undo=function(){return a.messageHandler.sendWithPromise("UndoManager.undo",{self:this.id},this.userPriority).then(function(b){return k(a.ResultSnapshot,b)})};a.UndoManager.prototype.canUndo=function(){return a.messageHandler.sendWithPromise("UndoManager.canUndo",{self:this.id},this.userPriority)};a.UndoManager.prototype.getNextUndoSnapshot=function(){return a.messageHandler.sendWithPromise("UndoManager.getNextUndoSnapshot",
{self:this.id},this.userPriority).then(function(b){return k(a.DocSnapshot,b)})};a.UndoManager.prototype.redo=function(){return a.messageHandler.sendWithPromise("UndoManager.redo",{self:this.id},this.userPriority).then(function(b){return k(a.ResultSnapshot,b)})};a.UndoManager.prototype.canRedo=function(){return a.messageHandler.sendWithPromise("UndoManager.canRedo",{self:this.id},this.userPriority)};a.UndoManager.prototype.getNextRedoSnapshot=function(){return a.messageHandler.sendWithPromise("UndoManager.getNextRedoSnapshot",
{self:this.id},this.userPriority).then(function(b){return k(a.DocSnapshot,b)})};a.UndoManager.prototype.takeSnapshot=function(){return a.messageHandler.sendWithPromise("UndoManager.takeSnapshot",{self:this.id},this.userPriority).then(function(b){return k(a.ResultSnapshot,b)})};a.ResultSnapshot.prototype.currentState=function(){return a.messageHandler.sendWithPromise("ResultSnapshot.currentState",{self:this.id},this.userPriority).then(function(b){return k(a.DocSnapshot,b)})};a.ResultSnapshot.prototype.previousState=
function(){return a.messageHandler.sendWithPromise("ResultSnapshot.previousState",{self:this.id},this.userPriority).then(function(b){return k(a.DocSnapshot,b)})};a.ResultSnapshot.prototype.isOk=function(){return a.messageHandler.sendWithPromise("ResultSnapshot.isOk",{self:this.id},this.userPriority)};a.ResultSnapshot.prototype.isNullTransition=function(){return a.messageHandler.sendWithPromise("ResultSnapshot.isNullTransition",{self:this.id},this.userPriority)};a.DocSnapshot.prototype.getHash=function(){return a.messageHandler.sendWithPromise("DocSnapshot.getHash",
{self:this.id},this.userPriority)};a.DocSnapshot.prototype.isValid=function(){return a.messageHandler.sendWithPromise("DocSnapshot.isValid",{self:this.id},this.userPriority)};a.DocSnapshot.prototype.equals=function(b){d(arguments.length,1,"equals","(PDFNet.DocSnapshot)",[[b,"Object",a.DocSnapshot,"DocSnapshot"]]);return a.messageHandler.sendWithPromise("DocSnapshot.equals",{self:this.id,snapshot:b.id},this.userPriority)};a.CADModule.isModuleAvailable=function(){return a.messageHandler.sendWithPromise("cadModuleIsModuleAvailable",
{},this.userPriority)};a.OCRModule.isModuleAvailable=function(){return a.messageHandler.sendWithPromise("ocrModuleIsModuleAvailable",{},this.userPriority)};a.OCRModule.imageToPDF=function(b,c,e){"undefined"===typeof e&&(e=new a.Obj("0"));d(arguments.length,2,"imageToPDF","(PDFNet.PDFDoc, string, PDFNet.Obj)",[[b,"PDFDoc"],[c,"string"],[e,"OptionObject",a.Obj,"Obj","PDFNet.OCRModule.OCROptions"]]);if("PDFNet.OCRModule.OCROptions"===e.name){var f=e;e=a.ObjSet.create().then(function(a){return a.createFromJson(JSON.stringify(f))})}else e=
Promise.resolve(e);return e.then(function(d){return a.messageHandler.sendWithPromise("ocrModuleImageToPDF",{dst:b.id,src:c,options:d.id},this.userPriority)})};a.OCRModule.processPDF=function(b,c){"undefined"===typeof c&&(c=new a.Obj("0"));d(arguments.length,1,"processPDF","(PDFNet.PDFDoc, PDFNet.Obj)",[[b,"PDFDoc"],[c,"OptionObject",a.Obj,"Obj","PDFNet.OCRModule.OCROptions"]]);if("PDFNet.OCRModule.OCROptions"===c.name){var e=c;c=a.ObjSet.create().then(function(a){return a.createFromJson(JSON.stringify(e))})}else c=
Promise.resolve(c);return c.then(function(c){return a.messageHandler.sendWithPromise("ocrModuleProcessPDF",{dst:b.id,options:c.id},this.userPriority)})};a.OCRModule.getOCRJsonFromImage=function(b,c,e){"undefined"===typeof e&&(e=new a.Obj("0"));d(arguments.length,2,"getOCRJsonFromImage","(PDFNet.PDFDoc, string, PDFNet.Obj)",[[b,"PDFDoc"],[c,"string"],[e,"OptionObject",a.Obj,"Obj","PDFNet.OCRModule.OCROptions"]]);if("PDFNet.OCRModule.OCROptions"===e.name){var f=e;e=a.ObjSet.create().then(function(a){return a.createFromJson(JSON.stringify(f))})}else e=
Promise.resolve(e);return e.then(function(d){return a.messageHandler.sendWithPromise("ocrModuleGetOCRJsonFromImage",{dst:b.id,src:c,options:d.id},this.userPriority)})};a.OCRModule.getOCRJsonFromPDF=function(b,c){"undefined"===typeof c&&(c=new a.Obj("0"));d(arguments.length,1,"getOCRJsonFromPDF","(PDFNet.PDFDoc, PDFNet.Obj)",[[b,"PDFDoc"],[c,"OptionObject",a.Obj,"Obj","PDFNet.OCRModule.OCROptions"]]);if("PDFNet.OCRModule.OCROptions"===c.name){var e=c;c=a.ObjSet.create().then(function(a){return a.createFromJson(JSON.stringify(e))})}else c=
Promise.resolve(c);return c.then(function(c){return a.messageHandler.sendWithPromise("ocrModuleGetOCRJsonFromPDF",{src:b.id,options:c.id},this.userPriority)})};a.OCRModule.applyOCRJsonToPDF=function(b,c){d(arguments.length,2,"applyOCRJsonToPDF","(PDFNet.PDFDoc, string)",[[b,"PDFDoc"],[c,"string"]]);return a.messageHandler.sendWithPromise("ocrModuleApplyOCRJsonToPDF",{dst:b.id,json:c},this.userPriority)};a.OCRModule.getOCRXmlFromImage=function(b,c,e){"undefined"===typeof e&&(e=new a.Obj("0"));d(arguments.length,
2,"getOCRXmlFromImage","(PDFNet.PDFDoc, string, PDFNet.Obj)",[[b,"PDFDoc"],[c,"string"],[e,"OptionObject",a.Obj,"Obj","PDFNet.OCRModule.OCROptions"]]);if("PDFNet.OCRModule.OCROptions"===e.name){var f=e;e=a.ObjSet.create().then(function(a){return a.createFromJson(JSON.stringify(f))})}else e=Promise.resolve(e);return e.then(function(d){return a.messageHandler.sendWithPromise("ocrModuleGetOCRXmlFromImage",{dst:b.id,src:c,options:d.id},this.userPriority)})};a.OCRModule.getOCRXmlFromPDF=function(b,c){"undefined"===
typeof c&&(c=new a.Obj("0"));d(arguments.length,1,"getOCRXmlFromPDF","(PDFNet.PDFDoc, PDFNet.Obj)",[[b,"PDFDoc"],[c,"OptionObject",a.Obj,"Obj","PDFNet.OCRModule.OCROptions"]]);if("PDFNet.OCRModule.OCROptions"===c.name){var e=c;c=a.ObjSet.create().then(function(a){return a.createFromJson(JSON.stringify(e))})}else c=Promise.resolve(c);return c.then(function(c){return a.messageHandler.sendWithPromise("ocrModuleGetOCRXmlFromPDF",{src:b.id,options:c.id},this.userPriority)})};a.OCRModule.applyOCRXmlToPDF=
function(b,c){d(arguments.length,2,"applyOCRXmlToPDF","(PDFNet.PDFDoc, string)",[[b,"PDFDoc"],[c,"string"]]);return a.messageHandler.sendWithPromise("ocrModuleApplyOCRXmlToPDF",{dst:b.id,xml:c},this.userPriority)};a.VerificationOptions.create=function(b){d(arguments.length,1,"create","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("verificationOptionsCreate",{in_level:b},this.userPriority).then(function(b){return k(a.VerificationOptions,b)})};a.VerificationOptions.prototype.addTrustedCertificate=
function(b,c){"undefined"===typeof c&&(c=a.VerificationOptions.CertificateTrustFlag.e_default_trust);d(arguments.length,1,"addTrustedCertificate","(ArrayBuffer|TypedArray, number)",[[b,"ArrayBuffer"],[c,"number"]]);var e=v(b,!1);return a.messageHandler.sendWithPromise("VerificationOptions.addTrustedCertificate",{self:this.id,in_certificate_buf:e,in_trust_flags:c},this.userPriority)};a.VerificationOptions.prototype.addTrustedCertificateUString=function(b,c){"undefined"===typeof c&&(c=a.VerificationOptions.CertificateTrustFlag.e_default_trust);
d(arguments.length,1,"addTrustedCertificateUString","(string, number)",[[b,"string"],[c,"number"]]);return a.messageHandler.sendWithPromise("VerificationOptions.addTrustedCertificateUString",{self:this.id,in_filepath:b,in_trust_flags:c},this.userPriority)};a.VerificationOptions.prototype.addTrustedCertificates=function(b){d(arguments.length,1,"addTrustedCertificates","(ArrayBuffer|TypedArray)",[[b,"ArrayBuffer"]]);var c=v(b,!1);return a.messageHandler.sendWithPromise("VerificationOptions.addTrustedCertificates",
{self:this.id,in_P7C_binary_DER_certificates_file_data_buf:c},this.userPriority)};a.VerificationOptions.prototype.loadTrustList=function(b){d(arguments.length,1,"loadTrustList","(PDFNet.FDFDoc)",[[b,"FDFDoc"]]);return a.messageHandler.sendWithPromise("VerificationOptions.loadTrustList",{self:this.id,in_fdf_cert_exchange_data:b.id},this.userPriority)};a.VerificationOptions.prototype.enableModificationVerification=function(b){d(arguments.length,1,"enableModificationVerification","(boolean)",[[b,"boolean"]]);
return a.messageHandler.sendWithPromise("VerificationOptions.enableModificationVerification",{self:this.id,in_on_or_off:b},this.userPriority)};a.VerificationOptions.prototype.enableDigestVerification=function(b){d(arguments.length,1,"enableDigestVerification","(boolean)",[[b,"boolean"]]);return a.messageHandler.sendWithPromise("VerificationOptions.enableDigestVerification",{self:this.id,in_on_or_off:b},this.userPriority)};a.VerificationOptions.prototype.enableTrustVerification=function(b){d(arguments.length,
1,"enableTrustVerification","(boolean)",[[b,"boolean"]]);return a.messageHandler.sendWithPromise("VerificationOptions.enableTrustVerification",{self:this.id,in_on_or_off:b},this.userPriority)};a.VerificationOptions.prototype.setRevocationProxyPrefix=function(b){d(arguments.length,1,"setRevocationProxyPrefix","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("VerificationOptions.setRevocationProxyPrefix",{self:this.id,in_str:b},this.userPriority)};a.VerificationOptions.prototype.enableOnlineCRLRevocationChecking=
function(b){d(arguments.length,1,"enableOnlineCRLRevocationChecking","(boolean)",[[b,"boolean"]]);return a.messageHandler.sendWithPromise("VerificationOptions.enableOnlineCRLRevocationChecking",{self:this.id,in_on_or_off:b},this.userPriority)};a.VerificationOptions.prototype.enableOnlineOCSPRevocationChecking=function(b){d(arguments.length,1,"enableOnlineOCSPRevocationChecking","(boolean)",[[b,"boolean"]]);return a.messageHandler.sendWithPromise("VerificationOptions.enableOnlineOCSPRevocationChecking",
{self:this.id,in_on_or_off:b},this.userPriority)};a.VerificationOptions.prototype.enableOnlineRevocationChecking=function(b){d(arguments.length,1,"enableOnlineRevocationChecking","(boolean)",[[b,"boolean"]]);return a.messageHandler.sendWithPromise("VerificationOptions.enableOnlineRevocationChecking",{self:this.id,in_on_or_off:b},this.userPriority)};a.VerificationResult.prototype.getDigitalSignatureField=function(){return a.messageHandler.sendWithPromise("VerificationResult.getDigitalSignatureField",
{self:this.id},this.userPriority).then(function(b){return new a.DigitalSignatureField(b)})};a.VerificationResult.prototype.getVerificationStatus=function(){return a.messageHandler.sendWithPromise("VerificationResult.getVerificationStatus",{self:this.id},this.userPriority)};a.VerificationResult.prototype.getDocumentStatus=function(){return a.messageHandler.sendWithPromise("VerificationResult.getDocumentStatus",{self:this.id},this.userPriority)};a.VerificationResult.prototype.getDigestStatus=function(){return a.messageHandler.sendWithPromise("VerificationResult.getDigestStatus",
{self:this.id},this.userPriority)};a.VerificationResult.prototype.getTrustStatus=function(){return a.messageHandler.sendWithPromise("VerificationResult.getTrustStatus",{self:this.id},this.userPriority)};a.VerificationResult.prototype.getPermissionsStatus=function(){return a.messageHandler.sendWithPromise("VerificationResult.getPermissionsStatus",{self:this.id},this.userPriority)};a.VerificationResult.prototype.getTrustVerificationResult=function(){return a.messageHandler.sendWithPromise("VerificationResult.getTrustVerificationResult",
{self:this.id},this.userPriority).then(function(b){return k(a.TrustVerificationResult,b)})};a.VerificationResult.prototype.hasTrustVerificationResult=function(){return a.messageHandler.sendWithPromise("VerificationResult.hasTrustVerificationResult",{self:this.id},this.userPriority)};a.VerificationResult.prototype.getDisallowedChanges=function(){return a.messageHandler.sendWithPromise("VerificationResult.getDisallowedChanges",{self:this.id},this.userPriority).then(function(b){for(var c=[],d=0;d<b.length;++d){var f=
b[d];if("0"===f)return null;f=new a.DisallowedChange(f);c.push(f);createdObjects.push({name:f.name,id:f.id})}return c})};a.VerificationResult.prototype.getDigestAlgorithm=function(){return a.messageHandler.sendWithPromise("VerificationResult.getDigestAlgorithm",{self:this.id},this.userPriority)};a.VerificationResult.prototype.getDocumentStatusAsString=function(){return a.messageHandler.sendWithPromise("VerificationResult.getDocumentStatusAsString",{self:this.id},this.userPriority)};a.VerificationResult.prototype.getDigestStatusAsString=
function(){return a.messageHandler.sendWithPromise("VerificationResult.getDigestStatusAsString",{self:this.id},this.userPriority)};a.VerificationResult.prototype.getTrustStatusAsString=function(){return a.messageHandler.sendWithPromise("VerificationResult.getTrustStatusAsString",{self:this.id},this.userPriority)};a.VerificationResult.prototype.getPermissionsStatusAsString=function(){return a.messageHandler.sendWithPromise("VerificationResult.getPermissionsStatusAsString",{self:this.id},this.userPriority)};
a.VerificationResult.prototype.getUnsupportedFeatures=function(){return a.messageHandler.sendWithPromise("VerificationResult.getUnsupportedFeatures",{self:this.id},this.userPriority)};a.EmbeddedTimestampVerificationResult.prototype.getVerificationStatus=function(){return a.messageHandler.sendWithPromise("EmbeddedTimestampVerificationResult.getVerificationStatus",{self:this.id},this.userPriority)};a.EmbeddedTimestampVerificationResult.prototype.getCMSDigestStatus=function(){return a.messageHandler.sendWithPromise("EmbeddedTimestampVerificationResult.getCMSDigestStatus",
{self:this.id},this.userPriority)};a.EmbeddedTimestampVerificationResult.prototype.getMessageImprintDigestStatus=function(){return a.messageHandler.sendWithPromise("EmbeddedTimestampVerificationResult.getMessageImprintDigestStatus",{self:this.id},this.userPriority)};a.EmbeddedTimestampVerificationResult.prototype.getTrustStatus=function(){return a.messageHandler.sendWithPromise("EmbeddedTimestampVerificationResult.getTrustStatus",{self:this.id},this.userPriority)};a.EmbeddedTimestampVerificationResult.prototype.getCMSDigestStatusAsString=
function(){return a.messageHandler.sendWithPromise("EmbeddedTimestampVerificationResult.getCMSDigestStatusAsString",{self:this.id},this.userPriority)};a.EmbeddedTimestampVerificationResult.prototype.getMessageImprintDigestStatusAsString=function(){return a.messageHandler.sendWithPromise("EmbeddedTimestampVerificationResult.getMessageImprintDigestStatusAsString",{self:this.id},this.userPriority)};a.EmbeddedTimestampVerificationResult.prototype.getTrustStatusAsString=function(){return a.messageHandler.sendWithPromise("EmbeddedTimestampVerificationResult.getTrustStatusAsString",
{self:this.id},this.userPriority)};a.EmbeddedTimestampVerificationResult.prototype.hasTrustVerificationResult=function(){return a.messageHandler.sendWithPromise("EmbeddedTimestampVerificationResult.hasTrustVerificationResult",{self:this.id},this.userPriority)};a.EmbeddedTimestampVerificationResult.prototype.getTrustVerificationResult=function(){return a.messageHandler.sendWithPromise("EmbeddedTimestampVerificationResult.getTrustVerificationResult",{self:this.id},this.userPriority).then(function(b){return k(a.TrustVerificationResult,
b)})};a.EmbeddedTimestampVerificationResult.prototype.getCMSSignatureDigestAlgorithm=function(){return a.messageHandler.sendWithPromise("EmbeddedTimestampVerificationResult.getCMSSignatureDigestAlgorithm",{self:this.id},this.userPriority)};a.EmbeddedTimestampVerificationResult.prototype.getMessageImprintDigestAlgorithm=function(){return a.messageHandler.sendWithPromise("EmbeddedTimestampVerificationResult.getMessageImprintDigestAlgorithm",{self:this.id},this.userPriority)};a.EmbeddedTimestampVerificationResult.prototype.getUnsupportedFeatures=
function(){return a.messageHandler.sendWithPromise("EmbeddedTimestampVerificationResult.getUnsupportedFeatures",{self:this.id},this.userPriority)};a.TrustVerificationResult.prototype.wasSuccessful=function(){return a.messageHandler.sendWithPromise("TrustVerificationResult.wasSuccessful",{self:this.id},this.userPriority)};a.TrustVerificationResult.prototype.getResultString=function(){return a.messageHandler.sendWithPromise("TrustVerificationResult.getResultString",{self:this.id},this.userPriority)};
a.TrustVerificationResult.prototype.getTimeOfTrustVerification=function(){return a.messageHandler.sendWithPromise("TrustVerificationResult.getTimeOfTrustVerification",{self:this.id},this.userPriority)};a.TrustVerificationResult.prototype.getTimeOfTrustVerificationEnum=function(){return a.messageHandler.sendWithPromise("TrustVerificationResult.getTimeOfTrustVerificationEnum",{self:this.id},this.userPriority)};a.TrustVerificationResult.prototype.hasEmbeddedTimestampVerificationResult=function(){return a.messageHandler.sendWithPromise("TrustVerificationResult.hasEmbeddedTimestampVerificationResult",
{self:this.id},this.userPriority)};a.TrustVerificationResult.prototype.getEmbeddedTimestampVerificationResult=function(){return a.messageHandler.sendWithPromise("TrustVerificationResult.getEmbeddedTimestampVerificationResult",{self:this.id},this.userPriority).then(function(b){return k(a.EmbeddedTimestampVerificationResult,b)})};a.TrustVerificationResult.prototype.getCertPath=function(){return a.messageHandler.sendWithPromise("TrustVerificationResult.getCertPath",{self:this.id},this.userPriority).then(function(b){for(var c=
[],d=0;d<b.length;++d){var f=b[d];if("0"===f)return null;f=new a.X509Certificate(f);c.push(f);createdObjects.push({name:f.name,id:f.id})}return c})};a.DisallowedChange.prototype.getObjNum=function(){return a.messageHandler.sendWithPromise("DisallowedChange.getObjNum",{self:this.id},this.userPriority)};a.DisallowedChange.prototype.getType=function(){return a.messageHandler.sendWithPromise("DisallowedChange.getType",{self:this.id},this.userPriority)};a.DisallowedChange.prototype.getTypeAsString=function(){return a.messageHandler.sendWithPromise("DisallowedChange.getTypeAsString",
{self:this.id},this.userPriority)};a.X509Extension.prototype.isCritical=function(){return a.messageHandler.sendWithPromise("X509Extension.isCritical",{self:this.id},this.userPriority)};a.X509Extension.prototype.getObjectIdentifier=function(){return a.messageHandler.sendWithPromise("X509Extension.getObjectIdentifier",{self:this.id},this.userPriority).then(function(b){return k(a.ObjectIdentifier,b)})};a.X509Extension.prototype.toString=function(){return a.messageHandler.sendWithPromise("X509Extension.toString",
{self:this.id},this.userPriority)};a.X509Extension.prototype.getData=function(){return a.messageHandler.sendWithPromise("X509Extension.getData",{self:this.id},this.userPriority).then(function(a){return new Uint8Array(a)})};a.X501AttributeTypeAndValue.prototype.getAttributeTypeOID=function(){return a.messageHandler.sendWithPromise("X501AttributeTypeAndValue.getAttributeTypeOID",{self:this.id},this.userPriority).then(function(b){return k(a.ObjectIdentifier,b)})};a.X501AttributeTypeAndValue.prototype.getStringValue=
function(){return a.messageHandler.sendWithPromise("X501AttributeTypeAndValue.getStringValue",{self:this.id},this.userPriority)};a.ByteRange.prototype.getStartOffset=function(){l("getStartOffset",this.yieldFunction);return a.messageHandler.sendWithPromise("ByteRange.getStartOffset",{self:this},this.userPriority)};a.ByteRange.prototype.getEndOffset=function(){l("getEndOffset",this.yieldFunction);return a.messageHandler.sendWithPromise("ByteRange.getEndOffset",{self:this},this.userPriority)};a.ByteRange.prototype.getSize=
function(){l("getSize",this.yieldFunction);return a.messageHandler.sendWithPromise("ByteRange.getSize",{self:this},this.userPriority)};a.TimestampingTestResult.prototype.getStatus=function(){return a.messageHandler.sendWithPromise("TimestampingTestResult.getStatus",{self:this.id},this.userPriority)};a.TimestampingTestResult.prototype.getString=function(){return a.messageHandler.sendWithPromise("TimestampingTestResult.getString",{self:this.id},this.userPriority)};a.TimestampingTestResult.prototype.hasResponseVerificationResult=
function(){return a.messageHandler.sendWithPromise("TimestampingTestResult.hasResponseVerificationResult",{self:this.id},this.userPriority)};a.TimestampingTestResult.prototype.getResponseVerificationResult=function(){return a.messageHandler.sendWithPromise("TimestampingTestResult.getResponseVerificationResult",{self:this.id},this.userPriority).then(function(b){return k(a.EmbeddedTimestampVerificationResult,b)})};a.ActionParameter.create=function(b){d(arguments.length,1,"create","(PDFNet.Action)",
[[b,"Object",a.Action,"Action"]]);return a.messageHandler.sendWithPromise("actionParameterCreate",{action:b.id},this.userPriority).then(function(b){return k(a.ActionParameter,b)})};a.Action.prototype.parameterCreateWithField=function(b){d(arguments.length,1,"parameterCreateWithField","(PDFNet.Field)",[[b,"Structure",a.Field,"Field"]]);n("parameterCreateWithField",[[b,0]]);return a.messageHandler.sendWithPromise("Action.parameterCreateWithField",{action:this.id,field:b},this.userPriority).then(function(b){return k(a.ActionParameter,
b)})};a.Action.prototype.parameterCreateWithAnnot=function(b){d(arguments.length,1,"parameterCreateWithAnnot","(PDFNet.Annot)",[[b,"Object",a.Annot,"Annot"]]);return a.messageHandler.sendWithPromise("Action.parameterCreateWithAnnot",{action:this.id,annot:b.id},this.userPriority).then(function(b){return k(a.ActionParameter,b)})};a.Action.prototype.parameterCreateWithPage=function(b){d(arguments.length,1,"parameterCreateWithPage","(PDFNet.Page)",[[b,"Object",a.Page,"Page"]]);return a.messageHandler.sendWithPromise("Action.parameterCreateWithPage",
{action:this.id,page:b.id},this.userPriority).then(function(b){return k(a.ActionParameter,b)})};a.ActionParameter.prototype.getAction=function(){return a.messageHandler.sendWithPromise("ActionParameter.getAction",{ap:this.id},this.userPriority).then(function(b){return f(a.Action,b)})};a.ViewChangeCollection.create=function(){return a.messageHandler.sendWithPromise("viewChangeCollectionCreate",{},this.userPriority).then(function(b){return k(a.ViewChangeCollection,b)})};a.RadioButtonGroup.createFromField=
function(b){d(arguments.length,1,"createFromField","(PDFNet.Field)",[[b,"Structure",a.Field,"Field"]]);n("createFromField",[[b,0]]);return a.messageHandler.sendWithPromise("radioButtonGroupCreateFromField",{field:b},this.userPriority).then(function(b){return k(a.RadioButtonGroup,b)})};a.RadioButtonGroup.create=function(b,c){"undefined"===typeof c&&(c="");d(arguments.length,1,"create","(PDFNet.PDFDoc, string)",[[b,"PDFDoc"],[c,"string"]]);return a.messageHandler.sendWithPromise("radioButtonGroupCreate",
{doc:b.id,field_name:c},this.userPriority).then(function(b){return k(a.RadioButtonGroup,b)})};a.RadioButtonGroup.prototype.copy=function(){return a.messageHandler.sendWithPromise("RadioButtonGroup.copy",{group:this.id},this.userPriority).then(function(b){return k(a.RadioButtonGroup,b)})};a.RadioButtonGroup.prototype.add=function(b,c){"undefined"===typeof c&&(c="");d(arguments.length,1,"add","(PDFNet.Rect, string)",[[b,"Structure",a.Rect,"Rect"],[c,"const char* = 0"]]);n("add",[[b,0]]);return a.messageHandler.sendWithPromise("RadioButtonGroup.add",
{group:this.id,pos:b,onstate:c},this.userPriority).then(function(b){return f(a.RadioButtonWidget,b)})};a.RadioButtonGroup.prototype.getNumButtons=function(){return a.messageHandler.sendWithPromise("RadioButtonGroup.getNumButtons",{group:this.id},this.userPriority)};a.RadioButtonGroup.prototype.getButton=function(b){d(arguments.length,1,"getButton","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("RadioButtonGroup.getButton",{group:this.id,index:b},this.userPriority).then(function(b){return f(a.RadioButtonWidget,
b)})};a.RadioButtonGroup.prototype.getField=function(){return a.messageHandler.sendWithPromise("RadioButtonGroup.getField",{group:this.id},this.userPriority).then(function(b){return new a.Field(b)})};a.RadioButtonGroup.prototype.addGroupButtonsToPage=function(b){d(arguments.length,1,"addGroupButtonsToPage","(PDFNet.Page)",[[b,"Object",a.Page,"Page"]]);return a.messageHandler.sendWithPromise("RadioButtonGroup.addGroupButtonsToPage",{group:this.id,page:b.id},this.userPriority)};a.PDFTronCustomSecurityHandler.create=
function(b){d(arguments.length,1,"create","(number)",[[b,"number"]]);return a.messageHandler.sendWithPromise("pdfTronCustomSecurityHandlerCreate",{custom_id:b},this.userPriority).then(function(b){return k(a.SecurityHandler,b)})};a.PDF2WordModule.isModuleAvailable=function(){return a.messageHandler.sendWithPromise("pdF2WordModuleIsModuleAvailable",{},this.userPriority)};a.PDF2HtmlReflowParagraphsModule.isModuleAvailable=function(){return a.messageHandler.sendWithPromise("pdF2HtmlReflowParagraphsModuleIsModuleAvailable",
{},this.userPriority)};a.AdvancedImagingModule.isModuleAvailable=function(){return a.messageHandler.sendWithPromise("advancedImagingModuleIsModuleAvailable",{},this.userPriority)};a.WebFontDownloader.isAvailable=function(){return a.messageHandler.sendWithPromise("webFontDownloaderIsAvailable",{},this.userPriority)};a.WebFontDownloader.enableDownloads=function(){return a.messageHandler.sendWithPromise("webFontDownloaderEnableDownloads",{},this.userPriority)};a.WebFontDownloader.disableDownloads=function(){return a.messageHandler.sendWithPromise("webFontDownloaderDisableDownloads",
{},this.userPriority)};a.WebFontDownloader.preCacheAsync=function(){return a.messageHandler.sendWithPromise("webFontDownloaderPreCacheAsync",{},this.userPriority)};a.WebFontDownloader.clearCache=function(){return a.messageHandler.sendWithPromise("webFontDownloaderClearCache",{},this.userPriority)};a.WebFontDownloader.setCustomWebFontURL=function(b){d(arguments.length,1,"setCustomWebFontURL","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("webFontDownloaderSetCustomWebFontURL",{url:b},
this.userPriority)};var t=function(a,c){c=c||{};var b=new XMLHttpRequest;return new Promise(function(d,e){b.open("GET",a,!0);b.responseType="arraybuffer";c.withCredentials&&(b.withCredentials=c.withCredentials);b.onerror=function(){e(Error("Network error occurred"))};b.onload=function(a){200==this.status?(a=new Uint8Array(b.response),d(a)):e(Error("Download Failed"))};var f=c.customHeaders;if(f)for(var m in f)b.setRequestHeader(m,f[m]);b.send()},function(){b.abort()})},u=function(a){return 0===a?
"1st":1===a?"2nd":2===a?"3rd":a+1+"th"},d=function(b,c,d,f,g){maxNum=g.length;if(c===maxNum){if(b!==c)throw new RangeError(b+" arguments passed into function '"+d+"'. Expected "+c+" argument. Function Signature: "+d+f);}else if(0>=c){if(b>maxNum)throw new RangeError(b+" arguments passed into function '"+d+"'. Expected at most "+maxNum+" arguments. Function Signature: "+d+f);}else if(b<c||b>maxNum)throw new RangeError(b+" arguments passed into function '"+d+"'. Expected "+c+" to "+maxNum+" arguments. Function Signature: "+
d+f);var e=function(a,b,c){throw new TypeError(u(a)+" input argument in function '"+d+"' is of type '"+b+"'. Expected type '"+c+"'. Function Signature: "+d+f);};b=function(a,b,c){"object"===typeof a&&a.name?e(b,a.name,c):e(b,typeof a,c)};for(c=0;c<maxNum;c++){var m=g[c],k=m[0],l=m[1];if(k instanceof Promise)throw new TypeError(u(c)+" input argument in function '"+d+"' is a Promise object. Promises require a 'yield' statement before being accessed.");if("OptionBase"===l){if(k)if("object"===typeof k){if("function"!==
typeof k.getJsonString)throw new TypeError(u(c)+" input argument in function '"+d+"' is an 'oject' which is expected to have the 'getJsonString' function");}else e(c,k.name,"object")}else"Array"===l?k.constructor!==Array&&b(k,c,"Array"):"ArrayBuffer"===l?h.isArrayBuffer(k)||h.isArrayBuffer(k.buffer)||b(k,c,"ArrayBuffer|TypedArray"):"ArrayAsBuffer"===l?k.constructor===Array||h.isArrayBuffer(k)||h.isArrayBuffer(k.buffer)||b(k,c,"ArrayBuffer|TypedArray"):"PDFDoc"===l||"SDFDoc"===l||"FDFDoc"===l?k instanceof
a.PDFDoc||k instanceof a.SDFDoc||k instanceof a.FDFDoc||b(k,c,"PDFDoc|SDFDoc|FDFDoc"):"Structure"===l?k instanceof m[2]||!k||k.name===m[3]||b(k,c,m[3]):"OptionObject"===l?k instanceof m[2]||("object"===typeof k&&k.name?k.name!==m[4]&&e(c,k.name,m[3]):e(c,typeof k,m[3])):"Object"===l?k instanceof m[2]||b(k,c,m[3]):"const char* = 0"===l?"string"!==typeof k&&null!==k&&e(c,typeof k,"string"):typeof k!==l&&e(c,typeof k,l)}},l=function(a,c){if("undefined"!==typeof c)throw Error("Function "+c+" recently altered a struct object without yielding. That object is now being accessed by function '"+
a+"'. Perhaps a yield statement is required for "+c+"?");},n=function(a,c){for(var b=0;b<c.length;b++){var d=c[b],f=d[0];if(f&&"undefined"!==typeof f.yieldFunction)throw Error("Function '"+f.yieldFunction+"' recently altered a struct object without yielding. That object is now being accessed by the "+u(d[1])+" input argument in function '"+a+"'. Perhaps a yield statement is required for '"+f.yieldFunction+"'?");}},v=function(a,c){var b=a;c&&a.constructor===Array&&(b=new Float64Array(a));h.isArrayBuffer(b)||
(b=b.buffer,a.byteLength<b.byteLength&&(b=b.slice(a.byteOffset,a.byteOffset+a.byteLength)));return b};createdObjects=[];lockedObjects=[];stackCallCounter=beginOperationCounter=0;deallocStackCounter=[];unlockStackCounter=[];var y,B=!1;h.PDFTron&&PDFTron.WebViewer&&PDFTron.WebViewer.prototype&&PDFTron.WebViewer.prototype.version&&!PDFTron.skipPDFNetWebViewerWarning&&console.warn("PDFNet.js and WebViewer.js have been included in the same context. See pdftron.com/kb_same_context for an explanation of why this could be an error in your application.");
var k=function(a,c,d){if("0"===c)return null;a=new a(c,d);createdObjects.push({name:a.name,id:a.id});return a},f=function(a,c,d){return"0"===c?null:new a(c,d)},A=function(a){for(var b=-1,d=lockedObjects.length-1;0<=d;d--)if(lockedObjects[d].id==a.id){b=d;break}if(-1!=b)for(lockedObjects.splice(b,1),d=unlockStackCounter.length-1;0<=d;d--)if(b<unlockStackCounter[d])--unlockStackCounter[d];else break;else console.log("[WARNING], the object to be unlocked was not found in the unlock list. Unlocking may cause errors.")},
r=function(a){for(var b=-1,d=createdObjects.length-1;0<=d;d--)if(createdObjects[d].id==a){b=d;break}if(-1!=b)for(createdObjects.splice(b,1),d=deallocStackCounter.length-1;0<=d;d--)if(b<deallocStackCounter[d])--deallocStackCounter[d];else break;else console.log("[WARNING], the object was not found in the deallocation list. Deallocating may cause errors.")};a.messageHandler={sendWithPromise:function(){throw Error("PDFNet.initialize must be called and finish resolving before any other PDFNetJS function calls.");
}};a.initialize=function(b,c){if(!y){var d={emsWorkerError:function(a,b){console.log("EmsWorkerError: "+a+", "+b)}};y=createPromiseCapability();var f=function(c){h.CoreControls.preloadPDFWorker(c,d);h.CoreControls.initPDFWorkerTransports(c,d,b).then(function(b){a.messageHandler=b;y.resolve()},function(a){y.reject(a)})};c&&"auto"!==c?f(c):h.CoreControls.getDefaultBackendType().then(f,function(a){y.reject(a)})}B&&(a.messageHandler.messageHandler.comObj.addEventListener("message",a.messageHandler.messageHandler.handleMessage.bind(a.messageHandler.messageHandler)),
B=!1);return y.promise};a.userPriority=2;var p=function(a,c){for(var b in a)c[b]=a[b]};a.runGeneratorWithoutCleanup=function(b,c){return a.runWithoutCleanup(function(){return q(b)},c)};a.runGeneratorWithCleanup=function(b,c){return a.runWithCleanup(function(){return q(b)},c)};var w=Promise.resolve();a.displayAllocatedObjects=function(){console.log("List of created but not yet deallocated objects:");if(0==createdObjects.length)console.log("~~None~~ (nothing to deallocate)");else for(var a=0;a<createdObjects.length;a++)console.log(createdObjects[a]);
return createdObjects.length};a.getAllocatedObjectsCount=function(){return createdObjects.length};a.startDeallocateStack=function(){stackCallCounter+=1;deallocStackCounter.push(createdObjects.length);unlockStackCounter.push(lockedObjects.length);return Promise.resolve()};a.endDeallocateStack=function(){if(0===stackCallCounter)return console.log("Warning, no startDeallocateStack() instances remain."),Promise.resolve();var b=deallocStackCounter.pop(),c=unlockStackCounter.pop(),d=[],f=[];var g=0;if("undefined"!==
typeof c&&0!==lockedObjects.length&&lockedObjects.length!==c)for(;lockedObjects.length>c;){var h=lockedObjects.pop();h=a.messageHandler.sendWithPromise(h.name+"."+h.unlocktype,{doc:h.id},this.userPriority);h=h.catch(function(a){console.log(a)});d.push(h);g++}c=0;if("undefined"!==typeof b&&0!==createdObjects.length&&createdObjects.length!==b)for(;createdObjects.length>b;)g=createdObjects.pop(),g=a.messageHandler.sendWithPromise(g.name+".destroy",{auto_dealloc_obj:g.id},this.userPriority),g=g.catch(function(a){console.log(a)}),
f.push(g),c++;--stackCallCounter;return Promise.all(d).then(function(){return Promise.all(f)})};a.getStackCount=function(){return Promise.resolve(stackCallCounter)};a.deallocateAllObjects=function(){if(0==createdObjects.length){console.log("~~None~~ (nothing to deallocate)");var b=createPromiseCapability();b.resolve();return b.promise}b=[];for(deallocStackCounter=[];lockedObjects.length;)objToUnlock=lockedObjects.pop(),unlockPromise=a.messageHandler.sendWithPromise(objToUnlock.name+"."+objToUnlock.unlocktype,
{doc:objToUnlock.id},this.userPriority),unlockPromise=unlockPromise.catch(function(a){console.log(a)}),b.push(unlockPromise);for(;createdObjects.length;){var c=createdObjects.pop();c=a.messageHandler.sendWithPromise(c.name+".destroy",{auto_dealloc_obj:c.id},this.userPriority);c=c.catch(function(a){console.log(a)});b.push(c)}return Promise.all(b)};a.Redactor.redact=function(b,c,d,f,g){"undefined"===typeof d&&(d={});"undefined"===typeof d.redaction_overlay&&(d.redaction_overlay=!0);"undefined"===typeof d.positive_overlay_color?
d.positive_overlay_color=void 0:"undefined"!==typeof d.positive_overlay_color.id&&(d.positive_overlay_color=d.positive_overlay_color.id);"undefined"===typeof d.negative_overlay_color?d.negative_overlay_color=void 0:"undefined"!==typeof d.negative_overlay_color.id&&(d.negative_overlay_color=d.negative_overlay_color.id);"undefined"===typeof d.border&&(d.border=!0);"undefined"===typeof d.use_overlay_text&&(d.use_overlay_text=!0);"undefined"===typeof d.font?d.font=void 0:"undefined"!==typeof d.font.id&&
(d.font=d.font.id);"undefined"===typeof d.min_font_size&&(d.min_font_size=2);"undefined"===typeof d.max_font_size&&(d.max_font_size=24);"undefined"===typeof d.text_color?d.text_color=void 0:"undefined"!==typeof d.text_color.id&&(d.text_color=d.text_color.id);"undefined"===typeof d.horiz_text_alignment&&(d.horiz_text_alignment=-1);"undefined"===typeof d.vert_text_alignment&&(d.vert_text_alignment=1);"undefined"===typeof d.show_redacted_content_regions&&(d.show_redacted_content_regions=!1);"undefined"===
typeof d.redacted_content_color?d.redacted_content_color=void 0:"undefined"!==typeof d.redacted_content_color.id&&(d.redacted_content_color=d.redacted_content_color.id);"undefined"===typeof f&&(f=!0);"undefined"===typeof g&&(g=!0);if(2>arguments.length||5<arguments.length)throw new RangeError(arguments.length+" arguments passed into function 'redact'. Expected 2 to 5 arguments. Function Signature: redact(PDFDoc, Array of Redaction Objects, Object, boolean=true, boolean=true)");if(b instanceof Promise)throw new TypeError("Received a Promise object in 1st input argument of function 'redact'. Promises require a 'yield' statement before being accessed.");
if(!(b instanceof a.PDFDoc||b instanceof a.SDFDoc||b instanceof a.FDFDoc)){if("object"==typeof b)throw new TypeError("1st input argument in function 'redact' is of type '"+b.name+"'. Expected type 'PDFDoc'. Function Signature: redact(PDFDoc, Array of Redaction Objects, Object, boolean=true, boolean=true).");throw new TypeError("1st input argument '"+b+"' in function 'redact' is of type '"+typeof b+"'. Expected type 'PDFDoc'. Function Signature: redact(PDFDoc, Array of Redaction Objects, Object, boolean=true, boolean=true).");
}if(c instanceof Promise)throw new TypeError("Received a Promise object in 2nd input argument in function 'redact'. Promises require a 'yield' statement before being accessed.");if(!(c instanceof Array)){if("object"==typeof c)throw new TypeError("2nd input argument in function 'redact' is of type '"+c.name+"'. Expected an array of 'Redaction' objects. Function Signature: redact(PDFDoc, Array of Redaction Objects, Object, boolean, boolean).");throw new TypeError("2nd input argument '"+c+"' in function 'redact' is of type '"+
typeof c+"'. Expected type 'Redaction'. Function Signature: redact(PDFDoc, Array of Redaction Objects, Object, boolean, boolean).");}if(d instanceof Promise)throw new TypeError("Received a Promise object in 3rd input argument in function 'redact'. Promises require a 'yield' statement before being accessed.");if("object"!==typeof d)throw new TypeError("3nd input argument in function 'redact' is of type '"+d.name+"'. Expected a javascript object. Function Signature: redact(PDFDoc, Array of Redaction Objects, Object, boolean, boolean).");
if(f instanceof Promise)throw new TypeError("Received a Promise object in 4th input argument in function 'redact'. Promises require a 'yield' statement before being accessed.");if("boolean"!=typeof f)throw new TypeError("4th input argument '"+f+"' in function 'redact' is of type '"+typeof f+"'. Expected type 'boolean'. Function Signature: redact(PDFDoc, Array of Redaction Objects, Object, boolean=true, boolean=true).");if(g instanceof Promise)throw new TypeError("Received a Promise object in 5th input argument in function 'redact'. Promises require a 'yield' statement before being accessed.");
if("boolean"!=typeof g)throw new TypeError("5th input argument '"+g+"' in function 'redact' is of type '"+typeof g+"'. Expected type 'boolean'. Function Signature: redact(PDFDoc, Array of Redaction Objects, Object, boolean=true, boolean=true).");return a.messageHandler.sendWithPromise("redactorRedact",{doc:b.id,red_arr:c,appearance:d,ext_neg_mode:f,page_coord_sys:g},this.userPriority)};a.Highlights.prototype.getCurrentQuads=function(){return a.messageHandler.sendWithPromise("Highlights.getCurrentQuads",
{hlts:this.id},this.userPriority).then(function(b){b=new Float64Array(b);for(var c=[],d,f=0;f<b.length;f+=8)d=a.QuadPoint(b[f+0],b[f+1],b[f+2],b[f+3],b[f+4],b[f+5],b[f+6],b[f+7]),c.push(d);return c})};a.TextSearch.prototype.run=function(){if(0!=arguments.length)throw new RangeError(arguments.length+" arguments passed into function 'run'. Expected 0 arguments. Function Signature: run()");return a.messageHandler.sendWithPromise("TextSearch.run",{ts:this.id},this.userPriority).then(function(b){b.highlights=
new a.Highlights(b.highlights);if("0"==b.highlights.id)return b;createdObjects.push({name:b.highlights.name,id:b.highlights.id});return b})};a.Iterator.prototype.current=function(){if(0!=arguments.length)throw new RangeError(arguments.length+" arguments passed into function 'fillEncryptDict'. Expected 0 argument.");var b=this;this.yieldFunction="Iterator.current";var c=a.messageHandler.sendWithPromise("Iterator.current",{itr:this.id,type:this.type},this.userPriority);b.yieldFunction=void 0;"Int"!=
this.type&&(c=c.then(function(c){return new a[b.type](c)}));return c};a.PDFDoc.prototype.getFileData=function(a){a({type:"id",id:this.id})};a.PDFDoc.prototype.getFile=function(a){return null};a.PDFDoc.createFromURL=function(b,c){if(1>arguments.length||2<arguments.length)throw new RangeError(arguments.length+" arguments passed into function 'createFromURL'. Expected 1 to 2 arguments. Function Signature: createFromURL(string, Obj)");if(b instanceof Promise)throw new TypeError("Received a Promise object in 1st input argument 'createFromURL'. Promises require a 'yield' statement before being accessed.");
if("string"!=typeof b)throw new TypeError("1st input argument '"+b+"' in function 'createFromURL' is of type '"+typeof b+"'. Expected type 'string'. Function Signature: createFromURL(string).");return t(b,c).then(function(b){return a.PDFDoc.createFromBuffer(b)})};a.PDFDraw.prototype.exportBuffer=function(b,c,d){"undefined"==typeof c&&(c="PNG");"undefined"==typeof d&&(d=new a.Obj("0"));if(1>arguments.length||3<arguments.length)throw new RangeError(arguments.length+" arguments passed into function 'exportBuffer'. Expected 1 to 3 arguments. Function Signature: exportBuffer(Page, string, Obj)");
if(b instanceof Promise)throw new TypeError("Received a Promise object in 1st input argument 'exportBuffer'. Promises require a 'yield' statement before being accessed.");if(!(b instanceof a.Page)){if("object"==typeof b)throw new TypeError("1st input argument in function 'exportBuffer' is of type '"+b.name+"'. Expected type 'Page'. Function Signature: exportBuffer(Page, string, Obj).");throw new TypeError("1st input argument '"+b+"' in function 'exportBuffer' is of type '"+typeof b+"'. Expected type 'Page'. Function Signature: exportBuffer(Page, string, Obj).");
}if(c instanceof Promise)throw new TypeError("Received a Promise object in 1st input argument 'exportBuffer'. Promises require a 'yield' statement before being accessed.");if("string"!=typeof c)throw new TypeError("2nd input argument '"+c+"' in function 'exportBuffer' is of type '"+typeof c+"'. Expected type 'string'. Function Signature: exportBuffer(Page, string, Obj).");if(d instanceof Promise)throw new TypeError("Received a Promise object in 1st input argument 'exportBuffer'. Promises require a 'yield' statement before being accessed.");
if(!(d instanceof a.Obj)){if("object"==typeof d)throw new TypeError("3rd input argument in function 'exportBuffer' is of type '"+d.name+"'. Expected type 'Obj'. Function Signature: exportBuffer(Page, string, Obj).");throw new TypeError("3rd input argument '"+d+"' in function 'exportBuffer' is of type '"+typeof d+"'. Expected type 'Obj'. Function Signature: exportBuffer(Page, string, Obj).");}return a.messageHandler.sendWithPromise("PDFDraw.exportBuffer",{d:this.id,page:b.id,format:c,encoder_params:d.id},
this.userPriority).then(function(a){return"0"==a?null:new Uint8Array(a)})};a.PDFDraw.prototype.exportStream=a.PDFDraw.prototype.exportBuffer;a.Element.prototype.getTextData=function(){if(0!=arguments.length)throw new RangeError(arguments.length+" arguments passed into function 'getTextData'. Expected 0 arguments. Function Signature: getTextData()");return a.messageHandler.sendWithPromise("Element.getTextData",{e:this.id},this.userPriority)};a.Element.prototype.getPathData=function(){if(0!=arguments.length)throw new RangeError(arguments.length+
" arguments passed into function 'getPathData'. Expected 0 arguments. Function Signature: getPathData()");return a.messageHandler.sendWithPromise("Element.getPathData",{e:this.id},this.userPriority).then(function(a){a.operators=new Uint8Array(a.operators);a.points=new Float64Array(a.points);return a})};a.PDFDoc.prototype.convertToXod=function(b){"undefined"===typeof b&&(b={});return a.messageHandler.sendWithPromise("PDFDoc.convertToXod",{doc:this.id,optionsObject:b},this.userPriority).then(function(a){return"0"==
a?null:new Uint8Array(a)})};a.PDFDoc.prototype.convertToXodStream=function(b){"undefined"===typeof b&&(b={});return a.messageHandler.sendWithPromise("PDFDoc.convertToXodStream",{doc:this.id,optionsObject:b},this.userPriority).then(function(b){return"0"==b?null:new a.Filter(b)})};a.FilterReader.prototype.read=function(b){if(1!=arguments.length)throw new RangeError(arguments.length+" arguments passed into function 'read'. Expected 1 argument. Function Signature: read(number).");if(b instanceof Promise)throw new TypeError("Received a Promise object in 1st input argument 'read'. Promises require a 'yield' statement before being accessed.");
if("number"!=typeof b)throw new TypeError("1st input argument '"+b+"' in function 'read' is of type '"+typeof b+"'. Expected type 'number'. Function Signature: read(number).");return a.messageHandler.sendWithPromise("FilterReader.read",{reader:this.id,buf_size:b},this.userPriority).then(function(a){return"0"==a?null:new Uint8Array(a)})};a.FilterReader.prototype.readAllIntoBuffer=function(){if(0!=arguments.length)throw new RangeError(arguments.length+" arguments passed into function 'readAllIntoBuffer'. Expected 0 arguments. Function Signature: readAllIntoBuffer()");
return a.messageHandler.sendWithPromise("FilterReader.readAllIntoBuffer",{reader:this.id},this.userPriority).then(function(a){return"0"==a?null:new Uint8Array(a)})};a.bitmapInfo=function(a){p(a,this)};a.PDFDraw.prototype.getBitmap=function(b,c,d){if(3!=arguments.length)throw new RangeError(arguments.length+" arguments passed into function 'getBitmap'. Expected 3 arguments. Function Signature: getBitmap(Page, PixelFormat, boolean).");if(b instanceof Promise)throw new TypeError("Received a Promise object in 1st input argument 'getBitmap'. Promises require a 'yield' statement before being accessed.");
if(!(b instanceof a.Page)){if("object"==typeof b)throw new TypeError("1st input argument in function 'getBitmap' is of type '"+b.name+"'. Expected type 'Page'. Function Signature: getBitmap(Page, PixelFormat, boolean).");throw new TypeError("1st input argument '"+b+"' in function 'getBitmap' is of type '"+typeof b+"'. Expected type 'Page'. Function Signature: getBitmap(Page, PixelFormat, boolean).");}if(c instanceof Promise)throw new TypeError("Received a Promise object in 1st input argument 'getBitmap'. Promises require a 'yield' statement before being accessed.");
if("number"!=typeof c)throw new TypeError("2nd input argument '"+c+"' in function 'getBitmap' is of type '"+typeof c+"'. Expected type 'number'. Function Signature: getBitmap(Page, PixelFormat, boolean).");if(d instanceof Promise)throw new TypeError("Received a Promise object in 1st input argument 'getBitmap'. Promises require a 'yield' statement before being accessed.");if("boolean"!=typeof d)throw new TypeError("3rd input argument '"+d+"' in function 'getBitmap' is of type '"+typeof d+"'. Expected type 'boolean'. Function Signature: getBitmap(Page, PixelFormat, boolean).");
return a.messageHandler.sendWithPromise("PDFDraw.getBitmap",{d:this.id,page:b.id,pix_fmt:c,demult:d},this.userPriority).then(function(b){return"0"==b?null:new a.bitmapInfo(b)})};a.Matrix2D.create=function(b,c,d,f,g,h){void 0==b&&(b=0);void 0==c&&(c=0);void 0==d&&(d=0);void 0==f&&(f=0);void 0==g&&(g=0);void 0==h&&(h=0);if(6<arguments.length)throw new RangeError(arguments.length+" arguments passed into function 'Matrix2D.create'. Expected 6 or fewer arguments. Function Signature: create(number, number, number, number, number, number).");
if(b instanceof Promise)throw new TypeError("Received a Promise object in 1st input argument 'Matrix2D.create'. Promises require a 'yield' statement before being accessed.");if("number"!=typeof b)throw new TypeError("1st input argument '"+b+"' in function 'Matrix2D.create' is of type '"+typeof b+"'. Expected type 'number'. Function Signature: create(number, number, number, number, number, number).");if(c instanceof Promise)throw new TypeError("Received a Promise object in 2nd input argument 'Matrix2D.create'. Promises require a 'yield' statement before being accessed.");
if("number"!=typeof c)throw new TypeError("2nd input argument '"+c+"' in function 'Matrix2D.create' is of type '"+typeof c+"'. Expected type 'number'. Function Signature: create(number, number, number, number, number, number).");if(d instanceof Promise)throw new TypeError("Received a Promise object in 3rd input argument 'Matrix2D.create'. Promises require a 'yield' statement before being accessed.");if("number"!=typeof d)throw new TypeError("3rd input argument '"+d+"' in function 'Matrix2D.create' is of type '"+
typeof d+"'. Expected type 'number'. Function Signature: create(number, number, number, number, number, number).");if(f instanceof Promise)throw new TypeError("Received a Promise object in 4th input argument 'Matrix2D.create'. Promises require a 'yield' statement before being accessed.");if("number"!=typeof f)throw new TypeError("4th input argument '"+f+"' in function 'Matrix2D.create' is of type '"+typeof f+"'. Expected type 'number'. Function Signature: create(number, number, number, number, number, number).");
if(g instanceof Promise)throw new TypeError("Received a Promise object in 5th input argument 'Matrix2D.create'. Promises require a 'yield' statement before being accessed.");if("number"!=typeof g)throw new TypeError("5th input argument '"+g+"' in function 'Matrix2D.create' is of type '"+typeof g+"'. Expected type 'number'. Function Signature: create(number, number, number, number, number, number).");if(h instanceof Promise)throw new TypeError("Received a Promise object in 6th input argument 'Matrix2D.create'. Promises require a 'yield' statement before being accessed.");
if("number"!=typeof h)throw new TypeError("6th input argument '"+h+"' in function 'Matrix2D.create' is of type '"+typeof h+"'. Expected type 'number'. Function Signature: create(number, number, number, number, number, number).");var e=createPromiseCapability(),m=new a.Matrix2D({m_a:b,m_b:c,m_c:d,m_d:f,m_h:g,m_v:h});e.resolve(m);return e.promise};a.PDFDoc.prototype.getPDFDoc=function(){return a.messageHandler.sendWithPromise("GetPDFDoc",{doc:this.id},this.userPriority).then(function(b){return"0"==
b?null:new a.PDFDoc(b)})};a.TextExtractorLine.prototype.getBBox=function(){if(0!=arguments.length)throw new RangeError(arguments.length+" arguments passed into function 'getBBox'. Expected 0 arguments. Function Signature: getBBox()");if("undefined"!==typeof this.yieldFunction)throw Error("Function "+this.yieldFunction+" recently altered a struct object without yielding. That object is now being accessed by function 'getBBox'. Perhaps a yield statement is required for "+this.yieldFunction+"?");var b=
this;this.yieldFunction="TextExtractorLine.getBBox";return a.messageHandler.sendWithPromise("TextExtractorLine.getBBox",{line:this},this.userPriority).then(function(c){b.yieldFunction=void 0;return new a.Rect(c.result.x1,c.result.y1,c.result.x2,c.result.y2,c.result.mp_rect)})};a.TextExtractorLine.prototype.getQuad=function(){if(0!=arguments.length)throw new RangeError(arguments.length+" arguments passed into function 'getQuad'. Expected 0 arguments. Function Signature: getQuad()");if("undefined"!==
typeof this.yieldFunction)throw Error("Function "+this.yieldFunction+" recently altered a struct object without yielding. That object is now being accessed by function 'getQuad'. Perhaps a yield statement is required for "+this.yieldFunction+"?");var b=this;this.yieldFunction="TextExtractorLine.getQuad";return a.messageHandler.sendWithPromise("TextExtractorLine.getQuad",{line:this},this.userPriority).then(function(c){b.yieldFunction=void 0;return new a.QuadPoint(c.result.p1x,c.result.p1y,c.result.p2x,
c.result.p2y,c.result.p3x,c.result.p3y,c.result.p4x,c.result.p4y)})};a.TextExtractorWord.prototype.getBBox=function(){if(0!=arguments.length)throw new RangeError(arguments.length+" arguments passed into function 'getBBox'. Expected 0 arguments. Function Signature: getBBox()");if("undefined"!==typeof this.yieldFunction)throw Error("Function "+this.yieldFunction+" recently altered a struct object without yielding. That object is now being accessed by function 'getBBox'. Perhaps a yield statement is required for "+
this.yieldFunction+"?");var b=this;this.yieldFunction="TextExtractorWord.getBBox";return a.messageHandler.sendWithPromise("TextExtractorWord.getBBox",{tew:this},this.userPriority).then(function(c){b.yieldFunction=void 0;return new a.Rect(c.result.x1,c.result.y1,c.result.x2,c.result.y2,c.result.mp_rect)})};a.TextExtractorWord.prototype.getQuad=function(){if(0!=arguments.length)throw new RangeError(arguments.length+" arguments passed into function 'getQuad'. Expected 0 arguments. Function Signature: getQuad()");
if("undefined"!==typeof this.yieldFunction)throw Error("Function "+this.yieldFunction+" recently altered a struct object without yielding. That object is now being accessed by function 'getQuad'. Perhaps a yield statement is required for "+this.yieldFunction+"?");var b=this;this.yieldFunction="TextExtractorWord.getQuad";return a.messageHandler.sendWithPromise("TextExtractorWord.getQuad",{tew:this},this.userPriority).then(function(c){b.yieldFunction=void 0;return new a.QuadPoint(c.result.p1x,c.result.p1y,
c.result.p2x,c.result.p2y,c.result.p3x,c.result.p3y,c.result.p4x,c.result.p4y)})};a.TextExtractorWord.prototype.getGlyphQuad=function(b){if(1!=arguments.length)throw new RangeError(arguments.length+" arguments passed into function 'getGlyphQuad'. Expected 1 argument. Function Signature: getGlyphQuad(number)");if(b instanceof Promise)throw new TypeError("Received a Promise object in 1st input argument 'getGlyphQuad'. Promises require a 'yield' statement before being accessed.");if("number"!=typeof b)throw new TypeError("1st input argument '"+
b+"' in function 'getGlyphQuad' is of type '"+typeof b+"'. Expected type 'number'. Function Signature: getGlyphQuad(number).");if("undefined"!==typeof this.yieldFunction)throw Error("Function "+this.yieldFunction+" recently altered a struct object without yielding. That object is now being accessed by function 'getGlyphQuad'. Perhaps a yield statement is required for "+this.yieldFunction+"?");var c=this;this.yieldFunction="TextExtractorWord.getGlyphQuad";return a.messageHandler.sendWithPromise("TextExtractorWord.getGlyphQuad",
{tew:this,glyph_idx:b},this.userPriority).then(function(b){c.yieldFunction=void 0;return new a.QuadPoint(b.result.p1x,b.result.p1y,b.result.p2x,b.result.p2y,b.result.p3x,b.result.p3y,b.result.p4x,b.result.p4y)})};a.TextExtractorStyle.prototype.getColor=function(){if(0!=arguments.length)throw new RangeError(arguments.length+" arguments passed into function 'getColor'. Expected 0 arguments. Function Signature: getColor()");if("undefined"!==typeof this.yieldFunction)throw Error("Function "+this.yieldFunction+
" recently altered a struct object without yielding. That object is now being accessed by function 'getColor'. Perhaps a yield statement is required for "+this.yieldFunction+"?");var b=this;this.yieldFunction="TextExtractorStyle.getColor";return a.messageHandler.sendWithPromise("TextExtractorStyle.getColor",{tes:this},this.userPriority).then(function(c){b.yieldFunction=void 0;return"0"==c?null:new a.ColorPt(c)})};a.TextExtractorWord.prototype.getString=function(){if(0!=arguments.length)throw new RangeError(arguments.length+
" arguments passed into function 'getString'. Expected 0 arguments. Function Signature: getString()");if("undefined"!==typeof this.yieldFunction)throw Error("Function "+this.yieldFunction+" recently altered a struct object without yielding. That object is now being accessed by function 'getString'. Perhaps a yield statement is required for "+this.yieldFunction+"?");var b=this;this.yieldFunction="TextExtractorWord.getString";return a.messageHandler.sendWithPromise("TextExtractorWord.getString",{tew:this},
this.userPriority).then(function(a){b.yieldFunction=void 0;return a})};a.SecurityHandler.prototype.changeUserPasswordNonAscii=function(b){if(1!=arguments.length)throw new RangeError(arguments.length+" arguments passed into function 'changeUserPasswordNonAscii'. Expected 1 argument. Function Signature: changeUserPasswordNonAscii(string)");if(b instanceof Promise)throw new TypeError("Received a Promise object in 1st input argument 'changeUserPasswordNonAscii'. Promises require a 'yield' statement before being accessed.");
if("string"!=typeof b)throw new TypeError("1st input argument '"+b+"' in function 'changeUserPasswordNonAscii' is of type '"+typeof b+"'. Expected type 'string'. Function Signature: changeUserPasswordNonAscii(string).");return a.messageHandler.sendWithPromise("SecurityHandler.changeUserPasswordNonAscii",{sh:this.id,password:b,pwd_length:b.length},this.userPriority)};a.SecurityHandler.prototype.changeMasterPasswordNonAscii=function(b){if(1!=arguments.length)throw new RangeError(arguments.length+" arguments passed into function 'changeMasterPasswordNonAscii'. Expected 1 argument. Function Signature: changeMasterPasswordNonAscii(string)");
if(b instanceof Promise)throw new TypeError("Received a Promise object in 1st input argument 'changeMasterPasswordNonAscii'. Promises require a 'yield' statement before being accessed.");if("string"!=typeof b)throw new TypeError("1st input argument '"+b+"' in function 'changeMasterPasswordNonAscii' is of type '"+typeof b+"'. Expected type 'string'. Function Signature: changeMasterPasswordNonAscii(string).");return a.messageHandler.sendWithPromise("SecurityHandler.changeMasterPasswordNonAscii",{sh:this.id,
password:b,pwd_length:b.length},this.userPriority)};a.SecurityHandler.prototype.initPassword=function(b){if(1!=arguments.length)throw new RangeError(arguments.length+" arguments passed into function 'initPassword'. Expected 1 argument. Function Signature: initPassword(string)");if(b instanceof Promise)throw new TypeError("Received a Promise object in 1st input argument 'initPassword'. Promises require a 'yield' statement before being accessed.");if("string"!=typeof b)throw new TypeError("1st input argument '"+
b+"' in function 'initPassword' is of type '"+typeof b+"'. Expected type 'string'. Function Signature: initPassword(string).");return a.messageHandler.sendWithPromise("SecurityHandler.initPassword",{sh:this.id,password:b},this.userPriority)};a.SecurityHandler.prototype.initPasswordNonAscii=function(b){if(1!=arguments.length)throw new RangeError(arguments.length+" arguments passed into function 'initPasswordNonAscii'. Expected 1 argument. Function Signature: initPasswordNonAscii(string)");if(b instanceof
Promise)throw new TypeError("Received a Promise object in 1st input argument 'initPasswordNonAscii'. Promises require a 'yield' statement before being accessed.");if("string"!=typeof b)throw new TypeError("1st input argument '"+b+"' in function 'initPasswordNonAscii' is of type '"+typeof b+"'. Expected type 'string'. Function Signature: initPasswordNonAscii(string).");return a.messageHandler.sendWithPromise("SecurityHandler.initPasswordNonAscii",{sh:this.id,password:b,pwd_length:b.length},this.userPriority)};
a.Element.prototype.getBBox=function(){if(0!=arguments.length)throw new RangeError(arguments.length+" arguments passed into function 'getBBox'. Expected 0 arguments. Function Signature: getBBox()");var b=this;this.yieldFunction="Element.getBBox";return a.messageHandler.sendWithPromise("Element.getBBox",{e:this.id},this.userPriority).then(function(c){b.yieldFunction=void 0;return new a.Rect(c)})};a.Matrix2D.prototype.mult=function(b,c){if(2!=arguments.length)throw new RangeError(arguments.length+" arguments passed into function 'mult'. Expected 2 arguments. Function Signature: mult(number, number)");
if(b instanceof Promise)throw new TypeError("1st input argument in function 'mult' is a Promise object. Promises require a 'yield' statement before being accessed.");if("number"!=typeof b)throw new TypeError("1st input argument '"+b+"' in function 'mult' is of type '"+typeof b+"'. Expected type 'number'. Function Signature: mult(number, number).");if(c instanceof Promise)throw new TypeError("2nd input argument in function 'mult' is a Promise object. Promises require a 'yield' statement before being accessed.");
if("number"!=typeof c)throw new TypeError("2nd input argument '"+c+"' in function 'mult' is of type '"+typeof c+"'. Expected type 'number'. Function Signature: mult(number, number).");if("undefined"!==typeof this.yieldFunction)throw Error("Function "+this.yieldFunction+" recently altered a struct object without yielding. That object is now being accessed by function 'mult'. Perhaps a yield statement is required for "+this.yieldFunction+"?");return a.messageHandler.sendWithPromise("Matrix2D.mult",
{matrix:this,x:b,y:c},this.userPriority)};a.Obj.prototype.getAsPDFText=function(){if(0!=arguments.length)throw new RangeError(arguments.length+" arguments passed into function 'getAsPDFText'. Expected 0 arguments. Function Signature: getAsPDFText()");return a.messageHandler.sendWithPromise("Obj.getAsPDFText",{o:this.id},this.userPriority)};a.PDFDoc.prototype.initSecurityHandler=function(b){"undefined"===typeof b&&(b=0);if(1<arguments.length)throw new RangeError(arguments.length+" arguments passed into function 'initSecurityHandler'. Expected at most 1 arguments. Function Signature: initSecurityHandler(void*)");
return a.messageHandler.sendWithPromise("PDFDoc.initSecurityHandler",{doc:this.id,custom_data:b},this.userPriority)};a.SDFDoc.prototype.initSecurityHandler=function(b){"undefined"===typeof b&&(b=0);if(1<arguments.length)throw new RangeError(arguments.length+" arguments passed into function 'initSecurityHandler'. Expected at most 1 arguments. Function Signature: initSecurityHandler(void*)");return a.messageHandler.sendWithPromise("SDFDoc.initSecurityHandler",{doc:this.id,custom_data:b},this.userPriority)};
a.Image.createFromURL=function(b,c,d,f){"undefined"===typeof d&&(d=new a.Obj("0"));if(2>arguments.length||4<arguments.length)throw new RangeError(arguments.length+" arguments passed into function 'createFromURL'. Expected 2 to 4 arguments. Function Signature: createFromURL(PDFDoc, string, Obj)");if(b instanceof Promise)throw new TypeError("Received a Promise object in 1st input argument 'createFromURL'. Promises require a 'yield' statement before being accessed.");if(!(b instanceof a.PDFDoc||b instanceof
a.SDFDoc||b instanceof a.FDFDoc)){if("object"==typeof b)throw new TypeError("1st input argument in function 'createFromURL' is of type '"+b.name+"'. Expected type 'Page'. Function Signature: createFromURL(PDFDoc, string, Obj).");throw new TypeError("1st input argument '"+b+"' in function 'createFromURL' is of type '"+typeof b+"'. Expected type 'Page'. Function Signature: createFromURL(PDFDoc, string, Obj).");}if(c instanceof Promise)throw new TypeError("Received a Promise object in 1st input argument 'createFromURL'. Promises require a 'yield' statement before being accessed.");
if("string"!=typeof c)throw new TypeError("2nd input argument '"+c+"' in function 'createFromURL' is of type '"+typeof c+"'. Expected type 'string'. Function Signature: createFromURL(PDFDoc, string, Obj).");if(d instanceof Promise)throw new TypeError("Received a Promise object in 1st input argument 'createFromURL'. Promises require a 'yield' statement before being accessed.");if(!(d instanceof a.Obj)){if("object"==typeof d)throw new TypeError("3rd input argument in function 'createFromURL' is of type '"+
d.name+"'. Expected type 'Obj'. Function Signature: createFromURL(PDFDoc, string, Obj).");throw new TypeError("3rd input argument '"+d+"' in function 'createFromURL' is of type '"+typeof d+"'. Expected type 'Obj'. Function Signature: createFromURL(PDFDoc, string, Obj).");}return t(c,f).then(function(c){return a.Image.createFromMemory2(b,c,d)})};a.PDFDoc.prototype.addStdSignatureHandlerFromURL=function(a,c){if(2!=arguments.length)throw new RangeError(arguments.length+" arguments passed into function 'addStdSignatureHandlerFromURL'. Expected 2 arguments. Function Signature: addStdSignatureHandlerFromURL(string, string)");
if(a instanceof Promise)throw new TypeError("1st input argument in function 'addStdSignatureHandlerFromURL' is a Promise object. Promises require a 'yield' statement before being accessed.");if("string"!=typeof a)throw new TypeError("1st input argument '"+a+"' in function 'addStdSignatureHandlerFromURL' is of type '"+typeof a+"'. Expected type 'string'. Function Signature: addStdSignatureHandlerFromURL(string, string).");if(c instanceof Promise)throw new TypeError("2nd input argument in function 'addStdSignatureHandlerFromURL' is a Promise object. Promises require a 'yield' statement before being accessed.");
if("string"!=typeof c)throw new TypeError("2nd input argument '"+c+"' in function 'addStdSignatureHandlerFromURL' is of type '"+typeof c+"'. Expected type 'string'. Function Signature: addStdSignatureHandlerFromURL(string, string).");var b=this;return t(a).then(function(a){return b.addStdSignatureHandlerFromBufferWithDoc(a,c,b)})};a.PDFDoc.prototype.addStdSignatureHandlerFromBufferWithDoc=function(b,c,d){if(3!=arguments.length)throw new RangeError(arguments.length+" arguments passed into function 'addStdSignatureHandlerFromBuffer'. Expected 3 arguments. Function Signature: addStdSignatureHandlerFromBuffer(ArrayBuffer, string, PDFDoc)");
if(d instanceof Promise)throw new TypeError("1st input argument in function 'addStdSignatureHandlerFromBuffer' is a Promise object. Promises require a 'yield' statement before being accessed.");if(b instanceof Promise)throw new TypeError("2nd input argument in function 'addStdSignatureHandlerFromBuffer' is a Promise object. Promises require a 'yield' statement before being accessed.");if(!h.isArrayBuffer(b.buffer)){if("object"==typeof b)throw new TypeError("2nd input argument in function 'addStdSignatureHandlerFromBuffer' is of type '"+
b.name+"'. Expected type 'ArrayBuffer'. Function Signature: addStdSignatureHandlerFromBuffer(ArrayBuffer, string, PDFDoc).");throw new TypeError("2nd input argument '"+b+"' in function 'addStdSignatureHandlerFromBuffer' is of type '"+typeof b+"'. Expected type 'ArrayBuffer'. Function Signature: addStdSignatureHandlerFromBuffer(ArrayBuffer, string, PDFDoc).");}if(c instanceof Promise)throw new TypeError("3rd input argument in function 'addStdSignatureHandlerFromBuffer' is a Promise object. Promises require a 'yield' statement before being accessed.");
if("string"!=typeof c)throw new TypeError("3rd input argument '"+c+"' in function 'addStdSignatureHandlerFromBuffer' is of type '"+typeof c+"'. Expected type 'string'. Function Signature: addStdSignatureHandlerFromBuffer(ArrayBuffer, string, PDFDoc).");return a.messageHandler.sendWithPromise("PDFDoc.addStdSignatureHandlerFromBuffer",{doc:d.id,pkcs12_buffer:b.buffer,pkcs12_pass:c},this.userPriority)};a.Filter.createFromMemory=function(b){h.isArrayBuffer(b)||(b=b.buffer);return a.messageHandler.sendWithPromise("filterCreateFromMemory",
{buf:b},this.userPriority).then(function(b){if("0"==b)return null;b=new a.Filter(b);createdObjects.push({name:b.name,id:b.id});return b})};a.Filter.createURLFilter=function(b,c){if(1>arguments.length||2<arguments.length)throw new RangeError(arguments.length+" arguments passed into function 'createURLFilter'. Expected 1 to 2 arguments. Function Signature: createURLFilter(string, Obj)");if(b instanceof Promise)throw new TypeError("Received a Promise object in 1st input argument 'createURLFilter'. Promises require a 'yield' statement before being accessed.");
if("string"!=typeof b)throw new TypeError("1st input argument '"+b+"' in function 'createURLFilter' is of type '"+typeof b+"'. Expected type 'string'. Function Signature: createURLFilter(string, Obj).");return t(b,c).then(function(b){return a.Filter.createFromMemory(b)})};a.Filter.createFlateEncode=function(b,c,d){"undefined"===typeof b&&(b=new a.Filter("0"));"undefined"===typeof c&&(c=-1);"undefined"===typeof d&&(d=256);if(3<arguments.length)throw new RangeError(arguments.length+" arguments passed into function 'createFlateEncode'. Expected at most 3 arguments. Function Signature: createFlateEncode(Filter, number, number)");
if(b instanceof Promise)throw new TypeError("1st input argument in function 'createFlateEncode' is a Promise object. Promises require a 'yield' statement before being accessed.");if(!(b instanceof a.Filter)){if("object"==typeof b)throw new TypeError("1st input argument in function 'createFlateEncode' is of type '"+b.name+"'. Expected type 'Filter'. Function Signature: createFlateEncode(Filter, number, number).");throw new TypeError("1st input argument '"+b+"' in function 'createFlateEncode' is of type '"+
typeof b+"'. Expected type 'Filter'. Function Signature: createFlateEncode(Filter, number, number).");}if(c instanceof Promise)throw new TypeError("2nd input argument in function 'createFlateEncode' is a Promise object. Promises require a 'yield' statement before being accessed.");if("number"!=typeof c)throw new TypeError("2nd input argument '"+c+"' in function 'createFlateEncode' is of type '"+typeof c+"'. Expected type 'number'. Function Signature: createFlateEncode(Filter, number, number).");if(d instanceof
Promise)throw new TypeError("3rd input argument in function 'createFlateEncode' is a Promise object. Promises require a 'yield' statement before being accessed.");if("number"!=typeof d)throw new TypeError("3rd input argument '"+d+"' in function 'createFlateEncode' is of type '"+typeof d+"'. Expected type 'number'. Function Signature: createFlateEncode(Filter, number, number).");return a.messageHandler.sendWithPromise("Filter.createFlateEncode",{input_filter:b.id,compression_level:c,buf_sz:d},this.userPriority).then(function(b){if("0"==
b)return null;b=new a.Filter(b);createdObjects.push({name:b.name,id:b.id});return b})};a.PDFDoc.prototype.importPages=function(b,c){"undefined"===typeof c&&(c=!1);if(1>arguments.length||2<arguments.length)throw new RangeError(arguments.length+" arguments passed into function 'importPages'. Expected 1 to 2 arguments. Function Signature: importPages(Array, boolean)");if(b instanceof Promise)throw new TypeError("1st input argument in function 'importPages' is a Promise object. Promises require a 'yield' statement before being accessed.");
if(!(b instanceof Array)){if("object"==typeof b)throw new TypeError("1st input argument in function 'importPages' is of type '"+b.name+"'. Expected type 'Array'. Function Signature: importPages(Array, boolean).");throw new TypeError("1st input argument '"+b+"' in function 'importPages' is of type '"+typeof b+"'. Expected type 'Array'. Function Signature: importPages(Array, boolean).");}if(c instanceof Promise)throw new TypeError("3rd input argument in function 'importPages' is a Promise object. Promises require a 'yield' statement before being accessed.");
if("boolean"!=typeof c)throw new TypeError("3rd input argument '"+c+"' in function 'importPages' is of type '"+typeof c+"'. Expected type 'boolean'. Function Signature: importPages(Array, boolean).");b=b.map(function(a){return a.id});return a.messageHandler.sendWithPromise("PDFDoc.importPages",{doc:this.id,page_arr:b,import_bookmarks:c},this.userPriority).then(function(b){return b?b.map(function(b){return new a.Page(b)}):null})};a.SDFDoc.prototype.applyCustomQuery=function(b){if(1!=arguments.length)throw new RangeError(arguments.length+
" arguments passed into function 'applyCustomQuery'. Expected only 1");if("object"!=typeof b)throw new TypeError("input argument '"+b+"' in function 'applyCustomQuery' must be an object");return a.messageHandler.sendWithPromise("SDFDoc.applyCustomQuery",{doc:this.id,query:JSON.stringify(b)},this.userPriority).then(function(a){return JSON.parse(a)})};var C=a.PDFDoc.prototype.saveMemoryBuffer,E=a.PDFDoc.prototype.saveStream;a.PDFDoc.prototype.saveMemoryBuffer=function(a){var b=this;return Promise.resolve(b.documentCompletePromise).then(function(){return C.call(b,
a)})};a.PDFDoc.prototype.saveStream=function(a){var b=this;return Promise.resolve(b.documentCompletePromise).then(function(){return E.call(b,a)})};a.PDFACompliance.createFromUrl=function(b,c,d,f,g,h,k){if(2>arguments.length||7<arguments.length)throw new RangeError(arguments.length+" arguments passed into function 'createFromUrl'. Expected 7 arguments. Function Signature: createFromUrl(convert, url, pwd, conform, excep, max_ref_objs, first_stop)");"undefined"===typeof d&&(d="");"undefined"===typeof f&&
(f=a.PDFACompliance.Conformance.e_Level1B);"undefined"===typeof g&&(g=new Int32Array(0));"undefined"===typeof h&&(h=10);"undefined"===typeof k&&(k=!1);if(b instanceof Promise)throw new TypeError("1st input argument in function 'createFromUrl' is a Promise object. Promises require a 'yield' statement before being accessed.");if("boolean"!=typeof b)throw new TypeError("1st input argument '"+b+"' in function 'createFromUrl' is of type '"+typeof b+"'. Expected type 'number'. Function Signature: createFromUrl(convert, url, pwd, conform, excep, max_ref_objs, first_stop).");
if(c instanceof Promise)throw new TypeError("Received a Promise object in 1st input argument 'createFromURL'. Promises require a 'yield' statement before being accessed.");if("string"!=typeof c)throw new TypeError("2nd input argument '"+c+"' in function 'createFromURL' is of type '"+typeof c+"'. Expected type 'string'. Function Signature: createFromURL(PDFDoc, string, Obj).");if(d instanceof Promise)throw new TypeError("3rd input argument in function 'createFromUrl' is a Promise object. Promises require a 'yield' statement before being accessed.");
if("string"!=typeof d)throw new TypeError("3rd input argument '"+d+"' in function 'createFromUrl' is of type '"+typeof d+"'. Expected type 'string'. Function Signature: createFromUrl(convert, url, pwd, conform, excep, max_ref_objs, first_stop).");if(f instanceof Promise)throw new TypeError("4th input argument in function 'createFromUrl' is a Promise object. Promises require a 'yield' statement before being accessed.");if("number"!=typeof f)throw new TypeError("4th input argument '"+f+"' in function 'createFromUrl' is of type '"+
typeof f+"'. Expected type 'number'. Function Signature: createFromUrl(convert, url, pwd, conform, excep, max_ref_objs, first_stop).");if(g instanceof Promise)throw new TypeError("5th input argument in function 'createFromUrl' is a Promise object. Promises require a 'yield' statement before being accessed.");if(h instanceof Promise)throw new TypeError("6th input argument in function 'createFromUrl' is a Promise object. Promises require a 'yield' statement before being accessed.");if(k instanceof Promise)throw new TypeError("7th input argument in function 'createFromUrl' is a Promise object. Promises require a 'yield' statement before being accessed.");
return t(c).then(function(c){return a.PDFACompliance.createFromBuffer(b,c,d,f,g,h,k)})};a.PDFACompliance.createFromBuffer=function(b,c,d,f,g,k,l){"undefined"===typeof d&&(d="");"undefined"===typeof f&&(f=a.PDFACompliance.Conformance.e_Level1B);"undefined"===typeof g&&(g=new Int32Array(0));"undefined"===typeof k&&(k=10);"undefined"===typeof l&&(l=!1);var e=c;h.isArrayBuffer(e)||(e=e.buffer);if(2>arguments.length||7<arguments.length)throw new RangeError(arguments.length+" arguments passed into function 'createFromBuffer'. Expected 7 arguments. Function Signature: createFromBuffer(convert, buf, pwd, conform, excep, max_ref_objs, first_stop)");
if(b instanceof Promise)throw new TypeError("1st input argument in function 'createFromBuffer' is a Promise object. Promises require a 'yield' statement before being accessed.");if("boolean"!=typeof b)throw new TypeError("1st input argument '"+b+"' in function 'createFromBuffer' is of type '"+typeof b+"'. Expected type 'number'. Function Signature: createFromBuffer(convert, buf, pwd, conform, excep, max_ref_objs, first_stop).");if(c instanceof Promise)throw new TypeError("2nd input argument in function 'createFromBuffer' is a Promise object. Promises require a 'yield' statement before being accessed.");
if(!h.isArrayBuffer(e)){if("object"==typeof c&&c.name)throw new TypeError("2nd input argument in function 'createFromBuffer' is of type '"+c.name+"'. Expected ArrayBuffer|TypedArray. Function Signature: createFromBuffer(convert, buf, pwd, conform, excep, max_ref_objs, first_stop).");throw new TypeError("2nd input argument '"+c+"' in function 'createFromBuffer' is of type '"+typeof c+"'. Expected ArrayBuffer|TypedArray. Function Signature: createFromBuffer(convert, buf, pwd, conform, excep, max_ref_objs, first_stop).");
}if(d instanceof Promise)throw new TypeError("3rd input argument in function 'createFromBuffer' is a Promise object. Promises require a 'yield' statement before being accessed.");if("string"!=typeof d)throw new TypeError("3rd input argument '"+d+"' in function 'createFromBuffer' is of type '"+typeof d+"'. Expected type 'string'. Function Signature: createFromBuffer(convert, buf, pwd, conform, excep, max_ref_objs, first_stop).");if(f instanceof Promise)throw new TypeError("4th input argument in function 'createFromBuffer' is a Promise object. Promises require a 'yield' statement before being accessed.");
if("number"!=typeof f)throw new TypeError("4th input argument '"+f+"' in function 'createFromBuffer' is of type '"+typeof f+"'. Expected type 'number'. Function Signature: createFromBuffer(convert, buf, pwd, conform, excep, max_ref_objs, first_stop).");if(g instanceof Promise)throw new TypeError("5th input argument in function 'createFromBuffer' is a Promise object. Promises require a 'yield' statement before being accessed.");if(!h.isArrayBuffer(g.buffer)){if("object"==typeof g)throw new TypeError("5th input argument in function 'createFromBuffer' is of type '"+
g.name+"'. Expected typed array. Function Signature: createFromBuffer(convert, buf, pwd, conform, excep, max_ref_objs, first_stop).");throw new TypeError("5th input argument '"+g+"' in function 'createFromBuffer' is of type '"+typeof g+"'. Expected typed array. Function Signature: createFromBuffer(convert, buf, pwd, conform, excep, max_ref_objs, first_stop).");}if(k instanceof Promise)throw new TypeError("6th input argument in function 'createFromBuffer' is a Promise object. Promises require a 'yield' statement before being accessed.");
if("number"!=typeof k)throw new TypeError("6th input argument '"+k+"' in function 'createFromBuffer' is of type '"+typeof k+"'. Expected type 'number'. Function Signature: createFromBuffer(convert, buf, pwd, conform, excep, max_ref_objs, first_stop).");if(l instanceof Promise)throw new TypeError("7th input argument in function 'createFromBuffer' is a Promise object. Promises require a 'yield' statement before being accessed.");if("boolean"!=typeof l)throw new TypeError("7th input argument '"+l+"' in function 'createFromBuffer' is of type '"+
typeof l+"'. Expected type 'number'. Function Signature: createFromBuffer(convert, buf, pwd, conform, excep, max_ref_objs, first_stop).");return a.messageHandler.sendWithPromise("pdfaComplianceCreateFromBuffer",{convert:b,buf:e,password:d,conform:f,excep:g.buffer,max_ref_objs:k,first_stop:l},this.userPriority).then(function(b){b=new a.PDFACompliance(b);createdObjects.push({name:b.name,id:b.id});return b})};a.PDFDoc.prototype.lock=function(){if(0!=arguments.length)throw new RangeError(arguments.length+
" arguments passed into function 'lock'. Expected 0 arguments. Function Signature: lock()");lockedObjects.push({name:"PDFDoc",id:this.id,unlocktype:"unlock"});return a.messageHandler.sendWithPromise("PDFDoc.lock",{doc:this.id},this.userPriority)};a.PDFDoc.prototype.lockRead=function(){if(0!=arguments.length)throw new RangeError(arguments.length+" arguments passed into function 'lockRead'. Expected 0 arguments. Function Signature: lockRead()");lockedObjects.push({name:"PDFDoc",id:this.id,unlocktype:"unlockRead"});
return a.messageHandler.sendWithPromise("PDFDoc.lockRead",{doc:this.id},this.userPriority)};a.PDFDoc.prototype.tryLock=function(){if(0!=arguments.length)throw new RangeError(arguments.length+" arguments passed into function 'tryLock'. Expected 0 arguments. Function Signature: tryLock()");var b=lockedObjects.length;lockedObjects.push({name:"PDFDoc",id:this.id,unlocktype:"unlock"});return a.messageHandler.sendWithPromise("PDFDoc.tryLock",{doc:this.id},this.userPriority).then(function(a){a||lockedObjects.splice(b,
1)})};a.PDFDoc.prototype.timedLock=function(b){if(1<arguments.length)throw new RangeError(arguments.length+" arguments passed into function 'timedLock'. Expected at most 1 arguments. Function Signature: timedLock(number)");if(b instanceof Promise)throw new TypeError("1st input argument in function 'timedLock' is a Promise object. Promises require a 'yield' statement before being accessed.");if("number"!=typeof b)throw new TypeError("1st input argument '"+b+"' in function 'timedLock' is of type '"+
typeof b+"'. Expected type 'number'. Function Signature: timedLock(number).");var c=lockedObjects.length;lockedObjects.push({name:"PDFDoc",id:this.id,unlocktype:"unlock"});return a.messageHandler.sendWithPromise("PDFDoc.timedLock",{doc:this.id,milliseconds:b},this.userPriority).then(function(a){a||lockedObjects.splice(c,1)})};a.PDFDoc.prototype.tryLockRead=function(){if(0!=arguments.length)throw new RangeError(arguments.length+" arguments passed into function 'tryLockRead'. Expected 0 arguments. Function Signature: tryLockRead()");
var b=lockedObjects.length;lockedObjects.push({name:"PDFDoc",id:this.id,unlocktype:"unlockRead"});return a.messageHandler.sendWithPromise("PDFDoc.tryLockRead",{doc:this.id},this.userPriority).then(function(a){a||lockedObjects.splice(b,1)})};a.PDFDoc.prototype.timedLockRead=function(b){if(1<arguments.length)throw new RangeError(arguments.length+" arguments passed into function 'timedLockRead'. Expected at most 1 arguments. Function Signature: timedLockRead(number)");if(b instanceof Promise)throw new TypeError("1st input argument in function 'timedLockRead' is a Promise object. Promises require a 'yield' statement before being accessed.");
if("number"!=typeof b)throw new TypeError("1st input argument '"+b+"' in function 'timedLockRead' is of type '"+typeof b+"'. Expected type 'number'. Function Signature: timedLockRead(number).");var c=lockedObjects.length;lockedObjects.push({name:"PDFDoc",id:this.id,unlocktype:"unlockRead"});return a.messageHandler.sendWithPromise("PDFDoc.timedLockRead",{doc:this.id,milliseconds:b},this.userPriority).then(function(a){a||lockedObjects.splice(c,1)})};a.hasFullApi=!0;a.Optimizer.optimize=function(b,c){if(1>
arguments.length||2<arguments.length)throw new RangeError(arguments.length+" arguments passed into function 'Optimizer.optimize'. Expected 1 to 2 arguments. Function Signature: optimize(PDFDoc, OptimizerSettings)");if(b instanceof Promise)throw new TypeError("1st input argument in function 'optimize' is a Promise object. Promises require a 'yield' statement before being accessed.");if(!(b instanceof a.PDFDoc||b instanceof a.SDFDoc||b instanceof a.FDFDoc)){if("object"==typeof b)throw new TypeError("1st input argument in function 'optimize' is of type '"+
b.name+"'. Expected type 'PDFDoc'. Function Signature: optimize(PDFDoc, OptimizerSettings).");throw new TypeError("1st input argument '"+b+"' in function 'optimize' is of type '"+typeof b+"'. Expected type 'PDFDoc'. Function Signature: optimize(PDFDoc, OptimizerSettings).");}if("undefined"===typeof c)c=new a.Optimizer.OptimizerSettings;else{if(c instanceof Promise)throw new TypeError("2nd input argument in function 'optimize' is a Promise object. Promises require a 'yield' statement before being accessed.");
if("object"!==typeof c)throw new TypeError("2nd input argument in function 'optimize' is of type '"+c.name+"'. Expected type 'Object'. Function Signature: optimize(PDFDoc, OptimizerSettings).");}return a.messageHandler.sendWithPromise("optimizerOptimize",{doc:b.id,color_image_settings:c.color_image_settings,grayscale_image_settings:c.grayscale_image_settings,mono_image_settings:c.mono_image_settings,text_settings:c.text_settings,remove_custom:c.remove_custom},this.userPriority)};a.VerificationOptions.prototype.addTrustedCertificateFromURL=
function(a,c){if(1>arguments.length||2<arguments.length)throw new RangeError(arguments.length+" arguments passed into function 'addTrustedCertificateFromURL'. Expected 1 to 2 arguments. Function Signature: addTrustedCertificateFromURL(string, Obj)");if(a instanceof Promise)throw new TypeError("Received a Promise object in 1st input argument 'addTrustedCertificateFromURL'. Promises require a 'yield' statement before being accessed.");if("string"!=typeof a)throw new TypeError("1st input argument '"+
a+"' in function 'addTrustedCertificateFromURL' is of type '"+typeof a+"'. Expected type 'string'. Function Signature: addTrustedCertificateFromURL(string).");var b=this;return t(a,c).then(function(a){return b.addTrustedCertificate(a)})};a.DigitalSignatureField.prototype.certifyOnNextSaveFromURL=function(a,c,e){"undefined"===typeof e&&(e={});d(arguments.length,2,"certifyOnNextSaveFromURL","(string, string, object)",[[a,"string"],[c,"string"],[e,"object"]]);var b=this;return t(a,e).then(function(a){return b.certifyOnNextSaveFromBuffer(a,
c)})};a.DigitalSignatureField.prototype.signOnNextSaveFromURL=function(a,c,e){"undefined"===typeof e&&(e={});d(arguments.length,2,"signOnNextSaveFromURL","(string, string, object)",[[a,"string"],[c,"string"],[e,"object"]]);var b=this;return t(a,e).then(function(a){return b.signOnNextSaveFromBuffer(a,c)})};a.PDFRasterizer.prototype.rasterize=function(b,c,e,f,g,h,k,l,q){"undefined"===typeof l&&(l=null);"undefined"===typeof q&&(q=null);d(arguments.length,7,"rasterize","(PDFNet.Page, number, number, number, number, boolean, PDFNet.Matrix2D, PDFNet.Rect, PDFNet.Rect)",
[[b,"Object",a.Page,"Page"],[c,"number"],[e,"number"],[f,"number"],[g,"number"],[h,"boolean"],[k,"Structure",a.Matrix2D,"Matrix2D"],[l,"Structure",a.Rect,"Rect"],[q,"Structure",a.Rect,"Rect"]]);n("rasterize",[[k,6],[l,7],[q,8]]);return a.messageHandler.sendWithPromise("PDFRasterizer.rasterize",{r:this.id,page:b.id,width:c,height:e,stride:f,num_comps:g,demult:h,device_mtx:k,clip:l,scrl_clp_regions:q},this.userPriority)};var F=a.Convert.officeToPdfWithPath;a.Convert.officeToPdfWithPath=function(b,c){var d;
return a.PDFDoc.create().then(function(a){d=a;return d.initSecurityHandler()}).then(function(){return F(d,b,c)}).then(function(){return d})};var z=a.Convert.officeToPdfWithFilter;a.Convert.officeToPdfWithFilter=function(b,c){var d;return a.PDFDoc.create().then(function(a){d=a;return d.initSecurityHandler()}).then(function(){return z(d,b,c)}).then(function(){return d})};a.Convert.office2PDF=function(b,c){var d=null;d="string"===typeof b?a.Filter.createURLFilter(b):a.Filter.createFromMemory(b);return d.then(function(b){return a.Convert.officeToPdfWithFilter(b,
c)})};a.Convert.office2PDFBuffer=function(b,c){return a.Convert.office2PDF(b,c).then(function(b){return b.saveMemoryBuffer(a.SDFDoc.SaveOptions.e_linearized)})};a.PDFACompliance.createFromFile=function(b,c,d,f,g,k,l){"undefined"===typeof d&&(d="");"undefined"===typeof f&&(f=a.PDFACompliance.Conformance.e_Level1B);"undefined"===typeof g&&(g=new Int32Array(0));"undefined"===typeof k&&(k=10);"undefined"===typeof l&&(l=!1);if(2>arguments.length||7<arguments.length)throw new RangeError(arguments.length+
" arguments passed into function 'createFromFile'. Expected 7 arguments. Function Signature: createFromFile(convert, buf, pwd, conform, excep, max_ref_objs, first_stop)");if(b instanceof Promise)throw new TypeError("1st input argument in function 'createFromFile' is a Promise object. Promises require a 'yield' statement before being accessed.");if("boolean"!=typeof b)throw new TypeError("1st input argument '"+b+"' in function 'createFromFile' is of type '"+typeof b+"'. Expected type 'number'. Function Signature: createFromFile(convert, buf, pwd, conform, excep, max_ref_objs, first_stop).");
if(c instanceof Promise)throw new TypeError("2nd input argument in function 'createFromFile' is a Promise object. Promises require a 'yield' statement before being accessed.");if("string"!=typeof c)throw new TypeError("2nd input argument '"+c+"' in function 'createFromFile' is of type '"+typeof c+"'. Expected type 'string'. Function Signature: createFromFile(boolean, string, string, number, number, number, number, boolean).");if(d instanceof Promise)throw new TypeError("3rd input argument in function 'createFromFile' is a Promise object. Promises require a 'yield' statement before being accessed.");
if("string"!=typeof d)throw new TypeError("3rd input argument '"+d+"' in function 'createFromFile' is of type '"+typeof d+"'. Expected type 'string'. Function Signature: createFromFile(convert, buf, pwd, conform, excep, max_ref_objs, first_stop).");if(f instanceof Promise)throw new TypeError("4th input argument in function 'createFromFile' is a Promise object. Promises require a 'yield' statement before being accessed.");if("number"!=typeof f)throw new TypeError("4th input argument '"+f+"' in function 'createFromFile' is of type '"+
typeof f+"'. Expected type 'number'. Function Signature: createFromFile(convert, buf, pwd, conform, excep, max_ref_objs, first_stop).");if(g instanceof Promise)throw new TypeError("5th input argument in function 'createFromFile' is a Promise object. Promises require a 'yield' statement before being accessed.");if(!h.isArrayBuffer(g.buffer)){if("object"==typeof g)throw new TypeError("5th input argument in function 'createFromFile' is of type '"+g.name+"'. Expected typed array. Function Signature: createFromFile(convert, buf, pwd, conform, excep, max_ref_objs, first_stop).");
throw new TypeError("5th input argument '"+g+"' in function 'createFromFile' is of type '"+typeof g+"'. Expected typed array. Function Signature: createFromFile(convert, buf, pwd, conform, excep, max_ref_objs, first_stop).");}if(k instanceof Promise)throw new TypeError("6th input argument in function 'createFromFile' is a Promise object. Promises require a 'yield' statement before being accessed.");if("number"!=typeof k)throw new TypeError("6th input argument '"+k+"' in function 'createFromFile' is of type '"+
typeof k+"'. Expected type 'number'. Function Signature: createFromFile(convert, buf, pwd, conform, excep, max_ref_objs, first_stop).");if(l instanceof Promise)throw new TypeError("7th input argument in function 'createFromFile' is a Promise object. Promises require a 'yield' statement before being accessed.");if("boolean"!=typeof l)throw new TypeError("7th input argument '"+l+"' in function 'createFromFile' is of type '"+typeof l+"'. Expected type 'number'. Function Signature: createFromFile(convert, buf, pwd, conform, excep, max_ref_objs, first_stop).");
return a.messageHandler.sendWithPromise("pdfaComplianceCreateFromFile",{convert:b,file_path:c,password:d,conform:f,excep:g.buffer,max_ref_objs:k,first_stop:l},this.userPriority).then(function(b){b=new a.PDFACompliance(b);createdObjects.push({name:b.name,id:b.id});return b})};a.ElementBuilder.prototype.createUnicodeTextRun=function(b){d(arguments.length,1,"createUnicodeTextRun","(string)",[[b,"string"]]);return a.messageHandler.sendWithPromise("ElementBuilder.createUnicodeTextRun",{b:this.id,text_data:b},
this.userPriority).then(function(b){return f(a.Element,b)})};a.shutdown=function(){if(0!=arguments.length)throw new RangeError(arguments.length+" arguments passed into function 'shutdown'. Expected 0 arguments. Function Signature: shutdown()");a.messageHandler.messageHandler&&a.messageHandler.messageHandler.comObj.shutdown();B=!0};a.beginOperation=function(a){return Promise.resolve()};a.finishOperation=function(){return Promise.resolve()};a.runWithCleanup=function(b,c){var d,f=!1;return w=w.then(function(){},
function(){}).then(function(){return a.initialize(c)}).then(function(){f=!0;a.startDeallocateStack();return b()}).then(function(b){d=b;f=!1;return a.endDeallocateStack()}).then(function(){if(0<stackCallCounter)throw Error('Detected not yet deallocated stack. You may have called "PDFNet.startDeallocateStack()" somewhere without calling "PDFNet.endDeallocateStack()" afterwards.');return d}).catch(function(b){f&&a.endDeallocateStack();throw b;})};a.runWithoutCleanup=function(b,c){return w=w.then(function(){},
function(){}).then(function(){return a.initialize(c)}).then(function(){return b()}).then(function(a){return a})};h.PDFNet=a})("undefined"===typeof window?this:window);var _=__webpack_require__(776);
(function(h){function g(b,c,d,e){if(_.isUndefined(b))return null;var g;c=new Promise(function(a,c){f(function(){c(new WorkerError("The worker has encountered an error",h.utils.ie?"error.EmsWorkerErrorIE":"error.EmsWorkerError"))});var e={};t&&(e.workerHeapSize=t);l&&(e.pdfResourcePath=l);n&&(e.pdfAsmPath=n);if(!h.utils.isJSWorker){var m=h.location.href,k=m.lastIndexOf("#");k=m.lastIndexOf("/",k);-1!==k&&(e.parentUrl=m.substring(0,k+1))}g=new h.WorkerTransport(b,d,e);g.backendType=r.getCurrentPDFBackendType();
g.workerInitializedPromise.then(function(){a()},function(a){c(a)})});var m=new Promise(function(a,b){if(h.utils.isJSWorker&&h.jsworker&&h.jsworker.utils)h.jsworker.utils.getResourcesDir?h.jsworker.utils.getResourcesDir(function(c,d){c?b(c):a(d)}):h.jsworker.utils.getHTMLContentPath?h.jsworker.utils.getHTMLContentPath(function(c){c?(c.endsWith("/")||(c+="/"),a(c+"js/html5/pdf/")):b(new WorkerError("Couldn't fetch resource file path."))}):b(new WorkerError("Some functions required for fetching resources are not defined."));
else{var c=new XMLHttpRequest;c.open("GET",h.CoreControls.getPDFResourcePath()+"pdfnet.res",!0);c.responseType="arraybuffer";c.onload=function(){200===c.status?a(c.response):b(new WorkerError("Couldn't fetch resource file.","error.ResourceLoadError"))};c.onerror=function(){b(new WorkerError("Network error","error.ResourceLoadError"))};c.send(null)}});return Promise.all([c,m]).then(function(a){return h.utils.isJSWorker&&h.jsworker&&h.jsworker.utils?g.loadResourceFileFromPath(a[1],e):g.loadResourceFile(a[1],
e)}).then(function(){"undefined"!==typeof q&&g.setColorManagement(q);"undefined"!==typeof a&&g.setCustomFontURL(a);return g}).catch(function(a){a.message&&-1!==a.message.indexOf("Bad License Key")&&(a.userMessage="error.InvalidLicenseKey");throw a;})}var q,a,t,u;h.subzeroEnabled=h.utils.chromeHasSubzero;var d,l,n,v={},y,B=[],k=[],f=function(a){B.push(a);for(var b=0;b<k.length;++b)a(k[b])},A=_.throttle(function(a){var b=B.length;k.push(a);for(var c=0;c<b;++c)B[c](a)},100,{trailing:!1});h.CoreControls=
h.CoreControls||{};var r=h.CoreControls,p;r.getCurrentL=function(){return p};r.setL=function(a){p=a};r.getParentL=function(){return new Promise(function(a){try{var b=h.parent&&h.parent.WebViewer?h.parent.WebViewer.l():void 0;a(b)}catch(D){h.parent.postMessage("requestl","*"),$(h).on("message.l",function(b){b=b.originalEvent;"object"===typeof b.data&&"responsel"===b.data.type&&(a(b.data.value),$(h).off("message.l"))})}})};r.getLPromise=function(a){return a?Promise.resolve(a):h._trnDebugMode?Promise.resolve():
(""+h.location).split("").reverse().join("").match(/(moc\.nortfdp\.[^.]+\/\/|moc\.nortfdp\/\/)/)||h.jsworker?Promise.resolve(""):r.getParentL().then(function(a){return a?a:null})};r.isDemoLicenseString=function(a){if(!a||50>a.length)return!1;var b=a.lastIndexOf(":");return"demo:"!==a.slice(0,5)?!1:0<a.slice(5,b).match(/^[a-zA-Z0-9.!#$%&\u2019*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).length};var w={};r.setWorkerTransportPromise=function(a){a.pdf&&(w.pdf=a.pdf);a.office&&(w.office=a.office)};
r.getWorkerTransportPromise=function(){return w};r.setColorManagement=function(a){q=a;r.getWorkerTransportPromise().pdf&&r.getWorkerTransportPromise().pdf.then(function(b){b.setColorManagement(a)})};r.setCustomFontURL=function(b){a=b;r.getWorkerTransportPromise().pdf&&r.getWorkerTransportPromise().pdf.then(function(b){b.setCustomFontURL(a)})};r.enableSubzero=function(a){h.utils.chromeHasSubzero&&(h.subzeroEnabled=a)};r.isSubzeroEnabled=function(){return h.subzeroEnabled};var C=h.PDFNet&&h.PDFNet.hasFullAPI;
r.enableFullPDF=function(a){C=a};r.isFullPDFEnabled=function(){return C};r.setPDFWorkerPath=function(a){a.lastIndexOf("/")!==a.length-1&&(a+="/");d=a};r.getPDFAsmPath=function(){return n||r.getWorkerPath()+"pdf/"+(r.isFullPDFEnabled()?"full/":"lean/")};r.setPDFAsmPath=function(a){a.lastIndexOf("/")!==a.length-1&&(a+="/");n=a};r.getPDFWorkerPath=function(){return d||r.getWorkerPath()+"pdf/"+(r.isFullPDFEnabled()?"full/":"lean/")};r.setPDFResourcePath=function(a){a.lastIndexOf("/")!==a.length-1&&(a+=
"/");l=a};r.getPDFResourcePath=function(){return l||r.getWorkerPath()+"pdf/"};r.forceBackendType=function(a){y=a};var E;r.setExternalPath=function(a){a.lastIndexOf("/")!==a.length-1&&(a+="/");E=a};r.getExternalPath=function(){return E};var F;r.setLocalWorkerPath=function(a,b){b||a.lastIndexOf("/")===a.length-1||(a+="/");F=a};r.getLocalWorkerPath=function(){return F||r.getWorkerPath()};r.setEmscriptenHeapSize=function(a){t=a};var z,b,c;r.getPostMessageTransfers=function(){return b};r.getDefaultBackendType=
function(){c||(c=new Promise(function(a){if(y)a(y);else if(h.utils.isJSWorker&&h.jsworker)a("jsworker");else if(h.utils.isPdfjs)a(void 0);else if(h.utils.isChrome){var b=!0,c=$('<embed name="simple_module" id="simple_module" width=0 height=0 src="'+h.CoreControls.getPDFResourcePath()+'SimpleWorker.nmf" type="application/x-pnacl" style="position:absolute" />'),d=c[0];d.addEventListener("error",function(){b&&(console.log("PNaClError: PNaCl failed to load. Falling back to Emscripten."),b=!1);a("ems")},
!0);$(document.body).prepend(c);var e=!1,f=function(b){e||(a(b),clearTimeout(k),c.remove(),e=!0)};if("undefined"===typeof d.postMessage)b&&(console.log("PNaClError: PNaCl seems to be disabled. Falling back to Emscripten."),b=!1),f("ems");else{var g=function(){b&&(console.log("PNaClError: PNaCl Timed out. Falling back to Emscripten."),b=!1);f("ems")};d.addEventListener("progress",function(){clearTimeout(k);k=setTimeout(g,5E3)});d.addEventListener("message",function(a){clearTimeout(k);"T"===a.data?
f("pnacl"):(console.log("PNaClError: PNaCl responded incorrectly. Falling back to Emscripten."),f("ems"))});d.postMessage("T");var k=setTimeout(g,5E3)}}else a("ems")}));return c};r.getCurrentPDFBackendType=function(){return v.backendType};var e=function(){v.loadingBackendTypeCapability||(v.loadingBackendTypeCapability=createPromiseCapability());return v.loadingBackendTypeCapability};r.getLoadingPDFBackendType=function(){return e().promise};r.preloadPDFWorker=function(a,b,c){r.getWorkerTransportPromise().pdf&&
a===r.getCurrentPDFBackendType()||(e().resolve(a),_.isUndefined(c)&&(c={}),h.utils.isJSWorker||(c.workerId="pdf_pnacl_module",c.pnaclWorkerPath=h.CoreControls.getPDFWorkerPath()+(h.subzeroEnabled?"PDFWorkerSubzero.nmf":"PDFWorker.nmf"),c.emsWorkerPath=h.CoreControls.getPDFResourcePath()+(t||l||n?"CommUtil/ResizableWorker.js":"CommUtil/PDFworker.js"),c.externalPath=h.CoreControls.getExternalPath()),c.workerState=v,d&&(c.pdfWorkerPath=d),z=r.preloadWorker(a,b,c))};r.preloadWorker=function(a,c,d){d=
d||{};var e;return new Promise(function(g,k){var m=function(a,b){g(a);d.workerState.backendType=b},l=function(a){f(function(){k(new WorkerError("The worker has encountered an error",h.utils.ie?"error.EmsWorkerErrorIE":"error.EmsWorkerError"))});var c=d.emsWorkerPath.toLowerCase().startsWith("http"),e=d.externalPath?"&externalPath="+encodeURIComponent(d.externalPath):"";if(c){c=h.CoreControls.getPDFWorkerPath().slice(0,-9);var g=new Worker(h.CoreControls.getLocalWorkerPath()+"CORSWorker.js#isfull="+
r.isFullPDFEnabled()+"&file="+encodeURIComponent(d.emsWorkerPath)+"&path="+encodeURIComponent(c))}else g=d.pdfWorkerPath?new Worker(d.emsWorkerPath+"?isfull="+r.isFullPDFEnabled()+"&pdfWorkerPath="+encodeURIComponent(d.pdfWorkerPath)+e):new Worker(d.emsWorkerPath+"?isfull="+r.isFullPDFEnabled()+e);g.onerror=A;b=!0;var m=function(b){"object"===typeof b.data&&"action"in b.data&&"workerLoaded"===b.data.action&&(a.workerLoadingProgress&&a.workerLoadingProgress(1),g.removeEventListener("message",m))};
g.addEventListener("message",m,!1);c=r.GetCachingLevel();r.setProgressiveTimeInternal(c?18E3/c:0);return g};if("jsworker"===a)h.utils.isJSWorker&&(e=h.jsworker.loadWorker()),b=!1,m(e,"jsworker");else if("pnacl"===a){_.isUndefined(d.useEmscriptenWhileLoading)&&(d.useEmscriptenWhileLoading=!r.isSubzeroEnabled());b=!1;var q=$('<embed name="'+d.workerId+'" id="'+d.workerId+'" width=0 height=0 src="'+d.pnaclWorkerPath+'" type="application/x-pnacl" style="position:absolute" />');$(document.body).prepend(q);
var n=function(a){a.lengthComputable&&(d.useEmscriptenWhileLoading?(e.removeEventListener("progress",n,!0),e.removeEventListener("loadend",p,!0),e.removeEventListener("crash",t,!0),e.removeEventListener("error",u,!0),m(l(c),"ems"),e.addEventListener("loadend",function(){b=!1;d.workerState.backendType="pnacl";c.pnaclComplete&&c.pnaclComplete(e)})):c.workerLoadingProgress&&c.workerLoadingProgress(a.loaded/a.total))},p=function(){c.workerLoadingProgress&&c.workerLoadingProgress(1);r.setProgressiveTimeInternal(1E3);
m(e,"pnacl")},t=function(){k(new WorkerError("The Worker has Crashed.","error.PNaClCrashError"))},u=function(){console.log("PNaClError: Main worker encountered an error. Falling back to Emscripten.");m(l(c),"ems")};e=q[0];e.addEventListener("progress",n,!0);e.addEventListener("loadend",p,!0);e.addEventListener("crash",t,!0);e.addEventListener("error",u,!0)}else"ems"===a&&m(l(c),"ems")})};r.resetWorker=function(){z=null;w.pdf=null;w.office=null;v.loadingBackendTypeCapability=null};r.isDemoMode=function(){return u};
r.initPDFWorkerTransports=function(a,c,d){z||r.getWorkerTransportPromise().pdf||r.preloadPDFWorker(a,c);r.getCurrentL()||r.setL(d);d=d||r.getCurrentL();if(r.getWorkerTransportPromise().pdf){if(u&&d&&!r.isDemoLicenseString(d))throw Error("PDFNet was already initialized in demo mode. For solution see pdftron.com/kb_demo_init. Note that calling initPDFWorkerTransports or creating WebViewer object will also call PDFNet.initialize so your license key should be used in all of these calls.");}else u=!d,
a=Promise.all([r.getLPromise(d),z]).then(function(a){u=!a[0]||r.isDemoLicenseString(a[0]);return g(a[1],c,b,a[0])}),r.setWorkerTransportPromise({pdf:a});return r.getWorkerTransportPromise().pdf};r.attachErrorCallback=f})("undefined"===typeof window?this:window);(function(h){function g(){for(var a=0;a<z.length;a++)z[a][0](z[a][1]);z=[];b=!1}function q(a,d){z.push([a,d]);b||(b=!0,F(g,0))}function a(a,b){function c(a){d(b,a)}function e(a){n(b,a)}try{a(c,e)}catch(D){e(D)}}function t(a){var b=a.owner,c=b.state_;b=b.data_;var f=a[c];a=a.then;if("function"===typeof f){c=w;try{b=f(b)}catch(D){n(a,D)}}u(a,b)||(c===w&&d(a,b),c===C&&n(a,b))}function u(a,b){var c;try{if(a===b)throw new TypeError("A promises callback cannot return that same promise.");if(b&&("function"===
typeof b||"object"===typeof b)){var e=b.then;if("function"===typeof e)return e.call(b,function(e){c||(c=!0,b!==e?d(a,e):l(a,e))},function(b){c||(c=!0,n(a,b))}),!0}}catch(D){return c||n(a,D),!0}return!1}function d(a,b){a!==b&&u(a,b)||l(a,b)}function l(a,b){a.state_===r&&(a.state_=p,a.data_=b,q(y,a))}function n(a,b){a.state_===r&&(a.state_=p,a.data_=b,q(B,a))}function v(a){var b=a.then_;a.then_=void 0;for(a=0;a<b.length;a++)t(b[a])}function y(a){a.state_=w;v(a)}function B(a){a.state_=C;v(a)}function k(b){if("function"!==
typeof b)throw new TypeError("Promise constructor takes a function argument");if(!1===this instanceof k)throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");this.then_=[];a(b,this)}h.createPromiseCapability=function(){var a={},b=new k(function(b,c){a.resolve=b;a.reject=c});a.promise=b;return a};var f=h.Promise,A=f&&"resolve"in f&&"reject"in f&&"all"in f&&"race"in f&&function(){var a;new f(function(b){a=b});return"function"===
typeof a}(); true&&exports?(exports.Promise=A?f:k,exports.Polyfill=k):"function"==typeof define&&define.amd?define(function(){return A?f:k}):A||(h.Promise=k);var r="pending",p="sealed",w="fulfilled",C="rejected",E=function(){},F="undefined"!==typeof setImmediate?setImmediate:setTimeout,z=[],b;k.prototype={constructor:k,state_:r,then_:null,data_:void 0,then:function(a,b){a={owner:this,then:new this.constructor(E),fulfilled:a,rejected:b};this.state_===w||this.state_===C?q(t,a):
this.then_.push(a);return a.then},"catch":function(a){return this.then(null,a)}};k.all=function(a){if("[object Array]"!==Object.prototype.toString.call(a))throw new TypeError("You must pass an array to Promise.all().");return new this(function(b,c){function d(a){f++;return function(c){e[a]=c;--f||b(e)}}for(var e=[],f=0,g=0,h;g<a.length;g++)(h=a[g])&&"function"===typeof h.then?h.then(d(g),c):e[g]=h;f||b(e)})};k.race=function(a){if("[object Array]"!==Object.prototype.toString.call(a))throw new TypeError("You must pass an array to Promise.race().");
return new this(function(b,c){for(var d=0,e;d<a.length;d++)(e=a[d])&&"function"===typeof e.then?e.then(b,c):b(e)})};k.resolve=function(a){return a&&"object"===typeof a&&a.constructor===this?a:new this(function(b){b(a)})};k.reject=function(a){return new this(function(b,c){c(a)})}})("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this);(function(h){var g=function(g,a){var h=Error.apply(this,arguments);h.name=this.name="WorkerError";this.stack=h.stack;this.message=h.message;this.userMessage=a};g.prototype=Object.create(Error.prototype,{constructor:{value:g,writable:!0,configurable:!0}});h.WorkerError=g})("undefined"===typeof window?this:window);this.DOWNLOADER_CHUNK_MAX=50;var globalScope=this;
globalScope.WorkerTransport=function(){function h(g,h,a){var q=this;this.progressCallback=null;this.pageCache=[];this.pagePromises=[];this.eventListeners={};this.earlyEvents={};this.downloadInfoCapability=createPromiseCapability();this.workerInitializedPromise=new Promise(function(t,d){if(globalScope.utils.isJSWorker||"undefined"!==typeof Worker)try{var l=new globalScope.MessageHandler("main",g);l.postMessageTransfers=h;q.messageHandler=l;l.on("test",function(a){a&&a.supportTypedArray?(a.supportTransfers||
(l.postMessageTransfers=!1),q.setupMessageHandler(l),t()):d(new globalScope.WorkerError("Typed arrays are not supported. Can't start a worker.","error.WorkerInitError"));globalScope.utils.isJSWorker&&setTimeout(function(){},0)});var n={array:new Uint8Array([255])};try{n.options=a?a:{},n.options.chunkMax=globalScope.DOWNLOADER_CHUNK_MAX,l.send("test",n)}catch(v){globalScope.utils.log("Cannot use postMessage transfers"),l.postMessageTransfers=!1,n.array[0]=0,l.send("test",n)}return}catch(v){d(new globalScope.WorkerError("The worker has been disabled. This may be the result of using PNaCl on an unsupported browser.",
"error.PNaClSupportError"))}d(new globalScope.WorkerError("Can't start a worker","error.WorkerInitError"))})}h.prototype={renderPriority:0,textPriority:1,userRequestPriority:2,immediatePriority:3,setupMessageHandler:function(g){this.messageHandler=g;g.on("event",this.runEventListener,this)},runEventListener:function(g){var h=g.docId;if(this.eventListeners[h])this.eventListeners[h](g);else h in this.earlyEvents?this.earlyEvents[h].push(g):this.earlyEvents[h]=[g]},addEventListener:function(g,h){if(this.eventListeners[g])globalScope.utils.error("Event listener already set for "+
g);else if(this.eventListeners[g]=h,g in this.earlyEvents){h=this.earlyEvents[g];for(var a=0;a<h.length;++a)this.runEventListener(h[a]);delete this.earlyEvents[g]}},clearEventListener:function(g){delete this.eventListeners[g]},fetchDocument:function(g){return this.messageHandler.sendWithPromise("NewDoc",g,this.immediatePriority)},loadResourceFile:function(g,h){g={array:g,workerPath:globalScope.CoreControls.getWorkerPath(),jason_str:'{"language":"Nodejs"}'};h&&(g.l=h);return this.messageHandler.sendWithPromise("LoadRes",
g,this.immediatePriority)},loadResourceFileFromPath:function(g,h){g={path:g,jason_str:'{"language":"Nodejs"}'};h&&(g.l=h);return this.messageHandler.sendWithPromise("LoadResFromPath",g,this.immediatePriority)},getCanvas:function(g,h,a,t,u,d,l,n){return"undefined"===typeof n?this.messageHandler.sendWithPromiseReturnId("GetCanvas",{docId:g,pageIndex:h,width:a,height:t,rotation:u,layers:d,overprintMode:l},this.renderPriority):this.messageHandler.sendWithPromiseReturnId("GetCanvasPartial",{docId:g,pageIndex:h,
width:a,height:t,rotation:u,layers:d,bbox:[n.x1,n.y1,n.x2,n.y2],overprintMode:l},this.renderPriority)},getCanvasFilepath:function(g,h,a,t,u,d,l,n,v){return"undefined"===typeof n?this.messageHandler.sendWithPromiseReturnId("GetCanvas",{docId:g,pageIndex:h,width:a,height:t,rotation:u,layers:d,filePath:v,overprintMode:l},this.renderPriority):this.messageHandler.sendWithPromiseReturnId("GetCanvasPartial",{docId:g,pageIndex:h,width:a,height:t,rotation:u,layers:d,bbox:[n.x1,n.y1,n.x2,n.y2],filePath:v,overprintMode:l},
this.renderPriority)},getCanvasProgressive:function(g,h){return"undefined"!==typeof h?this.messageHandler.sendWithPromise("GetCanvasProgressive",{callbackId:g,filePath:h},this.renderPriority):this.messageHandler.sendWithPromise("GetCanvasProgressive",{callbackId:g},this.renderPriority)},getDocumentThumbnail:function(g){return this.messageHandler.sendWithPromise("ThumbCacheGet",{filePath:g},this.renderPriority)},cancelAllDocumentThumbnailRequests:function(g){return this.messageHandler.send("ThumbCacheCancelAll")},
loadTextData:function(g,h){return this.messageHandler.sendWithPromise("LoadText",{docId:g,pageIndex:h},this.textPriority)},loadBookmarks:function(g){return this.messageHandler.sendWithPromise("LoadBookmarks",{docId:g},this.immediatePriority)},loadAnnotations:function(g,h){g={docId:g};h&&(g.pages=h);return this.messageHandler.sendWithPromise("LoadAnnotations",g,this.immediatePriority)},mergeXFDF:function(g,h){return this.messageHandler.sendWithPromise("MergeXFDF",{docId:g,xfdf:h},this.userRequestPriority)},
saveFile:function(g){return this.messageHandler.sendWithPromise("SaveDoc",g,this.userRequestPriority)},saveDocFromFixedElements:function(g){return this.messageHandler.sendWithPromise("SaveDocFromFixedElements",g,this.userRequestPriority)},saveFileAs:function(g){return this.messageHandler.sendWithPromise("SaveDocAs",g,this.userRequestPriority)},printFile:function(g,h){console.log("[WorkerTransport.printFile] printOptions "+h);return this.messageHandler.sendWithPromise("PrintDoc",{docId:g,printOptions:h},
this.userRequestPriority)},updatePassword:function(g,h){return this.messageHandler.sendWithPromise("UpdatePassword",{docId:g,password:h},this.immediatePriority)},insertBlankPages:function(g,h,a,t){return this.messageHandler.sendWithPromise("InsertBlankPages",{docId:g,width:a,height:t,pageArray:h},this.userRequestPriority)},insertPages:function(g,h,a,t,u){return this.messageHandler.sendWithPromise("InsertPages",{docId:g,doc:h,pageArray:a,destPos:t,insertBookmarks:u},this.userRequestPriority)},movePages:function(g,
h,a){return this.messageHandler.sendWithPromise("MovePages",{docId:g,pageArray:h,destPos:a},this.userRequestPriority)},removePages:function(g,h){return this.messageHandler.sendWithPromise("RemovePages",{docId:g,pageArray:h},this.userRequestPriority)},rotatePages:function(g,h,a){return this.messageHandler.sendWithPromise("RotatePages",{docId:g,pageArray:h,rotation:a},this.userRequestPriority)},getPDFDoc:function(g){return this.messageHandler.sendWithPromise("GetPDFDoc",{docId:g},this.userRequestPriority)},
extractPages:function(g,h,a,t){return this.messageHandler.sendWithPromise("ExtractPages",{docId:g,pageArray:h,xfdfString:a,watermarks:t},this.userRequestPriority)},cropPages:function(g,h,a,t,u,d){return this.messageHandler.sendWithPromise("CropPages",{docId:g,pageArray:h,topMargin:a,botMargin:t,leftMargin:u,rightMargin:d},this.userRequestPriority)},sendDownloaderHint:function(g,h){return this.messageHandler.sendWithPromise("DownloaderHint",{docId:g,hint:h},this.userRequestPriority)},isLinearizationValid:function(g){return this.messageHandler.sendWithPromise("IsLinearized",
{docId:g},this.userRequestPriority)},getLayersArray:function(g){return this.messageHandler.sendWithPromise("GetLayers",{docId:g},this.userRequestPriority)},extractPDFNetLayersContext:function(g,h){return this.messageHandler.sendWithPromise("ExtractPDFNetLayersContext",{docId:g,layers:h},this.userRequestPriority)},getAnnotationAppearance:function(g){return this.messageHandler.sendWithPromise("RenderAnnotAppearance",g,this.userRequestPriority)},getNextId:function(){return this.messageHandler.getNextId()},
deleteDocument:function(g){return this.messageHandler.sendWithPromise("DeleteDocument",{docId:g},this.userRequestPriority)},setColorManagement:function(g){return this.messageHandler.sendWithPromise("SetColorManagement",{value:g},this.immediatePriority)},setCustomFontURL:function(g){return this.messageHandler.sendWithPromise("SetCustomFontURL",{fontURL:g},this.immediatePriority)},getWorkerType:function(){return this.messageHandler.comObj&&"function"===typeof this.messageHandler.comObj.getWorkerType?
this.messageHandler.comObj.getWorkerType():globalScope.IsWorker(this.messageHandler.comObj)?"ems":"pnacl"},requirePage:function(g,h){return this.messageHandler.sendWithPromise("RequirePage",{docId:g,pageNum:h},this.immediatePriority)},sendWithPromise:function(g,h,a){return this.messageHandler.sendWithPromise(g,h,a)},cancelRequest:function(g){this.messageHandler.cancelPromise(g)},getAppearanceDocument:function(g,h){return this.messageHandler.sendWithPromise("GetAnnotationAppearances",{docId:g,references:h},
this.textPriority)}};return h}();(function(h){var g=h._trnDebugMode||h._trnLogMode,q=h._logFiltersEnabled?h._logFiltersEnabled:{};h.utils=h.utils?h.utils:{};h.utils.warn=function(a,h){h||(h=a,a="default");g&&q[a]&&console.warn(a+": "+h)};h.utils.log=function(a,h){h||(h=a,a="default");g&&q[a]&&console.log(a+": "+h)};h.utils.error=function(a){g&&console.error(a);throw Error(a);};h.info=function(a,g){h.utils.log(a,g)};h.warn=function(a,g){h.utils.warn(a,g)};h.error=function(a){h.utils.error(a)}})("undefined"===typeof window?this:window);


/***/ }),

/***/ 605:
/***/ (function(module) {

module.exports = require("http");

/***/ }),

/***/ 614:
/***/ (function(module) {

module.exports = require("events");

/***/ }),

/***/ 622:
/***/ (function(module) {

module.exports = require("path");

/***/ }),

/***/ 630:
/***/ (function(module, __unusedexports, __webpack_require__) {

module.exports = require(__webpack_require__.ab + "lib/addon.node")

/***/ }),

/***/ 631:
/***/ (function(module) {

module.exports = require("net");

/***/ }),

/***/ 669:
/***/ (function(module) {

module.exports = require("util");

/***/ }),

/***/ 692:
/***/ (function(__unusedmodule, exports) {

"use strict";


Object.defineProperty(exports, '__esModule', { value: true });

class Deprecation extends Error {
  constructor(message) {
    super(message); // Maintains proper stack trace (only available on V8)

    /* istanbul ignore next */

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }

    this.name = 'Deprecation';
  }

}

exports.Deprecation = Deprecation;


/***/ }),

/***/ 747:
/***/ (function(module) {

module.exports = require("fs");

/***/ }),

/***/ 753:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var endpoint = __webpack_require__(385);
var universalUserAgent = __webpack_require__(796);
var isPlainObject = __webpack_require__(356);
var nodeFetch = _interopDefault(__webpack_require__(454));
var requestError = __webpack_require__(463);

const VERSION = "5.6.0";

function getBufferResponse(response) {
  return response.arrayBuffer();
}

function fetchWrapper(requestOptions) {
  const log = requestOptions.request && requestOptions.request.log ? requestOptions.request.log : console;

  if (isPlainObject.isPlainObject(requestOptions.body) || Array.isArray(requestOptions.body)) {
    requestOptions.body = JSON.stringify(requestOptions.body);
  }

  let headers = {};
  let status;
  let url;
  const fetch = requestOptions.request && requestOptions.request.fetch || nodeFetch;
  return fetch(requestOptions.url, Object.assign({
    method: requestOptions.method,
    body: requestOptions.body,
    headers: requestOptions.headers,
    redirect: requestOptions.redirect
  }, // `requestOptions.request.agent` type is incompatible
  // see https://github.com/octokit/types.ts/pull/264
  requestOptions.request)).then(async response => {
    url = response.url;
    status = response.status;

    for (const keyAndValue of response.headers) {
      headers[keyAndValue[0]] = keyAndValue[1];
    }

    if ("deprecation" in headers) {
      const matches = headers.link && headers.link.match(/<([^>]+)>; rel="deprecation"/);
      const deprecationLink = matches && matches.pop();
      log.warn(`[@octokit/request] "${requestOptions.method} ${requestOptions.url}" is deprecated. It is scheduled to be removed on ${headers.sunset}${deprecationLink ? `. See ${deprecationLink}` : ""}`);
    }

    if (status === 204 || status === 205) {
      return;
    } // GitHub API returns 200 for HEAD requests


    if (requestOptions.method === "HEAD") {
      if (status < 400) {
        return;
      }

      throw new requestError.RequestError(response.statusText, status, {
        response: {
          url,
          status,
          headers,
          data: undefined
        },
        request: requestOptions
      });
    }

    if (status === 304) {
      throw new requestError.RequestError("Not modified", status, {
        response: {
          url,
          status,
          headers,
          data: await getResponseData(response)
        },
        request: requestOptions
      });
    }

    if (status >= 400) {
      const data = await getResponseData(response);
      const error = new requestError.RequestError(toErrorMessage(data), status, {
        response: {
          url,
          status,
          headers,
          data
        },
        request: requestOptions
      });
      throw error;
    }

    return getResponseData(response);
  }).then(data => {
    return {
      status,
      url,
      headers,
      data
    };
  }).catch(error => {
    if (error instanceof requestError.RequestError) throw error;
    throw new requestError.RequestError(error.message, 500, {
      request: requestOptions
    });
  });
}

async function getResponseData(response) {
  const contentType = response.headers.get("content-type");

  if (/application\/json/.test(contentType)) {
    return response.json();
  }

  if (!contentType || /^text\/|charset=utf-8$/.test(contentType)) {
    return response.text();
  }

  return getBufferResponse(response);
}

function toErrorMessage(data) {
  if (typeof data === "string") return data; // istanbul ignore else - just in case

  if ("message" in data) {
    if (Array.isArray(data.errors)) {
      return `${data.message}: ${data.errors.map(JSON.stringify).join(", ")}`;
    }

    return data.message;
  } // istanbul ignore next - just in case


  return `Unknown error: ${JSON.stringify(data)}`;
}

function withDefaults(oldEndpoint, newDefaults) {
  const endpoint = oldEndpoint.defaults(newDefaults);

  const newApi = function (route, parameters) {
    const endpointOptions = endpoint.merge(route, parameters);

    if (!endpointOptions.request || !endpointOptions.request.hook) {
      return fetchWrapper(endpoint.parse(endpointOptions));
    }

    const request = (route, parameters) => {
      return fetchWrapper(endpoint.parse(endpoint.merge(route, parameters)));
    };

    Object.assign(request, {
      endpoint,
      defaults: withDefaults.bind(null, endpoint)
    });
    return endpointOptions.request.hook(request, endpointOptions);
  };

  return Object.assign(newApi, {
    endpoint,
    defaults: withDefaults.bind(null, endpoint)
  });
}

const request = withDefaults(endpoint.endpoint, {
  headers: {
    "user-agent": `octokit-request.js/${VERSION} ${universalUserAgent.getUserAgent()}`
  }
});

exports.request = request;
//# sourceMappingURL=index.js.map


/***/ }),

/***/ 761:
/***/ (function(module) {

module.exports = require("zlib");

/***/ }),

/***/ 776:
/***/ (function(module) {

(function (global, factory) {
   true ? module.exports = factory() :
  undefined;
}(this, (function () {
  //     Underscore.js 1.12.1
  //     https://underscorejs.org
  //     (c) 2009-2020 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
  //     Underscore may be freely distributed under the MIT license.

  // Current version.
  var VERSION = '1.12.1';

  // Establish the root object, `window` (`self`) in the browser, `global`
  // on the server, or `this` in some virtual machines. We use `self`
  // instead of `window` for `WebWorker` support.
  var root = typeof self == 'object' && self.self === self && self ||
            typeof global == 'object' && global.global === global && global ||
            Function('return this')() ||
            {};

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype;
  var SymbolProto = typeof Symbol !== 'undefined' ? Symbol.prototype : null;

  // Create quick reference variables for speed access to core prototypes.
  var push = ArrayProto.push,
      slice = ArrayProto.slice,
      toString = ObjProto.toString,
      hasOwnProperty = ObjProto.hasOwnProperty;

  // Modern feature detection.
  var supportsArrayBuffer = typeof ArrayBuffer !== 'undefined',
      supportsDataView = typeof DataView !== 'undefined';

  // All **ECMAScript 5+** native function implementations that we hope to use
  // are declared here.
  var nativeIsArray = Array.isArray,
      nativeKeys = Object.keys,
      nativeCreate = Object.create,
      nativeIsView = supportsArrayBuffer && ArrayBuffer.isView;

  // Create references to these builtin functions because we override them.
  var _isNaN = isNaN,
      _isFinite = isFinite;

  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
  var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
    'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

  // The largest integer that can be represented exactly.
  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;

  // Some functions take a variable number of arguments, or a few expected
  // arguments at the beginning and then a variable number of values to operate
  // on. This helper accumulates all remaining arguments past the function’s
  // argument length (or an explicit `startIndex`), into an array that becomes
  // the last argument. Similar to ES6’s "rest parameter".
  function restArguments(func, startIndex) {
    startIndex = startIndex == null ? func.length - 1 : +startIndex;
    return function() {
      var length = Math.max(arguments.length - startIndex, 0),
          rest = Array(length),
          index = 0;
      for (; index < length; index++) {
        rest[index] = arguments[index + startIndex];
      }
      switch (startIndex) {
        case 0: return func.call(this, rest);
        case 1: return func.call(this, arguments[0], rest);
        case 2: return func.call(this, arguments[0], arguments[1], rest);
      }
      var args = Array(startIndex + 1);
      for (index = 0; index < startIndex; index++) {
        args[index] = arguments[index];
      }
      args[startIndex] = rest;
      return func.apply(this, args);
    };
  }

  // Is a given variable an object?
  function isObject(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  }

  // Is a given value equal to null?
  function isNull(obj) {
    return obj === null;
  }

  // Is a given variable undefined?
  function isUndefined(obj) {
    return obj === void 0;
  }

  // Is a given value a boolean?
  function isBoolean(obj) {
    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
  }

  // Is a given value a DOM element?
  function isElement(obj) {
    return !!(obj && obj.nodeType === 1);
  }

  // Internal function for creating a `toString`-based type tester.
  function tagTester(name) {
    var tag = '[object ' + name + ']';
    return function(obj) {
      return toString.call(obj) === tag;
    };
  }

  var isString = tagTester('String');

  var isNumber = tagTester('Number');

  var isDate = tagTester('Date');

  var isRegExp = tagTester('RegExp');

  var isError = tagTester('Error');

  var isSymbol = tagTester('Symbol');

  var isArrayBuffer = tagTester('ArrayBuffer');

  var isFunction = tagTester('Function');

  // Optimize `isFunction` if appropriate. Work around some `typeof` bugs in old
  // v8, IE 11 (#1621), Safari 8 (#1929), and PhantomJS (#2236).
  var nodelist = root.document && root.document.childNodes;
  if ( true && typeof Int8Array != 'object' && typeof nodelist != 'function') {
    isFunction = function(obj) {
      return typeof obj == 'function' || false;
    };
  }

  var isFunction$1 = isFunction;

  var hasObjectTag = tagTester('Object');

  // In IE 10 - Edge 13, `DataView` has string tag `'[object Object]'`.
  // In IE 11, the most common among them, this problem also applies to
  // `Map`, `WeakMap` and `Set`.
  var hasStringTagBug = (
        supportsDataView && hasObjectTag(new DataView(new ArrayBuffer(8)))
      ),
      isIE11 = (typeof Map !== 'undefined' && hasObjectTag(new Map));

  var isDataView = tagTester('DataView');

  // In IE 10 - Edge 13, we need a different heuristic
  // to determine whether an object is a `DataView`.
  function ie10IsDataView(obj) {
    return obj != null && isFunction$1(obj.getInt8) && isArrayBuffer(obj.buffer);
  }

  var isDataView$1 = (hasStringTagBug ? ie10IsDataView : isDataView);

  // Is a given value an array?
  // Delegates to ECMA5's native `Array.isArray`.
  var isArray = nativeIsArray || tagTester('Array');

  // Internal function to check whether `key` is an own property name of `obj`.
  function has(obj, key) {
    return obj != null && hasOwnProperty.call(obj, key);
  }

  var isArguments = tagTester('Arguments');

  // Define a fallback version of the method in browsers (ahem, IE < 9), where
  // there isn't any inspectable "Arguments" type.
  (function() {
    if (!isArguments(arguments)) {
      isArguments = function(obj) {
        return has(obj, 'callee');
      };
    }
  }());

  var isArguments$1 = isArguments;

  // Is a given object a finite number?
  function isFinite$1(obj) {
    return !isSymbol(obj) && _isFinite(obj) && !isNaN(parseFloat(obj));
  }

  // Is the given value `NaN`?
  function isNaN$1(obj) {
    return isNumber(obj) && _isNaN(obj);
  }

  // Predicate-generating function. Often useful outside of Underscore.
  function constant(value) {
    return function() {
      return value;
    };
  }

  // Common internal logic for `isArrayLike` and `isBufferLike`.
  function createSizePropertyCheck(getSizeProperty) {
    return function(collection) {
      var sizeProperty = getSizeProperty(collection);
      return typeof sizeProperty == 'number' && sizeProperty >= 0 && sizeProperty <= MAX_ARRAY_INDEX;
    }
  }

  // Internal helper to generate a function to obtain property `key` from `obj`.
  function shallowProperty(key) {
    return function(obj) {
      return obj == null ? void 0 : obj[key];
    };
  }

  // Internal helper to obtain the `byteLength` property of an object.
  var getByteLength = shallowProperty('byteLength');

  // Internal helper to determine whether we should spend extensive checks against
  // `ArrayBuffer` et al.
  var isBufferLike = createSizePropertyCheck(getByteLength);

  // Is a given value a typed array?
  var typedArrayPattern = /\[object ((I|Ui)nt(8|16|32)|Float(32|64)|Uint8Clamped|Big(I|Ui)nt64)Array\]/;
  function isTypedArray(obj) {
    // `ArrayBuffer.isView` is the most future-proof, so use it when available.
    // Otherwise, fall back on the above regular expression.
    return nativeIsView ? (nativeIsView(obj) && !isDataView$1(obj)) :
                  isBufferLike(obj) && typedArrayPattern.test(toString.call(obj));
  }

  var isTypedArray$1 = supportsArrayBuffer ? isTypedArray : constant(false);

  // Internal helper to obtain the `length` property of an object.
  var getLength = shallowProperty('length');

  // Internal helper to create a simple lookup structure.
  // `collectNonEnumProps` used to depend on `_.contains`, but this led to
  // circular imports. `emulatedSet` is a one-off solution that only works for
  // arrays of strings.
  function emulatedSet(keys) {
    var hash = {};
    for (var l = keys.length, i = 0; i < l; ++i) hash[keys[i]] = true;
    return {
      contains: function(key) { return hash[key]; },
      push: function(key) {
        hash[key] = true;
        return keys.push(key);
      }
    };
  }

  // Internal helper. Checks `keys` for the presence of keys in IE < 9 that won't
  // be iterated by `for key in ...` and thus missed. Extends `keys` in place if
  // needed.
  function collectNonEnumProps(obj, keys) {
    keys = emulatedSet(keys);
    var nonEnumIdx = nonEnumerableProps.length;
    var constructor = obj.constructor;
    var proto = isFunction$1(constructor) && constructor.prototype || ObjProto;

    // Constructor is a special case.
    var prop = 'constructor';
    if (has(obj, prop) && !keys.contains(prop)) keys.push(prop);

    while (nonEnumIdx--) {
      prop = nonEnumerableProps[nonEnumIdx];
      if (prop in obj && obj[prop] !== proto[prop] && !keys.contains(prop)) {
        keys.push(prop);
      }
    }
  }

  // Retrieve the names of an object's own properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`.
  function keys(obj) {
    if (!isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (has(obj, key)) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  }

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  function isEmpty(obj) {
    if (obj == null) return true;
    // Skip the more expensive `toString`-based type checks if `obj` has no
    // `.length`.
    var length = getLength(obj);
    if (typeof length == 'number' && (
      isArray(obj) || isString(obj) || isArguments$1(obj)
    )) return length === 0;
    return getLength(keys(obj)) === 0;
  }

  // Returns whether an object has a given set of `key:value` pairs.
  function isMatch(object, attrs) {
    var _keys = keys(attrs), length = _keys.length;
    if (object == null) return !length;
    var obj = Object(object);
    for (var i = 0; i < length; i++) {
      var key = _keys[i];
      if (attrs[key] !== obj[key] || !(key in obj)) return false;
    }
    return true;
  }

  // If Underscore is called as a function, it returns a wrapped object that can
  // be used OO-style. This wrapper holds altered versions of all functions added
  // through `_.mixin`. Wrapped objects may be chained.
  function _(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  }

  _.VERSION = VERSION;

  // Extracts the result from a wrapped and chained object.
  _.prototype.value = function() {
    return this._wrapped;
  };

  // Provide unwrapping proxies for some methods used in engine operations
  // such as arithmetic and JSON stringification.
  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

  _.prototype.toString = function() {
    return String(this._wrapped);
  };

  // Internal function to wrap or shallow-copy an ArrayBuffer,
  // typed array or DataView to a new view, reusing the buffer.
  function toBufferView(bufferSource) {
    return new Uint8Array(
      bufferSource.buffer || bufferSource,
      bufferSource.byteOffset || 0,
      getByteLength(bufferSource)
    );
  }

  // We use this string twice, so give it a name for minification.
  var tagDataView = '[object DataView]';

  // Internal recursive comparison function for `_.isEqual`.
  function eq(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](https://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a === 1 / b;
    // `null` or `undefined` only equal to itself (strict comparison).
    if (a == null || b == null) return false;
    // `NaN`s are equivalent, but non-reflexive.
    if (a !== a) return b !== b;
    // Exhaust primitive checks
    var type = typeof a;
    if (type !== 'function' && type !== 'object' && typeof b != 'object') return false;
    return deepEq(a, b, aStack, bStack);
  }

  // Internal recursive comparison function for `_.isEqual`.
  function deepEq(a, b, aStack, bStack) {
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className !== toString.call(b)) return false;
    // Work around a bug in IE 10 - Edge 13.
    if (hasStringTagBug && className == '[object Object]' && isDataView$1(a)) {
      if (!isDataView$1(b)) return false;
      className = tagDataView;
    }
    switch (className) {
      // These types are compared by value.
      case '[object RegExp]':
        // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return '' + a === '' + b;
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive.
        // Object(NaN) is equivalent to NaN.
        if (+a !== +a) return +b !== +b;
        // An `egal` comparison is performed for other numeric values.
        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a === +b;
      case '[object Symbol]':
        return SymbolProto.valueOf.call(a) === SymbolProto.valueOf.call(b);
      case '[object ArrayBuffer]':
      case tagDataView:
        // Coerce to typed array so we can fall through.
        return deepEq(toBufferView(a), toBufferView(b), aStack, bStack);
    }

    var areArrays = className === '[object Array]';
    if (!areArrays && isTypedArray$1(a)) {
        var byteLength = getByteLength(a);
        if (byteLength !== getByteLength(b)) return false;
        if (a.buffer === b.buffer && a.byteOffset === b.byteOffset) return true;
        areArrays = true;
    }
    if (!areArrays) {
      if (typeof a != 'object' || typeof b != 'object') return false;

      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
      // from different frames are.
      var aCtor = a.constructor, bCtor = b.constructor;
      if (aCtor !== bCtor && !(isFunction$1(aCtor) && aCtor instanceof aCtor &&
                               isFunction$1(bCtor) && bCtor instanceof bCtor)
                          && ('constructor' in a && 'constructor' in b)) {
        return false;
      }
    }
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

    // Initializing stack of traversed objects.
    // It's done here since we only need them for objects and arrays comparison.
    aStack = aStack || [];
    bStack = bStack || [];
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] === a) return bStack[length] === b;
    }

    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);

    // Recursively compare objects and arrays.
    if (areArrays) {
      // Compare array lengths to determine if a deep comparison is necessary.
      length = a.length;
      if (length !== b.length) return false;
      // Deep compare the contents, ignoring non-numeric properties.
      while (length--) {
        if (!eq(a[length], b[length], aStack, bStack)) return false;
      }
    } else {
      // Deep compare objects.
      var _keys = keys(a), key;
      length = _keys.length;
      // Ensure that both objects contain the same number of properties before comparing deep equality.
      if (keys(b).length !== length) return false;
      while (length--) {
        // Deep compare each member
        key = _keys[length];
        if (!(has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return true;
  }

  // Perform a deep comparison to check if two objects are equal.
  function isEqual(a, b) {
    return eq(a, b);
  }

  // Retrieve all the enumerable property names of an object.
  function allKeys(obj) {
    if (!isObject(obj)) return [];
    var keys = [];
    for (var key in obj) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  }

  // Since the regular `Object.prototype.toString` type tests don't work for
  // some types in IE 11, we use a fingerprinting heuristic instead, based
  // on the methods. It's not great, but it's the best we got.
  // The fingerprint method lists are defined below.
  function ie11fingerprint(methods) {
    var length = getLength(methods);
    return function(obj) {
      if (obj == null) return false;
      // `Map`, `WeakMap` and `Set` have no enumerable keys.
      var keys = allKeys(obj);
      if (getLength(keys)) return false;
      for (var i = 0; i < length; i++) {
        if (!isFunction$1(obj[methods[i]])) return false;
      }
      // If we are testing against `WeakMap`, we need to ensure that
      // `obj` doesn't have a `forEach` method in order to distinguish
      // it from a regular `Map`.
      return methods !== weakMapMethods || !isFunction$1(obj[forEachName]);
    };
  }

  // In the interest of compact minification, we write
  // each string in the fingerprints only once.
  var forEachName = 'forEach',
      hasName = 'has',
      commonInit = ['clear', 'delete'],
      mapTail = ['get', hasName, 'set'];

  // `Map`, `WeakMap` and `Set` each have slightly different
  // combinations of the above sublists.
  var mapMethods = commonInit.concat(forEachName, mapTail),
      weakMapMethods = commonInit.concat(mapTail),
      setMethods = ['add'].concat(commonInit, forEachName, hasName);

  var isMap = isIE11 ? ie11fingerprint(mapMethods) : tagTester('Map');

  var isWeakMap = isIE11 ? ie11fingerprint(weakMapMethods) : tagTester('WeakMap');

  var isSet = isIE11 ? ie11fingerprint(setMethods) : tagTester('Set');

  var isWeakSet = tagTester('WeakSet');

  // Retrieve the values of an object's properties.
  function values(obj) {
    var _keys = keys(obj);
    var length = _keys.length;
    var values = Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[_keys[i]];
    }
    return values;
  }

  // Convert an object into a list of `[key, value]` pairs.
  // The opposite of `_.object` with one argument.
  function pairs(obj) {
    var _keys = keys(obj);
    var length = _keys.length;
    var pairs = Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [_keys[i], obj[_keys[i]]];
    }
    return pairs;
  }

  // Invert the keys and values of an object. The values must be serializable.
  function invert(obj) {
    var result = {};
    var _keys = keys(obj);
    for (var i = 0, length = _keys.length; i < length; i++) {
      result[obj[_keys[i]]] = _keys[i];
    }
    return result;
  }

  // Return a sorted list of the function names available on the object.
  function functions(obj) {
    var names = [];
    for (var key in obj) {
      if (isFunction$1(obj[key])) names.push(key);
    }
    return names.sort();
  }

  // An internal function for creating assigner functions.
  function createAssigner(keysFunc, defaults) {
    return function(obj) {
      var length = arguments.length;
      if (defaults) obj = Object(obj);
      if (length < 2 || obj == null) return obj;
      for (var index = 1; index < length; index++) {
        var source = arguments[index],
            keys = keysFunc(source),
            l = keys.length;
        for (var i = 0; i < l; i++) {
          var key = keys[i];
          if (!defaults || obj[key] === void 0) obj[key] = source[key];
        }
      }
      return obj;
    };
  }

  // Extend a given object with all the properties in passed-in object(s).
  var extend = createAssigner(allKeys);

  // Assigns a given object with all the own properties in the passed-in
  // object(s).
  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
  var extendOwn = createAssigner(keys);

  // Fill in a given object with default properties.
  var defaults = createAssigner(allKeys, true);

  // Create a naked function reference for surrogate-prototype-swapping.
  function ctor() {
    return function(){};
  }

  // An internal function for creating a new object that inherits from another.
  function baseCreate(prototype) {
    if (!isObject(prototype)) return {};
    if (nativeCreate) return nativeCreate(prototype);
    var Ctor = ctor();
    Ctor.prototype = prototype;
    var result = new Ctor;
    Ctor.prototype = null;
    return result;
  }

  // Creates an object that inherits from the given prototype object.
  // If additional properties are provided then they will be added to the
  // created object.
  function create(prototype, props) {
    var result = baseCreate(prototype);
    if (props) extendOwn(result, props);
    return result;
  }

  // Create a (shallow-cloned) duplicate of an object.
  function clone(obj) {
    if (!isObject(obj)) return obj;
    return isArray(obj) ? obj.slice() : extend({}, obj);
  }

  // Invokes `interceptor` with the `obj` and then returns `obj`.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  function tap(obj, interceptor) {
    interceptor(obj);
    return obj;
  }

  // Normalize a (deep) property `path` to array.
  // Like `_.iteratee`, this function can be customized.
  function toPath(path) {
    return isArray(path) ? path : [path];
  }
  _.toPath = toPath;

  // Internal wrapper for `_.toPath` to enable minification.
  // Similar to `cb` for `_.iteratee`.
  function toPath$1(path) {
    return _.toPath(path);
  }

  // Internal function to obtain a nested property in `obj` along `path`.
  function deepGet(obj, path) {
    var length = path.length;
    for (var i = 0; i < length; i++) {
      if (obj == null) return void 0;
      obj = obj[path[i]];
    }
    return length ? obj : void 0;
  }

  // Get the value of the (deep) property on `path` from `object`.
  // If any property in `path` does not exist or if the value is
  // `undefined`, return `defaultValue` instead.
  // The `path` is normalized through `_.toPath`.
  function get(object, path, defaultValue) {
    var value = deepGet(object, toPath$1(path));
    return isUndefined(value) ? defaultValue : value;
  }

  // Shortcut function for checking if an object has a given property directly on
  // itself (in other words, not on a prototype). Unlike the internal `has`
  // function, this public version can also traverse nested properties.
  function has$1(obj, path) {
    path = toPath$1(path);
    var length = path.length;
    for (var i = 0; i < length; i++) {
      var key = path[i];
      if (!has(obj, key)) return false;
      obj = obj[key];
    }
    return !!length;
  }

  // Keep the identity function around for default iteratees.
  function identity(value) {
    return value;
  }

  // Returns a predicate for checking whether an object has a given set of
  // `key:value` pairs.
  function matcher(attrs) {
    attrs = extendOwn({}, attrs);
    return function(obj) {
      return isMatch(obj, attrs);
    };
  }

  // Creates a function that, when passed an object, will traverse that object’s
  // properties down the given `path`, specified as an array of keys or indices.
  function property(path) {
    path = toPath$1(path);
    return function(obj) {
      return deepGet(obj, path);
    };
  }

  // Internal function that returns an efficient (for current engines) version
  // of the passed-in callback, to be repeatedly applied in other Underscore
  // functions.
  function optimizeCb(func, context, argCount) {
    if (context === void 0) return func;
    switch (argCount == null ? 3 : argCount) {
      case 1: return function(value) {
        return func.call(context, value);
      };
      // The 2-argument case is omitted because we’re not using it.
      case 3: return function(value, index, collection) {
        return func.call(context, value, index, collection);
      };
      case 4: return function(accumulator, value, index, collection) {
        return func.call(context, accumulator, value, index, collection);
      };
    }
    return function() {
      return func.apply(context, arguments);
    };
  }

  // An internal function to generate callbacks that can be applied to each
  // element in a collection, returning the desired result — either `_.identity`,
  // an arbitrary callback, a property matcher, or a property accessor.
  function baseIteratee(value, context, argCount) {
    if (value == null) return identity;
    if (isFunction$1(value)) return optimizeCb(value, context, argCount);
    if (isObject(value) && !isArray(value)) return matcher(value);
    return property(value);
  }

  // External wrapper for our callback generator. Users may customize
  // `_.iteratee` if they want additional predicate/iteratee shorthand styles.
  // This abstraction hides the internal-only `argCount` argument.
  function iteratee(value, context) {
    return baseIteratee(value, context, Infinity);
  }
  _.iteratee = iteratee;

  // The function we call internally to generate a callback. It invokes
  // `_.iteratee` if overridden, otherwise `baseIteratee`.
  function cb(value, context, argCount) {
    if (_.iteratee !== iteratee) return _.iteratee(value, context);
    return baseIteratee(value, context, argCount);
  }

  // Returns the results of applying the `iteratee` to each element of `obj`.
  // In contrast to `_.map` it returns an object.
  function mapObject(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var _keys = keys(obj),
        length = _keys.length,
        results = {};
    for (var index = 0; index < length; index++) {
      var currentKey = _keys[index];
      results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  }

  // Predicate-generating function. Often useful outside of Underscore.
  function noop(){}

  // Generates a function for a given object that returns a given property.
  function propertyOf(obj) {
    if (obj == null) return noop;
    return function(path) {
      return get(obj, path);
    };
  }

  // Run a function **n** times.
  function times(n, iteratee, context) {
    var accum = Array(Math.max(0, n));
    iteratee = optimizeCb(iteratee, context, 1);
    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
    return accum;
  }

  // Return a random integer between `min` and `max` (inclusive).
  function random(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  }

  // A (possibly faster) way to get the current timestamp as an integer.
  var now = Date.now || function() {
    return new Date().getTime();
  };

  // Internal helper to generate functions for escaping and unescaping strings
  // to/from HTML interpolation.
  function createEscaper(map) {
    var escaper = function(match) {
      return map[match];
    };
    // Regexes for identifying a key that needs to be escaped.
    var source = '(?:' + keys(map).join('|') + ')';
    var testRegexp = RegExp(source);
    var replaceRegexp = RegExp(source, 'g');
    return function(string) {
      string = string == null ? '' : '' + string;
      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
    };
  }

  // Internal list of HTML entities for escaping.
  var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
  };

  // Function for escaping strings to HTML interpolation.
  var _escape = createEscaper(escapeMap);

  // Internal list of HTML entities for unescaping.
  var unescapeMap = invert(escapeMap);

  // Function for unescaping strings from HTML interpolation.
  var _unescape = createEscaper(unescapeMap);

  // By default, Underscore uses ERB-style template delimiters. Change the
  // following template settings to use alternative delimiters.
  var templateSettings = _.templateSettings = {
    evaluate: /<%([\s\S]+?)%>/g,
    interpolate: /<%=([\s\S]+?)%>/g,
    escape: /<%-([\s\S]+?)%>/g
  };

  // When customizing `_.templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'": "'",
    '\\': '\\',
    '\r': 'r',
    '\n': 'n',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escapeRegExp = /\\|'|\r|\n|\u2028|\u2029/g;

  function escapeChar(match) {
    return '\\' + escapes[match];
  }

  var bareIdentifier = /^\s*(\w|\$)+\s*$/;

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  // NB: `oldSettings` only exists for backwards compatibility.
  function template(text, settings, oldSettings) {
    if (!settings && oldSettings) settings = oldSettings;
    settings = defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset).replace(escapeRegExp, escapeChar);
      index = offset + match.length;

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      } else if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      } else if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }

      // Adobe VMs need the match returned to produce the correct offset.
      return match;
    });
    source += "';\n";

    var argument = settings.variable;
    if (argument) {
      if (!bareIdentifier.test(argument)) throw new Error(argument);
    } else {
      // If a variable is not specified, place data values in local scope.
      source = 'with(obj||{}){\n' + source + '}\n';
      argument = 'obj';
    }

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + 'return __p;\n';

    var render;
    try {
      render = new Function(argument, '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled source as a convenience for precompilation.
    template.source = 'function(' + argument + '){\n' + source + '}';

    return template;
  }

  // Traverses the children of `obj` along `path`. If a child is a function, it
  // is invoked with its parent as context. Returns the value of the final
  // child, or `fallback` if any child is undefined.
  function result(obj, path, fallback) {
    path = toPath$1(path);
    var length = path.length;
    if (!length) {
      return isFunction$1(fallback) ? fallback.call(obj) : fallback;
    }
    for (var i = 0; i < length; i++) {
      var prop = obj == null ? void 0 : obj[path[i]];
      if (prop === void 0) {
        prop = fallback;
        i = length; // Ensure we don't continue iterating.
      }
      obj = isFunction$1(prop) ? prop.call(obj) : prop;
    }
    return obj;
  }

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  function uniqueId(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  }

  // Start chaining a wrapped Underscore object.
  function chain(obj) {
    var instance = _(obj);
    instance._chain = true;
    return instance;
  }

  // Internal function to execute `sourceFunc` bound to `context` with optional
  // `args`. Determines whether to execute a function as a constructor or as a
  // normal function.
  function executeBound(sourceFunc, boundFunc, context, callingContext, args) {
    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
    var self = baseCreate(sourceFunc.prototype);
    var result = sourceFunc.apply(self, args);
    if (isObject(result)) return result;
    return self;
  }

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. `_` acts
  // as a placeholder by default, allowing any combination of arguments to be
  // pre-filled. Set `_.partial.placeholder` for a custom placeholder argument.
  var partial = restArguments(function(func, boundArgs) {
    var placeholder = partial.placeholder;
    var bound = function() {
      var position = 0, length = boundArgs.length;
      var args = Array(length);
      for (var i = 0; i < length; i++) {
        args[i] = boundArgs[i] === placeholder ? arguments[position++] : boundArgs[i];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return executeBound(func, bound, this, this, args);
    };
    return bound;
  });

  partial.placeholder = _;

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally).
  var bind = restArguments(function(func, context, args) {
    if (!isFunction$1(func)) throw new TypeError('Bind must be called on a function');
    var bound = restArguments(function(callArgs) {
      return executeBound(func, bound, context, this, args.concat(callArgs));
    });
    return bound;
  });

  // Internal helper for collection methods to determine whether a collection
  // should be iterated as an array or as an object.
  // Related: https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
  // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
  var isArrayLike = createSizePropertyCheck(getLength);

  // Internal implementation of a recursive `flatten` function.
  function flatten(input, depth, strict, output) {
    output = output || [];
    if (!depth && depth !== 0) {
      depth = Infinity;
    } else if (depth <= 0) {
      return output.concat(input);
    }
    var idx = output.length;
    for (var i = 0, length = getLength(input); i < length; i++) {
      var value = input[i];
      if (isArrayLike(value) && (isArray(value) || isArguments$1(value))) {
        // Flatten current level of array or arguments object.
        if (depth > 1) {
          flatten(value, depth - 1, strict, output);
          idx = output.length;
        } else {
          var j = 0, len = value.length;
          while (j < len) output[idx++] = value[j++];
        }
      } else if (!strict) {
        output[idx++] = value;
      }
    }
    return output;
  }

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  var bindAll = restArguments(function(obj, keys) {
    keys = flatten(keys, false, false);
    var index = keys.length;
    if (index < 1) throw new Error('bindAll must be passed function names');
    while (index--) {
      var key = keys[index];
      obj[key] = bind(obj[key], obj);
    }
    return obj;
  });

  // Memoize an expensive function by storing its results.
  function memoize(func, hasher) {
    var memoize = function(key) {
      var cache = memoize.cache;
      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
      if (!has(cache, address)) cache[address] = func.apply(this, arguments);
      return cache[address];
    };
    memoize.cache = {};
    return memoize;
  }

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  var delay = restArguments(function(func, wait, args) {
    return setTimeout(function() {
      return func.apply(null, args);
    }, wait);
  });

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  var defer = partial(delay, _, 1);

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  function throttle(func, wait, options) {
    var timeout, context, args, result;
    var previous = 0;
    if (!options) options = {};

    var later = function() {
      previous = options.leading === false ? 0 : now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };

    var throttled = function() {
      var _now = now();
      if (!previous && options.leading === false) previous = _now;
      var remaining = wait - (_now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = _now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };

    throttled.cancel = function() {
      clearTimeout(timeout);
      previous = 0;
      timeout = context = args = null;
    };

    return throttled;
  }

  // When a sequence of calls of the returned function ends, the argument
  // function is triggered. The end of a sequence is defined by the `wait`
  // parameter. If `immediate` is passed, the argument function will be
  // triggered at the beginning of the sequence instead of at the end.
  function debounce(func, wait, immediate) {
    var timeout, previous, args, result, context;

    var later = function() {
      var passed = now() - previous;
      if (wait > passed) {
        timeout = setTimeout(later, wait - passed);
      } else {
        timeout = null;
        if (!immediate) result = func.apply(context, args);
        // This check is needed because `func` can recursively invoke `debounced`.
        if (!timeout) args = context = null;
      }
    };

    var debounced = restArguments(function(_args) {
      context = this;
      args = _args;
      previous = now();
      if (!timeout) {
        timeout = setTimeout(later, wait);
        if (immediate) result = func.apply(context, args);
      }
      return result;
    });

    debounced.cancel = function() {
      clearTimeout(timeout);
      timeout = args = context = null;
    };

    return debounced;
  }

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  function wrap(func, wrapper) {
    return partial(wrapper, func);
  }

  // Returns a negated version of the passed-in predicate.
  function negate(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    };
  }

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  function compose() {
    var args = arguments;
    var start = args.length - 1;
    return function() {
      var i = start;
      var result = args[start].apply(this, arguments);
      while (i--) result = args[i].call(this, result);
      return result;
    };
  }

  // Returns a function that will only be executed on and after the Nth call.
  function after(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  }

  // Returns a function that will only be executed up to (but not including) the
  // Nth call.
  function before(times, func) {
    var memo;
    return function() {
      if (--times > 0) {
        memo = func.apply(this, arguments);
      }
      if (times <= 1) func = null;
      return memo;
    };
  }

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  var once = partial(before, 2);

  // Returns the first key on an object that passes a truth test.
  function findKey(obj, predicate, context) {
    predicate = cb(predicate, context);
    var _keys = keys(obj), key;
    for (var i = 0, length = _keys.length; i < length; i++) {
      key = _keys[i];
      if (predicate(obj[key], key, obj)) return key;
    }
  }

  // Internal function to generate `_.findIndex` and `_.findLastIndex`.
  function createPredicateIndexFinder(dir) {
    return function(array, predicate, context) {
      predicate = cb(predicate, context);
      var length = getLength(array);
      var index = dir > 0 ? 0 : length - 1;
      for (; index >= 0 && index < length; index += dir) {
        if (predicate(array[index], index, array)) return index;
      }
      return -1;
    };
  }

  // Returns the first index on an array-like that passes a truth test.
  var findIndex = createPredicateIndexFinder(1);

  // Returns the last index on an array-like that passes a truth test.
  var findLastIndex = createPredicateIndexFinder(-1);

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  function sortedIndex(array, obj, iteratee, context) {
    iteratee = cb(iteratee, context, 1);
    var value = iteratee(obj);
    var low = 0, high = getLength(array);
    while (low < high) {
      var mid = Math.floor((low + high) / 2);
      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
    }
    return low;
  }

  // Internal function to generate the `_.indexOf` and `_.lastIndexOf` functions.
  function createIndexFinder(dir, predicateFind, sortedIndex) {
    return function(array, item, idx) {
      var i = 0, length = getLength(array);
      if (typeof idx == 'number') {
        if (dir > 0) {
          i = idx >= 0 ? idx : Math.max(idx + length, i);
        } else {
          length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
        }
      } else if (sortedIndex && idx && length) {
        idx = sortedIndex(array, item);
        return array[idx] === item ? idx : -1;
      }
      if (item !== item) {
        idx = predicateFind(slice.call(array, i, length), isNaN$1);
        return idx >= 0 ? idx + i : -1;
      }
      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
        if (array[idx] === item) return idx;
      }
      return -1;
    };
  }

  // Return the position of the first occurrence of an item in an array,
  // or -1 if the item is not included in the array.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  var indexOf = createIndexFinder(1, findIndex, sortedIndex);

  // Return the position of the last occurrence of an item in an array,
  // or -1 if the item is not included in the array.
  var lastIndexOf = createIndexFinder(-1, findLastIndex);

  // Return the first value which passes a truth test.
  function find(obj, predicate, context) {
    var keyFinder = isArrayLike(obj) ? findIndex : findKey;
    var key = keyFinder(obj, predicate, context);
    if (key !== void 0 && key !== -1) return obj[key];
  }

  // Convenience version of a common use case of `_.find`: getting the first
  // object containing specific `key:value` pairs.
  function findWhere(obj, attrs) {
    return find(obj, matcher(attrs));
  }

  // The cornerstone for collection functions, an `each`
  // implementation, aka `forEach`.
  // Handles raw objects in addition to array-likes. Treats all
  // sparse array-likes as if they were dense.
  function each(obj, iteratee, context) {
    iteratee = optimizeCb(iteratee, context);
    var i, length;
    if (isArrayLike(obj)) {
      for (i = 0, length = obj.length; i < length; i++) {
        iteratee(obj[i], i, obj);
      }
    } else {
      var _keys = keys(obj);
      for (i = 0, length = _keys.length; i < length; i++) {
        iteratee(obj[_keys[i]], _keys[i], obj);
      }
    }
    return obj;
  }

  // Return the results of applying the iteratee to each element.
  function map(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var _keys = !isArrayLike(obj) && keys(obj),
        length = (_keys || obj).length,
        results = Array(length);
    for (var index = 0; index < length; index++) {
      var currentKey = _keys ? _keys[index] : index;
      results[index] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  }

  // Internal helper to create a reducing function, iterating left or right.
  function createReduce(dir) {
    // Wrap code that reassigns argument variables in a separate function than
    // the one that accesses `arguments.length` to avoid a perf hit. (#1991)
    var reducer = function(obj, iteratee, memo, initial) {
      var _keys = !isArrayLike(obj) && keys(obj),
          length = (_keys || obj).length,
          index = dir > 0 ? 0 : length - 1;
      if (!initial) {
        memo = obj[_keys ? _keys[index] : index];
        index += dir;
      }
      for (; index >= 0 && index < length; index += dir) {
        var currentKey = _keys ? _keys[index] : index;
        memo = iteratee(memo, obj[currentKey], currentKey, obj);
      }
      return memo;
    };

    return function(obj, iteratee, memo, context) {
      var initial = arguments.length >= 3;
      return reducer(obj, optimizeCb(iteratee, context, 4), memo, initial);
    };
  }

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`.
  var reduce = createReduce(1);

  // The right-associative version of reduce, also known as `foldr`.
  var reduceRight = createReduce(-1);

  // Return all the elements that pass a truth test.
  function filter(obj, predicate, context) {
    var results = [];
    predicate = cb(predicate, context);
    each(obj, function(value, index, list) {
      if (predicate(value, index, list)) results.push(value);
    });
    return results;
  }

  // Return all the elements for which a truth test fails.
  function reject(obj, predicate, context) {
    return filter(obj, negate(cb(predicate)), context);
  }

  // Determine whether all of the elements pass a truth test.
  function every(obj, predicate, context) {
    predicate = cb(predicate, context);
    var _keys = !isArrayLike(obj) && keys(obj),
        length = (_keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = _keys ? _keys[index] : index;
      if (!predicate(obj[currentKey], currentKey, obj)) return false;
    }
    return true;
  }

  // Determine if at least one element in the object passes a truth test.
  function some(obj, predicate, context) {
    predicate = cb(predicate, context);
    var _keys = !isArrayLike(obj) && keys(obj),
        length = (_keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = _keys ? _keys[index] : index;
      if (predicate(obj[currentKey], currentKey, obj)) return true;
    }
    return false;
  }

  // Determine if the array or object contains a given item (using `===`).
  function contains(obj, item, fromIndex, guard) {
    if (!isArrayLike(obj)) obj = values(obj);
    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
    return indexOf(obj, item, fromIndex) >= 0;
  }

  // Invoke a method (with arguments) on every item in a collection.
  var invoke = restArguments(function(obj, path, args) {
    var contextPath, func;
    if (isFunction$1(path)) {
      func = path;
    } else {
      path = toPath$1(path);
      contextPath = path.slice(0, -1);
      path = path[path.length - 1];
    }
    return map(obj, function(context) {
      var method = func;
      if (!method) {
        if (contextPath && contextPath.length) {
          context = deepGet(context, contextPath);
        }
        if (context == null) return void 0;
        method = context[path];
      }
      return method == null ? method : method.apply(context, args);
    });
  });

  // Convenience version of a common use case of `_.map`: fetching a property.
  function pluck(obj, key) {
    return map(obj, property(key));
  }

  // Convenience version of a common use case of `_.filter`: selecting only
  // objects containing specific `key:value` pairs.
  function where(obj, attrs) {
    return filter(obj, matcher(attrs));
  }

  // Return the maximum element (or element-based computation).
  function max(obj, iteratee, context) {
    var result = -Infinity, lastComputed = -Infinity,
        value, computed;
    if (iteratee == null || typeof iteratee == 'number' && typeof obj[0] != 'object' && obj != null) {
      obj = isArrayLike(obj) ? obj : values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value != null && value > result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      each(obj, function(v, index, list) {
        computed = iteratee(v, index, list);
        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
          result = v;
          lastComputed = computed;
        }
      });
    }
    return result;
  }

  // Return the minimum element (or element-based computation).
  function min(obj, iteratee, context) {
    var result = Infinity, lastComputed = Infinity,
        value, computed;
    if (iteratee == null || typeof iteratee == 'number' && typeof obj[0] != 'object' && obj != null) {
      obj = isArrayLike(obj) ? obj : values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value != null && value < result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      each(obj, function(v, index, list) {
        computed = iteratee(v, index, list);
        if (computed < lastComputed || computed === Infinity && result === Infinity) {
          result = v;
          lastComputed = computed;
        }
      });
    }
    return result;
  }

  // Sample **n** random values from a collection using the modern version of the
  // [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `_.map`.
  function sample(obj, n, guard) {
    if (n == null || guard) {
      if (!isArrayLike(obj)) obj = values(obj);
      return obj[random(obj.length - 1)];
    }
    var sample = isArrayLike(obj) ? clone(obj) : values(obj);
    var length = getLength(sample);
    n = Math.max(Math.min(n, length), 0);
    var last = length - 1;
    for (var index = 0; index < n; index++) {
      var rand = random(index, last);
      var temp = sample[index];
      sample[index] = sample[rand];
      sample[rand] = temp;
    }
    return sample.slice(0, n);
  }

  // Shuffle a collection.
  function shuffle(obj) {
    return sample(obj, Infinity);
  }

  // Sort the object's values by a criterion produced by an iteratee.
  function sortBy(obj, iteratee, context) {
    var index = 0;
    iteratee = cb(iteratee, context);
    return pluck(map(obj, function(value, key, list) {
      return {
        value: value,
        index: index++,
        criteria: iteratee(value, key, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  }

  // An internal function used for aggregate "group by" operations.
  function group(behavior, partition) {
    return function(obj, iteratee, context) {
      var result = partition ? [[], []] : {};
      iteratee = cb(iteratee, context);
      each(obj, function(value, index) {
        var key = iteratee(value, index, obj);
        behavior(result, value, key);
      });
      return result;
    };
  }

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  var groupBy = group(function(result, value, key) {
    if (has(result, key)) result[key].push(value); else result[key] = [value];
  });

  // Indexes the object's values by a criterion, similar to `_.groupBy`, but for
  // when you know that your index values will be unique.
  var indexBy = group(function(result, value, key) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  var countBy = group(function(result, value, key) {
    if (has(result, key)) result[key]++; else result[key] = 1;
  });

  // Split a collection into two arrays: one whose elements all pass the given
  // truth test, and one whose elements all do not pass the truth test.
  var partition = group(function(result, value, pass) {
    result[pass ? 0 : 1].push(value);
  }, true);

  // Safely create a real, live array from anything iterable.
  var reStrSymbol = /[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;
  function toArray(obj) {
    if (!obj) return [];
    if (isArray(obj)) return slice.call(obj);
    if (isString(obj)) {
      // Keep surrogate pair characters together.
      return obj.match(reStrSymbol);
    }
    if (isArrayLike(obj)) return map(obj, identity);
    return values(obj);
  }

  // Return the number of elements in a collection.
  function size(obj) {
    if (obj == null) return 0;
    return isArrayLike(obj) ? obj.length : keys(obj).length;
  }

  // Internal `_.pick` helper function to determine whether `key` is an enumerable
  // property name of `obj`.
  function keyInObj(value, key, obj) {
    return key in obj;
  }

  // Return a copy of the object only containing the allowed properties.
  var pick = restArguments(function(obj, keys) {
    var result = {}, iteratee = keys[0];
    if (obj == null) return result;
    if (isFunction$1(iteratee)) {
      if (keys.length > 1) iteratee = optimizeCb(iteratee, keys[1]);
      keys = allKeys(obj);
    } else {
      iteratee = keyInObj;
      keys = flatten(keys, false, false);
      obj = Object(obj);
    }
    for (var i = 0, length = keys.length; i < length; i++) {
      var key = keys[i];
      var value = obj[key];
      if (iteratee(value, key, obj)) result[key] = value;
    }
    return result;
  });

  // Return a copy of the object without the disallowed properties.
  var omit = restArguments(function(obj, keys) {
    var iteratee = keys[0], context;
    if (isFunction$1(iteratee)) {
      iteratee = negate(iteratee);
      if (keys.length > 1) context = keys[1];
    } else {
      keys = map(flatten(keys, false, false), String);
      iteratee = function(value, key) {
        return !contains(keys, key);
      };
    }
    return pick(obj, iteratee, context);
  });

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N.
  function initial(array, n, guard) {
    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
  }

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. The **guard** check allows it to work with `_.map`.
  function first(array, n, guard) {
    if (array == null || array.length < 1) return n == null || guard ? void 0 : [];
    if (n == null || guard) return array[0];
    return initial(array, array.length - n);
  }

  // Returns everything but the first entry of the `array`. Especially useful on
  // the `arguments` object. Passing an **n** will return the rest N values in the
  // `array`.
  function rest(array, n, guard) {
    return slice.call(array, n == null || guard ? 1 : n);
  }

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array.
  function last(array, n, guard) {
    if (array == null || array.length < 1) return n == null || guard ? void 0 : [];
    if (n == null || guard) return array[array.length - 1];
    return rest(array, Math.max(0, array.length - n));
  }

  // Trim out all falsy values from an array.
  function compact(array) {
    return filter(array, Boolean);
  }

  // Flatten out an array, either recursively (by default), or up to `depth`.
  // Passing `true` or `false` as `depth` means `1` or `Infinity`, respectively.
  function flatten$1(array, depth) {
    return flatten(array, depth, false);
  }

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  var difference = restArguments(function(array, rest) {
    rest = flatten(rest, true, true);
    return filter(array, function(value){
      return !contains(rest, value);
    });
  });

  // Return a version of the array that does not contain the specified value(s).
  var without = restArguments(function(array, otherArrays) {
    return difference(array, otherArrays);
  });

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // The faster algorithm will not work with an iteratee if the iteratee
  // is not a one-to-one function, so providing an iteratee will disable
  // the faster algorithm.
  function uniq(array, isSorted, iteratee, context) {
    if (!isBoolean(isSorted)) {
      context = iteratee;
      iteratee = isSorted;
      isSorted = false;
    }
    if (iteratee != null) iteratee = cb(iteratee, context);
    var result = [];
    var seen = [];
    for (var i = 0, length = getLength(array); i < length; i++) {
      var value = array[i],
          computed = iteratee ? iteratee(value, i, array) : value;
      if (isSorted && !iteratee) {
        if (!i || seen !== computed) result.push(value);
        seen = computed;
      } else if (iteratee) {
        if (!contains(seen, computed)) {
          seen.push(computed);
          result.push(value);
        }
      } else if (!contains(result, value)) {
        result.push(value);
      }
    }
    return result;
  }

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  var union = restArguments(function(arrays) {
    return uniq(flatten(arrays, true, true));
  });

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  function intersection(array) {
    var result = [];
    var argsLength = arguments.length;
    for (var i = 0, length = getLength(array); i < length; i++) {
      var item = array[i];
      if (contains(result, item)) continue;
      var j;
      for (j = 1; j < argsLength; j++) {
        if (!contains(arguments[j], item)) break;
      }
      if (j === argsLength) result.push(item);
    }
    return result;
  }

  // Complement of zip. Unzip accepts an array of arrays and groups
  // each array's elements on shared indices.
  function unzip(array) {
    var length = array && max(array, getLength).length || 0;
    var result = Array(length);

    for (var index = 0; index < length; index++) {
      result[index] = pluck(array, index);
    }
    return result;
  }

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  var zip = restArguments(unzip);

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values. Passing by pairs is the reverse of `_.pairs`.
  function object(list, values) {
    var result = {};
    for (var i = 0, length = getLength(list); i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  }

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](https://docs.python.org/library/functions.html#range).
  function range(start, stop, step) {
    if (stop == null) {
      stop = start || 0;
      start = 0;
    }
    if (!step) {
      step = stop < start ? -1 : 1;
    }

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var range = Array(length);

    for (var idx = 0; idx < length; idx++, start += step) {
      range[idx] = start;
    }

    return range;
  }

  // Chunk a single array into multiple arrays, each containing `count` or fewer
  // items.
  function chunk(array, count) {
    if (count == null || count < 1) return [];
    var result = [];
    var i = 0, length = array.length;
    while (i < length) {
      result.push(slice.call(array, i, i += count));
    }
    return result;
  }

  // Helper function to continue chaining intermediate results.
  function chainResult(instance, obj) {
    return instance._chain ? _(obj).chain() : obj;
  }

  // Add your own custom functions to the Underscore object.
  function mixin(obj) {
    each(functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return chainResult(this, func.apply(_, args));
      };
    });
    return _;
  }

  // Add all mutator `Array` functions to the wrapper.
  each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      if (obj != null) {
        method.apply(obj, arguments);
        if ((name === 'shift' || name === 'splice') && obj.length === 0) {
          delete obj[0];
        }
      }
      return chainResult(this, obj);
    };
  });

  // Add all accessor `Array` functions to the wrapper.
  each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      if (obj != null) obj = method.apply(obj, arguments);
      return chainResult(this, obj);
    };
  });

  // Named Exports

  var allExports = {
    __proto__: null,
    VERSION: VERSION,
    restArguments: restArguments,
    isObject: isObject,
    isNull: isNull,
    isUndefined: isUndefined,
    isBoolean: isBoolean,
    isElement: isElement,
    isString: isString,
    isNumber: isNumber,
    isDate: isDate,
    isRegExp: isRegExp,
    isError: isError,
    isSymbol: isSymbol,
    isArrayBuffer: isArrayBuffer,
    isDataView: isDataView$1,
    isArray: isArray,
    isFunction: isFunction$1,
    isArguments: isArguments$1,
    isFinite: isFinite$1,
    isNaN: isNaN$1,
    isTypedArray: isTypedArray$1,
    isEmpty: isEmpty,
    isMatch: isMatch,
    isEqual: isEqual,
    isMap: isMap,
    isWeakMap: isWeakMap,
    isSet: isSet,
    isWeakSet: isWeakSet,
    keys: keys,
    allKeys: allKeys,
    values: values,
    pairs: pairs,
    invert: invert,
    functions: functions,
    methods: functions,
    extend: extend,
    extendOwn: extendOwn,
    assign: extendOwn,
    defaults: defaults,
    create: create,
    clone: clone,
    tap: tap,
    get: get,
    has: has$1,
    mapObject: mapObject,
    identity: identity,
    constant: constant,
    noop: noop,
    toPath: toPath,
    property: property,
    propertyOf: propertyOf,
    matcher: matcher,
    matches: matcher,
    times: times,
    random: random,
    now: now,
    escape: _escape,
    unescape: _unescape,
    templateSettings: templateSettings,
    template: template,
    result: result,
    uniqueId: uniqueId,
    chain: chain,
    iteratee: iteratee,
    partial: partial,
    bind: bind,
    bindAll: bindAll,
    memoize: memoize,
    delay: delay,
    defer: defer,
    throttle: throttle,
    debounce: debounce,
    wrap: wrap,
    negate: negate,
    compose: compose,
    after: after,
    before: before,
    once: once,
    findKey: findKey,
    findIndex: findIndex,
    findLastIndex: findLastIndex,
    sortedIndex: sortedIndex,
    indexOf: indexOf,
    lastIndexOf: lastIndexOf,
    find: find,
    detect: find,
    findWhere: findWhere,
    each: each,
    forEach: each,
    map: map,
    collect: map,
    reduce: reduce,
    foldl: reduce,
    inject: reduce,
    reduceRight: reduceRight,
    foldr: reduceRight,
    filter: filter,
    select: filter,
    reject: reject,
    every: every,
    all: every,
    some: some,
    any: some,
    contains: contains,
    includes: contains,
    include: contains,
    invoke: invoke,
    pluck: pluck,
    where: where,
    max: max,
    min: min,
    shuffle: shuffle,
    sample: sample,
    sortBy: sortBy,
    groupBy: groupBy,
    indexBy: indexBy,
    countBy: countBy,
    partition: partition,
    toArray: toArray,
    size: size,
    pick: pick,
    omit: omit,
    first: first,
    head: first,
    take: first,
    initial: initial,
    last: last,
    rest: rest,
    tail: rest,
    drop: rest,
    compact: compact,
    flatten: flatten$1,
    without: without,
    uniq: uniq,
    unique: uniq,
    union: union,
    intersection: intersection,
    difference: difference,
    unzip: unzip,
    transpose: unzip,
    zip: zip,
    object: object,
    range: range,
    chunk: chunk,
    mixin: mixin,
    'default': _
  };

  // Default Export

  // Add all of the Underscore functions to the wrapper object.
  var _$1 = mixin(allExports);
  // Legacy Node.js API.
  _$1._ = _$1;

  return _$1;

})));
//# sourceMappingURL=underscore.js.map


/***/ }),

/***/ 794:
/***/ (function(module) {

module.exports = require("stream");

/***/ }),

/***/ 796:
/***/ (function(__unusedmodule, exports) {

"use strict";


Object.defineProperty(exports, '__esModule', { value: true });

function getUserAgent() {
  if (typeof navigator === "object" && "userAgent" in navigator) {
    return navigator.userAgent;
  }

  if (typeof process === "object" && "version" in process) {
    return `Node.js/${process.version.substr(1)} (${process.platform}; ${process.arch})`;
  }

  return "<environment undetectable>";
}

exports.getUserAgent = getUserAgent;
//# sourceMappingURL=index.js.map


/***/ }),

/***/ 813:
/***/ (function(__unusedmodule, exports) {

"use strict";


Object.defineProperty(exports, '__esModule', { value: true });

async function auth(token) {
  const tokenType = token.split(/\./).length === 3 ? "app" : /^v\d+\./.test(token) ? "installation" : "oauth";
  return {
    type: "token",
    token: token,
    tokenType
  };
}

/**
 * Prefix token for usage in the Authorization header
 *
 * @param token OAuth token or JSON Web Token
 */
function withAuthorizationPrefix(token) {
  if (token.split(/\./).length === 3) {
    return `bearer ${token}`;
  }

  return `token ${token}`;
}

async function hook(token, request, route, parameters) {
  const endpoint = request.endpoint.merge(route, parameters);
  endpoint.headers.authorization = withAuthorizationPrefix(token);
  return request(endpoint);
}

const createTokenAuth = function createTokenAuth(token) {
  if (!token) {
    throw new Error("[@octokit/auth-token] No token passed to createTokenAuth");
  }

  if (typeof token !== "string") {
    throw new Error("[@octokit/auth-token] Token passed to createTokenAuth is not a string");
  }

  token = token.replace(/^(token|bearer) +/i, "");
  return Object.assign(auth.bind(null, token), {
    hook: hook.bind(null, token)
  });
};

exports.createTokenAuth = createTokenAuth;
//# sourceMappingURL=index.js.map


/***/ }),

/***/ 835:
/***/ (function(module) {

module.exports = require("url");

/***/ }),

/***/ 842:
/***/ (function(__unusedmodule, exports) {

"use strict";


Object.defineProperty(exports, '__esModule', { value: true });

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);

    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }

    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

const Endpoints = {
  actions: {
    addSelectedRepoToOrgSecret: ["PUT /orgs/{org}/actions/secrets/{secret_name}/repositories/{repository_id}"],
    approveWorkflowRun: ["POST /repos/{owner}/{repo}/actions/runs/{run_id}/approve"],
    cancelWorkflowRun: ["POST /repos/{owner}/{repo}/actions/runs/{run_id}/cancel"],
    createOrUpdateEnvironmentSecret: ["PUT /repositories/{repository_id}/environments/{environment_name}/secrets/{secret_name}"],
    createOrUpdateOrgSecret: ["PUT /orgs/{org}/actions/secrets/{secret_name}"],
    createOrUpdateRepoSecret: ["PUT /repos/{owner}/{repo}/actions/secrets/{secret_name}"],
    createRegistrationTokenForOrg: ["POST /orgs/{org}/actions/runners/registration-token"],
    createRegistrationTokenForRepo: ["POST /repos/{owner}/{repo}/actions/runners/registration-token"],
    createRemoveTokenForOrg: ["POST /orgs/{org}/actions/runners/remove-token"],
    createRemoveTokenForRepo: ["POST /repos/{owner}/{repo}/actions/runners/remove-token"],
    createWorkflowDispatch: ["POST /repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches"],
    deleteArtifact: ["DELETE /repos/{owner}/{repo}/actions/artifacts/{artifact_id}"],
    deleteEnvironmentSecret: ["DELETE /repositories/{repository_id}/environments/{environment_name}/secrets/{secret_name}"],
    deleteOrgSecret: ["DELETE /orgs/{org}/actions/secrets/{secret_name}"],
    deleteRepoSecret: ["DELETE /repos/{owner}/{repo}/actions/secrets/{secret_name}"],
    deleteSelfHostedRunnerFromOrg: ["DELETE /orgs/{org}/actions/runners/{runner_id}"],
    deleteSelfHostedRunnerFromRepo: ["DELETE /repos/{owner}/{repo}/actions/runners/{runner_id}"],
    deleteWorkflowRun: ["DELETE /repos/{owner}/{repo}/actions/runs/{run_id}"],
    deleteWorkflowRunLogs: ["DELETE /repos/{owner}/{repo}/actions/runs/{run_id}/logs"],
    disableSelectedRepositoryGithubActionsOrganization: ["DELETE /orgs/{org}/actions/permissions/repositories/{repository_id}"],
    disableWorkflow: ["PUT /repos/{owner}/{repo}/actions/workflows/{workflow_id}/disable"],
    downloadArtifact: ["GET /repos/{owner}/{repo}/actions/artifacts/{artifact_id}/{archive_format}"],
    downloadJobLogsForWorkflowRun: ["GET /repos/{owner}/{repo}/actions/jobs/{job_id}/logs"],
    downloadWorkflowRunLogs: ["GET /repos/{owner}/{repo}/actions/runs/{run_id}/logs"],
    enableSelectedRepositoryGithubActionsOrganization: ["PUT /orgs/{org}/actions/permissions/repositories/{repository_id}"],
    enableWorkflow: ["PUT /repos/{owner}/{repo}/actions/workflows/{workflow_id}/enable"],
    getAllowedActionsOrganization: ["GET /orgs/{org}/actions/permissions/selected-actions"],
    getAllowedActionsRepository: ["GET /repos/{owner}/{repo}/actions/permissions/selected-actions"],
    getArtifact: ["GET /repos/{owner}/{repo}/actions/artifacts/{artifact_id}"],
    getEnvironmentPublicKey: ["GET /repositories/{repository_id}/environments/{environment_name}/secrets/public-key"],
    getEnvironmentSecret: ["GET /repositories/{repository_id}/environments/{environment_name}/secrets/{secret_name}"],
    getGithubActionsPermissionsOrganization: ["GET /orgs/{org}/actions/permissions"],
    getGithubActionsPermissionsRepository: ["GET /repos/{owner}/{repo}/actions/permissions"],
    getJobForWorkflowRun: ["GET /repos/{owner}/{repo}/actions/jobs/{job_id}"],
    getOrgPublicKey: ["GET /orgs/{org}/actions/secrets/public-key"],
    getOrgSecret: ["GET /orgs/{org}/actions/secrets/{secret_name}"],
    getPendingDeploymentsForRun: ["GET /repos/{owner}/{repo}/actions/runs/{run_id}/pending_deployments"],
    getRepoPermissions: ["GET /repos/{owner}/{repo}/actions/permissions", {}, {
      renamed: ["actions", "getGithubActionsPermissionsRepository"]
    }],
    getRepoPublicKey: ["GET /repos/{owner}/{repo}/actions/secrets/public-key"],
    getRepoSecret: ["GET /repos/{owner}/{repo}/actions/secrets/{secret_name}"],
    getReviewsForRun: ["GET /repos/{owner}/{repo}/actions/runs/{run_id}/approvals"],
    getSelfHostedRunnerForOrg: ["GET /orgs/{org}/actions/runners/{runner_id}"],
    getSelfHostedRunnerForRepo: ["GET /repos/{owner}/{repo}/actions/runners/{runner_id}"],
    getWorkflow: ["GET /repos/{owner}/{repo}/actions/workflows/{workflow_id}"],
    getWorkflowRun: ["GET /repos/{owner}/{repo}/actions/runs/{run_id}"],
    getWorkflowRunUsage: ["GET /repos/{owner}/{repo}/actions/runs/{run_id}/timing"],
    getWorkflowUsage: ["GET /repos/{owner}/{repo}/actions/workflows/{workflow_id}/timing"],
    listArtifactsForRepo: ["GET /repos/{owner}/{repo}/actions/artifacts"],
    listEnvironmentSecrets: ["GET /repositories/{repository_id}/environments/{environment_name}/secrets"],
    listJobsForWorkflowRun: ["GET /repos/{owner}/{repo}/actions/runs/{run_id}/jobs"],
    listOrgSecrets: ["GET /orgs/{org}/actions/secrets"],
    listRepoSecrets: ["GET /repos/{owner}/{repo}/actions/secrets"],
    listRepoWorkflows: ["GET /repos/{owner}/{repo}/actions/workflows"],
    listRunnerApplicationsForOrg: ["GET /orgs/{org}/actions/runners/downloads"],
    listRunnerApplicationsForRepo: ["GET /repos/{owner}/{repo}/actions/runners/downloads"],
    listSelectedReposForOrgSecret: ["GET /orgs/{org}/actions/secrets/{secret_name}/repositories"],
    listSelectedRepositoriesEnabledGithubActionsOrganization: ["GET /orgs/{org}/actions/permissions/repositories"],
    listSelfHostedRunnersForOrg: ["GET /orgs/{org}/actions/runners"],
    listSelfHostedRunnersForRepo: ["GET /repos/{owner}/{repo}/actions/runners"],
    listWorkflowRunArtifacts: ["GET /repos/{owner}/{repo}/actions/runs/{run_id}/artifacts"],
    listWorkflowRuns: ["GET /repos/{owner}/{repo}/actions/workflows/{workflow_id}/runs"],
    listWorkflowRunsForRepo: ["GET /repos/{owner}/{repo}/actions/runs"],
    reRunWorkflow: ["POST /repos/{owner}/{repo}/actions/runs/{run_id}/rerun"],
    removeSelectedRepoFromOrgSecret: ["DELETE /orgs/{org}/actions/secrets/{secret_name}/repositories/{repository_id}"],
    reviewPendingDeploymentsForRun: ["POST /repos/{owner}/{repo}/actions/runs/{run_id}/pending_deployments"],
    setAllowedActionsOrganization: ["PUT /orgs/{org}/actions/permissions/selected-actions"],
    setAllowedActionsRepository: ["PUT /repos/{owner}/{repo}/actions/permissions/selected-actions"],
    setGithubActionsPermissionsOrganization: ["PUT /orgs/{org}/actions/permissions"],
    setGithubActionsPermissionsRepository: ["PUT /repos/{owner}/{repo}/actions/permissions"],
    setSelectedReposForOrgSecret: ["PUT /orgs/{org}/actions/secrets/{secret_name}/repositories"],
    setSelectedRepositoriesEnabledGithubActionsOrganization: ["PUT /orgs/{org}/actions/permissions/repositories"]
  },
  activity: {
    checkRepoIsStarredByAuthenticatedUser: ["GET /user/starred/{owner}/{repo}"],
    deleteRepoSubscription: ["DELETE /repos/{owner}/{repo}/subscription"],
    deleteThreadSubscription: ["DELETE /notifications/threads/{thread_id}/subscription"],
    getFeeds: ["GET /feeds"],
    getRepoSubscription: ["GET /repos/{owner}/{repo}/subscription"],
    getThread: ["GET /notifications/threads/{thread_id}"],
    getThreadSubscriptionForAuthenticatedUser: ["GET /notifications/threads/{thread_id}/subscription"],
    listEventsForAuthenticatedUser: ["GET /users/{username}/events"],
    listNotificationsForAuthenticatedUser: ["GET /notifications"],
    listOrgEventsForAuthenticatedUser: ["GET /users/{username}/events/orgs/{org}"],
    listPublicEvents: ["GET /events"],
    listPublicEventsForRepoNetwork: ["GET /networks/{owner}/{repo}/events"],
    listPublicEventsForUser: ["GET /users/{username}/events/public"],
    listPublicOrgEvents: ["GET /orgs/{org}/events"],
    listReceivedEventsForUser: ["GET /users/{username}/received_events"],
    listReceivedPublicEventsForUser: ["GET /users/{username}/received_events/public"],
    listRepoEvents: ["GET /repos/{owner}/{repo}/events"],
    listRepoNotificationsForAuthenticatedUser: ["GET /repos/{owner}/{repo}/notifications"],
    listReposStarredByAuthenticatedUser: ["GET /user/starred"],
    listReposStarredByUser: ["GET /users/{username}/starred"],
    listReposWatchedByUser: ["GET /users/{username}/subscriptions"],
    listStargazersForRepo: ["GET /repos/{owner}/{repo}/stargazers"],
    listWatchedReposForAuthenticatedUser: ["GET /user/subscriptions"],
    listWatchersForRepo: ["GET /repos/{owner}/{repo}/subscribers"],
    markNotificationsAsRead: ["PUT /notifications"],
    markRepoNotificationsAsRead: ["PUT /repos/{owner}/{repo}/notifications"],
    markThreadAsRead: ["PATCH /notifications/threads/{thread_id}"],
    setRepoSubscription: ["PUT /repos/{owner}/{repo}/subscription"],
    setThreadSubscription: ["PUT /notifications/threads/{thread_id}/subscription"],
    starRepoForAuthenticatedUser: ["PUT /user/starred/{owner}/{repo}"],
    unstarRepoForAuthenticatedUser: ["DELETE /user/starred/{owner}/{repo}"]
  },
  apps: {
    addRepoToInstallation: ["PUT /user/installations/{installation_id}/repositories/{repository_id}"],
    checkToken: ["POST /applications/{client_id}/token"],
    createContentAttachment: ["POST /content_references/{content_reference_id}/attachments", {
      mediaType: {
        previews: ["corsair"]
      }
    }],
    createContentAttachmentForRepo: ["POST /repos/{owner}/{repo}/content_references/{content_reference_id}/attachments", {
      mediaType: {
        previews: ["corsair"]
      }
    }],
    createFromManifest: ["POST /app-manifests/{code}/conversions"],
    createInstallationAccessToken: ["POST /app/installations/{installation_id}/access_tokens"],
    deleteAuthorization: ["DELETE /applications/{client_id}/grant"],
    deleteInstallation: ["DELETE /app/installations/{installation_id}"],
    deleteToken: ["DELETE /applications/{client_id}/token"],
    getAuthenticated: ["GET /app"],
    getBySlug: ["GET /apps/{app_slug}"],
    getInstallation: ["GET /app/installations/{installation_id}"],
    getOrgInstallation: ["GET /orgs/{org}/installation"],
    getRepoInstallation: ["GET /repos/{owner}/{repo}/installation"],
    getSubscriptionPlanForAccount: ["GET /marketplace_listing/accounts/{account_id}"],
    getSubscriptionPlanForAccountStubbed: ["GET /marketplace_listing/stubbed/accounts/{account_id}"],
    getUserInstallation: ["GET /users/{username}/installation"],
    getWebhookConfigForApp: ["GET /app/hook/config"],
    getWebhookDelivery: ["GET /app/hook/deliveries/{delivery_id}"],
    listAccountsForPlan: ["GET /marketplace_listing/plans/{plan_id}/accounts"],
    listAccountsForPlanStubbed: ["GET /marketplace_listing/stubbed/plans/{plan_id}/accounts"],
    listInstallationReposForAuthenticatedUser: ["GET /user/installations/{installation_id}/repositories"],
    listInstallations: ["GET /app/installations"],
    listInstallationsForAuthenticatedUser: ["GET /user/installations"],
    listPlans: ["GET /marketplace_listing/plans"],
    listPlansStubbed: ["GET /marketplace_listing/stubbed/plans"],
    listReposAccessibleToInstallation: ["GET /installation/repositories"],
    listSubscriptionsForAuthenticatedUser: ["GET /user/marketplace_purchases"],
    listSubscriptionsForAuthenticatedUserStubbed: ["GET /user/marketplace_purchases/stubbed"],
    listWebhookDeliveries: ["GET /app/hook/deliveries"],
    redeliverWebhookDelivery: ["POST /app/hook/deliveries/{delivery_id}/attempts"],
    removeRepoFromInstallation: ["DELETE /user/installations/{installation_id}/repositories/{repository_id}"],
    resetToken: ["PATCH /applications/{client_id}/token"],
    revokeInstallationAccessToken: ["DELETE /installation/token"],
    scopeToken: ["POST /applications/{client_id}/token/scoped"],
    suspendInstallation: ["PUT /app/installations/{installation_id}/suspended"],
    unsuspendInstallation: ["DELETE /app/installations/{installation_id}/suspended"],
    updateWebhookConfigForApp: ["PATCH /app/hook/config"]
  },
  billing: {
    getGithubActionsBillingOrg: ["GET /orgs/{org}/settings/billing/actions"],
    getGithubActionsBillingUser: ["GET /users/{username}/settings/billing/actions"],
    getGithubPackagesBillingOrg: ["GET /orgs/{org}/settings/billing/packages"],
    getGithubPackagesBillingUser: ["GET /users/{username}/settings/billing/packages"],
    getSharedStorageBillingOrg: ["GET /orgs/{org}/settings/billing/shared-storage"],
    getSharedStorageBillingUser: ["GET /users/{username}/settings/billing/shared-storage"]
  },
  checks: {
    create: ["POST /repos/{owner}/{repo}/check-runs"],
    createSuite: ["POST /repos/{owner}/{repo}/check-suites"],
    get: ["GET /repos/{owner}/{repo}/check-runs/{check_run_id}"],
    getSuite: ["GET /repos/{owner}/{repo}/check-suites/{check_suite_id}"],
    listAnnotations: ["GET /repos/{owner}/{repo}/check-runs/{check_run_id}/annotations"],
    listForRef: ["GET /repos/{owner}/{repo}/commits/{ref}/check-runs"],
    listForSuite: ["GET /repos/{owner}/{repo}/check-suites/{check_suite_id}/check-runs"],
    listSuitesForRef: ["GET /repos/{owner}/{repo}/commits/{ref}/check-suites"],
    rerequestSuite: ["POST /repos/{owner}/{repo}/check-suites/{check_suite_id}/rerequest"],
    setSuitesPreferences: ["PATCH /repos/{owner}/{repo}/check-suites/preferences"],
    update: ["PATCH /repos/{owner}/{repo}/check-runs/{check_run_id}"]
  },
  codeScanning: {
    deleteAnalysis: ["DELETE /repos/{owner}/{repo}/code-scanning/analyses/{analysis_id}{?confirm_delete}"],
    getAlert: ["GET /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}", {}, {
      renamedParameters: {
        alert_id: "alert_number"
      }
    }],
    getAnalysis: ["GET /repos/{owner}/{repo}/code-scanning/analyses/{analysis_id}"],
    getSarif: ["GET /repos/{owner}/{repo}/code-scanning/sarifs/{sarif_id}"],
    listAlertInstances: ["GET /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}/instances"],
    listAlertsForRepo: ["GET /repos/{owner}/{repo}/code-scanning/alerts"],
    listAlertsInstances: ["GET /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}/instances", {}, {
      renamed: ["codeScanning", "listAlertInstances"]
    }],
    listRecentAnalyses: ["GET /repos/{owner}/{repo}/code-scanning/analyses"],
    updateAlert: ["PATCH /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}"],
    uploadSarif: ["POST /repos/{owner}/{repo}/code-scanning/sarifs"]
  },
  codesOfConduct: {
    getAllCodesOfConduct: ["GET /codes_of_conduct"],
    getConductCode: ["GET /codes_of_conduct/{key}"],
    getForRepo: ["GET /repos/{owner}/{repo}/community/code_of_conduct", {
      mediaType: {
        previews: ["scarlet-witch"]
      }
    }]
  },
  emojis: {
    get: ["GET /emojis"]
  },
  enterpriseAdmin: {
    disableSelectedOrganizationGithubActionsEnterprise: ["DELETE /enterprises/{enterprise}/actions/permissions/organizations/{org_id}"],
    enableSelectedOrganizationGithubActionsEnterprise: ["PUT /enterprises/{enterprise}/actions/permissions/organizations/{org_id}"],
    getAllowedActionsEnterprise: ["GET /enterprises/{enterprise}/actions/permissions/selected-actions"],
    getGithubActionsPermissionsEnterprise: ["GET /enterprises/{enterprise}/actions/permissions"],
    listSelectedOrganizationsEnabledGithubActionsEnterprise: ["GET /enterprises/{enterprise}/actions/permissions/organizations"],
    setAllowedActionsEnterprise: ["PUT /enterprises/{enterprise}/actions/permissions/selected-actions"],
    setGithubActionsPermissionsEnterprise: ["PUT /enterprises/{enterprise}/actions/permissions"],
    setSelectedOrganizationsEnabledGithubActionsEnterprise: ["PUT /enterprises/{enterprise}/actions/permissions/organizations"]
  },
  gists: {
    checkIsStarred: ["GET /gists/{gist_id}/star"],
    create: ["POST /gists"],
    createComment: ["POST /gists/{gist_id}/comments"],
    delete: ["DELETE /gists/{gist_id}"],
    deleteComment: ["DELETE /gists/{gist_id}/comments/{comment_id}"],
    fork: ["POST /gists/{gist_id}/forks"],
    get: ["GET /gists/{gist_id}"],
    getComment: ["GET /gists/{gist_id}/comments/{comment_id}"],
    getRevision: ["GET /gists/{gist_id}/{sha}"],
    list: ["GET /gists"],
    listComments: ["GET /gists/{gist_id}/comments"],
    listCommits: ["GET /gists/{gist_id}/commits"],
    listForUser: ["GET /users/{username}/gists"],
    listForks: ["GET /gists/{gist_id}/forks"],
    listPublic: ["GET /gists/public"],
    listStarred: ["GET /gists/starred"],
    star: ["PUT /gists/{gist_id}/star"],
    unstar: ["DELETE /gists/{gist_id}/star"],
    update: ["PATCH /gists/{gist_id}"],
    updateComment: ["PATCH /gists/{gist_id}/comments/{comment_id}"]
  },
  git: {
    createBlob: ["POST /repos/{owner}/{repo}/git/blobs"],
    createCommit: ["POST /repos/{owner}/{repo}/git/commits"],
    createRef: ["POST /repos/{owner}/{repo}/git/refs"],
    createTag: ["POST /repos/{owner}/{repo}/git/tags"],
    createTree: ["POST /repos/{owner}/{repo}/git/trees"],
    deleteRef: ["DELETE /repos/{owner}/{repo}/git/refs/{ref}"],
    getBlob: ["GET /repos/{owner}/{repo}/git/blobs/{file_sha}"],
    getCommit: ["GET /repos/{owner}/{repo}/git/commits/{commit_sha}"],
    getRef: ["GET /repos/{owner}/{repo}/git/ref/{ref}"],
    getTag: ["GET /repos/{owner}/{repo}/git/tags/{tag_sha}"],
    getTree: ["GET /repos/{owner}/{repo}/git/trees/{tree_sha}"],
    listMatchingRefs: ["GET /repos/{owner}/{repo}/git/matching-refs/{ref}"],
    updateRef: ["PATCH /repos/{owner}/{repo}/git/refs/{ref}"]
  },
  gitignore: {
    getAllTemplates: ["GET /gitignore/templates"],
    getTemplate: ["GET /gitignore/templates/{name}"]
  },
  interactions: {
    getRestrictionsForAuthenticatedUser: ["GET /user/interaction-limits"],
    getRestrictionsForOrg: ["GET /orgs/{org}/interaction-limits"],
    getRestrictionsForRepo: ["GET /repos/{owner}/{repo}/interaction-limits"],
    getRestrictionsForYourPublicRepos: ["GET /user/interaction-limits", {}, {
      renamed: ["interactions", "getRestrictionsForAuthenticatedUser"]
    }],
    removeRestrictionsForAuthenticatedUser: ["DELETE /user/interaction-limits"],
    removeRestrictionsForOrg: ["DELETE /orgs/{org}/interaction-limits"],
    removeRestrictionsForRepo: ["DELETE /repos/{owner}/{repo}/interaction-limits"],
    removeRestrictionsForYourPublicRepos: ["DELETE /user/interaction-limits", {}, {
      renamed: ["interactions", "removeRestrictionsForAuthenticatedUser"]
    }],
    setRestrictionsForAuthenticatedUser: ["PUT /user/interaction-limits"],
    setRestrictionsForOrg: ["PUT /orgs/{org}/interaction-limits"],
    setRestrictionsForRepo: ["PUT /repos/{owner}/{repo}/interaction-limits"],
    setRestrictionsForYourPublicRepos: ["PUT /user/interaction-limits", {}, {
      renamed: ["interactions", "setRestrictionsForAuthenticatedUser"]
    }]
  },
  issues: {
    addAssignees: ["POST /repos/{owner}/{repo}/issues/{issue_number}/assignees"],
    addLabels: ["POST /repos/{owner}/{repo}/issues/{issue_number}/labels"],
    checkUserCanBeAssigned: ["GET /repos/{owner}/{repo}/assignees/{assignee}"],
    create: ["POST /repos/{owner}/{repo}/issues"],
    createComment: ["POST /repos/{owner}/{repo}/issues/{issue_number}/comments"],
    createLabel: ["POST /repos/{owner}/{repo}/labels"],
    createMilestone: ["POST /repos/{owner}/{repo}/milestones"],
    deleteComment: ["DELETE /repos/{owner}/{repo}/issues/comments/{comment_id}"],
    deleteLabel: ["DELETE /repos/{owner}/{repo}/labels/{name}"],
    deleteMilestone: ["DELETE /repos/{owner}/{repo}/milestones/{milestone_number}"],
    get: ["GET /repos/{owner}/{repo}/issues/{issue_number}"],
    getComment: ["GET /repos/{owner}/{repo}/issues/comments/{comment_id}"],
    getEvent: ["GET /repos/{owner}/{repo}/issues/events/{event_id}"],
    getLabel: ["GET /repos/{owner}/{repo}/labels/{name}"],
    getMilestone: ["GET /repos/{owner}/{repo}/milestones/{milestone_number}"],
    list: ["GET /issues"],
    listAssignees: ["GET /repos/{owner}/{repo}/assignees"],
    listComments: ["GET /repos/{owner}/{repo}/issues/{issue_number}/comments"],
    listCommentsForRepo: ["GET /repos/{owner}/{repo}/issues/comments"],
    listEvents: ["GET /repos/{owner}/{repo}/issues/{issue_number}/events"],
    listEventsForRepo: ["GET /repos/{owner}/{repo}/issues/events"],
    listEventsForTimeline: ["GET /repos/{owner}/{repo}/issues/{issue_number}/timeline", {
      mediaType: {
        previews: ["mockingbird"]
      }
    }],
    listForAuthenticatedUser: ["GET /user/issues"],
    listForOrg: ["GET /orgs/{org}/issues"],
    listForRepo: ["GET /repos/{owner}/{repo}/issues"],
    listLabelsForMilestone: ["GET /repos/{owner}/{repo}/milestones/{milestone_number}/labels"],
    listLabelsForRepo: ["GET /repos/{owner}/{repo}/labels"],
    listLabelsOnIssue: ["GET /repos/{owner}/{repo}/issues/{issue_number}/labels"],
    listMilestones: ["GET /repos/{owner}/{repo}/milestones"],
    lock: ["PUT /repos/{owner}/{repo}/issues/{issue_number}/lock"],
    removeAllLabels: ["DELETE /repos/{owner}/{repo}/issues/{issue_number}/labels"],
    removeAssignees: ["DELETE /repos/{owner}/{repo}/issues/{issue_number}/assignees"],
    removeLabel: ["DELETE /repos/{owner}/{repo}/issues/{issue_number}/labels/{name}"],
    setLabels: ["PUT /repos/{owner}/{repo}/issues/{issue_number}/labels"],
    unlock: ["DELETE /repos/{owner}/{repo}/issues/{issue_number}/lock"],
    update: ["PATCH /repos/{owner}/{repo}/issues/{issue_number}"],
    updateComment: ["PATCH /repos/{owner}/{repo}/issues/comments/{comment_id}"],
    updateLabel: ["PATCH /repos/{owner}/{repo}/labels/{name}"],
    updateMilestone: ["PATCH /repos/{owner}/{repo}/milestones/{milestone_number}"]
  },
  licenses: {
    get: ["GET /licenses/{license}"],
    getAllCommonlyUsed: ["GET /licenses"],
    getForRepo: ["GET /repos/{owner}/{repo}/license"]
  },
  markdown: {
    render: ["POST /markdown"],
    renderRaw: ["POST /markdown/raw", {
      headers: {
        "content-type": "text/plain; charset=utf-8"
      }
    }]
  },
  meta: {
    get: ["GET /meta"],
    getOctocat: ["GET /octocat"],
    getZen: ["GET /zen"],
    root: ["GET /"]
  },
  migrations: {
    cancelImport: ["DELETE /repos/{owner}/{repo}/import"],
    deleteArchiveForAuthenticatedUser: ["DELETE /user/migrations/{migration_id}/archive", {
      mediaType: {
        previews: ["wyandotte"]
      }
    }],
    deleteArchiveForOrg: ["DELETE /orgs/{org}/migrations/{migration_id}/archive", {
      mediaType: {
        previews: ["wyandotte"]
      }
    }],
    downloadArchiveForOrg: ["GET /orgs/{org}/migrations/{migration_id}/archive", {
      mediaType: {
        previews: ["wyandotte"]
      }
    }],
    getArchiveForAuthenticatedUser: ["GET /user/migrations/{migration_id}/archive", {
      mediaType: {
        previews: ["wyandotte"]
      }
    }],
    getCommitAuthors: ["GET /repos/{owner}/{repo}/import/authors"],
    getImportStatus: ["GET /repos/{owner}/{repo}/import"],
    getLargeFiles: ["GET /repos/{owner}/{repo}/import/large_files"],
    getStatusForAuthenticatedUser: ["GET /user/migrations/{migration_id}", {
      mediaType: {
        previews: ["wyandotte"]
      }
    }],
    getStatusForOrg: ["GET /orgs/{org}/migrations/{migration_id}", {
      mediaType: {
        previews: ["wyandotte"]
      }
    }],
    listForAuthenticatedUser: ["GET /user/migrations", {
      mediaType: {
        previews: ["wyandotte"]
      }
    }],
    listForOrg: ["GET /orgs/{org}/migrations", {
      mediaType: {
        previews: ["wyandotte"]
      }
    }],
    listReposForOrg: ["GET /orgs/{org}/migrations/{migration_id}/repositories", {
      mediaType: {
        previews: ["wyandotte"]
      }
    }],
    listReposForUser: ["GET /user/migrations/{migration_id}/repositories", {
      mediaType: {
        previews: ["wyandotte"]
      }
    }],
    mapCommitAuthor: ["PATCH /repos/{owner}/{repo}/import/authors/{author_id}"],
    setLfsPreference: ["PATCH /repos/{owner}/{repo}/import/lfs"],
    startForAuthenticatedUser: ["POST /user/migrations"],
    startForOrg: ["POST /orgs/{org}/migrations"],
    startImport: ["PUT /repos/{owner}/{repo}/import"],
    unlockRepoForAuthenticatedUser: ["DELETE /user/migrations/{migration_id}/repos/{repo_name}/lock", {
      mediaType: {
        previews: ["wyandotte"]
      }
    }],
    unlockRepoForOrg: ["DELETE /orgs/{org}/migrations/{migration_id}/repos/{repo_name}/lock", {
      mediaType: {
        previews: ["wyandotte"]
      }
    }],
    updateImport: ["PATCH /repos/{owner}/{repo}/import"]
  },
  orgs: {
    blockUser: ["PUT /orgs/{org}/blocks/{username}"],
    cancelInvitation: ["DELETE /orgs/{org}/invitations/{invitation_id}"],
    checkBlockedUser: ["GET /orgs/{org}/blocks/{username}"],
    checkMembershipForUser: ["GET /orgs/{org}/members/{username}"],
    checkPublicMembershipForUser: ["GET /orgs/{org}/public_members/{username}"],
    convertMemberToOutsideCollaborator: ["PUT /orgs/{org}/outside_collaborators/{username}"],
    createInvitation: ["POST /orgs/{org}/invitations"],
    createWebhook: ["POST /orgs/{org}/hooks"],
    deleteWebhook: ["DELETE /orgs/{org}/hooks/{hook_id}"],
    get: ["GET /orgs/{org}"],
    getMembershipForAuthenticatedUser: ["GET /user/memberships/orgs/{org}"],
    getMembershipForUser: ["GET /orgs/{org}/memberships/{username}"],
    getWebhook: ["GET /orgs/{org}/hooks/{hook_id}"],
    getWebhookConfigForOrg: ["GET /orgs/{org}/hooks/{hook_id}/config"],
    getWebhookDelivery: ["GET /orgs/{org}/hooks/{hook_id}/deliveries/{delivery_id}"],
    list: ["GET /organizations"],
    listAppInstallations: ["GET /orgs/{org}/installations"],
    listBlockedUsers: ["GET /orgs/{org}/blocks"],
    listFailedInvitations: ["GET /orgs/{org}/failed_invitations"],
    listForAuthenticatedUser: ["GET /user/orgs"],
    listForUser: ["GET /users/{username}/orgs"],
    listInvitationTeams: ["GET /orgs/{org}/invitations/{invitation_id}/teams"],
    listMembers: ["GET /orgs/{org}/members"],
    listMembershipsForAuthenticatedUser: ["GET /user/memberships/orgs"],
    listOutsideCollaborators: ["GET /orgs/{org}/outside_collaborators"],
    listPendingInvitations: ["GET /orgs/{org}/invitations"],
    listPublicMembers: ["GET /orgs/{org}/public_members"],
    listWebhookDeliveries: ["GET /orgs/{org}/hooks/{hook_id}/deliveries"],
    listWebhooks: ["GET /orgs/{org}/hooks"],
    pingWebhook: ["POST /orgs/{org}/hooks/{hook_id}/pings"],
    redeliverWebhookDelivery: ["POST /orgs/{org}/hooks/{hook_id}/deliveries/{delivery_id}/attempts"],
    removeMember: ["DELETE /orgs/{org}/members/{username}"],
    removeMembershipForUser: ["DELETE /orgs/{org}/memberships/{username}"],
    removeOutsideCollaborator: ["DELETE /orgs/{org}/outside_collaborators/{username}"],
    removePublicMembershipForAuthenticatedUser: ["DELETE /orgs/{org}/public_members/{username}"],
    setMembershipForUser: ["PUT /orgs/{org}/memberships/{username}"],
    setPublicMembershipForAuthenticatedUser: ["PUT /orgs/{org}/public_members/{username}"],
    unblockUser: ["DELETE /orgs/{org}/blocks/{username}"],
    update: ["PATCH /orgs/{org}"],
    updateMembershipForAuthenticatedUser: ["PATCH /user/memberships/orgs/{org}"],
    updateWebhook: ["PATCH /orgs/{org}/hooks/{hook_id}"],
    updateWebhookConfigForOrg: ["PATCH /orgs/{org}/hooks/{hook_id}/config"]
  },
  packages: {
    deletePackageForAuthenticatedUser: ["DELETE /user/packages/{package_type}/{package_name}"],
    deletePackageForOrg: ["DELETE /orgs/{org}/packages/{package_type}/{package_name}"],
    deletePackageVersionForAuthenticatedUser: ["DELETE /user/packages/{package_type}/{package_name}/versions/{package_version_id}"],
    deletePackageVersionForOrg: ["DELETE /orgs/{org}/packages/{package_type}/{package_name}/versions/{package_version_id}"],
    getAllPackageVersionsForAPackageOwnedByAnOrg: ["GET /orgs/{org}/packages/{package_type}/{package_name}/versions", {}, {
      renamed: ["packages", "getAllPackageVersionsForPackageOwnedByOrg"]
    }],
    getAllPackageVersionsForAPackageOwnedByTheAuthenticatedUser: ["GET /user/packages/{package_type}/{package_name}/versions", {}, {
      renamed: ["packages", "getAllPackageVersionsForPackageOwnedByAuthenticatedUser"]
    }],
    getAllPackageVersionsForPackageOwnedByAuthenticatedUser: ["GET /user/packages/{package_type}/{package_name}/versions"],
    getAllPackageVersionsForPackageOwnedByOrg: ["GET /orgs/{org}/packages/{package_type}/{package_name}/versions"],
    getAllPackageVersionsForPackageOwnedByUser: ["GET /users/{username}/packages/{package_type}/{package_name}/versions"],
    getPackageForAuthenticatedUser: ["GET /user/packages/{package_type}/{package_name}"],
    getPackageForOrganization: ["GET /orgs/{org}/packages/{package_type}/{package_name}"],
    getPackageForUser: ["GET /users/{username}/packages/{package_type}/{package_name}"],
    getPackageVersionForAuthenticatedUser: ["GET /user/packages/{package_type}/{package_name}/versions/{package_version_id}"],
    getPackageVersionForOrganization: ["GET /orgs/{org}/packages/{package_type}/{package_name}/versions/{package_version_id}"],
    getPackageVersionForUser: ["GET /users/{username}/packages/{package_type}/{package_name}/versions/{package_version_id}"],
    restorePackageForAuthenticatedUser: ["POST /user/packages/{package_type}/{package_name}/restore{?token}"],
    restorePackageForOrg: ["POST /orgs/{org}/packages/{package_type}/{package_name}/restore{?token}"],
    restorePackageVersionForAuthenticatedUser: ["POST /user/packages/{package_type}/{package_name}/versions/{package_version_id}/restore"],
    restorePackageVersionForOrg: ["POST /orgs/{org}/packages/{package_type}/{package_name}/versions/{package_version_id}/restore"]
  },
  projects: {
    addCollaborator: ["PUT /projects/{project_id}/collaborators/{username}", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    createCard: ["POST /projects/columns/{column_id}/cards", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    createColumn: ["POST /projects/{project_id}/columns", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    createForAuthenticatedUser: ["POST /user/projects", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    createForOrg: ["POST /orgs/{org}/projects", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    createForRepo: ["POST /repos/{owner}/{repo}/projects", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    delete: ["DELETE /projects/{project_id}", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    deleteCard: ["DELETE /projects/columns/cards/{card_id}", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    deleteColumn: ["DELETE /projects/columns/{column_id}", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    get: ["GET /projects/{project_id}", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    getCard: ["GET /projects/columns/cards/{card_id}", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    getColumn: ["GET /projects/columns/{column_id}", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    getPermissionForUser: ["GET /projects/{project_id}/collaborators/{username}/permission", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    listCards: ["GET /projects/columns/{column_id}/cards", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    listCollaborators: ["GET /projects/{project_id}/collaborators", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    listColumns: ["GET /projects/{project_id}/columns", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    listForOrg: ["GET /orgs/{org}/projects", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    listForRepo: ["GET /repos/{owner}/{repo}/projects", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    listForUser: ["GET /users/{username}/projects", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    moveCard: ["POST /projects/columns/cards/{card_id}/moves", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    moveColumn: ["POST /projects/columns/{column_id}/moves", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    removeCollaborator: ["DELETE /projects/{project_id}/collaborators/{username}", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    update: ["PATCH /projects/{project_id}", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    updateCard: ["PATCH /projects/columns/cards/{card_id}", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    updateColumn: ["PATCH /projects/columns/{column_id}", {
      mediaType: {
        previews: ["inertia"]
      }
    }]
  },
  pulls: {
    checkIfMerged: ["GET /repos/{owner}/{repo}/pulls/{pull_number}/merge"],
    create: ["POST /repos/{owner}/{repo}/pulls"],
    createReplyForReviewComment: ["POST /repos/{owner}/{repo}/pulls/{pull_number}/comments/{comment_id}/replies"],
    createReview: ["POST /repos/{owner}/{repo}/pulls/{pull_number}/reviews"],
    createReviewComment: ["POST /repos/{owner}/{repo}/pulls/{pull_number}/comments"],
    deletePendingReview: ["DELETE /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}"],
    deleteReviewComment: ["DELETE /repos/{owner}/{repo}/pulls/comments/{comment_id}"],
    dismissReview: ["PUT /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}/dismissals"],
    get: ["GET /repos/{owner}/{repo}/pulls/{pull_number}"],
    getReview: ["GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}"],
    getReviewComment: ["GET /repos/{owner}/{repo}/pulls/comments/{comment_id}"],
    list: ["GET /repos/{owner}/{repo}/pulls"],
    listCommentsForReview: ["GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}/comments"],
    listCommits: ["GET /repos/{owner}/{repo}/pulls/{pull_number}/commits"],
    listFiles: ["GET /repos/{owner}/{repo}/pulls/{pull_number}/files"],
    listRequestedReviewers: ["GET /repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers"],
    listReviewComments: ["GET /repos/{owner}/{repo}/pulls/{pull_number}/comments"],
    listReviewCommentsForRepo: ["GET /repos/{owner}/{repo}/pulls/comments"],
    listReviews: ["GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews"],
    merge: ["PUT /repos/{owner}/{repo}/pulls/{pull_number}/merge"],
    removeRequestedReviewers: ["DELETE /repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers"],
    requestReviewers: ["POST /repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers"],
    submitReview: ["POST /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}/events"],
    update: ["PATCH /repos/{owner}/{repo}/pulls/{pull_number}"],
    updateBranch: ["PUT /repos/{owner}/{repo}/pulls/{pull_number}/update-branch", {
      mediaType: {
        previews: ["lydian"]
      }
    }],
    updateReview: ["PUT /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}"],
    updateReviewComment: ["PATCH /repos/{owner}/{repo}/pulls/comments/{comment_id}"]
  },
  rateLimit: {
    get: ["GET /rate_limit"]
  },
  reactions: {
    createForCommitComment: ["POST /repos/{owner}/{repo}/comments/{comment_id}/reactions", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    createForIssue: ["POST /repos/{owner}/{repo}/issues/{issue_number}/reactions", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    createForIssueComment: ["POST /repos/{owner}/{repo}/issues/comments/{comment_id}/reactions", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    createForPullRequestReviewComment: ["POST /repos/{owner}/{repo}/pulls/comments/{comment_id}/reactions", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    createForRelease: ["POST /repos/{owner}/{repo}/releases/{release_id}/reactions", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    createForTeamDiscussionCommentInOrg: ["POST /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}/reactions", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    createForTeamDiscussionInOrg: ["POST /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/reactions", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    deleteForCommitComment: ["DELETE /repos/{owner}/{repo}/comments/{comment_id}/reactions/{reaction_id}", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    deleteForIssue: ["DELETE /repos/{owner}/{repo}/issues/{issue_number}/reactions/{reaction_id}", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    deleteForIssueComment: ["DELETE /repos/{owner}/{repo}/issues/comments/{comment_id}/reactions/{reaction_id}", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    deleteForPullRequestComment: ["DELETE /repos/{owner}/{repo}/pulls/comments/{comment_id}/reactions/{reaction_id}", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    deleteForTeamDiscussion: ["DELETE /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/reactions/{reaction_id}", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    deleteForTeamDiscussionComment: ["DELETE /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}/reactions/{reaction_id}", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    deleteLegacy: ["DELETE /reactions/{reaction_id}", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }, {
      deprecated: "octokit.rest.reactions.deleteLegacy() is deprecated, see https://docs.github.com/rest/reference/reactions/#delete-a-reaction-legacy"
    }],
    listForCommitComment: ["GET /repos/{owner}/{repo}/comments/{comment_id}/reactions", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    listForIssue: ["GET /repos/{owner}/{repo}/issues/{issue_number}/reactions", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    listForIssueComment: ["GET /repos/{owner}/{repo}/issues/comments/{comment_id}/reactions", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    listForPullRequestReviewComment: ["GET /repos/{owner}/{repo}/pulls/comments/{comment_id}/reactions", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    listForTeamDiscussionCommentInOrg: ["GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}/reactions", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    listForTeamDiscussionInOrg: ["GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/reactions", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }]
  },
  repos: {
    acceptInvitation: ["PATCH /user/repository_invitations/{invitation_id}"],
    addAppAccessRestrictions: ["POST /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps", {}, {
      mapToData: "apps"
    }],
    addCollaborator: ["PUT /repos/{owner}/{repo}/collaborators/{username}"],
    addStatusCheckContexts: ["POST /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts", {}, {
      mapToData: "contexts"
    }],
    addTeamAccessRestrictions: ["POST /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams", {}, {
      mapToData: "teams"
    }],
    addUserAccessRestrictions: ["POST /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users", {}, {
      mapToData: "users"
    }],
    checkCollaborator: ["GET /repos/{owner}/{repo}/collaborators/{username}"],
    checkVulnerabilityAlerts: ["GET /repos/{owner}/{repo}/vulnerability-alerts", {
      mediaType: {
        previews: ["dorian"]
      }
    }],
    compareCommits: ["GET /repos/{owner}/{repo}/compare/{base}...{head}"],
    compareCommitsWithBasehead: ["GET /repos/{owner}/{repo}/compare/{basehead}"],
    createCommitComment: ["POST /repos/{owner}/{repo}/commits/{commit_sha}/comments"],
    createCommitSignatureProtection: ["POST /repos/{owner}/{repo}/branches/{branch}/protection/required_signatures", {
      mediaType: {
        previews: ["zzzax"]
      }
    }],
    createCommitStatus: ["POST /repos/{owner}/{repo}/statuses/{sha}"],
    createDeployKey: ["POST /repos/{owner}/{repo}/keys"],
    createDeployment: ["POST /repos/{owner}/{repo}/deployments"],
    createDeploymentStatus: ["POST /repos/{owner}/{repo}/deployments/{deployment_id}/statuses"],
    createDispatchEvent: ["POST /repos/{owner}/{repo}/dispatches"],
    createForAuthenticatedUser: ["POST /user/repos"],
    createFork: ["POST /repos/{owner}/{repo}/forks"],
    createInOrg: ["POST /orgs/{org}/repos"],
    createOrUpdateEnvironment: ["PUT /repos/{owner}/{repo}/environments/{environment_name}"],
    createOrUpdateFileContents: ["PUT /repos/{owner}/{repo}/contents/{path}"],
    createPagesSite: ["POST /repos/{owner}/{repo}/pages", {
      mediaType: {
        previews: ["switcheroo"]
      }
    }],
    createRelease: ["POST /repos/{owner}/{repo}/releases"],
    createUsingTemplate: ["POST /repos/{template_owner}/{template_repo}/generate", {
      mediaType: {
        previews: ["baptiste"]
      }
    }],
    createWebhook: ["POST /repos/{owner}/{repo}/hooks"],
    declineInvitation: ["DELETE /user/repository_invitations/{invitation_id}"],
    delete: ["DELETE /repos/{owner}/{repo}"],
    deleteAccessRestrictions: ["DELETE /repos/{owner}/{repo}/branches/{branch}/protection/restrictions"],
    deleteAdminBranchProtection: ["DELETE /repos/{owner}/{repo}/branches/{branch}/protection/enforce_admins"],
    deleteAnEnvironment: ["DELETE /repos/{owner}/{repo}/environments/{environment_name}"],
    deleteBranchProtection: ["DELETE /repos/{owner}/{repo}/branches/{branch}/protection"],
    deleteCommitComment: ["DELETE /repos/{owner}/{repo}/comments/{comment_id}"],
    deleteCommitSignatureProtection: ["DELETE /repos/{owner}/{repo}/branches/{branch}/protection/required_signatures", {
      mediaType: {
        previews: ["zzzax"]
      }
    }],
    deleteDeployKey: ["DELETE /repos/{owner}/{repo}/keys/{key_id}"],
    deleteDeployment: ["DELETE /repos/{owner}/{repo}/deployments/{deployment_id}"],
    deleteFile: ["DELETE /repos/{owner}/{repo}/contents/{path}"],
    deleteInvitation: ["DELETE /repos/{owner}/{repo}/invitations/{invitation_id}"],
    deletePagesSite: ["DELETE /repos/{owner}/{repo}/pages", {
      mediaType: {
        previews: ["switcheroo"]
      }
    }],
    deletePullRequestReviewProtection: ["DELETE /repos/{owner}/{repo}/branches/{branch}/protection/required_pull_request_reviews"],
    deleteRelease: ["DELETE /repos/{owner}/{repo}/releases/{release_id}"],
    deleteReleaseAsset: ["DELETE /repos/{owner}/{repo}/releases/assets/{asset_id}"],
    deleteWebhook: ["DELETE /repos/{owner}/{repo}/hooks/{hook_id}"],
    disableAutomatedSecurityFixes: ["DELETE /repos/{owner}/{repo}/automated-security-fixes", {
      mediaType: {
        previews: ["london"]
      }
    }],
    disableVulnerabilityAlerts: ["DELETE /repos/{owner}/{repo}/vulnerability-alerts", {
      mediaType: {
        previews: ["dorian"]
      }
    }],
    downloadArchive: ["GET /repos/{owner}/{repo}/zipball/{ref}", {}, {
      renamed: ["repos", "downloadZipballArchive"]
    }],
    downloadTarballArchive: ["GET /repos/{owner}/{repo}/tarball/{ref}"],
    downloadZipballArchive: ["GET /repos/{owner}/{repo}/zipball/{ref}"],
    enableAutomatedSecurityFixes: ["PUT /repos/{owner}/{repo}/automated-security-fixes", {
      mediaType: {
        previews: ["london"]
      }
    }],
    enableVulnerabilityAlerts: ["PUT /repos/{owner}/{repo}/vulnerability-alerts", {
      mediaType: {
        previews: ["dorian"]
      }
    }],
    get: ["GET /repos/{owner}/{repo}"],
    getAccessRestrictions: ["GET /repos/{owner}/{repo}/branches/{branch}/protection/restrictions"],
    getAdminBranchProtection: ["GET /repos/{owner}/{repo}/branches/{branch}/protection/enforce_admins"],
    getAllEnvironments: ["GET /repos/{owner}/{repo}/environments"],
    getAllStatusCheckContexts: ["GET /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts"],
    getAllTopics: ["GET /repos/{owner}/{repo}/topics", {
      mediaType: {
        previews: ["mercy"]
      }
    }],
    getAppsWithAccessToProtectedBranch: ["GET /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps"],
    getBranch: ["GET /repos/{owner}/{repo}/branches/{branch}"],
    getBranchProtection: ["GET /repos/{owner}/{repo}/branches/{branch}/protection"],
    getClones: ["GET /repos/{owner}/{repo}/traffic/clones"],
    getCodeFrequencyStats: ["GET /repos/{owner}/{repo}/stats/code_frequency"],
    getCollaboratorPermissionLevel: ["GET /repos/{owner}/{repo}/collaborators/{username}/permission"],
    getCombinedStatusForRef: ["GET /repos/{owner}/{repo}/commits/{ref}/status"],
    getCommit: ["GET /repos/{owner}/{repo}/commits/{ref}"],
    getCommitActivityStats: ["GET /repos/{owner}/{repo}/stats/commit_activity"],
    getCommitComment: ["GET /repos/{owner}/{repo}/comments/{comment_id}"],
    getCommitSignatureProtection: ["GET /repos/{owner}/{repo}/branches/{branch}/protection/required_signatures", {
      mediaType: {
        previews: ["zzzax"]
      }
    }],
    getCommunityProfileMetrics: ["GET /repos/{owner}/{repo}/community/profile"],
    getContent: ["GET /repos/{owner}/{repo}/contents/{path}"],
    getContributorsStats: ["GET /repos/{owner}/{repo}/stats/contributors"],
    getDeployKey: ["GET /repos/{owner}/{repo}/keys/{key_id}"],
    getDeployment: ["GET /repos/{owner}/{repo}/deployments/{deployment_id}"],
    getDeploymentStatus: ["GET /repos/{owner}/{repo}/deployments/{deployment_id}/statuses/{status_id}"],
    getEnvironment: ["GET /repos/{owner}/{repo}/environments/{environment_name}"],
    getLatestPagesBuild: ["GET /repos/{owner}/{repo}/pages/builds/latest"],
    getLatestRelease: ["GET /repos/{owner}/{repo}/releases/latest"],
    getPages: ["GET /repos/{owner}/{repo}/pages"],
    getPagesBuild: ["GET /repos/{owner}/{repo}/pages/builds/{build_id}"],
    getPagesHealthCheck: ["GET /repos/{owner}/{repo}/pages/health"],
    getParticipationStats: ["GET /repos/{owner}/{repo}/stats/participation"],
    getPullRequestReviewProtection: ["GET /repos/{owner}/{repo}/branches/{branch}/protection/required_pull_request_reviews"],
    getPunchCardStats: ["GET /repos/{owner}/{repo}/stats/punch_card"],
    getReadme: ["GET /repos/{owner}/{repo}/readme"],
    getReadmeInDirectory: ["GET /repos/{owner}/{repo}/readme/{dir}"],
    getRelease: ["GET /repos/{owner}/{repo}/releases/{release_id}"],
    getReleaseAsset: ["GET /repos/{owner}/{repo}/releases/assets/{asset_id}"],
    getReleaseByTag: ["GET /repos/{owner}/{repo}/releases/tags/{tag}"],
    getStatusChecksProtection: ["GET /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks"],
    getTeamsWithAccessToProtectedBranch: ["GET /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams"],
    getTopPaths: ["GET /repos/{owner}/{repo}/traffic/popular/paths"],
    getTopReferrers: ["GET /repos/{owner}/{repo}/traffic/popular/referrers"],
    getUsersWithAccessToProtectedBranch: ["GET /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users"],
    getViews: ["GET /repos/{owner}/{repo}/traffic/views"],
    getWebhook: ["GET /repos/{owner}/{repo}/hooks/{hook_id}"],
    getWebhookConfigForRepo: ["GET /repos/{owner}/{repo}/hooks/{hook_id}/config"],
    getWebhookDelivery: ["GET /repos/{owner}/{repo}/hooks/{hook_id}/deliveries/{delivery_id}"],
    listBranches: ["GET /repos/{owner}/{repo}/branches"],
    listBranchesForHeadCommit: ["GET /repos/{owner}/{repo}/commits/{commit_sha}/branches-where-head", {
      mediaType: {
        previews: ["groot"]
      }
    }],
    listCollaborators: ["GET /repos/{owner}/{repo}/collaborators"],
    listCommentsForCommit: ["GET /repos/{owner}/{repo}/commits/{commit_sha}/comments"],
    listCommitCommentsForRepo: ["GET /repos/{owner}/{repo}/comments"],
    listCommitStatusesForRef: ["GET /repos/{owner}/{repo}/commits/{ref}/statuses"],
    listCommits: ["GET /repos/{owner}/{repo}/commits"],
    listContributors: ["GET /repos/{owner}/{repo}/contributors"],
    listDeployKeys: ["GET /repos/{owner}/{repo}/keys"],
    listDeploymentStatuses: ["GET /repos/{owner}/{repo}/deployments/{deployment_id}/statuses"],
    listDeployments: ["GET /repos/{owner}/{repo}/deployments"],
    listForAuthenticatedUser: ["GET /user/repos"],
    listForOrg: ["GET /orgs/{org}/repos"],
    listForUser: ["GET /users/{username}/repos"],
    listForks: ["GET /repos/{owner}/{repo}/forks"],
    listInvitations: ["GET /repos/{owner}/{repo}/invitations"],
    listInvitationsForAuthenticatedUser: ["GET /user/repository_invitations"],
    listLanguages: ["GET /repos/{owner}/{repo}/languages"],
    listPagesBuilds: ["GET /repos/{owner}/{repo}/pages/builds"],
    listPublic: ["GET /repositories"],
    listPullRequestsAssociatedWithCommit: ["GET /repos/{owner}/{repo}/commits/{commit_sha}/pulls", {
      mediaType: {
        previews: ["groot"]
      }
    }],
    listReleaseAssets: ["GET /repos/{owner}/{repo}/releases/{release_id}/assets"],
    listReleases: ["GET /repos/{owner}/{repo}/releases"],
    listTags: ["GET /repos/{owner}/{repo}/tags"],
    listTeams: ["GET /repos/{owner}/{repo}/teams"],
    listWebhookDeliveries: ["GET /repos/{owner}/{repo}/hooks/{hook_id}/deliveries"],
    listWebhooks: ["GET /repos/{owner}/{repo}/hooks"],
    merge: ["POST /repos/{owner}/{repo}/merges"],
    pingWebhook: ["POST /repos/{owner}/{repo}/hooks/{hook_id}/pings"],
    redeliverWebhookDelivery: ["POST /repos/{owner}/{repo}/hooks/{hook_id}/deliveries/{delivery_id}/attempts"],
    removeAppAccessRestrictions: ["DELETE /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps", {}, {
      mapToData: "apps"
    }],
    removeCollaborator: ["DELETE /repos/{owner}/{repo}/collaborators/{username}"],
    removeStatusCheckContexts: ["DELETE /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts", {}, {
      mapToData: "contexts"
    }],
    removeStatusCheckProtection: ["DELETE /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks"],
    removeTeamAccessRestrictions: ["DELETE /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams", {}, {
      mapToData: "teams"
    }],
    removeUserAccessRestrictions: ["DELETE /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users", {}, {
      mapToData: "users"
    }],
    renameBranch: ["POST /repos/{owner}/{repo}/branches/{branch}/rename"],
    replaceAllTopics: ["PUT /repos/{owner}/{repo}/topics", {
      mediaType: {
        previews: ["mercy"]
      }
    }],
    requestPagesBuild: ["POST /repos/{owner}/{repo}/pages/builds"],
    setAdminBranchProtection: ["POST /repos/{owner}/{repo}/branches/{branch}/protection/enforce_admins"],
    setAppAccessRestrictions: ["PUT /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps", {}, {
      mapToData: "apps"
    }],
    setStatusCheckContexts: ["PUT /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts", {}, {
      mapToData: "contexts"
    }],
    setTeamAccessRestrictions: ["PUT /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams", {}, {
      mapToData: "teams"
    }],
    setUserAccessRestrictions: ["PUT /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users", {}, {
      mapToData: "users"
    }],
    testPushWebhook: ["POST /repos/{owner}/{repo}/hooks/{hook_id}/tests"],
    transfer: ["POST /repos/{owner}/{repo}/transfer"],
    update: ["PATCH /repos/{owner}/{repo}"],
    updateBranchProtection: ["PUT /repos/{owner}/{repo}/branches/{branch}/protection"],
    updateCommitComment: ["PATCH /repos/{owner}/{repo}/comments/{comment_id}"],
    updateInformationAboutPagesSite: ["PUT /repos/{owner}/{repo}/pages"],
    updateInvitation: ["PATCH /repos/{owner}/{repo}/invitations/{invitation_id}"],
    updatePullRequestReviewProtection: ["PATCH /repos/{owner}/{repo}/branches/{branch}/protection/required_pull_request_reviews"],
    updateRelease: ["PATCH /repos/{owner}/{repo}/releases/{release_id}"],
    updateReleaseAsset: ["PATCH /repos/{owner}/{repo}/releases/assets/{asset_id}"],
    updateStatusCheckPotection: ["PATCH /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks", {}, {
      renamed: ["repos", "updateStatusCheckProtection"]
    }],
    updateStatusCheckProtection: ["PATCH /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks"],
    updateWebhook: ["PATCH /repos/{owner}/{repo}/hooks/{hook_id}"],
    updateWebhookConfigForRepo: ["PATCH /repos/{owner}/{repo}/hooks/{hook_id}/config"],
    uploadReleaseAsset: ["POST /repos/{owner}/{repo}/releases/{release_id}/assets{?name,label}", {
      baseUrl: "https://uploads.github.com"
    }]
  },
  search: {
    code: ["GET /search/code"],
    commits: ["GET /search/commits", {
      mediaType: {
        previews: ["cloak"]
      }
    }],
    issuesAndPullRequests: ["GET /search/issues"],
    labels: ["GET /search/labels"],
    repos: ["GET /search/repositories"],
    topics: ["GET /search/topics", {
      mediaType: {
        previews: ["mercy"]
      }
    }],
    users: ["GET /search/users"]
  },
  secretScanning: {
    getAlert: ["GET /repos/{owner}/{repo}/secret-scanning/alerts/{alert_number}"],
    listAlertsForRepo: ["GET /repos/{owner}/{repo}/secret-scanning/alerts"],
    updateAlert: ["PATCH /repos/{owner}/{repo}/secret-scanning/alerts/{alert_number}"]
  },
  teams: {
    addOrUpdateMembershipForUserInOrg: ["PUT /orgs/{org}/teams/{team_slug}/memberships/{username}"],
    addOrUpdateProjectPermissionsInOrg: ["PUT /orgs/{org}/teams/{team_slug}/projects/{project_id}", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    addOrUpdateRepoPermissionsInOrg: ["PUT /orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}"],
    checkPermissionsForProjectInOrg: ["GET /orgs/{org}/teams/{team_slug}/projects/{project_id}", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    checkPermissionsForRepoInOrg: ["GET /orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}"],
    create: ["POST /orgs/{org}/teams"],
    createDiscussionCommentInOrg: ["POST /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments"],
    createDiscussionInOrg: ["POST /orgs/{org}/teams/{team_slug}/discussions"],
    deleteDiscussionCommentInOrg: ["DELETE /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}"],
    deleteDiscussionInOrg: ["DELETE /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}"],
    deleteInOrg: ["DELETE /orgs/{org}/teams/{team_slug}"],
    getByName: ["GET /orgs/{org}/teams/{team_slug}"],
    getDiscussionCommentInOrg: ["GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}"],
    getDiscussionInOrg: ["GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}"],
    getMembershipForUserInOrg: ["GET /orgs/{org}/teams/{team_slug}/memberships/{username}"],
    list: ["GET /orgs/{org}/teams"],
    listChildInOrg: ["GET /orgs/{org}/teams/{team_slug}/teams"],
    listDiscussionCommentsInOrg: ["GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments"],
    listDiscussionsInOrg: ["GET /orgs/{org}/teams/{team_slug}/discussions"],
    listForAuthenticatedUser: ["GET /user/teams"],
    listMembersInOrg: ["GET /orgs/{org}/teams/{team_slug}/members"],
    listPendingInvitationsInOrg: ["GET /orgs/{org}/teams/{team_slug}/invitations"],
    listProjectsInOrg: ["GET /orgs/{org}/teams/{team_slug}/projects", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    listReposInOrg: ["GET /orgs/{org}/teams/{team_slug}/repos"],
    removeMembershipForUserInOrg: ["DELETE /orgs/{org}/teams/{team_slug}/memberships/{username}"],
    removeProjectInOrg: ["DELETE /orgs/{org}/teams/{team_slug}/projects/{project_id}"],
    removeRepoInOrg: ["DELETE /orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}"],
    updateDiscussionCommentInOrg: ["PATCH /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}"],
    updateDiscussionInOrg: ["PATCH /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}"],
    updateInOrg: ["PATCH /orgs/{org}/teams/{team_slug}"]
  },
  users: {
    addEmailForAuthenticated: ["POST /user/emails"],
    block: ["PUT /user/blocks/{username}"],
    checkBlocked: ["GET /user/blocks/{username}"],
    checkFollowingForUser: ["GET /users/{username}/following/{target_user}"],
    checkPersonIsFollowedByAuthenticated: ["GET /user/following/{username}"],
    createGpgKeyForAuthenticated: ["POST /user/gpg_keys"],
    createPublicSshKeyForAuthenticated: ["POST /user/keys"],
    deleteEmailForAuthenticated: ["DELETE /user/emails"],
    deleteGpgKeyForAuthenticated: ["DELETE /user/gpg_keys/{gpg_key_id}"],
    deletePublicSshKeyForAuthenticated: ["DELETE /user/keys/{key_id}"],
    follow: ["PUT /user/following/{username}"],
    getAuthenticated: ["GET /user"],
    getByUsername: ["GET /users/{username}"],
    getContextForUser: ["GET /users/{username}/hovercard"],
    getGpgKeyForAuthenticated: ["GET /user/gpg_keys/{gpg_key_id}"],
    getPublicSshKeyForAuthenticated: ["GET /user/keys/{key_id}"],
    list: ["GET /users"],
    listBlockedByAuthenticated: ["GET /user/blocks"],
    listEmailsForAuthenticated: ["GET /user/emails"],
    listFollowedByAuthenticated: ["GET /user/following"],
    listFollowersForAuthenticatedUser: ["GET /user/followers"],
    listFollowersForUser: ["GET /users/{username}/followers"],
    listFollowingForUser: ["GET /users/{username}/following"],
    listGpgKeysForAuthenticated: ["GET /user/gpg_keys"],
    listGpgKeysForUser: ["GET /users/{username}/gpg_keys"],
    listPublicEmailsForAuthenticated: ["GET /user/public_emails"],
    listPublicKeysForUser: ["GET /users/{username}/keys"],
    listPublicSshKeysForAuthenticated: ["GET /user/keys"],
    setPrimaryEmailVisibilityForAuthenticated: ["PATCH /user/email/visibility"],
    unblock: ["DELETE /user/blocks/{username}"],
    unfollow: ["DELETE /user/following/{username}"],
    updateAuthenticated: ["PATCH /user"]
  }
};

const VERSION = "5.5.1";

function endpointsToMethods(octokit, endpointsMap) {
  const newMethods = {};

  for (const [scope, endpoints] of Object.entries(endpointsMap)) {
    for (const [methodName, endpoint] of Object.entries(endpoints)) {
      const [route, defaults, decorations] = endpoint;
      const [method, url] = route.split(/ /);
      const endpointDefaults = Object.assign({
        method,
        url
      }, defaults);

      if (!newMethods[scope]) {
        newMethods[scope] = {};
      }

      const scopeMethods = newMethods[scope];

      if (decorations) {
        scopeMethods[methodName] = decorate(octokit, scope, methodName, endpointDefaults, decorations);
        continue;
      }

      scopeMethods[methodName] = octokit.request.defaults(endpointDefaults);
    }
  }

  return newMethods;
}

function decorate(octokit, scope, methodName, defaults, decorations) {
  const requestWithDefaults = octokit.request.defaults(defaults);
  /* istanbul ignore next */

  function withDecorations(...args) {
    // @ts-ignore https://github.com/microsoft/TypeScript/issues/25488
    let options = requestWithDefaults.endpoint.merge(...args); // There are currently no other decorations than `.mapToData`

    if (decorations.mapToData) {
      options = Object.assign({}, options, {
        data: options[decorations.mapToData],
        [decorations.mapToData]: undefined
      });
      return requestWithDefaults(options);
    }

    if (decorations.renamed) {
      const [newScope, newMethodName] = decorations.renamed;
      octokit.log.warn(`octokit.${scope}.${methodName}() has been renamed to octokit.${newScope}.${newMethodName}()`);
    }

    if (decorations.deprecated) {
      octokit.log.warn(decorations.deprecated);
    }

    if (decorations.renamedParameters) {
      // @ts-ignore https://github.com/microsoft/TypeScript/issues/25488
      const options = requestWithDefaults.endpoint.merge(...args);

      for (const [name, alias] of Object.entries(decorations.renamedParameters)) {
        if (name in options) {
          octokit.log.warn(`"${name}" parameter is deprecated for "octokit.${scope}.${methodName}()". Use "${alias}" instead`);

          if (!(alias in options)) {
            options[alias] = options[name];
          }

          delete options[name];
        }
      }

      return requestWithDefaults(options);
    } // @ts-ignore https://github.com/microsoft/TypeScript/issues/25488


    return requestWithDefaults(...args);
  }

  return Object.assign(withDecorations, requestWithDefaults);
}

function restEndpointMethods(octokit) {
  const api = endpointsToMethods(octokit, Endpoints);
  return {
    rest: api
  };
}
restEndpointMethods.VERSION = VERSION;
function legacyRestEndpointMethods(octokit) {
  const api = endpointsToMethods(octokit, Endpoints);
  return _objectSpread2(_objectSpread2({}, api), {}, {
    rest: api
  });
}
legacyRestEndpointMethods.VERSION = VERSION;

exports.legacyRestEndpointMethods = legacyRestEndpointMethods;
exports.restEndpointMethods = restEndpointMethods;
//# sourceMappingURL=index.js.map


/***/ }),

/***/ 866:
/***/ (function(module) {

module.exports = removeHook;

function removeHook(state, name, method) {
  if (!state.registry[name]) {
    return;
  }

  var index = state.registry[name]
    .map(function (registered) {
      return registered.orig;
    })
    .indexOf(method);

  if (index === -1) {
    return;
  }

  state.registry[name].splice(index, 1);
}


/***/ }),

/***/ 898:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', { value: true });

var request = __webpack_require__(753);
var universalUserAgent = __webpack_require__(796);

const VERSION = "4.6.4";

class GraphqlError extends Error {
  constructor(request, response) {
    const message = response.data.errors[0].message;
    super(message);
    Object.assign(this, response.data);
    Object.assign(this, {
      headers: response.headers
    });
    this.name = "GraphqlError";
    this.request = request; // Maintains proper stack trace (only available on V8)

    /* istanbul ignore next */

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

}

const NON_VARIABLE_OPTIONS = ["method", "baseUrl", "url", "headers", "request", "query", "mediaType"];
const FORBIDDEN_VARIABLE_OPTIONS = ["query", "method", "url"];
const GHES_V3_SUFFIX_REGEX = /\/api\/v3\/?$/;
function graphql(request, query, options) {
  if (options) {
    if (typeof query === "string" && "query" in options) {
      return Promise.reject(new Error(`[@octokit/graphql] "query" cannot be used as variable name`));
    }

    for (const key in options) {
      if (!FORBIDDEN_VARIABLE_OPTIONS.includes(key)) continue;
      return Promise.reject(new Error(`[@octokit/graphql] "${key}" cannot be used as variable name`));
    }
  }

  const parsedOptions = typeof query === "string" ? Object.assign({
    query
  }, options) : query;
  const requestOptions = Object.keys(parsedOptions).reduce((result, key) => {
    if (NON_VARIABLE_OPTIONS.includes(key)) {
      result[key] = parsedOptions[key];
      return result;
    }

    if (!result.variables) {
      result.variables = {};
    }

    result.variables[key] = parsedOptions[key];
    return result;
  }, {}); // workaround for GitHub Enterprise baseUrl set with /api/v3 suffix
  // https://github.com/octokit/auth-app.js/issues/111#issuecomment-657610451

  const baseUrl = parsedOptions.baseUrl || request.endpoint.DEFAULTS.baseUrl;

  if (GHES_V3_SUFFIX_REGEX.test(baseUrl)) {
    requestOptions.url = baseUrl.replace(GHES_V3_SUFFIX_REGEX, "/api/graphql");
  }

  return request(requestOptions).then(response => {
    if (response.data.errors) {
      const headers = {};

      for (const key of Object.keys(response.headers)) {
        headers[key] = response.headers[key];
      }

      throw new GraphqlError(requestOptions, {
        headers,
        data: response.data
      });
    }

    return response.data.data;
  });
}

function withDefaults(request$1, newDefaults) {
  const newRequest = request$1.defaults(newDefaults);

  const newApi = (query, options) => {
    return graphql(newRequest, query, options);
  };

  return Object.assign(newApi, {
    defaults: withDefaults.bind(null, newRequest),
    endpoint: request.request.endpoint
  });
}

const graphql$1 = withDefaults(request.request, {
  headers: {
    "user-agent": `octokit-graphql.js/${VERSION} ${universalUserAgent.getUserAgent()}`
  },
  method: "POST",
  url: "/graphql"
});
function withCustomRequest(customRequest) {
  return withDefaults(customRequest, {
    method: "POST",
    url: "/graphql"
  });
}

exports.graphql = graphql$1;
exports.withCustomRequest = withCustomRequest;
//# sourceMappingURL=index.js.map


/***/ }),

/***/ 950:
/***/ (function(__unusedmodule, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function getProxyUrl(reqUrl) {
    let usingSsl = reqUrl.protocol === 'https:';
    let proxyUrl;
    if (checkBypass(reqUrl)) {
        return proxyUrl;
    }
    let proxyVar;
    if (usingSsl) {
        proxyVar = process.env['https_proxy'] || process.env['HTTPS_PROXY'];
    }
    else {
        proxyVar = process.env['http_proxy'] || process.env['HTTP_PROXY'];
    }
    if (proxyVar) {
        proxyUrl = new URL(proxyVar);
    }
    return proxyUrl;
}
exports.getProxyUrl = getProxyUrl;
function checkBypass(reqUrl) {
    if (!reqUrl.hostname) {
        return false;
    }
    let noProxy = process.env['no_proxy'] || process.env['NO_PROXY'] || '';
    if (!noProxy) {
        return false;
    }
    // Determine the request port
    let reqPort;
    if (reqUrl.port) {
        reqPort = Number(reqUrl.port);
    }
    else if (reqUrl.protocol === 'http:') {
        reqPort = 80;
    }
    else if (reqUrl.protocol === 'https:') {
        reqPort = 443;
    }
    // Format the request hostname and hostname with port
    let upperReqHosts = [reqUrl.hostname.toUpperCase()];
    if (typeof reqPort === 'number') {
        upperReqHosts.push(`${upperReqHosts[0]}:${reqPort}`);
    }
    // Compare request host against noproxy
    for (let upperNoProxyItem of noProxy
        .split(',')
        .map(x => x.trim().toUpperCase())
        .filter(x => x)) {
        if (upperReqHosts.some(x => x === upperNoProxyItem)) {
            return true;
        }
    }
    return false;
}
exports.checkBypass = checkBypass;


/***/ })

/******/ });