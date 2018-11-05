"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.freeze = Object.freeze;
exports.define = Object.defineProperty;
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
exports.walk = require('acorn/dist/walk').simple;
//# sourceMappingURL=util.js.map