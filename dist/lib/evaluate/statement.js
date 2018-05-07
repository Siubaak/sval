"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var scope_1 = require("../scope");
var index_1 = require("./index");
var const_1 = require("../share/const");
function ExpressionStatement(node, scope) {
    index_1.default(node.expression, scope);
}
exports.ExpressionStatement = ExpressionStatement;
function BlockStatement(block, scope) {
    var subScope = scope.invasived ? scope : new scope_1.default('block', scope);
    for (var _i = 0, _a = block.body; _i < _a.length; _i++) {
        var node = _a[_i];
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
    var subScope = new scope_1.default('switch', scope);
    var matched = false;
    for (var _i = 0, _a = node.cases; _i < _a.length; _i++) {
        var eachCase = _a[_i];
        if (!matched
            && (!eachCase.test
                || index_1.default(eachCase.test, subScope) === discriminant)) {
            matched = true;
        }
        if (matched) {
            var result = SwitchCase(eachCase, subScope);
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
        return index_1.default(node.block, scope);
    }
    catch (err) {
        if (node.handler) {
            var name_1 = node.handler.param.name;
            var subScope = new scope_1.default('block', scope);
            subScope.invasive();
            subScope.const(name_1, err);
            return index_1.default(node.handler, subScope);
        }
        else {
            throw err;
        }
    }
    finally {
        if (node.finalizer) {
            return index_1.default(node.finalizer, scope);
        }
    }
}
exports.TryStatement = TryStatement;
function CatchClause(node, scope) {
    return index_1.default(node.body, scope);
}
exports.CatchClause = CatchClause;
function WhileStatement(node, scope) {
    while (index_1.default(node.test, scope)) {
        var subScope = new scope_1.default('loop', scope);
        subScope.invasive();
        var result = index_1.default(node.body, subScope);
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
        var subScope = new scope_1.default('loop', scope);
        subScope.invasive();
        var result = index_1.default(node.body, subScope);
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
    var subScope = new scope_1.default('loop', scope);
    for (index_1.default(node.init, subScope); node.test ? index_1.default(node.test, subScope) : true; index_1.default(node.update, subScope)) {
        var result = index_1.default(node.body, subScope);
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
        var subScope = new scope_1.default('loop', scope);
        subScope.invasive();
        scope[left.kind](name, value);
        var result = index_1.default(node.body, subScope);
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
//# sourceMappingURL=statement.js.map