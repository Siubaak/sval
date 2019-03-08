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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
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
    var i, statement;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i < block.body.length)) return [3, 6];
                statement = block.body[i];
                if (statement.type === 'ImportDeclaration'
                    || statement.type === 'ExportNamedDeclaration'
                    || statement.type === 'ExportDefaultDeclaration'
                    || statement.type === 'ExportAllDeclaration') {
                    return [3, 5];
                }
                if (!(statement.type === 'FunctionDeclaration')) return [3, 3];
                return [5, __values(declaration_1.FunctionDeclaration(statement, scope))];
            case 2:
                _a.sent();
                block.body[i] = null;
                return [3, 5];
            case 3: return [5, __values(hoistVarRecursion(statement, scope))];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5:
                i++;
                return [3, 1];
            case 6: return [2];
        }
    });
}
exports.hoist = hoist;
function hoistFunc(block, scope) {
    var i, statement;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i < block.body.length)) return [3, 4];
                statement = block.body[i];
                if (!(statement.type === 'FunctionDeclaration')) return [3, 3];
                return [5, __values(declaration_1.FunctionDeclaration(statement, scope))];
            case 2:
                _a.sent();
                block.body[i] = null;
                _a.label = 3;
            case 3:
                i++;
                return [3, 1];
            case 4: return [2];
        }
    });
}
exports.hoistFunc = hoistFunc;
function hoistVarRecursion(statement, scope) {
    var e_1, _a, e_2, _b, e_3, _c, e_4, _d, e_5, _e, e_6, _f, _g, _h, _j, node, e_1_1, _k, _l, eachCase, _m, _o, node, e_3_1, e_2_1, tryBlock, tryBlock_1, tryBlock_1_1, node, e_4_1, catchBlock, catchBlock_1, catchBlock_1_1, node, e_5_1, finalBlock, finalBlock_1, finalBlock_1_1, node, e_6_1;
    return __generator(this, function (_p) {
        switch (_p.label) {
            case 0:
                _g = statement.type;
                switch (_g) {
                    case 'VariableDeclaration': return [3, 1];
                    case 'WhileStatement': return [3, 3];
                    case 'DoWhileStatement': return [3, 3];
                    case 'ForStatement': return [3, 3];
                    case 'ForInStatement': return [3, 3];
                    case 'ForOfStatement': return [3, 3];
                    case 'BlockStatement': return [3, 5];
                    case 'SwitchStatement': return [3, 13];
                    case 'TryStatement': return [3, 27];
                }
                return [3, 52];
            case 1: return [5, __values(declaration_1.VariableDeclaration(statement, scope, { hoist: true }))];
            case 2:
                _p.sent();
                return [3, 52];
            case 3: return [5, __values(hoistVarRecursion(statement.body, scope))];
            case 4:
                _p.sent();
                return [3, 52];
            case 5:
                _p.trys.push([5, 10, 11, 12]);
                _h = __values(statement.body), _j = _h.next();
                _p.label = 6;
            case 6:
                if (!!_j.done) return [3, 9];
                node = _j.value;
                return [5, __values(hoistVarRecursion(node, scope))];
            case 7:
                _p.sent();
                _p.label = 8;
            case 8:
                _j = _h.next();
                return [3, 6];
            case 9: return [3, 12];
            case 10:
                e_1_1 = _p.sent();
                e_1 = { error: e_1_1 };
                return [3, 12];
            case 11:
                try {
                    if (_j && !_j.done && (_a = _h.return)) _a.call(_h);
                }
                finally { if (e_1) throw e_1.error; }
                return [7];
            case 12: return [3, 52];
            case 13:
                _p.trys.push([13, 24, 25, 26]);
                _k = __values(statement.cases), _l = _k.next();
                _p.label = 14;
            case 14:
                if (!!_l.done) return [3, 23];
                eachCase = _l.value;
                _p.label = 15;
            case 15:
                _p.trys.push([15, 20, 21, 22]);
                _m = __values(eachCase.consequent), _o = _m.next();
                _p.label = 16;
            case 16:
                if (!!_o.done) return [3, 19];
                node = _o.value;
                return [5, __values(hoistVarRecursion(node, scope))];
            case 17:
                _p.sent();
                _p.label = 18;
            case 18:
                _o = _m.next();
                return [3, 16];
            case 19: return [3, 22];
            case 20:
                e_3_1 = _p.sent();
                e_3 = { error: e_3_1 };
                return [3, 22];
            case 21:
                try {
                    if (_o && !_o.done && (_c = _m.return)) _c.call(_m);
                }
                finally { if (e_3) throw e_3.error; }
                return [7];
            case 22:
                _l = _k.next();
                return [3, 14];
            case 23: return [3, 26];
            case 24:
                e_2_1 = _p.sent();
                e_2 = { error: e_2_1 };
                return [3, 26];
            case 25:
                try {
                    if (_l && !_l.done && (_b = _k.return)) _b.call(_k);
                }
                finally { if (e_2) throw e_2.error; }
                return [7];
            case 26: return [3, 52];
            case 27:
                tryBlock = statement.block.body;
                _p.label = 28;
            case 28:
                _p.trys.push([28, 33, 34, 35]);
                tryBlock_1 = __values(tryBlock), tryBlock_1_1 = tryBlock_1.next();
                _p.label = 29;
            case 29:
                if (!!tryBlock_1_1.done) return [3, 32];
                node = tryBlock_1_1.value;
                return [5, __values(hoistVarRecursion(node, scope))];
            case 30:
                _p.sent();
                _p.label = 31;
            case 31:
                tryBlock_1_1 = tryBlock_1.next();
                return [3, 29];
            case 32: return [3, 35];
            case 33:
                e_4_1 = _p.sent();
                e_4 = { error: e_4_1 };
                return [3, 35];
            case 34:
                try {
                    if (tryBlock_1_1 && !tryBlock_1_1.done && (_d = tryBlock_1.return)) _d.call(tryBlock_1);
                }
                finally { if (e_4) throw e_4.error; }
                return [7];
            case 35:
                catchBlock = statement.handler && statement.handler.body.body;
                if (!catchBlock) return [3, 43];
                _p.label = 36;
            case 36:
                _p.trys.push([36, 41, 42, 43]);
                catchBlock_1 = __values(catchBlock), catchBlock_1_1 = catchBlock_1.next();
                _p.label = 37;
            case 37:
                if (!!catchBlock_1_1.done) return [3, 40];
                node = catchBlock_1_1.value;
                return [5, __values(hoistVarRecursion(node, scope))];
            case 38:
                _p.sent();
                _p.label = 39;
            case 39:
                catchBlock_1_1 = catchBlock_1.next();
                return [3, 37];
            case 40: return [3, 43];
            case 41:
                e_5_1 = _p.sent();
                e_5 = { error: e_5_1 };
                return [3, 43];
            case 42:
                try {
                    if (catchBlock_1_1 && !catchBlock_1_1.done && (_e = catchBlock_1.return)) _e.call(catchBlock_1);
                }
                finally { if (e_5) throw e_5.error; }
                return [7];
            case 43:
                finalBlock = statement.finalizer && statement.finalizer.body;
                if (!finalBlock) return [3, 51];
                _p.label = 44;
            case 44:
                _p.trys.push([44, 49, 50, 51]);
                finalBlock_1 = __values(finalBlock), finalBlock_1_1 = finalBlock_1.next();
                _p.label = 45;
            case 45:
                if (!!finalBlock_1_1.done) return [3, 48];
                node = finalBlock_1_1.value;
                return [5, __values(hoistVarRecursion(node, scope))];
            case 46:
                _p.sent();
                _p.label = 47;
            case 47:
                finalBlock_1_1 = finalBlock_1.next();
                return [3, 45];
            case 48: return [3, 51];
            case 49:
                e_6_1 = _p.sent();
                e_6 = { error: e_6_1 };
                return [3, 51];
            case 50:
                try {
                    if (finalBlock_1_1 && !finalBlock_1_1.done && (_f = finalBlock_1.return)) _f.call(finalBlock_1);
                }
                finally { if (e_6) throw e_6.error; }
                return [7];
            case 51: return [3, 52];
            case 52: return [2];
        }
    });
}
function pattern(node, scope, options) {
    var _a;
    if (options === void 0) { options = {}; }
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = node.type;
                switch (_a) {
                    case 'ObjectPattern': return [3, 1];
                    case 'ArrayPattern': return [3, 3];
                    case 'RestElement': return [3, 5];
                    case 'AssignmentPattern': return [3, 7];
                }
                return [3, 9];
            case 1: return [5, __values(pattern_1.ObjectPattern(node, scope, options))];
            case 2: return [2, _b.sent()];
            case 3: return [5, __values(pattern_1.ArrayPattern(node, scope, options))];
            case 4: return [2, _b.sent()];
            case 5: return [5, __values(pattern_1.RestElement(node, scope, options))];
            case 6: return [2, _b.sent()];
            case 7: return [5, __values(pattern_1.AssignmentPattern(node, scope))];
            case 8: return [2, _b.sent()];
            case 9: throw new SyntaxError('Unexpected token');
        }
    });
}
exports.pattern = pattern;
function createFunc(node, scope, options) {
    var superClass, params, tmpGenerator, func;
    if (options === void 0) { options = {}; }
    return __generator(this, function (_a) {
        superClass = options.superClass;
        params = node.params;
        tmpGenerator = function () {
            var _i, subScope, i, param, name_1, result;
            var args = [];
            for (_i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
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
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < params.length)) return [3, 6];
                        param = params[i];
                        if (!(param.type === 'Identifier')) return [3, 3];
                        return [5, __values(identifier_1.Identifier(param, scope, { getName: true }))];
                    case 2:
                        name_1 = _a.sent();
                        subScope.let(name_1, args[i]);
                        return [3, 5];
                    case 3: return [5, __values(pattern(param, scope, { feed: args[i] }))];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        i++;
                        return [3, 1];
                    case 6:
                        if (!(node.body.type === 'BlockStatement')) return [3, 9];
                        return [5, __values(hoist(node.body, subScope))];
                    case 7:
                        _a.sent();
                        return [5, __values(statement_1.BlockStatement(node.body, subScope, {
                                invasived: true,
                                hoisted: true,
                            }))];
                    case 8:
                        result = _a.sent();
                        return [3, 11];
                    case 9: return [5, __values(evaluate_1.default(node.body, subScope))];
                    case 10:
                        result = _a.sent();
                        _a.label = 11;
                    case 11:
                        if (result === const_1.RETURN) {
                            return [2, result.RES];
                        }
                        return [2];
                }
            });
        };
        if (node.async) {
            func = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return util_1.runAsync.apply(void 0, __spread([tmpGenerator.bind(this)], args));
            };
            util_1.define(func, 'async', { value: true });
        }
        else if (node.generator) {
            func = tmpGenerator;
        }
        else {
            func = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return util_1.runGenerator.apply(void 0, __spread([tmpGenerator.bind(this)], args));
            };
        }
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
        return [2, func];
    });
}
exports.createFunc = createFunc;
function createClass(node, scope) {
    var e_7, _a, superClass, klass, _b, _c, method, e_7_1;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0: return [5, __values(evaluate_1.default(node.superClass, scope))];
            case 1:
                superClass = _d.sent();
                klass = function () { };
                _d.label = 2;
            case 2:
                _d.trys.push([2, 7, 8, 9]);
                _b = __values(node.body.body), _c = _b.next();
                _d.label = 3;
            case 3:
                if (!!_c.done) return [3, 6];
                method = _c.value;
                if (!(method.kind === 'constructor')) return [3, 5];
                return [5, __values(createFunc(method.value, scope, { superClass: superClass }))];
            case 4:
                klass = _d.sent();
                return [3, 6];
            case 5:
                _c = _b.next();
                return [3, 3];
            case 6: return [3, 9];
            case 7:
                e_7_1 = _d.sent();
                e_7 = { error: e_7_1 };
                return [3, 9];
            case 8:
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_7) throw e_7.error; }
                return [7];
            case 9:
                if (superClass) {
                    util_1.inherits(klass, superClass);
                }
                return [5, __values(declaration_1.ClassBody(node.body, scope, { klass: klass }))];
            case 10:
                _d.sent();
                util_1.define(klass, 'name', {
                    value: node.id.name,
                    configurable: true,
                });
                return [2, klass];
        }
    });
}
exports.createClass = createClass;
//# sourceMappingURL=helper.js.map