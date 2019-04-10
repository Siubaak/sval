(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('acorn')) :
    typeof define === 'function' && define.amd ? define(['acorn'], factory) :
    (global = global || self, global.Sval = factory(global.acorn));
}(this, function (acorn) { 'use strict';

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

    var e_1, _a;
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
    try {
        for (var names_1 = __values(names), names_1_1 = names_1.next(); !names_1_1.done; names_1_1 = names_1.next()) {
            var name_1 = names_1_1.value;
            try {
                win[name_1] = globalObj[name_1];
            }
            catch (err) { }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (names_1_1 && !names_1_1.done && (_a = names_1.return)) _a.call(names_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    function createSandBox() {
        return assign({}, win);
    }
    function createSymbol(key) {
        return key + Math.random().toString(36).substring(2);
    }
    function runGenerator(generator) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var iterator = generator.apply(void 0, __spread(args));
        var result;
        do {
            result = iterator.next();
        } while (!result.done);
        return result.value;
    }
    function runAsync(generator) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return new Promise(function (resolve, reject) {
            var iterator = generator.apply(void 0, __spread(args));
            onFulfilled();
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
                    return resolve(ret.value);
                var value = typeof ret.value.then === 'function'
                    ? ret.value
                    : Promise.resolve(ret.value);
                return value.then(onFulfilled, onRejected);
            }
        });
    }

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
            var e_1, _a;
            var cloneScope = new Scope(this.parent, this.isolated);
            var names = getOwnNames(this.context);
            try {
                for (var names_1 = __values(names), names_1_1 = names_1.next(); !names_1_1.done; names_1_1 = names_1.next()) {
                    var name_1 = names_1_1.value;
                    var variable = this.context[name_1];
                    cloneScope[variable.kind](name_1, variable.get());
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (names_1_1 && !names_1_1.done && (_a = names_1.return)) _a.call(names_1);
                }
                finally { if (e_1) throw e_1.error; }
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
                scope.context[name] = new Var('var', value);
            }
            else {
                if (variable.kind === 'var') {
                    if (value !== undefined) {
                        variable.set(value);
                    }
                }
                else {
                    throw new SyntaxError("Identifier '" + name + "' has already been declared");
                }
            }
            if (!scope.parent) {
                var win = scope.find('window').get();
                if (value !== undefined) {
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

    function Identifier(node, scope, options) {
        var _a, getName, _b, getVar, _c, throwErr, variable;
        if (options === void 0) { options = {}; }
        return __generator(this, function (_d) {
            _a = options.getName, getName = _a === void 0 ? false : _a, _b = options.getVar, getVar = _b === void 0 ? false : _b, _c = options.throwErr, throwErr = _c === void 0 ? true : _c;
            if (getName) {
                return [2, node.name];
            }
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

    var identifier = /*#__PURE__*/Object.freeze({
        Identifier: Identifier
    });

    function FunctionDeclaration(node, scope) {
        var _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _b = (_a = scope).func;
                    _c = [node.id.name];
                    return [5, __values(createFunc(node, scope))];
                case 1:
                    _b.apply(_a, _c.concat([_d.sent()]));
                    return [2];
            }
        });
    }
    function VariableDeclaration(node, scope, options) {
        var e_1, _a, _b, _c, declarator, e_1_1;
        if (options === void 0) { options = {}; }
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 5, 6, 7]);
                    _b = __values(node.declarations), _c = _b.next();
                    _d.label = 1;
                case 1:
                    if (!!_c.done) return [3, 4];
                    declarator = _c.value;
                    return [5, __values(VariableDeclarator(declarator, scope, assign({ kind: node.kind }, options)))];
                case 2:
                    _d.sent();
                    _d.label = 3;
                case 3:
                    _c = _b.next();
                    return [3, 1];
                case 4: return [3, 7];
                case 5:
                    e_1_1 = _d.sent();
                    e_1 = { error: e_1_1 };
                    return [3, 7];
                case 6:
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7];
                case 7: return [2];
            }
        });
    }
    function VariableDeclarator(node, scope, options) {
        var _a, kind, _b, hoist, feed, name_1, value, _c, name_2;
        if (options === void 0) { options = {}; }
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _a = options.kind, kind = _a === void 0 ? 'let' : _a, _b = options.hoist, hoist = _b === void 0 ? false : _b, feed = options.feed;
                    if (!hoist) return [3, 5];
                    if (!(kind === 'var')) return [3, 4];
                    if (!(node.id.type === 'Identifier')) return [3, 2];
                    return [5, __values(Identifier(node.id, scope, { getName: true }))];
                case 1:
                    name_1 = _d.sent();
                    scope.var(name_1, undefined);
                    return [3, 4];
                case 2: return [5, __values(pattern$1(node.id, scope, { kind: kind, hoist: hoist }))];
                case 3:
                    _d.sent();
                    _d.label = 4;
                case 4: return [3, 14];
                case 5:
                    if (!(kind === 'var'
                        || kind === 'let'
                        || kind === 'const')) return [3, 13];
                    if (!(typeof feed === 'undefined')) return [3, 7];
                    return [5, __values(evaluate(node.init, scope))];
                case 6:
                    _c = _d.sent();
                    return [3, 8];
                case 7:
                    _c = feed;
                    _d.label = 8;
                case 8:
                    value = _c;
                    if (!(node.id.type === 'Identifier')) return [3, 10];
                    return [5, __values(Identifier(node.id, scope, { getName: true }))];
                case 9:
                    name_2 = _d.sent();
                    scope[kind](name_2, value);
                    return [3, 12];
                case 10: return [5, __values(pattern$1(node.id, scope, { kind: kind, feed: value }))];
                case 11:
                    _d.sent();
                    _d.label = 12;
                case 12: return [3, 14];
                case 13: throw new SyntaxError('Unexpected identifier');
                case 14: return [2];
            }
        });
    }
    function ClassDeclaration(node, scope) {
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
    function ClassBody(node, scope, options) {
        var e_2, _a, _b, klass, _c, _d, method, e_2_1;
        if (options === void 0) { options = {}; }
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _b = options.klass, klass = _b === void 0 ? function () { } : _b;
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 6, 7, 8]);
                    _c = __values(node.body), _d = _c.next();
                    _e.label = 2;
                case 2:
                    if (!!_d.done) return [3, 5];
                    method = _d.value;
                    return [5, __values(MethodDefinition(method, scope, { klass: klass }))];
                case 3:
                    _e.sent();
                    _e.label = 4;
                case 4:
                    _d = _c.next();
                    return [3, 2];
                case 5: return [3, 8];
                case 6:
                    e_2_1 = _e.sent();
                    e_2 = { error: e_2_1 };
                    return [3, 8];
                case 7:
                    try {
                        if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                    }
                    finally { if (e_2) throw e_2.error; }
                    return [7];
                case 8: return [2];
            }
        });
    }
    function MethodDefinition(node, scope, options) {
        var _a, klass, key, obj, value, oriDptor, oriDptor;
        if (options === void 0) { options = {}; }
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = options.klass, klass = _a === void 0 ? function () { } : _a;
                    if (!node.computed) return [3, 2];
                    return [5, __values(evaluate(node.key, scope))];
                case 1:
                    key = _b.sent();
                    return [3, 5];
                case 2:
                    if (!(node.key.type === 'Identifier')) return [3, 4];
                    return [5, __values(Identifier(node.key, scope, { getName: true }))];
                case 3:
                    key = _b.sent();
                    return [3, 5];
                case 4: throw new SyntaxError('Unexpected token');
                case 5:
                    obj = node.static ? klass : klass.prototype;
                    return [5, __values(createFunc(node.value, scope))];
                case 6:
                    value = _b.sent();
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

    var declaration = /*#__PURE__*/Object.freeze({
        FunctionDeclaration: FunctionDeclaration,
        VariableDeclaration: VariableDeclaration,
        VariableDeclarator: VariableDeclarator,
        ClassDeclaration: ClassDeclaration,
        ClassBody: ClassBody,
        MethodDefinition: MethodDefinition
    });

    var BREAK = {};
    var CONTINUE = {};
    var RETURN = { RES: undefined };
    var SUPER = createSymbol('super');
    var ASYNC = createSymbol('async');

    function Literal(node, scope) {
        return __generator(this, function (_a) {
            return [2, node.value];
        });
    }

    var literal = /*#__PURE__*/Object.freeze({
        Literal: Literal
    });

    function ThisExpression(node, scope) {
        return __generator(this, function (_a) {
            return [2, scope.find('this').get()];
        });
    }
    function ArrayExpression(node, scope) {
        var e_1, _a, results, _b, _c, item, _d, _e, _f, _g, e_1_1;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    results = [];
                    _h.label = 1;
                case 1:
                    _h.trys.push([1, 8, 9, 10]);
                    _b = __values(node.elements), _c = _b.next();
                    _h.label = 2;
                case 2:
                    if (!!_c.done) return [3, 7];
                    item = _c.value;
                    if (!(item.type === 'SpreadElement')) return [3, 4];
                    _e = (_d = results).concat;
                    return [5, __values(SpreadElement(item, scope))];
                case 3:
                    results = _e.apply(_d, [_h.sent()]);
                    return [3, 6];
                case 4:
                    _g = (_f = results).push;
                    return [5, __values(evaluate(item, scope))];
                case 5:
                    _g.apply(_f, [_h.sent()]);
                    _h.label = 6;
                case 6:
                    _c = _b.next();
                    return [3, 2];
                case 7: return [3, 10];
                case 8:
                    e_1_1 = _h.sent();
                    e_1 = { error: e_1_1 };
                    return [3, 10];
                case 9:
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7];
                case 10: return [2, results];
            }
        });
    }
    function ObjectExpression(node, scope) {
        var e_2, _a, object, _b, _c, property, propKey, key, _d, value, propKind, e_2_1;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    object = {};
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 11, 12, 13]);
                    _b = __values(node.properties), _c = _b.next();
                    _e.label = 2;
                case 2:
                    if (!!_c.done) return [3, 10];
                    property = _c.value;
                    propKey = property.key;
                    key = void 0;
                    if (!(propKey.type === 'Identifier')) return [3, 4];
                    return [5, __values(Identifier(propKey, scope, { getName: true }))];
                case 3:
                    key = _e.sent();
                    return [3, 7];
                case 4:
                    if (!(propKey.type === 'Literal')) return [3, 6];
                    _d = '';
                    return [5, __values(Literal(propKey, scope))];
                case 5:
                    key = _d + (_e.sent());
                    return [3, 7];
                case 6: throw new SyntaxError('Unexpected token');
                case 7: return [5, __values(evaluate(property.value, scope))];
                case 8:
                    value = _e.sent();
                    propKind = property.kind;
                    if (propKind === 'init') {
                        object[key] = value;
                    }
                    else if (propKind === 'get') {
                        define(object, key, { get: value });
                    }
                    else if (propKind === 'set') {
                        define(object, key, { set: value });
                    }
                    else {
                        throw new SyntaxError('Unexpected token');
                    }
                    _e.label = 9;
                case 9:
                    _c = _b.next();
                    return [3, 2];
                case 10: return [3, 13];
                case 11:
                    e_2_1 = _e.sent();
                    e_2 = { error: e_2_1 };
                    return [3, 13];
                case 12:
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_2) throw e_2.error; }
                    return [7];
                case 13: return [2, object];
            }
        });
    }
    function FunctionExpression(node, scope) {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [5, __values(createFunc(node, scope))];
                case 1: return [2, _a.sent()];
            }
        });
    }
    function UnaryExpression(node, scope) {
        var arg, _a, variable, globalScope, name_1, win;
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
                case 1: return [5, __values(evaluate(arg, scope))];
                case 2: return [2, +(_b.sent())];
                case 3: return [5, __values(evaluate(arg, scope))];
                case 4: return [2, -(_b.sent())];
                case 5: return [5, __values(evaluate(arg, scope))];
                case 6: return [2, !(_b.sent())];
                case 7: return [5, __values(evaluate(arg, scope))];
                case 8: return [2, ~(_b.sent())];
                case 9: return [5, __values(evaluate(arg, scope))];
                case 10: return [2, void (_b.sent())];
                case 11:
                    if (!(arg.type === 'Identifier')) return [3, 13];
                    return [5, __values(Identifier(arg, scope, { throwErr: false }))];
                case 12: return [2, typeof (_b.sent())];
                case 13: return [5, __values(evaluate(arg, scope))];
                case 14: return [2, typeof (_b.sent())];
                case 15:
                    if (!(arg.type === 'MemberExpression')) return [3, 17];
                    return [5, __values(MemberExpression(arg, scope, { getVar: true }))];
                case 16:
                    variable = _b.sent();
                    return [2, variable.del()];
                case 17:
                    if (!(arg.type === 'Identifier')) return [3, 19];
                    globalScope = scope.global();
                    return [5, __values(Identifier(arg, globalScope, { getName: true }))];
                case 18:
                    name_1 = _b.sent();
                    win = globalScope.find('window').get();
                    return [2, delete win[name_1]];
                case 19: throw new SyntaxError('Unexpected token');
                case 20: throw new SyntaxError("Unexpected token " + node.operator);
            }
        });
    }
    function UpdateExpression(node, scope) {
        var arg, variable, value;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    arg = node.argument;
                    if (!(arg.type === 'Identifier')) return [3, 2];
                    return [5, __values(Identifier(arg, scope, { getVar: true }))];
                case 1:
                    variable = _a.sent();
                    return [3, 5];
                case 2:
                    if (!(arg.type === 'MemberExpression')) return [3, 4];
                    return [5, __values(MemberExpression(arg, scope, { getVar: true }))];
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
    function BinaryExpression(node, scope) {
        var left, right, binaryOps, handler;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [5, __values(evaluate(node.left, scope))];
                case 1:
                    left = _a.sent();
                    return [5, __values(evaluate(node.right, scope))];
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
    function AssignmentExpression(node, scope) {
        var value, left, variable, win, assignOps, handler;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [5, __values(evaluate(node.right, scope))];
                case 1:
                    value = _a.sent();
                    left = node.left;
                    if (!(left.type === 'Identifier')) return [3, 3];
                    return [5, __values(Identifier(left, scope, { getVar: true, throwErr: false }))];
                case 2:
                    variable = _a.sent();
                    if (!variable) {
                        win = scope.global().find('window').get();
                        variable = new Prop(win, left.name);
                    }
                    return [3, 7];
                case 3:
                    if (!(left.type === 'MemberExpression')) return [3, 5];
                    return [5, __values(MemberExpression(left, scope, { getVar: true }))];
                case 4:
                    variable = _a.sent();
                    return [3, 7];
                case 5: return [5, __values(pattern$1(left, scope, { feed: value }))];
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
    function LogicalExpression(node, scope) {
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
                case 1: return [5, __values(evaluate(node.left, scope))];
                case 2:
                    _b = (_d.sent());
                    if (_b) return [3, 4];
                    return [5, __values(evaluate(node.right, scope))];
                case 3:
                    _b = (_d.sent());
                    _d.label = 4;
                case 4: return [2, _b];
                case 5: return [5, __values(evaluate(node.left, scope))];
                case 6:
                    _c = (_d.sent());
                    if (!_c) return [3, 8];
                    return [5, __values(evaluate(node.right, scope))];
                case 7:
                    _c = (_d.sent());
                    _d.label = 8;
                case 8: return [2, _c];
                case 9: throw new SyntaxError("Unexpected token " + node.operator);
            }
        });
    }
    function MemberExpression(node, scope, options) {
        var _a, getObj, _b, getVar, object, key, setter, thisObject, privateKey, getter, thisObject;
        if (options === void 0) { options = {}; }
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = options.getObj, getObj = _a === void 0 ? false : _a, _b = options.getVar, getVar = _b === void 0 ? false : _b;
                    if (!(node.object.type === 'Super')) return [3, 2];
                    return [5, __values(Super(node.object, scope, { getProto: true }))];
                case 1:
                    object = _c.sent();
                    return [3, 4];
                case 2: return [5, __values(evaluate(node.object, scope))];
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
                    return [5, __values(evaluate(node.property, scope))];
                case 5:
                    key = _c.sent();
                    return [3, 9];
                case 6:
                    if (!(node.property.type === 'Identifier')) return [3, 8];
                    return [5, __values(Identifier(node.property, scope, { getName: true }))];
                case 7:
                    key = _c.sent();
                    return [3, 9];
                case 8: throw new SyntaxError('Unexpected token');
                case 9:
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
    function ConditionalExpression(node, scope) {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [5, __values(evaluate(node.test, scope))];
                case 1:
                    if (!(_b.sent())) return [3, 3];
                    return [5, __values(evaluate(node.consequent, scope))];
                case 2:
                    _a = (_b.sent());
                    return [3, 5];
                case 3: return [5, __values(evaluate(node.alternate, scope))];
                case 4:
                    _a = (_b.sent());
                    _b.label = 5;
                case 5: return [2, _a];
            }
        });
    }
    function CallExpression(node, scope, options) {
        var e_3, _a, _b, async, func, object, key, getter, thisObject, args, _c, _d, arg, _e, _f, _g, _h, e_3_1;
        if (options === void 0) { options = {}; }
        return __generator(this, function (_j) {
            switch (_j.label) {
                case 0:
                    _b = options.async, async = _b === void 0 ? false : _b;
                    if (!(node.callee.type === 'MemberExpression')) return [3, 7];
                    return [5, __values(MemberExpression(node.callee, scope, { getObj: true }))];
                case 1:
                    object = _j.sent();
                    key = void 0;
                    if (!node.callee.computed) return [3, 3];
                    return [5, __values(evaluate(node.callee.property, scope))];
                case 2:
                    key = _j.sent();
                    return [3, 6];
                case 3:
                    if (!(node.callee.property.type === 'Identifier')) return [3, 5];
                    return [5, __values(Identifier(node.callee.property, scope, { getName: true }))];
                case 4:
                    key = _j.sent();
                    return [3, 6];
                case 5: throw new SyntaxError('Unexpected token');
                case 6:
                    getter = getGetter(object, key);
                    if (node.callee.object.type === 'Super' && getter) {
                        thisObject = scope.find('this').get();
                        func = getter.call(thisObject);
                    }
                    else {
                        func = object[key];
                    }
                    return [3, 9];
                case 7:
                    object = scope.find('this').get();
                    return [5, __values(evaluate(node.callee, scope))];
                case 8:
                    func = _j.sent();
                    _j.label = 9;
                case 9:
                    args = [];
                    _j.label = 10;
                case 10:
                    _j.trys.push([10, 17, 18, 19]);
                    _c = __values(node.arguments), _d = _c.next();
                    _j.label = 11;
                case 11:
                    if (!!_d.done) return [3, 16];
                    arg = _d.value;
                    if (!(arg.type === 'SpreadElement')) return [3, 13];
                    _f = (_e = args).concat;
                    return [5, __values(SpreadElement(arg, scope))];
                case 12:
                    args = _f.apply(_e, [_j.sent()]);
                    return [3, 15];
                case 13:
                    _h = (_g = args).push;
                    return [5, __values(evaluate(arg, scope))];
                case 14:
                    _h.apply(_g, [_j.sent()]);
                    _j.label = 15;
                case 15:
                    _d = _c.next();
                    return [3, 11];
                case 16: return [3, 19];
                case 17:
                    e_3_1 = _j.sent();
                    e_3 = { error: e_3_1 };
                    return [3, 19];
                case 18:
                    try {
                        if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                    }
                    finally { if (e_3) throw e_3.error; }
                    return [7];
                case 19:
                    if (func[ASYNC] && !async) {
                        return [2, func.apply(object, args).then()];
                    }
                    else {
                        return [2, func.apply(object, args)];
                    }
                    return [2];
            }
        });
    }
    function NewExpression(node, scope) {
        var e_4, _a, constructor, args, _b, _c, arg, _d, _e, _f, _g, e_4_1;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0: return [5, __values(evaluate(node.callee, scope))];
                case 1:
                    constructor = _h.sent();
                    args = [];
                    _h.label = 2;
                case 2:
                    _h.trys.push([2, 9, 10, 11]);
                    _b = __values(node.arguments), _c = _b.next();
                    _h.label = 3;
                case 3:
                    if (!!_c.done) return [3, 8];
                    arg = _c.value;
                    if (!(arg.type === 'SpreadElement')) return [3, 5];
                    _e = (_d = args).concat;
                    return [5, __values(SpreadElement(arg, scope))];
                case 4:
                    args = _e.apply(_d, [_h.sent()]);
                    return [3, 7];
                case 5:
                    _g = (_f = args).push;
                    return [5, __values(evaluate(arg, scope))];
                case 6:
                    _g.apply(_f, [_h.sent()]);
                    _h.label = 7;
                case 7:
                    _c = _b.next();
                    return [3, 3];
                case 8: return [3, 11];
                case 9:
                    e_4_1 = _h.sent();
                    e_4 = { error: e_4_1 };
                    return [3, 11];
                case 10:
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_4) throw e_4.error; }
                    return [7];
                case 11: return [2, new (constructor.bind.apply(constructor, __spread([void 0], args)))()];
            }
        });
    }
    function SequenceExpression(node, scope) {
        var e_5, _a, result, _b, _c, expression, e_5_1;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 5, 6, 7]);
                    _b = __values(node.expressions), _c = _b.next();
                    _d.label = 1;
                case 1:
                    if (!!_c.done) return [3, 4];
                    expression = _c.value;
                    return [5, __values(evaluate(expression, scope))];
                case 2:
                    result = _d.sent();
                    _d.label = 3;
                case 3:
                    _c = _b.next();
                    return [3, 1];
                case 4: return [3, 7];
                case 5:
                    e_5_1 = _d.sent();
                    e_5 = { error: e_5_1 };
                    return [3, 7];
                case 6:
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_5) throw e_5.error; }
                    return [7];
                case 7: return [2, result];
            }
        });
    }
    function ArrowFunctionExpression(node, scope) {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [5, __values(createFunc(node, scope))];
                case 1: return [2, _a.sent()];
            }
        });
    }
    function YieldExpression(node, scope) {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!node.delegate) return [3, 3];
                    return [5, __values(evaluate(node.argument, scope))];
                case 1: return [5, __values(_a.sent())];
                case 2:
                    _a.sent();
                    return [3, 6];
                case 3: return [5, __values(evaluate(node.argument, scope))];
                case 4: return [4, _a.sent()];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6: return [2];
            }
        });
    }
    function AwaitExpression(node, scope) {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(node.argument.type === 'CallExpression')) return [3, 3];
                    return [5, __values(CallExpression(node.argument, scope, { async: true }))];
                case 1: return [4, _a.sent()];
                case 2: return [2, _a.sent()];
                case 3: return [5, __values(evaluate(node.argument, scope))];
                case 4: return [4, _a.sent()];
                case 5: return [2, _a.sent()];
            }
        });
    }
    function TemplateLiteral(node, scope) {
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
                    return [5, __values(TemplateElement(temEl, scope))];
                case 2:
                    result = _a + _c.sent();
                    expr = expressions.shift();
                    if (!expr) return [3, 4];
                    _b = result;
                    return [5, __values(evaluate(expr, scope))];
                case 3:
                    result = _b + _c.sent();
                    _c.label = 4;
                case 4: return [3, 1];
                case 5: return [2, result];
            }
        });
    }
    function TaggedTemplateExpression(node, scope) {
        var e_6, _a, tagFunc, quasis, str, raw, expressions, args, _b, _c, n, _d, _e, e_6_1;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0: return [5, __values(evaluate(node.tag, scope))];
                case 1:
                    tagFunc = _f.sent();
                    quasis = node.quasi.quasis;
                    str = quasis.map(function (v) { return v.value.cooked; });
                    raw = quasis.map(function (v) { return v.value.raw; });
                    define(str, 'raw', {
                        value: freeze(raw)
                    });
                    expressions = node.quasi.expressions;
                    args = [];
                    if (!expressions) return [3, 9];
                    _f.label = 2;
                case 2:
                    _f.trys.push([2, 7, 8, 9]);
                    _b = __values(node.quasi.expressions), _c = _b.next();
                    _f.label = 3;
                case 3:
                    if (!!_c.done) return [3, 6];
                    n = _c.value;
                    _e = (_d = args).push;
                    return [5, __values(evaluate(n, scope))];
                case 4:
                    _e.apply(_d, [_f.sent()]);
                    _f.label = 5;
                case 5:
                    _c = _b.next();
                    return [3, 3];
                case 6: return [3, 9];
                case 7:
                    e_6_1 = _f.sent();
                    e_6 = { error: e_6_1 };
                    return [3, 9];
                case 8:
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_6) throw e_6.error; }
                    return [7];
                case 9: return [2, tagFunc.apply(void 0, __spread([freeze(str)], args))];
            }
        });
    }
    function TemplateElement(node, scope) {
        return __generator(this, function (_a) {
            return [2, node.value.raw];
        });
    }
    function ClassExpression(node, scope) {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [5, __values(createClass(node, scope))];
                case 1: return [2, _a.sent()];
            }
        });
    }
    function Super(node, scope, options) {
        var _a, getProto, superClass;
        if (options === void 0) { options = {}; }
        return __generator(this, function (_b) {
            _a = options.getProto, getProto = _a === void 0 ? false : _a;
            superClass = scope.find(SUPER).get();
            return [2, getProto ? superClass.prototype : superClass];
        });
    }
    function SpreadElement(node, scope) {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [5, __values(evaluate(node.argument, scope))];
                case 1: return [2, _a.sent()];
            }
        });
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
        YieldExpression: YieldExpression,
        AwaitExpression: AwaitExpression,
        TemplateLiteral: TemplateLiteral,
        TaggedTemplateExpression: TaggedTemplateExpression,
        TemplateElement: TemplateElement,
        ClassExpression: ClassExpression,
        Super: Super,
        SpreadElement: SpreadElement
    });

    function ObjectPattern(node, scope, options) {
        var e_1, _a, _b, _c, property, e_1_1;
        if (options === void 0) { options = {}; }
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 5, 6, 7]);
                    _b = __values(node.properties), _c = _b.next();
                    _d.label = 1;
                case 1:
                    if (!!_c.done) return [3, 4];
                    property = _c.value;
                    return [5, __values(AssignmentProperty(property, scope, options))];
                case 2:
                    _d.sent();
                    _d.label = 3;
                case 3:
                    _c = _b.next();
                    return [3, 1];
                case 4: return [3, 7];
                case 5:
                    e_1_1 = _d.sent();
                    e_1 = { error: e_1_1 };
                    return [3, 7];
                case 6:
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7];
                case 7: return [2];
            }
        });
    }
    function AssignmentProperty(node, scope, options) {
        var _a, kind, _b, hoist, _c, feed, value, name_1, key, name_2;
        if (options === void 0) { options = {}; }
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _a = options.kind, kind = _a === void 0 ? 'let' : _a, _b = options.hoist, hoist = _b === void 0 ? false : _b, _c = options.feed, feed = _c === void 0 ? {} : _c;
                    value = node.value;
                    if (!hoist) return [3, 5];
                    if (!(kind === 'var')) return [3, 4];
                    if (!(value.type === 'Identifier')) return [3, 2];
                    return [5, __values(Identifier(value, scope, { getName: true }))];
                case 1:
                    name_1 = _d.sent();
                    scope.var(name_1, undefined);
                    return [3, 4];
                case 2: return [5, __values(pattern$1(value, scope, { kind: kind, hoist: hoist }))];
                case 3:
                    _d.sent();
                    _d.label = 4;
                case 4: return [3, 14];
                case 5:
                    key = void 0;
                    if (!node.computed) return [3, 7];
                    return [5, __values(evaluate(node.key, scope))];
                case 6:
                    key = _d.sent();
                    return [3, 10];
                case 7:
                    if (!(node.key.type === 'Identifier')) return [3, 9];
                    return [5, __values(Identifier(node.key, scope, { getName: true }))];
                case 8:
                    key = _d.sent();
                    return [3, 10];
                case 9: throw new SyntaxError('Unexpected token');
                case 10:
                    if (!(value.type === 'Identifier')) return [3, 12];
                    return [5, __values(Identifier(value, scope, { getName: true }))];
                case 11:
                    name_2 = _d.sent();
                    scope[kind](name_2, feed[key]);
                    return [3, 14];
                case 12: return [5, __values(pattern$1(value, scope, { kind: kind, feed: feed[key] }))];
                case 13:
                    _d.sent();
                    _d.label = 14;
                case 14: return [2];
            }
        });
    }
    function ArrayPattern(node, scope, options) {
        var kind, _a, hoist, _b, feed, result, i, element, name_3, name_4, variable;
        if (options === void 0) { options = {}; }
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    kind = options.kind, _a = options.hoist, hoist = _a === void 0 ? false : _a, _b = options.feed, feed = _b === void 0 ? [] : _b;
                    result = [];
                    i = 0;
                    _c.label = 1;
                case 1:
                    if (!(i < node.elements.length)) return [3, 16];
                    element = node.elements[i];
                    if (!hoist) return [3, 6];
                    if (!(kind === 'var')) return [3, 5];
                    if (!(element.type === 'Identifier')) return [3, 3];
                    return [5, __values(Identifier(element, scope, { getName: true }))];
                case 2:
                    name_3 = _c.sent();
                    scope.var(name_3, undefined);
                    return [3, 5];
                case 3: return [5, __values(pattern$1(element, scope, { kind: kind, hoist: hoist }))];
                case 4:
                    _c.sent();
                    _c.label = 5;
                case 5: return [3, 15];
                case 6:
                    if (!(element.type === 'Identifier')) return [3, 11];
                    if (!kind) return [3, 8];
                    return [5, __values(Identifier(element, scope, { getName: true }))];
                case 7:
                    name_4 = _c.sent();
                    scope[kind](name_4, feed[i]);
                    return [3, 10];
                case 8: return [5, __values(Identifier(element, scope, { getVar: true }))];
                case 9:
                    variable = _c.sent();
                    variable.set(feed[i]);
                    result.push(variable.get());
                    _c.label = 10;
                case 10: return [3, 15];
                case 11:
                    if (!(element.type === 'RestElement')) return [3, 13];
                    return [5, __values(RestElement(element, scope, { kind: kind, feed: feed.slice(i) }))];
                case 12:
                    _c.sent();
                    return [3, 15];
                case 13: return [5, __values(pattern$1(element, scope, { kind: kind, feed: feed[i] }))];
                case 14:
                    _c.sent();
                    _c.label = 15;
                case 15:
                    i++;
                    return [3, 1];
                case 16:
                    if (result.length) {
                        return [2, result];
                    }
                    return [2];
            }
        });
    }
    function RestElement(node, scope, options) {
        var kind, _a, hoist, _b, feed, arg, name_5, name_6, variable;
        if (options === void 0) { options = {}; }
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    kind = options.kind, _a = options.hoist, hoist = _a === void 0 ? false : _a, _b = options.feed, feed = _b === void 0 ? [] : _b;
                    arg = node.argument;
                    if (!hoist) return [3, 5];
                    if (!(kind === 'var')) return [3, 4];
                    if (!(arg.type === 'Identifier')) return [3, 2];
                    return [5, __values(Identifier(arg, scope, { getName: true }))];
                case 1:
                    name_5 = _c.sent();
                    scope.var(name_5, undefined);
                    return [3, 4];
                case 2: return [5, __values(pattern$1(arg, scope, { kind: kind, hoist: hoist }))];
                case 3:
                    _c.sent();
                    _c.label = 4;
                case 4: return [3, 12];
                case 5:
                    if (!(arg.type === 'Identifier')) return [3, 10];
                    if (!kind) return [3, 7];
                    return [5, __values(Identifier(arg, scope, { getName: true }))];
                case 6:
                    name_6 = _c.sent();
                    scope[kind](name_6, feed);
                    return [3, 9];
                case 7: return [5, __values(Identifier(arg, scope, { getVar: true }))];
                case 8:
                    variable = _c.sent();
                    variable.set(feed);
                    _c.label = 9;
                case 9: return [3, 12];
                case 10: return [5, __values(pattern$1(arg, scope, { kind: kind, feed: feed }))];
                case 11:
                    _c.sent();
                    _c.label = 12;
                case 12: return [2];
            }
        });
    }
    function AssignmentPattern(node, scope) {
        var feed, name_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [5, __values(evaluate(node.right, scope))];
                case 1:
                    feed = _a.sent();
                    if (!(node.left.type === 'Identifier')) return [3, 3];
                    return [5, __values(Identifier(node.left, scope, { getName: true }))];
                case 2:
                    name_7 = _a.sent();
                    scope.let(name_7, feed);
                    return [3, 5];
                case 3: return [5, __values(pattern$1(node.left, scope, { feed: feed }))];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5: return [2];
            }
        });
    }

    var pattern = /*#__PURE__*/Object.freeze({
        ObjectPattern: ObjectPattern,
        AssignmentProperty: AssignmentProperty,
        ArrayPattern: ArrayPattern,
        RestElement: RestElement,
        AssignmentPattern: AssignmentPattern
    });

    function Program(program, scope) {
        var e_1, _a, _b, _c, node, e_1_1;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 5, 6, 7]);
                    _b = __values(program.body), _c = _b.next();
                    _d.label = 1;
                case 1:
                    if (!!_c.done) return [3, 4];
                    node = _c.value;
                    return [5, __values(evaluate(node, scope))];
                case 2:
                    _d.sent();
                    _d.label = 3;
                case 3:
                    _c = _b.next();
                    return [3, 1];
                case 4: return [3, 7];
                case 5:
                    e_1_1 = _d.sent();
                    e_1 = { error: e_1_1 };
                    return [3, 7];
                case 6:
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7];
                case 7: return [2];
            }
        });
    }

    var program = /*#__PURE__*/Object.freeze({
        Program: Program
    });

    function ExpressionStatement(node, scope) {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [5, __values(evaluate(node.expression, scope))];
                case 1:
                    _a.sent();
                    return [2];
            }
        });
    }
    function BlockStatement(block, scope, options) {
        var e_1, _a, _b, invasived, _c, hoisted, subScope, _d, _e, node, result, e_1_1;
        if (options === void 0) { options = {}; }
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    _b = options.invasived, invasived = _b === void 0 ? false : _b, _c = options.hoisted, hoisted = _c === void 0 ? false : _c;
                    subScope = invasived ? scope : new Scope(scope);
                    if (!!hoisted) return [3, 2];
                    return [5, __values(hoistFunc(block, subScope))];
                case 1:
                    _f.sent();
                    _f.label = 2;
                case 2:
                    _f.trys.push([2, 7, 8, 9]);
                    _d = __values(block.body), _e = _d.next();
                    _f.label = 3;
                case 3:
                    if (!!_e.done) return [3, 6];
                    node = _e.value;
                    return [5, __values(evaluate(node, subScope))];
                case 4:
                    result = _f.sent();
                    if (result === BREAK || result === CONTINUE || result === RETURN) {
                        return [2, result];
                    }
                    _f.label = 5;
                case 5:
                    _e = _d.next();
                    return [3, 3];
                case 6: return [3, 9];
                case 7:
                    e_1_1 = _f.sent();
                    e_1 = { error: e_1_1 };
                    return [3, 9];
                case 8:
                    try {
                        if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7];
                case 9: return [2];
            }
        });
    }
    function EmptyStatement() {
        return __generator(this, function (_a) {
            return [2];
        });
    }
    function DebuggerStatement() {
        return __generator(this, function (_a) {
            debugger;
            return [2];
        });
    }
    function ReturnStatement(node, scope) {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = RETURN;
                    if (!node.argument) return [3, 2];
                    return [5, __values(evaluate(node.argument, scope))];
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
    function BreakStatement() {
        return __generator(this, function (_a) {
            return [2, BREAK];
        });
    }
    function ContinueStatement() {
        return __generator(this, function (_a) {
            return [2, CONTINUE];
        });
    }
    function IfStatement(node, scope) {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [5, __values(evaluate(node.test, scope))];
                case 1:
                    if (!_a.sent()) return [3, 3];
                    return [5, __values(evaluate(node.consequent, scope))];
                case 2: return [2, _a.sent()];
                case 3: return [5, __values(evaluate(node.alternate, scope))];
                case 4: return [2, _a.sent()];
            }
        });
    }
    function SwitchStatement(node, scope) {
        var e_2, _a, discriminant, matched, _b, _c, eachCase, _d, _e, result, e_2_1;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0: return [5, __values(evaluate(node.discriminant, scope))];
                case 1:
                    discriminant = _f.sent();
                    matched = false;
                    _f.label = 2;
                case 2:
                    _f.trys.push([2, 10, 11, 12]);
                    _b = __values(node.cases), _c = _b.next();
                    _f.label = 3;
                case 3:
                    if (!!_c.done) return [3, 9];
                    eachCase = _c.value;
                    _d = !matched;
                    if (!_d) return [3, 6];
                    _e = !eachCase.test;
                    if (_e) return [3, 5];
                    return [5, __values(evaluate(eachCase.test, scope))];
                case 4:
                    _e = (_f.sent()) === discriminant;
                    _f.label = 5;
                case 5:
                    _d = (_e);
                    _f.label = 6;
                case 6:
                    if (_d) {
                        matched = true;
                    }
                    if (!matched) return [3, 8];
                    return [5, __values(SwitchCase(eachCase, scope))];
                case 7:
                    result = _f.sent();
                    if (result === BREAK || result === CONTINUE || result === RETURN) {
                        return [2, result];
                    }
                    _f.label = 8;
                case 8:
                    _c = _b.next();
                    return [3, 3];
                case 9: return [3, 12];
                case 10:
                    e_2_1 = _f.sent();
                    e_2 = { error: e_2_1 };
                    return [3, 12];
                case 11:
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_2) throw e_2.error; }
                    return [7];
                case 12: return [2];
            }
        });
    }
    function SwitchCase(node, scope) {
        var e_3, _a, _b, _c, statement, result, e_3_1;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 5, 6, 7]);
                    _b = __values(node.consequent), _c = _b.next();
                    _d.label = 1;
                case 1:
                    if (!!_c.done) return [3, 4];
                    statement = _c.value;
                    return [5, __values(evaluate(statement, scope))];
                case 2:
                    result = _d.sent();
                    if (result === BREAK || result === CONTINUE || result === RETURN) {
                        return [2, result];
                    }
                    _d.label = 3;
                case 3:
                    _c = _b.next();
                    return [3, 1];
                case 4: return [3, 7];
                case 5:
                    e_3_1 = _d.sent();
                    e_3 = { error: e_3_1 };
                    return [3, 7];
                case 6:
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_3) throw e_3.error; }
                    return [7];
                case 7: return [2];
            }
        });
    }
    function ThrowStatement(node, scope) {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [5, __values(evaluate(node.argument, scope))];
                case 1: throw _a.sent();
            }
        });
    }
    function TryStatement(node, scope) {
        var err_1, subScope, param, name_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, 10, 13]);
                    return [5, __values(BlockStatement(node.block, scope))];
                case 1: return [2, _a.sent()];
                case 2:
                    err_1 = _a.sent();
                    if (!node.handler) return [3, 8];
                    subScope = new Scope(scope);
                    param = node.handler.param;
                    if (!(param.type === 'Identifier')) return [3, 4];
                    return [5, __values(Identifier(param, subScope, { getName: true }))];
                case 3:
                    name_1 = _a.sent();
                    subScope.let(name_1, err_1);
                    return [3, 6];
                case 4: return [5, __values(pattern$1(param, scope, { feed: err_1 }))];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6: return [5, __values(CatchClause(node.handler, subScope))];
                case 7: return [2, _a.sent()];
                case 8: throw err_1;
                case 9: return [3, 13];
                case 10:
                    if (!node.finalizer) return [3, 12];
                    return [5, __values(BlockStatement(node.finalizer, scope))];
                case 11: return [2, _a.sent()];
                case 12: return [7];
                case 13: return [2];
            }
        });
    }
    function CatchClause(node, scope) {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [5, __values(BlockStatement(node.body, scope, { invasived: true }))];
                case 1: return [2, _a.sent()];
            }
        });
    }
    function WhileStatement(node, scope) {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [5, __values(evaluate(node.test, scope))];
                case 1:
                    if (!_a.sent()) return [3, 3];
                    return [5, __values(evaluate(node.body, scope))];
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
    function DoWhileStatement(node, scope) {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [5, __values(evaluate(node.body, scope))];
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
                case 2: return [5, __values(evaluate(node.test, scope))];
                case 3:
                    if (_a.sent()) return [3, 0];
                    _a.label = 4;
                case 4: return [2];
            }
        });
    }
    function ForStatement(node, scope) {
        var forScope, _a, subScope, result;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    forScope = new Scope(scope);
                    return [5, __values(evaluate(node.init, forScope))];
                case 1:
                    _b.sent();
                    _b.label = 2;
                case 2:
                    if (!node.test) return [3, 4];
                    return [5, __values(evaluate(node.test, forScope))];
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
                    return [5, __values(BlockStatement(node.body, subScope, { invasived: true }))];
                case 6:
                    result = _b.sent();
                    return [3, 9];
                case 7: return [5, __values(evaluate(node.body, subScope))];
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
                case 10: return [5, __values(evaluate(node.update, forScope))];
                case 11:
                    _b.sent();
                    return [3, 2];
                case 12: return [2];
            }
        });
    }
    function ForInStatement(node, scope) {
        var left, _a, _b, _i, value, subScope, variable, result;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    left = node.left;
                    _a = [];
                    return [5, __values(evaluate(node.right, scope))];
                case 1:
                    for (_b in _c.sent())
                        _a.push(_b);
                    _i = 0;
                    _c.label = 2;
                case 2:
                    if (!(_i < _a.length)) return [3, 14];
                    value = _a[_i];
                    subScope = new Scope(scope);
                    if (!(left.type === 'VariableDeclaration')) return [3, 4];
                    return [5, __values(VariableDeclaration(left, subScope, { feed: value }))];
                case 3:
                    _c.sent();
                    return [3, 8];
                case 4:
                    if (!(left.type === 'Identifier')) return [3, 6];
                    return [5, __values(Identifier(left, scope, { getVar: true }))];
                case 5:
                    variable = _c.sent();
                    variable.set(value);
                    return [3, 8];
                case 6: return [5, __values(pattern$1(left, scope, { feed: value }))];
                case 7:
                    _c.sent();
                    _c.label = 8;
                case 8:
                    result = void 0;
                    if (!(node.body.type === 'BlockStatement')) return [3, 10];
                    return [5, __values(BlockStatement(node.body, subScope, { invasived: true }))];
                case 9:
                    result = _c.sent();
                    return [3, 12];
                case 10: return [5, __values(evaluate(node.body, subScope))];
                case 11:
                    result = _c.sent();
                    _c.label = 12;
                case 12:
                    if (result === BREAK) {
                        return [3, 14];
                    }
                    else if (result === CONTINUE) {
                        return [3, 13];
                    }
                    else if (result === RETURN) {
                        return [2, result];
                    }
                    _c.label = 13;
                case 13:
                    _i++;
                    return [3, 2];
                case 14: return [2];
            }
        });
    }
    function ForOfStatement(node, scope) {
        var e_4, _a, left, _b, _c, value, subScope, variable, result, e_4_1;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    left = node.left;
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 16, 17, 18]);
                    return [5, __values(evaluate(node.right, scope))];
                case 2:
                    _b = __values.apply(void 0, [_d.sent()]), _c = _b.next();
                    _d.label = 3;
                case 3:
                    if (!!_c.done) return [3, 15];
                    value = _c.value;
                    subScope = new Scope(scope);
                    if (!(left.type === 'VariableDeclaration')) return [3, 5];
                    return [5, __values(VariableDeclaration(left, subScope, { feed: value }))];
                case 4:
                    _d.sent();
                    return [3, 9];
                case 5:
                    if (!(left.type === 'Identifier')) return [3, 7];
                    return [5, __values(Identifier(left, scope, { getVar: true }))];
                case 6:
                    variable = _d.sent();
                    variable.set(value);
                    return [3, 9];
                case 7: return [5, __values(pattern$1(left, scope, { feed: value }))];
                case 8:
                    _d.sent();
                    _d.label = 9;
                case 9:
                    result = void 0;
                    if (!(node.body.type === 'BlockStatement')) return [3, 11];
                    return [5, __values(BlockStatement(node.body, subScope, { invasived: true }))];
                case 10:
                    result = _d.sent();
                    return [3, 13];
                case 11: return [5, __values(evaluate(node.body, subScope))];
                case 12:
                    result = _d.sent();
                    _d.label = 13;
                case 13:
                    if (result === BREAK) {
                        return [3, 15];
                    }
                    else if (result === CONTINUE) {
                        return [3, 14];
                    }
                    else if (result === RETURN) {
                        return [2, result];
                    }
                    _d.label = 14;
                case 14:
                    _c = _b.next();
                    return [3, 3];
                case 15: return [3, 18];
                case 16:
                    e_4_1 = _d.sent();
                    e_4 = { error: e_4_1 };
                    return [3, 18];
                case 17:
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_4) throw e_4.error; }
                    return [7];
                case 18: return [2];
            }
        });
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
        var handler;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!node)
                        return [2];
                    handler = evaluateOps[node.type];
                    if (!handler) return [3, 2];
                    return [5, __values(handler(node, scope))];
                case 1: return [2, _a.sent()];
                case 2: throw new Error(node.type + " isn't implemented");
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
                    return [5, __values(FunctionDeclaration(statement, scope))];
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
                    return [5, __values(FunctionDeclaration(statement, scope))];
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
        var e_1, _a, e_2, _b, e_3, _c, e_4, _d, e_5, _e, e_6, _f, _g, _h, _j, node, e_1_1, _k, _l, eachCase, _m, _o, node, e_3_1, e_2_1, tryBlock, tryBlock_1, tryBlock_1_1, node, e_4_1, catchBlock, catchBlock_1, catchBlock_1_1, node, e_5_1, finalBlock, finalBlock_1, finalBlock_1_1, node, e_6_1;
        return __generator(this, function (_p) {
            switch (_p.label) {
                case 0:
                    _g = statement.type;
                    switch (_g) {
                        case 'VariableDeclaration': return [3, 1];
                        case 'WhileStatement': return [3, 3];
                        case 'DoWhileStatement': return [3, 3];
                        case 'ForStatement': return [3, 3];
                        case 'ForInStatement': return [3, 3];
                        case 'ForOfStatement': return [3, 3];
                        case 'BlockStatement': return [3, 5];
                        case 'SwitchStatement': return [3, 13];
                        case 'TryStatement': return [3, 27];
                    }
                    return [3, 52];
                case 1: return [5, __values(VariableDeclaration(statement, scope, { hoist: true }))];
                case 2:
                    _p.sent();
                    return [3, 52];
                case 3: return [5, __values(hoistVarRecursion(statement.body, scope))];
                case 4:
                    _p.sent();
                    return [3, 52];
                case 5:
                    _p.trys.push([5, 10, 11, 12]);
                    _h = __values(statement.body), _j = _h.next();
                    _p.label = 6;
                case 6:
                    if (!!_j.done) return [3, 9];
                    node = _j.value;
                    return [5, __values(hoistVarRecursion(node, scope))];
                case 7:
                    _p.sent();
                    _p.label = 8;
                case 8:
                    _j = _h.next();
                    return [3, 6];
                case 9: return [3, 12];
                case 10:
                    e_1_1 = _p.sent();
                    e_1 = { error: e_1_1 };
                    return [3, 12];
                case 11:
                    try {
                        if (_j && !_j.done && (_a = _h.return)) _a.call(_h);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7];
                case 12: return [3, 52];
                case 13:
                    _p.trys.push([13, 24, 25, 26]);
                    _k = __values(statement.cases), _l = _k.next();
                    _p.label = 14;
                case 14:
                    if (!!_l.done) return [3, 23];
                    eachCase = _l.value;
                    _p.label = 15;
                case 15:
                    _p.trys.push([15, 20, 21, 22]);
                    _m = __values(eachCase.consequent), _o = _m.next();
                    _p.label = 16;
                case 16:
                    if (!!_o.done) return [3, 19];
                    node = _o.value;
                    return [5, __values(hoistVarRecursion(node, scope))];
                case 17:
                    _p.sent();
                    _p.label = 18;
                case 18:
                    _o = _m.next();
                    return [3, 16];
                case 19: return [3, 22];
                case 20:
                    e_3_1 = _p.sent();
                    e_3 = { error: e_3_1 };
                    return [3, 22];
                case 21:
                    try {
                        if (_o && !_o.done && (_c = _m.return)) _c.call(_m);
                    }
                    finally { if (e_3) throw e_3.error; }
                    return [7];
                case 22:
                    _l = _k.next();
                    return [3, 14];
                case 23: return [3, 26];
                case 24:
                    e_2_1 = _p.sent();
                    e_2 = { error: e_2_1 };
                    return [3, 26];
                case 25:
                    try {
                        if (_l && !_l.done && (_b = _k.return)) _b.call(_k);
                    }
                    finally { if (e_2) throw e_2.error; }
                    return [7];
                case 26: return [3, 52];
                case 27:
                    tryBlock = statement.block.body;
                    _p.label = 28;
                case 28:
                    _p.trys.push([28, 33, 34, 35]);
                    tryBlock_1 = __values(tryBlock), tryBlock_1_1 = tryBlock_1.next();
                    _p.label = 29;
                case 29:
                    if (!!tryBlock_1_1.done) return [3, 32];
                    node = tryBlock_1_1.value;
                    return [5, __values(hoistVarRecursion(node, scope))];
                case 30:
                    _p.sent();
                    _p.label = 31;
                case 31:
                    tryBlock_1_1 = tryBlock_1.next();
                    return [3, 29];
                case 32: return [3, 35];
                case 33:
                    e_4_1 = _p.sent();
                    e_4 = { error: e_4_1 };
                    return [3, 35];
                case 34:
                    try {
                        if (tryBlock_1_1 && !tryBlock_1_1.done && (_d = tryBlock_1.return)) _d.call(tryBlock_1);
                    }
                    finally { if (e_4) throw e_4.error; }
                    return [7];
                case 35:
                    catchBlock = statement.handler && statement.handler.body.body;
                    if (!catchBlock) return [3, 43];
                    _p.label = 36;
                case 36:
                    _p.trys.push([36, 41, 42, 43]);
                    catchBlock_1 = __values(catchBlock), catchBlock_1_1 = catchBlock_1.next();
                    _p.label = 37;
                case 37:
                    if (!!catchBlock_1_1.done) return [3, 40];
                    node = catchBlock_1_1.value;
                    return [5, __values(hoistVarRecursion(node, scope))];
                case 38:
                    _p.sent();
                    _p.label = 39;
                case 39:
                    catchBlock_1_1 = catchBlock_1.next();
                    return [3, 37];
                case 40: return [3, 43];
                case 41:
                    e_5_1 = _p.sent();
                    e_5 = { error: e_5_1 };
                    return [3, 43];
                case 42:
                    try {
                        if (catchBlock_1_1 && !catchBlock_1_1.done && (_e = catchBlock_1.return)) _e.call(catchBlock_1);
                    }
                    finally { if (e_5) throw e_5.error; }
                    return [7];
                case 43:
                    finalBlock = statement.finalizer && statement.finalizer.body;
                    if (!finalBlock) return [3, 51];
                    _p.label = 44;
                case 44:
                    _p.trys.push([44, 49, 50, 51]);
                    finalBlock_1 = __values(finalBlock), finalBlock_1_1 = finalBlock_1.next();
                    _p.label = 45;
                case 45:
                    if (!!finalBlock_1_1.done) return [3, 48];
                    node = finalBlock_1_1.value;
                    return [5, __values(hoistVarRecursion(node, scope))];
                case 46:
                    _p.sent();
                    _p.label = 47;
                case 47:
                    finalBlock_1_1 = finalBlock_1.next();
                    return [3, 45];
                case 48: return [3, 51];
                case 49:
                    e_6_1 = _p.sent();
                    e_6 = { error: e_6_1 };
                    return [3, 51];
                case 50:
                    try {
                        if (finalBlock_1_1 && !finalBlock_1_1.done && (_f = finalBlock_1.return)) _f.call(finalBlock_1);
                    }
                    finally { if (e_6) throw e_6.error; }
                    return [7];
                case 51: return [3, 52];
                case 52: return [2];
            }
        });
    }
    function pattern$1(node, scope, options) {
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
                case 1: return [5, __values(ObjectPattern(node, scope, options))];
                case 2: return [2, _b.sent()];
                case 3: return [5, __values(ArrayPattern(node, scope, options))];
                case 4: return [2, _b.sent()];
                case 5: return [5, __values(RestElement(node, scope, options))];
                case 6: return [2, _b.sent()];
                case 7: return [5, __values(AssignmentPattern(node, scope))];
                case 8: return [2, _b.sent()];
                case 9: throw new SyntaxError('Unexpected token');
            }
        });
    }
    function createFunc(node, scope, options) {
        var superClass, params, tmpGenerator, func;
        if (options === void 0) { options = {}; }
        return __generator(this, function (_a) {
            superClass = options.superClass;
            params = node.params;
            tmpGenerator = function () {
                var _i, subScope, i, param, name_1, result;
                var args = [];
                for (_i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (node.type !== 'ArrowFunctionExpression') {
                                subScope = new Scope(scope, true);
                                subScope.const('this', this);
                                subScope.let('arguments', arguments);
                                if (superClass) {
                                    subScope.const(SUPER, superClass);
                                }
                            }
                            else {
                                subScope = new Scope(scope);
                            }
                            i = 0;
                            _a.label = 1;
                        case 1:
                            if (!(i < params.length)) return [3, 8];
                            param = params[i];
                            if (!(param.type === 'Identifier')) return [3, 3];
                            return [5, __values(Identifier(param, subScope, { getName: true }))];
                        case 2:
                            name_1 = _a.sent();
                            subScope.let(name_1, args[i]);
                            return [3, 7];
                        case 3:
                            if (!(param.type === 'RestElement')) return [3, 5];
                            return [5, __values(RestElement(param, subScope, { kind: 'let', feed: args.slice(i) }))];
                        case 4:
                            _a.sent();
                            return [3, 7];
                        case 5: return [5, __values(pattern$1(param, subScope, { feed: args[i] }))];
                        case 6:
                            _a.sent();
                            _a.label = 7;
                        case 7:
                            i++;
                            return [3, 1];
                        case 8:
                            if (!(node.body.type === 'BlockStatement')) return [3, 11];
                            return [5, __values(hoist(node.body, subScope))];
                        case 9:
                            _a.sent();
                            return [5, __values(BlockStatement(node.body, subScope, {
                                    invasived: true,
                                    hoisted: true
                                }))];
                        case 10:
                            result = _a.sent();
                            return [3, 13];
                        case 11: return [5, __values(evaluate(node.body, subScope))];
                        case 12:
                            result = _a.sent();
                            _a.label = 13;
                        case 13:
                            if (result === RETURN) {
                                return [2, result.RES];
                            }
                            return [2];
                    }
                });
            };
            if (node.async) {
                func = function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    return runAsync.apply(void 0, __spread([tmpGenerator.bind(this)], args));
                };
                define(func, ASYNC, { value: true });
            }
            else if (node.generator) {
                func = tmpGenerator;
            }
            else {
                func = function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    return runGenerator.apply(void 0, __spread([tmpGenerator.bind(this)], args));
                };
            }
            if (node.type === 'FunctionDeclaration') {
                define(func, 'name', {
                    value: node.id.name,
                    configurable: true
                });
            }
            define(func, 'length', {
                value: params.length,
                configurable: true
            });
            return [2, func];
        });
    }
    function createClass(node, scope) {
        var e_7, _a, superClass, klass, _b, _c, method, e_7_1;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [5, __values(evaluate(node.superClass, scope))];
                case 1:
                    superClass = _d.sent();
                    klass = function () { };
                    _d.label = 2;
                case 2:
                    _d.trys.push([2, 7, 8, 9]);
                    _b = __values(node.body.body), _c = _b.next();
                    _d.label = 3;
                case 3:
                    if (!!_c.done) return [3, 6];
                    method = _c.value;
                    if (!(method.kind === 'constructor')) return [3, 5];
                    return [5, __values(createFunc(method.value, scope, { superClass: superClass }))];
                case 4:
                    klass = _d.sent();
                    return [3, 6];
                case 5:
                    _c = _b.next();
                    return [3, 3];
                case 6: return [3, 9];
                case 7:
                    e_7_1 = _d.sent();
                    e_7 = { error: e_7_1 };
                    return [3, 9];
                case 8:
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_7) throw e_7.error; }
                    return [7];
                case 9:
                    if (superClass) {
                        inherits(klass, superClass);
                    }
                    return [5, __values(ClassBody(node.body, scope, { klass: klass }))];
                case 10:
                    _d.sent();
                    define(klass, 'name', {
                        value: node.id.name,
                        configurable: true
                    });
                    return [2, klass];
            }
        });
    }

    var version = "0.3.0";

    var Sval = (function () {
        function Sval(options) {
            if (options === void 0) { options = {}; }
            this.options = {};
            this.scope = new Scope(null, true);
            this.exports = {};
            var ecmaVer = options.ecmaVer, _a = options.sandBox, sandBox = _a === void 0 ? true : _a;
            if ([3, 5, 6, 7, 8, 2015, 2016, 2017].indexOf(ecmaVer) === -1) {
                ecmaVer = 7;
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
            var _a, e_1, _b;
            if (typeof nameOrModules === 'string') {
                nameOrModules = (_a = {}, _a[nameOrModules] = mod, _a);
            }
            if (typeof nameOrModules !== 'object')
                return;
            var names = getOwnNames(nameOrModules);
            try {
                for (var names_1 = __values(names), names_1_1 = names_1.next(); !names_1_1.done; names_1_1 = names_1.next()) {
                    var name_1 = names_1_1.value;
                    this.scope.var(name_1, nameOrModules[name_1]);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (names_1_1 && !names_1_1.done && (_b = names_1.return)) _b.call(names_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        };
        Sval.prototype.run = function (code) {
            var ast = acorn.parse(code, this.options);
            runGenerator(hoist, ast, this.scope);
            runGenerator(evaluate, ast, this.scope);
        };
        Sval.version = version;
        return Sval;
    }());

    return Sval;

}));
