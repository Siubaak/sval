"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var scope_1 = require("../scope");
var _1 = require(".");
var const_1 = require("../share/const");
function FunctionDeclaration(node, scope) {
    scope.var(node.id.name, function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var subScope = new scope_1.default('function', scope);
        subScope.invasive();
        subScope.const('this', this);
        subScope.const('arguments', arguments);
        var params = node.params;
        for (var i = 0; i < params.length; i++) {
            var name_1 = params[i].name;
            subScope.let(name_1, args[i]);
        }
        var result = _1.default(node.body, subScope);
        if (result === const_1.RETURN) {
            return result.RES;
        }
    });
}
exports.FunctionDeclaration = FunctionDeclaration;
var curVarDeclareKind = null;
function VariableDeclaration(node, scope) {
    curVarDeclareKind = node.kind;
    for (var _i = 0, _a = node.declarations; _i < _a.length; _i++) {
        var declarator = _a[_i];
        _1.default(declarator, scope);
    }
    curVarDeclareKind = null;
}
exports.VariableDeclaration = VariableDeclaration;
function VariableDeclarator(node, scope) {
    if (curVarDeclareKind === 'var'
        || curVarDeclareKind === 'let'
        || curVarDeclareKind === 'const') {
        var name_2 = node.id.name;
        if (!scope[curVarDeclareKind](name_2, _1.default(node.init, scope))) {
            throw new SyntaxError("Identifier '" + name_2 + "' has already been declared");
        }
    }
    else {
        throw new SyntaxError('Unexpected identifier');
    }
}
exports.VariableDeclarator = VariableDeclarator;
//# sourceMappingURL=declaration.js.map