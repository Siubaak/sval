"use strict";
var __read = (this && this.__read) || function (o, n) {
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
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.freeze = Object.freeze;
exports.define = Object.defineProperty;
exports.getDptor = Object.getOwnPropertyDescriptor;
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(obj, key) {
    return hasOwnProperty.call(obj, key);
}
exports.hasOwn = hasOwn;
var getOwnPropertyNames = Object.getOwnPropertyNames;
function getOwnNames(obj) {
    return getOwnPropertyNames(obj);
}
exports.getOwnNames = getOwnNames;
var getPrototypeOf = Object.getPrototypeOf;
function getProto(obj) {
    return getPrototypeOf ? getPrototypeOf(obj) : obj.__proto__;
}
exports.getProto = getProto;
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
exports.getGetter = getGetter;
function getSetter(obj, key) {
    return getGetterOrSetter('set', obj, key);
}
exports.getSetter = getSetter;
var create = Object.create;
function inherits(subClass, superClass) {
    subClass.prototype = create(superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
        }
    });
}
exports.inherits = inherits;
function assignPolyfill() {
    var objects = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        objects[_i] = arguments[_i];
    }
    if (objects.length === 0) {
        return null;
    }
    else {
        var obj = objects[0];
        for (var i = 1; i < objects.length; ++i) {
            for (var key in objects[i]) {
                if (hasOwn(objects[i], key)) {
                    obj[key] = objects[i][key];
                }
            }
        }
        return obj;
    }
}
exports.assign = typeof Object.assign === 'function'
    ? Object.assign
    : assignPolyfill;
var win = exports.assign({}, window);
function createSandBox() {
    return exports.assign({}, win);
}
exports.createSandBox = createSandBox;
function createSymbol(key) {
    return Symbol ? Symbol(key) : "__" + key + "_" + Math.random().toString(36).substring(2);
}
exports.createSymbol = createSymbol;
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
exports.runGenerator = runGenerator;
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
exports.runAsync = runAsync;
//# sourceMappingURL=util.js.map