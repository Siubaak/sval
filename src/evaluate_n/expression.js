import { define, freeze, getGetter, getSetter, createSymbol, assign, getDptor, WINDOW } from '../share/util';
import { SUPER, NOCTOR, CLSCTOR, NEWTARGET, SUPERCALL } from '../share/const';
import { pattern, createFunc, createClass } from './helper';
import { Prop } from '../scope/variable';
import { Identifier } from './identifier';
import { Literal } from './literal';
import Scope from '../scope';
import evaluate from '.';
export function ThisExpression(node, scope) {
    const superCall = scope.find(SUPERCALL);
    if (superCall && !superCall.get()) {
        throw new ReferenceError('Must call super constructor in derived class '
            + 'before accessing \'this\' or returning from derived constructor');
    }
    else {
        return scope.find('this').get();
    }
}
export function ArrayExpression(node, scope) {
    let results = [];
    for (let i = 0; i < node.elements.length; i++) {
        const item = node.elements[i];
        if (item.type === 'SpreadElement') {
            results = results.concat(SpreadElement(item, scope));
        }
        else {
            results.push(evaluate(item, scope));
        }
    }
    return results;
}
export function ObjectExpression(node, scope) {
    const object = {};
    for (let i = 0; i < node.properties.length; i++) {
        const property = node.properties[i];
        if (property.type === 'SpreadElement') {
            assign(object, SpreadElement(property, scope));
        }
        else if (property.type === 'Property') {
            let key;
            const propKey = property.key;
            if (property.computed) {
                key = evaluate(propKey, scope);
            }
            else {
                if (propKey.type === 'Identifier') {
                    key = propKey.name;
                }
                else {
                    key = '' + (Literal(propKey, scope));
                }
            }
            const value = evaluate(property.value, scope);
            const propKind = property.kind;
            if (propKind === 'init') {
                object[key] = value;
            }
            else if (propKind === 'get') {
                const oriDptor = getDptor(object, key);
                define(object, key, {
                    get: value,
                    set: oriDptor && oriDptor.set,
                    enumerable: true,
                    configurable: true
                });
            }
            else {
                const oriDptor = getDptor(object, key);
                define(object, key, {
                    get: oriDptor && oriDptor.get,
                    set: value,
                    enumerable: true,
                    configurable: true
                });
            }
        }
    }
    return object;
}
export function FunctionExpression(node, scope) {
    if (node.id && node.id.name) {
        const tmpScope = new Scope(scope);
        const func = createFunc(node, tmpScope);
        tmpScope.const(node.id.name, func);
        return func;
    }
    else {
        return createFunc(node, scope);
    }
}
export function UnaryExpression(node, scope) {
    const arg = node.argument;
    switch (node.operator) {
        case '+': return +(evaluate(arg, scope));
        case '-': return -(evaluate(arg, scope));
        case '!': return !(evaluate(arg, scope));
        case '~': return ~(evaluate(arg, scope));
        case 'void': return void (evaluate(arg, scope));
        case 'typeof':
            if (arg.type === 'Identifier') {
                return typeof (Identifier(arg, scope, { throwErr: false }));
            }
            else {
                return typeof (evaluate(arg, scope));
            }
        case 'delete':
            if (arg.type === 'MemberExpression') {
                const variable = MemberExpression(arg, scope, { getVar: true });
                return variable.del();
            }
            else if (arg.type === 'Identifier') {
                throw new SyntaxError('Delete of an unqualified identifier in strict mode');
            }
            else {
                evaluate(arg, scope);
                return true;
            }
        default: throw new SyntaxError(`Unexpected token ${node.operator}`);
    }
}
export function UpdateExpression(node, scope) {
    const arg = node.argument;
    let variable;
    if (arg.type === 'Identifier') {
        variable = Identifier(arg, scope, { getVar: true });
    }
    else if (arg.type === 'MemberExpression') {
        variable = MemberExpression(arg, scope, { getVar: true });
    }
    else {
        throw new SyntaxError('Unexpected token');
    }
    const value = variable.get();
    if (node.operator === '++') {
        variable.set(value + 1);
        return node.prefix ? variable.get() : value;
    }
    else if (node.operator === '--') {
        variable.set(value - 1);
        return node.prefix ? variable.get() : value;
    }
    else {
        throw new SyntaxError(`Unexpected token ${node.operator}`);
    }
}
export function BinaryExpression(node, scope) {
    const left = evaluate(node.left, scope);
    const right = evaluate(node.right, scope);
    switch (node.operator) {
        case '==': return left == right;
        case '!=': return left != right;
        case '===': return left === right;
        case '!==': return left !== right;
        case '<': return left < right;
        case '<=': return left <= right;
        case '>': return left > right;
        case '>=': return left >= right;
        case '<<': return left << right;
        case '>>': return left >> right;
        case '>>>': return left >>> right;
        case '+': return left + right;
        case '-': return left - right;
        case '*': return left * right;
        case '**': return left ** right;
        case '/': return left / right;
        case '%': return left % right;
        case '|': return left | right;
        case '^': return left ^ right;
        case '&': return left & right;
        case 'in': return left in right;
        case 'instanceof': return left instanceof right;
        default: throw new SyntaxError(`Unexpected token ${node.operator}`);
    }
}
export function AssignmentExpression(node, scope) {
    const value = evaluate(node.right, scope);
    const left = node.left;
    let variable;
    if (left.type === 'Identifier') {
        variable = Identifier(left, scope, { getVar: true, throwErr: false });
        if (!variable) {
            const win = scope.global().find('window').get();
            variable = new Prop(win, left.name);
        }
    }
    else if (left.type === 'MemberExpression') {
        variable = MemberExpression(left, scope, { getVar: true });
    }
    else {
        return pattern(left, scope, { feed: value });
    }
    switch (node.operator) {
        case '=':
            variable.set(value);
            return variable.get();
        case '+=':
            variable.set(variable.get() + value);
            return variable.get();
        case '-=':
            variable.set(variable.get() - value);
            return variable.get();
        case '*=':
            variable.set(variable.get() * value);
            return variable.get();
        case '/=':
            variable.set(variable.get() / value);
            return variable.get();
        case '%=':
            variable.set(variable.get() % value);
            return variable.get();
        case '**=':
            variable.set(variable.get() ** value);
            return variable.get();
        case '<<=':
            variable.set(variable.get() << value);
            return variable.get();
        case '>>=':
            variable.set(variable.get() >> value);
            return variable.get();
        case '>>>=':
            variable.set(variable.get() >>> value);
            return variable.get();
        case '|=':
            variable.set(variable.get() | value);
            return variable.get();
        case '^=':
            variable.set(variable.get() ^ value);
            return variable.get();
        case '&=':
            variable.set(variable.get() & value);
            return variable.get();
        default: throw new SyntaxError(`Unexpected token ${node.operator}`);
    }
}
export function LogicalExpression(node, scope) {
    switch (node.operator) {
        case '||':
            return (evaluate(node.left, scope)) || (evaluate(node.right, scope));
        case '&&':
            return (evaluate(node.left, scope)) && (evaluate(node.right, scope));
        default:
            throw new SyntaxError(`Unexpected token ${node.operator}`);
    }
}
export function MemberExpression(node, scope, options = {}) {
    const { getObj = false, getVar = false } = options;
    let object;
    if (node.object.type === 'Super') {
        object = Super(node.object, scope, { getProto: true });
    }
    else {
        object = evaluate(node.object, scope);
    }
    if (getObj)
        return object;
    let key;
    if (node.computed) {
        key = evaluate(node.property, scope);
    }
    else {
        key = node.property.name;
    }
    if (getVar) {
        const setter = getSetter(object, key);
        if (node.object.type === 'Super' && setter) {
            const thisObject = scope.find('this').get();
            const privateKey = createSymbol(key);
            define(thisObject, privateKey, { set: setter });
            return new Prop(thisObject, privateKey);
        }
        else {
            return new Prop(object, key);
        }
    }
    else {
        const getter = getGetter(object, key);
        if (node.object.type === 'Super' && getter) {
            const thisObject = scope.find('this').get();
            return getter.call(thisObject);
        }
        else {
            return object[key];
        }
    }
}
export function ConditionalExpression(node, scope) {
    return (evaluate(node.test, scope))
        ? (evaluate(node.consequent, scope))
        : (evaluate(node.alternate, scope));
}
export function CallExpression(node, scope) {
    let func;
    let object;
    if (node.callee.type === 'MemberExpression') {
        object = MemberExpression(node.callee, scope, { getObj: true });
        let key;
        if (node.callee.computed) {
            key = evaluate(node.callee.property, scope);
        }
        else {
            key = node.callee.property.name;
        }
        if (node.callee.object.type === 'Super') {
            const thisObject = scope.find('this').get();
            func = object[key].bind(thisObject);
        }
        else {
            func = object[key];
        }
        if (typeof func !== 'function') {
            throw new TypeError(`${key} is not a function`);
        }
        else if (func[CLSCTOR]) {
            throw new TypeError(`Class constructor ${key} cannot be invoked without 'new'`);
        }
    }
    else {
        object = scope.find('this').get();
        func = evaluate(node.callee, scope);
        if (typeof func !== 'function' || node.callee.type !== 'Super' && func[CLSCTOR]) {
            let name;
            if (node.callee.type === 'Identifier') {
                name = node.callee.name;
            }
            else {
                try {
                    name = JSON.stringify(func);
                }
                catch (err) {
                    name = '' + func;
                }
            }
            if (typeof func !== 'function') {
                throw new TypeError(`${name} is not a function`);
            }
            else {
                throw new TypeError(`Class constructor ${name} cannot be invoked without 'new'`);
            }
        }
    }
    let args = [];
    for (let i = 0; i < node.arguments.length; i++) {
        const arg = node.arguments[i];
        if (arg.type === 'SpreadElement') {
            args = args.concat(SpreadElement(arg, scope));
        }
        else {
            args.push(evaluate(arg, scope));
        }
    }
    if (node.callee.type === 'Super') {
        const superCall = scope.find(SUPERCALL);
        if (superCall.get()) {
            throw new ReferenceError('Super constructor may only be called once');
        }
        else {
            scope.find(SUPERCALL).set(true);
        }
    }
    if (object && object[WINDOW] && func.toString().indexOf('[native code]') !== -1) {
        return func.apply(object[WINDOW], args);
    }
    return func.apply(object, args);
}
export function NewExpression(node, scope) {
    const constructor = evaluate(node.callee, scope);
    if (typeof constructor !== 'function') {
        let name;
        if (node.callee.type === 'Identifier') {
            name = node.callee.name;
        }
        else {
            try {
                name = JSON.stringify(constructor);
            }
            catch (err) {
                name = '' + constructor;
            }
        }
        throw new TypeError(`${name} is not a constructor`);
    }
    else if (constructor[NOCTOR]) {
        throw new TypeError(`${constructor.name || '(intermediate value)'} is not a constructor`);
    }
    let args = [];
    for (let i = 0; i < node.arguments.length; i++) {
        const arg = node.arguments[i];
        if (arg.type === 'SpreadElement') {
            args = args.concat(SpreadElement(arg, scope));
        }
        else {
            args.push(evaluate(arg, scope));
        }
    }
    return new constructor(...args);
}
export function MetaProperty(node, scope) {
    return scope.find(NEWTARGET).get();
}
export function SequenceExpression(node, scope) {
    let result;
    for (let i = 0; i < node.expressions.length; i++) {
        result = evaluate(node.expressions[i], scope);
    }
    return result;
}
export function ArrowFunctionExpression(node, scope) {
    return createFunc(node, scope);
}
export function TemplateLiteral(node, scope) {
    const quasis = node.quasis.slice();
    const expressions = node.expressions.slice();
    let result = '';
    let temEl;
    let expr;
    while (temEl = quasis.shift()) {
        result += TemplateElement(temEl, scope);
        expr = expressions.shift();
        if (expr) {
            result += evaluate(expr, scope);
        }
    }
    return result;
}
export function TaggedTemplateExpression(node, scope) {
    const tagFunc = evaluate(node.tag, scope);
    const quasis = node.quasi.quasis;
    const str = quasis.map(v => v.value.cooked);
    const raw = quasis.map(v => v.value.raw);
    define(str, 'raw', {
        value: freeze(raw)
    });
    const expressions = node.quasi.expressions;
    const args = [];
    if (expressions) {
        for (let i = 0; i < expressions.length; i++) {
            args.push(evaluate(expressions[i], scope));
        }
    }
    return tagFunc(freeze(str), ...args);
}
export function TemplateElement(node, scope) {
    return node.value.raw;
}
export function ClassExpression(node, scope) {
    if (node.id && node.id.name) {
        const tmpScope = new Scope(scope);
        const klass = createClass(node, tmpScope);
        tmpScope.const(node.id.name, klass);
        return klass;
    }
    else {
        return createClass(node, scope);
    }
}
export function Super(node, scope, options = {}) {
    const { getProto = false } = options;
    const superClass = scope.find(SUPER).get();
    return getProto ? superClass.prototype : superClass;
}
export function SpreadElement(node, scope) {
    return evaluate(node.argument, scope);
}
