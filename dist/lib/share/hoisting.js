"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var declaration_1 = require("../evaluate/declaration");
function hoisting(node, scope) {
    for (var i = 0; i < node.body.length; i++) {
        var statement = node.body[i];
        if (statement.type === 'ImportDeclaration'
            || statement.type === 'ExportNamedDeclaration'
            || statement.type === 'ExportDefaultDeclaration'
            || statement.type === 'ExportAllDeclaration') {
            continue;
        }
        if (statement.type === 'VariableDeclaration') {
            declaration_1.VariableDeclaration(statement, scope, { hoisting: true });
        }
        else if (statement.type === 'FunctionDeclaration') {
            declaration_1.FunctionDeclaration(statement, scope);
            node.body[i] = null;
        }
        else {
            hoistingRecursion(statement, scope);
        }
    }
}
exports.default = hoisting;
function hoistingRecursion(statement, scope) {
    if (statement.type === 'VariableDeclaration') {
        declaration_1.VariableDeclaration(statement, scope, { hoisting: true });
    }
    else if (statement.type === 'WhileStatement'
        || statement.type === 'DoWhileStatement'
        || statement.type === 'ForStatement'
        || statement.type === 'ForInStatement') {
        hoistingRecursion(statement.body, scope);
    }
    else if (statement.type === 'BlockStatement') {
        for (var _i = 0, _a = statement.body; _i < _a.length; _i++) {
            var node = _a[_i];
            hoistingRecursion(node, scope);
        }
    }
    else if (statement.type === 'SwitchStatement') {
        for (var _b = 0, _c = statement.cases; _b < _c.length; _b++) {
            var eachCase = _c[_b];
            for (var _d = 0, _e = eachCase.consequent; _d < _e.length; _d++) {
                var node = _e[_d];
                hoistingRecursion(node, scope);
            }
        }
    }
    else if (statement.type === 'TryStatement') {
        var tryBlock = statement.block.body;
        for (var _f = 0, tryBlock_1 = tryBlock; _f < tryBlock_1.length; _f++) {
            var node = tryBlock_1[_f];
            hoistingRecursion(node, scope);
        }
        var catchBlock = statement.handler && statement.handler.body.body;
        if (catchBlock) {
            for (var _g = 0, catchBlock_1 = catchBlock; _g < catchBlock_1.length; _g++) {
                var node = catchBlock_1[_g];
                hoistingRecursion(node, scope);
            }
        }
        var finalBlock = statement.finalizer && statement.finalizer.body;
        if (finalBlock) {
            for (var _h = 0, finalBlock_1 = finalBlock; _h < finalBlock_1.length; _h++) {
                var node = finalBlock_1[_h];
                hoistingRecursion(node, scope);
            }
        }
    }
}
//# sourceMappingURL=hoisting.js.map