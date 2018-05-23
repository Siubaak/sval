"use strict";
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
function createFunc(node, scope) {
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
            subScope.let(name, args[i]);
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
    if (node.type !== 'ArrowFunctionExpression') {
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
//# sourceMappingURL=helper.js.map