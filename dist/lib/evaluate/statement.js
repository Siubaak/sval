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
var index_1 = require("./index");
var helper_1 = require("../share/helper");
var const_1 = require("../share/const");
var identifier_1 = require("./identifier");
var declaration_1 = require("./declaration");
function ExpressionStatement(node, scope) {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [5, __values(index_1.default(node.expression, scope))];
            case 1:
                _a.sent();
                return [2];
        }
    });
}
exports.ExpressionStatement = ExpressionStatement;
function BlockStatement(block, scope, options) {
    var e_1, _a, _b, invasived, _c, hoisted, subScope, _d, _e, node, result, e_1_1;
    if (options === void 0) { options = {}; }
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                _b = options.invasived, invasived = _b === void 0 ? false : _b, _c = options.hoisted, hoisted = _c === void 0 ? false : _c;
                subScope = invasived ? scope : new scope_1.default(scope);
                if (!!hoisted) return [3, 2];
                return [5, __values(helper_1.hoistFunc(block, subScope))];
            case 1:
                _f.sent();
                _f.label = 2;
            case 2:
                _f.trys.push([2, 7, 8, 9]);
                _d = __values(block.body), _e = _d.next();
                _f.label = 3;
            case 3:
                if (!!_e.done) return [3, 6];
                node = _e.value;
                return [5, __values(index_1.default(node, subScope))];
            case 4:
                result = _f.sent();
                if (result === const_1.BREAK || result === const_1.CONTINUE || result === const_1.RETURN) {
                    return [2, result];
                }
                _f.label = 5;
            case 5:
                _e = _d.next();
                return [3, 3];
            case 6: return [3, 9];
            case 7:
                e_1_1 = _f.sent();
                e_1 = { error: e_1_1 };
                return [3, 9];
            case 8:
                try {
                    if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
                }
                finally { if (e_1) throw e_1.error; }
                return [7];
            case 9: return [2];
        }
    });
}
exports.BlockStatement = BlockStatement;
function EmptyStatement() {
    return __generator(this, function (_a) {
        return [2];
    });
}
exports.EmptyStatement = EmptyStatement;
function DebuggerStatement() {
    return __generator(this, function (_a) {
        debugger;
        return [2];
    });
}
exports.DebuggerStatement = DebuggerStatement;
function ReturnStatement(node, scope) {
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = const_1.RETURN;
                if (!node.argument) return [3, 2];
                return [5, __values(index_1.default(node.argument, scope))];
            case 1:
                _b = (_c.sent());
                return [3, 3];
            case 2:
                _b = undefined;
                _c.label = 3;
            case 3:
                _a.RES = _b;
                return [2, const_1.RETURN];
        }
    });
}
exports.ReturnStatement = ReturnStatement;
function BreakStatement() {
    return __generator(this, function (_a) {
        return [2, const_1.BREAK];
    });
}
exports.BreakStatement = BreakStatement;
function ContinueStatement() {
    return __generator(this, function (_a) {
        return [2, const_1.CONTINUE];
    });
}
exports.ContinueStatement = ContinueStatement;
function IfStatement(node, scope) {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [5, __values(index_1.default(node.test, scope))];
            case 1:
                if (!_a.sent()) return [3, 3];
                return [5, __values(index_1.default(node.consequent, scope))];
            case 2: return [2, _a.sent()];
            case 3: return [5, __values(index_1.default(node.alternate, scope))];
            case 4: return [2, _a.sent()];
        }
    });
}
exports.IfStatement = IfStatement;
function SwitchStatement(node, scope) {
    var e_2, _a, discriminant, matched, _b, _c, eachCase, _d, _e, result, e_2_1;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0: return [5, __values(index_1.default(node.discriminant, scope))];
            case 1:
                discriminant = _f.sent();
                matched = false;
                _f.label = 2;
            case 2:
                _f.trys.push([2, 10, 11, 12]);
                _b = __values(node.cases), _c = _b.next();
                _f.label = 3;
            case 3:
                if (!!_c.done) return [3, 9];
                eachCase = _c.value;
                _d = !matched;
                if (!_d) return [3, 6];
                _e = !eachCase.test;
                if (_e) return [3, 5];
                return [5, __values(index_1.default(eachCase.test, scope))];
            case 4:
                _e = (_f.sent()) === discriminant;
                _f.label = 5;
            case 5:
                _d = (_e);
                _f.label = 6;
            case 6:
                if (_d) {
                    matched = true;
                }
                if (!matched) return [3, 8];
                return [5, __values(SwitchCase(eachCase, scope))];
            case 7:
                result = _f.sent();
                if (result === const_1.BREAK || result === const_1.CONTINUE || result === const_1.RETURN) {
                    return [2, result];
                }
                _f.label = 8;
            case 8:
                _c = _b.next();
                return [3, 3];
            case 9: return [3, 12];
            case 10:
                e_2_1 = _f.sent();
                e_2 = { error: e_2_1 };
                return [3, 12];
            case 11:
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
                return [7];
            case 12: return [2];
        }
    });
}
exports.SwitchStatement = SwitchStatement;
function SwitchCase(node, scope) {
    var e_3, _a, _b, _c, statement, result, e_3_1;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 5, 6, 7]);
                _b = __values(node.consequent), _c = _b.next();
                _d.label = 1;
            case 1:
                if (!!_c.done) return [3, 4];
                statement = _c.value;
                return [5, __values(index_1.default(statement, scope))];
            case 2:
                result = _d.sent();
                if (result === const_1.BREAK || result === const_1.CONTINUE || result === const_1.RETURN) {
                    return [2, result];
                }
                _d.label = 3;
            case 3:
                _c = _b.next();
                return [3, 1];
            case 4: return [3, 7];
            case 5:
                e_3_1 = _d.sent();
                e_3 = { error: e_3_1 };
                return [3, 7];
            case 6:
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_3) throw e_3.error; }
                return [7];
            case 7: return [2];
        }
    });
}
exports.SwitchCase = SwitchCase;
function ThrowStatement(node, scope) {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [5, __values(index_1.default(node.argument, scope))];
            case 1: throw _a.sent();
        }
    });
}
exports.ThrowStatement = ThrowStatement;
function TryStatement(node, scope) {
    var err_1, subScope, param, name_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, 10, 13]);
                return [5, __values(BlockStatement(node.block, scope))];
            case 1: return [2, _a.sent()];
            case 2:
                err_1 = _a.sent();
                if (!node.handler) return [3, 8];
                subScope = new scope_1.default(scope);
                param = node.handler.param;
                if (!(param.type === 'Identifier')) return [3, 4];
                return [5, __values(identifier_1.Identifier(param, scope, { getName: true }))];
            case 3:
                name_1 = _a.sent();
                subScope.let(name_1, err_1);
                return [3, 6];
            case 4: return [5, __values(helper_1.pattern(param, scope, { feed: err_1 }))];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6: return [5, __values(CatchClause(node.handler, subScope))];
            case 7: return [2, _a.sent()];
            case 8: throw err_1;
            case 9: return [3, 13];
            case 10:
                if (!node.finalizer) return [3, 12];
                return [5, __values(BlockStatement(node.finalizer, scope))];
            case 11: return [2, _a.sent()];
            case 12: return [7];
            case 13: return [2];
        }
    });
}
exports.TryStatement = TryStatement;
function CatchClause(node, scope) {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [5, __values(BlockStatement(node.body, scope, { invasived: true }))];
            case 1: return [2, _a.sent()];
        }
    });
}
exports.CatchClause = CatchClause;
function WhileStatement(node, scope) {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [5, __values(index_1.default(node.test, scope))];
            case 1:
                if (!_a.sent()) return [3, 3];
                return [5, __values(index_1.default(node.body, scope))];
            case 2:
                result = _a.sent();
                if (result === const_1.BREAK) {
                    return [3, 3];
                }
                else if (result === const_1.CONTINUE) {
                    return [3, 0];
                }
                else if (result === const_1.RETURN) {
                    return [2, result];
                }
                return [3, 0];
            case 3: return [2];
        }
    });
}
exports.WhileStatement = WhileStatement;
function DoWhileStatement(node, scope) {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [5, __values(index_1.default(node.body, scope))];
            case 1:
                result = _a.sent();
                if (result === const_1.BREAK) {
                    return [3, 4];
                }
                else if (result === const_1.CONTINUE) {
                    return [3, 2];
                }
                else if (result === const_1.RETURN) {
                    return [2, result];
                }
                _a.label = 2;
            case 2: return [5, __values(index_1.default(node.test, scope))];
            case 3:
                if (_a.sent()) return [3, 0];
                _a.label = 4;
            case 4: return [2];
        }
    });
}
exports.DoWhileStatement = DoWhileStatement;
function ForStatement(node, scope) {
    var subScope, _a, result;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                subScope = new scope_1.default(scope);
                return [5, __values(index_1.default(node.init, subScope))];
            case 1:
                _b.sent();
                _b.label = 2;
            case 2:
                if (!node.test) return [3, 4];
                return [5, __values(index_1.default(node.test, subScope))];
            case 3:
                _a = (_b.sent());
                return [3, 5];
            case 4:
                _a = true;
                _b.label = 5;
            case 5:
                if (!_a) return [3, 12];
                result = void 0;
                if (!(node.body.type === 'BlockStatement')) return [3, 7];
                return [5, __values(BlockStatement(node.body, subScope, { invasived: true }))];
            case 6:
                result = _b.sent();
                return [3, 9];
            case 7: return [5, __values(index_1.default(node.body, subScope))];
            case 8:
                result = _b.sent();
                _b.label = 9;
            case 9:
                if (result === const_1.BREAK) {
                    return [3, 12];
                }
                else if (result === const_1.CONTINUE) {
                    return [3, 10];
                }
                else if (result === const_1.RETURN) {
                    return [2, result];
                }
                _b.label = 10;
            case 10: return [5, __values(index_1.default(node.update, subScope = subScope.clone()))];
            case 11:
                _b.sent();
                return [3, 2];
            case 12: return [2];
        }
    });
}
exports.ForStatement = ForStatement;
function ForInStatement(node, scope) {
    var left, _a, _b, _i, value, subScope, variable, result;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                left = node.left;
                _a = [];
                return [5, __values(index_1.default(node.right, scope))];
            case 1:
                for (_b in _c.sent())
                    _a.push(_b);
                _i = 0;
                _c.label = 2;
            case 2:
                if (!(_i < _a.length)) return [3, 14];
                value = _a[_i];
                subScope = new scope_1.default(scope);
                if (!(left.type === 'VariableDeclaration')) return [3, 4];
                return [5, __values(declaration_1.VariableDeclaration(left, subScope, { feed: value }))];
            case 3:
                _c.sent();
                return [3, 8];
            case 4:
                if (!(left.type === 'Identifier')) return [3, 6];
                return [5, __values(identifier_1.Identifier(left, scope, { getVar: true }))];
            case 5:
                variable = _c.sent();
                variable.set(value);
                return [3, 8];
            case 6: return [5, __values(helper_1.pattern(left, scope, { feed: value }))];
            case 7:
                _c.sent();
                _c.label = 8;
            case 8:
                result = void 0;
                if (!(node.body.type === 'BlockStatement')) return [3, 10];
                return [5, __values(BlockStatement(node.body, subScope, { invasived: true }))];
            case 9:
                result = _c.sent();
                return [3, 12];
            case 10: return [5, __values(index_1.default(node.body, subScope))];
            case 11:
                result = _c.sent();
                _c.label = 12;
            case 12:
                if (result === const_1.BREAK) {
                    return [3, 14];
                }
                else if (result === const_1.CONTINUE) {
                    return [3, 13];
                }
                else if (result === const_1.RETURN) {
                    return [2, result];
                }
                _c.label = 13;
            case 13:
                _i++;
                return [3, 2];
            case 14: return [2];
        }
    });
}
exports.ForInStatement = ForInStatement;
function ForOfStatement(node, scope) {
    var e_4, _a, left, _b, _c, value, subScope, variable, result, e_4_1;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                left = node.left;
                _d.label = 1;
            case 1:
                _d.trys.push([1, 15, 16, 17]);
                return [5, __values(index_1.default(node.right, scope))];
            case 2:
                _b = __values.apply(void 0, [_d.sent()]), _c = _b.next();
                _d.label = 3;
            case 3:
                if (!!_c.done) return [3, 14];
                value = _c.value;
                subScope = new scope_1.default(scope);
                if (!(left.type === 'VariableDeclaration')) return [3, 5];
                return [5, __values(declaration_1.VariableDeclaration(left, subScope, { feed: value }))];
            case 4:
                _d.sent();
                return [3, 8];
            case 5:
                if (!(left.type === 'Identifier')) return [3, 7];
                return [5, __values(identifier_1.Identifier(left, scope, { getVar: true }))];
            case 6:
                variable = _d.sent();
                variable.set(value);
                return [3, 8];
            case 7:
                helper_1.pattern(left, scope, { feed: value });
                _d.label = 8;
            case 8:
                result = void 0;
                if (!(node.body.type === 'BlockStatement')) return [3, 10];
                return [5, __values(BlockStatement(node.body, subScope, { invasived: true }))];
            case 9:
                result = _d.sent();
                return [3, 12];
            case 10: return [5, __values(index_1.default(node.body, subScope))];
            case 11:
                result = _d.sent();
                _d.label = 12;
            case 12:
                if (result === const_1.BREAK) {
                    return [3, 14];
                }
                else if (result === const_1.CONTINUE) {
                    return [3, 13];
                }
                else if (result === const_1.RETURN) {
                    return [2, result];
                }
                _d.label = 13;
            case 13:
                _c = _b.next();
                return [3, 3];
            case 14: return [3, 17];
            case 15:
                e_4_1 = _d.sent();
                e_4 = { error: e_4_1 };
                return [3, 17];
            case 16:
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_4) throw e_4.error; }
                return [7];
            case 17: return [2];
        }
    });
}
exports.ForOfStatement = ForOfStatement;
//# sourceMappingURL=statement.js.map