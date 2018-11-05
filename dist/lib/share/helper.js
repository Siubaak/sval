"use strict";
var __generator = (this && this.__generator) || function (thisArg, body) {
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
var evaluate_1 = require("../evaluate");
var util_1 = require("./util");
var const_1 = require("./const");
var statement_1 = require("../evaluate/statement");
var declaration_1 = require("../evaluate/declaration");
var identifier_1 = require("../evaluate/identifier");
var pattern_1 = require("../evaluate/pattern");
function hoist(block, scope) {
    for (var i = 0; i < block.body.length; i++) {
        var statement = block.body[i];
        if (statement.type === 'ImportDeclaration'
            || statement.type === 'ExportNamedDeclaration'
            || statement.type === 'ExportDefaultDeclaration'
            || statement.type === 'ExportAllDeclaration') {
            continue;
        }
        if (statement.type === 'FunctionDeclaration') {
            declaration_1.FunctionDeclaration(statement, scope);
            block.body[i] = null;
        }
        else {
            hoistVarRecursion(statement, scope);
        }
    }
}
exports.hoist = hoist;
function hoistFunc(block, scope) {
    for (var i = 0; i < block.body.length; i++) {
        var statement = block.body[i];
        if (statement.type === 'FunctionDeclaration') {
            declaration_1.FunctionDeclaration(statement, scope);
            block.body[i] = null;
        }
    }
}
exports.hoistFunc = hoistFunc;
function hoistVarRecursion(statement, scope) {
    switch (statement.type) {
        case 'VariableDeclaration':
            declaration_1.VariableDeclaration(statement, scope, { hoist: true });
            break;
        case 'WhileStatement':
        case 'DoWhileStatement':
        case 'ForStatement':
        case 'ForInStatement':
        case 'ForOfStatement':
            hoistVarRecursion(statement.body, scope);
            break;
        case 'BlockStatement':
            for (var _i = 0, _a = statement.body; _i < _a.length; _i++) {
                var node = _a[_i];
                hoistVarRecursion(node, scope);
            }
            break;
        case 'SwitchStatement':
            for (var _b = 0, _c = statement.cases; _b < _c.length; _b++) {
                var eachCase = _c[_b];
                for (var _d = 0, _e = eachCase.consequent; _d < _e.length; _d++) {
                    var node = _e[_d];
                    hoistVarRecursion(node, scope);
                }
            }
            break;
        case 'TryStatement': {
            var tryBlock = statement.block.body;
            for (var _f = 0, tryBlock_1 = tryBlock; _f < tryBlock_1.length; _f++) {
                var node = tryBlock_1[_f];
                hoistVarRecursion(node, scope);
            }
            var catchBlock = statement.handler && statement.handler.body.body;
            if (catchBlock) {
                for (var _g = 0, catchBlock_1 = catchBlock; _g < catchBlock_1.length; _g++) {
                    var node = catchBlock_1[_g];
                    hoistVarRecursion(node, scope);
                }
            }
            var finalBlock = statement.finalizer && statement.finalizer.body;
            if (finalBlock) {
                for (var _h = 0, finalBlock_1 = finalBlock; _h < finalBlock_1.length; _h++) {
                    var node = finalBlock_1[_h];
                    hoistVarRecursion(node, scope);
                }
            }
            break;
        }
    }
}
function pattern(node, scope, options) {
    if (options === void 0) { options = {}; }
    switch (node.type) {
        case 'ObjectPattern':
            return pattern_1.ObjectPattern(node, scope, options);
        case 'ArrayPattern':
            return pattern_1.ArrayPattern(node, scope, options);
        case 'RestElement':
            return pattern_1.RestElement(node, scope, options);
        case 'AssignmentPattern':
            return pattern_1.AssignmentPattern(node, scope);
        default:
            throw new SyntaxError('Unexpected token');
    }
}
exports.pattern = pattern;
function createFunc(node, scope, options) {
    if (options === void 0) { options = {}; }
    var superClass = options.superClass;
    var params = node.params;
    var func = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var subScope;
        if (node.type !== 'ArrowFunctionExpression') {
            subScope = new scope_1.default(scope, true);
            subScope.const('this', this);
            subScope.let('arguments', arguments);
            if (superClass) {
                subScope.const(const_1.SUPER, superClass);
            }
        }
        else {
            subScope = new scope_1.default(scope);
        }
        for (var i = 0; i < params.length; i++) {
            var param = params[i];
            if (param.type === 'Identifier') {
                var name_1 = identifier_1.Identifier(param, scope, { getName: true });
                subScope.let(name_1, args[i]);
            }
            else {
                pattern(param, scope, { feed: args[i] });
            }
        }
        var result;
        if (node.body.type === 'BlockStatement') {
            hoist(node.body, subScope);
            result = statement_1.BlockStatement(node.body, subScope, {
                invasived: true,
                hoisted: true,
            });
        }
        else {
            result = evaluate_1.default(node.body, subScope);
        }
        if (result === const_1.RETURN) {
            return result.RES;
        }
    };
    if (node.type === 'FunctionDeclaration') {
        util_1.define(func, 'name', {
            value: node.id.name,
            configurable: true,
        });
    }
    util_1.define(func, 'length', {
        value: params.length,
        configurable: true,
    });
    return func;
}
exports.createFunc = createFunc;
function createFakeGenerator(node, scope) {
    var params = node.params;
    var func = function () {
        var _i, subScope, i, param, name_2, generator, result;
        var args = [];
        for (_i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    subScope = new scope_1.default(scope, true);
                    subScope.const('this', this);
                    subScope.let('arguments', arguments);
                    for (i = 0; i < params.length; i++) {
                        param = params[i];
                        if (param.type === 'Identifier') {
                            name_2 = identifier_1.Identifier(param, scope, { getName: true });
                            subScope.let(name_2, args[i]);
                        }
                        else {
                            pattern(param, scope, { feed: args[i] });
                        }
                    }
                    hoist(node.body, subScope);
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
    return func;
}
exports.createFakeGenerator = createFakeGenerator;
function createClass(node, scope) {
    var superClass = evaluate_1.default(node.superClass, scope);
    var klass = function () { };
    for (var _i = 0, _a = node.body.body; _i < _a.length; _i++) {
        var method = _a[_i];
        if (method.kind === 'constructor') {
            klass = createFunc(method.value, scope, { superClass: superClass });
            break;
        }
    }
    if (superClass) {
        util_1.inherits(klass, superClass);
    }
    declaration_1.ClassBody(node.body, scope, { klass: klass });
    util_1.define(klass, 'name', {
        value: node.id.name,
        configurable: true,
    });
    return klass;
}
exports.createClass = createClass;
//# sourceMappingURL=helper.js.map