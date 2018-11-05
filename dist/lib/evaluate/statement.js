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
Object.defineProperty(exports, "__esModule", { value: true });
var scope_1 = require("../scope");
var index_1 = require("./index");
var helper_1 = require("../share/helper");
var const_1 = require("../share/const");
var util_1 = require("../share/util");
var identifier_1 = require("./identifier");
var declaration_1 = require("./declaration");
function ExpressionStatement(node, scope) {
    index_1.default(node.expression, scope);
}
exports.ExpressionStatement = ExpressionStatement;
function BlockStatement(block, scope, options) {
    if (options === void 0) { options = {}; }
    var _a = options.invasived, invasived = _a === void 0 ? false : _a, _b = options.hoisted, hoisted = _b === void 0 ? false : _b, _c = options.generator, generator = _c === void 0 ? false : _c;
    var subScope = invasived ? scope : new scope_1.default(scope);
    if (!hoisted) {
        helper_1.hoistFunc(block, subScope);
    }
    if (generator) {
        return function () {
            var _loop_1, _i, _a, node, state_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _loop_1 = function (node) {
                            var isExistYield, result;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        isExistYield = false;
                                        util_1.walk(node, {
                                            YieldExpression: function (node) {
                                                isExistYield = true;
                                            }
                                        });
                                        result = void 0;
                                        if (!isExistYield) return [3, 2];
                                        return [4, index_1.default(node, subScope)];
                                    case 1:
                                        result = _a.sent();
                                        return [3, 3];
                                    case 2:
                                        result = index_1.default(node, subScope);
                                        _a.label = 3;
                                    case 3:
                                        if (result === const_1.BREAK || result === const_1.CONTINUE || result === const_1.RETURN) {
                                            return [2, { value: result }];
                                        }
                                        return [2];
                                }
                            });
                        };
                        _i = 0, _a = block.body;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3, 4];
                        node = _a[_i];
                        return [5, _loop_1(node)];
                    case 2:
                        state_1 = _b.sent();
                        if (typeof state_1 === "object")
                            return [2, state_1.value];
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3, 1];
                    case 4: return [2];
                }
            });
        };
    }
    else {
        for (var _i = 0, _d = block.body; _i < _d.length; _i++) {
            var node = _d[_i];
            var result = index_1.default(node, subScope);
            if (result === const_1.BREAK || result === const_1.CONTINUE || result === const_1.RETURN) {
                return result;
            }
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
            var subScope = new scope_1.default(scope);
            var param = node.handler.param;
            if (param.type === 'Identifier') {
                var name_1 = identifier_1.Identifier(param, scope, { getName: true });
                subScope.let(name_1, err);
            }
            else {
                helper_1.pattern(param, scope, { feed: err });
            }
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
        var result = void 0;
        if (node.body.type === 'BlockStatement') {
            result = BlockStatement(node.body, subScope, { invasived: true });
        }
        else {
            result = index_1.default(node.body, subScope);
        }
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
    for (var value in index_1.default(node.right, scope)) {
        var subScope = new scope_1.default(scope);
        if (left.type === 'VariableDeclaration') {
            declaration_1.VariableDeclaration(left, scope, { feed: value });
        }
        else if (left.type === 'Identifier') {
            var variable = identifier_1.Identifier(left, scope, { getVar: true });
            variable.set(value);
        }
        else {
            helper_1.pattern(left, scope, { feed: value });
        }
        var result = void 0;
        if (node.body.type === 'BlockStatement') {
            result = BlockStatement(node.body, subScope, { invasived: true });
        }
        else {
            result = index_1.default(node.body, subScope);
        }
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
    for (var _i = 0, _a = index_1.default(node.right, scope); _i < _a.length; _i++) {
        var value = _a[_i];
        var subScope = new scope_1.default(scope);
        if (left.type === 'VariableDeclaration') {
            declaration_1.VariableDeclaration(left, scope, { feed: value });
        }
        else if (left.type === 'Identifier') {
            var variable = identifier_1.Identifier(left, scope, { getVar: true });
            variable.set(value);
        }
        else {
            helper_1.pattern(left, scope, { feed: value });
        }
        var result = void 0;
        if (node.body.type === 'BlockStatement') {
            result = BlockStatement(node.body, subScope, { invasived: true });
        }
        else {
            result = index_1.default(node.body, subScope);
        }
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