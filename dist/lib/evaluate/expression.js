"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
var helper_1 = require("../share/helper");
var util_1 = require("../share/util");
var const_1 = require("../share/const");
var identifier_1 = require("./identifier");
var literal_1 = require("./literal");
var variable_1 = require("../scope/variable");
function ThisExpression(node, scope) {
    return scope.find('this').get();
}
exports.ThisExpression = ThisExpression;
function ArrayExpression(node, scope) {
    return node.elements.map(function (item) { return _1.default(item, scope); });
}
exports.ArrayExpression = ArrayExpression;
function ObjectExpression(node, scope) {
    var object = {};
    for (var _i = 0, _a = node.properties; _i < _a.length; _i++) {
        var property = _a[_i];
        var propKey = property.key;
        var key = void 0;
        if (propKey.type === 'Identifier') {
            key = identifier_1.Identifier(propKey, scope, { getName: true });
        }
        else if (propKey.type === 'Literal') {
            key = '' + literal_1.Literal(propKey, scope);
        }
        else {
            throw new SyntaxError('Unexpected token');
        }
        var value = _1.default(property.value, scope);
        var propKind = property.kind;
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
    }
    return object;
}
exports.ObjectExpression = ObjectExpression;
function FunctionExpression(node, scope) {
    return node.generator ? helper_1.createFakeGenerator(node, scope) : helper_1.createFunc(node, scope);
}
exports.FunctionExpression = FunctionExpression;
function UnaryExpression(node, scope) {
    var unaryOps = {
        '+': function () { return +_1.default(node.argument, scope); },
        '-': function () { return -_1.default(node.argument, scope); },
        '!': function () { return !_1.default(node.argument, scope); },
        '~': function () { return ~_1.default(node.argument, scope); },
        'void': function () { return void _1.default(node.argument, scope); },
        'typeof': function () {
            if (node.argument.type === 'Identifier') {
                return typeof identifier_1.Identifier(node.argument, scope, { throwErr: false });
            }
            else {
                return typeof _1.default(node.argument, scope);
            }
        },
        'delete': function () {
            var arg = node.argument;
            if (arg.type === 'MemberExpression') {
                var variable = MemberExpression(arg, scope, { getVar: true });
                return variable.del();
            }
            else if (arg.type === 'Identifier') {
                var globalScope = scope.global();
                var name_1 = identifier_1.Identifier(arg, globalScope, { getName: true });
                var win = globalScope.find('window').get();
                return delete win[name_1];
            }
            else {
                throw new SyntaxError('Unexpected token');
            }
        }
    };
    var handler = unaryOps[node.operator];
    if (handler) {
        return handler();
    }
    else {
        throw new SyntaxError("Unexpected token " + node.operator);
    }
}
exports.UnaryExpression = UnaryExpression;
function UpdateExpression(node, scope) {
    var arg = node.argument;
    var variable;
    if (arg.type === 'Identifier') {
        variable = identifier_1.Identifier(arg, scope, { getVar: true });
    }
    else if (arg.type === 'MemberExpression') {
        variable = MemberExpression(arg, scope, { getVar: true });
    }
    else {
        throw new SyntaxError('Unexpected token');
    }
    var value = variable.get();
    if (node.operator === '++') {
        variable.set(value + 1);
        return node.prefix ? variable.get() : value;
    }
    else if (node.operator === '--') {
        variable.set(value - 1);
        return node.prefix ? variable.get() : value;
    }
    else {
        throw new SyntaxError("Unexpected token " + node.operator);
    }
}
exports.UpdateExpression = UpdateExpression;
function BinaryExpression(node, scope) {
    var left = _1.default(node.left, scope);
    var right = _1.default(node.right, scope);
    var binaryOps = {
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
    var handler = binaryOps[node.operator];
    if (handler) {
        return handler();
    }
    else {
        throw new SyntaxError("Unexpected token " + node.operator);
    }
}
exports.BinaryExpression = BinaryExpression;
function AssignmentExpression(node, scope) {
    var value = _1.default(node.right, scope);
    var left = node.left;
    var variable;
    if (left.type === 'Identifier') {
        variable = identifier_1.Identifier(left, scope, { getVar: true, throwErr: false });
        if (!variable) {
            var win = scope.global().find('window').get();
            variable = new variable_1.Prop(win, left.name);
        }
    }
    else if (left.type === 'MemberExpression') {
        variable = MemberExpression(left, scope, { getVar: true });
    }
    else {
        return helper_1.pattern(left, scope, { feed: value });
    }
    var assignOps = {
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
    var handler = assignOps[node.operator];
    if (handler) {
        return handler();
    }
    else {
        throw new SyntaxError("Unexpected token " + node.operator);
    }
}
exports.AssignmentExpression = AssignmentExpression;
function LogicalExpression(node, scope) {
    if (node.operator === '||') {
        return _1.default(node.left, scope) || _1.default(node.right, scope);
    }
    else if (node.operator === '&&') {
        return _1.default(node.left, scope) && _1.default(node.right, scope);
    }
    else {
        throw new SyntaxError("Unexpected token " + node.operator);
    }
}
exports.LogicalExpression = LogicalExpression;
function MemberExpression(node, scope, options) {
    if (options === void 0) { options = {}; }
    var _a = options.getObj, getObj = _a === void 0 ? false : _a, _b = options.getVar, getVar = _b === void 0 ? false : _b;
    var object;
    if (node.object.type === 'Super') {
        object = Super(node.object, scope, { getProto: true });
    }
    else {
        object = _1.default(node.object, scope);
    }
    if (getObj) {
        if (node.object.type === 'Super') {
            return scope.find('this').get();
        }
        else {
            return object;
        }
    }
    var key;
    if (node.computed) {
        key = _1.default(node.property, scope);
    }
    else if (node.property.type === 'Identifier') {
        key = identifier_1.Identifier(node.property, scope, { getName: true });
    }
    else {
        throw new SyntaxError('Unexpected token');
    }
    if (getVar) {
        var setter = util_1.getSetter(object, key);
        if (node.object.type === 'Super' && setter) {
            var thisObject = scope.find('this').get();
            var privateKey = util_1.createSymbol(key);
            util_1.define(thisObject, privateKey, { set: setter });
            return new variable_1.Prop(thisObject, privateKey);
        }
        else {
            return new variable_1.Prop(object, key);
        }
    }
    else {
        var getter = util_1.getGetter(object, key);
        if (node.object.type === 'Super' && getter) {
            var thisObject = scope.find('this').get();
            return getter.call(thisObject);
        }
        else {
            return object[key];
        }
    }
}
exports.MemberExpression = MemberExpression;
function ConditionalExpression(node, scope) {
    return _1.default(node.test, scope)
        ? _1.default(node.consequent, scope)
        : _1.default(node.alternate, scope);
}
exports.ConditionalExpression = ConditionalExpression;
function CallExpression(node, scope) {
    if (node.callee.type === 'MemberExpression') {
        var object = MemberExpression(node.callee, scope, { getObj: true });
        var key = void 0;
        if (node.callee.computed) {
            key = _1.default(node.callee.property, scope);
        }
        else if (node.callee.property.type === 'Identifier') {
            key = identifier_1.Identifier(node.callee.property, scope, { getName: true });
        }
        else {
            throw new SyntaxError('Unexpected token');
        }
        var func = void 0;
        var getter = util_1.getGetter(object, key);
        if (node.callee.object.type === 'Super' && getter) {
            var thisObject = scope.find('this').get();
            func = getter.call(thisObject);
        }
        else {
            func = object[key];
        }
        var args = node.arguments.map(function (arg) { return _1.default(arg, scope); });
        return func.apply(object, args);
    }
    else {
        var func = _1.default(node.callee, scope);
        var args = node.arguments.map(function (arg) { return _1.default(arg, scope); });
        var thisObject = scope.find('this').get();
        return func.apply(thisObject, args);
    }
}
exports.CallExpression = CallExpression;
function NewExpression(node, scope) {
    var constructor = _1.default(node.callee, scope);
    var args = node.arguments.map(function (arg) { return _1.default(arg, scope); });
    return new (constructor.bind.apply(constructor, [void 0].concat(args)))();
}
exports.NewExpression = NewExpression;
function SequenceExpression(node, scope) {
    var result;
    for (var _i = 0, _a = node.expressions; _i < _a.length; _i++) {
        var expression = _a[_i];
        result = _1.default(expression, scope);
    }
    return result;
}
exports.SequenceExpression = SequenceExpression;
function ArrowFunctionExpression(node, scope) {
    return helper_1.createFunc(node, scope);
}
exports.ArrowFunctionExpression = ArrowFunctionExpression;
function YieldExpression(node, scope) {
    return _1.default(node.argument, scope);
}
exports.YieldExpression = YieldExpression;
function TemplateLiteral(node, scope) {
    var quasis = node.quasis;
    var expressions = node.expressions;
    var result = '';
    var temEl;
    var expr;
    while (temEl = quasis.shift()) {
        result += TemplateElement(temEl, scope);
        expr = expressions.shift();
        if (expr) {
            result += _1.default(expr, scope);
        }
    }
    return result;
}
exports.TemplateLiteral = TemplateLiteral;
function TaggedTemplateExpression(node, scope) {
    var tagFunc = _1.default(node.tag, scope);
    var quasis = node.quasi.quasis;
    var str = quasis.map(function (v) { return v.value.cooked; });
    var raw = quasis.map(function (v) { return v.value.raw; });
    util_1.define(str, 'raw', {
        value: util_1.freeze(raw)
    });
    var expressions = node.quasi.expressions;
    var args = expressions.map(function (n) { return _1.default(n, scope); }) || [];
    return tagFunc.apply(void 0, [util_1.freeze(str)].concat(args));
}
exports.TaggedTemplateExpression = TaggedTemplateExpression;
function TemplateElement(node, scope) {
    return node.value.raw;
}
exports.TemplateElement = TemplateElement;
function ClassExpression(node, scope) {
    return helper_1.createClass(node, scope);
}
exports.ClassExpression = ClassExpression;
function Super(node, scope, options) {
    if (options === void 0) { options = {}; }
    var _a = options.getProto, getProto = _a === void 0 ? false : _a;
    var superClass = scope.find(const_1.SUPER).get();
    return getProto ? superClass.prototype : superClass;
}
exports.Super = Super;
//# sourceMappingURL=expression.js.map