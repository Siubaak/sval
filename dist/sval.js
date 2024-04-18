(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('acorn')) :
  typeof define === 'function' && define.amd ? define(['acorn'], factory) :
  (global = global || self, global.Sval = factory(global.acorn));
}(this, (function (acorn) { 'use strict';

  var statement = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get ExpressionStatement () { return ExpressionStatement; },
    get BlockStatement () { return BlockStatement; },
    get EmptyStatement () { return EmptyStatement; },
    get DebuggerStatement () { return DebuggerStatement; },
    get ReturnStatement () { return ReturnStatement; },
    get BreakStatement () { return BreakStatement; },
    get ContinueStatement () { return ContinueStatement; },
    get IfStatement () { return IfStatement; },
    get SwitchStatement () { return SwitchStatement; },
    get SwitchCase () { return SwitchCase; },
    get ThrowStatement () { return ThrowStatement; },
    get TryStatement () { return TryStatement; },
    get CatchClause () { return CatchClause; },
    get WhileStatement () { return WhileStatement; },
    get DoWhileStatement () { return DoWhileStatement; },
    get ForStatement () { return ForStatement; },
    get ForInStatement () { return ForInStatement; },
    get ForOfStatement () { return ForOfStatement; }
  });
  var declaration = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get FunctionDeclaration () { return FunctionDeclaration; },
    get VariableDeclaration () { return VariableDeclaration; },
    get VariableDeclarator () { return VariableDeclarator; },
    get ClassDeclaration () { return ClassDeclaration; },
    get ClassBody () { return ClassBody; },
    get MethodDefinition () { return MethodDefinition; },
    get PropertyDefinition () { return PropertyDefinition; },
    get StaticBlock () { return StaticBlock; },
    get ImportDeclaration () { return ImportDeclaration; },
    get ExportDefaultDeclaration () { return ExportDefaultDeclaration; },
    get ExportNamedDeclaration () { return ExportNamedDeclaration; },
    get ExportAllDeclaration () { return ExportAllDeclaration; }
  });
  var statement$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get ExpressionStatement () { return ExpressionStatement$1; },
    get BlockStatement () { return BlockStatement$1; },
    get EmptyStatement () { return EmptyStatement$1; },
    get DebuggerStatement () { return DebuggerStatement$1; },
    get ReturnStatement () { return ReturnStatement$1; },
    get BreakStatement () { return BreakStatement$1; },
    get ContinueStatement () { return ContinueStatement$1; },
    get IfStatement () { return IfStatement$1; },
    get SwitchStatement () { return SwitchStatement$1; },
    get SwitchCase () { return SwitchCase$1; },
    get ThrowStatement () { return ThrowStatement$1; },
    get TryStatement () { return TryStatement$1; },
    get CatchClause () { return CatchClause$1; },
    get WhileStatement () { return WhileStatement$1; },
    get DoWhileStatement () { return DoWhileStatement$1; },
    get ForStatement () { return ForStatement$1; },
    get ForInStatement () { return ForInStatement$1; },
    get ForOfStatement () { return ForOfStatement$1; }
  });
  var declaration$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get FunctionDeclaration () { return FunctionDeclaration$1; },
    get VariableDeclaration () { return VariableDeclaration$1; },
    get VariableDeclarator () { return VariableDeclarator$1; },
    get ClassDeclaration () { return ClassDeclaration$1; },
    get ClassBody () { return ClassBody$1; },
    get MethodDefinition () { return MethodDefinition$1; },
    get PropertyDefinition () { return PropertyDefinition$1; },
    get StaticBlock () { return StaticBlock$1; },
    get ImportDeclaration () { return ImportDeclaration$1; },
    get ExportDefaultDeclaration () { return ExportDefaultDeclaration$1; },
    get ExportNamedDeclaration () { return ExportNamedDeclaration$1; },
    get ExportAllDeclaration () { return ExportAllDeclaration$1; }
  });

  var freeze = Object.freeze;
  var define = Object.defineProperty;
  var getDptor = Object.getOwnPropertyDescriptor;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  function hasOwn(obj, key) {
      return hasOwnProperty.call(obj, key);
  }
  var getOwnNames = Object.getOwnPropertyNames;
  var setPrototypeOf = Object.setPrototypeOf;
  function setProto(obj, proto) {
      setPrototypeOf ? setPrototypeOf(obj, proto) : obj.__proto__ = proto;
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
      setProto(subClass, superClass);
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
  var globalObj = create(null);
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
              globalObj.BigInt = BigInt;
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
  if (globalObj.Symbol) {
      !globalObj.Symbol.iterator && (globalObj.Symbol.iterator = createSymbol('iterator'));
      !globalObj.Symbol.asyncIterator && (globalObj.Symbol.asyncIterator = createSymbol('asynciterator'));
  }
  var win = create({});
  for (var i = 0; i < names.length; i++) {
      var name_1 = names[i];
      try {
          win[name_1] = globalObj[name_1];
      }
      catch (err) { }
  }
  var WINDOW = createSymbol('window');
  function createSandBox() {
      var _a;
      return assign(create((_a = {}, _a[WINDOW] = globalObj, _a)), win);
  }
  function createSymbol(key) {
      return key + Math.random().toString(36).substring(2);
  }
  function getAsyncIterator(obj) {
      var iterator;
      if (typeof Symbol === 'function') {
          iterator = obj[Symbol.asyncIterator];
          !iterator && (iterator = obj[Symbol.iterator]);
      }
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
                  if (obj && i_1 >= obj.length)
                      obj = undefined;
                  return { value: obj && obj[i_1++], done: !obj };
              }
          };
      }
  }

  var AWAIT = { RES: undefined };
  var RETURN = { RES: undefined };
  var CONTINUE = createSymbol('continue');
  var BREAK = createSymbol('break');
  var SUPER = createSymbol('super');
  var SUPERCALL = createSymbol('supercall');
  var NOCTOR = createSymbol('noctor');
  var CLSCTOR = createSymbol('clsctor');
  var NEWTARGET = createSymbol('newtarget');
  var PRIVATE = createSymbol('private');
  var NOINIT = createSymbol('noinit');
  var DEADZONE = createSymbol('deadzone');
  var IMPORT = createSymbol('import');
  var EXPORTS = createSymbol('exports');

  var version = "0.5.2";

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
          this.context = create(null);
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
          for (var name_1 in this.context) {
              var variable = this.context[name_1];
              cloneScope[variable.kind](name_1, variable.get());
          }
          return cloneScope;
      };
      Scope.prototype.find = function (name) {
          if (this.context[name]) {
              return this.context[name];
          }
          else if (this.parent) {
              return this.parent.find(name);
          }
          else {
              var win = this.global().find('window').get();
              if (name in win) {
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
                  define(win, name, { value: value, writable: true, enumerable: true });
              }
          }
      };
      Scope.prototype.let = function (name, value) {
          var variable = this.context[name];
          if (!variable || variable.get() === DEADZONE) {
              this.context[name] = new Var('let', value);
          }
          else {
              throw new SyntaxError("Identifier '" + name + "' has already been declared");
          }
      };
      Scope.prototype.const = function (name, value) {
          var variable = this.context[name];
          if (!variable || variable.get() === DEADZONE) {
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

  function Identifier(node, scope, options) {
      if (options === void 0) { options = {}; }
      var _a = options.getVar, getVar = _a === void 0 ? false : _a, _b = options.throwErr, throwErr = _b === void 0 ? true : _b;
      if (node.name === 'undefined') {
          return undefined;
      }
      var variable = scope.find(node.name);
      if (variable) {
          if (getVar) {
              return variable;
          }
          else {
              var value = variable.get();
              if (value === DEADZONE) {
                  throw new ReferenceError(node.name + " is not defined");
              }
              else {
                  return value;
              }
          }
      }
      else if (throwErr) {
          throw new ReferenceError(node.name + " is not defined");
      }
      else {
          return undefined;
      }
  }

  var identifier = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Identifier: Identifier
  });

  function Literal(node, scope) {
      return node.value;
  }

  var literal = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Literal: Literal
  });

  function ThisExpression(node, scope) {
      var superCall = scope.find(SUPERCALL);
      if (superCall && !superCall.get()) {
          throw new ReferenceError('Must call super constructor in derived class '
              + 'before accessing \'this\' or returning from derived constructor');
      }
      else {
          return scope.find('this').get();
      }
  }
  function ArrayExpression(node, scope) {
      var results = [];
      for (var i = 0; i < node.elements.length; i++) {
          var item = node.elements[i];
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
      for (var i = 0; i < node.properties.length; i++) {
          var property = node.properties[i];
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
                      key = '' + (Literal(propKey));
                  }
              }
              var value = evaluate(property.value, scope);
              var propKind = property.kind;
              if (propKind === 'init') {
                  object[key] = value;
              }
              else if (propKind === 'get') {
                  var oriDptor = getDptor(object, key);
                  define(object, key, {
                      get: value,
                      set: oriDptor && oriDptor.set,
                      enumerable: true,
                      configurable: true
                  });
              }
              else {
                  var oriDptor = getDptor(object, key);
                  define(object, key, {
                      get: oriDptor && oriDptor.get,
                      set: value,
                      enumerable: true,
                      configurable: true
                  });
              }
          }
      }
      return object;
  }
  function FunctionExpression(node, scope) {
      if (node.id && node.id.name) {
          var tmpScope = new Scope(scope);
          var func = createFunc$1(node, tmpScope);
          tmpScope.const(node.id.name, func);
          return func;
      }
      else {
          return createFunc$1(node, scope);
      }
  }
  function UnaryExpression(node, scope) {
      var arg = node.argument;
      switch (node.operator) {
          case '+': return +(evaluate(arg, scope));
          case '-': return -(evaluate(arg, scope));
          case '!': return !(evaluate(arg, scope));
          case '~': return ~(evaluate(arg, scope));
          case 'void': return void (evaluate(arg, scope));
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
                  throw new SyntaxError('Delete of an unqualified identifier in strict mode');
              }
              else {
                  evaluate(arg, scope);
                  return true;
              }
          default: throw new SyntaxError("Unexpected token " + node.operator);
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
      var left;
      var right;
      if (node.left.type === 'PrivateIdentifier') {
          left = node.left.name;
          right = evaluate(node.right, scope);
          right = right[PRIVATE];
      }
      else {
          left = evaluate(node.left, scope);
          right = evaluate(node.right, scope);
      }
      switch (node.operator) {
          case '==': return left == right;
          case '!=': return left != right;
          case '===': return left === right;
          case '!==': return left !== right;
          case '<': return left < right;
          case '<=': return left <= right;
          case '>': return left > right;
          case '>=': return left >= right;
          case '<<': return left << right;
          case '>>': return left >> right;
          case '>>>': return left >>> right;
          case '+': return left + right;
          case '-': return left - right;
          case '*': return left * right;
          case '**': return Math.pow(left, right);
          case '/': return left / right;
          case '%': return left % right;
          case '|': return left | right;
          case '^': return left ^ right;
          case '&': return left & right;
          case 'in': return left in right;
          case 'instanceof': return left instanceof right;
          default: throw new SyntaxError("Unexpected token " + node.operator);
      }
  }
  function AssignmentExpression(node, scope) {
      var _a;
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
          var value_1 = evaluate(node.right, scope);
          return pattern$3(left, scope, { feed: value_1 });
      }
      var value = evaluate(node.right, scope);
      switch (node.operator) {
          case '=':
              variable.set(value);
              return variable.get();
          case '+=':
              variable.set(variable.get() + value);
              return variable.get();
          case '-=':
              variable.set(variable.get() - value);
              return variable.get();
          case '*=':
              variable.set(variable.get() * value);
              return variable.get();
          case '/=':
              variable.set(variable.get() / value);
              return variable.get();
          case '%=':
              variable.set(variable.get() % value);
              return variable.get();
          case '**=':
              variable.set(Math.pow(variable.get(), value));
              return variable.get();
          case '<<=':
              variable.set(variable.get() << value);
              return variable.get();
          case '>>=':
              variable.set(variable.get() >> value);
              return variable.get();
          case '>>>=':
              variable.set(variable.get() >>> value);
              return variable.get();
          case '|=':
              variable.set(variable.get() | value);
              return variable.get();
          case '^=':
              variable.set(variable.get() ^ value);
              return variable.get();
          case '&=':
              variable.set(variable.get() & value);
              return variable.get();
          case '??=':
              variable.set((_a = variable.get()) !== null && _a !== void 0 ? _a : value);
              return variable.get();
          case '&&=':
              variable.set(variable.get() && value);
              return variable.get();
          case '||=':
              variable.set(variable.get() || value);
              return variable.get();
          default: throw new SyntaxError("Unexpected token " + node.operator);
      }
  }
  function LogicalExpression(node, scope) {
      var _a;
      switch (node.operator) {
          case '||':
              return (evaluate(node.left, scope)) || (evaluate(node.right, scope));
          case '&&':
              return (evaluate(node.left, scope)) && (evaluate(node.right, scope));
          case '??':
              return (_a = (evaluate(node.left, scope))) !== null && _a !== void 0 ? _a : (evaluate(node.right, scope));
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
      if (getObj)
          return object;
      var key;
      var priv = false;
      if (node.computed) {
          key = evaluate(node.property, scope);
      }
      else if (node.property.type === 'PrivateIdentifier') {
          key = node.property.name;
          priv = true;
      }
      else {
          key = node.property.name;
      }
      if (priv) {
          object = object[PRIVATE];
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
              if (node.optional && thisObject == null) {
                  return undefined;
              }
              return getter.call(thisObject);
          }
          else {
              if (node.optional && object == null) {
                  return undefined;
              }
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
          if (node.callee.optional && object == null) {
              return undefined;
          }
          var key = void 0;
          var priv = false;
          if (node.callee.computed) {
              key = evaluate(node.callee.property, scope);
          }
          else if (node.callee.property.type === 'PrivateIdentifier') {
              key = node.callee.property.name;
              priv = true;
          }
          else {
              key = node.callee.property.name;
          }
          var obj = object;
          if (priv) {
              obj = obj[PRIVATE];
          }
          if (node.callee.object.type === 'Super') {
              var thisObject = scope.find('this').get();
              func = obj[key].bind(thisObject);
          }
          else {
              func = obj[key];
          }
          if (node.optional && func == null) {
              return undefined;
          }
          if (typeof func !== 'function') {
              throw new TypeError(key + " is not a function");
          }
          else if (func[CLSCTOR]) {
              throw new TypeError("Class constructor " + key + " cannot be invoked without 'new'");
          }
      }
      else {
          object = scope.find('this').get();
          func = evaluate(node.callee, scope);
          if (node.optional && func == null) {
              return undefined;
          }
          if (typeof func !== 'function' || node.callee.type !== 'Super' && func[CLSCTOR]) {
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
              if (typeof func !== 'function') {
                  throw new TypeError(name_1 + " is not a function");
              }
              else {
                  throw new TypeError("Class constructor " + name_1 + " cannot be invoked without 'new'");
              }
          }
      }
      var args = [];
      for (var i = 0; i < node.arguments.length; i++) {
          var arg = node.arguments[i];
          if (arg.type === 'SpreadElement') {
              args = args.concat(SpreadElement(arg, scope));
          }
          else {
              args.push(evaluate(arg, scope));
          }
      }
      if (node.callee.type === 'Super') {
          var superCall = scope.find(SUPERCALL);
          if (superCall.get()) {
              throw new ReferenceError('Super constructor may only be called once');
          }
          else {
              scope.find(SUPERCALL).set(true);
          }
      }
      if (object && object[WINDOW] && func.toString().indexOf('[native code]') !== -1) {
          return func.apply(object[WINDOW], args);
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
      else if (constructor[NOCTOR]) {
          throw new TypeError((constructor.name || '(intermediate value)') + " is not a constructor");
      }
      var args = [];
      for (var i = 0; i < node.arguments.length; i++) {
          var arg = node.arguments[i];
          if (arg.type === 'SpreadElement') {
              args = args.concat(SpreadElement(arg, scope));
          }
          else {
              args.push(evaluate(arg, scope));
          }
      }
      return new (constructor.bind.apply(constructor, __spread([void 0], args)))();
  }
  function MetaProperty(node, scope) {
      if (node.meta.name === 'new' && node.property.name === 'target') {
          return scope.find(NEWTARGET).get();
      }
      else if (node.meta.name === 'import' && node.property.name === 'meta') {
          return { url: '' };
      }
  }
  function SequenceExpression(node, scope) {
      var result;
      for (var i = 0; i < node.expressions.length; i++) {
          result = evaluate(node.expressions[i], scope);
      }
      return result;
  }
  function ArrowFunctionExpression(node, scope) {
      return createFunc$1(node, scope);
  }
  function TemplateLiteral(node, scope) {
      var quasis = node.quasis.slice();
      var expressions = node.expressions.slice();
      var result = '';
      var temEl;
      var expr;
      while (temEl = quasis.shift()) {
          result += TemplateElement(temEl);
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
          for (var i = 0; i < expressions.length; i++) {
              args.push(evaluate(expressions[i], scope));
          }
      }
      return tagFunc.apply(void 0, __spread([freeze(str)], args));
  }
  function TemplateElement(node, scope) {
      return node.value.raw;
  }
  function ClassExpression(node, scope) {
      if (node.id && node.id.name) {
          var tmpScope = new Scope(scope);
          var klass = createClass$1(node, tmpScope);
          tmpScope.const(node.id.name, klass);
          return klass;
      }
      else {
          return createClass$1(node, scope);
      }
  }
  function Super(node, scope, options) {
      if (options === void 0) { options = {}; }
      var _a = options.getProto, getProto = _a === void 0 ? false : _a;
      var superClass = scope.find(SUPER).get();
      return getProto ? superClass.prototype : superClass;
  }
  function SpreadElement(node, scope) {
      var result = evaluate(node.argument, scope);
      return typeof result === 'string' ? __spread(result) : result;
  }
  function ChainExpression(node, scope) {
      return evaluate(node.expression, scope);
  }
  function ImportExpression(node, scope) {
      var globalScope = scope.global();
      var source = evaluate(node.source, scope);
      var module = globalScope.find(IMPORT + source);
      var value;
      if (module) {
          var result = module.get();
          if (result) {
              if (typeof result === 'function') {
                  value = result();
              }
              else if (typeof result === 'object') {
                  value = result;
              }
          }
      }
      if (!value || typeof value !== 'object') {
          return Promise.reject(new TypeError("Failed to resolve module specifier \"" + source + "\""));
      }
      return Promise.resolve(value);
  }

  var expression = /*#__PURE__*/Object.freeze({
    __proto__: null,
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
    MetaProperty: MetaProperty,
    SequenceExpression: SequenceExpression,
    ArrowFunctionExpression: ArrowFunctionExpression,
    TemplateLiteral: TemplateLiteral,
    TaggedTemplateExpression: TaggedTemplateExpression,
    TemplateElement: TemplateElement,
    ClassExpression: ClassExpression,
    Super: Super,
    SpreadElement: SpreadElement,
    ChainExpression: ChainExpression,
    ImportExpression: ImportExpression
  });

  function ObjectPattern(node, scope, options) {
      if (options === void 0) { options = {}; }
      var _a = options.kind, kind = _a === void 0 ? 'var' : _a, _b = options.hoist, hoist = _b === void 0 ? false : _b, _c = options.onlyBlock, onlyBlock = _c === void 0 ? false : _c, _d = options.feed, feed = _d === void 0 ? {} : _d;
      var fedKeys = [];
      for (var i = 0; i < node.properties.length; i++) {
          var property = node.properties[i];
          if (hoist) {
              if (onlyBlock || kind === 'var') {
                  if (property.type === 'Property') {
                      var value = property.value;
                      if (value.type === 'Identifier') {
                          scope[kind](value.name, onlyBlock ? DEADZONE : kind === 'var' ? NOINIT : undefined);
                      }
                      else {
                          pattern$3(value, scope, { kind: kind, hoist: hoist, onlyBlock: onlyBlock });
                      }
                  }
                  else {
                      RestElement(property, scope, { kind: kind, hoist: hoist, onlyBlock: onlyBlock });
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
              var value = property.value;
              if (value.type === 'Identifier') {
                  scope[kind](value.name, feed[key]);
              }
              else {
                  pattern$3(value, scope, { kind: kind, feed: feed[key] });
              }
          }
          else {
              var rest = assign({}, feed);
              for (var i_1 = 0; i_1 < fedKeys.length; i_1++)
                  delete rest[fedKeys[i_1]];
              RestElement(property, scope, { kind: kind, feed: rest });
          }
      }
  }
  function ArrayPattern(node, scope, options) {
      if (options === void 0) { options = {}; }
      var kind = options.kind, _a = options.hoist, hoist = _a === void 0 ? false : _a, _b = options.onlyBlock, onlyBlock = _b === void 0 ? false : _b, _c = options.feed, feed = _c === void 0 ? [] : _c;
      var result = [];
      for (var i = 0; i < node.elements.length; i++) {
          var element = node.elements[i];
          if (!element)
              continue;
          if (hoist) {
              if (onlyBlock || kind === 'var') {
                  if (element.type === 'Identifier') {
                      scope[kind](element.name, onlyBlock ? DEADZONE : kind === 'var' ? NOINIT : undefined);
                  }
                  else {
                      pattern$3(element, scope, { kind: kind, hoist: hoist, onlyBlock: onlyBlock });
                  }
              }
          }
          else if (element.type === 'Identifier') {
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
      if (result.length) {
          return result;
      }
  }
  function RestElement(node, scope, options) {
      if (options === void 0) { options = {}; }
      var kind = options.kind, _a = options.hoist, hoist = _a === void 0 ? false : _a, _b = options.onlyBlock, onlyBlock = _b === void 0 ? false : _b, _c = options.feed, feed = _c === void 0 ? [] : _c;
      var arg = node.argument;
      if (hoist) {
          if (onlyBlock || kind === 'var') {
              if (arg.type === 'Identifier') {
                  scope[kind](arg.name, onlyBlock ? DEADZONE : kind === 'var' ? NOINIT : undefined);
              }
              else {
                  pattern$3(arg, scope, { kind: kind, hoist: hoist, onlyBlock: onlyBlock });
              }
          }
      }
      else if (arg.type === 'Identifier') {
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
  function AssignmentPattern(node, scope, options) {
      if (options === void 0) { options = {}; }
      var _a = options.kind, kind = _a === void 0 ? 'var' : _a, _b = options.hoist, hoist = _b === void 0 ? false : _b, _c = options.onlyBlock, onlyBlock = _c === void 0 ? false : _c, _d = options.feed, feed = _d === void 0 ? evaluate(node.right, scope) : _d;
      var left = node.left;
      if (hoist) {
          if (onlyBlock || kind === 'var') {
              if (left.type === 'Identifier') {
                  scope[kind](left.name, onlyBlock ? DEADZONE : kind === 'var' ? NOINIT : undefined);
              }
              else {
                  pattern$3(left, scope, { kind: kind, hoist: hoist, onlyBlock: onlyBlock });
              }
          }
      }
      else if (left.type === 'Identifier') {
          scope[kind](left.name, feed);
      }
      else {
          pattern$3(left, scope, { kind: kind, feed: feed });
      }
  }

  var pattern = /*#__PURE__*/Object.freeze({
    __proto__: null,
    ObjectPattern: ObjectPattern,
    ArrayPattern: ArrayPattern,
    RestElement: RestElement,
    AssignmentPattern: AssignmentPattern
  });

  function Program(program, scope) {
      for (var i = 0; i < program.body.length; i++) {
          evaluate(program.body[i], scope);
      }
  }

  var program = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Program: Program
  });

  var evaluateOps;
  function evaluate(node, scope) {
      if (!node)
          return;
      if (!evaluateOps) {
          evaluateOps = assign({}, declaration, expression, identifier, statement, literal, pattern, program);
      }
      var handler = evaluateOps[node.type];
      if (handler) {
          return handler(node, scope);
      }
      else {
          throw new Error(node.type + " isn't implemented");
      }
  }

  function ExpressionStatement(node, scope) {
      evaluate(node.expression, scope);
  }
  function BlockStatement(block, scope, options) {
      if (options === void 0) { options = {}; }
      var _a = options.invasived, invasived = _a === void 0 ? false : _a, _b = options.hoisted, hoisted = _b === void 0 ? false : _b;
      var subScope = invasived ? scope : new Scope(scope);
      if (!hoisted) {
          hoist$1(block, subScope, { onlyBlock: true });
      }
      for (var i = 0; i < block.body.length; i++) {
          var result = evaluate(block.body[i], subScope);
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
      for (var i = 0; i < node.cases.length; i++) {
          var eachCase = node.cases[i];
          if (!matched
              && (!eachCase.test
                  || (evaluate(eachCase.test, scope)) === discriminant)) {
              matched = true;
          }
          if (matched) {
              var result = SwitchCase(eachCase, scope);
              if (result === BREAK) {
                  break;
              }
              if (result === CONTINUE || result === RETURN) {
                  return result;
              }
          }
      }
  }
  function SwitchCase(node, scope) {
      for (var i = 0; i < node.consequent.length; i++) {
          var result = evaluate(node.consequent[i], scope);
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
                      subScope.var(name_1, err);
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
              var result = BlockStatement(node.finalizer, scope);
              if (result === BREAK || result === CONTINUE || result === RETURN) {
                  return result;
              }
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

  function FunctionDeclaration(node, scope) {
      scope.func(node.id.name, createFunc$1(node, scope));
  }
  function VariableDeclaration(node, scope, options) {
      if (options === void 0) { options = {}; }
      for (var i = 0; i < node.declarations.length; i++) {
          VariableDeclarator(node.declarations[i], scope, assign({ kind: node.kind }, options));
      }
  }
  function VariableDeclarator(node, scope, options) {
      if (options === void 0) { options = {}; }
      var _a = options.kind, kind = _a === void 0 ? 'var' : _a, _b = options.hoist, hoist = _b === void 0 ? false : _b, _c = options.onlyBlock, onlyBlock = _c === void 0 ? false : _c, feed = options.feed;
      if (hoist) {
          if (onlyBlock || kind === 'var') {
              if (node.id.type === 'Identifier') {
                  scope[kind](node.id.name, onlyBlock ? DEADZONE : kind === 'var' ? NOINIT : undefined);
              }
              else {
                  pattern$3(node.id, scope, { kind: kind, hoist: hoist, onlyBlock: onlyBlock });
              }
          }
      }
      else {
          var hasFeed = 'feed' in options;
          var value = hasFeed ? feed : evaluate(node.init, scope);
          if (node.id.type === 'Identifier') {
              var name_1 = node.id.name;
              if (kind === 'var' && !node.init && !hasFeed) {
                  scope.var(name_1, NOINIT);
              }
              else {
                  scope[kind](name_1, value);
              }
              if (node.init
                  && ['ClassExpression', 'FunctionExpression', 'ArrowFunctionExpression']
                      .indexOf(node.init.type) !== -1
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
  }
  function ClassDeclaration(node, scope) {
      scope.func(node.id.name, createClass$1(node, scope));
  }
  function ClassBody(node, scope, options) {
      if (options === void 0) { options = {}; }
      var klass = options.klass, superClass = options.superClass;
      for (var i = 0; i < node.body.length; i++) {
          var def = node.body[i];
          if (def.type === 'MethodDefinition') {
              MethodDefinition(def, scope, { klass: klass, superClass: superClass });
          }
          else if (def.type === 'PropertyDefinition' && def.static) {
              PropertyDefinition(def, scope, { klass: klass, superClass: superClass });
          }
          else if (def.type === 'StaticBlock') {
              StaticBlock(def, scope, { klass: klass, superClass: superClass });
          }
      }
  }
  function MethodDefinition(node, scope, options) {
      if (options === void 0) { options = {}; }
      var klass = options.klass, superClass = options.superClass;
      var key;
      var priv = false;
      if (node.computed) {
          key = evaluate(node.key, scope);
      }
      else if (node.key.type === 'Identifier') {
          key = node.key.name;
      }
      else if (node.key.type === 'PrivateIdentifier') {
          key = node.key.name;
          priv = true;
      }
      else {
          throw new SyntaxError('Unexpected token');
      }
      var obj = node.static ? klass : klass.prototype;
      if (priv) {
          if (!obj[PRIVATE]) {
              define(obj, PRIVATE, { value: {} });
          }
          obj = obj[PRIVATE];
      }
      var value = createFunc$1(node.value, scope, { superClass: superClass });
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
  function PropertyDefinition(node, scope, options) {
      if (options === void 0) { options = {}; }
      var klass = options.klass, superClass = options.superClass;
      var key;
      var priv = false;
      if (node.computed) {
          key = evaluate(node.key, scope);
      }
      else if (node.key.type === 'Identifier') {
          key = node.key.name;
      }
      else if (node.key.type === 'PrivateIdentifier') {
          key = node.key.name;
          priv = true;
      }
      else {
          throw new SyntaxError('Unexpected token');
      }
      var subScope = new Scope(scope, true);
      subScope.const('this', klass);
      var obj = klass;
      if (priv) {
          if (!obj[PRIVATE]) {
              define(obj, PRIVATE, { value: {} });
          }
          obj = obj[PRIVATE];
      }
      if (node.value.type === 'FunctionExpression' || node.value.type === 'ArrowFunctionExpression') {
          obj[key] = createFunc$1(node.value, subScope, { superClass: superClass });
      }
      else {
          obj[key] = evaluate(node.value, subScope);
      }
  }
  function StaticBlock(node, scope, options) {
      if (options === void 0) { options = {}; }
      var klass = options.klass;
      var subScope = new Scope(scope, true);
      subScope.const('this', klass);
      return BlockStatement(node, subScope, { invasived: true });
  }
  function ImportDeclaration(node, scope) {
      var globalScope = scope.global();
      var module = globalScope.find(IMPORT + node.source.value);
      var value;
      if (module) {
          var result = module.get();
          if (result) {
              if (typeof result === 'function') {
                  value = result();
              }
              else if (typeof result === 'object') {
                  value = result;
              }
          }
      }
      if (!value || typeof value !== 'object') {
          throw new TypeError("Failed to resolve module specifier \"" + node.source.value + "\"");
      }
      for (var i = 0; i < node.specifiers.length; i++) {
          var spec = node.specifiers[i];
          var name_2 = void 0;
          if (spec.type === 'ImportSpecifier') {
              name_2 = spec.imported.type === 'Identifier'
                  ? spec.imported.name : spec.imported.value;
          }
          else if (spec.type === 'ImportDefaultSpecifier') {
              name_2 = 'default';
          }
          else if (spec.type === 'ImportNamespaceSpecifier') {
              name_2 = '*';
          }
          if (name_2 !== '*' && !hasOwn(value, name_2)) {
              throw new SyntaxError("The requested module \"" + node.source.value + "\" does not provide an export named \"" + name_2 + "\"");
          }
          scope.var(spec.local.name, name_2 === '*' ? assign({}, value) : value[name_2]);
      }
  }
  function ExportDefaultDeclaration(node, scope) {
      var globalScope = scope.global();
      var value;
      if (node.declaration.type === 'FunctionDeclaration') {
          value = createFunc$1(node.declaration, scope);
          scope.func(node.declaration.id.name, value);
      }
      else if (node.declaration.type === 'ClassDeclaration') {
          value = createClass$1(node.declaration, scope);
          scope.func(node.declaration.id.name, value);
      }
      else {
          value = evaluate(node.declaration, scope);
      }
      var variable = globalScope.find(EXPORTS);
      if (variable) {
          var exports_1 = variable.get();
          if (exports_1 && typeof exports_1 === 'object') {
              exports_1.default = value;
          }
      }
  }
  function ExportNamedDeclaration(node, scope) {
      var globalScope = scope.global();
      if (node.declaration) {
          if (node.declaration.type === 'FunctionDeclaration') {
              var value = createFunc$1(node.declaration, scope);
              scope.func(node.declaration.id.name, value);
              var variable = globalScope.find(EXPORTS);
              if (variable) {
                  var exports_2 = variable.get();
                  if (exports_2 && typeof exports_2 === 'object') {
                      exports_2[node.declaration.id.name] = value;
                  }
              }
          }
          else if (node.declaration.type === 'ClassDeclaration') {
              var value = createClass$1(node.declaration, scope);
              scope.func(node.declaration.id.name, value);
              var variable = globalScope.find(EXPORTS);
              if (variable) {
                  var exports_3 = variable.get();
                  if (exports_3 && typeof exports_3 === 'object') {
                      exports_3[node.declaration.id.name] = value;
                  }
              }
          }
          else if (node.declaration.type === 'VariableDeclaration') {
              VariableDeclaration(node.declaration, scope);
              var variable = globalScope.find(EXPORTS);
              if (variable) {
                  var exports_4 = variable.get();
                  if (exports_4 && typeof exports_4 === 'object') {
                      for (var i = 0; i < node.declaration.declarations.length; i++) {
                          var name_3 = node.declaration.declarations[i].id.name;
                          var item = scope.find(name_3);
                          if (item) {
                              exports_4[name_3] = item.get();
                          }
                      }
                  }
              }
          }
      }
      else if (node.specifiers) {
          var variable = globalScope.find(EXPORTS);
          if (variable) {
              var exports_5 = variable.get();
              if (exports_5 && typeof exports_5 === 'object') {
                  for (var i = 0; i < node.specifiers.length; i++) {
                      var spec = node.specifiers[i];
                      var name_4 = spec.local.type === 'Identifier'
                          ? spec.local.name : spec.local.value;
                      var item = scope.find(name_4);
                      if (item) {
                          exports_5[spec.exported.type === 'Identifier'
                              ? spec.exported.name : spec.exported.value] = item.get();
                      }
                  }
              }
          }
      }
  }
  function ExportAllDeclaration(node, scope) {
      var globalScope = scope.global();
      var module = globalScope.find(IMPORT + node.source.value);
      var value;
      if (module) {
          var result = module.get();
          if (result) {
              if (typeof result === 'function') {
                  value = result();
              }
              else if (typeof result === 'object') {
                  value = result;
              }
          }
      }
      if (!value || typeof value !== 'object') {
          throw new TypeError("Failed to resolve module specifier \"" + node.source.value + "\"");
      }
      var variable = globalScope.find(EXPORTS);
      if (variable) {
          var exports_6 = variable.get();
          if (exports_6 && typeof exports_6 === 'object') {
              assign(exports_6, value);
          }
      }
  }

  function Identifier$1(node, scope, options) {
      var _a, getVar, _b, throwErr, variable, value;
      if (options === void 0) { options = {}; }
      return __generator(this, function (_c) {
          _a = options.getVar, getVar = _a === void 0 ? false : _a, _b = options.throwErr, throwErr = _b === void 0 ? true : _b;
          if (node.name === 'undefined') {
              return [2, undefined];
          }
          variable = scope.find(node.name);
          if (variable) {
              if (getVar) {
                  return [2, variable];
              }
              else {
                  value = variable.get();
                  if (value === DEADZONE) {
                      throw new ReferenceError(node.name + " is not defined");
                  }
                  else {
                      return [2, value];
                  }
              }
          }
          else if (throwErr) {
              throw new ReferenceError(node.name + " is not defined");
          }
          else {
              return [2, undefined];
          }
      });
  }

  var identifier$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Identifier: Identifier$1
  });

  function Literal$1(node, scope) {
      return __generator(this, function (_a) {
          return [2, node.value];
      });
  }

  var literal$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Literal: Literal$1
  });

  function ThisExpression$1(node, scope) {
      var superCall;
      return __generator(this, function (_a) {
          superCall = scope.find(SUPERCALL);
          if (superCall && !superCall.get()) {
              throw new ReferenceError('Must call super constructor in derived class '
                  + 'before accessing \'this\' or returning from derived constructor');
          }
          else {
              return [2, scope.find('this').get()];
          }
      });
  }
  function ArrayExpression$1(node, scope) {
      var results, i, item, _a, _b, _c, _d;
      return __generator(this, function (_e) {
          switch (_e.label) {
              case 0:
                  results = [];
                  i = 0;
                  _e.label = 1;
              case 1:
                  if (!(i < node.elements.length)) return [3, 6];
                  item = node.elements[i];
                  if (!(item.type === 'SpreadElement')) return [3, 3];
                  _b = (_a = results).concat;
                  return [5, __values(SpreadElement$1(item, scope))];
              case 2:
                  results = _b.apply(_a, [_e.sent()]);
                  return [3, 5];
              case 3:
                  _d = (_c = results).push;
                  return [5, __values(evaluate$1(item, scope))];
              case 4:
                  _d.apply(_c, [_e.sent()]);
                  _e.label = 5;
              case 5:
                  i++;
                  return [3, 1];
              case 6: return [2, results];
          }
      });
  }
  function ObjectExpression$1(node, scope) {
      var object, i, property, _a, _b, key, propKey, _c, value, propKind, oriDptor, oriDptor;
      return __generator(this, function (_d) {
          switch (_d.label) {
              case 0:
                  object = {};
                  i = 0;
                  _d.label = 1;
              case 1:
                  if (!(i < node.properties.length)) return [3, 11];
                  property = node.properties[i];
                  if (!(property.type === 'SpreadElement')) return [3, 3];
                  _a = assign;
                  _b = [object];
                  return [5, __values(SpreadElement$1(property, scope))];
              case 2:
                  _a.apply(void 0, _b.concat([_d.sent()]));
                  return [3, 10];
              case 3:
                  key = void 0;
                  propKey = property.key;
                  if (!property.computed) return [3, 5];
                  return [5, __values(evaluate$1(propKey, scope))];
              case 4:
                  key = _d.sent();
                  return [3, 8];
              case 5:
                  if (!(propKey.type === 'Identifier')) return [3, 6];
                  key = propKey.name;
                  return [3, 8];
              case 6:
                  _c = '';
                  return [5, __values(Literal$1(propKey))];
              case 7:
                  key = _c + (_d.sent());
                  _d.label = 8;
              case 8: return [5, __values(evaluate$1(property.value, scope))];
              case 9:
                  value = _d.sent();
                  propKind = property.kind;
                  if (propKind === 'init') {
                      object[key] = value;
                  }
                  else if (propKind === 'get') {
                      oriDptor = getDptor(object, key);
                      define(object, key, {
                          get: value,
                          set: oriDptor && oriDptor.set,
                          enumerable: true,
                          configurable: true
                      });
                  }
                  else {
                      oriDptor = getDptor(object, key);
                      define(object, key, {
                          get: oriDptor && oriDptor.get,
                          set: value,
                          enumerable: true,
                          configurable: true
                      });
                  }
                  _d.label = 10;
              case 10:
                  i++;
                  return [3, 1];
              case 11: return [2, object];
          }
      });
  }
  function FunctionExpression$1(node, scope) {
      var tmpScope, func;
      return __generator(this, function (_a) {
          if (node.id && node.id.name) {
              tmpScope = new Scope(scope);
              func = createFunc(node, tmpScope);
              tmpScope.const(node.id.name, func);
              return [2, func];
          }
          else {
              return [2, createFunc(node, scope)];
          }
      });
  }
  function UnaryExpression$1(node, scope) {
      var arg, _a, variable;
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
                  return [3, 20];
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
                  if (!(arg.type === 'Identifier')) return [3, 18];
                  throw new SyntaxError('Delete of an unqualified identifier in strict mode');
              case 18: return [5, __values(evaluate$1(arg, scope))];
              case 19:
                  _b.sent();
                  return [2, true];
              case 20: throw new SyntaxError("Unexpected token " + node.operator);
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
          }
      });
  }
  function BinaryExpression$1(node, scope) {
      var left, right;
      return __generator(this, function (_a) {
          switch (_a.label) {
              case 0:
                  if (!(node.left.type === 'PrivateIdentifier')) return [3, 2];
                  left = node.left.name;
                  return [5, __values(evaluate$1(node.right, scope))];
              case 1:
                  right = _a.sent();
                  right = right[PRIVATE];
                  return [3, 5];
              case 2: return [5, __values(evaluate$1(node.left, scope))];
              case 3:
                  left = _a.sent();
                  return [5, __values(evaluate$1(node.right, scope))];
              case 4:
                  right = _a.sent();
                  _a.label = 5;
              case 5:
                  switch (node.operator) {
                      case '==': return [2, left == right];
                      case '!=': return [2, left != right];
                      case '===': return [2, left === right];
                      case '!==': return [2, left !== right];
                      case '<': return [2, left < right];
                      case '<=': return [2, left <= right];
                      case '>': return [2, left > right];
                      case '>=': return [2, left >= right];
                      case '<<': return [2, left << right];
                      case '>>': return [2, left >> right];
                      case '>>>': return [2, left >>> right];
                      case '+': return [2, left + right];
                      case '-': return [2, left - right];
                      case '*': return [2, left * right];
                      case '**': return [2, Math.pow(left, right)];
                      case '/': return [2, left / right];
                      case '%': return [2, left % right];
                      case '|': return [2, left | right];
                      case '^': return [2, left ^ right];
                      case '&': return [2, left & right];
                      case 'in': return [2, left in right];
                      case 'instanceof': return [2, left instanceof right];
                      default: throw new SyntaxError("Unexpected token " + node.operator);
                  }
          }
      });
  }
  function AssignmentExpression$1(node, scope) {
      var left, variable, win, value_1, value;
      var _a;
      return __generator(this, function (_b) {
          switch (_b.label) {
              case 0:
                  left = node.left;
                  if (!(left.type === 'Identifier')) return [3, 2];
                  return [5, __values(Identifier$1(left, scope, { getVar: true, throwErr: false }))];
              case 1:
                  variable = _b.sent();
                  if (!variable) {
                      win = scope.global().find('window').get();
                      variable = new Prop(win, left.name);
                  }
                  return [3, 7];
              case 2:
                  if (!(left.type === 'MemberExpression')) return [3, 4];
                  return [5, __values(MemberExpression$1(left, scope, { getVar: true }))];
              case 3:
                  variable = _b.sent();
                  return [3, 7];
              case 4: return [5, __values(evaluate$1(node.right, scope))];
              case 5:
                  value_1 = _b.sent();
                  return [5, __values(pattern$2(left, scope, { feed: value_1 }))];
              case 6: return [2, _b.sent()];
              case 7: return [5, __values(evaluate$1(node.right, scope))];
              case 8:
                  value = _b.sent();
                  switch (node.operator) {
                      case '=':
                          variable.set(value);
                          return [2, variable.get()];
                      case '+=':
                          variable.set(variable.get() + value);
                          return [2, variable.get()];
                      case '-=':
                          variable.set(variable.get() - value);
                          return [2, variable.get()];
                      case '*=':
                          variable.set(variable.get() * value);
                          return [2, variable.get()];
                      case '/=':
                          variable.set(variable.get() / value);
                          return [2, variable.get()];
                      case '%=':
                          variable.set(variable.get() % value);
                          return [2, variable.get()];
                      case '**=':
                          variable.set(Math.pow(variable.get(), value));
                          return [2, variable.get()];
                      case '<<=':
                          variable.set(variable.get() << value);
                          return [2, variable.get()];
                      case '>>=':
                          variable.set(variable.get() >> value);
                          return [2, variable.get()];
                      case '>>>=':
                          variable.set(variable.get() >>> value);
                          return [2, variable.get()];
                      case '|=':
                          variable.set(variable.get() | value);
                          return [2, variable.get()];
                      case '^=':
                          variable.set(variable.get() ^ value);
                          return [2, variable.get()];
                      case '&=':
                          variable.set(variable.get() & value);
                          return [2, variable.get()];
                      case '??=':
                          variable.set((_a = variable.get()) !== null && _a !== void 0 ? _a : value);
                          return [2, variable.get()];
                      case '&&=':
                          variable.set(variable.get() && value);
                          return [2, variable.get()];
                      case '||=':
                          variable.set(variable.get() || value);
                          return [2, variable.get()];
                      default: throw new SyntaxError("Unexpected token " + node.operator);
                  }
          }
      });
  }
  function LogicalExpression$1(node, scope) {
      var _a, _b, _c, _d;
      var _e;
      return __generator(this, function (_f) {
          switch (_f.label) {
              case 0:
                  _a = node.operator;
                  switch (_a) {
                      case '||': return [3, 1];
                      case '&&': return [3, 5];
                      case '??': return [3, 9];
                  }
                  return [3, 14];
              case 1: return [5, __values(evaluate$1(node.left, scope))];
              case 2:
                  _b = (_f.sent());
                  if (_b) return [3, 4];
                  return [5, __values(evaluate$1(node.right, scope))];
              case 3:
                  _b = (_f.sent());
                  _f.label = 4;
              case 4: return [2, _b];
              case 5: return [5, __values(evaluate$1(node.left, scope))];
              case 6:
                  _c = (_f.sent());
                  if (!_c) return [3, 8];
                  return [5, __values(evaluate$1(node.right, scope))];
              case 7:
                  _c = (_f.sent());
                  _f.label = 8;
              case 8: return [2, _c];
              case 9: return [5, __values(evaluate$1(node.left, scope))];
              case 10:
                  if (!((_e = (_f.sent())) !== null && _e !== void 0)) return [3, 11];
                  _d = _e;
                  return [3, 13];
              case 11: return [5, __values(evaluate$1(node.right, scope))];
              case 12:
                  _d = (_f.sent());
                  _f.label = 13;
              case 13: return [2, _d];
              case 14: throw new SyntaxError("Unexpected token " + node.operator);
          }
      });
  }
  function MemberExpression$1(node, scope, options) {
      var _a, getObj, _b, getVar, object, key, priv, setter, thisObject, privateKey, getter, thisObject;
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
                  if (getObj)
                      return [2, object];
                  priv = false;
                  if (!node.computed) return [3, 6];
                  return [5, __values(evaluate$1(node.property, scope))];
              case 5:
                  key = _c.sent();
                  return [3, 7];
              case 6:
                  if (node.property.type === 'PrivateIdentifier') {
                      key = node.property.name;
                      priv = true;
                  }
                  else {
                      key = node.property.name;
                  }
                  _c.label = 7;
              case 7:
                  if (priv) {
                      object = object[PRIVATE];
                  }
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
                          if (node.optional && thisObject == null) {
                              return [2, undefined];
                          }
                          return [2, getter.call(thisObject)];
                      }
                      else {
                          if (node.optional && object == null) {
                              return [2, undefined];
                          }
                          return [2, object[key]];
                      }
                  }
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
      var func, object, key, priv, obj, thisObject, name_1, args, i, arg, _a, _b, _c, _d, superCall;
      return __generator(this, function (_e) {
          switch (_e.label) {
              case 0:
                  if (!(node.callee.type === 'MemberExpression')) return [3, 5];
                  return [5, __values(MemberExpression$1(node.callee, scope, { getObj: true }))];
              case 1:
                  object = _e.sent();
                  if (node.callee.optional && object == null) {
                      return [2, undefined];
                  }
                  key = void 0;
                  priv = false;
                  if (!node.callee.computed) return [3, 3];
                  return [5, __values(evaluate$1(node.callee.property, scope))];
              case 2:
                  key = _e.sent();
                  return [3, 4];
              case 3:
                  if (node.callee.property.type === 'PrivateIdentifier') {
                      key = node.callee.property.name;
                      priv = true;
                  }
                  else {
                      key = node.callee.property.name;
                  }
                  _e.label = 4;
              case 4:
                  obj = object;
                  if (priv) {
                      obj = obj[PRIVATE];
                  }
                  if (node.callee.object.type === 'Super') {
                      thisObject = scope.find('this').get();
                      func = obj[key].bind(thisObject);
                  }
                  else {
                      func = obj[key];
                  }
                  if (node.optional && func == null) {
                      return [2, undefined];
                  }
                  if (typeof func !== 'function') {
                      throw new TypeError(key + " is not a function");
                  }
                  else if (func[CLSCTOR]) {
                      throw new TypeError("Class constructor " + key + " cannot be invoked without 'new'");
                  }
                  return [3, 7];
              case 5:
                  object = scope.find('this').get();
                  return [5, __values(evaluate$1(node.callee, scope))];
              case 6:
                  func = _e.sent();
                  if (node.optional && func == null) {
                      return [2, undefined];
                  }
                  if (typeof func !== 'function' || node.callee.type !== 'Super' && func[CLSCTOR]) {
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
                      if (typeof func !== 'function') {
                          throw new TypeError(name_1 + " is not a function");
                      }
                      else {
                          throw new TypeError("Class constructor " + name_1 + " cannot be invoked without 'new'");
                      }
                  }
                  _e.label = 7;
              case 7:
                  args = [];
                  i = 0;
                  _e.label = 8;
              case 8:
                  if (!(i < node.arguments.length)) return [3, 13];
                  arg = node.arguments[i];
                  if (!(arg.type === 'SpreadElement')) return [3, 10];
                  _b = (_a = args).concat;
                  return [5, __values(SpreadElement$1(arg, scope))];
              case 9:
                  args = _b.apply(_a, [_e.sent()]);
                  return [3, 12];
              case 10:
                  _d = (_c = args).push;
                  return [5, __values(evaluate$1(arg, scope))];
              case 11:
                  _d.apply(_c, [_e.sent()]);
                  _e.label = 12;
              case 12:
                  i++;
                  return [3, 8];
              case 13:
                  if (node.callee.type === 'Super') {
                      superCall = scope.find(SUPERCALL);
                      if (superCall.get()) {
                          throw new ReferenceError('Super constructor may only be called once');
                      }
                      else {
                          scope.find(SUPERCALL).set(true);
                      }
                  }
                  if (object && object[WINDOW] && func.toString().indexOf('[native code]') !== -1) {
                      return [2, func.apply(object[WINDOW], args)];
                  }
                  return [2, func.apply(object, args)];
          }
      });
  }
  function NewExpression$1(node, scope) {
      var constructor, name_2, args, i, arg, _a, _b, _c, _d;
      return __generator(this, function (_e) {
          switch (_e.label) {
              case 0: return [5, __values(evaluate$1(node.callee, scope))];
              case 1:
                  constructor = _e.sent();
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
                  else if (constructor[NOCTOR]) {
                      throw new TypeError((constructor.name || '(intermediate value)') + " is not a constructor");
                  }
                  args = [];
                  i = 0;
                  _e.label = 2;
              case 2:
                  if (!(i < node.arguments.length)) return [3, 7];
                  arg = node.arguments[i];
                  if (!(arg.type === 'SpreadElement')) return [3, 4];
                  _b = (_a = args).concat;
                  return [5, __values(SpreadElement$1(arg, scope))];
              case 3:
                  args = _b.apply(_a, [_e.sent()]);
                  return [3, 6];
              case 4:
                  _d = (_c = args).push;
                  return [5, __values(evaluate$1(arg, scope))];
              case 5:
                  _d.apply(_c, [_e.sent()]);
                  _e.label = 6;
              case 6:
                  i++;
                  return [3, 2];
              case 7: return [2, new (constructor.bind.apply(constructor, __spread([void 0], args)))()];
          }
      });
  }
  function MetaProperty$1(node, scope) {
      return __generator(this, function (_a) {
          if (node.meta.name === 'new' && node.property.name === 'target') {
              return [2, scope.find(NEWTARGET).get()];
          }
          else if (node.meta.name === 'import' && node.property.name === 'meta') {
              return [2, { url: '' }];
          }
          return [2];
      });
  }
  function SequenceExpression$1(node, scope) {
      var result, i;
      return __generator(this, function (_a) {
          switch (_a.label) {
              case 0:
                  i = 0;
                  _a.label = 1;
              case 1:
                  if (!(i < node.expressions.length)) return [3, 4];
                  return [5, __values(evaluate$1(node.expressions[i], scope))];
              case 2:
                  result = _a.sent();
                  _a.label = 3;
              case 3:
                  i++;
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
                  quasis = node.quasis.slice();
                  expressions = node.expressions.slice();
                  result = '';
                  _c.label = 1;
              case 1:
                  if (!(temEl = quasis.shift())) return [3, 5];
                  _a = result;
                  return [5, __values(TemplateElement$1(temEl))];
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
      var tagFunc, quasis, str, raw, expressions, args, i, _a, _b;
      return __generator(this, function (_c) {
          switch (_c.label) {
              case 0: return [5, __values(evaluate$1(node.tag, scope))];
              case 1:
                  tagFunc = _c.sent();
                  quasis = node.quasi.quasis;
                  str = quasis.map(function (v) { return v.value.cooked; });
                  raw = quasis.map(function (v) { return v.value.raw; });
                  define(str, 'raw', {
                      value: freeze(raw)
                  });
                  expressions = node.quasi.expressions;
                  args = [];
                  if (!expressions) return [3, 5];
                  i = 0;
                  _c.label = 2;
              case 2:
                  if (!(i < expressions.length)) return [3, 5];
                  _b = (_a = args).push;
                  return [5, __values(evaluate$1(expressions[i], scope))];
              case 3:
                  _b.apply(_a, [_c.sent()]);
                  _c.label = 4;
              case 4:
                  i++;
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
      var tmpScope, klass;
      return __generator(this, function (_a) {
          switch (_a.label) {
              case 0:
                  if (!(node.id && node.id.name)) return [3, 2];
                  tmpScope = new Scope(scope);
                  return [5, __values(createClass(node, tmpScope))];
              case 1:
                  klass = _a.sent();
                  tmpScope.const(node.id.name, klass);
                  return [2, klass];
              case 2: return [5, __values(createClass(node, scope))];
              case 3: return [2, _a.sent()];
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
      var result;
      return __generator(this, function (_a) {
          switch (_a.label) {
              case 0: return [5, __values(evaluate$1(node.argument, scope))];
              case 1:
                  result = _a.sent();
                  return [2, typeof result === 'string' ? __spread(result) : result];
          }
      });
  }
  function ChainExpression$1(node, scope) {
      return __generator(this, function (_a) {
          switch (_a.label) {
              case 0: return [5, __values(evaluate$1(node.expression, scope))];
              case 1: return [2, _a.sent()];
          }
      });
  }
  function ImportExpression$1(node, scope) {
      var globalScope, source, module, value, result;
      return __generator(this, function (_a) {
          switch (_a.label) {
              case 0:
                  globalScope = scope.global();
                  return [5, __values(evaluate$1(node.source, scope))];
              case 1:
                  source = _a.sent();
                  module = globalScope.find(IMPORT + source);
                  if (module) {
                      result = module.get();
                      if (result) {
                          if (typeof result === 'function') {
                              value = result();
                          }
                          else if (typeof result === 'object') {
                              value = result;
                          }
                      }
                  }
                  if (!value || typeof value !== 'object') {
                      return [2, Promise.reject(new TypeError("Failed to resolve module specifier \"" + source + "\""))];
                  }
                  return [2, Promise.resolve(value)];
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
    __proto__: null,
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
    MetaProperty: MetaProperty$1,
    SequenceExpression: SequenceExpression$1,
    ArrowFunctionExpression: ArrowFunctionExpression$1,
    TemplateLiteral: TemplateLiteral$1,
    TaggedTemplateExpression: TaggedTemplateExpression$1,
    TemplateElement: TemplateElement$1,
    ClassExpression: ClassExpression$1,
    Super: Super$1,
    SpreadElement: SpreadElement$1,
    ChainExpression: ChainExpression$1,
    ImportExpression: ImportExpression$1,
    YieldExpression: YieldExpression,
    AwaitExpression: AwaitExpression
  });

  function ObjectPattern$1(node, scope, options) {
      var _a, kind, _b, hoist, _c, onlyBlock, _d, feed, fedKeys, i, property, value, key, value, rest, i_1;
      if (options === void 0) { options = {}; }
      return __generator(this, function (_e) {
          switch (_e.label) {
              case 0:
                  _a = options.kind, kind = _a === void 0 ? 'var' : _a, _b = options.hoist, hoist = _b === void 0 ? false : _b, _c = options.onlyBlock, onlyBlock = _c === void 0 ? false : _c, _d = options.feed, feed = _d === void 0 ? {} : _d;
                  fedKeys = [];
                  i = 0;
                  _e.label = 1;
              case 1:
                  if (!(i < node.properties.length)) return [3, 18];
                  property = node.properties[i];
                  if (!hoist) return [3, 8];
                  if (!(onlyBlock || kind === 'var')) return [3, 7];
                  if (!(property.type === 'Property')) return [3, 5];
                  value = property.value;
                  if (!(value.type === 'Identifier')) return [3, 2];
                  scope[kind](value.name, onlyBlock ? DEADZONE : kind === 'var' ? NOINIT : undefined);
                  return [3, 4];
              case 2: return [5, __values(pattern$2(value, scope, { kind: kind, hoist: hoist, onlyBlock: onlyBlock }))];
              case 3:
                  _e.sent();
                  _e.label = 4;
              case 4: return [3, 7];
              case 5: return [5, __values(RestElement$1(property, scope, { kind: kind, hoist: hoist, onlyBlock: onlyBlock }))];
              case 6:
                  _e.sent();
                  _e.label = 7;
              case 7: return [3, 17];
              case 8:
                  if (!(property.type === 'Property')) return [3, 15];
                  key = void 0;
                  if (!property.computed) return [3, 10];
                  return [5, __values(evaluate$1(property.key, scope))];
              case 9:
                  key = _e.sent();
                  return [3, 11];
              case 10:
                  key = property.key.name;
                  _e.label = 11;
              case 11:
                  fedKeys.push(key);
                  value = property.value;
                  if (!(value.type === 'Identifier')) return [3, 12];
                  scope[kind](value.name, feed[key]);
                  return [3, 14];
              case 12: return [5, __values(pattern$2(value, scope, { kind: kind, feed: feed[key] }))];
              case 13:
                  _e.sent();
                  _e.label = 14;
              case 14: return [3, 17];
              case 15:
                  rest = assign({}, feed);
                  for (i_1 = 0; i_1 < fedKeys.length; i_1++)
                      delete rest[fedKeys[i_1]];
                  return [5, __values(RestElement$1(property, scope, { kind: kind, feed: rest }))];
              case 16:
                  _e.sent();
                  _e.label = 17;
              case 17:
                  i++;
                  return [3, 1];
              case 18: return [2];
          }
      });
  }
  function ArrayPattern$1(node, scope, options) {
      var kind, _a, hoist, _b, onlyBlock, _c, feed, result, i, element, variable;
      if (options === void 0) { options = {}; }
      return __generator(this, function (_d) {
          switch (_d.label) {
              case 0:
                  kind = options.kind, _a = options.hoist, hoist = _a === void 0 ? false : _a, _b = options.onlyBlock, onlyBlock = _b === void 0 ? false : _b, _c = options.feed, feed = _c === void 0 ? [] : _c;
                  result = [];
                  i = 0;
                  _d.label = 1;
              case 1:
                  if (!(i < node.elements.length)) return [3, 14];
                  element = node.elements[i];
                  if (!element)
                      return [3, 13];
                  if (!hoist) return [3, 5];
                  if (!(onlyBlock || kind === 'var')) return [3, 4];
                  if (!(element.type === 'Identifier')) return [3, 2];
                  scope[kind](element.name, onlyBlock ? DEADZONE : kind === 'var' ? NOINIT : undefined);
                  return [3, 4];
              case 2: return [5, __values(pattern$2(element, scope, { kind: kind, hoist: hoist, onlyBlock: onlyBlock }))];
              case 3:
                  _d.sent();
                  _d.label = 4;
              case 4: return [3, 13];
              case 5:
                  if (!(element.type === 'Identifier')) return [3, 9];
                  if (!kind) return [3, 6];
                  scope[kind](element.name, feed[i]);
                  return [3, 8];
              case 6: return [5, __values(Identifier$1(element, scope, { getVar: true }))];
              case 7:
                  variable = _d.sent();
                  variable.set(feed[i]);
                  result.push(variable.get());
                  _d.label = 8;
              case 8: return [3, 13];
              case 9:
                  if (!(element.type === 'RestElement')) return [3, 11];
                  return [5, __values(RestElement$1(element, scope, { kind: kind, feed: feed.slice(i) }))];
              case 10:
                  _d.sent();
                  return [3, 13];
              case 11: return [5, __values(pattern$2(element, scope, { kind: kind, feed: feed[i] }))];
              case 12:
                  _d.sent();
                  _d.label = 13;
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
      var kind, _a, hoist, _b, onlyBlock, _c, feed, arg, variable;
      if (options === void 0) { options = {}; }
      return __generator(this, function (_d) {
          switch (_d.label) {
              case 0:
                  kind = options.kind, _a = options.hoist, hoist = _a === void 0 ? false : _a, _b = options.onlyBlock, onlyBlock = _b === void 0 ? false : _b, _c = options.feed, feed = _c === void 0 ? [] : _c;
                  arg = node.argument;
                  if (!hoist) return [3, 4];
                  if (!(onlyBlock || kind === 'var')) return [3, 3];
                  if (!(arg.type === 'Identifier')) return [3, 1];
                  scope[kind](arg.name, onlyBlock ? DEADZONE : kind === 'var' ? NOINIT : undefined);
                  return [3, 3];
              case 1: return [5, __values(pattern$2(arg, scope, { kind: kind, hoist: hoist, onlyBlock: onlyBlock }))];
              case 2:
                  _d.sent();
                  _d.label = 3;
              case 3: return [3, 10];
              case 4:
                  if (!(arg.type === 'Identifier')) return [3, 8];
                  if (!kind) return [3, 5];
                  scope[kind](arg.name, feed);
                  return [3, 7];
              case 5: return [5, __values(Identifier$1(arg, scope, { getVar: true }))];
              case 6:
                  variable = _d.sent();
                  variable.set(feed);
                  _d.label = 7;
              case 7: return [3, 10];
              case 8: return [5, __values(pattern$2(arg, scope, { kind: kind, feed: feed }))];
              case 9:
                  _d.sent();
                  _d.label = 10;
              case 10: return [2];
          }
      });
  }
  function AssignmentPattern$1(node, scope, options) {
      var _a, kind, _b, hoist, _c, onlyBlock, _d, feed, _e, left;
      if (options === void 0) { options = {}; }
      return __generator(this, function (_f) {
          switch (_f.label) {
              case 0:
                  _a = options.kind, kind = _a === void 0 ? 'var' : _a, _b = options.hoist, hoist = _b === void 0 ? false : _b, _c = options.onlyBlock, onlyBlock = _c === void 0 ? false : _c, _d = options.feed;
                  if (!(_d === void 0)) return [3, 2];
                  return [5, __values(evaluate$1(node.right, scope))];
              case 1:
                  _e = _f.sent();
                  return [3, 3];
              case 2:
                  _e = _d;
                  _f.label = 3;
              case 3:
                  feed = _e;
                  left = node.left;
                  if (!hoist) return [3, 7];
                  if (!(onlyBlock || kind === 'var')) return [3, 6];
                  if (!(left.type === 'Identifier')) return [3, 4];
                  scope[kind](left.name, onlyBlock ? DEADZONE : kind === 'var' ? NOINIT : undefined);
                  return [3, 6];
              case 4: return [5, __values(pattern$2(left, scope, { kind: kind, hoist: hoist, onlyBlock: onlyBlock }))];
              case 5:
                  _f.sent();
                  _f.label = 6;
              case 6: return [3, 10];
              case 7:
                  if (!(left.type === 'Identifier')) return [3, 8];
                  scope[kind](left.name, feed);
                  return [3, 10];
              case 8: return [5, __values(pattern$2(left, scope, { kind: kind, feed: feed }))];
              case 9:
                  _f.sent();
                  _f.label = 10;
              case 10: return [2];
          }
      });
  }

  var pattern$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    ObjectPattern: ObjectPattern$1,
    ArrayPattern: ArrayPattern$1,
    RestElement: RestElement$1,
    AssignmentPattern: AssignmentPattern$1
  });

  var evaluateOps$1;
  function evaluate$1(node, scope) {
      var handler;
      return __generator(this, function (_a) {
          switch (_a.label) {
              case 0:
                  if (!node)
                      return [2];
                  if (!evaluateOps$1) {
                      evaluateOps$1 = assign({}, declaration$1, expression$1, identifier$1, statement$1, literal$1, pattern$1);
                  }
                  handler = evaluateOps$1[node.type];
                  if (!handler) return [3, 2];
                  return [5, __values(handler(node, scope))];
              case 1: return [2, _a.sent()];
              case 2: throw new Error(node.type + " isn't implemented");
          }
      });
  }

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
      var _a, invasived, _b, hoisted, subScope, i, result;
      if (options === void 0) { options = {}; }
      return __generator(this, function (_c) {
          switch (_c.label) {
              case 0:
                  _a = options.invasived, invasived = _a === void 0 ? false : _a, _b = options.hoisted, hoisted = _b === void 0 ? false : _b;
                  subScope = invasived ? scope : new Scope(scope);
                  if (!!hoisted) return [3, 2];
                  return [5, __values(hoist(block, subScope, { onlyBlock: true }))];
              case 1:
                  _c.sent();
                  _c.label = 2;
              case 2:
                  i = 0;
                  _c.label = 3;
              case 3:
                  if (!(i < block.body.length)) return [3, 6];
                  return [5, __values(evaluate$1(block.body[i], subScope))];
              case 4:
                  result = _c.sent();
                  if (result === BREAK || result === CONTINUE || result === RETURN) {
                      return [2, result];
                  }
                  _c.label = 5;
              case 5:
                  i++;
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
      var discriminant, matched, i, eachCase, _a, _b, result;
      return __generator(this, function (_c) {
          switch (_c.label) {
              case 0: return [5, __values(evaluate$1(node.discriminant, scope))];
              case 1:
                  discriminant = _c.sent();
                  matched = false;
                  i = 0;
                  _c.label = 2;
              case 2:
                  if (!(i < node.cases.length)) return [3, 8];
                  eachCase = node.cases[i];
                  _a = !matched;
                  if (!_a) return [3, 5];
                  _b = !eachCase.test;
                  if (_b) return [3, 4];
                  return [5, __values(evaluate$1(eachCase.test, scope))];
              case 3:
                  _b = (_c.sent()) === discriminant;
                  _c.label = 4;
              case 4:
                  _a = (_b);
                  _c.label = 5;
              case 5:
                  if (_a) {
                      matched = true;
                  }
                  if (!matched) return [3, 7];
                  return [5, __values(SwitchCase$1(eachCase, scope))];
              case 6:
                  result = _c.sent();
                  if (result === BREAK) {
                      return [3, 8];
                  }
                  if (result === CONTINUE || result === RETURN) {
                      return [2, result];
                  }
                  _c.label = 7;
              case 7:
                  i++;
                  return [3, 2];
              case 8: return [2];
          }
      });
  }
  function SwitchCase$1(node, scope) {
      var i, result;
      return __generator(this, function (_a) {
          switch (_a.label) {
              case 0:
                  i = 0;
                  _a.label = 1;
              case 1:
                  if (!(i < node.consequent.length)) return [3, 4];
                  return [5, __values(evaluate$1(node.consequent[i], scope))];
              case 2:
                  result = _a.sent();
                  if (result === BREAK || result === CONTINUE || result === RETURN) {
                      return [2, result];
                  }
                  _a.label = 3;
              case 3:
                  i++;
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
      var err_1, subScope, param, name_1, result;
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
                  subScope.var(name_1, err_1);
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
              case 10:
                  result = _a.sent();
                  if (result === BREAK || result === CONTINUE || result === RETURN) {
                      return [2, result];
                  }
                  _a.label = 11;
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
      var right, iterator, ret, result, right_1, right_1_1, value, result, e_1_1;
      var e_1, _a;
      return __generator(this, function (_b) {
          switch (_b.label) {
              case 0: return [5, __values(evaluate$1(node.right, scope))];
              case 1:
                  right = _b.sent();
                  if (!node.await) return [3, 8];
                  iterator = getAsyncIterator(right);
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

  function FunctionDeclaration$1(node, scope) {
      return __generator(this, function (_a) {
          scope.func(node.id.name, createFunc(node, scope));
          return [2];
      });
  }
  function VariableDeclaration$1(node, scope, options) {
      var i;
      if (options === void 0) { options = {}; }
      return __generator(this, function (_a) {
          switch (_a.label) {
              case 0:
                  i = 0;
                  _a.label = 1;
              case 1:
                  if (!(i < node.declarations.length)) return [3, 4];
                  return [5, __values(VariableDeclarator$1(node.declarations[i], scope, assign({ kind: node.kind }, options)))];
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
  function VariableDeclarator$1(node, scope, options) {
      var _a, kind, _b, hoist, _c, onlyBlock, feed, hasFeed, value, _d, name_1;
      if (options === void 0) { options = {}; }
      return __generator(this, function (_e) {
          switch (_e.label) {
              case 0:
                  _a = options.kind, kind = _a === void 0 ? 'var' : _a, _b = options.hoist, hoist = _b === void 0 ? false : _b, _c = options.onlyBlock, onlyBlock = _c === void 0 ? false : _c, feed = options.feed;
                  if (!hoist) return [3, 4];
                  if (!(onlyBlock || kind === 'var')) return [3, 3];
                  if (!(node.id.type === 'Identifier')) return [3, 1];
                  scope[kind](node.id.name, onlyBlock ? DEADZONE : kind === 'var' ? NOINIT : undefined);
                  return [3, 3];
              case 1: return [5, __values(pattern$2(node.id, scope, { kind: kind, hoist: hoist, onlyBlock: onlyBlock }))];
              case 2:
                  _e.sent();
                  _e.label = 3;
              case 3: return [3, 10];
              case 4:
                  hasFeed = 'feed' in options;
                  if (!hasFeed) return [3, 5];
                  _d = feed;
                  return [3, 7];
              case 5: return [5, __values(evaluate$1(node.init, scope))];
              case 6:
                  _d = _e.sent();
                  _e.label = 7;
              case 7:
                  value = _d;
                  if (!(node.id.type === 'Identifier')) return [3, 8];
                  name_1 = node.id.name;
                  if (kind === 'var' && !node.init && !hasFeed) {
                      scope.var(name_1, NOINIT);
                  }
                  else {
                      scope[kind](name_1, value);
                  }
                  if (node.init
                      && ['ClassExpression', 'FunctionExpression', 'ArrowFunctionExpression']
                          .indexOf(node.init.type) !== -1
                      && !value.name) {
                      define(value, 'name', {
                          value: name_1,
                          configurable: true
                      });
                  }
                  return [3, 10];
              case 8: return [5, __values(pattern$2(node.id, scope, { kind: kind, feed: value }))];
              case 9:
                  _e.sent();
                  _e.label = 10;
              case 10: return [2];
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
      var klass, superClass, i, def;
      if (options === void 0) { options = {}; }
      return __generator(this, function (_a) {
          switch (_a.label) {
              case 0:
                  klass = options.klass, superClass = options.superClass;
                  i = 0;
                  _a.label = 1;
              case 1:
                  if (!(i < node.body.length)) return [3, 8];
                  def = node.body[i];
                  if (!(def.type === 'MethodDefinition')) return [3, 3];
                  return [5, __values(MethodDefinition$1(def, scope, { klass: klass, superClass: superClass }))];
              case 2:
                  _a.sent();
                  return [3, 7];
              case 3:
                  if (!(def.type === 'PropertyDefinition' && def.static)) return [3, 5];
                  return [5, __values(PropertyDefinition$1(def, scope, { klass: klass, superClass: superClass }))];
              case 4:
                  _a.sent();
                  return [3, 7];
              case 5:
                  if (!(def.type === 'StaticBlock')) return [3, 7];
                  return [5, __values(StaticBlock$1(def, scope, { klass: klass, superClass: superClass }))];
              case 6:
                  _a.sent();
                  _a.label = 7;
              case 7:
                  i++;
                  return [3, 1];
              case 8: return [2];
          }
      });
  }
  function MethodDefinition$1(node, scope, options) {
      var klass, superClass, key, priv, obj, value, oriDptor, oriDptor;
      if (options === void 0) { options = {}; }
      return __generator(this, function (_a) {
          switch (_a.label) {
              case 0:
                  klass = options.klass, superClass = options.superClass;
                  priv = false;
                  if (!node.computed) return [3, 2];
                  return [5, __values(evaluate$1(node.key, scope))];
              case 1:
                  key = _a.sent();
                  return [3, 3];
              case 2:
                  if (node.key.type === 'Identifier') {
                      key = node.key.name;
                  }
                  else if (node.key.type === 'PrivateIdentifier') {
                      key = node.key.name;
                      priv = true;
                  }
                  else {
                      throw new SyntaxError('Unexpected token');
                  }
                  _a.label = 3;
              case 3:
                  obj = node.static ? klass : klass.prototype;
                  if (priv) {
                      if (!obj[PRIVATE]) {
                          define(obj, PRIVATE, { value: {} });
                      }
                      obj = obj[PRIVATE];
                  }
                  value = createFunc(node.value, scope, { superClass: superClass });
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
  function PropertyDefinition$1(node, scope, options) {
      var klass, superClass, key, priv, subScope, obj, _a, _b;
      if (options === void 0) { options = {}; }
      return __generator(this, function (_c) {
          switch (_c.label) {
              case 0:
                  klass = options.klass, superClass = options.superClass;
                  priv = false;
                  if (!node.computed) return [3, 2];
                  return [5, __values(evaluate$1(node.key, scope))];
              case 1:
                  key = _c.sent();
                  return [3, 3];
              case 2:
                  if (node.key.type === 'Identifier') {
                      key = node.key.name;
                  }
                  else if (node.key.type === 'PrivateIdentifier') {
                      key = node.key.name;
                      priv = true;
                  }
                  else {
                      throw new SyntaxError('Unexpected token');
                  }
                  _c.label = 3;
              case 3:
                  subScope = new Scope(scope, true);
                  subScope.const('this', klass);
                  obj = klass;
                  if (priv) {
                      if (!obj[PRIVATE]) {
                          define(obj, PRIVATE, { value: {} });
                      }
                      obj = obj[PRIVATE];
                  }
                  if (!(node.value.type === 'FunctionExpression' || node.value.type === 'ArrowFunctionExpression')) return [3, 4];
                  obj[key] = createFunc(node.value, subScope, { superClass: superClass });
                  return [3, 6];
              case 4:
                  _a = obj;
                  _b = key;
                  return [5, __values(evaluate$1(node.value, subScope))];
              case 5:
                  _a[_b] = _c.sent();
                  _c.label = 6;
              case 6: return [2];
          }
      });
  }
  function StaticBlock$1(node, scope, options) {
      var klass, subScope;
      if (options === void 0) { options = {}; }
      return __generator(this, function (_a) {
          switch (_a.label) {
              case 0:
                  klass = options.klass;
                  subScope = new Scope(scope, true);
                  subScope.const('this', klass);
                  return [5, __values(BlockStatement$1(node, subScope, { invasived: true }))];
              case 1: return [2, _a.sent()];
          }
      });
  }
  function ImportDeclaration$1(node, scope) {
      var globalScope, module, value, result, i, spec, name_2;
      return __generator(this, function (_a) {
          globalScope = scope.global();
          module = globalScope.find(IMPORT + node.source.value);
          if (module) {
              result = module.get();
              if (result) {
                  if (typeof result === 'function') {
                      value = result();
                  }
                  else if (typeof result === 'object') {
                      value = result;
                  }
              }
          }
          if (!value || typeof value !== 'object') {
              throw new TypeError("Failed to resolve module specifier \"" + node.source.value + "\"");
          }
          for (i = 0; i < node.specifiers.length; i++) {
              spec = node.specifiers[i];
              name_2 = void 0;
              if (spec.type === 'ImportSpecifier') {
                  name_2 = spec.imported.type === 'Identifier'
                      ? spec.imported.name : spec.imported.value;
              }
              else if (spec.type === 'ImportDefaultSpecifier') {
                  name_2 = 'default';
              }
              else if (spec.type === 'ImportNamespaceSpecifier') {
                  name_2 = '*';
              }
              if (name_2 !== '*' && !hasOwn(value, name_2)) {
                  throw new SyntaxError("The requested module \"" + node.source.value + "\" does not provide an export named \"" + name_2 + "\"");
              }
              scope.var(spec.local.name, name_2 === '*' ? assign({}, value) : value[name_2]);
          }
          return [2];
      });
  }
  function ExportDefaultDeclaration$1(node, scope) {
      var globalScope, value, variable, exports_1;
      return __generator(this, function (_a) {
          switch (_a.label) {
              case 0:
                  globalScope = scope.global();
                  if (!(node.declaration.type === 'FunctionDeclaration')) return [3, 1];
                  value = createFunc(node.declaration, scope);
                  scope.func(node.declaration.id.name, value);
                  return [3, 5];
              case 1:
                  if (!(node.declaration.type === 'ClassDeclaration')) return [3, 3];
                  return [5, __values(createClass(node.declaration, scope))];
              case 2:
                  value = _a.sent();
                  scope.func(node.declaration.id.name, value);
                  return [3, 5];
              case 3: return [5, __values(evaluate$1(node.declaration, scope))];
              case 4:
                  value = _a.sent();
                  _a.label = 5;
              case 5:
                  variable = globalScope.find(EXPORTS);
                  if (variable) {
                      exports_1 = variable.get();
                      if (exports_1 && typeof exports_1 === 'object') {
                          exports_1.default = value;
                      }
                  }
                  return [2];
          }
      });
  }
  function ExportNamedDeclaration$1(node, scope) {
      var globalScope, value, variable, exports_2, value, variable, exports_3, variable, exports_4, i, name_3, item, variable, exports_5, i, spec, name_4, item;
      return __generator(this, function (_a) {
          switch (_a.label) {
              case 0:
                  globalScope = scope.global();
                  if (!node.declaration) return [3, 6];
                  if (!(node.declaration.type === 'FunctionDeclaration')) return [3, 1];
                  value = createFunc(node.declaration, scope);
                  scope.func(node.declaration.id.name, value);
                  variable = globalScope.find(EXPORTS);
                  if (variable) {
                      exports_2 = variable.get();
                      if (exports_2 && typeof exports_2 === 'object') {
                          exports_2[node.declaration.id.name] = value;
                      }
                  }
                  return [3, 5];
              case 1:
                  if (!(node.declaration.type === 'ClassDeclaration')) return [3, 3];
                  return [5, __values(createClass(node.declaration, scope))];
              case 2:
                  value = _a.sent();
                  scope.func(node.declaration.id.name, value);
                  variable = globalScope.find(EXPORTS);
                  if (variable) {
                      exports_3 = variable.get();
                      if (exports_3 && typeof exports_3 === 'object') {
                          exports_3[node.declaration.id.name] = value;
                      }
                  }
                  return [3, 5];
              case 3:
                  if (!(node.declaration.type === 'VariableDeclaration')) return [3, 5];
                  return [5, __values(VariableDeclaration$1(node.declaration, scope))];
              case 4:
                  _a.sent();
                  variable = globalScope.find(EXPORTS);
                  if (variable) {
                      exports_4 = variable.get();
                      if (exports_4 && typeof exports_4 === 'object') {
                          for (i = 0; i < node.declaration.declarations.length; i++) {
                              name_3 = node.declaration.declarations[i].id.name;
                              item = scope.find(name_3);
                              if (item) {
                                  exports_4[name_3] = item.get();
                              }
                          }
                      }
                  }
                  _a.label = 5;
              case 5: return [3, 7];
              case 6:
                  if (node.specifiers) {
                      variable = globalScope.find(EXPORTS);
                      if (variable) {
                          exports_5 = variable.get();
                          if (exports_5 && typeof exports_5 === 'object') {
                              for (i = 0; i < node.specifiers.length; i++) {
                                  spec = node.specifiers[i];
                                  name_4 = spec.local.type === 'Identifier'
                                      ? spec.local.name : spec.local.value;
                                  item = scope.find(name_4);
                                  if (item) {
                                      exports_5[spec.exported.type === 'Identifier'
                                          ? spec.exported.name : spec.exported.value] = item.get();
                                  }
                              }
                          }
                      }
                  }
                  _a.label = 7;
              case 7: return [2];
          }
      });
  }
  function ExportAllDeclaration$1(node, scope) {
      var globalScope, module, value, result, variable, exports_6;
      return __generator(this, function (_a) {
          globalScope = scope.global();
          module = globalScope.find(IMPORT + node.source.value);
          if (module) {
              result = module.get();
              if (result) {
                  if (typeof result === 'function') {
                      value = result();
                  }
                  else if (typeof result === 'object') {
                      value = result;
                  }
              }
          }
          if (!value || typeof value !== 'object') {
              throw new TypeError("Failed to resolve module specifier \"" + node.source.value + "\"");
          }
          variable = globalScope.find(EXPORTS);
          if (variable) {
              exports_6 = variable.get();
              if (exports_6 && typeof exports_6 === 'object') {
                  assign(exports_6, value);
              }
          }
          return [2];
      });
  }

  function runAsync(iterator, options) {
      if (options === void 0) { options = {}; }
      var res = options.res, err = options.err, ret = options.ret, fullRet = options.fullRet;
      return new Promise(function (resolve, reject) {
          if ('ret' in options) {
              return resolve(iterator.return(ret));
          }
          if ('err' in options) {
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
                  return resolve(fullRet ? ret : ret.value);
              if (ret.value !== AWAIT)
                  return resolve(ret);
              var awaitValue = ret.value.RES;
              var value = awaitValue && awaitValue.then === 'function'
                  ? awaitValue : Promise.resolve(awaitValue);
              return value.then(onFulfilled, onRejected);
          }
      });
  }

  function hoist(block, scope, options) {
      var _a, onlyBlock, funcDclrList, funcDclrIdxs, i, statement, i;
      if (options === void 0) { options = {}; }
      return __generator(this, function (_b) {
          switch (_b.label) {
              case 0:
                  _a = options.onlyBlock, onlyBlock = _a === void 0 ? false : _a;
                  funcDclrList = [];
                  funcDclrIdxs = [];
                  i = 0;
                  _b.label = 1;
              case 1:
                  if (!(i < block.body.length)) return [3, 7];
                  statement = block.body[i];
                  if (!(statement.type === 'FunctionDeclaration')) return [3, 2];
                  funcDclrList.push(statement);
                  funcDclrIdxs.push(i);
                  return [3, 6];
              case 2:
                  if (!(statement.type === 'VariableDeclaration'
                      && ['const', 'let'].indexOf(statement.kind) !== -1)) return [3, 4];
                  return [5, __values(VariableDeclaration$1(statement, scope, { hoist: true, onlyBlock: true }))];
              case 3:
                  _b.sent();
                  return [3, 6];
              case 4:
                  if (!!onlyBlock) return [3, 6];
                  return [5, __values(hoistVarRecursion(statement, scope))];
              case 5:
                  _b.sent();
                  _b.label = 6;
              case 6:
                  i++;
                  return [3, 1];
              case 7:
                  if (funcDclrIdxs.length) {
                      for (i = funcDclrIdxs.length - 1; i > -1; i--) {
                          block.body.splice(funcDclrIdxs[i], 1);
                      }
                      block.body = funcDclrList.concat(block.body);
                  }
                  return [2];
          }
      });
  }
  function hoistVarRecursion(statement, scope) {
      var _a, i, i, j, tryBlock, i, catchBlock, i, finalBlock, i;
      return __generator(this, function (_b) {
          switch (_b.label) {
              case 0:
                  _a = statement.type;
                  switch (_a) {
                      case 'VariableDeclaration': return [3, 1];
                      case 'ForInStatement': return [3, 3];
                      case 'ForOfStatement': return [3, 3];
                      case 'ForStatement': return [3, 5];
                      case 'WhileStatement': return [3, 7];
                      case 'DoWhileStatement': return [3, 7];
                      case 'IfStatement': return [3, 9];
                      case 'BlockStatement': return [3, 13];
                      case 'SwitchStatement': return [3, 18];
                      case 'TryStatement': return [3, 25];
                  }
                  return [3, 38];
              case 1: return [5, __values(VariableDeclaration$1(statement, scope, { hoist: true }))];
              case 2:
                  _b.sent();
                  return [3, 38];
              case 3:
                  if (!(statement.left.type === 'VariableDeclaration')) return [3, 5];
                  return [5, __values(VariableDeclaration$1(statement.left, scope, { hoist: true }))];
              case 4:
                  _b.sent();
                  _b.label = 5;
              case 5:
                  if (!(statement.type === 'ForStatement' && statement.init.type === 'VariableDeclaration')) return [3, 7];
                  return [5, __values(VariableDeclaration$1(statement.init, scope, { hoist: true }))];
              case 6:
                  _b.sent();
                  _b.label = 7;
              case 7: return [5, __values(hoistVarRecursion(statement.body, scope))];
              case 8:
                  _b.sent();
                  return [3, 38];
              case 9: return [5, __values(hoistVarRecursion(statement.consequent, scope))];
              case 10:
                  _b.sent();
                  if (!statement.alternate) return [3, 12];
                  return [5, __values(hoistVarRecursion(statement.alternate, scope))];
              case 11:
                  _b.sent();
                  _b.label = 12;
              case 12: return [3, 38];
              case 13:
                  i = 0;
                  _b.label = 14;
              case 14:
                  if (!(i < statement.body.length)) return [3, 17];
                  return [5, __values(hoistVarRecursion(statement.body[i], scope))];
              case 15:
                  _b.sent();
                  _b.label = 16;
              case 16:
                  i++;
                  return [3, 14];
              case 17: return [3, 38];
              case 18:
                  i = 0;
                  _b.label = 19;
              case 19:
                  if (!(i < statement.cases.length)) return [3, 24];
                  j = 0;
                  _b.label = 20;
              case 20:
                  if (!(j < statement.cases[i].consequent.length)) return [3, 23];
                  return [5, __values(hoistVarRecursion(statement.cases[i].consequent[j], scope))];
              case 21:
                  _b.sent();
                  _b.label = 22;
              case 22:
                  j++;
                  return [3, 20];
              case 23:
                  i++;
                  return [3, 19];
              case 24: return [3, 38];
              case 25:
                  tryBlock = statement.block.body;
                  i = 0;
                  _b.label = 26;
              case 26:
                  if (!(i < tryBlock.length)) return [3, 29];
                  return [5, __values(hoistVarRecursion(tryBlock[i], scope))];
              case 27:
                  _b.sent();
                  _b.label = 28;
              case 28:
                  i++;
                  return [3, 26];
              case 29:
                  catchBlock = statement.handler && statement.handler.body.body;
                  if (!catchBlock) return [3, 33];
                  i = 0;
                  _b.label = 30;
              case 30:
                  if (!(i < catchBlock.length)) return [3, 33];
                  return [5, __values(hoistVarRecursion(catchBlock[i], scope))];
              case 31:
                  _b.sent();
                  _b.label = 32;
              case 32:
                  i++;
                  return [3, 30];
              case 33:
                  finalBlock = statement.finalizer && statement.finalizer.body;
                  if (!finalBlock) return [3, 37];
                  i = 0;
                  _b.label = 34;
              case 34:
                  if (!(i < finalBlock.length)) return [3, 37];
                  return [5, __values(hoistVarRecursion(finalBlock[i], scope))];
              case 35:
                  _b.sent();
                  _b.label = 36;
              case 36:
                  i++;
                  return [3, 34];
              case 37: return [3, 38];
              case 38: return [2];
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
              case 7: return [5, __values(AssignmentPattern$1(node, scope, options))];
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
      var superClass = options.superClass, construct = options.construct;
      var params = node.params;
      var tmpFunc = function _a() {
          var _i, subScope, i, param, result;
          var _newTarget = this && this instanceof _a ? this.constructor : void 0;
          var args = [];
          for (_i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i];
          }
          return __generator(this, function (_a) {
              switch (_a.label) {
                  case 0:
                      subScope = new Scope(scope, true);
                      if (!(node.type !== 'ArrowFunctionExpression')) return [3, 3];
                      subScope.const('this', this);
                      subScope.let('arguments', arguments);
                      subScope.const(NEWTARGET, _newTarget);
                      if (!construct) return [3, 2];
                      return [5, __values(construct(this))];
                  case 1:
                      _a.sent();
                      _a.label = 2;
                  case 2:
                      if (superClass) {
                          subScope.const(SUPER, superClass);
                          if (construct)
                              subScope.let(SUPERCALL, false);
                      }
                      _a.label = 3;
                  case 3:
                      i = 0;
                      _a.label = 4;
                  case 4:
                      if (!(i < params.length)) return [3, 10];
                      param = params[i];
                      if (!(param.type === 'Identifier')) return [3, 5];
                      subScope.var(param.name, args[i]);
                      return [3, 9];
                  case 5:
                      if (!(param.type === 'RestElement')) return [3, 7];
                      return [5, __values(RestElement$1(param, subScope, { kind: 'var', feed: args.slice(i) }))];
                  case 6:
                      _a.sent();
                      return [3, 9];
                  case 7: return [5, __values(pattern$2(param, subScope, { kind: 'var', feed: args[i] }))];
                  case 8:
                      _a.sent();
                      _a.label = 9;
                  case 9:
                      i++;
                      return [3, 4];
                  case 10:
                      if (!(node.body.type === 'BlockStatement')) return [3, 13];
                      return [5, __values(hoist(node.body, subScope))];
                  case 11:
                      _a.sent();
                      return [5, __values(BlockStatement$1(node.body, subScope, {
                              invasived: true,
                              hoisted: true
                          }))];
                  case 12:
                      result = _a.sent();
                      return [3, 15];
                  case 13: return [5, __values(evaluate$1(node.body, subScope))];
                  case 14:
                      result = _a.sent();
                      if (node.type === 'ArrowFunctionExpression') {
                          RETURN.RES = result;
                          result = RETURN;
                      }
                      _a.label = 15;
                  case 15:
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
              var iterator = tmpFunc.apply(this, arguments);
              var last = Promise.resolve();
              var hasCatch = false;
              var run = function (opts) {
                  return last = last
                      .then(function () { return runAsync(iterator, assign({ fullRet: true }, opts)); })
                      .catch(function (err) {
                      if (!hasCatch) {
                          hasCatch = true;
                          return Promise.reject(err);
                      }
                  });
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
          func = function () { return runAsync(tmpFunc.apply(this, arguments)); };
      }
      else {
          func = tmpFunc;
      }
      define(func, NOCTOR, { value: true });
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
      var superClass, methodBody, construct, klass, i, method;
      return __generator(this, function (_a) {
          switch (_a.label) {
              case 0: return [5, __values(evaluate$1(node.superClass, scope))];
              case 1:
                  superClass = _a.sent();
                  methodBody = node.body.body;
                  construct = function (object) {
                      var i, def;
                      return __generator(this, function (_a) {
                          switch (_a.label) {
                              case 0:
                                  i = 0;
                                  _a.label = 1;
                              case 1:
                                  if (!(i < methodBody.length)) return [3, 4];
                                  def = methodBody[i];
                                  if (!(def.type === 'PropertyDefinition' && !def.static)) return [3, 3];
                                  return [5, __values(PropertyDefinition$1(def, scope, { klass: object, superClass: superClass }))];
                              case 2:
                                  _a.sent();
                                  _a.label = 3;
                              case 3:
                                  i++;
                                  return [3, 1];
                              case 4: return [2];
                          }
                      });
                  };
                  klass = function () {
                      return __generator(this, function (_a) {
                          switch (_a.label) {
                              case 0: return [5, __values(construct(this))];
                              case 1:
                                  _a.sent();
                                  if (superClass) {
                                      superClass.apply(this);
                                  }
                                  return [2];
                          }
                      });
                  };
                  for (i = 0; i < methodBody.length; i++) {
                      method = methodBody[i];
                      if (method.type === 'MethodDefinition' && method.kind === 'constructor') {
                          klass = createFunc(method.value, scope, { superClass: superClass, construct: construct });
                          break;
                      }
                  }
                  if (superClass) {
                      inherits(klass, superClass);
                  }
                  return [5, __values(ClassBody$1(node.body, scope, { klass: klass, superClass: superClass }))];
              case 2:
                  _a.sent();
                  define(klass, CLSCTOR, { value: true });
                  define(klass, 'name', {
                      value: node.id && node.id.name || '',
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

  function hoist$1(block, scope, options) {
      if (options === void 0) { options = {}; }
      var _a = options.onlyBlock, onlyBlock = _a === void 0 ? false : _a;
      var funcDclrList = [];
      var funcDclrIdxs = [];
      for (var i = 0; i < block.body.length; i++) {
          var statement = block.body[i];
          if (statement.type === 'FunctionDeclaration') {
              funcDclrList.push(statement);
              funcDclrIdxs.push(i);
          }
          else if (statement.type === 'VariableDeclaration'
              && ['const', 'let'].indexOf(statement.kind) !== -1) {
              VariableDeclaration(statement, scope, { hoist: true, onlyBlock: true });
          }
          else if (!onlyBlock) {
              hoistVarRecursion$1(statement, scope);
          }
      }
      if (funcDclrIdxs.length) {
          for (var i = funcDclrIdxs.length - 1; i > -1; i--) {
              block.body.splice(funcDclrIdxs[i], 1);
          }
          block.body = funcDclrList.concat(block.body);
      }
  }
  function hoistVarRecursion$1(statement, scope) {
      switch (statement.type) {
          case 'VariableDeclaration':
              VariableDeclaration(statement, scope, { hoist: true });
              break;
          case 'ForInStatement':
          case 'ForOfStatement':
              if (statement.left.type === 'VariableDeclaration') {
                  VariableDeclaration(statement.left, scope, { hoist: true });
              }
          case 'ForStatement':
              if (statement.type === 'ForStatement' && statement.init.type === 'VariableDeclaration') {
                  VariableDeclaration(statement.init, scope, { hoist: true });
              }
          case 'WhileStatement':
          case 'DoWhileStatement':
              hoistVarRecursion$1(statement.body, scope);
              break;
          case 'IfStatement':
              hoistVarRecursion$1(statement.consequent, scope);
              if (statement.alternate) {
                  hoistVarRecursion$1(statement.alternate, scope);
              }
              break;
          case 'BlockStatement':
              for (var i = 0; i < statement.body.length; i++) {
                  hoistVarRecursion$1(statement.body[i], scope);
              }
              break;
          case 'SwitchStatement':
              for (var i = 0; i < statement.cases.length; i++) {
                  for (var j = 0; j < statement.cases[i].consequent.length; j++) {
                      hoistVarRecursion$1(statement.cases[i].consequent[j], scope);
                  }
              }
              break;
          case 'TryStatement': {
              var tryBlock = statement.block.body;
              for (var i = 0; i < tryBlock.length; i++) {
                  hoistVarRecursion$1(tryBlock[i], scope);
              }
              var catchBlock = statement.handler && statement.handler.body.body;
              if (catchBlock) {
                  for (var i = 0; i < catchBlock.length; i++) {
                      hoistVarRecursion$1(catchBlock[i], scope);
                  }
              }
              var finalBlock = statement.finalizer && statement.finalizer.body;
              if (finalBlock) {
                  for (var i = 0; i < finalBlock.length; i++) {
                      hoistVarRecursion$1(finalBlock[i], scope);
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
              return AssignmentPattern(node, scope, options);
          default:
              throw new SyntaxError('Unexpected token');
      }
  }
  function createFunc$1(node, scope, options) {
      if (options === void 0) { options = {}; }
      if (node.generator || node.async) {
          return createFunc(node, scope, options);
      }
      var superClass = options.superClass, construct = options.construct;
      var params = node.params;
      var tmpFunc = function _a() {
          var _newTarget = this && this instanceof _a ? this.constructor : void 0;
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i];
          }
          var subScope = new Scope(scope, true);
          if (node.type !== 'ArrowFunctionExpression') {
              subScope.const('this', this);
              subScope.let('arguments', arguments);
              subScope.const(NEWTARGET, _newTarget);
              if (construct) {
                  construct(this);
              }
              if (superClass) {
                  subScope.const(SUPER, superClass);
                  if (construct)
                      subScope.let(SUPERCALL, false);
              }
          }
          for (var i = 0; i < params.length; i++) {
              var param = params[i];
              if (param.type === 'Identifier') {
                  subScope.var(param.name, args[i]);
              }
              else if (param.type === 'RestElement') {
                  RestElement(param, subScope, { kind: 'var', feed: args.slice(i) });
              }
              else {
                  pattern$3(param, subScope, { kind: 'var', feed: args[i] });
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
          define(func, NOCTOR, { value: true });
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
      var methodBody = node.body.body;
      var construct = function (object) {
          for (var i = 0; i < methodBody.length; i++) {
              var def = methodBody[i];
              if (def.type === 'PropertyDefinition' && !def.static) {
                  PropertyDefinition(def, scope, { klass: object, superClass: superClass });
              }
          }
      };
      var klass = function () {
          construct(this);
          if (superClass) {
              superClass.apply(this);
          }
      };
      for (var i = 0; i < methodBody.length; i++) {
          var method = methodBody[i];
          if (method.type === 'MethodDefinition' && method.kind === 'constructor') {
              klass = createFunc$1(method.value, scope, { superClass: superClass, construct: construct });
              break;
          }
      }
      if (superClass) {
          inherits(klass, superClass);
      }
      ClassBody(node.body, scope, { klass: klass, superClass: superClass });
      define(klass, CLSCTOR, { value: true });
      define(klass, 'name', {
          value: node.id && node.id.name || '',
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

  var latestVer = 15;
  var Sval = (function () {
      function Sval(options) {
          if (options === void 0) { options = {}; }
          this.options = { ecmaVersion: 'latest' };
          this.scope = new Scope(null, true);
          this.exports = {};
          var _a = options.ecmaVer, ecmaVer = _a === void 0 ? 'latest' : _a, _b = options.sandBox, sandBox = _b === void 0 ? true : _b, _c = options.sourceType, sourceType = _c === void 0 ? 'script' : _c;
          if (typeof ecmaVer === 'number') {
              ecmaVer -= ecmaVer < 2015 ? 0 : 2009;
          }
          if (ecmaVer !== 'latest' && ecmaVer !== 3 && (ecmaVer < 5 || ecmaVer > latestVer)) {
              throw new Error("unsupported ecmaVer");
          }
          this.options.ecmaVersion = ecmaVer;
          this.options.sourceType = sourceType;
          if (sandBox) {
              var win = createSandBox();
              this.scope.let('globalThis', win);
              this.scope.let('window', win);
              this.scope.let('this', win);
          }
          else {
              this.scope.let('globalThis', globalObj);
              this.scope.let('window', globalObj);
              this.scope.let('this', globalObj);
          }
          this.scope.const(sourceType === 'module' ? EXPORTS : 'exports', this.exports = {});
      }
      Sval.prototype.import = function (nameOrModules, mod) {
          var _a;
          if (typeof nameOrModules === 'string') {
              nameOrModules = (_a = {}, _a[nameOrModules] = mod, _a);
          }
          if (typeof nameOrModules !== 'object')
              return;
          var names = getOwnNames(nameOrModules);
          for (var i = 0; i < names.length; i++) {
              var name_1 = names[i];
              var modName = this.options.sourceType === 'module' ? IMPORT + name_1 : name_1;
              this.scope.var(modName, nameOrModules[name_1]);
          }
      };
      Sval.prototype.parse = function (code, parser) {
          if (typeof parser === 'function') {
              return parser(code, assign({}, this.options));
          }
          return acorn.parse(code, this.options);
      };
      Sval.prototype.run = function (code) {
          var ast = typeof code === 'string' ? acorn.parse(code, this.options) : code;
          hoist$1(ast, this.scope);
          evaluate(ast, this.scope);
      };
      Sval.version = version;
      return Sval;
  }());

  return Sval;

})));
