"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
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
var helper_1 = require("../share/helper");
var util_1 = require("../share/util");
var identifier_1 = require("./identifier");
function FunctionDeclaration(node, scope) {
    var func;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [5, __values(helper_1.createFunc(node, scope))];
            case 1:
                func = _a.sent();
                scope.let(node.id.name, func);
                return [2];
        }
    });
}
exports.FunctionDeclaration = FunctionDeclaration;
function VariableDeclaration(node, scope, options) {
    var e_1, _a, _b, _c, declarator, e_1_1;
    if (options === void 0) { options = {}; }
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 5, 6, 7]);
                _b = __values(node.declarations), _c = _b.next();
                _d.label = 1;
            case 1:
                if (!!_c.done) return [3, 4];
                declarator = _c.value;
                return [5, __values(VariableDeclarator(declarator, scope, __assign({ kind: node.kind }, options)))];
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
exports.VariableDeclaration = VariableDeclaration;
function VariableDeclarator(node, scope, options) {
    var _a, kind, _b, hoist, feed, name_1, value, _c, name_2;
    if (options === void 0) { options = {}; }
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _a = options.kind, kind = _a === void 0 ? 'let' : _a, _b = options.hoist, hoist = _b === void 0 ? false : _b, feed = options.feed;
                if (!hoist) return [3, 5];
                if (!(kind === 'var')) return [3, 4];
                if (!(node.id.type === 'Identifier')) return [3, 2];
                return [5, __values(identifier_1.Identifier(node.id, scope, { getName: true }))];
            case 1:
                name_1 = _d.sent();
                scope.var(name_1, undefined);
                return [3, 4];
            case 2: return [5, __values(helper_1.pattern(node.id, scope, { kind: kind, hoist: hoist }))];
            case 3:
                _d.sent();
                _d.label = 4;
            case 4: return [3, 14];
            case 5:
                if (!(kind === 'var'
                    || kind === 'let'
                    || kind === 'const')) return [3, 13];
                if (!(typeof feed === 'undefined')) return [3, 7];
                return [5, __values(_1.default(node.init, scope))];
            case 6:
                _c = _d.sent();
                return [3, 8];
            case 7:
                _c = feed;
                _d.label = 8;
            case 8:
                value = _c;
                if (!(node.id.type === 'Identifier')) return [3, 10];
                return [5, __values(identifier_1.Identifier(node.id, scope, { getName: true }))];
            case 9:
                name_2 = _d.sent();
                if (!scope[kind](name_2, value)) {
                    throw new SyntaxError("Identifier '" + name_2 + "' has already been declared");
                }
                return [3, 12];
            case 10: return [5, __values(helper_1.pattern(node.id, scope, { kind: kind, feed: value }))];
            case 11:
                _d.sent();
                _d.label = 12;
            case 12: return [3, 14];
            case 13: throw new SyntaxError('Unexpected identifier');
            case 14: return [2];
        }
    });
}
exports.VariableDeclarator = VariableDeclarator;
function ClassDeclaration(node, scope) {
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _b = (_a = scope).let;
                _c = [node.id.name];
                return [5, __values(helper_1.createClass(node, scope))];
            case 1:
                _b.apply(_a, _c.concat([_d.sent()]));
                return [2];
        }
    });
}
exports.ClassDeclaration = ClassDeclaration;
function ClassBody(node, scope, options) {
    var e_2, _a, _b, klass, _c, _d, method, e_2_1;
    if (options === void 0) { options = {}; }
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _b = options.klass, klass = _b === void 0 ? function () { } : _b;
                _e.label = 1;
            case 1:
                _e.trys.push([1, 6, 7, 8]);
                _c = __values(node.body), _d = _c.next();
                _e.label = 2;
            case 2:
                if (!!_d.done) return [3, 5];
                method = _d.value;
                return [5, __values(MethodDefinition(method, scope, { klass: klass }))];
            case 3:
                _e.sent();
                _e.label = 4;
            case 4:
                _d = _c.next();
                return [3, 2];
            case 5: return [3, 8];
            case 6:
                e_2_1 = _e.sent();
                e_2 = { error: e_2_1 };
                return [3, 8];
            case 7:
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_2) throw e_2.error; }
                return [7];
            case 8: return [2];
        }
    });
}
exports.ClassBody = ClassBody;
function MethodDefinition(node, scope, options) {
    var _a, klass, key, obj, value, oriDptor, oriDptor;
    if (options === void 0) { options = {}; }
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = options.klass, klass = _a === void 0 ? function () { } : _a;
                if (!node.computed) return [3, 2];
                return [5, __values(_1.default(node.key, scope))];
            case 1:
                key = _b.sent();
                return [3, 5];
            case 2:
                if (!(node.key.type === 'Identifier')) return [3, 4];
                return [5, __values(identifier_1.Identifier(node.key, scope, { getName: true }))];
            case 3:
                key = _b.sent();
                return [3, 5];
            case 4: throw new SyntaxError('Unexpected token');
            case 5:
                obj = node.static ? klass : klass.prototype;
                return [5, __values(helper_1.createFunc(node.value, scope))];
            case 6:
                value = _b.sent();
                switch (node.kind) {
                    case 'constructor':
                        break;
                    case 'method':
                        util_1.define(obj, key, {
                            value: value,
                            writable: true,
                            configurable: true,
                        });
                        break;
                    case 'get': {
                        oriDptor = util_1.getDptor(obj, key);
                        util_1.define(obj, key, {
                            get: value,
                            set: oriDptor && oriDptor.set,
                            configurable: true,
                        });
                        break;
                    }
                    case 'set': {
                        oriDptor = util_1.getDptor(obj, key);
                        util_1.define(obj, key, {
                            get: oriDptor && oriDptor.get,
                            set: value,
                            configurable: true,
                        });
                        break;
                    }
                    default:
                        throw new SyntaxError('Unexpected token');
                }
                return [2];
        }
    });
}
exports.MethodDefinition = MethodDefinition;
//# sourceMappingURL=declaration.js.map