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
var _1 = require(".");
var identifier_1 = require("./identifier");
var helper_1 = require("../share/helper");
function ObjectPattern(node, scope, options) {
    var e_1, _a, _b, _c, property, e_1_1;
    if (options === void 0) { options = {}; }
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 5, 6, 7]);
                _b = __values(node.properties), _c = _b.next();
                _d.label = 1;
            case 1:
                if (!!_c.done) return [3, 4];
                property = _c.value;
                return [5, __values(AssignmentProperty(property, scope, options))];
            case 2:
                _d.sent();
                _d.label = 3;
            case 3:
                _c = _b.next();
                return [3, 1];
            case 4: return [3, 7];
            case 5:
                e_1_1 = _d.sent();
                e_1 = { error: e_1_1 };
                return [3, 7];
            case 6:
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
                return [7];
            case 7: return [2];
        }
    });
}
exports.ObjectPattern = ObjectPattern;
function AssignmentProperty(node, scope, options) {
    var _a, kind, _b, hoist, _c, feed, value, name_1, key, name_2;
    if (options === void 0) { options = {}; }
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _a = options.kind, kind = _a === void 0 ? 'let' : _a, _b = options.hoist, hoist = _b === void 0 ? false : _b, _c = options.feed, feed = _c === void 0 ? {} : _c;
                value = node.value;
                if (!hoist) return [3, 5];
                if (!(kind === 'var')) return [3, 4];
                if (!(value.type === 'Identifier')) return [3, 2];
                return [5, __values(identifier_1.Identifier(value, scope, { getName: true }))];
            case 1:
                name_1 = _d.sent();
                scope.var(name_1, undefined);
                return [3, 4];
            case 2: return [5, __values(helper_1.pattern(value, scope, { kind: kind, hoist: hoist }))];
            case 3:
                _d.sent();
                _d.label = 4;
            case 4: return [3, 14];
            case 5:
                key = void 0;
                if (!node.computed) return [3, 7];
                return [5, __values(_1.default(node.key, scope))];
            case 6:
                key = _d.sent();
                return [3, 10];
            case 7:
                if (!(node.key.type === 'Identifier')) return [3, 9];
                return [5, __values(identifier_1.Identifier(node.key, scope, { getName: true }))];
            case 8:
                key = _d.sent();
                return [3, 10];
            case 9: throw new SyntaxError('Unexpected token');
            case 10:
                if (!(value.type === 'Identifier')) return [3, 12];
                return [5, __values(identifier_1.Identifier(value, scope, { getName: true }))];
            case 11:
                name_2 = _d.sent();
                if (!scope[kind](name_2, feed[key])) {
                    throw new SyntaxError("Identifier '" + name_2 + "' has already been declared");
                }
                return [3, 14];
            case 12: return [5, __values(helper_1.pattern(value, scope, { kind: kind, feed: feed[key] }))];
            case 13:
                _d.sent();
                _d.label = 14;
            case 14: return [2];
        }
    });
}
exports.AssignmentProperty = AssignmentProperty;
function ArrayPattern(node, scope, options) {
    var kind, _a, hoist, _b, feed, result, i, element, name_3, name_4, variable;
    if (options === void 0) { options = {}; }
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                kind = options.kind, _a = options.hoist, hoist = _a === void 0 ? false : _a, _b = options.feed, feed = _b === void 0 ? [] : _b;
                result = [];
                i = 0;
                _c.label = 1;
            case 1:
                if (!(i < node.elements.length)) return [3, 13];
                element = node.elements[i];
                if (!hoist) return [3, 6];
                if (!(kind === 'var')) return [3, 5];
                if (!(element.type === 'Identifier')) return [3, 3];
                return [5, __values(identifier_1.Identifier(element, scope, { getName: true }))];
            case 2:
                name_3 = _c.sent();
                scope.var(name_3, undefined);
                return [3, 5];
            case 3: return [5, __values(helper_1.pattern(element, scope, { kind: kind, hoist: hoist }))];
            case 4:
                _c.sent();
                _c.label = 5;
            case 5: return [3, 12];
            case 6:
                if (!(kind && element.type === 'Identifier')) return [3, 8];
                return [5, __values(identifier_1.Identifier(element, scope, { getName: true }))];
            case 7:
                name_4 = _c.sent();
                if (!scope[kind](name_4, feed[i])) {
                    throw new SyntaxError("Identifier '" + name_4 + "' has already been declared");
                }
                return [3, 12];
            case 8:
                if (!(element.type === 'Identifier')) return [3, 10];
                return [5, __values(identifier_1.Identifier(element, scope, { getVar: true }))];
            case 9:
                variable = _c.sent();
                variable.set(feed[i]);
                result.push(variable.get());
                return [3, 12];
            case 10: return [5, __values(helper_1.pattern(element, scope, { kind: kind, feed: feed[i] }))];
            case 11:
                _c.sent();
                _c.label = 12;
            case 12:
                i++;
                return [3, 1];
            case 13:
                if (result.length) {
                    return [2, result];
                }
                return [2];
        }
    });
}
exports.ArrayPattern = ArrayPattern;
function RestElement(node, scope, options) {
    var _a, kind, _b, hoist, _c, feed, arg, name_5, name_6;
    if (options === void 0) { options = {}; }
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _a = options.kind, kind = _a === void 0 ? 'let' : _a, _b = options.hoist, hoist = _b === void 0 ? false : _b, _c = options.feed, feed = _c === void 0 ? [] : _c;
                arg = node.argument;
                if (!hoist) return [3, 5];
                if (!(kind === 'var')) return [3, 4];
                if (!(arg.type === 'Identifier')) return [3, 2];
                return [5, __values(identifier_1.Identifier(arg, scope, { getName: true }))];
            case 1:
                name_5 = _d.sent();
                scope.var(name_5, undefined);
                return [3, 4];
            case 2: return [5, __values(helper_1.pattern(arg, scope, { kind: kind, hoist: hoist }))];
            case 3:
                _d.sent();
                _d.label = 4;
            case 4: return [3, 9];
            case 5:
                if (!(arg.type === 'Identifier')) return [3, 7];
                return [5, __values(identifier_1.Identifier(arg, scope, { getName: true }))];
            case 6:
                name_6 = _d.sent();
                if (!scope[kind](name_6, feed)) {
                    throw new SyntaxError("Identifier '" + name_6 + "' has already been declared");
                }
                return [3, 9];
            case 7: return [5, __values(helper_1.pattern(arg, scope, { kind: kind, feed: feed }))];
            case 8:
                _d.sent();
                _d.label = 9;
            case 9: return [2];
        }
    });
}
exports.RestElement = RestElement;
function AssignmentPattern(node, scope) {
    var feed, name_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [5, __values(_1.default(node.right, scope))];
            case 1:
                feed = _a.sent();
                if (!(node.left.type === 'Identifier')) return [3, 3];
                return [5, __values(identifier_1.Identifier(node.left, scope, { getName: true }))];
            case 2:
                name_7 = _a.sent();
                scope.let(name_7, feed);
                return [3, 5];
            case 3: return [5, __values(helper_1.pattern(node.left, scope, { feed: feed }))];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5: return [2];
        }
    });
}
exports.AssignmentPattern = AssignmentPattern;
//# sourceMappingURL=pattern.js.map