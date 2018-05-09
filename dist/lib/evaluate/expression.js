"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var scope_1 = require("../scope");
var _1 = require(".");
var const_1 = require("../share/const");
var identifier_1 = require("./identifier");
var literal_1 = require("./literal");
var variable_1 = require("../scope/variable");
var statement_1 = require("./statement");
var hoisting_1 = require("../share/hoisting");
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
            Object.defineProperty(object, key, { get: value });
        }
        else if (propKind === 'set') {
            Object.defineProperty(object, key, { set: value });
        }
        else {
            throw new SyntaxError('Unexpected token');
        }
    }
    return object;
}
exports.ObjectExpression = ObjectExpression;
function FunctionExpression(node, scope) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var subScope = new scope_1.default(scope, true);
        subScope.const('this', this);
        subScope.let('arguments', arguments);
        var params = node.params;
        for (var i = 0; i < params.length; i++) {
            var name_1 = params[i].name;
            subScope.let(name_1, args[i]);
        }
        hoisting_1.default(node.body, subScope);
        var result = statement_1.BlockStatement(node.body, subScope, { invasived: true });
        if (result === const_1.RETURN) {
            return result.RES;
        }
    };
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
                var name_2 = identifier_1.Identifier(arg, globalScope, { getName: true });
                var win = globalScope.find('window').get();
                return delete win[name_2];
            }
            else {
                throw new SyntaxError('Unexpected token');
            }
        }
    };
    var handle = unaryOps[node.operator];
    if (handle) {
        return handle();
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
    var handle = binaryOps[node.operator];
    if (handle) {
        return handle();
    }
    else {
        throw new SyntaxError("Unexpected token " + node.operator);
    }
}
exports.BinaryExpression = BinaryExpression;
function AssignmentExpression(node, scope) {
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
        throw new SyntaxError('Unexpected token');
    }
    var value = _1.default(node.right, scope);
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
    var handle = assignOps[node.operator];
    if (handle) {
        return handle();
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
    var _a = options || {}, _b = _a.getObj, getObj = _b === void 0 ? false : _b, _c = _a.getVar, getVar = _c === void 0 ? false : _c;
    var object = _1.default(node.object, scope);
    if (getObj) {
        return object;
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
        return new variable_1.Prop(object, key);
    }
    else {
        return object[key];
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
    var func = _1.default(node.callee, scope);
    var args = node.arguments.map(function (arg) { return _1.default(arg, scope); });
    if (node.callee.type === 'MemberExpression') {
        var object = MemberExpression(node.callee, scope, { getObj: true });
        return func.apply(object, args);
    }
    else {
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
//# sourceMappingURL=expression.js.map