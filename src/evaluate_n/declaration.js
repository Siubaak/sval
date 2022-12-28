import { pattern, createFunc, createClass } from './helper';
import { define, getDptor, assign } from '../share/util';
import { NOINIT, DEADZONE } from '../share/const';
import evaluate from '.';
export function FunctionDeclaration(node, scope) {
    scope.func(node.id.name, createFunc(node, scope));
}
export function VariableDeclaration(node, scope, options = {}) {
    for (let i = 0; i < node.declarations.length; i++) {
        VariableDeclarator(node.declarations[i], scope, assign({ kind: node.kind }, options));
    }
}
export function VariableDeclarator(node, scope, options = {}) {
    const { kind = 'var', hoist = false, onlyBlock = false, feed } = options;
    if (hoist) {
        if (onlyBlock || kind === 'var') {
            if (node.id.type === 'Identifier') {
                scope[kind](node.id.name, onlyBlock ? DEADZONE : kind === 'var' ? NOINIT : undefined);
            }
            else {
                pattern(node.id, scope, { kind, hoist, onlyBlock });
            }
        }
    }
    else {
        const hasFeed = 'feed' in options;
        const value = hasFeed ? feed : evaluate(node.init, scope);
        if (node.id.type === 'Identifier') {
            const name = node.id.name;
            if (kind === 'var' && !node.init && !hasFeed) {
                scope.var(name, NOINIT);
            }
            else {
                scope[kind](name, value);
            }
            if (node.init
                && ['ClassExpression', 'FunctionExpression', 'ArrowFunctionExpression']
                    .indexOf(node.init.type) !== -1
                && !value.name) {
                define(value, 'name', {
                    value: name,
                    configurable: true
                });
            }
        }
        else {
            pattern(node.id, scope, { kind, feed: value });
        }
    }
}
export function ClassDeclaration(node, scope) {
    scope.func(node.id.name, createClass(node, scope));
}
export function ClassBody(node, scope, options = {}) {
    const { klass, superClass } = options;
    for (let i = 0; i < node.body.length; i++) {
        const n = node.body[i];
        if (n.type === 'MethodDefinition') {
            MethodDefinition(n, scope, { klass, superClass });
        }
    }
}
export function MethodDefinition(node, scope, options = {}) {
    const { klass, superClass } = options;
    let key;
    if (node.computed) {
        key = evaluate(node.key, scope);
    }
    else if (node.key.type === 'Identifier') {
        key = node.key.name;
    }
    else {
        throw new SyntaxError('Unexpected token');
    }
    const obj = node.static ? klass : klass.prototype;
    const value = createFunc(node.value, scope, { superClass });
    switch (node.kind) {
        case 'constructor':
            break;
        case 'method':
            define(obj, key, {
                value,
                writable: true,
                configurable: true,
            });
            break;
        case 'get': {
            const oriDptor = getDptor(obj, key);
            define(obj, key, {
                get: value,
                set: oriDptor && oriDptor.set,
                configurable: true,
            });
            break;
        }
        case 'set': {
            const oriDptor = getDptor(obj, key);
            define(obj, key, {
                get: oriDptor && oriDptor.get,
                set: value,
                configurable: true,
            });
            break;
        }
        default:
            throw new SyntaxError('Unexpected token');
    }
}
