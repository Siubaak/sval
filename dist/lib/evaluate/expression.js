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
var _1 = require(".");
var helper_1 = require("../share/helper");
var util_1 = require("../share/util");
var const_1 = require("../share/const");
var identifier_1 = require("./identifier");
var literal_1 = require("./literal");
var variable_1 = require("../scope/variable");
function ThisExpression(node, scope) {
    return __generator(this, function (_a) {
        return [2, scope.find('this').get()];
    });
}
exports.ThisExpression = ThisExpression;
function ArrayExpression(node, scope) {
    var e_1, _a, results, _b, _c, item, _d, _e, e_1_1;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                results = [];
                _f.label = 1;
            case 1:
                _f.trys.push([1, 6, 7, 8]);
                _b = __values(node.elements), _c = _b.next();
                _f.label = 2;
            case 2:
                if (!!_c.done) return [3, 5];
                item = _c.value;
                _e = (_d = results).push;
                return [5, __values(_1.default(item, scope))];
            case 3:
                _e.apply(_d, [_f.sent()]);
                _f.label = 4;
            case 4:
                _c = _b.next();
                return [3, 2];
            case 5: return [3, 8];
            case 6:
                e_1_1 = _f.sent();
                e_1 = { error: e_1_1 };
                return [3, 8];
            case 7:
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
                return [7];
            case 8: return [2, results];
        }
    });
}
exports.ArrayExpression = ArrayExpression;
function ObjectExpression(node, scope) {
    var e_2, _a, object, _b, _c, property, propKey, key, _d, value, propKind, e_2_1;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                object = {};
                _e.label = 1;
            case 1:
                _e.trys.push([1, 11, 12, 13]);
                _b = __values(node.properties), _c = _b.next();
                _e.label = 2;
            case 2:
                if (!!_c.done) return [3, 10];
                property = _c.value;
                propKey = property.key;
                key = void 0;
                if (!(propKey.type === 'Identifier')) return [3, 4];
                return [5, __values(identifier_1.Identifier(propKey, scope, { getName: true }))];
            case 3:
                key = _e.sent();
                return [3, 7];
            case 4:
                if (!(propKey.type === 'Literal')) return [3, 6];
                _d = '';
                return [5, __values(literal_1.Literal(propKey, scope))];
            case 5:
                key = _d + (_e.sent());
                return [3, 7];
            case 6: throw new SyntaxError('Unexpected token');
            case 7: return [5, __values(_1.default(property.value, scope))];
            case 8:
                value = _e.sent();
                propKind = property.kind;
                if (propKind === 'init') {
                    object[key] = value;
                }
                else if (propKind === 'get') {
                    util_1.define(object, key, { get: value });
                }
                else if (propKind === 'set') {
                    util_1.define(object, key, { set: value });
                }
                else {
                    throw new SyntaxError('Unexpected token');
                }
                _e.label = 9;
            case 9:
                _c = _b.next();
                return [3, 2];
            case 10: return [3, 13];
            case 11:
                e_2_1 = _e.sent();
                e_2 = { error: e_2_1 };
                return [3, 13];
            case 12:
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
                return [7];
            case 13: return [2, object];
        }
    });
}
exports.ObjectExpression = ObjectExpression;
function FunctionExpression(node, scope) {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [5, __values(helper_1.createFunc(node, scope))];
            case 1: return [2, _a.sent()];
        }
    });
}
exports.FunctionExpression = FunctionExpression;
function UnaryExpression(node, scope) {
    var arg, _a, variable, globalScope, name_1, win;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                arg = node.argument;
                _a = node.operator;
                switch (_a) {
                    case '+': return [3, 1];
                    case '-': return [3, 3];
                    case '!': return [3, 5];
                    case '~': return [3, 7];
                    case 'void': return [3, 9];
                    case 'typeof': return [3, 11];
                    case 'delete': return [3, 15];
                }
                return [3, 20];
            case 1: return [5, __values(_1.default(arg, scope))];
            case 2: return [2, +(_b.sent())];
            case 3: return [5, __values(_1.default(arg, scope))];
            case 4: return [2, -(_b.sent())];
            case 5: return [5, __values(_1.default(arg, scope))];
            case 6: return [2, !(_b.sent())];
            case 7: return [5, __values(_1.default(arg, scope))];
            case 8: return [2, ~(_b.sent())];
            case 9: return [5, __values(_1.default(arg, scope))];
            case 10: return [2, void (_b.sent())];
            case 11:
                if (!(arg.type === 'Identifier')) return [3, 13];
                return [5, __values(identifier_1.Identifier(arg, scope, { throwErr: false }))];
            case 12: return [2, typeof (_b.sent())];
            case 13: return [5, __values(_1.default(arg, scope))];
            case 14: return [2, typeof (_b.sent())];
            case 15:
                if (!(arg.type === 'MemberExpression')) return [3, 17];
                return [5, __values(MemberExpression(arg, scope, { getVar: true }))];
            case 16:
                variable = _b.sent();
                return [2, variable.del()];
            case 17:
                if (!(arg.type === 'Identifier')) return [3, 19];
                globalScope = scope.global();
                return [5, __values(identifier_1.Identifier(arg, globalScope, { getName: true }))];
            case 18:
                name_1 = _b.sent();
                win = globalScope.find('window').get();
                return [2, delete win[name_1]];
            case 19: throw new SyntaxError('Unexpected token');
            case 20: throw new SyntaxError("Unexpected token " + node.operator);
        }
    });
}
exports.UnaryExpression = UnaryExpression;
function UpdateExpression(node, scope) {
    var arg, variable, value;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                arg = node.argument;
                if (!(arg.type === 'Identifier')) return [3, 2];
                return [5, __values(identifier_1.Identifier(arg, scope, { getVar: true }))];
            case 1:
                variable = _a.sent();
                return [3, 5];
            case 2:
                if (!(arg.type === 'MemberExpression')) return [3, 4];
                return [5, __values(MemberExpression(arg, scope, { getVar: true }))];
            case 3:
                variable = _a.sent();
                return [3, 5];
            case 4: throw new SyntaxError('Unexpected token');
            case 5:
                value = variable.get();
                if (node.operator === '++') {
                    variable.set(value + 1);
                    return [2, node.prefix ? variable.get() : value];
                }
                else if (node.operator === '--') {
                    variable.set(value - 1);
                    return [2, node.prefix ? variable.get() : value];
                }
                else {
                    throw new SyntaxError("Unexpected token " + node.operator);
                }
                return [2];
        }
    });
}
exports.UpdateExpression = UpdateExpression;
function BinaryExpression(node, scope) {
    var left, right, binaryOps, handler;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [5, __values(_1.default(node.left, scope))];
            case 1:
                left = _a.sent();
                return [5, __values(_1.default(node.right, scope))];
            case 2:
                right = _a.sent();
                binaryOps = {
                    '==': function () { return left == right; },
                    '!=': function () { return left != right; },
                    '===': function () { return left === right; },
                    '!==': function () { return left !== right; },
                    '<': function () { return left < right; },
                    '<=': function () { return left <= right; },
                    '>': function () { return left > right; },
                    '>=': function () { return left >= right; },
                    '<<': function () { return left << right; },
                    '>>': function () { return left >> right; },
                    '>>>': function () { return left >>> right; },
                    '+': function () { return left + right; },
                    '-': function () { return left - right; },
                    '*': function () { return left * right; },
                    '**': function () { return Math.pow(left, right); },
                    '/': function () { return left / right; },
                    '%': function () { return left % right; },
                    '|': function () { return left | right; },
                    '^': function () { return left ^ right; },
                    '&': function () { return left & right; },
                    'in': function () { return left in right; },
                    'instanceof': function () { return left instanceof right; },
                };
                handler = binaryOps[node.operator];
                if (handler) {
                    return [2, handler()];
                }
                else {
                    throw new SyntaxError("Unexpected token " + node.operator);
                }
                return [2];
        }
    });
}
exports.BinaryExpression = BinaryExpression;
function AssignmentExpression(node, scope) {
    var value, left, variable, win, assignOps, handler;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [5, __values(_1.default(node.right, scope))];
            case 1:
                value = _a.sent();
                left = node.left;
                if (!(left.type === 'Identifier')) return [3, 3];
                return [5, __values(identifier_1.Identifier(left, scope, { getVar: true, throwErr: false }))];
            case 2:
                variable = _a.sent();
                if (!variable) {
                    win = scope.global().find('window').get();
                    variable = new variable_1.Prop(win, left.name);
                }
                return [3, 7];
            case 3:
                if (!(left.type === 'MemberExpression')) return [3, 5];
                return [5, __values(MemberExpression(left, scope, { getVar: true }))];
            case 4:
                variable = _a.sent();
                return [3, 7];
            case 5: return [5, __values(helper_1.pattern(left, scope, { feed: value }))];
            case 6: return [2, _a.sent()];
            case 7:
                assignOps = {
                    '=': function () {
                        variable.set(value);
                        return variable.get();
                    },
                    '+=': function () {
                        variable.set(variable.get() + value);
                        return variable.get();
                    },
                    '-=': function () {
                        variable.set(variable.get() - value);
                        return variable.get();
                    },
                    '*=': function () {
                        variable.set(variable.get() * value);
                        return variable.get();
                    },
                    '/=': function () {
                        variable.set(variable.get() / value);
                        return variable.get();
                    },
                    '%=': function () {
                        variable.set(variable.get() % value);
                        return variable.get();
                    },
                    '**=': function () {
                        variable.set(Math.pow(variable.get(), value));
                        return variable.get();
                    },
                    '<<=': function () {
                        variable.set(variable.get() << value);
                        return variable.get();
                    },
                    '>>=': function () {
                        variable.set(variable.get() >> value);
                        return variable.get();
                    },
                    '>>>=': function () {
                        variable.set(variable.get() >>> value);
                        return variable.get();
                    },
                    '|=': function () {
                        variable.set(variable.get() | value);
                        return variable.get();
                    },
                    '^=': function () {
                        variable.set(variable.get() ^ value);
                        return variable.get();
                    },
                    '&=': function () {
                        variable.set(variable.get() & value);
                        return variable.get();
                    },
                };
                handler = assignOps[node.operator];
                if (handler) {
                    return [2, handler()];
                }
                else {
                    throw new SyntaxError("Unexpected token " + node.operator);
                }
                return [2];
        }
    });
}
exports.AssignmentExpression = AssignmentExpression;
function LogicalExpression(node, scope) {
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _a = node.operator;
                switch (_a) {
                    case '||': return [3, 1];
                    case '&&': return [3, 5];
                }
                return [3, 9];
            case 1: return [5, __values(_1.default(node.left, scope))];
            case 2:
                _b = (_d.sent());
                if (_b) return [3, 4];
                return [5, __values(_1.default(node.right, scope))];
            case 3:
                _b = (_d.sent());
                _d.label = 4;
            case 4: return [2, _b];
            case 5: return [5, __values(_1.default(node.left, scope))];
            case 6:
                _c = (_d.sent());
                if (!_c) return [3, 8];
                return [5, __values(_1.default(node.right, scope))];
            case 7:
                _c = (_d.sent());
                _d.label = 8;
            case 8: return [2, _c];
            case 9: throw new SyntaxError("Unexpected token " + node.operator);
        }
    });
}
exports.LogicalExpression = LogicalExpression;
function MemberExpression(node, scope, options) {
    var _a, getObj, _b, getVar, object, key, setter, thisObject, privateKey, getter, thisObject;
    if (options === void 0) { options = {}; }
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = options.getObj, getObj = _a === void 0 ? false : _a, _b = options.getVar, getVar = _b === void 0 ? false : _b;
                if (!(node.object.type === 'Super')) return [3, 2];
                return [5, __values(Super(node.object, scope, { getProto: true }))];
            case 1:
                object = _c.sent();
                return [3, 4];
            case 2: return [5, __values(_1.default(node.object, scope))];
            case 3:
                object = _c.sent();
                _c.label = 4;
            case 4:
                if (getObj) {
                    if (node.object.type === 'Super') {
                        return [2, scope.find('this').get()];
                    }
                    else {
                        return [2, object];
                    }
                }
                if (!node.computed) return [3, 6];
                return [5, __values(_1.default(node.property, scope))];
            case 5:
                key = _c.sent();
                return [3, 9];
            case 6:
                if (!(node.property.type === 'Identifier')) return [3, 8];
                return [5, __values(identifier_1.Identifier(node.property, scope, { getName: true }))];
            case 7:
                key = _c.sent();
                return [3, 9];
            case 8: throw new SyntaxError('Unexpected token');
            case 9:
                if (getVar) {
                    setter = util_1.getSetter(object, key);
                    if (node.object.type === 'Super' && setter) {
                        thisObject = scope.find('this').get();
                        privateKey = util_1.createSymbol(key);
                        util_1.define(thisObject, privateKey, { set: setter });
                        return [2, new variable_1.Prop(thisObject, privateKey)];
                    }
                    else {
                        return [2, new variable_1.Prop(object, key)];
                    }
                }
                else {
                    getter = util_1.getGetter(object, key);
                    if (node.object.type === 'Super' && getter) {
                        thisObject = scope.find('this').get();
                        return [2, getter.call(thisObject)];
                    }
                    else {
                        return [2, object[key]];
                    }
                }
                return [2];
        }
    });
}
exports.MemberExpression = MemberExpression;
function ConditionalExpression(node, scope) {
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [5, __values(_1.default(node.test, scope))];
            case 1:
                if (!(_b.sent())) return [3, 3];
                return [5, __values(_1.default(node.consequent, scope))];
            case 2:
                _a = (_b.sent());
                return [3, 5];
            case 3: return [5, __values(_1.default(node.alternate, scope))];
            case 4:
                _a = (_b.sent());
                _b.label = 5;
            case 5: return [2, _a];
        }
    });
}
exports.ConditionalExpression = ConditionalExpression;
function CallExpression(node, scope, options) {
    var e_3, _a, _b, async, func, object, key, getter, thisObject, args, _c, _d, arg, _e, _f, e_3_1;
    if (options === void 0) { options = {}; }
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0:
                _b = options.async, async = _b === void 0 ? false : _b;
                if (!(node.callee.type === 'MemberExpression')) return [3, 7];
                return [5, __values(MemberExpression(node.callee, scope, { getObj: true }))];
            case 1:
                object = _g.sent();
                key = void 0;
                if (!node.callee.computed) return [3, 3];
                return [5, __values(_1.default(node.callee.property, scope))];
            case 2:
                key = _g.sent();
                return [3, 6];
            case 3:
                if (!(node.callee.property.type === 'Identifier')) return [3, 5];
                return [5, __values(identifier_1.Identifier(node.callee.property, scope, { getName: true }))];
            case 4:
                key = _g.sent();
                return [3, 6];
            case 5: throw new SyntaxError('Unexpected token');
            case 6:
                getter = util_1.getGetter(object, key);
                if (node.callee.object.type === 'Super' && getter) {
                    thisObject = scope.find('this').get();
                    func = getter.call(thisObject);
                }
                else {
                    func = object[key];
                }
                return [3, 9];
            case 7:
                object = scope.find('this').get();
                return [5, __values(_1.default(node.callee, scope))];
            case 8:
                func = _g.sent();
                _g.label = 9;
            case 9:
                args = [];
                _g.label = 10;
            case 10:
                _g.trys.push([10, 15, 16, 17]);
                _c = __values(node.arguments), _d = _c.next();
                _g.label = 11;
            case 11:
                if (!!_d.done) return [3, 14];
                arg = _d.value;
                _f = (_e = args).push;
                return [5, __values(_1.default(arg, scope))];
            case 12:
                _f.apply(_e, [_g.sent()]);
                _g.label = 13;
            case 13:
                _d = _c.next();
                return [3, 11];
            case 14: return [3, 17];
            case 15:
                e_3_1 = _g.sent();
                e_3 = { error: e_3_1 };
                return [3, 17];
            case 16:
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_3) throw e_3.error; }
                return [7];
            case 17:
                if (func.async && !async) {
                    return [2, func.apply(object, args).then()];
                }
                else {
                    return [2, func.apply(object, args)];
                }
                return [2];
        }
    });
}
exports.CallExpression = CallExpression;
function NewExpression(node, scope) {
    var e_4, _a, constructor, args, _b, _c, arg, _d, _e, e_4_1;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0: return [5, __values(_1.default(node.callee, scope))];
            case 1:
                constructor = _f.sent();
                args = [];
                _f.label = 2;
            case 2:
                _f.trys.push([2, 7, 8, 9]);
                _b = __values(node.arguments), _c = _b.next();
                _f.label = 3;
            case 3:
                if (!!_c.done) return [3, 6];
                arg = _c.value;
                _e = (_d = args).push;
                return [5, __values(_1.default(arg, scope))];
            case 4:
                _e.apply(_d, [_f.sent()]);
                _f.label = 5;
            case 5:
                _c = _b.next();
                return [3, 3];
            case 6: return [3, 9];
            case 7:
                e_4_1 = _f.sent();
                e_4 = { error: e_4_1 };
                return [3, 9];
            case 8:
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_4) throw e_4.error; }
                return [7];
            case 9: return [2, new (constructor.bind.apply(constructor, __spread([void 0], args)))()];
        }
    });
}
exports.NewExpression = NewExpression;
function SequenceExpression(node, scope) {
    var e_5, _a, result, _b, _c, expression, e_5_1;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 5, 6, 7]);
                _b = __values(node.expressions), _c = _b.next();
                _d.label = 1;
            case 1:
                if (!!_c.done) return [3, 4];
                expression = _c.value;
                return [5, __values(_1.default(expression, scope))];
            case 2:
                result = _d.sent();
                _d.label = 3;
            case 3:
                _c = _b.next();
                return [3, 1];
            case 4: return [3, 7];
            case 5:
                e_5_1 = _d.sent();
                e_5 = { error: e_5_1 };
                return [3, 7];
            case 6:
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_5) throw e_5.error; }
                return [7];
            case 7: return [2, result];
        }
    });
}
exports.SequenceExpression = SequenceExpression;
function ArrowFunctionExpression(node, scope) {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [5, __values(helper_1.createFunc(node, scope))];
            case 1: return [2, _a.sent()];
        }
    });
}
exports.ArrowFunctionExpression = ArrowFunctionExpression;
function YieldExpression(node, scope) {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!node.delegate) return [3, 3];
                return [5, __values(_1.default(node.argument, scope))];
            case 1: return [5, __values(_a.sent())];
            case 2:
                _a.sent();
                return [3, 6];
            case 3: return [5, __values(_1.default(node.argument, scope))];
            case 4: return [4, _a.sent()];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6: return [2];
        }
    });
}
exports.YieldExpression = YieldExpression;
function AwaitExpression(node, scope) {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(node.argument.type === 'CallExpression')) return [3, 3];
                return [5, __values(CallExpression(node.argument, scope, { async: true }))];
            case 1: return [4, _a.sent()];
            case 2: return [2, _a.sent()];
            case 3: return [5, __values(_1.default(node.argument, scope))];
            case 4: return [4, _a.sent()];
            case 5: return [2, _a.sent()];
        }
    });
}
exports.AwaitExpression = AwaitExpression;
function TemplateLiteral(node, scope) {
    var quasis, expressions, result, temEl, expr, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                quasis = node.quasis;
                expressions = node.expressions;
                result = '';
                _c.label = 1;
            case 1:
                if (!(temEl = quasis.shift())) return [3, 5];
                _a = result;
                return [5, __values(TemplateElement(temEl, scope))];
            case 2:
                result = _a + _c.sent();
                expr = expressions.shift();
                if (!expr) return [3, 4];
                _b = result;
                return [5, __values(_1.default(expr, scope))];
            case 3:
                result = _b + _c.sent();
                _c.label = 4;
            case 4: return [3, 1];
            case 5: return [2, result];
        }
    });
}
exports.TemplateLiteral = TemplateLiteral;
function TaggedTemplateExpression(node, scope) {
    var e_6, _a, tagFunc, quasis, str, raw, expressions, args, _b, _c, n, _d, _e, e_6_1;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0: return [5, __values(_1.default(node.tag, scope))];
            case 1:
                tagFunc = _f.sent();
                quasis = node.quasi.quasis;
                str = quasis.map(function (v) { return v.value.cooked; });
                raw = quasis.map(function (v) { return v.value.raw; });
                util_1.define(str, 'raw', {
                    value: util_1.freeze(raw)
                });
                expressions = node.quasi.expressions;
                args = [];
                if (!expressions) return [3, 9];
                _f.label = 2;
            case 2:
                _f.trys.push([2, 7, 8, 9]);
                _b = __values(node.quasi.expressions), _c = _b.next();
                _f.label = 3;
            case 3:
                if (!!_c.done) return [3, 6];
                n = _c.value;
                _e = (_d = args).push;
                return [5, __values(_1.default(n, scope))];
            case 4:
                _e.apply(_d, [_f.sent()]);
                _f.label = 5;
            case 5:
                _c = _b.next();
                return [3, 3];
            case 6: return [3, 9];
            case 7:
                e_6_1 = _f.sent();
                e_6 = { error: e_6_1 };
                return [3, 9];
            case 8:
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_6) throw e_6.error; }
                return [7];
            case 9: return [2, tagFunc.apply(void 0, __spread([util_1.freeze(str)], args))];
        }
    });
}
exports.TaggedTemplateExpression = TaggedTemplateExpression;
function TemplateElement(node, scope) {
    return __generator(this, function (_a) {
        return [2, node.value.raw];
    });
}
exports.TemplateElement = TemplateElement;
function ClassExpression(node, scope) {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [5, __values(helper_1.createClass(node, scope))];
            case 1: return [2, _a.sent()];
        }
    });
}
exports.ClassExpression = ClassExpression;
function Super(node, scope, options) {
    var _a, getProto, superClass;
    if (options === void 0) { options = {}; }
    return __generator(this, function (_b) {
        _a = options.getProto, getProto = _a === void 0 ? false : _a;
        superClass = scope.find(const_1.SUPER).get();
        return [2, getProto ? superClass.prototype : superClass];
    });
}
exports.Super = Super;
//# sourceMappingURL=expression.js.map