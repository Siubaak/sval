"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
var identifier_1 = require("./identifier");
var helper_1 = require("../share/helper");
function ObjectPattern(node, scope, options) {
    if (options === void 0) { options = {}; }
    for (var _i = 0, _a = node.properties; _i < _a.length; _i++) {
        var property = _a[_i];
        AssignmentProperty(property, scope, options);
    }
}
exports.ObjectPattern = ObjectPattern;
function AssignmentProperty(node, scope, options) {
    if (options === void 0) { options = {}; }
    var _a = options.kind, kind = _a === void 0 ? 'let' : _a, _b = options.hoist, hoist = _b === void 0 ? false : _b, _c = options.feed, feed = _c === void 0 ? {} : _c;
    var value = node.value;
    if (hoist) {
        if (kind === 'var') {
            if (value.type === 'Identifier') {
                var name_1 = identifier_1.Identifier(value, scope, { getName: true });
                scope.var(name_1, undefined);
            }
            else {
                helper_1.pattern(value, scope, { kind: kind, hoist: hoist });
            }
        }
    }
    else {
        var key = void 0;
        if (node.computed) {
            key = _1.default(node.key, scope);
        }
        else if (node.key.type === 'Identifier') {
            key = identifier_1.Identifier(node.key, scope, { getName: true });
        }
        else {
            throw new SyntaxError('Unexpected token');
        }
        if (value.type === 'Identifier') {
            var name_2 = identifier_1.Identifier(value, scope, { getName: true });
            if (!scope[kind](name_2, feed[key])) {
                throw new SyntaxError("Identifier '" + name_2 + "' has already been declared");
            }
        }
        else {
            helper_1.pattern(value, scope, { kind: kind, feed: feed[key] });
        }
    }
}
exports.AssignmentProperty = AssignmentProperty;
function ArrayPattern(node, scope, options) {
    if (options === void 0) { options = {}; }
    var kind = options.kind, _a = options.hoist, hoist = _a === void 0 ? false : _a, _b = options.feed, feed = _b === void 0 ? [] : _b;
    var result = [];
    for (var i = 0; i < node.elements.length; i++) {
        var element = node.elements[i];
        if (hoist) {
            if (kind === 'var') {
                if (element.type === 'Identifier') {
                    var name_3 = identifier_1.Identifier(element, scope, { getName: true });
                    scope.var(name_3, undefined);
                }
                else {
                    helper_1.pattern(element, scope, { kind: kind, hoist: hoist });
                }
            }
        }
        else {
            if (kind && element.type === 'Identifier') {
                var name_4 = identifier_1.Identifier(element, scope, { getName: true });
                if (!scope[kind](name_4, feed[i])) {
                    throw new SyntaxError("Identifier '" + name_4 + "' has already been declared");
                }
            }
            else if (element.type === 'Identifier') {
                var variable = identifier_1.Identifier(element, scope, { getVar: true });
                variable.set(feed[i]);
                result.push(variable.get());
            }
            else {
                helper_1.pattern(element, scope, { kind: kind, feed: feed[i] });
            }
        }
    }
    if (result.length) {
        return result;
    }
}
exports.ArrayPattern = ArrayPattern;
function RestElement(node, scope, options) {
    if (options === void 0) { options = {}; }
    var _a = options.kind, kind = _a === void 0 ? 'let' : _a, _b = options.hoist, hoist = _b === void 0 ? false : _b, _c = options.feed, feed = _c === void 0 ? [] : _c;
    var arg = node.argument;
    if (hoist) {
        if (kind === 'var') {
            if (arg.type === 'Identifier') {
                var name_5 = identifier_1.Identifier(arg, scope, { getName: true });
                scope.var(name_5, undefined);
            }
            else {
                helper_1.pattern(arg, scope, { kind: kind, hoist: hoist });
            }
        }
    }
    else {
        if (arg.type === 'Identifier') {
            var name_6 = identifier_1.Identifier(arg, scope, { getName: true });
            if (!scope[kind](name_6, feed)) {
                throw new SyntaxError("Identifier '" + name_6 + "' has already been declared");
            }
        }
        else {
            helper_1.pattern(arg, scope, { kind: kind, feed: feed });
        }
    }
}
exports.RestElement = RestElement;
function AssignmentPattern(node, scope) {
    var feed = _1.default(node.right, scope);
    if (node.left.type === 'Identifier') {
        var name_7 = identifier_1.Identifier(node.left, scope, { getName: true });
        scope.let(name_7, feed);
    }
    else {
        helper_1.pattern(node.left, scope, { feed: feed });
    }
}
exports.AssignmentPattern = AssignmentPattern;
//# sourceMappingURL=pattern.js.map