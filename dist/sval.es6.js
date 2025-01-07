(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('acorn')) :
  typeof define === 'function' && define.amd ? define(['acorn'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Sval = factory(global.acorn));
})(this, (function (acorn) { 'use strict';

  var statement$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get ExpressionStatement () { return ExpressionStatement$1; },
    get BlockStatement () { return BlockStatement$1; },
    get EmptyStatement () { return EmptyStatement$1; },
    get DebuggerStatement () { return DebuggerStatement$1; },
    get ReturnStatement () { return ReturnStatement$1; },
    get BreakStatement () { return BreakStatement$1; },
    get ContinueStatement () { return ContinueStatement$1; },
    get LabeledStatement () { return LabeledStatement$1; },
    get WithStatement () { return WithStatement$1; },
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
  var statement = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get ExpressionStatement () { return ExpressionStatement; },
    get BlockStatement () { return BlockStatement; },
    get EmptyStatement () { return EmptyStatement; },
    get DebuggerStatement () { return DebuggerStatement; },
    get ReturnStatement () { return ReturnStatement; },
    get BreakStatement () { return BreakStatement; },
    get ContinueStatement () { return ContinueStatement; },
    get LabeledStatement () { return LabeledStatement; },
    get WithStatement () { return WithStatement; },
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

  const freeze = Object.freeze;
  const define = Object.defineProperty;
  const getDptor = Object.getOwnPropertyDescriptor;
  const hasOwnProperty = Object.prototype.hasOwnProperty;
  function hasOwn(obj, key) {
      return hasOwnProperty.call(obj, key);
  }
  const getOwnNames = Object.getOwnPropertyNames;
  const setPrototypeOf = Object.setPrototypeOf;
  function setProto(obj, proto) {
      setPrototypeOf ? setPrototypeOf(obj, proto) : obj.__proto__ = proto;
  }
  const getPrototypeOf = Object.getPrototypeOf;
  function getProto(obj) {
      return getPrototypeOf ? getPrototypeOf(obj) : obj.__proto__;
  }
  const getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
  function getGetterOrSetter(method, obj, key) {
      while (obj) {
          const descriptor = getOwnPropertyDescriptor(obj, key);
          const value = typeof descriptor !== 'undefined'
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
  const create = Object.create;
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
      for (let i = 1; i < arguments.length; ++i) {
          const source = arguments[i];
          for (const key in source) {
              if (hasOwn(source, key)) {
                  target[key] = source[key];
              }
          }
      }
      return target;
  }
  const assign = Object.assign || _assign;
  let names = [];
  let globalObj = create(null);
  try {
      if (!window.Object)
          throw 0;
      names = getOwnNames(globalObj = window).filter(n => n !== 'webkitStorageInfo');
  }
  catch (err) {
      try {
          if (!global.Object)
              throw 0;
          names = getOwnNames(globalObj = global).filter(n => n !== 'GLOBAL' && n !== 'root');
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
          try {
              globalObj.URL = URL;
          }
          catch (err) { }
          names = getOwnNames(globalObj);
      }
  }
  if (globalObj.Symbol) {
      !globalObj.Symbol.iterator && (globalObj.Symbol.iterator = createSymbol('iterator'));
      !globalObj.Symbol.asyncIterator && (globalObj.Symbol.asyncIterator = createSymbol('asynciterator'));
  }
  const win = create({});
  for (let i = 0; i < names.length; i++) {
      const name = names[i];
      try {
          win[name] = globalObj[name];
      }
      catch (err) { }
  }
  const WINDOW = createSymbol('window');
  function createSandBox() {
      return assign(create({ [WINDOW]: globalObj }), win);
  }
  function createSymbol(key) {
      return key + Math.random().toString(36).substring(2);
  }
  function getAsyncIterator(obj) {
      let iterator;
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
          let i = 0;
          return {
              next() {
                  if (obj && i >= obj.length)
                      obj = undefined;
                  return { value: obj && obj[i++], done: !obj };
              }
          };
      }
  }

  const AWAIT = { RES: undefined };
  const RETURN = { RES: undefined };
  const CONTINUE = { LABEL: undefined };
  const BREAK = { LABEL: undefined };
  const SUPER = createSymbol('super');
  const SUPERCALL = createSymbol('supercall');
  const NOCTOR = createSymbol('noctor');
  const CLSCTOR = createSymbol('clsctor');
  const NEWTARGET = createSymbol('newtarget');
  const PRIVATE = createSymbol('private');
  const NOINIT = createSymbol('noinit');
  const DEADZONE = createSymbol('deadzone');
  const IMPORT = createSymbol('import');
  const EXPORTS = createSymbol('exports');

  var version = "0.5.5";

  class Var {
      constructor(kind, value) {
          this.kind = kind;
          this.value = value;
      }
      get() {
          return this.value;
      }
      set(value) {
          if (this.kind === 'const') {
              throw new TypeError('Assignment to constant variable');
          }
          else {
              return this.value = value;
          }
      }
  }
  class Prop {
      constructor(object, property) {
          this.object = object;
          this.property = property;
      }
      get() {
          return this.object[this.property];
      }
      set(value) {
          this.object[this.property] = value;
          return true;
      }
      del() {
          return delete this.object[this.property];
      }
  }

  class Scope {
      constructor(parent = null, isolated = false) {
          this.context = create(null);
          this.withContext = create(null);
          this.parent = parent;
          this.isolated = isolated;
      }
      global() {
          let scope = this;
          while (scope.parent) {
              scope = scope.parent;
          }
          return scope;
      }
      find(name) {
          if (this.context[name]) {
              return this.context[name];
          }
          else if (name in this.withContext) {
              return new Prop(this.withContext, name);
          }
          else if (this.parent) {
              return this.parent.find(name);
          }
          else {
              const win = this.global().find('window').get();
              if (name in win) {
                  return new Prop(win, name);
              }
              else {
                  return null;
              }
          }
      }
      var(name, value) {
          let scope = this;
          while (scope.parent && !scope.isolated) {
              scope = scope.parent;
          }
          const variable = scope.context[name];
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
                  throw new SyntaxError(`Identifier '${name}' has already been declared`);
              }
          }
          if (!scope.parent) {
              const win = scope.find('window').get();
              if (value !== NOINIT) {
                  define(win, name, { value, writable: true, enumerable: true });
              }
          }
      }
      let(name, value) {
          const variable = this.context[name];
          if (!variable || variable.get() === DEADZONE) {
              this.context[name] = new Var('let', value);
          }
          else {
              throw new SyntaxError(`Identifier '${name}' has already been declared`);
          }
      }
      const(name, value) {
          const variable = this.context[name];
          if (!variable || variable.get() === DEADZONE) {
              this.context[name] = new Var('const', value);
          }
          else {
              throw new SyntaxError(`Identifier '${name}' has already been declared`);
          }
      }
      func(name, value) {
          const variable = this.context[name];
          if (!variable || variable.kind === 'var') {
              this.context[name] = new Var('var', value);
          }
          else {
              throw new SyntaxError(`Identifier '${name}' has already been declared`);
          }
      }
      with(value) {
          if (Object.keys(value)) {
              this.withContext = value;
          }
      }
  }

  function Identifier$1(node, scope, options = {}) {
      const { getVar = false, throwErr = true } = options;
      if (node.name === 'undefined') {
          return undefined;
      }
      const variable = scope.find(node.name);
      if (variable) {
          if (getVar) {
              return variable;
          }
          else {
              const value = variable.get();
              if (value === DEADZONE) {
                  throw new ReferenceError(`${node.name} is not defined`);
              }
              else {
                  return value;
              }
          }
      }
      else if (throwErr) {
          throw new ReferenceError(`${node.name} is not defined`);
      }
      else {
          return undefined;
      }
  }

  var identifier$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Identifier: Identifier$1
  });

  function Literal$1(node, scope) {
      return node.value;
  }

  var literal$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Literal: Literal$1
  });

  function ThisExpression$1(node, scope) {
      const superCall = scope.find(SUPERCALL);
      if (superCall && !superCall.get()) {
          throw new ReferenceError('Must call super constructor in derived class '
              + 'before accessing \'this\' or returning from derived constructor');
      }
      else {
          return scope.find('this').get();
      }
  }
  function ArrayExpression$1(node, scope) {
      let results = [];
      for (let i = 0; i < node.elements.length; i++) {
          const item = node.elements[i];
          if (item.type === 'SpreadElement') {
              results = results.concat(SpreadElement$1(item, scope));
          }
          else {
              results.push(evaluate$1(item, scope));
          }
      }
      return results;
  }
  function ObjectExpression$1(node, scope) {
      const object = {};
      for (let i = 0; i < node.properties.length; i++) {
          const property = node.properties[i];
          if (property.type === 'SpreadElement') {
              assign(object, SpreadElement$1(property, scope));
          }
          else {
              let key;
              const propKey = property.key;
              if (property.computed) {
                  key = evaluate$1(propKey, scope);
              }
              else {
                  if (propKey.type === 'Identifier') {
                      key = propKey.name;
                  }
                  else {
                      key = '' + (Literal$1(propKey));
                  }
              }
              const value = evaluate$1(property.value, scope);
              const propKind = property.kind;
              if (propKind === 'init') {
                  object[key] = value;
              }
              else if (propKind === 'get') {
                  const oriDptor = getDptor(object, key);
                  define(object, key, {
                      get: value,
                      set: oriDptor && oriDptor.set,
                      enumerable: true,
                      configurable: true
                  });
              }
              else {
                  const oriDptor = getDptor(object, key);
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
  function FunctionExpression$1(node, scope) {
      if (node.id && node.id.name) {
          const tmpScope = new Scope(scope);
          const func = createFunc(node, tmpScope);
          tmpScope.const(node.id.name, func);
          return func;
      }
      else {
          return createFunc(node, scope);
      }
  }
  function UnaryExpression$1(node, scope) {
      const arg = node.argument;
      switch (node.operator) {
          case '+': return +(evaluate$1(arg, scope));
          case '-': return -(evaluate$1(arg, scope));
          case '!': return !(evaluate$1(arg, scope));
          case '~': return ~(evaluate$1(arg, scope));
          case 'void': return void (evaluate$1(arg, scope));
          case 'typeof':
              if (arg.type === 'Identifier') {
                  return typeof (Identifier$1(arg, scope, { throwErr: false }));
              }
              else {
                  return typeof (evaluate$1(arg, scope));
              }
          case 'delete':
              if (arg.type === 'MemberExpression') {
                  const variable = MemberExpression$1(arg, scope, { getVar: true });
                  return variable.del();
              }
              else if (arg.type === 'Identifier') {
                  throw new SyntaxError('Delete of an unqualified identifier in strict mode');
              }
              else {
                  evaluate$1(arg, scope);
                  return true;
              }
          default: throw new SyntaxError(`Unexpected token ${node.operator}`);
      }
  }
  function UpdateExpression$1(node, scope) {
      const arg = node.argument;
      let variable;
      if (arg.type === 'Identifier') {
          variable = Identifier$1(arg, scope, { getVar: true });
      }
      else if (arg.type === 'MemberExpression') {
          variable = MemberExpression$1(arg, scope, { getVar: true });
      }
      else {
          throw new SyntaxError('Unexpected token');
      }
      const value = variable.get();
      if (node.operator === '++') {
          variable.set(value + 1);
          return node.prefix ? variable.get() : value;
      }
      else if (node.operator === '--') {
          variable.set(value - 1);
          return node.prefix ? variable.get() : value;
      }
      else {
          throw new SyntaxError(`Unexpected token ${node.operator}`);
      }
  }
  function BinaryExpression$1(node, scope) {
      let left;
      let right;
      if (node.left.type === 'PrivateIdentifier') {
          left = node.left.name;
          right = evaluate$1(node.right, scope);
          right = right[PRIVATE];
      }
      else {
          left = evaluate$1(node.left, scope);
          right = evaluate$1(node.right, scope);
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
          default: throw new SyntaxError(`Unexpected token ${node.operator}`);
      }
  }
  function AssignmentExpression$1(node, scope) {
      var _a;
      const left = node.left;
      let variable;
      if (left.type === 'Identifier') {
          variable = Identifier$1(left, scope, { getVar: true, throwErr: false });
          if (!variable) {
              const win = scope.global().find('window').get();
              variable = new Prop(win, left.name);
          }
      }
      else if (left.type === 'MemberExpression') {
          variable = MemberExpression$1(left, scope, { getVar: true });
      }
      else {
          const value = evaluate$1(node.right, scope);
          return pattern(left, scope, { feed: value });
      }
      const value = evaluate$1(node.right, scope);
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
          default: throw new SyntaxError(`Unexpected token ${node.operator}`);
      }
  }
  function LogicalExpression$1(node, scope) {
      var _a;
      switch (node.operator) {
          case '||':
              return (evaluate$1(node.left, scope)) || (evaluate$1(node.right, scope));
          case '&&':
              return (evaluate$1(node.left, scope)) && (evaluate$1(node.right, scope));
          case '??':
              return (_a = (evaluate$1(node.left, scope))) !== null && _a !== void 0 ? _a : (evaluate$1(node.right, scope));
          default:
              throw new SyntaxError(`Unexpected token ${node.operator}`);
      }
  }
  function MemberExpression$1(node, scope, options = {}) {
      const { getObj = false, getVar = false } = options;
      let object;
      if (node.object.type === 'Super') {
          object = Super$1(node.object, scope, { getProto: true });
      }
      else {
          object = evaluate$1(node.object, scope);
      }
      if (getObj)
          return object;
      let key;
      let priv = false;
      if (node.computed) {
          key = evaluate$1(node.property, scope);
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
          const setter = getSetter(object, key);
          if (node.object.type === 'Super' && setter) {
              const thisObject = scope.find('this').get();
              const privateKey = createSymbol(key);
              define(thisObject, privateKey, { set: setter });
              return new Prop(thisObject, privateKey);
          }
          else {
              return new Prop(object, key);
          }
      }
      else {
          const getter = getGetter(object, key);
          if (node.object.type === 'Super' && getter) {
              const thisObject = scope.find('this').get();
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
  function ConditionalExpression$1(node, scope) {
      return (evaluate$1(node.test, scope))
          ? (evaluate$1(node.consequent, scope))
          : (evaluate$1(node.alternate, scope));
  }
  function CallExpression$1(node, scope) {
      let func;
      let object;
      if (node.callee.type === 'MemberExpression') {
          object = MemberExpression$1(node.callee, scope, { getObj: true });
          if (node.callee.optional && object == null) {
              return undefined;
          }
          let key;
          let priv = false;
          if (node.callee.computed) {
              key = evaluate$1(node.callee.property, scope);
          }
          else if (node.callee.property.type === 'PrivateIdentifier') {
              key = node.callee.property.name;
              priv = true;
          }
          else {
              key = node.callee.property.name;
          }
          let obj = object;
          if (priv) {
              obj = obj[PRIVATE];
          }
          if (node.callee.object.type === 'Super') {
              const thisObject = scope.find('this').get();
              func = obj[key].bind(thisObject);
          }
          else {
              func = obj[key];
          }
          if (node.optional && func == null) {
              return undefined;
          }
          if (typeof func !== 'function') {
              throw new TypeError(`${key} is not a function`);
          }
          else if (func[CLSCTOR]) {
              throw new TypeError(`Class constructor ${key} cannot be invoked without 'new'`);
          }
      }
      else {
          object = scope.find('this').get();
          func = evaluate$1(node.callee, scope);
          if (node.optional && func == null) {
              return undefined;
          }
          if (typeof func !== 'function' || node.callee.type !== 'Super' && func[CLSCTOR]) {
              let name;
              if (node.callee.type === 'Identifier') {
                  name = node.callee.name;
              }
              else {
                  try {
                      name = JSON.stringify(func);
                  }
                  catch (err) {
                      name = '' + func;
                  }
              }
              if (typeof func !== 'function') {
                  throw new TypeError(`${name} is not a function`);
              }
              else {
                  throw new TypeError(`Class constructor ${name} cannot be invoked without 'new'`);
              }
          }
      }
      let args = [];
      for (let i = 0; i < node.arguments.length; i++) {
          const arg = node.arguments[i];
          if (arg.type === 'SpreadElement') {
              args = args.concat(SpreadElement$1(arg, scope));
          }
          else {
              args.push(evaluate$1(arg, scope));
          }
      }
      if (node.callee.type === 'Super') {
          const superCall = scope.find(SUPERCALL);
          if (superCall.get()) {
              throw new ReferenceError('Super constructor may only be called once');
          }
          else {
              scope.find(SUPERCALL).set(true);
          }
      }
      try {
          return func.apply(object, args);
      }
      catch (err) {
          if (err instanceof TypeError && err.message === 'Illegal invocation'
              && func.toString().indexOf('[native code]') !== -1) {
              const win = scope.global().find('window').get();
              if (win && win[WINDOW]) {
                  return func.apply(win[WINDOW], args);
              }
          }
          throw err;
      }
  }
  function NewExpression$1(node, scope) {
      const constructor = evaluate$1(node.callee, scope);
      if (typeof constructor !== 'function') {
          let name;
          if (node.callee.type === 'Identifier') {
              name = node.callee.name;
          }
          else {
              try {
                  name = JSON.stringify(constructor);
              }
              catch (err) {
                  name = '' + constructor;
              }
          }
          throw new TypeError(`${name} is not a constructor`);
      }
      else if (constructor[NOCTOR]) {
          throw new TypeError(`${constructor.name || '(intermediate value)'} is not a constructor`);
      }
      let args = [];
      for (let i = 0; i < node.arguments.length; i++) {
          const arg = node.arguments[i];
          if (arg.type === 'SpreadElement') {
              args = args.concat(SpreadElement$1(arg, scope));
          }
          else {
              args.push(evaluate$1(arg, scope));
          }
      }
      return new constructor(...args);
  }
  function MetaProperty$1(node, scope) {
      if (node.meta.name === 'new' && node.property.name === 'target') {
          return scope.find(NEWTARGET).get();
      }
      else if (node.meta.name === 'import' && node.property.name === 'meta') {
          return { url: '' };
      }
  }
  function SequenceExpression$1(node, scope) {
      let result;
      for (let i = 0; i < node.expressions.length; i++) {
          result = evaluate$1(node.expressions[i], scope);
      }
      return result;
  }
  function ArrowFunctionExpression$1(node, scope) {
      return createFunc(node, scope);
  }
  function TemplateLiteral$1(node, scope) {
      const quasis = node.quasis.slice();
      const expressions = node.expressions.slice();
      let result = '';
      let temEl;
      let expr;
      while (temEl = quasis.shift()) {
          result += TemplateElement$1(temEl);
          expr = expressions.shift();
          if (expr) {
              result += evaluate$1(expr, scope);
          }
      }
      return result;
  }
  function TaggedTemplateExpression$1(node, scope) {
      const tagFunc = evaluate$1(node.tag, scope);
      const quasis = node.quasi.quasis;
      const str = quasis.map(v => v.value.cooked);
      const raw = quasis.map(v => v.value.raw);
      define(str, 'raw', {
          value: freeze(raw)
      });
      const expressions = node.quasi.expressions;
      const args = [];
      if (expressions) {
          for (let i = 0; i < expressions.length; i++) {
              args.push(evaluate$1(expressions[i], scope));
          }
      }
      return tagFunc(freeze(str), ...args);
  }
  function TemplateElement$1(node, scope) {
      return node.value.raw;
  }
  function ClassExpression$1(node, scope) {
      if (node.id && node.id.name) {
          const tmpScope = new Scope(scope);
          const klass = createClass(node, tmpScope);
          tmpScope.const(node.id.name, klass);
          return klass;
      }
      else {
          return createClass(node, scope);
      }
  }
  function Super$1(node, scope, options = {}) {
      const { getProto = false } = options;
      const superClass = scope.find(SUPER).get();
      return getProto ? superClass.prototype : superClass;
  }
  function SpreadElement$1(node, scope) {
      const result = evaluate$1(node.argument, scope);
      return typeof result === 'string' ? [...result] : result;
  }
  function ChainExpression$1(node, scope) {
      return evaluate$1(node.expression, scope);
  }
  function ImportExpression$1(node, scope) {
      const globalScope = scope.global();
      const source = evaluate$1(node.source, scope);
      const module = globalScope.find(IMPORT + source);
      let value;
      if (module) {
          const result = module.get();
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
          return Promise.reject(new TypeError(`Failed to resolve module specifier "${source}"`));
      }
      return Promise.resolve(value);
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
    ImportExpression: ImportExpression$1
  });

  function ObjectPattern$1(node, scope, options = {}) {
      const { kind = 'var', hoist = false, onlyBlock = false, feed = {} } = options;
      const fedKeys = [];
      for (let i = 0; i < node.properties.length; i++) {
          const property = node.properties[i];
          if (hoist) {
              if (onlyBlock || kind === 'var') {
                  if (property.type === 'Property') {
                      const value = property.value;
                      if (value.type === 'Identifier') {
                          scope[kind](value.name, onlyBlock ? DEADZONE : kind === 'var' ? NOINIT : undefined);
                      }
                      else {
                          pattern(value, scope, { kind, hoist, onlyBlock });
                      }
                  }
                  else {
                      RestElement$1(property, scope, { kind, hoist, onlyBlock });
                  }
              }
          }
          else if (property.type === 'Property') {
              let key;
              if (property.computed) {
                  key = evaluate$1(property.key, scope);
              }
              else {
                  key = property.key.name;
              }
              fedKeys.push(key);
              const value = property.value;
              if (value.type === 'Identifier') {
                  scope[kind](value.name, feed[key]);
              }
              else {
                  pattern(value, scope, { kind, feed: feed[key] });
              }
          }
          else {
              const rest = assign({}, feed);
              for (let i = 0; i < fedKeys.length; i++)
                  delete rest[fedKeys[i]];
              RestElement$1(property, scope, { kind, feed: rest });
          }
      }
  }
  function ArrayPattern$1(node, scope, options = {}) {
      const { kind, hoist = false, onlyBlock = false, feed = [] } = options;
      const result = [];
      for (let i = 0; i < node.elements.length; i++) {
          const element = node.elements[i];
          if (!element)
              continue;
          if (hoist) {
              if (onlyBlock || kind === 'var') {
                  if (element.type === 'Identifier') {
                      scope[kind](element.name, onlyBlock ? DEADZONE : kind === 'var' ? NOINIT : undefined);
                  }
                  else {
                      pattern(element, scope, { kind, hoist, onlyBlock });
                  }
              }
          }
          else if (element.type === 'Identifier') {
              if (kind) {
                  scope[kind](element.name, feed[i]);
              }
              else {
                  const variable = Identifier$1(element, scope, { getVar: true });
                  variable.set(feed[i]);
                  result.push(variable.get());
              }
          }
          else if (element.type === 'RestElement') {
              RestElement$1(element, scope, { kind, feed: feed.slice(i) });
          }
          else {
              pattern(element, scope, { kind, feed: feed[i] });
          }
      }
      if (result.length) {
          return result;
      }
  }
  function RestElement$1(node, scope, options = {}) {
      const { kind, hoist = false, onlyBlock = false, feed = [] } = options;
      const arg = node.argument;
      if (hoist) {
          if (onlyBlock || kind === 'var') {
              if (arg.type === 'Identifier') {
                  scope[kind](arg.name, onlyBlock ? DEADZONE : kind === 'var' ? NOINIT : undefined);
              }
              else {
                  pattern(arg, scope, { kind, hoist, onlyBlock });
              }
          }
      }
      else if (arg.type === 'Identifier') {
          if (kind) {
              scope[kind](arg.name, feed);
          }
          else {
              const variable = Identifier$1(arg, scope, { getVar: true });
              variable.set(feed);
          }
      }
      else {
          pattern(arg, scope, { kind, feed });
      }
  }
  function AssignmentPattern$1(node, scope, options = {}) {
      const { kind = 'var', hoist = false, onlyBlock = false, feed = evaluate$1(node.right, scope) } = options;
      const left = node.left;
      if (hoist) {
          if (onlyBlock || kind === 'var') {
              if (left.type === 'Identifier') {
                  scope[kind](left.name, onlyBlock ? DEADZONE : kind === 'var' ? NOINIT : undefined);
              }
              else {
                  pattern(left, scope, { kind, hoist, onlyBlock });
              }
          }
      }
      else if (left.type === 'Identifier') {
          scope[kind](left.name, feed);
      }
      else {
          pattern(left, scope, { kind, feed });
      }
  }

  var pattern$3 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    ObjectPattern: ObjectPattern$1,
    ArrayPattern: ArrayPattern$1,
    RestElement: RestElement$1,
    AssignmentPattern: AssignmentPattern$1
  });

  function Program(program, scope) {
      for (let i = 0; i < program.body.length; i++) {
          evaluate$1(program.body[i], scope);
      }
  }

  var program = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Program: Program
  });

  let evaluateOps$1;
  function evaluate$1(node, scope) {
      if (!node)
          return;
      if (!evaluateOps$1) {
          evaluateOps$1 = assign({}, declaration$1, expression$1, identifier$1, statement$1, literal$1, pattern$3, program);
      }
      const handler = evaluateOps$1[node.type];
      if (handler) {
          return handler(node, scope);
      }
      else {
          throw new Error(`${node.type} isn't implemented`);
      }
  }

  function ExpressionStatement$1(node, scope) {
      evaluate$1(node.expression, scope);
  }
  function BlockStatement$1(block, scope, options = {}) {
      const { invasived = false, hoisted = false, } = options;
      const subScope = invasived ? scope : new Scope(scope);
      if (!hoisted) {
          hoist(block, subScope, { onlyBlock: true });
      }
      for (let i = 0; i < block.body.length; i++) {
          const result = evaluate$1(block.body[i], subScope);
          if (result === BREAK) {
              if (result.LABEL && result.LABEL === options.label) {
                  break;
              }
              return result;
          }
          if (result === CONTINUE || result === RETURN) {
              return result;
          }
      }
  }
  function EmptyStatement$1() {
  }
  function DebuggerStatement$1() {
      debugger;
  }
  function ReturnStatement$1(node, scope) {
      RETURN.RES = node.argument ? (evaluate$1(node.argument, scope)) : undefined;
      return RETURN;
  }
  function BreakStatement$1(node) {
      var _a;
      BREAK.LABEL = (_a = node.label) === null || _a === void 0 ? void 0 : _a.name;
      return BREAK;
  }
  function ContinueStatement$1(node) {
      var _a;
      CONTINUE.LABEL = (_a = node.label) === null || _a === void 0 ? void 0 : _a.name;
      return CONTINUE;
  }
  function LabeledStatement$1(node, scope) {
      const label = node.label.name;
      if (node.body.type === 'WhileStatement') {
          return WhileStatement$1(node.body, scope, { label });
      }
      if (node.body.type === 'DoWhileStatement') {
          return DoWhileStatement$1(node.body, scope, { label });
      }
      if (node.body.type === 'ForStatement') {
          return ForStatement$1(node.body, scope, { label });
      }
      if (node.body.type === 'ForInStatement') {
          return ForInStatement$1(node.body, scope, { label });
      }
      if (node.body.type === 'ForOfStatement') {
          return ForOfStatement$1(node.body, scope, { label });
      }
      if (node.body.type === 'BlockStatement') {
          return BlockStatement$1(node.body, scope, { label });
      }
      if (node.body.type === 'WithStatement') {
          return WithStatement$1(node.body, scope, { label });
      }
      if (node.body.type === 'IfStatement') {
          return IfStatement$1(node.body, scope, { label });
      }
      if (node.body.type === 'SwitchStatement') {
          return SwitchStatement$1(node.body, scope, { label });
      }
      if (node.body.type === 'TryStatement') {
          return TryStatement$1(node.body, scope, { label });
      }
      throw new SyntaxError(`${node.body.type} cannot be labeled`);
  }
  function WithStatement$1(node, scope, options = {}) {
      const withScope = new Scope(scope);
      withScope.with(evaluate$1(node.object, scope));
      const result = evaluate$1(node.body, withScope);
      if (result === BREAK) {
          if (result.LABEL && result.LABEL === options.label) {
              return;
          }
          return result;
      }
      if (result === CONTINUE || result === RETURN) {
          return result;
      }
  }
  function IfStatement$1(node, scope, options = {}) {
      let result;
      if (evaluate$1(node.test, scope)) {
          result = evaluate$1(node.consequent, scope);
      }
      else {
          result = evaluate$1(node.alternate, scope);
      }
      if (result === BREAK) {
          if (result.LABEL && result.LABEL === options.label) {
              return;
          }
          return result;
      }
      if (result === CONTINUE || result === RETURN) {
          return result;
      }
  }
  function SwitchStatement$1(node, scope, options = {}) {
      const discriminant = evaluate$1(node.discriminant, scope);
      let matched = false;
      for (let i = 0; i < node.cases.length; i++) {
          const eachCase = node.cases[i];
          if (!matched
              && (!eachCase.test
                  || (evaluate$1(eachCase.test, scope)) === discriminant)) {
              matched = true;
          }
          if (matched) {
              const result = SwitchCase$1(eachCase, scope);
              if (result === BREAK) {
                  if (result.LABEL === options.label) {
                      break;
                  }
                  return result;
              }
              if (result === CONTINUE || result === RETURN) {
                  return result;
              }
          }
      }
  }
  function SwitchCase$1(node, scope) {
      for (let i = 0; i < node.consequent.length; i++) {
          const result = evaluate$1(node.consequent[i], scope);
          if (result === BREAK || result === CONTINUE || result === RETURN) {
              return result;
          }
      }
  }
  function ThrowStatement$1(node, scope) {
      throw evaluate$1(node.argument, scope);
  }
  function TryStatement$1(node, scope, options = {}) {
      let result;
      try {
          result = BlockStatement$1(node.block, scope);
      }
      catch (err) {
          if (node.handler) {
              const subScope = new Scope(scope);
              const param = node.handler.param;
              if (param) {
                  if (param.type === 'Identifier') {
                      const name = param.name;
                      subScope.var(name, err);
                  }
                  else {
                      pattern(param, scope, { feed: err });
                  }
              }
              result = CatchClause$1(node.handler, subScope);
          }
          else {
              throw err;
          }
      }
      finally {
          if (node.finalizer) {
              result = BlockStatement$1(node.finalizer, scope);
          }
      }
      if (result === BREAK) {
          if (result.LABEL && result.LABEL === options.label) {
              return;
          }
          return result;
      }
      if (result === CONTINUE || result === RETURN) {
          return result;
      }
  }
  function CatchClause$1(node, scope) {
      return BlockStatement$1(node.body, scope, { invasived: true });
  }
  function WhileStatement$1(node, scope, options = {}) {
      while (evaluate$1(node.test, scope)) {
          const result = evaluate$1(node.body, scope);
          if (result === BREAK) {
              if (result.LABEL === options.label) {
                  break;
              }
              return result;
          }
          else if (result === CONTINUE) {
              if (result.LABEL === options.label) {
                  continue;
              }
              return result;
          }
          else if (result === RETURN) {
              return result;
          }
      }
  }
  function DoWhileStatement$1(node, scope, options = {}) {
      do {
          const result = evaluate$1(node.body, scope);
          if (result === BREAK) {
              if (result.LABEL === options.label) {
                  break;
              }
              return result;
          }
          else if (result === CONTINUE) {
              if (result.LABEL === options.label) {
                  continue;
              }
              return result;
          }
          else if (result === RETURN) {
              return result;
          }
      } while (evaluate$1(node.test, scope));
  }
  function ForStatement$1(node, scope, options = {}) {
      const forScope = new Scope(scope);
      for (evaluate$1(node.init, forScope); node.test ? (evaluate$1(node.test, forScope)) : true; evaluate$1(node.update, forScope)) {
          const subScope = new Scope(forScope);
          let result;
          if (node.body.type === 'BlockStatement') {
              result = BlockStatement$1(node.body, subScope, { invasived: true });
          }
          else {
              result = evaluate$1(node.body, subScope);
          }
          if (result === BREAK) {
              if (result.LABEL === options.label) {
                  break;
              }
              return result;
          }
          else if (result === CONTINUE) {
              if (result.LABEL === options.label) {
                  continue;
              }
              return result;
          }
          else if (result === RETURN) {
              return result;
          }
      }
  }
  function ForInStatement$1(node, scope, options = {}) {
      for (const value in evaluate$1(node.right, scope)) {
          const result = ForXHandler(node, scope, { value });
          if (result === BREAK) {
              if (result.LABEL === options.label) {
                  break;
              }
              return result;
          }
          else if (result === CONTINUE) {
              if (result.LABEL === options.label) {
                  continue;
              }
              return result;
          }
          else if (result === RETURN) {
              return result;
          }
      }
  }
  function ForOfStatement$1(node, scope, options = {}) {
      const right = evaluate$1(node.right, scope);
      for (const value of right) {
          const result = ForXHandler(node, scope, { value });
          if (result === BREAK) {
              if (result.LABEL === options.label) {
                  break;
              }
              return result;
          }
          else if (result === CONTINUE) {
              if (result.LABEL === options.label) {
                  continue;
              }
              return result;
          }
          else if (result === RETURN) {
              return result;
          }
      }
  }

  function FunctionDeclaration$1(node, scope) {
      scope.func(node.id.name, createFunc(node, scope));
  }
  function VariableDeclaration$1(node, scope, options = {}) {
      for (let i = 0; i < node.declarations.length; i++) {
          VariableDeclarator$1(node.declarations[i], scope, assign({ kind: node.kind }, options));
      }
  }
  function VariableDeclarator$1(node, scope, options = {}) {
      const { kind = 'var', hoist = false, onlyBlock = false, feed } = options;
      if (hoist) {
          if (onlyBlock || kind === 'var') {
              if (node.id.type === 'Identifier') {
                  scope[kind](node.id.name, onlyBlock ? DEADZONE : kind === 'var' ? NOINIT : undefined);
              }
              else {
                  pattern(node.id, scope, { kind, hoist, onlyBlock });
              }
          }
      }
      else {
          const hasFeed = 'feed' in options;
          const value = hasFeed ? feed : evaluate$1(node.init, scope);
          if (node.id.type === 'Identifier') {
              const name = node.id.name;
              if (kind === 'var' && !node.init && !hasFeed) {
                  scope.var(name, NOINIT);
              }
              else {
                  scope[kind](name, value);
              }
              if (node.init
                  && ['ClassExpression', 'FunctionExpression', 'ArrowFunctionExpression']
                      .indexOf(node.init.type) !== -1
                  && !value.name) {
                  define(value, 'name', {
                      value: name,
                      configurable: true
                  });
              }
          }
          else {
              pattern(node.id, scope, { kind, feed: value });
          }
      }
  }
  function ClassDeclaration$1(node, scope) {
      scope.func(node.id.name, createClass(node, scope));
  }
  function ClassBody$1(node, scope, options = {}) {
      const { klass, superClass } = options;
      for (let i = 0; i < node.body.length; i++) {
          const def = node.body[i];
          if (def.type === 'MethodDefinition') {
              MethodDefinition$1(def, scope, { klass, superClass });
          }
          else if (def.type === 'PropertyDefinition' && def.static) {
              PropertyDefinition$1(def, scope, { klass, superClass });
          }
          else if (def.type === 'StaticBlock') {
              StaticBlock$1(def, scope, { klass, superClass });
          }
      }
  }
  function MethodDefinition$1(node, scope, options = {}) {
      const { klass, superClass } = options;
      let key;
      let priv = false;
      if (node.computed) {
          key = evaluate$1(node.key, scope);
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
      let obj = node.static ? klass : klass.prototype;
      if (priv) {
          if (!obj[PRIVATE]) {
              define(obj, PRIVATE, { value: {} });
          }
          obj = obj[PRIVATE];
      }
      const value = createFunc(node.value, scope, { superClass });
      switch (node.kind) {
          case 'constructor':
              break;
          case 'method':
              define(obj, key, {
                  value,
                  writable: true,
                  configurable: true,
              });
              break;
          case 'get': {
              const oriDptor = getDptor(obj, key);
              define(obj, key, {
                  get: value,
                  set: oriDptor && oriDptor.set,
                  configurable: true,
              });
              break;
          }
          case 'set': {
              const oriDptor = getDptor(obj, key);
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
  function PropertyDefinition$1(node, scope, options = {}) {
      const { klass, superClass } = options;
      let key;
      let priv = false;
      if (node.computed) {
          key = evaluate$1(node.key, scope);
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
      const subScope = new Scope(scope, true);
      subScope.const('this', klass);
      let obj = klass;
      if (priv) {
          if (!obj[PRIVATE]) {
              define(obj, PRIVATE, { value: {} });
          }
          obj = obj[PRIVATE];
      }
      if (node.value.type === 'FunctionExpression' || node.value.type === 'ArrowFunctionExpression') {
          obj[key] = createFunc(node.value, subScope, { superClass });
      }
      else {
          obj[key] = evaluate$1(node.value, subScope);
      }
  }
  function StaticBlock$1(node, scope, options = {}) {
      const { klass } = options;
      const subScope = new Scope(scope, true);
      subScope.const('this', klass);
      return BlockStatement$1(node, subScope, { invasived: true });
  }
  function ImportDeclaration$1(node, scope) {
      const globalScope = scope.global();
      const module = globalScope.find(IMPORT + node.source.value);
      let value;
      if (module) {
          const result = module.get();
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
          throw new TypeError(`Failed to resolve module specifier "${node.source.value}"`);
      }
      for (let i = 0; i < node.specifiers.length; i++) {
          const spec = node.specifiers[i];
          let name;
          if (spec.type === 'ImportSpecifier') {
              name = spec.imported.type === 'Identifier'
                  ? spec.imported.name : spec.imported.value;
          }
          else if (spec.type === 'ImportDefaultSpecifier') {
              name = 'default';
          }
          else if (spec.type === 'ImportNamespaceSpecifier') {
              name = '*';
          }
          if (name !== '*' && !hasOwn(value, name)) {
              throw new SyntaxError(`The requested module "${node.source.value}" does not provide an export named "${name}"`);
          }
          scope.var(spec.local.name, name === '*' ? assign({}, value) : value[name]);
      }
  }
  function ExportDefaultDeclaration$1(node, scope) {
      const globalScope = scope.global();
      let value;
      if (node.declaration.type === 'FunctionDeclaration') {
          value = createFunc(node.declaration, scope);
          scope.func(node.declaration.id.name, value);
      }
      else if (node.declaration.type === 'ClassDeclaration') {
          value = createClass(node.declaration, scope);
          scope.func(node.declaration.id.name, value);
      }
      else {
          value = evaluate$1(node.declaration, scope);
      }
      const variable = globalScope.find(EXPORTS);
      if (variable) {
          const exports = variable.get();
          if (exports && typeof exports === 'object') {
              exports.default = value;
          }
      }
  }
  function ExportNamedDeclaration$1(node, scope) {
      const globalScope = scope.global();
      if (node.declaration) {
          if (node.declaration.type === 'FunctionDeclaration') {
              const value = createFunc(node.declaration, scope);
              scope.func(node.declaration.id.name, value);
              const variable = globalScope.find(EXPORTS);
              if (variable) {
                  const exports = variable.get();
                  if (exports && typeof exports === 'object') {
                      exports[node.declaration.id.name] = value;
                  }
              }
          }
          else if (node.declaration.type === 'ClassDeclaration') {
              const value = createClass(node.declaration, scope);
              scope.func(node.declaration.id.name, value);
              const variable = globalScope.find(EXPORTS);
              if (variable) {
                  const exports = variable.get();
                  if (exports && typeof exports === 'object') {
                      exports[node.declaration.id.name] = value;
                  }
              }
          }
          else if (node.declaration.type === 'VariableDeclaration') {
              VariableDeclaration$1(node.declaration, scope);
              const variable = globalScope.find(EXPORTS);
              if (variable) {
                  const exports = variable.get();
                  if (exports && typeof exports === 'object') {
                      for (let i = 0; i < node.declaration.declarations.length; i++) {
                          const name = node.declaration.declarations[i].id.name;
                          const item = scope.find(name);
                          if (item) {
                              exports[name] = item.get();
                          }
                      }
                  }
              }
          }
      }
      else if (node.specifiers) {
          const variable = globalScope.find(EXPORTS);
          if (variable) {
              const exports = variable.get();
              if (exports && typeof exports === 'object') {
                  for (let i = 0; i < node.specifiers.length; i++) {
                      const spec = node.specifiers[i];
                      const name = spec.local.type === 'Identifier'
                          ? spec.local.name : spec.local.value;
                      const item = scope.find(name);
                      if (item) {
                          exports[spec.exported.type === 'Identifier'
                              ? spec.exported.name : spec.exported.value] = item.get();
                      }
                  }
              }
          }
      }
  }
  function ExportAllDeclaration$1(node, scope) {
      const globalScope = scope.global();
      const module = globalScope.find(IMPORT + node.source.value);
      let value;
      if (module) {
          const result = module.get();
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
          throw new TypeError(`Failed to resolve module specifier "${node.source.value}"`);
      }
      const variable = globalScope.find(EXPORTS);
      if (variable) {
          const exports = variable.get();
          if (exports && typeof exports === 'object') {
              assign(exports, value);
          }
      }
  }

  function* Identifier(node, scope, options = {}) {
      const { getVar = false, throwErr = true } = options;
      if (node.name === 'undefined') {
          return undefined;
      }
      const variable = scope.find(node.name);
      if (variable) {
          if (getVar) {
              return variable;
          }
          else {
              const value = variable.get();
              if (value === DEADZONE) {
                  throw new ReferenceError(`${node.name} is not defined`);
              }
              else {
                  return value;
              }
          }
      }
      else if (throwErr) {
          throw new ReferenceError(`${node.name} is not defined`);
      }
      else {
          return undefined;
      }
  }

  var identifier = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Identifier: Identifier
  });

  function* Literal(node, scope) {
      return node.value;
  }

  var literal = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Literal: Literal
  });

  function* ThisExpression(node, scope) {
      const superCall = scope.find(SUPERCALL);
      if (superCall && !superCall.get()) {
          throw new ReferenceError('Must call super constructor in derived class '
              + 'before accessing \'this\' or returning from derived constructor');
      }
      else {
          return scope.find('this').get();
      }
  }
  function* ArrayExpression(node, scope) {
      let results = [];
      for (let i = 0; i < node.elements.length; i++) {
          const item = node.elements[i];
          if (item.type === 'SpreadElement') {
              results = results.concat(yield* SpreadElement(item, scope));
          }
          else {
              results.push(yield* evaluate(item, scope));
          }
      }
      return results;
  }
  function* ObjectExpression(node, scope) {
      const object = {};
      for (let i = 0; i < node.properties.length; i++) {
          const property = node.properties[i];
          if (property.type === 'SpreadElement') {
              assign(object, yield* SpreadElement(property, scope));
          }
          else {
              let key;
              const propKey = property.key;
              if (property.computed) {
                  key = yield* evaluate(propKey, scope);
              }
              else {
                  if (propKey.type === 'Identifier') {
                      key = propKey.name;
                  }
                  else {
                      key = '' + (yield* Literal(propKey));
                  }
              }
              const value = yield* evaluate(property.value, scope);
              const propKind = property.kind;
              if (propKind === 'init') {
                  object[key] = value;
              }
              else if (propKind === 'get') {
                  const oriDptor = getDptor(object, key);
                  define(object, key, {
                      get: value,
                      set: oriDptor && oriDptor.set,
                      enumerable: true,
                      configurable: true
                  });
              }
              else {
                  const oriDptor = getDptor(object, key);
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
  function* FunctionExpression(node, scope) {
      if (node.id && node.id.name) {
          const tmpScope = new Scope(scope);
          const func = createFunc$1(node, tmpScope);
          tmpScope.const(node.id.name, func);
          return func;
      }
      else {
          return createFunc$1(node, scope);
      }
  }
  function* UnaryExpression(node, scope) {
      const arg = node.argument;
      switch (node.operator) {
          case '+': return +(yield* evaluate(arg, scope));
          case '-': return -(yield* evaluate(arg, scope));
          case '!': return !(yield* evaluate(arg, scope));
          case '~': return ~(yield* evaluate(arg, scope));
          case 'void': return void (yield* evaluate(arg, scope));
          case 'typeof':
              if (arg.type === 'Identifier') {
                  return typeof (yield* Identifier(arg, scope, { throwErr: false }));
              }
              else {
                  return typeof (yield* evaluate(arg, scope));
              }
          case 'delete':
              if (arg.type === 'MemberExpression') {
                  const variable = yield* MemberExpression(arg, scope, { getVar: true });
                  return variable.del();
              }
              else if (arg.type === 'Identifier') {
                  throw new SyntaxError('Delete of an unqualified identifier in strict mode');
              }
              else {
                  yield* evaluate(arg, scope);
                  return true;
              }
          default: throw new SyntaxError(`Unexpected token ${node.operator}`);
      }
  }
  function* UpdateExpression(node, scope) {
      const arg = node.argument;
      let variable;
      if (arg.type === 'Identifier') {
          variable = yield* Identifier(arg, scope, { getVar: true });
      }
      else if (arg.type === 'MemberExpression') {
          variable = yield* MemberExpression(arg, scope, { getVar: true });
      }
      else {
          throw new SyntaxError('Unexpected token');
      }
      const value = variable.get();
      if (node.operator === '++') {
          variable.set(value + 1);
          return node.prefix ? variable.get() : value;
      }
      else if (node.operator === '--') {
          variable.set(value - 1);
          return node.prefix ? variable.get() : value;
      }
      else {
          throw new SyntaxError(`Unexpected token ${node.operator}`);
      }
  }
  function* BinaryExpression(node, scope) {
      let left;
      let right;
      if (node.left.type === 'PrivateIdentifier') {
          left = node.left.name;
          right = yield* evaluate(node.right, scope);
          right = right[PRIVATE];
      }
      else {
          left = yield* evaluate(node.left, scope);
          right = yield* evaluate(node.right, scope);
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
          default: throw new SyntaxError(`Unexpected token ${node.operator}`);
      }
  }
  function* AssignmentExpression(node, scope) {
      var _a;
      const left = node.left;
      let variable;
      if (left.type === 'Identifier') {
          variable = yield* Identifier(left, scope, { getVar: true, throwErr: false });
          if (!variable) {
              const win = scope.global().find('window').get();
              variable = new Prop(win, left.name);
          }
      }
      else if (left.type === 'MemberExpression') {
          variable = yield* MemberExpression(left, scope, { getVar: true });
      }
      else {
          const value = yield* evaluate(node.right, scope);
          return yield* pattern$1(left, scope, { feed: value });
      }
      const value = yield* evaluate(node.right, scope);
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
          default: throw new SyntaxError(`Unexpected token ${node.operator}`);
      }
  }
  function* LogicalExpression(node, scope) {
      var _a;
      switch (node.operator) {
          case '||':
              return (yield* evaluate(node.left, scope)) || (yield* evaluate(node.right, scope));
          case '&&':
              return (yield* evaluate(node.left, scope)) && (yield* evaluate(node.right, scope));
          case '??':
              return (_a = (yield* evaluate(node.left, scope))) !== null && _a !== void 0 ? _a : (yield* evaluate(node.right, scope));
          default:
              throw new SyntaxError(`Unexpected token ${node.operator}`);
      }
  }
  function* MemberExpression(node, scope, options = {}) {
      const { getObj = false, getVar = false } = options;
      let object;
      if (node.object.type === 'Super') {
          object = yield* Super(node.object, scope, { getProto: true });
      }
      else {
          object = yield* evaluate(node.object, scope);
      }
      if (getObj)
          return object;
      let key;
      let priv = false;
      if (node.computed) {
          key = yield* evaluate(node.property, scope);
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
          const setter = getSetter(object, key);
          if (node.object.type === 'Super' && setter) {
              const thisObject = scope.find('this').get();
              const privateKey = createSymbol(key);
              define(thisObject, privateKey, { set: setter });
              return new Prop(thisObject, privateKey);
          }
          else {
              return new Prop(object, key);
          }
      }
      else {
          const getter = getGetter(object, key);
          if (node.object.type === 'Super' && getter) {
              const thisObject = scope.find('this').get();
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
  function* ConditionalExpression(node, scope) {
      return (yield* evaluate(node.test, scope))
          ? (yield* evaluate(node.consequent, scope))
          : (yield* evaluate(node.alternate, scope));
  }
  function* CallExpression(node, scope) {
      let func;
      let object;
      if (node.callee.type === 'MemberExpression') {
          object = yield* MemberExpression(node.callee, scope, { getObj: true });
          if (node.callee.optional && object == null) {
              return undefined;
          }
          let key;
          let priv = false;
          if (node.callee.computed) {
              key = yield* evaluate(node.callee.property, scope);
          }
          else if (node.callee.property.type === 'PrivateIdentifier') {
              key = node.callee.property.name;
              priv = true;
          }
          else {
              key = node.callee.property.name;
          }
          let obj = object;
          if (priv) {
              obj = obj[PRIVATE];
          }
          if (node.callee.object.type === 'Super') {
              const thisObject = scope.find('this').get();
              func = obj[key].bind(thisObject);
          }
          else {
              func = obj[key];
          }
          if (node.optional && func == null) {
              return undefined;
          }
          if (typeof func !== 'function') {
              throw new TypeError(`${key} is not a function`);
          }
          else if (func[CLSCTOR]) {
              throw new TypeError(`Class constructor ${key} cannot be invoked without 'new'`);
          }
      }
      else {
          object = scope.find('this').get();
          func = yield* evaluate(node.callee, scope);
          if (node.optional && func == null) {
              return undefined;
          }
          if (typeof func !== 'function' || node.callee.type !== 'Super' && func[CLSCTOR]) {
              let name;
              if (node.callee.type === 'Identifier') {
                  name = node.callee.name;
              }
              else {
                  try {
                      name = JSON.stringify(func);
                  }
                  catch (err) {
                      name = '' + func;
                  }
              }
              if (typeof func !== 'function') {
                  throw new TypeError(`${name} is not a function`);
              }
              else {
                  throw new TypeError(`Class constructor ${name} cannot be invoked without 'new'`);
              }
          }
      }
      let args = [];
      for (let i = 0; i < node.arguments.length; i++) {
          const arg = node.arguments[i];
          if (arg.type === 'SpreadElement') {
              args = args.concat(yield* SpreadElement(arg, scope));
          }
          else {
              args.push(yield* evaluate(arg, scope));
          }
      }
      if (node.callee.type === 'Super') {
          const superCall = scope.find(SUPERCALL);
          if (superCall.get()) {
              throw new ReferenceError('Super constructor may only be called once');
          }
          else {
              scope.find(SUPERCALL).set(true);
          }
      }
      try {
          return func.apply(object, args);
      }
      catch (err) {
          if (err instanceof TypeError && err.message === 'Illegal invocation'
              && func.toString().indexOf('[native code]') !== -1) {
              const win = scope.global().find('window').get();
              if (win && win[WINDOW]) {
                  return func.apply(win[WINDOW], args);
              }
          }
          throw err;
      }
  }
  function* NewExpression(node, scope) {
      const constructor = yield* evaluate(node.callee, scope);
      if (typeof constructor !== 'function') {
          let name;
          if (node.callee.type === 'Identifier') {
              name = node.callee.name;
          }
          else {
              try {
                  name = JSON.stringify(constructor);
              }
              catch (err) {
                  name = '' + constructor;
              }
          }
          throw new TypeError(`${name} is not a constructor`);
      }
      else if (constructor[NOCTOR]) {
          throw new TypeError(`${constructor.name || '(intermediate value)'} is not a constructor`);
      }
      let args = [];
      for (let i = 0; i < node.arguments.length; i++) {
          const arg = node.arguments[i];
          if (arg.type === 'SpreadElement') {
              args = args.concat(yield* SpreadElement(arg, scope));
          }
          else {
              args.push(yield* evaluate(arg, scope));
          }
      }
      return new constructor(...args);
  }
  function* MetaProperty(node, scope) {
      if (node.meta.name === 'new' && node.property.name === 'target') {
          return scope.find(NEWTARGET).get();
      }
      else if (node.meta.name === 'import' && node.property.name === 'meta') {
          return { url: '' };
      }
  }
  function* SequenceExpression(node, scope) {
      let result;
      for (let i = 0; i < node.expressions.length; i++) {
          result = yield* evaluate(node.expressions[i], scope);
      }
      return result;
  }
  function* ArrowFunctionExpression(node, scope) {
      return createFunc$1(node, scope);
  }
  function* TemplateLiteral(node, scope) {
      const quasis = node.quasis.slice();
      const expressions = node.expressions.slice();
      let result = '';
      let temEl;
      let expr;
      while (temEl = quasis.shift()) {
          result += yield* TemplateElement(temEl);
          expr = expressions.shift();
          if (expr) {
              result += yield* evaluate(expr, scope);
          }
      }
      return result;
  }
  function* TaggedTemplateExpression(node, scope) {
      const tagFunc = yield* evaluate(node.tag, scope);
      const quasis = node.quasi.quasis;
      const str = quasis.map(v => v.value.cooked);
      const raw = quasis.map(v => v.value.raw);
      define(str, 'raw', {
          value: freeze(raw)
      });
      const expressions = node.quasi.expressions;
      const args = [];
      if (expressions) {
          for (let i = 0; i < expressions.length; i++) {
              args.push(yield* evaluate(expressions[i], scope));
          }
      }
      return tagFunc(freeze(str), ...args);
  }
  function* TemplateElement(node, scope) {
      return node.value.raw;
  }
  function* ClassExpression(node, scope) {
      if (node.id && node.id.name) {
          const tmpScope = new Scope(scope);
          const klass = yield* createClass$1(node, tmpScope);
          tmpScope.const(node.id.name, klass);
          return klass;
      }
      else {
          return yield* createClass$1(node, scope);
      }
  }
  function* Super(node, scope, options = {}) {
      const { getProto = false } = options;
      const superClass = scope.find(SUPER).get();
      return getProto ? superClass.prototype : superClass;
  }
  function* SpreadElement(node, scope) {
      const result = yield* evaluate(node.argument, scope);
      return typeof result === 'string' ? [...result] : result;
  }
  function* ChainExpression(node, scope) {
      return yield* evaluate(node.expression, scope);
  }
  function* ImportExpression(node, scope) {
      const globalScope = scope.global();
      const source = yield* evaluate(node.source, scope);
      const module = globalScope.find(IMPORT + source);
      let value;
      if (module) {
          const result = module.get();
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
          return Promise.reject(new TypeError(`Failed to resolve module specifier "${source}"`));
      }
      return Promise.resolve(value);
  }
  function* YieldExpression(node, scope) {
      const res = yield* evaluate(node.argument, scope);
      return node.delegate ? yield* res : yield res;
  }
  function* AwaitExpression(node, scope) {
      AWAIT.RES = yield* evaluate(node.argument, scope);
      return yield AWAIT;
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
    ImportExpression: ImportExpression,
    YieldExpression: YieldExpression,
    AwaitExpression: AwaitExpression
  });

  function* ObjectPattern(node, scope, options = {}) {
      const { kind = 'var', hoist = false, onlyBlock = false, feed = {} } = options;
      const fedKeys = [];
      for (let i = 0; i < node.properties.length; i++) {
          const property = node.properties[i];
          if (hoist) {
              if (onlyBlock || kind === 'var') {
                  if (property.type === 'Property') {
                      const value = property.value;
                      if (value.type === 'Identifier') {
                          scope[kind](value.name, onlyBlock ? DEADZONE : kind === 'var' ? NOINIT : undefined);
                      }
                      else {
                          yield* pattern$1(value, scope, { kind, hoist, onlyBlock });
                      }
                  }
                  else {
                      yield* RestElement(property, scope, { kind, hoist, onlyBlock });
                  }
              }
          }
          else if (property.type === 'Property') {
              let key;
              if (property.computed) {
                  key = yield* evaluate(property.key, scope);
              }
              else {
                  key = property.key.name;
              }
              fedKeys.push(key);
              const value = property.value;
              if (value.type === 'Identifier') {
                  scope[kind](value.name, feed[key]);
              }
              else {
                  yield* pattern$1(value, scope, { kind, feed: feed[key] });
              }
          }
          else {
              const rest = assign({}, feed);
              for (let i = 0; i < fedKeys.length; i++)
                  delete rest[fedKeys[i]];
              yield* RestElement(property, scope, { kind, feed: rest });
          }
      }
  }
  function* ArrayPattern(node, scope, options = {}) {
      const { kind, hoist = false, onlyBlock = false, feed = [] } = options;
      const result = [];
      for (let i = 0; i < node.elements.length; i++) {
          const element = node.elements[i];
          if (!element)
              continue;
          if (hoist) {
              if (onlyBlock || kind === 'var') {
                  if (element.type === 'Identifier') {
                      scope[kind](element.name, onlyBlock ? DEADZONE : kind === 'var' ? NOINIT : undefined);
                  }
                  else {
                      yield* pattern$1(element, scope, { kind, hoist, onlyBlock });
                  }
              }
          }
          else if (element.type === 'Identifier') {
              if (kind) {
                  scope[kind](element.name, feed[i]);
              }
              else {
                  const variable = yield* Identifier(element, scope, { getVar: true });
                  variable.set(feed[i]);
                  result.push(variable.get());
              }
          }
          else if (element.type === 'RestElement') {
              yield* RestElement(element, scope, { kind, feed: feed.slice(i) });
          }
          else {
              yield* pattern$1(element, scope, { kind, feed: feed[i] });
          }
      }
      if (result.length) {
          return result;
      }
  }
  function* RestElement(node, scope, options = {}) {
      const { kind, hoist = false, onlyBlock = false, feed = [] } = options;
      const arg = node.argument;
      if (hoist) {
          if (onlyBlock || kind === 'var') {
              if (arg.type === 'Identifier') {
                  scope[kind](arg.name, onlyBlock ? DEADZONE : kind === 'var' ? NOINIT : undefined);
              }
              else {
                  yield* pattern$1(arg, scope, { kind, hoist, onlyBlock });
              }
          }
      }
      else if (arg.type === 'Identifier') {
          if (kind) {
              scope[kind](arg.name, feed);
          }
          else {
              const variable = yield* Identifier(arg, scope, { getVar: true });
              variable.set(feed);
          }
      }
      else {
          yield* pattern$1(arg, scope, { kind, feed });
      }
  }
  function* AssignmentPattern(node, scope, options = {}) {
      const { kind = 'var', hoist = false, onlyBlock = false, feed = yield* evaluate(node.right, scope) } = options;
      const left = node.left;
      if (hoist) {
          if (onlyBlock || kind === 'var') {
              if (left.type === 'Identifier') {
                  scope[kind](left.name, onlyBlock ? DEADZONE : kind === 'var' ? NOINIT : undefined);
              }
              else {
                  yield* pattern$1(left, scope, { kind, hoist, onlyBlock });
              }
          }
      }
      else if (left.type === 'Identifier') {
          scope[kind](left.name, feed);
      }
      else {
          yield* pattern$1(left, scope, { kind, feed });
      }
  }

  var pattern$2 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    ObjectPattern: ObjectPattern,
    ArrayPattern: ArrayPattern,
    RestElement: RestElement,
    AssignmentPattern: AssignmentPattern
  });

  let evaluateOps;
  function* evaluate(node, scope) {
      if (!node)
          return;
      if (!evaluateOps) {
          evaluateOps = assign({}, declaration, expression, identifier, statement, literal, pattern$2);
      }
      const handler = evaluateOps[node.type];
      if (handler) {
          return yield* handler(node, scope);
      }
      else {
          throw new Error(`${node.type} isn't implemented`);
      }
  }

  function* ExpressionStatement(node, scope) {
      yield* evaluate(node.expression, scope);
  }
  function* BlockStatement(block, scope, options = {}) {
      const { invasived = false, hoisted = false, } = options;
      const subScope = invasived ? scope : new Scope(scope);
      if (!hoisted) {
          yield* hoist$1(block, subScope, { onlyBlock: true });
      }
      for (let i = 0; i < block.body.length; i++) {
          const result = yield* evaluate(block.body[i], subScope);
          if (result === BREAK) {
              if (result.LABEL && result.LABEL === options.label) {
                  break;
              }
              return result;
          }
          if (result === CONTINUE || result === RETURN) {
              return result;
          }
      }
  }
  function* EmptyStatement() {
  }
  function* DebuggerStatement() {
      debugger;
  }
  function* ReturnStatement(node, scope) {
      RETURN.RES = node.argument ? (yield* evaluate(node.argument, scope)) : undefined;
      return RETURN;
  }
  function* BreakStatement(node) {
      var _a;
      BREAK.LABEL = (_a = node.label) === null || _a === void 0 ? void 0 : _a.name;
      return BREAK;
  }
  function* ContinueStatement(node) {
      var _a;
      CONTINUE.LABEL = (_a = node.label) === null || _a === void 0 ? void 0 : _a.name;
      return CONTINUE;
  }
  function* LabeledStatement(node, scope) {
      const label = node.label.name;
      if (node.body.type === 'WhileStatement') {
          return yield* WhileStatement(node.body, scope, { label });
      }
      if (node.body.type === 'DoWhileStatement') {
          return yield* DoWhileStatement(node.body, scope, { label });
      }
      if (node.body.type === 'ForStatement') {
          return yield* ForStatement(node.body, scope, { label });
      }
      if (node.body.type === 'ForInStatement') {
          return yield* ForInStatement(node.body, scope, { label });
      }
      if (node.body.type === 'ForOfStatement') {
          return yield* ForOfStatement(node.body, scope, { label });
      }
      if (node.body.type === 'BlockStatement') {
          return yield* BlockStatement(node.body, scope, { label });
      }
      if (node.body.type === 'WithStatement') {
          return yield* WithStatement(node.body, scope, { label });
      }
      if (node.body.type === 'IfStatement') {
          return yield* IfStatement(node.body, scope, { label });
      }
      if (node.body.type === 'SwitchStatement') {
          return yield* SwitchStatement(node.body, scope, { label });
      }
      if (node.body.type === 'TryStatement') {
          return yield* TryStatement(node.body, scope, { label });
      }
      throw new SyntaxError(`${node.body.type} cannot be labeled`);
  }
  function* WithStatement(node, scope, options = {}) {
      const withScope = new Scope(scope);
      withScope.with(yield* evaluate(node.object, scope));
      const result = yield* evaluate(node.body, withScope);
      if (result === BREAK) {
          if (result.LABEL && result.LABEL === options.label) {
              return;
          }
          return result;
      }
      if (result === CONTINUE || result === RETURN) {
          return result;
      }
  }
  function* IfStatement(node, scope, options = {}) {
      let result;
      if (yield* evaluate(node.test, scope)) {
          result = yield* evaluate(node.consequent, scope);
      }
      else {
          result = yield* evaluate(node.alternate, scope);
      }
      if (result === BREAK) {
          if (result.LABEL && result.LABEL === options.label) {
              return;
          }
          return result;
      }
      if (result === CONTINUE || result === RETURN) {
          return result;
      }
  }
  function* SwitchStatement(node, scope, options = {}) {
      const discriminant = yield* evaluate(node.discriminant, scope);
      let matched = false;
      for (let i = 0; i < node.cases.length; i++) {
          const eachCase = node.cases[i];
          if (!matched
              && (!eachCase.test
                  || (yield* evaluate(eachCase.test, scope)) === discriminant)) {
              matched = true;
          }
          if (matched) {
              const result = yield* SwitchCase(eachCase, scope);
              if (result === BREAK) {
                  if (result.LABEL === options.label) {
                      break;
                  }
                  return result;
              }
              if (result === CONTINUE || result === RETURN) {
                  return result;
              }
          }
      }
  }
  function* SwitchCase(node, scope) {
      for (let i = 0; i < node.consequent.length; i++) {
          const result = yield* evaluate(node.consequent[i], scope);
          if (result === BREAK || result === CONTINUE || result === RETURN) {
              return result;
          }
      }
  }
  function* ThrowStatement(node, scope) {
      throw yield* evaluate(node.argument, scope);
  }
  function* TryStatement(node, scope, options = {}) {
      let result;
      try {
          result = yield* BlockStatement(node.block, scope);
      }
      catch (err) {
          if (node.handler) {
              const subScope = new Scope(scope);
              const param = node.handler.param;
              if (param) {
                  if (param.type === 'Identifier') {
                      const name = param.name;
                      subScope.var(name, err);
                  }
                  else {
                      yield* pattern$1(param, scope, { feed: err });
                  }
              }
              result = yield* CatchClause(node.handler, subScope);
          }
          else {
              throw err;
          }
      }
      finally {
          if (node.finalizer) {
              result = yield* BlockStatement(node.finalizer, scope);
          }
      }
      if (result === BREAK) {
          if (result.LABEL && result.LABEL === options.label) {
              return;
          }
          return result;
      }
      if (result === CONTINUE || result === RETURN) {
          return result;
      }
  }
  function* CatchClause(node, scope) {
      return yield* BlockStatement(node.body, scope, { invasived: true });
  }
  function* WhileStatement(node, scope, options = {}) {
      while (yield* evaluate(node.test, scope)) {
          const result = yield* evaluate(node.body, scope);
          if (result === BREAK) {
              if (result.LABEL === options.label) {
                  break;
              }
              return result;
          }
          else if (result === CONTINUE) {
              if (result.LABEL === options.label) {
                  continue;
              }
              return result;
          }
          else if (result === RETURN) {
              return result;
          }
      }
  }
  function* DoWhileStatement(node, scope, options = {}) {
      do {
          const result = yield* evaluate(node.body, scope);
          if (result === BREAK) {
              if (result.LABEL === options.label) {
                  break;
              }
              return result;
          }
          else if (result === CONTINUE) {
              if (result.LABEL === options.label) {
                  continue;
              }
              return result;
          }
          else if (result === RETURN) {
              return result;
          }
      } while (yield* evaluate(node.test, scope));
  }
  function* ForStatement(node, scope, options = {}) {
      const forScope = new Scope(scope);
      for (yield* evaluate(node.init, forScope); node.test ? (yield* evaluate(node.test, forScope)) : true; yield* evaluate(node.update, forScope)) {
          const subScope = new Scope(forScope);
          let result;
          if (node.body.type === 'BlockStatement') {
              result = yield* BlockStatement(node.body, subScope, { invasived: true });
          }
          else {
              result = yield* evaluate(node.body, subScope);
          }
          if (result === BREAK) {
              if (result.LABEL === options.label) {
                  break;
              }
              return result;
          }
          else if (result === CONTINUE) {
              if (result.LABEL === options.label) {
                  continue;
              }
              return result;
          }
          else if (result === RETURN) {
              return result;
          }
      }
  }
  function* ForInStatement(node, scope, options = {}) {
      for (const value in yield* evaluate(node.right, scope)) {
          const result = yield* ForXHandler$1(node, scope, { value });
          if (result === BREAK) {
              if (result.LABEL === options.label) {
                  break;
              }
              return result;
          }
          else if (result === CONTINUE) {
              if (result.LABEL === options.label) {
                  continue;
              }
              return result;
          }
          else if (result === RETURN) {
              return result;
          }
      }
  }
  function* ForOfStatement(node, scope, options = {}) {
      const right = yield* evaluate(node.right, scope);
      if (node.await) {
          const iterator = getAsyncIterator(right);
          let ret;
          for (AWAIT.RES = iterator.next(), ret = yield AWAIT; !ret.done; AWAIT.RES = iterator.next(), ret = yield AWAIT) {
              const result = yield* ForXHandler$1(node, scope, { value: ret.value });
              if (result === BREAK) {
                  if (result.LABEL === options.label) {
                      break;
                  }
                  return result;
              }
              else if (result === CONTINUE) {
                  if (result.LABEL === options.label) {
                      continue;
                  }
                  return result;
              }
              else if (result === RETURN) {
                  return result;
              }
          }
      }
      else {
          for (const value of right) {
              const result = yield* ForXHandler$1(node, scope, { value });
              if (result === BREAK) {
                  if (result.LABEL === options.label) {
                      break;
                  }
                  return result;
              }
              else if (result === CONTINUE) {
                  if (result.LABEL === options.label) {
                      continue;
                  }
                  return result;
              }
              else if (result === RETURN) {
                  return result;
              }
          }
      }
  }

  function* FunctionDeclaration(node, scope) {
      scope.func(node.id.name, createFunc$1(node, scope));
  }
  function* VariableDeclaration(node, scope, options = {}) {
      for (let i = 0; i < node.declarations.length; i++) {
          yield* VariableDeclarator(node.declarations[i], scope, assign({ kind: node.kind }, options));
      }
  }
  function* VariableDeclarator(node, scope, options = {}) {
      const { kind = 'var', hoist = false, onlyBlock = false, feed } = options;
      if (hoist) {
          if (onlyBlock || kind === 'var') {
              if (node.id.type === 'Identifier') {
                  scope[kind](node.id.name, onlyBlock ? DEADZONE : kind === 'var' ? NOINIT : undefined);
              }
              else {
                  yield* pattern$1(node.id, scope, { kind, hoist, onlyBlock });
              }
          }
      }
      else {
          const hasFeed = 'feed' in options;
          const value = hasFeed ? feed : yield* evaluate(node.init, scope);
          if (node.id.type === 'Identifier') {
              const name = node.id.name;
              if (kind === 'var' && !node.init && !hasFeed) {
                  scope.var(name, NOINIT);
              }
              else {
                  scope[kind](name, value);
              }
              if (node.init
                  && ['ClassExpression', 'FunctionExpression', 'ArrowFunctionExpression']
                      .indexOf(node.init.type) !== -1
                  && !value.name) {
                  define(value, 'name', {
                      value: name,
                      configurable: true
                  });
              }
          }
          else {
              yield* pattern$1(node.id, scope, { kind, feed: value });
          }
      }
  }
  function* ClassDeclaration(node, scope) {
      scope.func(node.id.name, yield* createClass$1(node, scope));
  }
  function* ClassBody(node, scope, options = {}) {
      const { klass, superClass } = options;
      for (let i = 0; i < node.body.length; i++) {
          const def = node.body[i];
          if (def.type === 'MethodDefinition') {
              yield* MethodDefinition(def, scope, { klass, superClass });
          }
          else if (def.type === 'PropertyDefinition' && def.static) {
              yield* PropertyDefinition(def, scope, { klass, superClass });
          }
          else if (def.type === 'StaticBlock') {
              yield* StaticBlock(def, scope, { klass, superClass });
          }
      }
  }
  function* MethodDefinition(node, scope, options = {}) {
      const { klass, superClass } = options;
      let key;
      let priv = false;
      if (node.computed) {
          key = yield* evaluate(node.key, scope);
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
      let obj = node.static ? klass : klass.prototype;
      if (priv) {
          if (!obj[PRIVATE]) {
              define(obj, PRIVATE, { value: {} });
          }
          obj = obj[PRIVATE];
      }
      const value = createFunc$1(node.value, scope, { superClass });
      switch (node.kind) {
          case 'constructor':
              break;
          case 'method':
              define(obj, key, {
                  value,
                  writable: true,
                  configurable: true,
              });
              break;
          case 'get': {
              const oriDptor = getDptor(obj, key);
              define(obj, key, {
                  get: value,
                  set: oriDptor && oriDptor.set,
                  configurable: true,
              });
              break;
          }
          case 'set': {
              const oriDptor = getDptor(obj, key);
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
  function* PropertyDefinition(node, scope, options = {}) {
      const { klass, superClass } = options;
      let key;
      let priv = false;
      if (node.computed) {
          key = yield* evaluate(node.key, scope);
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
      const subScope = new Scope(scope, true);
      subScope.const('this', klass);
      let obj = klass;
      if (priv) {
          if (!obj[PRIVATE]) {
              define(obj, PRIVATE, { value: {} });
          }
          obj = obj[PRIVATE];
      }
      if (node.value.type === 'FunctionExpression' || node.value.type === 'ArrowFunctionExpression') {
          obj[key] = createFunc$1(node.value, subScope, { superClass });
      }
      else {
          obj[key] = yield* evaluate(node.value, subScope);
      }
  }
  function* StaticBlock(node, scope, options = {}) {
      const { klass } = options;
      const subScope = new Scope(scope, true);
      subScope.const('this', klass);
      return yield* BlockStatement(node, subScope, { invasived: true });
  }
  function* ImportDeclaration(node, scope) {
      const globalScope = scope.global();
      const module = globalScope.find(IMPORT + node.source.value);
      let value;
      if (module) {
          const result = module.get();
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
          throw new TypeError(`Failed to resolve module specifier "${node.source.value}"`);
      }
      for (let i = 0; i < node.specifiers.length; i++) {
          const spec = node.specifiers[i];
          let name;
          if (spec.type === 'ImportSpecifier') {
              name = spec.imported.type === 'Identifier'
                  ? spec.imported.name : spec.imported.value;
          }
          else if (spec.type === 'ImportDefaultSpecifier') {
              name = 'default';
          }
          else if (spec.type === 'ImportNamespaceSpecifier') {
              name = '*';
          }
          if (name !== '*' && !hasOwn(value, name)) {
              throw new SyntaxError(`The requested module "${node.source.value}" does not provide an export named "${name}"`);
          }
          scope.var(spec.local.name, name === '*' ? assign({}, value) : value[name]);
      }
  }
  function* ExportDefaultDeclaration(node, scope) {
      const globalScope = scope.global();
      let value;
      if (node.declaration.type === 'FunctionDeclaration') {
          value = createFunc$1(node.declaration, scope);
          scope.func(node.declaration.id.name, value);
      }
      else if (node.declaration.type === 'ClassDeclaration') {
          value = yield* createClass$1(node.declaration, scope);
          scope.func(node.declaration.id.name, value);
      }
      else {
          value = yield* evaluate(node.declaration, scope);
      }
      const variable = globalScope.find(EXPORTS);
      if (variable) {
          const exports = variable.get();
          if (exports && typeof exports === 'object') {
              exports.default = value;
          }
      }
  }
  function* ExportNamedDeclaration(node, scope) {
      const globalScope = scope.global();
      if (node.declaration) {
          if (node.declaration.type === 'FunctionDeclaration') {
              const value = createFunc$1(node.declaration, scope);
              scope.func(node.declaration.id.name, value);
              const variable = globalScope.find(EXPORTS);
              if (variable) {
                  const exports = variable.get();
                  if (exports && typeof exports === 'object') {
                      exports[node.declaration.id.name] = value;
                  }
              }
          }
          else if (node.declaration.type === 'ClassDeclaration') {
              const value = yield* createClass$1(node.declaration, scope);
              scope.func(node.declaration.id.name, value);
              const variable = globalScope.find(EXPORTS);
              if (variable) {
                  const exports = variable.get();
                  if (exports && typeof exports === 'object') {
                      exports[node.declaration.id.name] = value;
                  }
              }
          }
          else if (node.declaration.type === 'VariableDeclaration') {
              yield* VariableDeclaration(node.declaration, scope);
              const variable = globalScope.find(EXPORTS);
              if (variable) {
                  const exports = variable.get();
                  if (exports && typeof exports === 'object') {
                      for (let i = 0; i < node.declaration.declarations.length; i++) {
                          const name = node.declaration.declarations[i].id.name;
                          const item = scope.find(name);
                          if (item) {
                              exports[name] = item.get();
                          }
                      }
                  }
              }
          }
      }
      else if (node.specifiers) {
          const variable = globalScope.find(EXPORTS);
          if (variable) {
              const exports = variable.get();
              if (exports && typeof exports === 'object') {
                  for (let i = 0; i < node.specifiers.length; i++) {
                      const spec = node.specifiers[i];
                      const name = spec.local.type === 'Identifier'
                          ? spec.local.name : spec.local.value;
                      const item = scope.find(name);
                      if (item) {
                          exports[spec.exported.type === 'Identifier'
                              ? spec.exported.name : spec.exported.value] = item.get();
                      }
                  }
              }
          }
      }
  }
  function* ExportAllDeclaration(node, scope) {
      const globalScope = scope.global();
      const module = globalScope.find(IMPORT + node.source.value);
      let value;
      if (module) {
          const result = module.get();
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
          throw new TypeError(`Failed to resolve module specifier "${node.source.value}"`);
      }
      const variable = globalScope.find(EXPORTS);
      if (variable) {
          const exports = variable.get();
          if (exports && typeof exports === 'object') {
              assign(exports, value);
          }
      }
  }

  function runAsync(iterator, options = {}) {
      const { res, err, ret, fullRet } = options;
      return new Promise((resolve, reject) => {
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
              let ret;
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
              let ret;
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
              const awaitValue = ret.value.RES;
              const value = awaitValue && awaitValue.then === 'function'
                  ? awaitValue : Promise.resolve(awaitValue);
              return value.then(onFulfilled, onRejected);
          }
      });
  }

  function* hoist$1(block, scope, options = {}) {
      const { onlyBlock = false } = options;
      const funcDclrList = [];
      const funcDclrIdxs = [];
      for (let i = 0; i < block.body.length; i++) {
          const statement = block.body[i];
          if (statement.type === 'FunctionDeclaration') {
              funcDclrList.push(statement);
              funcDclrIdxs.push(i);
          }
          else if (statement.type === 'VariableDeclaration'
              && ['const', 'let'].indexOf(statement.kind) !== -1) {
              yield* VariableDeclaration(statement, scope, { hoist: true, onlyBlock: true });
          }
          else if (!onlyBlock) {
              yield* hoistVarRecursion$1(statement, scope);
          }
      }
      if (funcDclrIdxs.length) {
          for (let i = funcDclrIdxs.length - 1; i > -1; i--) {
              block.body.splice(funcDclrIdxs[i], 1);
          }
          block.body = funcDclrList.concat(block.body);
      }
  }
  function* hoistVarRecursion$1(statement, scope) {
      switch (statement.type) {
          case 'VariableDeclaration':
              yield* VariableDeclaration(statement, scope, { hoist: true });
              break;
          case 'ForInStatement':
          case 'ForOfStatement':
              if (statement.left.type === 'VariableDeclaration') {
                  yield* VariableDeclaration(statement.left, scope, { hoist: true });
              }
          case 'ForStatement':
              if (statement.type === 'ForStatement' && statement.init.type === 'VariableDeclaration') {
                  yield* VariableDeclaration(statement.init, scope, { hoist: true });
              }
          case 'WhileStatement':
          case 'DoWhileStatement':
              yield* hoistVarRecursion$1(statement.body, scope);
              break;
          case 'IfStatement':
              yield* hoistVarRecursion$1(statement.consequent, scope);
              if (statement.alternate) {
                  yield* hoistVarRecursion$1(statement.alternate, scope);
              }
              break;
          case 'BlockStatement':
              for (let i = 0; i < statement.body.length; i++) {
                  yield* hoistVarRecursion$1(statement.body[i], scope);
              }
              break;
          case 'SwitchStatement':
              for (let i = 0; i < statement.cases.length; i++) {
                  for (let j = 0; j < statement.cases[i].consequent.length; j++) {
                      yield* hoistVarRecursion$1(statement.cases[i].consequent[j], scope);
                  }
              }
              break;
          case 'TryStatement': {
              const tryBlock = statement.block.body;
              for (let i = 0; i < tryBlock.length; i++) {
                  yield* hoistVarRecursion$1(tryBlock[i], scope);
              }
              const catchBlock = statement.handler && statement.handler.body.body;
              if (catchBlock) {
                  for (let i = 0; i < catchBlock.length; i++) {
                      yield* hoistVarRecursion$1(catchBlock[i], scope);
                  }
              }
              const finalBlock = statement.finalizer && statement.finalizer.body;
              if (finalBlock) {
                  for (let i = 0; i < finalBlock.length; i++) {
                      yield* hoistVarRecursion$1(finalBlock[i], scope);
                  }
              }
              break;
          }
      }
  }
  function* pattern$1(node, scope, options = {}) {
      switch (node.type) {
          case 'ObjectPattern':
              return yield* ObjectPattern(node, scope, options);
          case 'ArrayPattern':
              return yield* ArrayPattern(node, scope, options);
          case 'RestElement':
              return yield* RestElement(node, scope, options);
          case 'AssignmentPattern':
              return yield* AssignmentPattern(node, scope, options);
          default:
              throw new SyntaxError('Unexpected token');
      }
  }
  function createFunc$1(node, scope, options = {}) {
      var _a;
      if (!node.generator && !node.async) {
          return createFunc(node, scope, options);
      }
      const { superClass, construct } = options;
      const params = node.params;
      const tmpFunc = function* (...args) {
          const subScope = new Scope(scope, true);
          if (node.type !== 'ArrowFunctionExpression') {
              subScope.const('this', this);
              subScope.let('arguments', arguments);
              subScope.const(NEWTARGET, new.target);
              if (construct) {
                  yield* construct(this);
              }
              if (superClass) {
                  subScope.const(SUPER, superClass);
                  if (construct)
                      subScope.let(SUPERCALL, false);
              }
          }
          for (let i = 0; i < params.length; i++) {
              const param = params[i];
              if (param.type === 'Identifier') {
                  subScope.var(param.name, args[i]);
              }
              else if (param.type === 'RestElement') {
                  yield* RestElement(param, subScope, { kind: 'var', feed: args.slice(i) });
              }
              else {
                  yield* pattern$1(param, subScope, { kind: 'var', feed: args[i] });
              }
          }
          let result;
          if (node.body.type === 'BlockStatement') {
              yield* hoist$1(node.body, subScope);
              result = yield* BlockStatement(node.body, subScope, {
                  invasived: true,
                  hoisted: true
              });
          }
          else {
              result = yield* evaluate(node.body, subScope);
              if (node.type === 'ArrowFunctionExpression') {
                  RETURN.RES = result;
                  result = RETURN;
              }
          }
          if (result === RETURN) {
              return result.RES;
          }
      };
      let func;
      if (node.async && node.generator) {
          func = function () {
              const iterator = tmpFunc.apply(this, arguments);
              let last = Promise.resolve();
              let hasCatch = false;
              const run = (opts) => last = last
                  .then(() => runAsync(iterator, assign({ fullRet: true }, opts)))
                  .catch(err => {
                  if (!hasCatch) {
                      hasCatch = true;
                      return Promise.reject(err);
                  }
              });
              const asyncIterator = {
                  next: (res) => run({ res }),
                  throw: (err) => run({ err }),
                  return: (ret) => run({ ret })
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
      const source = (_a = node.loc) === null || _a === void 0 ? void 0 : _a.source;
      if (source) {
          define(func, 'toString', {
              value: () => source.substring(node.start, node.end),
              configurable: true
          });
      }
      return func;
  }
  function* createClass$1(node, scope) {
      const superClass = yield* evaluate(node.superClass, scope);
      const methodBody = node.body.body;
      const construct = function* (object) {
          for (let i = 0; i < methodBody.length; i++) {
              const def = methodBody[i];
              if (def.type === 'PropertyDefinition' && !def.static) {
                  yield* PropertyDefinition(def, scope, { klass: object, superClass });
              }
          }
      };
      let klass = function* () {
          yield* construct(this);
          if (superClass) {
              superClass.apply(this);
          }
      };
      for (let i = 0; i < methodBody.length; i++) {
          const method = methodBody[i];
          if (method.type === 'MethodDefinition' && method.kind === 'constructor') {
              klass = createFunc$1(method.value, scope, { superClass, construct });
              break;
          }
      }
      if (superClass) {
          inherits(klass, superClass);
      }
      yield* ClassBody(node.body, scope, { klass, superClass });
      define(klass, CLSCTOR, { value: true });
      define(klass, 'name', {
          value: node.id && node.id.name || '',
          configurable: true
      });
      return klass;
  }
  function* ForXHandler$1(node, scope, options) {
      const { value } = options;
      const left = node.left;
      const subScope = new Scope(scope);
      if (left.type === 'VariableDeclaration') {
          yield* VariableDeclaration(left, subScope, { feed: value });
      }
      else if (left.type === 'Identifier') {
          const variable = yield* Identifier$1(left, scope, { getVar: true });
          variable.set(value);
      }
      else {
          yield* pattern$1(left, scope, { feed: value });
      }
      let result;
      if (node.body.type === 'BlockStatement') {
          result = yield* BlockStatement(node.body, subScope, { invasived: true });
      }
      else {
          result = yield* evaluate(node.body, subScope);
      }
      return result;
  }

  function hoist(block, scope, options = {}) {
      const { onlyBlock = false } = options;
      const funcDclrList = [];
      const funcDclrIdxs = [];
      for (let i = 0; i < block.body.length; i++) {
          const statement = block.body[i];
          if (statement.type === 'FunctionDeclaration') {
              funcDclrList.push(statement);
              funcDclrIdxs.push(i);
          }
          else if (statement.type === 'VariableDeclaration'
              && ['const', 'let'].indexOf(statement.kind) !== -1) {
              VariableDeclaration$1(statement, scope, { hoist: true, onlyBlock: true });
          }
          else if (!onlyBlock) {
              hoistVarRecursion(statement, scope);
          }
      }
      if (funcDclrIdxs.length) {
          for (let i = funcDclrIdxs.length - 1; i > -1; i--) {
              block.body.splice(funcDclrIdxs[i], 1);
          }
          block.body = funcDclrList.concat(block.body);
      }
  }
  function hoistVarRecursion(statement, scope) {
      switch (statement.type) {
          case 'VariableDeclaration':
              VariableDeclaration$1(statement, scope, { hoist: true });
              break;
          case 'ForInStatement':
          case 'ForOfStatement':
              if (statement.left.type === 'VariableDeclaration') {
                  VariableDeclaration$1(statement.left, scope, { hoist: true });
              }
          case 'ForStatement':
              if (statement.type === 'ForStatement' && statement.init.type === 'VariableDeclaration') {
                  VariableDeclaration$1(statement.init, scope, { hoist: true });
              }
          case 'WhileStatement':
          case 'DoWhileStatement':
              hoistVarRecursion(statement.body, scope);
              break;
          case 'IfStatement':
              hoistVarRecursion(statement.consequent, scope);
              if (statement.alternate) {
                  hoistVarRecursion(statement.alternate, scope);
              }
              break;
          case 'BlockStatement':
              for (let i = 0; i < statement.body.length; i++) {
                  hoistVarRecursion(statement.body[i], scope);
              }
              break;
          case 'SwitchStatement':
              for (let i = 0; i < statement.cases.length; i++) {
                  for (let j = 0; j < statement.cases[i].consequent.length; j++) {
                      hoistVarRecursion(statement.cases[i].consequent[j], scope);
                  }
              }
              break;
          case 'TryStatement': {
              const tryBlock = statement.block.body;
              for (let i = 0; i < tryBlock.length; i++) {
                  hoistVarRecursion(tryBlock[i], scope);
              }
              const catchBlock = statement.handler && statement.handler.body.body;
              if (catchBlock) {
                  for (let i = 0; i < catchBlock.length; i++) {
                      hoistVarRecursion(catchBlock[i], scope);
                  }
              }
              const finalBlock = statement.finalizer && statement.finalizer.body;
              if (finalBlock) {
                  for (let i = 0; i < finalBlock.length; i++) {
                      hoistVarRecursion(finalBlock[i], scope);
                  }
              }
              break;
          }
      }
  }
  function pattern(node, scope, options = {}) {
      switch (node.type) {
          case 'ObjectPattern':
              return ObjectPattern$1(node, scope, options);
          case 'ArrayPattern':
              return ArrayPattern$1(node, scope, options);
          case 'RestElement':
              return RestElement$1(node, scope, options);
          case 'AssignmentPattern':
              return AssignmentPattern$1(node, scope, options);
          default:
              throw new SyntaxError('Unexpected token');
      }
  }
  function createFunc(node, scope, options = {}) {
      var _a;
      if (node.generator || node.async) {
          return createFunc$1(node, scope, options);
      }
      const { superClass, construct } = options;
      const params = node.params;
      const tmpFunc = function (...args) {
          const subScope = new Scope(scope, true);
          if (node.type !== 'ArrowFunctionExpression') {
              subScope.const('this', this);
              subScope.let('arguments', arguments);
              subScope.const(NEWTARGET, new.target);
              if (construct) {
                  construct(this);
              }
              if (superClass) {
                  subScope.const(SUPER, superClass);
                  if (construct)
                      subScope.let(SUPERCALL, false);
              }
          }
          for (let i = 0; i < params.length; i++) {
              const param = params[i];
              if (param.type === 'Identifier') {
                  subScope.var(param.name, args[i]);
              }
              else if (param.type === 'RestElement') {
                  RestElement$1(param, subScope, { kind: 'var', feed: args.slice(i) });
              }
              else {
                  pattern(param, subScope, { kind: 'var', feed: args[i] });
              }
          }
          let result;
          if (node.body.type === 'BlockStatement') {
              hoist(node.body, subScope);
              result = BlockStatement$1(node.body, subScope, {
                  invasived: true,
                  hoisted: true
              });
          }
          else {
              result = evaluate$1(node.body, subScope);
              if (node.type === 'ArrowFunctionExpression') {
                  RETURN.RES = result;
                  result = RETURN;
              }
          }
          if (result === RETURN) {
              return result.RES;
          }
      };
      let func = tmpFunc;
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
      const source = (_a = node.loc) === null || _a === void 0 ? void 0 : _a.source;
      if (source) {
          define(func, 'toString', {
              value: () => source.substring(node.start, node.end),
              configurable: true
          });
      }
      return func;
  }
  function createClass(node, scope) {
      const superClass = evaluate$1(node.superClass, scope);
      const methodBody = node.body.body;
      const construct = function (object) {
          for (let i = 0; i < methodBody.length; i++) {
              const def = methodBody[i];
              if (def.type === 'PropertyDefinition' && !def.static) {
                  PropertyDefinition$1(def, scope, { klass: object, superClass });
              }
          }
      };
      let klass = function () {
          construct(this);
          if (superClass) {
              superClass.apply(this);
          }
      };
      for (let i = 0; i < methodBody.length; i++) {
          const method = methodBody[i];
          if (method.type === 'MethodDefinition' && method.kind === 'constructor') {
              klass = createFunc(method.value, scope, { superClass, construct });
              break;
          }
      }
      if (superClass) {
          inherits(klass, superClass);
      }
      ClassBody$1(node.body, scope, { klass, superClass });
      define(klass, CLSCTOR, { value: true });
      define(klass, 'name', {
          value: node.id && node.id.name || '',
          configurable: true
      });
      return klass;
  }
  function ForXHandler(node, scope, options) {
      const { value } = options;
      const left = node.left;
      const subScope = new Scope(scope);
      if (left.type === 'VariableDeclaration') {
          VariableDeclaration$1(left, subScope, { feed: value });
      }
      else if (left.type === 'Identifier') {
          const variable = Identifier$1(left, scope, { getVar: true });
          variable.set(value);
      }
      else {
          pattern(left, scope, { feed: value });
      }
      let result;
      if (node.body.type === 'BlockStatement') {
          result = BlockStatement$1(node.body, subScope, { invasived: true });
      }
      else {
          result = evaluate$1(node.body, subScope);
      }
      return result;
  }

  const latestVer = 15;
  class Sval {
      constructor(options = {}) {
          this.options = { ecmaVersion: 'latest' };
          this.scope = new Scope(null, true);
          this.exports = {};
          let { ecmaVer = 'latest', sandBox = true, sourceType = 'script' } = options;
          if (typeof ecmaVer === 'number') {
              ecmaVer -= ecmaVer < 2015 ? 0 : 2009;
          }
          if (ecmaVer !== 'latest' && ecmaVer !== 3 && (ecmaVer < 5 || ecmaVer > latestVer)) {
              throw new Error(`unsupported ecmaVer`);
          }
          this.options.ecmaVersion = ecmaVer;
          this.options.sourceType = sourceType;
          if (sandBox) {
              const win = createSandBox();
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
      import(nameOrModules, mod) {
          if (typeof nameOrModules === 'string') {
              nameOrModules = { [nameOrModules]: mod };
          }
          if (typeof nameOrModules !== 'object')
              return;
          const names = getOwnNames(nameOrModules);
          for (let i = 0; i < names.length; i++) {
              const name = names[i];
              const modName = this.options.sourceType === 'module' ? IMPORT + name : name;
              this.scope.var(modName, nameOrModules[name]);
          }
      }
      parse(code, parser) {
          if (typeof parser === 'function') {
              return parser(code, assign({}, this.options));
          }
          return acorn.parse(code, this.options);
      }
      run(code) {
          const ast = typeof code === 'string' ? acorn.parse(code, this.options) : code;
          hoist(ast, this.scope);
          evaluate$1(ast, this.scope);
      }
  }
  Sval.version = version;

  return Sval;

}));
