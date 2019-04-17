(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('acorn')) :
  typeof define === 'function' && define.amd ? define(['acorn'], factory) :
  (global = global || self, global.Sval = factory(global.acorn));
}(this, function (acorn) { 'use strict';

  var declaration = /*#__PURE__*/Object.freeze({
    get FunctionDeclaration () { return FunctionDeclaration; },
    get VariableDeclaration () { return VariableDeclaration; },
    get VariableDeclarator () { return VariableDeclarator; },
    get ClassDeclaration () { return ClassDeclaration; },
    get ClassBody () { return ClassBody; },
    get MethodDefinition () { return MethodDefinition; }
  });
  var declaration$1 = /*#__PURE__*/Object.freeze({
    get FunctionDeclaration () { return FunctionDeclaration$1; },
    get VariableDeclaration () { return VariableDeclaration$1; },
    get VariableDeclarator () { return VariableDeclarator$1; },
    get ClassDeclaration () { return ClassDeclaration$1; },
    get ClassBody () { return ClassBody$1; },
    get MethodDefinition () { return MethodDefinition$1; }
  });

  var AWAIT = { RES: undefined };
  var RETURN = { RES: undefined };
  var CONTINUE = createSymbol('continue');
  var BREAK = createSymbol('break');
  var SUPER = createSymbol('super');
  var ARROW = createSymbol('arrow');
  var NOINIT = createSymbol('noinit');

  var freeze = Object.freeze;
  var define = Object.defineProperty;
  var getDptor = Object.getOwnPropertyDescriptor;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  function hasOwn(obj, key) {
      return hasOwnProperty.call(obj, key);
  }
  var getOwnPropertyNames = Object.getOwnPropertyNames;
  function getOwnNames(obj) {
      return getOwnPropertyNames(obj);
  }
  var getPrototypeOf = Object.getPrototypeOf;
  function getProto(obj) {
      return getPrototypeOf ? getPrototypeOf(obj) : obj.__proto__;
  }
  var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
  function getGetterOrSetter(method, obj, key) {
      while (obj) {
          var descriptor = getOwnPropertyDescriptor(obj, key);
          var value = typeof descriptor !== 'undefined'
              && typeof descriptor.writable === 'undefined'
              && typeof descriptor[method] === 'function'
              && descriptor[method];
          if (value) {
              return value;
          }
          else {
              obj = getProto(obj);
          }
      }
  }
  function getGetter(obj, key) {
      return getGetterOrSetter('get', obj, key);
  }
  function getSetter(obj, key) {
      return getGetterOrSetter('set', obj, key);
  }
  var create = Object.create;
  function inherits(subClass, superClass) {
      subClass.prototype = create(superClass.prototype, {
          constructor: {
              value: subClass,
              writable: true,
          }
      });
  }
  function _assign(target) {
      for (var i = 1; i < arguments.length; ++i) {
          var source = arguments[i];
          for (var key in source) {
              if (hasOwn(source, key)) {
                  target[key] = source[key];
              }
          }
      }
      return target;
  }
  var assign = Object.assign || _assign;
  var names = [];
  var globalObj = {};
  try {
      if (!window.Object)
          throw 0;
      names = getOwnNames(globalObj = window).filter(function (n) { return n !== 'webkitStorageInfo'; });
  }
  catch (err) {
      try {
          if (!global.Object)
              throw 0;
          names = getOwnNames(globalObj = global).filter(function (n) { return n !== 'GLOBAL' && n !== 'root'; });
      }
      catch (err) {
          try {
              globalObj.Object = Object;
          }
          catch (err) { }
          try {
              globalObj.Function = Function;
          }
          catch (err) { }
          try {
              globalObj.Array = Array;
          }
          catch (err) { }
          try {
              globalObj.Number = Number;
          }
          catch (err) { }
          try {
              globalObj.parseFloat = parseFloat;
          }
          catch (err) { }
          try {
              globalObj.parseInt = parseInt;
          }
          catch (err) { }
          try {
              globalObj.Infinity = Infinity;
          }
          catch (err) { }
          try {
              globalObj.NaN = NaN;
          }
          catch (err) { }
          try {
              globalObj.undefined = undefined;
          }
          catch (err) { }
          try {
              globalObj.Boolean = Boolean;
          }
          catch (err) { }
          try {
              globalObj.String = String;
          }
          catch (err) { }
          try {
              globalObj.Symbol = Symbol;
          }
          catch (err) { }
          try {
              globalObj.Date = Date;
          }
          catch (err) { }
          try {
              globalObj.Promise = Promise;
          }
          catch (err) { }
          try {
              globalObj.RegExp = RegExp;
          }
          catch (err) { }
          try {
              globalObj.Error = Error;
          }
          catch (err) { }
          try {
              globalObj.EvalError = EvalError;
          }
          catch (err) { }
          try {
              globalObj.RangeError = RangeError;
          }
          catch (err) { }
          try {
              globalObj.ReferenceError = ReferenceError;
          }
          catch (err) { }
          try {
              globalObj.SyntaxError = SyntaxError;
          }
          catch (err) { }
          try {
              globalObj.TypeError = TypeError;
          }
          catch (err) { }
          try {
              globalObj.URIError = URIError;
          }
          catch (err) { }
          try {
              globalObj.JSON = JSON;
          }
          catch (err) { }
          try {
              globalObj.Math = Math;
          }
          catch (err) { }
          try {
              globalObj.console = console;
          }
          catch (err) { }
          try {
              globalObj.Intl = Intl;
          }
          catch (err) { }
          try {
              globalObj.ArrayBuffer = ArrayBuffer;
          }
          catch (err) { }
          try {
              globalObj.Uint8Array = Uint8Array;
          }
          catch (err) { }
          try {
              globalObj.Int8Array = Int8Array;
          }
          catch (err) { }
          try {
              globalObj.Uint16Array = Uint16Array;
          }
          catch (err) { }
          try {
              globalObj.Int16Array = Int16Array;
          }
          catch (err) { }
          try {
              globalObj.Uint32Array = Uint32Array;
          }
          catch (err) { }
          try {
              globalObj.Int32Array = Int32Array;
          }
          catch (err) { }
          try {
              globalObj.Float32Array = Float32Array;
          }
          catch (err) { }
          try {
              globalObj.Float64Array = Float64Array;
          }
          catch (err) { }
          try {
              globalObj.Uint8ClampedArray = Uint8ClampedArray;
          }
          catch (err) { }
          try {
              globalObj.DataView = DataView;
          }
          catch (err) { }
          try {
              globalObj.Map = Map;
          }
          catch (err) { }
          try {
              globalObj.Set = Set;
          }
          catch (err) { }
          try {
              globalObj.WeakMap = WeakMap;
          }
          catch (err) { }
          try {
              globalObj.WeakSet = WeakSet;
          }
          catch (err) { }
          try {
              globalObj.Proxy = Proxy;
          }
          catch (err) { }
          try {
              globalObj.Reflect = Reflect;
          }
          catch (err) { }
          try {
              globalObj.decodeURI = decodeURI;
          }
          catch (err) { }
          try {
              globalObj.decodeURIComponent = decodeURIComponent;
          }
          catch (err) { }
          try {
              globalObj.encodeURI = encodeURI;
          }
          catch (err) { }
          try {
              globalObj.encodeURIComponent = encodeURIComponent;
          }
          catch (err) { }
          try {
              globalObj.escape = escape;
          }
          catch (err) { }
          try {
              globalObj.unescape = unescape;
          }
          catch (err) { }
          try {
              globalObj.eval = eval;
          }
          catch (err) { }
          try {
              globalObj.isFinite = isFinite;
          }
          catch (err) { }
          try {
              globalObj.isNaN = isNaN;
          }
          catch (err) { }
          try {
              globalObj.SharedArrayBuffer = SharedArrayBuffer;
          }
          catch (err) { }
          try {
              globalObj.Atomics = Atomics;
          }
          catch (err) { }
          try {
              globalObj.WebAssembly = WebAssembly;
          }
          catch (err) { }
          try {
              globalObj.clearInterval = clearInterval;
          }
          catch (err) { }
          try {
              globalObj.clearTimeout = clearTimeout;
          }
          catch (err) { }
          try {
              globalObj.setInterval = setInterval;
          }
          catch (err) { }
          try {
              globalObj.setTimeout = setTimeout;
          }
          catch (err) { }
          try {
              globalObj.crypto = crypto;
          }
          catch (err) { }
          names = getOwnNames(globalObj);
      }
  }
  var win = {};
  for (var index in names) {
      var name_1 = names[index];
      try {
          win[name_1] = globalObj[name_1];
      }
      catch (err) { }
  }
  function createSandBox() {
      return assign({}, win);
  }
  function createSymbol(key) {
      return key + Math.random().toString(36).substring(2);
  }
  function runAsync(iterator, options) {
      if (options === void 0) { options = {}; }
      var res = options.res, err = options.err, ret = options.ret, full = options.full;
      return new Promise(function (resolve, reject) {
          if (hasOwn(options, 'ret')) {
              return resolve(iterator.return(ret));
          }
          if (hasOwn(options, 'err')) {
              onRejected(err);
          }
          else {
              onFulfilled(res);
          }
          function onFulfilled(res) {
              var ret;
              try {
                  ret = iterator.next(res);
              }
              catch (e) {
                  return reject(e);
              }
              next(ret);
              return null;
          }
          function onRejected(err) {
              var ret;
              try {
                  ret = iterator.throw(err);
              }
              catch (e) {
                  return reject(e);
              }
              next(ret);
          }
          function next(ret) {
              if (ret.done)
                  return resolve(full ? ret : ret.value);
              if (ret.value !== AWAIT)
                  return resolve(ret);
              var awaitValue = ret.value.RES;
              var value = awaitValue && awaitValue.then === 'function'
                  ? awaitValue : Promise.resolve(awaitValue);
              return value.then(onFulfilled, onRejected);
          }
      });
  }
  function getIterator(obj) {
      var iterator = typeof Symbol === 'function' && obj[Symbol.iterator];
      if (iterator) {
          return iterator.call(obj);
      }
      else if (typeof obj.next === 'function') {
          return obj;
      }
      else {
          var i_1 = 0;
          return {
              next: function () {
                  if (obj && i_1 >= obj.length) {
                      obj = undefined;
                  }
                  return { value: obj && obj[i_1++], done: !obj };
              }
          };
      }
  }

  var version = "0.4.0";

  var Var = (function () {
      function Var(kind, value) {
          this.kind = kind;
          this.value = value;
      }
      Var.prototype.get = function () {
          return this.value;
      };
      Var.prototype.set = function (value) {
          if (this.kind === 'const') {
              throw new TypeError('Assignment to constant variable');
          }
          else {
              return this.value = value;
          }
      };
      return Var;
  }());
  var Prop = (function () {
      function Prop(object, property) {
          this.object = object;
          this.property = property;
      }
      Prop.prototype.get = function () {
          return this.object[this.property];
      };
      Prop.prototype.set = function (value) {
          this.object[this.property] = value;
          return true;
      };
      Prop.prototype.del = function () {
          return delete this.object[this.property];
      };
      return Prop;
  }());

  var Scope = (function () {
      function Scope(parent, isolated) {
          if (parent === void 0) { parent = null; }
          if (isolated === void 0) { isolated = false; }
          this.context = Object.create(null);
          this.parent = parent;
          this.isolated = isolated;
      }
      Scope.prototype.global = function () {
          var scope = this;
          while (scope.parent) {
              scope = scope.parent;
          }
          return scope;
      };
      Scope.prototype.clone = function () {
          var cloneScope = new Scope(this.parent, this.isolated);
          var names = getOwnNames(this.context);
          for (var index in names) {
              var name_1 = names[index];
              var variable = this.context[name_1];
              cloneScope[variable.kind](name_1, variable.get());
          }
          return cloneScope;
      };
      Scope.prototype.find = function (name) {
          if (hasOwn(this.context, name)) {
              return this.context[name];
          }
          else if (this.parent) {
              return this.parent.find(name);
          }
          else {
              var win = this.global().find('window').get();
              if (hasOwn(win, name)) {
                  return new Prop(win, name);
              }
              else {
                  return null;
              }
          }
      };
      Scope.prototype.var = function (name, value) {
          var scope = this;
          while (scope.parent && !scope.isolated) {
              scope = scope.parent;
          }
          var variable = scope.context[name];
          if (!variable) {
              scope.context[name] = new Var('var', value === NOINIT ? undefined : value);
          }
          else {
              if (variable.kind === 'var') {
                  if (value !== NOINIT) {
                      variable.set(value);
                  }
              }
              else {
                  throw new SyntaxError("Identifier '" + name + "' has already been declared");
              }
          }
          if (!scope.parent) {
              var win = scope.find('window').get();
              if (value !== NOINIT) {
                  win[name] = value;
              }
          }
      };
      Scope.prototype.let = function (name, value) {
          var variable = this.context[name];
          if (!variable) {
              this.context[name] = new Var('let', value);
          }
          else {
              throw new SyntaxError("Identifier '" + name + "' has already been declared");
          }
      };
      Scope.prototype.const = function (name, value) {
          var variable = this.context[name];
          if (!variable) {
              this.context[name] = new Var('const', value);
          }
          else {
              throw new SyntaxError("Identifier '" + name + "' has already been declared");
          }
      };
      Scope.prototype.func = function (name, value) {
          var variable = this.context[name];
          if (!variable || variable.kind === 'var') {
              this.context[name] = new Var('var', value);
          }
          else {
              throw new SyntaxError("Identifier '" + name + "' has already been declared");
          }
      };
      return Scope;
  }());

  /*! *****************************************************************************
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the Apache License, Version 2.0 (the "License"); you may not use
  this file except in compliance with the License. You may obtain a copy of the
  License at http://www.apache.org/licenses/LICENSE-2.0

  THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
  KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
  WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
  MERCHANTABLITY OR NON-INFRINGEMENT.

  See the Apache Version 2.0 License for specific language governing permissions
  and limitations under the License.
  ***************************************************************************** */
  /* global Reflect, Promise */

  var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return extendStatics(d, b);
  };

  function __extends(d, b) {
      extendStatics(d, b);
      function __() { this.constructor = d; }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  }

  var __assign = function() {
      __assign = Object.assign || function __assign(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
              s = arguments[i];
              for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
          }
          return t;
      };
      return __assign.apply(this, arguments);
  };

  function __rest(s, e) {
      var t = {};
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
          t[p] = s[p];
      if (s != null && typeof Object.getOwnPropertySymbols === "function")
          for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
              t[p[i]] = s[p[i]];
      return t;
  }

  function __decorate(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
  }

  function __param(paramIndex, decorator) {
      return function (target, key) { decorator(target, key, paramIndex); }
  }

  function __metadata(metadataKey, metadataValue) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
  }

  function __awaiter(thisArg, _arguments, P, generator) {
      return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
          function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
          function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
  }

  function __generator(thisArg, body) {
      var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
      return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
      function verb(n) { return function (v) { return step([n, v]); }; }
      function step(op) {
          if (f) throw new TypeError("Generator is already executing.");
          while (_) try {
              if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
              if (y = 0, t) op = [op[0] & 2, t.value];
              switch (op[0]) {
                  case 0: case 1: t = op; break;
                  case 4: _.label++; return { value: op[1], done: false };
                  case 5: _.label++; y = op[1]; op = [0]; continue;
                  case 7: op = _.ops.pop(); _.trys.pop(); continue;
                  default:
                      if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                      if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                      if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                      if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                      if (t[2]) _.ops.pop();
                      _.trys.pop(); continue;
              }
              op = body.call(thisArg, _);
          } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
          if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
      }
  }

  function __exportStar(m, exports) {
      for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
  }

  function __values(o) {
      var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
      if (m) return m.call(o);
      return {
          next: function () {
              if (o && i >= o.length) o = void 0;
              return { value: o && o[i++], done: !o };
          }
      };
  }

  function __read(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o), r, ar = [], e;
      try {
          while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
      }
      catch (error) { e = { error: error }; }
      finally {
          try {
              if (r && !r.done && (m = i["return"])) m.call(i);
          }
          finally { if (e) throw e.error; }
      }
      return ar;
  }

  function __spread() {
      for (var ar = [], i = 0; i < arguments.length; i++)
          ar = ar.concat(__read(arguments[i]));
      return ar;
  }

  function __await(v) {
      return this instanceof __await ? (this.v = v, this) : new __await(v);
  }

  function __asyncGenerator(thisArg, _arguments, generator) {
      if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
      var g = generator.apply(thisArg, _arguments || []), i, q = [];
      return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
      function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
      function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
      function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
      function fulfill(value) { resume("next", value); }
      function reject(value) { resume("throw", value); }
      function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
  }

  function __asyncDelegator(o) {
      var i, p;
      return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
      function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
  }

  function __asyncValues(o) {
      if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
      var m = o[Symbol.asyncIterator], i;
      return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
      function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
      function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
  }

  function __makeTemplateObject(cooked, raw) {
      if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
      return cooked;
  }
  function __importStar(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
      result.default = mod;
      return result;
  }

  function __importDefault(mod) {
      return (mod && mod.__esModule) ? mod : { default: mod };
  }

  var tslib_1 = /*#__PURE__*/Object.freeze({
    __extends: __extends,
    get __assign () { return __assign; },
    __rest: __rest,
    __decorate: __decorate,
    __param: __param,
    __metadata: __metadata,
    __awaiter: __awaiter,
    __generator: __generator,
    __exportStar: __exportStar,
    __values: __values,
    __read: __read,
    __spread: __spread,
    __await: __await,
    __asyncGenerator: __asyncGenerator,
    __asyncDelegator: __asyncDelegator,
    __asyncValues: __asyncValues,
    __makeTemplateObject: __makeTemplateObject,
    __importStar: __importStar,
    __importDefault: __importDefault
  });

  function Identifier(node, scope, options) {
      if (options === void 0) { options = {}; }
      var _a = options.getVar, getVar = _a === void 0 ? false : _a, _b = options.throwErr, throwErr = _b === void 0 ? true : _b;
      if (node.name === 'undefined') {
          return undefined;
      }
      var variable = scope.find(node.name);
      if (variable) {
          return getVar ? variable : variable.get();
      }
      else if (throwErr) {
          throw new ReferenceError(node.name + " is not defined");
      }
      else {
          return undefined;
      }
  }

  var identifier = /*#__PURE__*/Object.freeze({
    Identifier: Identifier
  });

  function Literal(node, scope) {
      return node.value;
  }

  var literal = /*#__PURE__*/Object.freeze({
    Literal: Literal
  });

  function ThisExpression(node, scope) {
      return scope.find('this').get();
  }
  function ArrayExpression(node, scope) {
      var results = [];
      for (var index in node.elements) {
          var item = node.elements[index];
          if (item.type === 'SpreadElement') {
              results = results.concat(SpreadElement(item, scope));
          }
          else {
              results.push(evaluate(item, scope));
          }
      }
      return results;
  }
  function ObjectExpression(node, scope) {
      var object = {};
      for (var index in node.properties) {
          var property = node.properties[index];
          if (property.type === 'SpreadElement') {
              assign(object, SpreadElement(property, scope));
          }
          else {
              var key = void 0;
              var propKey = property.key;
              if (property.computed) {
                  key = evaluate(propKey, scope);
              }
              else {
                  if (propKey.type === 'Identifier') {
                      key = propKey.name;
                  }
                  else {
                      key = '' + (Literal(propKey, scope));
                  }
              }
              var value = evaluate(property.value, scope);
              var propKind = property.kind;
              if (propKind === 'init') {
                  object[key] = value;
              }
              else if (propKind === 'get') {
                  define(object, key, { get: value });
              }
              else {
                  define(object, key, { set: value });
              }
          }
      }
      return object;
  }
  function FunctionExpression(node, scope) {
      return createFunc$1(node, scope);
  }
  function UnaryExpression(node, scope) {
      var arg = node.argument;
      switch (node.operator) {
          case '+':
              return +(evaluate(arg, scope));
          case '-':
              return -(evaluate(arg, scope));
          case '!':
              return !(evaluate(arg, scope));
          case '~':
              return ~(evaluate(arg, scope));
          case 'void':
              return void (evaluate(arg, scope));
          case 'typeof':
              if (arg.type === 'Identifier') {
                  return typeof (Identifier(arg, scope, { throwErr: false }));
              }
              else {
                  return typeof (evaluate(arg, scope));
              }
          case 'delete':
              if (arg.type === 'MemberExpression') {
                  var variable = MemberExpression(arg, scope, { getVar: true });
                  return variable.del();
              }
              else if (arg.type === 'Identifier') {
                  var win = scope.global().find('window').get();
                  return delete win[arg.name];
              }
              else {
                  throw new SyntaxError('Unexpected token');
              }
          default:
              throw new SyntaxError("Unexpected token " + node.operator);
      }
  }
  function UpdateExpression(node, scope) {
      var arg = node.argument;
      var variable;
      if (arg.type === 'Identifier') {
          variable = Identifier(arg, scope, { getVar: true });
      }
      else if (arg.type === 'MemberExpression') {
          variable = MemberExpression(arg, scope, { getVar: true });
      }
      else {
          throw new SyntaxError('Unexpected token');
      }
      var value = variable.get();
      if (node.operator === '++') {
          variable.set(value + 1);
          return node.prefix ? variable.get() : value;
      }
      else if (node.operator === '--') {
          variable.set(value - 1);
          return node.prefix ? variable.get() : value;
      }
      else {
          throw new SyntaxError("Unexpected token " + node.operator);
      }
  }
  function BinaryExpression(node, scope) {
      var left = evaluate(node.left, scope);
      var right = evaluate(node.right, scope);
      var binaryOps = {
          '==': function () { return left == right; },
          '!=': function () { return left != right; },
          '===': function () { return left === right; },
          '!==': function () { return left !== right; },
          '<': function () { return left < right; },
          '<=': function () { return left <= right; },
          '>': function () { return left > right; },
          '>=': function () { return left >= right; },
          '<<': function () { return left << right; },
          '>>': function () { return left >> right; },
          '>>>': function () { return left >>> right; },
          '+': function () { return left + right; },
          '-': function () { return left - right; },
          '*': function () { return left * right; },
          '**': function () { return Math.pow(left, right); },
          '/': function () { return left / right; },
          '%': function () { return left % right; },
          '|': function () { return left | right; },
          '^': function () { return left ^ right; },
          '&': function () { return left & right; },
          'in': function () { return left in right; },
          'instanceof': function () { return left instanceof right; },
      };
      var handler = binaryOps[node.operator];
      if (handler) {
          return handler();
      }
      else {
          throw new SyntaxError("Unexpected token " + node.operator);
      }
  }
  function AssignmentExpression(node, scope) {
      var value = evaluate(node.right, scope);
      var left = node.left;
      var variable;
      if (left.type === 'Identifier') {
          variable = Identifier(left, scope, { getVar: true, throwErr: false });
          if (!variable) {
              var win = scope.global().find('window').get();
              variable = new Prop(win, left.name);
          }
      }
      else if (left.type === 'MemberExpression') {
          variable = MemberExpression(left, scope, { getVar: true });
      }
      else {
          return pattern$3(left, scope, { feed: value });
      }
      var assignOps = {
          '=': function () {
              variable.set(value);
              return variable.get();
          },
          '+=': function () {
              variable.set(variable.get() + value);
              return variable.get();
          },
          '-=': function () {
              variable.set(variable.get() - value);
              return variable.get();
          },
          '*=': function () {
              variable.set(variable.get() * value);
              return variable.get();
          },
          '/=': function () {
              variable.set(variable.get() / value);
              return variable.get();
          },
          '%=': function () {
              variable.set(variable.get() % value);
              return variable.get();
          },
          '**=': function () {
              variable.set(Math.pow(variable.get(), value));
              return variable.get();
          },
          '<<=': function () {
              variable.set(variable.get() << value);
              return variable.get();
          },
          '>>=': function () {
              variable.set(variable.get() >> value);
              return variable.get();
          },
          '>>>=': function () {
              variable.set(variable.get() >>> value);
              return variable.get();
          },
          '|=': function () {
              variable.set(variable.get() | value);
              return variable.get();
          },
          '^=': function () {
              variable.set(variable.get() ^ value);
              return variable.get();
          },
          '&=': function () {
              variable.set(variable.get() & value);
              return variable.get();
          },
      };
      var handler = assignOps[node.operator];
      if (handler) {
          return handler();
      }
      else {
          throw new SyntaxError("Unexpected token " + node.operator);
      }
  }
  function LogicalExpression(node, scope) {
      switch (node.operator) {
          case '||':
              return (evaluate(node.left, scope)) || (evaluate(node.right, scope));
          case '&&':
              return (evaluate(node.left, scope)) && (evaluate(node.right, scope));
          default:
              throw new SyntaxError("Unexpected token " + node.operator);
      }
  }
  function MemberExpression(node, scope, options) {
      if (options === void 0) { options = {}; }
      var _a = options.getObj, getObj = _a === void 0 ? false : _a, _b = options.getVar, getVar = _b === void 0 ? false : _b;
      var object;
      if (node.object.type === 'Super') {
          object = Super(node.object, scope, { getProto: true });
      }
      else {
          object = evaluate(node.object, scope);
      }
      if (getObj) {
          if (node.object.type === 'Super') {
              return scope.find('this').get();
          }
          else {
              return object;
          }
      }
      var key;
      if (node.computed) {
          key = evaluate(node.property, scope);
      }
      else {
          key = node.property.name;
      }
      if (getVar) {
          var setter = getSetter(object, key);
          if (node.object.type === 'Super' && setter) {
              var thisObject = scope.find('this').get();
              var privateKey = createSymbol(key);
              define(thisObject, privateKey, { set: setter });
              return new Prop(thisObject, privateKey);
          }
          else {
              return new Prop(object, key);
          }
      }
      else {
          var getter = getGetter(object, key);
          if (node.object.type === 'Super' && getter) {
              var thisObject = scope.find('this').get();
              return getter.call(thisObject);
          }
          else {
              return object[key];
          }
      }
  }
  function ConditionalExpression(node, scope) {
      return (evaluate(node.test, scope))
          ? (evaluate(node.consequent, scope))
          : (evaluate(node.alternate, scope));
  }
  function CallExpression(node, scope) {
      var func;
      var object;
      if (node.callee.type === 'MemberExpression') {
          object = MemberExpression(node.callee, scope, { getObj: true });
          var key = void 0;
          if (node.callee.computed) {
              key = evaluate(node.callee.property, scope);
          }
          else {
              key = node.callee.property.name;
          }
          var getter = getGetter(object, key);
          if (node.callee.object.type === 'Super' && getter) {
              var thisObject = scope.find('this').get();
              func = getter.call(thisObject);
          }
          else {
              func = object[key];
          }
          if (typeof func !== 'function') {
              throw new TypeError(key + " is not a function");
          }
      }
      else {
          object = scope.find('this').get();
          func = evaluate(node.callee, scope);
          if (typeof func !== 'function') {
              var name_1;
              if (node.callee.type === 'Identifier') {
                  name_1 = node.callee.name;
              }
              else {
                  try {
                      name_1 = JSON.stringify(func);
                  }
                  catch (err) {
                      name_1 = '' + func;
                  }
              }
              throw new TypeError(name_1 + " is not a function");
          }
      }
      var args = [];
      for (var index in node.arguments) {
          var arg = node.arguments[index];
          if (arg.type === 'SpreadElement') {
              args = args.concat(SpreadElement(arg, scope));
          }
          else {
              args.push(evaluate(arg, scope));
          }
      }
      return func.apply(object, args);
  }
  function NewExpression(node, scope) {
      var constructor = evaluate(node.callee, scope);
      if (typeof constructor !== 'function') {
          var name_2;
          if (node.callee.type === 'Identifier') {
              name_2 = node.callee.name;
          }
          else {
              try {
                  name_2 = JSON.stringify(constructor);
              }
              catch (err) {
                  name_2 = '' + constructor;
              }
          }
          throw new TypeError(name_2 + " is not a constructor");
      }
      else if (constructor[ARROW]) {
          throw new TypeError((constructor.name || '(intermediate value)') + " is not a constructor");
      }
      var args = [];
      for (var index in node.arguments) {
          var arg = node.arguments[index];
          if (arg.type === 'SpreadElement') {
              args = args.concat(SpreadElement(arg, scope));
          }
          else {
              args.push(evaluate(arg, scope));
          }
      }
      return new (constructor.bind.apply(constructor, __spread([void 0], args)))();
  }
  function SequenceExpression(node, scope) {
      var result;
      for (var index in node.expressions) {
          result = evaluate(node.expressions[index], scope);
      }
      return result;
  }
  function ArrowFunctionExpression(node, scope) {
      return createFunc$1(node, scope);
  }
  function TemplateLiteral(node, scope) {
      var quasis = node.quasis;
      var expressions = node.expressions;
      var result = '';
      var temEl;
      var expr;
      while (temEl = quasis.shift()) {
          result += TemplateElement(temEl, scope);
          expr = expressions.shift();
          if (expr) {
              result += evaluate(expr, scope);
          }
      }
      return result;
  }
  function TaggedTemplateExpression(node, scope) {
      var tagFunc = evaluate(node.tag, scope);
      var quasis = node.quasi.quasis;
      var str = quasis.map(function (v) { return v.value.cooked; });
      var raw = quasis.map(function (v) { return v.value.raw; });
      define(str, 'raw', {
          value: freeze(raw)
      });
      var expressions = node.quasi.expressions;
      var args = [];
      if (expressions) {
          for (var index in expressions) {
              args.push(evaluate(expressions[index], scope));
          }
      }
      return tagFunc.apply(void 0, __spread([freeze(str)], args));
  }
  function TemplateElement(node, scope) {
      return node.value.raw;
  }
  function ClassExpression(node, scope) {
      return createClass$1(node, scope);
  }
  function Super(node, scope, options) {
      if (options === void 0) { options = {}; }
      var _a = options.getProto, getProto = _a === void 0 ? false : _a;
      var superClass = scope.find(SUPER).get();
      return getProto ? superClass.prototype : superClass;
  }
  function SpreadElement(node, scope) {
      return evaluate(node.argument, scope);
  }

  var expression = /*#__PURE__*/Object.freeze({
    ThisExpression: ThisExpression,
    ArrayExpression: ArrayExpression,
    ObjectExpression: ObjectExpression,
    FunctionExpression: FunctionExpression,
    UnaryExpression: UnaryExpression,
    UpdateExpression: UpdateExpression,
    BinaryExpression: BinaryExpression,
    AssignmentExpression: AssignmentExpression,
    LogicalExpression: LogicalExpression,
    MemberExpression: MemberExpression,
    ConditionalExpression: ConditionalExpression,
    CallExpression: CallExpression,
    NewExpression: NewExpression,
    SequenceExpression: SequenceExpression,
    ArrowFunctionExpression: ArrowFunctionExpression,
    TemplateLiteral: TemplateLiteral,
    TaggedTemplateExpression: TaggedTemplateExpression,
    TemplateElement: TemplateElement,
    ClassExpression: ClassExpression,
    Super: Super,
    SpreadElement: SpreadElement
  });

  function ObjectPattern(node, scope, options) {
      if (options === void 0) { options = {}; }
      var _a = options.kind, kind = _a === void 0 ? 'let' : _a, _b = options.hoist, hoist = _b === void 0 ? false : _b, _c = options.feed, feed = _c === void 0 ? {} : _c;
      var fedKeys = [];
      for (var index in node.properties) {
          var property = node.properties[index];
          var value = property.value;
          if (hoist) {
              if (kind === 'var') {
                  if (value.type === 'Identifier') {
                      scope.var(value.name);
                  }
                  else {
                      pattern$3(value, scope, { kind: kind, hoist: hoist });
                  }
              }
          }
          else if (property.type === 'Property') {
              var key = void 0;
              if (property.computed) {
                  key = evaluate(property.key, scope);
              }
              else {
                  key = property.key.name;
              }
              fedKeys.push(key);
              if (value.type === 'Identifier') {
                  scope[kind](value.name, feed[key]);
              }
              else {
                  pattern$3(value, scope, { kind: kind, feed: feed[key] });
              }
          }
          else {
              var rest = assign({}, feed);
              for (var index_1 in fedKeys) {
                  delete rest[fedKeys[index_1]];
              }
              RestElement(property, scope, { kind: kind, feed: rest });
          }
      }
  }
  function ArrayPattern(node, scope, options) {
      if (options === void 0) { options = {}; }
      var kind = options.kind, _a = options.hoist, hoist = _a === void 0 ? false : _a, _b = options.feed, feed = _b === void 0 ? [] : _b;
      var result = [];
      for (var i = 0; i < node.elements.length; i++) {
          var element = node.elements[i];
          if (hoist) {
              if (kind === 'var') {
                  if (element.type === 'Identifier') {
                      scope.var(element.name);
                  }
                  else {
                      pattern$3(element, scope, { kind: kind, hoist: hoist });
                  }
              }
          }
          else {
              if (element.type === 'Identifier') {
                  if (kind) {
                      scope[kind](element.name, feed[i]);
                  }
                  else {
                      var variable = Identifier(element, scope, { getVar: true });
                      variable.set(feed[i]);
                      result.push(variable.get());
                  }
              }
              else if (element.type === 'RestElement') {
                  RestElement(element, scope, { kind: kind, feed: feed.slice(i) });
              }
              else {
                  pattern$3(element, scope, { kind: kind, feed: feed[i] });
              }
          }
      }
      if (result.length) {
          return result;
      }
  }
  function RestElement(node, scope, options) {
      if (options === void 0) { options = {}; }
      var kind = options.kind, _a = options.hoist, hoist = _a === void 0 ? false : _a, _b = options.feed, feed = _b === void 0 ? [] : _b;
      var arg = node.argument;
      if (hoist) {
          if (kind === 'var') {
              if (arg.type === 'Identifier') {
                  scope.var(arg.name);
              }
              else {
                  pattern$3(arg, scope, { kind: kind, hoist: hoist });
              }
          }
      }
      else {
          if (arg.type === 'Identifier') {
              if (kind) {
                  scope[kind](arg.name, feed);
              }
              else {
                  var variable = Identifier(arg, scope, { getVar: true });
                  variable.set(feed);
              }
          }
          else {
              pattern$3(arg, scope, { kind: kind, feed: feed });
          }
      }
  }
  function AssignmentPattern(node, scope) {
      var feed = evaluate(node.right, scope);
      if (node.left.type === 'Identifier') {
          scope.let(node.left.name, feed);
      }
      else {
          pattern$3(node.left, scope, { feed: feed });
      }
  }

  var pattern = /*#__PURE__*/Object.freeze({
    ObjectPattern: ObjectPattern,
    ArrayPattern: ArrayPattern,
    RestElement: RestElement,
    AssignmentPattern: AssignmentPattern
  });

  function Program(program, scope) {
      for (var index in program.body) {
          evaluate(program.body[index], scope);
      }
  }

  var program = /*#__PURE__*/Object.freeze({
    Program: Program
  });

  function ExpressionStatement(node, scope) {
      evaluate(node.expression, scope);
  }
  function BlockStatement(block, scope, options) {
      if (options === void 0) { options = {}; }
      var _a = options.invasived, invasived = _a === void 0 ? false : _a, _b = options.hoisted, hoisted = _b === void 0 ? false : _b;
      var subScope = invasived ? scope : new Scope(scope);
      if (!hoisted) {
          hoistFunc$1(block, subScope);
      }
      for (var index in block.body) {
          var result = evaluate(block.body[index], subScope);
          if (result === BREAK || result === CONTINUE || result === RETURN) {
              return result;
          }
      }
  }
  function EmptyStatement() {
  }
  function DebuggerStatement() {
      debugger;
  }
  function ReturnStatement(node, scope) {
      RETURN.RES = node.argument ? (evaluate(node.argument, scope)) : undefined;
      return RETURN;
  }
  function BreakStatement() {
      return BREAK;
  }
  function ContinueStatement() {
      return CONTINUE;
  }
  function IfStatement(node, scope) {
      if (evaluate(node.test, scope)) {
          return evaluate(node.consequent, scope);
      }
      else {
          return evaluate(node.alternate, scope);
      }
  }
  function SwitchStatement(node, scope) {
      var discriminant = evaluate(node.discriminant, scope);
      var matched = false;
      for (var index in node.cases) {
          var eachCase = node.cases[index];
          if (!matched
              && (!eachCase.test
                  || (evaluate(eachCase.test, scope)) === discriminant)) {
              matched = true;
          }
          if (matched) {
              var result = SwitchCase(eachCase, scope);
              if (result === BREAK || result === CONTINUE || result === RETURN) {
                  return result;
              }
          }
      }
  }
  function SwitchCase(node, scope) {
      for (var index in node.consequent) {
          var result = evaluate(node.consequent[index], scope);
          if (result === BREAK || result === CONTINUE || result === RETURN) {
              return result;
          }
      }
  }
  function ThrowStatement(node, scope) {
      throw evaluate(node.argument, scope);
  }
  function TryStatement(node, scope) {
      try {
          return BlockStatement(node.block, scope);
      }
      catch (err) {
          if (node.handler) {
              var subScope = new Scope(scope);
              var param = node.handler.param;
              if (param) {
                  if (param.type === 'Identifier') {
                      var name_1 = param.name;
                      subScope.let(name_1, err);
                  }
                  else {
                      pattern$3(param, scope, { feed: err });
                  }
              }
              return CatchClause(node.handler, subScope);
          }
          else {
              throw err;
          }
      }
      finally {
          if (node.finalizer) {
              return BlockStatement(node.finalizer, scope);
          }
      }
  }
  function CatchClause(node, scope) {
      return BlockStatement(node.body, scope, { invasived: true });
  }
  function WhileStatement(node, scope) {
      while (evaluate(node.test, scope)) {
          var result = evaluate(node.body, scope);
          if (result === BREAK) {
              break;
          }
          else if (result === CONTINUE) {
              continue;
          }
          else if (result === RETURN) {
              return result;
          }
      }
  }
  function DoWhileStatement(node, scope) {
      do {
          var result = evaluate(node.body, scope);
          if (result === BREAK) {
              break;
          }
          else if (result === CONTINUE) {
              continue;
          }
          else if (result === RETURN) {
              return result;
          }
      } while (evaluate(node.test, scope));
  }
  function ForStatement(node, scope) {
      var forScope = new Scope(scope);
      for (evaluate(node.init, forScope); node.test ? (evaluate(node.test, forScope)) : true; evaluate(node.update, forScope)) {
          var subScope = new Scope(forScope);
          var result = void 0;
          if (node.body.type === 'BlockStatement') {
              result = BlockStatement(node.body, subScope, { invasived: true });
          }
          else {
              result = evaluate(node.body, subScope);
          }
          if (result === BREAK) {
              break;
          }
          else if (result === CONTINUE) {
              continue;
          }
          else if (result === RETURN) {
              return result;
          }
      }
  }
  function ForInStatement(node, scope) {
      for (var value in evaluate(node.right, scope)) {
          var result = ForXHandler$1(node, scope, { value: value });
          if (result === BREAK) {
              break;
          }
          else if (result === CONTINUE) {
              continue;
          }
          else if (result === RETURN) {
              return result;
          }
      }
  }
  function ForOfStatement(node, scope) {
      var e_1, _a;
      var right = evaluate(node.right, scope);
      try {
          for (var right_1 = __values(right), right_1_1 = right_1.next(); !right_1_1.done; right_1_1 = right_1.next()) {
              var value = right_1_1.value;
              var result = ForXHandler$1(node, scope, { value: value });
              if (result === BREAK) {
                  break;
              }
              else if (result === CONTINUE) {
                  continue;
              }
              else if (result === RETURN) {
                  return result;
              }
          }
      }
      catch (e_1_1) { e_1 = { error: e_1_1 }; }
      finally {
          try {
              if (right_1_1 && !right_1_1.done && (_a = right_1.return)) _a.call(right_1);
          }
          finally { if (e_1) throw e_1.error; }
      }
  }

  var statement = /*#__PURE__*/Object.freeze({
    ExpressionStatement: ExpressionStatement,
    BlockStatement: BlockStatement,
    EmptyStatement: EmptyStatement,
    DebuggerStatement: DebuggerStatement,
    ReturnStatement: ReturnStatement,
    BreakStatement: BreakStatement,
    ContinueStatement: ContinueStatement,
    IfStatement: IfStatement,
    SwitchStatement: SwitchStatement,
    SwitchCase: SwitchCase,
    ThrowStatement: ThrowStatement,
    TryStatement: TryStatement,
    CatchClause: CatchClause,
    WhileStatement: WhileStatement,
    DoWhileStatement: DoWhileStatement,
    ForStatement: ForStatement,
    ForInStatement: ForInStatement,
    ForOfStatement: ForOfStatement
  });

  var evaluateOps = assign({}, declaration, expression, identifier, literal, pattern, program, statement);
  function evaluate(node, scope) {
      if (!node)
          return;
      var handler = evaluateOps[node.type];
      if (handler) {
          return handler(node, scope);
      }
      else {
          throw new Error(node.type + " isn't implemented");
      }
  }

  function FunctionDeclaration(node, scope) {
      scope.func(node.id.name, createFunc$1(node, scope));
  }
  function VariableDeclaration(node, scope, options) {
      if (options === void 0) { options = {}; }
      for (var index in node.declarations) {
          VariableDeclarator(node.declarations[index], scope, assign({ kind: node.kind }, options));
      }
  }
  function VariableDeclarator(node, scope, options) {
      if (options === void 0) { options = {}; }
      var _a = options.kind, kind = _a === void 0 ? 'let' : _a, _b = options.hoist, hoist = _b === void 0 ? false : _b, feed = options.feed;
      if (hoist) {
          if (kind === 'var') {
              if (node.id.type === 'Identifier') {
                  scope.var(node.id.name);
              }
              else {
                  pattern$3(node.id, scope, { kind: kind, hoist: hoist });
              }
          }
      }
      else if (kind === 'var'
          || kind === 'let'
          || kind === 'const') {
          var value = hasOwn(options, 'feed') ? feed : evaluate(node.init, scope);
          if (node.id.type === 'Identifier') {
              var name_1 = node.id.name;
              if (kind === 'var' && !node.init) {
                  scope.var(name_1, NOINIT);
              }
              else {
                  scope[kind](name_1, value);
              }
              if (node.init &&
                  [
                      'FunctionExpression',
                      'ArrowFunctionExpression'
                  ].indexOf(node.init.type) !== -1
                  && !value.name) {
                  define(value, 'name', {
                      value: name_1,
                      configurable: true
                  });
              }
          }
          else {
              pattern$3(node.id, scope, { kind: kind, feed: value });
          }
      }
      else {
          throw new SyntaxError('Unexpected identifier');
      }
  }
  function ClassDeclaration(node, scope) {
      scope.func(node.id.name, createClass$1(node, scope));
  }
  function ClassBody(node, scope, options) {
      if (options === void 0) { options = {}; }
      var _a = options.klass, klass = _a === void 0 ? function () { } : _a;
      for (var index in node.body) {
          MethodDefinition(node.body[index], scope, { klass: klass });
      }
  }
  function MethodDefinition(node, scope, options) {
      if (options === void 0) { options = {}; }
      var _a = options.klass, klass = _a === void 0 ? function () { } : _a;
      var key;
      if (node.computed) {
          key = evaluate(node.key, scope);
      }
      else if (node.key.type === 'Identifier') {
          key = node.key.name;
      }
      else {
          throw new SyntaxError('Unexpected token');
      }
      var obj = node.static ? klass : klass.prototype;
      var value = createFunc$1(node.value, scope);
      switch (node.kind) {
          case 'constructor':
              break;
          case 'method':
              define(obj, key, {
                  value: value,
                  writable: true,
                  configurable: true,
              });
              break;
          case 'get': {
              var oriDptor = getDptor(obj, key);
              define(obj, key, {
                  get: value,
                  set: oriDptor && oriDptor.set,
                  configurable: true,
              });
              break;
          }
          case 'set': {
              var oriDptor = getDptor(obj, key);
              define(obj, key, {
                  get: oriDptor && oriDptor.get,
                  set: value,
                  configurable: true,
              });
              break;
          }
          default:
              throw new SyntaxError('Unexpected token');
      }
  }

  function Identifier$1(node, scope, options) {
      var _a, getVar, _b, throwErr, variable;
      if (options === void 0) { options = {}; }
      return __generator(this, function (_c) {
          _a = options.getVar, getVar = _a === void 0 ? false : _a, _b = options.throwErr, throwErr = _b === void 0 ? true : _b;
          if (node.name === 'undefined') {
              return [2, undefined];
          }
          variable = scope.find(node.name);
          if (variable) {
              return [2, getVar ? variable : variable.get()];
          }
          else if (throwErr) {
              throw new ReferenceError(node.name + " is not defined");
          }
          else {
              return [2, undefined];
          }
          return [2];
      });
  }

  var identifier$1 = /*#__PURE__*/Object.freeze({
    Identifier: Identifier$1
  });

  function Literal$1(node, scope) {
      return __generator(this, function (_a) {
          return [2, node.value];
      });
  }

  var literal$1 = /*#__PURE__*/Object.freeze({
    Literal: Literal$1
  });

  function ThisExpression$1(node, scope) {
      return __generator(this, function (_a) {
          return [2, scope.find('this').get()];
      });
  }
  function ArrayExpression$1(node, scope) {
      var results, _a, _b, _i, index, item, _c, _d, _e, _f;
      return __generator(this, function (_g) {
          switch (_g.label) {
              case 0:
                  results = [];
                  _a = [];
                  for (_b in node.elements)
                      _a.push(_b);
                  _i = 0;
                  _g.label = 1;
              case 1:
                  if (!(_i < _a.length)) return [3, 6];
                  index = _a[_i];
                  item = node.elements[index];
                  if (!(item.type === 'SpreadElement')) return [3, 3];
                  _d = (_c = results).concat;
                  return [5, __values(SpreadElement$1(item, scope))];
              case 2:
                  results = _d.apply(_c, [_g.sent()]);
                  return [3, 5];
              case 3:
                  _f = (_e = results).push;
                  return [5, __values(evaluate$1(item, scope))];
              case 4:
                  _f.apply(_e, [_g.sent()]);
                  _g.label = 5;
              case 5:
                  _i++;
                  return [3, 1];
              case 6: return [2, results];
          }
      });
  }
  function ObjectExpression$1(node, scope) {
      var object, _a, _b, _i, index, property, _c, _d, key, propKey, _e, value, propKind;
      return __generator(this, function (_f) {
          switch (_f.label) {
              case 0:
                  object = {};
                  _a = [];
                  for (_b in node.properties)
                      _a.push(_b);
                  _i = 0;
                  _f.label = 1;
              case 1:
                  if (!(_i < _a.length)) return [3, 11];
                  index = _a[_i];
                  property = node.properties[index];
                  if (!(property.type === 'SpreadElement')) return [3, 3];
                  _c = assign;
                  _d = [object];
                  return [5, __values(SpreadElement$1(property, scope))];
              case 2:
                  _c.apply(void 0, _d.concat([_f.sent()]));
                  return [3, 10];
              case 3:
                  key = void 0;
                  propKey = property.key;
                  if (!property.computed) return [3, 5];
                  return [5, __values(evaluate$1(propKey, scope))];
              case 4:
                  key = _f.sent();
                  return [3, 8];
              case 5:
                  if (!(propKey.type === 'Identifier')) return [3, 6];
                  key = propKey.name;
                  return [3, 8];
              case 6:
                  _e = '';
                  return [5, __values(Literal$1(propKey, scope))];
              case 7:
                  key = _e + (_f.sent());
                  _f.label = 8;
              case 8: return [5, __values(evaluate$1(property.value, scope))];
              case 9:
                  value = _f.sent();
                  propKind = property.kind;
                  if (propKind === 'init') {
                      object[key] = value;
                  }
                  else if (propKind === 'get') {
                      define(object, key, { get: value });
                  }
                  else {
                      define(object, key, { set: value });
                  }
                  _f.label = 10;
              case 10:
                  _i++;
                  return [3, 1];
              case 11: return [2, object];
          }
      });
  }
  function FunctionExpression$1(node, scope) {
      return __generator(this, function (_a) {
          return [2, createFunc(node, scope)];
      });
  }
  function UnaryExpression$1(node, scope) {
      var arg, _a, variable, win;
      return __generator(this, function (_b) {
          switch (_b.label) {
              case 0:
                  arg = node.argument;
                  _a = node.operator;
                  switch (_a) {
                      case '+': return [3, 1];
                      case '-': return [3, 3];
                      case '!': return [3, 5];
                      case '~': return [3, 7];
                      case 'void': return [3, 9];
                      case 'typeof': return [3, 11];
                      case 'delete': return [3, 15];
                  }
                  return [3, 18];
              case 1: return [5, __values(evaluate$1(arg, scope))];
              case 2: return [2, +(_b.sent())];
              case 3: return [5, __values(evaluate$1(arg, scope))];
              case 4: return [2, -(_b.sent())];
              case 5: return [5, __values(evaluate$1(arg, scope))];
              case 6: return [2, !(_b.sent())];
              case 7: return [5, __values(evaluate$1(arg, scope))];
              case 8: return [2, ~(_b.sent())];
              case 9: return [5, __values(evaluate$1(arg, scope))];
              case 10: return [2, void (_b.sent())];
              case 11:
                  if (!(arg.type === 'Identifier')) return [3, 13];
                  return [5, __values(Identifier$1(arg, scope, { throwErr: false }))];
              case 12: return [2, typeof (_b.sent())];
              case 13: return [5, __values(evaluate$1(arg, scope))];
              case 14: return [2, typeof (_b.sent())];
              case 15:
                  if (!(arg.type === 'MemberExpression')) return [3, 17];
                  return [5, __values(MemberExpression$1(arg, scope, { getVar: true }))];
              case 16:
                  variable = _b.sent();
                  return [2, variable.del()];
              case 17:
                  if (arg.type === 'Identifier') {
                      win = scope.global().find('window').get();
                      return [2, delete win[arg.name]];
                  }
                  else {
                      throw new SyntaxError('Unexpected token');
                  }
                  _b.label = 18;
              case 18: throw new SyntaxError("Unexpected token " + node.operator);
          }
      });
  }
  function UpdateExpression$1(node, scope) {
      var arg, variable, value;
      return __generator(this, function (_a) {
          switch (_a.label) {
              case 0:
                  arg = node.argument;
                  if (!(arg.type === 'Identifier')) return [3, 2];
                  return [5, __values(Identifier$1(arg, scope, { getVar: true }))];
              case 1:
                  variable = _a.sent();
                  return [3, 5];
              case 2:
                  if (!(arg.type === 'MemberExpression')) return [3, 4];
                  return [5, __values(MemberExpression$1(arg, scope, { getVar: true }))];
              case 3:
                  variable = _a.sent();
                  return [3, 5];
              case 4: throw new SyntaxError('Unexpected token');
              case 5:
                  value = variable.get();
                  if (node.operator === '++') {
                      variable.set(value + 1);
                      return [2, node.prefix ? variable.get() : value];
                  }
                  else if (node.operator === '--') {
                      variable.set(value - 1);
                      return [2, node.prefix ? variable.get() : value];
                  }
                  else {
                      throw new SyntaxError("Unexpected token " + node.operator);
                  }
                  return [2];
          }
      });
  }
  function BinaryExpression$1(node, scope) {
      var left, right, binaryOps, handler;
      return __generator(this, function (_a) {
          switch (_a.label) {
              case 0: return [5, __values(evaluate$1(node.left, scope))];
              case 1:
                  left = _a.sent();
                  return [5, __values(evaluate$1(node.right, scope))];
              case 2:
                  right = _a.sent();
                  binaryOps = {
                      '==': function () { return left == right; },
                      '!=': function () { return left != right; },
                      '===': function () { return left === right; },
                      '!==': function () { return left !== right; },
                      '<': function () { return left < right; },
                      '<=': function () { return left <= right; },
                      '>': function () { return left > right; },
                      '>=': function () { return left >= right; },
                      '<<': function () { return left << right; },
                      '>>': function () { return left >> right; },
                      '>>>': function () { return left >>> right; },
                      '+': function () { return left + right; },
                      '-': function () { return left - right; },
                      '*': function () { return left * right; },
                      '**': function () { return Math.pow(left, right); },
                      '/': function () { return left / right; },
                      '%': function () { return left % right; },
                      '|': function () { return left | right; },
                      '^': function () { return left ^ right; },
                      '&': function () { return left & right; },
                      'in': function () { return left in right; },
                      'instanceof': function () { return left instanceof right; },
                  };
                  handler = binaryOps[node.operator];
                  if (handler) {
                      return [2, handler()];
                  }
                  else {
                      throw new SyntaxError("Unexpected token " + node.operator);
                  }
                  return [2];
          }
      });
  }
  function AssignmentExpression$1(node, scope) {
      var value, left, variable, win, assignOps, handler;
      return __generator(this, function (_a) {
          switch (_a.label) {
              case 0: return [5, __values(evaluate$1(node.right, scope))];
              case 1:
                  value = _a.sent();
                  left = node.left;
                  if (!(left.type === 'Identifier')) return [3, 3];
                  return [5, __values(Identifier$1(left, scope, { getVar: true, throwErr: false }))];
              case 2:
                  variable = _a.sent();
                  if (!variable) {
                      win = scope.global().find('window').get();
                      variable = new Prop(win, left.name);
                  }
                  return [3, 7];
              case 3:
                  if (!(left.type === 'MemberExpression')) return [3, 5];
                  return [5, __values(MemberExpression$1(left, scope, { getVar: true }))];
              case 4:
                  variable = _a.sent();
                  return [3, 7];
              case 5: return [5, __values(pattern$2(left, scope, { feed: value }))];
              case 6: return [2, _a.sent()];
              case 7:
                  assignOps = {
                      '=': function () {
                          variable.set(value);
                          return variable.get();
                      },
                      '+=': function () {
                          variable.set(variable.get() + value);
                          return variable.get();
                      },
                      '-=': function () {
                          variable.set(variable.get() - value);
                          return variable.get();
                      },
                      '*=': function () {
                          variable.set(variable.get() * value);
                          return variable.get();
                      },
                      '/=': function () {
                          variable.set(variable.get() / value);
                          return variable.get();
                      },
                      '%=': function () {
                          variable.set(variable.get() % value);
                          return variable.get();
                      },
                      '**=': function () {
                          variable.set(Math.pow(variable.get(), value));
                          return variable.get();
                      },
                      '<<=': function () {
                          variable.set(variable.get() << value);
                          return variable.get();
                      },
                      '>>=': function () {
                          variable.set(variable.get() >> value);
                          return variable.get();
                      },
                      '>>>=': function () {
                          variable.set(variable.get() >>> value);
                          return variable.get();
                      },
                      '|=': function () {
                          variable.set(variable.get() | value);
                          return variable.get();
                      },
                      '^=': function () {
                          variable.set(variable.get() ^ value);
                          return variable.get();
                      },
                      '&=': function () {
                          variable.set(variable.get() & value);
                          return variable.get();
                      },
                  };
                  handler = assignOps[node.operator];
                  if (handler) {
                      return [2, handler()];
                  }
                  else {
                      throw new SyntaxError("Unexpected token " + node.operator);
                  }
                  return [2];
          }
      });
  }
  function LogicalExpression$1(node, scope) {
      var _a, _b, _c;
      return __generator(this, function (_d) {
          switch (_d.label) {
              case 0:
                  _a = node.operator;
                  switch (_a) {
                      case '||': return [3, 1];
                      case '&&': return [3, 5];
                  }
                  return [3, 9];
              case 1: return [5, __values(evaluate$1(node.left, scope))];
              case 2:
                  _b = (_d.sent());
                  if (_b) return [3, 4];
                  return [5, __values(evaluate$1(node.right, scope))];
              case 3:
                  _b = (_d.sent());
                  _d.label = 4;
              case 4: return [2, _b];
              case 5: return [5, __values(evaluate$1(node.left, scope))];
              case 6:
                  _c = (_d.sent());
                  if (!_c) return [3, 8];
                  return [5, __values(evaluate$1(node.right, scope))];
              case 7:
                  _c = (_d.sent());
                  _d.label = 8;
              case 8: return [2, _c];
              case 9: throw new SyntaxError("Unexpected token " + node.operator);
          }
      });
  }
  function MemberExpression$1(node, scope, options) {
      var _a, getObj, _b, getVar, object, key, setter, thisObject, privateKey, getter, thisObject;
      if (options === void 0) { options = {}; }
      return __generator(this, function (_c) {
          switch (_c.label) {
              case 0:
                  _a = options.getObj, getObj = _a === void 0 ? false : _a, _b = options.getVar, getVar = _b === void 0 ? false : _b;
                  if (!(node.object.type === 'Super')) return [3, 2];
                  return [5, __values(Super$1(node.object, scope, { getProto: true }))];
              case 1:
                  object = _c.sent();
                  return [3, 4];
              case 2: return [5, __values(evaluate$1(node.object, scope))];
              case 3:
                  object = _c.sent();
                  _c.label = 4;
              case 4:
                  if (getObj) {
                      if (node.object.type === 'Super') {
                          return [2, scope.find('this').get()];
                      }
                      else {
                          return [2, object];
                      }
                  }
                  if (!node.computed) return [3, 6];
                  return [5, __values(evaluate$1(node.property, scope))];
              case 5:
                  key = _c.sent();
                  return [3, 7];
              case 6:
                  key = node.property.name;
                  _c.label = 7;
              case 7:
                  if (getVar) {
                      setter = getSetter(object, key);
                      if (node.object.type === 'Super' && setter) {
                          thisObject = scope.find('this').get();
                          privateKey = createSymbol(key);
                          define(thisObject, privateKey, { set: setter });
                          return [2, new Prop(thisObject, privateKey)];
                      }
                      else {
                          return [2, new Prop(object, key)];
                      }
                  }
                  else {
                      getter = getGetter(object, key);
                      if (node.object.type === 'Super' && getter) {
                          thisObject = scope.find('this').get();
                          return [2, getter.call(thisObject)];
                      }
                      else {
                          return [2, object[key]];
                      }
                  }
                  return [2];
          }
      });
  }
  function ConditionalExpression$1(node, scope) {
      var _a;
      return __generator(this, function (_b) {
          switch (_b.label) {
              case 0: return [5, __values(evaluate$1(node.test, scope))];
              case 1:
                  if (!(_b.sent())) return [3, 3];
                  return [5, __values(evaluate$1(node.consequent, scope))];
              case 2:
                  _a = (_b.sent());
                  return [3, 5];
              case 3: return [5, __values(evaluate$1(node.alternate, scope))];
              case 4:
                  _a = (_b.sent());
                  _b.label = 5;
              case 5: return [2, _a];
          }
      });
  }
  function CallExpression$1(node, scope) {
      var func, object, key, getter, thisObject, name_1, args, _a, _b, _i, index, arg, _c, _d, _e, _f;
      return __generator(this, function (_g) {
          switch (_g.label) {
              case 0:
                  if (!(node.callee.type === 'MemberExpression')) return [3, 5];
                  return [5, __values(MemberExpression$1(node.callee, scope, { getObj: true }))];
              case 1:
                  object = _g.sent();
                  key = void 0;
                  if (!node.callee.computed) return [3, 3];
                  return [5, __values(evaluate$1(node.callee.property, scope))];
              case 2:
                  key = _g.sent();
                  return [3, 4];
              case 3:
                  key = node.callee.property.name;
                  _g.label = 4;
              case 4:
                  getter = getGetter(object, key);
                  if (node.callee.object.type === 'Super' && getter) {
                      thisObject = scope.find('this').get();
                      func = getter.call(thisObject);
                  }
                  else {
                      func = object[key];
                  }
                  if (typeof func !== 'function') {
                      throw new TypeError(key + " is not a function");
                  }
                  return [3, 7];
              case 5:
                  object = scope.find('this').get();
                  return [5, __values(evaluate$1(node.callee, scope))];
              case 6:
                  func = _g.sent();
                  if (typeof func !== 'function') {
                      if (node.callee.type === 'Identifier') {
                          name_1 = node.callee.name;
                      }
                      else {
                          try {
                              name_1 = JSON.stringify(func);
                          }
                          catch (err) {
                              name_1 = '' + func;
                          }
                      }
                      throw new TypeError(name_1 + " is not a function");
                  }
                  _g.label = 7;
              case 7:
                  args = [];
                  _a = [];
                  for (_b in node.arguments)
                      _a.push(_b);
                  _i = 0;
                  _g.label = 8;
              case 8:
                  if (!(_i < _a.length)) return [3, 13];
                  index = _a[_i];
                  arg = node.arguments[index];
                  if (!(arg.type === 'SpreadElement')) return [3, 10];
                  _d = (_c = args).concat;
                  return [5, __values(SpreadElement$1(arg, scope))];
              case 9:
                  args = _d.apply(_c, [_g.sent()]);
                  return [3, 12];
              case 10:
                  _f = (_e = args).push;
                  return [5, __values(evaluate$1(arg, scope))];
              case 11:
                  _f.apply(_e, [_g.sent()]);
                  _g.label = 12;
              case 12:
                  _i++;
                  return [3, 8];
              case 13: return [2, func.apply(object, args)];
          }
      });
  }
  function NewExpression$1(node, scope) {
      var constructor, name_2, args, _a, _b, _i, index, arg, _c, _d, _e, _f;
      return __generator(this, function (_g) {
          switch (_g.label) {
              case 0: return [5, __values(evaluate$1(node.callee, scope))];
              case 1:
                  constructor = _g.sent();
                  if (typeof constructor !== 'function') {
                      if (node.callee.type === 'Identifier') {
                          name_2 = node.callee.name;
                      }
                      else {
                          try {
                              name_2 = JSON.stringify(constructor);
                          }
                          catch (err) {
                              name_2 = '' + constructor;
                          }
                      }
                      throw new TypeError(name_2 + " is not a constructor");
                  }
                  else if (constructor[ARROW]) {
                      throw new TypeError((constructor.name || '(intermediate value)') + " is not a constructor");
                  }
                  args = [];
                  _a = [];
                  for (_b in node.arguments)
                      _a.push(_b);
                  _i = 0;
                  _g.label = 2;
              case 2:
                  if (!(_i < _a.length)) return [3, 7];
                  index = _a[_i];
                  arg = node.arguments[index];
                  if (!(arg.type === 'SpreadElement')) return [3, 4];
                  _d = (_c = args).concat;
                  return [5, __values(SpreadElement$1(arg, scope))];
              case 3:
                  args = _d.apply(_c, [_g.sent()]);
                  return [3, 6];
              case 4:
                  _f = (_e = args).push;
                  return [5, __values(evaluate$1(arg, scope))];
              case 5:
                  _f.apply(_e, [_g.sent()]);
                  _g.label = 6;
              case 6:
                  _i++;
                  return [3, 2];
              case 7: return [2, new (constructor.bind.apply(constructor, __spread([void 0], args)))()];
          }
      });
  }
  function SequenceExpression$1(node, scope) {
      var result, _a, _b, _i, index;
      return __generator(this, function (_c) {
          switch (_c.label) {
              case 0:
                  _a = [];
                  for (_b in node.expressions)
                      _a.push(_b);
                  _i = 0;
                  _c.label = 1;
              case 1:
                  if (!(_i < _a.length)) return [3, 4];
                  index = _a[_i];
                  return [5, __values(evaluate$1(node.expressions[index], scope))];
              case 2:
                  result = _c.sent();
                  _c.label = 3;
              case 3:
                  _i++;
                  return [3, 1];
              case 4: return [2, result];
          }
      });
  }
  function ArrowFunctionExpression$1(node, scope) {
      return __generator(this, function (_a) {
          return [2, createFunc(node, scope)];
      });
  }
  function TemplateLiteral$1(node, scope) {
      var quasis, expressions, result, temEl, expr, _a, _b;
      return __generator(this, function (_c) {
          switch (_c.label) {
              case 0:
                  quasis = node.quasis;
                  expressions = node.expressions;
                  result = '';
                  _c.label = 1;
              case 1:
                  if (!(temEl = quasis.shift())) return [3, 5];
                  _a = result;
                  return [5, __values(TemplateElement$1(temEl, scope))];
              case 2:
                  result = _a + _c.sent();
                  expr = expressions.shift();
                  if (!expr) return [3, 4];
                  _b = result;
                  return [5, __values(evaluate$1(expr, scope))];
              case 3:
                  result = _b + _c.sent();
                  _c.label = 4;
              case 4: return [3, 1];
              case 5: return [2, result];
          }
      });
  }
  function TaggedTemplateExpression$1(node, scope) {
      var tagFunc, quasis, str, raw, expressions, args, _a, _b, _i, index, _c, _d;
      return __generator(this, function (_e) {
          switch (_e.label) {
              case 0: return [5, __values(evaluate$1(node.tag, scope))];
              case 1:
                  tagFunc = _e.sent();
                  quasis = node.quasi.quasis;
                  str = quasis.map(function (v) { return v.value.cooked; });
                  raw = quasis.map(function (v) { return v.value.raw; });
                  define(str, 'raw', {
                      value: freeze(raw)
                  });
                  expressions = node.quasi.expressions;
                  args = [];
                  if (!expressions) return [3, 5];
                  _a = [];
                  for (_b in expressions)
                      _a.push(_b);
                  _i = 0;
                  _e.label = 2;
              case 2:
                  if (!(_i < _a.length)) return [3, 5];
                  index = _a[_i];
                  _d = (_c = args).push;
                  return [5, __values(evaluate$1(expressions[index], scope))];
              case 3:
                  _d.apply(_c, [_e.sent()]);
                  _e.label = 4;
              case 4:
                  _i++;
                  return [3, 2];
              case 5: return [2, tagFunc.apply(void 0, __spread([freeze(str)], args))];
          }
      });
  }
  function TemplateElement$1(node, scope) {
      return __generator(this, function (_a) {
          return [2, node.value.raw];
      });
  }
  function ClassExpression$1(node, scope) {
      return __generator(this, function (_a) {
          switch (_a.label) {
              case 0: return [5, __values(createClass(node, scope))];
              case 1: return [2, _a.sent()];
          }
      });
  }
  function Super$1(node, scope, options) {
      var _a, getProto, superClass;
      if (options === void 0) { options = {}; }
      return __generator(this, function (_b) {
          _a = options.getProto, getProto = _a === void 0 ? false : _a;
          superClass = scope.find(SUPER).get();
          return [2, getProto ? superClass.prototype : superClass];
      });
  }
  function SpreadElement$1(node, scope) {
      return __generator(this, function (_a) {
          switch (_a.label) {
              case 0: return [5, __values(evaluate$1(node.argument, scope))];
              case 1: return [2, _a.sent()];
          }
      });
  }
  function YieldExpression(node, scope) {
      var res, _a;
      return __generator(this, function (_b) {
          switch (_b.label) {
              case 0: return [5, __values(evaluate$1(node.argument, scope))];
              case 1:
                  res = _b.sent();
                  if (!node.delegate) return [3, 3];
                  return [5, __values(res)];
              case 2:
                  _a = _b.sent();
                  return [3, 5];
              case 3: return [4, res];
              case 4:
                  _a = _b.sent();
                  _b.label = 5;
              case 5: return [2, _a];
          }
      });
  }
  function AwaitExpression(node, scope) {
      var _a;
      return __generator(this, function (_b) {
          switch (_b.label) {
              case 0:
                  _a = AWAIT;
                  return [5, __values(evaluate$1(node.argument, scope))];
              case 1:
                  _a.RES = _b.sent();
                  return [4, AWAIT];
              case 2: return [2, _b.sent()];
          }
      });
  }

  var expression$1 = /*#__PURE__*/Object.freeze({
    ThisExpression: ThisExpression$1,
    ArrayExpression: ArrayExpression$1,
    ObjectExpression: ObjectExpression$1,
    FunctionExpression: FunctionExpression$1,
    UnaryExpression: UnaryExpression$1,
    UpdateExpression: UpdateExpression$1,
    BinaryExpression: BinaryExpression$1,
    AssignmentExpression: AssignmentExpression$1,
    LogicalExpression: LogicalExpression$1,
    MemberExpression: MemberExpression$1,
    ConditionalExpression: ConditionalExpression$1,
    CallExpression: CallExpression$1,
    NewExpression: NewExpression$1,
    SequenceExpression: SequenceExpression$1,
    ArrowFunctionExpression: ArrowFunctionExpression$1,
    TemplateLiteral: TemplateLiteral$1,
    TaggedTemplateExpression: TaggedTemplateExpression$1,
    TemplateElement: TemplateElement$1,
    ClassExpression: ClassExpression$1,
    Super: Super$1,
    SpreadElement: SpreadElement$1,
    YieldExpression: YieldExpression,
    AwaitExpression: AwaitExpression
  });

  function ObjectPattern$1(node, scope, options) {
      var _a, kind, _b, hoist, _c, feed, fedKeys, _d, _e, _i, index, property, value, key, rest, index_1;
      if (options === void 0) { options = {}; }
      return __generator(this, function (_f) {
          switch (_f.label) {
              case 0:
                  _a = options.kind, kind = _a === void 0 ? 'let' : _a, _b = options.hoist, hoist = _b === void 0 ? false : _b, _c = options.feed, feed = _c === void 0 ? {} : _c;
                  fedKeys = [];
                  _d = [];
                  for (_e in node.properties)
                      _d.push(_e);
                  _i = 0;
                  _f.label = 1;
              case 1:
                  if (!(_i < _d.length)) return [3, 15];
                  index = _d[_i];
                  property = node.properties[index];
                  value = property.value;
                  if (!hoist) return [3, 5];
                  if (!(kind === 'var')) return [3, 4];
                  if (!(value.type === 'Identifier')) return [3, 2];
                  scope.var(value.name);
                  return [3, 4];
              case 2: return [5, __values(pattern$2(value, scope, { kind: kind, hoist: hoist }))];
              case 3:
                  _f.sent();
                  _f.label = 4;
              case 4: return [3, 14];
              case 5:
                  if (!(property.type === 'Property')) return [3, 12];
                  key = void 0;
                  if (!property.computed) return [3, 7];
                  return [5, __values(evaluate$1(property.key, scope))];
              case 6:
                  key = _f.sent();
                  return [3, 8];
              case 7:
                  key = property.key.name;
                  _f.label = 8;
              case 8:
                  fedKeys.push(key);
                  if (!(value.type === 'Identifier')) return [3, 9];
                  scope[kind](value.name, feed[key]);
                  return [3, 11];
              case 9: return [5, __values(pattern$2(value, scope, { kind: kind, feed: feed[key] }))];
              case 10:
                  _f.sent();
                  _f.label = 11;
              case 11: return [3, 14];
              case 12:
                  rest = assign({}, feed);
                  for (index_1 in fedKeys) {
                      delete rest[fedKeys[index_1]];
                  }
                  return [5, __values(RestElement$1(property, scope, { kind: kind, feed: rest }))];
              case 13:
                  _f.sent();
                  _f.label = 14;
              case 14:
                  _i++;
                  return [3, 1];
              case 15: return [2];
          }
      });
  }
  function ArrayPattern$1(node, scope, options) {
      var kind, _a, hoist, _b, feed, result, i, element, variable;
      if (options === void 0) { options = {}; }
      return __generator(this, function (_c) {
          switch (_c.label) {
              case 0:
                  kind = options.kind, _a = options.hoist, hoist = _a === void 0 ? false : _a, _b = options.feed, feed = _b === void 0 ? [] : _b;
                  result = [];
                  i = 0;
                  _c.label = 1;
              case 1:
                  if (!(i < node.elements.length)) return [3, 14];
                  element = node.elements[i];
                  if (!hoist) return [3, 5];
                  if (!(kind === 'var')) return [3, 4];
                  if (!(element.type === 'Identifier')) return [3, 2];
                  scope.var(element.name);
                  return [3, 4];
              case 2: return [5, __values(pattern$2(element, scope, { kind: kind, hoist: hoist }))];
              case 3:
                  _c.sent();
                  _c.label = 4;
              case 4: return [3, 13];
              case 5:
                  if (!(element.type === 'Identifier')) return [3, 9];
                  if (!kind) return [3, 6];
                  scope[kind](element.name, feed[i]);
                  return [3, 8];
              case 6: return [5, __values(Identifier$1(element, scope, { getVar: true }))];
              case 7:
                  variable = _c.sent();
                  variable.set(feed[i]);
                  result.push(variable.get());
                  _c.label = 8;
              case 8: return [3, 13];
              case 9:
                  if (!(element.type === 'RestElement')) return [3, 11];
                  return [5, __values(RestElement$1(element, scope, { kind: kind, feed: feed.slice(i) }))];
              case 10:
                  _c.sent();
                  return [3, 13];
              case 11: return [5, __values(pattern$2(element, scope, { kind: kind, feed: feed[i] }))];
              case 12:
                  _c.sent();
                  _c.label = 13;
              case 13:
                  i++;
                  return [3, 1];
              case 14:
                  if (result.length) {
                      return [2, result];
                  }
                  return [2];
          }
      });
  }
  function RestElement$1(node, scope, options) {
      var kind, _a, hoist, _b, feed, arg, variable;
      if (options === void 0) { options = {}; }
      return __generator(this, function (_c) {
          switch (_c.label) {
              case 0:
                  kind = options.kind, _a = options.hoist, hoist = _a === void 0 ? false : _a, _b = options.feed, feed = _b === void 0 ? [] : _b;
                  arg = node.argument;
                  if (!hoist) return [3, 4];
                  if (!(kind === 'var')) return [3, 3];
                  if (!(arg.type === 'Identifier')) return [3, 1];
                  scope.var(arg.name);
                  return [3, 3];
              case 1: return [5, __values(pattern$2(arg, scope, { kind: kind, hoist: hoist }))];
              case 2:
                  _c.sent();
                  _c.label = 3;
              case 3: return [3, 10];
              case 4:
                  if (!(arg.type === 'Identifier')) return [3, 8];
                  if (!kind) return [3, 5];
                  scope[kind](arg.name, feed);
                  return [3, 7];
              case 5: return [5, __values(Identifier$1(arg, scope, { getVar: true }))];
              case 6:
                  variable = _c.sent();
                  variable.set(feed);
                  _c.label = 7;
              case 7: return [3, 10];
              case 8: return [5, __values(pattern$2(arg, scope, { kind: kind, feed: feed }))];
              case 9:
                  _c.sent();
                  _c.label = 10;
              case 10: return [2];
          }
      });
  }
  function AssignmentPattern$1(node, scope) {
      var feed;
      return __generator(this, function (_a) {
          switch (_a.label) {
              case 0: return [5, __values(evaluate$1(node.right, scope))];
              case 1:
                  feed = _a.sent();
                  if (!(node.left.type === 'Identifier')) return [3, 2];
                  scope.let(node.left.name, feed);
                  return [3, 4];
              case 2: return [5, __values(pattern$2(node.left, scope, { feed: feed }))];
              case 3:
                  _a.sent();
                  _a.label = 4;
              case 4: return [2];
          }
      });
  }

  var pattern$1 = /*#__PURE__*/Object.freeze({
    ObjectPattern: ObjectPattern$1,
    ArrayPattern: ArrayPattern$1,
    RestElement: RestElement$1,
    AssignmentPattern: AssignmentPattern$1
  });

  function Program$1(program, scope) {
      var _a, _b, _i, index;
      return __generator(this, function (_c) {
          switch (_c.label) {
              case 0:
                  _a = [];
                  for (_b in program.body)
                      _a.push(_b);
                  _i = 0;
                  _c.label = 1;
              case 1:
                  if (!(_i < _a.length)) return [3, 4];
                  index = _a[_i];
                  return [5, __values(evaluate$1(program.body[index], scope))];
              case 2:
                  _c.sent();
                  _c.label = 3;
              case 3:
                  _i++;
                  return [3, 1];
              case 4: return [2];
          }
      });
  }

  var program$1 = /*#__PURE__*/Object.freeze({
    Program: Program$1
  });

  function ExpressionStatement$1(node, scope) {
      return __generator(this, function (_a) {
          switch (_a.label) {
              case 0: return [5, __values(evaluate$1(node.expression, scope))];
              case 1:
                  _a.sent();
                  return [2];
          }
      });
  }
  function BlockStatement$1(block, scope, options) {
      var _a, invasived, _b, hoisted, subScope, _c, _d, _i, index, result;
      if (options === void 0) { options = {}; }
      return __generator(this, function (_e) {
          switch (_e.label) {
              case 0:
                  _a = options.invasived, invasived = _a === void 0 ? false : _a, _b = options.hoisted, hoisted = _b === void 0 ? false : _b;
                  subScope = invasived ? scope : new Scope(scope);
                  if (!!hoisted) return [3, 2];
                  return [5, __values(hoistFunc(block, subScope))];
              case 1:
                  _e.sent();
                  _e.label = 2;
              case 2:
                  _c = [];
                  for (_d in block.body)
                      _c.push(_d);
                  _i = 0;
                  _e.label = 3;
              case 3:
                  if (!(_i < _c.length)) return [3, 6];
                  index = _c[_i];
                  return [5, __values(evaluate$1(block.body[index], subScope))];
              case 4:
                  result = _e.sent();
                  if (result === BREAK || result === CONTINUE || result === RETURN) {
                      return [2, result];
                  }
                  _e.label = 5;
              case 5:
                  _i++;
                  return [3, 3];
              case 6: return [2];
          }
      });
  }
  function EmptyStatement$1() {
      return __generator(this, function (_a) {
          return [2];
      });
  }
  function DebuggerStatement$1() {
      return __generator(this, function (_a) {
          debugger;
          return [2];
      });
  }
  function ReturnStatement$1(node, scope) {
      var _a, _b;
      return __generator(this, function (_c) {
          switch (_c.label) {
              case 0:
                  _a = RETURN;
                  if (!node.argument) return [3, 2];
                  return [5, __values(evaluate$1(node.argument, scope))];
              case 1:
                  _b = (_c.sent());
                  return [3, 3];
              case 2:
                  _b = undefined;
                  _c.label = 3;
              case 3:
                  _a.RES = _b;
                  return [2, RETURN];
          }
      });
  }
  function BreakStatement$1() {
      return __generator(this, function (_a) {
          return [2, BREAK];
      });
  }
  function ContinueStatement$1() {
      return __generator(this, function (_a) {
          return [2, CONTINUE];
      });
  }
  function IfStatement$1(node, scope) {
      return __generator(this, function (_a) {
          switch (_a.label) {
              case 0: return [5, __values(evaluate$1(node.test, scope))];
              case 1:
                  if (!_a.sent()) return [3, 3];
                  return [5, __values(evaluate$1(node.consequent, scope))];
              case 2: return [2, _a.sent()];
              case 3: return [5, __values(evaluate$1(node.alternate, scope))];
              case 4: return [2, _a.sent()];
          }
      });
  }
  function SwitchStatement$1(node, scope) {
      var discriminant, matched, _a, _b, _i, index, eachCase, _c, _d, result;
      return __generator(this, function (_e) {
          switch (_e.label) {
              case 0: return [5, __values(evaluate$1(node.discriminant, scope))];
              case 1:
                  discriminant = _e.sent();
                  matched = false;
                  _a = [];
                  for (_b in node.cases)
                      _a.push(_b);
                  _i = 0;
                  _e.label = 2;
              case 2:
                  if (!(_i < _a.length)) return [3, 8];
                  index = _a[_i];
                  eachCase = node.cases[index];
                  _c = !matched;
                  if (!_c) return [3, 5];
                  _d = !eachCase.test;
                  if (_d) return [3, 4];
                  return [5, __values(evaluate$1(eachCase.test, scope))];
              case 3:
                  _d = (_e.sent()) === discriminant;
                  _e.label = 4;
              case 4:
                  _c = (_d);
                  _e.label = 5;
              case 5:
                  if (_c) {
                      matched = true;
                  }
                  if (!matched) return [3, 7];
                  return [5, __values(SwitchCase$1(eachCase, scope))];
              case 6:
                  result = _e.sent();
                  if (result === BREAK || result === CONTINUE || result === RETURN) {
                      return [2, result];
                  }
                  _e.label = 7;
              case 7:
                  _i++;
                  return [3, 2];
              case 8: return [2];
          }
      });
  }
  function SwitchCase$1(node, scope) {
      var _a, _b, _i, index, result;
      return __generator(this, function (_c) {
          switch (_c.label) {
              case 0:
                  _a = [];
                  for (_b in node.consequent)
                      _a.push(_b);
                  _i = 0;
                  _c.label = 1;
              case 1:
                  if (!(_i < _a.length)) return [3, 4];
                  index = _a[_i];
                  return [5, __values(evaluate$1(node.consequent[index], scope))];
              case 2:
                  result = _c.sent();
                  if (result === BREAK || result === CONTINUE || result === RETURN) {
                      return [2, result];
                  }
                  _c.label = 3;
              case 3:
                  _i++;
                  return [3, 1];
              case 4: return [2];
          }
      });
  }
  function ThrowStatement$1(node, scope) {
      return __generator(this, function (_a) {
          switch (_a.label) {
              case 0: return [5, __values(evaluate$1(node.argument, scope))];
              case 1: throw _a.sent();
          }
      });
  }
  function TryStatement$1(node, scope) {
      var err_1, subScope, param, name_1;
      return __generator(this, function (_a) {
          switch (_a.label) {
              case 0:
                  _a.trys.push([0, 2, 9, 12]);
                  return [5, __values(BlockStatement$1(node.block, scope))];
              case 1: return [2, _a.sent()];
              case 2:
                  err_1 = _a.sent();
                  if (!node.handler) return [3, 7];
                  subScope = new Scope(scope);
                  param = node.handler.param;
                  if (!param) return [3, 5];
                  if (!(param.type === 'Identifier')) return [3, 3];
                  name_1 = param.name;
                  subScope.let(name_1, err_1);
                  return [3, 5];
              case 3: return [5, __values(pattern$2(param, scope, { feed: err_1 }))];
              case 4:
                  _a.sent();
                  _a.label = 5;
              case 5: return [5, __values(CatchClause$1(node.handler, subScope))];
              case 6: return [2, _a.sent()];
              case 7: throw err_1;
              case 8: return [3, 12];
              case 9:
                  if (!node.finalizer) return [3, 11];
                  return [5, __values(BlockStatement$1(node.finalizer, scope))];
              case 10: return [2, _a.sent()];
              case 11: return [7];
              case 12: return [2];
          }
      });
  }
  function CatchClause$1(node, scope) {
      return __generator(this, function (_a) {
          switch (_a.label) {
              case 0: return [5, __values(BlockStatement$1(node.body, scope, { invasived: true }))];
              case 1: return [2, _a.sent()];
          }
      });
  }
  function WhileStatement$1(node, scope) {
      var result;
      return __generator(this, function (_a) {
          switch (_a.label) {
              case 0: return [5, __values(evaluate$1(node.test, scope))];
              case 1:
                  if (!_a.sent()) return [3, 3];
                  return [5, __values(evaluate$1(node.body, scope))];
              case 2:
                  result = _a.sent();
                  if (result === BREAK) {
                      return [3, 3];
                  }
                  else if (result === CONTINUE) {
                      return [3, 0];
                  }
                  else if (result === RETURN) {
                      return [2, result];
                  }
                  return [3, 0];
              case 3: return [2];
          }
      });
  }
  function DoWhileStatement$1(node, scope) {
      var result;
      return __generator(this, function (_a) {
          switch (_a.label) {
              case 0: return [5, __values(evaluate$1(node.body, scope))];
              case 1:
                  result = _a.sent();
                  if (result === BREAK) {
                      return [3, 4];
                  }
                  else if (result === CONTINUE) {
                      return [3, 2];
                  }
                  else if (result === RETURN) {
                      return [2, result];
                  }
                  _a.label = 2;
              case 2: return [5, __values(evaluate$1(node.test, scope))];
              case 3:
                  if (_a.sent()) return [3, 0];
                  _a.label = 4;
              case 4: return [2];
          }
      });
  }
  function ForStatement$1(node, scope) {
      var forScope, _a, subScope, result;
      return __generator(this, function (_b) {
          switch (_b.label) {
              case 0:
                  forScope = new Scope(scope);
                  return [5, __values(evaluate$1(node.init, forScope))];
              case 1:
                  _b.sent();
                  _b.label = 2;
              case 2:
                  if (!node.test) return [3, 4];
                  return [5, __values(evaluate$1(node.test, forScope))];
              case 3:
                  _a = (_b.sent());
                  return [3, 5];
              case 4:
                  _a = true;
                  _b.label = 5;
              case 5:
                  if (!_a) return [3, 12];
                  subScope = new Scope(forScope);
                  result = void 0;
                  if (!(node.body.type === 'BlockStatement')) return [3, 7];
                  return [5, __values(BlockStatement$1(node.body, subScope, { invasived: true }))];
              case 6:
                  result = _b.sent();
                  return [3, 9];
              case 7: return [5, __values(evaluate$1(node.body, subScope))];
              case 8:
                  result = _b.sent();
                  _b.label = 9;
              case 9:
                  if (result === BREAK) {
                      return [3, 12];
                  }
                  else if (result === CONTINUE) {
                      return [3, 10];
                  }
                  else if (result === RETURN) {
                      return [2, result];
                  }
                  _b.label = 10;
              case 10: return [5, __values(evaluate$1(node.update, forScope))];
              case 11:
                  _b.sent();
                  return [3, 2];
              case 12: return [2];
          }
      });
  }
  function ForInStatement$1(node, scope) {
      var _a, _b, _i, value, result;
      return __generator(this, function (_c) {
          switch (_c.label) {
              case 0:
                  _a = [];
                  return [5, __values(evaluate$1(node.right, scope))];
              case 1:
                  for (_b in _c.sent())
                      _a.push(_b);
                  _i = 0;
                  _c.label = 2;
              case 2:
                  if (!(_i < _a.length)) return [3, 5];
                  value = _a[_i];
                  return [5, __values(ForXHandler(node, scope, { value: value }))];
              case 3:
                  result = _c.sent();
                  if (result === BREAK) {
                      return [3, 5];
                  }
                  else if (result === CONTINUE) {
                      return [3, 4];
                  }
                  else if (result === RETURN) {
                      return [2, result];
                  }
                  _c.label = 4;
              case 4:
                  _i++;
                  return [3, 2];
              case 5: return [2];
          }
      });
  }
  function ForOfStatement$1(node, scope) {
      var e_1, _a, right, iterator, ret, result, right_1, right_1_1, value, result, e_1_1;
      return __generator(this, function (_b) {
          switch (_b.label) {
              case 0: return [5, __values(evaluate$1(node.right, scope))];
              case 1:
                  right = _b.sent();
                  if (!node.await) return [3, 8];
                  iterator = getIterator(right);
                  ret = void 0;
                  AWAIT.RES = iterator.next();
                  return [4, AWAIT];
              case 2:
                  ret = _b.sent();
                  _b.label = 3;
              case 3:
                  if (!!ret.done) return [3, 7];
                  return [5, __values(ForXHandler(node, scope, { value: ret.value }))];
              case 4:
                  result = _b.sent();
                  if (result === BREAK) {
                      return [3, 7];
                  }
                  else if (result === CONTINUE) {
                      return [3, 5];
                  }
                  else if (result === RETURN) {
                      return [2, result];
                  }
                  _b.label = 5;
              case 5:
                  AWAIT.RES = iterator.next();
                  return [4, AWAIT];
              case 6:
                  ret = _b.sent();
                  return [3, 3];
              case 7: return [3, 15];
              case 8:
                  _b.trys.push([8, 13, 14, 15]);
                  right_1 = __values(right), right_1_1 = right_1.next();
                  _b.label = 9;
              case 9:
                  if (!!right_1_1.done) return [3, 12];
                  value = right_1_1.value;
                  return [5, __values(ForXHandler(node, scope, { value: value }))];
              case 10:
                  result = _b.sent();
                  if (result === BREAK) {
                      return [3, 12];
                  }
                  else if (result === CONTINUE) {
                      return [3, 11];
                  }
                  else if (result === RETURN) {
                      return [2, result];
                  }
                  _b.label = 11;
              case 11:
                  right_1_1 = right_1.next();
                  return [3, 9];
              case 12: return [3, 15];
              case 13:
                  e_1_1 = _b.sent();
                  e_1 = { error: e_1_1 };
                  return [3, 15];
              case 14:
                  try {
                      if (right_1_1 && !right_1_1.done && (_a = right_1.return)) _a.call(right_1);
                  }
                  finally { if (e_1) throw e_1.error; }
                  return [7];
              case 15: return [2];
          }
      });
  }

  var statement$1 = /*#__PURE__*/Object.freeze({
    ExpressionStatement: ExpressionStatement$1,
    BlockStatement: BlockStatement$1,
    EmptyStatement: EmptyStatement$1,
    DebuggerStatement: DebuggerStatement$1,
    ReturnStatement: ReturnStatement$1,
    BreakStatement: BreakStatement$1,
    ContinueStatement: ContinueStatement$1,
    IfStatement: IfStatement$1,
    SwitchStatement: SwitchStatement$1,
    SwitchCase: SwitchCase$1,
    ThrowStatement: ThrowStatement$1,
    TryStatement: TryStatement$1,
    CatchClause: CatchClause$1,
    WhileStatement: WhileStatement$1,
    DoWhileStatement: DoWhileStatement$1,
    ForStatement: ForStatement$1,
    ForInStatement: ForInStatement$1,
    ForOfStatement: ForOfStatement$1
  });

  var evaluateOps$1 = assign({}, declaration$1, expression$1, identifier$1, literal$1, pattern$1, program$1, statement$1);
  function evaluate$1(node, scope) {
      var handler;
      return __generator(this, function (_a) {
          switch (_a.label) {
              case 0:
                  if (!node)
                      return [2];
                  handler = evaluateOps$1[node.type];
                  if (!handler) return [3, 2];
                  return [5, __values(handler(node, scope))];
              case 1: return [2, _a.sent()];
              case 2: throw new Error(node.type + " isn't implemented");
          }
      });
  }

  function FunctionDeclaration$1(node, scope) {
      return __generator(this, function (_a) {
          scope.func(node.id.name, createFunc(node, scope));
          return [2];
      });
  }
  function VariableDeclaration$1(node, scope, options) {
      var _a, _b, _i, index;
      if (options === void 0) { options = {}; }
      return __generator(this, function (_c) {
          switch (_c.label) {
              case 0:
                  _a = [];
                  for (_b in node.declarations)
                      _a.push(_b);
                  _i = 0;
                  _c.label = 1;
              case 1:
                  if (!(_i < _a.length)) return [3, 4];
                  index = _a[_i];
                  return [5, __values(VariableDeclarator$1(node.declarations[index], scope, assign({ kind: node.kind }, options)))];
              case 2:
                  _c.sent();
                  _c.label = 3;
              case 3:
                  _i++;
                  return [3, 1];
              case 4: return [2];
          }
      });
  }
  function VariableDeclarator$1(node, scope, options) {
      var _a, kind, _b, hoist, feed, value, _c, name_1;
      if (options === void 0) { options = {}; }
      return __generator(this, function (_d) {
          switch (_d.label) {
              case 0:
                  _a = options.kind, kind = _a === void 0 ? 'let' : _a, _b = options.hoist, hoist = _b === void 0 ? false : _b, feed = options.feed;
                  if (!hoist) return [3, 4];
                  if (!(kind === 'var')) return [3, 3];
                  if (!(node.id.type === 'Identifier')) return [3, 1];
                  scope.var(node.id.name);
                  return [3, 3];
              case 1: return [5, __values(pattern$2(node.id, scope, { kind: kind, hoist: hoist }))];
              case 2:
                  _d.sent();
                  _d.label = 3;
              case 3: return [3, 12];
              case 4:
                  if (!(kind === 'var'
                      || kind === 'let'
                      || kind === 'const')) return [3, 11];
                  if (!hasOwn(options, 'feed')) return [3, 5];
                  _c = feed;
                  return [3, 7];
              case 5: return [5, __values(evaluate$1(node.init, scope))];
              case 6:
                  _c = _d.sent();
                  _d.label = 7;
              case 7:
                  value = _c;
                  if (!(node.id.type === 'Identifier')) return [3, 8];
                  name_1 = node.id.name;
                  if (kind === 'var' && !node.init) {
                      scope.var(name_1, NOINIT);
                  }
                  else {
                      scope[kind](name_1, value);
                  }
                  if (node.init &&
                      [
                          'FunctionExpression',
                          'ArrowFunctionExpression'
                      ].indexOf(node.init.type) !== -1
                      && !value.name) {
                      define(value, 'name', {
                          value: name_1,
                          configurable: true
                      });
                  }
                  return [3, 10];
              case 8: return [5, __values(pattern$2(node.id, scope, { kind: kind, feed: value }))];
              case 9:
                  _d.sent();
                  _d.label = 10;
              case 10: return [3, 12];
              case 11: throw new SyntaxError('Unexpected identifier');
              case 12: return [2];
          }
      });
  }
  function ClassDeclaration$1(node, scope) {
      var _a, _b, _c;
      return __generator(this, function (_d) {
          switch (_d.label) {
              case 0:
                  _b = (_a = scope).func;
                  _c = [node.id.name];
                  return [5, __values(createClass(node, scope))];
              case 1:
                  _b.apply(_a, _c.concat([_d.sent()]));
                  return [2];
          }
      });
  }
  function ClassBody$1(node, scope, options) {
      var _a, klass, _b, _c, _i, index;
      if (options === void 0) { options = {}; }
      return __generator(this, function (_d) {
          switch (_d.label) {
              case 0:
                  _a = options.klass, klass = _a === void 0 ? function () { } : _a;
                  _b = [];
                  for (_c in node.body)
                      _b.push(_c);
                  _i = 0;
                  _d.label = 1;
              case 1:
                  if (!(_i < _b.length)) return [3, 4];
                  index = _b[_i];
                  return [5, __values(MethodDefinition$1(node.body[index], scope, { klass: klass }))];
              case 2:
                  _d.sent();
                  _d.label = 3;
              case 3:
                  _i++;
                  return [3, 1];
              case 4: return [2];
          }
      });
  }
  function MethodDefinition$1(node, scope, options) {
      var _a, klass, key, obj, value, oriDptor, oriDptor;
      if (options === void 0) { options = {}; }
      return __generator(this, function (_b) {
          switch (_b.label) {
              case 0:
                  _a = options.klass, klass = _a === void 0 ? function () { } : _a;
                  if (!node.computed) return [3, 2];
                  return [5, __values(evaluate$1(node.key, scope))];
              case 1:
                  key = _b.sent();
                  return [3, 3];
              case 2:
                  if (node.key.type === 'Identifier') {
                      key = node.key.name;
                  }
                  else {
                      throw new SyntaxError('Unexpected token');
                  }
                  _b.label = 3;
              case 3:
                  obj = node.static ? klass : klass.prototype;
                  value = createFunc(node.value, scope);
                  switch (node.kind) {
                      case 'constructor':
                          break;
                      case 'method':
                          define(obj, key, {
                              value: value,
                              writable: true,
                              configurable: true,
                          });
                          break;
                      case 'get': {
                          oriDptor = getDptor(obj, key);
                          define(obj, key, {
                              get: value,
                              set: oriDptor && oriDptor.set,
                              configurable: true,
                          });
                          break;
                      }
                      case 'set': {
                          oriDptor = getDptor(obj, key);
                          define(obj, key, {
                              get: oriDptor && oriDptor.get,
                              set: value,
                              configurable: true,
                          });
                          break;
                      }
                      default:
                          throw new SyntaxError('Unexpected token');
                  }
                  return [2];
          }
      });
  }

  function hoist(block, scope) {
      var i, statement;
      return __generator(this, function (_a) {
          switch (_a.label) {
              case 0:
                  i = 0;
                  _a.label = 1;
              case 1:
                  if (!(i < block.body.length)) return [3, 6];
                  statement = block.body[i];
                  if (statement.type === 'ImportDeclaration'
                      || statement.type === 'ExportNamedDeclaration'
                      || statement.type === 'ExportDefaultDeclaration'
                      || statement.type === 'ExportAllDeclaration') {
                      return [3, 5];
                  }
                  if (!(statement.type === 'FunctionDeclaration')) return [3, 3];
                  return [5, __values(FunctionDeclaration$1(statement, scope))];
              case 2:
                  _a.sent();
                  return [3, 5];
              case 3: return [5, __values(hoistVarRecursion(statement, scope))];
              case 4:
                  _a.sent();
                  _a.label = 5;
              case 5:
                  i++;
                  return [3, 1];
              case 6: return [2];
          }
      });
  }
  function hoistFunc(block, scope) {
      var i, statement;
      return __generator(this, function (_a) {
          switch (_a.label) {
              case 0:
                  i = 0;
                  _a.label = 1;
              case 1:
                  if (!(i < block.body.length)) return [3, 4];
                  statement = block.body[i];
                  if (!(statement.type === 'FunctionDeclaration')) return [3, 3];
                  return [5, __values(FunctionDeclaration$1(statement, scope))];
              case 2:
                  _a.sent();
                  _a.label = 3;
              case 3:
                  i++;
                  return [3, 1];
              case 4: return [2];
          }
      });
  }
  function hoistVarRecursion(statement, scope) {
      var _a, _b, _c, _i, index, _d, _e, _f, index, _g, _h, _j, idx, tryBlock, _k, _l, _m, index, catchBlock, _o, _p, _q, index, finalBlock, _r, _s, _t, index;
      return __generator(this, function (_u) {
          switch (_u.label) {
              case 0:
                  _a = statement.type;
                  switch (_a) {
                      case 'VariableDeclaration': return [3, 1];
                      case 'WhileStatement': return [3, 3];
                      case 'DoWhileStatement': return [3, 3];
                      case 'ForStatement': return [3, 3];
                      case 'ForInStatement': return [3, 3];
                      case 'ForOfStatement': return [3, 3];
                      case 'BlockStatement': return [3, 5];
                      case 'SwitchStatement': return [3, 10];
                      case 'TryStatement': return [3, 17];
                  }
                  return [3, 30];
              case 1: return [5, __values(VariableDeclaration$1(statement, scope, { hoist: true }))];
              case 2:
                  _u.sent();
                  return [3, 30];
              case 3: return [5, __values(hoistVarRecursion(statement.body, scope))];
              case 4:
                  _u.sent();
                  return [3, 30];
              case 5:
                  _b = [];
                  for (_c in statement.body)
                      _b.push(_c);
                  _i = 0;
                  _u.label = 6;
              case 6:
                  if (!(_i < _b.length)) return [3, 9];
                  index = _b[_i];
                  return [5, __values(hoistVarRecursion(statement.body[index], scope))];
              case 7:
                  _u.sent();
                  _u.label = 8;
              case 8:
                  _i++;
                  return [3, 6];
              case 9: return [3, 30];
              case 10:
                  _d = [];
                  for (_e in statement.cases)
                      _d.push(_e);
                  _f = 0;
                  _u.label = 11;
              case 11:
                  if (!(_f < _d.length)) return [3, 16];
                  index = _d[_f];
                  _g = [];
                  for (_h in statement.cases[index].consequent)
                      _g.push(_h);
                  _j = 0;
                  _u.label = 12;
              case 12:
                  if (!(_j < _g.length)) return [3, 15];
                  idx = _g[_j];
                  return [5, __values(hoistVarRecursion(statement.cases[index].consequent[idx], scope))];
              case 13:
                  _u.sent();
                  _u.label = 14;
              case 14:
                  _j++;
                  return [3, 12];
              case 15:
                  _f++;
                  return [3, 11];
              case 16: return [3, 30];
              case 17:
                  tryBlock = statement.block.body;
                  _k = [];
                  for (_l in tryBlock)
                      _k.push(_l);
                  _m = 0;
                  _u.label = 18;
              case 18:
                  if (!(_m < _k.length)) return [3, 21];
                  index = _k[_m];
                  return [5, __values(hoistVarRecursion(tryBlock[index], scope))];
              case 19:
                  _u.sent();
                  _u.label = 20;
              case 20:
                  _m++;
                  return [3, 18];
              case 21:
                  catchBlock = statement.handler && statement.handler.body.body;
                  if (!catchBlock) return [3, 25];
                  _o = [];
                  for (_p in catchBlock)
                      _o.push(_p);
                  _q = 0;
                  _u.label = 22;
              case 22:
                  if (!(_q < _o.length)) return [3, 25];
                  index = _o[_q];
                  return [5, __values(hoistVarRecursion(catchBlock[index], scope))];
              case 23:
                  _u.sent();
                  _u.label = 24;
              case 24:
                  _q++;
                  return [3, 22];
              case 25:
                  finalBlock = statement.finalizer && statement.finalizer.body;
                  if (!finalBlock) return [3, 29];
                  _r = [];
                  for (_s in finalBlock)
                      _r.push(_s);
                  _t = 0;
                  _u.label = 26;
              case 26:
                  if (!(_t < _r.length)) return [3, 29];
                  index = _r[_t];
                  return [5, __values(hoistVarRecursion(finalBlock[index], scope))];
              case 27:
                  _u.sent();
                  _u.label = 28;
              case 28:
                  _t++;
                  return [3, 26];
              case 29: return [3, 30];
              case 30: return [2];
          }
      });
  }
  function pattern$2(node, scope, options) {
      var _a;
      if (options === void 0) { options = {}; }
      return __generator(this, function (_b) {
          switch (_b.label) {
              case 0:
                  _a = node.type;
                  switch (_a) {
                      case 'ObjectPattern': return [3, 1];
                      case 'ArrayPattern': return [3, 3];
                      case 'RestElement': return [3, 5];
                      case 'AssignmentPattern': return [3, 7];
                  }
                  return [3, 9];
              case 1: return [5, __values(ObjectPattern$1(node, scope, options))];
              case 2: return [2, _b.sent()];
              case 3: return [5, __values(ArrayPattern$1(node, scope, options))];
              case 4: return [2, _b.sent()];
              case 5: return [5, __values(RestElement$1(node, scope, options))];
              case 6: return [2, _b.sent()];
              case 7: return [5, __values(AssignmentPattern$1(node, scope))];
              case 8: return [2, _b.sent()];
              case 9: throw new SyntaxError('Unexpected token');
          }
      });
  }
  function createFunc(node, scope, options) {
      if (options === void 0) { options = {}; }
      if (!node.generator && !node.async) {
          return createFunc$1(node, scope, options);
      }
      var superClass = options.superClass;
      var params = node.params;
      var tmpFunc = function () {
          var _i, subScope, i, param, result;
          var args = [];
          for (_i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i];
          }
          return __generator(this, function (_a) {
              switch (_a.label) {
                  case 0:
                      subScope = new Scope(scope, true);
                      if (node.type !== 'ArrowFunctionExpression') {
                          subScope.const('this', this);
                          subScope.let('arguments', arguments);
                          if (superClass) {
                              subScope.const(SUPER, superClass);
                          }
                      }
                      i = 0;
                      _a.label = 1;
                  case 1:
                      if (!(i < params.length)) return [3, 7];
                      param = params[i];
                      if (!(param.type === 'Identifier')) return [3, 2];
                      subScope.let(param.name, args[i]);
                      return [3, 6];
                  case 2:
                      if (!(param.type === 'RestElement')) return [3, 4];
                      return [5, __values(RestElement$1(param, subScope, { kind: 'let', feed: args.slice(i) }))];
                  case 3:
                      _a.sent();
                      return [3, 6];
                  case 4: return [5, __values(pattern$2(param, subScope, { feed: args[i] }))];
                  case 5:
                      _a.sent();
                      _a.label = 6;
                  case 6:
                      i++;
                      return [3, 1];
                  case 7:
                      if (!(node.body.type === 'BlockStatement')) return [3, 10];
                      return [5, __values(hoist(node.body, subScope))];
                  case 8:
                      _a.sent();
                      return [5, __values(BlockStatement$1(node.body, subScope, {
                              invasived: true,
                              hoisted: true
                          }))];
                  case 9:
                      result = _a.sent();
                      return [3, 12];
                  case 10: return [5, __values(evaluate$1(node.body, subScope))];
                  case 11:
                      result = _a.sent();
                      if (node.type === 'ArrowFunctionExpression') {
                          RETURN.RES = result;
                          result = RETURN;
                      }
                      _a.label = 12;
                  case 12:
                      if (result === RETURN) {
                          return [2, result.RES];
                      }
                      return [2];
              }
          });
      };
      var func;
      if (node.async && node.generator) {
          func = function () {
              var args = [];
              for (var _i = 0; _i < arguments.length; _i++) {
                  args[_i] = arguments[_i];
              }
              var iterator = tmpFunc(args);
              var last = Promise.resolve();
              var run = function (opts) {
                  return last = last.then(function () { return runAsync(iterator, assign({ full: true }, opts)); });
              };
              var asyncIterator = {
                  next: function (res) { return run({ res: res }); },
                  throw: function (err) { return run({ err: err }); },
                  return: function (ret) { return run({ ret: ret }); }
              };
              if (typeof Symbol === 'function') {
                  asyncIterator[Symbol.iterator] = function () { return this; };
              }
              return asyncIterator;
          };
      }
      else if (node.async) {
          func = function () {
              var args = [];
              for (var _i = 0; _i < arguments.length; _i++) {
                  args[_i] = arguments[_i];
              }
              return runAsync(tmpFunc(args));
          };
          if (node.type === 'ArrowFunctionExpression') {
              define(func, ARROW, { value: true });
          }
      }
      else {
          func = tmpFunc;
      }
      define(func, 'name', {
          value: node.id
              && node.id.name
              || '',
          configurable: true
      });
      define(func, 'length', {
          value: params.length,
          configurable: true
      });
      return func;
  }
  function createClass(node, scope) {
      var superClass, klass, methodBody, _a, _b, _i, index, method;
      return __generator(this, function (_c) {
          switch (_c.label) {
              case 0: return [5, __values(evaluate$1(node.superClass, scope))];
              case 1:
                  superClass = _c.sent();
                  klass = function () { };
                  methodBody = node.body.body;
                  _a = [];
                  for (_b in methodBody)
                      _a.push(_b);
                  _i = 0;
                  _c.label = 2;
              case 2:
                  if (!(_i < _a.length)) return [3, 5];
                  index = _a[_i];
                  method = methodBody[index];
                  if (!(method.kind === 'constructor')) return [3, 4];
                  return [5, __values(createFunc(method.value, scope, { superClass: superClass }))];
              case 3:
                  klass = _c.sent();
                  return [3, 5];
              case 4:
                  _i++;
                  return [3, 2];
              case 5:
                  if (superClass) {
                      inherits(klass, superClass);
                  }
                  return [5, __values(ClassBody$1(node.body, scope, { klass: klass }))];
              case 6:
                  _c.sent();
                  define(klass, 'name', {
                      value: node.id.name,
                      configurable: true
                  });
                  return [2, klass];
          }
      });
  }
  function ForXHandler(node, scope, options) {
      var value, left, subScope, variable, result;
      return __generator(this, function (_a) {
          switch (_a.label) {
              case 0:
                  value = options.value;
                  left = node.left;
                  subScope = new Scope(scope);
                  if (!(left.type === 'VariableDeclaration')) return [3, 2];
                  return [5, __values(VariableDeclaration$1(left, subScope, { feed: value }))];
              case 1:
                  _a.sent();
                  return [3, 6];
              case 2:
                  if (!(left.type === 'Identifier')) return [3, 4];
                  return [5, __values(Identifier(left, scope, { getVar: true }))];
              case 3:
                  variable = _a.sent();
                  variable.set(value);
                  return [3, 6];
              case 4: return [5, __values(pattern$2(left, scope, { feed: value }))];
              case 5:
                  _a.sent();
                  _a.label = 6;
              case 6:
                  if (!(node.body.type === 'BlockStatement')) return [3, 8];
                  return [5, __values(BlockStatement$1(node.body, subScope, { invasived: true }))];
              case 7:
                  result = _a.sent();
                  return [3, 10];
              case 8: return [5, __values(evaluate$1(node.body, subScope))];
              case 9:
                  result = _a.sent();
                  _a.label = 10;
              case 10: return [2, result];
          }
      });
  }

  function hoist$1(block, scope) {
      for (var i = 0; i < block.body.length; i++) {
          var statement = block.body[i];
          if (statement.type === 'ImportDeclaration'
              || statement.type === 'ExportNamedDeclaration'
              || statement.type === 'ExportDefaultDeclaration'
              || statement.type === 'ExportAllDeclaration') {
              continue;
          }
          if (statement.type === 'FunctionDeclaration') {
              FunctionDeclaration(statement, scope);
          }
          else {
              hoistVarRecursion$1(statement, scope);
          }
      }
  }
  function hoistFunc$1(block, scope) {
      for (var i = 0; i < block.body.length; i++) {
          var statement = block.body[i];
          if (statement.type === 'FunctionDeclaration') {
              FunctionDeclaration(statement, scope);
          }
      }
  }
  function hoistVarRecursion$1(statement, scope) {
      switch (statement.type) {
          case 'VariableDeclaration':
              VariableDeclaration(statement, scope, { hoist: true });
              break;
          case 'WhileStatement':
          case 'DoWhileStatement':
          case 'ForStatement':
          case 'ForInStatement':
          case 'ForOfStatement':
              hoistVarRecursion$1(statement.body, scope);
              break;
          case 'BlockStatement':
              for (var index in statement.body) {
                  hoistVarRecursion$1(statement.body[index], scope);
              }
              break;
          case 'SwitchStatement':
              for (var index in statement.cases) {
                  for (var idx in statement.cases[index].consequent) {
                      hoistVarRecursion$1(statement.cases[index].consequent[idx], scope);
                  }
              }
              break;
          case 'TryStatement': {
              var tryBlock = statement.block.body;
              for (var index in tryBlock) {
                  hoistVarRecursion$1(tryBlock[index], scope);
              }
              var catchBlock = statement.handler && statement.handler.body.body;
              if (catchBlock) {
                  for (var index in catchBlock) {
                      hoistVarRecursion$1(catchBlock[index], scope);
                  }
              }
              var finalBlock = statement.finalizer && statement.finalizer.body;
              if (finalBlock) {
                  for (var index in finalBlock) {
                      hoistVarRecursion$1(finalBlock[index], scope);
                  }
              }
              break;
          }
      }
  }
  function pattern$3(node, scope, options) {
      if (options === void 0) { options = {}; }
      switch (node.type) {
          case 'ObjectPattern':
              return ObjectPattern(node, scope, options);
          case 'ArrayPattern':
              return ArrayPattern(node, scope, options);
          case 'RestElement':
              return RestElement(node, scope, options);
          case 'AssignmentPattern':
              return AssignmentPattern(node, scope);
          default:
              throw new SyntaxError('Unexpected token');
      }
  }
  function createFunc$1(node, scope, options) {
      if (options === void 0) { options = {}; }
      if (node.generator || node.async) {
          return createFunc(node, scope, options);
      }
      var superClass = options.superClass;
      var params = node.params;
      var tmpFunc = function () {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i];
          }
          var subScope = new Scope(scope, true);
          if (node.type !== 'ArrowFunctionExpression') {
              subScope.const('this', this);
              subScope.let('arguments', arguments);
              if (superClass) {
                  subScope.const(SUPER, superClass);
              }
          }
          for (var i = 0; i < params.length; i++) {
              var param = params[i];
              if (param.type === 'Identifier') {
                  subScope.let(param.name, args[i]);
              }
              else if (param.type === 'RestElement') {
                  RestElement(param, subScope, { kind: 'let', feed: args.slice(i) });
              }
              else {
                  pattern$3(param, subScope, { feed: args[i] });
              }
          }
          var result;
          if (node.body.type === 'BlockStatement') {
              hoist$1(node.body, subScope);
              result = BlockStatement(node.body, subScope, {
                  invasived: true,
                  hoisted: true
              });
          }
          else {
              result = evaluate(node.body, subScope);
              if (node.type === 'ArrowFunctionExpression') {
                  RETURN.RES = result;
                  result = RETURN;
              }
          }
          if (result === RETURN) {
              return result.RES;
          }
      };
      var func = tmpFunc;
      if (node.type === 'ArrowFunctionExpression') {
          define(func, ARROW, { value: true });
      }
      define(func, 'name', {
          value: node.id
              && node.id.name
              || '',
          configurable: true
      });
      define(func, 'length', {
          value: params.length,
          configurable: true
      });
      return func;
  }
  function createClass$1(node, scope) {
      var superClass = evaluate(node.superClass, scope);
      var klass = function () { };
      var methodBody = node.body.body;
      for (var index in methodBody) {
          var method = methodBody[index];
          if (method.kind === 'constructor') {
              klass = createFunc$1(method.value, scope, { superClass: superClass });
              break;
          }
      }
      if (superClass) {
          inherits(klass, superClass);
      }
      ClassBody(node.body, scope, { klass: klass });
      define(klass, 'name', {
          value: node.id.name,
          configurable: true
      });
      return klass;
  }
  function ForXHandler$1(node, scope, options) {
      var value = options.value;
      var left = node.left;
      var subScope = new Scope(scope);
      if (left.type === 'VariableDeclaration') {
          VariableDeclaration(left, subScope, { feed: value });
      }
      else if (left.type === 'Identifier') {
          var variable = Identifier(left, scope, { getVar: true });
          variable.set(value);
      }
      else {
          pattern$3(left, scope, { feed: value });
      }
      var result;
      if (node.body.type === 'BlockStatement') {
          result = BlockStatement(node.body, subScope, { invasived: true });
      }
      else {
          result = evaluate(node.body, subScope);
      }
      return result;
  }

  var Sval = (function () {
      function Sval(options) {
          if (options === void 0) { options = {}; }
          this.options = {};
          this.scope = new Scope(null, true);
          this.exports = {};
          var _a = options.ecmaVer, ecmaVer = _a === void 0 ? 9 : _a, _b = options.sandBox, sandBox = _b === void 0 ? true : _b;
          ecmaVer -= ecmaVer < 2015 ? 0 : 2009;
          if ([3, 5, 6, 7, 8, 9, 10].indexOf(ecmaVer) === -1) {
              throw new Error("unsupported ecmaVer");
          }
          this.options.ecmaVersion = ecmaVer;
          if (sandBox) {
              var win = createSandBox();
              this.scope.let('window', win);
              this.scope.let('this', win);
          }
          else {
              this.scope.let('window', globalObj);
              this.scope.let('this', globalObj);
          }
          this.scope.const('exports', this.exports = {});
      }
      Sval.prototype.import = function (nameOrModules, mod) {
          var _a;
          if (typeof nameOrModules === 'string') {
              nameOrModules = (_a = {}, _a[nameOrModules] = mod, _a);
          }
          if (typeof nameOrModules !== 'object')
              return;
          var names = getOwnNames(nameOrModules);
          for (var index in names) {
              var name_1 = names[index];
              this.scope.var(name_1, nameOrModules[name_1]);
          }
      };
      Sval.prototype.run = function (code) {
          var ast = acorn.parse(code, this.options);
          hoist$1(ast, this.scope);
          evaluate(ast, this.scope);
      };
      Sval.version = version;
      return Sval;
  }());

  return Sval;

}));
