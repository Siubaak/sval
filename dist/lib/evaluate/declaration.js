"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var scope_1 = require("../scope");
var _1 = require(".");
var const_1 = require("../share/const");
var hoisting_1 = require("../share/hoisting");
var statement_1 = require("./statement");
function FunctionDeclaration(node, scope) {
    scope.var(node.id.name, function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var subScope = new scope_1.default(scope, true);
        subScope.const('this', this);
        subScope.let('arguments', arguments);
        var params = node.params;
        for (var i = 0; i < params.length; i++) {
            var name_1 = params[i].name;
            subScope.let(name_1, args[i]);
        }
        hoisting_1.default(node.body, subScope);
        var result = statement_1.BlockStatement(node.body, subScope, { invasived: true });
        if (result === const_1.RETURN) {
            return result.RES;
        }
    });
}
exports.FunctionDeclaration = FunctionDeclaration;
function VariableDeclaration(node, scope, options) {
    if (options === void 0) { options = {}; }
    var _a = options.hoisting, hoisting = _a === void 0 ? false : _a;
    for (var _i = 0, _b = node.declarations; _i < _b.length; _i++) {
        var declarator = _b[_i];
        VariableDeclarator(declarator, scope, { kind: node.kind, hoisting: hoisting });
    }
}
exports.VariableDeclaration = VariableDeclaration;
function VariableDeclarator(node, scope, options) {
    if (options === void 0) { options = {}; }
    var _a = options.kind, kind = _a === void 0 ? 'var' : _a, _b = options.hoisting, hoisting = _b === void 0 ? false : _b;
    var name = node.id.name;
    if (hoisting) {
        if (kind === 'var') {
            scope.var(name, undefined);
        }
    }
    else if (kind === 'var'
        || kind === 'let'
        || kind === 'const') {
        var value = _1.default(node.init, scope);
        if (!scope[kind](name, value)) {
            throw new SyntaxError("Identifier '" + name + "' has already been declared");
        }
    }
    else {
        throw new SyntaxError('Unexpected identifier');
    }
}
exports.VariableDeclarator = VariableDeclarator;
//# sourceMappingURL=declaration.js.map