"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
var helper_1 = require("../share/helper");
var util_1 = require("../share/util");
var identifier_1 = require("./identifier");
function FunctionDeclaration(node, scope) {
    var func = node.generator ? helper_1.createFakeGenerator(node, scope) : helper_1.createFunc(node, scope);
    scope.let(node.id.name, func);
}
exports.FunctionDeclaration = FunctionDeclaration;
function VariableDeclaration(node, scope, options) {
    if (options === void 0) { options = {}; }
    for (var _i = 0, _a = node.declarations; _i < _a.length; _i++) {
        var declarator = _a[_i];
        VariableDeclarator(declarator, scope, __assign({ kind: node.kind }, options));
    }
}
exports.VariableDeclaration = VariableDeclaration;
function VariableDeclarator(node, scope, options) {
    if (options === void 0) { options = {}; }
    var _a = options.kind, kind = _a === void 0 ? 'let' : _a, _b = options.hoist, hoist = _b === void 0 ? false : _b, feed = options.feed;
    if (hoist) {
        if (kind === 'var') {
            if (node.id.type === 'Identifier') {
                var name_1 = identifier_1.Identifier(node.id, scope, { getName: true });
                scope.var(name_1, undefined);
            }
            else {
                helper_1.pattern(node.id, scope, { kind: kind, hoist: hoist });
            }
        }
    }
    else if (kind === 'var'
        || kind === 'let'
        || kind === 'const') {
        var value = typeof feed === 'undefined' ? _1.default(node.init, scope) : feed;
        if (node.id.type === 'Identifier') {
            var name_2 = identifier_1.Identifier(node.id, scope, { getName: true });
            if (!scope[kind](name_2, value)) {
                throw new SyntaxError("Identifier '" + name_2 + "' has already been declared");
            }
        }
        else {
            helper_1.pattern(node.id, scope, { kind: kind, feed: value });
        }
    }
    else {
        throw new SyntaxError('Unexpected identifier');
    }
}
exports.VariableDeclarator = VariableDeclarator;
function ClassDeclaration(node, scope) {
    scope.let(node.id.name, helper_1.createClass(node, scope));
}
exports.ClassDeclaration = ClassDeclaration;
function ClassBody(node, scope, options) {
    if (options === void 0) { options = {}; }
    var _a = options.klass, klass = _a === void 0 ? function () { } : _a;
    for (var _i = 0, _b = node.body; _i < _b.length; _i++) {
        var method = _b[_i];
        MethodDefinition(method, scope, { klass: klass });
    }
}
exports.ClassBody = ClassBody;
function MethodDefinition(node, scope, options) {
    if (options === void 0) { options = {}; }
    var _a = options.klass, klass = _a === void 0 ? function () { } : _a;
    var key;
    if (node.computed) {
        key = _1.default(node.key, scope);
    }
    else if (node.key.type === 'Identifier') {
        key = identifier_1.Identifier(node.key, scope, { getName: true });
    }
    else {
        throw new SyntaxError('Unexpected token');
    }
    var obj = node.static ? klass : klass.prototype;
    var value = helper_1.createFunc(node.value, scope);
    switch (node.kind) {
        case 'constructor':
            break;
        case 'method':
            util_1.define(obj, key, {
                value: value,
                writable: true,
                configurable: true,
            });
            break;
        case 'get':
            util_1.define(obj, key, {
                get: value,
                configurable: true,
            });
            break;
        case 'set':
            util_1.define(obj, key, {
                set: value,
                configurable: true,
            });
            break;
        default:
            throw new SyntaxError('Unexpected token');
    }
}
exports.MethodDefinition = MethodDefinition;
//# sourceMappingURL=declaration.js.map