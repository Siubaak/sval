"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
};
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var scope_1 = require("../scope");
var _1 = require(".");
var helper_1 = require("../share/helper");
var util_1 = require("../share/util");
var const_1 = require("../share/const");
var statement_1 = require("./statement");
var identifier_1 = require("./identifier");
function FunctionDeclaration(node, scope) {
    var params = node.params;
    var func;
    if (node.generator) {
        func = function () {
            var args = [];
            for (_i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _i, subScope, i, param, name_1, generator, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        subScope = new scope_1.default(scope, true);
                        subScope.const('this', this);
                        subScope.let('arguments', arguments);
                        for (i = 0; i < params.length; i++) {
                            param = params[i];
                            if (param.type === 'Identifier') {
                                name_1 = identifier_1.Identifier(param, scope, { getName: true });
                                subScope.let(name_1, args[i]);
                            }
                            else {
                                helper_1.pattern(param, scope, { feed: args[i] });
                            }
                        }
                        helper_1.hoist(node.body, subScope);
                        generator = statement_1.BlockStatement(node.body, subScope, {
                            invasived: true,
                            hoisted: true,
                            generator: true
                        });
                        return [5, __values(generator())];
                    case 1:
                        result = _a.sent();
                        if (result === const_1.RETURN) {
                            return [2, result.RES];
                        }
                        return [2];
                }
            });
        };
        util_1.define(func, 'name', {
            value: node.id.name,
            configurable: true,
        });
        util_1.define(func, 'length', {
            value: params.length,
            configurable: true,
        });
    }
    else {
        func = helper_1.createFunc(node, scope);
    }
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
                var name_2 = identifier_1.Identifier(node.id, scope, { getName: true });
                scope.var(name_2, undefined);
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
            var name_3 = identifier_1.Identifier(node.id, scope, { getName: true });
            if (!scope[kind](name_3, value)) {
                throw new SyntaxError("Identifier '" + name_3 + "' has already been declared");
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
//# sourceMappingURL=declaration.js.map