var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// src/share/util.ts
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
    const descriptor = getOwnPropertyDescriptor(obj, key);
    const value = typeof descriptor !== "undefined" && typeof descriptor.writable === "undefined" && typeof descriptor[method] === "function" && descriptor[method];
    if (value) {
      return value;
    } else {
      obj = getProto(obj);
    }
  }
}
function getGetter(obj, key) {
  return getGetterOrSetter("get", obj, key);
}
function getSetter(obj, key) {
  return getGetterOrSetter("set", obj, key);
}
var create = Object.create;
function inherits(subClass, superClass) {
  setProto(subClass, superClass);
  subClass.prototype = create(superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true
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
var assign = Object.assign || _assign;
var names = [];
var globalObj = create(null);
try {
  if (!window.Object)
    throw 0;
  names = getOwnNames(globalObj = window).filter((n) => n !== "webkitStorageInfo");
} catch (err) {
  try {
    if (!global.Object)
      throw 0;
    names = getOwnNames(globalObj = global).filter((n) => n !== "GLOBAL" && n !== "root");
  } catch (err2) {
    try {
      globalObj.Object = Object;
    } catch (err3) {
    }
    try {
      globalObj.Function = Function;
    } catch (err3) {
    }
    try {
      globalObj.Array = Array;
    } catch (err3) {
    }
    try {
      globalObj.Number = Number;
    } catch (err3) {
    }
    try {
      globalObj.parseFloat = parseFloat;
    } catch (err3) {
    }
    try {
      globalObj.parseInt = parseInt;
    } catch (err3) {
    }
    try {
      globalObj.Infinity = Infinity;
    } catch (err3) {
    }
    try {
      globalObj.NaN = NaN;
    } catch (err3) {
    }
    try {
      globalObj.undefined = void 0;
    } catch (err3) {
    }
    try {
      globalObj.Boolean = Boolean;
    } catch (err3) {
    }
    try {
      globalObj.String = String;
    } catch (err3) {
    }
    try {
      globalObj.Symbol = Symbol;
    } catch (err3) {
    }
    try {
      globalObj.Date = Date;
    } catch (err3) {
    }
    try {
      globalObj.Promise = Promise;
    } catch (err3) {
    }
    try {
      globalObj.RegExp = RegExp;
    } catch (err3) {
    }
    try {
      globalObj.Error = Error;
    } catch (err3) {
    }
    try {
      globalObj.EvalError = EvalError;
    } catch (err3) {
    }
    try {
      globalObj.RangeError = RangeError;
    } catch (err3) {
    }
    try {
      globalObj.ReferenceError = ReferenceError;
    } catch (err3) {
    }
    try {
      globalObj.SyntaxError = SyntaxError;
    } catch (err3) {
    }
    try {
      globalObj.TypeError = TypeError;
    } catch (err3) {
    }
    try {
      globalObj.URIError = URIError;
    } catch (err3) {
    }
    try {
      globalObj.JSON = JSON;
    } catch (err3) {
    }
    try {
      globalObj.Math = Math;
    } catch (err3) {
    }
    try {
      globalObj.console = console;
    } catch (err3) {
    }
    try {
      globalObj.Intl = Intl;
    } catch (err3) {
    }
    try {
      globalObj.ArrayBuffer = ArrayBuffer;
    } catch (err3) {
    }
    try {
      globalObj.Uint8Array = Uint8Array;
    } catch (err3) {
    }
    try {
      globalObj.Int8Array = Int8Array;
    } catch (err3) {
    }
    try {
      globalObj.Uint16Array = Uint16Array;
    } catch (err3) {
    }
    try {
      globalObj.Int16Array = Int16Array;
    } catch (err3) {
    }
    try {
      globalObj.Uint32Array = Uint32Array;
    } catch (err3) {
    }
    try {
      globalObj.Int32Array = Int32Array;
    } catch (err3) {
    }
    try {
      globalObj.Float32Array = Float32Array;
    } catch (err3) {
    }
    try {
      globalObj.Float64Array = Float64Array;
    } catch (err3) {
    }
    try {
      globalObj.Uint8ClampedArray = Uint8ClampedArray;
    } catch (err3) {
    }
    try {
      globalObj.DataView = DataView;
    } catch (err3) {
    }
    try {
      globalObj.Map = Map;
    } catch (err3) {
    }
    try {
      globalObj.Set = Set;
    } catch (err3) {
    }
    try {
      globalObj.WeakMap = WeakMap;
    } catch (err3) {
    }
    try {
      globalObj.WeakSet = WeakSet;
    } catch (err3) {
    }
    try {
      globalObj.Proxy = Proxy;
    } catch (err3) {
    }
    try {
      globalObj.Reflect = Reflect;
    } catch (err3) {
    }
    try {
      globalObj.decodeURI = decodeURI;
    } catch (err3) {
    }
    try {
      globalObj.decodeURIComponent = decodeURIComponent;
    } catch (err3) {
    }
    try {
      globalObj.encodeURI = encodeURI;
    } catch (err3) {
    }
    try {
      globalObj.encodeURIComponent = encodeURIComponent;
    } catch (err3) {
    }
    try {
      globalObj.escape = escape;
    } catch (err3) {
    }
    try {
      globalObj.unescape = unescape;
    } catch (err3) {
    }
    try {
      globalObj.eval = eval;
    } catch (err3) {
    }
    try {
      globalObj.isFinite = isFinite;
    } catch (err3) {
    }
    try {
      globalObj.isNaN = isNaN;
    } catch (err3) {
    }
    try {
      globalObj.SharedArrayBuffer = SharedArrayBuffer;
    } catch (err3) {
    }
    try {
      globalObj.Atomics = Atomics;
    } catch (err3) {
    }
    try {
      globalObj.WebAssembly = WebAssembly;
    } catch (err3) {
    }
    try {
      globalObj.clearInterval = clearInterval;
    } catch (err3) {
    }
    try {
      globalObj.clearTimeout = clearTimeout;
    } catch (err3) {
    }
    try {
      globalObj.setInterval = setInterval;
    } catch (err3) {
    }
    try {
      globalObj.setTimeout = setTimeout;
    } catch (err3) {
    }
    try {
      globalObj.crypto = crypto;
    } catch (err3) {
    }
    names = getOwnNames(globalObj);
  }
}
if (globalObj.Symbol) {
  !globalObj.Symbol.iterator && (globalObj.Symbol.iterator = createSymbol("iterator"));
  !globalObj.Symbol.asyncIterator && (globalObj.Symbol.asyncIterator = createSymbol("asynciterator"));
}
var win = create({});
for (let i = 0; i < names.length; i++) {
  const name = names[i];
  try {
    win[name] = globalObj[name];
  } catch (err) {
  }
}
var WINDOW = createSymbol("window");
function createSandBox() {
  return assign(create({ [WINDOW]: globalObj }), win);
}
function createSymbol(key) {
  return key + Math.random().toString(36).substring(2);
}
function getAsyncIterator(obj) {
  let iterator;
  if (typeof Symbol === "function") {
    iterator = obj[Symbol.asyncIterator];
    !iterator && (iterator = obj[Symbol.iterator]);
  }
  if (iterator) {
    return iterator.call(obj);
  } else if (typeof obj.next === "function") {
    return obj;
  } else {
    let i = 0;
    return {
      next() {
        if (obj && i >= obj.length)
          obj = void 0;
        return { value: obj && obj[i++], done: !obj };
      }
    };
  }
}

// package.json
var version = "0.4.8";

// src/index.ts
import { parse } from "acorn";

// src/share/const.ts
var AWAIT = { RES: void 0 };
var RETURN = { RES: void 0 };
var CONTINUE = createSymbol("continue");
var BREAK = createSymbol("break");
var SUPER = createSymbol("super");
var SUPERCALL = createSymbol("supercall");
var NOCTOR = createSymbol("noctor");
var CLSCTOR = createSymbol("clsctor");
var NEWTARGET = createSymbol("newtarget");
var NOINIT = createSymbol("noinit");
var DEADZONE = createSymbol("deadzone");

// src/scope/variable.ts
var Var = class {
  kind;
  value;
  constructor(kind, value) {
    this.kind = kind;
    this.value = value;
  }
  get() {
    return this.value;
  }
  set(value) {
    if (this.kind === "const") {
      throw new TypeError("Assignment to constant variable");
    } else {
      return this.value = value;
    }
  }
};
var Prop = class {
  object;
  property;
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
};

// src/scope/index.ts
var Scope = class {
  parent;
  isolated;
  context = create(null);
  constructor(parent = null, isolated = false) {
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
  clone() {
    const cloneScope = new Scope(this.parent, this.isolated);
    for (const name in this.context) {
      const variable = this.context[name];
      cloneScope[variable.kind](name, variable.get());
    }
    return cloneScope;
  }
  find(name) {
    if (this.context[name]) {
      return this.context[name];
    } else if (this.parent) {
      return this.parent.find(name);
    } else {
      const win2 = this.global().find("window").get();
      if (name in win2) {
        return new Prop(win2, name);
      } else {
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
      scope.context[name] = new Var("var", value === NOINIT ? void 0 : value);
    } else {
      if (variable.kind === "var") {
        if (value !== NOINIT) {
          variable.set(value);
        }
      } else {
        throw new SyntaxError(`Identifier '${name}' has already been declared`);
      }
    }
    if (!scope.parent) {
      const win2 = scope.find("window").get();
      if (value !== NOINIT) {
        define(win2, name, { value, writable: true, enumerable: true });
      }
    }
  }
  let(name, value) {
    const variable = this.context[name];
    if (!variable || variable.get() === DEADZONE) {
      this.context[name] = new Var("let", value);
    } else {
      throw new SyntaxError(`Identifier '${name}' has already been declared`);
    }
  }
  const(name, value) {
    const variable = this.context[name];
    if (!variable || variable.get() === DEADZONE) {
      this.context[name] = new Var("const", value);
    } else {
      throw new SyntaxError(`Identifier '${name}' has already been declared`);
    }
  }
  func(name, value) {
    const variable = this.context[name];
    if (!variable || variable.kind === "var") {
      this.context[name] = new Var("var", value);
    } else {
      throw new SyntaxError(`Identifier '${name}' has already been declared`);
    }
  }
};

// src/evaluate_n/declaration.ts
var declaration_exports = {};
__export(declaration_exports, {
  ClassBody: () => ClassBody,
  ClassDeclaration: () => ClassDeclaration,
  FunctionDeclaration: () => FunctionDeclaration,
  MethodDefinition: () => MethodDefinition,
  VariableDeclaration: () => VariableDeclaration,
  VariableDeclarator: () => VariableDeclarator
});

// src/evaluate_n/expression.ts
var expression_exports = {};
__export(expression_exports, {
  ArrayExpression: () => ArrayExpression,
  ArrowFunctionExpression: () => ArrowFunctionExpression,
  AssignmentExpression: () => AssignmentExpression,
  BinaryExpression: () => BinaryExpression,
  CallExpression: () => CallExpression,
  ClassExpression: () => ClassExpression,
  ConditionalExpression: () => ConditionalExpression,
  FunctionExpression: () => FunctionExpression,
  LogicalExpression: () => LogicalExpression,
  MemberExpression: () => MemberExpression,
  MetaProperty: () => MetaProperty,
  NewExpression: () => NewExpression,
  ObjectExpression: () => ObjectExpression,
  SequenceExpression: () => SequenceExpression,
  SpreadElement: () => SpreadElement,
  Super: () => Super,
  TaggedTemplateExpression: () => TaggedTemplateExpression,
  TemplateElement: () => TemplateElement,
  TemplateLiteral: () => TemplateLiteral,
  ThisExpression: () => ThisExpression,
  UnaryExpression: () => UnaryExpression,
  UpdateExpression: () => UpdateExpression
});

// src/evaluate_n/identifier.ts
var identifier_exports = {};
__export(identifier_exports, {
  Identifier: () => Identifier
});
function Identifier(node, scope, options = {}) {
  const { getVar = false, throwErr = true } = options;
  if (node.name === "undefined") {
    return void 0;
  }
  const variable = scope.find(node.name);
  if (variable) {
    if (getVar) {
      return variable;
    } else {
      const value = variable.get();
      if (value === DEADZONE) {
        throw new ReferenceError(`${node.name} is not defined`);
      } else {
        return value;
      }
    }
  } else if (throwErr) {
    throw new ReferenceError(`${node.name} is not defined`);
  } else {
    return void 0;
  }
}

// src/evaluate_n/literal.ts
var literal_exports = {};
__export(literal_exports, {
  Literal: () => Literal
});
function Literal(node, scope) {
  return node.value;
}

// src/evaluate_n/expression.ts
function ThisExpression(node, scope) {
  const superCall = scope.find(SUPERCALL);
  if (superCall && !superCall.get()) {
    throw new ReferenceError("Must call super constructor in derived class before accessing 'this' or returning from derived constructor");
  } else {
    return scope.find("this").get();
  }
}
function ArrayExpression(node, scope) {
  let results = [];
  for (let i = 0; i < node.elements.length; i++) {
    const item = node.elements[i];
    if (item.type === "SpreadElement") {
      results = results.concat(SpreadElement(item, scope));
    } else {
      results.push(evaluate(item, scope));
    }
  }
  return results;
}
function ObjectExpression(node, scope) {
  const object = {};
  for (let i = 0; i < node.properties.length; i++) {
    const property = node.properties[i];
    if (property.type === "SpreadElement") {
      assign(object, SpreadElement(property, scope));
    } else if (property.type === "Property") {
      let key;
      const propKey = property.key;
      if (property.computed) {
        key = evaluate(propKey, scope);
      } else {
        if (propKey.type === "Identifier") {
          key = propKey.name;
        } else {
          key = "" + Literal(propKey, scope);
        }
      }
      const value = evaluate(property.value, scope);
      const propKind = property.kind;
      if (propKind === "init") {
        object[key] = value;
      } else if (propKind === "get") {
        const oriDptor = getDptor(object, key);
        define(object, key, {
          get: value,
          set: oriDptor && oriDptor.set,
          enumerable: true,
          configurable: true
        });
      } else {
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
function FunctionExpression(node, scope) {
  if (node.id && node.id.name) {
    const tmpScope = new Scope(scope);
    const func = createFunc(node, tmpScope);
    tmpScope.const(node.id.name, func);
    return func;
  } else {
    return createFunc(node, scope);
  }
}
function UnaryExpression(node, scope) {
  const arg = node.argument;
  switch (node.operator) {
    case "+":
      return +evaluate(arg, scope);
    case "-":
      return -evaluate(arg, scope);
    case "!":
      return !evaluate(arg, scope);
    case "~":
      return ~evaluate(arg, scope);
    case "void":
      return void evaluate(arg, scope);
    case "typeof":
      if (arg.type === "Identifier") {
        return typeof Identifier(arg, scope, { throwErr: false });
      } else {
        return typeof evaluate(arg, scope);
      }
    case "delete":
      if (arg.type === "MemberExpression") {
        const variable = MemberExpression(arg, scope, { getVar: true });
        return variable.del();
      } else if (arg.type === "Identifier") {
        throw new SyntaxError("Delete of an unqualified identifier in strict mode");
      } else {
        evaluate(arg, scope);
        return true;
      }
    default:
      throw new SyntaxError(`Unexpected token ${node.operator}`);
  }
}
function UpdateExpression(node, scope) {
  const arg = node.argument;
  let variable;
  if (arg.type === "Identifier") {
    variable = Identifier(arg, scope, { getVar: true });
  } else if (arg.type === "MemberExpression") {
    variable = MemberExpression(arg, scope, { getVar: true });
  } else {
    throw new SyntaxError("Unexpected token");
  }
  const value = variable.get();
  if (node.operator === "++") {
    variable.set(value + 1);
    return node.prefix ? variable.get() : value;
  } else if (node.operator === "--") {
    variable.set(value - 1);
    return node.prefix ? variable.get() : value;
  } else {
    throw new SyntaxError(`Unexpected token ${node.operator}`);
  }
}
function BinaryExpression(node, scope) {
  const left = evaluate(node.left, scope);
  const right = evaluate(node.right, scope);
  switch (node.operator) {
    case "==":
      return left == right;
    case "!=":
      return left != right;
    case "===":
      return left === right;
    case "!==":
      return left !== right;
    case "<":
      return left < right;
    case "<=":
      return left <= right;
    case ">":
      return left > right;
    case ">=":
      return left >= right;
    case "<<":
      return left << right;
    case ">>":
      return left >> right;
    case ">>>":
      return left >>> right;
    case "+":
      return left + right;
    case "-":
      return left - right;
    case "*":
      return left * right;
    case "**":
      return left ** right;
    case "/":
      return left / right;
    case "%":
      return left % right;
    case "|":
      return left | right;
    case "^":
      return left ^ right;
    case "&":
      return left & right;
    case "in":
      return left in right;
    case "instanceof":
      return left instanceof right;
    default:
      throw new SyntaxError(`Unexpected token ${node.operator}`);
  }
}
function AssignmentExpression(node, scope) {
  const value = evaluate(node.right, scope);
  const left = node.left;
  let variable;
  if (left.type === "Identifier") {
    variable = Identifier(left, scope, { getVar: true, throwErr: false });
    if (!variable) {
      const win2 = scope.global().find("window").get();
      variable = new Prop(win2, left.name);
    }
  } else if (left.type === "MemberExpression") {
    variable = MemberExpression(left, scope, { getVar: true });
  } else {
    return pattern(left, scope, { feed: value });
  }
  switch (node.operator) {
    case "=":
      variable.set(value);
      return variable.get();
    case "+=":
      variable.set(variable.get() + value);
      return variable.get();
    case "-=":
      variable.set(variable.get() - value);
      return variable.get();
    case "*=":
      variable.set(variable.get() * value);
      return variable.get();
    case "/=":
      variable.set(variable.get() / value);
      return variable.get();
    case "%=":
      variable.set(variable.get() % value);
      return variable.get();
    case "**=":
      variable.set(variable.get() ** value);
      return variable.get();
    case "<<=":
      variable.set(variable.get() << value);
      return variable.get();
    case ">>=":
      variable.set(variable.get() >> value);
      return variable.get();
    case ">>>=":
      variable.set(variable.get() >>> value);
      return variable.get();
    case "|=":
      variable.set(variable.get() | value);
      return variable.get();
    case "^=":
      variable.set(variable.get() ^ value);
      return variable.get();
    case "&=":
      variable.set(variable.get() & value);
      return variable.get();
    default:
      throw new SyntaxError(`Unexpected token ${node.operator}`);
  }
}
function LogicalExpression(node, scope) {
  switch (node.operator) {
    case "||":
      return evaluate(node.left, scope) || evaluate(node.right, scope);
    case "&&":
      return evaluate(node.left, scope) && evaluate(node.right, scope);
    default:
      throw new SyntaxError(`Unexpected token ${node.operator}`);
  }
}
function MemberExpression(node, scope, options = {}) {
  const { getObj = false, getVar = false } = options;
  let object;
  if (node.object.type === "Super") {
    object = Super(node.object, scope, { getProto: true });
  } else {
    object = evaluate(node.object, scope);
  }
  if (getObj)
    return object;
  let key;
  if (node.computed) {
    key = evaluate(node.property, scope);
  } else {
    key = node.property.name;
  }
  if (getVar) {
    const setter = getSetter(object, key);
    if (node.object.type === "Super" && setter) {
      const thisObject = scope.find("this").get();
      const privateKey = createSymbol(key);
      define(thisObject, privateKey, { set: setter });
      return new Prop(thisObject, privateKey);
    } else {
      return new Prop(object, key);
    }
  } else {
    const getter = getGetter(object, key);
    if (node.object.type === "Super" && getter) {
      const thisObject = scope.find("this").get();
      return getter.call(thisObject);
    } else {
      return object[key];
    }
  }
}
function ConditionalExpression(node, scope) {
  return evaluate(node.test, scope) ? evaluate(node.consequent, scope) : evaluate(node.alternate, scope);
}
function CallExpression(node, scope) {
  let func;
  let object;
  if (node.callee.type === "MemberExpression") {
    object = MemberExpression(node.callee, scope, { getObj: true });
    let key;
    if (node.callee.computed) {
      key = evaluate(node.callee.property, scope);
    } else {
      key = node.callee.property.name;
    }
    if (node.callee.object.type === "Super") {
      const thisObject = scope.find("this").get();
      func = object[key].bind(thisObject);
    } else {
      func = object[key];
    }
    if (typeof func !== "function") {
      throw new TypeError(`${key} is not a function`);
    } else if (func[CLSCTOR]) {
      throw new TypeError(`Class constructor ${key} cannot be invoked without 'new'`);
    }
  } else {
    object = scope.find("this").get();
    func = evaluate(node.callee, scope);
    if (typeof func !== "function" || node.callee.type !== "Super" && func[CLSCTOR]) {
      let name;
      if (node.callee.type === "Identifier") {
        name = node.callee.name;
      } else {
        try {
          name = JSON.stringify(func);
        } catch (err) {
          name = "" + func;
        }
      }
      if (typeof func !== "function") {
        throw new TypeError(`${name} is not a function`);
      } else {
        throw new TypeError(`Class constructor ${name} cannot be invoked without 'new'`);
      }
    }
  }
  let args = [];
  for (let i = 0; i < node.arguments.length; i++) {
    const arg = node.arguments[i];
    if (arg.type === "SpreadElement") {
      args = args.concat(SpreadElement(arg, scope));
    } else {
      args.push(evaluate(arg, scope));
    }
  }
  if (node.callee.type === "Super") {
    const superCall = scope.find(SUPERCALL);
    if (superCall.get()) {
      throw new ReferenceError("Super constructor may only be called once");
    } else {
      scope.find(SUPERCALL).set(true);
    }
  }
  if (object && object[WINDOW] && func.toString().indexOf("[native code]") !== -1) {
    return func.apply(object[WINDOW], args);
  }
  return func.apply(object, args);
}
function NewExpression(node, scope) {
  const constructor = evaluate(node.callee, scope);
  if (typeof constructor !== "function") {
    let name;
    if (node.callee.type === "Identifier") {
      name = node.callee.name;
    } else {
      try {
        name = JSON.stringify(constructor);
      } catch (err) {
        name = "" + constructor;
      }
    }
    throw new TypeError(`${name} is not a constructor`);
  } else if (constructor[NOCTOR]) {
    throw new TypeError(`${constructor.name || "(intermediate value)"} is not a constructor`);
  }
  let args = [];
  for (let i = 0; i < node.arguments.length; i++) {
    const arg = node.arguments[i];
    if (arg.type === "SpreadElement") {
      args = args.concat(SpreadElement(arg, scope));
    } else {
      args.push(evaluate(arg, scope));
    }
  }
  return new constructor(...args);
}
function MetaProperty(node, scope) {
  return scope.find(NEWTARGET).get();
}
function SequenceExpression(node, scope) {
  let result;
  for (let i = 0; i < node.expressions.length; i++) {
    result = evaluate(node.expressions[i], scope);
  }
  return result;
}
function ArrowFunctionExpression(node, scope) {
  return createFunc(node, scope);
}
function TemplateLiteral(node, scope) {
  const quasis = node.quasis.slice();
  const expressions = node.expressions.slice();
  let result = "";
  let temEl;
  let expr;
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
  const tagFunc = evaluate(node.tag, scope);
  const quasis = node.quasi.quasis;
  const str = quasis.map((v) => v.value.cooked);
  const raw = quasis.map((v) => v.value.raw);
  define(str, "raw", {
    value: freeze(raw)
  });
  const expressions = node.quasi.expressions;
  const args = [];
  if (expressions) {
    for (let i = 0; i < expressions.length; i++) {
      args.push(evaluate(expressions[i], scope));
    }
  }
  return tagFunc(freeze(str), ...args);
}
function TemplateElement(node, scope) {
  return node.value.raw;
}
function ClassExpression(node, scope) {
  if (node.id && node.id.name) {
    const tmpScope = new Scope(scope);
    const klass = createClass(node, tmpScope);
    tmpScope.const(node.id.name, klass);
    return klass;
  } else {
    return createClass(node, scope);
  }
}
function Super(node, scope, options = {}) {
  const { getProto: getProto2 = false } = options;
  const superClass = scope.find(SUPER).get();
  return getProto2 ? superClass.prototype : superClass;
}
function SpreadElement(node, scope) {
  return evaluate(node.argument, scope);
}

// src/evaluate_n/statement.ts
var statement_exports = {};
__export(statement_exports, {
  BlockStatement: () => BlockStatement,
  BreakStatement: () => BreakStatement,
  CatchClause: () => CatchClause,
  ContinueStatement: () => ContinueStatement,
  DebuggerStatement: () => DebuggerStatement,
  DoWhileStatement: () => DoWhileStatement,
  EmptyStatement: () => EmptyStatement,
  ExpressionStatement: () => ExpressionStatement,
  ForInStatement: () => ForInStatement,
  ForOfStatement: () => ForOfStatement,
  ForStatement: () => ForStatement,
  IfStatement: () => IfStatement,
  ReturnStatement: () => ReturnStatement,
  SwitchCase: () => SwitchCase,
  SwitchStatement: () => SwitchStatement,
  ThrowStatement: () => ThrowStatement,
  TryStatement: () => TryStatement,
  WhileStatement: () => WhileStatement
});
function ExpressionStatement(node, scope) {
  evaluate(node.expression, scope);
}
function BlockStatement(block, scope, options = {}) {
  const {
    invasived = false,
    hoisted = false
  } = options;
  const subScope = invasived ? scope : new Scope(scope);
  if (!hoisted) {
    hoist(block, subScope, { onlyBlock: true });
  }
  for (let i = 0; i < block.body.length; i++) {
    const result = evaluate(block.body[i], subScope);
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
  RETURN.RES = node.argument ? evaluate(node.argument, scope) : void 0;
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
  } else {
    return evaluate(node.alternate, scope);
  }
}
function SwitchStatement(node, scope) {
  const discriminant = evaluate(node.discriminant, scope);
  let matched = false;
  for (let i = 0; i < node.cases.length; i++) {
    const eachCase = node.cases[i];
    if (!matched && (!eachCase.test || evaluate(eachCase.test, scope) === discriminant)) {
      matched = true;
    }
    if (matched) {
      const result = SwitchCase(eachCase, scope);
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
  for (let i = 0; i < node.consequent.length; i++) {
    const result = evaluate(node.consequent[i], scope);
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
  } catch (err) {
    if (node.handler) {
      const subScope = new Scope(scope);
      const param = node.handler.param;
      if (param) {
        if (param.type === "Identifier") {
          const name = param.name;
          subScope.var(name, err);
        } else {
          pattern(param, scope, { feed: err });
        }
      }
      return CatchClause(node.handler, subScope);
    } else {
      throw err;
    }
  } finally {
    if (node.finalizer) {
      const result = BlockStatement(node.finalizer, scope);
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
    const result = evaluate(node.body, scope);
    if (result === BREAK) {
      break;
    } else if (result === CONTINUE) {
      continue;
    } else if (result === RETURN) {
      return result;
    }
  }
}
function DoWhileStatement(node, scope) {
  do {
    const result = evaluate(node.body, scope);
    if (result === BREAK) {
      break;
    } else if (result === CONTINUE) {
      continue;
    } else if (result === RETURN) {
      return result;
    }
  } while (evaluate(node.test, scope));
}
function ForStatement(node, scope) {
  const forScope = new Scope(scope);
  for (evaluate(node.init, forScope); node.test ? evaluate(node.test, forScope) : true; evaluate(node.update, forScope)) {
    const subScope = new Scope(forScope);
    let result;
    if (node.body.type === "BlockStatement") {
      result = BlockStatement(node.body, subScope, { invasived: true });
    } else {
      result = evaluate(node.body, subScope);
    }
    if (result === BREAK) {
      break;
    } else if (result === CONTINUE) {
      continue;
    } else if (result === RETURN) {
      return result;
    }
  }
}
function ForInStatement(node, scope) {
  for (const value in evaluate(node.right, scope)) {
    const result = ForXHandler(node, scope, { value });
    if (result === BREAK) {
      break;
    } else if (result === CONTINUE) {
      continue;
    } else if (result === RETURN) {
      return result;
    }
  }
}
function ForOfStatement(node, scope) {
  const right = evaluate(node.right, scope);
  for (const value of right) {
    const result = ForXHandler(node, scope, { value });
    if (result === BREAK) {
      break;
    } else if (result === CONTINUE) {
      continue;
    } else if (result === RETURN) {
      return result;
    }
  }
}

// src/evaluate_n/pattern.ts
var pattern_exports = {};
__export(pattern_exports, {
  ArrayPattern: () => ArrayPattern,
  AssignmentPattern: () => AssignmentPattern,
  ObjectPattern: () => ObjectPattern,
  RestElement: () => RestElement
});
function ObjectPattern(node, scope, options = {}) {
  const { kind = "var", hoist: hoist3 = false, onlyBlock = false, feed = {} } = options;
  const fedKeys = [];
  for (let i = 0; i < node.properties.length; i++) {
    const property = node.properties[i];
    if (hoist3) {
      if (onlyBlock || kind === "var") {
        if (property.type === "Property") {
          const value = property.value;
          if (value.type === "Identifier") {
            scope[kind](value.name, onlyBlock ? DEADZONE : kind === "var" ? NOINIT : void 0);
          } else {
            pattern(value, scope, { kind, hoist: hoist3, onlyBlock });
          }
        } else {
          RestElement(property, scope, { kind, hoist: hoist3, onlyBlock });
        }
      }
    } else if (property.type === "Property") {
      let key;
      if (property.computed) {
        key = evaluate(property.key, scope);
      } else {
        key = property.key.name;
      }
      fedKeys.push(key);
      const value = property.value;
      if (value.type === "Identifier") {
        scope[kind](value.name, feed[key]);
      } else {
        pattern(value, scope, { kind, feed: feed[key] });
      }
    } else {
      const rest = assign({}, feed);
      for (let i2 = 0; i2 < fedKeys.length; i2++)
        delete rest[fedKeys[i2]];
      RestElement(property, scope, { kind, feed: rest });
    }
  }
}
function ArrayPattern(node, scope, options = {}) {
  const { kind, hoist: hoist3 = false, onlyBlock = false, feed = [] } = options;
  const result = [];
  for (let i = 0; i < node.elements.length; i++) {
    const element = node.elements[i];
    if (!element)
      continue;
    if (hoist3) {
      if (onlyBlock || kind === "var") {
        if (element.type === "Identifier") {
          scope[kind](element.name, onlyBlock ? DEADZONE : kind === "var" ? NOINIT : void 0);
        } else {
          pattern(element, scope, { kind, hoist: hoist3, onlyBlock });
        }
      }
    } else if (element.type === "Identifier") {
      if (kind) {
        scope[kind](element.name, feed[i]);
      } else {
        const variable = Identifier(element, scope, { getVar: true });
        variable.set(feed[i]);
        result.push(variable.get());
      }
    } else if (element.type === "RestElement") {
      RestElement(element, scope, { kind, feed: feed.slice(i) });
    } else {
      pattern(element, scope, { kind, feed: feed[i] });
    }
  }
  if (result.length) {
    return result;
  }
}
function RestElement(node, scope, options = {}) {
  const { kind, hoist: hoist3 = false, onlyBlock = false, feed = [] } = options;
  const arg = node.argument;
  if (hoist3) {
    if (onlyBlock || kind === "var") {
      if (arg.type === "Identifier") {
        scope[kind](arg.name, onlyBlock ? DEADZONE : kind === "var" ? NOINIT : void 0);
      } else {
        pattern(arg, scope, { kind, hoist: hoist3, onlyBlock });
      }
    }
  } else if (arg.type === "Identifier") {
    if (kind) {
      scope[kind](arg.name, feed);
    } else {
      const variable = Identifier(arg, scope, { getVar: true });
      variable.set(feed);
    }
  } else {
    pattern(arg, scope, { kind, feed });
  }
}
function AssignmentPattern(node, scope, options = {}) {
  const { kind = "var", hoist: hoist3 = false, onlyBlock = false, feed = evaluate(node.right, scope) } = options;
  const left = node.left;
  if (hoist3) {
    if (onlyBlock || kind === "var") {
      if (left.type === "Identifier") {
        scope[kind](left.name, onlyBlock ? DEADZONE : kind === "var" ? NOINIT : void 0);
      } else {
        pattern(left, scope, { kind, hoist: hoist3, onlyBlock });
      }
    }
  } else if (left.type === "Identifier") {
    scope[kind](left.name, feed);
  } else {
    pattern(left, scope, { kind, feed });
  }
}

// src/evaluate_n/program.ts
var program_exports = {};
__export(program_exports, {
  Program: () => Program
});
function Program(program, scope) {
  for (let i = 0; i < program.body.length; i++) {
    evaluate(program.body[i], scope);
  }
}

// src/evaluate_n/index.ts
var evaluateOps;
function evaluate(node, scope) {
  if (!node)
    return;
  if (!evaluateOps) {
    evaluateOps = assign(
      {},
      declaration_exports,
      expression_exports,
      identifier_exports,
      statement_exports,
      literal_exports,
      pattern_exports,
      program_exports
    );
  }
  const handler = evaluateOps[node.type];
  if (handler) {
    return handler(node, scope);
  } else {
    throw new Error(`${node.type} isn't implemented`);
  }
}

// src/evaluate_n/declaration.ts
function FunctionDeclaration(node, scope) {
  scope.func(node.id.name, createFunc(node, scope));
}
function VariableDeclaration(node, scope, options = {}) {
  for (let i = 0; i < node.declarations.length; i++) {
    VariableDeclarator(node.declarations[i], scope, assign({ kind: node.kind }, options));
  }
}
function VariableDeclarator(node, scope, options = {}) {
  const { kind = "var", hoist: hoist3 = false, onlyBlock = false, feed } = options;
  if (hoist3) {
    if (onlyBlock || kind === "var") {
      if (node.id.type === "Identifier") {
        scope[kind](node.id.name, onlyBlock ? DEADZONE : kind === "var" ? NOINIT : void 0);
      } else {
        pattern(node.id, scope, { kind, hoist: hoist3, onlyBlock });
      }
    }
  } else {
    const hasFeed = "feed" in options;
    const value = hasFeed ? feed : evaluate(node.init, scope);
    if (node.id.type === "Identifier") {
      const name = node.id.name;
      if (kind === "var" && !node.init && !hasFeed) {
        scope.var(name, NOINIT);
      } else {
        scope[kind](name, value);
      }
      if (node.init && ["ClassExpression", "FunctionExpression", "ArrowFunctionExpression"].indexOf(node.init.type) !== -1 && !value.name) {
        define(value, "name", {
          value: name,
          configurable: true
        });
      }
    } else {
      pattern(node.id, scope, { kind, feed: value });
    }
  }
}
function ClassDeclaration(node, scope) {
  scope.func(node.id.name, createClass(node, scope));
}
function ClassBody(node, scope, options = {}) {
  const { klass, superClass } = options;
  for (let i = 0; i < node.body.length; i++) {
    const n = node.body[i];
    if (n.type === "MethodDefinition") {
      MethodDefinition(n, scope, { klass, superClass });
    }
  }
}
function MethodDefinition(node, scope, options = {}) {
  const { klass, superClass } = options;
  let key;
  if (node.computed) {
    key = evaluate(node.key, scope);
  } else if (node.key.type === "Identifier") {
    key = node.key.name;
  } else {
    throw new SyntaxError("Unexpected token");
  }
  const obj = node.static ? klass : klass.prototype;
  const value = createFunc(node.value, scope, { superClass });
  switch (node.kind) {
    case "constructor":
      break;
    case "method":
      define(obj, key, {
        value,
        writable: true,
        configurable: true
      });
      break;
    case "get": {
      const oriDptor = getDptor(obj, key);
      define(obj, key, {
        get: value,
        set: oriDptor && oriDptor.set,
        configurable: true
      });
      break;
    }
    case "set": {
      const oriDptor = getDptor(obj, key);
      define(obj, key, {
        get: oriDptor && oriDptor.get,
        set: value,
        configurable: true
      });
      break;
    }
    default:
      throw new SyntaxError("Unexpected token");
  }
}

// src/evaluate/declaration.ts
var declaration_exports2 = {};
__export(declaration_exports2, {
  ClassBody: () => ClassBody2,
  ClassDeclaration: () => ClassDeclaration2,
  FunctionDeclaration: () => FunctionDeclaration2,
  MethodDefinition: () => MethodDefinition2,
  VariableDeclaration: () => VariableDeclaration2,
  VariableDeclarator: () => VariableDeclarator2
});

// src/evaluate/expression.ts
var expression_exports2 = {};
__export(expression_exports2, {
  ArrayExpression: () => ArrayExpression2,
  ArrowFunctionExpression: () => ArrowFunctionExpression2,
  AssignmentExpression: () => AssignmentExpression2,
  AwaitExpression: () => AwaitExpression,
  BinaryExpression: () => BinaryExpression2,
  CallExpression: () => CallExpression2,
  ClassExpression: () => ClassExpression2,
  ConditionalExpression: () => ConditionalExpression2,
  FunctionExpression: () => FunctionExpression2,
  LogicalExpression: () => LogicalExpression2,
  MemberExpression: () => MemberExpression2,
  MetaProperty: () => MetaProperty2,
  NewExpression: () => NewExpression2,
  ObjectExpression: () => ObjectExpression2,
  SequenceExpression: () => SequenceExpression2,
  SpreadElement: () => SpreadElement2,
  Super: () => Super2,
  TaggedTemplateExpression: () => TaggedTemplateExpression2,
  TemplateElement: () => TemplateElement2,
  TemplateLiteral: () => TemplateLiteral2,
  ThisExpression: () => ThisExpression2,
  UnaryExpression: () => UnaryExpression2,
  UpdateExpression: () => UpdateExpression2,
  YieldExpression: () => YieldExpression
});

// src/evaluate/identifier.ts
var identifier_exports2 = {};
__export(identifier_exports2, {
  Identifier: () => Identifier2
});
function* Identifier2(node, scope, options = {}) {
  const { getVar = false, throwErr = true } = options;
  if (node.name === "undefined") {
    return void 0;
  }
  const variable = scope.find(node.name);
  if (variable) {
    if (getVar) {
      return variable;
    } else {
      const value = variable.get();
      if (value === DEADZONE) {
        throw new ReferenceError(`${node.name} is not defined`);
      } else {
        return value;
      }
    }
  } else if (throwErr) {
    throw new ReferenceError(`${node.name} is not defined`);
  } else {
    return void 0;
  }
}

// src/evaluate/literal.ts
var literal_exports2 = {};
__export(literal_exports2, {
  Literal: () => Literal2
});
function* Literal2(node, scope) {
  return node.value;
}

// src/evaluate/expression.ts
function* ThisExpression2(node, scope) {
  const superCall = scope.find(SUPERCALL);
  if (superCall && !superCall.get()) {
    throw new ReferenceError("Must call super constructor in derived class before accessing 'this' or returning from derived constructor");
  } else {
    return scope.find("this").get();
  }
}
function* ArrayExpression2(node, scope) {
  let results = [];
  for (let i = 0; i < node.elements.length; i++) {
    const item = node.elements[i];
    if (item.type === "SpreadElement") {
      results = results.concat(yield* SpreadElement2(item, scope));
    } else {
      results.push(yield* evaluate2(item, scope));
    }
  }
  return results;
}
function* ObjectExpression2(node, scope) {
  const object = {};
  for (let i = 0; i < node.properties.length; i++) {
    const property = node.properties[i];
    if (property.type === "SpreadElement") {
      assign(object, yield* SpreadElement2(property, scope));
    } else if (property.type === "Property") {
      let key;
      const propKey = property.key;
      if (property.computed) {
        key = yield* evaluate2(propKey, scope);
      } else {
        if (propKey.type === "Identifier") {
          key = propKey.name;
        } else {
          key = "" + (yield* Literal2(propKey, scope));
        }
      }
      const value = yield* evaluate2(property.value, scope);
      const propKind = property.kind;
      if (propKind === "init") {
        object[key] = value;
      } else if (propKind === "get") {
        const oriDptor = getDptor(object, key);
        define(object, key, {
          get: value,
          set: oriDptor && oriDptor.set,
          enumerable: true,
          configurable: true
        });
      } else {
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
function* FunctionExpression2(node, scope) {
  if (node.id && node.id.name) {
    const tmpScope = new Scope(scope);
    const func = createFunc2(node, tmpScope);
    tmpScope.const(node.id.name, func);
    return func;
  } else {
    return createFunc2(node, scope);
  }
}
function* UnaryExpression2(node, scope) {
  const arg = node.argument;
  switch (node.operator) {
    case "+":
      return +(yield* evaluate2(arg, scope));
    case "-":
      return -(yield* evaluate2(arg, scope));
    case "!":
      return !(yield* evaluate2(arg, scope));
    case "~":
      return ~(yield* evaluate2(arg, scope));
    case "void":
      return void (yield* evaluate2(arg, scope));
    case "typeof":
      if (arg.type === "Identifier") {
        return typeof (yield* Identifier2(arg, scope, { throwErr: false }));
      } else {
        return typeof (yield* evaluate2(arg, scope));
      }
    case "delete":
      if (arg.type === "MemberExpression") {
        const variable = yield* MemberExpression2(arg, scope, { getVar: true });
        return variable.del();
      } else if (arg.type === "Identifier") {
        throw new SyntaxError("Delete of an unqualified identifier in strict mode");
      } else {
        yield* evaluate2(arg, scope);
        return true;
      }
    default:
      throw new SyntaxError(`Unexpected token ${node.operator}`);
  }
}
function* UpdateExpression2(node, scope) {
  const arg = node.argument;
  let variable;
  if (arg.type === "Identifier") {
    variable = yield* Identifier2(arg, scope, { getVar: true });
  } else if (arg.type === "MemberExpression") {
    variable = yield* MemberExpression2(arg, scope, { getVar: true });
  } else {
    throw new SyntaxError("Unexpected token");
  }
  const value = variable.get();
  if (node.operator === "++") {
    variable.set(value + 1);
    return node.prefix ? variable.get() : value;
  } else if (node.operator === "--") {
    variable.set(value - 1);
    return node.prefix ? variable.get() : value;
  } else {
    throw new SyntaxError(`Unexpected token ${node.operator}`);
  }
}
function* BinaryExpression2(node, scope) {
  const left = yield* evaluate2(node.left, scope);
  const right = yield* evaluate2(node.right, scope);
  switch (node.operator) {
    case "==":
      return left == right;
    case "!=":
      return left != right;
    case "===":
      return left === right;
    case "!==":
      return left !== right;
    case "<":
      return left < right;
    case "<=":
      return left <= right;
    case ">":
      return left > right;
    case ">=":
      return left >= right;
    case "<<":
      return left << right;
    case ">>":
      return left >> right;
    case ">>>":
      return left >>> right;
    case "+":
      return left + right;
    case "-":
      return left - right;
    case "*":
      return left * right;
    case "**":
      return left ** right;
    case "/":
      return left / right;
    case "%":
      return left % right;
    case "|":
      return left | right;
    case "^":
      return left ^ right;
    case "&":
      return left & right;
    case "in":
      return left in right;
    case "instanceof":
      return left instanceof right;
    default:
      throw new SyntaxError(`Unexpected token ${node.operator}`);
  }
}
function* AssignmentExpression2(node, scope) {
  const value = yield* evaluate2(node.right, scope);
  const left = node.left;
  let variable;
  if (left.type === "Identifier") {
    variable = yield* Identifier2(left, scope, { getVar: true, throwErr: false });
    if (!variable) {
      const win2 = scope.global().find("window").get();
      variable = new Prop(win2, left.name);
    }
  } else if (left.type === "MemberExpression") {
    variable = yield* MemberExpression2(left, scope, { getVar: true });
  } else {
    return yield* pattern2(left, scope, { feed: value });
  }
  switch (node.operator) {
    case "=":
      variable.set(value);
      return variable.get();
    case "+=":
      variable.set(variable.get() + value);
      return variable.get();
    case "-=":
      variable.set(variable.get() - value);
      return variable.get();
    case "*=":
      variable.set(variable.get() * value);
      return variable.get();
    case "/=":
      variable.set(variable.get() / value);
      return variable.get();
    case "%=":
      variable.set(variable.get() % value);
      return variable.get();
    case "**=":
      variable.set(variable.get() ** value);
      return variable.get();
    case "<<=":
      variable.set(variable.get() << value);
      return variable.get();
    case ">>=":
      variable.set(variable.get() >> value);
      return variable.get();
    case ">>>=":
      variable.set(variable.get() >>> value);
      return variable.get();
    case "|=":
      variable.set(variable.get() | value);
      return variable.get();
    case "^=":
      variable.set(variable.get() ^ value);
      return variable.get();
    case "&=":
      variable.set(variable.get() & value);
      return variable.get();
    default:
      throw new SyntaxError(`Unexpected token ${node.operator}`);
  }
}
function* LogicalExpression2(node, scope) {
  switch (node.operator) {
    case "||":
      return (yield* evaluate2(node.left, scope)) || (yield* evaluate2(node.right, scope));
    case "&&":
      return (yield* evaluate2(node.left, scope)) && (yield* evaluate2(node.right, scope));
    default:
      throw new SyntaxError(`Unexpected token ${node.operator}`);
  }
}
function* MemberExpression2(node, scope, options = {}) {
  const { getObj = false, getVar = false } = options;
  let object;
  if (node.object.type === "Super") {
    object = yield* Super2(node.object, scope, { getProto: true });
  } else {
    object = yield* evaluate2(node.object, scope);
  }
  if (getObj)
    return object;
  let key;
  if (node.computed) {
    key = yield* evaluate2(node.property, scope);
  } else {
    key = node.property.name;
  }
  if (getVar) {
    const setter = getSetter(object, key);
    if (node.object.type === "Super" && setter) {
      const thisObject = scope.find("this").get();
      const privateKey = createSymbol(key);
      define(thisObject, privateKey, { set: setter });
      return new Prop(thisObject, privateKey);
    } else {
      return new Prop(object, key);
    }
  } else {
    const getter = getGetter(object, key);
    if (node.object.type === "Super" && getter) {
      const thisObject = scope.find("this").get();
      return getter.call(thisObject);
    } else {
      return object[key];
    }
  }
}
function* ConditionalExpression2(node, scope) {
  return (yield* evaluate2(node.test, scope)) ? yield* evaluate2(node.consequent, scope) : yield* evaluate2(node.alternate, scope);
}
function* CallExpression2(node, scope) {
  let func;
  let object;
  if (node.callee.type === "MemberExpression") {
    object = yield* MemberExpression2(node.callee, scope, { getObj: true });
    let key;
    if (node.callee.computed) {
      key = yield* evaluate2(node.callee.property, scope);
    } else {
      key = node.callee.property.name;
    }
    if (node.callee.object.type === "Super") {
      const thisObject = scope.find("this").get();
      func = object[key].bind(thisObject);
    } else {
      func = object[key];
    }
    if (typeof func !== "function") {
      throw new TypeError(`${key} is not a function`);
    } else if (func[CLSCTOR]) {
      throw new TypeError(`Class constructor ${key} cannot be invoked without 'new'`);
    }
  } else {
    object = scope.find("this").get();
    func = yield* evaluate2(node.callee, scope);
    if (typeof func !== "function" || node.callee.type !== "Super" && func[CLSCTOR]) {
      let name;
      if (node.callee.type === "Identifier") {
        name = node.callee.name;
      } else {
        try {
          name = JSON.stringify(func);
        } catch (err) {
          name = "" + func;
        }
      }
      if (typeof func !== "function") {
        throw new TypeError(`${name} is not a function`);
      } else {
        throw new TypeError(`Class constructor ${name} cannot be invoked without 'new'`);
      }
    }
  }
  let args = [];
  for (let i = 0; i < node.arguments.length; i++) {
    const arg = node.arguments[i];
    if (arg.type === "SpreadElement") {
      args = args.concat(yield* SpreadElement2(arg, scope));
    } else {
      args.push(yield* evaluate2(arg, scope));
    }
  }
  if (node.callee.type === "Super") {
    const superCall = scope.find(SUPERCALL);
    if (superCall.get()) {
      throw new ReferenceError("Super constructor may only be called once");
    } else {
      scope.find(SUPERCALL).set(true);
    }
  }
  if (object && object[WINDOW] && func.toString().indexOf("[native code]") !== -1) {
    return func.apply(object[WINDOW], args);
  }
  return func.apply(object, args);
}
function* NewExpression2(node, scope) {
  const constructor = yield* evaluate2(node.callee, scope);
  if (typeof constructor !== "function") {
    let name;
    if (node.callee.type === "Identifier") {
      name = node.callee.name;
    } else {
      try {
        name = JSON.stringify(constructor);
      } catch (err) {
        name = "" + constructor;
      }
    }
    throw new TypeError(`${name} is not a constructor`);
  } else if (constructor[NOCTOR]) {
    throw new TypeError(`${constructor.name || "(intermediate value)"} is not a constructor`);
  }
  let args = [];
  for (let i = 0; i < node.arguments.length; i++) {
    const arg = node.arguments[i];
    if (arg.type === "SpreadElement") {
      args = args.concat(yield* SpreadElement2(arg, scope));
    } else {
      args.push(yield* evaluate2(arg, scope));
    }
  }
  return new constructor(...args);
}
function* MetaProperty2(node, scope) {
  return scope.find(NEWTARGET).get();
}
function* SequenceExpression2(node, scope) {
  let result;
  for (let i = 0; i < node.expressions.length; i++) {
    result = yield* evaluate2(node.expressions[i], scope);
  }
  return result;
}
function* ArrowFunctionExpression2(node, scope) {
  return createFunc2(node, scope);
}
function* TemplateLiteral2(node, scope) {
  const quasis = node.quasis.slice();
  const expressions = node.expressions.slice();
  let result = "";
  let temEl;
  let expr;
  while (temEl = quasis.shift()) {
    result += yield* TemplateElement2(temEl, scope);
    expr = expressions.shift();
    if (expr) {
      result += yield* evaluate2(expr, scope);
    }
  }
  return result;
}
function* TaggedTemplateExpression2(node, scope) {
  const tagFunc = yield* evaluate2(node.tag, scope);
  const quasis = node.quasi.quasis;
  const str = quasis.map((v) => v.value.cooked);
  const raw = quasis.map((v) => v.value.raw);
  define(str, "raw", {
    value: freeze(raw)
  });
  const expressions = node.quasi.expressions;
  const args = [];
  if (expressions) {
    for (let i = 0; i < expressions.length; i++) {
      args.push(yield* evaluate2(expressions[i], scope));
    }
  }
  return tagFunc(freeze(str), ...args);
}
function* TemplateElement2(node, scope) {
  return node.value.raw;
}
function* ClassExpression2(node, scope) {
  if (node.id && node.id.name) {
    const tmpScope = new Scope(scope);
    const klass = yield* createClass2(node, tmpScope);
    tmpScope.const(node.id.name, klass);
    return klass;
  } else {
    return yield* createClass2(node, scope);
  }
}
function* Super2(node, scope, options = {}) {
  const { getProto: getProto2 = false } = options;
  const superClass = scope.find(SUPER).get();
  return getProto2 ? superClass.prototype : superClass;
}
function* SpreadElement2(node, scope) {
  return yield* evaluate2(node.argument, scope);
}
function* YieldExpression(node, scope) {
  const res = yield* evaluate2(node.argument, scope);
  return node.delegate ? yield* res : yield res;
}
function* AwaitExpression(node, scope) {
  AWAIT.RES = yield* evaluate2(node.argument, scope);
  return yield AWAIT;
}

// src/evaluate/statement.ts
var statement_exports2 = {};
__export(statement_exports2, {
  BlockStatement: () => BlockStatement2,
  BreakStatement: () => BreakStatement2,
  CatchClause: () => CatchClause2,
  ContinueStatement: () => ContinueStatement2,
  DebuggerStatement: () => DebuggerStatement2,
  DoWhileStatement: () => DoWhileStatement2,
  EmptyStatement: () => EmptyStatement2,
  ExpressionStatement: () => ExpressionStatement2,
  ForInStatement: () => ForInStatement2,
  ForOfStatement: () => ForOfStatement2,
  ForStatement: () => ForStatement2,
  IfStatement: () => IfStatement2,
  ReturnStatement: () => ReturnStatement2,
  SwitchCase: () => SwitchCase2,
  SwitchStatement: () => SwitchStatement2,
  ThrowStatement: () => ThrowStatement2,
  TryStatement: () => TryStatement2,
  WhileStatement: () => WhileStatement2
});
function* ExpressionStatement2(node, scope) {
  yield* evaluate2(node.expression, scope);
}
function* BlockStatement2(block, scope, options = {}) {
  const {
    invasived = false,
    hoisted = false
  } = options;
  const subScope = invasived ? scope : new Scope(scope);
  if (!hoisted) {
    yield* hoist2(block, subScope, { onlyBlock: true });
  }
  for (let i = 0; i < block.body.length; i++) {
    const result = yield* evaluate2(block.body[i], subScope);
    if (result === BREAK || result === CONTINUE || result === RETURN) {
      return result;
    }
  }
}
function* EmptyStatement2() {
}
function* DebuggerStatement2() {
  debugger;
}
function* ReturnStatement2(node, scope) {
  RETURN.RES = node.argument ? yield* evaluate2(node.argument, scope) : void 0;
  return RETURN;
}
function* BreakStatement2() {
  return BREAK;
}
function* ContinueStatement2() {
  return CONTINUE;
}
function* IfStatement2(node, scope) {
  if (yield* evaluate2(node.test, scope)) {
    return yield* evaluate2(node.consequent, scope);
  } else {
    return yield* evaluate2(node.alternate, scope);
  }
}
function* SwitchStatement2(node, scope) {
  const discriminant = yield* evaluate2(node.discriminant, scope);
  let matched = false;
  for (let i = 0; i < node.cases.length; i++) {
    const eachCase = node.cases[i];
    if (!matched && (!eachCase.test || (yield* evaluate2(eachCase.test, scope)) === discriminant)) {
      matched = true;
    }
    if (matched) {
      const result = yield* SwitchCase2(eachCase, scope);
      if (result === BREAK) {
        break;
      }
      if (result === CONTINUE || result === RETURN) {
        return result;
      }
    }
  }
}
function* SwitchCase2(node, scope) {
  for (let i = 0; i < node.consequent.length; i++) {
    const result = yield* evaluate2(node.consequent[i], scope);
    if (result === BREAK || result === CONTINUE || result === RETURN) {
      return result;
    }
  }
}
function* ThrowStatement2(node, scope) {
  throw yield* evaluate2(node.argument, scope);
}
function* TryStatement2(node, scope) {
  try {
    return yield* BlockStatement2(node.block, scope);
  } catch (err) {
    if (node.handler) {
      const subScope = new Scope(scope);
      const param = node.handler.param;
      if (param) {
        if (param.type === "Identifier") {
          const name = param.name;
          subScope.var(name, err);
        } else {
          yield* pattern2(param, scope, { feed: err });
        }
      }
      return yield* CatchClause2(node.handler, subScope);
    } else {
      throw err;
    }
  } finally {
    if (node.finalizer) {
      const result = yield* BlockStatement2(node.finalizer, scope);
      if (result === BREAK || result === CONTINUE || result === RETURN) {
        return result;
      }
    }
  }
}
function* CatchClause2(node, scope) {
  return yield* BlockStatement2(node.body, scope, { invasived: true });
}
function* WhileStatement2(node, scope) {
  while (yield* evaluate2(node.test, scope)) {
    const result = yield* evaluate2(node.body, scope);
    if (result === BREAK) {
      break;
    } else if (result === CONTINUE) {
      continue;
    } else if (result === RETURN) {
      return result;
    }
  }
}
function* DoWhileStatement2(node, scope) {
  do {
    const result = yield* evaluate2(node.body, scope);
    if (result === BREAK) {
      break;
    } else if (result === CONTINUE) {
      continue;
    } else if (result === RETURN) {
      return result;
    }
  } while (yield* evaluate2(node.test, scope));
}
function* ForStatement2(node, scope) {
  const forScope = new Scope(scope);
  for (yield* evaluate2(node.init, forScope); node.test ? yield* evaluate2(node.test, forScope) : true; yield* evaluate2(node.update, forScope)) {
    const subScope = new Scope(forScope);
    let result;
    if (node.body.type === "BlockStatement") {
      result = yield* BlockStatement2(node.body, subScope, { invasived: true });
    } else {
      result = yield* evaluate2(node.body, subScope);
    }
    if (result === BREAK) {
      break;
    } else if (result === CONTINUE) {
      continue;
    } else if (result === RETURN) {
      return result;
    }
  }
}
function* ForInStatement2(node, scope) {
  for (const value in yield* evaluate2(node.right, scope)) {
    const result = yield* ForXHandler2(node, scope, { value });
    if (result === BREAK) {
      break;
    } else if (result === CONTINUE) {
      continue;
    } else if (result === RETURN) {
      return result;
    }
  }
}
function* ForOfStatement2(node, scope) {
  const right = yield* evaluate2(node.right, scope);
  if (node.await) {
    const iterator = getAsyncIterator(right);
    let ret;
    for (AWAIT.RES = iterator.next(), ret = yield AWAIT; !ret.done; AWAIT.RES = iterator.next(), ret = yield AWAIT) {
      const result = yield* ForXHandler2(node, scope, { value: ret.value });
      if (result === BREAK) {
        break;
      } else if (result === CONTINUE) {
        continue;
      } else if (result === RETURN) {
        return result;
      }
    }
  } else {
    for (const value of right) {
      const result = yield* ForXHandler2(node, scope, { value });
      if (result === BREAK) {
        break;
      } else if (result === CONTINUE) {
        continue;
      } else if (result === RETURN) {
        return result;
      }
    }
  }
}

// src/evaluate/pattern.ts
var pattern_exports2 = {};
__export(pattern_exports2, {
  ArrayPattern: () => ArrayPattern2,
  AssignmentPattern: () => AssignmentPattern2,
  ObjectPattern: () => ObjectPattern2,
  RestElement: () => RestElement2
});
function* ObjectPattern2(node, scope, options = {}) {
  const { kind = "var", hoist: hoist3 = false, onlyBlock = false, feed = {} } = options;
  const fedKeys = [];
  for (let i = 0; i < node.properties.length; i++) {
    const property = node.properties[i];
    if (hoist3) {
      if (onlyBlock || kind === "var") {
        if (property.type === "Property") {
          const value = property.value;
          if (value.type === "Identifier") {
            scope[kind](value.name, onlyBlock ? DEADZONE : kind === "var" ? NOINIT : void 0);
          } else {
            yield* pattern2(value, scope, { kind, hoist: hoist3, onlyBlock });
          }
        } else {
          yield* RestElement2(property, scope, { kind, hoist: hoist3, onlyBlock });
        }
      }
    } else if (property.type === "Property") {
      let key;
      if (property.computed) {
        key = yield* evaluate2(property.key, scope);
      } else {
        key = property.key.name;
      }
      fedKeys.push(key);
      const value = property.value;
      if (value.type === "Identifier") {
        scope[kind](value.name, feed[key]);
      } else {
        yield* pattern2(value, scope, { kind, feed: feed[key] });
      }
    } else {
      const rest = assign({}, feed);
      for (let i2 = 0; i2 < fedKeys.length; i2++)
        delete rest[fedKeys[i2]];
      yield* RestElement2(property, scope, { kind, feed: rest });
    }
  }
}
function* ArrayPattern2(node, scope, options = {}) {
  const { kind, hoist: hoist3 = false, onlyBlock = false, feed = [] } = options;
  const result = [];
  for (let i = 0; i < node.elements.length; i++) {
    const element = node.elements[i];
    if (!element)
      continue;
    if (hoist3) {
      if (onlyBlock || kind === "var") {
        if (element.type === "Identifier") {
          scope[kind](element.name, onlyBlock ? DEADZONE : kind === "var" ? NOINIT : void 0);
        } else {
          yield* pattern2(element, scope, { kind, hoist: hoist3, onlyBlock });
        }
      }
    } else if (element.type === "Identifier") {
      if (kind) {
        scope[kind](element.name, feed[i]);
      } else {
        const variable = yield* Identifier2(element, scope, { getVar: true });
        variable.set(feed[i]);
        result.push(variable.get());
      }
    } else if (element.type === "RestElement") {
      yield* RestElement2(element, scope, { kind, feed: feed.slice(i) });
    } else {
      yield* pattern2(element, scope, { kind, feed: feed[i] });
    }
  }
  if (result.length) {
    return result;
  }
}
function* RestElement2(node, scope, options = {}) {
  const { kind, hoist: hoist3 = false, onlyBlock = false, feed = [] } = options;
  const arg = node.argument;
  if (hoist3) {
    if (onlyBlock || kind === "var") {
      if (arg.type === "Identifier") {
        scope[kind](arg.name, onlyBlock ? DEADZONE : kind === "var" ? NOINIT : void 0);
      } else {
        yield* pattern2(arg, scope, { kind, hoist: hoist3, onlyBlock });
      }
    }
  } else if (arg.type === "Identifier") {
    if (kind) {
      scope[kind](arg.name, feed);
    } else {
      const variable = yield* Identifier2(arg, scope, { getVar: true });
      variable.set(feed);
    }
  } else {
    yield* pattern2(arg, scope, { kind, feed });
  }
}
function* AssignmentPattern2(node, scope, options = {}) {
  const { kind = "var", hoist: hoist3 = false, onlyBlock = false, feed = yield* evaluate2(node.right, scope) } = options;
  const left = node.left;
  if (hoist3) {
    if (onlyBlock || kind === "var") {
      if (left.type === "Identifier") {
        scope[kind](left.name, onlyBlock ? DEADZONE : kind === "var" ? NOINIT : void 0);
      } else {
        yield* pattern2(left, scope, { kind, hoist: hoist3, onlyBlock });
      }
    }
  } else if (left.type === "Identifier") {
    scope[kind](left.name, feed);
  } else {
    yield* pattern2(left, scope, { kind, feed });
  }
}

// src/evaluate/index.ts
var evaluateOps2;
function* evaluate2(node, scope) {
  if (!node)
    return;
  if (!evaluateOps2) {
    evaluateOps2 = assign(
      {},
      declaration_exports2,
      expression_exports2,
      identifier_exports2,
      statement_exports2,
      literal_exports2,
      pattern_exports2
    );
  }
  const handler = evaluateOps2[node.type];
  if (handler) {
    return yield* handler(node, scope);
  } else {
    throw new Error(`${node.type} isn't implemented`);
  }
}

// src/evaluate/declaration.ts
function* FunctionDeclaration2(node, scope) {
  scope.func(node.id.name, createFunc2(node, scope));
}
function* VariableDeclaration2(node, scope, options = {}) {
  for (let i = 0; i < node.declarations.length; i++) {
    yield* VariableDeclarator2(node.declarations[i], scope, assign({ kind: node.kind }, options));
  }
}
function* VariableDeclarator2(node, scope, options = {}) {
  const { kind = "var", hoist: hoist3 = false, onlyBlock = false, feed } = options;
  if (hoist3) {
    if (onlyBlock || kind === "var") {
      if (node.id.type === "Identifier") {
        scope[kind](node.id.name, onlyBlock ? DEADZONE : kind === "var" ? NOINIT : void 0);
      } else {
        yield* pattern2(node.id, scope, { kind, hoist: hoist3, onlyBlock });
      }
    }
  } else {
    const hasFeed = "feed" in options;
    const value = hasFeed ? feed : yield* evaluate2(node.init, scope);
    if (node.id.type === "Identifier") {
      const name = node.id.name;
      if (kind === "var" && !node.init && !hasFeed) {
        scope.var(name, NOINIT);
      } else {
        scope[kind](name, value);
      }
      if (node.init && ["ClassExpression", "FunctionExpression", "ArrowFunctionExpression"].indexOf(node.init.type) !== -1 && !value.name) {
        define(value, "name", {
          value: name,
          configurable: true
        });
      }
    } else {
      yield* pattern2(node.id, scope, { kind, feed: value });
    }
  }
}
function* ClassDeclaration2(node, scope) {
  scope.func(node.id.name, yield* createClass2(node, scope));
}
function* ClassBody2(node, scope, options = {}) {
  const { klass, superClass } = options;
  for (let i = 0; i < node.body.length; i++) {
    const n = node.body[i];
    if (n.type === "MethodDefinition") {
      yield* MethodDefinition2(n, scope, { klass, superClass });
    }
  }
}
function* MethodDefinition2(node, scope, options = {}) {
  const { klass, superClass } = options;
  let key;
  if (node.computed) {
    key = yield* evaluate2(node.key, scope);
  } else if (node.key.type === "Identifier") {
    key = node.key.name;
  } else {
    throw new SyntaxError("Unexpected token");
  }
  const obj = node.static ? klass : klass.prototype;
  const value = createFunc2(node.value, scope, { superClass });
  switch (node.kind) {
    case "constructor":
      break;
    case "method":
      define(obj, key, {
        value,
        writable: true,
        configurable: true
      });
      break;
    case "get": {
      const oriDptor = getDptor(obj, key);
      define(obj, key, {
        get: value,
        set: oriDptor && oriDptor.set,
        configurable: true
      });
      break;
    }
    case "set": {
      const oriDptor = getDptor(obj, key);
      define(obj, key, {
        get: oriDptor && oriDptor.get,
        set: value,
        configurable: true
      });
      break;
    }
    default:
      throw new SyntaxError("Unexpected token");
  }
}

// src/share/async.ts
function runAsync(iterator, options = {}) {
  const { res, err, ret, fullRet } = options;
  return new Promise((resolve, reject) => {
    if ("ret" in options) {
      return resolve(iterator.return(ret));
    }
    if ("err" in options) {
      onRejected(err);
    } else {
      onFulfilled(res);
    }
    function onFulfilled(res2) {
      let ret2;
      try {
        ret2 = iterator.next(res2);
      } catch (e) {
        return reject(e);
      }
      next(ret2);
      return null;
    }
    function onRejected(err2) {
      let ret2;
      try {
        ret2 = iterator.throw(err2);
      } catch (e) {
        return reject(e);
      }
      next(ret2);
    }
    function next(ret2) {
      if (ret2.done)
        return resolve(fullRet ? ret2 : ret2.value);
      if (ret2.value !== AWAIT)
        return resolve(ret2);
      const awaitValue = ret2.value.RES;
      const value = awaitValue && awaitValue.then === "function" ? awaitValue : Promise.resolve(awaitValue);
      return value.then(onFulfilled, onRejected);
    }
  });
}

// src/evaluate/helper.ts
function* hoist2(block, scope, options = {}) {
  const { onlyBlock = false } = options;
  const funcDclrList = [];
  const funcDclrIdxs = [];
  for (let i = 0; i < block.body.length; i++) {
    const statement = block.body[i];
    if (statement.type === "FunctionDeclaration") {
      funcDclrList.push(statement);
      funcDclrIdxs.push(i);
    } else if (statement.type === "VariableDeclaration" && ["const", "let"].indexOf(statement.kind) !== -1) {
      yield* VariableDeclaration2(statement, scope, { hoist: true, onlyBlock: true });
    } else if (!onlyBlock) {
      yield* hoistVarRecursion(statement, scope);
    }
  }
  if (funcDclrIdxs.length) {
    for (let i = funcDclrIdxs.length - 1; i > -1; i--) {
      block.body.splice(funcDclrIdxs[i], 1);
    }
    block.body = funcDclrList.concat(block.body);
  }
}
function* hoistVarRecursion(statement, scope) {
  switch (statement.type) {
    case "VariableDeclaration":
      yield* VariableDeclaration2(statement, scope, { hoist: true });
      break;
    case "ForInStatement":
    case "ForOfStatement":
      if (statement.left.type === "VariableDeclaration") {
        yield* VariableDeclaration2(statement.left, scope, { hoist: true });
      }
    case "ForStatement":
      if (statement.type === "ForStatement" && statement.init.type === "VariableDeclaration") {
        yield* VariableDeclaration2(statement.init, scope, { hoist: true });
      }
    case "WhileStatement":
    case "DoWhileStatement":
      yield* hoistVarRecursion(statement.body, scope);
      break;
    case "IfStatement":
      yield* hoistVarRecursion(statement.consequent, scope);
      if (statement.alternate) {
        yield* hoistVarRecursion(statement.alternate, scope);
      }
      break;
    case "BlockStatement":
      for (let i = 0; i < statement.body.length; i++) {
        yield* hoistVarRecursion(statement.body[i], scope);
      }
      break;
    case "SwitchStatement":
      for (let i = 0; i < statement.cases.length; i++) {
        for (let j = 0; j < statement.cases[i].consequent.length; j++) {
          yield* hoistVarRecursion(statement.cases[i].consequent[j], scope);
        }
      }
      break;
    case "TryStatement": {
      const tryBlock = statement.block.body;
      for (let i = 0; i < tryBlock.length; i++) {
        yield* hoistVarRecursion(tryBlock[i], scope);
      }
      const catchBlock = statement.handler && statement.handler.body.body;
      if (catchBlock) {
        for (let i = 0; i < catchBlock.length; i++) {
          yield* hoistVarRecursion(catchBlock[i], scope);
        }
      }
      const finalBlock = statement.finalizer && statement.finalizer.body;
      if (finalBlock) {
        for (let i = 0; i < finalBlock.length; i++) {
          yield* hoistVarRecursion(finalBlock[i], scope);
        }
      }
      break;
    }
  }
}
function* pattern2(node, scope, options = {}) {
  switch (node.type) {
    case "ObjectPattern":
      return yield* ObjectPattern2(node, scope, options);
    case "ArrayPattern":
      return yield* ArrayPattern2(node, scope, options);
    case "RestElement":
      return yield* RestElement2(node, scope, options);
    case "AssignmentPattern":
      return yield* AssignmentPattern2(node, scope, options);
    default:
      throw new SyntaxError("Unexpected token");
  }
}
function createFunc2(node, scope, options = {}) {
  if (!node.generator && !node.async) {
    return createFunc(node, scope, options);
  }
  const { superClass, isCtor } = options;
  const params = node.params;
  const tmpFunc = function* (...args) {
    const subScope = new Scope(scope, true);
    if (node.type !== "ArrowFunctionExpression") {
      subScope.const("this", this);
      subScope.let("arguments", arguments);
      subScope.const(NEWTARGET, new.target);
      if (superClass) {
        subScope.const(SUPER, superClass);
        if (isCtor)
          subScope.let(SUPERCALL, false);
      }
    }
    for (let i = 0; i < params.length; i++) {
      const param = params[i];
      if (param.type === "Identifier") {
        subScope.var(param.name, args[i]);
      } else if (param.type === "RestElement") {
        yield* RestElement2(param, subScope, { kind: "var", feed: args.slice(i) });
      } else {
        yield* pattern2(param, subScope, { feed: args[i] });
      }
    }
    let result;
    if (node.body.type === "BlockStatement") {
      yield* hoist2(node.body, subScope);
      result = yield* BlockStatement2(node.body, subScope, {
        invasived: true,
        hoisted: true
      });
    } else {
      result = yield* evaluate2(node.body, subScope);
      if (node.type === "ArrowFunctionExpression") {
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
    func = function() {
      const iterator = tmpFunc.apply(this, arguments);
      let last = Promise.resolve();
      let hasCatch = false;
      const run = (opts) => last = last.then(() => runAsync(iterator, assign({ fullRet: true }, opts))).catch((err) => {
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
      if (typeof Symbol === "function") {
        asyncIterator[Symbol.iterator] = function() {
          return this;
        };
      }
      return asyncIterator;
    };
  } else if (node.async) {
    func = function() {
      return runAsync(tmpFunc.apply(this, arguments));
    };
  } else {
    func = tmpFunc;
  }
  define(func, NOCTOR, { value: true });
  define(func, "name", {
    value: node.id && node.id.name || "",
    configurable: true
  });
  define(func, "length", {
    value: params.length,
    configurable: true
  });
  return func;
}
function* createClass2(node, scope) {
  const superClass = yield* evaluate2(node.superClass, scope);
  let klass = function() {
    if (superClass) {
      superClass.apply(this);
    }
  };
  const methodBody = node.body.body;
  for (let i = 0; i < methodBody.length; i++) {
    const method = methodBody[i];
    if (method.type === "MethodDefinition" && method.kind === "constructor") {
      klass = createFunc2(method.value, scope, { superClass, isCtor: true });
      break;
    }
  }
  if (superClass) {
    inherits(klass, superClass);
  }
  yield* ClassBody2(node.body, scope, { klass, superClass });
  define(klass, CLSCTOR, { value: true });
  define(klass, "name", {
    value: node.id && node.id.name || "",
    configurable: true
  });
  return klass;
}
function* ForXHandler2(node, scope, options) {
  const { value } = options;
  const left = node.left;
  const subScope = new Scope(scope);
  if (left.type === "VariableDeclaration") {
    yield* VariableDeclaration2(left, subScope, { feed: value });
  } else if (left.type === "Identifier") {
    const variable = yield* Identifier(left, scope, { getVar: true });
    variable.set(value);
  } else {
    yield* pattern2(left, scope, { feed: value });
  }
  let result;
  if (node.body.type === "BlockStatement") {
    result = yield* BlockStatement2(node.body, subScope, { invasived: true });
  } else {
    result = yield* evaluate2(node.body, subScope);
  }
  return result;
}

// src/evaluate_n/helper.ts
function hoist(block, scope, options = {}) {
  const { onlyBlock = false } = options;
  const funcDclrList = [];
  const funcDclrIdxs = [];
  for (let i = 0; i < block.body.length; i++) {
    const statement = block.body[i];
    if (statement.type === "FunctionDeclaration") {
      funcDclrList.push(statement);
      funcDclrIdxs.push(i);
    } else if (statement.type === "VariableDeclaration" && ["const", "let"].indexOf(statement.kind) !== -1) {
      VariableDeclaration(statement, scope, { hoist: true, onlyBlock: true });
    } else if (!onlyBlock) {
      hoistVarRecursion2(statement, scope);
    }
  }
  if (funcDclrIdxs.length) {
    for (let i = funcDclrIdxs.length - 1; i > -1; i--) {
      block.body.splice(funcDclrIdxs[i], 1);
    }
    block.body = funcDclrList.concat(block.body);
  }
}
function hoistVarRecursion2(statement, scope) {
  switch (statement.type) {
    case "VariableDeclaration":
      VariableDeclaration(statement, scope, { hoist: true });
      break;
    case "ForInStatement":
    case "ForOfStatement":
      if (statement.left.type === "VariableDeclaration") {
        VariableDeclaration(statement.left, scope, { hoist: true });
      }
    case "ForStatement":
      if (statement.type === "ForStatement" && statement.init.type === "VariableDeclaration") {
        VariableDeclaration(statement.init, scope, { hoist: true });
      }
    case "WhileStatement":
    case "DoWhileStatement":
      hoistVarRecursion2(statement.body, scope);
      break;
    case "IfStatement":
      hoistVarRecursion2(statement.consequent, scope);
      if (statement.alternate) {
        hoistVarRecursion2(statement.alternate, scope);
      }
      break;
    case "BlockStatement":
      for (let i = 0; i < statement.body.length; i++) {
        hoistVarRecursion2(statement.body[i], scope);
      }
      break;
    case "SwitchStatement":
      for (let i = 0; i < statement.cases.length; i++) {
        for (let j = 0; j < statement.cases[i].consequent.length; j++) {
          hoistVarRecursion2(statement.cases[i].consequent[j], scope);
        }
      }
      break;
    case "TryStatement": {
      const tryBlock = statement.block.body;
      for (let i = 0; i < tryBlock.length; i++) {
        hoistVarRecursion2(tryBlock[i], scope);
      }
      const catchBlock = statement.handler && statement.handler.body.body;
      if (catchBlock) {
        for (let i = 0; i < catchBlock.length; i++) {
          hoistVarRecursion2(catchBlock[i], scope);
        }
      }
      const finalBlock = statement.finalizer && statement.finalizer.body;
      if (finalBlock) {
        for (let i = 0; i < finalBlock.length; i++) {
          hoistVarRecursion2(finalBlock[i], scope);
        }
      }
      break;
    }
  }
}
function pattern(node, scope, options = {}) {
  switch (node.type) {
    case "ObjectPattern":
      return ObjectPattern(node, scope, options);
    case "ArrayPattern":
      return ArrayPattern(node, scope, options);
    case "RestElement":
      return RestElement(node, scope, options);
    case "AssignmentPattern":
      return AssignmentPattern(node, scope, options);
    default:
      throw new SyntaxError("Unexpected token");
  }
}
function createFunc(node, scope, options = {}) {
  if (node.generator || node.async) {
    return createFunc2(node, scope, options);
  }
  const { superClass, isCtor } = options;
  const params = node.params;
  const tmpFunc = function(...args) {
    const subScope = new Scope(scope, true);
    if (node.type !== "ArrowFunctionExpression") {
      subScope.const("this", this);
      subScope.let("arguments", arguments);
      subScope.const(NEWTARGET, new.target);
      if (superClass) {
        subScope.const(SUPER, superClass);
        if (isCtor)
          subScope.let(SUPERCALL, false);
      }
    }
    for (let i = 0; i < params.length; i++) {
      const param = params[i];
      if (param.type === "Identifier") {
        subScope.var(param.name, args[i]);
      } else if (param.type === "RestElement") {
        RestElement(param, subScope, { kind: "var", feed: args.slice(i) });
      } else {
        pattern(param, subScope, { feed: args[i] });
      }
    }
    let result;
    if (node.body.type === "BlockStatement") {
      hoist(node.body, subScope);
      result = BlockStatement(node.body, subScope, {
        invasived: true,
        hoisted: true
      });
    } else {
      result = evaluate(node.body, subScope);
      if (node.type === "ArrowFunctionExpression") {
        RETURN.RES = result;
        result = RETURN;
      }
    }
    if (result === RETURN) {
      return result.RES;
    }
  };
  let func = tmpFunc;
  if (node.type === "ArrowFunctionExpression") {
    define(func, NOCTOR, { value: true });
  }
  define(func, "name", {
    value: node.id && node.id.name || "",
    configurable: true
  });
  define(func, "length", {
    value: params.length,
    configurable: true
  });
  return func;
}
function createClass(node, scope) {
  const superClass = evaluate(node.superClass, scope);
  let klass = function() {
    if (superClass) {
      superClass.apply(this);
    }
  };
  const methodBody = node.body.body;
  for (let i = 0; i < methodBody.length; i++) {
    const method = methodBody[i];
    if (method.type === "MethodDefinition" && method.kind === "constructor") {
      klass = createFunc(method.value, scope, { superClass, isCtor: true });
      break;
    }
  }
  if (superClass) {
    inherits(klass, superClass);
  }
  ClassBody(node.body, scope, { klass, superClass });
  define(klass, CLSCTOR, { value: true });
  define(klass, "name", {
    value: node.id && node.id.name || "",
    configurable: true
  });
  return klass;
}
function ForXHandler(node, scope, options) {
  const { value } = options;
  const left = node.left;
  const subScope = new Scope(scope);
  if (left.type === "VariableDeclaration") {
    VariableDeclaration(left, subScope, { feed: value });
  } else if (left.type === "Identifier") {
    const variable = Identifier(left, scope, { getVar: true });
    variable.set(value);
  } else {
    pattern(left, scope, { feed: value });
  }
  let result;
  if (node.body.type === "BlockStatement") {
    result = BlockStatement(node.body, subScope, { invasived: true });
  } else {
    result = evaluate(node.body, subScope);
  }
  return result;
}

// src/index.ts
var Sval = class {
  options = {
    ecmaVersion: 2019
  };
  scope = new Scope(null, true);
  exports = {};
  constructor(options = {}) {
    let { ecmaVer = 9, sandBox = true } = options;
    ecmaVer -= ecmaVer < 2015 ? 0 : 2009;
    if ([3, 5, 6, 7, 8, 9, 10].indexOf(ecmaVer) === -1) {
      throw new Error(`unsupported ecmaVer`);
    }
    this.options.ecmaVersion = ecmaVer;
    if (sandBox) {
      const win2 = createSandBox();
      this.scope.let("window", win2);
      this.scope.let("this", win2);
    } else {
      this.scope.let("window", globalObj);
      this.scope.let("this", globalObj);
    }
    this.scope.const("exports", this.exports = {});
  }
  import(nameOrModules, mod) {
    if (typeof nameOrModules === "string") {
      nameOrModules = { [nameOrModules]: mod };
    }
    if (typeof nameOrModules !== "object")
      return;
    const names2 = getOwnNames(nameOrModules);
    for (let i = 0; i < names2.length; i++) {
      const name = names2[i];
      this.scope.var(name, nameOrModules[name]);
    }
  }
  parse(code, parser) {
    if (typeof parser === "function") {
      return parser(code, assign({}, this.options));
    }
    return parse(code, this.options);
  }
  run(code) {
    const ast = typeof code === "string" ? parse(code, this.options) : code;
    hoist(ast, this.scope);
    evaluate(ast, this.scope);
  }
};
__publicField(Sval, "version", version);
var src_default = Sval;
export {
  src_default as default
};
