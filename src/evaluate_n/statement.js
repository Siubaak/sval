import { BREAK, CONTINUE, RETURN } from '../share/const';
import { hoist, pattern, ForXHandler } from './helper';
import Scope from '../scope';
import evaluate from '.';
export function ExpressionStatement(node, scope) {
    evaluate(node.expression, scope);
}
export function BlockStatement(block, scope, options = {}) {
    const { invasived = false, hoisted = false, } = options;
    const subScope = invasived ? scope : new Scope(scope);
    if (!hoisted) {
        hoist(block, subScope, { onlyBlock: true });
    }
    for (let i = 0; i < block.body.length; i++) {
        const result = evaluate(block.body[i], subScope);
        if (result === BREAK || result === CONTINUE || result === RETURN) {
            return result;
        }
    }
}
export function EmptyStatement() {
}
export function DebuggerStatement() {
    debugger;
}
export function ReturnStatement(node, scope) {
    RETURN.RES = node.argument ? (evaluate(node.argument, scope)) : undefined;
    return RETURN;
}
export function BreakStatement() {
    return BREAK;
}
export function ContinueStatement() {
    return CONTINUE;
}
export function IfStatement(node, scope) {
    if (evaluate(node.test, scope)) {
        return evaluate(node.consequent, scope);
    }
    else {
        return evaluate(node.alternate, scope);
    }
}
export function SwitchStatement(node, scope) {
    const discriminant = evaluate(node.discriminant, scope);
    let matched = false;
    for (let i = 0; i < node.cases.length; i++) {
        const eachCase = node.cases[i];
        if (!matched
            && (!eachCase.test
                || (evaluate(eachCase.test, scope)) === discriminant)) {
            matched = true;
        }
        if (matched) {
            const result = SwitchCase(eachCase, scope);
            if (result === BREAK) {
                break;
            }
            if (result === CONTINUE || result === RETURN) {
                return result;
            }
        }
    }
}
export function SwitchCase(node, scope) {
    for (let i = 0; i < node.consequent.length; i++) {
        const result = evaluate(node.consequent[i], scope);
        if (result === BREAK || result === CONTINUE || result === RETURN) {
            return result;
        }
    }
}
export function ThrowStatement(node, scope) {
    throw evaluate(node.argument, scope);
}
export function TryStatement(node, scope) {
    try {
        return BlockStatement(node.block, scope);
    }
    catch (err) {
        if (node.handler) {
            const subScope = new Scope(scope);
            const param = node.handler.param;
            if (param) {
                if (param.type === 'Identifier') {
                    const name = param.name;
                    subScope.var(name, err);
                }
                else {
                    pattern(param, scope, { feed: err });
                }
            }
            return CatchClause(node.handler, subScope);
        }
        else {
            throw err;
        }
    }
    finally {
        if (node.finalizer) {
            const result = BlockStatement(node.finalizer, scope);
            if (result === BREAK || result === CONTINUE || result === RETURN) {
                return result;
            }
        }
    }
}
export function CatchClause(node, scope) {
    return BlockStatement(node.body, scope, { invasived: true });
}
export function WhileStatement(node, scope) {
    while (evaluate(node.test, scope)) {
        const result = evaluate(node.body, scope);
        if (result === BREAK) {
            break;
        }
        else if (result === CONTINUE) {
            continue;
        }
        else if (result === RETURN) {
            return result;
        }
    }
}
export function DoWhileStatement(node, scope) {
    do {
        const result = evaluate(node.body, scope);
        if (result === BREAK) {
            break;
        }
        else if (result === CONTINUE) {
            continue;
        }
        else if (result === RETURN) {
            return result;
        }
    } while (evaluate(node.test, scope));
}
export function ForStatement(node, scope) {
    const forScope = new Scope(scope);
    for (evaluate(node.init, forScope); node.test ? (evaluate(node.test, forScope)) : true; evaluate(node.update, forScope)) {
        const subScope = new Scope(forScope);
        let result;
        if (node.body.type === 'BlockStatement') {
            result = BlockStatement(node.body, subScope, { invasived: true });
        }
        else {
            result = evaluate(node.body, subScope);
        }
        if (result === BREAK) {
            break;
        }
        else if (result === CONTINUE) {
            continue;
        }
        else if (result === RETURN) {
            return result;
        }
    }
}
export function ForInStatement(node, scope) {
    for (const value in evaluate(node.right, scope)) {
        const result = ForXHandler(node, scope, { value });
        if (result === BREAK) {
            break;
        }
        else if (result === CONTINUE) {
            continue;
        }
        else if (result === RETURN) {
            return result;
        }
    }
}
export function ForOfStatement(node, scope) {
    const right = evaluate(node.right, scope);
    for (const value of right) {
        const result = ForXHandler(node, scope, { value });
        if (result === BREAK) {
            break;
        }
        else if (result === CONTINUE) {
            continue;
        }
        else if (result === RETURN) {
            return result;
        }
    }
}
