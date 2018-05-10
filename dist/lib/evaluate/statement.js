"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var scope_1 = require("../scope");
var index_1 = require("./index");
var hoisting_1 = require("../share/hoisting");
var const_1 = require("../share/const");
function ExpressionStatement(node, scope) {
    index_1.default(node.expression, scope);
}
exports.ExpressionStatement = ExpressionStatement;
function BlockStatement(block, scope, options) {
    if (options === void 0) { options = {}; }
    var _a = options.invasived, invasived = _a === void 0 ? false : _a;
    var subScope = invasived ? scope : new scope_1.default(scope);
    hoisting_1.hoistingFunc(block, subScope);
    for (var _i = 0, _b = block.body; _i < _b.length; _i++) {
        var node = _b[_i];
        var result = index_1.default(node, subScope);
        if (result === const_1.BREAK || result === const_1.CONTINUE || result === const_1.RETURN) {
            return result;
        }
    }
}
exports.BlockStatement = BlockStatement;
function EmptyStatement(node, scope) {
}
exports.EmptyStatement = EmptyStatement;
function DebuggerStatement(node, scope) {
    debugger;
}
exports.DebuggerStatement = DebuggerStatement;
function WithStatement(node, scope) {
}
exports.WithStatement = WithStatement;
function ReturnStatement(node, scope) {
    const_1.RETURN.RES = node.argument ? index_1.default(node.argument, scope) : undefined;
    return const_1.RETURN;
}
exports.ReturnStatement = ReturnStatement;
function LabeledStatement(node, scope) {
}
exports.LabeledStatement = LabeledStatement;
function BreakStatement(node, scope) {
    return const_1.BREAK;
}
exports.BreakStatement = BreakStatement;
function ContinueStatement(node, scope) {
    return const_1.CONTINUE;
}
exports.ContinueStatement = ContinueStatement;
function IfStatement(node, scope) {
    if (index_1.default(node.test, scope)) {
        return index_1.default(node.consequent, scope);
    }
    else {
        return index_1.default(node.alternate, scope);
    }
}
exports.IfStatement = IfStatement;
function SwitchStatement(node, scope) {
    var discriminant = index_1.default(node.discriminant, scope);
    var matched = false;
    for (var _i = 0, _a = node.cases; _i < _a.length; _i++) {
        var eachCase = _a[_i];
        if (!matched
            && (!eachCase.test
                || index_1.default(eachCase.test, scope) === discriminant)) {
            matched = true;
        }
        if (matched) {
            var result = SwitchCase(eachCase, scope);
            if (result === const_1.BREAK || result === const_1.CONTINUE || result === const_1.RETURN) {
                return result;
            }
        }
    }
}
exports.SwitchStatement = SwitchStatement;
function SwitchCase(node, scope) {
    for (var _i = 0, _a = node.consequent; _i < _a.length; _i++) {
        var statement = _a[_i];
        var result = index_1.default(statement, scope);
        if (result === const_1.BREAK || result === const_1.CONTINUE || result === const_1.RETURN) {
            return result;
        }
    }
}
exports.SwitchCase = SwitchCase;
function ThrowStatement(node, scope) {
    throw index_1.default(node.argument, scope);
}
exports.ThrowStatement = ThrowStatement;
function TryStatement(node, scope) {
    try {
        return BlockStatement(node.block, scope);
    }
    catch (err) {
        if (node.handler) {
            var name_1 = node.handler.param.name;
            var subScope = new scope_1.default(scope);
            subScope.const(name_1, err);
            return CatchClause(node.handler, subScope);
        }
        else {
            throw err;
        }
    }
    finally {
        if (node.finalizer) {
            return BlockStatement(node.finalizer, scope);
        }
    }
}
exports.TryStatement = TryStatement;
function CatchClause(node, scope) {
    return BlockStatement(node.body, scope, { invasived: true });
}
exports.CatchClause = CatchClause;
function WhileStatement(node, scope) {
    while (index_1.default(node.test, scope)) {
        var result = index_1.default(node.body, scope);
        if (result === const_1.BREAK) {
            break;
        }
        else if (result === const_1.CONTINUE) {
            continue;
        }
        else if (result === const_1.RETURN) {
            return result;
        }
    }
}
exports.WhileStatement = WhileStatement;
function DoWhileStatement(node, scope) {
    do {
        var result = index_1.default(node.body, scope);
        if (result === const_1.BREAK) {
            break;
        }
        else if (result === const_1.CONTINUE) {
            continue;
        }
        else if (result === const_1.RETURN) {
            return result;
        }
    } while (index_1.default(node.test, scope));
}
exports.DoWhileStatement = DoWhileStatement;
function ForStatement(node, scope) {
    var subScope = new scope_1.default(scope);
    for (index_1.default(node.init, subScope); node.test ? index_1.default(node.test, subScope) : true; index_1.default(node.update, subScope = subScope.clone())) {
        var result = index_1.default(node.body, subScope, { invasived: true });
        if (result === const_1.BREAK) {
            break;
        }
        else if (result === const_1.CONTINUE) {
            continue;
        }
        else if (result === const_1.RETURN) {
            return result;
        }
    }
}
exports.ForStatement = ForStatement;
function ForInStatement(node, scope) {
    var left = node.left;
    var name = left.declarations[0].id.name;
    for (var value in index_1.default(node.right, scope)) {
        var subScope = new scope_1.default(scope);
        scope[left.kind](name, value);
        var result = index_1.default(node.body, subScope, { invasived: true });
        if (result === const_1.BREAK) {
            break;
        }
        else if (result === const_1.CONTINUE) {
            continue;
        }
        else if (result === const_1.RETURN) {
            return result;
        }
    }
}
exports.ForInStatement = ForInStatement;
function ForOfStatement(node, scope) {
    var left = node.left;
    var name = left.declarations[0].id.name;
    for (var _i = 0, _a = index_1.default(node.right, scope); _i < _a.length; _i++) {
        var value = _a[_i];
        var subScope = new scope_1.default(scope);
        scope[left.kind](name, value);
        var result = index_1.default(node.body, subScope, { invasived: true });
        if (result === const_1.BREAK) {
            break;
        }
        else if (result === const_1.CONTINUE) {
            continue;
        }
        else if (result === const_1.RETURN) {
            return result;
        }
    }
}
exports.ForOfStatement = ForOfStatement;
//# sourceMappingURL=statement.js.map